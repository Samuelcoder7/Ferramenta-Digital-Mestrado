import { motion } from "motion/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import odsBanner from "figma:asset/af178356903319440269e1a883056a1a096de35f.png";

export function ODSCarousel() {
  const odsItems = [
    {
      number: 1,
      title: "Erradicação da Pobreza",
      description: "Acabar com a pobreza em todas as suas formas, em todos os lugares.",
      color: "#E5243B",
      icon: "🏠"
    },
    {
      number: 2,
      title: "Fome Zero e Agricultura Sustentável",
      description: "Acabar com a fome, alcançar a segurança alimentar e promover a agricultura sustentável.",
      color: "#DDA63A",
      icon: "🌾"
    },
    {
      number: 3,
      title: "Saúde e Bem-Estar",
      description: "Assegurar uma vida saudável e promover o bem-estar para todos, em todas as idades.",
      color: "#4C9F38",
      icon: "❤️"
    },
    {
      number: 4,
      title: "Educação de Qualidade",
      description: "Assegurar a educação inclusiva e equitativa de qualidade para todos.",
      color: "#C5192D",
      icon: "📚"
    },
    {
      number: 10,
      title: "Redução das Desigualdades",
      description: "Reduzir a desigualdade dentro dos países e entre eles.",
      color: "#DD1367",
      icon: "⚖️"
    }
  ];

  return (
    <section id="ods" className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#2E6A9D]/10 dark:bg-[#2E6A9D]/30 text-[#2E6A9D] dark:text-[#5ea4d4] mb-4">
            Objetivos de Desenvolvimento Sustentável
          </span>
          <h2 className="text-3xl md:text-4xl text-[#204E4A] dark:text-white mb-4">
            Alinhados com os ODS da ONU
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            O Projeto RADAR contribui diretamente para o alcance dos Objetivos de 
            Desenvolvimento Sustentável da Agenda 2030.
          </p>
        </motion.div>

        {/* Banner dos Mascotes com ODS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-6xl mx-auto"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
            <img 
              src={odsBanner} 
              alt="Flori e Tech9 - Vamos comprir as metas juntos! Objetivos de Desenvolvimento Sustentável da ONU"
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {odsItems.map((ods, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="p-4"
                  >
                    <div
                      className="rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all h-full min-h-[320px] flex flex-col"
                      style={{ backgroundColor: ods.color }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-5xl">{ods.icon}</div>
                        <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {ods.number}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl text-white mb-3 leading-tight">
                        {ods.title}
                      </h3>

                      <p className="text-white/90 leading-relaxed flex-grow">
                        {ods.description}
                      </p>

                      <div className="mt-4 pt-4 border-t border-white/20">
                        <span className="text-white/80 text-sm">ODS {ods.number}</span>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}