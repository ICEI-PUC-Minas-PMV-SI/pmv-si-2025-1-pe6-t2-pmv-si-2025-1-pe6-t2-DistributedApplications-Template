
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Menu, X, Bell, BookOpen, LogIn } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import AuthModal from './AuthModal';
import { motion } from 'framer-motion';

type NavItem = {
  name: string;
  href: string;
};

const navigation: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Explorar', href: '/explore' },
  { name: 'Estante', href: '/bookshelf' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  
  // Demo user state - replace with actual auth logic
  const [user, setUser] = useState<{name: string, avatar?: string} | null>(null);
  
  // Handle scroll event for header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 transition-all duration-300',
          isScrolled
            ? 'py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm'
            : 'py-5 bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="font-display text-xl font-semibold tracking-tight">
              SaveBook
            </span>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  location.pathname === item.href
                    ? 'text-primary'
                    : 'text-foreground/80 hover:text-foreground hover:bg-accent/50'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground">
              <Search className="h-5 w-5" />
            </Button>
            
            {/* Notifications - only show if logged in */}
            {user && (
              <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-white text-xs">
                  3
                </Badge>
              </Button>
            )}
            
            {/* Auth buttons */}
            {user ? (
              <div className="flex items-center space-x-3">
                <Avatar className="h-9 w-9 border border-border">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <Button 
                variant="default" 
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden sm:flex items-center shadow-sm"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Entrar
              </Button>
            )}
            
            {/* Mobile menu button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="py-6">
                    <Link to="/" className="flex items-center space-x-2">
                      <BookOpen className="h-7 w-7 text-primary" />
                      <span className="font-display text-xl font-semibold">SAVEBOOK</span>
                    </Link>
                  </div>
                  
                  <nav className="flex flex-col space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={cn(
                          'px-3 py-3 rounded-md text-base font-medium transition-colors',
                          location.pathname === item.href
                            ? 'bg-accent text-primary'
                            : 'text-foreground hover:bg-accent/50'
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  
                  <div className="mt-auto pt-6 pb-8">
                    {user ? (
                      <div className="flex items-center space-x-3 px-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {user.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <Button variant="link" className="h-auto p-0 text-muted-foreground">
                            Sair
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button 
                        variant="default" 
                        className="w-full" 
                        onClick={() => setIsAuthModalOpen(true)}
                      >
                        <LogIn className="mr-2 h-4 w-4" />
                        Entrar
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      {/* Header spacer */}
      <div className="h-16 sm:h-20" />
      
      {/* Auth modal */}
      <AuthModal open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
    </>
  );
}
