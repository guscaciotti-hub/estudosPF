---
description: Simulado de etapa — gera HTML offline autocontido com N questões
argument-hint: "[n_questoes, padrão 40]"
---

Simulado de etapa. Número de questões pedido (vazio = 40): `$ARGUMENTS`

Leia `CLAUDE.md` inteiro antes de começar.

## Passo 1 — Montar a distribuição

Pelos **itens de prova** de `dados/perfil.json` → `materias`, nunca por
percentual estimado. Em 30 itens:

| Matéria | Em 30 | Matéria | Em 30 |
|---|---|---|---|
| Informática | 9 | Estatística | 1 |
| Contabilidade Geral | 5 | Contabilidade Pública | 1 |
| Português | 4 | Blocos de Direito | 3 |
| Raciocínio Lógico | 3 | | |
| Matemática | 2 | | |
| Redação Oficial | 2 | | |

Os 3 itens de Direito entram por **rodízio** entre Constitucional,
Administrativo, Penal, Processual Penal, Legislação Federal e Ambiental,
escolhidos pela prioridade do momento — são 12 itens de prova repartidos em
seis blocos pequenos, e sortear todos em todo simulado inflaria Direito.

Para outros tamanhos, proporcione a partir dos itens de prova e feche a soma
exatamente em N.

**Só entram passos com nível diferente de `não iniciado`.**

*Exceção única — o marco zero:* se nenhum passo tiver sido iniciado, sorteie
de todos, respeitando os pesos. Registre isso no HTML e no `AGENDA.md`. Vale
uma vez só.

Dentro de cada matéria, priorize os passos de menor índice líquido.

## Passo 2 — Gerar as questões

Mesma calibragem do `/estudar` (`CLAUDE.md` §2), aplicada ao simulado
inteiro:

- Cada item usa um dos seis **formatos**, e o formato **não pode predizer o
  gabarito** — confira a tabela cruzada com `/banco` antes de gerar o HTML.
- ≈ 55% gabarito Errado, 45% Certo.
- **Ao menos um item de aparência literal por matéria**, de qualquer gabarito.
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
