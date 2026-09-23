/* Gera um simulado offline autocontido a partir de docs/banco.js.
   Uso: node gera-simulado.js S01 2026-09-23 > arquivo.html            */
const fs = require('fs');
const raiz = __dirname + '/../';
eval(fs.readFileSync(raiz+'docs/dados.js','utf8').replace(/const /g,'var '));
eval(fs.readFileSync(raiz+'docs/banco.js','utf8').replace(/const /g,'var '));
const ID = process.argv[2] || 'S01', DATA = process.argv[3] || '2026-09-23';

const MAT = {}; MATERIAS.forEach(m => MAT[m.k] = m);
const PAS = {}; PASSOS.forEach(p => PAS[p.id] = p);
function rnd(a, seed){ a = a.slice(); let s = seed;
  for (let i=a.length-1;i>0;i--){ s = (s*1103515245+12345) & 0x7fffffff;
    const j = s % (i+1); [a[i],a[j]] = [a[j],a[i]]; } return a; }
/* A selecao precisa equilibrar formato x gabarito DENTRO do simulado, nao so
   no banco. Amostrar 30 itens de um banco equilibrado pode, por acaso, produzir
   um recorte em que um formato so aparece com um gabarito — e ai o simulado
   volta a ensinar que a forma entrega a resposta. Escolha gulosa: a cada item,
   prefere-se o candidato cuja celula formato x gabarito esta menos preenchida,
   com correcao para o alvo global de Certos. */
function seleciona(cota, alvoC, seed){
  const cel = {}, out = [];
  let nC = 0, total = Object.values(cota).reduce((a,b)=>a+b,0), s = seed;
  const sorteio = () => { s = (s*1103515245+12345) & 0x7fffffff; return s / 0x7fffffff; };
  Object.keys(cota).forEach(k => {
    const pool = rnd(BANCO.filter(q => q.m === k), seed + k.length);
    const usado = {};
    for (let i = 0; i < cota[k]; i++){
      let melhor = null, melhorNota = -Infinity;
      pool.forEach(q => {
        if (usado[q.id]) return;
        const chave = q.mec + '|' + q.g;
        const restante = total - out.length;
        const faltaC = alvoC - nC;
        // quanto menos preenchida a celula, melhor; e puxa para o alvo de Certos
        let nota = -(cel[chave] || 0) * 3;
        if (q.g === 'C') nota += faltaC > 0 ? 2 : -3;
        else nota += (restante - faltaC) > 0 ? 1 : -3;
        nota += sorteio() * 0.9;
        if (nota > melhorNota){ melhorNota = nota; melhor = q; }
      });
      if (!melhor) break;
      usado[melhor.id] = 1;
      cel[melhor.mec + '|' + melhor.g] = (cel[melhor.mec + '|' + melhor.g] || 0) + 1;
      if (melhor.g === 'C') nC++;
      out.push(melhor);
    }
  });
  return out;
}
/* Cotas pelos itens de prova. Os 3 itens de Direito entram por rodizio entre
   os seis blocos; aqui ficam fixos para o simulado ser reproduzivel. */
const cota = {Informatica:9, ContabilidadeGeral:5, Portugues:4, RLM:3, Matematica:2,
  RedacaoOficial:2, Estatistica:1, ContabilidadePublica:1,
  DireitoConstitucional:1, DireitoAdministrativo:1, DireitoProcessualPenal:1};

// tenta algumas sementes e fica com a de melhor equilibrio formato x gabarito
let Q = null, melhorFalha = Infinity;
for (let seed = 1; seed <= 400; seed++){
  const cand = seleciona(cota, 14, seed * 97);
  if (cand.length !== 30) continue;
  const t = {}; cand.forEach(q => { (t[q.mec] = t[q.mec]||{C:0,E:0})[q.g]++; });
  // penaliza formato com 3+ itens concentrado num unico gabarito, e desvio do alvo de Certos
  let falha = 0;
  Object.values(t).forEach(o => { const n = o.C + o.E;
    if (n >= 3 && Math.min(o.C,o.E) === 0) falha += 10;
    if (n >= 4 && Math.min(o.C,o.E) / n < 0.25) falha += 4; });
  falha += Math.abs(cand.filter(q=>q.g==='C').length - 14) * 2;
  falha += (6 - Object.keys(t).length) * 6;   // os seis formatos devem aparecer
  if (falha < melhorFalha){ melhorFalha = falha; Q = cand; if (!falha) break; }
}
if (!Q){ console.error('ERRO: nao consegui montar o simulado'); process.exit(1); }
Q = rnd(Q, 4242);
console.error('equilibrio: falha ' + melhorFalha + (melhorFalha ? ' (ver tabela abaixo)' : ' — perfeito'));
if (Q.length !== 30) { console.error('ERRO: ' + Q.length + ' itens'); process.exit(1); }

const tab = {}; Q.forEach(q => { (tab[q.mec] = tab[q.mec]||{C:0,E:0})[q.g]++; });
const nC = Q.filter(q=>q.g==='C').length;
console.error('itens: ' + Q.length + ' | ' + nC + 'C / ' + (30-nC) + 'E (' + Math.round(nC/30*100) + '% Certo)');
Object.keys(tab).sort().forEach(m => console.error('  ' + m.padEnd(22) + ' C=' + tab[m].C + ' E=' + tab[m].E));
const mats = {}; Q.forEach(q => mats[q.m] = (mats[q.m]||0)+1);
console.error('  materias: ' + JSON.stringify(mats));

const dados = Q.map(q => ({n:0, m:q.m, md:MAT[q.m].d, p:q.p, pt:PAS[q.p].t, mec:q.mec,
  g:q.g, t:q.t, e:q.e, c:q.c, cf:q.cf||0}));
dados.forEach((d,i) => d.n = i+1);

const modelo = fs.readFileSync(raiz+'simulados/_modelo.html','utf8');
process.stdout.write(modelo
  .replace(/__ID__/g, ID)
  .replace(/__DATA__/g, DATA)
  .replace(/__DATABR__/g, DATA.split('-').reverse().join('/'))
  .replace('__DADOS__', JSON.stringify(dados)));
