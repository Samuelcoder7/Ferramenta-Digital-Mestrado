import { motion } from "motion/react";
import { ArrowRight, Settings, FileText, BarChart3, TrendingUp, Users, Building2, GraduationCap, Zap, Heart } from "lucide-react";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import learnMoreBanner1 from "figma:asset/6ace079a9e3246be283adfe0ac3783ccdb48f630.png";
import learnMoreBanner2 from "figma:asset/2b8f4f757b2b80e2f270978ea3810edc2e3518ae.png";
import Bannertech from "../assets/Banner46.jpg";
import Bannertech2 from "../assets/Banner16.jpg";
import Bannertech3 from "../assets/Banner14.jpg";
import Bannertech4 from "../assets/Banner15.jpg";
import Bannernatureza from "../assets/Banner45.jpg";
import Bannernatureza2 from "../assets/Banner9.jpg";
import Bannernatureza3 from "../assets/Banner10.jpg";
import Bannernatureza4 from "../assets/Banner7.jpg";

interface LearnMorePageProps {
  onNavigate: (page: string) => void;
}

export function LearnMorePage({ onNavigate }: LearnMorePageProps) {
  const impactStats = [
    {
      icon: FileText,
      number: "+300",
      label: "Diagnósticos sociais realizados",
      color: "#035164"
    },
    {
      icon: Building2,
      number: "12",
      label: "Organizações participantes",
      color: "#204E4A"
    },
    {
      icon: TrendingUp,
      number: "45%",
      label: "Melhoria na eficiência das ações locais",
      color: "#FF9000"
    }
  ];

  const partnerships = [
    {
      icon: Building2,
      title: "Parcerias Locais",
      description: "Colaboração com organizações da sociedade civil que atuam diretamente com a população em situação de rua.",
      color: "#204E4A"
    },
    {
      icon: GraduationCap,
      title: "Apoio Acadêmico",
      description: "Parceria com universidades para desenvolvimento de pesquisas e metodologias inovadoras.",
      color: "#035164"
    },
    {
      icon: Zap,
      title: "Evolução Tecnológica",
      description: "Expansão contínua com novas funcionalidades como mapas interativos e relatórios automáticos.",
      color: "#FF9000"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-[#204E4A] via-[#1a3f3c] to-[#204E4A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-96 h-96 bg-[#FF9000] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#035164] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-block mb-6"
            >
              <Heart size={64} className="text-[#FF9000]" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
              Saiba Mais
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
              Entenda como o Projeto RADAR apoia organizações e transforma dados em impacto social real.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                size="lg"
                onClick={() => onNavigate('about')}
                className="bg-[#FF9000] hover:bg-[#8C6B4E] text-white transition-all hover:scale-105 shadow-lg"
              >
                Conheça o Projeto
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative divider */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF9000] to-transparent"></div>
      </section>

      {/* Section 1 - Como Funciona */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Carrossel de banners informativos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
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
                      src={learnMoreBanner1}
                      alt="Saiba Mais - Informações sobre o projeto com Tech9 e Flori"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={learnMoreBanner2}
                      alt="Explore, descubra e aplique - Site criado para ser simples, útil e inteligente"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image/Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-[#035164]/10 via-[#204E4A]/10 to-[#FF9000]/10 rounded-3xl p-12">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF9000]/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#035164]/20 rounded-full blur-2xl"></div>
                
                <div className="relative z-10 grid grid-cols-3 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="bg-white rounded-2xl p-6 shadow-lg flex items-center justify-center"
                  >
                    <Settings className="text-[#035164]" size={48} />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="bg-white rounded-2xl p-6 shadow-lg flex items-center justify-center"
                  >
                    <FileText className="text-[#204E4A]" size={48} />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="bg-white rounded-2xl p-6 shadow-lg flex items-center justify-center"
                  >
                    <BarChart3 className="text-[#FF9000]" size={48} />
                  </motion.div>
                </div>

                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="mt-6 bg-white rounded-2xl p-8 shadow-xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#035164] to-[#204E4A] flex items-center justify-center">
                      <Heart className="text-white" size={24} />
                    </div>
                    <div className="flex-1 h-2 bg-gradient-to-r from-[#035164] via-[#204E4A] to-[#FF9000] rounded-full"></div>
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    Tecnologia + Empatia = Transformação Social
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "80px" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="h-1 bg-[#FF9000] rounded-full mb-4"
                ></motion.div>
                
                <h2 className="text-3xl md:text-4xl text-[#035164] mb-4">
                  Como o Projeto RADAR Funciona
                </h2>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                A Ferramenta Digital coleta informações através de um questionário participativo, 
                identifica prioridades e gera um diagnóstico visual das vulnerabilidades sociais. 
                Isso auxilia organizações e profissionais a planejar ações baseadas em dados e empatia.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-[#F5F6FA] rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-[#035164] flex items-center justify-center flex-shrink-0">
                    <Settings className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="text-[#035164] mb-1">Coleta de Dados</h4>
                    <p className="text-gray-600 text-sm">
                      Questionário estruturado e acessível para diagnóstico inicial
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-[#F5F6FA] rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-[#204E4A] flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="text-[#204E4A] mb-1">Análise e Diagnóstico</h4>
                    <p className="text-gray-600 text-sm">
                      Processamento de dados para identificar prioridades
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-[#F5F6FA] rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-[#FF9000] flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="text-[#FF9000] mb-1">Ações Direcionadas</h4>
                    <p className="text-gray-600 text-sm">
                      Orientações práticas baseadas em resultados reais
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#FF9000] to-transparent"></div>

      {/* Section 2 - Impacto Social */}
      <section className="py-20 px-4 bg-[#F5F6FA]">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl text-[#035164] mb-4">
              Impacto e Resultados
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              O efeito real da tecnologia social
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg transition-all"
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <stat.icon size={32} style={{ color: stat.color }} />
                </div>

                <div className="text-center">
                  <div 
                    className="text-5xl font-bold mb-3"
                    style={{ color: stat.color }}
                  >
                    {stat.number}
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 - Parcerias e Futuro */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl text-[#035164] mb-4">
              Parcerias e Caminhos Futuros
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              O Projeto RADAR conta com o apoio de universidades, organizações sociais e redes de voluntários. 
              Em breve, incluirá novas funções, como mapas interativos e relatórios automáticos.
            </p>
          </motion.div>

          <div className="space-y-6 mb-12">
            {partnerships.map((partnership, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-white to-[#F5F6FA] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="flex items-center gap-6">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${partnership.color}15` }}
                  >
                    <partnership.icon size={32} style={{ color: partnership.color }} />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 
                      className="text-xl mb-2"
                      style={{ color: partnership.color }}
                    >
                      {partnership.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {partnership.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

{/* Carrossel de banners informativos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
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
                      src={Bannertech}
                      alt="Saiba Mais - Informações sobre o projeto com Tech9 e Flori"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={Bannertech2}
                      alt="Explore, descubra e aplique - Site criado para ser simples, útil e inteligente"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>
               <CarouselItem>
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={Bannertech3}
                      alt="Explore, descubra e aplique - Cidade e tecnologia"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>
                 <CarouselItem>
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={Bannertech4}
                      alt="Explore, descubra e aplique - Um futuro melhor com tecnologia social"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </motion.div>


              {/* Carrossel de banners informativos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
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
                      src={Bannernatureza}
                      alt="Saiba Mais - Informações sobre o projeto com Tech9 e Flori"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={Bannernatureza2}
                      alt="Explore, descubra e aplique - Site criado para ser simples, útil e inteligente"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>
               <CarouselItem>
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={Bannernatureza3}
                      alt="Explore, descubra e aplique - Site criado para ser simples, útil e inteligente"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>
                 <CarouselItem>
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={Bannernatureza4}
                      alt="Explore, descubra e aplique - Um futuro a cada dia melhor com tecnologia social"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </motion.div>










        </div>
      </section>

      {/* Divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#FF9000] to-transparent"></div>

      {/* Section 4 - CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#035164] via-[#024554] to-[#035164] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-96 h-96 bg-[#FF9000] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#204E4A] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Heart className="text-[#FF9000] mx-auto mb-6" size={64} />
            
            <h2 className="text-3xl md:text-4xl text-white mb-4">
              Faça Parte da Mudança
            </h2>
            
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Apoie, compartilhe ou colabore com o Projeto RADAR.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('home')}
                className="bg-white text-[#035164] hover:bg-[#FF9000] hover:text-white border-white transition-all shadow-lg"
              >
                Voltar para o Início
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF9000] to-transparent"></div>
      </section>
    </div>
  );
}