import { motion } from "motion/react";
import { Heart, Users, Target, Shield } from "lucide-react";

export function About() {
  // Valores e princípios do projeto
  const values = [
    {
      icon: Heart,
      title: "Empatia",
      description: "Desenvolvido com sensibilidade para atender quem mais precisa",
      color: "#F28C38"
    },
    {
      icon: Users,
      title: "Inclusão",
      description: "Promovendo dignidade e acesso a direitos fundamentais",
      color: "#2E6A9D"
    },
    {
      icon: Target,
      title: "Eficiência",
      description: "Diagnósticos rápidos e orientações práticas baseadas em dados",
      color: "#E1B12C"
    },
    {
      icon: Shield,
      title: "Privacidade",
      description: "Proteção total de informações e respeito aos direitos das pessoas",
      color: "#204E4A"
    }
  ];

  return (
    <section id="about" className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#F28C38]/10 dark:bg-[#F28C38]/30 text-[#F28C38] mb-4">
            Nossa Missão
          </span>
          <h2 className="text-3xl md:text-4xl text-[#204E4A] dark:text-white mb-4">
            Tecnologia para Transformar Vidas
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            O Projeto RADAR utiliza tecnologia para criar pontes de inclusão social, 
            oferecendo ferramentas que dignificam e apoiam pessoas em situação de vulnerabilidade.
          </p>
        </motion.div>

        {/* Grid de valores */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-[#F28C38]/30"
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-md"
                  style={{ backgroundColor: value.color }}
                >
                  <IconComponent className="text-white" size={28} />
                </div>
                <h3 
                  className="text-xl mb-2"
                  style={{ color: value.color }}
                >
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}