/**
 * Componente: SupportLinksPage (Página de Links de Apoio)
 * 
 * Esta página apresenta links úteis para instituições de apoio, serviços sociais,
 * saúde e outros recursos importantes para atendimento à população em situação de rua.
 * 
 * Características:
 * - Links externos que abrem em nova aba
 * - Organização por categorias (Assistência Social, Saúde, Educação, etc.)
 * - Design responsivo e acessível
 * - Informações sobre cada tipo de serviço
 */

import { motion } from "motion/react";
import { ChevronLeft, ExternalLink, Heart, Stethoscope, Home, GraduationCap, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import supportBanner1 from "figma:asset/c176779badf2f022f6d8646106abbf6eede5ccc3.png";
import supportBanner2 from "figma:asset/ade3b363f7008fec48b368364fdd490a5ae85745.png";

interface SupportLinksPageProps {
  onNavigate: (page: 'home' | 'about' | 'learnmore' | 'diagnostic' | 'privacy' | 'terms' | 'history' | 'profile' | 'contact' | 'faq' | 'support-links' | 'login') => void;
}

export function SupportLinksPage({ onNavigate }: SupportLinksPageProps) {
  // Array de categorias de links de apoio
  const supportCategories = [
    {
      title: "Assistência Social",
      icon: Heart,
      color: "#F28C38",
      description: "Serviços de assistência social, alimentação e acolhimento",
      links: [
        {
          name: "CRAS - Centro de Referência de Assistência Social",
          description: "Unidade pública da Assistência Social que atende famílias em situação de vulnerabilidade social.",
          url: "https://www.gov.br/cidadania/pt-br/acoes-e-programas/assistencia-social/equipamentos/cras",
          info: "O CRAS oferece serviços de proteção social básica, orientação e encaminhamento para benefícios sociais."
        },
        {
          name: "CREAS - Centro de Referência Especializado de Assistência Social",
          description: "Atende famílias e pessoas em situação de risco social ou com direitos violados.",
          url: "https://www.gov.br/cidadania/pt-br/acoes-e-programas/assistencia-social/equipamentos/creas",
          info: "O CREAS oferece atendimento especializado e acompanhamento a pessoas em situação de vulnerabilidade."
        },
        {
          name: "Centro POP - Centro de Referência para População em Situação de Rua",
          description: "Unidade específica para atendimento à população em situação de rua.",
          url: "https://www.gov.br/cidadania/pt-br/acoes-e-programas/assistencia-social/equipamentos/centro-pop",
          info: "Oferece atendimento individual e coletivo, apoio com documentação, higiene pessoal e alimentação."
        },
        {
          name: "CadÚnico - Cadastro Único",
          description: "Cadastro para programas sociais do governo federal.",
          url: "https://www.gov.br/cidadania/pt-br/acoes-e-programas/cadastro-unico",
          info: "Necessário para acesso a programas como Bolsa Família e outros benefícios sociais."
        }
      ]
    },
    {
      title: "Saúde",
      icon: Stethoscope,
      color: "#2E6A9D",
      description: "Serviços de saúde e atendimento médico",
      links: [
        {
          name: "UBS - Unidade Básica de Saúde",
          description: "Atenção primária à saúde, consultas e acompanhamento médico.",
          url: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/atencao-primaria-a-saude",
          info: "As UBS oferecem atendimento médico gratuito, vacinação, exames e acompanhamento de saúde."
        },
        {
          name: "Consultório na Rua",
          description: "Equipes de saúde que atendem diretamente nas ruas.",
          url: "https://www.gov.br/saude/pt-br/composicao/saps/consultorio-na-rua",
          info: "Atendimento de saúde itinerante específico para população em situação de rua."
        },
        {
          name: "CAPS - Centro de Atenção Psicossocial",
          description: "Atendimento especializado em saúde mental.",
          url: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-mental/caps",
          info: "Oferece tratamento para pessoas com transtornos mentais e necessidades decorrentes do uso de álcool e drogas."
        },
        {
          name: "CAPS AD - Centro de Atenção Psicossocial Álcool e Drogas",
          description: "Atendimento especializado para dependência química.",
          url: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-mental/caps",
          info: "Focado no tratamento de pessoas com problemas relacionados ao uso de álcool e outras drogas."
        },
        {
          name: "SAMU - Serviço de Atendimento Móvel de Urgência",
          description: "Atendimento de emergência médica. Ligue 192",
          url: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/samu-192",
          info: "Atendimento de urgência e emergência 24 horas. Ligue 192 em casos de emergência médica."
        }
      ]
    },
    {
      title: "Documentação",
      icon: Home,
      color: "#204E4A",
      description: "Serviços para emissão de documentos",
      links: [
        {
          name: "Defensoria Pública",
          description: "Assistência jurídica gratuita para emissão de documentos.",
          url: "https://www.defensoria.sp.def.br/",
          info: "A Defensoria Pública pode auxiliar na emissão gratuita de documentos como RG, CPF e certidões."
        },
        {
          name: "Cartório - Emissão de Certidões",
          description: "Informações sobre emissão de certidões de nascimento e outros documentos.",
          url: "https://www.cnj.jus.br/programas-e-acoes/cidadania-sem-barreiras/",
          info: "Programas de cidadania oferecem emissão gratuita de certidões para pessoas em vulnerabilidade."
        },
        {
          name: "Receita Federal - CPF",
          description: "Emissão e regularização de CPF.",
          url: "https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/cadastros/cpf",
          info: "O CPF pode ser emitido gratuitamente online ou presencialmente."
        }
      ]
    },
    {
      title: "Educação e Qualificação",
      icon: GraduationCap,
      color: "#8C6B4E",
      description: "Cursos, educação e qualificação profissional",
      links: [
        {
          name: "EJA - Educação de Jovens e Adultos",
          description: "Programa de alfabetização e conclusão de estudos.",
          url: "https://www.gov.br/mec/pt-br/acesso-a-informacao/institucional/secretarias/secretaria-de-educacao-continuada-alfabetizacao-de-jovens-e-adultos-diversidade-e-inclusao",
          info: "Oferece oportunidade de concluir o ensino fundamental e médio gratuitamente."
        },
        {
          name: "SENAI - Cursos Profissionalizantes",
          description: "Cursos técnicos e profissionalizantes gratuitos.",
          url: "https://www.senai.br/",
          info: "Diversos cursos gratuitos de qualificação profissional em várias áreas."
        },
        {
          name: "SENAC - Programa Senac Gratuidade",
          description: "Cursos gratuitos em diversas áreas.",
          url: "https://www.senac.br/",
          info: "Oferece cursos gratuitos para pessoas de baixa renda."
        },
        {
          name: "PRONATEC - Programa Nacional de Acesso ao Ensino Técnico",
          description: "Cursos técnicos e profissionalizantes gratuitos.",
          url: "https://www.gov.br/mec/pt-br/pronatec",
          info: "Programa federal que oferece cursos técnicos gratuitos em parceria com instituições de ensino."
        }
      ]
    },
    {
      title: "Emergência e Denúncias",
      icon: Phone,
      color: "#E1B12C",
      description: "Números de emergência e canais de denúncia",
      links: [
        {
          name: "Disque 100 - Direitos Humanos",
          description: "Canal para denúncias de violações de direitos humanos.",
          url: "https://www.gov.br/mdh/pt-br/canais_atendimento/disque-100",
          info: "Atendimento gratuito 24 horas para denúncias de violência e violação de direitos."
        },
        {
          name: "SAMU 192 - Emergência Médica",
          description: "Atendimento móvel de urgência.",
          url: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/samu-192",
          info: "Ligue 192 em casos de emergência médica."
        },
        {
          name: "Polícia Militar 190",
          description: "Emergência policial.",
          url: "https://www.pm.sp.gov.br/",
          info: "Ligue 190 em situações de emergência que requeiram atendimento policial."
        },
        {
          name: "Bombeiros 193",
          description: "Corpo de Bombeiros - emergências e resgates.",
          url: "https://www.bombeiros.sp.gov.br/",
          info: "Ligue 193 para emergências como incêndios, resgates e primeiros socorros."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E9E9E9] to-white dark:from-gray-900 dark:to-gray-800 pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Botão de voltar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            onClick={() => onNavigate('home')}
            variant="ghost"
            className="gap-2 text-[#204E4A] dark:text-white hover:text-[#F28C38] dark:hover:text-[#F28C38]"
          >
            <ChevronLeft size={20} />
            Voltar para Início
          </Button>
        </motion.div>

        {/* Cabeçalho da página */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#204E4A] to-[#2E6A9D] rounded-2xl mb-6 shadow-lg">
            <MapPin className="text-white" size={40} />
          </div>
          
          <h1 className="text-4xl md:text-5xl text-[#204E4A] dark:text-white mb-4">
            Links de Apoio
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Encontre instituições, serviços e recursos importantes para o atendimento 
            à população em situação de rua.
          </p>
        </motion.div>

        {/* Aviso importante */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#F28C38]/10 dark:bg-[#F28C38]/20 border-l-4 border-[#F28C38] rounded-lg p-6 mb-12"
        >
          <p className="text-gray-700 dark:text-gray-300">
            <strong className="text-[#F28C38]">Importante:</strong> Os links abaixo abrem em uma nova aba do navegador. 
            Sua sessão no RADAR permanecerá aberta para que você possa voltar facilmente.
          </p>
        </motion.div>

        {/* Carrossel de banners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={supportBanner1}
                    alt="A Rede de Apoio Começa Aqui - Banner com mão colorida"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={supportBanner2}
                    alt="Precisa de Ajuda ou Quer Ajudar? - Banner com Flori"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </motion.div>

        {/* Categorias de links */}
        <div className="space-y-12">
          {supportCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            
            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + categoryIndex * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border-2 border-gray-100 dark:border-gray-700"
              >
                {/* Cabeçalho da categoria */}
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                    style={{ backgroundColor: category.color }}
                  >
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl text-[#204E4A] dark:text-white">
                      {category.title}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Links da categoria */}
                <div className="grid md:grid-cols-2 gap-4">
                  {category.links.map((link, linkIndex) => (
                    <motion.a
                      key={linkIndex}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-600 hover:border-[#F28C38] dark:hover:border-[#F28C38] transition-all shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="text-[#204E4A] dark:text-white group-hover:text-[#F28C38] dark:group-hover:text-[#F28C38] transition-colors">
                          {link.name}
                        </h3>
                        <ExternalLink 
                          size={18} 
                          className="text-gray-400 group-hover:text-[#F28C38] transition-colors flex-shrink-0 mt-1" 
                        />
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                        {link.description}
                      </p>
                      
                      {link.info && (
                        <div className="bg-white/50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                            {link.info}
                          </p>
                        </div>
                      )}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to action final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 bg-gradient-to-br from-[#204E4A] to-[#2E6A9D] rounded-2xl shadow-xl p-8 md:p-12 text-center text-white"
        >
          <h3 className="text-2xl md:text-3xl mb-4">
            Precisa de mais informações?
          </h3>
          <p className="text-lg mb-6 text-white/90 max-w-2xl mx-auto">
            Entre em contato conosco ou consulte a página de Perguntas Frequentes 
            para mais orientações sobre como utilizar esses recursos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate('contact')}
              size="lg"
              className="bg-[#F28C38] hover:bg-[#E1B12C] text-white shadow-lg"
            >
              Entrar em Contato
            </Button>
            <Button
              onClick={() => onNavigate('faq')}
              size="lg"
              variant="outline"
              className="bg-white/10 border-white text-white hover:bg-white hover:text-[#204E4A] shadow-lg"
            >
              Ver Perguntas Frequentes
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}