import * as React from "react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { LogIn, X } from "lucide-react";
import { apiRequest } from "../lib/queryClient";
import { useToast } from "../hooks/use-toast";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [, setLocation] = useLocation();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const { toast } = useToast();

  const authMutation = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const endpoint = isRegisterMode ? "/api/auth/register" : "/api/auth/login";
      const response = await apiRequest("POST", endpoint, data);
      return response.json();
    },
    onSuccess: (data) => {
      // Save to localStorage if "remember me" is checked
      if (formData.remember) {
        localStorage.setItem("authUser", JSON.stringify({ 
          username: formData.username,
          loggedIn: true 
        }));
      } else {
        localStorage.removeItem("authUser");
      }
      toast({
        title: isRegisterMode ? "Cadastro realizado com sucesso!" : "Login realizado com sucesso!",
        description: "Redirecionando para o painel administrativo...",
      });
      onClose();
      setLocation("/admin");
    },
    onError: (error: any) => {
      toast({
        title: isRegisterMode ? "Erro no cadastro" : "Erro no login",
        description: isRegisterMode 
          ? "Falha ao criar conta. Verifique se o email já está em uso." 
          : "Credenciais inválidas. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authMutation.mutate({
      username: formData.username,
      password: formData.password,
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleModeSwitch = () => {
    setIsRegisterMode(!isRegisterMode);
    setFormData({
      username: "",
      password: "",
      remember: false,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {isRegisterMode ? "Cadastro Administrativo" : "Login Administrativo"}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              placeholder="seu-email@exemplo.com"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={formData.remember}
              onCheckedChange={(checked) => handleInputChange("remember", checked as boolean)}
            />
            <Label htmlFor="remember" className="text-sm">Lembrar de mim</Label>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-primary-800 hover:bg-primary-700"
            disabled={authMutation.isPending}
          >
            <LogIn className="mr-2 h-4 w-4" />
            {authMutation.isPending ? (isRegisterMode ? "Criando..." : "Entrando...") : (isRegisterMode ? "Criar Conta" : "Entrar")}
          </Button>
          
          <div className="text-center">
            <button 
              type="button"
              onClick={handleModeSwitch}
              className="text-sm text-primary-800 hover:text-primary-600"
            >
              {isRegisterMode ? "Já tem uma conta? Entre aqui" : "Não tem uma conta? Cadastre-se"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
