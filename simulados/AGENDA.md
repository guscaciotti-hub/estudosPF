# Agenda de simulados de etapa

O simulado de etapa é o único instrumento que mede evolução neste projeto.
Sessão diária mede esforço; simulado mede resultado. São coisas diferentes e
só a segunda importa na hora da prova.

---

## S01 — 23/09/2026 · MARCO ZERO

| | |
|---|---|
| Arquivo | `simulados/S01-2026-09-23.html` |
| Questões | 30 |
| Distribuição | Informática 9 · Português 6 · Contabilidade 5 · RLM 4 · Estatística 3 · Direito 3 |
| Gabaritos | 18 Errado / 12 Certo (60/40) |
| Mecanismos | os seis presentes |
| Status | gerado, aguardando execução e `/registrar` |

**Exceção aplicada:** como nenhum assunto estava `[~]` ou `[x]` no
verticalizado, este simulado sorteou do programa inteiro, respeitando os
pesos. É a exceção do marco zero, prevista em `.claude/commands/simulado.md`.
**Vale uma vez só.** A partir do S02 valem apenas assuntos já iniciados.

---

## S02 — 13/10/2026 · 20 dias depois

Para que a comparação signifique alguma coisa, o S02 replica o S01 em tudo,
menos nas questões:

| Parâmetro | Valor — não alterar |
|---|---|
| Questões | **30** |
| Informática | **9** |
| Português | **6** |
| Contabilidade | **5** |
| RLM | **4** |
| Estatística | **3** |
| Direito | **3** |
| Proporção de gabaritos | **≈ 60% Errado / 40% Certo** |
| Mecanismos | os seis, com ao menos um item de literalidade limpa por matéria |
| Questões | **inéditas** — anti-repetição contra `dados/questoes-usadas.jsonl` |

Mudar o número de questões, a distribuição ou a calibragem entre um simulado
e outro quebra a comparação: a variação no índice líquido passa a refletir a
mudança da prova, não a mudança do candidato. Se em 13/10 houver vontade de
"aumentar para 40 porque estou melhor", a resposta é não. Aumenta-se no S03,
e aí o S03 vira a nova linha de base.

O S02 embute os números do S01 na tela de resultado, para comparação direta.
Isso só funciona se o S01 tiver sido registrado com `/registrar` — sem
registro, não há com o que comparar.

---

## Calendário

| Simulado | Data | Intervalo |
|---|---|---|
| S01 | 23/09/2026 | marco zero |
| S02 | 13/10/2026 | +20 dias |
| S03 | 02/11/2026 | +20 dias |
| S04 | 22/11/2026 | +20 dias |

Vinte dias é o intervalo mínimo em que um estudo de 20 a 30 minutos por dia
produz diferença mensurável. Abaixo disso, o que se mede é ruído de
amostragem — e ruído lido como progresso é pior que nenhuma medição, porque
gera confiança sem lastro.

---

## Protocolo de execução

1. Abrir o HTML no navegador. Funciona offline, sem internet.
2. Fazer a prova inteira de uma vez. Sem consulta, sem pausa longa, sem
   pesquisar item.
3. **Usar o branco de verdade.** Branco vale 0 e chute errado vale −1. Um
   simulado respondido no chute mede a sorte do dia, não o preparo.
4. Ao terminar, copiar o bloco monoespaçado.
5. Rodar `/registrar` e colar o bloco. Só então o resultado entra no
   histórico e a fila de prioridade se reorganiza.

Simulado feito e não registrado é simulado que não aconteceu.
