import { motion } from "motion/react";
import { Quote } from "lucide-react";
import mascot1 from "figma:asset/9f590c6e52af9bda6f6570c491753e9833ea9dba.png";
import mascot2 from "figma:asset/3803c595a72996b247abd6bb3e26fdd90d181ce0.png";
import mascot3 from "figma:asset/9838405088d00c74ab5860d7a158948961b00e79.png";

export function Testimonials() {
  const testimonials = [
    {
      text: "A ferramenta me ajudou a entender melhor minhas necessidades e encontrar os recursos certos.",
      author: "Maria S.",
      role: "Usuária do sistema",
      mascot: mascot1
    },
    {
      text: "Interface simples e acolhedora. Senti que estava sendo ouvido e respeitado.",
      author: "João P.",
      role: "Participante",
      mascot: mascot2
    },
    {
      text: "Um projeto que realmente faz a diferença na vida das pessoas. Parabéns pela iniciativa!",
      author: "Ana L.",
      role: "Assistente Social",
      mascot: mascot3
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#204E4A] to-[#2E6A9D] dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white mb-4">
            Depoimentos
          </span>
          <h2 className="text-3xl md:text-4xl text-white mb-4">
            Vozes que Importam
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Conheça as experiências de quem já utilizou nossa ferramenta.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="flex flex-col"
            >
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 hover:bg-white/15 transition-all flex-1"
              >
                <Quote className="text-[#E1B12C] mb-4" size={32} />
                
                <p className="text-white/90 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                <div className="border-t border-white/20 pt-4">
                  <p className="text-white font-medium">{testimonial.author}</p>
                  <p className="text-white/60 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>

              {/* Mascot Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                className="flex justify-center mt-6"
              >
                <img 
                  src={testimonial.mascot} 
                  alt={`Mascote RAP - ${testimonial.author}`}
                  className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-lg"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
