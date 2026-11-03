# Sistema de estudo — Agente da Polícia Federal

> **Para quem está lendo isto sem contexto.** Este documento descreve um
> sistema de preparação para concurso construído para uma pessoa específica.
> Ele existe para que outro assistente consiga entender a arquitetura, as
> regras e, sobretudo, **os erros já cometidos e corrigidos** — para não
> reintroduzi-los.
>
> **Plataforma:** https://guscaciotti-hub.github.io/estudosPF/
> **Repositório:** https://github.com/guscaciotti-hub/estudosPF
> **Branch:** `claude/blissful-faraday-phucqx` (é a branch padrão do repo)
> **Documento gerado em:** 03/11/2026

---

## 1. Quem estuda e qual é a restrição

Gustavo, 36 anos, gestor de tráfego pago com agência solo (~14 clientes).
Alvo: **Agente de Polícia Federal**, banca **Cebraspe**.

**Restrição dura: 20 a 30 minutos por dia, nunca mais que isso.** Todo o
desenho do sistema sai daí. Se um conteúdo não cabe em 30 minutos, ele é
fatiado em dias — nunca esticado.

Diagnóstico inicial, **declarado por ele e não medido**:

| Matéria | O que ele diz |
|---|---|
| Informática | Forte na prática, mas a Cebraspe cobra teoria de redes, camadas OSI e fronteiras entre conceitos parecidos |
| Contabilidade Geral | Do zero. Maior débito |
| Estatística | Do zero |
| Português | Bom em interpretação, fraco em Manual de Redação da Presidência |
| RLM | Intuição boa, formalização fraca (De Morgan, equivalências, negação de quantificadores) |
| Direito | Peso baixo, não é prioridade |

Esse diagnóstico é substituído por dado medido assim que houver medição.
**Dado medido sempre vence percepção.**

---

## 2. Como ele quer ser tratado

Isto não é preferência de estilo, é requisito funcional. Ele pediu
explicitamente:

- **Seja direto.** Resultado ruim se diz que foi ruim, com o que implica.
  Não amaciar, não buscar o lado bom, não elogiar esforço.
- **Discorde.** Se ele pedir algo que a conta desmente, mostrar a conta uma
  vez, com número. Ele decide depois.
- **Não motive.** "O que eu preciso não é motivação. É medição honesta e a
  próxima questão." — palavras dele.
- **Sem relatório longo** no fim de sessão: saldo líquido, ciladas que
  pegaram, uma frase de revisão.
- **Comece pela ausência:** 7 dias ou mais sem estudar, a primeira frase da
  próxima sessão é isso.
- **Toda resposta que publica alteração termina com o link da plataforma**, na
  última linha.

---

## 3. A prova

Distribuição da prova objetiva de Agente, **120 itens**:

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

**Ressalva importante:** essa distribuição foi informada pelo Gustavo numa
auditoria e **nunca pôde ser conferida no edital nem no caderno de prova** —
o ambiente onde o sistema é desenvolvido não tem acesso de rede a gov.br nem
ao Cebraspe. O mesmo vale para o **corte de 82 pontos** usado nas projeções.
Se você tiver acesso à fonte, **confira esses dois números**: eles governam
toda a priorização.

Formato dos itens: **certo ou errado, com penalidade.** Acerto +1, erro −1,
branco 0. Nunca múltipla escolha.

---

## 4. Arquitetura

Duas partes que compartilham as mesmas regras.

### 4.1 A plataforma online — `docs/`

Site estático servido pelo GitHub Pages. **Sem back-end, sem banco de dados,
sem login.** É onde ele estuda, no celular.

| Arquivo | O que é |
|---|---|
| `docs/index.html` | estrutura das 7 abas |
| `docs/app.js` | toda a lógica (~1.000 linhas, JS puro, sem framework) |
| `docs/app.css` | tokens de cor com tema claro e escuro |
| `docs/banco.js` | `const BANCO` — as questões |
| `docs/dados.js` | `MATERIAS`, `PASSOS`, `CADERNO`, `EDITAL` |
| `docs/sw.js` | service worker, cache offline |

