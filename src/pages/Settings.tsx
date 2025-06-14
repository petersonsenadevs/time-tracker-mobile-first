
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { userService, UpdateEmailData, ChangePasswordData } from '@/services/userService';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Mail, Lock, Trash2, LogOut, Settings, Bell, Shield, Globe, Palette, Database } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import BottomNavBar from '@/components/BottomNavBar';

const Settings = () => {
  const { token, logout } = useAuth();
  const [emailForm, setEmailForm] = useState({ email: '' });
  const [passwordForm, setPasswordForm] = useState({
    old_password: '',
    new_password: '',
    password_confirmation: ''
  });

  // Obtener información del usuario desde la API
  const { data: userInfo, refetch, isLoading } = useQuery({
    queryKey: ['user', token],
    queryFn: () => userService.showUser(token!),
    enabled: !!token,
  });

  // Mutación para actualizar email
  const updateEmailMutation = useMutation({
    mutationFn: (data: UpdateEmailData) => userService.updateEmail(data, token!),
    onSuccess: (response) => {
      toast.success(response.message);
      setEmailForm({ email: '' });
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Mutación para cambiar contraseña
  const changePasswordMutation = useMutation({
    mutationFn: (data: ChangePasswordData) => userService.changePassword(data, token!),
    onSuccess: (response) => {
      toast.success(response.message);
      setPasswordForm({
        old_password: '',
        new_password: '',
        password_confirmation: ''
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Mutación para eliminar usuario
  const deleteUserMutation = useMutation({
    mutationFn: () => userService.deleteUser(token!),
    onSuccess: (response) => {
      toast.success(response.message);
      logout();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailForm.email) {
      toast.error('Por favor, ingresa un email válido');
      return;
    }
    updateEmailMutation.mutate(emailForm);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.new_password !== passwordForm.password_confirmation) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    
    if (passwordForm.new_password.length < 8) {
      toast.error('La nueva contraseña debe tener al menos 8 caracteres');
      return;
    }
    
    changePasswordMutation.mutate(passwordForm);
  };

  // Usar los datos del endpoint user/show
  const currentUser = userInfo?.user;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Cargando configuración...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400">Error al cargar la información del usuario</p>
          <Button onClick={() => refetch()} className="mt-4 bg-teal-500 hover:bg-teal-600 text-black">
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  const settingsCategories = [
    {
      title: "Perfil y Cuenta",
      icon: User,
      items: [
        { name: "Información Personal", description: "Gestiona tu información básica" },
        { name: "Actualizar Email", description: "Cambia tu dirección de correo" },
        { name: "Cambiar Contraseña", description: "Actualiza tu contraseña" }
      ]
    },
    {
      title: "Notificaciones",
      icon: Bell,
      items: [
        { name: "Notificaciones Push", description: "Configurar alertas en tiempo real" },
        { name: "Email Notifications", description: "Gestionar notificaciones por correo" },
        { name: "Recordatorios", description: "Configurar recordatorios automáticos" }
      ]
    },
    {
      title: "Seguridad y Privacidad",
      icon: Shield,
      items: [
        { name: "Autenticación de dos factores", description: "Añadir una capa extra de seguridad" },
        { name: "Sesiones Activas", description: "Ver y gestionar dispositivos conectados" },
        { name: "Permisos de Aplicación", description: "Controlar acceso a datos" }
      ]
    },
    {
      title: "Personalización",
      icon: Palette,
      items: [
        { name: "Tema de la Aplicación", description: "Cambiar entre modo oscuro/claro" },
        { name: "Idioma", description: "Seleccionar idioma preferido" },
        { name: "Formato de Fecha", description: "Configurar formato de fechas" }
      ]
    },
    {
      title: "Datos y Privacidad",
      icon: Database,
      items: [
        { name: "Exportar Datos", description: "Descargar una copia de tus datos" },
        { name: "Eliminar Datos", description: "Solicitar eliminación de información" },
        { name: "Políticas de Privacidad", description: "Revisar términos y condiciones" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-20 lg:pb-8">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-teal-500/20 rounded-xl">
            <Settings className="h-8 w-8 text-teal-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Configuración</h1>
            <p className="text-gray-400">Gestiona tu cuenta y preferencias</p>
          </div>
        </div>

        {/* Settings Categories */}
        <div className="grid gap-6 mb-8">
          {settingsCategories.map((category, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <category.icon className="h-5 w-5 text-teal-400" />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors cursor-pointer">
                      <div>
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-teal-400 hover:text-teal-300">
                        Configurar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Información del Usuario */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <User className="h-5 w-5 text-teal-400" />
                Información Personal
              </CardTitle>
              <CardDescription>
                Tu información básica de perfil
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-300">ID de Usuario</Label>
                <p className="text-white font-medium font-mono text-sm">{currentUser.id}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-300">Email</Label>
                <p className="text-white font-medium">{currentUser.email}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-300">Rol</Label>
                <p className="text-white font-medium capitalize">
                  {currentUser.role === 'employee' ? 'Empleado' : currentUser.role}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actualizar Email */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Mail className="h-5 w-5 text-teal-400" />
                Actualizar Email
              </CardTitle>
              <CardDescription>
                Cambia tu dirección de correo electrónico
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-gray-300">Nuevo Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={emailForm.email}
                    onChange={(e) => setEmailForm({ email: e.target.value })}
                    placeholder="nuevo@email.com"
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-black"
                  disabled={updateEmailMutation.isPending}
                >
                  {updateEmailMutation.isPending ? 'Actualizando...' : 'Actualizar Email'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Cambiar Contraseña */}
          <Card className="bg-gray-900/50 border-gray-700 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Lock className="h-5 w-5 text-teal-400" />
                Cambiar Contraseña
              </CardTitle>
              <CardDescription>
                Actualiza tu contraseña para mantener tu cuenta segura
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="grid gap-4 lg:grid-cols-3">
                <div>
                  <Label htmlFor="old_password" className="text-gray-300">Contraseña Actual</Label>
                  <Input
                    id="old_password"
                    type="password"
                    value={passwordForm.old_password}
                    onChange={(e) => setPasswordForm({ ...passwordForm, old_password: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="new_password" className="text-gray-300">Nueva Contraseña</Label>
                  <Input
                    id="new_password"
                    type="password"
                    value={passwordForm.new_password}
                    onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                    minLength={8}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password_confirmation" className="text-gray-300">Confirmar Contraseña</Label>
                  <Input
                    id="password_confirmation"
                    type="password"
                    value={passwordForm.password_confirmation}
                    onChange={(e) => setPasswordForm({ ...passwordForm, password_confirmation: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                    minLength={8}
                    required
                  />
                </div>
                <div className="lg:col-span-3">
                  <Button
                    type="submit"
                    className="w-full bg-teal-500 hover:bg-teal-600 text-black"
                    disabled={changePasswordMutation.isPending}
                  >
                    {changePasswordMutation.isPending ? 'Cambiando...' : 'Cambiar Contraseña'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Acciones Peligrosas */}
          <Card className="bg-gray-900/50 border-red-900/50 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <Trash2 className="h-5 w-5" />
                Zona Peligrosa
              </CardTitle>
              <CardDescription>
                Acciones irreversibles que afectarán tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator className="border-gray-700" />
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={logout}
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="flex-1">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar Cuenta
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-gray-900 border-gray-700">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-red-400">
                        ¿Estás completamente seguro?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-300">
                        Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta
                        y removerá todos tus datos de nuestros servidores.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-gray-800 border-gray-600 text-gray-300">
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteUserMutation.mutate()}
                        className="bg-red-600 hover:bg-red-700"
                        disabled={deleteUserMutation.isPending}
                      >
                        {deleteUserMutation.isPending ? 'Eliminando...' : 'Sí, eliminar cuenta'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
};

export default Settings;
