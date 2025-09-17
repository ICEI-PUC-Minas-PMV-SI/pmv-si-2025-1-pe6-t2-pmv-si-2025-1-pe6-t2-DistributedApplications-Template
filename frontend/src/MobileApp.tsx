import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { useState, useEffect } from "react";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Index from "./pages/Index";
import BookDetail from "./pages/BookDetail";
import Bookshelf from "./pages/Bookshelf";
import Explore from "./pages/Explore";
import NotFound from "./pages/NotFound";
import MobileNavbar from "@/components/MobileNavbar";
import { Capacitor } from '@capacitor/core';


const queryClient = new QueryClient();


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  

  if (loading) return null;
  

  if (!user) return <Navigate to="/" replace />;
  

  return <>{children}</>;
};

const AuthModal = () => {
  const { isOpen, setIsOpen, isLogin, setIsLogin } = useAuth();
  const { login, register } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      setIsOpen(false);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    try {
      await register(name, email, password);
      setIsOpen(false);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        {isLogin ? (
          <Login 
            onLogin={handleLogin} 
            onRegisterClick={() => setIsLogin(false)} 
          />
        ) : (
          <Register 
            onRegister={handleRegister} 
            onLoginClick={() => setIsLogin(true)} 
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

const MobileApp = () => {
  
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      
      document.body.classList.add('mobile-platform');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="mobile-container flex flex-col min-h-screen">
            <BrowserRouter>
              <AuthModal />
              <div className="flex-1 pb-16"> {}
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route 
                    path="/bookshelf" 
                    element={
                      <ProtectedRoute>
                        <Bookshelf />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/books/:id" element={<BookDetail />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <MobileNavbar />
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default MobileApp;