O histórico de estudo vive no **`localStorage` do aparelho dele** — nunca no
repositório. Ninguém além dele tem acesso. Há exportação/importação na aba
Dados.

### 4.2 O projeto no Claude Code — a raiz

É onde as **questões nascem** e as regras moram.

| Caminho | O que é |
|---|---|
| `CLAUDE.md` | as regras permanentes. É a fonte de verdade |
| `edital/verticalizado.md` | conteúdo programático, 153 tópicos |
| `dados/perfil.json` | perfil recalculado a partir do histórico |
| `dados/historico.jsonl` | append-only, uma linha por questão respondida |
| `dados/questoes-usadas.jsonl` | append-only, anti-repetição |
| `simulados/` | simulados HTML offline e a agenda de etapas |
| `scripts/gera-simulado.js` | gerador reproduzível de simulado offline |
| `.claude/commands/` | os slash commands |

**A plataforma aplica; ela não gera.** Questão nova é escrita no Claude Code e
entra em `docs/banco.js`.

---

## 5. Modelo de dados

### 5.1 Questão

```js
{ id: "INF-001",                    // prefixo da matéria + sequencial
  m:  "Informatica",                // chave da matéria
  p:  "P01",                        // passo estratégico
  a:  "Modelo OSI: as sete camadas e suas funções",   // tópico do edital
  mec:"par de conceitos",           // FORMATO do item (ver §6)
  g:  "E",                          // gabarito: C ou E
  t:  "...",                        // enunciado
  e:  "...",                        // explicação
  c:  "...",                        // a cilada (ver abaixo)
  cf: 1 }                           // opcional: norma não conferida em fonte
```

**O campo `c` ("a cilada") não é a repetição da explicação.** É o mecanismo
psicológico do item: por que um candidato *preparado* erraria aquele item
específico. Exemplo real, de um item sobre camadas do OSI trocadas:

> "As duas definições estão tecnicamente corretas — só foram trocadas de dono.
> Você lê, reconhece cada descrição como verdadeira, sente que 'está certo' e
> marca Certo sem conferir a qual camada cada uma pertence."

### 5.2 Os 26 passos estratégicos

A unidade de estudo **não é o tópico solto, é o passo**: um tema com resumo
teórico próprio e questões suficientes para medir nível. O tópico continua
existindo como metadado, para rastrear o edital, mas prioridade, teoria,
revisão e nível de domínio operam por passo.

```js
{ id:"P04", t:"Segurança: pilares, malware e ataques",
  a:["Segurança da informação: pilares...", "Malware: vírus, worm..."],
  itens: 4.24,      // peso em itens de prova
  n: 6,             // questões no banco
  mats:["Informatica"] }
```

O peso de cada passo é o peso da matéria repartido proporcionalmente às
questões que o passo tem nela. **A soma dos 26 passos é exatamente 120.**

### 5.3 Caderno de teoria

`CADERNO[passoId]` — um resumo denso de 270 a 360 palavras por passo, escrito
na medida do que a Cebraspe cobra. Markdown mínimo: `**negrito**`, `• ` para
lista, linha em branco para parágrafo. Abre toda sessão.

### 5.4 Edital

`EDITAL` — os 153 tópicos por matéria, cada um apontando o passo que o cobre
ou `null`. É o que a aba Conteúdo lista.

**Regra de integridade:** o campo `a` de uma questão, o tópico no `EDITAL` e a
linha no `verticalizado.md` precisam ter **redação idêntica**. Divergência
gera tópico órfão e quebra o cruzamento.

### 5.5 Estado no navegador

```js
{ v:2,
  hist:[{d, o, sid, q, m, a, p, mec, g, r, res}],   // append-only
  sessoes:[{d, p, n, c, e, b, saldo, idx}],
  simulados:[{id, d, n, tempo, c, e, b, saldo, idx, mat:{}}],
  teoria:{P01:"2026-09-26"},                        // quando marcou estudado
  revisao:{P01:{nivel, prox, limpas}},              // fila espaçada
  config:{dataProva:null} }
```

