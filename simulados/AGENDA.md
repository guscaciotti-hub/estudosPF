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
| Distribuição | Informática 9 · Contabilidade Geral 5 · Português 4 · RLM 3 · Matemática 2 · Redação Oficial 2 · Estatística 1 · Contabilidade Pública 1 · Direito 3 |
| Gabaritos | 14 Certo / 16 Errado (47% Certo) |
| Formatos | os seis, **cada um com os dois gabaritos** |
| Status | regenerado em 23/09/2026 com o banco corrigido, aguardando execução |

**Regenerado.** A versão anterior foi descartada porque o banco de onde ela
saiu tinha vazamento de gabarito: todo item Certo era uma transcrição limpa e
todo item Errado uma armadilha, de modo que a aparência do item entregava a
resposta. Como aquele simulado ainda não tinha sido respondido, a troca não
custou nenhuma medição.

O simulado é reproduzível: `node scripts/gera-simulado.js S01 2026-09-23`.
O gerador rejeita qualquer recorte em que um formato com 3 ou mais itens
apareça com um único gabarito.

**Exceção do marco zero:** como nenhum passo estava iniciado, este simulado
sorteou de todo o banco, respeitando os pesos. Vale uma vez só.

---

## S02 — 13/10/2026 · 20 dias depois

Replica o S01 em tudo, menos nas questões:

| Parâmetro | Valor — não alterar |
|---|---|
| Questões | **30** |
| Informática | **9** |
| Contabilidade Geral | **5** |
| Português | **4** |
| Raciocínio Lógico | **3** |
| Matemática | **2** |
| Redação Oficial | **2** |
| Estatística | **1** |
| Contabilidade Pública | **1** |
| Blocos de Direito | **3**, por rodízio |
| Proporção de gabaritos | **≈ 45% Certo / 55% Errado** |
| Formatos | os seis, cada um com os dois gabaritos |
| Questões | **inéditas** |

Mudar o número de questões, a distribuição ou a calibragem entre um simulado
e outro quebra a comparação: a variação no índice passa a refletir a mudança
da prova, não a do candidato. Se em 13/10 houver vontade de "aumentar para 40
porque estou melhor", a resposta é não. Aumenta-se no S03, e o S03 vira a
nova linha de base.

A plataforma online também aplica o simulado, com as mesmas cotas, e guarda o
resultado sozinha. O HTML offline continua servindo para fazer a prova sem
internet e sem depender do navegador do celular.

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
