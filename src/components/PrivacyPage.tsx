import { motion } from "motion/react";
import { Shield, Lock, Eye, FileText, Users, AlertCircle, CheckCircle, Mail } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import privacyBanner1 from "figma:asset/c9e107847e891238c9e2332cd1b8f76482a94af1.png";
import privacyBanner2 from "figma:asset/5066b1ab09ec916cfdd135bb506b020574cae250.png";

interface PrivacyPageProps {
  onNavigate: (page: string) => void;
}

export function PrivacyPage({ onNavigate }: PrivacyPageProps) {
  const sections = [
    {
      icon: FileText,
      title: "1. Informações que Coletamos",
      content: [
        "O Projeto RADAR coleta apenas as informações essenciais para o funcionamento da ferramenta de diagnóstico:",
        "• Respostas ao questionário de avaliação social (anônimas)",
        "• Dados de avaliação da ferramenta (opcional)",
        "• Informações técnicas básicas de navegação (cookies essenciais)",
        "Importante: Não coletamos dados pessoais identificáveis como nome, CPF, endereço ou telefone da população atendida."
      ],
      color: "#204E4A"
    },
    {
      icon: Lock,
      title: "2. Como Utilizamos os Dados",
      content: [
        "Os dados coletados são utilizados exclusivamente para:",
        "• Gerar diagnósticos e recomendações personalizadas",
        "• Melhorar a qualidade e eficácia da ferramenta",
        "• Produzir relatórios estatísticos agregados (sem identificação individual)",
        "• Apoiar pesquisas acadêmicas sobre políticas públicas sociais",
        "Nunca compartilhamos, vendemos ou utilizamos os dados para fins comerciais."
      ],
      color: "#2E6A9D"
    },
    {
      icon: Shield,
      title: "3. Proteção e Segurança",
      content: [
        "Implementamos medidas de segurança para proteger suas informações:",
        "• Criptografia de dados em trânsito e armazenamento",
        "• Acesso restrito apenas a membros autorizados da equipe",
        "• Servidores seguros com backups regulares",
        "• Monitoramento constante contra acessos não autorizados",
        "• Conformidade com a Lei Geral de Proteção de Dados (LGPD)"
      ],
      color: "#F28C38"
    },
    {
      icon: Users,
      title: "4. Compartilhamento de Dados",
      content: [
        "O Projeto RADAR pode compartilhar dados agregados e anonimizados com:",
        "• Instituições parceiras (ONGs, universidades, órgãos públicos)",
        "• Pesquisadores acadêmicos mediante acordo formal",
        "• Gestores públicos para planejamento de políticas sociais",
        "Atenção: Qualquer compartilhamento preserva o anonimato e não permite identificação individual."
      ],
      color: "#8C6B4E"
    },
    {
      icon: Eye,
      title: "5. Seus Direitos",
      content: [
        "De acordo com a LGPD, você tem direito a:",
        "• Acessar os dados coletados",
        "• Solicitar correção de informações inexatas",
        "• Solicitar exclusão dos dados",
        "• Revogar consentimento a qualquer momento",
        "• Obter informações sobre o uso dos seus dados",
        "Para exercer esses direitos, entre em contato conosco."
      ],
      color: "#204E4A"
    },
    {
      icon: AlertCircle,
      title: "6. Cookies e Tecnologias",
      content: [
        "Utilizamos cookies e tecnologias similares para:",
        "• Garantir o funcionamento adequado da ferramenta",
        "• Lembrar suas preferências de navegação",
        "• Melhorar a experiência do usuário",
        "• Gerar estatísticas de uso (Google Analytics)",
        "Você pode desabilitar cookies nas configurações do seu navegador, mas isso pode afetar a funcionalidade do site."
      ],
      color: "#2E6A9D"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-[#204E4A] via-[#1a3f3c] to-[#204E4A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-96 h-96 bg-[#F28C38] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#2E6A9D] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 rounded-2xl bg-[#F28C38] flex items-center justify-center mx-auto">
                <Shield size={48} className="text-white" />
              </div>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
              Política de Privacidade
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-4 max-w-3xl mx-auto">
              Seu direito à privacidade e proteção de dados
            </p>

            <p className="text-base text-white/70 max-w-2xl mx-auto">
              Última atualização: Novembro de 2025
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F28C38] to-transparent"></div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          {/* Carrossel de banners informativos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
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
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={privacyBanner1}
                      alt="Política de Privacidade - Seus dados são protegidos"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={privacyBanner2}
                      alt="Sua privacidade importa! Dados protegidos, segurança e ética sempre"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#F28C38]/10 to-[#204E4A]/10 rounded-2xl p-8 border-l-4 border-[#F28C38]"
          >
            <div className="flex items-start gap-4">
              <CheckCircle className="text-[#F28C38] flex-shrink-0 mt-1" size={32} />
              <div>
                <h2 className="text-2xl text-[#204E4A] mb-4">Nosso Compromisso</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  O <strong className="text-[#204E4A]">Projeto RADAR</strong> está comprometido com a proteção 
                  da privacidade e dos dados das pessoas atendidas. Esta Política de Privacidade descreve como 
                  coletamos, usamos, armazenamos e protegemos suas informações.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Operamos com transparência, ética e em conformidade com a 
                  <strong className="text-[#2E6A9D]"> Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)</strong> e 
                  demais legislações aplicáveis.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="py-16 px-4 bg-[#F5F6FA]">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-start gap-6">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${section.color}15` }}
                  >
                    <section.icon size={32} style={{ color: section.color }} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl mb-4" style={{ color: section.color }}>
                      {section.title}
                    </h3>

                    <div className="space-y-3">
                      {section.content.map((paragraph, pIndex) => (
                        <p 
                          key={pIndex} 
                          className={`text-gray-700 leading-relaxed ${
                            paragraph.startsWith('•') ? 'ml-4' : ''
                          }`}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Menores de Idade */}
            <div className="bg-[#2E6A9D]/5 rounded-2xl p-8 border-l-4 border-[#2E6A9D]">
              <h3 className="text-xl text-[#2E6A9D] mb-4">7. Menores de Idade</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                A ferramenta RADAR é destinada ao uso por profissionais, organizações e gestores públicos. 
                Não coletamos intencionalmente dados de menores de 18 anos sem o consentimento de seus 
                responsáveis legais ou representantes autorizados. 
              </p>
              <p className="text-gray-700 leading-relaxed">
                Caso identifiquemos coleta inadvertida de dados de menores, tomaremos medidas imediatas 
                para excluí-los de nossos sistemas.
              </p>
            </div>

            {/* Alterações na Política */}
            <div className="bg-[#F28C38]/5 rounded-2xl p-8 border-l-4 border-[#F28C38]">
              <h3 className="text-xl text-[#F28C38] mb-4">8. Alterações nesta Política</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em 
                nossas práticas, tecnologias ou requisitos legais.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Recomendamos que você revise esta página regularmente. A data da última atualização será 
                sempre indicada no topo da página.
              </p>
            </div>

            {/* Consentimento */}
            <div className="bg-[#204E4A]/5 rounded-2xl p-8 border-l-4 border-[#204E4A]">
              <h3 className="text-xl text-[#204E4A] mb-4">9. Consentimento</h3>
              <p className="text-gray-700 leading-relaxed">
                Ao utilizar a ferramenta RADAR, você concorda com a coleta e uso de informações conforme 
                descrito nesta Política de Privacidade. Se você não concorda com algum aspecto desta 
                política, solicitamos que não utilize nossos serviços.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#204E4A] via-[#1a3f3c] to-[#2E6A9D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-96 h-96 bg-[#F28C38] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Mail className="text-[#F28C38] mx-auto mb-6" size={64} />
            
            <h2 className="text-3xl md:text-4xl text-white mb-4">
              Dúvidas sobre Privacidade?
            </h2>
            
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
              Se você tiver dúvidas sobre esta Política de Privacidade, quiser exercer seus direitos 
              ou relatar uma preocupação, entre em contato conosco:
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
              <p className="text-white mb-2">
                <strong>E-mail:</strong> projetoradardigital@gmail.com
              </p>
              <p className="text-white/80 text-sm mt-4">
                Responderemos sua solicitação o quanto antes.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F28C38] to-transparent"></div>
      </section>

      {/* Final Note */}
      <section className="py-12 px-4 bg-white border-t border-gray-200">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            <strong className="text-[#204E4A]">Projeto RADAR - Roteiro de Apoio e Direcionamento para o Atendimento de Pessoas em Situação de Rua</strong>
            <br />
            Tecnologia com empatia, sempre respeitando sua privacidade e dignidade.
          </p>
        </div>
      </section>
    </div>
  );
}