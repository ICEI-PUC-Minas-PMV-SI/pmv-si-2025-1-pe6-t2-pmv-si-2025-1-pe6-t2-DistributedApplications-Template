import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface RegisterProps {
  onRegister: (name: string, email: string, password: string) => void;
  onLoginClick: () => void;
}

const Register = ({ onRegister, onLoginClick }: RegisterProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    

    if (!name || !email || !password) {
      toast({
        title: "Erro",
        description: "Por favor preencha todos os campos",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    if (password.length < 6) {
      toast({
        title: "Erro",
        description: "A senha precisa ter pelo menos 6 caracteres",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    

    try {
      onRegister(name, email, password);
    } catch (error) {
      console.error("Erro de cadastro:", error);
      toast({
        title: "Erro de cadastro",
        description: "Por favor tente novamente com informações diferentes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Cria uma conta</h1>
        <p className="text-sm text-muted-foreground">
          Insira suas informações para criar uma conta
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input 
            id="name"
            placeholder="João Silva"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input 
            id="email"
            type="email"
            placeholder="nome@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input 
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="text-xs text-muted-foreground">
            A senha precisa ter pelo menos 6 caracteres
          </p>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Criando conta..." : "Criar conta"}
        </Button>
      </form>
      
      <div className="text-center text-sm">
        <span className="text-muted-foreground">Já tem uma conta? </span>
        <a 
          href="#" 
          className="text-primary hover:underline"
          onClick={(e) => {
            e.preventDefault();
            onLoginClick();
          }}
        >
          Sign in
        </a>
      </div>
    </div>
  );
};

export default Register;