**O perfil é sempre derivado de `hist`.** Nada de contador incrementado à
parte. Matéria, tópico, passo e mecanismo são **relidos do banco** a cada
carregamento, pelo `id` da questão — assim o histórico sobrevive a
reorganizações do banco.

---

## 6. As regras invioláveis

Estas seis regras existem porque cada uma delas **foi violada antes e custou
confiança**. Não são preferências.

### 6.1 O mecanismo nunca pode predizer o gabarito

Os seis mecanismos são **FORMATOS de item, não tipos de erro**, e cada um
admite os dois gabaritos:

| Formato | Certo | Errado |
|---|---|---|
| **Par de conceitos** | atribuição correta | nomes trocados |
| **Palavra absoluta** | a regra é mesmo absoluta | comporta exceção |
| **Premissa e conclusão** | a conclusão decorre | não decorre |
| **Duas metades** | as duas verdadeiras | a segunda falha |
| **Número na hipótese** | valor e caso corretos | valor real, caso errado |
| **Aparência literal** | transcrição fiel | um termo trocado no meio |

Limites a conferir em **toda** geração:

- cada formato nos dois gabaritos, com **mínimo de 30%** da minoria;
- **nenhum formato acima de 80%** num gabarito;
- global perto de **45% Certo / 55% Errado**.

**Imprima a tabela cruzada formato × gabarito ao fim de toda geração.** Se
falhar, reescreva os itens — **nunca troque o rótulo do mecanismo para a
tabela fechar**. O rótulo descreve a forma real do item; maquiar a validação
esconde o vazamento em vez de corrigi-lo.

### 6.2 Nunca inventar norma

Item que dependa de lei, valor, prazo, artigo, percentual ou redação oficial:
**confirmar na fonte antes de escrever.** Sem confirmação possível, trocar de
assunto. Item gerado sem conferir leva `cf: 1` e é sinalizado na tela.

Uma questão com gabarito errado é pior que não estudar: fixa o erro.

### 6.3 A métrica única

```
indice_liquido = (certas − erradas) ÷ respondidas      // −1 a +1
```

**Percentual bruto de acerto é proibido em todo lugar** — relatório, conversa,
gráfico, "só para dar uma ideia". Chutar metade de um bloco dá 50% de acerto
e índice 0, que é o que valeria na prova.

O percentual que a plataforma mostra é o **aproveitamento líquido**: o índice
em escala de −100 a +100. Pode ser negativo.

### 6.4 O denominador do progresso é o edital, nunca o banco

```
progresso = tópicos do edital tocados ÷ tópicos do edital
```

A palavra é **"tocado"**, não "estudado" nem "dominado".

Toda tela que mostra progresso mostra junto a **cobertura e a densidade do
banco**, porque elas são o teto do que o sistema consegue medir.

### 6.5 Não projetar a prova com cobertura baixa

A projeção de pontos em 120 itens só aparece com **60 dos 120 itens medidos**
ou ao menos um simulado registrado. Abaixo disso o painel diz que não dá para
projetar e quanto falta. Vale também em conversa: não estimar nota final
antes de haver cobertura.

### 6.6 Anti-repetição

Antes de gerar, ler `dados/questoes-usadas.jsonl` inteiro. Nunca repetir
enunciado nem **variação reconhecível** — mesmo tópico + mesmo formato +
mesma virada é repetição, ainda que a redação mude. Registrar cada questão
gerada com hash sha1 do enunciado normalizado.

---

## 7. Tiers de prioridade

**A fórmula ordena DENTRO de cada tier. Nunca entre tiers.** Peso de prova é
barreira, não fator que o desempenho possa anular.

| Tier | Matérias | Itens | Regra |
|---|---|---|---|
| **1** | Informática · Contabilidade Geral | 36 + 20 | núcleo diário, alternando |
| **2** | Redação Oficial | 6 | tarefa única: uma sessão por passo e sai |
| **3** | RLM · Matemática | 12 + 8 | abre quando **ambas** do Tier 1 ≥ **+0,40** |
| **4** | Português | 18 | manutenção: uma sessão a cada **14 dias** |
| **5** | Estatística · Contabilidade Pública · Direito (6 blocos) | 4+4+12 | **bloqueado** até 6 meses antes da prova |

