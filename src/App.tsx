import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ImageCarousel } from "./components/ImageCarousel";
import { About } from "./components/About";
import { ODSCarousel } from "./components/ODSCarousel";
import { ToolSteps } from "./components/ToolSteps";
import { Mascots } from "./components/Mascots";
import { Testimonials } from "./components/Testimonials";
import { Footer } from "./components/Footer";
import { AboutPage } from "./components/AboutPage";
import { LearnMorePage } from "./components/LearnMorePage";
import { DiagnosticPage } from "./components/DiagnosticPage";
import { PrivacyPage } from "./components/PrivacyPage";
import { TermsPage } from "./components/TermsPage";
import { HistoryPage } from "./components/HistoryPage";
import { ProfilePage } from "./components/ProfilePage";
import { ContactPage } from "./components/ContactPage";
import { FAQPage } from "./components/FAQPage";
import { SupportLinksPage } from "./components/SupportLinksPage";
import { LoginPage } from "./components/LoginPage";
import { AccessibilityPanel } from "./components/AccessibilityPanel";
import { CookieBanner } from "./components/CookieBanner";
import { Toaster } from "./components/ui/sonner";

// Tipo para as páginas disponíveis na aplicação
type PageType = 'home' | 'about' | 'learnmore' | 'diagnostic' | 'privacy' | 'terms' | 'history' | 'profile' | 'contact' | 'faq' | 'support-links' | 'login';

export default function App() {
  // Estado para controlar a página atual
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  
  // Estado para controlar o painel de acessibilidade
  const [isAccessibilityPanelOpen, setIsAccessibilityPanelOpen] = useState(false);
  
  // Estado para armazenar dados do usuário logado
  const [currentUser, setCurrentUser] = useState<any>(null);

  /**
   * Efeito para verificar se há um usuário logado ao carregar a aplicação
   */
  useEffect(() => {
    const userJson = localStorage.getItem('radar-current-user');
    if (userJson) {
      setCurrentUser(JSON.parse(userJson));
    }
  }, []);

  /**
   * Função para navegar entre páginas
   * @param page - Nome da página para navegar
   */
  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Função para abrir o painel de acessibilidade
   */
  const handleOpenAccessibilityPanel = () => {
    setIsAccessibilityPanelOpen(true);
  };

  /**
   * Função chamada quando o login é bem-sucedido
   * @param userData - Dados do usuário que fez login
   */
  const handleLoginSuccess = (userData: any) => {
    setCurrentUser(userData);
  };

  /**
   * Função para fazer logout
   */
  const handleLogout = () => {
    localStorage.removeItem('radar-current-user');
    setCurrentUser(null);
    handleNavigate('home');
  };

  return (
    <div className="min-h-screen">
      {/* Cabeçalho da aplicação */}
      <Header 
        onNavigate={handleNavigate} 
        currentPage={currentPage}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      
      {/* Painel de Acessibilidade */}
      <AccessibilityPanel 
        isOpen={isAccessibilityPanelOpen} 
        onOpenChange={setIsAccessibilityPanelOpen}
      />
      
      {/* Renderização condicional das páginas */}
      {currentPage === 'home' ? (
        <main>
          <Hero onNavigate={handleNavigate} />
          <ImageCarousel />
          <About />
          <ODSCarousel />
          <ToolSteps />
          <Mascots />
          <Testimonials />
        </main>
      ) : currentPage === 'about' ? (
        <AboutPage onNavigate={handleNavigate} />
      ) : currentPage === 'learnmore' ? (
        <LearnMorePage onNavigate={handleNavigate} />
      ) : currentPage === 'diagnostic' ? (
        <DiagnosticPage onNavigate={handleNavigate} />
      ) : currentPage === 'privacy' ? (
        <PrivacyPage onNavigate={handleNavigate} />
      ) : currentPage === 'terms' ? (
        <TermsPage onNavigate={handleNavigate} />
      ) : currentPage === 'history' ? (
        <HistoryPage onNavigate={handleNavigate} />
      ) : currentPage === 'profile' ? (
        <ProfilePage onNavigate={handleNavigate} currentUser={currentUser} onLogout={handleLogout} />
      ) : currentPage === 'contact' ? (
        <ContactPage onNavigate={handleNavigate} />
      ) : currentPage === 'faq' ? (
        <FAQPage onNavigate={handleNavigate} />
      ) : currentPage === 'support-links' ? (
        <SupportLinksPage onNavigate={handleNavigate} />
      ) : currentPage === 'login' ? (
        <LoginPage onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />
      ) : null}
      
      {/* Rodapé da aplicação */}
      <Footer onNavigate={handleNavigate} onOpenAccessibility={handleOpenAccessibilityPanel} />
      
      {/* Banner de Cookies */}
      <CookieBanner onNavigate={handleNavigate} />
      
      {/* Sistema de Notificações Toast */}
      <Toaster position="top-right" richColors />
    </div>
  );
}