/**
 * Componente: LoginPage (Página de Login e Cadastro)
 * 
 * Esta página permite que usuários façam login ou criem uma nova conta na plataforma RADAR.
 * 
 * Características:
 * - Formulário de login (e-mail/nome e senha)
 * - Formulário de cadastro (nome, data de nascimento, e-mail, senha e confirmação)
 * - Validação básica de campos
 * - Alternância entre modo login e cadastro
 * - Design responsivo e acessível
 * 
 * Nota: A lógica de autenticação atual usa localStorage. 
 * Futuramente será integrado com backend PHP/MySQL
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, LogIn, UserPlus, Eye, EyeOff, Mail, Lock, User, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner@2.0.3";

interface LoginPageProps {
  onNavigate: (page: 'home' | 'about' | 'learnmore' | 'diagnostic' | 'privacy' | 'terms' | 'history' | 'profile' | 'contact' | 'faq' | 'support-links' | 'login') => void;
  onLoginSuccess: (userData: any) => void;
}

export function LoginPage({ onNavigate, onLoginSuccess }: LoginPageProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estados do formulário de login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Estados do formulário de cadastro
  const [registerName, setRegisterName] = useState("");
  const [registerBirthdate, setRegisterBirthdate] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  /**
   * Função para lidar com o login
   * Valida credenciais e redireciona para o perfil
   */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!loginEmail || !loginPassword) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    // Buscar usuários cadastrados no localStorage
    const usersJson = localStorage.getItem('radar-users');
    const users = usersJson ? JSON.parse(usersJson) : [];

    // Verificar se existe um usuário com essas credenciais
    const user = users.find((u: any) => 
      (u.email.toLowerCase() === loginEmail.toLowerCase() || u.name.toLowerCase() === loginEmail.toLowerCase()) 
      && u.password === loginPassword
    );

    if (user) {
      // Login bem-sucedido
      const userData = {
        name: user.name,
        email: user.email,
        birthdate: user.birthdate,
        photo: user.photo || null
      };

      // Salvar usuário logado
      localStorage.setItem('radar-current-user', JSON.stringify(userData));

      // Registrar atividade de login
      const newActivity = {
        id: Date.now().toString() + Math.random(),
        type: 'login',
        description: 'Login realizado',
        date: new Date().toLocaleDateString('pt-BR', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric' 
        }),
        timestamp: Date.now(),
        icon: '🔐'
      };

      const currentActivities = JSON.parse(localStorage.getItem('radar-activities') || '[]');
      const updatedActivities = [newActivity, ...currentActivities].slice(0, 20);
      localStorage.setItem('radar-activities', JSON.stringify(updatedActivities));

      toast.success(`Bem-vindo(a), ${user.name}!`);
      onLoginSuccess(userData);
      onNavigate('profile');
    } else {
      toast.error("E-mail/nome ou senha incorretos");
    }
  };

  /**
   * Função para lidar com o cadastro
   * Valida dados e cria nova conta
   */
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!registerName || !registerBirthdate || !registerEmail || !registerPassword || !registerConfirmPassword) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    // Validar formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerEmail)) {
      toast.error("Por favor, insira um e-mail válido");
      return;
    }

    // Validar senhas
    if (registerPassword.length < 6) {
      toast.error("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    // Buscar usuários existentes
    const usersJson = localStorage.getItem('radar-users');
    const users = usersJson ? JSON.parse(usersJson) : [];

    // Verificar se e-mail já existe
    const emailExists = users.some((u: any) => u.email.toLowerCase() === registerEmail.toLowerCase());
    if (emailExists) {
      toast.error("Este e-mail já está cadastrado");
      return;
    }

    // Criar novo usuário
    const newUser = {
      id: Date.now().toString(),
      name: registerName,
      email: registerEmail,
      birthdate: registerBirthdate,
      password: registerPassword,
      createdAt: new Date().toISOString(),
      photo: null
    };

    // Adicionar aos usuários
    users.push(newUser);
    localStorage.setItem('radar-users', JSON.stringify(users));

    toast.success("Conta criada com sucesso! Faça login para continuar.");

    // Limpar formulário e mudar para modo login
    setRegisterName("");
    setRegisterBirthdate("");
    setRegisterEmail("");
    setRegisterPassword("");
    setRegisterConfirmPassword("");
    setMode('login');
    setLoginEmail(registerEmail);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#204E4A] via-[#2E6A9D] to-[#204E4A] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-md">
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
            className="gap-2 text-white hover:text-[#F28C38]"
          >
            <ChevronLeft size={20} />
            Voltar
          </Button>
        </motion.div>

        {/* Card de Login/Cadastro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-10"
        >
          {/* Cabeçalho com tabs */}
          <div className="flex items-center gap-4 mb-8 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 pb-4 text-center transition-all ${
                mode === 'login'
                  ? 'border-b-2 border-[#F28C38] text-[#F28C38]'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <LogIn size={20} />
                <span className="font-medium">Entrar</span>
              </div>
            </button>
            
            <button
              onClick={() => setMode('register')}
              className={`flex-1 pb-4 text-center transition-all ${
                mode === 'register'
                  ? 'border-b-2 border-[#F28C38] text-[#F28C38]'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <UserPlus size={20} />
                <span className="font-medium">Cadastrar</span>
              </div>
            </button>
          </div>

          <AnimatePresence mode="wait">
            {/* Formulário de Login */}
            {mode === 'login' && (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleLogin}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl text-[#204E4A] dark:text-white mb-2">
                    Bem-vindo de volta!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Faça login para acessar seu histórico e continuar seu trabalho.
                  </p>
                </div>

                {/* Campo E-mail/Nome */}
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-[#204E4A] dark:text-white">
                    E-mail ou Nome
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="login-email"
                      type="text"
                      placeholder="seu@email.com ou seu nome"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>

                {/* Campo Senha */}
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-[#204E4A] dark:text-white">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="pl-10 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Botão de Login */}
                <Button
                  type="submit"
                  className="w-full bg-[#F28C38] hover:bg-[#E1B12C] text-white"
                  size="lg"
                >
                  Entrar
                </Button>

                {/* Link para cadastro */}
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Não tem uma conta?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('register')}
                    className="text-[#F28C38] hover:underline"
                  >
                    Cadastre-se aqui
                  </button>
                </p>
              </motion.form>
            )}

            {/* Formulário de Cadastro */}
            {mode === 'register' && (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleRegister}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl text-[#204E4A] dark:text-white mb-2">
                    Crie sua conta
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Cadastre-se para salvar seu histórico e acompanhar o progresso.
                  </p>
                </div>

                {/* Campo Nome */}
                <div className="space-y-2">
                  <Label htmlFor="register-name" className="text-[#204E4A] dark:text-white">
                    Nome Completo
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Seu nome completo"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>

                {/* Campo Data de Nascimento */}
                <div className="space-y-2">
                  <Label htmlFor="register-birthdate" className="text-[#204E4A] dark:text-white">
                    Data de Nascimento
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="register-birthdate"
                      type="date"
                      value={registerBirthdate}
                      onChange={(e) => setRegisterBirthdate(e.target.value)}
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>

                {/* Campo E-mail */}
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-[#204E4A] dark:text-white">
                    E-mail
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>

                {/* Campo Senha */}
                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-[#204E4A] dark:text-white">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mínimo 6 caracteres"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="pl-10 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Campo Confirmar Senha */}
                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password" className="text-[#204E4A] dark:text-white">
                    Confirmar Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="register-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Digite a senha novamente"
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      className="pl-10 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Botão de Cadastro */}
                <Button
                  type="submit"
                  className="w-full bg-[#F28C38] hover:bg-[#E1B12C] text-white"
                  size="lg"
                >
                  Criar Conta
                </Button>

                {/* Link para login */}
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Já tem uma conta?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-[#F28C38] hover:underline"
                  >
                    Faça login aqui
                  </button>
                </p>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Aviso sobre uso sem login */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-4 bg-[#F28C38]/10 dark:bg-[#F28C38]/20 rounded-xl border-l-4 border-[#F28C38]"
          >
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Nota:</strong> Você pode usar a plataforma sem criar uma conta, mas seus dados 
              podem se perder. Recomendamos criar uma conta para salvar seu histórico com segurança.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
