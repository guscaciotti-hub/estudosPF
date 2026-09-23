---
description: Audita o banco de questões — vazamento de gabarito, cobertura e fontes
---

Auditoria de `docs/banco.js`. Rode sempre depois de acrescentar questões, e
antes de qualquer commit que mexa no banco.

Imprima, nesta ordem:

## 1. Tabela cruzada formato × gabarito

Uma linha por formato, com contagem de Certo, de Errado e o percentual da
minoria.

**Dois limites, de `CLAUDE.md` §2:**

- minoria de cada formato ≥ **30%**;
- nenhum formato acima de **80%** em um gabarito.

Falhou algum? Diga **quais itens** precisam ser reescritos e **em que
direção** — por exemplo, "faltam 3 itens Certos de premissa e conclusão".
**Nunca troque o rótulo do mecanismo para a tabela fechar.** O rótulo
descreve a forma real do item; maquiar a validação esconde o vazamento em vez
de corrigi-lo, e o vazamento é o defeito que invalida toda medição.

## 2. Proporção global

Deve ficar perto de 45% Certo e 55% Errado.

## 3. Cobertura por passo

Questões por passo, com os pesos em itens de prova ao lado. Marque os passos
com **menos de 6 questões** — abaixo disso o passo não consegue atingir o
nível aceitável, porque o critério exige 6 respondidas.

Marque também os passos cujas questões inéditas se esgotaram para o Gustavo,
se `dados/historico.jsonl` tiver dados.

## 4. Cobertura por matéria

Questões no banco contra itens na prova. Aponte desequilíbrio grosseiro — uma
matéria de 4 itens com 20 questões, ou uma de 36 itens com 6.

## 5. Itens sem fonte conferida

Conte e liste os itens com `cf: 1` — os que dependem de norma e foram gerados
sem consulta à fonte oficial. Diga quantos são e em que passos estão.

## 6. Integridade

- IDs duplicados.
- Enunciados repetidos (hash sha1 do enunciado normalizado).
- Itens sem passo, sem matéria ou com campo vazio.
- Passos declarados em `docs/dados.js` sem nenhuma questão.
- Passos sem resumo no `CADERNO`.

Feche com um veredito de uma linha: o banco está apto a medir, ou não está e
por quê.
