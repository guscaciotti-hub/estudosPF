---
description: Panorama curto — índice por matéria, pendências e a única coisa a fazer hoje
---

Panorama. **Curto.** Ninguém pediu relatório.

Leia `dados/perfil.json`, `dados/historico.jsonl`, `edital/verticalizado.md`
e `simulados/AGENDA.md`.

Responda exatamente nesta ordem, e nada além disto:

1. **Índice líquido por matéria** — uma tabela de 6 linhas, com o número de
   questões respondidas em cada. Matéria sem dado: escreva "sem medição",
   não escreva 0,00. Zero é um resultado; ausência de dado não é.
   Nunca percentual bruto de acerto.

2. **Dias desde a última sessão.** Se for 7 ou mais, essa linha vem em
   primeiro lugar, antes da tabela, e diz o que esfriou.

3. **Assuntos em aberto** — quantos `[ ]`, quantos `[~]`, quantos `[x]`, por
   matéria. Só os números.

4. **Próximo simulado** — data e quantos dias faltam.

5. **A única coisa que você deveria fazer hoje** — uma linha. Um assunto, um
   comando, um motivo numérico. Não ofereça alternativa, não dê menu.

Se o índice líquido de alguma matéria estiver negativo, abra a resposta
dizendo isso e quanto. Negativo significa que, na prova de hoje, essa
matéria subtrairia pontos — e isso vem antes de qualquer outra informação.
