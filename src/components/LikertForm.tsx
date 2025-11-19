/**
 * Componente: LikertForm (Formulário de Diagnóstico Likert)
 * 
 * Formulário de avaliação com 6 perguntas divididas em 3 dimensões.
 * Sistema de pontuação e recomendações baseadas em esforço necessário.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { CheckCircle, AlertCircle, Sparkles, RotateCcw, BarChart3, ArrowRight, ArrowLeft, FileText } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

interface Question {
  id: number;
  text: string;
  dimension: 'social' | 'higiene_saude' | 'educacao';
}

interface DiagnosticResult {
  nickname: string;
  date: string;
  timestamp: number;
  answers: Record<number, number>;
  notes: Record<number, string>;
  scores: {
    social: number;
    higiene_saude: number;
    educacao: number;
  };
  priorityDimension: 'social' | 'higiene_saude' | 'educacao';
  effortLevel: 'MÁXIMO' | 'MODERADO' | 'BAIXO';
  rating?: number;
}

interface LikertFormProps {
  onNavigateToHistory?: () => void;
}

type LikertValue = "0" | "10" | "20" | "30" | "40";

interface FormData {
  q1: LikertValue | "";
  q2: LikertValue | "";
  q3: LikertValue | "";
  q4: LikertValue | "";
  q5: LikertValue | "";
  q6: LikertValue | "";
}

interface Dimension {
  name: string;
  questions: [number, number];
  total: number;
  effortLevel: 'MÁXIMO' | 'MODERADO' | 'BAIXO';
  actions: string[];
  additionalInfo?: string;
}

export function LikertForm({ onNavigateToHistory }: LikertFormProps = {}) {
  // Controle de etapas: 0=apelido, 1-3=dimensões (2 perguntas cada), 4=resultado
  const [step, setStep] = useState(0);
  
  // Apelido do diagnóstico
  const [nickname, setNickname] = useState<string>("");
  
  // Respostas das perguntas
  const [formData, setFormData] = useState<FormData>({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: ""
  });
  
  // Notas/observações para cada pergunta
  const [notes, setNotes] = useState<Record<number, string>>({});
  
  // Avaliação da ferramenta
  const [toolRating, setToolRating] = useState<string>("");
  
  // Estado de conclusão
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Resultados calculados
  const [results, setResults] = useState<any>(null);

  // Opções da escala Likert
  const likertOptions = [
    { value: "0", label: "Nunca" },
    { value: "10", label: "Raramente" },
    { value: "20", label: "Eventualmente" },
    { value: "30", label: "Frequentemente" },
    { value: "40", label: "Muito Frequentemente" }
  ];

  // Perguntas do formulário (conforme especificação)
  const questions: Question[] = [
    {
      id: 1,
      text: "Com que frequência a pessoa em situação de rua acessa serviços de alimentação?",
      dimension: "social"
    },
    {
      id: 2,
      text: "Com que frequência a pessoa em situação de rua acessa serviços socioassistenciais?",
      dimension: "social"
    },
    {
      id: 3,
      text: "Com que frequência a pessoa em situação de rua acessa espaços para higiene pessoal?",
      dimension: "higiene_saude"
    },
    {
      id: 4,
      text: "Com que frequência essa pessoa acessa serviços de saúde (seja para prevenção, tratamento contínuo ou atendimento geral)?",
      dimension: "higiene_saude"
    },
    {
      id: 5,
      text: "Com que frequência a pessoa em situação de rua acessa serviços de educação?",
      dimension: "educacao"
    },
    {
      id: 6,
      text: "Com que frequência a pessoa em situação de rua acessa espaços/atividades de cultura, esporte ou lazer?",
      dimension: "educacao"
    }
  ];

  // Ações práticas por dimensão (conforme especificação)
  const dimensionActions = {
    "Assistência Social e Segurança Alimentar": [
      "Mapear locais de refeições do entorno: realize um mapeamento de locais (projetos, OSCs, cozinhas solidárias, igrejas, centros comunitários, templos religiosos, entre outros) que ofereçam as principais refeições (café da manhã, almoço e janta), além de disponibilizar água. Monte uma lista ou quadro com endereços, pontos de referência (como chegar), dias da semana e horários de atendimento. Se necessário, desenhe um mapa simples para facilitar o entendimento. Tenha sensibilidade e avalie discretamente se a pessoa se sente confortável com materiais escritos. Caso contrário, verifique a melhor forma de repassar as informações. Em seguida, passe esses dados para a pessoa atendida e explique com calma onde ela pode se alimentar com mais frequência ao longo da semana. Se necessário, acompanhe-a até um dos endereços e garanta o primeiro atendimento, isso pode aumentar sua confiança.",
      "Encaminhar ao Centro POP ou CREAS: pesquise o endereço do Centro POP (Centro de Referência Especializado para Pessoas em Situação de Rua) ou CREAS (Centro de Referência Especializado de Assistência Social) mais próximo da região onde a pessoa costuma ficar. Monte uma lista ou quadro com endereços, pontos de referência (como chegar), dias da semana e horários de atendimento. Se necessário, desenhe um mapa simples para facilitar o entendimento. Tenha sensibilidade e avalie discretamente se a pessoa se sente confortável com materiais escritos. Caso contrário, verifique a melhor forma de repassar as informações. Em seguida, passe esses dados para a pessoa atendida e explique com calma como chegar ao CREAS ou Centro POP e quais os serviços/apoio que ela poderá encontrar nestes equipamentos. Se necessário, acompanhe-a até um dos endereços e garanta o primeiro atendimento, isso pode aumentar sua confiança."
    ],
    "Higiene e Saúde": [
      "Mapear locais de acesso a banho, vestuários e itens de higiene do entorno: realize um mapeamento de locais (projetos, OSCs, cozinhas solidárias, igrejas, centros comunitários, templos religiosos, entre outros) que ofereçam banho, vestuários e itens de higiene. Monte uma lista ou quadro com endereços, pontos de referência (como chegar), dias da semana e horários de atendimento. Se necessário, desenhe um mapa simples para facilitar o entendimento. Tenha sensibilidade e avalie discretamente se a pessoa se sente confortável com materiais escritos. Caso contrário, verifique a melhor forma de repassar as informações. Em seguida, passe esses dados para a pessoa atendida e explique com calma como chegar aos locais e quais serviços/apoios ela encontrará nos endereços informados. Se necessário, acompanhe-a até o equipamento e garanta o primeiro atendimento, isso pode aumentar sua confiança.",
      "Localizar unidade de saúde acessível: identifique a Unidade Básica de Saúde ou uma equipe do Consultório na Rua, que esteja na região onde a pessoa atendida se encontra. Monte uma lista ou quadro com endereços, pontos de referência (como chegar), dias de funcionamento e horários de atendimento. Se necessário, desenhe um mapa simples para facilitar o entendimento. Tenha sensibilidade e avalie discretamente se a pessoa se sente confortável com materiais escritos. Caso contrário, verifique a melhor forma de repassar as informações. Em seguida, passe esses dados para a pessoa atendida e explique com calma como chegar aos locais e quais serviços/apoios ela encontrará nos endereços informados. Se necessário, acompanhe-a até o equipamento e garanta o primeiro atendimento, isso pode aumentar sua confiança. No caso do Consultório na Rua, algumas equipes podem montar bases itinerantes em diferentes pontos do território.",
      "Encaminhar ao CAPS: pesquise se existe CAPS (Centros de Atenção Psicossocial) ou CAPSad (Centro de Atenção Psicossocial Álcool e Drogas) na região onde a pessoa atendida se encontra. Monte uma lista ou quadro com endereços, pontos de referência (como chegar), dias de funcionamento e horários de atendimento. Se necessário, desenhe um mapa simples para facilitar o entendimento. Tenha sensibilidade e avalie discretamente se a pessoa se sente confortável com materiais escritos. Caso contrário, verifique a melhor forma de repassar as informações. Em seguida, passe esses dados para a pessoa atendida e explique com calma como chegar aos locais e quais serviços/apoios ela encontrará nos endereços informados. Se necessário, acompanhe-a até o endereço e garanta o primeiro atendimento, isso pode aumentar sua confiança."
    ],
    "Educação, Cultura, Esporte e Lazer": [
      "Apresentar oficinas gratuitas: identifique ONGs, igreja, templos religiosos ou comunitários que ofereçam oficinas durante a semana, tais como leitura, artesanato, música, pintura ou outras atividades produtivas. O objetivo é que a pessoa atendida possa passar tempo de qualidade, desenvolver novas habilidades e conviver em ambientes coletivos e seguros. Monte uma lista ou quadro com endereços, pontos de referência (como chegar), dias de funcionamento e horários de atendimento. Se necessário, desenhe um mapa simples para facilitar o entendimento. Tenha sensibilidade e avalie discretamente se a pessoa se sente confortável com materiais escritos. Caso contrário, verifique a melhor forma de repassar as informações. Em seguida, passe esses dados para a pessoa atendida e explique com calma como chegar aos locais e quais serviços/apoios ela encontrará nos endereços informados. Se necessário, acompanhe-a até um dos endereços e garanta o primeiro atendimento, isso pode aumentar sua confiança.",
      "Incentivar o acesso à educação: pesquise sobre possíveis locais para iniciar ou dar continuidade aos estudos, assim como locais que ofereçam alguma formação técnica que possa contribuir com o aprimoramento da escolaridade da pessoa atendida. Monte uma lista ou quadro com endereços, pontos de referência (como chegar), dias de funcionamento e horários de atendimento. Se necessário, desenhe um mapa simples para facilitar o entendimento. Tenha sensibilidade e avalie discretamente se a pessoa se sente confortável com materiais escritos. Caso contrário, verifique a melhor forma de repassar as informações. Em seguida, passe esses dados para a pessoa atendida e explique com calma como chegar aos locais e quais serviços/apoios ela encontrará nos endereços informados. Se necessário, acompanhe-a até um dos endereços e garanta o primeiro atendimento, isso pode aumentar sua confiança.",
      "Indicar atividades esportivas abertas: levante opções de praças, quadras públicas e centros esportivos com atividades gratuitas (aulas de futebol, capoeira, caminhada orientada). Explique os dias e horários e incentive a participação como forma de lazer e saúde. Monte uma lista ou quadro com endereços, pontos de referência (como chegar), dias de funcionamento e horários de atendimento. Se necessário, desenhe um mapa simples para facilitar o entendimento. Tenha sensibilidade e avalie discretamente se a pessoa se sente confortável com materiais escritos. Caso contrário, verifique a melhor forma de repassar as informações. Em seguida, passe esses dados para a pessoa atendida e explique com calma como chegar aos locais e quais serviços/apoios ela encontrará nos endereços informados. Se necessário, acompanhe-a até um dos endereços e garanta o primeiro atendimento, isso pode aumentar."
    ]
  };

  // Informações adicionais por dimensão
  const additionalInfo = {
    "Assistência Social e Segurança Alimentar": "O Centro POP (Centro de Referência Especializado para Pessoas em Situação de Rua) é uma unidade socioassistencial municipal que oferece atendimento individual e coletivo, apoio com documentação, higiene pessoal e alimentação a pessoas em situação de rua, com o objetivo de promover o convívio social, a autonomia e a reinserção na sociedade.\n\nO Centro de Referência Especializado de Assistência Social (CREAS) é uma unidade pública da política de Assistência Social onde são atendidas famílias e pessoas que estão em situação de risco social ou tiveram seus direitos violados. A unidade deve, obrigatoriamente, ofertar o Serviço de Proteção e Atendimento Especializado a Famílias e Indivíduos (PAEFI), podendo ofertar outros serviços, como Abordagem Social e Serviço para Pessoas com Deficiência, Idosas e suas famílias. É unidade de oferta ainda do serviço de Medidas Socioeducativas em Meio Aberto.",
    "Higiene e Saúde": "Os Centros de Atenção Psicossocial (CAPS) são lugares onde oferecem serviços de saúde abertos para a comunidade. Uma equipe diversificada trabalha em conjunto para atender às necessidades de saúde mental das pessoas, incluindo aquelas que enfrentam desafios relacionados as necessidades decorrentes do uso prejudicial de álcool e outras drogas. Esses serviços estão disponíveis na região e são especialmente focados em ajudar em situações difíceis ou no processo de reabilitação psicossocial.\n\nCAPS ad Álcool e Drogas: Atende pessoas de todas as faixas etárias que apresentam intenso sofrimento psíquico decorrente do uso de álcool e outras drogas, e outras situações clínicas que impossibilitem estabelecer laços sociais e realizar projetos de vida. Indicado para municípios ou regiões de saúde com população acima de 70 mil habitantes."
  };

  // Manipula resposta de uma pergunta
  const handleAnswer = (questionId: keyof FormData, value: LikertValue) => {
    setFormData(prev => ({ ...prev, [questionId]: value }));
  };

  // Manipula nota de uma pergunta
  const handleNoteChange = (questionId: number, note: string) => {
    setNotes(prev => ({ ...prev, [questionId]: note }));
  };

  // Verifica se pode prosseguir na etapa atual
  const canProceed = (currentStep: number): boolean => {
    if (currentStep === 0) return nickname.trim().length > 0;
    if (currentStep === 1) return formData.q1 !== "" && formData.q2 !== "";
    if (currentStep === 2) return formData.q3 !== "" && formData.q4 !== "";
    if (currentStep === 3) return formData.q5 !== "" && formData.q6 !== "";
    return true;
  };

  // Calcula o nível de esforço baseado na pontuação
  const calculateEffortLevel = (score: number): 'MÁXIMO' | 'MODERADO' | 'BAIXO' => {
    if (score <= 40) return 'MÁXIMO';
    if (score >= 41 && score <= 69) return 'MODERADO';
    return 'BAIXO';
  };

  // Calcula os resultados do diagnóstico
  const calculateResults = () => {
    // Calcular pontuação de cada dimensão
    const socialScore = (parseInt(formData.q1) || 0) + (parseInt(formData.q2) || 0);
    const higieneSaudeScore = (parseInt(formData.q3) || 0) + (parseInt(formData.q4) || 0);
    const educacaoScore = (parseInt(formData.q5) || 0) + (parseInt(formData.q6) || 0);

    // Criar array de dimensões na ordem
    const dimensions: Dimension[] = [
      {
        name: "Assistência Social e Segurança Alimentar",
        questions: [1, 2],
        total: socialScore,
        effortLevel: calculateEffortLevel(socialScore),
        actions: dimensionActions["Assistência Social e Segurança Alimentar"],
        additionalInfo: additionalInfo["Assistência Social e Segurança Alimentar"]
      },
      {
        name: "Higiene e Saúde",
        questions: [3, 4],
        total: higieneSaudeScore,
        effortLevel: calculateEffortLevel(higieneSaudeScore),
        actions: dimensionActions["Higiene e Saúde"],
        additionalInfo: additionalInfo["Higiene e Saúde"]
      },
      {
        name: "Educação, Cultura, Esporte e Lazer",
        questions: [5, 6],
        total: educacaoScore,
        effortLevel: calculateEffortLevel(educacaoScore),
        actions: dimensionActions["Educação, Cultura, Esporte e Lazer"]
      }
    ];

    // Encontrar a PRIMEIRA dimensão com ESFORÇO MÁXIMO
    const firstMaxEffort = dimensions.find(d => d.effortLevel === 'MÁXIMO');

    // Se não houver esforço máximo, pegar a primeira com moderado, senão a primeira
    const priorityDimension = firstMaxEffort || dimensions.find(d => d.effortLevel === 'MODERADO') || dimensions[0];

    const result = {
      nickname: nickname,
      date: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
      timestamp: Date.now(),
      answers: {
        1: parseInt(formData.q1) || 0,
        2: parseInt(formData.q2) || 0,
        3: parseInt(formData.q3) || 0,
        4: parseInt(formData.q4) || 0,
        5: parseInt(formData.q5) || 0,
        6: parseInt(formData.q6) || 0
      },
      notes: notes,
      scores: {
        social: socialScore,
        higiene_saude: higieneSaudeScore,
        educacao: educacaoScore
      },
      dimensions: dimensions,
      priorityDimension: priorityDimension,
      rating: toolRating ? parseInt(toolRating) : undefined
    };

    setResults(result);

    // Salvar no histórico
    const historyJson = localStorage.getItem('radar-diagnostic-history');
    const history: DiagnosticResult[] = historyJson ? JSON.parse(historyJson) : [];
    history.push(result as any);
    localStorage.setItem('radar-diagnostic-history', JSON.stringify(history));

    // Adicionar atividade
    const newActivity = {
      id: Date.now().toString() + Math.random(),
      type: 'diagnostic',
      description: `Completou diagnóstico: ${nickname}`,
      date: new Date().toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      }),
      timestamp: Date.now(),
      icon: '📋'
    };

    const currentActivities = JSON.parse(localStorage.getItem('radar-activities') || '[]');
    const updatedActivities = [newActivity, ...currentActivities].slice(0, 20);
    localStorage.setItem('radar-activities', JSON.stringify(updatedActivities));

    setIsCompleted(true);
  };

  // Renderiza a tela de apelido
  const renderNicknameScreen = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-[#F28C38]/20">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#F28C38] to-[#E1B12C] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FileText size={40} className="text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl text-[#204E4A] dark:text-white mb-4">
            Novo Diagnóstico
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Informe o primeiro nome ou apelido da pessoa atendida
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="nickname" className="text-lg text-[#204E4A] dark:text-white mb-3 block">
              Nome ou Apelido da Pessoa Atendida *
            </Label>
            <Input
              id="nickname"
              type="text"
              placeholder="Ex: João, Maria, Bob..."
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="text-lg py-6 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              autoFocus
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Este apelido ajudará no acompanhamento e comparação de relatórios da mesma pessoa
            </p>
          </div>

          <Button
            onClick={() => {
              if (canProceed(0)) {
                setStep(1);
              }
            }}
            disabled={!canProceed(0)}
            className="w-full bg-[#F28C38] hover:bg-[#E1B12C] text-white py-6 text-lg"
            size="lg"
          >
            Iniciar Diagnóstico
            <ArrowRight className="ml-2" size={24} />
          </Button>
        </div>
      </div>
    </motion.div>
  );

  // Renderiza uma etapa de dimensão (2 perguntas)
  const renderDimensionStep = (dimensionStep: number) => {
    const dimensionNames = [
      "Assistência Social e Segurança Alimentar",
      "Higiene e Saúde", 
      "Educação, Cultura, Esporte e Lazer"
    ];
    
    const dimensionColors = ["#F28C38", "#2E6A9D", "#E1B12C"];
    
    const firstQuestionIndex = (dimensionStep - 1) * 2;
    const question1 = questions[firstQuestionIndex];
    const question2 = questions[firstQuestionIndex + 1];

    return (
      <motion.div
        key={dimensionStep}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl md:text-2xl text-[#204E4A] dark:text-white">
              Dimensão {dimensionStep} de 3
            </h3>
            <span className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              {Math.round((dimensionStep / 3) * 100)}% concluído
            </span>
          </div>
          
          <div 
            className="text-center py-3 px-6 rounded-xl text-white mb-6"
            style={{ backgroundColor: dimensionColors[dimensionStep - 1] }}
          >
            <h4 className="text-lg md:text-xl">
              {dimensionNames[dimensionStep - 1]}
            </h4>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#F28C38] to-[#E1B12C] h-2 rounded-full transition-all duration-500"
              style={{ width: `${(dimensionStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Pergunta 1 da dimensão */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl border-2 border-[#F28C38]/20">
            <div className="mb-6">
              <div className="flex items-start gap-3 mb-4">
                <span 
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                  style={{ backgroundColor: dimensionColors[dimensionStep - 1] }}
                >
                  {question1.id}
                </span>
                <p className="text-lg md:text-xl text-[#204E4A] dark:text-white leading-relaxed">
                  {question1.text}
                </p>
              </div>
            </div>

            <RadioGroup
              value={formData[`q${question1.id}` as keyof FormData]}
              onValueChange={(value) => handleAnswer(`q${question1.id}` as keyof FormData, value as LikertValue)}
            >
              <div className="grid gap-3">
                {likertOptions.map((option) => (
                  <motion.div
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        formData[`q${question1.id}` as keyof FormData] === option.value
                          ? 'border-[#F28C38] bg-[#F28C38]/10 dark:bg-[#F28C38]/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-[#F28C38]/50 bg-white dark:bg-gray-800'
                      }`}
                      onClick={() => handleAnswer(`q${question1.id}` as keyof FormData, option.value as LikertValue)}
                    >
                      <RadioGroupItem value={option.value} id={`q${question1.id}-${option.value}`} />
                      <Label
                        htmlFor={`q${question1.id}-${option.value}`}
                        className="flex-1 cursor-pointer text-[#204E4A] dark:text-white"
                      >
                        {option.label}
                      </Label>
                    </div>
                  </motion.div>
                ))}
              </div>
            </RadioGroup>

            {/* Bloco de notas para pergunta 1 */}
            <div className="mt-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border-2 border-dashed border-gray-300 dark:border-gray-600">
              <Label htmlFor={`note-${question1.id}`} className="text-sm text-gray-600 dark:text-gray-400 mb-2 block flex items-center gap-2">
                <FileText size={16} />
                Observações (opcional)
              </Label>
              <Textarea
                id={`note-${question1.id}`}
                placeholder="Adicione observações, contexto ou detalhes importantes..."
                value={notes[question1.id] || ""}
                onChange={(e) => handleNoteChange(question1.id, e.target.value)}
                className="min-h-[80px] dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
          </div>

          {/* Pergunta 2 da dimensão */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl border-2 border-[#F28C38]/20">
            <div className="mb-6">
              <div className="flex items-start gap-3 mb-4">
                <span 
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                  style={{ backgroundColor: dimensionColors[dimensionStep - 1] }}
                >
                  {question2.id}
                </span>
                <p className="text-lg md:text-xl text-[#204E4A] dark:text-white leading-relaxed">
                  {question2.text}
                </p>
              </div>
            </div>

            <RadioGroup
              value={formData[`q${question2.id}` as keyof FormData]}
              onValueChange={(value) => handleAnswer(`q${question2.id}` as keyof FormData, value as LikertValue)}
            >
              <div className="grid gap-3">
                {likertOptions.map((option) => (
                  <motion.div
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        formData[`q${question2.id}` as keyof FormData] === option.value
                          ? 'border-[#F28C38] bg-[#F28C38]/10 dark:bg-[#F28C38]/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-[#F28C38]/50 bg-white dark:bg-gray-800'
                      }`}
                      onClick={() => handleAnswer(`q${question2.id}` as keyof FormData, option.value as LikertValue)}
                    >
                      <RadioGroupItem value={option.value} id={`q${question2.id}-${option.value}`} />
                      <Label
                        htmlFor={`q${question2.id}-${option.value}`}
                        className="flex-1 cursor-pointer text-[#204E4A] dark:text-white"
                      >
                        {option.label}
                      </Label>
                    </div>
                  </motion.div>
                ))}
              </div>
            </RadioGroup>

            {/* Bloco de notas para pergunta 2 */}
            <div className="mt-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border-2 border-dashed border-gray-300 dark:border-gray-600">
              <Label htmlFor={`note-${question2.id}`} className="text-sm text-gray-600 dark:text-gray-400 mb-2 block flex items-center gap-2">
                <FileText size={16} />
                Observações (opcional)
              </Label>
              <Textarea
                id={`note-${question2.id}`}
                placeholder="Adicione observações, contexto ou detalhes importantes..."
                value={notes[question2.id] || ""}
                onChange={(e) => handleNoteChange(question2.id, e.target.value)}
                className="min-h-[80px] dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Botões de navegação */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={() => setStep(step - 1)}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <ArrowLeft size={20} />
            Voltar
          </Button>
          
          <Button
            onClick={() => {
              if (canProceed(step)) {
                if (step === 3) {
                  calculateResults();
                  setStep(4);
                } else {
                  setStep(step + 1);
                }
              }
            }}
            disabled={!canProceed(step)}
            size="lg"
            className="bg-[#F28C38] hover:bg-[#E1B12C] text-white gap-2"
          >
            {step === 3 ? 'Ver Resultado' : 'Próxima Dimensão'}
            <ArrowRight size={20} />
          </Button>
        </div>
      </motion.div>
    );
  };

  // Renderiza tela de resultados
  const renderResults = () => {
    if (!results || !results.priorityDimension) return null;

    const { priorityDimension, dimensions, scores } = results;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-5xl mx-auto space-y-8"
      >
        {/* Header de conclusão */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <CheckCircle size={50} className="text-white" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl text-[#204E4A] dark:text-white mb-3">
            Diagnóstico Concluído!
          </h2>
          <p className="text-xl md:text-2xl text-[#F28C38] mb-2">
            "{results.nickname}"
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            {results.date}
          </p>
        </div>

        {/* Pontuação por dimensão */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl border-2 border-[#2E6A9D]/20">
          <h3 className="text-2xl text-[#204E4A] dark:text-white mb-6 flex items-center gap-2">
            <BarChart3 size={28} className="text-[#2E6A9D]" />
            Pontuação por Dimensão
          </h3>
          
          <div className="space-y-6">
            {dimensions.map((dim: Dimension, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#204E4A] dark:text-white">{dim.name}</span>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      dim.effortLevel === 'MÁXIMO' ? 'bg-red-100 text-red-700' :
                      dim.effortLevel === 'MODERADO' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      Esforço {dim.effortLevel}
                    </span>
                    <span className="font-medium text-[#F28C38]">{dim.total} / 80</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-1000 ${
                      dim.effortLevel === 'MÁXIMO' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                      dim.effortLevel === 'MODERADO' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                      'bg-gradient-to-r from-green-500 to-green-600'
                    }`}
                    style={{ width: `${(dim.total / 80) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dimensão Prioritária */}
        <div className="bg-gradient-to-br from-[#F28C38]/10 to-[#E1B12C]/10 dark:from-[#F28C38]/20 dark:to-[#E1B12C]/20 rounded-2xl p-6 md:p-8 border-2 border-[#F28C38]/30">
          <div className="flex items-start gap-3 mb-6">
            <AlertCircle size={32} className="text-[#F28C38] mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-2xl md:text-3xl text-[#F28C38] mb-2">
                Dimensão Prioritária
              </h3>
              <p className="text-xl md:text-2xl text-[#204E4A] dark:text-white mb-1">
                {priorityDimension.name}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Sugerimos que dedique <strong>ESFORÇO {priorityDimension.effortLevel}</strong> para auxiliar e direcionar esta pessoa
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-6">
            <div>
              <h4 className="text-xl text-[#204E4A] dark:text-white mb-4 flex items-center gap-2">
                <Sparkles size={24} className="text-[#F28C38]" />
                Sugestões Práticas
              </h4>
              <div className="space-y-4">
                {priorityDimension.actions.map((action: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#F28C38] text-white rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                      {action}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Informações Adicionais */}
            {priorityDimension.additionalInfo && (
              <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-lg text-[#2E6A9D] dark:text-white mb-3">
                  ℹ️ Informações Importantes
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {priorityDimension.additionalInfo}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Avaliação da ferramenta */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl border-2 border-[#F28C38]/20">
          <h3 className="text-xl text-[#204E4A] dark:text-white mb-3">
            Como você avalia a ferramenta?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            A dimensão priorizada fez sentido? As ações práticas foram adequadas ao contexto?
          </p>
          
          <div className="flex items-center justify-center gap-3">
            {[1, 2, 3, 4, 5].map((rating) => (
              <motion.button
                key={rating}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setToolRating(rating.toString())}
                className={`text-5xl transition-all ${
                  toolRating && parseInt(toolRating) >= rating
                    ? 'text-[#F28C38] drop-shadow-lg'
                    : 'text-gray-300 dark:text-gray-600 hover:text-[#F28C38]/50'
                }`}
              >
                ⭐
              </motion.button>
            ))}
          </div>
          
          {toolRating && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-4 text-[#F28C38]"
            >
              Você avaliou com {toolRating} {parseInt(toolRating) === 1 ? 'estrela' : 'estrelas'}
            </motion.p>
          )}
        </div>

        {/* Botões de ação */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            onClick={() => {
              setStep(0);
              setNickname("");
              setFormData({ q1: "", q2: "", q3: "", q4: "", q5: "", q6: "" });
              setNotes({});
              setToolRating("");
              setIsCompleted(false);
              setResults(null);
            }}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <RotateCcw size={20} />
            Novo Diagnóstico
          </Button>
          
          {onNavigateToHistory && (
            <Button
              onClick={onNavigateToHistory}
              size="lg"
              className="bg-[#2E6A9D] hover:bg-[#204E4A] text-white gap-2"
            >
              <FileText size={20} />
              Ver Histórico
            </Button>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full px-4 py-8">
      <AnimatePresence mode="wait">
        {step === 0 && renderNicknameScreen()}
        {step >= 1 && step <= 3 && renderDimensionStep(step)}
        {step === 4 && renderResults()}
      </AnimatePresence>
    </div>
  );
}