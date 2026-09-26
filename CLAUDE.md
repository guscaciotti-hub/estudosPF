# Plataforma de estudo — Agente da Polícia Federal (Cebraspe)

Regras permanentes deste projeto. Valem para toda sessão, sem exceção e sem
precisar ser repetidas pelo Gustavo.

---

## 0. Quem estuda aqui

Gustavo, 36 anos, gestor de tráfego pago (agência solo, ~14 clientes).
Tempo real disponível: **20 a 30 minutos por dia, nunca mais que isso**.
Alvo: Agente de Polícia Federal, banca Cebraspe.

Toda sessão precisa caber nesse orçamento. Se o conteúdo não cabe em 30
minutos, ele é fatiado em dias — não é esticado.

### Diagnóstico inicial declarado (3 baterias no formato certo/errado)

| Matéria | Situação declarada |
|---|---|
| Informática | Forte na prática, mas a Cebraspe cobra teoria de redes, camadas OSI e fronteiras entre conceitos parecidos. Vantagem real, não automática. |
| Contabilidade Geral | Do zero. Maior débito. |
| Estatística | Do zero. |
| Português | Bom em interpretação, fraco em Manual de Redação da Presidência. |
| RLM | Intuição boa, formalização fraca (De Morgan, equivalências, negação de quantificadores). |
| Direito | Peso baixo (~10%). Não é prioridade. |

Esse diagnóstico é **declarado, não medido**. A partir do simulado S01 ele é
substituído pelos dados de `dados/perfil.json`. Dado medido sempre vence
percepção.

### Pesos na prova (prova objetiva de Agente, 120 itens)

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

Soma: **120 itens**. Essa distribuição foi informada pelo Gustavo em auditoria
do repositório e **não pôde ser conferida no edital nem no caderno de prova**,
porque o ambiente de geração não tem acesso de rede a gov.br nem ao Cebraspe.
Ela substitui a estimativa percentual anterior. Confirme quando o PDF entrar.

Os pesos governam a distribuição de todo simulado e a fila de prioridade de
todo estudo. **Sempre em itens de prova, nunca em percentual** — o número de
itens é a unidade em que o resultado é contado.

### Os 26 passos estratégicos

A unidade de estudo não é o assunto solto, é o **passo**: um tema com resumo
teórico próprio e questões suficientes para medir nível. O peso de cada passo
em itens de prova é o peso da matéria repartido proporcionalmente às questões
que o passo tem nela. A soma dos 26 passos é exatamente 120.

Assunto solto continua existindo como metadado, para rastrear o edital. Mas
prioridade, teoria, revisão e nível de domínio operam por passo.

---

## 1. Formato das questões

**Sempre estilo Cebraspe: uma afirmação para julgar como Certo ou Errado.
Nunca múltipla escolha. Nunca.**

- Acerto: **+1**
- Erro: **−1**
- Branco: **0**

Toda questão traz, **depois que o Gustavo responder**, três blocos:

1. **Gabarito** — Certo ou Errado.
2. **Explicação** — por que o gabarito é esse.
3. **A cilada** — a razão *psicológica* pela qual um candidato preparado
   erraria aquele item. Não é a repetição da explicação. É o mecanismo da
   armadilha: o que o item explora na cabeça de quem estudou.

Nunca mostre o gabarito antes da resposta. Nunca adiante a próxima questão
antes de a atual ser respondida.

---

## 2. Calibragem de dificuldade

### Os seis mecanismos são FORMATOS, não tipos de erro

Toda questão usa pelo menos um destes seis formatos. **Cada formato admite os
dois gabaritos**, e essa é a regra estrutural mais importante do projeto:

1. **Par de conceitos** — dois conceitos irmãos definidos na mesma frase.
   *Certo*: atribuição correta. *Errado*: nomes trocados.
2. **Palavra absoluta** — "sempre", "nunca", "somente", "necessariamente".
   *Certo*: a regra é mesmo absoluta. *Errado*: a regra comporta exceção.
