# Plataforma de estudo — Agente PF

Aplicação estática, sem servidor e sem back-end. Todo o histórico fica no
`localStorage` do navegador de quem estuda — nada é enviado para lugar nenhum.

| Arquivo | O que é |
|---|---|
| `index.html` | estrutura das quatro telas: painel, sessão, simulado, dados |
| `app.css` | tokens de cor com tema claro e escuro, barras divergentes, layout |
| `app.js` | perfil derivado do histórico, fila de prioridade, seleção de questões, simulado |
| `banco.js` | banco de questões (`const BANCO`) |
| `sw.js` | cache offline |

## Publicação

Servido pelo GitHub Pages a partir desta pasta `docs/`. Qualquer push nesta
pasta republica o site.

Ao alterar `banco.js`, `app.js` ou `app.css`, **incremente `VERSAO` em
`sw.js`** — sem isso, quem já abriu o site continua recebendo a versão em
cache.

## Formato do banco

```js
{ id: "INF-001",                 // prefixo por matéria + sequencial
  m:  "Informatica",             // Informatica|Portugues|Contabilidade|RLM|Estatistica|Direito
  a:  "Modelo OSI: as sete camadas e suas funções",   // assunto do verticalizado
  mec:"troca de rotulos",        // um dos seis mecanismos da Cebraspe
  g:  "E",                       // gabarito: C ou E
  t:  "...",                     // enunciado
  e:  "...",                     // explicação
  c:  "...",                     // a cilada: por que um candidato preparado erraria
  cf: 1 }                        // opcional: item dependente de norma não conferida na fonte
```

Regras que o banco precisa respeitar, e que a aplicação assume:

- ≈ 60% de gabaritos `E` e 40% `C`;
- ao menos um item de `literalidade limpa` por matéria — a seleção o garante
  em cada bloco, mas só consegue se ele existir no banco;
- os seis mecanismos presentes;
- nenhum enunciado repetido nem variação reconhecível de outro;
- nenhuma norma, prazo, valor ou artigo sem confirmação em fonte. Item gerado
  sem essa confirmação leva `cf: 1` e aparece sinalizado na revisão.

## Regras de cálculo

- **Índice líquido** = (certas − erradas) ÷ respondidas. Métrica única. Nunca
  percentual bruto de acerto.
- **Prioridade** = peso da matéria × déficit, com déficit 0,9 para assunto
  nunca tocado e (1 − índice) ÷ 2 para os demais. Índice negativo na última
  sessão multiplica por 1,5; índice positivo visto há menos de 3 dias
  multiplica por 0,25.
- **Status:** `[~]` a partir da primeira questão respondida, `[x]` com índice
  ≥ 0,60 e 8 ou mais respondidas, voltando a `[~]` se cair.
- **Evolução real** entre simulados exige ganho de 0,25. Abaixo disso é ruído
  de amostra pequena.

O projeto na raiz do repositório (`CLAUDE.md`, `edital/`, `dados/`,
`.claude/commands/`) continua valendo para as sessões conduzidas dentro do
Claude Code, que é onde questões novas são escritas e o banco cresce.
