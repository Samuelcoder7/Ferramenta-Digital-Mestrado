import { motion } from "motion/react";
import { Heart, Users, BarChart3, FileCheck, TrendingUp, CheckCircle, ArrowRight, Sparkles, Target, Map, FileText, Lightbulb } from "lucide-react";
import { Button } from "./ui/button";
import { LikertForm } from "./LikertForm";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import mascotImage from "figma:asset/107850bf759c9675af6a16c055659f5e6a5580d7.png";
import diagnosticBanner1 from "figma:asset/cf39be1d14b016ab118f019d726181b2c74242aa.png";
import diagnosticBanner2 from "figma:asset/ebb99ae8611ce8310f77ae86a935d9174ed1674a.png";
import diagnosticBanner3 from "figma:asset/9f1e6a1d94aeceae44afa134bde0935494b29654.png";
import Bannerfinal from "../assets/Banner50.jpg";

interface DiagnosticPageProps {
  onNavigate: (page: string) => void;
}

export function DiagnosticPage({ onNavigate }: DiagnosticPageProps) {
  const whyImportant = [
    {
      icon: Users,
      title: "Compreensão real da vulnerabilidade social",
      description: "Mapeamento profundo das condições de vida, identificando necessidades reais e urgentes.",
      color: "#204E4A"
    },
    {
      icon: Target,
      title: "Planejamento de políticas públicas",
      description: "Dados estruturados que auxiliam gestores públicos a criar programas eficazes e direcionados.",
      color: "#2E6A9D"
    },
    {
      icon: Heart,
      title: "Apoio direto a instituições e voluntários",
      description: "Ferramentas práticas para ONGs e profissionais que atuam na linha de frente.",
      color: "#F28C38"
    },
    {
      icon: BarChart3,
      title: "Tomada de decisão baseada em dados",
      description: "Informações concretas que transformam boas intenções em ações efetivas.",
      color: "#8C6B4E"
    }
  ];

  const howItWorks = [
    {
      step: "01",
      icon: Users,
      title: "Abordagem Humanizada",
      description: "Profissional realiza a abordagem com empatia e respeito, estabelecendo um diálogo acolhedor.",
      color: "#204E4A"
    },
    {
      step: "02",
      icon: FileText,
      title: "Questionário Interativo",
      description: "Responde ao questionário estruturado via tablet ou celular, de forma simples e acessível.",
      color: "#2E6A9D"
    },
    {
      step: "03",
      icon: BarChart3,
      title: "Relatórios Automáticos",
      description: "O sistema processa os dados e gera relatórios e indicadores sociais instantaneamente.",
      color: "#F28C38"
    },
    {
      step: "04",
      icon: TrendingUp,
      title: "Ações Direcionadas",
      description: "Os dados direcionam políticas de acolhimento, assistência e encaminhamentos efetivos.",
      color: "#8C6B4E"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-[#204E4A] via-[#1a3f3c] to-[#204E4A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-96 h-96 bg-[#F28C38] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#2E6A9D] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
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
                <FileCheck size={48} className="text-white" />
              </div>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
              Diagnóstico Interativo
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-4 max-w-3xl mx-auto">
              Um olhar humano e tecnológico
            </p>

            <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
              O diagnóstico permite mapear condições de vida, saúde, acesso a direitos e vulnerabilidades 
              de forma empática, usando tecnologia acessível e humanizada.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F28C38] to-transparent"></div>
      </section>

      {/* Main Content - What is it */}
      <section className="py-20 px-4">
        <div className="max-w-6xl w-full mx-auto p-8 space-y-10">
          <div className=" gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#F28C38]/10 px-4 py-2 rounded-full mb-6">
                <Sparkles className="text-[#F28C38]" size={20} />
                <span className="text-[#204E4A]">Tecnologia com Propósito</span>
              </div>

              <h2 className="text-3xl md:text-4xl text-[#204E4A] mb-6">
                O que é o Diagnóstico Interativo?
              </h2>

              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  É uma ferramenta digital desenvolvida para auxiliar <strong className="text-[#204E4A]">profissionais, 
                  ONGs e gestores públicos</strong> a compreender melhor as necessidades das pessoas em situação de rua.
                </p>

                <p>
                  Através de um questionário estruturado e empático, coletamos dados sobre 
                  <strong className="text-[#2E6A9D]"> saúde, condições sociais e acesso a direitos básicos</strong>, 
                  transformando informações em ações concretas.
                </p>

                <p>
                  A tecnologia é apenas o meio — <strong className="text-[#F28C38]">a empatia é o caminho</strong>.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <div className="bg-gradient-to-r from-[#F28C38]/10 to-[#204E4A]/10 rounded-xl p-6 border-l-4 border-[#F28C38]">
                  <p className="text-[#204E4A] dark:text-white italic text-lg">
                    "Cada resposta é uma história. Cada dado, uma oportunidade de transformação."
                  </p>
                </div>


              </motion.div>
            </motion.div>
          </div>

{/* Carrossel de banners informativos */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="mt-8"
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
                            src={diagnosticBanner1}
                            alt="Diagnóstico - Como funciona o diagnóstico interativo"
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      </CarouselItem>
                      <CarouselItem>
                        <div className="rounded-2xl overflow-hidden shadow-xl">
                          <img
                            src={diagnosticBanner2}
                            alt="Entenda o Diagnóstico Social - Responda perguntas simples usando escala de frequência"
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      </CarouselItem>
                      <CarouselItem>
                        <div className="rounded-2xl overflow-hidden shadow-xl">
                          <img
                            src={diagnosticBanner3}
                            alt="Suas Anotações, Seu Jeito - Use o bloco de notas durante o atendimento"
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                  </Carousel>
                </motion.div>


          {/* Motivational Message with Mascot */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <div className="bg-gradient-to-r from-[#204E4A] to-[#2E6A9D] rounded-2xl p-6 md:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#F28C38]/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10 grid md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-6 md:gap-8 items-center">
                {/* Mascot - Static */}
                <div className="flex justify-center md:justify-start">
                  <img 
                    src={mascotImage} 
                    alt="Flori - Mascote do Projeto RADAR" 
                    className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain drop-shadow-2xl"
                  />
                </div>
                
                {/* Text Content */}
                <div className="text-center md:text-left text-white">
                  <Sparkles className="mx-auto md:mx-0 mb-4 text-[#F28C38]" size={40} />
                  <h3 className="text-2xl md:text-3xl lg:text-4xl mb-4">
                    Pronto para fazer a diferença?
                  </h3>
                  <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed">
                    Flori está aqui para te guiar! Responda ao diagnóstico abaixo e descubra 
                    como podemos juntos transformar realidades através da empatia e tecnologia.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Likert Form Section - Standalone */}
      <section className="py-20 px-4 bg-gradient-to-br from-white to-[#F5F6FA]">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            id="likert-form"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-block mb-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#F28C38] flex items-center justify-center mx-auto">
                  <FileText size={32} className="text-white" />
                </div>
              </motion.div>
              
              <h3 className="text-3xl md:text-4xl text-[#204E4A] mb-4">
                Realize o Diagnóstico Agora
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Responda ao questionário interativo e receba um diagnóstico personalizado com ações práticas
              </p>
            </div>
            
            <LikertForm onNavigateToHistory={() => onNavigate('history')} />
          </motion.div>
        </div>
      </section>

      {/* Why Important Section */}
      <section className="py-20 px-4 bg-[#F5F6FA]">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl text-[#204E4A] mb-4">
              Por que o Diagnóstico é Importante?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transformando dados em dignidade, conhecimento em ação
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyImportant.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg transition-all"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon size={32} style={{ color: item.color }} />
                </div>

                <h3 className="text-xl mb-3" style={{ color: item.color }}>
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Impact Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#F5F6FA] to-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl text-[#204E4A] mb-6">
              Impacto Social Real
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
              A ferramenta fortalece redes de apoio e conecta tecnologia à empatia, 
              criando pontes entre dados e dignidade humana. Cada informação coletada 
              representa uma oportunidade de transformação social efetiva.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-[#204E4A] to-[#2E6A9D] rounded-2xl p-8 md:p-12 shadow-2xl"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <TrendingUp className="text-[#F28C38]" size={48} />
              </div>
              
              <p className="text-white text-2xl md:text-3xl mb-4">
                Resultados que Inspiram
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-4xl text-[#F28C38] mb-2">+500</div>
                  <p className="text-white/80">Atendimentos mapeados</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-4xl text-[#F28C38] mb-2">85%</div>
                  <p className="text-white/80">Encaminhamentos efetivos</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-4xl text-[#F28C38] mb-2">20+</div>
                  <p className="text-white/80">Instituições parceiras</p>
                </div>
              </div>
            </motion.div>
          </motion.div>


            {/* Banner Final 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full mt-20 mb-10 mt-12"
            >
              <img
                src={Bannerfinal}
                alt="Banner Final"
                className="w-full rounded-3xl shadow-2xl "
              />
            </motion.div>
            

          
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#204E4A] via-[#1a3f3c] to-[#2E6A9D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-96 h-96 bg-[#F28C38] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Heart className="text-[#F28C38] mx-auto mb-6" size={64} />
            
            <h2 className="text-3xl md:text-5xl text-white mb-4">
              Transforme Dados em Dignidade
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Participe dessa mudança. Juntos, podemos criar um futuro mais justo e inclusivo.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  onClick={() => {
                    const formElement = document.getElementById('likert-form');
                    if (formElement) {
                      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  className="bg-[#F28C38] hover:bg-[#E1B12C] text-white shadow-lg text-lg px-8 py-6"
                >
                  Iniciar Diagnóstico Agora
                  <ArrowRight className="ml-2" size={24} />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('about')}
                  className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-[#204E4A] shadow-lg text-lg px-8 py-6"
                >
                  Conheça Mais o Projeto
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F28C38] to-transparent"></div>
      </section>
    </div>
  );
}