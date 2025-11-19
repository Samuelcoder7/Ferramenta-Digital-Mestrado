import { motion } from "motion/react";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "./ui/button";
import mascotsImage from "figma:asset/0f9d09b3b534f52d174383c11c730909e757a9b4.png";

interface HeroProps {
  onNavigate: (page: 'home' | 'about' | 'learnmore' | 'diagnostic' | 'privacy' | 'terms' | 'history' | 'profile' | 'contact' | 'faq' | 'support-links' | 'login') => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 px-4 bg-gradient-to-br from-[#2E6A9D] via-[#204E4A] to-[#2E6A9D] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#F28C38] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#E1B12C] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Conteúdo de Texto */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white dark:text-gray-100 space-y-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full"
          >
            <Heart className="text-[#F28C38]" size={20} />
            <span>Tecnologia com Empatia</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Projeto RADAR
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90">
            Roteiro de Apoio e Direcionamento para o Atendimento de Pessoas em Situação de Rua
          </p>

          <p className="text-lg text-white/80 leading-relaxed">
            Uma plataforma humanizada que combina tecnologia e inclusão social 
            para promover diagnósticos, acompanhamento e apoio através de recursos 
            digitais acessíveis.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              onClick={() => onNavigate('diagnostic')}
              className="bg-[#F28C38] hover:bg-[#E1B12C] text-white transition-all hover:scale-105 shadow-lg"
            >
              Iniciar Diagnóstico
              <ArrowRight className="ml-2" size={20} />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('learnmore')}
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-all hover:scale-105"
            >
              Saiba Mais
            </Button>
          </motion.div>
        </motion.div>

        {/* Ilustração dos Mascotes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative"
        >
          <div className="relative w-full max-w-md mx-auto">
            {/* Mascotes Flori e Tech9 */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20"
            >
              <div className="w-full aspect-square bg-gradient-to-br from-[#F28C38] to-[#E1B12C] rounded-2xl flex items-center justify-center shadow-xl overflow-hidden">
                <img 
                  src={mascotsImage}
                  alt="Mascotes RADAR - Flori e Tech9"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-white/80">Olá! Estamos aqui para ajudar.</p>
              </div>
            </motion.div>

            {/* Elementos flutuantes decorativos */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-[#E1B12C] rounded-full opacity-30 blur-xl"
            ></motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}