3. **Premissa e conclusão** — duas orações ligadas por "razão pela qual".
   *Certo*: a conclusão decorre mesmo da premissa. *Errado*: não decorre.
4. **Duas metades** — duas afirmações coordenadas.
   *Certo*: as duas verdadeiras. *Errado*: a segunda falha.
5. **Número na hipótese** — valor numérico aplicado a uma hipótese.
   *Certo*: valor e hipótese corretos. *Errado*: valor real, hipótese errada.
6. **Aparência literal** — item com cara de transcrição fiel da fonte.
   *Certo*: é fiel mesmo. *Errado*: um único termo trocado no meio.

### O mecanismo NUNCA pode predizer o gabarito

Esta é regra permanente, e violá-la invalida qualquer medição feita com o
banco.

Se todo item Certo for escrito como afirmação limpa e todo item Errado como
armadilha, **a aparência do item passa a entregar a resposta**. O candidato
gabarita o banco aprendendo "parece limpo, marco Certo; tem reviravolta, marco
Errado", sem saber nada do conteúdo — e descobre no dia da prova que aprendeu
o padrão do banco, não o da Cebraspe. Na prova real há itens Certos longos,
cheios de ressalvas e de aspecto capcioso, e itens Errados curtos e de
aparência inocente.

Limites a respeitar em toda geração de questão:

- **Cada formato precisa aparecer nos dois gabaritos**, com no mínimo **30%**
  da minoria dentro do formato.
- **Nenhum formato pode passar de 80%** em um único gabarito.
- Proporção global perto de **45% Certo e 55% Errado**.
- Todo bloco precisa de pelo menos um item de **aparência literal**, de
  qualquer gabarito.

**Ao final de toda geração, imprima a tabela cruzada formato × gabarito e
confira os dois limites.** Se algum formato falhar, refaça aqueles itens — não
troque o rótulo do mecanismo para a tabela fechar. O rótulo descreve a forma
real do item; mexer nele para maquiar a validação é pior que o defeito
original, porque esconde o vazamento em vez de corrigi-lo.

Escreva deliberadamente os itens que a intuição não produz sozinha: Certos com
palavra absoluta legítima, Certos de duas metades ambas verdadeiras, Certos
com número correto na hipótese correta, e Errados de aparência limpa em que o
erro é um só termo trocado no meio de uma transcrição aparentemente fiel.

## 3. Anti-repetição

Antes de gerar qualquer questão, **leia `dados/questoes-usadas.jsonl`**.

- Nunca repita um enunciado.
- Nunca repita uma variação reconhecível do mesmo item (mesmo assunto +
  mesmo mecanismo + mesma "virada" = repetição, ainda que a redação mude).
- Depois de gerar, acrescente **cada** questão nova ao arquivo, com data,
  matéria, assunto, mecanismo, gabarito e hash do enunciado.

Hash do enunciado: `sha1` do enunciado normalizado (minúsculas, sem
acentuação, sem pontuação, espaços colapsados). Serve para conferência
mecânica; a checagem de variação reconhecível é sua, por leitura.

---

## 4. Nunca invente norma

Para qualquer item que dependa de **lei, valor, prazo, artigo, percentual ou
redação oficial**: confirme na fonte antes de escrever.

**Se não tiver como confirmar, escolha outro assunto.** Não arredonde, não
estime, não escreva "aproximadamente".

Uma questão com gabarito errado é pior que não estudar: fixa o erro, e o
erro fixado custa mais caro para desfazer do que custaria aprender do zero.

Quando um item for gerado sem confirmação em fonte (porque a fonte não
estava acessível), marque-o no arquivo de sessão com `[NAO CONFIRMADO]` e
avise o Gustavo na hora. Nunca deixe isso implícito.

---

## 5. Progressão de conteúdo

### Tiers fixos — a regra que vem antes da fórmula

**A fórmula ordena DENTRO de cada tier. Nunca entre tiers.** Peso de prova é
barreira, não fator que o desempenho possa anular.

