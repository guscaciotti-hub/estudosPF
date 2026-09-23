---
description: Recebe o bloco de texto do simulado e atualiza perfil, verticalizado e prioridades
---

O Gustavo vai colar o bloco monoespaçado gerado pelo simulado.

Se ele rodou `/registrar` sem colar nada, peça o bloco em uma linha e pare.

Leia `CLAUDE.md` inteiro antes de começar.

## Passo 1 — Gravar

1. Faça o parse do bloco. Se algum campo não bater com o formato esperado,
   diga qual e pare — **não adivinhe número, não complete lacuna**.
2. Confira a aritmética: `saldo_liquido` tem que ser `certas − erradas`, e
   `certas + erradas + brancos` tem que bater com `questoes`. Se não bater,
   avise e pare.
3. **Append** em `dados/historico.jsonl`, uma linha por item do bloco, com
   `"origem":"simulado"` e o identificador do simulado.
4. Acrescente o resultado ao array `simulados` de `dados/perfil.json`:
   ```json
   {"id":"SNN","data":"AAAA-MM-DD","questoes":30,"tempo":"HH:MM:SS",
    "certas":0,"erradas":0,"brancos":0,"saldo_liquido":0,"indice_liquido":0.0,
    "por_materia":{"Informatica":{"total":9,"c":0,"e":0,"b":0,"liq":0.0}}}
   ```
5. **Recalcule `assuntos` inteiro a partir de `historico.jsonl`.** Do zero,
   não por incremento.

## Passo 2 — Comparar, assunto por assunto

Contra o simulado anterior. Sem simulado anterior, diga "marco zero" e pule
direto para o Passo 3.

Classifique cada assunto medido nos dois simulados em três listas, e use
estas palavras:

- **Evolução real** — índice líquido subiu 0,25 ou mais. Abaixo disso é
  ruído de amostra pequena, e chamar ruído de evolução é mentir com número.
- **Estagnou** — variação entre −0,25 e +0,25.
- **Piorou** — caiu 0,25 ou mais.

Fale primeiro do que piorou, depois do que estagnou, por último do que
evoluiu. E seja franco: se o saldo líquido geral caiu, a primeira frase diz
que caiu e quanto. Sem "mas".

Assunto que aparece só num dos dois simulados: diga que não é comparável, e
não o conte como evolução.

## Passo 3 — Atualizar o verticalizado

Aplique a regra do `CLAUDE.md` §5 a cada assunto medido:

- primeira questão respondida → `[ ]` vira `[~]`
- índice líquido ≥ 0,60 com ≥ 8 respondidas → `[x]`
- índice líquido < 0,60 → volta para `[~]`, mesmo que já estivesse `[x]`

Liste as mudanças de status. Rebaixamento se diz em voz alta.

## Passo 4 — Reordenar a fila

Recalcule o `score` de prioridade de todos os assuntos (`CLAUDE.md` §5) e
diga, em no máximo 6 linhas:

- Os 3 assuntos do topo da fila agora.
- **O que mudou em relação à fila de ontem** e por quê — o número que mudou,
  não a sensação.
- A data do próximo simulado de etapa (veja `simulados/AGENDA.md`).

Commit: `git add -A && git commit` com o id do simulado e o saldo líquido.
