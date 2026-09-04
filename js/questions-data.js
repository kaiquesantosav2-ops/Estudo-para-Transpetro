(function () {
  const PRACTICE_QUESTIONS = [
    {
      id: "pt-1",
      cat: "Português",
      courses: ["*"],
      stem: "Em um texto administrativo, a palavra “contudo” introduz, em regra, uma relação de:",
      options: ["Causa", "Conclusão", "Oposição", "Finalidade", "Explicação"],
      answer: "C",
      explain: "“Contudo” é conjunção adversativa: opõe a ideia anterior. Não inventa gabarito oficial; é treino de gramática."
    },
    {
      id: "pt-2",
      cat: "Português",
      courses: ["*"],
      stem: "Assinale a opção em que a concordância verbal está de acordo com a norma culta.",
      options: [
        "Haviam muitos candidatos na sala.",
        "Fazem dois anos que o edital saiu.",
        "Deve existir vagas para todas as ênfases.",
        "Havia muitos candidatos na sala.",
        "Existe, na prova, questões eliminatórias."
      ],
      answer: "D",
      explain: "O verbo haver no sentido de existir é impessoal: “Havia muitos candidatos”. “Faz” de tempo também fica no singular."
    },
    {
      id: "pt-3",
      cat: "Português",
      courses: ["*"],
      stem: "Na interpretação de texto, infere-se uma informação quando o leitor:",
      options: [
        "Copia um trecho literal do enunciado",
        "Conclui algo implícito a partir do que foi dito",
        "Substitui todas as palavras por sinônimos",
        "Ignora o contexto e lê só o título",
        "Conta o número de parágrafos"
      ],
      answer: "B",
      explain: "Inferência é conclusão não explícita, mas autorizada pelo texto. Evite extrapolar o que o autor não sustentou."
    },
    {
      id: "pt-4",
      cat: "Português",
      courses: ["*"],
      stem: "O uso do acento em “pôr” (verbo) justifica-se para:",
      options: [
        "Indicar oxítona terminada em R",
        "Marcar hiato",
        "Diferenciar do substantivo “por”",
        "Seguir a regra das paroxítonas",
        "Indicar proparoxítona"
      ],
      answer: "C",
      explain: "“Pôr” leva acento diferencial em relação à preposição “por”."
    },
    {
      id: "pt-5",
      cat: "Português",
      courses: ["*"],
      stem: "Em “A empresa, que opera dutos, publicou o edital”, a oração destacada é:",
      options: [
        "Subordinada adjetiva restritiva",
        "Subordinada adjetiva explicativa",
        "Subordinada adverbial causal",
        "Coordenada sindética aditiva",
        "Reduzida de gerúndio"
      ],
      answer: "B",
      explain: "Entre vírgulas, “que opera dutos” explica o antecedente já identificado: adjetiva explicativa."
    },
    {
      id: "en-1",
      cat: "Inglês",
      courses: ["*"],
      stem: "In a technical manual, the sentence “The valve shall be closed before maintenance” expresses:",
      options: ["A suggestion", "A past habit", "A mandatory requirement", "A hypothesis", "A comparison"],
      answer: "C",
      explain: "Em textos técnicos e normas, “shall” indica obrigação, não sugestão."
    },
    {
      id: "en-2",
      cat: "Inglês",
      courses: ["*"],
      stem: "The closest meaning of “throughput” in an industrial context is:",
      options: ["Employee turnover", "Volume processed in a period", "Heat loss", "Legal throughput tax", "Spare part"],
      answer: "B",
      explain: "Throughput é a quantidade processada/escoada em um intervalo — vazão de produção ou de duto."
    },
    {
      id: "en-3",
      cat: "Inglês",
      courses: ["*"],
      stem: "“Leak detection” refere-se principalmente a:",
      options: ["Detecção de vazamentos", "Calibração de relógios", "Treinamento de liderança", "Cálculo de VPL", "Pintura industrial"],
      answer: "A",
      explain: "Leak = vazamento. Vocabulário típico de dutos e integridade."
    },
    {
      id: "ed-1",
      cat: "Edital e prova",
      courses: ["*"],
      stem: "No modelo típico do Edital nº 4 (nível superior Transpetro/Cesgranrio), zerar a prova de conhecimentos gerais (Português/Inglês) tende a:",
      options: [
        "Gerar apenas perda de desempate",
        "Ser irrelevante se as específicas forem altas",
        "Eliminar o candidato",
        "Converter a nota em título",
        "Adiar a prova prática"
      ],
      answer: "C",
      explain: "A orientação desta plataforma: Português/Inglês e específicas são eliminatórios se zerados. Confirme sempre no edital vigente."
    },
    {
      id: "ed-2",
      cat: "Edital e prova",
      courses: ["*"],
      stem: "A estrutura mais citada para a prova de nível superior (Edital nº 4) é:",
      options: [
        "30 questões em 2 horas",
        "70 questões (50 específicas + 20 gerais) em 4h30",
        "100 questões discursivas",
        "Somente títulos e entrevista",
        "Prova oral de inglês"
      ],
      answer: "B",
      explain: "Use 70 questões e 4h30 como referência de estudo; detalhes oficiais estão no edital da Cesgranrio."
    },
    {
      id: "prod-1",
      cat: "PCP",
      courses: ["producao"],
      stem: "O indicador OEE combina, em sua forma clássica:",
      options: [
        "Custo, prazo e escopo",
        "Disponibilidade, desempenho e qualidade",
        "MTBF, MTTR e backlog",
        "VPL, TIR e payback",
        "Lead time, takt e kanban apenas"
      ],
      answer: "B",
      explain: "OEE = disponibilidade × desempenho × qualidade. Treino conceitual, não gabarito Cesgranrio."
    },
    {
      id: "prod-2",
      cat: "Gestão da Qualidade",
      courses: ["producao"],
      stem: "No CEP, um ponto fora dos limites de controle indica, em primeiro lugar:",
      options: [
        "Que o processo está necessariamente incapaz (Cpk < 1)",
        "Uma possível causa especial a investigar",
        "Que a média está no alvo",
        "Que a amostragem deve parar para sempre",
        "Aprovação automática do lote"
      ],
      answer: "B",
      explain: "Limites de controle monitoram estabilidade. Ponto fora sugere causa especial, não mistura com limites de especificação."
    },
    {
      id: "prod-3",
      cat: "Custos e engenharia econômica",
      courses: ["producao", "administracao", "contabilidade"],
      stem: "O VPL de um projeto é positivo quando:",
      options: [
        "O payback simples é maior que a vida útil",
        "A TIR é menor que a taxa mínima de atratividade",
        "O valor presente das entradas supera o das saídas à taxa de desconto",
        "Há apenas custos fixos",
        "O ROI contábil é zero"
      ],
      answer: "C",
      explain: "VPL > 0 significa que o fluxo descontado cria valor acima da TMA."
    },
    {
      id: "prod-4",
      cat: "Estoques",
      courses: ["producao", "administracao"],
      stem: "Na curva ABC de estoques, a classe A concentra:",
      options: [
        "Muitos itens de baixo valor",
        "Poucos itens de alto impacto no valor",
        "Somente sucata",
        "Apenas serviços",
        "Itens sem demanda"
      ],
      answer: "B",
      explain: "Pareto: poucos itens (A) respondem pela maior parte do valor/consumo."
    },
    {
      id: "mec-1",
      cat: "Resistência dos Materiais",
      courses: ["mecanica", "civil", "naval"],
      stem: "O critério de von Mises é especialmente usado para materiais:",
      options: ["Frágeis sob tração uniaxial apenas", "Dúcteis sob estados triaxiais de tensão", "Concreto simples", "Madeira anisotrópica", "Elastômeros ideais"],
      answer: "B",
      explain: "Von Mises (energia de distorção) é clássico para metais dúcteis."
    },
    {
      id: "mec-2",
      cat: "Termodinâmica",
      courses: ["mecanica", "quimica", "naval"],
      stem: "O ciclo Rankine é a referência clássica de:",
      options: ["Motores Otto de ignição por centelha", "Turbinas a vapor", "Refrigeração por compressão de vapor apenas", "Células a combustível", "Motores Stirling ideais"],
      answer: "B",
      explain: "Rankine descreve plantas a vapor: caldeira, turbina, condensador, bomba."
    },
    {
      id: "ele-1",
      cat: "Circuitos elétricos",
      courses: ["eletrica", "automacao"],
      stem: "A potência aparente em um circuito CA senoidal vale:",
      options: ["P = VI cosφ apenas", "S = VI (módulo)", "Q = VI cosφ", "S = I²R", "P = V/I"],
      answer: "B",
      explain: "S = Vrms × Irms. P = S cosφ (ativa) e Q = S senφ (reativa)."
    },
    {
      id: "ele-2",
      cat: "NR-10",
      courses: ["eletrica", "seguranca", "automacao"],
      stem: "A NR-10 trata principalmente de:",
      options: [
        "Trabalho em altura",
        "Segurança em instalações e serviços em eletricidade",
        "Espaços confinados",
        "Caldeiras e vasos de pressão",
        "Transporte de produtos perigosos apenas"
      ],
      answer: "B",
      explain: "NR-10 é a norma de segurança com eletricidade. NR-35 é altura; NR-33 espaços confinados; NR-13 caldeiras/vasos."
    },
    {
      id: "qui-1",
      cat: "Operações unitárias",
      courses: ["quimica"],
      stem: "Destilação atmosférica em refinaria separa frações principalmente por diferença de:",
      options: ["Densidade absoluta apenas", "Ponto de ebulição", "Cor", "Condutividade elétrica", "pH"],
      answer: "B",
      explain: "A coluna atmosférica explora volatilidade relativa (faixas de ebulição) do petróleo."
    },
    {
      id: "amb-1",
      cat: "Licenciamento ambiental",
      courses: ["ambiental"],
      stem: "No licenciamento federal típico, a sequência LP → LI → LO corresponde a:",
      options: [
        "Licença prévia, de instalação e de operação",
        "Licença provisória, interna e operacional",
        "Laudo, inspeção e outorga",
        "Licença portuária apenas",
        "Três taxas iguais sem etapa técnica"
      ],
      answer: "A",
      explain: "LP avalia viabilidade; LI autoriza implantar; LO autoriza operar, com condicionantes."
    },
    {
      id: "seg-1",
      cat: "Segurança do trabalho",
      courses: ["seguranca", "medicina_trabalho", "enfermagem_trabalho"],
      stem: "O PPRA/PGR tem como eixo identificar e controlar:",
      options: ["Somente o absenteísmo", "Riscos ocupacionais no ambiente de trabalho", "O IR da empresa", "A curva ABC de estoque", "O organograma comercial"],
      answer: "B",
      explain: "Programas de gerenciamento de riscos mapeiam perigos e definem medidas de controle."
    },
    {
      id: "aut-1",
      cat: "Automação",
      courses: ["automacao", "eletrica"],
      stem: "Um CLP (PLC) é, em síntese:",
      options: [
        "Um sensor de temperatura",
        "Um controlador industrial programável para lógica de processo",
        "Um tipo de válvula de alívio",
        "Um relé térmico apenas",
        "Um protocolo de rede social"
      ],
      answer: "B",
      explain: "O CLP executa lógica (ladder, etc.) para comandar malhas e intertravamentos."
    },
    {
      id: "adm-1",
      cat: "Administração pública",
      courses: ["administracao", "advocacia"],
      stem: "Estatais federais de economia mista, em regra, licitam à luz principalmente da:",
      options: ["CLT apenas", "Lei 13.303/2016 (Lei das Estatais)", "Código de Trânsito", "Lei de Direito Autoral", "Somente o Código Civil"],
      answer: "B",
      explain: "A Lei 13.303/2016 disciplina licitações e contratos de empresas públicas e sociedades de economia mista."
    },
    {
      id: "ti-1",
      cat: "Sistemas",
      courses: ["analise_sistemas", "ciencia_dados"],
      stem: "Em modelagem relacional, a chave primária serve para:",
      options: [
        "Colorir o diagrama",
        "Identificar de forma única cada tupla da tabela",
        "Substituir índices",
        "Garantir apenas ordem alfabética",
        "Criptografar backups"
      ],
      answer: "B",
      explain: "A PK identifica unicamente o registro e é base para integridade referencial."
    },
    {
      id: "civ-1",
      cat: "Estruturas",
      courses: ["civil", "geotecnica"],
      stem: "O SPT em sondagem de solo registra, de forma simplificada:",
      options: [
        "O pH da água",
        "O número de golpes para cravar o amostrador em trechos padronizados",
        "A resistência do aço CA-50",
        "O Cpk do concreto",
        "A vazão do duto"
      ],
      answer: "B",
      explain: "N_SPT é o número de golpes nos 30 cm finais do ensaio, indicador de resistência/compacidade."
    }
  ];

  function questionsForCourse(key) {
    const common = PRACTICE_QUESTIONS.filter(function (q) { return q.courses.indexOf("*") !== -1; });
    const specific = PRACTICE_QUESTIONS.filter(function (q) {
      return key && q.courses.indexOf(key) !== -1;
    });
    const seen = {};
    const out = [];
    specific.concat(common).forEach(function (q) {
      if (!seen[q.id]) { seen[q.id] = true; out.push(q); }
    });
    return out;
  }

  window.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
  window.questionsForCourse = questionsForCourse;
})();
