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

## Pesos na prova — 120 itens

| Matéria | Itens | Matéria | Itens |
|---|---|---|---|
| Informática | 36 | Estatística | 4 |
| Contabilidade Geral | 20 | Contabilidade Pública | 4 |
| Português | 18 | Direito Constitucional | 3 |
| Raciocínio Lógico | 12 | Direito Administrativo | 3 |
| Matemática | 8 | Direito Penal | 2 |
| Redação Oficial | 6 | Direito Processual Penal | 2 |
| | | Legislação Federal | 1 |
| | | Direito Ambiental | 1 |

## Os 26 passos estratégicos

A unidade de estudo não é o assunto solto — é o **passo**: um tema com resumo
teórico próprio e questões suficientes para medir nível. O peso de cada passo
em itens de prova é o peso da matéria repartido proporcionalmente às questões
que o passo tem nela; a soma dos 26 é exatamente 120.

Cada passo passa por cinco níveis: não iniciado → teoria lida → em treino →
**aceitável** (índice ≥ 0,60 em pelo menos 6 questões) → consolidado.

A aba **Passo estratégico** lista os 26 na ordem de prioridade, recalculada a
cada questão respondida. Você lê a teoria, marca como estudado e martela
questões até o passo sair da frente sozinho.

## Limites conhecidos

- **O banco tem 188 questões** em 26 passos, o que sustenta cerca de 23 sessões
  de material inédito. Depois disso as questões voltam, marcadas como revisão.
  O banco cresce escrevendo questões novas pelo Claude Code, com `/estudar`.
- **A distribuição de itens por matéria e o corte de 82 pontos** foram
  informados pelo Gustavo em auditoria e **não puderam ser conferidos** no
  edital nem no caderno de prova: o ambiente de geração não tem acesso de rede
  a gov.br nem ao Cebraspe.
- **O verticalizado foi reconstruído de memória** do programa das últimas
  edições, pelo mesmo motivo. O aviso está no topo do arquivo.
- **27 questões dependem de norma** e foram geradas sem consulta à fonte
  oficial. Aparecem sinalizadas com ⚠ na revisão. Confira antes de fixar.
- **A regra de saída da revisão espaçada** é a que o Gustavo definiu: duas
  passagens consecutivas sem erro. Com ela, os intervalos de 21 e 60 dias só
  são alcançados por passos que voltam a errar depois de avançar. Se a
  intenção for percorrer os quatro intervalos sempre, a regra de saída precisa
  mudar — é uma linha em `atualizaRevisao()`.
