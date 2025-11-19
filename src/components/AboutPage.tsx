import { motion } from "motion/react";
import { Target, Lightbulb, Users, Heart, BookOpen, TrendingUp, Leaf, Utensils, Activity, GraduationCap, Scale, FileSearch, Workflow, UserCheck, Sparkles } from "lucide-react";
import mascotsImage from "figma:asset/9bb6bec4b07efa4a3b8c291d005b1ef8e3cafc44.png";
import anaPaulaImage from "figma:asset/4cf21cc2ae168895a527c5eaac782b9ebfd0c0dc.png";
import viniciusImage from "figma:asset/af8e393324cee923f67dce719f743ea9e4a4214a.png";
import victorImage from "figma:asset/4f0aaa24010fabb1198f8796b7f4671645bbc4dd.png";
import gemeosCasanovaImage from "figma:asset/6f30ed7b47a4f4841e434a9e7da8dcb9e5790dbe.png";
import samuelImage from "figma:asset/f679de425d67b72932daf5f81740b567f2e04f67.png";
import cauaImage from "figma:asset/a38a7b95f8171808e65827895bb3dcf675a2cd0b.png";
import renanImage from "figma:asset/1c520ee95e6086cf79cf30d3ceb034ef9d31c104.png";
import guilhermeCabralImage from "figma:asset/c2db8e6252a43e4e139fceb8c0da9abd19ae9a9e.png";
import aboutBanner1 from "figma:asset/3aa9e100973c2b3254fbaf4164f98dbce01ce482.png";
import aboutBanner2 from "figma:asset/137864a8dca24eaec95d23495cbf74f7196b03d9.png";
import inspirationBanner1 from "figma:asset/27df4ffb5d64ca37c3dea9e47b8c95a10bb3b1be.png";
import inspirationBanner2 from "figma:asset/70f9e77f6d19e2f6a8f8fc0aa293e5e2f73f98cd.png";
import inspirationBanner3 from "figma:asset/06f1e51ebd96a14b4db2cf8c2df7eb35f10acb4c.png";
import newInspirationBanner1 from "figma:asset/46e57046ba27535bd18b6e60fa80c3e4bb072870.png";
import newInspirationBanner2 from "figma:asset/9f590be1a6e4561dc3c171c42d90b9e725492c8a.png";
import newInspirationBanner3 from "figma:asset/eb046815f8d5f24b351b3e22ebd0b318c57a8de6.png";
import newInspirationBanner4 from "../assets/Banner53.jpg";
import newInspirationBanner5 from "../assets/Banner54.jpg";
import newInspirationBanner6 from "../assets/Banner55.jpg";
import newInspirationBanner7 from "../assets/Banner56.jpg";
import newInspirationBanner8 from "../assets/Banner58.jpg";
import projectsBanner from "figma:asset/7c91359bfab7bd12fd283c2a89587fda5d8ab641.png";
import finalBanner2 from "../assets/Banner60 (1).jpg";


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const objectives = [
    {
      icon: Target,
      title: "Objetivo",
      description: "Desenvolver uma ferramenta digital acessível e humanizada para diagnóstico e acompanhamento da população em situação de rua, promovendo inclusão e dignidade."
    },
    {
      icon: FileSearch,
      title: "Justificativa",
      description: "A população em situação de rua enfrenta múltiplas vulnerabilidades, e muitas iniciativas sociais carecem de metodologias simples e eficazes para diagnosticar prioridades e direcionar ações. A ferramenta digital proposta atuará como um apoio prático e orientador, promovendo eficiência e maior impacto nas ações locais."
    },
    {
      icon: Lightbulb,
      title: "Metodologia",
      description: "O projeto será desenvolvido a partir de um levantamento de demandas prioritárias e da estruturação de um questionário baseado em dimensões fundamentais. Será definida uma escala de avaliação (Likert) para sistematizar respostas, seguida pelo desenvolvimento de uma página digital com usabilidade simples e intuitiva."
    },
    {
      icon: Workflow,
      title: "Metodologia Aplicada",
      description: "A abordagem será de pesquisa aplicada, voltada para a solução prática de um problema social, utilizando metodologia participativa, que promove a interação entre organizações e beneficiários. A prototipagem será incremental, permitindo evolução futura com novas dimensões e funcionalidades."
    },
    {
      icon: UserCheck,
      title: "Público-Alvo",
      description: "O projeto beneficiará diretamente organizações da sociedade civil que atuam com a população em situação de rua, bem como profissionais e voluntários da assistência social, saúde e educação. Indiretamente, a própria população em situação de rua será beneficiada pelas ações otimizadas e mais eficientes."
    },
    {
      icon: Sparkles,
      title: "Impacto e Resultados",
      description: "Espera-se que a ferramenta facilite a identificação de prioridades de intervenção, apoie a tomada de decisão rápida e baseada em dados, aumente a eficiência das ações sociais locais e engaje os usuários na validação e aprimoramento da ferramenta. De forma direta, o projeto contribuirá para a melhoria da qualidade de vida da população em situação de rua."
    },
    {
      icon: Heart,
      title: "Valores",
      description: "Empatia, respeito, inclusão, transparência e compromisso com a transformação social através da tecnologia humanizada."
    }
  ];

  const odsItems = [
    {
      number: 1,
      title: "Erradicação da Pobreza",
      color: "#E5243B",
      icon: Leaf
    },
    {
      number: 2,
      title: "Fome Zero",
      color: "#DDA63A",
      icon: Utensils
    },
    {
      number: 3,
      title: "Saúde e Bem-Estar",
      color: "#4C9F38",
      icon: Activity
    },
    {
      number: 4,
      title: "Educação de Qualidade",
      color: "#C5192D",
      icon: GraduationCap
    },
    {
      number: 10,
      title: "Redução das Desigualdades",
      color: "#DD1367",
      icon: Scale
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F6FA] dark:bg-gray-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-[#035164] via-[#204E4A] to-[#035164] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#FF9000] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#8C6B4E] rounded-full blur-3xl"></div>
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
              <BookOpen size={64} className="text-[#FF9000]" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
              Sobre o Projeto RADAR
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Transformando vidas através da tecnologia humanizada e inclusão digital
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 mb-12"
          >
            {/* Introduction */}
            <div className="mb-16">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "80px" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-1 bg-gradient-to-r from-[#FF9000] to-[#035164] rounded-full mb-6"
              ></motion.div>
              
              <h2 className="text-3xl md:text-4xl text-[#035164] dark:text-white mb-6">
                Nossa História
              </h2>
              
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                <p>
                  O <strong className="text-[#035164]">Projeto RADAR</strong> (Roteiro de Apoio e Direcionamento para o Atendimento de Pessoas em Situação de Rua) 
                  nasceu da necessidade de criar pontes entre tecnologia e humanidade, desenvolvendo soluções digitais 
                  que respeitam a dignidade e promovem a inclusão social.
                </p>
                
                <p>
                  Nossa ferramenta digital foi concebida com o propósito de facilitar o diagnóstico de necessidades, 
                  promover o acompanhamento adequado e conectar pessoas em situação de vulnerabilidade com recursos 
                  essenciais e oportunidades de transformação social.
                </p>
                
                <p>
                  Acreditamos que a tecnologia, quando desenvolvida com empatia e propósito, pode ser um poderoso 
                  instrumento de mudança social, capaz de amplificar vozes, conectar recursos e criar caminhos 
                  para um futuro mais justo e igualitário.
                </p>
              </div>
            </div>

            {/* Mascots Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Mascots Image */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <div className="relative bg-gradient-to-br from-[#FF9000]/20 via-[#035164]/20 to-[#204E4A]/20 rounded-3xl p-8 overflow-hidden">
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF9000]/30 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#035164]/30 rounded-full blur-3xl"></div>
                    
                    <motion.div
                      animate={{
                        y: [0, -15, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="relative z-10"
                    >
                      <img 
                        src={mascotsImage}
                        alt="Flori e Tech9 - Mascotes do Projeto RADAR"
                        className="w-full h-auto object-contain drop-shadow-2xl"
                      />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <div className="inline-flex items-center gap-2 bg-[#FF9000]/10 px-4 py-2 rounded-full mb-2">
                    <Heart className="text-[#FF9000]" size={20} />
                    <span className="text-[#035164]">Nossos Guias</span>
                  </div>

                  <h3 className="text-3xl text-[#035164]">
                    Flori & Tech9
                  </h3>

                  <p className="text-gray-700 text-lg leading-relaxed">
                    Nossos mascotes representam a essência do Projeto RADAR: a união perfeita entre 
                    <strong className="text-[#204E4A]"> empatia humana</strong> e 
                    <strong className="text-[#035164]"> tecnologia inteligente</strong>.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#204E4A] mt-2 flex-shrink-0"></div>
                      <p className="text-gray-600">
                        <strong className="text-[#204E4A]">Flori</strong> traz acolhimento, 
                        escuta ativa e calor humano para cada interação.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#035164] mt-2 flex-shrink-0"></div>
                      <p className="text-gray-600">
                        <strong className="text-[#035164]">Tech9</strong> oferece precisão, 
                        conhecimento e recursos tecnológicos para soluções eficazes.
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 italic pt-4 border-t border-gray-200">
                    Juntos, eles guiam você em cada etapa da jornada, tornando a experiência 
                    mais humana, inclusiva e transformadora.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Inspirational Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-[#FF9000]/10 to-[#035164]/10 rounded-2xl p-8 mb-16 border-l-4 border-[#FF9000]"
            >
              <div className="flex items-start gap-4">
                <Heart className="text-[#FF9000] flex-shrink-0 mt-1" size={32} />
                <div>
                  <p className="text-xl text-[#035164] italic leading-relaxed">
                    "Cada pessoa tem uma história única. Nossa missão é criar ferramentas que honrem 
                    essa singularidade, oferecendo suporte personalizado e caminhos de esperança."
                  </p>
                  <p className="text-[#8C6B4E] mt-3">— Equipe Projeto RADAR</p>
                </div>
              </div>
            </motion.div>

            {/* Carrossel de Banners Sobre */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-16 max-w-6xl mx-auto"
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
                    <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                      <img
                        src={aboutBanner1}
                        alt="Banner SOBRE - Conheça o Projeto RADAR"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                      <img
                        src={aboutBanner2}
                        alt="Banner Nossa História - Tecnologia e Cuidado Transformando Realidades"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </motion.div>

            {/* Objectives Grid */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl text-[#035164] mb-8 text-center">
                Nossos Pilares
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {objectives.map((obj, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.6 }}
                    whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(3, 81, 100, 0.15)" }}
                    className="bg-gradient-to-br from-white to-[#F5F6FA] rounded-2xl p-6 shadow-lg transition-all border border-gray-100"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#035164] to-[#204E4A] flex items-center justify-center flex-shrink-0 shadow-md">
                        <obj.icon className="text-white" size={28} />
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="text-xl text-[#035164] mb-2">
                          {obj.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-[15px]">
                          {obj.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ODS Section */}
            <div>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "80px" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-1 bg-gradient-to-r from-[#035164] to-[#FF9000] rounded-full mb-6"
              ></motion.div>
              
              <h2 className="text-3xl md:text-4xl text-[#035164] mb-4">
                Objetivos de Desenvolvimento Sustentável
              </h2>
              
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                O Projeto RADAR está alinhado com os ODS da ONU, contribuindo diretamente para a construção 
                de um mundo mais sustentável, justo e inclusivo.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {odsItems.map((ods, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ 
                      y: -8,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                      scale: 1.05
                    }}
                    className="rounded-2xl p-6 shadow-lg transition-all cursor-pointer"
                    style={{ backgroundColor: ods.color }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white text-xl font-bold">{ods.number}</span>
                      </div>
                      <ods.icon className="text-white" size={32} />
                    </div>
                    
                    <h3 className="text-white text-lg leading-tight">
                      {ods.title}
                    </h3>
                    
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <span className="text-white/80 text-sm">ODS {ods.number}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* EQUIPE DO PROJETO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 mb-12"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-[#FF9000] to-[#035164] rounded-full mb-6"
            ></motion.div>

            <h2 className="text-3xl md:text-4xl text-[#035164] dark:text-white mb-4">
              Equipe do Projeto
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-lg mb-12 leading-relaxed">
              Conheça as pessoas que tornam o Projeto RADAR possível: uma equipe movida por empatia, criatividade e compromisso com a transformação social.
            </p>

            {/* Criadora do Projeto */}
            <div className="mb-20">
              <h3 className="text-2xl text-[#035164] dark:text-white mb-8 text-center">
                Criadora do Projeto
              </h3>
              
              <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#FF9000]/5 to-[#035164]/5 rounded-3xl p-10 shadow-xl">
                <div className="flex flex-col items-center text-center gap-6">
                  <div className="w-72 h-72 flex items-center justify-center">
                    <img 
                      src={anaPaulaImage}
                      alt="Ana Paula Rios"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <div className="max-w-2xl">
                    <h4 className="text-3xl text-[#035164] dark:text-white mb-3">
                      Ana Paula Rios
                    </h4>
                    <p className="text-[#FF9000] text-xl mb-6">
                      Engenharia, Empatia e Inovação Social
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      Idealizadora da proposta que deu origem ao projeto, Ana Paula Rios une técnica e sensibilidade em cada iniciativa que realiza. 
                      Engenheira de Produção e criadora de projetos sociais como o <strong>Pia do Bem</strong> e o <strong>Banho de Alegria</strong>, 
                      ela inspira a união entre tecnologia e solidariedade. Sua visão humanizada e compromisso com o cuidado social foram o ponto de 
                      partida para o desenvolvimento do RADAR, fortalecendo a conexão entre ciência, empatia e transformação social.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Orientador Acadêmico */}
            <div className="mb-20">
              <h3 className="text-2xl text-[#035164] dark:text-white mb-8 text-center">
                Orientador Acadêmico
              </h3>
              
              <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#204E4A]/5 to-[#035164]/5 rounded-3xl p-10 shadow-xl">
                <div className="flex flex-col items-center text-center gap-6">
                  <div className="w-72 h-72 flex items-center justify-center">
                    <img 
                      src={viniciusImage}
                      alt="Prof. M.e Vinicius Pinto da Silva"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <div className="max-w-2xl">
                    <h4 className="text-3xl text-[#035164] dark:text-white mb-3">
                      Prof. M.e Vinicius Pinto da Silva
                    </h4>
                    <p className="text-[#204E4A] text-xl mb-6">
                      Orientação com Propósito
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      Mestre e docente da UNISUAM, Vinicius Pinto da Silva foi o mentor acadêmico que guiou o projeto desde sua concepção até a 
                      implementação final. Com olhar técnico e pedagógico, incentivou os alunos a aplicarem seus conhecimentos em prol da sociedade, 
                      transformando aprendizado em ação concreta. Sua orientação foi essencial para integrar teoria, prática e sensibilidade social, 
                      pilares que sustentam o propósito do RADAR.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Equipe Frontend */}
            <div className="mb-20">
              <h3 className="text-2xl text-[#035164] dark:text-white mb-8 text-center">
                Equipe Frontend
              </h3>
              
              <div className="space-y-8 max-w-5xl mx-auto">
                {/* Victor */}
                <div className="bg-gradient-to-br from-[#035164]/5 to-[#FF9000]/5 rounded-3xl p-8 shadow-xl">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-56 h-56 flex items-center justify-center flex-shrink-0">
                      <img 
                        src={victorImage}
                        alt="Victor de Lucena Justa"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <div className="text-center md:text-left">
                      <h4 className="text-2xl text-[#035164] dark:text-white mb-2">
                        Victor de Lucena Justa
                      </h4>
                      <p className="text-[#FF9000] text-lg mb-4">
                        Liderança Criativa e Design Humanizado
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Líder do Frontend e responsável pelo design do projeto, Victor de Lucena Justa transformou ideias em experiências visuais 
                        acolhedoras e acessíveis. Com sensibilidade estética e foco no usuário, construiu a interface que traduz a essência do projeto: 
                        empatia, clareza e funcionalidade.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Gustavo & Guilherme - Gêmeos */}
                <div className="bg-gradient-to-br from-[#FF9000]/5 to-[#035164]/5 rounded-3xl p-8 shadow-xl">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-56 h-56 flex items-center justify-center flex-shrink-0">
                      <img 
                        src={gemeosCasanovaImage}
                        alt="Gustavo e Guilherme Casanova"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <div className="text-center md:text-left">
                      <h4 className="text-2xl text-[#035164] dark:text-white mb-2">
                        Gustavo da Silva Casanova & Guilherme da Silva Casanova
                      </h4>
                      <p className="text-[#FF9000] text-lg mb-4">
                        Criatividade em Dobro
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Gêmeos e mentes criativas por trás dos mascotes Tech9 e Flori, além de diversas artes e identidades visuais do projeto. 
                        Gustavo e Guilherme combinaram imaginação, técnica e emoção para dar vida aos personagens que representam a união entre 
                        natureza e tecnologia. Suas criações tornaram o projeto mais humano, leve e inspirador — conectando estética, propósito 
                        e sensibilidade social.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Equipe Backend */}
            <div>
              <h3 className="text-2xl text-[#035164] dark:text-white mb-8 text-center">
                Equipe Backend
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Samuel */}
                <div className="bg-gradient-to-br from-[#204E4A]/5 to-[#035164]/5 rounded-3xl p-8 shadow-xl">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-52 h-52 flex items-center justify-center mb-6">
                      <img 
                        src={samuelImage}
                        alt="Samuel Davy Valentim Rodrigues"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <h4 className="text-xl text-[#035164] dark:text-white mb-2">
                      Samuel Davy Valentim Rodrigues
                    </h4>
                    <p className="text-[#204E4A] mb-4">
                      Líder Técnico e Engenheiro do Código
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Como líder do backend, Samuel Davy estruturou a base lógica e funcional da ferramenta. 
                      Com visão analítica e precisão técnica, foi responsável por garantir o desempenho, a segurança 
                      e a integração de todo o sistema, transformando ideias em soluções sólidas e eficazes.
                    </p>
                  </div>
                </div>

                {/* Cauã */}
                <div className="bg-gradient-to-br from-[#035164]/5 to-[#204E4A]/5 rounded-3xl p-8 shadow-xl">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-52 h-52 flex items-center justify-center mb-6">
                      <img 
                        src={cauaImage}
                        alt="Cauã Arruda Ferreira"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <h4 className="text-xl text-[#035164] dark:text-white mb-2">
                      Cauã Arruda Ferreira
                    </h4>
                    <p className="text-[#204E4A] mb-4">
                      Soluções e Conectividade
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Com olhar voltado à eficiência e à interatividade, Cauã contribuiu para a construção das 
                      funções essenciais do sistema. Sua atuação ajudou a consolidar o backend como uma base 
                      estável e responsiva, garantindo fluidez à experiência do usuário.
                    </p>
                  </div>
                </div>

                {/* Renan */}
                <div className="bg-gradient-to-br from-[#204E4A]/5 to-[#035164]/5 rounded-3xl p-8 shadow-xl">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-52 h-52 flex items-center justify-center mb-6">
                      <img 
                        src={renanImage}
                        alt="Renan Domingues Antonio de Oliveira"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <h4 className="text-xl text-[#035164] dark:text-white mb-2">
                      Renan Domingues Antonio de Oliveira
                    </h4>
                    <p className="text-[#204E4A] mb-4">
                      Desenvolvimento e Inovação
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Renan aplicou seus conhecimentos técnicos para aprimorar o funcionamento interno da plataforma, 
                      trazendo melhorias e inovações que garantiram o desempenho e a estabilidade do projeto. 
                      Sua dedicação e comprometimento reforçaram a qualidade e a confiabilidade do sistema.
                    </p>
                  </div>
                </div>

                {/* Guilherme Cabral */}
                <div className="bg-gradient-to-br from-[#035164]/5 to-[#204E4A]/5 rounded-3xl p-8 shadow-xl">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-52 h-52 flex items-center justify-center mb-6">
                      <img 
                        src={guilhermeCabralImage}
                        alt="Guilherme Cabral da Silva"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <h4 className="text-xl text-[#035164] dark:text-white mb-2">
                      Guilherme Cabral da Silva
                    </h4>
                    <p className="text-[#204E4A] mb-4">
                      Estrutura e Suporte do Sistema
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Atuando com foco em integração e funcionalidade, Guilherme Cabral ajudou a dar forma ao núcleo 
                      do projeto. Sua contribuição foi essencial para manter o sistema organizado, coerente e em 
                      sintonia com o propósito social da ferramenta.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-[#035164] to-[#204E4A] rounded-3xl p-12 shadow-2xl mb-12"
          >
            <TrendingUp className="text-[#FF9000] mx-auto mb-6" size={64} />
            
            <h2 className="text-3xl md:text-4xl text-white mb-4">
              Faça Parte Dessa Transformação
            </h2>
            
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Junte-se a nós na construção de um futuro mais inclusivo e humano.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('home')}
              className="bg-[#FF9000] hover:bg-[#e68200] text-white px-8 py-4 rounded-full text-lg shadow-lg transition-all"
            >
              Voltar para o Início
            </motion.button>
          </motion.div>

          {/* Carrossel de Banners Inspiracionais - FINAL DA PÁGINA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-6xl mx-auto mb-12"
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
                  <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                    <img
                      src={newInspirationBanner1}
                      alt="Banner Inspiração - Tecnologia e Natureza Juntas"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                    <img
                      src={newInspirationBanner2}
                      alt="Banner Inspirações que Transformam - Cada Gesto Solidário Acende uma Nova Esperança"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                    <img
                      src={newInspirationBanner3}
                      alt="Banner Ana Paula Rios - Inspiração que Transforma"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>

              <CarouselItem>
                  <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                    <img
                      src={newInspirationBanner4}
                      alt="Banner Ana Paula Rios - Inspiração que Transforma"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>

                <CarouselItem>
                  <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                    <img
                      src={newInspirationBanner5}
                      alt="Banner Ana Paula Rios - Inspiração que Transforma"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>

                <CarouselItem>
                  <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                    <img
                      src={newInspirationBanner6}
                      alt="Banner Ana Paula Rios - Inspiração que Transforma"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>

                <CarouselItem>
                  <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                    <img
                      src={newInspirationBanner7}
                      alt="Banner Ana Paula Rios - Inspiração que Transforma"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>

                <CarouselItem>
                  <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                    <img
                      src={newInspirationBanner8}
                      alt="Banner Ana Paula Rios - Inspiração que Transforma"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>







              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </motion.div>

          {/* PROJETOS REALIZADOS POR ANA PAULA RIOS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 mb-12"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-[#FF9000] to-[#035164] rounded-full mb-6"
            ></motion.div>

            <h2 className="text-3xl md:text-4xl text-[#035164] dark:text-white mb-6">
              🌟 Projetos realizados por Ana Paula Rios
            </h2>

            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-12">
              Conheça algumas iniciativas que mostram a dedicação da Ana Paula Rios no cuidado e fortalecimento das pessoas em situação de rua. 
              Esses projetos foram desenvolvidos com propósito social, inovação e muito amor ao próximo.
            </p>

            {/* Projeto Pia do Bem */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#035164]/5 to-[#204E4A]/5 rounded-2xl p-8 mb-8 border-l-4 border-[#035164]"
            >
              <h3 className="text-2xl text-[#035164] dark:text-white mb-4 flex items-center gap-3">
                🧼 Projeto Pia do Bem
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Uma pia portátil criada no auge da pandemia para garantir às pessoas em situação de rua o direito básico de lavar 
                as mãos e se proteger da COVID-19.
              </p>
              <a 
                href="https://www.youtube.com/watch?v=pxfEjxU0bBA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#035164] hover:text-[#FF9000] transition-colors duration-300"
              >
                🔗 <span className="underline">Assista ao vídeo</span>
              </a>
            </motion.div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8"></div>

            {/* Projeto Banho de Alegria */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-[#FF9000]/5 to-[#035164]/5 rounded-2xl p-8 mb-12 border-l-4 border-[#FF9000]"
            >
              <h3 className="text-2xl text-[#035164] dark:text-white mb-4 flex items-center gap-3">
                🚿 Projeto Banho de Alegria
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Um chuveiro itinerante pensado para oferecer banhos gratuitos e dignidade a pessoas em situação de rua. 
                Foi o primeiro produto idealizado por Ana Paula para esse público, ainda durante sua graduação.
              </p>
              <a 
                href="https://globoplay.globo.com/v/6673947/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#035164] hover:text-[#FF9000] transition-colors duration-300"
              >
                🔗 <span className="underline">Veja a reportagem</span>
              </a>
            </motion.div>

            {/* Banner Decorativo Final */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src={projectsBanner}
                alt="Banner dos Projetos - Pia do Bem e Banho de Alegria"
                className="w-full h-auto object-cover"
              />
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
    src={finalBanner2}
    alt="Banner Final 2"
    className="w-full rounded-3xl shadow-2xl "
  />
</motion.div>




          </motion.div>
        </div>
      </section>
    </div>
  );
}