**Nenhum passo de Tier 5 pode ser sugerido, por nenhum motivo.** A barreira é
estrutural: o passo não entra na fila, o botão fica desabilitado e
`iniciaSessao()` recusa mesmo chamado por código. Sem data de prova
cadastrada, fica bloqueado — o padrão seguro é não sugerir.

Escalonamento diário: Tier 2 enquanto pendente → Tier 4 quando vencer os 14
dias → Tier 1 como padrão → Tier 3 quando a porta abrir. **Nunca salta para o
Tier 5.**

*Por que não é "o menor tier com passo disponível":* o Tier 1 tem 11 passos e
só esvaziaria em meses; com aquela leitura, "tarefa única" e "a cada 2
semanas" nunca aconteceriam. Tier 2 e Tier 4 são interrupções agendadas.

### A fórmula, dentro do tier

```
prioridade = itens_na_prova × deficit × swing × material

deficit  = (1 − indice) / 2          # 0.9 se o passo nunca foi respondido
swing    = 1 + erros/(erros+brancos) # 1 quando erros+brancos = 0
material = min(1, ineditas / 6)      # material inédito disponível
```

**Swing:** erro vale 2 pontos de virada (−1 vira +1), branco vale 1 (0 vira
+1). Passo onde se erra muito tem mais ponto disponível, então sobe. **Erro é
sinal de oportunidade, não de fracasso** — e é assim que se fala dele.

**Atenção:** o swing **satura em 2,00 com um único erro** quando não há
brancos. Foi isso que, antes dos tiers, deixava Estatística (4 itens)
ultrapassar Informática (36). Os tiers contêm o efeito; a saturação continua
existindo dentro do tier.

**Material:** um passo que só enche 3 das 6 questões novas vale metade de um
que enche as 6. Como degrau (penalizar só quando zera) isso nunca disparava.

### Níveis do passo

não iniciado → teoria lida → em treino → **aceitável** (índice ≥ 0,60 com ≥ 6
questões) → **consolidado** (aceitável, teoria lida e fora da revisão).
Aceitável não é definitivo: caindo abaixo de 0,60, volta.

### Revisão espaçada

Passo com **qualquer erro** na sessão entra na fila e volta em **3, 7, 21 e 60
dias**. Erro devolve ao início. **Duas passagens consecutivas sem erro tiram o
passo da fila.** A revisão independe de tier — passo bloqueado que já foi
estudado continua voltando.

### Forma da sessão diária

```
1. Resumo teórico do passo         ~5 min
2. 6 questões novas do passo       ~15 min
3. 3 questões de revisão da fila   ~7 min
```
Fila vazia: 8 questões novas, sem o bloco 3.

### Tamanho do banco: por cadência, não por peso de prova

O banco **não** deve espelhar a contagem de itens. Informática vale 36 itens e
é estudada dia sim, dia não: com 36 questões o núcleo repetiria na sexta
sessão. Antes de cortar banco, calcular quantas sessões aquilo representa na
cadência do tier.

---

## 8. As telas

| Aba | O que mostra |
|---|---|
| **Painel** | a tarefa de hoje; evolução no tempo (sessões como série, simulados como losangos); **progresso**: lista de matérias que abre em tópicos com % e aproveitamento; distância do corte (com guarda de cobertura); sequência de dias; o preço do chute; fila de revisão |
| **Conteúdo** | os 153 tópicos do edital com filtros (todos, não estudados, rendendo pouco, sem questão) |
| **Passo estratégico** | os 26 passos agrupados por tier, com nível, índice, barra até o aceitável e motivo do bloqueio |
| **Sessão** | teoria → questões uma por vez → fechamento |
| **Simulado** | 30 itens pelos pesos, sem gabarito durante, resultado com comparação |
| **Caderno** | os 26 resumos, agrupados por matéria |
| **Dados** | data da prova, backup, importação, apagar tudo |

**"O preço do chute"** merece explicação: compara o saldo real com o saldo que
ele teria se tivesse deixado em branco exatamente os itens que errou. A
diferença é o que custou marcar em vez de pular. Esse número precisa cair ao
longo dos meses.

---

