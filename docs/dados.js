/* Taxonomia da prova, passos estrategicos e caderno de teoria. */

/* Distribuicao da prova objetiva de Agente da PF (120 itens). */
const MATERIAS = [
 {
  "k": "Informatica",
  "d": "Informática",
  "itens": 36,
  "sim30": 9
 },
 {
  "k": "ContabilidadeGeral",
  "d": "Contabilidade Geral",
  "itens": 20,
  "sim30": 5
 },
 {
  "k": "Portugues",
  "d": "Português",
  "itens": 18,
  "sim30": 4
 },
 {
  "k": "RLM",
  "d": "Raciocínio Lógico",
  "itens": 12,
  "sim30": 3
 },
 {
  "k": "Matematica",
  "d": "Matemática",
  "itens": 8,
  "sim30": 2
 },
 {
  "k": "RedacaoOficial",
  "d": "Redação Oficial",
  "itens": 6,
  "sim30": 2
 },
 {
  "k": "Estatistica",
  "d": "Estatística",
  "itens": 4,
  "sim30": 1
 },
 {
  "k": "ContabilidadePublica",
  "d": "Contabilidade Pública",
  "itens": 4,
  "sim30": 1
 },
 {
  "k": "DireitoConstitucional",
  "d": "Direito Constitucional",
  "itens": 3,
  "sim30": 0,
  "rodizio": true
 },
 {
  "k": "DireitoAdministrativo",
  "d": "Direito Administrativo",
  "itens": 3,
  "sim30": 0,
  "rodizio": true
 },
 {
  "k": "DireitoPenal",
  "d": "Direito Penal",
  "itens": 2,
  "sim30": 0,
  "rodizio": true
 },
 {
  "k": "DireitoProcessualPenal",
  "d": "Direito Processual Penal",
  "itens": 2,
  "sim30": 0,
  "rodizio": true
 },
 {
  "k": "LegislacaoFederal",
  "d": "Legislação Federal",
  "itens": 1,
  "sim30": 0,
  "rodizio": true
 },
 {
  "k": "DireitoAmbiental",
  "d": "Direito Ambiental",
  "itens": 1,
  "sim30": 0,
  "rodizio": true
 }
];

/* Os 26 passos estrategicos: unidade de estudo, de teoria e de revisao.
   itens = peso do passo em itens de prova; n = questoes no banco. */
const PASSOS = [
 {
  "id": "P01",
  "t": "Redes: modelo OSI e arquitetura TCP/IP",
  "a": [
   "Modelo OSI: as sete camadas e suas funções",
   "Arquitetura TCP/IP: camadas, correspondência com o OSI",
   "Protocolos: IP, TCP, UDP, HTTP, HTTPS, DNS, DHCP, FTP, SMTP, POP3, IMAP"
  ],
  "itens": 4.94,
  "mats": [
   "Informatica"
  ],
  "n": 7
 },
 {
  "id": "P02",
  "t": "Redes: endereçamento e equipamentos",
  "a": [
   "Endereçamento: IPv4, IPv6, máscara, sub-redes, NAT",
   "Equipamentos de rede: hub, switch, roteador, access point",
   "Redes de computadores: conceitos, topologias, meios de transmissão"
  ],
  "itens": 4.94,
  "mats": [
   "Informatica"
  ],
  "n": 7
 },
 {
  "id": "P03",
  "t": "Internet, intranet, nuvem e navegadores",
  "a": [
   "Internet, intranet e extranet",
   "Arquitetura cliente-servidor e computação em nuvem (IaaS, PaaS, SaaS)",
   "Navegadores: funcionamento, cache, cookies, navegação anônima",
   "Correio eletrônico: protocolos, webmail, anexos"
  ],
  "itens": 7.06,
  "mats": [
   "Informatica"
  ],
  "n": 10
 },
 {
  "id": "P04",
  "t": "Segurança: pilares, malware e ataques",
  "a": [
   "Segurança da informação: pilares (confidencialidade, integridade, disponibilidade, autenticidade, não repúdio)",
   "Malware: vírus, worm, trojan, ransomware, spyware, rootkit, botnet",
   "Ataques: phishing, engenharia social, DoS/DDoS, man-in-the-middle, força bruta"
  ],
  "itens": 4.24,
  "mats": [
   "Informatica"
  ],
  "n": 6
 },
 {
  "id": "P05",
  "t": "Segurança: criptografia, assinatura e hash",
  "a": [
   "Criptografia simétrica e assimétrica",
   "Assinatura digital, certificado digital, ICP-Brasil, funções de hash",
   "Autenticação e controle de acesso: senhas, MFA, biometria"
  ],
  "itens": 4.24,
  "mats": [
   "Informatica"
  ],
  "n": 6
 },
 {
  "id": "P06",
  "t": "Segurança: firewall, VPN, proxy e backup",
  "a": [
   "Firewall, IDS/IPS, VPN, proxy",
   "Backup: tipos (completo, incremental, diferencial), políticas, RPO/RTO"
  ],
  "itens": 4.24,
  "mats": [
   "Informatica"
  ],
  "n": 7
 },
 {
  "id": "P07",
  "t": "Sistemas operacionais e aplicativos",
  "a": [
   "Sistema operacional Windows: interface, arquivos e pastas, permissões, atalhos",
   "Sistema operacional Linux: estrutura de diretórios, permissões, comandos básicos",
   "Planilhas eletrônicas (Excel e LibreOffice Calc): fórmulas, funções, referências",
   "Edição de textos (Word e LibreOffice Writer)"
  ],
  "itens": 6.35,
  "mats": [
   "Informatica"
  ],
  "n": 10
 },
 {
  "id": "P08",
  "t": "Patrimônio, contas e partidas dobradas",
  "a": [
   "Patrimônio: bens, direitos e obrigações",
   "Equação patrimonial e patrimônio líquido",
   "Método das partidas dobradas: débito, crédito e saldo",
   "Contas: conceito, classificação, teoria das contas"
  ],
  "itens": 4.29,
  "mats": [
   "ContabilidadeGeral"
  ],
  "n": 6
 },
 {
  "id": "P09",
  "t": "Fatos contábeis e regimes contábeis",
  "a": [
   "Fatos contábeis: permutativos, modificativos e mistos",
   "Regimes contábeis: caixa e competência",
   "Escrituração: livros, lançamentos, fórmulas"
  ],
  "itens": 4.29,
  "mats": [
   "ContabilidadeGeral"
  ],
  "n": 6
 },
 {
  "id": "P10",
  "t": "Demonstrações contábeis: BP, DRE e DFC",
  "a": [
   "Balanço Patrimonial: estrutura, ativo e passivo, critérios de classificação",
   "Demonstração do Resultado do Exercício (DRE)",
   "Demonstração dos Fluxos de Caixa (DFC): métodos direto e indireto"
  ],
  "itens": 4.29,
  "mats": [
   "ContabilidadeGeral"
  ],
  "n": 6
 },
 {
  "id": "P11",
  "t": "Imobilizado, estoques, provisões e análise de balanços",
  "a": [
   "Ativo imobilizado: reconhecimento, depreciação, amortização, exaustão",
   "Estoques: critérios de avaliação (PEPS, média ponderada)",
   "Provisões, passivos contingentes e ativos contingentes",
   "Análise de balanços: índices de liquidez",
   "Análise horizontal e vertical"
  ],
  "itens": 7.14,
  "mats": [
   "ContabilidadeGeral"
  ],
  "n": 11
 },
 {
  "id": "P12",
  "t": "Concordância e regência",
  "a": [
   "Concordância nominal e verbal",
   "Regência nominal e verbal"
  ],
  "itens": 5.04,
  "mats": [
   "Portugues"
  ],
  "n": 8
 },
 {
  "id": "P13",
  "t": "Crase, colocação pronominal e ortografia",
  "a": [
   "Emprego do sinal indicativo de crase",
   "Colocação pronominal",
   "Ortografia oficial",
   "Acentuação gráfica"
  ],
  "itens": 4.32,
  "mats": [
   "Portugues"
  ],
  "n": 6
 },
 {
  "id": "P14",
  "t": "Sintaxe, vozes verbais e pontuação",
  "a": [
   "Sintaxe da oração e do período",
   "Vozes verbais e transformação de estruturas",
   "Pontuação",
   "Emprego das classes de palavras"
  ],
  "itens": 4.32,
  "mats": [
   "Portugues"
  ],
  "n": 6
 },
 {
  "id": "P15",
  "t": "Compreensão, coesão e coerência",
  "a": [
   "Coesão e coerência textual",
   "Compreensão e interpretação de textos",
   "Significação das palavras: sinonímia, antonímia, polissemia",
   "Reescrita de frases e substituição de palavras"
  ],
  "itens": 4.32,
  "mats": [
   "Portugues"
  ],
  "n": 6
 },
 {
  "id": "P16",
  "t": "Proposições, conectivos e tabelas-verdade",
  "a": [
   "Conectivos e tabelas-verdade",
   "Proposições: conceito, valor lógico, proposições simples e compostas",
   "Tautologia, contradição e contingência"
  ],
  "itens": 5.14,
  "mats": [
   "RLM"
  ],
  "n": 6
 },
 {
  "id": "P17",
  "t": "Equivalências, negações e argumentação",
  "a": [
   "Equivalências lógicas (condicional, contrapositiva, De Morgan)",
   "Negação de proposições compostas",
   "Negação de quantificadores (todo, algum, nenhum)",
   "Lógica de argumentação: validade, premissas e conclusão"
  ],
  "itens": 6.86,
  "mats": [
   "RLM"
  ],
  "n": 9
 },
 {
  "id": "P18",
  "t": "Porcentagem, razão, proporção e juros",
  "a": [
   "Razão, proporção, regra de três, porcentagem",
   "Juros simples e compostos"
  ],
  "itens": 4,
  "mats": [
   "Matematica"
  ],
  "n": 6
 },
 {
  "id": "P19",
  "t": "Combinatória e probabilidade",
  "a": [
   "Análise combinatória: arranjo, combinação, permutação",
   "Probabilidade: conceitos, eventos, probabilidade condicional"
  ],
  "itens": 4,
  "mats": [
   "Matematica"
  ],
  "n": 6
 },
 {
  "id": "P20",
  "t": "Tratamento, vocativos e fechos",
  "a": [
   "Redação oficial: pronomes de tratamento e concordância",
   "Redação oficial: vocativos, endereçamento e fechos"
  ],
  "itens": 3,
  "mats": [
   "RedacaoOficial"
  ],
  "n": 6
 },
 {
  "id": "P21",
  "t": "Padrão ofício e características da redação oficial",
  "a": [
   "Redação oficial: o padrão ofício — estrutura e partes",
   "Redação oficial: características fundamentais (clareza, concisão, formalidade, impessoalidade, padronização)",
   "Redação oficial: demais expedientes (exposição de motivos, mensagem, correio eletrônico)",
   "Redação oficial: formatação e apresentação dos documentos"
  ],
  "itens": 3,
  "mats": [
   "RedacaoOficial"
  ],
  "n": 6
 },
 {
  "id": "P22",
  "t": "Estatística descritiva e distribuição normal",
  "a": [
   "Medidas de posição: média, mediana, moda, quartis e percentis",
   "Medidas de dispersão: amplitude, variância, desvio padrão, coeficiente de variação",
   "Tipos de variáveis: qualitativas e quantitativas",
   "Distribuições: binomial, Poisson, normal",
   "Testes de hipóteses: erros tipo I e II, nível de significância"
  ],
  "itens": 4,
  "mats": [
   "Estatistica"
  ],
  "n": 8
 },
 {
  "id": "P23",
  "t": "Orçamento público, receita e despesa",
  "a": [
   "Orçamento público: princípios e ciclo orçamentário",
   "Receita pública: classificação e estágios",
   "Despesa pública: classificação e estágios",
   "Restos a pagar e regime contábil público"
  ],
  "itens": 4,
  "mats": [
   "ContabilidadePublica"
  ],
  "n": 9
 },
 {
  "id": "P24",
  "t": "Constitucional e Administrativo",
  "a": [
   "Segurança pública (art. 144) e atribuições da Polícia Federal",
   "Direitos e garantias fundamentais: direitos individuais e coletivos",
   "Administração pública: conceito, princípios expressos e implícitos",
   "Atos administrativos: conceito, requisitos, atributos, espécies, extinção",
   "Poderes administrativos e abuso de poder"
  ],
  "itens": 6,
  "mats": [
   "DireitoAdministrativo",
   "DireitoConstitucional"
  ],
  "n": 11
 },
 {
  "id": "P25",
  "t": "Penal e Processual Penal",
  "a": [
   "Inquérito policial: natureza, características, atribuições",
   "Prisão em flagrante, preventiva e temporária",
   "Teoria do crime: fato típico, ilicitude, culpabilidade",
   "Aplicação da lei penal no tempo e no espaço",
   "Prova: meios, ônus, provas ilícitas, cadeia de custódia"
  ],
  "itens": 4,
  "mats": [
   "DireitoProcessualPenal",
   "DireitoPenal"
  ],
  "n": 7
 },
 {
  "id": "P26",
  "t": "Legislação especial e Direito Ambiental",
  "a": [
   "Lei 11.343/2006 — Lei de Drogas",
   "Lei 10.826/2003 — Estatuto do Desarmamento",
   "Lei 12.850/2013 — Organização criminosa",
   "Direito Ambiental: princípios e competências",
   "Direito Ambiental: crimes ambientais"
  ],
  "itens": 2,
  "mats": [
   "LegislacaoFederal",
   "DireitoAmbiental"
  ],
  "n": 6
 }
];

