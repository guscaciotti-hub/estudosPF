/* Plataforma de estudo - Agente PF (Cebraspe).
   Metrica unica: indice liquido = (certas - erradas) / respondidas.
   Prioridade: itens_na_prova x deficit x swing. Ver CLAUDE.md. */
'use strict';

var CHAVE = 'pfagente.v2';
var CHAVE_V1 = 'pfagente.v1';

var TOTAL_ITENS = 120;
var CORTE_PONTOS = 82;          // corte informado pelo Gustavo (PF 2025), nao verificado em fonte
var ACEITAVEL_IDX = 0.60;       // indice liquido minimo para o passo ser "aceitavel"
var ACEITAVEL_N = 6;            // questoes minimas respondidas no passo
var INTERVALOS = [3, 7, 21, 60];
var LIMPAS_PARA_SAIR = 2;
var SESSAO_NOVAS = 6, SESSAO_REV = 3, SESSAO_SEM_FILA = 8;
var INTERVALO_SIMULADO = 20;

var MAT = {}, MATK = [];
MATERIAS.forEach(function(m){ MAT[m.k] = m; MATK.push(m.k); });
var PAS = {}; PASSOS.forEach(function(p){ PAS[p.id] = p; });
var QID = {}; BANCO.forEach(function(q){ QID[q.id] = q; });

var MECD = {'par de conceitos':'par de conceitos','palavra absoluta':'palavra absoluta',
  'premissa e conclusao':'premissa e conclusão','duas metades':'duas metades',
  'numero na hipotese':'número na hipótese','aparencia literal':'aparência literal'};

var ESTADOS = {
  nao_iniciado: {r:'não iniciado', cor:'var(--muted)'},
  teoria_lida:  {r:'teoria lida',  cor:'var(--warn)'},
  em_treino:    {r:'em treino',    cor:'var(--pos)'},
  aceitavel:    {r:'aceitável',    cor:'var(--good)'},
  consolidado:  {r:'consolidado',  cor:'var(--good)'}
};

