/* Plataforma de estudo — Agente PF (Cebraspe)
   Regras implementadas: indice liquido como metrica unica, prioridade por
   peso x deficit, anti-repeticao contra o historico, calibragem 60/40 com
   literalidade limpa obrigatoria por bloco. */
'use strict';

var CHAVE = 'pfagente.v1';
var PESOS = {Informatica:.30, Portugues:.20, Contabilidade:.17, RLM:.13, Estatistica:.10, Direito:.10};
var COTA30 = {Informatica:9, Portugues:6, Contabilidade:5, RLM:4, Estatistica:3, Direito:3};
var ORDEM = ['Informatica','Portugues','Contabilidade','RLM','Estatistica','Direito'];
var RANK = {Informatica:0, Portugues:1, Contabilidade:2, RLM:3, Estatistica:4, Direito:5};
var DISP = {Informatica:'Informática', Portugues:'Português', Contabilidade:'Contabilidade',
            RLM:'RLM', Estatistica:'Estatística', Direito:'Direito'};
var MECD = {'troca de rotulos':'troca de rótulos', 'palavra absoluta':'palavra absoluta',
  'premissa-conclusao':'premissa verdadeira, conclusão falsa', 'duas metades':'item de duas metades',
  'numero deslocado':'número verdadeiro deslocado', 'literalidade limpa':'literalidade limpa'};
var INTERVALO_SIMULADO = 20;