## 9. Os comandos do Claude Code

| Comando | O que faz |
|---|---|
| `/estudar [passo]` | sessão diária: teoria, 6 novas, 3 de revisão |
| `/simulado [n]` | simulado de etapa, gera HTML offline |
| `/registrar` | recebe o bloco do simulado e atualiza perfil e prioridades |
| `/status` | panorama curto e a única coisa a fazer hoje |
| `/banco` | audita o banco: tabela cruzada, cobertura, itens sem fonte |

---

## 10. Estado atual, com números reais

```
banco              212 questões
gabarito           100 Certo / 112 Errado  (47% Certo)
passos              26, todos com resumo de teoria
tópicos do edital  153
  com questão       84  (55%)
  com 3 ou mais     37  (24%)
densidade          1,4 questões por tópico
norma não conferida 44 itens marcados cf:1
```

Tabela cruzada formato × gabarito — **todos passam** (mínimo 30%, máximo 80%):

| Formato | C | E | minoria |
|---|---|---|---|
| aparência literal | 42 | 30 | 42% |
| par de conceitos | 21 | 26 | 45% |
| premissa e conclusão | 11 | 20 | 35% |
| palavra absoluta | 10 | 17 | 37% |
| duas metades | 8 | 11 | 42% |
| número na hipótese | 8 | 8 | 50% |

Banco por matéria (questões / itens de prova):

```
Informática            65 / 36      Contabilidade Pública    9 / 4
Contabilidade Geral    41 / 20      Direito Administrativo   8 / 3
Português              26 / 18      Estatística              8 / 4
Raciocínio Lógico      15 / 12      Direito Proc. Penal      4 / 2
Matemática             12 / 8       Direito Constitucional   3 / 3
Redação Oficial        12 / 6       Direito Penal            3 / 2
                                    Legislação Federal       3 / 1
                                    Direito Ambiental        3 / 1
```

**O simulado marco zero ainda não foi registrado** no repositório. Sem ele não
há linha de base, a projeção de corte fica suprimida e a linha do tempo não
tem marco. É a pendência número um.

---

## 11. Limitações conhecidas

Em ordem de importância:

1. **O banco é o gargalo, não o motor.** 1,4 questões por tópico. Um banco de
   preparação sério teria 10 a 15 — algo perto de **1.800 questões**. Com o
   que existe, o sistema sustenta "passei por esse tópico" e **não** sustenta
   "domino esse tópico". Fechar isso é escrever questão.

2. **61 dos 153 tópicos não têm nenhuma questão.** Outros 13 não têm questão
   própria e são estudados dentro de um passo vizinho. Metade do edital não é
   medida — concentrado em Direito, Estatística e Contabilidade Geral.

3. **A distribuição de 120 itens e o corte de 82 nunca foram conferidos na
   fonte.** Rede bloqueada. Governam toda a priorização.

4. **44 questões dependem de norma não conferida** — Redação Oficial (12),
   Contabilidade Pública (9), Direito (23). Sinalizadas com ⚠ na revisão.

5. **O verticalizado foi reconstruído de memória** do programa das últimas
   edições, não lido do edital. Aviso no topo do arquivo.

6. **A regra de saída da revisão espaçada** é "duas passagens consecutivas sem
   erro", como ele definiu. Com ela, os intervalos de 21 e 60 dias só são
   alcançados por passo que volta a errar depois de avançar.

7. **Histórico só no aparelho dele.** Não sincroniza entre celular e notebook;
   limpar dados do site apaga tudo. Há backup manual na aba Dados.

8. **Sobreposição entre a aba Conteúdo e o bloco Progresso do Painel.** As
   duas mostram progresso por tópico. Está pendente a decisão de remover uma.

---

## 12. Erros já cometidos e corrigidos — não reintroduzir

Esta é a seção mais importante para quem for mexer no sistema. Cada item
abaixo foi um defeito real, encontrado em uso ou em auditoria.