/* Resumo teorico por passo. */
const CADERNO = {
 "P01": "O **modelo OSI** tem sete camadas. De baixo para cima: **física** (bits no meio), **enlace** (quadros, endereço MAC, controle de acesso ao meio), **rede** (pacotes, endereço IP, roteamento entre redes), **transporte** (segmentos, entrega fim a fim, controle de fluxo), **sessão** (abre e encerra diálogos), **apresentação** (formato, compressão, criptografia) e **aplicação** (serviços ao usuário).\n\nA fronteira que a Cebraspe mais explora é **rede × transporte**. Rede cuida de *chegar lá*: endereçamento lógico e escolha da rota. Transporte cuida de *chegar inteiro*: ordenação, confirmação e controle de fluxo entre as duas pontas. Decore pelo verbo, não pelo número: quem acha o caminho é a rede, quem garante a entrega é o transporte.\n\nA **arquitetura TCP/IP** tem quatro camadas: acesso à rede, internet, transporte e aplicação. Não há correspondência um a um com o OSI — a camada de aplicação do TCP/IP absorve sessão, apresentação e aplicação do OSI. Item que afirme equivalência exata entre as duas pilhas está errado.\n\nNa camada de transporte convivem dois protocolos opostos. O **TCP** é orientado a conexão: exige o *handshake* de três vias antes de qualquer dado, numera segmentos, confirma recebimento, retransmite o que se perdeu e controla o fluxo. O **UDP** não faz nada disso — sem conexão, sem confirmação, sem ordenação, sem retransmissão. Essa ausência de overhead é vantagem em streaming, voz sobre IP e consultas DNS, onde latência baixa vale mais que perda eventual.\n\nProtocolos de aplicação que caem sempre, com o transporte que usam: **HTTP** (porta 80) e **HTTPS** (porta 443) sobre TCP; **FTP** sobre TCP, porque transferir arquivo exige confiabilidade; **SMTP** envia correio; **POP3** e **IMAP** recebem — o POP3 tipicamente baixa e apaga do servidor, o IMAP mantém no servidor e sincroniza vários dispositivos; **DNS** traduz nome em IP, normalmente sobre UDP; **DHCP** distribui endereços IP automaticamente, por **concessão temporária** com prazo de validade, e não de forma permanente.\n\nO erro caro desse bloco é confundir proteção do canal com proteção do conteúdo: HTTPS cifra o tráfego, mas não atesta que o site é idôneo nem que o arquivo baixado é limpo.",
 "P02": "O **IPv4** usa 32 bits, escritos em quatro octetos decimais. O **IPv6** usa 128 bits — não 64, que é o erro plantado com mais frequência. O salto de 32 para 128 é a resposta ao esgotamento do espaço de endereçamento.\n\nA **máscara de sub-rede** separa a porção de rede da porção de host. Na notação CIDR, o número após a barra é a quantidade de bits ligados: /24 equivale a 255.255.255.0, /16 a 255.255.0.0, /8 a 255.0.0.0. Dentro de cada sub-rede, **dois endereços nunca são atribuíveis a estação**: o primeiro, que identifica a própria rede, e o último, reservado ao broadcast. Por isso uma /24 tem 256 endereços e apenas 254 hosts utilizáveis.\n\nO **NAT** traduz endereços privados em um endereço público, permitindo que várias máquinas internas compartilhem um só IP visível na internet. Faixas privadas: 10.0.0.0/8, 172.16.0.0/12 e 192.168.0.0/16.\n\nNos equipamentos, a distinção é por camada. O **hub** é repetidor burro de camada 1: replica o sinal recebido para todas as portas, o que gera um único domínio de colisão. O **switch** opera na camada 2, aprende endereços MAC e encaminha o quadro apenas para a porta do destinatário, segmentando domínios de colisão. O **roteador** opera na camada 3, usa endereço IP e é o único que interliga redes distintas — ele separa domínios de broadcast. O **access point** estende a rede por meio sem fio e funciona, em essência, como um switch de camada 2.\n\nA troca clássica em prova é atribuir ao hub o comportamento do switch. O hub não decide nada: não lê endereço, não filtra, não comuta. Se o item disser que o hub encaminha com base no MAC, está errado, por mais técnica que seja a redação.\n\nQuanto a topologias, guarde que **estrela** concentra tudo em um equipamento central — é a topologia física das redes locais modernas — e que **barramento** e **anel** são arranjos legados que ainda aparecem em conceito.",
 "P03": "**Internet** é a rede pública mundial. **Intranet** é a rede corporativa de acesso restrito que usa **exatamente os mesmos protocolos e serviços da internet** — TCP/IP, HTTP, DNS, correio. O que a distingue não é a tecnologia, é o perímetro de acesso. Item que afirme tecnologia proprietária na intranet está errado. **Extranet** é a extensão controlada da intranet a parceiros externos, normalmente por VPN ou autenticação.\n\nNa **computação em nuvem**, os três modelos formam uma escada de responsabilidade. No **IaaS** o provedor entrega hardware virtualizado — processamento, armazenamento, rede — e o contratante instala sistema operacional e aplicações. No **PaaS** o provedor entrega também a plataforma de execução, e o contratante cuida só da aplicação e dos dados. No **SaaS** o provedor entrega o software pronto e responde por tudo abaixo dele. Quanto mais se sobe a escada, menos o contratante administra.\n\nNos **navegadores**, três conceitos caem sempre. O **cache** guarda cópias locais para acelerar carregamentos seguintes. Os **cookies** são pequenos arquivos de **texto**, gravados a pedido do site, que guardam sessão e preferências — não são executáveis e não instalam programas. A **navegação anônima** apenas deixa de registrar histórico, cookies e dados de formulário **naquele dispositivo**: o provedor de acesso, o empregador e os sites visitados continuam enxergando o tráfego normalmente. Item que prometa anonimato na internet está errado.\n\nNo **correio eletrônico**, a divisão é simples: **SMTP** envia; **POP3** e **IMAP** recebem. O POP3, na configuração padrão, baixa as mensagens e as remove do servidor, o que dificulta o uso em vários aparelhos. O **IMAP** mantém tudo no servidor e sincroniza, e é justamente por isso que funciona bem em celular e computador ao mesmo tempo — o contrário do que alguns itens afirmam.\n\nA arquitetura **cliente-servidor** separa quem pede o serviço de quem o presta, e é o modelo de praticamente tudo que se usa em rede.",
 "P04": "A segurança da informação se apoia em pilares que a banca adora trocar de lugar:\n\n• **Confidencialidade** — só quem está autorizado acessa.\n• **Integridade** — a informação não foi alterada indevidamente.\n• **Disponibilidade** — está acessível quando necessária.\n• **Autenticidade** — provém de fato da origem declarada.\n• **Não repúdio** — o autor não pode negar depois que foi ele.\n\nFixe pelo verbo: integridade é sobre *alterar*, disponibilidade é sobre *acessar*. A troca entre esses dois é o item mais barato e mais frequente de toda a matéria.\n\nNos **malwares**, a distinção que importa é a forma de propagação. O **vírus** precisa de arquivo hospedeiro e de uma ação do usuário. O **worm** é autônomo: replica-se sozinho pela rede, sem hospedeiro. O **cavalo de troia** se disfarça de programa legítimo e depende de o usuário executá-lo — ele **não** se replica. O **ransomware** torna os dados indisponíveis, normalmente cifrando-os, e exige resgate; a exfiltração de dados existe em variantes de dupla extorsão, mas não é elemento necessário. O **spyware** coleta informação sem o usuário saber. O **rootkit** se esconde no sistema para manter acesso privilegiado. O **botnet** é a rede de máquinas comprometidas sob comando remoto.\n\nNos **ataques**, o **phishing** se faz passar por pessoa ou instituição confiável para obter dados sensíveis — é espécie de **engenharia social**, que ataca a pessoa e não o sistema. O **DoS** esgota recursos do alvo e o **DDoS** faz isso a partir de muitas origens simultâneas. O **man-in-the-middle** se interpõe na comunicação para ler ou alterar o que passa. A **força bruta** testa combinações até acertar a credencial.\n\nA cilada conceitual do bloco é tratar característica frequente como elemento definidor. Nem todo ransomware vaza dados; nem todo malware se replica. Item com 'necessariamente' sobre comportamento de malware quase sempre erra.",
 "P05": "Na **criptografia simétrica** existe **uma única chave**, usada para cifrar e decifrar, compartilhada entre as partes. É rápida e serve a grandes volumes, mas esbarra no problema de distribuir a chave com segurança. AES é o exemplo padrão.\n\nNa **criptografia assimétrica** existe um **par de chaves** matematicamente ligadas: uma **pública**, distribuída livremente, e uma **privada**, sob guarda exclusiva do titular. O que uma cifra, só a outra decifra. RSA é o exemplo padrão.\n\nA inversão que derruba muita gente está no uso do par, porque ele funciona em duas direções opostas:\n\n• **Para dar sigilo** — cifra-se com a **chave pública do destinatário**; só ele, com sua privada, consegue abrir.\n• **Para assinar** — assina-se com a **própria chave privada**; qualquer um verifica com a pública correspondente.\n\nA assinatura garante **autenticidade** e **não repúdio** justamente porque só o titular possui a chave privada. Ela não dá sigilo: um documento assinado continua legível por todos.\n\nO **certificado digital** é o documento eletrônico que vincula uma identidade à sua **chave pública**, emitido e assinado por uma autoridade certificadora. Ele **nunca** contém a chave privada — se contivesse, qualquer um poderia assinar pelo titular. No Brasil, a **ICP-Brasil** é a infraestrutura que encadeia essas autoridades.\n\nA **função de hash** (SHA-256, por exemplo) produz um resumo de tamanho fixo a partir de entrada de qualquer tamanho. Três propriedades: é **unidirecional** — do resumo não se recupera a mensagem; **não usa chave** — hash não é cifragem; e qualquer alteração mínima na entrada muda o resumo por completo. Serve a integridade e a armazenamento de senha. Na assinatura digital, cifra-se o **hash** do documento, não o documento inteiro.\n\nEm **autenticação**, os fatores são: algo que se sabe (senha), algo que se tem (token, celular) e algo que se é (biometria). A **autenticação multifator** combina fatores de categorias diferentes — duas senhas não são MFA.",
 "P06": "O **firewall** filtra tráfego com base em regras. O tipo **stateless** julga cada pacote isoladamente, olhando só o cabeçalho. O **stateful** mantém tabela de estados das conexões ativas e decide considerando o contexto da sessão a que o pacote pertence — ele continua lendo cabeçalhos, apenas acrescenta o contexto. Firewall não é antivírus: ele controla o que passa, não inspeciona conteúdo em busca de código malicioso.\n\nO **IDS** detecta e alerta sobre atividade suspeita. O **IPS** detecta e **bloqueia**. A diferença está na letra do meio: *detection* apenas avisa, *prevention* age.\n\nA **VPN** cria um túnel cifrado entre o dispositivo e a rede remota, protegendo o tráfego **em trânsito** contra interceptação. Ela não impede infecção: arquivo malicioso baixado dentro do túnel chega igualmente malicioso. É a mesma confusão do HTTPS — proteger o canal não é proteger o conteúdo.\n\nO **proxy** é intermediário entre cliente e servidor de destino. Pode armazenar conteúdo em cache, aplicar política de acesso e mascarar a origem das requisições.\n\nEm **backup**, três tipos e uma consequência prática que é o ponto da matéria:\n\n• **Completo** — copia tudo. É o único que, sozinho, restaura tudo.\n• **Incremental** — copia o que mudou desde o **último backup de qualquer tipo**. Grava rápido e ocupa pouco, mas a restauração exige o último completo **mais todos os incrementais na ordem**. Perder um elo quebra a corrente.\n• **Diferencial** — copia o que mudou desde o **último completo**. Cresce a cada dia, mas a restauração exige apenas o completo **mais a última diferencial**.\n\nA regra 3-2-1 recomenda três cópias, em dois tipos de mídia, com uma fora do local. **RPO** é quanto de dado se aceita perder, medido em tempo; **RTO** é quanto tempo se aceita ficar fora do ar. RPO olha para trás, RTO olha para frente.",
 "P07": "No **Windows**, o que mais cai é comportamento de arquivo e permissão. A **Lixeira** é recurso **local**: arquivo excluído de unidade de rede mapeada, de pendrive em alguns casos, ou com Shift+Delete, é removido diretamente, sem passar por ela. Atalhos que aparecem em prova: Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z, Ctrl+Y, Ctrl+F, Alt+Tab, Windows+E (Explorador), Windows+L (bloquear), F2 (renomear), F5 (atualizar).\n\nNo **Linux**, a hierarquia de diretórios é matéria certa: **/etc** guarda configuração do sistema e dos serviços; **/var** guarda dados variáveis, como logs e filas; **/home** guarda os diretórios pessoais; **/bin** e **/usr/bin** guardam executáveis; **/tmp** guarda temporários; **/dev** representa dispositivos; **/root** é a pasta pessoal do superusuário — não confundir com **/**, que é a raiz.\n\nAs **permissões** vêm em três blocos — proprietário, grupo e outros — e em três direitos: leitura (r = 4), escrita (w = 2) e execução (x = 1). O valor octal é a soma: 7 = rwx, 6 = rw-, 5 = r-x, 4 = r--. Assim **755** dá tudo ao dono e leitura mais execução aos demais, e **644** dá leitura e escrita ao dono e só leitura aos demais. Comandos: `chmod` muda permissão, `chown` muda dono, `ls -l` lista detalhes, `pwd` mostra onde você está, `grep` busca texto.\n\nEm **planilhas**, a diferença entre separadores decide muitos itens: **dois pontos** definem intervalo contínuo (A1:A3 são três células) e **ponto e vírgula** separa argumentos independentes. Logo =SOMA(A1:A3;B1) soma quatro células.\n\nNas **referências**, o cifrão trava o que vem depois dele. **A1** é relativa e muda em qualquer direção; **$A$1** é absoluta e não muda nunca; **A$1** trava só a linha, e a coluna muda ao copiar para o lado; **$A1** trava só a coluna. O **PROCV** busca na primeira coluna do intervalo e só enxerga para a **direita** — nunca retorna valor à esquerda da coluna de busca.",
 "P08": "O **patrimônio** de uma entidade tem três grupos. O **ativo** reúne bens e direitos — o que a entidade tem e o que tem a receber. O **passivo** reúne as obrigações exigíveis perante terceiros. O **patrimônio líquido** é a diferença entre os dois:\n\n**PL = Ativo − Passivo**\n\nNão é soma. Quando o passivo supera o ativo, o patrimônio líquido fica negativo e se diz **passivo a descoberto**.\n\nAs **contas** são os registros em que os elementos patrimoniais são controlados. Dividem-se em **patrimoniais** (ativo, passivo e patrimônio líquido, que compõem o Balanço) e **de resultado** (receitas e despesas, que compõem a DRE e são encerradas ao fim do exercício).\n\nO **método das partidas dobradas** é o coração da matéria: para todo débito há um crédito de igual valor. A regra de sinais é o que derruba quem vem do zero, porque o vocabulário do extrato bancário atrapalha. No banco, 'débito' é dinheiro saindo — mas o extrato é escrito do ponto de vista do banco, para quem você é passivo. Em contabilidade:\n\n• **Contas do ativo**: débito **aumenta**, crédito **reduz**.\n• **Contas do passivo e do PL**: crédito **aumenta**, débito **reduz**.\n• **Despesas**: aumentam a débito. **Receitas**: aumentam a crédito.\n\nDébito não significa perda. Significa lado esquerdo.\n\nA conferência mecânica é o **saldo**: se a soma de todos os débitos não for igual à soma de todos os créditos, há erro de escrituração. É por isso que o Balanço sempre fecha.\n\nUm último cuidado de classificação: a natureza da conta diz se é ativo ou passivo, mas é o **prazo** que diz em qual grupo ela entra. Realizável ou exigível em até doze meses, ou dentro do ciclo operacional, vai para o **circulante**; além disso, para o **não circulante**. Direito não vira ativo não circulante só por ser direito.",
 "P09": "Os **fatos contábeis** classificam-se pelo efeito que produzem no patrimônio líquido:\n\n• **Permutativos** — trocam elementos entre si sem alterar o PL. Pagar uma dívida em dinheiro reduz ativo e passivo na mesma medida: a diferença entre eles permanece. Comprar um veículo à vista troca caixa por imobilizado.\n• **Modificativos** — alteram o PL, para mais (aumentativos: receitas) ou para menos (diminutivos: despesas). Pagar aluguel reduz o PL.\n• **Mistos** — reúnem os dois efeitos na mesma operação. Vender mercadoria acima do custo troca estoque por caixa (permutativo) e gera lucro (modificativo).\n\nO teste é sempre o mesmo: pergunte se o patrimônio líquido mudou. Se não mudou, é permutativo, por mais movimentada que a operação pareça. Pagar dívida parece empobrecer a empresa, mas saiu o dinheiro **e** saiu a obrigação.\n\nOs **regimes contábeis** definem *quando* reconhecer receita e despesa:\n\n• **Regime de competência** — reconhece no período do **fato gerador**, independentemente de recebimento ou pagamento. Venda a prazo em dezembro é receita de dezembro, ainda que o dinheiro entre em março. É o regime da contabilidade empresarial.\n• **Regime de caixa** — reconhece quando o dinheiro efetivamente entra ou sai.\n\nA confusão típica é trocar as duas definições de lugar, e ela é fácil de evitar: **competência** remete à competência do período, ou seja, a qual exercício o fato pertence; **caixa** remete ao movimento financeiro.\n\nDaí decorre uma consequência que cai muito: **caixa e resultado são coisas distintas**. A depreciação é despesa que **reduz o lucro** e **não consome caixa**. Dizer que ela 'não afeta o resultado' é erro; o que ela não afeta é o caixa.\n\nNa **escrituração**, os lançamentos seguem fórmulas: a **primeira fórmula** tem um débito e um crédito; as demais envolvem mais de uma conta em um dos lados ou em ambos. O livro **Diário** registra em ordem cronológica; o **Razão** agrupa por conta.",
 "P10": "O **Balanço Patrimonial** é uma fotografia: mostra a posição patrimonial e financeira **em determinada data**. Do lado esquerdo, o **ativo**, ordenado por grau decrescente de liquidez: circulante (caixa, contas a receber, estoques, despesas antecipadas) e não circulante (realizável a longo prazo, investimentos, imobilizado, intangível). Do lado direito, o **passivo** (circulante e não circulante) e o **patrimônio líquido** (capital social, reservas, lucros ou prejuízos acumulados).\n\nO critério de separação entre circulante e não circulante é **temporal**: até doze meses após a data do balanço, ou dentro do ciclo operacional da entidade, é circulante.\n\nA **Demonstração do Resultado do Exercício** é um filme: apura o resultado formado **ao longo de um período**, pelo regime de competência. A estrutura em cascata precisa ser sabida na ordem:\n\nReceita bruta de vendas\n(−) deduções, devoluções e impostos sobre vendas\n**= Receita líquida**\n(−) custo das mercadorias ou produtos vendidos\n**= Lucro bruto**\n(−) despesas operacionais (vendas, administrativas, financeiras)\n**= Resultado operacional**\n(±) outras receitas e despesas\n(−) imposto de renda e contribuição social\n**= Lucro líquido do exercício**\n\nO erro frequente é confundir em que linha cada dedução entra. Lucro bruto sai da receita **líquida** menos o custo das vendas — não da receita bruta.\n\nA **Demonstração dos Fluxos de Caixa** mostra entradas e saídas efetivas, separadas em três atividades: **operacionais** (o negócio em si), **de investimento** (compra e venda de ativos de longo prazo) e **de financiamento** (capital próprio e de terceiros).\n\nEla admite dois métodos. O **direto** lista recebimentos e pagamentos brutos. O **indireto** parte do **lucro líquido** e o ajusta pelos itens que não afetaram caixa — somando de volta a depreciação, por exemplo — e pelas variações de contas operacionais. Se a depreciação precisa ser somada de volta, é porque ela de fato havia reduzido o lucro.",
 "P11": "No **ativo imobilizado**, a perda de capacidade de gerar benefícios é reconhecida de forma sistemática ao longo da vida útil do bem. **Depreciação** vale para bens corpóreos que se desgastam; **amortização**, para intangíveis com vida útil definida; **exaustão**, para recursos naturais que se esgotam, como minas e florestas.\n\nA exceção que mais cai: **terrenos não se depreciam**, porque têm vida útil indeterminada. O prédio construído sobre o terreno deprecia; o terreno, não. E, como já visto, depreciação reduz o lucro sem consumir caixa.\n\nNos **estoques**, o critério de avaliação decide o custo das vendas e, por consequência, o lucro. No **PEPS** (primeiro que entra, primeiro que sai), as saídas carregam os custos das aquisições **mais antigas**. Em cenário de preços crescentes, isso significa custo registrado **menor**, custo das mercadorias vendidas **menor** e lucro **maior** — o contrário do que a intuição costuma sugerir. Faça sempre com números: comprou a 10, depois a 15, vendeu uma; o PEPS baixa 10. Na **média ponderada**, o custo unitário é recalculado a cada entrada, suavizando os extremos.\n\n**Provisão** é passivo de **prazo ou valor incerto**, reconhecido quando há obrigação presente decorrente de evento passado, saída provável de recursos e estimativa confiável. Obrigação de valor e prazo certos é passivo comum, não provisão. O nome engana: 'provisão' soa a cálculo exato, mas a incerteza é o elemento definidor. **Passivo contingente** não é reconhecido, apenas divulgado; **ativo contingente** nem isso, salvo quando a entrada for praticamente certa.\n\nNa **análise de balanços**, os índices de liquidez comparam **prazos equivalentes**:\n\n• **Liquidez corrente** = ativo circulante ÷ passivo circulante.\n• **Liquidez seca** = (ativo circulante − estoques) ÷ passivo circulante.\n• **Liquidez imediata** = disponibilidades ÷ passivo circulante.\n• **Liquidez geral** = (AC + realizável a longo prazo) ÷ (PC + passivo não circulante).\n\nNenhum deles fala sobre o total das dívidas. Item que amplie o escopo de um índice de curto prazo está errado.\n\n**Análise vertical** mede a participação de cada conta num total do mesmo período; **análise horizontal** acompanha a evolução de uma conta entre períodos.",
 "P12": "**Concordância verbal** é entre verbo e sujeito; **concordância nominal** é entre o nome e os termos que a ele se referem. Sujeito composto **anteposto** ao verbo leva plural, em regra. Posposto, admite plural ou concordância com o núcleo mais próximo.\n\nOs casos que a Cebraspe cobra são os de **verbo impessoal**, porque a fala corrente os contraria todo dia:\n\n• **Haver** no sentido de *existir* é impessoal: não tem sujeito e fica **sempre na terceira do singular**. 'Houve muitos candidatos' está certo; 'houveram' está errado. O termo que acompanha é objeto direto.\n• **Fazer** indicando **tempo decorrido** também é impessoal: 'Faz dez anos que ingressou'. 'Fazem dez anos' está errado.\n• Verbos que indicam **fenômeno da natureza** são impessoais: 'Choveu muito'.\n\nCuidado com a transferência da impessoalidade para verbos auxiliares: 'Deve haver muitos candidatos' — o auxiliar acompanha o impessoal e fica no singular.\n\nA **partícula 'se'** separa dois casos que definem se o verbo vai ao plural:\n\n• Com **verbo transitivo direto**, o 'se' é **partícula apassivadora**, existe sujeito paciente e o verbo **concorda** com ele: 'Vendem-se imóveis' (imóveis são vendidos).\n• Com **verbo transitivo indireto** ou intransitivo, o 'se' é **índice de indeterminação do sujeito** e o verbo fica **obrigatoriamente no singular**: 'Precisa-se de auxiliares'.\n\nO critério é a regência do verbo, não o exemplo decorado.\n\nEm **regência**, alguns verbos mudam de sentido com a preposição. **Assistir** no sentido de *ver, presenciar* é transitivo indireto e exige 'a': assiste-se **ao** jogo. No sentido de *prestar assistência*, é direto. **Aspirar** a um cargo (pretender) é indireto; aspirar o ar (inalar) é direto. **Visar** a um objetivo é indireto; visar um cheque é direto. **Obedecer** e **desobedecer** são indiretos.\n\nNa concordância nominal, lembre de **anexo**, **incluso**, **obrigado** e **mesmo**, que concordam com o termo a que se referem, e de **é proibido** e **é necessário**, que ficam invariáveis quando o sujeito não tem determinante.",
 "P13": "A **crase** é a fusão da preposição 'a' com o artigo feminino 'a'. Exige **dois** elementos ao mesmo tempo: o termo regente pede preposição **e** o termo regido admite artigo. Faltando um dos dois, não há crase. Essa é a regra inteira, e quase todo erro vem de verificar só metade dela.\n\n**Não ocorre crase**: antes de palavra masculina; antes de verbo no infinitivo; antes de pronome de tratamento como Vossa Senhoria; antes da maioria dos pronomes; entre palavras repetidas ('cara a cara', 'gota a gota'); antes de nomes de cidade que não admitem artigo ('Vou a Brasília' — mas 'Vou à Brasília dos anos 60', porque o adjunto faz o artigo aparecer).\n\nO teste prático para nome de lugar: se você **volta da**, vai **à**; se volta **de**, vai **a**.\n\n**Ocorre crase obrigatória** nas locuções adverbiais, prepositivas e conjuntivas femininas: à noite, às pressas, à medida que, à custa de. E é **facultativa** antes de nome próprio feminino, de pronome possessivo feminino e depois de 'até'.\n\nNa **colocação pronominal**, a regra de partida é que **não se inicia período com pronome oblíquo átono** no padrão culto — o que impõe a **ênclise**: 'Entregou-se o relatório'. A **próclise** é obrigatória diante de palavra atrativa: negação (não, nunca, jamais), advérbio, pronome relativo, indefinido ou interrogativo, e conjunção subordinativa. A **mesóclise** aparece com futuro do presente ou do pretérito sem palavra atrativa: 'Entregar-se-á'.\n\nNa **ortografia**, o conjunto 'por que' é o campeão de erro:\n\n• **por que** — separado, sem acento: em perguntas diretas e indiretas, e quando equivale a 'pelo qual'.\n• **por quê** — separado, com acento: no **fim** da frase, onde a expressão é tônica.\n• **porque** — junto, sem acento: conjunção causal ou explicativa, equivale a 'pois'.\n• **porquê** — junto, com acento: substantivo, vem com artigo — 'o porquê da ausência'.\n\nNa **acentuação**, proparoxítonas são todas acentuadas; paroxítonas só quando terminam em certas letras; oxítonas em a, e, o, em e ens levam acento.",
 "P14": "A oração tem **termos essenciais** (sujeito e predicado), **integrantes** (complementos verbais e nominais, agente da passiva) e **acessórios** (adjunto adnominal, adjunto adverbial, aposto).\n\nO **objeto direto** completa verbo que não exige preposição; o **objeto indireto** completa verbo que a exige. 'Instaurou o inquérito' é direto; 'precisa de provas' é indireto. O **complemento nominal** completa um nome e sempre vem preposicionado.\n\nO **aposto** explica ou especifica outro termo. O **explicativo** vem isolado por vírgulas; o **especificativo** **não** leva vírgula: 'o agente Carlos', 'a cidade de Brasília'. Item que exija vírgula em todo aposto está errado.\n\nNas **vozes verbais**:\n\n• **Ativa** — o sujeito pratica: 'O delegado encaminhou os documentos'.\n• **Passiva analítica** — verbo ser + particípio, sujeito paciente: 'Os documentos foram encaminhados pelo delegado'.\n• **Passiva sintética** — verbo + 'se' apassivador: 'Encaminharam-se os documentos'.\n\nO erro típico é chamar a passiva sintética de voz ativa. Mudar a forma não muda a voz: enquanto o sujeito for paciente, continua passiva. Na transposição, o **agente da passiva** vira sujeito da ativa e o sujeito paciente vira objeto direto.\n\nNa **pontuação**, a regra que mais aparece é negativa: **não se separa sujeito de predicado por vírgula**, nem verbo de seu complemento, por mais longo que o termo seja. Usa-se vírgula para isolar aposto explicativo, vocativo, adjunto adverbial deslocado, termos em enumeração e orações coordenadas assindéticas. A oração subordinada adjetiva **explicativa** vem entre vírgulas; a **restritiva**, não — e a diferença muda o sentido: 'Os agentes, que foram aprovados, comemoraram' (todos) contra 'Os agentes que foram aprovados comemoraram' (só alguns).\n\nO **ponto e vírgula** separa itens de enumeração longa e orações de mesmo valor com estrutura interna já pontuada. Os **dois-pontos** anunciam enumeração, citação ou explicação.",
 "P15": "**Compreensão** é recuperar o que o texto diz; **interpretação** é concluir a partir dele. A Cebraspe cobra as duas, mas pune com mais frequência a interpretação que extrapola: item que acrescente informação não sustentada pelo texto está errado, ainda que a afirmação seja verdadeira no mundo.\n\n**Inferência** é a conclusão que o leitor extrai do que **não** foi dito explicitamente, mas que decorre do texto. Não confunda com informação explícita — a troca desses dois termos é item recorrente.\n\n**Coesão** é a amarração de superfície, feita por mecanismos linguísticos:\n\n• **Referencial** — pronomes, artigos e expressões que retomam (anáfora) ou antecipam (catáfora) um termo.\n• **Sequencial** — conectivos que encadeiam: portanto, contudo, porém, embora, uma vez que.\n• **Lexical** — repetição controlada, sinônimos, hiperônimos.\n\n**Coerência** é a articulação lógica do sentido: o texto faz sentido como um todo, sem contradição, sem salto, com continuidade temática. Um texto pode ser **coeso e incoerente** — conectivos impecáveis ligando ideias que não se sustentam. A recíproca também ocorre.\n\nA troca entre os dois termos é o item mais frequente do bloco. Fixe: **coesão é a costura, coerência é o sentido**.\n\nNa **significação das palavras**:\n\n• **Sinonímia** — proximidade de sentido.\n• **Antonímia** — sentidos opostos.\n• **Homonímia** — mesma forma, sentidos distintos e sem relação.\n• **Paronímia** — formas parecidas, sentidos distintos (iminente/eminente, tráfego/tráfico).\n• **Polissemia** — a mesma palavra com vários sentidos relacionados, definidos pelo contexto.\n\nNa **reescrita de frases**, a pergunta é sempre dupla: a nova redação mantém a **correção gramatical** e mantém o **sentido original**? Um item pode estar gramaticalmente correto e ainda assim errado por alterar o sentido — trocar uma restritiva por explicativa, por exemplo, ou trocar 'embora' por 'porque', que inverte a relação lógica de concessão para causa.",
 "P16": "**Proposição** é a sentença declarativa a que se pode atribuir verdadeiro ou falso. Não são proposições: perguntas, ordens, exclamações e frases abertas.\n\nOs **conectivos** e suas tabelas:\n\n• **Conjunção** (p **e** q) — verdadeira **só** quando as duas são verdadeiras.\n• **Disjunção inclusiva** (p **ou** q) — falsa **só** quando as duas são falsas.\n• **Disjunção exclusiva** (**ou** p **ou** q) — verdadeira **só** quando exatamente uma é verdadeira.\n• **Condicional** (**se** p, **então** q) — falsa **só** quando p é verdadeira e q é falsa.\n• **Bicondicional** (p **se e somente se** q) — verdadeira quando as duas têm o mesmo valor.\n\nA condicional é a que mais incomoda: quando o antecedente é **falso**, ela é **verdadeira**, qualquer que seja o consequente. 'Se a Lua for de queijo, então eu sou astronauta' é uma proposição verdadeira. O desconforto é legítimo, mas a definição é essa, e ela cai.\n\nO **número de linhas** da tabela-verdade é 2 elevado ao número de proposições **simples distintas**: 2 proposições, 4 linhas; 3 proposições, 8 linhas; 4 proposições, 16 linhas. Conte proposições distintas, não ocorrências.\n\nClassificação da proposição composta pelo resultado da tabela:\n\n• **Tautologia** — **todas** as linhas verdadeiras.\n• **Contradição** — **todas** as linhas falsas.\n• **Contingência** — há verdadeiras e falsas. É o caso mais comum.\n\nItem que defina tautologia como 'ao menos uma linha verdadeira' está errado: isso descreve contingência ou tautologia indistintamente. Tautologia é conceito absoluto.\n\nA ordem de precedência dos conectivos, quando não há parênteses: negação, conjunção, disjunção, condicional, bicondicional. Os parênteses sempre prevalecem, e é por isso que ¬(p ∧ q) e ¬p ∧ q são proposições diferentes.",
 "P17": "As **equivalências** que caem em toda prova:\n\n• **Contrapositiva**: (p → q) ≡ (¬q → ¬p). Inverte **e** nega. É a única equivalência da condicional que continua sendo condicional.\n• **Condicional em disjunção**: (p → q) ≡ (¬p ∨ q).\n• **De Morgan**: ¬(p ∧ q) ≡ (¬p ∨ ¬q) e ¬(p ∨ q) ≡ (¬p ∧ ¬q). Nega cada parte **e troca o conectivo**. Fazer só a primeira metade é o erro mais comum.\n\nA **recíproca** (q → p) **não** é equivalente à condicional. Inverter sem negar é recíproca; inverter negando é contrapositiva. Teste com um caso concreto: 'se chove, a rua molha' não autoriza concluir que rua molhada implica chuva.\n\nA **negação da condicional** não produz outra condicional: ¬(p → q) ≡ (p ∧ ¬q). É o único caso em que a condicional é falsa, e é exatamente isso que a negação afirma. Negar 'se for exonerado, perderá o cargo' é afirmar 'foi exonerado **e** não perdeu o cargo'.\n\nNas **negações de quantificadores**, negar não é opor. O par correto é:\n\n• Negação de **todo A é B** → **algum A não é B**.\n• Negação de **algum A é B** → **nenhum A é B**.\n• Negação de **nenhum A é B** → **algum A é B**.\n\n'Todos' e 'nenhum' são **contrárias**, não contraditórias: podem ser ambas falsas ao mesmo tempo, o que prova que uma não nega a outra. Basta um único caso para derrubar um 'todo' — e esse mínimo suficiente é sempre 'algum'.\n\nNa **argumentação**, um argumento é **válido** quando a conclusão decorre necessariamente das premissas. Validade é relação de **forma**, não de verdade: um argumento pode ser perfeitamente válido partindo de premissas falsas. Argumento válido **com** premissas verdadeiras chama-se **sólido**. A palavra 'válido' carrega aprovação no uso comum, e essa carga é a armadilha.",
 "P18": "**Razão** é o quociente entre duas grandezas; **proporção** é a igualdade entre duas razões. Na proporção, o produto dos meios é igual ao produto dos extremos — a base da regra de três.\n\nNa **regra de três**, identifique se as grandezas são **diretamente** proporcionais (uma cresce, a outra cresce) ou **inversamente** (uma cresce, a outra diminui). Mais operários, menos tempo: inversa. Na composta, analise cada grandeza separadamente em relação à incógnita.\n\nEm **porcentagem**, o ponto que mais derruba é que aumentos e descontos sucessivos **não se somam**, porque incidem sobre bases diferentes. Trabalhe com fatores multiplicativos:\n\n• Aumento de 20% → multiplica por **1,20**.\n• Desconto de 10% → multiplica por **0,90**.\n\nDois descontos de 10% sobre R$ 200: 200 × 0,90 × 0,90 = **162**, e não 160. Aumentar 20% e depois reduzir 20% dá 1,20 × 0,80 = **0,96**, ou seja, perda de 4% — nunca volta ao valor original. Variação percentual é sempre (valor final − inicial) ÷ inicial.\n\nEm **juros simples**, os juros incidem **apenas sobre o capital inicial**. A base é fixa, o acréscimo por período é constante e o montante cresce em **progressão aritmética**:\n\n**M = C(1 + i·n)**\n\nEm **juros compostos**, os juros de cada período passam a integrar a base do período seguinte — juros sobre juros. O montante cresce em **progressão geométrica**:\n\n**M = C(1 + i)ⁿ**\n\nTroque as duas fórmulas de lugar e o item fica errado, ainda que ambas estejam escritas corretamente: cada uma pertence a um regime.\n\nNo **primeiro período** os dois regimes produzem o mesmo montante. A partir do segundo, o composto supera o simples à mesma taxa. Para prazos **fracionários** inferiores a um período, o simples pode superar o composto — detalhe que aparece em item mais fino.\n\nA taxa e o prazo precisam estar na **mesma unidade**. Taxa mensal com prazo em anos exige conversão antes de qualquer conta.",
 "P19": "O **princípio fundamental da contagem** resolve boa parte dos problemas: se uma etapa tem m possibilidades e a seguinte tem n, o total é m × n.\n\nA distinção que organiza tudo é se **a ordem importa**:\n\n• **Arranjo** — a ordem **importa**. A(n,p) = n! ÷ (n − p)!. Cargos, senhas, pódios, sequências.\n• **Combinação** — a ordem **não** importa. C(n,p) = n! ÷ [p!(n − p)!]. Comissões, equipes, grupos, apertos de mão.\n• **Permutação** — arranjo de todos os elementos. P(n) = n!. Filas, anagramas.\n\nA única diferença entre as fórmulas de arranjo e combinação é o **p!** no denominador da combinação, que elimina as repetições geradas pela ordem. Escrever a fórmula do arranjo debaixo do nome 'combinação' é item clássico, porque a expressão está correta — só pertence ao outro conceito.\n\nPalavras que sinalizam: *comissão, equipe, grupo, dupla* → combinação. *Cargo, ordem, sequência, pódio, senha* → arranjo.\n\nExemplos que valem memorizar: dispor 5 pessoas em fila são 5! = **120** maneiras; formar comissões de 2 entre 5 candidatos são C(5,2) = **10**, e não 20 — 20 é o arranjo, que conta cada dupla duas vezes.\n\nNa **permutação com repetição**, divide-se pelo fatorial de cada elemento repetido. Os anagramas de BANANA são 6! ÷ (3!·2!) = 60.\n\nEm **probabilidade**, P(A) = casos favoráveis ÷ casos possíveis, sempre entre **0 e 1**. A probabilidade de um evento somada à de seu **complementar** é igual a 1 — e calcular pelo complementar costuma ser o caminho curto quando aparece 'pelo menos um'.\n\nDistinções que caem:\n\n• **Eventos mutuamente exclusivos** — a ocorrência de um **exclui** o outro. P(A ∪ B) = P(A) + P(B).\n• **Eventos independentes** — a ocorrência de um **não altera** a probabilidade do outro. P(A ∩ B) = P(A) × P(B).\n\nSão conceitos **opostos**, não sinônimos. Dois eventos mutuamente exclusivos com probabilidade positiva nunca são independentes.",
 "P20": "Os **pronomes de tratamento** seguem uma regra que contraria a intuição: embora se dirijam à pessoa com quem se fala, exigem concordância de verbos e pronomes possessivos na **terceira pessoa**. Escreve-se 'Vossa Senhoria enviou **seu** parecer', nunca 'enviaste teu parecer'. O adjetivo, contudo, concorda com o **sexo da pessoa**: 'Vossa Excelência está atarefado' ou 'atarefada'.\n\nA forma com **Vossa** é usada quando se fala **com** a autoridade; a forma com **Sua**, quando se fala **a respeito** dela.\n\nOs principais:\n\n• **Vossa Excelência** — autoridades dos três Poderes: Presidente da República, ministros, senadores, deputados, governadores, prefeitos, magistrados, oficiais-generais.\n• **Vossa Senhoria** — demais autoridades e particulares, em comunicação formal.\n• **Vossa Magnificência** — reitores de universidade.\n• **Vossa Santidade**, **Vossa Eminência**, **Vossa Reverendíssima** — autoridades religiosas.\n\nCaíram em desuso **Digníssimo (DD)** e **Ilustríssimo**, substituídos simplesmente por **Senhor**. 'Doutor' não é forma de tratamento, e sim título acadêmico: usa-se apenas para quem tenha defendido tese.\n\nNo **vocativo**, a regra é estreita e cai com frequência: **Excelentíssimo Senhor**, seguido do cargo, é reservado ao **Presidente da República**, ao **Presidente do Congresso Nacional** e ao **Presidente do Supremo Tribunal Federal**. Para **todas** as demais autoridades, inclusive ministros e governadores, o vocativo é **Senhor**, seguido do cargo. Não há exceção além dessas três.\n\nNos **fechos**, existem apenas dois, e trocá-los de lugar é o item mais barato da matéria:\n\n• **Respeitosamente** — para autoridades de hierarquia **superior**.\n• **Atenciosamente** — para autoridades de **mesma** hierarquia ou **inferior**.\n\nNo **endereçamento**, indicam-se o nome, o cargo e o endereço do destinatário, sem abreviaturas de tratamento. Na **identificação do signatário**, escrevem-se o nome e o cargo, sem linha acima do nome e sem negrito.",
 "P21": "A edição vigente do Manual de Redação da Presidência da República **unificou** aviso, ofício e memorando em um modelo único: o **padrão ofício**. O memorando deixou de existir como expediente autônomo, e a comunicação entre unidades de um mesmo órgão passou a ser feita também por **ofício**. Item que trate o memorando como documento vigente está errado — e esse erro sobrevive porque muita apostila não atualizou.\n\nAs **partes do padrão ofício**: tipo e número do expediente, seguido da sigla do órgão; local e data, com o dia em algarismo, o mês por extenso e o ano sem ponto; endereçamento; **assunto**, em resumo do teor; texto; fecho; identificação do signatário; e numeração de páginas quando houver mais de uma.\n\nO **texto** segue estrutura definida. Em expediente que traga proposta ou informação nova: **introdução**, que apresenta o objeto — sem os clichês 'Tenho a honra de' ou 'Cumpre-me informar'; **desenvolvimento**, em que se detalha o assunto, um parágrafo por ideia; e **conclusão**, que reafirma a posição. Quando for mera resposta, a introdução deve fazer referência ao expediente que a originou.\n\nOs parágrafos do texto são **numerados**, exceto quando houver apenas um e nos casos em que o expediente se estruture em itens.\n\nAs **características fundamentais** da redação oficial são: **impessoalidade**, **uso do padrão culto da linguagem**, **clareza**, **concisão**, **formalidade** e **uniformidade**. Originalidade não é uma delas — é o oposto do que a padronização busca, e por isso funciona bem como intruso em item de enumeração.\n\nVale separar duas que a banca troca: **impessoalidade** é a ausência das impressões individuais de quem redige, porque quem comunica é o serviço público; **clareza** é a qualidade do texto que permite compreensão imediata pelo leitor.\n\nOutros expedientes: a **exposição de motivos** é dirigida ao Presidente da República ou ao Vice por um ministro; a **mensagem** é a comunicação entre chefes de Poder; e o **correio eletrônico** tem valor documental quando houver certificação digital.",
 "P22": "**População** é o conjunto completo; **amostra** é a parte dele que se observa. Amostragem **probabilística** dá a cada elemento chance conhecida de ser sorteado — aleatória simples, sistemática, estratificada, por conglomerados.\n\nAs **variáveis** dividem-se em **qualitativas** (nominais, sem ordem; ordinais, com ordem) e **quantitativas**. Entre as quantitativas, **discretas** assumem valores em conjunto enumerável — contam-se, como número de filhos; **contínuas** assumem qualquer valor de um intervalo — medem-se, como altura. Conta-se ou mede-se: é esse o critério.\n\nNas **medidas de posição**, a **média** incorpora o valor de cada observação e por isso é **arrastada por valores extremos**. A **mediana** depende da posição, não da magnitude, e por isso é **resistente** a extremos — é a medida preferida em distribuições fortemente assimétricas. A **moda** é o valor mais frequente, e pode não existir (amodal) ou ser múltipla (bimodal, multimodal). Pense numa sala com dez salários de 3 mil e um de 5 milhões: a média mente, a mediana não.\n\nNas **medidas de dispersão**, a **amplitude** é a diferença entre extremos. A **variância** é a média dos quadrados dos desvios e, por isso, fica no **quadrado da unidade** dos dados — reais ao quadrado não significam nada para quem lê. O **desvio padrão** é a raiz quadrada da variância e devolve a medida à **unidade original**: é essa a razão de ele existir. O **coeficiente de variação** é desvio padrão dividido pela média; por ser adimensional, permite comparar a variabilidade de conjuntos em unidades diferentes.\n\nA **distribuição normal** é simétrica em torno da média e fica inteiramente caracterizada por **dois parâmetros**: média e desvio padrão. Nela, média, mediana e moda coincidem. A **regra empírica**: cerca de **68%** das observações em **um** desvio padrão em torno da média, **95%** em **dois** e **99,7%** em **três**. Trocar 68 por 95 é o item mais frequente.\n\nAtenção à recíproca: toda normal é simétrica, mas **nem toda distribuição simétrica é normal** — a uniforme, por exemplo.\n\nEm **teste de hipóteses**, o **erro tipo I** é rejeitar a hipótese nula sendo ela verdadeira (o alarme falso); o **erro tipo II** é não rejeitá-la sendo ela falsa. O nível de significância é a probabilidade do erro tipo I.",
 "P23": "O **orçamento público** é a lei que estima a receita e fixa a despesa para o exercício. O ciclo tem três instrumentos: **PPA** (quatro anos, diretrizes e metas), **LDO** (anual, orienta a elaboração da LOA) e **LOA** (anual, o orçamento propriamente dito).\n\nPrincípios orçamentários que caem: **unidade** (um orçamento por ente), **universalidade** (todas as receitas e despesas), **anualidade** (período determinado), **exclusividade** (a LOA só trata de receita e despesa), **legalidade**, **publicidade** e **não afetação** da receita de impostos a órgão ou despesa específicos, salvo exceções constitucionais.\n\nO **exercício financeiro coincide com o ano civil** no Brasil.\n\nA **receita pública** classifica-se quanto à origem em **originária**, decorrente da exploração do patrimônio do próprio Estado (aluguéis, preços públicos, receita de empresas estatais), e **derivada**, obtida do patrimônio do particular mediante o poder de império (tributos, multas, contribuições). Quanto à categoria econômica, em **correntes** e **de capital**.\n\nOs **estágios da receita**, na ordem: **previsão → lançamento → arrecadação → recolhimento**. O último é recolhimento, não empenho — empenho é da despesa, e aparece como intruso em item de enumeração.\n\nOs **estágios da despesa**, na ordem: **empenho → liquidação → pagamento**.\n\n• **Empenho** — ato que **cria para o Estado a obrigação de pagamento** e reserva a dotação. É **vedada a despesa sem prévio empenho**.\n• **Liquidação** — **verifica o direito adquirido pelo credor**, conferindo a entrega do bem ou a prestação do serviço.\n• **Pagamento** — quitação efetiva.\n\nInverter empenho e liquidação é o item mais cobrado do bloco.\n\nOs **restos a pagar** são as despesas **empenhadas** e não pagas até 31 de dezembro — empenhadas, não liquidadas. Dividem-se em **processadas** (já liquidadas, cujo credor tem direito certo) e **não processadas** (ainda não liquidadas). Essa distinção só existe porque o critério de inscrição é o empenho.\n\nO **regime contábil** da Lei 4.320/1964 é **misto**: **caixa para a receita** (pertencem ao exercício as arrecadadas nele) e **competência para a despesa** (as legalmente empenhadas nele).",
 "P24": "Os **princípios expressos** da administração pública, no art. 37, *caput*, da Constituição, são cinco: **legalidade, impessoalidade, moralidade, publicidade e eficiência** — a sigla LIMPE. **Razoabilidade**, **proporcionalidade**, **supremacia do interesse público**, **autotutela** e **motivação** são princípios **implícitos** ou infraconstitucionais: verdadeiros, aplicados pelos tribunais, mas **fora** daquele rol. Item que os inclua no *caput* está errado — o erro está no endereço, não no conceito.\n\nOs **poderes administrativos**: **vinculado** (sem margem de escolha), **discricionário** (com juízo de conveniência e oportunidade), **hierárquico** (escalonamento interno), **disciplinar** (punição de agentes e contratados), **regulamentar** e **de polícia**, que **condiciona o exercício de direitos individuais em favor do interesse coletivo**.\n\nNão confunda o poder de polícia com a **autotutela**, que é a prerrogativa de a administração **rever os próprios atos**: anular os ilegais e revogar os inconvenientes, **sem** necessidade de decisão judicial.\n\nOs **atributos do ato administrativo** são **presunção de legitimidade**, **imperatividade**, **autoexecutoriedade** e **tipicidade**. A presunção de legitimidade é **relativa** — admite prova em contrário. A autoexecutoriedade **não está presente em todos os atos**: depende de previsão legal ou de urgência; a cobrança de multa não paga, por exemplo, exige via judicial.\n\nOs **requisitos** do ato são competência, finalidade, forma, motivo e objeto. Competência, finalidade e forma são sempre vinculados; motivo e objeto podem ser discricionários.\n\nNa **Constituição**, o art. 5º traz as garantias que mais caem. Entre elas: ninguém será preso senão **em flagrante delito** ou por **ordem escrita e fundamentada de autoridade judiciária competente**, salvo transgressão militar ou crime propriamente militar; e não há crime sem lei anterior que o defina.\n\nNo **art. 144**, a **Polícia Federal** apura infrações contra a ordem política e social ou em detrimento de bens, serviços e interesses da União, suas autarquias e empresas públicas, além de infrações com repercussão interestadual ou internacional que exijam repressão uniforme. Exerce **com exclusividade** as funções de polícia judiciária **da União** — e apenas da União: a polícia judiciária dos estados cabe às polícias civis.",
 "P25": "**Crime** é fato típico, ilícito e culpável. O **fato típico** reúne conduta, resultado, nexo causal e tipicidade. A **ilicitude** é afastada pelas excludentes: estado de necessidade, legítima defesa, estrito cumprimento de dever legal e exercício regular de direito. A **culpabilidade** exige imputabilidade, potencial consciência da ilicitude e exigibilidade de conduta diversa.\n\nDiz-se o crime **consumado** quando nele se reúnem todos os elementos de sua definição legal, e **tentado** quando, iniciada a execução, não se consuma por **circunstâncias alheias à vontade do agente**. Se o agente desiste voluntariamente, há desistência voluntária, não tentativa.\n\nNa **aplicação da lei penal no tempo**, a regra é a irretroatividade, com uma exceção que é o ponto da matéria: **só a lei mais benéfica retroage**, e retroage **inclusive** após o trânsito em julgado. A lei mais grave **nunca** alcança fato anterior à sua vigência. Trocar 'benéfica' por 'grave' é item recorrente, e a falsa condição 'desde que não haja trânsito em julgado' costuma vir junto para dar ar técnico.\n\nO **inquérito policial** é **procedimento administrativo**, de natureza **inquisitiva**, presidido pelo delegado, destinado a apurar **autoria e materialidade**. É peça **informativa e dispensável**: havendo elementos suficientes por outra via, a denúncia pode ser oferecida sem ele. E, justamente por ser inquisitivo e informativo, **vício no inquérito não contamina, em regra, a ação penal** — só a prova ilícita nele produzida é atingida. Esse efeito é o inverso do intuitivo, e é por isso que cai.\n\nNa **prisão em flagrante**, qualquer pessoa do povo **pode** prender e a autoridade policial **deve**. A prisão de qualquer pessoa e o local onde se encontre **devem ser comunicados imediatamente ao juiz competente** e à família do preso ou a pessoa por ele indicada. As duas coisas são independentes: quem pode prender não tem relação com quem precisa ser avisado.\n\nA **prisão preventiva** exige os requisitos legais e fundamentação; a **temporária** só cabe nas hipóteses de lei específica e tem prazo determinado.\n\nEm **prova**, vigora a vedação às **provas ilícitas**, e a **cadeia de custódia** documenta o rastreamento do vestígio desde a coleta.",
 "P26": "Na **Lei de Drogas (11.343/2006)**, a mudança central é que o **porte para consumo pessoal não comporta pena privativa de liberdade**. As sanções são advertência sobre os efeitos das drogas, prestação de serviços à comunidade e medida educativa de comparecimento a programa ou curso. Item que preveja prisão para o usuário está errado, por mais plausível que soe.\n\nPara distinguir usuário de traficante, o juiz considera a natureza e a quantidade da substância, o local e as condições da ação, as circunstâncias sociais e pessoais, a conduta e os antecedentes.\n\nNo **Estatuto do Desarmamento (10.826/2003)**, a distinção é **territorial** e cai sempre:\n\n• **Posse** irregular — manter a arma **no interior da residência** ou no **local de trabalho**, quando o agente é o titular ou responsável pelo estabelecimento.\n• **Porte** ilegal — **trazer a arma consigo fora** desses limites.\n\nNo uso comum as duas palavras são quase sinônimas, e sem o critério territorial fixado a escolha vira sorteio.\n\nNa **Lei de Organização Criminosa (12.850/2013)**, considera-se organização criminosa a associação de **4 ou mais pessoas**, estruturalmente ordenada e caracterizada pela **divisão de tarefas**, com objetivo de obter vantagem de qualquer natureza mediante a prática de infrações penais cujas penas máximas sejam **superiores a 4 anos**, ou que sejam de **caráter transnacional**. Os dois quatros são reais e independentes. A lei disciplina meios de obtenção de prova como colaboração premiada, ação controlada e infiltração de agentes.\n\nEm **Direito Ambiental**, os princípios que caem:\n\n• **Poluidor-pagador** — quem degrada arca com os custos de prevenção e reparação.\n• **Usuário-pagador** — quem utiliza recurso ambiental paga por isso, **ainda que não haja poluição**.\n• **Prevenção** — risco conhecido. **Precaução** — risco incerto; a dúvida científica não autoriza a omissão.\n• **Desenvolvimento sustentável** e **responsabilidade intergeracional**.\n\nA proteção do meio ambiente e o combate à poluição são de **competência comum** da União, dos estados, do Distrito Federal e dos municípios — não privativa da União.\n\nA **responsabilidade civil por dano ambiental é objetiva**: independe de culpa, bastando conduta, dano e nexo causal. E é possível a responsabilização **penal da pessoa jurídica** por crime ambiental."
};

