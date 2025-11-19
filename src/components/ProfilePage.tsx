/**
 * Componente: ProfilePage (Página de Perfil do Usuário)
 * 
 * Esta página exibe e gerencia o perfil do usuário voluntário.
 * Integrado com sistema de login/cadastro.
 */

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { BarChart3, User, Mail, MapPin, Calendar, Briefcase, Edit, Save, X, Camera, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner@2.0.3";

interface ProfilePageProps {
  onNavigate: (page: 'home' | 'about' | 'learnmore' | 'diagnostic' | 'privacy' | 'terms' | 'history' | 'profile' | 'contact' | 'faq' | 'support-links' | 'login') => void;
  currentUser?: any;
  onLogout?: () => void;
}

interface DiagnosticResult {
  date: string;
  timestamp: number;
  answers: Record<number, number>;
  scores: {
    social: number;
    health: number;
    education: number;
  };
  priorityDimension: 'social' | 'health' | 'education';
  rating?: number;
}

interface Activity {
  id: string;
  type: 'profile_update' | 'photo_change' | 'photo_remove' | 'diagnostic';
  description: string;
  date: string;
  timestamp: number;
  icon: string;
}

export function ProfilePage({ onNavigate, currentUser, onLogout }: ProfilePageProps) {
  // User data state with localStorage persistence
  const [userData, setUserData] = useState({
    name: "Maria Silva Santos",
    email: "maria.silva@exemplo.com",
    volunteerType: "ONG - Assistência Social",
    location: "Rio de Janeiro, RJ",
    registrationDate: "15 de Janeiro, 2025",
    birthdate: "",
    about: "Acredito que toda pessoa merece acolhimento, dignidade e escuta. Estou aqui para fazer a diferença na vida de quem mais precisa. Trabalho há 5 anos com população em situação de rua e cada história me motiva a continuar."
  });

  // Profile photo state
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Editable statistics with localStorage persistence
  const [diagnosticsCount, setDiagnosticsCount] = useState<number>(0);
  const [evaluationsCount, setEvaluationsCount] = useState<number>(0);
  const [yearsActive, setYearsActive] = useState<number>(0);

  // Dialog states
  const [isDiagnosticsDialogOpen, setIsDiagnosticsDialogOpen] = useState(false);
  const [isYearsDialogOpen, setIsYearsDialogOpen] = useState(false);
  const [isUserInfoDialogOpen, setIsUserInfoDialogOpen] = useState(false);
  const [isAboutDialogOpen, setIsAboutDialogOpen] = useState(false);
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] = useState(false);

  // Temporary values for editing
  const [tempDiagnostics, setTempDiagnostics] = useState<string>("");
  const [tempYears, setTempYears] = useState<string>("");
  const [tempUserData, setTempUserData] = useState(userData);
  const [tempAbout, setTempAbout] = useState("");

  // Activities state
  const [activities, setActivities] = useState<Activity[]>([]);

  // Add activity to history
  const addActivity = (type: Activity['type'], description: string, icon: string) => {
    const newActivity: Activity = {
      id: Date.now().toString() + Math.random(),
      type,
      description,
      date: new Date().toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      }),
      timestamp: Date.now(),
      icon
    };

    const currentActivities = JSON.parse(localStorage.getItem('radar-activities') || '[]');
    const updatedActivities = [newActivity, ...currentActivities].slice(0, 20);
    localStorage.setItem('radar-activities', JSON.stringify(updatedActivities));
    setActivities(updatedActivities);
  };

  // Load data from localStorage on mount
  useEffect(() => {
    // Load profile photo
    const savedPhoto = localStorage.getItem('radar-profile-photo');
    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    }

    // Load user profile data - INTEGRAÇÃO COM LOGIN
    if (currentUser) {
      const usersJson = localStorage.getItem('radar-users');
      const users = usersJson ? JSON.parse(usersJson) : [];
      const user = users.find((u: any) => u.email === currentUser.email);
      
      if (user) {
        const registrationDate = new Date(user.createdAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        });

        setUserData({
          name: user.name || "Usuário",
          email: user.email,
          volunteerType: userData.volunteerType,
          location: userData.location,
          registrationDate: registrationDate,
          birthdate: user.birthdate || "",
          about: userData.about
        });
      }
    } else {
      // Load saved user data if not logged in
      const savedUserData = localStorage.getItem('radar-profile-user-data');
      if (savedUserData) {
        try {
          const parsedUserData = JSON.parse(savedUserData);
          setUserData(parsedUserData);
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }

    // Load editable stats
    const savedDiagnostics = localStorage.getItem('radar-profile-diagnostics');
    const savedYears = localStorage.getItem('radar-profile-years');

    if (savedDiagnostics) setDiagnosticsCount(parseInt(savedDiagnostics));
    if (savedYears) setYearsActive(parseInt(savedYears));

    // Load evaluations count from diagnostic history (auto-calculated)
    const historyJson = localStorage.getItem('radar-diagnostic-history');
    if (historyJson) {
      try {
        const parsedHistory: DiagnosticResult[] = JSON.parse(historyJson);
        setEvaluationsCount(parsedHistory.length);
      } catch (error) {
        console.error('Error parsing history:', error);
        setEvaluationsCount(0);
      }
    }

    // Load activities
    const savedActivities = localStorage.getItem('radar-activities');
    if (savedActivities) {
      try {
        const parsedActivities = JSON.parse(savedActivities);
        setActivities(parsedActivities);
      } catch (error) {
        console.error('Error parsing activities:', error);
      }
    }
  }, [currentUser]);

  // Save diagnostics
  const handleSaveDiagnostics = () => {
    const value = parseInt(tempDiagnostics);
    if (!isNaN(value) && value >= 0) {
      setDiagnosticsCount(value);
      localStorage.setItem('radar-profile-diagnostics', value.toString());
      setIsDiagnosticsDialogOpen(false);
      toast.success('Estatísticas atualizadas!');
      addActivity('profile_update', 'Atualizou estatísticas de diagnósticos', '📊');
    } else {
      toast.error('Por favor, insira um número válido');
    }
  };

  // Save years active
  const handleSaveYears = () => {
    const value = parseInt(tempYears);
    if (!isNaN(value) && value >= 0) {
      setYearsActive(value);
      localStorage.setItem('radar-profile-years', value.toString());
      setIsYearsDialogOpen(false);
      toast.success('Estatísticas atualizadas!');
      addActivity('profile_update', 'Atualizou tempo de atuação', '⏱️');
    } else {
      toast.error('Por favor, insira um número válido');
    }
  };

  // Save user info
  const handleSaveUserInfo = () => {
    if (!tempUserData.name || !tempUserData.email) {
      toast.error('Nome e e-mail são obrigatórios');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tempUserData.email)) {
      toast.error('Por favor, insira um e-mail válido');
      return;
    }

    setUserData(tempUserData);
    localStorage.setItem('radar-profile-user-data', JSON.stringify(tempUserData));
    
    // Update in users database if logged in
    if (currentUser) {
      const usersJson = localStorage.getItem('radar-users');
      const users = usersJson ? JSON.parse(usersJson) : [];
      const userIndex = users.findIndex((u: any) => u.email === currentUser.email);
      
      if (userIndex !== -1) {
        users[userIndex] = {
          ...users[userIndex],
          name: tempUserData.name,
          email: tempUserData.email,
          birthdate: tempUserData.birthdate
        };
        localStorage.setItem('radar-users', JSON.stringify(users));
        
        const updatedCurrentUser = {
          name: tempUserData.name,
          email: tempUserData.email,
          birthdate: tempUserData.birthdate
        };
        localStorage.setItem('radar-current-user', JSON.stringify(updatedCurrentUser));
      }
    }

    setIsUserInfoDialogOpen(false);
    toast.success('Informações atualizadas!');
    addActivity('profile_update', 'Atualizou informações pessoais', '✏️');
  };

  // Save about section
  const handleSaveAbout = () => {
    setUserData({ ...userData, about: tempAbout });
    localStorage.setItem('radar-profile-user-data', JSON.stringify({ ...userData, about: tempAbout }));
    setIsAboutDialogOpen(false);
    toast.success('Sobre atualizado!');
    addActivity('profile_update', 'Atualizou seção "Sobre"', '📝');
  };

  // Handle photo upload
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Por favor, selecione uma imagem válida');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error('A imagem deve ter no máximo 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfilePhoto(result);
        localStorage.setItem('radar-profile-photo', result);
        setIsPhotoDialogOpen(false);
        toast.success('Foto de perfil atualizada!');
        addActivity('photo_change', 'Alterou foto de perfil', '📸');
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove photo
  const handleRemovePhoto = () => {
    setProfilePhoto("");
    localStorage.removeItem('radar-profile-photo');
    setIsPhotoDialogOpen(false);
    toast.success('Foto de perfil removida');
    addActivity('photo_remove', 'Removeu foto de perfil', '🗑️');
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Delete all user data
  const handleDeleteAccount = () => {
    // Remove all user-related data from localStorage
    localStorage.removeItem('radar-profile-photo');
    localStorage.removeItem('radar-profile-user-data');
    localStorage.removeItem('radar-profile-diagnostics');
    localStorage.removeItem('radar-profile-years');
    localStorage.removeItem('radar-diagnostic-history');
    localStorage.removeItem('radar-activities');
    
    // Remove user from users database if logged in
    if (currentUser) {
      const usersJson = localStorage.getItem('radar-users');
      if (usersJson) {
        const users = JSON.parse(usersJson);
        const updatedUsers = users.filter((u: any) => u.email !== currentUser.email);
        localStorage.setItem('radar-users', JSON.stringify(updatedUsers));
      }
      localStorage.removeItem('radar-current-user');
    }
    
    setIsDeleteAccountDialogOpen(false);
    toast.success('Todos os seus dados foram deletados com sucesso');
    
    // Logout immediately after deleting data
    setTimeout(() => {
      if (onLogout) {
        onLogout();
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E9E9E9] to-white dark:from-gray-900 dark:to-gray-800 pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-2 border-[#F28C38]/20">
              {/* Profile Photo */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative group">
                  <Avatar className="w-32 h-32 border-4 border-[#F28C38] shadow-lg">
                    <AvatarImage src={profilePhoto} alt={userData.name} />
                    <AvatarFallback className="bg-gradient-to-br from-[#F28C38] to-[#E1B12C] text-white text-3xl">
                      {getInitials(userData.name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsPhotoDialogOpen(true)}
                    className="absolute bottom-0 right-0 bg-[#F28C38] hover:bg-[#E1B12C] text-white p-2 rounded-full shadow-lg transition-colors"
                  >
                    <Camera size={20} />
                  </motion.button>
                </div>

                <h2 className="text-2xl text-[#204E4A] dark:text-white mt-4 text-center">
                  {userData.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  {userData.volunteerType}
                </p>
              </div>

              {/* User Information */}
              <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg text-[#204E4A] dark:text-white">
                    Informações do Usuário
                  </h3>
                  <Button
                    onClick={() => {
                      setTempUserData(userData);
                      setIsUserInfoDialogOpen(true);
                    }}
                    variant="ghost"
                    size="sm"
                    className="text-[#F28C38] hover:text-[#E1B12C]"
                  >
                    <Edit size={16} />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <User size={18} className="text-[#F28C38]" />
                    <span className="text-sm">{userData.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <Mail size={18} className="text-[#F28C38]" />
                    <span className="text-sm">{userData.email}</span>
                  </div>
                  {userData.birthdate && (
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <Calendar size={18} className="text-[#F28C38]" />
                      <span className="text-sm">
                        Nascimento: {new Date(userData.birthdate).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <MapPin size={18} className="text-[#2E6A9D]" />
                    <span className="text-sm">{userData.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <Briefcase size={18} className="text-[#2E6A9D]" />
                    <span className="text-sm">{userData.volunteerType}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <Calendar size={18} className="text-[#8C6B4E]" />
                    <span className="text-sm">Desde {userData.registrationDate}</span>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-300 hover:border-red-400"
                >
                  Sair da Conta
                </Button>
                
                <Button
                  onClick={() => setIsDeleteAccountDialogOpen(true)}
                  variant="outline"
                  className="w-full text-red-700 hover:text-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 border-red-400 hover:border-red-500"
                >
                  Deletar Todos os Meus Dados
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Right Column - Statistics and Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* About Section */}
            <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-2 border-[#8C6B4E]/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl text-[#204E4A] dark:text-white">
                  Sobre
                </h3>
                <Button
                  onClick={() => {
                    setTempAbout(userData.about);
                    setIsAboutDialogOpen(true);
                  }}
                  variant="ghost"
                  size="sm"
                  className="text-[#8C6B4E] hover:text-[#6B5438]"
                >
                  <Edit size={16} />
                </Button>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {userData.about}
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Dialogs */}
        <Dialog open={isDiagnosticsDialogOpen} onOpenChange={setIsDiagnosticsDialogOpen}>
          <DialogContent className="dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-[#204E4A] dark:text-white">Editar Diagnósticos</DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                Atualize o número de diagnósticos realizados
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="diagnostics" className="dark:text-white">Número de Diagnósticos</Label>
                <Input
                  id="diagnostics"
                  type="number"
                  min="0"
                  value={tempDiagnostics}
                  onChange={(e) => setTempDiagnostics(e.target.value)}
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDiagnosticsDialogOpen(false)}>
                <X size={16} className="mr-2" />
                Cancelar
              </Button>
              <Button onClick={handleSaveDiagnostics} className="bg-[#F28C38] hover:bg-[#E1B12C]">
                <Save size={16} className="mr-2" />
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isYearsDialogOpen} onOpenChange={setIsYearsDialogOpen}>
          <DialogContent className="dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-[#204E4A] dark:text-white">Editar Anos Ativos</DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                Atualize seu tempo de atuação
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="years" className="dark:text-white">Anos de Atuação</Label>
                <Input
                  id="years"
                  type="number"
                  min="0"
                  value={tempYears}
                  onChange={(e) => setTempYears(e.target.value)}
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsYearsDialogOpen(false)}>
                <X size={16} className="mr-2" />
                Cancelar
              </Button>
              <Button onClick={handleSaveYears} className="bg-[#E1B12C] hover:bg-[#8C6B4E]">
                <Save size={16} className="mr-2" />
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isUserInfoDialogOpen} onOpenChange={setIsUserInfoDialogOpen}>
          <DialogContent className="dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-[#204E4A] dark:text-white">Editar Informações</DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                Atualize suas informações pessoais
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name" className="dark:text-white">Nome Completo</Label>
                <Input
                  id="edit-name"
                  value={tempUserData.name}
                  onChange={(e) => setTempUserData({...tempUserData, name: e.target.value})}
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email" className="dark:text-white">E-mail</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={tempUserData.email}
                  onChange={(e) => setTempUserData({...tempUserData, email: e.target.value})}
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-birthdate" className="dark:text-white">Data de Nascimento</Label>
                <Input
                  id="edit-birthdate"
                  type="date"
                  value={tempUserData.birthdate}
                  onChange={(e) => setTempUserData({...tempUserData, birthdate: e.target.value})}
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-location" className="dark:text-white">Localização</Label>
                <Input
                  id="edit-location"
                  value={tempUserData.location}
                  onChange={(e) => setTempUserData({...tempUserData, location: e.target.value})}
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-type" className="dark:text-white">Tipo de Voluntário</Label>
                <Select
                  value={tempUserData.volunteerType}
                  onValueChange={(value) => setTempUserData({...tempUserData, volunteerType: value})}
                >
                  <SelectTrigger className="dark:bg-gray-700 dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ONG - Assistência Social">ONG - Assistência Social</SelectItem>
                    <SelectItem value="Profissional da Saúde">Profissional da Saúde</SelectItem>
                    <SelectItem value="Assistente Social">Assistente Social</SelectItem>
                    <SelectItem value="Gestor Público">Gestor Público</SelectItem>
                    <SelectItem value="Voluntário Individual">Voluntário Individual</SelectItem>
                    <SelectItem value="Estudante / Pesquisador">Estudante / Pesquisador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUserInfoDialogOpen(false)}>
                <X size={16} className="mr-2" />
                Cancelar
              </Button>
              <Button onClick={handleSaveUserInfo} className="bg-[#F28C38] hover:bg-[#E1B12C]">
                <Save size={16} className="mr-2" />
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isAboutDialogOpen} onOpenChange={setIsAboutDialogOpen}>
          <DialogContent className="dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-[#204E4A] dark:text-white">Editar Sobre</DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                Conte um pouco sobre você e sua motivação
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="about" className="dark:text-white">Sobre Você</Label>
                <textarea
                  id="about"
                  value={tempAbout}
                  onChange={(e) => setTempAbout(e.target.value)}
                  rows={6}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAboutDialogOpen(false)}>
                <X size={16} className="mr-2" />
                Cancelar
              </Button>
              <Button onClick={handleSaveAbout} className="bg-[#8C6B4E] hover:bg-[#6B5438]">
                <Save size={16} className="mr-2" />
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
          <DialogContent className="dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-[#204E4A] dark:text-white">Foto de Perfil</DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                Adicione ou remova sua foto de perfil
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#F28C38] hover:bg-[#E1B12C]"
                >
                  <Upload size={16} className="mr-2" />
                  Selecionar Foto
                </Button>
                {profilePhoto && (
                  <Button
                    onClick={handleRemovePhoto}
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <X size={16} className="mr-2" />
                    Remover Foto
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isDeleteAccountDialogOpen} onOpenChange={setIsDeleteAccountDialogOpen}>
          <DialogContent className="dark:bg-gray-800 border-2 border-red-500">
            <DialogHeader>
              <DialogTitle className="text-red-600 dark:text-red-500 text-xl">⚠️ Deletar Todos os Dados</DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                Esta ação é <strong className="text-red-600">IRREVERSÍVEL</strong> e deletará permanentemente:
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <X className="text-red-500" size={16} />
                  Todos os seus dados pessoais
                </li>
                <li className="flex items-center gap-2">
                  <X className="text-red-500" size={16} />
                  Histórico completo de diagnósticos
                </li>
                <li className="flex items-center gap-2">
                  <X className="text-red-500" size={16} />
                  Foto de perfil
                </li>
                <li className="flex items-center gap-2">
                  <X className="text-red-500" size={16} />
                  Todas as configurações e preferências
                </li>
                <li className="flex items-center gap-2">
                  <X className="text-red-500" size={16} />
                  Sua conta será removida do sistema
                </li>
              </ul>
              <p className="mt-6 text-red-600 dark:text-red-500">
                Você será deslogado imediatamente após a exclusão.
              </p>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteAccountDialogOpen(false)}
                className="border-gray-300"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleDeleteAccount} 
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Sim, Deletar Tudo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}