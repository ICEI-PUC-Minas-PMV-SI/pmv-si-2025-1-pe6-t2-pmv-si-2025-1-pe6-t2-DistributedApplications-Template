import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onRegisterClick: () => void;
}

const Login = ({ onLogin, onRegisterClick }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    
    if (!email || !password) {
      toast({
        title: "Erro",
        description: "Por favor preencha todos os campos",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    

    try {
      onLogin(email, password);
    } catch (error) {
      console.error("Erro de login: ", error);
      toast({
        title: "Falha no login",
        description: "Por favor verifique suas informações e tente novamente",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Bem-vindo de volta!</h1>
        <p className="text-sm text-muted-foreground">
          Insira suas informações para logar em sua conta
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input 
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Senha</Label>
            <a 
              href="#" 
              className="text-sm text-primary hover:underline"
              onClick={(e) => {
                e.preventDefault();
                alert("Password reset not implemented yet!");
              }}
            >
              Esqueceu sua senha?
            </a>
          </div>
          <Input 
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Sign in"}
        </Button>
      </form>
      
      <div className="text-center text-sm">
        <span className="text-muted-foreground">Não tem uma conta? </span>
        <a 
          href="#" 
          className="text-primary hover:underline"
          onClick={(e) => {
            e.preventDefault();
            onRegisterClick();
          }}
        >
          Sign up
        </a>
      </div>
    </div>
  );
};

export default Login;