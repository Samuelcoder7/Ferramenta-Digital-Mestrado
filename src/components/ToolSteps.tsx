import { motion } from "motion/react";
import { ClipboardList, LineChart, MessageCircle } from "lucide-react";

export function ToolSteps() {
  const steps = [
    {
      icon: ClipboardList,
      title: "Questionário",
      description: "Diagnóstico inicial através de perguntas estruturadas e acessíveis.",
      color: "#2E6A9D",
      bgColor: "#EFF6FB"
    },
    {
      icon: LineChart,
      title: "Diagnóstico",
      description: "Análise dos dados coletados para identificar necessidades específicas.",
      color: "#204E4A",
      bgColor: "#EDF5F4"
    },
    {
      icon: MessageCircle,
      title: "Feedback",
      description: "Resultados claros com orientações e encaminhamentos personalizados.",
      color: "#F28C38",
      bgColor: "#FFF5ED"
    }
  ];

  return (
    <section id="tool" className="py-20 px-4 bg-gradient-to-br from-[#E9E9E9] to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#F28C38]/10 dark:bg-[#F28C38]/30 text-[#F28C38] dark:text-[#ff9e5a] mb-4">
            Como Funciona
          </span>
          <h2 className="text-3xl md:text-4xl text-[#204E4A] dark:text-white mb-4">
            Etapas da Ferramenta
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Um processo simples e humanizado em três etapas para acolhimento e diagnóstico.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Timeline for desktop */}
          <div className="hidden md:flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center flex-1">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, type: "spring" }}
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: step.color }}
                >
                  <span className="text-white font-bold">{index + 1}</span>
                </motion.div>
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                    className="flex-1 h-1 mx-4 bg-gradient-to-r from-current to-current origin-left"
                    style={{ color: step.color }}
                  ></motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="relative"
              >
                {/* Mobile step number */}
                <div className="md:hidden absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center z-10"
                  style={{ backgroundColor: step.color }}
                >
                  <span className="text-white font-bold">{index + 1}</span>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all h-full">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: step.bgColor }}
                  >
                    <step.icon size={32} style={{ color: step.color }} />
                  </motion.div>

                  <h3 className="text-xl mb-3 dark:text-white" style={{ color: step.color }}>
                    {step.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {step.description}
                  </p>

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.4, duration: 0.6 }}
                    className="h-1 rounded-full mt-6"
                    style={{ backgroundColor: step.color }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