### Vazamento de gabarito pelo formato do item
Os 49 itens Certos eram **todos** "literalidade limpa" e nenhum dos 71
Errados era. Concentração de 100% em todos os seis mecanismos: bastava marcar
Certo no que parecia limpo e Errado no que tinha reviravolta. A causa era
definir os mecanismos como *tipos de erro*. Viraram *formatos*, cada um com
os dois gabaritos. **Sempre rodar a tabela cruzada.**

### O mesmo vazamento na seleção, não só no banco
Amostrar 30 itens de um banco equilibrado produzia recortes em que um formato
só aparecia com um gabarito. A seleção passou a equilibrar formato × gabarito
**dentro da amostra**, com acumulador compartilhado entre as matérias do
simulado.

### Estatística ultrapassando Informática na fila
O swing deixava um passo de 4 itens chegar a score 8,00 contra 6,43 de um de
Contabilidade nunca tocado. Corrigido com os tiers fixos. **Peso de prova é
barreira.**

### Progresso medido contra o banco, não contra o edital
O painel anunciava "Informática 17% estudado" depois de uma sessão — 9
respondidas de 53 no banco. Aquelas 9 tocavam 2 dos 26 tópicos: 8%. O
denominador estava errado.

### Projeção de corte a partir de ruído
Com 6 questões respondidas, o painel anunciou "distância do corte: −70,0",
extrapolando uma matéria para a prova inteira. Agora exige cobertura mínima.

### Penalidade de banco esgotado como degrau
Um passo de 10 questões ficava preso em 3 inéditas e devolvia 5 repetidas por
sessão, indefinidamente, porque a penalidade só disparava quando zerava.
Virou proporcional.

### "Sai da fila" interpretado como "atingir aceitável"
Redação Oficial tomava os 14 dias de simulação porque, com 6 questões no
banco, nunca chegava a 0,60. A regra do Tier 2 é literal: **uma sessão e sai**.

### Cache misturado derrubando o app inteiro
Service worker servindo `index.html` de uma versão e `app.js` de outra: um
elemento novo faltava no HTML, o boot lançava `Cannot set properties of null`
e **tudo depois disso nunca rodava** — inclusive o `carrega()`. Sintoma:
plataforma meio morta, uma aba ou outra respondendo. Corrigido com selo de
build (`<meta name="build">` contra `var BUILD`) que se cura sozinho, e com
`on(id, fn)` que ignora elemento ausente em vez de interromper o script.

### Tabela empurrando a página no celular
Tabela de 7 colunas com 460px num viewport de 430. Agora toda tabela rola
dentro de si.

---

## 13. Como mexer sem quebrar

1. **Ao alterar `banco.js`, `dados.js`, `app.js` ou `app.css`:** incrementar
   `VERSAO` em `docs/sw.js` **e** o par `BUILD` / `<meta name="build">`.
2. **Ao acrescentar questão:** rodar a tabela cruzada formato × gabarito e
   conferir os dois limites. Registrar em `questoes-usadas.jsonl`.
3. **Ao criar questão de tópico novo:** acrescentar o tópico ao `EDITAL` e ao
   `verticalizado.md` com redação **idêntica** ao campo `a`.
4. **Testar no navegador antes de publicar.** O projeto usa Playwright com o
   Chromium pré-instalado; os testes verificam as 7 abas, ausência de rolagem
   horizontal em 375/430/900px e ausência de erro de JavaScript.
5. **Nunca reescrever linha de `historico.jsonl`.** Append-only.
6. **Recalcular `perfil.json` a partir do histórico**, nunca incrementar.

---

## 14. O que fazer primeiro

Se você assumir este sistema, em ordem:

1. **Conferir na fonte** a distribuição de 120 itens e o corte de 82 pontos.
   Tudo depende deles e nenhum foi verificado.
2. **Fazer o marco zero.** Sem linha de base não existe evolução, só sensação.
3. **Escrever questão de Tier 1.** Informática e Contabilidade Geral são o
   núcleo diário e são o que se consome.
4. **Conferir os 44 itens com `cf: 1`** contra o texto legal.
5. **Substituir o verticalizado** quando o PDF do edital entrar.

---

*Este documento descreve o estado em 03/11/2026. As regras vivem em
`CLAUDE.md`, que é a fonte de verdade — se divergirem, o `CLAUDE.md` vence.*
