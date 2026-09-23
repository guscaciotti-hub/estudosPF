---
description: Simulado de etapa — gera HTML offline autocontido com N questões
argument-hint: "[n_questoes, padrão 40]"
---

Simulado de etapa. Número de questões pedido (vazio = 40): `$ARGUMENTS`

Leia `CLAUDE.md` inteiro antes de começar.

## Passo 1 — Montar a distribuição

Distribua as N questões pelos pesos reais da prova, arredondando para que a
soma bata exatamente em N:

| Matéria | Peso | Em 40 | Em 30 |
|---|---|---|---|
| Informática | 30% | 12 | 9 |
| Português | 20% | 8 | 6 |
| Contabilidade | 17% | 7 | 5 |
| RLM | 13% | 5 | 4 |
| Estatística | 10% | 4 | 3 |
| Direito | 10% | 4 | 3 |

**Só entram assuntos marcados `[~]` ou `[x]` no verticalizado.**

*Exceção única — o marco zero:* se **nenhum** assunto estiver `[~]` ou `[x]`
(primeiro simulado do projeto), sorteie do programa inteiro, respeitando os
pesos. Registre isso dentro do HTML e no `AGENDA.md`. Essa exceção vale uma
vez só; a partir do S02 a regra normal manda.

Dentro de cada matéria, priorize os assuntos de menor índice líquido — o
simulado mede, e o que precisa de medição é o que está torto.

## Passo 2 — Gerar as questões

Mesma calibragem do `/estudar` (`CLAUDE.md` §2), aplicada ao simulado
inteiro:

- Cada questão usa ao menos um dos seis mecanismos.
- Os seis mecanismos aparecem no simulado.
- ≈ 60% gabarito Errado, 40% Certo.
- **Ao menos um item de literalidade limpa por matéria.**
- Anti-repetição contra `dados/questoes-usadas.jsonl` (leia antes).
- Nenhuma norma sem confirmação em fonte.

## Passo 3 — Gerar o HTML

Arquivo: `simulados/SNN-AAAA-MM-DD.html` (`NN` = número sequencial, 01, 02…).

Requisitos não negociáveis:

- **Página única, autocontida, offline.** Zero CDN, zero webfont, zero
  `fetch`, zero `import`. Abre com duplo clique, sem internet.
- Uma questão por vez. Botões **Certo · Errado · Deixar em branco**.
- **Nenhum gabarito, nenhuma cor de acerto/erro durante a prova.** Nem
  contador de acertos. Só o progresso (`12/30`).
- Permitir voltar à questão anterior e trocar a resposta antes de finalizar.
- Cronômetro contando o tempo decorrido, sem limite e sem alarme.
- Ao finalizar, a tela de resultado mostra:
  1. **Saldo líquido** (certas − erradas) e **índice líquido**, em destaque.
     Nunca percentual bruto de acerto.
  2. **Rendimento por matéria em barras**, com o índice líquido de cada uma.
     Barra para a direita quando positivo, para a esquerda quando negativo,
     a partir de um zero central — o zero precisa ser visível, porque
     negativo é o estado que importa enxergar.
  3. **Comparação com o simulado anterior**, quando houver. Embuta os dados
     do simulado anterior direto no HTML no momento da geração (leia
     `perfil.json` → `simulados`). Se não houver, escreva "marco zero — sem
     comparação possível".
  4. **Revisão item a item**: enunciado, gabarito, resposta dada, explicação
     e a cilada. Depois da prova o gabarito é liberado.
  5. **Bloco de texto monoespaçado pronto para copiar**, com botão de copiar,
     exatamente neste formato:

```
=== PF-AGENTE SIMULADO SNN ===
data: AAAA-MM-DD
questoes: N
tempo: HH:MM:SS
certas: C  erradas: E  brancos: B
saldo_liquido: S
indice_liquido: 0.000
--- por materia ---
Materia|total|c|e|b|liq
--- por assunto ---
Assunto|Materia|c|e|b
--- itens ---
NN|Assunto|gabarito|resposta|resultado|mecanismo
=== FIM ===
```

- Layout legível em tela de celular e de notebook. Tipografia grande,
  contraste alto, sem distração.

## Passo 4 — Não registrar nada

`/simulado` **não escreve** em `historico.jsonl` nem em `perfil.json`. Quem
registra é o `/registrar`, com o bloco colado.

Escreva sim em `dados/questoes-usadas.jsonl` — as questões foram geradas e
não podem voltar a aparecer.

Entregue o caminho do arquivo e diga para rodar `/registrar` depois, colando
o bloco.
