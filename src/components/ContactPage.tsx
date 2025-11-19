import { useState } from "react";
import { motion } from "motion/react";
import { Mail, MessageSquare, User, ArrowLeft, Send, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card } from "./ui/card";
import { toast } from "sonner";
import mascotImage from "figma:asset/3f7263521873a313851066a02a5411d3a88dc44d.png";
import mascotRelaxed from "figma:asset/58bc0bc5abd8b94a3512b7012bdd11119b960698.png";

interface ContactPageProps {
  onNavigate: (page: 'home' | 'about' | 'learnmore' | 'diagnostic' | 'privacy' | 'terms' | 'history' | 'profile' | 'contact') => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userType: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação simples
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Campos obrigatórios", {
        description: "Por favor, preencha todos os campos obrigatórios."
      });
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Email inválido", {
        description: "Por favor, insira um endereço de email válido."
      });
      return;
    }

    // Simula envio do formulário
    toast.success("Mensagem enviada!", {
      description: "Obrigado pelo contato. Retornaremos em breve!"
    });

    // Limpa o formulário
    setFormData({
      name: "",
      email: "",
      userType: "",
      subject: "",
      message: ""
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const userTypes = [
    "Profissional de ONG",
    "Assistente Social",
    "Psicólogo(a)",
    "Educador(a) Social",
    "Gestor(a) Público",
    "Voluntário(a)",
    "Pesquisador(a)",
    "Estudante",
    "Outro"
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-[#E9E9E9]/30 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
            className="mb-6 text-[#204E4A] dark:text-white hover:bg-[#204E4A]/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Home
          </Button>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            {/* Mascote Tech9 - Estático */}
            <div className="flex-shrink-0">
              <img 
                src={mascotImage}
                alt="Tech9 - Mascote do Projeto RADAR"
                className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain drop-shadow-xl"
              />
            </div>

            {/* Texto */}
            <div className="text-center md:text-left max-w-2xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[#204E4A] dark:text-white mb-4"
              >
                Entre em Contato
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 dark:text-gray-300"
              >
                Estamos aqui para ouvir você. Envie suas dúvidas, sugestões ou feedback sobre o Projeto RAP.
              </motion.p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Formulário de Contato */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2"
          >
            <Card className="p-6 md:p-8 bg-white dark:bg-gray-800 shadow-xl rounded-2xl border-2 border-[#204E4A]/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#F28C38]/10 rounded-xl">
                  <MessageSquare className="h-6 w-6 text-[#F28C38]" />
                </div>
                <h2 className="text-[#204E4A] dark:text-white">
                  Formulário de Contato
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome */}
                <div>
                  <Label htmlFor="name" className="text-gray-700 dark:text-gray-200">
                    Nome Completo <span className="text-[#F28C38]">*</span>
                  </Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Digite seu nome"
                      className="pl-10 border-[#204E4A]/30 focus:border-[#2E6A9D] dark:bg-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">
                    Email <span className="text-[#F28C38]">*</span>
                  </Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="seu@email.com"
                      className="pl-10 border-[#204E4A]/30 focus:border-[#2E6A9D] dark:bg-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Tipo de Usuário */}
                <div>
                  <Label htmlFor="userType" className="text-gray-700 dark:text-gray-200">
                    Tipo de Usuário
                  </Label>
                  <Select value={formData.userType} onValueChange={(value) => handleChange('userType', value)}>
                    <SelectTrigger className="mt-2 border-[#204E4A]/30 focus:border-[#2E6A9D] dark:bg-gray-900 dark:text-white">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      {userTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Assunto */}
                <div>
                  <Label htmlFor="subject" className="text-gray-700 dark:text-gray-200">
                    Assunto
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    placeholder="Sobre o que você gostaria de falar?"
                    className="mt-2 border-[#204E4A]/30 focus:border-[#2E6A9D] dark:bg-gray-900 dark:text-white"
                  />
                </div>

                {/* Mensagem */}
                <div>
                  <Label htmlFor="message" className="text-gray-700 dark:text-gray-200">
                    Mensagem <span className="text-[#F28C38]">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Escreva sua mensagem aqui..."
                    rows={6}
                    className="mt-2 border-[#204E4A]/30 focus:border-[#2E6A9D] dark:bg-gray-900 dark:text-white resize-none"
                  />
                </div>

                {/* Botão de Enviar */}
                <Button
                  type="submit"
                  className="w-full bg-[#F28C38] hover:bg-[#F28C38]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Enviar Mensagem
                </Button>

                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                  <span className="text-[#F28C38]">*</span> Campos obrigatórios
                </p>
              </form>
            </Card>
          </motion.div>

          {/* Informações de Contato */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            {/* Email */}
            <Card className="p-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl border-2 border-[#2E6A9D]/20 hover:shadow-2xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#2E6A9D]/10 rounded-xl">
                  <Mail className="h-6 w-6 text-[#2E6A9D]" />
                </div>
                <div>
                  <h3 className="text-[#204E4A] dark:text-white mb-2">
                    Email
                  </h3>
                  <a 
                    href="mailto:contato@projetorap.org"
                    className="text-gray-600 dark:text-gray-300 hover:text-[#2E6A9D] dark:hover:text-[#2E6A9D] transition-colors"
                  >
                    projetoradardigital@gmail.com
                  </a>
                </div>
              </div>
            </Card>

            
            

            {/* Localização */}
            <Card className="p-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl border-2 border-[#E1B12C]/20 hover:shadow-2xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#E1B12C]/10 rounded-xl">
                  <MapPin className="h-6 w-6 text-[#E1B12C]" />
                </div>
                <div>
                  <h3 className="text-[#204E4A] dark:text-white mb-2">
                    Localização
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Rio de Janeiro, RJ<br />
                    Brasil
                  </p>
                </div>
              </div>
            </Card>

            {/* Horário de Atendimento */}
            <Card className="p-6 bg-gradient-to-br from-[#204E4A]/5 to-[#2E6A9D]/5 dark:from-gray-800 dark:to-gray-700 shadow-xl rounded-2xl border-2 border-[#204E4A]/20">
              <h3 className="text-[#204E4A] dark:text-white mb-4">
                Horário de Atendimento
              </h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <p>Segunda a Sexta</p>
                <p className="text-sm">9h às 18h</p>
              </div>
            </Card>

            {/* Mascote RAP Relaxado - Estático */}
            <div className="flex justify-center md:justify-end mt-8">
              <img 
                src={mascotRelaxed} 
                alt="RAP Mascote Relaxado" 
                className="w-48 h-auto object-contain opacity-90"
              />
            </div>
          </motion.div>
        </div>

        {/* Mensagem de Apoio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Card className="p-8 bg-gradient-to-r from-[#204E4A]/5 via-[#2E6A9D]/5 to-[#F28C38]/5 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 border-2 border-[#F28C38]/20">
            <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              <span className="text-[#F28C38]">💙</span> Sua voz é importante para nós. 
              Trabalhamos todos os dias para construir um futuro mais inclusivo e acolhedor 
              para a população em situação de rua. Juntos, fazemos a diferença!
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}