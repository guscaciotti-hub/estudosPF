# Trilha linear — Agente PF (Cebraspe) · proposta v2

Refeita sobre a estrutura de blocos do edital (item 7.1.3) que o Gustavo
transcreveu. **113 sessões de ~50 min, 5 por semana = 23 semanas (5,2 meses).**
Cada tópico leva uma videoaula gratuita do YouTube.

Pendente de aprovação. Nenhuma linha de código foi escrita.

## As videoaulas

**140 dos 141 tópicos têm link.** O único sem é Direitos Humanos, que ainda
não tem tópico nenhum — depende do PDF do edital.

Como foram escolhidas: busca na web restrita a `youtube.com`, uma consulta por
tópico, preferindo canal de concurso brasileiro e descartando vídeo de Portugal
ou Angola (grafia "património", "activo", e norma contábil diferente). Onde
apareceu aula específica de PF ou de Cebraspe, foi ela que entrou — é o caso de
Organização administrativa, Abuso de autoridade, Lei de Migração, Computação em
nuvem, Criptografia, Regressão linear, Contabilidade Geral para PF, Interpretação
de texto e Big Data.

**O que eu não pude fazer: abrir os vídeos.** O proxy desta sessão recusa
`youtube.com` — a mesma trava que bloqueia o PDF do edital. Então os links são
resultados reais de busca, com título que bate com o tópico, mas eu não conferi
conteúdo, duração, qualidade nem se o vídeo ainda está no ar. Tentei verificar
pelo endpoint oEmbed do YouTube e a conexão foi recusada (HTTP 403 do gateway).

Na prática: trate cada link como uma indicação, não como aula aprovada. Se algum
cair ou não servir, me diga qual tópico e eu troco.

Cinco tópicos levam ressalva, porque a aula cobre só parte do assunto:

| Tópico | Ressalva |
|---|---|
| Lei 7.716/1989 — Crimes de preconceito e racismo | confira se cobre a alteracao da Lei 14.532/2023 |
| Ataques: phishing, engenharia social, DoS/DDoS, man-in-the-middle, força bruta | cobre phishing e engenharia social; DDoS e MITM nao achei em aula de concurso |
| Conciliação bancária | nao achei aula de conciliacao bancaria voltada a concurso |
| Assinatura digital, certificado digital, ICP-Brasil, funções de hash | nao cobre funcoes de hash |
| Firewall, IDS/IPS, VPN, proxy | IDS/IPS ficam de fora; ha aula separada em tab8UIC94Hk |

A lista completa, em formato de dados, está em `dados/videoaulas.json`.

## O que mudou em relação à v1

| | v1 (descartada) | v2 |
|---|---|---|
| Matemática | 13 sessões | **fora** — não cai para Agente |
| Redação Oficial | 10 sessões | **fora** — não cai para Agente |
| Contabilidade Pública | 6 sessões | **fora** — não cai para Agente |
| Direito Ambiental | 2 sessões | **fora** — não está no Bloco I |
| Contabilidade Geral | 20 itens | **24 itens** |
| Direitos Humanos | ausente | **entra**, 2 itens |
| Direito (total) | 12 itens | **22 itens** |
| Penal + Proc. Penal | 2 matérias | **fundidas**, como no edital |
| Legislação Federal | nome meu | **Legislação Especial**, nome do edital |
| Total de sessões | 190 | **113** |

## Pesos

| Matéria | Bloco | Itens | Fonte do número | Sessões |
|---|---|---|---|---|
| Informática | II | 36 | **edital, item 7.1.3** | 36 |
| Contabilidade Geral | III | 24 | **edital, item 7.1.3** | 24 |
| Língua Portuguesa | I | 18 | premissa minha | 18 |
| Raciocínio Lógico | I | 12 | premissa minha | 9 |
| Estatística | I | 8 | premissa minha | 7 |
| Direito Administrativo | I | 6 | premissa minha | 5 |
| Direito Constitucional | I | 6 | premissa minha | 4 |
| Direito Penal e Proc. Penal | I | 5 | premissa minha | 5 |
| Legislação Especial | I | 3 | premissa minha | 3 |
| Direitos Humanos | I | 2 | premissa minha | 2 |
| **Total** | | **120** | | **113** |

### A premissa que usei no Bloco I

O edital fecha o Bloco I em 60 itens e lista as 8 matérias, mas **não diz
quantos itens cada uma vale**. Não consigo abrir a prova de 2025 (o proxy
desta sessão recusa cdn.cebraspe.org.br, www.cebraspe.org.br e gov.br), então
reparti os 60 escalando as proporções da prova anterior que você me passou no
começo (Português ~20%, RLM ~13%, Estatística ~10%, Direito ~10%) e dei a
Direitos Humanos e Legislação Especial a fatia menor, por serem as entradas
novas e de programa curto.

**É o número mais fraco do sistema.** Fica como uma constante única no código:
trocar a repartição não mexe em nada além dela. Se você abrir o caderno de 2025
e contar os itens por matéria, eu refaço.

## Os dois furos que você precisa ver antes de aprovar

**1. Direitos Humanos não tem nenhum tópico.** Nunca existiu neste repositório.
As 2 sessões estão reservadas e marcadas `(aguardando o edital)`. Só o PDF
preenche — não vou inventar programa de matéria nenhuma.

**2. Direito Penal e Processual Penal: 17 tópicos em 5 sessões (3,4 por sessão).**
Legislação Especial: 10 em 3 (3,3). É muito conteúdo por sessão. A alternativa é
dar mais sessões do que o peso justifica — e aí Informática e Contabilidade, que
valem 60 dos 120 itens, perdem espaço. Minha posição: **mantenho a proporção.**
5 itens de 120 não merecem passagem profunda. Passagem rasa ali é a decisão certa,
e é bom que fique explícito que é rasa.

**3. Os nomes dos tópicos ainda são a minha reconstrução de memória.** A estrutura
de blocos e pesos é sua, do edital. A lista de tópicos dentro de cada matéria não é
verificada. Aprovar esta trilha aprova o *desenho*; os nomes mudam quando o PDF chegar,
e as videoaulas dos tópicos que mudarem de nome serão refeitas.

## Como as sessões foram dimensionadas

Dentro da cota de cada matéria:

- Matéria com **mais sessões que tópicos** (Informática, Português): tópico que
  enumera muitos subitens ganha 2 ou 3 sessões; tópico de uma ideia só ganha 1.
- Matéria com **mais tópicos que sessões** (Direito, Estatística, RLM): tópicos
  vizinhos são agrupados.
- A ordem intercala matérias pela razão *entregue ÷ alocado*, então nunca passam
  mais de **2 sessões seguidas** da mesma matéria.

## A trilha

Sessão que repete tópico (marcada 1/2, 2/2) usa a mesma videoaula: é o mesmo
assunto fatiado em dois dias.


### Semana 1

