/**
 * Componente: HistoryPage (Página de Histórico e Gráficos)
 * 
 * Exibe histórico completo de diagnósticos com visualizações gráficas
 * e detalhes de cada formulário individual.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Printer, Calendar, TrendingUp, Activity, BarChart3, Download, AlertCircle, Home, FileText, ChevronDown, ChevronUp, Edit2, Save, X, Trash2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import historyBanner1 from "figma:asset/58369cacd7658f965700e7033686f188d8e7c0de.png";
import historyBanner2 from "figma:asset/f950c4a7a613bb4eb6ae06ae7d4643e1aee45e97.png";

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
  dimensions: any[];
  priorityDimension: any;
  rating?: number;
}

interface HistoryPageProps {
  onNavigate: (page: string) => void;
}

export function HistoryPage({ onNavigate }: HistoryPageProps) {
  const [history, setHistory] = useState<DiagnosticResult[]>([]);
  const [expandedFormId, setExpandedFormId] = useState<number | null>(null);
  const [editingNotes, setEditingNotes] = useState<{ [key: number]: Record<number, string> }>({});
  const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    // Carregar histórico do localStorage
    const historyJson = localStorage.getItem('radar-diagnostic-history');
    if (historyJson) {
      const parsedHistory: DiagnosticResult[] = JSON.parse(historyJson);
      // Ordenar por apelido alfabeticamente
      parsedHistory.sort((a, b) => a.nickname.localeCompare(b.nickname));
      setHistory(parsedHistory);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportAll = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `historico-completo-${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportIndividualJSON = (result: DiagnosticResult) => {
    const dataStr = JSON.stringify(result, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `diagnostico-${result.nickname}-${result.date.replace(/\//g, '-')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportIndividualPDF = (result: DiagnosticResult) => {
    // Criar conteúdo formatado para PDF
    const content = `
DIAGNÓSTICO - PROJETO RADAR
========================================

Apelido: ${result.nickname}
Data: ${result.date}

RESPOSTAS:
${Object.entries(result.answers).map(([q, val]) => {
  const labels = ["Nunca", "Raramente", "Eventualmente", "Frequentemente", "Muito Frequentemente"];
  const labelIndex = val / 10;
  return `Pergunta ${q}: ${labels[labelIndex]} (${val} pontos)`;
}).join('\n')}

OBSERVAÇÕES:
${Object.entries(result.notes || {}).map(([q, note]) => 
  note ? `Pergunta ${q}: ${note}` : ''
).filter(Boolean).join('\n') || 'Nenhuma observação'}

PONTUAÇÕES:
- Assistência Social e Segurança Alimentar: ${result.scores.social}/80
- Higiene e Saúde: ${result.scores.higiene_saude}/80
- Educação, Cultura, Esporte e Lazer: ${result.scores.educacao}/80

DIMENSÃO PRIORITÁRIA:
${result.priorityDimension?.name || 'N/A'}
Nível de Esforço: ${result.priorityDimension?.effortLevel || 'N/A'}

SUGESTÕES PRÁTICAS:
${result.priorityDimension?.actions?.map((action: string, i: number) => 
  `${i + 1}. ${action}`
).join('\n\n') || 'N/A'}

${result.priorityDimension?.additionalInfo ? `\nINFORMAÇÕES IMPORTANTES:\n${result.priorityDimension.additionalInfo}` : ''}

${result.rating ? `\nAVALIAÇÃO DA FERRAMENTA: ${result.rating}/5 estrelas` : ''}
`;

    const dataBlob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `diagnostico-${result.nickname}-${result.date.replace(/\//g, '-')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearHistory = () => {
    if (window.confirm('Tem certeza que deseja limpar todo o histórico? Esta ação não pode ser desfeita.')) {
      localStorage.removeItem('radar-diagnostic-history');
      setHistory([]);
    }
  };

  const toggleExpand = (timestamp: number) => {
    setExpandedFormId(expandedFormId === timestamp ? null : timestamp);
  };

  const startEditNotes = (timestamp: number, currentNotes: Record<number, string>) => {
    setEditingNotes({ ...editingNotes, [timestamp]: { ...currentNotes } });
    setEditMode({ ...editMode, [timestamp]: true });
  };

  const saveNotes = (timestamp: number) => {
    const updatedHistory = history.map(item => {
      if (item.timestamp === timestamp) {
        return { ...item, notes: editingNotes[timestamp] || item.notes };
      }
      return item;
    });
    setHistory(updatedHistory);
    localStorage.setItem('radar-diagnostic-history', JSON.stringify(updatedHistory));
    setEditMode({ ...editMode, [timestamp]: false });
  };

  const cancelEditNotes = (timestamp: number) => {
    setEditMode({ ...editMode, [timestamp]: false });
    const currentItem = history.find(h => h.timestamp === timestamp);
    if (currentItem) {
      setEditingNotes({ ...editingNotes, [timestamp]: { ...currentItem.notes } });
    }
  };

  const updateNote = (timestamp: number, questionId: number, value: string) => {
    setEditingNotes({
      ...editingNotes,
      [timestamp]: {
        ...(editingNotes[timestamp] || {}),
        [questionId]: value
      }
    });
  };

  // Função para deletar formulário individual
  const handleDeleteForm = (timestamp: number) => {
    const updatedHistory = history.filter(item => item.timestamp !== timestamp);
    setHistory(updatedHistory);
    localStorage.setItem('radar-diagnostic-history', JSON.stringify(updatedHistory));
    setDeleteConfirmId(null);
    setExpandedFormId(null);
  };

  // Preparar dados para gráficos
  const lineChartData = history.slice().reverse().map((result, index) => ({
    avaliacao: result.nickname,
    data: result.date,
    'Assistência Social': result.scores.social,
    'Higiene e Saúde': result.scores.higiene_saude,
    'Educação': result.scores.educacao
  }));

  const radarChartData = history.length > 0 ? [
    {
      dimension: 'Assistência Social',
      atual: history[0].scores.social,
      media: history.reduce((acc, r) => acc + r.scores.social, 0) / history.length
    },
    {
      dimension: 'Higiene e Saúde',
      atual: history[0].scores.higiene_saude,
      media: history.reduce((acc, r) => acc + r.scores.higiene_saude, 0) / history.length
    },
    {
      dimension: 'Educação',
      atual: history[0].scores.educacao,
      media: history.reduce((acc, r) => acc + r.scores.educacao, 0) / history.length
    }
  ] : [];

  const averageScores = {
    social: history.length > 0 ? history.reduce((acc, r) => acc + r.scores.social, 0) / history.length : 0,
    higiene_saude: history.length > 0 ? history.reduce((acc, r) => acc + r.scores.higiene_saude, 0) / history.length : 0,
    educacao: history.length > 0 ? history.reduce((acc, r) => acc + r.scores.educacao, 0) / history.length : 0
  };

  const dimensionColors = {
    social: '#204E4A',
    higiene_saude: '#2E6A9D',
    educacao: '#F28C38'
  };

  // Perguntas do questionário
  const questions = [
    "Com que frequência a pessoa em situação de rua acessa serviços de alimentação?",
    "Com que frequência a pessoa em situação de rua acessa serviços socioassistenciais?",
    "Com que frequência a pessoa em situação de rua acessa espaços para higiene pessoal?",
    "Com que frequência essa pessoa acessa serviços de saúde (seja para prevenção, tratamento contínuo ou atendimento geral)?",
    "Com que frequência a pessoa em situação de rua acessa serviços de educação?",
    "Com que frequência a pessoa em situação de rua acessa espaços/atividades de cultura, esporte ou lazer?"
  ];

  const likertLabels = ["Nunca", "Raramente", "Eventualmente", "Frequentemente", "Muito Frequentemente"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#F5F6FA] dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 bg-gradient-to-br from-[#204E4A] via-[#1a3f3c] to-[#204E4A] relative overflow-hidden print:hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-96 h-96 bg-[#F28C38] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#2E6A9D] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 rounded-2xl bg-[#F28C38] flex items-center justify-center mx-auto">
                <BarChart3 size={48} className="text-white" />
              </div>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
              Histórico e Gráficos
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-4 max-w-3xl mx-auto">
              Acompanhe todos os diagnósticos realizados
            </p>

            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Button
                onClick={handlePrint}
                className="bg-white text-[#204E4A] hover:bg-[#E9E9E9]"
              >
                <Printer className="mr-2" size={18} />
                Imprimir Relatório
              </Button>
              
              <Button
                onClick={handleExportAll}
                className="bg-transparent border-2 border-white !text-white hover:bg-white/10"
              >
                <Download className="mr-2" size={18} />
                Exportar Todos (JSON)
              </Button>

              <Button
                onClick={() => onNavigate('diagnostic')}
                className="bg-transparent border-2 border-white !text-white hover:bg-white/10"
              >
                <Home className="mr-2" size={18} />
                Voltar ao Diagnóstico
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F28C38] to-transparent"></div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {history.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <AlertCircle className="mx-auto mb-6 text-[#F28C38]" size={64} />
              <h2 className="text-3xl text-[#204E4A] dark:text-white mb-4">
                Nenhum Histórico Encontrado
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Você ainda não realizou nenhum diagnóstico. Complete um diagnóstico para visualizar seu histórico e gráficos.
              </p>
              <Button
                onClick={() => onNavigate('diagnostic')}
                className="bg-[#F28C38] hover:bg-[#E1B12C] text-white"
              >
                Realizar Diagnóstico
              </Button>
            </motion.div>
          ) : (
            <>
              {/* Statistics Cards */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-4 gap-6 mb-12"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#204E4A]/10 flex items-center justify-center">
                      <Activity className="text-[#204E4A]" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Total de Diagnósticos</p>
                      <p className="text-2xl text-[#204E4A] dark:text-white">{history.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#204E4A]/10 flex items-center justify-center">
                      <TrendingUp className="text-[#204E4A]" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Média - Social</p>
                      <p className="text-2xl text-[#204E4A] dark:text-white">
                        {isNaN(averageScores.social) ? '0.0' : averageScores.social.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#2E6A9D]/10 flex items-center justify-center">
                      <TrendingUp className="text-[#2E6A9D]" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Média - Higiene e Saúde</p>
                      <p className="text-2xl text-[#2E6A9D] dark:text-white">
                        {isNaN(averageScores.higiene_saude) ? '0.0' : averageScores.higiene_saude.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F28C38]/10 flex items-center justify-center">
                      <TrendingUp className="text-[#F28C38]" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Média - Educação</p>
                      <p className="text-2xl text-[#F28C38] dark:text-white">
                        {isNaN(averageScores.educacao) ? '0.0' : averageScores.educacao.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Charts */}
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                {/* Line Chart - Evolution */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg print:break-inside-avoid"
                >
                  <h3 className="text-xl text-[#204E4A] dark:text-white mb-6 flex items-center gap-2">
                    <TrendingUp size={24} className="text-[#F28C38]" />
                    Evolução das Dimensões
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={lineChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E9E9E9" />
                      <XAxis dataKey="avaliacao" stroke="#666" />
                      <YAxis domain={[0, 80]} stroke="#666" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #E9E9E9',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="Assistência Social" stroke="#204E4A" strokeWidth={2} />
                      <Line type="monotone" dataKey="Higiene e Saúde" stroke="#2E6A9D" strokeWidth={2} />
                      <Line type="monotone" dataKey="Educação" stroke="#F28C38" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Radar Chart - Current vs Average */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg print:break-inside-avoid"
                >
                  <h3 className="text-xl text-[#204E4A] dark:text-white mb-6 flex items-center gap-2">
                    <Activity size={24} className="text-[#F28C38]" />
                    Último vs Média Geral
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarChartData}>
                      <PolarGrid stroke="#E9E9E9" />
                      <PolarAngleAxis dataKey="dimension" stroke="#666" />
                      <PolarRadiusAxis domain={[0, 80]} stroke="#666" />
                      <Radar name="Último" dataKey="atual" stroke="#204E4A" fill="#204E4A" fillOpacity={0.6} />
                      <Radar name="Média" dataKey="media" stroke="#F28C38" fill="#F28C38" fillOpacity={0.6} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>

              {/* Carrossel de banners informativos */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12"
              >
                <Carousel 
                  opts={{
                    align: "center",
                    loop: true,
                  }}
                  plugins={[
                    Autoplay({
                      delay: 4000,
                    }),
                  ]}
                  className="w-full"
                >
                  <CarouselContent>
                    <CarouselItem>
                      <div className="rounded-2xl overflow-hidden shadow-xl">
                        <img
                          src={historyBanner1}
                          alt="Histórico e Gráficos - Acompanhe a evolução dos diagnósticos"
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="rounded-2xl overflow-hidden shadow-xl">
                        <img
                          src={historyBanner2}
                          alt="Acompanhe, Compare e Cresça - Use dados para enxergar cada passo"
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </Carousel>
              </motion.div>

              {/* Lista de Formulários por Apelido */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-12"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl text-[#204E4A] dark:text-white flex items-center gap-2">
                    <FileText size={24} className="text-[#F28C38]" />
                    Todos os Formulários (Ordenados por Apelido)
                  </h3>
                  <Button
                    onClick={clearHistory}
                    variant="outline"
                    size="sm"
                    className="border-red-300 text-red-600 hover:bg-red-50 print:hidden"
                  >
                    Limpar Histórico
                  </Button>
                </div>

                <div className="space-y-4">
                  {history.map((result) => (
                    <div 
                      key={result.timestamp}
                      className="border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
                    >
                      {/* Header do Formulário */}
                      <div className="bg-gradient-to-r from-[#F28C38]/10 to-[#204E4A]/10 dark:from-[#F28C38]/20 dark:to-[#204E4A]/20 p-4">
                        <div className="flex items-center justify-between">
                          <div 
                            className="flex items-center gap-4 flex-1 cursor-pointer"
                            onClick={() => toggleExpand(result.timestamp)}
                          >
                            <div className="w-12 h-12 rounded-xl bg-[#F28C38] flex items-center justify-center text-white">
                              <FileText size={24} />
                            </div>
                            <div>
                              <h4 className="text-lg text-[#204E4A] dark:text-white">
                                {result.nickname}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {result.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Dimensão: <strong className="text-[#F28C38]">{result.priorityDimension?.name || 'N/A'}</strong>
                            </span>
                            
                            {deleteConfirmId === result.timestamp ? (
                              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border-2 border-red-500">
                                <span className="text-sm text-red-600 dark:text-red-400">Confirmar?</span>
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteForm(result.timestamp);
                                  }}
                                  size="sm"
                                  className="h-7 px-2 bg-red-600 hover:bg-red-700 text-white"
                                >
                                  Sim
                                </Button>
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteConfirmId(null);
                                  }}
                                  size="sm"
                                  variant="outline"
                                  className="h-7 px-2"
                                >
                                  Não
                                </Button>
                              </div>
                            ) : (
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeleteConfirmId(result.timestamp);
                                }}
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <Trash2 size={18} />
                              </Button>
                            )}
                            
                            <div 
                              className="cursor-pointer"
                              onClick={() => toggleExpand(result.timestamp)}
                            >
                              {expandedFormId === result.timestamp ? (
                                <ChevronUp className="text-[#204E4A]" size={24} />
                              ) : (
                                <ChevronDown className="text-[#204E4A]" size={24} />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Detalhes Expandidos */}
                      <AnimatePresence>
                        {expandedFormId === result.timestamp && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 bg-white dark:bg-gray-800 space-y-6">
                              {/* Pontuações */}
                              <div>
                                <h5 className="text-md text-[#204E4A] dark:text-white mb-3">📊 Pontuações</h5>
                                <div className="grid md:grid-cols-3 gap-4">
                                  <div className="p-3 rounded-lg bg-[#204E4A]/5">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Assistência Social</p>
                                    <p className="text-xl text-[#204E4A] dark:text-white">{result.scores.social} / 80</p>
                                  </div>
                                  <div className="p-3 rounded-lg bg-[#2E6A9D]/5">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Higiene e Saúde</p>
                                    <p className="text-xl text-[#2E6A9D] dark:text-white">{result.scores.higiene_saude} / 80</p>
                                  </div>
                                  <div className="p-3 rounded-lg bg-[#F28C38]/5">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Educação</p>
                                    <p className="text-xl text-[#F28C38] dark:text-white">{result.scores.educacao} / 80</p>
                                  </div>
                                </div>
                              </div>

                              {/* Respostas */}
                              <div>
                                <h5 className="text-md text-[#204E4A] dark:text-white mb-3">✍️ Respostas</h5>
                                <div className="space-y-3">
                                  {Object.entries(result.answers).map(([qId, value]) => {
                                    const questionIndex = parseInt(qId) - 1;
                                    const labelIndex = value / 10;
                                    return (
                                      <div key={qId} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                                          <strong>Pergunta {qId}:</strong> {questions[questionIndex]}
                                        </p>
                                        <p className="text-sm text-[#F28C38]">
                                          Resposta: <strong>{likertLabels[labelIndex]}</strong> ({value} pontos)
                                        </p>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Observações/Notas */}
                              <div>
                                <div className="flex items-center justify-between mb-3">
                                  <h5 className="text-md text-[#204E4A] dark:text-white">📝 Observações</h5>
                                  {!editMode[result.timestamp] ? (
                                    <Button
                                      onClick={() => startEditNotes(result.timestamp, result.notes || {})}
                                      variant="outline"
                                      size="sm"
                                      className="gap-2"
                                    >
                                      <Edit2 size={16} />
                                      Editar Observações
                                    </Button>
                                  ) : (
                                    <div className="flex gap-2">
                                      <Button
                                        onClick={() => saveNotes(result.timestamp)}
                                        size="sm"
                                        className="bg-green-600 hover:bg-green-700 text-white gap-2"
                                      >
                                        <Save size={16} />
                                        Salvar
                                      </Button>
                                      <Button
                                        onClick={() => cancelEditNotes(result.timestamp)}
                                        variant="outline"
                                        size="sm"
                                        className="gap-2"
                                      >
                                        <X size={16} />
                                        Cancelar
                                      </Button>
                                    </div>
                                  )}
                                </div>
                                <div className="space-y-3">
                                  {[1, 2, 3, 4, 5, 6].map((qId) => {
                                    const currentNotes = editMode[result.timestamp] 
                                      ? editingNotes[result.timestamp] 
                                      : result.notes;
                                    const note = currentNotes?.[qId] || '';
                                    
                                    return (
                                      <div key={qId} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                          <strong>Pergunta {qId}</strong>
                                        </p>
                                        {editMode[result.timestamp] ? (
                                          <Textarea
                                            value={editingNotes[result.timestamp]?.[qId] || ''}
                                            onChange={(e) => updateNote(result.timestamp, qId, e.target.value)}
                                            placeholder="Adicione observações..."
                                            className="min-h-[60px]"
                                          />
                                        ) : (
                                          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                            {note || 'Sem observações'}
                                          </p>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Recomendações */}
                              <div>
                                <h5 className="text-md text-[#204E4A] dark:text-white mb-3">💡 Recomendações</h5>
                                <div className="p-4 rounded-lg bg-[#F28C38]/10 border-2 border-[#F28C38]/30">
                                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                    <strong>Dimensão Prioritária:</strong> {result.priorityDimension?.name || 'N/A'}
                                  </p>
                                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                                    <strong>Nível de Esforço:</strong> <span className="text-[#F28C38]">{result.priorityDimension?.effortLevel || 'N/A'}</span>
                                  </p>
                                  {result.priorityDimension?.actions && (
                                    <div className="space-y-2">
                                      <p className="text-sm text-gray-700 dark:text-gray-300"><strong>Sugestões Práticas:</strong></p>
                                      {result.priorityDimension.actions.map((action: string, i: number) => (
                                        <p key={i} className="text-xs text-gray-600 dark:text-gray-400 pl-4">
                                          {i + 1}. {action.substring(0, 100)}...
                                        </p>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Avaliação */}
                              {result.rating && (
                                <div>
                                  <h5 className="text-md text-[#204E4A] dark:text-white mb-3">⭐ Avaliação da Ferramenta</h5>
                                  <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                                    <p className="text-lg text-[#F28C38]">
                                      {'⭐'.repeat(result.rating)} ({result.rating}/5)
                                    </p>
                                  </div>
                                </div>
                              )}

                              {/* Botões de Exportação */}
                              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <Button
                                  onClick={() => handleExportIndividualJSON(result)}
                                  variant="outline"
                                  size="sm"
                                  className="gap-2"
                                >
                                  <Download size={16} />
                                  Exportar JSON
                                </Button>
                                <Button
                                  onClick={() => handleExportIndividualPDF(result)}
                                  variant="outline"
                                  size="sm"
                                  className="gap-2"
                                >
                                  <FileText size={16} />
                                  Exportar TXT
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:break-inside-avoid {
            break-inside: avoid;
          }
          header, footer {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}