/* ---------- utilitarios ---------- */
var $ = function(id){ return document.getElementById(id); };
function esc(s){ return String(s).replace(/[&<>"]/g, function(c){
  return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
function hoje(){ var d = new Date();
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
function dias(a,b){ return Math.round((new Date(b+'T00:00:00') - new Date(a+'T00:00:00'))/864e5); }
function maisDias(d,n){ var x = new Date(d+'T00:00:00'); x.setDate(x.getDate()+n);
  return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0'); }
function br(d){ var p = d.split('-'); return p[2]+'/'+p[1]+'/'+p[0]; }
function fmt(v){ return (v>0?'+':v<0?'−':'') + Math.abs(v).toFixed(2).replace('.',','); }
function num(v,c){ return v.toFixed(c===undefined?1:c).replace('.',','); }
function hhmmss(s){ var h=Math.floor(s/3600), m=Math.floor(s%3600/60), x=s%60,
  p=function(n){return String(n).padStart(2,'0');};
  return (h>0?p(h)+':':'')+p(m)+':'+p(x); }
function embaralha(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){
  var j=Math.floor(Math.random()*(i+1)), t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
/* markdown minimo do caderno: **negrito**, "• " em lista, paragrafos por linha em branco */
function md(txt){
  return esc(txt).split('\n\n').map(function(bl){
    bl = bl.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    if (/^•\s/m.test(bl)) return '<ul class="lista">' + bl.split('\n').map(function(l){
      return '<li>' + l.replace(/^•\s*/, '') + '</li>'; }).join('') + '</ul>';
    return '<p>' + bl.replace(/\n/g, '<br>') + '</p>';
  }).join('');
}

/* ---------- estado ---------- */
var S = {v:2, hist:[], sessoes:[], simulados:[], teoria:{}, revisao:{}};
function carrega(){
  try {
    var raw = localStorage.getItem(CHAVE);
    if (raw){ var o = JSON.parse(raw);
      S = {v:2, hist:o.hist||[], sessoes:o.sessoes||[], simulados:o.simulados||[],
           teoria:o.teoria||{}, revisao:o.revisao||{}};
    } else {
      var v1 = localStorage.getItem(CHAVE_V1);
      if (v1) { migraV1(JSON.parse(v1)); salva(); }
    }
  } catch(e){}
  // o historico e a fonte da verdade: materia, passo e mecanismo sao sempre
  // relidos do banco atual, para o registro sobreviver a reorganizacoes
  S.hist = S.hist.filter(function(h){
    var q = QID[h.q];
    if (q){ h.m = q.m; h.a = q.a; h.p = q.p; h.mec = q.mec; return true; }
    return /^importado:/.test(h.q) && !!PAS[h.p];   // itens importados nao tem id de banco
  });
}
function migraV1(o){
  S = {v:2, hist:[], sessoes:[], simulados:o.simulados||[], teoria:{}, revisao:{}};
  (o.hist||[]).forEach(function(h){ if (QID[h.q]) S.hist.push(h); });
  (o.sessoes||[]).forEach(function(x){
    var q = BANCO.filter(function(b){ return b.a === x.a; })[0];
    S.sessoes.push({d:x.d, p:q?q.p:null, n:x.n, c:x.c, e:x.e, b:x.b, saldo:x.saldo, idx:x.idx});
  });
}
function salva(){ try { localStorage.setItem(CHAVE, JSON.stringify(S)); return true; }
  catch(e){ return false; } }

/* ---------- perfil derivado do historico ---------- */
function perfil(){
  var pa = {}, ma = {}, ger = {resp:0,c:0,e:0,b:0};
  PASSOS.forEach(function(p){ pa[p.id] = {resp:0,c:0,e:0,b:0,ultima:null,mec:{}}; });
  MATK.forEach(function(k){ ma[k] = {resp:0,c:0,e:0,b:0}; });
  S.hist.forEach(function(h){
    var k = h.res === 1 ? 'c' : h.res === -1 ? 'e' : 'b';
    ger.resp++; ger[k]++;
    if (pa[h.p]){ var o = pa[h.p]; o.resp++; o[k]++;
      if (h.res === -1 && h.mec) o.mec[h.mec] = (o.mec[h.mec]||0)+1;
      if (!o.ultima || h.d > o.ultima) o.ultima = h.d; }
    if (ma[h.m]){ ma[h.m].resp++; ma[h.m][k]++; }
  });
  var idx = function(o){ return o.resp ? (o.c - o.e)/o.resp : 0; };
  Object.keys(pa).forEach(function(k){ pa[k].idx = idx(pa[k]); });
  MATK.forEach(function(k){ ma[k].idx = idx(ma[k]); });
  ger.idx = idx(ger); ger.saldo = ger.c - ger.e;
  return {passo:pa, mat:ma, ger:ger};
}

function estadoPasso(id, P){
  var o = (P||perfil()).passo[id];
  if (o.resp >= ACEITAVEL_N && o.idx >= ACEITAVEL_IDX)
    return (S.revisao[id] === undefined && S.teoria[id]) ? 'consolidado' : 'aceitavel';
  if (o.resp > 0) return 'em_treino';
  return S.teoria[id] ? 'teoria_lida' : 'nao_iniciado';
}

/* ---------- prioridade ----------
   itens_na_prova x deficit x swing.
   deficit = (1 - indice) / 2, ou 0,9 para passo nunca respondido.
   swing   = 1 + erros / (erros + brancos). Erro vale 2 pontos de virada
             (de -1 para +1); branco vale 1 (de 0 para +1). Errar muito num
             passo pesado e oportunidade, nao fracasso.                      */
function fila(){
  var P = perfil();
  var f = PASSOS.map(function(p){
    var o = P.passo[p.id], st = estadoPasso(p.id, P);
    var deficit = o.resp === 0 ? 0.9 : (1 - o.idx)/2;
    var swing = (o.e + o.b) === 0 ? 1 : 1 + o.e/(o.e + o.b);
    var score = p.itens * deficit * swing;
    if (st === 'aceitavel') score *= 0.15;
    if (st === 'consolidado') score *= 0.05;
    return {id:p.id, t:p.t, itens:p.itens, n:p.n, mats:p.mats, st:st, score:score,
            idx:o.idx, resp:o.resp, c:o.c, e:o.e, b:o.b, deficit:deficit, swing:swing,
            ultima:o.ultima, mec:o.mec, ined:ineditas(p.id).length};
  });
  f.sort(function(a,b){ return (b.score - a.score) || (b.itens - a.itens) || (a.id < b.id ? -1 : 1); });
  f.forEach(function(x,i){ x.ordem = i+1; });
  return f;
}
function vistos(){ var v = {}; S.hist.forEach(function(h){ v[h.q] = h.d; }); return v; }
function ineditas(pid){ var v = vistos();
  return BANCO.filter(function(q){ return q.p === pid && !v[q.id]; }); }

/* ---------- selecao de questoes ---------- */
/* Seleciona n questoes de um conjunto.
   Nao basta equilibrar o gabarito: e preciso equilibrar formato x gabarito
   DENTRO da selecao. Um recorte em que "par de conceitos" so aparece com
   gabarito Errado reensina que a forma entrega a resposta — o defeito que o
   banco foi refeito para eliminar. Escolha gulosa: a cada item, prefere o
   candidato cuja celula formato x gabarito esta menos preenchida, puxando o
   total de Certos para ~45%. Inedito sempre na frente de ja visto. */
function montar(pool, n, cel){
  if (!pool.length || n <= 0) return [];
  var v = vistos();
  var ined = embaralha(pool.filter(function(q){ return !v[q.id]; }));
  var rev  = embaralha(pool.filter(function(q){ return v[q.id]; }))
               .sort(function(a,b){ return v[a.id] < v[b.id] ? -1 : 1; });
  // Inedito e CAMADA, nao bonus: so se recorre a questao ja vista quando as
  // ineditas nao dao conta. Como bonus somado, ele engolia o termo de
  // equilibrio e o formato voltava a se concentrar num gabarito.
  var cand = ined.length >= n ? ined : ined.concat(rev);

  // Sem acumulador, a meta vale para este bloco. Com acumulador compartilhado,
  // vale para o conjunto — senao blocos de 1 ou 2 itens arredondariam a meta
  // de Certos para zero e o simulado inteiro escorreria para Errado.
  var compartilhado = !!(cel && cel._n);
  if (!cel) cel = {};
  var alvoC = compartilhado ? cel._alvo : Math.round(n * 0.45);
  var alvoE = compartilhado ? (cel._n - cel._alvo) : (n - Math.round(n * 0.45));
  if (!compartilhado){ cel._c = 0; cel._e = 0; }

  var out = [], usado = {};
  for (var k = 0; k < n; k++){
    var melhor = null, nota = -Infinity;
    for (var i = 0; i < cand.length; i++){
      var q = cand[i];
      if (usado[q.id]) continue;
      var chave = q.mec + '|' + q.g;
      var p = -(cel[chave] || 0) * 3;                       // celula menos cheia primeiro
      p += (q.g === 'C') ? ((cel._c || 0) < alvoC ? 2 : -3)  // puxa para a meta de Certos
                         : ((cel._e || 0) < alvoE ? 1 : -3);
      p += Math.random() * 0.9;
      if (p > nota){ nota = p; melhor = q; }
    }
    if (!melhor) break;
    usado[melhor.id] = 1;
    cel[chave = melhor.mec + '|' + melhor.g] = (cel[chave] || 0) + 1;
    if (melhor.g === 'C') cel._c = (cel._c || 0) + 1; else cel._e = (cel._e || 0) + 1;
    out.push(melhor);
  }
  return embaralha(out).map(function(q){
    var o = {}; for (var kk in q) o[kk] = q[kk]; o._rev = !!v[q.id]; return o; });
}

/* ---------- fila de revisao espacada ---------- */
function revisaoDevida(){
  var hj = hoje();
  return Object.keys(S.revisao).filter(function(p){ return S.revisao[p].prox <= hj; });
}
function questoesRevisao(n){
  var devidos = revisaoDevida();
  if (!devidos.length) return [];
  var errados = {};
  S.hist.forEach(function(h){ if (h.res === -1 && devidos.indexOf(h.p) >= 0) errados[h.q] = 1; });
  var pool = BANCO.filter(function(q){ return devidos.indexOf(q.p) >= 0; });
  // prioriza as questoes em que ele ja errou, que e o que a revisao existe para consertar
  pool.sort(function(a,b){ return (errados[b.id]?1:0) - (errados[a.id]?1:0); });
  var out = [], usado = {};
  for (var i=0; i<pool.length && out.length<n; i++){
    if (usado[pool[i].id]) continue;
    usado[pool[i].id] = 1;
    var o = {}; for (var k in pool[i]) o[k] = pool[i][k]; o._revisao = true; out.push(o);
  }
  return embaralha(out);
}
/* Erro devolve o passo ao inicio da fila; duas passagens consecutivas sem
   erro tiram o passo dela. Intervalos: 3, 7, 21 e 60 dias. */
function atualizaRevisao(pid, errou){
  var r = S.revisao[pid];
  if (errou){
    S.revisao[pid] = {nivel:0, limpas:0, prox:maisDias(hoje(), INTERVALOS[0])};
    return;
  }
  if (!r) return;
  r.limpas = (r.limpas||0) + 1;
  if (r.limpas >= LIMPAS_PARA_SAIR){ delete S.revisao[pid]; return; }
  r.nivel = Math.min(INTERVALOS.length-1, (r.nivel||0) + 1);
  r.prox = maisDias(hoje(), INTERVALOS[r.nivel]);
}

/* ---------- barras divergentes ---------- */
function barras(linhas){
  return linhas.map(function(L){
    var extra = L.sub ? '<br><span class="note">' + esc(L.sub) + '</span>' : '';
    if (!L.resp) return '<div class="row"><div class="lbl">' + esc(L.lbl) + extra + '</div>'
      + '<div class="track"><div class="zero"></div></div><div class="val nd">sem<br>medição</div></div>';
    var neg = L.idx < 0, w = Math.abs(L.idx)*50;
    var tip = L.lbl + ' — ' + L.resp + ' respondidas · ' + L.c + 'C ' + L.e + 'E ' + L.b + 'B · índice ' + fmt(L.idx);
    return '<div class="row" title="' + esc(tip) + '"><div class="lbl">' + esc(L.lbl) + extra + '</div>'
      + '<div class="track"><div class="fill' + (neg?' neg':'') + '" style="'
      + (neg?'right:50%;':'left:50%;') + 'width:' + w + '%"></div><div class="zero"></div></div>'
      + '<div class="val" style="color:' + (neg?'var(--neg)':'var(--pos)') + '">' + fmt(L.idx) + '</div></div>';
  }).join('');
}

/* ---------- navegacao ---------- */
var VIEWS = ['painel','conteudo','passos','sessao','simulado','caderno','dados'];
function ir(v){
  VIEWS.forEach(function(x){ $('v-'+x).classList.toggle('hide', x !== v); });
  document.querySelectorAll('nav button').forEach(function(b){
    b.setAttribute('aria-current', b.dataset.v === v ? 'true' : 'false'); });
  ({painel:painel, conteudo:conteudoView, passos:passosView, sessao:sessaoInicio,
    simulado:simuladoInicio, caderno:cadernoView, dados:dadosView})[v]();
  window.scrollTo(0,0);
}
document.querySelectorAll('nav button').forEach(function(b){ b.onclick = function(){ ir(b.dataset.v); }; });
$('tema').onclick = function(){
  var a = document.documentElement.getAttribute('data-theme');
  var n = a === 'dark' ? 'light' : a === 'light' ? 'dark'
        : (matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', n);
  try { localStorage.setItem('pfagente.tema', n); } catch(e){}
};
try { var tm = localStorage.getItem('pfagente.tema'); if (tm) document.documentElement.setAttribute('data-theme', tm); } catch(e){}

/* ---------- painel ---------- */
function projecao(P){
  // Projeta o liquido em 120 itens a partir do indice medido de cada materia.
  // Materia sem medicao nao entra: projetar sobre o que nao foi medido seria
  // inventar numero. A cobertura e informada junto.
  var pts = 0, cob = 0;
  MATERIAS.forEach(function(m){
    var o = P.mat[m.k];
    if (o.resp){ pts += m.itens * o.idx; cob += m.itens; }
  });
  return {pts:pts, cob:cob, parcial: cob < TOTAL_ITENS};
}
function sequencia(){
  var ds = {}; S.sessoes.forEach(function(x){ ds[x.d] = 1; });
  var hj = hoje(), n = 0, d = ds[hj] ? hj : maisDias(hj,-1);
  while (ds[d]){ n++; d = maisDias(d,-1); }
  var ult = S.sessoes.length ? S.sessoes[S.sessoes.length-1].d : null;
  return {seq:n, ult:ult, desde: ult ? dias(ult, hj) : null};
}
function precoDoChute(){
  var c = 0, e = 0;
  S.hist.forEach(function(h){ if (h.res === 1) c++; else if (h.res === -1) e++; });
  return {real:c-e, seBranco:c, custo:e, n:S.hist.length};
}
function proximoSimulado(){ return S.simulados.length
  ? maisDias(S.simulados[S.simulados.length-1].d, INTERVALO_SIMULADO) : null; }

function painel(){
  var P = perfil(), F = fila(), hj = hoje();

  if (!S.hist.length && !S.simulados.length){
    $('pnVazio').classList.remove('hide');
    $('pnCheio').classList.add('hide');
    $('pnVaziaAcao').onclick = function(){ ir('simulado'); };
    $('pnVaziaPasso').onclick = function(){ ir('passos'); };
    return;
  }
  $('pnVazio').classList.add('hide');
  $('pnCheio').classList.remove('hide');

  // 1. distancia do corte
  var pr = projecao(P), dif = pr.pts - CORTE_PONTOS;
  $('pnDist').textContent = (dif>0?'+':'−') + num(Math.abs(dif));
  $('pnDist').className = 'hero ' + (dif >= 0 ? 'pos' : 'neg');
  $('pnDistTxt').innerHTML = 'Projeção de <strong>' + num(pr.pts) + ' pontos líquidos</strong> em 120 itens, '
    + 'contra os <strong>' + CORTE_PONTOS + '</strong> do corte informado de 2025. '
    + (pr.parcial ? '<span class="flag2">A projeção cobre apenas ' + num(pr.cob,0) + ' dos 120 itens — '
       + 'as matérias sem nenhuma questão respondida ficam de fora, porque projetar sobre o que não foi '
       + 'medido seria inventar número.</span>' : 'Todas as matérias já têm medição.');

  // 2. linha do tempo
  $('pnLinha').innerHTML = linhaDoTempo();

  // 3. barras por materia, ordenadas por prioridade
  var pesoMat = {};
  F.forEach(function(x){ x.mats.forEach(function(m){ pesoMat[m] = Math.max(pesoMat[m]||0, 1/x.ordem); }); });
  var ordem = MATK.slice().sort(function(a,b){ return (pesoMat[b]||0) - (pesoMat[a]||0); });
  $('pnBars').innerHTML = barras(ordem.map(function(k){
    var o = P.mat[k];
    return {lbl:MAT[k].d, sub:MAT[k].itens + ' itens na prova', idx:o.idx, resp:o.resp, c:o.c, e:o.e, b:o.b};
  }));
  $('pnTab').innerHTML = ordem.map(function(k){
    var o = P.mat[k];
    return '<tr><td>' + MAT[k].d + '</td><td>' + MAT[k].itens + '</td><td>' + o.c + '</td><td>'
      + o.e + '</td><td>' + o.b + '</td><td>' + (o.resp ? fmt(o.idx) : '—') + '</td></tr>';
  }).join('');

  // 4. sequencia
  var sq = sequencia();
  $('pnSeq').textContent = sq.seq;
  $('pnSeqTxt').textContent = sq.desde === null ? 'Nenhuma sessão ainda.'
    : sq.desde === 0 ? 'Sessão feita hoje.'
    : sq.desde >= 7 ? 'Última sessão há ' + sq.desde + ' dias. Isso é abandono, não pausa.'
    : 'Última sessão há ' + sq.desde + (sq.desde === 1 ? ' dia.' : ' dias.');
  $('pnSeqTxt').className = sq.desde >= 7 ? 'note alerta' : 'note';

  // 5. o preco do chute
  var pc = precoDoChute();
  $('pnChute').textContent = pc.custo ? '−' + pc.custo : '0';
  $('pnChuteTxt').innerHTML = !pc.n ? 'Sem dados.'
    : 'Você fez <strong>' + (pc.real>0?'+':'') + pc.real + '</strong> de saldo líquido. '
    + 'Tivesse deixado em branco exatamente os itens que errou, teria feito <strong>+' + pc.seBranco + '</strong>. '
    + 'A diferença de <strong>' + pc.custo + ' ponto(s)</strong> é o que custou marcar em vez de pular. '
    + 'Esse número precisa cair ao longo dos meses — se não cair, o problema não é conteúdo, é disciplina de branco.';

  // proximo passo e simulado
  var alvo = F[0], prox = proximoSimulado();
  $('pnHoje').innerHTML = (!S.simulados.length
      ? '<strong>Fazer o simulado marco zero.</strong> Sem linha de base não existe evolução, só sensação.'
      : (prox && dias(prox, hj) >= 0
        ? '<strong>Simulado de etapa.</strong> Venceu em ' + br(prox) + '.'
        : '<strong>Passo ' + alvo.ordem + ' — ' + esc(alvo.t) + '.</strong> '
          + num(alvo.itens) + ' itens na prova, '
          + (alvo.resp ? 'índice ' + fmt(alvo.idx) : 'nunca respondido') + '.'));
  $('pnHojeBtn').textContent = (!S.simulados.length || (prox && dias(prox,hj)>=0))
    ? 'Abrir o simulado' : 'Começar o passo';
  $('pnHojeBtn').onclick = function(){
    ir((!S.simulados.length || (prox && dias(prox,hj)>=0)) ? 'simulado' : 'sessao'); };

  var dev = revisaoDevida();
  $('pnRev').innerHTML = !Object.keys(S.revisao).length
    ? '<p class="note">Fila vazia. Passos entram nela quando você erra.</p>'
    : Object.keys(S.revisao).sort(function(a,b){ return S.revisao[a].prox < S.revisao[b].prox ? -1 : 1; })
        .map(function(p){ var r = S.revisao[p], venc = r.prox <= hj;
          return '<div class="kv"><span>' + esc(PAS[p].t) + '<br><span class="note">'
            + (venc ? 'vencida' : 'volta em ' + br(r.prox)) + ' · intervalo de '
            + INTERVALOS[r.nivel] + ' dias · ' + (r.limpas||0) + '/' + LIMPAS_PARA_SAIR
            + ' passagens limpas</span></span><b style="color:' + (venc?'var(--warn)':'var(--muted)')
            + '">' + (venc ? 'hoje' : dias(hj, r.prox) + 'd') + '</b></div>'; }).join('')
      + (dev.length ? '<p class="note">' + dev.length + ' passo(s) vencido(s): entram nas 3 questões de revisão da próxima sessão.</p>' : '');
}
function linhaDoTempo(){
  var sims = S.simulados;
  var W = 320, H = 110, pad = 26;
  var corte = CORTE_PONTOS / TOTAL_ITENS;                 // corte em indice liquido
  var vals = sims.map(function(s){ return s.idx; }).concat([corte, 0]);
  var lo = Math.min.apply(null, vals) - 0.1, hi = Math.max.apply(null, vals) + 0.1;
  var y = function(v){ return pad + (hi - v)/(hi - lo) * (H - 2*pad); };
  var x = function(i){ return sims.length < 2 ? W/2
    : pad + i/(sims.length-1) * (W - 2*pad); };
  var g = '<svg viewBox="0 0 ' + W + ' ' + H + '" class="spark" role="img" aria-label="Índice líquido por simulado">';
  g += '<line x1="0" y1="' + y(corte) + '" x2="' + W + '" y2="' + y(corte)
    + '" stroke="var(--warn)" stroke-width="2" stroke-dasharray="5 4"/>';
  g += '<text x="4" y="' + (y(corte)-6) + '" fill="var(--warn)" font-size="11">corte ' + fmt(corte) + '</text>';
  if (y(0) > pad && y(0) < H-pad+10)
    g += '<line x1="0" y1="' + y(0) + '" x2="' + W + '" y2="' + y(0) + '" stroke="var(--axis)" stroke-width="1"/>';
  if (sims.length > 1){
    g += '<polyline fill="none" stroke="var(--pos)" stroke-width="2" points="'
      + sims.map(function(s,i){ return x(i)+','+y(s.idx); }).join(' ') + '"/>';
  }
  sims.forEach(function(s,i){
    g += '<circle cx="' + x(i) + '" cy="' + y(s.idx) + '" r="5" fill="var(--pos)" stroke="var(--surface-1)" stroke-width="2"/>';
    g += '<text x="' + x(i) + '" y="' + (y(s.idx)-11) + '" fill="var(--ink)" font-size="11" text-anchor="middle">' + fmt(s.idx) + '</text>';
    g += '<text x="' + x(i) + '" y="' + (H-6) + '" fill="var(--muted)" font-size="10" text-anchor="middle">' + s.id + '</text>';
  });
  g += '</svg>';
  return g + '<p class="note">' + (sims.length < 2
    ? 'Um simulado só não faz trajetória — o que aparece é o ponto de partida e a régua do corte. O segundo ponto é que transforma isso em evolução.'
    : 'Índice líquido por simulado. A linha tracejada é o corte de 2025 convertido em índice (' + CORTE_PONTOS + ' ÷ 120).') + '</p>';
}

/* ---------- conteudo da prova ----------
   Todo o programa, topico por topico. Duas medidas distintas, que nao devem
   ser confundidas:
   - ESTUDO: questoes distintas ja respondidas / questoes que o banco tem do
     topico. Mede quanto do material disponivel foi consumido, nao quanto do
     assunto foi dominado.
   - APROVEITAMENTO: (certas - erradas) / respondidas, em percentual. E o
     indice liquido numa escala de -100 a +100. NAO e percentual bruto de
     acerto: chutar metade de um bloco daria 50% de acerto e 0 de
     aproveitamento, que e exatamente o que valeria na prova.              */
var cnFiltro = 'todos';

function metricasTopico(t){
  var banco = BANCO.filter(function(q){ return q.a === t.a; });
  var ids = {}; banco.forEach(function(q){ ids[q.id] = 1; });
  var feitas = {}, c = 0, e = 0, b = 0;
  S.hist.forEach(function(h){
    if (!ids[h.q]) return;
    feitas[h.q] = 1;
    if (h.res === 1) c++; else if (h.res === -1) e++; else b++;
  });
  var resp = c + e + b, nf = Object.keys(feitas).length;
  return {a:t.a, p:t.p, banco:banco.length, feitas:nf, resp:resp, c:c, e:e, b:b,
    estudo: banco.length ? Math.round(nf / banco.length * 100) : null,
    aprov: resp ? Math.round((c - e) / resp * 100) : null};
}
function corAprov(v){ return v === null ? 'var(--muted)' : v < 0 ? 'var(--neg)'
  : v >= 60 ? 'var(--good)' : v >= 30 ? 'var(--pos)' : 'var(--warn)'; }

function conteudoView(){
  var mats = EDITAL.map(function(bl){
    var tops = bl.topicos.map(metricasTopico);
    var banco = 0, feitas = 0, c = 0, e = 0, b = 0;
    tops.forEach(function(t){ banco += t.banco; feitas += t.feitas; c += t.c; e += t.e; b += t.b; });
    var resp = c + e + b;
    return {m:bl.m, d:MAT[bl.m].d, itens:MAT[bl.m].itens, tops:tops, banco:banco, feitas:feitas,
      resp:resp, c:c, e:e, b:b,
      estudo: banco ? Math.round(feitas/banco*100) : null,
      aprov: resp ? Math.round((c-e)/resp*100) : null,
      comQ: tops.filter(function(t){ return t.banco; }).length,
      iniciados: tops.filter(function(t){ return t.resp; }).length};
  });
  var T = {tops:0, comQ:0, ini:0, banco:0, feitas:0, c:0, e:0, b:0};
  mats.forEach(function(x){ T.tops += x.tops.length; T.comQ += x.comQ; T.ini += x.iniciados;
    T.banco += x.banco; T.feitas += x.feitas; T.c += x.c; T.e += x.e; T.b += x.b; });
  var resp = T.c + T.e + T.b;
  var aprov = resp ? Math.round((T.c - T.e)/resp*100) : null;

  $('cnTiles').innerHTML = [
    ['<span style="color:var(--ink)">' + T.tops + '</span>', 'tópicos no edital', '153 do programa verticalizado'],
    [T.comQ + '<span style="font-size:15px;color:var(--muted)"> · ' + Math.round(T.comQ/T.tops*100) + '%</span>',
     'com questão no banco', (T.tops - T.comQ) + ' ainda sem material'],
    ['<span style="color:' + (T.ini ? 'var(--pos)' : 'var(--muted)') + '">' + T.ini + '</span>',
     'tópicos iniciados', T.ini ? Math.round(T.ini/T.tops*100) + '% do edital tocado' : 'nenhum ainda'],
    [aprov === null ? '<span style="color:var(--muted);font-size:17px">sem medição</span>'
      : '<span style="color:' + corAprov(aprov) + '">' + (aprov>0?'+':'') + aprov + '%</span>',
     'aproveitamento líquido', resp ? resp + ' questões respondidas' : 'nenhuma questão ainda']
  ].map(function(t){ return '<div class="tile"><div class="v">' + t[0] + '</div><div class="k">'
      + t[1] + '</div><div class="s">' + t[2] + '</div></div>'; }).join('');

  var pct = T.banco ? Math.round(T.feitas/T.banco*100) : 0;
  $('cnBar').style.width = pct + '%';
  $('cnBar').style.background = 'var(--pos)';
  $('cnBarL').textContent = T.feitas + ' de ' + T.banco + ' questões do banco já respondidas (' + pct + '%)';
  $('cnAviso').innerHTML = 'Duas medidas diferentes, e confundi-las engana: <strong>estudo</strong> é quanto '
    + 'do material disponível você já consumiu; <strong>aproveitamento</strong> é (certas − erradas) ÷ respondidas, '
    + 'em percentual — o índice líquido numa escala de −100 a +100. Não é percentual bruto de acerto: '
    + 'chutar metade de um bloco daria 50% de acerto e <strong>0 de aproveitamento</strong>, que é exatamente '
    + 'o que valeria na prova.<br><br>'
    + '<span class="flag2">' + (T.tops - T.comQ) + ' dos ' + T.tops + ' tópicos ainda não têm nenhuma questão '
    + 'no banco. Eles aparecem na lista marcados, para você ver o buraco em vez de achar que o edital está coberto. '
    + 'O banco cresce escrevendo questões pelo Claude Code.</span>';

  var filtros = {
    todos:  function(){ return true; },
    nao:    function(t){ return t.banco && !t.resp; },
    fracos: function(t){ return t.aprov !== null && t.aprov < 60; },
    sem:    function(t){ return !t.banco; }   // inclui os cobertos por passo vizinho
  };
  var rotulo = {todos:'', nao:'Tópicos que já têm questão no banco e você ainda não respondeu nenhuma.',
    fracos:'Tópicos com aproveitamento abaixo de 60%. É onde há ponto a recuperar.',
    sem:'Tópicos do edital sem questão própria. Os que trazem um passo são estudados junto com os vizinhos daquele passo; os demais a plataforma ainda não cobre.'};
  $('cnFiltroTxt').textContent = rotulo[cnFiltro];

  var html = '';
  mats.forEach(function(x){
    var tops = x.tops.filter(filtros[cnFiltro]);
    if (!tops.length) return;
    html += '<details class="mat" open><summary>'
      + '<div class="mat-h"><span class="nome">' + x.d + '</span>'
      + '<span class="peso">' + x.itens + ' itens na prova · ' + x.tops.length + ' tópicos · '
      + x.comQ + ' com questão</span>'
      + '<span class="apv" style="color:' + corAprov(x.aprov) + '">'
      + (x.aprov === null ? '—' : (x.aprov>0?'+':'') + x.aprov + '%') + '</span></div>'
      + '<div class="mat-sub"><div class="meter"><i style="width:' + (x.estudo||0)
      + '%;background:var(--pos)"></i></div><span class="pct">' + (x.estudo === null ? '—' : x.estudo + '% estudado')
      + '</span></div></summary>';
    tops.forEach(function(t){
      var clic = t.p ? ' clicavel' : '';
      html += '<div class="top' + clic + '"' + (t.p ? ' data-passo="' + t.p + '"' : '') + '>'
        + '<div class="nome">' + esc(t.a)
        + '<small>' + (t.banco
            ? t.banco + (t.banco === 1 ? ' questão' : ' questões') + (t.p ? ' · passo ' + t.p : '')
            : t.p
              ? '<span style="color:var(--warn)">sem questão própria</span> · estudado dentro do passo ' + t.p
              : '<span style="color:var(--warn)">sem questão no banco</span>') + '</small>'
        + (t.banco ? '<div class="barra"><i style="width:' + (t.estudo||0) + '%"></i></div>' : '')
        + '</div>'
        + '<div class="est">' + (t.banco ? t.feitas + '/' + t.banco + '<br>' + t.estudo + '%' : '—') + '</div>'
        + '<div class="apv" style="color:' + corAprov(t.aprov) + '">'
        + (t.aprov === null ? '—' : (t.aprov>0?'+':'') + t.aprov + '%') + '</div></div>';
    });
    html += '</details>';
  });
  $('cnLista').innerHTML = html || '<div class="card"><p class="note">Nenhum tópico neste filtro.</p></div>';
  $('cnLista').querySelectorAll('[data-passo]').forEach(function(el){
    el.onclick = function(){ iniciaSessao(el.dataset.passo); ir('sessao'); }; });
}
$('cnFiltros').querySelectorAll('button').forEach(function(b){
  b.onclick = function(){
    cnFiltro = b.dataset.f;
    $('cnFiltros').querySelectorAll('button').forEach(function(x){ x.classList.toggle('sel', x === b); });
    conteudoView();
  };
});

/* ---------- passo estrategico ---------- */
function passosView(){
  var F = fila(), hj = hoje();
  var prontos = F.filter(function(x){ return x.st === 'aceitavel' || x.st === 'consolidado'; }).length;
  $('psResumo').innerHTML = '<div class="kv"><span>Passos aceitáveis</span><b>' + prontos + ' de ' + F.length + '</b></div>'
    + '<div class="kv"><span>Questões no banco</span><b>' + BANCO.length + '</b></div>'
    + '<div class="kv"><span>Na fila de revisão</span><b>' + Object.keys(S.revisao).length + '</b></div>';
  $('psLista').innerHTML = F.map(function(x){
    var E = ESTADOS[x.st], P = PAS[x.id];
    var pct = Math.min(100, Math.round(x.resp / ACEITAVEL_N * 100));
    var okIdx = x.resp >= ACEITAVEL_N && x.idx >= ACEITAVEL_IDX;
    return '<div class="passo" id="ps-' + x.id + '">'
      + '<div class="passo-h"><span class="ord">' + x.ordem + '</span>'
      + '<div class="passo-t"><strong>' + esc(x.t) + '</strong>'
      + '<div class="note">' + x.mats.map(function(m){ return MAT[m].d; }).join(' · ')
      + ' · ' + num(x.itens) + ' itens na prova · ' + x.n + ' questões'
      + (x.ined ? '' : ' · <span style="color:var(--warn)">banco esgotado</span>') + '</div></div>'
      + '<span class="badge" style="color:' + E.cor + ';border-color:' + E.cor + '">' + E.r + '</span></div>'
      + '<div class="passo-m">'
      + '<span>' + (x.resp ? 'índice <b style="color:' + (x.idx<0?'var(--neg)':'var(--pos)') + '">' + fmt(x.idx)
          + '</b> em ' + x.resp + ' questões' : 'nunca respondido') + '</span>'
      + '<span>prioridade <b>' + num(x.score,2) + '</b></span></div>'
      + '<div class="meter"><i style="width:' + pct + '%;background:' + (okIdx?'var(--good)':'var(--pos)') + '"></i>'
      + '<span class="meter-l">' + x.resp + '/' + ACEITAVEL_N + ' questões · aceitável exige índice ≥ 0,60</span></div>'
      + '<div class="btns row">'
      + '<button class="b" data-teoria="' + x.id + '">Ler a teoria</button>'
      + (S.teoria[x.id] ? '<button class="b" data-desmarca="' + x.id + '">✓ estudado em ' + br(S.teoria[x.id]) + '</button>'
         : '<button class="b" data-marca="' + x.id + '">Marcar como estudado</button>')
      + '<button class="b primary" data-martela="' + x.id + '">Martelar questões</button>'
      + '</div></div>';
  }).join('');
  $('psLista').querySelectorAll('[data-teoria]').forEach(function(b){
    b.onclick = function(){ cadernoView(b.dataset.teoria); ir('caderno'); abreTeoria(b.dataset.teoria); }; });
  $('psLista').querySelectorAll('[data-marca]').forEach(function(b){
    b.onclick = function(){ S.teoria[b.dataset.marca] = hoje(); salva(); passosView(); }; });
  $('psLista').querySelectorAll('[data-desmarca]').forEach(function(b){
    b.onclick = function(){ delete S.teoria[b.dataset.desmarca]; salva(); passosView(); }; });
  $('psLista').querySelectorAll('[data-martela]').forEach(function(b){
    b.onclick = function(){ iniciaSessao(b.dataset.martela); ir('sessao'); }; });
}

/* ---------- caderno ---------- */
function cadernoView(destaque){
  var F = fila(), por = {};
  F.forEach(function(x){ var k = x.mats[0]; (por[k] = por[k] || []).push(x); });
  var html = '';
  MATK.forEach(function(k){
    if (!por[k]) return;
    html += '<h2>' + MAT[k].d + ' <span class="note">· ' + MAT[k].itens + ' itens na prova</span></h2>';
    por[k].sort(function(a,b){ return a.id < b.id ? -1 : 1; }).forEach(function(x){
      html += '<details class="teoria" id="cad-' + x.id + '"' + (destaque === x.id ? ' open' : '') + '>'
        + '<summary><strong>' + x.id + ' — ' + esc(x.t) + '</strong>'
        + '<span class="note"> · ' + ESTADOS[x.st].r + (S.teoria[x.id] ? ' · lido em ' + br(S.teoria[x.id]) : '') + '</span></summary>'
        + '<div class="teoria-b">' + md(CADERNO[x.id] || 'Resumo ainda não escrito para este passo.')
        + '<div class="btns row" style="margin-top:16px">'
        + (S.teoria[x.id] ? '' : '<button class="b" data-cmarca="' + x.id + '">Marcar como estudado</button>')
        + '<button class="b primary" data-cmartela="' + x.id + '">Martelar questões deste passo</button>'
        + '</div></div></details>';
    });
  });
  $('cdLista').innerHTML = html;
  $('cdLista').querySelectorAll('[data-cmarca]').forEach(function(b){
    b.onclick = function(){ S.teoria[b.dataset.cmarca] = hoje(); salva(); cadernoView(b.dataset.cmarca); }; });
  $('cdLista').querySelectorAll('[data-cmartela]').forEach(function(b){
    b.onclick = function(){ iniciaSessao(b.dataset.cmartela); ir('sessao'); }; });
}
function abreTeoria(id){ var el = $('cad-'+id); if (el){ el.open = true; el.scrollIntoView({block:'start'}); } }

/* ---------- sessao ---------- */
var se = null;
function sessaoInicio(){
  if (se && se.ativa) return;
  se = null;
  $('seInicio').classList.remove('hide'); $('seTeoria').classList.add('hide');
  $('seProva').classList.add('hide'); $('seFim').classList.add('hide');
  var F = fila(), alvo = F[0], dev = revisaoDevida();
  $('seCab').innerHTML = '<div class="kv"><span>Passo ' + alvo.ordem + ' de hoje<br><strong>'
    + esc(alvo.t) + '</strong><br><span class="note">' + alvo.mats.map(function(m){return MAT[m].d;}).join(' · ')
    + ' · ' + num(alvo.itens) + ' itens na prova · '
    + (alvo.resp ? 'índice ' + fmt(alvo.idx) + ' em ' + alvo.resp + ' questões' : 'nunca respondido')
    + '</span></span></div>'
    + '<p class="note" style="margin-top:14px">' + (dev.length
      ? 'Estrutura de hoje: resumo teórico (~5 min), ' + SESSAO_NOVAS + ' questões novas (~15 min) e '
        + SESSAO_REV + ' de revisão (~7 min), vindas de ' + dev.length + ' passo(s) vencido(s) na fila.'
      : 'Estrutura de hoje: resumo teórico (~5 min) e ' + SESSAO_SEM_FILA
        + ' questões novas (~20 min). A fila de revisão está vazia.') + '</p>';
  $('seGo').onclick = function(){ iniciaSessao(alvo.id); };
  $('seOutro').onclick = function(){ ir('passos'); };
}
function iniciaSessao(pid){
  var dev = revisaoDevida().filter(function(p){ return p !== pid; });
  var nNovas = dev.length ? SESSAO_NOVAS : SESSAO_SEM_FILA;
  var novas = montar(BANCO.filter(function(q){ return q.p === pid; }), nNovas);
  var rev = dev.length ? questoesRevisao(SESSAO_REV) : [];
  if (!novas.length && !rev.length){ alert('Não há questões disponíveis para este passo.'); return; }
  se = {ativa:true, pid:pid, qs:novas.concat(rev), i:0, reg:[], passosTocados:{}};
  se.qs.forEach(function(q){ se.passosTocados[q.p] = se.passosTocados[q.p] || {e:0,n:0}; });
  $('seInicio').classList.add('hide'); $('seFim').classList.add('hide'); $('seProva').classList.add('hide');
  var t = $('seTeoria'); t.classList.remove('hide');
  var P = PAS[pid];
  t.innerHTML = '<div class="card"><span class="pill">Passo ' + P.id + ' · teoria</span>'
    + '<h1 style="margin-top:14px">' + esc(P.t) + '</h1>'
    + '<p class="sub">' + P.mats.map(function(m){ return MAT[m].d; }).join(' · ')
    + ' · ' + num(P.itens) + ' itens na prova · leia em 5 minutos</p>'
    + '<div class="teoria-b">' + md(CADERNO[pid] || 'Resumo ainda não escrito para este passo.') + '</div>'
    + '<hr class="rule"><div class="btns">'
    + '<button class="b primary" id="seTeoriaOk">Li a teoria — ir para as ' + se.qs.length + ' questões</button>'
    + '<button class="b" id="sePular">Pular a teoria</button></div></div>';
  $('seTeoriaOk').onclick = function(){ S.teoria[pid] = hoje(); salva(); comecaQuestoes(); };
  $('sePular').onclick = comecaQuestoes;
  window.scrollTo(0,0);
}
function comecaQuestoes(){
  $('seTeoria').classList.add('hide'); $('seProva').classList.remove('hide'); seRender();
}
function seRender(){
  var q = se.qs[se.i];
  $('sePos').textContent = 'Questão ' + (se.i+1) + ' de ' + se.qs.length;
  $('seAss').textContent = (q._revisao ? 'revisão · ' : '') + PAS[q.p].t;
  $('seBar').style.width = (se.i/se.qs.length*100) + '%';
  $('seEnun').textContent = q.t;
  $('seBtns').classList.remove('hide');
  $('seFb').innerHTML = '';
  window.scrollTo(0,0);
}
$('seBtns').querySelectorAll('button').forEach(function(b){
  b.onclick = function(){ seResponde(b.dataset.r); }; });
function seResponde(r){
  var q = se.qs[se.i];
  var res = r === 'B' ? 0 : (r === q.g ? 1 : -1);
  se.reg.push({d:hoje(), o:'sessao', q:q.id, m:q.m, a:q.a, p:q.p, mec:q.mec, g:q.g, r:r, res:res});
  var tp = se.passosTocados[q.p]; tp.n++; if (res === -1) tp.e++;
  $('seBtns').classList.add('hide');
  var cls = res === 1 ? 'ok' : res === -1 ? 'no' : '';
  $('seFb').innerHTML = '<div class="fb ' + cls + '">'
    + '<div class="res"><span>' + (res===1?'Acertou +1':res===-1?'Errou −1':'Em branco 0') + '</span>'
    + '<span class="neutro">Gabarito: ' + (q.g==='C'?'CERTO':'ERRADO') + ' · você: '
    + (r==='C'?'Certo':r==='E'?'Errado':'Branco') + '</span></div>'
    + '<p class="exp"><span class="lab">Por quê</span>' + esc(q.e) + '</p>'
    + '<p class="cil"><span class="lab">A cilada · formato: ' + MECD[q.mec] + '</span>' + esc(q.c) + '</p>'
    + (q.cf ? '<p class="flag">⚠ Item dependente de norma, gerado sem consulta à fonte oficial. Confira no texto legal antes de fixar.</p>' : '')
    + '<button class="b primary" id="seNext" style="margin-top:16px">'
    + (se.i === se.qs.length-1 ? 'Ver o fechamento' : 'Próxima questão') + '</button></div>';
  $('seNext').onclick = function(){ if (se.i === se.qs.length-1) seFim(); else { se.i++; seRender(); } };
  $('seFb').scrollIntoView({behavior:'smooth', block:'start'});
}
function seFim(){
  var c = se.reg.filter(function(x){return x.res===1;}).length;
  var e = se.reg.filter(function(x){return x.res===-1;}).length;
  var b = se.reg.filter(function(x){return x.res===0;}).length;
  var saldo = c-e, idx = saldo/se.reg.length;

  S.hist = S.hist.concat(se.reg);
  S.sessoes.push({d:hoje(), p:se.pid, n:se.reg.length, c:c, e:e, b:b, saldo:saldo, idx:idx});
  Object.keys(se.passosTocados).forEach(function(p){
    atualizaRevisao(p, se.passosTocados[p].e > 0); });
  var ok = salva();

  var ciladas = {};
  se.reg.forEach(function(x){ if (x.res === -1) ciladas[x.mec] = (ciladas[x.mec]||0)+1; });
  var lista = Object.keys(ciladas).sort(function(a,z){ return ciladas[z]-ciladas[a]; });
  var P = perfil(), o = P.passo[se.pid], st = estadoPasso(se.pid, P);
  var faltam = Math.max(0, ACEITAVEL_N - o.resp);

  var veredito = st === 'aceitavel' || st === 'consolidado'
    ? 'Este passo atingiu o nível aceitável: índice ' + fmt(o.idx) + ' em ' + o.resp + ' questões. Sai da fila de prioridade.'
    : faltam > 0
      ? 'Faltam ' + faltam + ' questão(ões) neste passo para ele poder ser avaliado. Índice atual: ' + fmt(o.idx) + '.'
      : 'Índice de ' + fmt(o.idx) + ' em ' + o.resp + ' questões — abaixo de 0,60. O passo continua no topo da fila e volta amanhã.';

  $('seProva').classList.add('hide');
  var fim = $('seFim'); fim.classList.remove('hide');
  fim.innerHTML = '<div class="card"><h3>Fechamento</h3>'
    + '<div class="hero ' + (saldo>0?'pos':saldo<0?'neg':'zero') + '">' + (saldo>0?'+':'') + saldo + '</div>'
    + '<p class="note">Saldo líquido da sessão · índice ' + fmt(idx) + ' · ' + c + 'C ' + e + 'E ' + b + 'B</p>'
    + '<h3>Ciladas que pegaram</h3>'
    + (lista.length ? '<ul class="lista">' + lista.map(function(m){
        return '<li>' + MECD[m] + ' — ' + ciladas[m] + (ciladas[m]>1?' vezes':' vez') + '</li>'; }).join('') + '</ul>'
      : '<p class="note">Nenhuma.' + (b ? ' Os brancos não são cilada: são lacuna de conteúdo.' : '') + '</p>')
    + '<h3>Nível do passo</h3><p>' + veredito + '</p>'
    + '<h3>Revisão espaçada</h3><p class="note">' + Object.keys(se.passosTocados).map(function(p){
        var r = S.revisao[p];
        return esc(PAS[p].t) + ': ' + (r ? 'volta em ' + br(r.prox) + ' (' + INTERVALOS[r.nivel] + ' dias)'
          : 'fora da fila'); }).join('<br>') + '</p>'
    + (ok ? '' : '<p class="flag">⚠ Não foi possível gravar neste navegador. Exporte o histórico em Dados antes de fechar.</p>')
    + '<hr class="rule"><div class="btns row">'
    + '<button class="b primary" id="seRepete">Martelar mais questões deste passo</button>'
    + '<button class="b" id="sePassos">Ver o passo estratégico</button>'
    + '<button class="b" id="seVolta">Painel</button></div></div>';
  se.ativa = false;
  $('seRepete').onclick = function(){ iniciaSessao(se.pid); };
  $('sePassos').onclick = function(){ ir('passos'); };
  $('seVolta').onclick = function(){ ir('painel'); };
  window.scrollTo(0,0);
}

/* ---------- simulado ---------- */
var si = null;
function proximoId(){ var n = 0;
  S.simulados.forEach(function(x){ var m = /^S(\d+)$/.exec(x.id); if (m) n = Math.max(n, +m[1]); });
  return 'S' + String(n+1).padStart(2,'0'); }
/* Cotas fixas pelos pesos da prova, mais 3 itens de rodizio entre os blocos
   de Direito, escolhidos pela prioridade do momento. */
function cotasSimulado(){
  var cota = {};
  MATERIAS.forEach(function(m){ if (m.sim30) cota[m.k] = m.sim30; });
  var F = fila(), dir = [];
  F.forEach(function(x){ x.mats.forEach(function(m){
    if (MAT[m].rodizio && dir.indexOf(m) < 0) dir.push(m); }); });
  for (var i = 0; i < 3; i++){ var k = dir[i % dir.length]; cota[k] = (cota[k]||0) + 1; }
  return cota;
}
function simuladoInicio(){
  si = null;
  $('siInicio').classList.remove('hide'); $('siProva').classList.add('hide');
  $('siConf').classList.add('hide'); $('siRes').classList.add('hide');
  var id = proximoId(), marco = !S.simulados.length, cota = cotasSimulado();
  $('siTit').textContent = 'Simulado ' + id + (marco ? ' — marco zero' : '');
  $('siSub').textContent = marco
    ? 'O primeiro não mede progresso: ele cria a régua contra a qual todo o resto será medido.'
    : 'Mesma calibragem do anterior. É isso que torna a comparação legítima.';
  $('siDist').innerHTML = MATK.filter(function(k){ return cota[k]; }).map(function(k){
    return '<div class="kv"><span>' + MAT[k].d + '<br><span class="note">' + MAT[k].itens
      + ' itens na prova</span></span><b>' + cota[k] + '</b></div>'; }).join('');
  $('siGo').onclick = iniciaSimulado;
  $('siHist').innerHTML = !S.simulados.length ? '<h3>Histórico</h3><p class="note">Nenhum simulado ainda.</p>'
    : '<h3>Simulados anteriores</h3>' + S.simulados.slice().reverse().map(function(x){
        return '<div class="kv"><span>' + x.id + ' · ' + br(x.d) + '<br><span class="note">'
          + x.c + 'C ' + x.e + 'E ' + x.b + 'B</span></span><b>' + fmt(x.idx) + '</b></div>'; }).join('');
}
function iniciaSimulado(){
  var cota = cotasSimulado(), qs = [], total = 0;
  MATK.forEach(function(k){ total += cota[k] || 0; });
  var cel = {_n: total, _alvo: Math.round(total * 0.45), _c: 0, _e: 0};
  // celula compartilhada entre as materias: o equilibrio formato x gabarito
  // precisa valer para os 30 itens, nao para cada bloco isoladamente
  MATK.forEach(function(k){ if (cota[k])
    qs = qs.concat(montar(BANCO.filter(function(q){ return q.m === k; }), cota[k], cel)); });
  if (qs.length < 30){
    var jah = {}; qs.forEach(function(q){ jah[q.id]=1; });
    qs = qs.concat(montar(BANCO.filter(function(q){ return !jah[q.id]; }), 30 - qs.length, cel));
  }
  si = {id:proximoId(), qs:embaralha(qs), i:0, resp:new Array(qs.length).fill(null),
        t0:Date.now(), el:0, tick:null};
  si.tick = setInterval(function(){ si.el = Math.floor((Date.now()-si.t0)/1000);
    $('siClock').textContent = hhmmss(si.el); }, 1000);
  $('siInicio').classList.add('hide'); $('siProva').classList.remove('hide'); siRender();
}
function siRender(){
  var q = si.qs[si.i];
  $('siPos').textContent = (si.i+1) + ' / ' + si.qs.length;
  $('siMat').textContent = MAT[q.m].d;
  $('siBar').style.width = (si.i/si.qs.length*100) + '%';
  $('siEnun').textContent = q.t;
  $('siPrev').disabled = si.i === 0;
  $('siBtns').querySelectorAll('button').forEach(function(b){
    b.classList.toggle('sel', si.resp[si.i] === b.dataset.r); });
  window.scrollTo(0,0);
}
$('siBtns').querySelectorAll('button').forEach(function(b){
  b.onclick = function(){ si.resp[si.i] = b.dataset.r;
    if (si.i < si.qs.length-1){ si.i++; siRender(); } else siConfirma(); }; });
$('siPrev').onclick = function(){ if (si.i>0){ si.i--; siRender(); } };
$('siVolta').onclick = function(){ si.i = si.qs.length-1;
  $('siConf').classList.add('hide'); $('siProva').classList.remove('hide'); siRender(); };
$('siFin').onclick = function(){ if (si.tick) clearInterval(si.tick); siResultado(); };
function siConfirma(){
  var nb = si.resp.filter(function(r){ return r === 'B' || r === null; }).length;
  $('siConfTxt').textContent = 'Respondidas: ' + (si.qs.length-nb) + ' · em branco: ' + nb
    + ' · tempo: ' + hhmmss(si.el) + '. Depois de finalizar o gabarito é liberado e nada mais muda.';
  $('siProva').classList.add('hide'); $('siConf').classList.remove('hide'); window.scrollTo(0,0);
}
function siResultado(){
  var tot = {c:0,e:0,b:0}, mat = {}, reg = [], tocados = {};
  MATK.forEach(function(k){ mat[k] = {total:0,c:0,e:0,b:0}; });
  si.qs.forEach(function(q,k){
    var r = si.resp[k] === null ? 'B' : si.resp[k];
    var res = r === 'B' ? 0 : (r === q.g ? 1 : -1);
    var kk = res===1?'c':res===-1?'e':'b';
    tot[kk]++; mat[q.m][kk]++; mat[q.m].total++;
    q._r = r; q._res = res;
    tocados[q.p] = tocados[q.p] || {e:0}; if (res === -1) tocados[q.p].e++;
    reg.push({d:hoje(), o:'simulado', sid:si.id, q:q.id, m:q.m, a:q.a, p:q.p, mec:q.mec, g:q.g, r:r, res:res});
  });
  var saldo = tot.c - tot.e, idx = saldo/si.qs.length;
  var pm = {}; MATK.forEach(function(k){ var o = mat[k];
    pm[k] = {total:o.total,c:o.c,e:o.e,b:o.b,idx:o.total?(o.c-o.e)/o.total:0}; });
  var ant = S.simulados.length ? S.simulados[S.simulados.length-1] : null;

  S.hist = S.hist.concat(reg);
  S.simulados.push({id:si.id, d:hoje(), n:si.qs.length, tempo:hhmmss(si.el),
    c:tot.c, e:tot.e, b:tot.b, saldo:saldo, idx:idx, mat:pm});
  Object.keys(tocados).forEach(function(p){ atualizaRevisao(p, tocados[p].e > 0); });
  var ok = salva();

  var P = perfil(), pr = projecao(P), dif = pr.pts - CORTE_PONTOS;
  var comp;
  if (!ant){
    comp = '<p class="note">Marco zero — não há simulado anterior, portanto não existe comparação possível. '
      + 'Este resultado é a linha de base.</p>';
  } else {
    var dl = idx - ant.idx;
    comp = '<p>' + (dl <= -0.05
        ? '<strong>O saldo caiu.</strong> Índice de ' + fmt(ant.idx) + ' para ' + fmt(idx) + '.'
        : dl >= 0.25 ? 'Evolução real: de ' + fmt(ant.idx) + ' para ' + fmt(idx) + '.'
        : 'Índice praticamente parado: de ' + fmt(ant.idx) + ' para ' + fmt(idx)
          + '. Variação abaixo de 0,25 é ruído de amostra pequena, não progresso.') + '</p>'
      + MATK.map(function(k){
        var a = ant.mat && ant.mat[k], n = pm[k];
        if (!a || !a.total || !n.total) return '';
        var d = n.idx - a.idx, cls = d>=0.25?'evoluiu':d<=-0.25?'piorou':'estagnou';
        return '<div class="kv"><span>' + MAT[k].d + '<br><span class="note">' + fmt(a.idx) + ' → ' + fmt(n.idx)
          + '</span></span><b style="color:' + (cls==='evoluiu'?'var(--good)':cls==='piorou'?'var(--crit)':'var(--muted)')
          + '">' + cls + '</b></div>'; }).join('');
  }
  var rev = si.qs.map(function(q,k){
    var tg = q._res===1?'<span class="tag ok">+1</span>':q._res===-1?'<span class="tag no">−1</span>':'<span class="tag br">0</span>';
    return '<div class="item"><div class="head"><span class="num">' + String(k+1).padStart(2,'0') + '</span>' + tg
      + '<span class="meta">' + MAT[q.m].d + ' · ' + esc(PAS[q.p].t) + ' · formato: ' + MECD[q.mec] + '</span></div>'
      + '<p class="q">' + esc(q.t) + '</p>'
      + '<p class="exp"><span class="lab">Gabarito: ' + (q.g==='C'?'CERTO':'ERRADO') + ' · você marcou: '
      + (q._r==='C'?'Certo':q._r==='E'?'Errado':'Branco') + '</span>' + esc(q.e) + '</p>'
      + '<p class="cil"><span class="lab">A cilada</span>' + esc(q.c) + '</p>'
      + (q.cf ? '<p class="flag">⚠ Item dependente de norma, não conferido em fonte oficial.</p>' : '')
      + '</div>'; }).join('');

  $('siConf').classList.add('hide');
  var box = $('siRes'); box.classList.remove('hide');
  box.innerHTML = '<div class="card"><span class="pill">' + si.id + (ant?'':' · marco zero') + '</span>'
    + '<h3 style="margin-top:18px">Índice líquido</h3>'
    + '<div class="hero ' + (idx>=0?'pos':'neg') + '">' + fmt(idx) + '</div>'
    + '<div class="stats">'
    + '<div class="stat"><div class="k">Saldo</div><div class="v">' + (saldo>0?'+':'') + saldo + '</div></div>'
    + '<div class="stat"><div class="k">Certas</div><div class="v">' + tot.c + '</div></div>'
    + '<div class="stat"><div class="k">Erradas</div><div class="v">' + tot.e + '</div></div>'
    + '<div class="stat"><div class="k">Brancos</div><div class="v">' + tot.b + '</div></div>'
    + '<div class="stat"><div class="k">Tempo</div><div class="v">' + hhmmss(si.el) + '</div></div></div>'
    + '<h2>Distância do corte</h2>'
    + '<div class="hero ' + (dif>=0?'pos':'neg') + '" style="font-size:44px">' + (dif>0?'+':'−') + num(Math.abs(dif)) + '</div>'
    + '<p class="note">Projeção de ' + num(pr.pts) + ' pontos líquidos em 120 itens contra os '
    + CORTE_PONTOS + ' do corte informado de 2025'
    + (pr.parcial ? ', cobrindo ' + num(pr.cob,0) + ' dos 120 itens medidos.' : '.') + '</p>'
    + '<h2>Rendimento por matéria</h2>'
    + barras(MATK.filter(function(k){ return pm[k].total; }).map(function(k){
        return {lbl:MAT[k].d, sub:MAT[k].itens + ' itens na prova', idx:pm[k].idx,
                resp:pm[k].total, c:pm[k].c, e:pm[k].e, b:pm[k].b}; }))
    + '<div class="scale"><div></div><div class="ax"><span>−1</span><span>0</span><span>+1</span></div><div></div></div>'
    + '<h2>Comparação com o simulado anterior</h2>' + comp
    + (ok ? '' : '<p class="flag">⚠ Não foi possível gravar neste navegador.</p>')
    + '<h2>Revisão item a item</h2>' + rev
    + '<hr class="rule"><button class="b primary" id="siVoltaP">Voltar ao painel</button></div>';
  $('siVoltaP').onclick = function(){ ir('painel'); };
  window.scrollTo(0,0);
}

/* ---------- dados ---------- */
function dadosView(){
  $('dVer').textContent = 'Banco com ' + BANCO.length + ' questões em ' + PASSOS.length + ' passos · '
    + S.hist.length + ' respostas · ' + S.sessoes.length + ' sessões · ' + S.simulados.length + ' simulados.';
  var h = '';
  if (S.simulados.length) h += '<h3 style="margin-top:0">Simulados</h3>' + S.simulados.slice().reverse().map(function(x){
    return '<div class="kv"><span>' + x.id + ' · ' + br(x.d) + '</span><b>' + fmt(x.idx) + '</b></div>'; }).join('');
  if (S.sessoes.length) h += '<h3>Sessões</h3>' + S.sessoes.slice().reverse().slice(0,25).map(function(x){
    return '<div class="kv"><span>' + br(x.d) + ' · ' + esc(x.p && PAS[x.p] ? PAS[x.p].t : '—')
      + '</span><b>' + fmt(x.idx) + '</b></div>'; }).join('');
  $('dHist').innerHTML = h || '<p class="note">Nada registrado ainda.</p>';
}
$('dExp').onclick = function(){
  var blob = new Blob([JSON.stringify(S,null,1)], {type:'application/json'});
  var a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = 'pf-agente-backup-' + hoje() + '.json'; a.click();
  setTimeout(function(){ URL.revokeObjectURL(a.href); }, 1000);
};
$('dCopy').onclick = function(){
  var t = JSON.stringify(S), ok = function(){ $('dMsg').textContent = 'Histórico copiado.'; };
  if (navigator.clipboard) navigator.clipboard.writeText(t).then(ok, function(){ $('dTxt').value = t; });
  else $('dTxt').value = t;
};
$('dReset').onclick = function(){
  if (!confirm('Apagar todo o histórico deste aparelho? Não tem como desfazer.')) return;
  S = {v:2, hist:[], sessoes:[], simulados:[], teoria:{}, revisao:{}};
  salva(); dadosView(); painel(); $('dMsg').textContent = 'Histórico apagado.';
};
$('dImp').onclick = function(){
  var t = $('dTxt').value.trim();
  if (!t){ $('dMsg').textContent = 'Nada para importar.'; return; }
  try {
    if (t.charAt(0) === '{'){
      var o = JSON.parse(t);
      if (!o.hist) throw new Error('backup sem histórico');
      if (o.v === 1 || !o.v) migraV1(o);
      else S = {v:2, hist:o.hist||[], sessoes:o.sessoes||[], simulados:o.simulados||[],
                teoria:o.teoria||{}, revisao:o.revisao||{}};
      carregaSanear(); salva();
      $('dMsg').textContent = 'Backup restaurado: ' + S.hist.length + ' respostas.';
    } else {
      var r = importaBloco(t);
      $('dMsg').textContent = 'Simulado ' + r.id + ' importado: ' + r.n + ' itens, índice ' + fmt(r.idx) + '.';
    }
    $('dTxt').value = ''; dadosView(); painel();
  } catch(err){ $('dMsg').textContent = 'Não consegui ler: ' + err.message + '. Nada foi alterado.'; }
};
function carregaSanear(){
  S.hist = S.hist.filter(function(h){ var q = QID[h.q];
    if (q){ h.m=q.m; h.a=q.a; h.p=q.p; h.mec=q.mec; return true; }
    return /^importado:/.test(h.q) && !!PAS[h.p]; });
}
function importaBloco(t){
  var linhas = t.split(/\r?\n/).map(function(x){ return x.trim(); });
  var cab = /^=== PF-AGENTE SIMULADO (S\d+) ===$/.exec(linhas[0]);
  if (!cab) throw new Error('o bloco precisa começar com === PF-AGENTE SIMULADO SNN ===');
  var id = cab[1], campo = {};
  linhas.forEach(function(l){ var m = /^([a-z_]+):\s*(.+)$/.exec(l); if (m) campo[m[1]] = m[2].trim(); });
  var cnt = /certas:\s*(\d+)\s+erradas:\s*(\d+)\s+brancos:\s*(\d+)/.exec(t);
  if (!cnt) throw new Error('não achei a linha de certas/erradas/brancos');
  var c = +cnt[1], e = +cnt[2], b = +cnt[3], n = +campo.questoes;
  if (c+e+b !== n) throw new Error('a soma de certas, erradas e brancos não bate com o total');
  var saldo = c-e;
  if (campo.saldo_liquido !== undefined && +campo.saldo_liquido !== saldo)
    throw new Error('o saldo líquido informado não corresponde a certas menos erradas');
  if (S.simulados.some(function(x){ return x.id === id; })) throw new Error('o simulado ' + id + ' já foi importado');
  // Formato do item: NN|materia|passo|gabarito|resposta|resultado|formato.
  // Blocos antigos (NN|assunto|gab|resp|res|formato) continuam sendo lidos.
  var mapaM = {}, mapaP = {};
  BANCO.forEach(function(q){ mapaM[q.a] = q.m; mapaP[q.a] = q.p; });
  var porTitulo = {}; PASSOS.forEach(function(x){ porTitulo[x.t] = x.id; });
  var sec = null, reg = [], pm = {};
  MATK.forEach(function(k){ pm[k] = {total:0,c:0,e:0,b:0,idx:0}; });
  linhas.forEach(function(l){
    if (/^--- (.+) ---$/.test(l)){ sec = /^--- (.+) ---$/.exec(l)[1]; return; }
    if (sec !== 'itens' || !l || l.charAt(0) === '=') return;
    var p = l.split('|'); if (p.length < 6) return;
    var m, pid, a, g, r, res, mec;
    if (p.length >= 7 && MAT[p[1]]){                 // formato novo
      m = p[1]; pid = porTitulo[p[2]] || null; a = p[2];
      g = p[3]; r = p[4]; res = +p[5]; mec = p[6];
    } else {                                          // formato antigo
      a = p[1]; m = mapaM[a] || (porTitulo[a] ? null : null); pid = mapaP[a] || porTitulo[a];
      g = p[2]; r = p[3]; res = +p[4]; mec = p[5];
    }
    if (!m || !pm[m]) return;
    reg.push({d:campo.data||hoje(), o:'simulado', sid:id, q:'importado:'+id+':'+p[0],
      m:m, a:a, p:pid, mec:mec, g:g, r:r, res:res});
    pm[m].total++; pm[m][res===1?'c':res===-1?'e':'b']++;
  });
  if (reg.length !== n) throw new Error('li ' + reg.length + ' itens, mas o cabeçalho anuncia ' + n);
  MATK.forEach(function(k){ var o = pm[k]; o.idx = o.total ? (o.c-o.e)/o.total : 0; });
  S.hist = S.hist.concat(reg);
  S.simulados.push({id:id, d:campo.data||hoje(), n:n, tempo:campo.tempo||'',
    c:c, e:e, b:b, saldo:saldo, idx:saldo/n, mat:pm});
  S.simulados.sort(function(x,y){ return x.id < y.id ? -1 : 1; });
  salva();
  return {id:id, n:n, idx:saldo/n};
}

/* ---------- boot ---------- */
carrega();
ir('painel');
if ('serviceWorker' in navigator)
  window.addEventListener('load', function(){ navigator.serviceWorker.register('sw.js').catch(function(){}); });
