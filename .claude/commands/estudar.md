---
description: Sessão diária de 20-30 min — 8 questões Cebraspe inéditas, uma por vez
argument-hint: "[assunto opcional]"
---

Sessão de estudo do dia. Assunto pedido pelo Gustavo (pode estar vazio): `$ARGUMENTS`

Leia `CLAUDE.md` inteiro antes de começar. As regras de lá valem sobre
qualquer coisa escrita aqui.

## Passo 0 — A ausência vem primeiro

Leia `dados/perfil.json` e olhe a data da última sessão registrada.

**Se passaram 7 dias ou mais, a primeira frase da sua resposta é isso.**
Antes do assunto, antes de qualquer questão, antes de qualquer saudação.
Diga quantos dias, diga o que isso custou (o que estava `[~]` e esfriou), e
siga. Uma frase, sem sermão.

## Passo 1 — Escolher o assunto

Leia `dados/perfil.json` e `edital/verticalizado.md`.

**Se o Gustavo passou um assunto como argumento, use esse assunto.** Mas se
ele não for o topo da fila de prioridade, diga isso em uma linha antes de
começar — qual assunto estava na frente e por quanto. Ele decide; você
registra a discordância uma vez e não insiste.

**Se não passou argumento**, calcule a fila pela regra do `CLAUDE.md` §5:

```
deficit = 0.9                        se respondidas == 0
deficit = (1 - indice_liquido) / 2   caso contrário
score   = peso_da_materia × deficit
```

Aplique os desempates, nesta ordem:

1. Assunto com índice líquido negativo na última sessão volta agora.
2. Contabilidade e Estatística antes de Direito, sempre.
3. Assunto com índice positivo espera 3 dias antes de voltar.
4. Empate real: o de maior peso de matéria.

Anuncie o assunto em uma linha, com o motivo numérico. Exemplo: *"Hoje:
Depreciação. Contabilidade vale 17% e você está em −0,20 nela — é o que
mais subtrai ponto na prova agora."*

## Passo 2 — Gerar as 8 questões

Antes de escrever qualquer enunciado, **leia `dados/questoes-usadas.jsonl`
inteiro**. Nenhum enunciado repetido, nenhuma variação reconhecível (mesmo
assunto + mesmo mecanismo + mesma virada = repetição, mesmo com outra
redação).

Calibragem obrigatória no bloco de 8 (`CLAUDE.md` §2):

- Cada questão usa ao menos um dos seis mecanismos.
- Use pelo menos 4 mecanismos diferentes no bloco.
- Proporção de gabarito ≈ 5 Errado / 3 Certo.
- **Pelo menos 1 item de literalidade limpa.** Obrigatório, sem exceção.
- Qualquer item que dependa de lei, prazo, valor, artigo ou redação oficial:
  confirme na fonte. Sem confirmação possível → troque de item. Se gerar
  mesmo assim por falta de fonte, marque `[NAO CONFIRMADO]` e avise na hora.

## Passo 3 — Aplicar, uma por vez

Apresente **uma questão**. Formato:

```
Questão 1/8 — <Assunto>

<enunciado>

Certo, Errado ou Branco?
```

**Pare. Espere a resposta.** Não mostre gabarito, não adiante a próxima, não
dê dica, não comente o enunciado.

Quando ele responder, mostre:

```
Gabarito: <CERTO|ERRADO>  ·  Você: <resposta>  ·  <+1 | -1 | 0>

Por quê: <explicação direta, 2 a 4 linhas>

A cilada: <o mecanismo psicológico do item — o que ele explora em quem
estudou. Não repita a explicação.>
```

Depois disso, e só depois, a próxima questão.

Se ele responder algo ambíguo, peça Certo, Errado ou Branco. Não interprete.

## Passo 4 — Fechamento

Curto. Exatamente isto, nada mais:

- Saldo líquido da sessão (acertos − erros) e o índice líquido do bloco.
- Quais ciladas pegaram — pelo nome do mecanismo, não pelo número da questão.
- **Uma frase** sobre o que revisar.

Sem relatório longo, sem elogio, sem resumo do que foi estudado.

## Passo 5 — Gravar

Nesta ordem:

1. `sessoes/AAAA-MM-DD.md` — assunto, as 8 questões com gabarito, resposta,
   mecanismo, explicação e cilada, e o fechamento.
2. `dados/historico.jsonl` — **append**, uma linha por questão:
   ```json
   {"data":"AAAA-MM-DD","origem":"estudar","materia":"...","assunto":"...","mecanismo":"...","gabarito":"C","resposta":"E","resultado":-1,"hash":"<sha1>"}
   ```
3. `dados/questoes-usadas.jsonl` — **append**, uma linha por questão gerada:
   ```json
   {"data":"AAAA-MM-DD","materia":"...","assunto":"...","mecanismo":"...","gabarito":"C","enunciado":"...","hash":"<sha1>"}
   ```
   Hash: `sha1` do enunciado normalizado (minúsculas, sem acento, sem
   pontuação, espaços colapsados).
4. `dados/perfil.json` — **recalcule a partir de `historico.jsonl`**, do
   zero. Não incremente contadores na mão. Atualize `ciladas_recorrentes` do
   assunto com os mecanismos que erraram 2 ou mais vezes no histórico.
5. `edital/verticalizado.md` — ajuste o marcador de status do assunto pela
   regra do `CLAUDE.md` §5.
6. `git add -A && git commit` descrevendo assunto e saldo.