/* Conteudo programatico completo do edital, por materia da taxonomia.
   p = passo estrategico que cobre o topico; null = ainda sem questao no banco. */
const EDITAL = [
 {
  "m": "Informatica",
  "topicos": [
   {
    "a": "Conceitos de hardware: processador, memória, barramentos, dispositivos de E/S",
    "p": null
   },
   {
    "a": "Conceitos de software: sistema operacional, aplicativos, licenciamento",
    "p": null
   },
   {
    "a": "Sistema operacional Windows: interface, arquivos e pastas, permissões, atalhos",
    "p": "P07"
   },
   {
    "a": "Sistema operacional Linux: estrutura de diretórios, permissões, comandos básicos",
    "p": "P07"
   },
   {
    "a": "Edição de textos (Word e LibreOffice Writer)",
    "p": "P07"
   },
   {
    "a": "Planilhas eletrônicas (Excel e LibreOffice Calc): fórmulas, funções, referências",
    "p": "P07"
   },
   {
    "a": "Apresentações (PowerPoint e LibreOffice Impress)",
    "p": null
   },
   {
    "a": "Redes de computadores: conceitos, topologias, meios de transmissão",
    "p": "P02"
   },
   {
    "a": "Modelo OSI: as sete camadas e suas funções",
    "p": "P01"
   },
   {
    "a": "Arquitetura TCP/IP: camadas, correspondência com o OSI",
    "p": "P01"
   },
   {
    "a": "Protocolos: IP, TCP, UDP, HTTP, HTTPS, DNS, DHCP, FTP, SMTP, POP3, IMAP",
    "p": "P01"
   },
   {
    "a": "Endereçamento: IPv4, IPv6, máscara, sub-redes, NAT",
    "p": "P02"
   },
   {
    "a": "Equipamentos de rede: hub, switch, roteador, access point",
    "p": "P02"
   },
   {
    "a": "Internet, intranet e extranet",
    "p": "P03"
   },
   {
    "a": "Arquitetura cliente-servidor e computação em nuvem (IaaS, PaaS, SaaS)",
    "p": "P03"
   },
   {
    "a": "Navegadores: funcionamento, cache, cookies, navegação anônima",
    "p": "P03"
   },
   {
    "a": "Correio eletrônico: protocolos, webmail, anexos",
    "p": "P03"
   },
   {
    "a": "Segurança da informação: pilares (confidencialidade, integridade, disponibilidade, autenticidade, não repúdio)",
    "p": "P04"
   },
   {
    "a": "Malware: vírus, worm, trojan, ransomware, spyware, rootkit, botnet",
    "p": "P04"
   },
   {
    "a": "Ataques: phishing, engenharia social, DoS/DDoS, man-in-the-middle, força bruta",
    "p": "P04"
   },
   {
    "a": "Criptografia simétrica e assimétrica",
    "p": "P05"
   },
   {
    "a": "Assinatura digital, certificado digital, ICP-Brasil, funções de hash",
    "p": "P05"
   },
   {
    "a": "Firewall, IDS/IPS, VPN, proxy",
    "p": "P06"
   },
   {
    "a": "Autenticação e controle de acesso: senhas, MFA, biometria",
    "p": "P05"
   },
   {
    "a": "Backup: tipos (completo, incremental, diferencial), políticas, RPO/RTO",
    "p": "P06"
   },
   {
    "a": "Noções de banco de dados e big data",
    "p": null
   }
  ]
 },
 {
  "m": "ContabilidadeGeral",
  "topicos": [
   {
    "a": "Conceito, objeto, campo de aplicação e finalidade da contabilidade",
    "p": null
   },
   {
    "a": "Usuários da informação contábil",
    "p": null
   },
   {
    "a": "Princípios e características qualitativas da informação contábil",
    "p": null
   },
   {
    "a": "Patrimônio: bens, direitos e obrigações",
    "p": "P08"
   },
   {
    "a": "Equação patrimonial e patrimônio líquido",
    "p": "P08"
   },
   {
    "a": "Contas: conceito, classificação, teoria das contas",
    "p": "P08"
   },
   {
    "a": "Método das partidas dobradas: débito, crédito e saldo",
    "p": "P08"
   },
   {
    "a": "Escrituração: livros, lançamentos, fórmulas",
    "p": "P09"
   },
   {
    "a": "Fatos contábeis: permutativos, modificativos e mistos",
    "p": "P09"
   },
   {
    "a": "Regimes contábeis: caixa e competência",
    "p": "P09"
   },
   {
    "a": "Balanço Patrimonial: estrutura, ativo e passivo, critérios de classificação",
    "p": "P10"
   },
   {
    "a": "Demonstração do Resultado do Exercício (DRE)",
    "p": "P10"
   },
   {
    "a": "Demonstração das Mutações do Patrimônio Líquido (DMPL)",
    "p": null
   },
   {
    "a": "Demonstração dos Fluxos de Caixa (DFC): métodos direto e indireto",
    "p": "P10"
   },
   {
    "a": "Ativo imobilizado: reconhecimento, depreciação, amortização, exaustão",
    "p": "P11"
   },
   {
    "a": "Estoques: critérios de avaliação (PEPS, média ponderada)",
    "p": "P11"
   },
   {
    "a": "Contas a receber, provisão para perdas e duplicatas descontadas",
    "p": null
   },
   {
    "a": "Provisões, passivos contingentes e ativos contingentes",
    "p": "P11"
   },
   {
    "a": "Conciliação bancária",
    "p": null
   },
   {
    "a": "Operações com mercadorias e apuração do resultado",
    "p": null
   },
   {
    "a": "Análise de balanços: índices de liquidez",
    "p": "P11"
   },
   {
    "a": "Análise de balanços: índices de endividamento e estrutura de capital",
    "p": null
   },
   {
    "a": "Análise de balanços: índices de rentabilidade",
    "p": null
   },
   {
    "a": "Análise horizontal e vertical",
    "p": "P11"
   }
  ]
 },
 {
  "m": "Portugues",
  "topicos": [
   {
    "a": "Compreensão e interpretação de textos",
    "p": "P15"
   },
   {
    "a": "Tipologia e gêneros textuais",
    "p": null
   },
   {
    "a": "Coesão e coerência textual",
    "p": "P15"
   },
   {
    "a": "Ortografia oficial",
    "p": "P13"
   },
   {
    "a": "Acentuação gráfica",
    "p": "P13"
   },
   {
    "a": "Emprego das classes de palavras",
    "p": "P14"
   },
   {
    "a": "Emprego do sinal indicativo de crase",
    "p": "P13"
   },
   {
    "a": "Sintaxe da oração e do período",
    "p": "P14"
   },
   {
    "a": "Pontuação",
    "p": "P14"
   },
   {
    "a": "Concordância nominal e verbal",
    "p": "P12"
   },
   {
    "a": "Regência nominal e verbal",
    "p": "P12"
   },
   {
    "a": "Colocação pronominal",
    "p": "P13"
   },
   {
    "a": "Significação das palavras: sinonímia, antonímia, polissemia",
    "p": "P15"
   },
   {
    "a": "Reescrita de frases e substituição de palavras",
    "p": "P15"
   },
   {
    "a": "Vozes verbais e transformação de estruturas",
    "p": "P14"
   }
  ]
 },
 {
  "m": "RLM",
  "topicos": [
   {
    "a": "Proposições: conceito, valor lógico, proposições simples e compostas",
    "p": "P16"
   },
   {
    "a": "Conectivos e tabelas-verdade",
    "p": "P16"
   },
   {
    "a": "Tautologia, contradição e contingência",
    "p": "P16"
   },
   {
    "a": "Equivalências lógicas (condicional, contrapositiva, De Morgan)",
    "p": "P17"
   },
   {
    "a": "Negação de proposições compostas",
    "p": "P17"
   },
   {
    "a": "Negação de quantificadores (todo, algum, nenhum)",
    "p": "P17"
   },
   {
    "a": "Lógica de argumentação: validade, premissas e conclusão",
    "p": "P17"
   },
   {
    "a": "Diagramas lógicos e lógica de primeira ordem",
    "p": null
   },
   {
    "a": "Teoria dos conjuntos e diagramas de Venn",
    "p": null
   },
   {
    "a": "Problemas de raciocínio: ordenação, associação, verdades e mentiras",
    "p": null
   }
  ]
 },
 {
  "m": "Matematica",
  "topicos": [
   {
    "a": "Análise combinatória: arranjo, combinação, permutação",
    "p": "P19"
   },
   {
    "a": "Probabilidade: conceitos, eventos, probabilidade condicional",
    "p": "P19"
   },
   {
    "a": "Sequências e séries numéricas",
    "p": null
   },
   {
    "a": "Razão, proporção, regra de três, porcentagem",
    "p": "P18"
   },
   {
    "a": "Juros simples e compostos",
    "p": "P18"
   },
   {
    "a": "Equações, sistemas lineares, matrizes e determinantes",
    "p": null
   },
   {
    "a": "Geometria básica: áreas, perímetros, volumes",
    "p": null
   }
  ]
 },
 {
  "m": "RedacaoOficial",
  "topicos": [
   {
    "a": "Redação oficial: características fundamentais (clareza, concisão, formalidade, impessoalidade, padronização)",
    "p": "P21"
   },
   {
    "a": "Redação oficial: pronomes de tratamento e concordância",
    "p": "P20"
   },
   {
    "a": "Redação oficial: vocativos, endereçamento e fechos",
    "p": "P20"
   },
   {
    "a": "Redação oficial: o padrão ofício — estrutura e partes",
    "p": "P21"
   },
   {
    "a": "Redação oficial: demais expedientes (exposição de motivos, mensagem, correio eletrônico)",
    "p": "P21"
   },
   {
    "a": "Redação oficial: formatação e apresentação dos documentos",
    "p": "P21"
   }
  ]
 },
 {
  "m": "Estatistica",
  "topicos": [
   {
    "a": "População, amostra e tipos de amostragem",
    "p": null
   },
   {
    "a": "Tipos de variáveis: qualitativas e quantitativas",
    "p": "P22"
   },
   {
    "a": "Distribuições de frequência, histogramas e representações gráficas",
    "p": null
   },
   {
    "a": "Medidas de posição: média, mediana, moda, quartis e percentis",
    "p": "P22"
   },
   {
    "a": "Medidas de dispersão: amplitude, variância, desvio padrão, coeficiente de variação",
    "p": "P22"
   },
   {
    "a": "Medidas de assimetria e curtose",
    "p": null
   },
   {
    "a": "Probabilidade: axiomas, eventos, independência, teorema de Bayes",
    "p": null
   },
   {
    "a": "Variáveis aleatórias discretas e contínuas",
    "p": null
   },
   {
    "a": "Distribuições: binomial, Poisson, normal",
    "p": "P22"
   },
   {
    "a": "Distribuição amostral da média e teorema central do limite",
    "p": null
   },
   {
    "a": "Estimação pontual e intervalos de confiança",
    "p": null
   },
   {
    "a": "Testes de hipóteses: erros tipo I e II, nível de significância",
    "p": "P22"
   },
   {
    "a": "Correlação e regressão linear simples",
    "p": null
   },
   {
    "a": "Números-índice",
    "p": null
   }
  ]
 },
 {
  "m": "ContabilidadePublica",
  "topicos": [
   {
    "a": "Orçamento público: princípios e ciclo orçamentário",
    "p": "P23"
   },
   {
    "a": "Receita pública: classificação e estágios",
    "p": "P23"
   },
   {
    "a": "Despesa pública: classificação e estágios",
    "p": "P23"
   },
   {
    "a": "Restos a pagar e regime contábil público",
    "p": "P23"
   },
   {
    "a": "Exercício financeiro e Lei 4.320/1964",
    "p": null
   }
  ]
 },
 {
  "m": "DireitoConstitucional",
  "topicos": [
   {
    "a": "Princípios fundamentais",
    "p": null
   },
   {
    "a": "Direitos e garantias fundamentais: direitos individuais e coletivos",
    "p": "P24"
   },
   {
    "a": "Direitos sociais, nacionalidade e direitos políticos",
    "p": null
   },
   {
    "a": "Organização do Estado: União, estados, municípios e competências",
    "p": null
   },
   {
    "a": "Administração pública na Constituição (arts. 37 a 41)",
    "p": null
   },
   {
    "a": "Organização dos Poderes",
    "p": null
   },
   {
    "a": "Segurança pública (art. 144) e atribuições da Polícia Federal",
    "p": "P24"
   }
  ]
 },
 {
  "m": "DireitoAdministrativo",
  "topicos": [
   {
    "a": "Administração pública: conceito, princípios expressos e implícitos",
    "p": "P24"
   },
   {
    "a": "Organização administrativa: administração direta e indireta",
    "p": null
   },
   {
    "a": "Poderes administrativos e abuso de poder",
    "p": "P24"
   },
   {
    "a": "Atos administrativos: conceito, requisitos, atributos, espécies, extinção",
    "p": "P24"
   },
   {
    "a": "Agentes públicos e regime jurídico (Lei 8.112/1990)",
    "p": null
   },
   {
    "a": "Processo administrativo disciplinar",
    "p": null
   },
   {
    "a": "Improbidade administrativa (Lei 8.429/1992)",
    "p": null
   },
   {
    "a": "Licitações e contratos (Lei 14.133/2021)",
    "p": null
   },
   {
    "a": "Controle da administração e responsabilidade civil do Estado",
    "p": null
   },
   {
    "a": "Processo administrativo federal (Lei 9.784/1999)",
    "p": null
   }
  ]
 },
 {
  "m": "DireitoPenal",
  "topicos": [
   {
    "a": "Aplicação da lei penal no tempo e no espaço",
    "p": "P25"
   },
   {
    "a": "Teoria do crime: fato típico, ilicitude, culpabilidade",
    "p": "P25"
   },
   {
    "a": "Excludentes de ilicitude e de culpabilidade",
    "p": null
   },
   {
    "a": "Concurso de pessoas e concurso de crimes",
    "p": null
   },
   {
    "a": "Penas: espécies, aplicação e dosimetria",
    "p": null
   },
   {
    "a": "Extinção da punibilidade e prescrição",
    "p": null
   },
   {
    "a": "Crimes contra a pessoa e contra o patrimônio",
    "p": null
   },
   {
    "a": "Crimes contra a fé pública",
    "p": null
   },
   {
    "a": "Crimes contra a administração pública",
    "p": null
   }
  ]
 },
 {
  "m": "DireitoProcessualPenal",
  "topicos": [
   {
    "a": "Inquérito policial: natureza, características, atribuições",
    "p": "P25"
   },
   {
    "a": "Ação penal pública e privada",
    "p": null
   },
   {
    "a": "Prova: meios, ônus, provas ilícitas, cadeia de custódia",
    "p": "P25"
   },
   {
    "a": "Prisão em flagrante, preventiva e temporária",
    "p": "P25"
   },
   {
    "a": "Medidas cautelares diversas da prisão",
    "p": null
   },
   {
    "a": "Audiência de custódia",
    "p": null
   },
   {
    "a": "Competência e jurisdição",
    "p": null
   },
   {
    "a": "Habeas corpus e demais ações de impugnação",
    "p": null
   }
  ]
 },
 {
  "m": "LegislacaoFederal",
  "topicos": [
   {
    "a": "Lei 10.826/2003 — Estatuto do Desarmamento",
    "p": "P26"
   },
   {
    "a": "Lei 11.343/2006 — Lei de Drogas",
    "p": "P26"
   },
   {
    "a": "Lei 9.455/1997 — Crimes de tortura",
    "p": null
   },
   {
    "a": "Lei 13.869/2019 — Abuso de autoridade",
    "p": null
   },
   {
    "a": "Lei 12.850/2013 — Organização criminosa",
    "p": "P26"
   },
   {
    "a": "Lei 9.613/1998 — Lavagem de dinheiro",
    "p": null
   },
   {
    "a": "Lei 12.830/2013 — Investigação criminal conduzida por delegado",
    "p": null
   },
   {
    "a": "Lei 8.069/1990 — ECA (disposições penais)",
    "p": null
   },
   {
    "a": "Lei 13.445/2017 — Lei de Migração",
    "p": null
   },
   {
    "a": "Lei 7.716/1989 — Crimes de preconceito e racismo",
    "p": null
   }
  ]
 },
 {
  "m": "DireitoAmbiental",
  "topicos": [
   {
    "a": "Direito Ambiental: princípios e competências",
    "p": "P26"
   },
   {
    "a": "Direito Ambiental: crimes ambientais",
    "p": "P26"
   }
  ]
 }
];
