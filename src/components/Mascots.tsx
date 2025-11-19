/**
 * Componente: Mascots (Apresentação dos Mascotes)
 * 
 * Este componente apresenta os dois mascotes do Projeto RADAR: Flori e Tech9.
 * 
 * Características:
 * - Cards para cada mascote com animações
 * - História e descrição de Flori (A Semente do Cuidado)
 * - História e descrição de Tech9 (O Projeto da Dedicação)
 * - Animações flutuantes
 */

import { motion } from "motion/react";
import { useEffect } from "react";
import mascotAmigoImage from "figma:asset/b878c646831a6e85665e2126278ebf2a2e57e958.png";
import mascotTechImage from "figma:asset/286907d69030495d271a91986e169445168d4ea4.png";
import albumIcon from "figma:asset/1b59c5904372e9ee4dd3e56957bce9af300c6317.png";
import posterRadarIcon from "figma:asset/413b3f3d8b524aa565db3f655788be411a1781e2.png";
import posterFloriIcon from "figma:asset/e3022cc158d9ede968cb8b2ec7bcc14b7e37f728.png";
import posterTech9Icon from "figma:asset/26d9a93e184552d685e7da9b34b5d28dd3dd11ee.png";
import banner1 from "figma:asset/0f3910514b25bcc2f031cfc74c48c3281969dc42.png";
import banner2 from "figma:asset/f2bc64d7e689a95bfd62a6fa585a3578a3b92344.png";
import banner3 from "figma:asset/12bf20b9cfa3cfa4d04126299269b019563adb24.png";
import downloadBanner1 from "figma:asset/925663a328225ddadc909f3d0858562537b21ac1.png";
import downloadBanner2 from "figma:asset/4e41150ed8ce9bece98ef4e26daff4b61ba66638.png";
import downloadBanner3 from "figma:asset/34c9caadb627a90363c97167543ae330b25a1491.png";
import banner4 from "../assets/Banner34.jpg";
import banner5 from "../assets/Banner35.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function Mascots() {
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#8C6B4E]/10 dark:bg-[#8C6B4E]/30 text-[#8C6B4E] dark:text-[#b89872] mb-4">
            Seus Companheiros Digitais
          </span>
          <h2 className="text-3xl md:text-4xl text-[#204E4A] dark:text-white mb-4">
            Conheça Nossos Mascotes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Assistentes virtuais criados para tornar sua jornada mais acolhedora e intuitiva.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Mascote 1 - Flori (A Semente do Cuidado) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-[#FFF5ED] to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative mb-6"
            >
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-[#F28C38] to-[#E1B12C] rounded-3xl flex items-center justify-center shadow-lg p-4">
                <img 
                  src={mascotAmigoImage}
                  alt="Flori - A Semente do Cuidado"
                  className="w-full h-full object-contain"
                />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -right-2 w-12 h-12 bg-[#E1B12C] rounded-full opacity-40 blur-lg"
              ></motion.div>
            </motion.div>

            <h3 className="text-2xl text-[#F28C38] dark:text-white mb-3 text-center">
              Flori
            </h3>
            <p className="text-sm text-[#8C6B4E] dark:text-[#b89872] text-center mb-3 italic">
              "A Semente do Cuidado"
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
              Nascida de um gesto humano, Flori caminha entre calçadas e abrigos, 
              aprendendo sobre empatia, escuta e presença. Seu dom é fazer florescer 
              esperança onde o mundo já não via possibilidades. Representa empatia, 
              presença e acolhimento em cada interação.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="px-3 py-1 bg-[#F28C38]/10 text-[#F28C38] rounded-full text-sm">
                Acolhedora
              </span>
              <span className="px-3 py-1 bg-[#E1B12C]/10 text-[#E1B12C] rounded-full text-sm">
                Empática
              </span>
            </div>
          </motion.div>

          {/* Mascote 2 - Tech9 (O Projeto da Dedicação) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-[#EFF6FB] to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="relative mb-6"
            >
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-[#2E6A9D] to-[#204E4A] rounded-3xl flex items-center justify-center shadow-lg p-4">
                <img 
                  src={mascotTechImage}
                  alt="Tech9 - O Projeto da Dedicação"
                  className="w-full h-full object-contain"
                />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute -top-2 -left-2 w-12 h-12 bg-[#2E6A9D] rounded-full opacity-40 blur-lg"
              ></motion.div>
            </motion.div>

            <h3 className="text-2xl text-[#2E6A9D] dark:text-white mb-3 text-center">
              Tech9
            </h3>
            <p className="text-sm text-[#204E4A] dark:text-[#5ea4d4] text-center mb-3 italic">
              "O Projeto da Dedicação"
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
              Criado em um laboratório urbano, Tech9 nasceu para analisar dados e 
              orientar decisões sociais. Ao acessar histórias reais, descobriu a 
              empatia e compreendeu que não basta calcular — é preciso cuidar. 
              Representa tecnologia, orientação e memória coletiva.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="px-3 py-1 bg-[#2E6A9D]/10 text-[#2E6A9D] rounded-full text-sm">
                Educativo
              </span>
              <span className="px-3 py-1 bg-[#204E4A]/10 text-[#204E4A] rounded-full text-sm">
                Tecnológico
              </span>
            </div>
          </motion.div>
        </div>

        {/* Mensagem sobre a parceria */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-[#F28C38]/10 via-[#2E6A9D]/10 to-[#F28C38]/10 dark:from-[#F28C38]/20 dark:via-[#2E6A9D]/20 dark:to-[#F28C38]/20 rounded-2xl p-8 max-w-3xl mx-auto border-2 border-[#F28C38]/20">
            <h4 className="text-2xl text-[#204E4A] dark:text-white mb-4">
              Juntos, Coração e Mente em Harmonia
            </h4>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Flori cultiva o cuidado. Tech9 preserva e fortalece o cuidado. Juntos, 
              representam o propósito do RADAR: garantir que nenhum gesto de bondade se 
              perca e que todo cuidado se transforme em ação contínua.
            </p>
            <p className="text-[#F28C38] dark:text-[#E1B12C] italic">
              "Cuidar é humano. Planejar é necessário. Juntos, o impacto é real."
            </p>
          </div>
        </motion.div>

        {/* Carrossel de Banners dos Mascotes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 max-w-6xl mx-auto"
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
                    src={banner1}
                    alt="Banner Flori e Tech9 - Mascotes do Projeto RADAR"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                  <img
                    src={banner2}
                    alt="Banner dos Mascotes - Projeto RADAR em ação"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                  <img
                    src={banner3}
                    alt="Banner Tech9 e Flori - Juntos pelo cuidado"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </CarouselItem>

              <CarouselItem>
                <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                  <img
                    src={banner4}
                    alt="Banner Tech9 e Flori - Juntos pelo cuidado"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </CarouselItem>

              <CarouselItem>
                <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                  <img
                    src={banner5}
                    alt="Banner Tech9 e Flori - Juntos pelo cuidado"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </CarouselItem>


            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </motion.div>

        {/* Título e Descrição dos Downloads */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <h3 className="text-3xl text-[#204E4A] dark:text-white mb-4">
            Baixe os PDFs do Projeto RADAR
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Explore e baixe os materiais especiais do projeto RADAR! A coleção inclui o álbum de figurinhas dos mascotes e três pôsteres personalizados que celebram o universo criativo da iniciativa. Clique nos ícones abaixo para fazer o download: Figurinhas, Radar, Flori e Tech9 — cada um revelando uma parte da história, da empatia e da inovação que inspiram o projeto.
          </p>
        </motion.div>

        {/* Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex justify-center gap-8 flex-wrap"
        >
          {/* Álbum de Figurinhas */}
          <button
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/downloads/Stickers.pdf';
              link.download = 'Stickers.pdf';
              link.click();
            }}
            className="flex flex-col items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img 
              src={albumIcon}
              alt="Álbum de Figurinhas dos Mascotes"
              className="w-24 h-24 object-contain"
            />
            <span className="text-gray-700 dark:text-gray-300 text-center max-w-[120px]">
              Álbum de figurinhas dos Mascotes
            </span>
          </button>

          {/* Poster Projeto RADAR */}
          <button
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/downloads/Poster1.pdf';
              link.download = 'Poster1.pdf';
              link.click();
            }}
            className="flex flex-col items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img 
              src={posterRadarIcon}
              alt="Poster Projeto RADAR"
              className="w-24 h-24 object-contain"
            />
            <span className="text-gray-700 dark:text-gray-300 text-center max-w-[120px]">
              Poster Projeto RADAR
            </span>
          </button>

          {/* Poster da Flori */}
          <button
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/downloads/Poster3.pdf';
              link.download = 'Poster3.pdf';
              link.click();
            }}
            className="flex flex-col items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img 
              src={posterFloriIcon}
              alt="Poster da Flori"
              className="w-24 h-24 object-contain"
            />
            <span className="text-gray-700 dark:text-gray-300 text-center max-w-[120px]">
              Poster da Flori
            </span>
          </button>

          {/* Poster do Tech9 */}
          <button
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/downloads/Poster2.pdf';
              link.download = 'Poster2.pdf';
              link.click();
            }}
            className="flex flex-col items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img 
              src={posterTech9Icon}
              alt="Poster do Tech9"
              className="w-24 h-24 object-contain"
            />
            <span className="text-gray-700 dark:text-gray-300 text-center max-w-[120px]">
              Poster do Tech9
            </span>
          </button>
        </motion.div>

        {/* Carrossel de Materiais de Download */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 max-w-6xl mx-auto"
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
                    src={downloadBanner1}
                    alt="Ganhe álbum de figurinhas e pôsteres personalizados do RADAR"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                  <img
                    src={downloadBanner2}
                    alt="Decore com os pôsteres personalizados do RADAR, Tech9 e Flori"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                  <img
                    src={downloadBanner3}
                    alt="Ganhe álbum de figurinhas dos mascotes personalizados"
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
  );
}