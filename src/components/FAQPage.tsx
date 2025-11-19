/**
 * Componente: FAQPage (Página de Perguntas Frequentes)
 * 
 * Esta página apresenta as perguntas frequentes sobre a plataforma RADAR,
 * incluindo informações sobre login, uso de dados, funcionalidades e privacidade.
 * 
 * Características:
 * - Design responsivo e acessível
 * - Acordeão para organizar as perguntas
 * - Informações sobre importância do login e proteção de dados
 * - Animações suaves com Motion
 * - Carrossel de imagens para ilustrar a plataforma
 */

import { motion } from "motion/react";
import { ChevronLeft, HelpCircle } from "lucide-react";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import faqBanner1 from "figma:asset/7abdb9241023ab766f48075c9a8a6104cfbd1a01.png";
import faqBanner2 from "figma:asset/f94b0e76f120e93e29d6bf52fd03dd8af90c8558.png";
import faqBanner3 from "figma:asset/940333e16a21ba0fbfe91fd37788451883dc94eb.png";
import faqBanner4 from "figma:asset/e715b3dc3411df89dd7af7d678e9eb46b1b0116e.png";
import faqBanner5 from "figma:asset/f8e05477843c8512deb56092989eb2f98f56c84b.png";
import faqradarlove from "../assets/Banner37.jpg";
import faqradarlove2 from "../assets/Banner5.jpg";
import faqradarlove3 from "../assets/Banner11.jpg";
import faqradarlove4 from "../assets/Banner12.jpg";
import faqradarlove5 from "../assets/Banner8.jpg";
import faqradarlove6 from "../assets/Banner13.jpg";

interface FAQPageProps {
  onNavigate: (page: 'home' | 'about' | 'learnmore' | 'diagnostic' | 'privacy' | 'terms' | 'history' | 'profile' | 'contact' | 'faq' | 'support-links' | 'login') => void;
}

