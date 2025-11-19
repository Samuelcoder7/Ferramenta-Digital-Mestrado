import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import mascotImage from "figma:asset/a0aa47dbaeb98cd3ae2a132464b2644931c6aba6.png";

interface CookieBannerProps {
  onNavigate: (page: 'privacy' | 'terms') => void;
}

export function CookieBanner({ onNavigate }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('radar-cookies-accepted');
    if (!cookiesAccepted) {
      // Show banner after a short delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('radar-cookies-accepted', 'true');
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
    // Set a temporary flag to not show again in this session
    sessionStorage.setItem('rap-cookies-dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 print:hidden"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-[#F28C38] overflow-hidden relative">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors group"
                aria-label="Fechar banner"
              >
                <X size={18} className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" />
              </button>

              <div className="grid md:grid-cols-[auto_1fr] gap-4 md:gap-6 p-6 md:p-8 pb-6 md:pb-8 items-center bg-white dark:bg-gray-800">
                {/* Mascot Image */}
                <motion.div
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="flex justify-center md:justify-start"
                >
                  <div className="relative">
                    <div className="w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40">
                      <img 
                        src={mascotImage} 
                        alt="RAP Dormindo - Mascote" 
                        className="w-full h-full object-contain drop-shadow-lg"
                      />
                    </div>
                    {/* Decorative glow */}
                    <div className="absolute inset-0 bg-[#F28C38]/20 rounded-full blur-xl -z-10"></div>
                  </div>
                </motion.div>

                {/* Content */}
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <h3 className="text-lg md:text-xl text-[#204E4A] dark:text-white mb-2">
                      🍪 Cookies e Privacidade
                    </h3>
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      Utilizamos cookies e armazenamento local para melhorar sua experiência no Projeto RADAR. 
                      Ao continuar navegando, você concorda com nossa{' '}
                      <button
                        onClick={() => {
                          handleAccept();
                          onNavigate('privacy');
                        }}
                        className="text-[#2E6A9D] hover:text-[#204E4A] underline font-medium"
                      >
                        Política de Privacidade
                      </button>
                      {' '}e{' '}
                      <button
                        onClick={() => {
                          handleAccept();
                          onNavigate('terms');
                        }}
                        className="text-[#2E6A9D] hover:text-[#204E4A] underline font-medium"
                      >
                        Termos de Uso
                      </button>.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button
                      onClick={handleAccept}
                      className="bg-[#F28C38] hover:bg-[#E1B12C] text-white shadow-lg"
                    >
                      Aceitar e Continuar
                    </Button>
                    
                    <Button
                      onClick={() => {
                        onNavigate('privacy');
                        handleClose();
                      }}
                      variant="outline"
                      className="border-[#204E4A] text-[#204E4A] dark:text-white dark:border-white hover:bg-[#204E4A] hover:text-white"
                    >
                      Saber Mais
                    </Button>
                  </div>
                </div>
              </div>

              {/* Decorative bottom bar */}
              <div className="h-1 bg-gradient-to-r from-[#204E4A] via-[#F28C38] to-[#2E6A9D]"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}