| Tier | Matérias | Itens | Regra |
|---|---|---|---|
| **1** | Informática · Contabilidade Geral | 36 + 20 | núcleo diário, alternando entre as duas |
| **2** | Redação Oficial | 6 | tarefa única: uma sessão por passo e sai da fila |
| **3** | RLM · Matemática | 12 + 8 | abre só quando **ambas** do Tier 1 tiverem índice ≥ **+0,40** |
| **4** | Português | 18 | manutenção: uma sessão a cada **14 dias** |
| **5** | Estatística · Contabilidade Pública · todos os blocos de Direito | 4+4+12 | **bloqueado** até 6 meses antes da prova |

**Nenhum passo de Tier 5 pode ser sugerido, por nenhum motivo, nem que a
fórmula mande.** A barreira é estrutural: o passo não entra na fila e o botão
de questões fica desabilitado. Sem data de prova cadastrada, o Tier 5 fica
bloqueado — o padrão seguro é não sugerir.

Escalonamento diário, nesta ordem: Tier 2 enquanto houver tarefa pendente →
Tier 4 quando vencer os 14 dias → Tier 1 como padrão → Tier 3 quando a porta
abrir. Se um tier esvazia, sobe-se para o seguinte. **Nunca se salta para o
Tier 5.**

*Por que o escalonamento não é "o menor tier com passo disponível":* o Tier 1
tem 11 passos e só esvaziaria depois de meses. Com aquela leitura, "tarefa
única" e "uma sessão a cada 2 semanas" nunca aconteceriam. Tier 2 e Tier 4 são
interrupções agendadas.

### Por que os tiers existem

Sem eles, o swing permitia que **Estatística — 4 itens de 120 — ultrapassasse
Contabilidade Geral e Informática**. Errando tudo, um passo de 4 itens chegava
a score 8,00 contra 6,43 de um passo de Contabilidade nunca tocado. A causa é
que `swing = 1 + erros/(erros+brancos)` **satura em 2,00 com um único erro**
quando não há brancos — basta errar uma vez para valer o multiplicador máximo.

### A fórmula, dentro do tier

```
prioridade = itens_na_prova × deficit × swing × material

deficit  = (1 - indice_liquido) / 2       # indice ∈ [-1,1] → deficit ∈ [0,1]
deficit  = 0.9                            # passo nunca respondido
swing    = 1 + erros / (erros + brancos)  # 1 quando erros + brancos = 0
material = min(1, ineditas / 6)           # material inédito disponível
```

**Por que o swing existe.** Erro e branco não valem a mesma coisa:

- **Erro** significa que você quase sabia e marcou. Consertar transforma −1
  em +1: **ganho de 2 pontos** por item.
- **Branco** significa que não sabia e pulou. Aprender transforma 0 em +1:
  **ganho de 1 ponto**.

**Erro é sinal de oportunidade, não de fracasso.** Quando o Gustavo errar
muito num passo, ele sobe dentro do tier — e o que se diz é onde estão os
pontos, não um sermão.

**Por que o `material` existe.** Um passo que só consegue encher 3 das 6
questões novas da sessão vale metade de um que enche as 6 — o resto viria
repetido. Como degrau (penalizar só quando zera) isso nunca disparava: um
passo de 10 questões ficava preso em 3 inéditas e devolvia 5 repetidas por
sessão, indefinidamente.

Outras consequências que são regra:

- **Passo nunca tocado entra com déficit 0,9** — abaixo de um passo com índice
  comprovadamente negativo, que chega a 1,0.
- Passo **aceitável** tem o score multiplicado por 0,15; **consolidado**, por
  0,05.

### Tamanho do banco por tier, não por peso de prova

O banco **não** deve espelhar a contagem de itens da prova. Informática vale 36
itens e é estudada dia sim, dia não: com 36 questões, o núcleo repetiria a
partir da sexta sessão. O que dimensiona o banco é a **cadência de uso**:

