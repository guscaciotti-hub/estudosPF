# Plataforma de estudo — Agente da Polícia Federal

Preparação para o concurso de Agente da PF, banca Cebraspe. Duas partes que
usam as mesmas regras:

**1. A plataforma online** — `docs/`, publicada pelo GitHub Pages. Abre no
celular, funciona offline depois da primeira visita e guarda o histórico no
próprio navegador. É onde se estuda.

**2. O projeto no Claude Code** — a raiz do repositório. É onde as regras
moram, onde questões novas são escritas e onde o banco cresce.

| Caminho | O que é |
|---|---|
| `CLAUDE.md` | as regras permanentes: formato Cebraspe, os seis mecanismos, anti-repetição, proibição de inventar norma, fórmula de prioridade |
| `docs/` | a aplicação web (veja `docs/README.md`) |
| `edital/verticalizado.md` | conteúdo programático com marcador de status |
| `dados/` | perfil, histórico e questões já usadas, no formato do Claude Code |
| `sessoes/` | um arquivo por dia de estudo |
| `simulados/` | simulados em HTML offline e a agenda de etapas |
| `.claude/commands/` | `/estudar`, `/simulado`, `/registrar`, `/status` |

## As regras que valem em todo lugar

- **Formato:** afirmação para julgar Certo ou Errado. Nunca múltipla escolha.
  Acerto +1, erro −1, branco 0.
- **Métrica única:** índice líquido = (certas − erradas) ÷ respondidas.
  Nunca percentual bruto de acerto — percentual bruto premia chute, e a prova
  não premia.
- **Prioridade:** peso da matéria × déficit medido, com rodízio entre matérias.
  Contabilidade e Estatística antes de Direito, sempre.
- **Calibragem:** todo item usa um dos seis mecanismos da Cebraspe, ≈60% dos
  gabaritos são Errado, e todo bloco tem ao menos um item de literalidade limpa.
- **Nunca inventar norma:** item que dependa de lei, prazo, valor ou artigo
  precisa de confirmação em fonte. Sem confirmação, troca-se de assunto — e o
  que foi gerado sem conferir aparece sinalizado.

## Pesos na prova

Base: prova de Agente de 2021, 120 itens.

| Matéria | Peso |
|---|---|
| Informática | 30% |
| Português | 20% |
| Contabilidade Geral | 17% |
| RLM | 13% |
| Estatística | 10% |
| Direito | 10% |

## Limites conhecidos

- **O banco tem 120 questões**, o que sustenta cerca de 15 sessões de material
  inédito. Depois disso as questões começam a voltar, marcadas como revisão.
  O banco cresce escrevendo questões novas pelo Claude Code, com `/estudar`.
- **O verticalizado foi reconstruído de memória** do programa das últimas
  edições do concurso, porque não havia PDF do edital na pasta e o ambiente de
  geração não tinha acesso à rede para consultar a fonte. O aviso está no topo
  do arquivo. Substitua assim que tiver o edital.
- **19 questões dependem de norma** e foram geradas sem consulta à fonte
  oficial pelo mesmo motivo. Elas aparecem sinalizadas com ⚠ na revisão.
  Confira antes de fixar.
