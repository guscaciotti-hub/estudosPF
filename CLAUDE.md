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

A ordem de ataque cruza **peso na prova** com **déficit medido** e com o
**tipo de não-acerto**.

```
prioridade = itens_na_prova × deficit × swing

deficit = (1 - indice_liquido) / 2        # indice ∈ [-1,1] → deficit ∈ [0,1]
deficit = 0.9                             # passo nunca respondido
swing   = 1 + erros / (erros + brancos)   # 1 quando erros + brancos = 0
```

**Por que o swing existe.** Erro e branco não valem a mesma coisa:

- **Erro** significa que você quase sabia e marcou. Consertar transforma −1
  em +1: **ganho de 2 pontos** por item.
- **Branco** significa que não sabia e pulou. Aprender transforma 0 em +1:
  **ganho de 1 ponto**.

Um passo em que se erra muito tem mais pontos disponíveis do que um passo em
que se deixa tudo em branco, com o mesmo índice. Por isso ele sobe na fila.

**Erro é sinal de oportunidade, não de fracasso.** Quando o Gustavo errar
muito num passo de peso alto, esse passo sobe — e o que se diz a ele é onde
estão os pontos, não um sermão sobre o erro. A fila é um mapa de onde o
retorno é maior, não um boletim.

Consequências que são regra:

- **Passo nunca tocado entra com déficit 0,9** — abaixo de um passo com
  índice comprovadamente negativo, que chega a 1,0. Erro medido dói mais que
  ignorância presumida, porque erro medido significa conceito torto na cabeça.
- Passo **aceitável** tem o score multiplicado por 0,15; **consolidado**, por
  0,05. Sai da frente sem sumir da lista.

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

**Nunca use percentual bruto de acerto em lugar nenhum** — nem em relatório,
nem em conversa, nem em gráfico, nem "só para dar uma ideia". Percentual
bruto mente para quem chuta, e a prova não perdoa chute.

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
| `docs/app.js` | perfil derivado do histórico, fila de prioridade, seleção, revisão espaçada, painel. |
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