| # | Dia | Matéria | Tópico | Videoaula |
|---|---|---|---|---|
| 1 | seg | Informática | Conceitos de hardware: processador, memória, barramentos, dispositivos de E/S (1/2) | [▶](https://www.youtube.com/watch?v=1P1LIA0QeHw) |
| 2 | ter | Contabilidade Geral | Conceito, objeto, campo de aplicação e finalidade da contabilidade | [▶](https://www.youtube.com/watch?v=rlNcN1C4miI) |
| 3 | qua | Língua Portuguesa | Compreensão e interpretação de textos (1/2) | [▶](https://www.youtube.com/watch?v=DvDXfVkpatM) |
| 4 | qui | Raciocínio Lógico | Proposições: conceito, valor lógico, proposições simples e compostas · Conectivos e tabelas-verdade | [▶](https://www.youtube.com/watch?v=PltqUuwR9ec) [▶](https://www.youtube.com/watch?v=L73yZkTQ9pE) |
| 5 | sex | Estatística | População, amostra e tipos de amostragem · Tipos de variáveis: qualitativas e quantitativas | [▶](https://www.youtube.com/watch?v=kd6w9_G8Z5w) [▶](https://www.youtube.com/watch?v=fhUo_GKtZHo) |

### Semana 2

| # | Dia | Matéria | Tópico | Videoaula |
|---|---|---|---|---|
| 6 | seg | Direito Administrativo | Administração pública: conceito, princípios expressos e implícitos · Organização administrativa: administração direta e indireta | [▶](https://www.youtube.com/watch?v=EPEcPAa_quo) [▶](https://www.youtube.com/watch?v=OgoRR4eePtA) |
| 7 | ter | Direito Constitucional | Princípios fundamentais · Direitos e garantias fundamentais: direitos individuais e coletivos | [▶](https://www.youtube.com/watch?v=ypNuEbiWysw) [▶](https://www.youtube.com/watch?v=9XDXxP0ACG0) |
| 8 | qua | Direito Penal e Proc. Penal | Aplicação da lei penal no tempo e no espaço · Teoria do crime: fato típico, ilicitude, culpabilidade · Excludentes de ilicitude e de culpabilidade · Concurso de pessoas e concurso de crimes | [▶](https://www.youtube.com/watch?v=wDWH2gcw9Kc) [▶](https://www.youtube.com/watch?v=hjG9QOLCsHM) [▶](https://www.youtube.com/watch?v=9bO5WRZ5MyQ) [▶](https://www.youtube.com/watch?v=UFiw10ByKEg) |
| 9 | qui | Legislação Especial | Lei 10.826/2003 — Estatuto do Desarmamento · Lei 11.343/2006 — Lei de Drogas · Lei 9.455/1997 — Crimes de tortura · Lei 13.869/2019 — Abuso de autoridade | [▶](https://www.youtube.com/watch?v=6WqqpOA5qKs) [▶](https://www.youtube.com/watch?v=i5lcZyzzP_k) [▶](https://www.youtube.com/watch?v=gr7tf8O8O6M) [▶](https://www.youtube.com/watch?v=rtxcS849Dlk) |
| 10 | sex | Direitos Humanos | (aguardando o edital) (1/2) | — |

### Semana 3

| # | Dia | Matéria | Tópico | Videoaula |
|---|---|---|---|---|
| 11 | seg | Informática | Conceitos de hardware: processador, memória, barramentos, dispositivos de E/S (2/2) | [▶](https://www.youtube.com/watch?v=1P1LIA0QeHw) |
| 12 | ter | Contabilidade Geral | Usuários da informação contábil | [▶](https://www.youtube.com/watch?v=vSB_X0BWeBA) |
| 13 | qua | Informática | Conceitos de software: sistema operacional, aplicativos, licenciamento | [▶](https://www.youtube.com/watch?v=DX8yEy7nctg) |
| 14 | qui | Língua Portuguesa | Compreensão e interpretação de textos (2/2) | [▶](https://www.youtube.com/watch?v=DvDXfVkpatM) |
| 15 | sex | Informática | Sistema operacional Windows: interface, arquivos e pastas, permissões, atalhos (1/2) | [▶](https://www.youtube.com/watch?v=Pk98075GVMM) |

### Semana 4

| # | Dia | Matéria | Tópico | Videoaula |
|---|---|---|---|---|
| 16 | seg | Contabilidade Geral | Princípios e características qualitativas da informação contábil | [▶](https://www.youtube.com/watch?v=JDLLNqa0CHI) |
| 17 | ter | Informática | Sistema operacional Windows: interface, arquivos e pastas, permissões, atalhos (2/2) | [▶](https://www.youtube.com/watch?v=Pk98075GVMM) |
| 18 | qua | Língua Portuguesa | Tipologia e gêneros textuais | [▶](https://www.youtube.com/watch?v=VpgB5RNfmhI) |
| 19 | qui | Raciocínio Lógico | Tautologia, contradição e contingência · Equivalências lógicas (condicional, contrapositiva, De Morgan) | [▶](https://www.youtube.com/watch?v=0sC4UM_Mnxk) [▶](https://www.youtube.com/watch?v=j_JbaQWvL4o) |
| 20 | sex | Contabilidade Geral | Patrimônio: bens, direitos e obrigações | [▶](https://www.youtube.com/watch?v=LhslWBz5R7w) |

### Semana 5

| # | Dia | Matéria | Tópico | Videoaula |
|---|---|---|---|---|
| 21 | seg | Informática | Sistema operacional Linux: estrutura de diretórios, permissões, comandos básicos | [▶](https://www.youtube.com/playlist?list=PLM2kqWhoolXFA7hFytx_7dwiKquwJiSKT) |
| 22 | ter | Estatística | Distribuições de frequência, histogramas e representações gráficas · Medidas de posição: média, mediana, moda, quartis e percentis | [▶](https://www.youtube.com/watch?v=a2holH0wN1U) [▶](https://www.youtube.com/watch?v=sD3T3ZUzIQs) |
| 23 | qua | Informática | Edição de textos (Word e LibreOffice Writer) | [▶](https://www.youtube.com/watch?v=q05m0j1M1ko) |
| 24 | qui | Contabilidade Geral | Equação patrimonial e patrimônio líquido | [▶](https://www.youtube.com/watch?v=xN7hLjhaqnM) |
| 25 | sex | Língua Portuguesa | Coesão e coerência textual | [▶](https://www.youtube.com/live/DKeV0lUyVqY) |

### Semana 6

| # | Dia | Matéria | Tópico | Videoaula |
|---|---|---|---|---|
| 26 | seg | Informática | Planilhas eletrônicas (Excel e LibreOffice Calc): fórmulas, funções, referências (1/2) | [▶](https://www.youtube.com/watch?v=oCui9Egbym8) |
| 27 | ter | Direito Administrativo | Poderes administrativos e abuso de poder · Atos administrativos: conceito, requisitos, atributos, espécies, extinção | [▶](https://www.youtube.com/watch?v=PTq_f8l4IFY) [▶](https://www.youtube.com/watch?v=HxtYLsY0loM) |
| 28 | qua | Direito Penal e Proc. Penal | Penas: espécies, aplicação e dosimetria · Extinção da punibilidade e prescrição · Crimes contra a pessoa e contra o patrimônio · Crimes contra a fé pública | [▶](https://www.youtube.com/watch?v=_x49m2vHTTM) [▶](https://www.youtube.com/watch?v=2uAnYIM5-xc) [▶](https://www.youtube.com/watch?v=YJRQGQGfwtA) [▶](https://www.youtube.com/watch?v=-8Sv_ihekQA) |
| 29 | qui | Contabilidade Geral | Contas: conceito, classificação, teoria das contas | [▶](https://www.youtube.com/watch?v=Q-9yGUwxQAg) |
| 30 | sex | Informática | Planilhas eletrônicas (Excel e LibreOffice Calc): fórmulas, funções, referências (2/2) | [▶](https://www.youtube.com/watch?v=oCui9Egbym8) |

### Semana 7

| # | Dia | Matéria | Tópico | Videoaula |
|---|---|---|---|---|
| 31 | seg | Língua Portuguesa | Ortografia oficial | [▶](https://www.youtube.com/watch?v=BcF-pFHtnFY) |
| 32 | ter | Raciocínio Lógico | Negação de proposições compostas · Negação de quantificadores (todo, algum, nenhum) | [▶](https://www.youtube.com/watch?v=5jIkG7zH_WI) [▶](https://www.youtube.com/watch?v=AAyQOogdCn0) |
| 33 | qua | Informática | Apresentações (PowerPoint e LibreOffice Impress) | [▶](https://www.youtube.com/watch?v=6Dbn6s-P7vg) |
| 34 | qui | Contabilidade Geral | Método das partidas dobradas: débito, crédito e saldo | [▶](https://www.youtube.com/watch?v=oO9V2DPmOUE) |
| 35 | sex | Direito Constitucional | Direitos sociais, nacionalidade e direitos políticos · Organização do Estado: União, estados, municípios e competências | [▶](https://www.youtube.com/watch?v=LlEKrSk0LFw) [▶](https://www.youtube.com/watch?v=imshXOmBWXE) |

### Semana 8

| # | Dia | Matéria | Tópico | Videoaula |
|---|---|---|---|---|
| 36 | seg | Informática | Redes de computadores: conceitos, topologias, meios de transmissão | [▶](https://www.youtube.com/watch?v=7U6mXX9HykM) |
| 37 | ter | Língua Portuguesa | Acentuação gráfica | [▶](https://www.youtube.com/watch?v=nWQVPQmxWTk) |
| 38 | qua | Estatística | Medidas de dispersão: amplitude, variância, desvio padrão, coeficiente de variação · Medidas de assimetria e curtose | [▶](https://www.youtube.com/watch?v=JmVyFb7yfJk) [▶](https://www.youtube.com/watch?v=AHLvdbNM7oM) |
| 39 | qui | Contabilidade Geral | Escrituração: livros, lançamentos, fórmulas | [▶](https://www.youtube.com/watch?v=SJkouzsGTIU) |
| 40 | sex | Informática | Modelo OSI: as sete camadas e suas funções | [▶](https://www.youtube.com/watch?v=SMK9ybXsbfw) |

### Semana 9

| # | Dia | Matéria | Tópico | Videoaula |
|---|---|---|---|---|
| 41 | seg | Informática | Arquitetura TCP/IP: camadas, correspondência com o OSI | [▶](https://www.youtube.com/watch?v=c5vfwNBbl4g) |
| 42 | ter | Contabilidade Geral | Fatos contábeis: permutativos, modificativos e mistos | [▶](https://www.youtube.com/watch?v=K0-xREBmXoc) |
| 43 | qua | Língua Portuguesa | Emprego das classes de palavras | [▶](https://www.youtube.com/watch?v=ltrzPijgKi4) |
| 44 | qui | Raciocínio Lógico | Lógica de argumentação: validade, premissas e conclusão · Diagramas lógicos e lógica de primeira ordem | [▶](https://www.youtube.com/watch?v=i26VKRCyi9o) [▶](https://www.youtube.com/watch?v=YTPaDTDzpb4) |
| 45 | sex | Legislação Especial | Lei 12.850/2013 — Organização criminosa · Lei 9.613/1998 — Lavagem de dinheiro · Lei 12.830/2013 — Investigação criminal conduzida por delegado · Lei 8.069/1990 — ECA (disposições penais) | [▶](https://www.youtube.com/watch?v=r_N3qFRQT1c) [▶](https://www.youtube.com/watch?v=UaMAsy-YvOk) [▶](https://www.youtube.com/watch?v=JTVWtsDxYh0) [▶](https://www.youtube.com/watch?v=ktOj5Ztv8Eg) |

### Semana 10

| # | Dia | Matéria | Tópico | Videoaula |
|---|---|---|---|---|
| 46 | seg | Informática | Protocolos: IP, TCP, UDP, HTTP, HTTPS, DNS, DHCP, FTP, SMTP, POP3, IMAP | [▶](https://www.youtube.com/watch?v=DjXDPfyIJP0) |
| 47 | ter | Contabilidade Geral | Regimes contábeis: caixa e competência | [▶](https://www.youtube.com/watch?v=07sA7BIcsPY) |
| 48 | qua | Informática | Endereçamento: IPv4, IPv6, máscara, sub-redes, NAT (1/2) | [▶](https://www.youtube.com/watch?v=n08GDRy8SDU) |
| 49 | qui | Língua Portuguesa | Emprego do sinal indicativo de crase | [▶](https://www.youtube.com/watch?v=JBALZYWrOXg) |
| 50 | sex | Direito Administrativo | Agentes públicos e regime jurídico (Lei 8.112/1990) · Processo administrativo disciplinar | [▶](https://www.youtube.com/watch?v=_5irvphXdAs) [▶](https://www.youtube.com/watch?v=XzJLyCF-LfE) |

### Semana 11

| # | Dia | Matéria | Tópico | Videoaula |
|---|---|---|---|---|
| 51 | seg | Direito Penal e Proc. Penal | Crimes contra a administração pública · Inquérito policial: natureza, características, atribuições · Ação penal pública e privada · Prova: meios, ônus, provas ilícitas, cadeia de custódia | [▶](https://www.youtube.com/watch?v=ptr8RnQuwYU) [▶](https://www.youtube.com/watch?v=LKC-WndRbEU) [▶](https://www.youtube.com/watch?v=ftGw2uVK8HI) [▶](https://www.youtube.com/watch?v=HahRu2pHntY) |
| 52 | ter | Informática | Endereçamento: IPv4, IPv6, máscara, sub-redes, NAT (2/2) | [▶](https://www.youtube.com/watch?v=n08GDRy8SDU) |
| 53 | qua | Contabilidade Geral | Balanço Patrimonial: estrutura, ativo e passivo, critérios de classificação | [▶](https://www.youtube.com/watch?v=4jznWh3QZ7g) |
| 54 | qui | Estatística | Probabilidade: axiomas, eventos, independência, teorema de Bayes · Variáveis aleatórias discretas e contínuas | [▶](https://www.youtube.com/watch?v=8MP2zJZI0rU) [▶](https://www.youtube.com/watch?v=qN_K0NuJPs8) |
| 55 | sex | Informática | Equipamentos de rede: hub, switch, roteador, access point (1/2) | [▶](https://www.youtube.com/watch?v=u2LeXY07vrE) |

### Semana 12

| # | Dia | Matéria | Tópico | Videoaula |
|---|---|---|---|---|
| 56 | seg | Língua Portuguesa | Sintaxe da oração e do período | [▶](https://www.youtube.com/watch?v=ZVfeDI6gPb0) |
| 57 | ter | Raciocínio Lógico | Teoria dos conjuntos e diagramas de Venn · Problemas de raciocínio: ordenação, associação, verdades e mentiras | [▶](https://www.youtube.com/watch?v=EuoEl992v34) [▶](https://www.youtube.com/watch?v=0sDKO4U9UtY) |
| 58 | qua | Contabilidade Geral | Demonstração do Resultado do Exercício (DRE) | [▶](https://www.youtube.com/watch?v=OGxATbGK_o8) |
| 59 | qui | Informática | Equipamentos de rede: hub, switch, roteador, access point (2/2) | [▶](https://www.youtube.com/watch?v=u2LeXY07vrE) |
| 60 | sex | Informática | Internet, intranet e extranet | [▶](https://www.youtube.com/watch?v=Xho87CMk2QU) |

### Semana 13

| # | Dia | Matéria | Tópico | Videoaula |
|---|---|---|---|---|
| 61 | seg | Contabilidade Geral | Demonstração das Mutações do Patrimônio Líquido (DMPL) | [▶](https://www.youtube.com/watch?v=TI3c4mx3X2Y) |
| 62 | ter | Língua Portuguesa | Pontuação | [▶](https://www.youtube.com/watch?v=G8Stjzy-87k) |
| 63 | qua | Direito Constitucional | Administração pública na Constituição (arts. 37 a 41) · Organização dos Poderes | [▶](https://www.youtube.com/watch?v=EGD2phq-x3g) [▶](https://www.youtube.com/watch?v=9Wo79oHd_EU) |
| 64 | qui | Direitos Humanos | (aguardando o edital) (2/2) | — |
| 65 | sex | Informática | Arquitetura cliente-servidor e computação em nuvem (IaaS, PaaS, SaaS) | [▶](https://www.youtube.com/watch?v=z6mCskr1Nts) |

### Semana 14

| # | Dia | Matéria | Tópico | Videoaula |
|---|---|---|---|---|
| 66 | seg | Contabilidade Geral | Demonstração dos Fluxos de Caixa (DFC): métodos direto e indireto | [▶](https://www.youtube.com/watch?v=FeD893hNeDY) |
| 67 | ter | Informática | Navegadores: funcionamento, cache, cookies, navegação anônima (1/2) | [▶](https://www.youtube.com/watch?v=awlDxCI56rw) |
| 68 | qua | Língua Portuguesa | Concordância nominal e verbal | [▶](https://www.youtube.com/watch?v=kFVQOkfV9sk) |
| 69 | qui | Raciocínio Lógico | Análise combinatória: arranjo, combinação, permutação · Probabilidade: conceitos, eventos, probabilidade condicional | [▶](https://www.youtube.com/watch?v=K0sqRZhb1sU) [▶](https://www.youtube.com/watch?v=qX9QiHDooRU) |
| 70 | sex | Estatística | Distribuições: binomial, Poisson, normal · Distribuição amostral da média e teorema central do limite | [▶](https://www.youtube.com/watch?v=kJZ9vcik8Jk) [▶](https://www.youtube.com/watch?v=ieocO73N5lg) |

### Semana 15

| # | Dia | Matéria | Tópico | Videoaula |
|---|---|---|---|---|
| 71 | seg | Informática | Navegadores: funcionamento, cache, cookies, navegação anônima (2/2) | [▶](https://www.youtube.com/watch?v=awlDxCI56rw) |
| 72 | ter | Contabilidade Geral | Ativo imobilizado: reconhecimento, depreciação, amortização, exaustão | [▶](https://www.youtube.com/watch?v=-yYgbqqxiMA) |
| 73 | qua | Direito Administrativo | Improbidade administrativa (Lei 8.429/1992) · Licitações e contratos (Lei 14.133/2021) | [▶](https://www.youtube.com/watch?v=VwwNpee93z4) [▶](https://www.youtube.com/watch?v=QPbq4DMOFF4) |
| 74 | qui | Direito Penal e Proc. Penal | Prisão em flagrante, preventiva e temporária · Medidas cautelares diversas da prisão · Audiência de custódia · Competência e jurisdição | [▶](https://www.youtube.com/watch?v=K2Q8dEsJ9vU) [▶](https://www.youtube.com/watch?v=L-nswRvdUNI) [▶](https://www.youtube.com/watch?v=SqD6qO5BGWk) [▶](https://www.youtube.com/watch?v=HfGjb_Uae0k) |
| 75 | sex | Informática | Correio eletrônico: protocolos, webmail, anexos | [▶](https://www.youtube.com/watch?v=1S_LrhFyj6k) |

### Semana 16

| # | Dia | Matéria | Tópico | Videoaula |
|---|---|---|---|---|
| 76 | seg | Língua Portuguesa | Regência nominal e verbal | [▶](https://www.youtube.com/watch?v=FFgJMolH0CE) |
| 77 | ter | Contabilidade Geral | Estoques: critérios de avaliação (PEPS, média ponderada) | [▶](https://www.youtube.com/watch?v=zkyoZLATPS0) |
| 78 | qua | Informática | Segurança da informação: pilares (confidencialidade, integridade, disponibilidade, autenticidade, não repúdio) (1/2) | [▶](https://www.youtube.com/watch?v=uL92aKf-Osk) |
| 79 | qui | Informática | Segurança da informação: pilares (confidencialidade, integridade, disponibilidade, autenticidade, não repúdio) (2/2) | [▶](https://www.youtube.com/watch?v=uL92aKf-Osk) |
| 80 | sex | Contabilidade Geral | Contas a receber, provisão para perdas e duplicatas descontadas | [▶](https://www.youtube.com/watch?v=8ZtoxXEqqDg) |

### Semana 17

| # | Dia | Matéria | Tópico | Videoaula |
|---|---|---|---|---|
| 81 | seg | Língua Portuguesa | Colocação pronominal | [▶](https://www.youtube.com/watch?v=6zsVwix7Uh0) |
| 82 | ter | Raciocínio Lógico | Sequências e séries numéricas · Razão, proporção, regra de três, porcentagem | [▶](https://www.youtube.com/watch?v=oztKXOtGiCo) [▶](https://www.youtube.com/watch?v=aCjc5HAy3_M) |
| 83 | qua | Legislação Especial | Lei 13.445/2017 — Lei de Migração · Lei 7.716/1989 — Crimes de preconceito e racismo | [▶](https://www.youtube.com/watch?v=kmNCNUyApJ0) [▶](https://www.youtube.com/watch?v=jHuMZKo_1yk) |
| 84 | qui | Informática | Malware: vírus, worm, trojan, ransomware, spyware, rootkit, botnet | [▶](https://www.youtube.com/watch?v=1tVxzd7id7A) |
| 85 | sex | Contabilidade Geral | Provisões, passivos contingentes e ativos contingentes | [▶](https://www.youtube.com/watch?v=meKwKNWyglo) |

### Semana 18

| # | Dia | Matéria | Tópico | Videoaula |
|---|---|---|---|---|
| 86 | seg | Estatística | Estimação pontual e intervalos de confiança · Testes de hipóteses: erros tipo I e II, nível de significância | [▶](https://www.youtube.com/watch?v=xkmKDNkSIMo) [▶](https://www.youtube.com/watch?v=8wo6u6RzRHw) |
| 87 | ter | Informática | Ataques: phishing, engenharia social, DoS/DDoS, man-in-the-middle, força bruta (1/2) | [▶](https://www.youtube.com/watch?v=DVlIcW9YYCc) |
| 88 | qua | Língua Portuguesa | Significação das palavras: sinonímia, antonímia, polissemia (1/3) | [▶](https://www.youtube.com/watch?v=XHR9TPAlz1E) |
| 89 | qui | Informática | Ataques: phishing, engenharia social, DoS/DDoS, man-in-the-middle, força bruta (2/2) | [▶](https://www.youtube.com/watch?v=DVlIcW9YYCc) |
| 90 | sex | Contabilidade Geral | Conciliação bancária | [▶](https://www.youtube.com/watch?v=PYTJVbT48dE) |

### Semana 19

| # | Dia | Matéria | Tópico | Videoaula |
|---|---|---|---|---|
| 91 | seg | Direito Constitucional | Segurança pública (art. 144) e atribuições da Polícia Federal | [▶](https://www.youtube.com/watch?v=p9UR6jdQbys) |
| 92 | ter | Informática | Criptografia simétrica e assimétrica | [▶](https://www.youtube.com/watch?v=sD5sOq5zYHE) |
| 93 | qua | Língua Portuguesa | Significação das palavras: sinonímia, antonímia, polissemia (2/3) | [▶](https://www.youtube.com/watch?v=XHR9TPAlz1E) |
| 94 | qui | Raciocínio Lógico | Juros simples e compostos · Equações, sistemas lineares, matrizes e determinantes | [▶](https://www.youtube.com/watch?v=M8FjTDx44Qw) [▶](https://www.youtube.com/watch?v=Qu3Sh5KaHbU) |
| 95 | sex | Contabilidade Geral | Operações com mercadorias e apuração do resultado | [▶](https://www.youtube.com/watch?v=1RfzaHxVRak) |

### Semana 20

| # | Dia | Matéria | Tópico | Videoaula |
|---|---|---|---|---|
| 96 | seg | Direito Administrativo | Controle da administração e responsabilidade civil do Estado · Processo administrativo federal (Lei 9.784/1999) | [▶](https://www.youtube.com/watch?v=cmgB7eq7I5E) [▶](https://www.youtube.com/watch?v=GZ8FSzQK9Y0) |
| 97 | ter | Direito Penal e Proc. Penal | Habeas corpus e demais ações de impugnação | [▶](https://www.youtube.com/watch?v=Be5lm2hNjmc) |
| 98 | qua | Informática | Assinatura digital, certificado digital, ICP-Brasil, funções de hash | [▶](https://www.youtube.com/watch?v=C_BnOxYZhrU) |
| 99 | qui | Informática | Firewall, IDS/IPS, VPN, proxy | [▶](https://www.youtube.com/watch?v=xsBqFKOHx_c) |
| 100 | sex | Contabilidade Geral | Análise de balanços: índices de liquidez | [▶](https://www.youtube.com/watch?v=OPlGmFWhxPM) |

### Semana 21

| # | Dia | Matéria | Tópico | Videoaula |
|---|---|---|---|---|
| 101 | seg | Língua Portuguesa | Significação das palavras: sinonímia, antonímia, polissemia (3/3) | [▶](https://www.youtube.com/watch?v=XHR9TPAlz1E) |
| 102 | ter | Estatística | Correlação e regressão linear simples · Números-índice | [▶](https://www.youtube.com/watch?v=ZrfhEOdglzY) [▶](https://www.youtube.com/watch?v=8pbaI3nTWNs) |
| 103 | qua | Informática | Autenticação e controle de acesso: senhas, MFA, biometria (1/2) | [▶](https://www.youtube.com/watch?v=1uQOuteFfoY) |
| 104 | qui | Contabilidade Geral | Análise de balanços: índices de endividamento e estrutura de capital | [▶](https://www.youtube.com/watch?v=qhtSHAZCMGk) |
| 105 | sex | Informática | Autenticação e controle de acesso: senhas, MFA, biometria (2/2) | [▶](https://www.youtube.com/watch?v=1uQOuteFfoY) |

### Semana 22

| # | Dia | Matéria | Tópico | Videoaula |
|---|---|---|---|---|
| 106 | seg | Língua Portuguesa | Reescrita de frases e substituição de palavras | [▶](https://www.youtube.com/watch?v=Dh3bcc_7Z1s) |
| 107 | ter | Raciocínio Lógico | Geometria básica: áreas, perímetros, volumes | [▶](https://www.youtube.com/watch?v=kbIgKKPdN6g) |
| 108 | qua | Informática | Backup: tipos (completo, incremental, diferencial), políticas, RPO/RTO (1/2) | [▶](https://www.youtube.com/watch?v=S7B8H_CuOvU) |
| 109 | qui | Contabilidade Geral | Análise de balanços: índices de rentabilidade | [▶](https://www.youtube.com/watch?v=lj5tOIWjtaE) |
| 110 | sex | Informática | Backup: tipos (completo, incremental, diferencial), políticas, RPO/RTO (2/2) | [▶](https://www.youtube.com/watch?v=S7B8H_CuOvU) |

### Semana 23

| # | Dia | Matéria | Tópico | Videoaula |
|---|---|---|---|---|
| 111 | seg | Língua Portuguesa | Vozes verbais e transformação de estruturas | [▶](https://www.youtube.com/watch?v=oOEUGvWauK0) |
| 112 | ter | Contabilidade Geral | Análise horizontal e vertical | [▶](https://www.youtube.com/watch?v=saSi9_2-vrs) |
| 113 | qua | Informática | Noções de banco de dados e big data | [▶](https://www.youtube.com/watch?v=3wqqTzmK8to) |

---

## Videoaula por tópico

O mesmo conteúdo da tabela acima, por matéria, com o título do vídeo.

### Informática — 36 itens

- **Conceitos de hardware: processador, memória, barramentos, dispositivos de E/S** — [Aula 006 — Hardware (Informática para Concursos)](https://www.youtube.com/watch?v=1P1LIA0QeHw)
- **Conceitos de software: sistema operacional, aplicativos, licenciamento** — [Noções de sistemas operacionais para concurso — aula 1](https://www.youtube.com/watch?v=DX8yEy7nctg)
- **Sistema operacional Windows: interface, arquivos e pastas, permissões, atalhos** — [Sistema operacional Windows para concursos (pastas, arquivos, atalhos)](https://www.youtube.com/watch?v=Pk98075GVMM)
- **Sistema operacional Linux: estrutura de diretórios, permissões, comandos básicos** — [Playlist: Linux para concursos 2026 (diretórios, comandos, permissões)](https://www.youtube.com/playlist?list=PLM2kqWhoolXFA7hFytx_7dwiKquwJiSKT)
- **Edição de textos (Word e LibreOffice Writer)** — [Word para concursos: interface, faixa de opções, atalhos e edição](https://www.youtube.com/watch?v=q05m0j1M1ko)
- **Planilhas eletrônicas (Excel e LibreOffice Calc): fórmulas, funções, referências** — [Fórmulas e funções do Excel para concursos — aula 65](https://www.youtube.com/watch?v=oCui9Egbym8)
- **Apresentações (PowerPoint e LibreOffice Impress)** — [PowerPoint para concursos — editores de apresentação, aula 1](https://www.youtube.com/watch?v=6Dbn6s-P7vg)
- **Redes de computadores: conceitos, topologias, meios de transmissão** — [Informática para concursos — aula 01.1: redes de computadores](https://www.youtube.com/watch?v=7U6mXX9HykM)
- **Modelo OSI: as sete camadas e suas funções** — [OSI/ISO nas redes — o que as bancas consideram certo](https://www.youtube.com/watch?v=SMK9ybXsbfw)
- **Arquitetura TCP/IP: camadas, correspondência com o OSI** — [Modelo OSI x TCP/IP — comparação detalhada](https://www.youtube.com/watch?v=c5vfwNBbl4g)
- **Protocolos: IP, TCP, UDP, HTTP, HTTPS, DNS, DHCP, FTP, SMTP, POP3, IMAP** — [Protocolos: TCP, UDP, SMTP, HTTP, FTP, DNS, DHCP, POP, IMAP](https://www.youtube.com/watch?v=DjXDPfyIJP0)
- **Endereçamento: IPv4, IPv6, máscara, sub-redes, NAT** — [Endereçamento IPv4 e IPv6 simplificado](https://www.youtube.com/watch?v=n08GDRy8SDU)
- **Equipamentos de rede: hub, switch, roteador, access point** — [Equipamentos de rede: switch, roteador, repetidor, access point](https://www.youtube.com/watch?v=u2LeXY07vrE)
- **Internet, intranet e extranet** — [Conceitos de intranet, extranet e internet (informática para concursos)](https://www.youtube.com/watch?v=Xho87CMk2QU)
- **Arquitetura cliente-servidor e computação em nuvem (IaaS, PaaS, SaaS)** — [Informática para PF — modalidades de serviço em nuvem (SaaS, PaaS, IaaS)](https://www.youtube.com/watch?v=z6mCskr1Nts)
- **Navegadores: funcionamento, cache, cookies, navegação anônima** — [Navegadores: Edge, Firefox e Chrome (para concursos)](https://www.youtube.com/watch?v=awlDxCI56rw)
- **Correio eletrônico: protocolos, webmail, anexos** — [Informática para concursos: protocolos de e-mail](https://www.youtube.com/watch?v=1S_LrhFyj6k)
- **Segurança da informação: pilares (confidencialidade, integridade, disponibilidade, autenticidade, não repúdio)** — [Pilares da segurança da informação: confidencialidade, integridade, disponibilidade, autenticidade](https://www.youtube.com/watch?v=uL92aKf-Osk)
- **Malware: vírus, worm, trojan, ransomware, spyware, rootkit, botnet** — [Informática para concursos — malware e vírus](https://www.youtube.com/watch?v=1tVxzd7id7A)
- **Ataques: phishing, engenharia social, DoS/DDoS, man-in-the-middle, força bruta** — [Tipos de ataque que caem em concursos: phishing](https://www.youtube.com/watch?v=DVlIcW9YYCc)  
  *cobre phishing e engenharia social; DDoS e MITM nao achei em aula de concurso*
- **Criptografia simétrica e assimétrica** — [Concurso PF — criptografia simétrica e assimétrica](https://www.youtube.com/watch?v=sD5sOq5zYHE)
- **Assinatura digital, certificado digital, ICP-Brasil, funções de hash** — [ICP-Brasil e certificado digital — o que as bancas cobram](https://www.youtube.com/watch?v=C_BnOxYZhrU)  
  *nao cobre funcoes de hash*
- **Firewall, IDS/IPS, VPN, proxy** — [Conceitos de DMZ, firewall, proxy e VPN](https://www.youtube.com/watch?v=xsBqFKOHx_c)  
  *IDS/IPS ficam de fora; ha aula separada em tab8UIC94Hk*
- **Autenticação e controle de acesso: senhas, MFA, biometria** — [Mecanismos de autenticação e autorização de acesso](https://www.youtube.com/watch?v=1uQOuteFfoY)
- **Backup: tipos (completo, incremental, diferencial), políticas, RPO/RTO** — [Informática para concursos: backup completo, incremental e diferencial](https://www.youtube.com/watch?v=S7B8H_CuOvU)
- **Noções de banco de dados e big data** — [Noções de big data (Informática para PF — escrivão)](https://www.youtube.com/watch?v=3wqqTzmK8to)

### Contabilidade Geral — 24 itens

- **Conceito, objeto, campo de aplicação e finalidade da contabilidade** — [Conceito, Objeto, Finalidade, Técnicas Contábeis, Equação Patrimonial](https://www.youtube.com/watch?v=rlNcN1C4miI)
- **Usuários da informação contábil** — [Contabilidade Geral para PF — aula 1: conceitos, objetivos e finalidades](https://www.youtube.com/watch?v=vSB_X0BWeBA)
- **Princípios e características qualitativas da informação contábil** — [Características qualitativas — CPC 00 (fundamentais e de melhoria)](https://www.youtube.com/watch?v=JDLLNqa0CHI)
- **Patrimônio: bens, direitos e obrigações** — [Contabilidade Geral aula 02 — estudo do patrimônio](https://www.youtube.com/watch?v=LhslWBz5R7w)
- **Equação patrimonial e patrimônio líquido** — [Equação fundamental do patrimônio](https://www.youtube.com/watch?v=xN7hLjhaqnM)
- **Contas: conceito, classificação, teoria das contas** — [Teoria das contas (Contabilidade Geral)](https://www.youtube.com/watch?v=Q-9yGUwxQAg)
- **Método das partidas dobradas: débito, crédito e saldo** — [Método das partidas dobradas (aula 01) — débito e crédito](https://www.youtube.com/watch?v=oO9V2DPmOUE)
- **Escrituração: livros, lançamentos, fórmulas** — [Escrituração contábil — parte 1](https://www.youtube.com/watch?v=SJkouzsGTIU)
- **Fatos contábeis: permutativos, modificativos e mistos** — [Fatos contábeis: permutativos, modificativos, mistos + razonetes](https://www.youtube.com/watch?v=K0-xREBmXoc)
- **Regimes contábeis: caixa e competência** — [Regimes contábeis: competência, caixa e misto](https://www.youtube.com/watch?v=07sA7BIcsPY)
- **Balanço Patrimonial: estrutura, ativo e passivo, critérios de classificação** — [Balanço patrimonial: introdução, ativo, passivo, obrigações exigíveis](https://www.youtube.com/watch?v=4jznWh3QZ7g)
- **Demonstração do Resultado do Exercício (DRE)** — [Estrutura da DRE (CPC 26 / Lei das S.A.)](https://www.youtube.com/watch?v=OGxATbGK_o8)
- **Demonstração das Mutações do Patrimônio Líquido (DMPL)** — [DMPL — demonstração das mutações do patrimônio líquido, aula 18](https://www.youtube.com/watch?v=TI3c4mx3X2Y)
- **Demonstração dos Fluxos de Caixa (DFC): métodos direto e indireto** — [Fluxo de caixa — método direto e indireto](https://www.youtube.com/watch?v=FeD893hNeDY)
- **Ativo imobilizado: reconhecimento, depreciação, amortização, exaustão** — [Depreciação, amortização e exaustão (Contabilidade Geral)](https://www.youtube.com/watch?v=-yYgbqqxiMA)
- **Estoques: critérios de avaliação (PEPS, média ponderada)** — [Critérios de avaliação do estoque (PEPS, UEPS, média ponderada)](https://www.youtube.com/watch?v=zkyoZLATPS0)
- **Contas a receber, provisão para perdas e duplicatas descontadas** — [Duplicatas descontadas (Contabilidade Geral)](https://www.youtube.com/watch?v=8ZtoxXEqqDg)
- **Provisões, passivos contingentes e ativos contingentes** — [Provisões, passivos e ativos contingentes (CPC 25)](https://www.youtube.com/watch?v=meKwKNWyglo)
- **Conciliação bancária** — [Conta Bancos — reconciliação bancária (aula 2)](https://www.youtube.com/watch?v=PYTJVbT48dE)  
  *nao achei aula de conciliacao bancaria voltada a concurso*
- **Operações com mercadorias e apuração do resultado** — [Operações com mercadorias — teoria resumida e questões](https://www.youtube.com/watch?v=1RfzaHxVRak)
- **Análise de balanços: índices de liquidez** — [Análise das demonstrações contábeis — índices de liquidez](https://www.youtube.com/watch?v=OPlGmFWhxPM)
- **Análise de balanços: índices de endividamento e estrutura de capital** — [Estrutura de capital e índices de endividamento](https://www.youtube.com/watch?v=qhtSHAZCMGk)
- **Análise de balanços: índices de rentabilidade** — [Índices de rentabilidade](https://www.youtube.com/watch?v=lj5tOIWjtaE)
- **Análise horizontal e vertical** — [Análise vertical e horizontal das demonstrações contábeis](https://www.youtube.com/watch?v=saSi9_2-vrs)

### Língua Portuguesa — 18 itens

- **Compreensão e interpretação de textos** — [Interpretação — banca CESPE/CEBRASPE (INSS/PF/PRF)](https://www.youtube.com/watch?v=DvDXfVkpatM)
- **Tipologia e gêneros textuais** — [PRF 02 — reconhecimento de tipos e gêneros textuais (CESPE)](https://www.youtube.com/watch?v=VpgB5RNfmhI)
- **Coesão e coerência textual** — [CEBRASPE — domínio dos mecanismos de coesão textual](https://www.youtube.com/live/DKeV0lUyVqY)
- **Ortografia oficial** — [Ortografia oficial descomplicada: letras, hífen e acentuação que mais caem](https://www.youtube.com/watch?v=BcF-pFHtnFY)
- **Acentuação gráfica** — [Acentuação para concurso: oxítona, paroxítona, proparoxítona](https://www.youtube.com/watch?v=nWQVPQmxWTk)
- **Emprego das classes de palavras** — [Morfologia: classes de palavras (para concurso)](https://www.youtube.com/watch?v=ltrzPijgKi4)
- **Emprego do sinal indicativo de crase** — [Crase para concursos: questões comentadas CESPE](https://www.youtube.com/watch?v=JBALZYWrOXg)
- **Sintaxe da oração e do período** — [Sintaxe da oração — conceitos mais cobrados (teoria + questões)](https://www.youtube.com/watch?v=ZVfeDI6gPb0)
- **Pontuação** — [Pontuação — aulão completo para concurso público](https://www.youtube.com/watch?v=G8Stjzy-87k)
- **Concordância nominal e verbal** — [Questões comentadas de concordância verbal e nominal](https://www.youtube.com/watch?v=kFVQOkfV9sk)
- **Regência nominal e verbal** — [Regência verbal e nominal — banca CEBRASPE](https://www.youtube.com/watch?v=FFgJMolH0CE)
- **Colocação pronominal** — [Colocação pronominal (para concurso)](https://www.youtube.com/watch?v=6zsVwix7Uh0)
- **Significação das palavras: sinonímia, antonímia, polissemia** — [Semântica para concursos: sinonímia, antonímia, polissemia](https://www.youtube.com/watch?v=XHR9TPAlz1E)
- **Reescrita de frases e substituição de palavras** — [Intensivão de questões CEBRASPE — reescrita, aula 1](https://www.youtube.com/watch?v=Dh3bcc_7Z1s)
- **Vozes verbais e transformação de estruturas** — [Vozes do verbo: ativa, passiva e reflexiva, para concursos](https://www.youtube.com/watch?v=oOEUGvWauK0)

### Raciocínio Lógico — 12 itens

- **Proposições: conceito, valor lógico, proposições simples e compostas** — [Lógica: proposições, valor lógico, princípios lógicos e negação](https://www.youtube.com/watch?v=PltqUuwR9ec)
- **Conectivos e tabelas-verdade** — [Conectivos e tabela-verdade — Prof. Gui, aula 2](https://www.youtube.com/watch?v=L73yZkTQ9pE)
- **Tautologia, contradição e contingência** — [Tautologia, contradição e contingência — teoria + questões](https://www.youtube.com/watch?v=0sC4UM_Mnxk)
- **Equivalências lógicas (condicional, contrapositiva, De Morgan)** — [Como decorar as equivalências lógicas — Prof. Joselias](https://www.youtube.com/watch?v=j_JbaQWvL4o)
- **Negação de proposições compostas** — [Negação de proposições compostas](https://www.youtube.com/watch?v=5jIkG7zH_WI)
- **Negação de quantificadores (todo, algum, nenhum)** — [Quantificadores lógicos: todo, algum e nenhum (equivalência e negação)](https://www.youtube.com/watch?v=AAyQOogdCn0)
- **Lógica de argumentação: validade, premissas e conclusão** — [Argumentação lógica e silogismos — Prof. Gui, aula 5](https://www.youtube.com/watch?v=i26VKRCyi9o)
- **Diagramas lógicos e lógica de primeira ordem** — [Lógica de primeira ordem facilitada — RLM para concursos](https://www.youtube.com/watch?v=YTPaDTDzpb4)
- **Teoria dos conjuntos e diagramas de Venn** — [Diagrama de Venn e teoria dos conjuntos](https://www.youtube.com/watch?v=EuoEl992v34)
- **Problemas de raciocínio: ordenação, associação, verdades e mentiras** — [Associação lógica — como resolver todos os problemas](https://www.youtube.com/watch?v=0sDKO4U9UtY)
- **Análise combinatória: arranjo, combinação, permutação** — [Arranjo, combinação e permutação simples](https://www.youtube.com/watch?v=K0sqRZhb1sU)
- **Probabilidade: conceitos, eventos, probabilidade condicional** — [Probabilidade condicional e independência de eventos — aula 05](https://www.youtube.com/watch?v=qX9QiHDooRU)
- **Sequências e séries numéricas** — [Sequências numéricas em exercícios — RLM para concursos](https://www.youtube.com/watch?v=oztKXOtGiCo)
- **Razão, proporção, regra de três, porcentagem** — [Razão, proporção, regra de três e porcentagem](https://www.youtube.com/watch?v=aCjc5HAy3_M)
- **Juros simples e compostos** — [Comparação entre juros simples e juros compostos](https://www.youtube.com/watch?v=M8FjTDx44Qw)
- **Equações, sistemas lineares, matrizes e determinantes** — [Matrizes, determinantes e sistemas lineares — primeiros conceitos](https://www.youtube.com/watch?v=Qu3Sh5KaHbU)
- **Geometria básica: áreas, perímetros, volumes** — [Perímetro, área e volume — aula 12](https://www.youtube.com/watch?v=kbIgKKPdN6g)

### Estatística — 8 itens

- **População, amostra e tipos de amostragem** — [Estatística aula 1: população, amostra, métodos de amostragem](https://www.youtube.com/watch?v=kd6w9_G8Z5w)
- **Tipos de variáveis: qualitativas e quantitativas** — [Variáveis qualitativas e quantitativas: nominal, ordinal, discreta, contínua](https://www.youtube.com/watch?v=fhUo_GKtZHo)
- **Distribuições de frequência, histogramas e representações gráficas** — [Distribuição de frequências e histograma com polígono](https://www.youtube.com/watch?v=a2holH0wN1U)
- **Medidas de posição: média, mediana, moda, quartis e percentis** — [Medidas de posição e quartis](https://www.youtube.com/watch?v=sD3T3ZUzIQs)
- **Medidas de dispersão: amplitude, variância, desvio padrão, coeficiente de variação** — [Medidas de dispersão: variância, desvio padrão, coeficiente de variação](https://www.youtube.com/watch?v=JmVyFb7yfJk)
- **Medidas de assimetria e curtose** — [Assimetria e curtose — Estatística para concursos](https://www.youtube.com/watch?v=AHLvdbNM7oM)
- **Probabilidade: axiomas, eventos, independência, teorema de Bayes** — [Teorema de Bayes e probabilidade condicional — exercícios de concurso](https://www.youtube.com/watch?v=8MP2zJZI0rU)
- **Variáveis aleatórias discretas e contínuas** — [Variáveis aleatórias — aula 4](https://www.youtube.com/watch?v=qN_K0NuJPs8)
- **Distribuições: binomial, Poisson, normal** — [Distribuição binomial e normal — Estatística (SEFA-PA 2022)](https://www.youtube.com/watch?v=kJZ9vcik8Jk)
- **Distribuição amostral da média e teorema central do limite** — [Distribuição amostral da média e teorema do limite central](https://www.youtube.com/watch?v=ieocO73N5lg)
- **Estimação pontual e intervalos de confiança** — [Estimação pontual e intervalar da média e da proporção](https://www.youtube.com/watch?v=xkmKDNkSIMo)
- **Testes de hipóteses: erros tipo I e II, nível de significância** — [Teste de hipóteses: tipos de erro e nível de significância](https://www.youtube.com/watch?v=8wo6u6RzRHw)
- **Correlação e regressão linear simples** — [Análise de regressão linear — questão de Estatística da Polícia Federal](https://www.youtube.com/watch?v=ZrfhEOdglzY)
- **Números-índice** — [Índices ponderados: Laspeyres, Paasche, Fisher, Marshall-Edgeworth, Divisia](https://www.youtube.com/watch?v=8pbaI3nTWNs)

### Direito Administrativo — 6 itens

- **Administração pública: conceito, princípios expressos e implícitos** — [Princípios expressos e implícitos aplicáveis à administração pública](https://www.youtube.com/watch?v=EPEcPAa_quo)
- **Organização administrativa: administração direta e indireta** — [PF 2025 — Organização administrativa: direta e indireta (aula 58)](https://www.youtube.com/watch?v=OgoRR4eePtA)
- **Poderes administrativos e abuso de poder** — [Aula gratuita: poderes administrativos](https://www.youtube.com/watch?v=PTq_f8l4IFY)
- **Atos administrativos: conceito, requisitos, atributos, espécies, extinção** — [Ato administrativo: requisitos, atributos, anulação](https://www.youtube.com/watch?v=HxtYLsY0loM)
- **Agentes públicos e regime jurídico (Lei 8.112/1990)** — [Lei 8.112/1990 — regime jurídico dos servidores da União, aula 01](https://www.youtube.com/watch?v=_5irvphXdAs)
- **Processo administrativo disciplinar** — [PAD — processo administrativo disciplinar (Lei 8.112/90)](https://www.youtube.com/watch?v=XzJLyCF-LfE)
- **Improbidade administrativa (Lei 8.429/1992)** — [Improbidade administrativa — aula completa e resumida (Lei 8.429/92)](https://www.youtube.com/watch?v=VwwNpee93z4)
- **Licitações e contratos (Lei 14.133/2021)** — [Licitações — Lei 14.133/2021, curso completo parte 1](https://www.youtube.com/watch?v=QPbq4DMOFF4)
- **Controle da administração e responsabilidade civil do Estado** — [Controle e responsabilização da administração (INSS 2022)](https://www.youtube.com/watch?v=cmgB7eq7I5E)
- **Processo administrativo federal (Lei 9.784/1999)** — [Lei 9.784/99 — processo administrativo federal](https://www.youtube.com/watch?v=GZ8FSzQK9Y0)

### Direito Constitucional — 6 itens

- **Princípios fundamentais** — [Princípios fundamentais (arts. 1º ao 4º da CF)](https://www.youtube.com/watch?v=ypNuEbiWysw)
- **Direitos e garantias fundamentais: direitos individuais e coletivos** — [Artigo 5º da Constituição COMPLETO — direitos e garantias fundamentais](https://www.youtube.com/watch?v=9XDXxP0ACG0)
- **Direitos sociais, nacionalidade e direitos políticos** — [Direitos sociais (CF/88, arts. 6º a 11)](https://www.youtube.com/watch?v=LlEKrSk0LFw)
- **Organização do Estado: União, estados, municípios e competências** — [Organização do Estado: competências da União, estados e municípios](https://www.youtube.com/watch?v=imshXOmBWXE)
- **Administração pública na Constituição (arts. 37 a 41)** — [Da administração pública na CF/88 (arts. 37 a 41)](https://www.youtube.com/watch?v=EGD2phq-x3g)
- **Organização dos Poderes** — [Organização dos poderes — videoaula](https://www.youtube.com/watch?v=9Wo79oHd_EU)
- **Segurança pública (art. 144) e atribuições da Polícia Federal** — [Art. 144 da Constituição Federal — segurança pública](https://www.youtube.com/watch?v=p9UR6jdQbys)

### Direito Penal e Proc. Penal — 5 itens

- **Aplicação da lei penal no tempo e no espaço** — [Aplicação da lei penal no tempo e no espaço — aula 01](https://www.youtube.com/watch?v=wDWH2gcw9Kc)
- **Teoria do crime: fato típico, ilicitude, culpabilidade** — [Conceito analítico de crime: tipicidade, ilicitude e culpabilidade](https://www.youtube.com/watch?v=hjG9QOLCsHM)
- **Excludentes de ilicitude e de culpabilidade** — [Tipicidade, ilicitude, culpabilidade, punibilidade + excludentes](https://www.youtube.com/watch?v=9bO5WRZ5MyQ)
- **Concurso de pessoas e concurso de crimes** — [Concurso de pessoas: aula completa (Direito Penal, parte geral)](https://www.youtube.com/watch?v=UFiw10ByKEg)
- **Penas: espécies, aplicação e dosimetria** — [Dosimetria da pena passo a passo — aula completa para concursos](https://www.youtube.com/watch?v=_x49m2vHTTM)
- **Extinção da punibilidade e prescrição** — [Extinção da punibilidade e prescrição — efeitos e causas](https://www.youtube.com/watch?v=2uAnYIM5-xc)
- **Crimes contra a pessoa e contra o patrimônio** — [Crimes contra a pessoa e contra o patrimônio (art. 121 a 183)](https://www.youtube.com/watch?v=YJRQGQGfwtA)
- **Crimes contra a fé pública** — [Crimes contra a fé pública — aula de Direito Penal](https://www.youtube.com/watch?v=-8Sv_ihekQA)
- **Crimes contra a administração pública** — [Crimes contra a administração pública: peculato, corrupção, prevaricação, concussão](https://www.youtube.com/watch?v=ptr8RnQuwYU)
- **Inquérito policial: natureza, características, atribuições** — [Inquérito policial esquematizado](https://www.youtube.com/watch?v=LKC-WndRbEU)
- **Ação penal pública e privada** — [Ação penal — aula esquematizada + resumão e questões](https://www.youtube.com/watch?v=ftGw2uVK8HI)
- **Prova: meios, ônus, provas ilícitas, cadeia de custódia** — [Prova no processo penal — parte 02 (apreciação, provas ilícitas)](https://www.youtube.com/watch?v=HahRu2pHntY)
- **Prisão em flagrante, preventiva e temporária** — [Diferenças entre prisão em flagrante, temporária e preventiva](https://www.youtube.com/watch?v=K2Q8dEsJ9vU)
- **Medidas cautelares diversas da prisão** — [Medidas cautelares diversas da prisão](https://www.youtube.com/watch?v=L-nswRvdUNI)
- **Audiência de custódia** — [Audiência de custódia — aula completa](https://www.youtube.com/watch?v=SqD6qO5BGWk)
- **Competência e jurisdição** — [Processo penal — jurisdição e competência](https://www.youtube.com/watch?v=HfGjb_Uae0k)
- **Habeas corpus e demais ações de impugnação** — [Habeas corpus no processo penal — CPP para concursos](https://www.youtube.com/watch?v=Be5lm2hNjmc)

### Legislação Especial — 3 itens

- **Lei 10.826/2003 — Estatuto do Desarmamento** — [Aula gratuita: Estatuto do Desarmamento (Legislação Penal Especial)](https://www.youtube.com/watch?v=6WqqpOA5qKs)
- **Lei 11.343/2006 — Lei de Drogas** — [Aula gratuita: Lei de Drogas (Legislação Penal Especial)](https://www.youtube.com/watch?v=i5lcZyzzP_k)
- **Lei 9.455/1997 — Crimes de tortura** — [Lei 9.455/97 — Lei de Tortura: teoria + questões](https://www.youtube.com/watch?v=gr7tf8O8O6M)
- **Lei 13.869/2019 — Abuso de autoridade** — [Nova Lei de Abuso de Autoridade — Concurso PF](https://www.youtube.com/watch?v=rtxcS849Dlk)
- **Lei 12.850/2013 — Organização criminosa** — [Cebraspe na mira — Lei 12.850/2013 (organização criminosa)](https://www.youtube.com/watch?v=r_N3qFRQT1c)
- **Lei 9.613/1998 — Lavagem de dinheiro** — [Aula gratuita: Lei de Lavagem de Dinheiro (Legislação Penal Especial)](https://www.youtube.com/watch?v=UaMAsy-YvOk)
- **Lei 12.830/2013 — Investigação criminal conduzida por delegado** — [Lei esquematizada: investigação criminal conduzida pelo delegado (12.830/13)](https://www.youtube.com/watch?v=JTVWtsDxYh0)
- **Lei 8.069/1990 — ECA (disposições penais)** — [Crimes do ECA (Lei 8.069/90) — parte 1](https://www.youtube.com/watch?v=ktOj5Ztv8Eg)
- **Lei 13.445/2017 — Lei de Migração** — [Concurso PF 2024 — Lei 13.445/17 (Lei de Migração)](https://www.youtube.com/watch?v=kmNCNUyApJ0)
- **Lei 7.716/1989 — Crimes de preconceito e racismo** — [Aula gratuita: Racismo (Lei 7.716/89) — Legislação Penal Especial](https://www.youtube.com/watch?v=jHuMZKo_1yk)  
  *confira se cobre a alteracao da Lei 14.532/2023*

### Direitos Humanos — 2 itens

- **(aguardando o edital)** — não encontrei videoaula (aguardando o edital)