export function FAQPage({ onNavigate }: FAQPageProps) {
  // Array de perguntas frequentes organizadas por categoria
  const faqData = [
    {
      category: "Login e Cadastro",
      questions: [
        {
          question: "Por que devo criar uma conta no RADAR?",
          answer: "Criar uma conta garante que todo o seu histórico de diagnósticos, anotações e dados dos formulários Likert fiquem salvos de forma segura e vinculados à sua conta. Assim, você pode acessar suas informações de qualquer dispositivo e acompanhar a evolução do atendimento das pessoas assistidas ao longo do tempo. Sem uma conta, os dados podem se perder quando você limpar o navegador."
        },
        {
          question: "Posso usar a plataforma sem criar uma conta?",
          answer: "Sim! Você pode utilizar o formulário Likert e todas as funcionalidades da plataforma sem fazer login ou cadastro. No entanto, é importante destacar que, sem uma conta, as informações e interações realizadas no site poderão se perder com o tempo, já que não haverá um meio de salvá-las permanentemente."
        },
        {
          question: "Como faço para criar uma conta?",
          answer: "Clique no botão 'Login' ou no ícone de perfil no menu superior. Em seguida, selecione a opção 'Criar nova conta' e preencha os dados solicitados: nome, data de nascimento, e-mail, senha e confirmação de senha. Após o cadastro, você já pode fazer login e começar a usar a plataforma com seus dados salvos."
        },
        {
          question: "Meus dados estão seguros?",
          answer: "Sim! A plataforma RADAR foi desenvolvida seguindo as melhores práticas de segurança e em conformidade com a Lei Geral de Proteção de Dados (LGPD). Seus dados pessoais são criptografados e utilizados apenas para melhorar sua experiência na plataforma. Não coletamos informações pessoais identificáveis (PII) das pessoas em situação de rua que você atende - apenas dados agregados para análise estatística."
        }
      ]
    },
    {
      category: "Uso de Dados e Privacidade",
      questions: [
        {
          question: "Quais dados são coletados pela plataforma?",
          answer: "A plataforma coleta apenas os dados necessários para seu funcionamento: informações de cadastro do voluntário (nome, e-mail, data de nascimento), respostas dos formulários Likert, apelidos/identificadores das pessoas atendidas e anotações feitas por você. Não coletamos dados pessoais sensíveis das pessoas em situação de rua."
        },
        {
          question: "Como meus dados são utilizados?",
          answer: "Seus dados são utilizados exclusivamente para: (1) permitir seu acesso à plataforma, (2) salvar seu histórico de diagnósticos, (3) gerar gráficos e estatísticas sobre o atendimento, (4) melhorar a experiência do usuário. Nunca compartilhamos ou vendemos seus dados para terceiros."
        },
        {
          question: "Posso exportar ou deletar meus dados?",
          answer: "Sim! Você pode exportar todos os seus dados em formato PDF ou JSON através da página de Histórico e Gráficos. Além disso, você tem o direito de solicitar a exclusão de todos os seus dados através da página de Contato ou diretamente nas configurações do seu perfil."
        },
        {
          question: "A plataforma RADAR é adequada para coleta de dados sensíveis?",
          answer: "Não. A plataforma RADAR não é projetada para coletar ou armazenar informações pessoais identificáveis (PII) ou dados sensíveis das pessoas em situação de rua. Use apenas apelidos ou identificadores gerais, nunca CPF, RG ou outras informações sensíveis."
        }
      ]
    },
    {
      category: "Funcionalidades da Plataforma",
      questions: [
        {
          question: "O que é o formulário Likert?",
          answer: "O formulário Likert é uma ferramenta de diagnóstico que avalia três dimensões essenciais do atendimento: (1) Assistência social e segurança alimentar, (2) Higiene e Saúde, (3) Educação, cultura, esporte e lazer. Com base nas respostas, a plataforma identifica a dimensão prioritária e sugere ações práticas para o atendimento."
        },
        {
          question: "Como funciona o sistema de apelidos?",
          answer: "O campo de apelido/identificador permite que você acompanhe a evolução de uma mesma pessoa ao longo do tempo. Por exemplo, você pode usar 'Bob' ou 'Maria' como identificador. Assim, quando fizer novos diagnósticos dessa pessoa, poderá comparar os resultados anteriores e verificar a evolução do atendimento."
        },
        {
          question: "Posso fazer anotações personalizadas?",
          answer: "Sim! Cada formulário possui um bloco de notas onde você pode fazer observações importantes sobre o atendimento. Essas anotações ficam salvas junto com o diagnóstico e podem ser editadas a qualquer momento na página de Histórico e Gráficos."
        },
        {
          question: "Como vejo o histórico de atendimentos?",
          answer: "Acesse a página 'Histórico e Gráficos' através do rodapé ou do menu. Lá você encontrará todos os formulários realizados, organizados por ordem alfabética de apelidos, com acesso às respostas, feedbacks, orientações e anotações de cada diagnóstico."
        },
        {
          question: "Posso exportar os resultados?",
          answer: "Sim! Na página de Histórico e Gráficos, você pode exportar cada formulário separadamente em formato PDF (ideal para impressão) ou JSON (para análise de dados). Basta clicar no botão de exportação ao lado de cada diagnóstico."
        }
      ]
    },
    {
      category: "Dúvidas Gerais",
      questions: [
        {
          question: "Quem pode usar a plataforma RADAR?",
          answer: "A plataforma foi desenvolvida para apoiar organizações sociais, coletivos, voluntários e profissionais que atuam diretamente com a população em situação de rua. Qualquer pessoa envolvida com ações de assistência social pode utilizar a ferramenta gratuitamente."
        },
        {
          question: "A plataforma é gratuita?",
          answer: "Sim! A plataforma RADAR é 100% gratuita e de código aberto. Foi desenvolvida como uma tecnologia social para promover inclusão e cidadania."
        },
        {
          question: "Como entro em contato com o suporte?",
          answer: "Você pode entrar em contato através da página de Contato ou enviando um e-mail para projetoradardigital@gmail.com. Teremos prazer em ajudar com dúvidas, sugestões ou problemas técnicos."
        },
        {
          question: "A plataforma funciona offline?",
          answer: "Não. A plataforma RADAR requer conexão com a internet para funcionar corretamente, especialmente para salvar dados e sincronizar informações entre dispositivos quando você está logado."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E9E9E9] to-white dark:from-gray-900 dark:to-gray-800 pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#F28C38] to-[#E1B12C] rounded-2xl mb-6 shadow-lg">
            <HelpCircle className="text-white" size={40} />
          </div>
          
          <h1 className="text-4xl md:text-5xl text-[#204E4A] dark:text-white mb-4">
            Perguntas Frequentes
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Tire suas dúvidas sobre a plataforma RADAR, login, uso de dados e funcionalidades.
          </p>

          {/* Carrossel de banners informativos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8"
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
                      src={faqBanner1}
                      alt="FAQ - Perguntas Frequentes com Flori"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={faqBanner2}
                      alt="Dúvidas? A gente explica! Bem-vindo à nossa área de perguntas frequentes"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={faqBanner3}
                      alt="Dúvidas? A gente explica! Bem-vindo à nossa área de perguntas frequentes"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={faqBanner4}
                      alt="Dúvidas? A gente explica! Bem-vindo à nossa área de perguntas frequentes"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={faqBanner5}
                      alt="Dúvidas? A gente explica! Bem-vindo à nossa área de perguntas frequentes"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </motion.div>
        </motion.div>

        {/* Acordeão com as perguntas frequentes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border-2 border-[#F28C38]/20">
              <h2 className="text-2xl text-[#204E4A] dark:text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-[#F28C38] rounded-lg flex items-center justify-center text-white">
                  {categoryIndex + 1}
                </span>
                {category.category}
              </h2>
              
              <Accordion type="single" collapsible className="space-y-2">
                {category.questions.map((item, questionIndex) => (
                  <AccordionItem 
                    key={questionIndex} 
                    value={`item-${categoryIndex}-${questionIndex}`}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <AccordionTrigger className="text-left text-[#204E4A] dark:text-white hover:text-[#F28C38] dark:hover:text-[#F28C38] transition-colors">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-gradient-to-br from-[#204E4A] to-[#2E6A9D] rounded-2xl shadow-xl p-8 md:p-12 text-center text-white"
        >
          <h3 className="text-2xl md:text-3xl mb-4">
            Ainda tem dúvidas?
          </h3>
          <p className="text-lg mb-6 text-white/90 max-w-2xl mx-auto">
            Entre em contato conosco através da página de Contato. Estamos aqui para ajudar!
          </p>
          <Button
            onClick={() => onNavigate('contact')}
            size="lg"
            className="bg-[#F28C38] hover:bg-[#E1B12C] text-white shadow-lg"
          >
            Falar com o Suporte
          </Button>
</motion.div>

{/* Carrossel de banners informativos */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.3 }}
  className="mt-8"
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
            src={faqradarlove}
            alt="FAQ - Perguntas Frequentes com Flori"
            className="w-full h-auto object-cover"
          />
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            src={faqradarlove2}
            alt="Dúvidas? A gente explica! Bem-vindo à nossa área de perguntas frequentes"
            className="w-full h-auto object-cover"
          />
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            src={faqradarlove3}
            alt="Dúvidas? A gente explica! Bem-vindo à nossa área de perguntas frequentes"
            className="w-full h-auto object-cover"
          />
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            src={faqradarlove4}
            alt="Dúvidas? A gente explica! Bem-vindo à nossa área de perguntas frequentes"
            className="w-full h-auto object-cover"
          />
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            src={faqradarlove5}
            alt="Dúvidas? A gente explica! Bem-vindo à nossa área de perguntas frequentes"
            className="w-full h-auto object-cover"
          />
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            src={faqradarlove6}
            alt="Dúvidas? A gente explica! Bem-vindo à nossa área de perguntas frequentes"
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
    </div>
  );
}