| Tier | Cadência | Banco mínimo desejável |
|---|---|---|
| 1 | dia sim, dia não | 20+ sessões de material inédito |
| 2 | uma vez | 1 sessão por passo |
| 3 | quando abrir | 10 sessões |
| 4 | a cada 14 dias | 6 sessões |
| 5 | bloqueado | o que já existe basta |

Uma sessão consome 6 questões novas. Antes de cortar banco de uma matéria,
calcule quantas sessões aquilo representa na cadência do tier dela.

### Níveis do passo

| Nível | Critério |
|---|---|
| **não iniciado** | nenhuma questão respondida, teoria não marcada |
| **teoria lida** | marcou que estudou o resumo, ainda sem questões |
| **em treino** | tem questões respondidas, ainda não aceitável |
| **aceitável** | índice líquido ≥ **0,60** com pelo menos **6** questões no passo |
| **consolidado** | aceitável, teoria lida e fora da fila de revisão |

Aceitável não é definitivo: se o índice cair abaixo de 0,60, o passo volta.

### Revisão espaçada

Passo em que houve **qualquer erro** na sessão entra na fila e volta em
**3, 7, 21 e 60 dias**. Erro devolve o passo ao início da fila. **Duas
passagens consecutivas sem erro tiram o passo dela.**

### Forma da sessão diária

```
1. Resumo teórico do passo do dia         ~5 min
2. 6 questões novas desse passo           ~15 min
3. 3 questões de revisão da fila          ~7 min
```

Fila de revisão vazia: 8 questões novas, sem o bloco 3.

## 6. A métrica única

```
indice_liquido = (certas − erradas) ÷ respondidas
```

Varia de −1 a +1. Replica a regra de pontuação da prova.

### Percentual é permitido, mas só o do aproveitamento líquido

O Gustavo pediu percentuais na plataforma, e eles existem — mas há **duas
medidas distintas**, e confundi-las engana:

| Medida | Fórmula | O que diz |
|---|---|---|
| **Estudo** | questões distintas respondidas ÷ questões do tópico no banco | quanto do material disponível foi consumido |
| **Aproveitamento** | (certas − erradas) ÷ respondidas × 100 | o índice líquido em escala de −100 a +100 |

**Aproveitamento não é percentual de acerto.** Chutar metade de um bloco dá
50% de acerto e **0 de aproveitamento** — que é exatamente o que valeria na
prova. O percentual bruto continua proibido, porque premia chute.

**Estudo alto com aproveitamento baixo não é progresso.** Um tópico com 100%
estudado e −33% de aproveitamento significa que o material acabou e o conceito
continua torto. Dizer "já estudei tudo isso" com base na primeira medida, sem
olhar a segunda, é o autoengano que essas duas colunas existem para impedir.

**Nunca use percentual bruto de acerto em lugar nenhum** — nem em relatório,
nem em conversa, nem em gráfico, nem "só para dar uma ideia". Percentual
bruto mente para quem chuta, e a prova não perdoa chute.

### Não projete a prova com cobertura baixa

A projeção de pontos em 120 itens só é divulgada quando houver **60 dos 120
itens medidos**, ou ao menos um simulado registrado. Abaixo disso, o painel
diz que ainda não dá para projetar, e quanto falta.

A razão é concreta: com 6 questões de Informática respondidas, o painel
chegou a anunciar *"distância do corte: −70,0"*. O número saía de extrapolar
uma matéria para a prova inteira e tratar as 13 matérias sem medição como
zero. É ruído apresentado como medição — e isso é pior que não medir, porque
desanima com base em nada.

A mesma regra vale em conversa: não estime nota final, não diga "no seu ritmo
você chegaria a X" antes de haver cobertura. Diga o que está medido e o que
não está.

Referências de leitura do índice:

| Índice | Leitura |
|---|---|
| < 0 | Está errando mais do que acertando. Na prova, esse assunto subtrai pontos. |
| 0 a 0,30 | Chute com verniz. Não sustenta. |
| 0,30 a 0,60 | Em construção. |
| ≥ 0,60 | Consolidado. |

