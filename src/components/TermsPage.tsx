import { motion } from "motion/react";
import { FileText, AlertCircle, UserCheck, Scale, Ban, RefreshCw, Shield, Mail } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import termsBanner1 from "figma:asset/f54ab9cdc8a7fa97a3fafb0b964e700ad5662d34.png";
import termsBanner2 from "figma:asset/c2476bb4e98509e508135547749daf9905664d9e.png";

interface TermsPageProps {
  onNavigate: (page: string) => void;
}

export function TermsPage({ onNavigate }: TermsPageProps) {
  const sections = [
    {
      icon: FileText,
      title: "1. Aceitação dos Termos",
      content: [
        "Ao acessar e utilizar a ferramenta RADAR (Roteiro de Apoio e Direcionamento para o Atendimento de Pessoas em Situação de Rua), você concorda em cumprir e estar vinculado a estes Termos de Uso.",
        "Se você não concorda com qualquer parte destes termos, não utilize nossa ferramenta.",
        "Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação no site.",
        "O uso continuado da ferramenta após modificações constitui aceitação dos novos termos."
      ],
      color: "#204E4A"
    },
    {
      icon: UserCheck,
      title: "2. Descrição do Serviço",
      content: [
        "O Projeto RADAR é uma ferramenta digital gratuita desenvolvida para:",
        "• Auxiliar profissionais, ONGs e gestores públicos no diagnóstico de necessidades da população em situação de rua",
        "• Fornecer recomendações práticas baseadas em dados coletados",
        "• Promover políticas públicas mais eficazes e direcionadas",
        "• Apoiar ações de assistência social com metodologia participativa",
        "A ferramenta não substitui atendimento profissional especializado ou serviços públicos de assistência social."
      ],
      color: "#2E6A9D"
    },
    {
      icon: Scale,
      title: "3. Uso Adequado da Ferramenta",
      content: [
        "Você concorda em utilizar a ferramenta RADAR apenas para fins legítimos e de acordo com estes termos. É proibido:",
        "• Usar a ferramenta para qualquer finalidade ilegal ou não autorizada",
        "• Tentar acessar áreas restritas do sistema sem autorização",
        "• Interferir ou interromper o funcionamento da ferramenta",
        "• Coletar dados de outros usuários sem consentimento",
        "• Reproduzir, duplicar ou copiar qualquer parte da ferramenta sem autorização prévia",
        "• Utilizar a ferramenta para discriminar, assediar ou prejudicar qualquer pessoa ou grupo"
      ],
      color: "#F28C38"
    },
    {
      icon: Shield,
      title: "4. Propriedade Intelectual",
      content: [
        "Todo o conteúdo da ferramenta RADAR, incluindo textos, gráficos, mascotes, logotipos, ícones, imagens, código-fonte e software, é propriedade do Projeto RADAR ou de seus licenciadores.",
        "O conteúdo é protegido pelas leis brasileiras de direitos autorais e propriedade intelectual.",
        "Você pode usar o conteúdo apenas para fins pessoais e não comerciais, respeitando todos os avisos de direitos autorais.",
        "A metodologia e o questionário desenvolvidos pelo Projeto RADAR podem ser utilizados por organizações parceiras mediante acordo formal."
      ],
      color: "#8C6B4E"
    },
    {
      icon: AlertCircle,
      title: "5. Limitação de Responsabilidade",
      content: [
        "A ferramenta RADAR é fornecida 'como está', sem garantias de qualquer tipo.",
        "Não garantimos que a ferramenta será ininterrupta, segura ou livre de erros.",
        "Não nos responsabilizamos por:",
        "• Decisões tomadas com base nos resultados fornecidos pela ferramenta",
        "• Danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso da ferramenta",
        "• Perda de dados, lucros ou oportunidades",
        "• Problemas técnicos, falhas de sistema ou interrupções de serviço",
        "O usuário é responsável por validar e complementar as recomendações com orientação profissional adequada."
      ],
      color: "#204E4A"
    },
    {
      icon: Ban,
      title: "6. Isenção de Garantias Médicas e Sociais",
      content: [
        "A ferramenta RADAR NÃO substitui:",
        "• Atendimento médico, psicológico ou de saúde mental profissional",
        "• Serviços de assistência social especializados",
        "• Avaliações individualizadas por profissionais qualificados",
        "• Encaminhamentos formais para equipamentos públicos",
        "Os resultados e recomendações são orientações gerais baseadas em respostas padronizadas e devem ser interpretados por profissionais capacitados.",
        "Em situações de emergência, procure imediatamente os serviços de saúde e assistência social competentes."
      ],
      color: "#2E6A9D"
    },
    {
      icon: RefreshCw,
      title: "7. Modificações e Interrupções do Serviço",
      content: [
        "Reservamo-nos o direito de:",
        "• Modificar, suspender ou descontinuar a ferramenta a qualquer momento, com ou sem aviso prévio",
        "• Alterar funcionalidades, adicionar ou remover recursos",
        "• Realizar manutenções programadas ou emergenciais",
        "• Atualizar a metodologia e o questionário conforme necessário",
        "Faremos o possível para notificar os usuários sobre mudanças significativas, mas não somos obrigados a fazê-lo.",
        "Não seremos responsáveis por quaisquer danos decorrentes de modificações ou interrupções."
      ],
      color: "#F28C38"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-[#2E6A9D] via-[#1e5278] to-[#2E6A9D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-96 h-96 bg-[#F28C38] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#204E4A] rounded-full blur-3xl"></div>
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
                <Scale size={48} className="text-white" />
              </div>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
              Termos de Uso
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-4 max-w-3xl mx-auto">
              Condições gerais de uso da ferramenta RADAR
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
                      src={termsBanner1}
                      alt="Termos de Uso - Conheça as regras da plataforma"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={termsBanner2}
                      alt="Navegue com transparência e respeito - Termos de uso claros e éticos"
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
            className="bg-gradient-to-r from-[#2E6A9D]/10 to-[#204E4A]/10 rounded-2xl p-8 border-l-4 border-[#2E6A9D]"
          >
            <div className="flex items-start gap-4">
              <FileText className="text-[#2E6A9D] flex-shrink-0 mt-1" size={32} />
              <div>
                <h2 className="text-2xl text-[#2E6A9D] mb-4">Bem-vindo aos Termos de Uso</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Estes Termos de Uso regulam o acesso e a utilização da ferramenta digital 
                  <strong className="text-[#204E4A]"> RADAR (Roteiro de Apoio e Direcionamento para o Atendimento de Pessoas em Situação de Rua)</strong>, 
                  desenvolvida para auxiliar profissionais, organizações e gestores públicos no diagnóstico 
                  e planejamento de ações voltadas à população em situação de rua.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Ao utilizar nossa ferramenta, você concorda com estes termos e com nossa 
                  <button 
                    onClick={() => onNavigate('privacy')}
                    className="text-[#2E6A9D] hover:text-[#F28C38] underline transition-colors"
                  >
                    Política de Privacidade
                  </button>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terms Sections */}
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

      {/* Additional Sections */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Links Externos */}
            <div className="bg-[#8C6B4E]/5 rounded-2xl p-8 border-l-4 border-[#8C6B4E]">
              <h3 className="text-xl text-[#8C6B4E] mb-4">8. Links para Sites de Terceiros</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                A ferramenta RADAR pode conter links para sites, aplicativos e recursos de terceiros 
                (como CRAS, Centro POP, UBS, etc.).
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                Esses links são fornecidos apenas para conveniência. Não temos controle sobre o 
                conteúdo, políticas de privacidade ou práticas desses sites.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Não nos responsabilizamos pelo conteúdo, produtos, serviços ou práticas de sites 
                de terceiros. Recomendamos que você leia os termos e políticas de cada site visitado.
              </p>
            </div>

            {/* Dados e Privacidade */}
            <div className="bg-[#204E4A]/5 rounded-2xl p-8 border-l-4 border-[#204E4A]">
              <h3 className="text-xl text-[#204E4A] mb-4">9. Proteção de Dados e Privacidade</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                O tratamento de dados pessoais coletados pela ferramenta RADAR está regulamentado 
                em nossa Política de Privacidade, que faz parte integrante destes Termos de Uso.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                Estamos comprometidos com a proteção de dados de acordo com a Lei Geral de Proteção 
                de Dados (LGPD - Lei nº 13.709/2018).
              </p>
              <p className="text-gray-700 leading-relaxed">
                Para mais informações sobre como coletamos, usamos e protegemos seus dados, consulte 
                nossa 
                <button 
                  onClick={() => onNavigate('privacy')}
                  className="text-[#204E4A] hover:text-[#F28C38] underline transition-colors ml-1"
                >
                  Política de Privacidade
                </button>.
              </p>
            </div>

            {/* Lei Aplicável */}
            <div className="bg-[#2E6A9D]/5 rounded-2xl p-8 border-l-4 border-[#2E6A9D]">
              <h3 className="text-xl text-[#2E6A9D] mb-4">10. Lei Aplicável e Foro</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                Quaisquer disputas decorrentes do uso da ferramenta RADAR serão submetidas à jurisdição 
                exclusiva dos tribunais brasileiros.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Fica eleito o foro da Comarca do Rio de Janeiro, Estado do Rio de Janeiro, para dirimir quaisquer 
                questões oriundas destes Termos, renunciando-se expressamente a qualquer outro, por mais 
                privilegiado que seja.
              </p>
            </div>

            {/* Disposições Gerais */}
            <div className="bg-[#F28C38]/5 rounded-2xl p-8 border-l-4 border-[#F28C38]">
              <h3 className="text-xl text-[#F28C38] mb-4">11. Disposições Gerais</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Se qualquer disposição destes Termos for considerada inválida ou inexequível, as 
                demais disposições permanecerão em pleno vigor e efeito.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                A falha em exercer ou fazer cumprir qualquer direito ou disposição destes Termos 
                não constitui renúncia a tal direito ou disposição.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Estes Termos de Uso constituem o acordo integral entre você e o Projeto RADAR em 
                relação ao uso da ferramenta.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#2E6A9D] via-[#1e5278] to-[#204E4A] relative overflow-hidden">
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
              Dúvidas sobre os Termos?
            </h2>
            
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
              Se você tiver alguma dúvida sobre estes Termos de Uso ou sobre o funcionamento 
              da ferramenta RADAR, entre em contato conosco:
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
              <p className="text-white mb-2">
                <strong>E-mail:</strong> projetoradardigital@gmail.com
              </p>
              <p className="text-white/80 text-sm mt-4">
                Estamos à disposição para esclarecer suas dúvidas.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F28C38] to-transparent"></div>
      </section>

      {/* Final Note */}
      <section className="py-12 px-4 bg-white border-t border-gray-200">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            <strong className="text-[#2E6A9D]">Projeto RADAR - Roteiro de Apoio e Direcionamento para o Atendimento de Pessoas em Situação de Rua</strong>
          </p>
          <p className="text-gray-500 text-xs">
            Ao utilizar esta ferramenta, você concorda com estes Termos de Uso e com nossa Política de Privacidade.
            <br />
            Desenvolvido com empatia e compromisso social.
          </p>
        </div>
      </section>
    </div>
  );
}