/**
 * Componente: Footer (Rodapé da Aplicação)
 * 
 * Este componente renderiza o rodapé em todas as páginas.
 * 
 * Características:
 * - Logo e descrição do projeto
 * - Links rápidos para navegação
 * - Informações de contato
 * - Links para FAQ e Links de Apoio
 * - Botão de acessibilidade
 * - Copyright e informações legais
 */

import { motion } from "motion/react";
import { Heart, Mail, MapPin, Instagram } from "lucide-react";
import logoImage from "figma:asset/77dc2603c206363ab45e8f2d01962158b8a5383a.png";


interface FooterProps {
  onNavigate: (page: 'home' | 'about' | 'learnmore' | 'diagnostic' | 'privacy' | 'terms' | 'history' | 'profile' | 'contact' | 'faq' | 'support-links' | 'login') => void;
  onOpenAccessibility: () => void;
}

export function Footer({ onNavigate, onOpenAccessibility }: FooterProps) {
  return (
    <footer id="footer" className="bg-[#204E4A] dark:bg-gray-950 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo e descrição */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <img 
                src={logoImage} 
                alt="Logo RADAR" 
                className="w-12 h-12 object-contain"
              />
              <span className="text-xl font-semibold">Projeto RADAR</span>
            </motion.div>
            
            <p className="text-white/80 mb-4 leading-relaxed">
              Roteiro de Apoio e Direcionamento para o Atendimento de Pessoas em Situação de Rua. 
              Tecnologia com empatia, promovendo inclusão e dignidade.
            </p>

            <div className="flex items-center gap-2 text-white/60">
              <Heart size={16} className="text-[#F28C38]" />
              <span className="text-sm">Desenvolvido com empatia e propósito social</span>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <motion.li
                whileHover={{ x: 5 }}
                className="text-white/80 hover:text-[#F28C38] transition-colors cursor-pointer"
                onClick={() => onNavigate('home')}
              >
                Início
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="text-white/80 hover:text-[#F28C38] transition-colors cursor-pointer"
                onClick={() => onNavigate('about')}
              >
                Sobre
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="text-white/80 hover:text-[#F28C38] transition-colors cursor-pointer"
                onClick={() => onNavigate('learnmore')}
              >
                Saiba Mais
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="text-white/80 hover:text-[#F28C38] transition-colors cursor-pointer"
                onClick={() => onNavigate('diagnostic')}
              >
                Ferramenta
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="text-white/80 hover:text-[#F28C38] transition-colors cursor-pointer"
                onClick={() => onNavigate('faq')}
              >
                Perguntas Frequentes
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="text-white/80 hover:text-[#F28C38] transition-colors cursor-pointer"
                onClick={() => onNavigate('history')}
              >
                Histórico e Gráficos
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="text-white/80 hover:text-[#F28C38] transition-colors cursor-pointer"
                onClick={() => onNavigate('profile')}
              >
                Meu Perfil
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="text-white/80 hover:text-[#F28C38] transition-colors cursor-pointer"
                onClick={() => onNavigate('contact')}
              >
                Contato
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="text-white/80 hover:text-[#F28C38] transition-colors cursor-pointer"
                onClick={() => onNavigate('support-links')}
              >
                Links de Apoio
              </motion.li>
            </ul>
          </div>

          {/* Informações de Contato */}
          <div>
            <h4 className="font-semibold mb-4">Informações</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/80">
                <Mail size={16} className="text-[#F28C38]" />
                <span className="text-sm">projetoradardigital@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <MapPin size={16} className="text-[#F28C38]" />
                <span className="text-sm">Rio de Janeiro, RJ</span>
              </li>

              
                <li className="flex items-center gap-2 text-white/80">
                <Instagram size={16} className="text-[#F28C38]" />
              <a
                href="https://instagram.com/projeto.radar"
                target="_blank"
                 rel="noopener noreferrer"
                  className="text-sm hover:underline"
                >
                 @projeto.radar
                  </a>
                </li>





            </ul>
          </div>
        </div>

        {/* Barra inferior com copyright e links legais */}
        <div className="border-t border-white/20 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              © 2025 Projeto RADAR. Todos os direitos reservados.
            </p>
            
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.1, color: "#F28C38" }}
                onClick={() => onNavigate('privacy')}
                className="text-white/60 hover:text-[#F28C38] transition-colors text-sm cursor-pointer"
              >
                Privacidade
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, color: "#F28C38" }}
                onClick={() => onNavigate('terms')}
                className="text-white/60 hover:text-[#F28C38] transition-colors text-sm cursor-pointer"
              >
                Termos de Uso
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, color: "#F28C38" }}
                onClick={onOpenAccessibility}
                className="text-white/60 hover:text-[#F28C38] transition-colors text-sm cursor-pointer"
              >
                Acessibilidade
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