/* ---------- utilitarios ---------- */
var $ = function(id){ return document.getElementById(id); };
function esc(s){ return String(s).replace(/[&<>"]/g, function(c){
  return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
function hoje(){ var d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); }
function dias(a, b){ return Math.round((new Date(b+'T00:00:00') - new Date(a+'T00:00:00')) / 864e5); }
function maisDias(d, n){ var x = new Date(d+'T00:00:00'); x.setDate(x.getDate()+n);
  return x.getFullYear() + '-' + String(x.getMonth()+1).padStart(2,'0') + '-' + String(x.getDate()).padStart(2,'0'); }
function br(d){ var p = d.split('-'); return p[2]+'/'+p[1]+'/'+p[0]; }
function fmt(v){ return (v>0?'+':v<0?'−':'') + Math.abs(v).toFixed(2).replace('.',','); }
function hhmmss(s){ var h=Math.floor(s/3600), m=Math.floor(s%3600/60), x=s%60, p=function(n){return String(n).padStart(2,'0');};
  return (h>0 ? p(h)+':' : '') + p(m)+':'+p(x); }
function embaralha(a){ a = a.slice();
  for (var i=a.length-1; i>0; i--){ var j = Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; }
  return a; }

/* ---------- estado ---------- */
var S = {v:1, hist:[], sessoes:[], simulados:[]};
function carrega(){
  try {
    var raw = localStorage.getItem(CHAVE);
    if (raw){ var o = JSON.parse(raw);
      S = {v:1, hist:o.hist||[], sessoes:o.sessoes||[], simulados:o.simulados||[]}; }
  } catch(e){ /* navegacao privada, storage bloqueado: segue em memoria */ }
}
function salva(){
  try { localStorage.setItem(CHAVE, JSON.stringify(S)); return true; }
  catch(e){ return false; }
}

/* ---------- perfil, derivado sempre do historico ---------- */
function perfil(){
  var ass = {}, mat = {}, ger = {resp:0,c:0,e:0,b:0};
  ORDEM.forEach(function(m){ mat[m] = {resp:0,c:0,e:0,b:0}; });
  BANCO.forEach(function(q){ if(!ass[q.a]) ass[q.a] = {m:q.m,resp:0,c:0,e:0,b:0,ultima:null,mec:{}}; });
  S.hist.forEach(function(h){
    var a = ass[h.a] || (ass[h.a] = {m:h.m,resp:0,c:0,e:0,b:0,ultima:null,mec:{}});
    a.resp++; ger.resp++;
    if (mat[h.m]) mat[h.m].resp++;
    var k = h.res === 1 ? 'c' : h.res === -1 ? 'e' : 'b';
    a[k]++; ger[k]++; if (mat[h.m]) mat[h.m][k]++;
    if (h.res === -1 && h.mec) a.mec[h.mec] = (a.mec[h.mec]||0) + 1;
    if (!a.ultima || h.d > a.ultima) a.ultima = h.d;
  });
  var idx = function(o){ return o.resp ? (o.c - o.e) / o.resp : 0; };
  Object.keys(ass).forEach(function(k){ ass[k].idx = idx(ass[k]); });
  ORDEM.forEach(function(m){ mat[m].idx = idx(mat[m]); });
  ger.idx = idx(ger); ger.saldo = ger.c - ger.e;
  return {ass:ass, mat:mat, ger:ger};
}
function status(a){
  if (!a.resp) return ' ';
  if (a.idx >= .60 && a.resp >= 8) return 'x';
  return '~';
}
function ultimaSessao(){ return S.sessoes.length ? S.sessoes[S.sessoes.length-1].d : null; }

/* ---------- fila de prioridade ---------- */
/* Rodizio entre materias. Sem ele, a materia de maior peso monopoliza a fila:
   todo assunto nunca tocado entra com o mesmo deficit 0,9, entao o peso decide
   sozinho e Informatica consumiria seus 26 assuntos antes de Portugues comecar.
   O fator abaixo penaliza quem ja ocupou mais sessoes recentes do que o proprio
   peso justifica, e nunca premia ninguem: so freia o excesso. */
function rodizio(){
  var rec = S.sessoes.slice(-10), share = {}, f = {};
  var mat = {}; BANCO.forEach(function(q){ mat[q.a] = q.m; });
  rec.forEach(function(x){ var m = mat[x.a]; if (m) share[m] = (share[m]||0) + 1; });
  ORDEM.forEach(function(m){
    var cota = PESOS[m] * rec.length;
    f[m] = rec.length ? Math.min(1, (cota + 1) / ((share[m]||0) + 1)) : 1;
  });
  return f;
}
function fila(){
  var P = perfil(), ult = ultimaSessao(), hj = hoje(), vs = vistos(), rod = rodizio();
  var sobra = {};
  BANCO.forEach(function(q){ if (!vs[q.id]) sobra[q.a] = (sobra[q.a]||0) + 1; });
  var f = Object.keys(P.ass).map(function(a){
    var o = P.ass[a];
    var deficit = o.resp === 0 ? 0.9 : (1 - o.idx) / 2;
    var score = PESOS[o.m] * deficit;
    // indice negativo na ultima sessao: revisao imediata, enquanto o erro esta quente
    var urgente = o.idx < 0 && o.ultima === ult && ult !== null;
    if (urgente) score *= 1.5;
    // indice positivo e visto ha menos de 3 dias: espera
    if (o.idx > 0 && o.ultima && dias(o.ultima, hj) < 3) score *= 0.25;
    score *= rod[o.m];
    // assunto sem questao inedita no banco cai para o fim da fila
    if (!sobra[a]) score *= 0.1;
    return {a:a, m:o.m, idx:o.idx, resp:o.resp, score:score, urgente:urgente,
            st:status(o), sobra:sobra[a]||0};
  });
  // Empate no score: vence o assunto com mais questoes ineditas, para a sessao
  // caber inteira em um assunto so em vez de se espalhar pela materia.
  f.sort(function(x,y){ return (y.score - x.score) || (RANK[x.m] - RANK[y.m])
    || (y.sobra - x.sobra) || (x.a < y.a ? -1 : 1); });
  return f;
}

/* ---------- selecao de questoes ---------- */
function vistos(){ var v = {}; S.hist.forEach(function(h){ v[h.q] = h.d; }); return v; }

/* Monta bloco com ~60% de gabaritos Errado e ao menos um item de literalidade limpa. */
function montar(pool, n){
  var vs = vistos();
  var ined = embaralha(pool.filter(function(q){ return !vs[q.id]; }));
  var rev  = embaralha(pool.filter(function(q){ return vs[q.id]; }))
               .sort(function(a,b){ return vs[a.id] < vs[b.id] ? -1 : 1; });
  var cand = ined.concat(rev);
  if (!cand.length) return [];
  var alvoE = Math.round(n * 0.6), alvoC = n - alvoE;
  var out = [], usados = {};
  var pega = function(filtro, quanto){
    for (var i = 0; i < cand.length && quanto > 0; i++){
      var q = cand[i];
      if (usados[q.id] || !filtro(q)) continue;
      usados[q.id] = 1; out.push(q); quanto--;
    }
    return quanto;
  };
  // garante a literalidade limpa antes de qualquer outra coisa
  pega(function(q){ return q.mec === 'literalidade limpa'; }, 1);
  var faltaC = alvoC - out.filter(function(q){ return q.g === 'C'; }).length;
  var faltaE = alvoE - out.filter(function(q){ return q.g === 'E'; }).length;
  if (faltaE > 0) faltaE = pega(function(q){ return q.g === 'E'; }, faltaE);
  if (faltaC > 0) faltaC = pega(function(q){ return q.g === 'C'; }, faltaC);
  pega(function(){ return true; }, n - out.length);          // completa com o que houver
  out = out.map(function(q){
    var copia = {}; for (var k in q) copia[k] = q[k];
    copia._rev = !!vs[q.id]; return copia;
  });
  return embaralha(out).slice(0, n);
}

function poolAssunto(a){ return BANCO.filter(function(q){ return q.a === a; }); }
function poolMateria(m){ return BANCO.filter(function(q){ return q.m === m; }); }

/* O banco tem mais assuntos que questoes por assunto, entao poucos assuntos
   sustentam 8 itens sozinhos. Quando o assunto do dia nao completa o bloco, o
   resto vem dos proximos assuntos da mesma materia NA ORDEM DA FILA — e a tela
   diz quais assuntos entraram, para nao fingir foco que nao houve. */
function selecionaSessao(assunto){
  var q = montar(poolAssunto(assunto), 8);
  if (q.length < 8){
    var m = (BANCO.find(function(x){ return x.a === assunto; }) || {}).m;
    var jah = {}; q.forEach(function(x){ jah[x.id] = 1; });
    var proximos = fila().filter(function(x){ return x.m === m && x.a !== assunto; });
    // esgotada a materia, continua pela fila geral em vez de repetir questao
    proximos = proximos.concat(fila().filter(function(x){ return x.m !== m; }));
    for (var i = 0; i < proximos.length && q.length < 8; i++){
      var extra = montar(poolAssunto(proximos[i].a).filter(function(x){ return !jah[x.id]; }), 8 - q.length);
      extra.forEach(function(x){ jah[x.id] = 1; });
      q = q.concat(extra);
    }
  }
  return q;
}

function selecionaSimulado(){
  var out = [];
  ORDEM.forEach(function(m){ out = out.concat(montar(poolMateria(m), COTA30[m])); });
  return out;
}

/* ---------- barras divergentes ---------- */
function barras(linhas){
  return linhas.map(function(L){
    if (!L.resp){
      return '<div class="row" title="' + esc(L.lbl) + ' — sem medição">'
           + '<div class="lbl">' + esc(L.lbl) + '</div>'
           + '<div class="track"><div class="zero"></div></div>'
           + '<div class="val nd">sem<br>medição</div></div>';
    }
    var neg = L.idx < 0, w = Math.abs(L.idx) * 50;
    var tip = L.lbl + ' — ' + L.resp + ' respondidas · ' + L.c + 'C ' + L.e + 'E ' + L.b + 'B · índice ' + fmt(L.idx);
    return '<div class="row" title="' + esc(tip) + '">'
         + '<div class="lbl">' + esc(L.lbl) + '</div>'
         + '<div class="track"><div class="fill' + (neg ? ' neg' : '') + '" style="'
         + (neg ? 'right:50%;' : 'left:50%;') + 'width:' + w + '%"></div><div class="zero"></div></div>'
         + '<div class="val" style="color:' + (neg ? 'var(--neg)' : 'var(--pos)') + '">' + fmt(L.idx) + '</div></div>';
  }).join('');
}

/* ---------- navegacao ---------- */
var VIEWS = ['painel','sessao','simulado','dados'];
function ir(v){
  VIEWS.forEach(function(x){ $('v-'+x).classList.toggle('hide', x !== v); });
  document.querySelectorAll('nav button').forEach(function(b){
    b.setAttribute('aria-current', b.dataset.v === v ? 'true' : 'false'); });
  if (v === 'painel') painel();
  if (v === 'sessao') sessaoInicio();
  if (v === 'simulado') simuladoInicio();
  if (v === 'dados') dadosView();
  window.scrollTo(0,0);
}
document.querySelectorAll('nav button').forEach(function(b){ b.onclick = function(){ ir(b.dataset.v); }; });

$('tema').onclick = function(){
  var atual = document.documentElement.getAttribute('data-theme');
  var novo = atual === 'dark' ? 'light' : atual === 'light' ? 'dark'
           : (matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', novo);
  try { localStorage.setItem('pfagente.tema', novo); } catch(e){}
};
try { var tm = localStorage.getItem('pfagente.tema'); if (tm) document.documentElement.setAttribute('data-theme', tm); } catch(e){}

/* ---------- painel ---------- */
function proximoSimulado(){
  if (!S.simulados.length) return null;
  return maisDias(S.simulados[S.simulados.length-1].d, INTERVALO_SIMULADO);
}
function painel(){
  var P = perfil(), F = fila(), hj = hoje(), ult = ultimaSessao();
  var d = ult ? dias(ult, hj) : null;

  // alerta de ausencia vem antes de tudo
  var al = $('pnAlerta');
  if (d !== null && d >= 7){
    var esfriou = F.filter(function(x){ return x.st === '~'; }).length;
    al.hidden = false;
    al.innerHTML = '<span class="pill alert">' + d + ' dias sem estudar</span>'
      + '<p style="margin-top:14px">Você parou há <strong>' + d + ' dias</strong>. '
      + (esfriou ? 'Tem <strong>' + esfriou + ' assunto(s)</strong> em andamento esfriando — assunto interrompido e não revisto volta ao zero prático em poucas semanas. ' : '')
      + 'Não tem conversa sobre isso: abra a sessão de hoje.</p>';
  } else { al.hidden = true; }

  // a unica coisa de hoje
  var prox = proximoSimulado(), alvo = F[0];
  var tarefa, motivo, acao;
  if (!S.simulados.length){
    tarefa = 'Fazer o simulado marco zero';
    motivo = 'Sem linha de base não existe evolução, só sensação. 30 itens, cerca de 45 minutos, uma vez só.';
    acao = 'simulado';
  } else if (prox && dias(prox, hj) >= 0){
    tarefa = 'Simulado de etapa';
    motivo = 'Venceu em ' + br(prox) + '. Mesma calibragem do anterior — é o que torna a comparação legítima.';
    acao = 'simulado';
  } else if (alvo){
    tarefa = alvo.a;
    var pct = Math.round(PESOS[alvo.m]*100);
    motivo = DISP[alvo.m] + ' vale ' + pct + '% da prova e '
      + (alvo.resp === 0 ? 'você nunca respondeu uma questão deste assunto'
        : 'seu índice aqui é ' + fmt(alvo.idx) + (alvo.idx < 0 ? ' — na prova de hoje ele subtrai ponto' : ''))
      + '. 8 questões, 20 a 30 minutos.';
    acao = 'sessao';
  } else { tarefa = 'Sessão do dia'; motivo = ''; acao = 'sessao'; }
  $('pnTarefa').textContent = tarefa;
  $('pnMotivo').textContent = motivo;
  $('pnAcao').textContent = acao === 'simulado' ? 'Abrir o simulado' : 'Começar a sessão';
  $('pnAcao').onclick = function(){ ir(acao); };

  // indice geral
  var h = $('pnIdx');
  if (!P.ger.resp){ h.textContent = 'sem medição'; h.className = 'hero zero';
    $('pnIdxTxt').textContent = 'Nenhuma questão respondida ainda. Zero é um resultado; ausência de dado não é.';
  } else {
    h.textContent = fmt(P.ger.idx);
    h.className = 'hero ' + (P.ger.idx >= 0 ? 'pos' : 'neg');
    $('pnIdxTxt').textContent = P.ger.idx < 0 ? 'Negativo: você está errando mais do que acertando. Na prova, isso subtrai pontos.'
      : P.ger.idx < .30 ? 'Entre 0 e 0,30: não sustenta. É o território do chute com verniz.'
      : P.ger.idx < .60 ? 'Entre 0,30 e 0,60: em construção.' : 'Acima de 0,60: consolidado.';
  }
  $('pnResp').textContent = P.ger.resp;
  $('pnSaldo').textContent = (P.ger.saldo > 0 ? '+' : '') + P.ger.saldo;
  $('pnSes').textContent = S.sessoes.length;
  $('pnSim').textContent = S.simulados.length;

  $('pnBars').innerHTML = barras(ORDEM.map(function(m){
    var o = P.mat[m]; return {lbl:DISP[m], idx:o.idx, resp:o.resp, c:o.c, e:o.e, b:o.b}; }));
  $('pnTab').innerHTML = ORDEM.map(function(m){
    var o = P.mat[m];
    return '<tr><td>' + DISP[m] + '</td><td>' + Math.round(PESOS[m]*100) + '%</td><td>' + o.resp
      + '</td><td>' + o.c + '</td><td>' + o.e + '</td><td>' + o.b + '</td><td>'
      + (o.resp ? fmt(o.idx) : '—') + '</td></tr>';
  }).join('');

  $('pnFila').innerHTML = F.slice(0,5).map(function(x, i){
    return '<div class="kv"><span>' + (i+1) + '. ' + esc(x.a)
      + '<br><span class="note">' + DISP[x.m] + ' · '
      + (x.resp ? x.resp + ' respondidas · índice ' + fmt(x.idx) : 'nunca tocado')
      + (x.urgente ? ' · <strong>revisão imediata</strong>' : '') + '</span></span>'
      + '<b>' + x.score.toFixed(3).replace('.',',') + '</b></div>';
  }).join('');

  var cob = ORDEM.map(function(m){
    var da = F.filter(function(x){ return x.m === m; });
    var n = function(st){ return da.filter(function(x){ return x.st === st; }).length; };
    return '<div class="kv"><span>' + DISP[m] + '</span><b>' + n('x') + ' [x] · ' + n('~') + ' [~] · ' + n(' ') + ' [ ]</b></div>';
  }).join('');
  $('pnCob').innerHTML = cob;
  $('pnBanco').textContent = 'Banco atual: ' + BANCO.length + ' questões em '
    + Object.keys(perfil().ass).length + ' assuntos. Questões já vistas só voltam quando o banco do assunto se esgota.';

  $('pnProx').innerHTML = !S.simulados.length
    ? '<p class="note">Nenhum simulado registrado. O primeiro é o marco zero.</p>'
    : '<div class="kv"><span>' + br(prox) + '</span><b>'
      + (dias(prox, hj) >= 0 ? 'vencido' : Math.abs(dias(prox, hj)) + ' dias') + '</b></div>'
      + '<p class="note">Intervalo de ' + INTERVALO_SIMULADO + ' dias, mesma distribuição e mesma calibragem. '
      + 'Mudar o formato entre simulados quebra a comparação: a variação passa a medir a prova, não você.</p>';
}

/* ---------- sessao ---------- */
var se = null;
function sessaoInicio(){
  se = null;
  $('seInicio').classList.remove('hide'); $('seProva').classList.add('hide'); $('seFim').classList.add('hide');
  var F = fila(), alvo = F[0];
  $('seEscolha').innerHTML = '<div class="kv"><span>Assunto de hoje<br><strong>' + esc(alvo.a) + '</strong>'
    + '<br><span class="note">' + DISP[alvo.m] + ' · peso ' + Math.round(PESOS[alvo.m]*100) + '% · '
    + (alvo.resp ? alvo.resp + ' respondidas · índice ' + fmt(alvo.idx) : 'nunca tocado')
    + (alvo.sobra < 8 ? ' · o banco tem ' + alvo.sobra + ' questão(ões) inédita(s) neste assunto, '
      + 'então o bloco se completa com os próximos assuntos de ' + DISP[alvo.m] + ' na fila' : '')
    + '</span></span></div>';
  $('seGo').onclick = function(){ iniciaSessao(alvo.a); };
  $('seMat').innerHTML = ORDEM.map(function(m){
    return '<button class="b" data-m="' + m + '">' + DISP[m] + '</button>'; }).join('');
  $('seMat').querySelectorAll('button').forEach(function(b){
    b.onclick = function(){
      var m = b.dataset.m, cand = fila().filter(function(x){ return x.m === m; })[0];
      if (m !== alvo.m){
        alert('Anotado, mas registro a discordância uma vez: ' + alvo.a + ' ('
          + DISP[alvo.m] + ') estava na frente por ' + (fila()[0].score).toFixed(3).replace('.',',')
          + ' contra ' + cand.score.toFixed(3).replace('.',',') + '. Você decide.');
      }
      iniciaSessao(cand.a);
    };
  });
}
function iniciaSessao(assunto){
  var qs = selecionaSessao(assunto);
  if (!qs.length){ alert('Não há questões deste assunto no banco.'); return; }
  se = {assunto:assunto, qs:qs, i:0, resp:[], reg:[],
        assuntos: qs.map(function(q){ return q.a; }).filter(function(a,i,arr){ return arr.indexOf(a) === i; })};
  $('seInicio').classList.add('hide'); $('seProva').classList.remove('hide'); $('seFim').classList.add('hide');
  seRender();
}
function seRender(){
  var q = se.qs[se.i];
  $('sePos').textContent = 'Questão ' + (se.i+1) + ' de ' + se.qs.length;
  $('seAss').textContent = DISP[q.m] + (q._rev ? ' · revisão' : '');
  $('sePos').title = q.a;
  $('seBar').style.width = (se.i / se.qs.length * 100) + '%';
  $('seEnun').textContent = q.t;
  $('seBtns').classList.remove('hide');
  $('seFb').innerHTML = '';
  window.scrollTo(0,0);
}
$('seBtns').querySelectorAll('button').forEach(function(b){
  b.onclick = function(){ seResponde(b.dataset.r); };
});
function seResponde(r){
  var q = se.qs[se.i];
  var res = r === 'B' ? 0 : (r === q.g ? 1 : -1);
  se.resp.push(r);
  se.reg.push({d:hoje(), o:'sessao', q:q.id, m:q.m, a:q.a, mec:q.mec, g:q.g, r:r, res:res});
  $('seBtns').classList.add('hide');
  var cls = res === 1 ? 'ok' : res === -1 ? 'no' : '';
  var marca = res === 1 ? '+1' : res === -1 ? '−1' : '0';
  $('seFb').innerHTML = '<div class="fb ' + cls + '">'
    + '<div class="res"><span>' + (res === 1 ? 'Acertou' : res === -1 ? 'Errou' : 'Em branco') + ' ' + marca + '</span>'
    + '<span class="neutro">Gabarito: ' + (q.g === 'C' ? 'CERTO' : 'ERRADO')
    + ' · você: ' + (r === 'C' ? 'Certo' : r === 'E' ? 'Errado' : 'Branco') + '</span></div>'
    + '<p class="exp"><span class="lab">Por quê</span>' + esc(q.e) + '</p>'
    + '<p class="cil"><span class="lab">A cilada · ' + MECD[q.mec] + '</span>' + esc(q.c) + '</p>'
    + (q.cf ? '<p class="flag">⚠ Item dependente de norma, gerado sem consulta à fonte oficial. Confira no texto legal antes de fixar.</p>' : '')
    + '<button class="b primary" id="seNext" style="margin-top:16px">'
    + (se.i === se.qs.length-1 ? 'Ver o fechamento' : 'Próxima questão') + '</button></div>';
  $('seNext').onclick = function(){
    if (se.i === se.qs.length-1) seFim(); else { se.i++; seRender(); }
  };
  $('seFb').scrollIntoView({behavior:'smooth', block:'start'});
}
function seFim(){
  var c = se.reg.filter(function(x){ return x.res === 1; }).length;
  var e = se.reg.filter(function(x){ return x.res === -1; }).length;
  var b = se.reg.filter(function(x){ return x.res === 0; }).length;
  var saldo = c - e, idx = saldo / se.reg.length;

  S.hist = S.hist.concat(se.reg);
  S.sessoes.push({d:hoje(), a:se.assunto, n:se.reg.length, c:c, e:e, b:b, saldo:saldo, idx:idx});
  var ok = salva();

  var ciladas = {};
  se.reg.forEach(function(x){ if (x.res === -1) ciladas[x.mec] = (ciladas[x.mec]||0)+1; });
  var lista = Object.keys(ciladas).sort(function(a,z){ return ciladas[z]-ciladas[a]; });
  var P = perfil(), ap = P.ass[se.assunto] || {idx:idx, resp:se.reg.length};

  var porAss = {};
  se.reg.forEach(function(x){ if (x.res !== 1) porAss[x.a] = (porAss[x.a]||0) + 1; });
  var pior = Object.keys(porAss).sort(function(a,z){ return porAss[z]-porAss[a]; })[0] || se.assunto;

  var frase;
  if (e === 0 && b === 0) frase = 'Nada a revisar neste assunto hoje. Ele sobe na fila só daqui a três dias.';
  else if (lista.length) frase = 'Revise ' + esc(pior) + ' olhando especificamente para '
    + MECD[lista[0]] + ' — foi o mecanismo que mais te pegou, e ele vai voltar.';
  else frase = 'Sem erro, mas ' + b + ' em branco: o buraco é de conteúdo, não de atenção. Revise ' + esc(pior) + '.';

  $('seProva').classList.add('hide');
  var fim = $('seFim'); fim.classList.remove('hide');
  fim.innerHTML = '<div class="card">'
    + '<h3>Fechamento</h3><div class="hero ' + (saldo>0?'pos':saldo<0?'neg':'zero') + '">'
    + (saldo>0?'+':'') + saldo + '</div>'
    + '<p class="note">Saldo líquido da sessão · índice ' + fmt(idx) + ' · ' + c + 'C ' + e + 'E ' + b + 'B</p>'
    + '<h3>Ciladas que pegaram</h3>'
    + (lista.length ? '<ul class="lista">' + lista.map(function(m){
        return '<li>' + MECD[m] + ' — ' + ciladas[m] + (ciladas[m] > 1 ? ' vezes' : ' vez') + '</li>'; }).join('') + '</ul>'
      : '<p class="note">Nenhuma. ' + (b ? 'Os brancos não são cilada: são lacuna de conteúdo.' : '') + '</p>')
    + '<h3>Revisar</h3><p>' + frase + '</p>'
    + '<p class="note">Índice acumulado de ' + esc(se.assunto) + ': ' + fmt(ap.idx) + ' em ' + ap.resp
    + ' questões · status [' + status(ap) + ']</p>'
    + (se.assuntos.length > 1 ? '<h3>Assuntos deste bloco</h3><p class="note">' 
       + se.assuntos.map(esc).join(' · ') + '</p>' : '')
    + (ok ? '' : '<p class="flag">⚠ Não foi possível gravar neste navegador (armazenamento bloqueado). Exporte o histórico antes de fechar a aba.</p>')
    + '<hr class="rule"><div class="btns row">'
    + '<button class="b primary" id="seVolta">Voltar ao painel</button>'
    + '<button class="b" id="seOutra">Outra sessão</button></div></div>';
  $('seVolta').onclick = function(){ ir('painel'); };
  $('seOutra').onclick = function(){ sessaoInicio(); };
  window.scrollTo(0,0);
}

/* ---------- simulado ---------- */
var si = null;
function proximoId(){
  var n = 0;
  S.simulados.forEach(function(x){ var m = /^S(\d+)$/.exec(x.id); if (m) n = Math.max(n, +m[1]); });
  return 'S' + String(n+1).padStart(2,'0');
}
function simuladoInicio(){
  si = null;
  $('siInicio').classList.remove('hide'); $('siProva').classList.add('hide');
  $('siConf').classList.add('hide'); $('siRes').classList.add('hide');
  var id = proximoId(), marco = !S.simulados.length;
  $('siTit').textContent = 'Simulado ' + id + (marco ? ' — marco zero' : '');
  $('siSub').textContent = marco
    ? 'Este é o primeiro. Ele não mede progresso: ele cria a régua contra a qual todo o resto vai ser medido.'
    : 'Mesma calibragem do anterior. É isso que torna a comparação legítima.';
  $('siGo').onclick = iniciaSimulado;
  $('siHist').innerHTML = !S.simulados.length ? '<h3>Histórico</h3><p class="note">Nenhum simulado ainda.</p>'
    : '<h3>Simulados anteriores</h3>' + S.simulados.slice().reverse().map(function(x){
        return '<div class="kv"><span>' + x.id + ' · ' + br(x.d) + '<br><span class="note">'
          + x.c + 'C ' + x.e + 'E ' + x.b + 'B em ' + x.n + ' itens</span></span><b>' + fmt(x.idx) + '</b></div>';
      }).join('');
}
function iniciaSimulado(){
  var qs = selecionaSimulado();
  si = {id:proximoId(), qs:qs, i:0, resp:new Array(qs.length).fill(null), t0:Date.now(), el:0, tick:null};
  si.tick = setInterval(function(){ si.el = Math.floor((Date.now()-si.t0)/1000); $('siClock').textContent = hhmmss(si.el); }, 1000);
  $('siInicio').classList.add('hide'); $('siProva').classList.remove('hide');
  siRender();
}
function siRender(){
  var q = si.qs[si.i];
  $('siPos').textContent = (si.i+1) + ' / ' + si.qs.length;
  $('siMat').textContent = DISP[q.m];
  $('siBar').style.width = (si.i / si.qs.length * 100) + '%';
  $('siEnun').textContent = q.t;
  $('siPrev').disabled = si.i === 0;
  $('siBtns').querySelectorAll('button').forEach(function(b){
    b.classList.toggle('sel', si.resp[si.i] === b.dataset.r); });
  window.scrollTo(0,0);
}
$('siBtns').querySelectorAll('button').forEach(function(b){
  b.onclick = function(){
    si.resp[si.i] = b.dataset.r;
    if (si.i < si.qs.length-1){ si.i++; siRender(); } else siConfirma();
  };
});
$('siPrev').onclick = function(){ if (si.i > 0){ si.i--; siRender(); } };
$('siVolta').onclick = function(){ si.i = si.qs.length-1; $('siConf').classList.add('hide'); $('siProva').classList.remove('hide'); siRender(); };
$('siFin').onclick = function(){ if (si.tick) clearInterval(si.tick); siResultado(); };
function siConfirma(){
  var nb = si.resp.filter(function(r){ return r === 'B' || r === null; }).length;
  $('siConfTxt').textContent = 'Respondidas: ' + (si.qs.length - nb) + ' · em branco: ' + nb
    + ' · tempo: ' + hhmmss(si.el) + '. Depois de finalizar o gabarito é liberado e nada mais muda.';
  $('siProva').classList.add('hide'); $('siConf').classList.remove('hide');
  window.scrollTo(0,0);
}
function siResultado(){
  var tot = {c:0,e:0,b:0}, mat = {}, reg = [];
  ORDEM.forEach(function(m){ mat[m] = {total:0,c:0,e:0,b:0}; });
  si.qs.forEach(function(q,k){
    var r = si.resp[k] === null ? 'B' : si.resp[k];
    var res = r === 'B' ? 0 : (r === q.g ? 1 : -1);
    var kk = res === 1 ? 'c' : res === -1 ? 'e' : 'b';
    tot[kk]++; mat[q.m][kk]++; mat[q.m].total++;
    q._r = r; q._res = res;
    reg.push({d:hoje(), o:'simulado', sid:si.id, q:q.id, m:q.m, a:q.a, mec:q.mec, g:q.g, r:r, res:res});
  });
  var saldo = tot.c - tot.e, idx = saldo / si.qs.length;
  var pm = {}; ORDEM.forEach(function(m){ var o = mat[m];
    pm[m] = {total:o.total, c:o.c, e:o.e, b:o.b, idx: o.total ? (o.c-o.e)/o.total : 0}; });
  var ant = S.simulados.length ? S.simulados[S.simulados.length-1] : null;

  S.hist = S.hist.concat(reg);
  S.simulados.push({id:si.id, d:hoje(), n:si.qs.length, tempo:hhmmss(si.el),
    c:tot.c, e:tot.e, b:tot.b, saldo:saldo, idx:idx, mat:pm});
  var ok = salva();

  var comp;
  if (!ant){
    comp = '<p class="note">Marco zero — não há simulado anterior, portanto não existe comparação '
      + 'possível. Este resultado é a linha de base. Sem ela, evolução seria só sensação.</p>';
  } else {
    var dl = idx - ant.idx;
    var linhas = ORDEM.map(function(m){
      var a = ant.mat && ant.mat[m], n = pm[m];
      if (!a || !a.total || !n.total) return '<div class="kv"><span>' + DISP[m] + '</span><b class="note">não comparável</b></div>';
      var d = n.idx - a.idx;
      var cls = d >= .25 ? 'evoluiu' : d <= -.25 ? 'piorou' : 'estagnou';
      return '<div class="kv"><span>' + DISP[m] + '<br><span class="note">' + fmt(a.idx) + ' → ' + fmt(n.idx)
        + '</span></span><b style="color:' + (cls === 'evoluiu' ? 'var(--good)' : cls === 'piorou' ? 'var(--crit)' : 'var(--muted)')
        + '">' + cls + '</b></div>';
    }).join('');
    comp = '<p>' + (dl <= -.05 ? '<strong>O saldo caiu.</strong> Índice geral de ' + fmt(ant.idx) + ' para ' + fmt(idx)
          + '. Isso não é oscilação: é o resultado do que foi estudado nos últimos ' + INTERVALO_SIMULADO + ' dias.'
        : dl >= .25 ? 'Evolução real: de ' + fmt(ant.idx) + ' para ' + fmt(idx) + '.'
        : 'Índice praticamente parado: de ' + fmt(ant.idx) + ' para ' + fmt(idx)
          + '. Variação abaixo de 0,25 é ruído de amostra pequena, não progresso.') + '</p>' + linhas
      + '<p class="note">Evolução real exige 0,25 de ganho. Abaixo disso, chamar de progresso é mentir com número.</p>';
  }

  var rev = si.qs.map(function(q,k){
    var tg = q._res === 1 ? '<span class="tag ok">+1</span>' : q._res === -1 ? '<span class="tag no">−1</span>' : '<span class="tag br">0</span>';
    return '<div class="item"><div class="head"><span class="num">' + String(k+1).padStart(2,'0') + '</span>' + tg
      + '<span class="meta">' + DISP[q.m] + ' · ' + esc(q.a) + ' · mecanismo: ' + MECD[q.mec] + '</span></div>'
      + '<p class="q">' + esc(q.t) + '</p>'
      + '<p class="exp"><span class="lab">Gabarito: ' + (q.g === 'C' ? 'CERTO' : 'ERRADO') + ' · você marcou: '
      + (q._r === 'C' ? 'Certo' : q._r === 'E' ? 'Errado' : 'Branco') + '</span>' + esc(q.e) + '</p>'
      + '<p class="cil"><span class="lab">A cilada</span>' + esc(q.c) + '</p>'
      + (q.cf ? '<p class="flag">⚠ Item dependente de norma, gerado sem consulta à fonte oficial. Confira no texto legal antes de fixar.</p>' : '')
      + '</div>';
  }).join('');

  $('siConf').classList.add('hide');
  var box = $('siRes'); box.classList.remove('hide');
  box.innerHTML = '<div class="card"><span class="pill">' + si.id + (ant ? '' : ' · marco zero') + '</span>'
    + '<h3 style="margin-top:18px">Índice líquido</h3>'
    + '<div class="hero ' + (idx >= 0 ? 'pos' : 'neg') + '">' + fmt(idx) + '</div>'
    + '<p class="note">' + (idx < 0 ? 'Negativo. Nesta prova você subtraiu pontos.'
        : idx < .30 ? 'Entre 0 e 0,30: não sustenta.' : idx < .60 ? 'Entre 0,30 e 0,60: em construção.'
        : 'Acima de 0,60: consolidado.') + '</p>'
    + '<div class="stats">'
    + '<div class="stat"><div class="k">Saldo</div><div class="v">' + (saldo>0?'+':'') + saldo + '</div></div>'
    + '<div class="stat"><div class="k">Certas</div><div class="v">' + tot.c + '</div></div>'
    + '<div class="stat"><div class="k">Erradas</div><div class="v">' + tot.e + '</div></div>'
    + '<div class="stat"><div class="k">Brancos</div><div class="v">' + tot.b + '</div></div>'
    + '<div class="stat"><div class="k">Tempo</div><div class="v">' + hhmmss(si.el) + '</div></div></div>'
    + '<h2>Rendimento por matéria</h2>'
    + '<p class="note" style="margin-bottom:12px">A linha central é o zero. À esquerda dela, a matéria subtrai ponto na prova.</p>'
    + barras(ORDEM.map(function(m){ var o = pm[m];
        return {lbl:DISP[m], idx:o.idx, resp:o.total, c:o.c, e:o.e, b:o.b}; }))
    + '<div class="scale"><div></div><div class="ax"><span>−1</span><span>0</span><span>+1</span></div><div></div></div>'
    + '<h2>Comparação com o simulado anterior</h2>' + comp
    + (ok ? '' : '<p class="flag">⚠ Não foi possível gravar neste navegador. Exporte o histórico em Dados antes de fechar.</p>')
    + '<h2>Revisão item a item</h2><p class="note">Agora o gabarito está liberado.</p>' + rev
    + '<hr class="rule"><button class="b primary" id="siVoltaP">Voltar ao painel</button></div>';
  $('siVoltaP').onclick = function(){ ir('painel'); };
  window.scrollTo(0,0);
}

/* ---------- dados ---------- */
function dadosView(){
  $('dVer').textContent = 'Banco com ' + BANCO.length + ' questões · '
    + S.hist.length + ' respostas registradas · ' + S.sessoes.length + ' sessões · '
    + S.simulados.length + ' simulados.';
  var h = '';
  if (S.simulados.length){
    h += '<h3 style="margin-top:0">Simulados</h3>' + S.simulados.slice().reverse().map(function(x){
      return '<div class="kv"><span>' + x.id + ' · ' + br(x.d) + '</span><b>' + fmt(x.idx) + '</b></div>'; }).join('');
  }
  if (S.sessoes.length){
    h += '<h3>Sessões</h3>' + S.sessoes.slice().reverse().slice(0,20).map(function(x){
      return '<div class="kv"><span>' + br(x.d) + ' · ' + esc(x.a) + '</span><b>' + fmt(x.idx) + '</b></div>'; }).join('');
  }
  $('dHist').innerHTML = h || '<p class="note">Nada registrado ainda.</p>';
}
$('dExp').onclick = function(){
  var blob = new Blob([JSON.stringify(S, null, 1)], {type:'application/json'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'pf-agente-backup-' + hoje() + '.json';
  a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); }, 1000);
};
$('dCopy').onclick = function(){
  var txt = JSON.stringify(S);
  var done = function(){ $('dMsg').textContent = 'Histórico copiado.'; };
  if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, function(){ $('dTxt').value = txt; });
  else $('dTxt').value = txt;
};
$('dImpBtn').onclick = function(){ $('dTxt').focus(); $('dMsg').textContent = 'Cole o backup no campo acima e toque em Importar.'; };
$('dReset').onclick = function(){
  if (!confirm('Apagar todo o histórico deste aparelho? Não tem como desfazer.')) return;
  S = {v:1, hist:[], sessoes:[], simulados:[]}; salva(); dadosView(); painel();
  $('dMsg').textContent = 'Histórico apagado.';
};
$('dImp').onclick = function(){
  var t = $('dTxt').value.trim();
  if (!t){ $('dMsg').textContent = 'Nada para importar.'; return; }
  try {
    if (t.charAt(0) === '{'){
      var o = JSON.parse(t);
      if (!o.hist) throw new Error('backup sem histórico');
      S = {v:1, hist:o.hist||[], sessoes:o.sessoes||[], simulados:o.simulados||[]};
      salva(); $('dMsg').textContent = 'Backup restaurado: ' + S.hist.length + ' respostas.';
    } else {
      var r = importaBloco(t);
      $('dMsg').textContent = 'Simulado ' + r.id + ' importado: ' + r.n + ' itens, índice ' + fmt(r.idx) + '.';
    }
    $('dTxt').value = ''; dadosView(); painel();
  } catch(err){ $('dMsg').textContent = 'Não consegui ler: ' + err.message + '. Nada foi alterado.'; }
};
/* Le o bloco monoespacado gerado pelo simulado offline em HTML. */
function importaBloco(t){
  var linhas = t.split(/\r?\n/).map(function(x){ return x.trim(); });
  var cab = /^=== PF-AGENTE SIMULADO (S\d+) ===$/.exec(linhas[0]);
  if (!cab) throw new Error('o bloco precisa começar com === PF-AGENTE SIMULADO SNN ===');
  var id = cab[1], campo = {};
  linhas.forEach(function(l){ var m = /^([a-z_]+):\s*(.+)$/.exec(l); if (m) campo[m[1]] = m[2].trim(); });
  var cnt = /certas:\s*(\d+)\s+erradas:\s*(\d+)\s+brancos:\s*(\d+)/.exec(t);
  if (!cnt) throw new Error('não achei a linha de certas/erradas/brancos');
  var c = +cnt[1], e = +cnt[2], b = +cnt[3], n = +campo.questoes;
  if (c + e + b !== n) throw new Error('a soma de certas, erradas e brancos não bate com o total de questões');
  var saldo = c - e;
  if (campo.saldo_liquido !== undefined && +campo.saldo_liquido !== saldo)
    throw new Error('o saldo líquido informado não corresponde a certas menos erradas');
  if (S.simulados.some(function(x){ return x.id === id; })) throw new Error('o simulado ' + id + ' já foi importado');

  var mapa = {}; BANCO.forEach(function(q){ mapa[q.a] = q.m; });
  var sec = null, reg = [], pm = {};
  ORDEM.forEach(function(m){ pm[m] = {total:0,c:0,e:0,b:0,idx:0}; });
  linhas.forEach(function(l){
    if (/^--- (.+) ---$/.test(l)){ sec = /^--- (.+) ---$/.exec(l)[1]; return; }
    if (sec !== 'itens' || !l || l.charAt(0) === '=') return;
    var p = l.split('|'); if (p.length < 6) return;
    var a = p[1], m = mapa[a];
    if (!m) return;
    var res = +p[4];
    reg.push({d:campo.data || hoje(), o:'simulado', sid:id, q:'importado:'+id+':'+p[0],
      m:m, a:a, mec:p[5], g:p[2], r:p[3], res:res});
    pm[m].total++; pm[m][res === 1 ? 'c' : res === -1 ? 'e' : 'b']++;
  });
  if (reg.length !== n) throw new Error('li ' + reg.length + ' itens, mas o cabeçalho anuncia ' + n);
  ORDEM.forEach(function(m){ var o = pm[m]; o.idx = o.total ? (o.c-o.e)/o.total : 0; });
  var idx = saldo / n;
  S.hist = S.hist.concat(reg);
  S.simulados.push({id:id, d:campo.data || hoje(), n:n, tempo:campo.tempo || '',
    c:c, e:e, b:b, saldo:saldo, idx:idx, mat:pm});
  S.simulados.sort(function(x,y){ return x.id < y.id ? -1 : 1; });
  salva();
  return {id:id, n:n, idx:idx};
}

/* ---------- boot ---------- */
carrega();
ir('painel');
if ('serviceWorker' in navigator){
  window.addEventListener('load', function(){ navigator.serviceWorker.register('sw.js').catch(function(){}); });
}
