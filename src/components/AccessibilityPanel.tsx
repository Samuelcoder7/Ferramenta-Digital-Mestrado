import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Settings, X, Sun, Moon, Check, Type, Contrast, RotateCcw } from "lucide-react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

interface AccessibilitySettings {
  darkMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
}

interface AccessibilityPanelProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  darkMode: false,
  fontSize: 'medium',
  highContrast: false
};

export function AccessibilityPanel({ isOpen: externalIsOpen, onOpenChange }: AccessibilityPanelProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Use external control if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = (open: boolean) => {
    if (onOpenChange) {
      onOpenChange(open);
    } else {
      setInternalIsOpen(open);
    }
  };

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('radar-accessibility-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        applySettings(parsed);
      } catch (error) {
        console.error('Error loading accessibility settings:', error);
      }
    }
  }, []);

  // Apply settings to document
  const applySettings = (newSettings: AccessibilitySettings) => {
    // Apply dark mode
    if (newSettings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply font size - Force update even if same value
    const fontSizeMap = {
      'small': '14px',
      'medium': '16px',
      'large': '18px'
    };
    const newFontSize = fontSizeMap[newSettings.fontSize];
    document.documentElement.style.fontSize = newFontSize;
    document.documentElement.style.setProperty('--font-size', newFontSize);

    // Apply high contrast
    if (newSettings.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  // Save settings to localStorage and apply
  const saveSettings = (newSettings: AccessibilitySettings) => {
    setSettings(newSettings);
    localStorage.setItem('radar-accessibility-settings', JSON.stringify(newSettings));
    applySettings(newSettings);
    
    // Show success toast
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const toggleDarkMode = () => {
    const newSettings = { ...settings, darkMode: !settings.darkMode };
    saveSettings(newSettings);
  };

  const setFontSize = (size: 'small' | 'medium' | 'large') => {
    const newSettings = { ...settings, fontSize: size };
    saveSettings(newSettings);
  };

  const toggleHighContrast = () => {
    const newSettings = { ...settings, highContrast: !settings.highContrast };
    saveSettings(newSettings);
  };

  const resetToDefaults = () => {
    // Remove from localStorage
    localStorage.removeItem('radar-accessibility-settings');
    
    // Force reset font size to default
    document.documentElement.style.fontSize = '16px';
    document.documentElement.style.setProperty('--font-size', '16px');
    
    // Apply default settings
    setSettings(DEFAULT_SETTINGS);
    applySettings(DEFAULT_SETTINGS);
    
    // Show success toast
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  return (
    <>
      {/* Floating Accessibility Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-24 z-40 w-14 h-14 bg-[#F28C38] hover:bg-[#E1B12C] text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        aria-label="Abrir painel de acessibilidade"
      >
        <Settings size={24} className="animate-spin-slow" />
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
        )}
      </AnimatePresence>

      {/* Side Panel - Left Side */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed left-0 top-0 bottom-0 w-full sm:w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#204E4A] to-[#2E6A9D] text-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Settings size={28} />
                  <h2 className="text-2xl">Acessibilidade</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Fechar painel"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="text-white/80 text-sm mt-2">
                Personalize sua experiência no site
              </p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Dark Mode Section */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {settings.darkMode ? (
                        <Moon className="text-[#2E6A9D]" size={24} />
                      ) : (
                        <Sun className="text-[#F28C38]" size={24} />
                      )}
                      <Label htmlFor="dark-mode" className="text-lg text-gray-900 dark:text-white cursor-pointer">
                        Modo Escuro
                      </Label>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {settings.darkMode 
                        ? "Ative o modo claro para melhor visualização durante o dia" 
                        : "Ative o modo escuro para reduzir o cansaço visual"}
                    </p>
                  </div>

                  <Switch
                    id="dark-mode"
                    checked={settings.darkMode}
                    onCheckedChange={toggleDarkMode}
                    className="data-[state=checked]:bg-[#2E6A9D]"
                  />
                </div>

                {/* Visual indicator */}
                <div className="mt-4 flex items-center justify-center gap-2 p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                  {settings.darkMode ? (
                    <>
                      <Moon className="text-[#2E6A9D]" size={20} />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Modo Noturno Ativo</span>
                    </>
                  ) : (
                    <>
                      <Sun className="text-[#F28C38]" size={20} />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Modo Diurno Ativo</span>
                    </>
                  )}
                </div>
              </div>

              {/* Font Size Section */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Type className="text-[#2E6A9D]" size={24} />
                    <Label className="text-lg text-gray-900 dark:text-white">
                      Tamanho da Fonte
                    </Label>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ajuste o tamanho do texto para melhor leitura
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'small' as const, label: 'Pequeno', size: 'text-sm' },
                    { value: 'medium' as const, label: 'Médio', size: 'text-base' },
                    { value: 'large' as const, label: 'Grande', size: 'text-lg' }
                  ].map((option) => (
                    <Button
                      key={option.value}
                      onClick={() => setFontSize(option.value)}
                      variant={settings.fontSize === option.value ? "default" : "outline"}
                      className={`${
                        settings.fontSize === option.value
                          ? 'bg-[#2E6A9D] text-white hover:bg-[#1e5278]'
                          : 'bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700'
                      } ${option.size}`}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>

                {/* Preview */}
                <div className="mt-4 p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-center text-gray-700 dark:text-gray-300">
                    Exemplo de texto
                  </p>
                </div>
              </div>

              {/* High Contrast Section */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Contrast className="text-[#204E4A] dark:text-[#4a9e8e]" size={24} />
                      <Label htmlFor="high-contrast" className="text-lg text-gray-900 dark:text-white cursor-pointer">
                        Alto Contraste
                      </Label>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {settings.highContrast
                        ? "Contraste padrão para cores vibrantes"
                        : "Ative para melhor legibilidade e contraste visual"}
                    </p>
                  </div>

                  <Switch
                    id="high-contrast"
                    checked={settings.highContrast}
                    onCheckedChange={toggleHighContrast}
                    className="data-[state=checked]:bg-[#204E4A]"
                  />
                </div>

                {/* Visual indicator */}
                <div className="mt-4 flex items-center justify-center gap-2 p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                  {settings.highContrast ? (
                    <>
                      <Contrast className="text-[#204E4A] dark:text-[#4a9e8e]" size={20} />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Alto Contraste Ativo</span>
                    </>
                  ) : (
                    <>
                      <Contrast className="text-gray-400" size={20} />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Contraste Padrão</span>
                    </>
                  )}
                </div>
              </div>

              {/* Reset Button */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-5 border border-red-200 dark:border-red-800">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
                      <RotateCcw className="text-red-600 dark:text-red-400" size={20} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base text-gray-900 dark:text-white mb-1">
                      Restaurar Padrões
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                      Remove todas as personalizações e volta às configurações padrão
                    </p>
                    <Button
                      onClick={resetToDefaults}
                      variant="outline"
                      size="sm"
                      className="w-full bg-white dark:bg-gray-900 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 border-red-300 dark:border-red-700 hover:border-red-400 dark:hover:border-red-600"
                    >
                      <RotateCcw size={14} className="mr-2" />
                      Resetar Configurações
                    </Button>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="bg-[#F28C38]/10 dark:bg-[#F28C38]/20 rounded-2xl p-5 border border-[#F28C38]/30">
                <h3 className="text-base text-[#204E4A] dark:text-white mb-3 flex items-center gap-2">
                  <Check className="text-[#F28C38]" size={18} />
                  Recursos de Acessibilidade
                </h3>
                <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#F28C38] mt-0.5 flex-shrink-0">•</span>
                    <span>Todas as configurações são salvas automaticamente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F28C38] mt-0.5 flex-shrink-0">•</span>
                    <span>Suas preferências são mantidas entre as páginas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F28C38] mt-0.5 flex-shrink-0">•</span>
                    <span>Compatível com leitores de tela</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F28C38] mt-0.5 flex-shrink-0">•</span>
                    <span>Navegação simplificada e intuitiva</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F28C38] mt-0.5 flex-shrink-0">•</span>
                    <span>Use "Restaurar Padrões" para resetar tudo</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: 50 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[320px]">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Check size={20} />
              </div>
              <div>
                <p className="font-semibold">
                  {settings.darkMode === DEFAULT_SETTINGS.darkMode && 
                   settings.fontSize === DEFAULT_SETTINGS.fontSize && 
                   settings.highContrast === DEFAULT_SETTINGS.highContrast
                    ? "Configurações restauradas!"
                    : "Salvo com sucesso!"}
                </p>
                <p className="text-sm text-white/90">
                  {settings.darkMode === DEFAULT_SETTINGS.darkMode && 
                   settings.fontSize === DEFAULT_SETTINGS.fontSize && 
                   settings.highContrast === DEFAULT_SETTINGS.highContrast
                    ? "Todas as preferências foram resetadas"
                    : "Suas preferências foram atualizadas"}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}