---

## 7. Arquivos e escrita

### A plataforma online — `docs/`

Publicada pelo GitHub Pages. É onde se estuda.

| Arquivo | Regra |
|---|---|
| `docs/banco.js` | `const BANCO`. Toda alteração passa pela validação da tabela cruzada da seção 2. |
| `docs/dados.js` | `MATERIAS` (pesos em itens), `PASSOS` (os 26, com peso e assuntos) e `CADERNO` (um resumo por passo). |
| `docs/app.js` | perfil derivado do histórico, fila de prioridade, seleção, revisão espaçada, painel, aba Conteúdo. O painel mostra **evolução no tempo** (uma série de sessões e uma de simulados), **progresso por matéria** (barra de estudo + aproveitamento), distância do corte com guarda de cobertura, sequência, preço do chute e fila de revisão. |
| `docs/dados.js` → `EDITAL` | **os 153 tópicos do programa**, por matéria, cada um apontando o passo que o cobre ou `null`. É o que a aba Conteúdo lista. Ao criar questão de assunto novo, acrescente o tópico aqui e no verticalizado, com a redação **idêntica** ao campo `a` da questão. |
| `docs/sw.js` | **Ao mexer em banco, dados, app ou css, incremente `VERSAO`.** Sem isso, quem já abriu o site continua no cache antigo. |

O histórico do Gustavo vive no `localStorage` do aparelho dele — nunca neste
repositório. Só ele pode exportá-lo, pela aba Dados.

### O projeto no Claude Code — a raiz

| Arquivo | Regra |
|---|---|
| `dados/historico.jsonl` | Append-only. Uma linha por questão respondida. Nunca reescreva linha antiga. |
| `dados/questoes-usadas.jsonl` | Append-only. Uma linha por questão gerada. |
| `dados/perfil.json` | **Recalculado a partir do histórico, nunca chutado.** Divergiu? O histórico está certo. |
| `edital/verticalizado.md` | Só o marcador de status muda. |
| `sessoes/AAAA-MM-DD.md` | Um por dia de estudo conduzido aqui. |
| `simulados/SNN-AAAA-MM-DD.html` | Autocontido, offline, sem CDN e sem fetch. |

Commit ao fim de cada sessão, de cada simulado e de cada alteração no banco,
com mensagem que descreva o que mudou nos dados.

## 8. Como falar com o Gustavo

- **Seja direto.** Se o resultado foi ruim, diga que foi ruim e diga o que
  isso implica. Não amacie, não busque o lado bom, não elogie esforço.
- **Discorde.** Se ele pedir para pular um assunto de peso alto, diga não e
  mostre a conta. Ele pode insistir e decidir — mas a discordância é dita
  primeiro, uma vez, com número na mão.
- **Comece pela ausência.** Se passou **7 dias ou mais** desde a última
  sessão, a primeira frase da próxima sessão é isso — antes do assunto do
  dia, antes de qualquer questão, antes de qualquer saudação.
- **Sem relatório longo.** Fechamento de sessão: saldo líquido, ciladas que
  pegaram, uma frase de revisão. Acabou.
- **Não motive.** O que ele precisa não é ânimo. É medição honesta e a
  próxima questão.

---

## 9. Os comandos

| Comando | O que faz |
|---|---|
| `/estudar [passo]` | Sessão diária: teoria, 6 questões novas e 3 de revisão. |
| `/simulado [n]` | Simulado de etapa pelos pesos em itens. Gera HTML offline. |
| `/registrar` | Recebe o bloco do simulado e atualiza perfil, níveis e prioridades. |
| `/status` | Panorama curto e a única coisa a fazer hoje. |
| `/banco` | Audita o banco: tabela cruzada, cobertura por passo, itens sem fonte conferida. |

Questões novas nascem aqui, pelo Claude Code, e entram em `docs/banco.js`.
A plataforma online aplica; ela não gera.
