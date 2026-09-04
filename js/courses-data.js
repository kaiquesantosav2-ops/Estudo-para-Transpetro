  const COMMON_GROUPS = [
    { group:"Conhecimentos Gerais — Português", video:{ title:"Português do Zero: Interpretação de Texto (curso gratuito)", id:"GXyFAA5GZuU" },
      items:["Compreensão e interpretação de texto","Ortografia, acentuação e pontuação","Morfologia (classes de palavras)","Sintaxe (concordância, regência, colocação pronominal)","Semântica (sinonímia, antonímia, denotação/conotação)"] },
    { group:"Conhecimentos Gerais — Inglês", video:{ title:"Inglês Instrumental — playlist de leitura técnica", url:"https://www.youtube.com/playlist?list=PL3cojm4LP_7WtAN4UOV8ECxXttTqP1jJ7" },
      items:["Leitura técnica em Inglês","Vocabulário industrial e de negócios","Tempos verbais e estruturas gramaticais","Compreensão de textos técnicos","Tradução funcional de instruções"] }
  ];

  const COURSES = {
    producao: { name:"Engenharia de Produção",
      examUrl:"https://www.qconcursos.com/questoes-de-concursos/provas/cesgranrio-2023-transpetro-profissional-transpetro-de-nivel-superior-junior-enfase-19-engenharia-de-producao",
      provaUrl:"https://arquivos.qconcursos.com/prova/arquivo_prova/101234/cesgranrio-2023-transpetro-profissional-transpetro-de-nivel-superior-junior-enfase-19-engenharia-de-producao-prova.pdf",
      gabaritoUrl:"https://arquivos.qconcursos.com/prova/arquivo_gabarito/101234/cesgranrio-2023-transpetro-profissional-transpetro-de-nivel-superior-junior-enfase-19-engenharia-de-producao-gabarito.pdf",
      groups:[
        { group:"PCP — Planejamento e Controle da Produção", video:{title:"PCP — Conceito, pilares, etapas e benefícios (aula completa)", id:"4zzzXJ5LtIA"},
          items:["Programação e sequenciamento da produção","Controle de processos e capacidade","Indicadores de desempenho (OEE, taxa de refugo)","MRP I e MRP II","Previsão de demanda e just-in-time (JIT)"] },
        { group:"Gestão da Qualidade", video:{title:"Gestão da Qualidade e Six Sigma — buscar aulas", url:"https://www.youtube.com/results?search_query=gest%C3%A3o+da+qualidade+six+sigma+aula+completa"},
          items:["Sistemas de gestão (ISO 9001, TQM)","CEP — Controle Estatístico de Processos","Confiabilidade e mantenibilidade","Ferramentas Lean e Six Sigma","FMEA e análise de falhas"] },
        { group:"Cadeia de Abastecimento & Estoques", video:{title:"Aulão de Curva ABC — como utilizar", id:"_jxbQz3ki50"},
          items:["Gestão de estoques (lote econômico, revisão contínua)","Classificação ABC e curva de Pareto","Logística de distribuição","Transporte e armazenagem","Gestão de fornecedores"] },
        { group:"Engenharia Econômica & Custos", video:{title:"Revisão: Payback, VPL, TIR e TIRM (aula completa)", id:"WmT3R7RrtKE"},
          items:["VPL, TIR, payback e ROI","Fluxo de caixa e análise de investimentos","Cálculo de custos industriais","Margem de contribuição e ponto de equilíbrio","Orçamento e controle de custos"] },
        { group:"Pesquisa Operacional & Estatística", video:{title:"Programação Linear — Pesquisa Operacional", id:"I-AtKAd5sdI"},
          items:["Programação linear e problema do transporte","Teoria das filas e simulação","Distribuições (normal, Poisson, binomial)","Testes de hipótese e regressão","Planejamento de experimentos (DOE)"] },
        { group:"Gestão de Projetos", video:{title:"PERT/CPM para concursos — Caminho Crítico", id:"Kuy_tyvM9DE"},
          items:["PERT e caminho crítico (CPM)","Escopo, tempo, custo e recursos","Riscos e comunicação em projetos","Encerramento de projetos"] }
      ]},
    mecanica: { name:"Engenharia Mecânica",
      examUrl:"https://www.qconcursos.com/questoes-de-concursos/provas/cesgranrio-2023-transpetro-profissional-transpetro-de-nivel-superior-junior-enfase-24-engenharia-mecanica",
      gabaritoUrl:"https://www.cesgranrio.org.br/concurso/transpetro/",
      groups:[
        { group:"Resistência dos Materiais", video:{title:"Resistência dos Materiais — buscar aulas", url:"https://www.youtube.com/results?search_query=resist%C3%AAncia+dos+materiais+aula+completa+engenharia"},
          items:["Tensão e deformação","Flexão e torção","Critérios de falha (Von Mises, Tresca)","Fadiga e concentração de tensões","Diagramas de esforços"] },
        { group:"Termodinâmica", video:{title:"Termodinâmica aplicada — buscar aulas", url:"https://www.youtube.com/results?search_query=termodin%C3%A2mica+ciclos+aula+completa+engenharia+mec%C3%A2nica"},
          items:["Leis da termodinâmica","Ciclos (Rankine, Brayton, Otto, Diesel)","Entropia e disponibilidade de energia","Propriedades de substâncias puras"] },
        { group:"Transferência de Calor e Mecânica dos Fluidos", video:{title:"Transferência de calor e mecânica dos fluidos — buscar aulas", url:"https://www.youtube.com/results?search_query=transfer%C3%AAncia+de+calor+mec%C3%A2nica+dos+fluidos+aula+completa"},
          items:["Condução, convecção e radiação","Trocadores de calor","Equação de Bernoulli e perda de carga","Bombas, ventiladores e compressores"] },
        { group:"Elementos de Máquinas", video:{title:"Elementos de máquinas — buscar aulas", url:"https://www.youtube.com/results?search_query=elementos+de+m%C3%A1quinas+aula+completa"},
          items:["Engrenagens e correias","Rolamentos e mancais","Eixos e uniões parafusadas","Molas e acoplamentos"] },
        { group:"Manutenção Industrial", video:{title:"Manutenção Industrial — TPM e RCM — buscar aulas", url:"https://www.youtube.com/results?search_query=manuten%C3%A7%C3%A3o+industrial+TPM+RCM+aula+completa"},
          items:["Manutenção preventiva, preditiva e corretiva","TPM e RCM","Indicadores (MTBF, MTTR, disponibilidade)","Planejamento de paradas"] }
      ]},
    civil: { name:"Engenharia Civil",
      examUrl:"https://www.qconcursos.com/questoes-de-concursos/provas/cesgranrio-2023-transpetro-profissional-transpetro-de-nivel-superior-junior-enfase-16-engenharia-civil",
      groups:[
        { group:"Resistência dos Materiais e Estruturas", video:{title:"Estruturas e resistência dos materiais — buscar aulas", url:"https://www.youtube.com/results?search_query=resist%C3%AAncia+dos+materiais+estruturas+aula+completa+engenharia+civil"},
          items:["Esforços internos e diagramas","Momento fletor e cortante","Dimensionamento estrutural básico"] },
        { group:"Concreto Armado e Estruturas Metálicas", video:{title:"Concreto armado NBR 6118 — buscar aulas", url:"https://www.youtube.com/results?search_query=concreto+armado+NBR+6118+aula+completa"},
          items:["Fundamentos da NBR 6118","Ligações em estruturas metálicas","Flambagem e estabilidade"] },
        { group:"Geotecnia e Fundações", video:{title:"Geotecnia e fundações — buscar aulas", url:"https://www.youtube.com/results?search_query=geotecnia+funda%C3%A7%C3%B5es+aula+completa"},
          items:["Classificação de solos","Sondagens SPT","Fundações rasas e profundas"] },
        { group:"Hidráulica e Saneamento", video:{title:"Hidráulica e saneamento básico — buscar aulas", url:"https://www.youtube.com/results?search_query=hidr%C3%A1ulica+saneamento+aula+completa"},
          items:["Redes de água e esgoto","Dimensionamento de tubulações","Estações de tratamento"] },
        { group:"Gestão de Obras e Topografia", video:{title:"Gestão de obras e orçamento — buscar aulas", url:"https://www.youtube.com/results?search_query=gest%C3%A3o+de+obras+or%C3%A7amento+BDI+aula+completa"},
          items:["Cronograma físico-financeiro","Orçamento e BDI","Curva S","Topografia e instalações prediais"] }
      ]},
    eletrica: { name:"Engenharia Elétrica",
      examUrl:"https://www.qconcursos.com/questoes-de-concursos/provas/cesgranrio-2023-transpetro-profissional-transpetro-de-nivel-superior-junior-enfase-22-engenharia-eletrica",
      groups:[
        { group:"Circuitos Elétricos", video:{title:"Circuitos elétricos CC e CA — buscar aulas", url:"https://www.youtube.com/results?search_query=circuitos+el%C3%A9tricos+CC+CA+aula+completa"},
          items:["Leis de Kirchhoff","Circuitos CC e CA","Potência ativa, reativa e aparente"] },
        { group:"Sistemas de Potência e Máquinas Elétricas", video:{title:"Sistemas de potência e máquinas elétricas — buscar aulas", url:"https://www.youtube.com/results?search_query=sistemas+de+pot%C3%AAncia+m%C3%A1quinas+el%C3%A9tricas+aula+completa"},
          items:["Geração, transmissão e distribuição","Transformadores","Motores de indução e geradores síncronos"] },
        { group:"Instalações Elétricas e NR-10", video:{title:"NR-10 e instalações elétricas — buscar aulas", url:"https://www.youtube.com/results?search_query=NR-10+instala%C3%A7%C3%B5es+el%C3%A9tricas+aula+completa"},
          items:["Dimensionamento de circuitos","Proteção e aterramento","Segurança em instalações (NR-10)"] },
        { group:"Eletrônica de Potência e Automação", video:{title:"Eletrônica de potência — buscar aulas", url:"https://www.youtube.com/results?search_query=eletr%C3%B4nica+de+pot%C3%AAncia+aula+completa"},
          items:["Conversores e inversores de frequência","Acionamentos elétricos"] },
        { group:"Proteção de Sistemas Elétricos", video:{title:"Proteção de sistemas elétricos — buscar aulas", url:"https://www.youtube.com/results?search_query=prote%C3%A7%C3%A3o+de+sistemas+el%C3%A9tricos+aula+completa"},
          items:["Relés e disjuntores","Cálculo de curto-circuito","Coordenação e seletividade"] }
      ]},
    quimica: { name:"Engenharia Química",
      examUrl:"https://www.qconcursos.com/questoes-de-concursos/provas/cesgranrio-2023-transpetro-profissional-transpetro-de-nivel-superior-junior-enfase-26-engenharia-quimica",
      groups:[
        { group:"Operações Unitárias", video:{title:"Operações unitárias — buscar aulas", url:"https://www.youtube.com/results?search_query=opera%C3%A7%C3%B5es+unit%C3%A1rias+aula+completa+engenharia+qu%C3%ADmica"},
          items:["Destilação e absorção","Extração líquido-líquido","Evaporação e cristalização"] },
        { group:"Termodinâmica Química e Cinética", video:{title:"Termodinâmica química — buscar aulas", url:"https://www.youtube.com/results?search_query=termodin%C3%A2mica+qu%C3%ADmica+cin%C3%A9tica+aula+completa"},
          items:["Equilíbrio de fases","Entalpia de reação","Cinética de reações químicas"] },
        { group:"Fenômenos de Transporte", video:{title:"Fenômenos de transporte — buscar aulas", url:"https://www.youtube.com/results?search_query=fen%C3%B4menos+de+transporte+aula+completa"},
          items:["Transferência de massa","Transferência de calor","Quantidade de movimento"] },
        { group:"Processos de Refino e Petroquímica", video:{title:"Processos de refino — buscar aulas", url:"https://www.youtube.com/results?search_query=processos+de+refino+petroqu%C3%ADmica+aula+completa"},
          items:["Unidades de processo","Craqueamento catalítico","Destilação atmosférica e a vácuo"] },
        { group:"Segurança de Processos", video:{title:"HAZOP e segurança de processos — buscar aulas", url:"https://www.youtube.com/results?search_query=HAZOP+seguran%C3%A7a+de+processos+aula+completa"},
          items:["Análise HAZOP","Classificação de áreas classificadas","Controle de processos químicos"] }
      ]},
    automacao: { name:"Engenharia de Automação",
      examUrl:"https://www.qconcursos.com/questoes-de-concursos/provas/cesgranrio-2023-transpetro-profissional-transpetro-de-nivel-superior-junior-enfase-17-engenharia-de-automacao",
      groups:[
        { group:"Sistemas de Controle", video:{title:"Sistemas de controle e PID — buscar aulas", url:"https://www.youtube.com/results?search_query=sistemas+de+controle+PID+aula+completa"},
          items:["Malha aberta e fechada","Controladores PID","Estabilidade de sistemas"] },
        { group:"CLPs e Instrumentação", video:{title:"CLP e automação industrial — buscar aulas", url:"https://www.youtube.com/results?search_query=CLP+automa%C3%A7%C3%A3o+industrial+ladder+aula+completa"},
          items:["Linguagem ladder","Lógica de intertravamento","Sensores, transmissores e válvulas de controle"] },
        { group:"Redes Industriais e Supervisório", video:{title:"Redes industriais e SCADA — buscar aulas", url:"https://www.youtube.com/results?search_query=redes+industriais+SCADA+Modbus+Profibus+aula+completa"},
          items:["Protocolos Modbus, Profibus, Ethernet/IP","Supervisório e SCADA","Aquisição de dados e IHM"] },
        { group:"Robótica Industrial", video:{title:"Robótica industrial — buscar aulas", url:"https://www.youtube.com/results?search_query=rob%C3%B3tica+industrial+aula+completa"},
          items:["Cinemática de robôs","Sistemas de visão industrial"] }
      ]},
    ambiental: { name:"Engenharia Ambiental",
      examUrl:"https://www.qconcursos.com/questoes-de-concursos/provas/cesgranrio-2023-transpetro-profissional-transpetro-de-nivel-superior-junior-enfase-15-engenharia-ambiental",
      groups:[
        { group:"Legislação Ambiental", video:{title:"Legislação ambiental — buscar aulas", url:"https://www.youtube.com/results?search_query=legisla%C3%A7%C3%A3o+ambiental+licenciamento+aula+completa"},
          items:["Política Nacional do Meio Ambiente","Licenciamento ambiental","Resoluções CONAMA"] },
        { group:"Tratamento de Água e Efluentes", video:{title:"Tratamento de água e efluentes — buscar aulas", url:"https://www.youtube.com/results?search_query=tratamento+de+%C3%A1gua+efluentes+aula+completa"},
          items:["Processos físico-químicos","Tratamento biológico de efluentes"] },
        { group:"Resíduos Sólidos e Poluição Atmosférica", video:{title:"Gestão de resíduos sólidos — buscar aulas", url:"https://www.youtube.com/results?search_query=pol%C3%ADtica+nacional+res%C3%ADduos+s%C3%B3lidos+aula+completa"},
          items:["Política Nacional de Resíduos Sólidos","Classificação NBR 10004","Controle de emissões atmosféricas"] },
        { group:"Avaliação de Impacto e Gestão Ambiental", video:{title:"EIA/RIMA e ISO 14001 — buscar aulas", url:"https://www.youtube.com/results?search_query=EIA+RIMA+ISO+14001+aula+completa"},
          items:["Estudo e relatório de impacto ambiental (EIA/RIMA)","Sistemas de gestão ambiental (ISO 14001)"] }
      ]},
    seguranca: { name:"Engenharia de Segurança do Trabalho",
      examUrl:"https://www.qconcursos.com/questoes-de-concursos/provas?q=cesgranrio+2023+transpetro+engenharia+de+seguranca+do+trabalho",
      groups:[
        { group:"Normas Regulamentadoras", video:{title:"Normas Regulamentadoras (NRs) — buscar aulas", url:"https://www.youtube.com/results?search_query=normas+regulamentadoras+NR-10+NR-12+NR-35+aula+completa"},
          items:["NR-10 (elétrica)","NR-12 (máquinas)","NR-13 (caldeiras e vasos)","NR-33 (espaços confinados)","NR-35 (trabalho em altura)"] },
        { group:"Higiene Ocupacional", video:{title:"Higiene ocupacional — buscar aulas", url:"https://www.youtube.com/results?search_query=higiene+ocupacional+aula+completa"},
          items:["Agentes físicos, químicos e biológicos","Limites de tolerância"] },
        { group:"Análise e Prevenção de Riscos", video:{title:"APR e PGR — buscar aulas", url:"https://www.youtube.com/results?search_query=an%C3%A1lise+preliminar+de+risco+PGR+aula+completa"},
          items:["Análise Preliminar de Risco (APR)","Programa de Gerenciamento de Riscos (PGR)","Mapa de riscos"] },
        { group:"Ergonomia e Investigação de Acidentes", video:{title:"Ergonomia NR-17 — buscar aulas", url:"https://www.youtube.com/results?search_query=ergonomia+NR-17+aula+completa"},
          items:["NR-17 e análise ergonômica","CIPA","Investigação de acidentes (árvore de causas)"] }
      ]},
    administracao: { name:"Administração",
      examUrl:"https://www.qconcursos.com/questoes-de-concursos/provas/cesgranrio-2023-transpetro-profissional-transpetro-de-nivel-superior-junior-enfase-1-administracao",
      groups:[
        { group:"Administração Geral", video:{title:"Teorias da administração — buscar aulas", url:"https://www.youtube.com/results?search_query=teorias+da+administra%C3%A7%C3%A3o+aula+completa+concurso"},
          items:["Funções administrativas (PODC)","Escolas da administração"] },
        { group:"Gestão de Pessoas", video:{title:"Gestão de pessoas — buscar aulas", url:"https://www.youtube.com/results?search_query=gest%C3%A3o+de+pessoas+aula+completa+concurso"},
          items:["Recrutamento e seleção","Avaliação de desempenho","Treinamento e desenvolvimento"] },
        { group:"Administração Financeira e Orçamentária", video:{title:"Administração financeira — buscar aulas", url:"https://www.youtube.com/results?search_query=administra%C3%A7%C3%A3o+financeira+or%C3%A7amento+p%C3%BAblico+aula+completa"},
          items:["Orçamento público","Indicadores financeiros básicos"] },
        { group:"Licitações e Contratos", video:{title:"Lei 13.303/2016 licitações estatais — buscar aulas", url:"https://www.youtube.com/results?search_query=lei+13303+licita%C3%A7%C3%B5es+estatais+aula+completa"},
          items:["Lei 13.303/2016 (estatais)","Modalidades de licitação"] }
      ]},
    analise_sistemas: { name:"Análise de Sistemas",
      examUrl:"https://www.qconcursos.com/questoes-de-concursos/provas/cesgranrio-2023-transpetro-profissional-transpetro-de-nivel-superior-junior-enfase-4-analise-de-sistemas-infraestrutura",
      groups:[
        { group:"Banco de Dados", video:{title:"Banco de dados relacional e SQL — buscar aulas", url:"https://www.youtube.com/results?search_query=banco+de+dados+relacional+SQL+aula+completa"},
          items:["Modelagem relacional","SQL","Normalização"] },
        { group:"Redes de Computadores", video:{title:"Redes de computadores — buscar aulas", url:"https://www.youtube.com/results?search_query=redes+de+computadores+modelo+OSI+aula+completa"},
          items:["Modelo OSI e TCP/IP","Protocolos de rede"] },
        { group:"Engenharia de Software", video:{title:"Metodologias ágeis (Scrum) — buscar aulas", url:"https://www.youtube.com/results?search_query=engenharia+de+software+scrum+aula+completa"},
          items:["Ciclo de vida de software","Metodologias ágeis (Scrum)"] },
         { group:"Segurança da Informação", video:{title:"Segurança da informação e LGPD — buscar aulas", url:"https://www.youtube.com/results?search_query=seguran%C3%A7a+da+informa%C3%A7%C3%A3o+LGPD+aula+completa"},
           items:["Criptografia básica","Controles de acesso","LGPD"] }
       ]},
    naval: { name:"Engenharia Naval",
      examUrl:"https://www.qconcursos.com/questoes-de-concursos/provas/cesgranrio-2023-transpetro-profissional-transpetro-de-nivel-superior-junior-enfase-25-engenharia-naval",
      groups:[
        { group:"Arquitetura Naval", video:{title:"Arquitetura naval — buscar aulas", url:"https://www.youtube.com/results?search_query=arquitetura+naval+estabilidade+aula+completa"},
          items:["Estabilidade de embarcações","Hidrostática e curvas de forma","Compartimentação e flutuabilidade"] },
        { group:"Estruturas Navais", video:{title:"Estruturas navais — buscar aulas", url:"https://www.youtube.com/results?search_query=estruturas+navais+resist%C3%AAncia+estrutural+aula+completa"},
          items:["Resistência estrutural do casco","Materiais navais","Soldagem e juntas"] },
        { group:"Máquinas e Propulsão", video:{title:"Propulsão naval — buscar aulas", url:"https://www.youtube.com/results?search_query=propuls%C3%A3o+naval+m%C3%A1quinas+mar%C3%ADtimas+aula+completa"},
          items:["Sistemas de propulsão","Máquinas auxiliares","Óleo combustível e lubrificantes"] },
        { group:"Operação de Terminais e Dutos", video:{title:"Terminais e dutos — buscar aulas", url:"https://www.youtube.com/results?search_query=terminais+portu%C3%A1rios+dutos+opera%C3%A7%C3%A3o+aula+completa"},
          items:["Operação de terminais aquaviários","Carregamento e descarregamento","Segurança na navegação de apoio"] }
      ]},
    inspecao: { name:"Engenharia de Inspeção",
      examUrl:"https://www.qconcursos.com/questoes-de-concursos/provas/cesgranrio-2023-transpetro-profissional-transpetro-de-nivel-superior-junior-enfase-18-engenharia-de-inspecao",
      groups:[
        { group:"Ensaios Não Destrutivos", video:{title:"END — ensaios não destrutivos — buscar aulas", url:"https://www.youtube.com/results?search_query=ensaios+n%C3%A3o+destrutivos+ultrassom+l%C3%ADquido+penetrante+aula+completa"},
          items:["Ultrassom","Líquido penetrante","Partículas magnéticas","Radiografia industrial"] },
        { group:"Integridade de Equipamentos", video:{title:"Integridade de dutos e vasos — buscar aulas", url:"https://www.youtube.com/results?search_query=integridade+de+dutos+vasos+press%C3%A3o+aula+completa"},
          items:["Inspeção de dutos","Vasos de pressão (NR-13)","Corrosão e proteção catódica"] },
        { group:"Normas e Códigos", video:{title:"ASME API inspeção — buscar aulas", url:"https://www.youtube.com/results?search_query=ASME+API+570+510+inspe%C3%A7%C3%A3o+aula+completa"},
          items:["API 510, 570 e 653","ASME seção VIII","Procedimentos de inspeção"] }
      ]},
    telecom: { name:"Engenharia de Telecomunicações",
      examUrl:null,
      groups:[
        { group:"Fundamentos de Telecom", video:{title:"Telecomunicações — buscar aulas", url:"https://www.youtube.com/results?search_query=telecomunica%C3%A7%C3%B5es+modula%C3%A7%C3%A3o+aula+completa"},
          items:["Modulação analógica e digital","Meios de transmissão","Antenas e propagação"] },
        { group:"Redes e Protocolos", video:{title:"Redes de telecom — buscar aulas", url:"https://www.youtube.com/results?search_query=redes+telecomunica%C3%A7%C3%B5es+TCP+IP+aula+completa"},
          items:["Modelo OSI e TCP/IP","Comutação de circuitos e pacotes","Redes ópticas"] },
        { group:"Sistemas Industriais de Comunicação", video:{title:"Comunicação industrial — buscar aulas", url:"https://www.youtube.com/results?search_query=redes+industriais+comunica%C3%A7%C3%A3o+aula+completa"},
          items:["Rádio industrial","Enlaces em plantas e dutos","Segurança da informação em redes"] }
      ]},
    geotecnica: { name:"Engenharia Geotécnica",
      examUrl:null,
      groups:[
        { group:"Mecânica dos Solos", video:{title:"Mecânica dos solos — buscar aulas", url:"https://www.youtube.com/results?search_query=mec%C3%A2nica+dos+solos+aula+completa"},
          items:["Índices físicos","Tensões no solo","Adensamento e cisalhamento"] },
        { group:"Fundações e Contenções", video:{title:"Fundações e contenções — buscar aulas", url:"https://www.youtube.com/results?search_query=funda%C3%A7%C3%B5es+conten%C3%A7%C3%B5es+aula+completa"},
          items:["Fundações rasas e profundas","Muros e taludes","Estabilidade de encostas"] },
        { group:"Obras Lineares (dutos)", video:{title:"Geotecnia de dutos — buscar aulas", url:"https://www.youtube.com/results?search_query=geotecnia+dutos+faixa+de+servid%C3%A3o+aula+completa"},
          items:["Faixa de dutos","Sondagens e investigação","Riscos geotécnicos"] }
      ]},
    advocacia: { name:"Advocacia",
      examUrl:"https://www.qconcursos.com/questoes-de-concursos/provas/cesgranrio-2023-transpetro-profissional-transpetro-de-nivel-superior-junior-enfase-2-advocacia",
      groups:[
        { group:"Direito Constitucional e Administrativo", video:{title:"Direito administrativo para concursos — buscar aulas", url:"https://www.youtube.com/results?search_query=direito+administrativo+licita%C3%A7%C3%B5es+aula+completa+concurso"},
          items:["Princípios da administração pública","Atos administrativos","Licitações e contratos (Lei 13.303/2016)"] },
        { group:"Direito Civil e Empresarial", video:{title:"Direito civil e empresarial — buscar aulas", url:"https://www.youtube.com/results?search_query=direito+civil+empresarial+aula+completa+concurso"},
          items:["Obrigações e contratos","Responsabilidade civil","Sociedades empresárias"] },
        { group:"Direito do Trabalho e Ambiental", video:{title:"Direito do trabalho — buscar aulas", url:"https://www.youtube.com/results?search_query=direito+do+trabalho+aula+completa+concurso"},
          items:["CLT aplicada a estatais","Meio ambiente do trabalho","Responsabilidade ambiental"] }
      ]},
    contabilidade: { name:"Contabilidade",
      examUrl:null,
      groups:[
        { group:"Contabilidade Geral", video:{title:"Contabilidade geral — buscar aulas", url:"https://www.youtube.com/results?search_query=contabilidade+geral+CPC+aula+completa+concurso"},
          items:["Regime de competência","Demonstrações contábeis","CPC e NBC TG"] },
        { group:"Contabilidade de Custos e Gerencial", video:{title:"Contabilidade de custos — buscar aulas", url:"https://www.youtube.com/results?search_query=contabilidade+de+custos+aula+completa"},
          items:["Custeio por absorção e variável","Margem de contribuição","Orçamento empresarial"] },
        { group:"Contabilidade Pública e Auditoria", video:{title:"Contabilidade pública — buscar aulas", url:"https://www.youtube.com/results?search_query=contabilidade+p%C3%BAblica+auditoria+aula+completa+concurso"},
          items:["MCASP básico","Prestação de contas","Auditoria interna"] }
      ]},
    comunicacao: { name:"Comunicação Social",
      examUrl:null,
      groups:[
        { group:"Teorias da Comunicação", video:{title:"Teorias da comunicação — buscar aulas", url:"https://www.youtube.com/results?search_query=teorias+da+comunica%C3%A7%C3%A3o+aula+completa"},
          items:["Modelos de comunicação","Opinião pública","Comunicação organizacional"] },
        { group:"Jornalismo e Assessoria", video:{title:"Assessoria de imprensa — buscar aulas", url:"https://www.youtube.com/results?search_query=assessoria+de+imprensa+comunica%C3%A7%C3%A3o+corporativa+aula+completa"},
          items:["Redação jornalística","Assessoria de imprensa","Gestão de crise"] },
        { group:"Comunicação Digital", video:{title:"Comunicação digital — buscar aulas", url:"https://www.youtube.com/results?search_query=comunica%C3%A7%C3%A3o+digital+redes+sociais+aula+completa"},
          items:["Redes sociais corporativas","Identidade visual","Ética e legislação da comunicação"] }
      ]},
    pedagogia: { name:"Pedagogia",
      examUrl:"https://www.qconcursos.com/questoes-de-concursos/provas/cesgranrio-2023-transpetro-profissional-transpetro-de-nivel-superior-junior-enfase-27-pedagogia",
      groups:[
        { group:"Didática e Currículo", video:{title:"Didática e currículo — buscar aulas", url:"https://www.youtube.com/results?search_query=did%C3%A1tica+curr%C3%ADculo+aula+completa+pedagogia"},
          items:["Planejamento de ensino","Avaliação da aprendizagem","Teorias pedagógicas"] },
        { group:"Educação Corporativa", video:{title:"Educação corporativa — buscar aulas", url:"https://www.youtube.com/results?search_query=educa%C3%A7%C3%A3o+corporativa+T%26D+aula+completa"},
          items:["Treinamento e desenvolvimento","Andragogia","Educação a distância"] },
        { group:"Legislação Educacional", video:{title:"LDB e legislação educacional — buscar aulas", url:"https://www.youtube.com/results?search_query=LDB+legisla%C3%A7%C3%A3o+educacional+aula+completa"},
          items:["LDB","PCNs e BNCC (noções)","Inclusão educacional"] }
      ]},
    medicina_trabalho: { name:"Medicina do Trabalho",
      examUrl:null,
      groups:[
        { group:"Saúde Ocupacional", video:{title:"Medicina do trabalho — buscar aulas", url:"https://www.youtube.com/results?search_query=medicina+do+trabalho+PCMSO+aula+completa"},
          items:["PCMSO","ASO e exames ocupacionais","Doenças relacionadas ao trabalho"] },
        { group:"Toxicologia e Higiene", video:{title:"Toxicologia ocupacional — buscar aulas", url:"https://www.youtube.com/results?search_query=toxicologia+ocupacional+aula+completa"},
          items:["Agentes químicos","Limites de exposição","Vigilância em saúde"] },
        { group:"NRs e Perícias", video:{title:"NRs medicina do trabalho — buscar aulas", url:"https://www.youtube.com/results?search_query=NR-7+NR-9+medicina+do+trabalho+aula+completa"},
          items:["NR-7 e NR-9","Nexo causal","Perícia médica"] }
      ]},
    enfermagem_trabalho: { name:"Enfermagem do Trabalho",
      examUrl:"https://www.qconcursos.com/questoes-de-concursos/provas/cesgranrio-2023-transpetro-profissional-transpetro-de-nivel-superior-junior-enfase-14-enfermagem-do-trabalho",
      groups:[
        { group:"Enfermagem Ocupacional", video:{title:"Enfermagem do trabalho — buscar aulas", url:"https://www.youtube.com/results?search_query=enfermagem+do+trabalho+aula+completa"},
          items:["Atuação no SESMT","Primeiros socorros industriais","Imunização ocupacional"] },
        { group:"Vigilância em Saúde do Trabalhador", video:{title:"Saúde do trabalhador — buscar aulas", url:"https://www.youtube.com/results?search_query=sa%C3%BAde+do+trabalhador+vigil%C3%A2ncia+aula+completa"},
          items:["Notificação de acidentes","Programa de saúde","Educação em saúde"] },
        { group:"Normas e Biossegurança", video:{title:"Biossegurança e NRs — buscar aulas", url:"https://www.youtube.com/results?search_query=biosseguran%C3%A7a+enfermagem+do+trabalho+aula+completa"},
          items:["NR-32 (noções)","EPIs","Registros de enfermagem"] }
      ]},
    psicologia: { name:"Psicologia",
      examUrl:null,
      groups:[
        { group:"Psicologia Organizacional", video:{title:"Psicologia organizacional — buscar aulas", url:"https://www.youtube.com/results?search_query=psicologia+organizacional+aula+completa"},
          items:["Recrutamento e seleção","Clima e cultura","Liderança e motivação"] },
        { group:"Saúde Mental no Trabalho", video:{title:"Saúde mental no trabalho — buscar aulas", url:"https://www.youtube.com/results?search_query=sa%C3%BAde+mental+no+trabalho+aula+completa"},
          items:["Estresse ocupacional","Assédio moral","Qualidade de vida no trabalho"] },
        { group:"Avaliação Psicológica", video:{title:"Avaliação psicológica — buscar aulas", url:"https://www.youtube.com/results?search_query=avalia%C3%A7%C3%A3o+psicol%C3%B3gica+concurso+aula+completa"},
          items:["Testes psicológicos","Ética do psicólogo","Laudos e atestados"] }
      ]},
    nutricao: { name:"Nutrição",
      examUrl:null,
      groups:[
        { group:"Nutrição Básica", video:{title:"Nutrição básica — buscar aulas", url:"https://www.youtube.com/results?search_query=nutri%C3%A7%C3%A3o+b%C3%A1sica+macronutrientes+aula+completa"},
          items:["Macro e micronutrientes","Avaliação nutricional","Dietas especiais"] },
        { group:"Alimentação Coletiva", video:{title:"Alimentação coletiva — buscar aulas", url:"https://www.youtube.com/results?search_query=alimenta%C3%A7%C3%A3o+coletiva+UAN+aula+completa"},
          items:["UAN e refeitórios industriais","HACCP e BPF","Cardápios institucionais"] },
        { group:"Vigilância Sanitária", video:{title:"Vigilância sanitária de alimentos — buscar aulas", url:"https://www.youtube.com/results?search_query=vigil%C3%A2ncia+sanit%C3%A1ria+alimentos+aula+completa"},
          items:["Boas práticas","Doenças transmitidas por alimentos","Legislação sanitária"] }
      ]},
    odontologia: { name:"Odontologia",
      examUrl:null,
      groups:[
        { group:"Odontologia do Trabalho", video:{title:"Odontologia do trabalho — buscar aulas", url:"https://www.youtube.com/results?search_query=odontologia+do+trabalho+aula+completa"},
          items:["Saúde bucal ocupacional","Exames admissionais odontológicos","Prevenção em ambiente industrial"] },
        { group:"Clínica e Urgências", video:{title:"Urgências odontológicas — buscar aulas", url:"https://www.youtube.com/results?search_query=urg%C3%AAncias+odontol%C3%B3gicas+aula+completa"},
          items:["Traumatismos","Infecções odontogênicas","Biossegurança"] },
        { group:"Saúde Coletiva", video:{title:"Odontologia em saúde coletiva — buscar aulas", url:"https://www.youtube.com/results?search_query=odontologia+sa%C3%BAde+coletiva+aula+completa"},
          items:["Epidemiologia bucal","Programas preventivos","Ética profissional"] }
      ]},
    ciencia_dados: { name:"Ciência de Dados",
      examUrl:null,
      groups:[
        { group:"Estatística e Probabilidade", video:{title:"Estatística para ciência de dados — buscar aulas", url:"https://www.youtube.com/results?search_query=estat%C3%ADstica+ci%C3%AAncia+de+dados+aula+completa"},
          items:["Distribuições","Inferência","Regressão"] },
        { group:"Aprendizado de Máquina", video:{title:"Machine learning — buscar aulas", url:"https://www.youtube.com/results?search_query=machine+learning+aula+completa+iniciante"},
          items:["Supervised vs unsupervised","Métricas de modelo","Overfitting"] },
        { group:"Dados e SQL", video:{title:"SQL e bancos de dados — buscar aulas", url:"https://www.youtube.com/results?search_query=SQL+banco+de+dados+aula+completa"},
           items:["SQL","ETL","Visualização de dados"] }
       ]}
  };

  function getCourseData(key) {
    if (COURSES[key]) {
      const c = COURSES[key];
      return {
        name: c.name,
        examUrl: c.examUrl || null,
        provaUrl: c.provaUrl || null,
        gabaritoUrl: c.gabaritoUrl || "https://www.cesgranrio.org.br/concurso/transpetro/",
        groups: (c.groups || []).concat(COMMON_GROUPS),
        custom: !!(c.groups && c.groups.length)
      };
    }
    return null;
  }

  const ENFASE_LISTS = {
    engenharias: [
      ["Engenharia de Produção","producao"], ["Engenharia Mecânica","mecanica"], ["Engenharia Civil","civil"],
      ["Engenharia Elétrica","eletrica"], ["Engenharia Química","quimica"], ["Engenharia Naval","naval"],
      ["Engenharia de Automação","automacao"], ["Engenharia de Telecomunicações","telecom"],
      ["Engenharia de Segurança do Trabalho","seguranca"], ["Engenharia Geotécnica","geotecnica"],
      ["Engenharia de Inspeção","inspecao"], ["Engenharia Ambiental","ambiental"]
    ],
    administrativas: [
      ["Administração","administracao"], ["Advocacia","advocacia"], ["Contabilidade","contabilidade"],
      ["Análise de Sistemas","analise_sistemas"], ["Comunicação Social","comunicacao"], ["Pedagogia","pedagogia"]
    ],
    saude: [
      ["Medicina do Trabalho","medicina_trabalho"], ["Enfermagem do Trabalho","enfermagem_trabalho"],
      ["Psicologia","psicologia"], ["Nutrição","nutricao"], ["Odontologia","odontologia"]
    ],
    tecnologia: [
      ["Análise de Sistemas","analise_sistemas"], ["Ciência de Dados","ciencia_dados"], ["Engenharia de Automação","automacao"]
    ]
  };

  const QUICK_CHIPS = ["producao","mecanica","civil","eletrica","quimica","automacao","ambiental","seguranca","administracao","analise_sistemas"];

  const EXTRA_EXAMS = [
    {
      id: "producao-2023",
      name: "Engenharia de Produção 2023 — Prova 19",
      total: 70,
      provaUrl: "https://arquivos.qconcursos.com/prova/arquivo_prova/101234/cesgranrio-2023-transpetro-profissional-transpetro-de-nivel-superior-junior-enfase-19-engenharia-de-producao-prova.pdf",
      gabaritoUrl: "https://arquivos.qconcursos.com/prova/arquivo_gabarito/101234/cesgranrio-2023-transpetro-profissional-transpetro-de-nivel-superior-junior-enfase-19-engenharia-de-producao-gabarito.pdf",
      examUrl: "https://www.qconcursos.com/questoes-de-concursos/provas/cesgranrio-2023-transpetro-profissional-transpetro-de-nivel-superior-junior-enfase-19-engenharia-de-producao"
    },
    {
      id: "dutos-2023",
      name: "Técnico de Dutos e Terminais 2023",
      total: 60,
      provaUrl: "https://arquivos.qconcursos.com/prova/arquivo_prova/101197/cesgranrio-2023-transpetro-tecnico-de-dutos-prova.pdf",
      gabaritoUrl: "https://arquivos.qconcursos.com/prova/arquivo_gabarito/101197/cesgranrio-2023-transpetro-tecnico-de-dutos-gabarito.pdf"
    }
  ];

  window.COMMON_GROUPS = COMMON_GROUPS;
  window.COURSES = COURSES;
  window.getCourseData = getCourseData;
  window.ENFASE_LISTS = ENFASE_LISTS;
  window.QUICK_CHIPS = QUICK_CHIPS;
  window.EXTRA_EXAMS = EXTRA_EXAMS;

