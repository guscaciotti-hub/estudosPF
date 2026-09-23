---
description: Sessão diária — teoria do passo, 6 questões novas e 3 de revisão
argument-hint: "[passo ou tema opcional]"
---

Sessão de estudo. Passo pedido (pode estar vazio): `$ARGUMENTS`

Leia `CLAUDE.md` inteiro antes de começar. As regras de lá vencem qualquer
coisa escrita aqui.

## Passo 0 — A ausência vem primeiro

Leia `dados/perfil.json`. **Se passaram 7 dias ou mais desde a última sessão,
a primeira frase da sua resposta é isso.** Antes do passo do dia, antes de
qualquer questão. Diga quantos dias e o que esfriou. Uma frase, sem sermão.

## Passo 1 — Escolher o passo

Calcule a fila pela fórmula de `CLAUDE.md` §5:
`itens_na_prova × deficit × swing`. O topo é o passo do dia.

Se o Gustavo passou um argumento, use o passo dele — mas se não for o topo da
fila, diga em uma linha qual estava na frente e por quanto. Ele decide; a
discordância se diz uma vez, com número.

Anuncie com o motivo numérico. Exemplo: *"Passo 9 — Fatos contábeis. Vale 4,3
itens da prova e seu índice é −0,40, com 4 erros e 1 branco: swing 1,80. É
onde há mais ponto disponível agora."*

## Passo 2 — Teoria (~5 min)

Apresente o resumo do passo, de `docs/dados.js` → `CADERNO`. Entre 300 e 500
palavras, denso, sem enrolação de apostila.

Se o passo ainda não tiver resumo, **escreva um agora** e acrescente ao
`CADERNO`. O caderno é o material de revisão do projeto e cresce assim.

## Passo 3 — 6 questões novas (~15 min)

Do passo do dia. Antes de gerar, leia `dados/questoes-usadas.jsonl` inteiro:
nenhum enunciado repetido, nenhuma variação reconhecível.

Calibragem obrigatória (`CLAUDE.md` §2):

- Cada item usa um dos seis **formatos**, e o formato **não pode predizer o
  gabarito**. Escreva Certos com palavra absoluta legítima, Certos de duas
  metades ambas verdadeiras, e Errados de aparência limpa com um só termo
  trocado.
- Proporção aproximada de 4 Errado / 2 Certo no bloco.
- Norma, prazo, valor ou artigo: confirme na fonte. Sem confirmação, troque de
  item. Se gerar mesmo assim, marque `[NÃO CONFERIDO]` e avise na hora.

**Uma por vez.** Apresente a questão, pare, espere a resposta. Não mostre
gabarito, não adiante, não dê dica.

Respondida, mostre: gabarito e saldo do item; **Por quê**, em 2 a 4 linhas; e
**A cilada**, que é o mecanismo psicológico do item — não a repetição da
explicação.

## Passo 4 — 3 questões de revisão (~7 min)

Dos passos com revisão vencida em `dados/revisao.json` (3, 7, 21 e 60 dias).
Priorize questões em que ele já errou. **Fila vazia: 8 questões novas no passo
3 e pule este.**

## Passo 5 — Fechamento

Curto. Saldo líquido e índice da sessão; quais ciladas pegaram, pelo nome do
formato; o nível do passo agora (aceitável exige índice ≥ 0,60 em ≥ 6
questões); e quando cada passo tocado volta na revisão. Uma frase de revisão.
Acabou.

## Passo 6 — Gravar

1. `sessoes/AAAA-MM-DD.md` com tudo.
2. **Append** em `dados/historico.jsonl`: uma linha por questão, com `passo`.
3. **Append** em `dados/questoes-usadas.jsonl`: uma linha por questão gerada,
   com formato, gabarito e hash sha1 do enunciado normalizado.
4. Acrescente as questões novas a `docs/banco.js` e **rode `/banco`** para
   validar a tabela cruzada antes do commit.
5. Atualize `dados/revisao.json`: passo com erro volta ao início (3 dias);
   duas passagens limpas consecutivas tiram o passo da fila.
6. Recalcule `dados/perfil.json` **a partir do histórico**, do zero.
7. Incremente `VERSAO` em `docs/sw.js`.
8. `git add -A && git commit` descrevendo passo, saldo e questões novas.
