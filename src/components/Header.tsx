/**
 * Componente: Header (Cabeçalho da Aplicação)
 * 
 * Este componente renderiza o cabeçalho fixo no topo de todas as páginas.
 * 
 * Características:
 * - Logo do Projeto RADAR
 * - Menu de navegação responsivo
 * - Botão de perfil/login
 * - Menu mobile com animações
 * - Indicador de usuário logado
 */

import { Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import logoImage from "figma:asset/77dc2603c206363ab45e8f2d01962158b8a5383a.png";

interface HeaderProps {
  onNavigate: (page: 'home' | 'about' | 'learnmore' | 'diagnostic' | 'privacy' | 'terms' | 'history' | 'profile' | 'contact' | 'faq' | 'support-links' | 'login') => void;
  currentPage: 'home' | 'about' | 'learnmore' | 'diagnostic' | 'privacy' | 'terms' | 'history' | 'profile' | 'contact' | 'faq' | 'support-links' | 'login';
  currentUser: any;
  onLogout: () => void;
}

export function Header({ onNavigate, currentPage, currentUser, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Itens de navegação principal
  const navItems = [
    { label: "Início", action: () => onNavigate('home') },
    { label: "Sobre", action: () => onNavigate('about') },
    { label: "Ferramenta", action: () => onNavigate('diagnostic') },
    { label: "FAQ", action: () => onNavigate('faq') },
    { label: "Contato", action: () => onNavigate('contact') }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#2E6A9D]/90 dark:bg-gray-900/95 backdrop-blur-md shadow-sm"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo e nome do projeto */}
          <motion.button
            onClick={() => onNavigate('home')}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img 
              src={logoImage} 
              alt="Logo RADAR" 
              className="w-12 h-12 object-contain"
            />
            <span className="text-white font-semibold hidden sm:block">
              Projeto RADAR
            </span>
          </motion.button>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.button
                key={index}
                onClick={item.action}
                whileHover={{ scale: 1.1, color: "#F28C38" }}
                whileTap={{ scale: 0.95 }}
                className="text-white transition-colors hover:text-[#F28C38]"
              >
                {item.label}
              </motion.button>
            ))}
            
            {/* Botão de Perfil/Login */}
            {currentUser ? (
              <div className="relative group">
                <motion.button
                  onClick={() => onNavigate('profile')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    currentPage === 'profile' 
                      ? 'bg-[#F28C38] text-white shadow-lg' 
                      : 'bg-white/20 text-white hover:bg-[#F28C38]'
                  }`}
                  aria-label="Meu Perfil"
                  title={currentUser.name}
                >
                  <User size={20} />
                </motion.button>
                
                {/* Tooltip com nome do usuário */}
                <div className="absolute top-full right-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                    {currentUser.name}
                  </div>
                </div>
              </div>
            ) : (
              <motion.button
                onClick={() => onNavigate('login')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-[#F28C38] hover:bg-[#E1B12C] text-white rounded-lg transition-colors"
              >
                Login
              </motion.button>
            )}
          </nav>

          {/* Botão de Perfil/Login e Menu Mobile */}
          <div className="md:hidden flex items-center gap-3">
            {currentUser ? (
              <motion.button
                onClick={() => onNavigate('profile')}
                whileTap={{ scale: 0.95 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  currentPage === 'profile' 
                    ? 'bg-[#F28C38] text-white shadow-lg' 
                    : 'bg-white/20 text-white'
                }`}
                aria-label="Meu Perfil"
              >
                <User size={18} />
              </motion.button>
            ) : (
              <motion.button
                onClick={() => onNavigate('login')}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 bg-[#F28C38] text-white rounded-lg text-sm"
              >
                Login
              </motion.button>
            )}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu de Navegação Mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 flex flex-col gap-4"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    item.action();
                    setIsMenuOpen(false);
                  }}
                  className="text-white py-2 border-b border-white/20 hover:text-[#F28C38] transition-colors text-left"
                >
                  {item.label}
                </motion.button>
              ))}
              
              {/* Link para Perfil no menu mobile */}
              {currentUser && (
                <motion.button
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  onClick={() => {
                    onNavigate('profile');
                    setIsMenuOpen(false);
                  }}
                  className="text-white py-2 border-b border-white/20 hover:text-[#F28C38] transition-colors text-left flex items-center gap-2"
                >
                  <User size={18} />
                  Meu Perfil
                </motion.button>
              )}

              {/* Botão de Logout no menu mobile (se logado) */}
              {currentUser && (
                <motion.button
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: (navItems.length + 1) * 0.1 }}
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-white py-2 hover:text-[#F28C38] transition-colors text-left flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Sair
                </motion.button>
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
