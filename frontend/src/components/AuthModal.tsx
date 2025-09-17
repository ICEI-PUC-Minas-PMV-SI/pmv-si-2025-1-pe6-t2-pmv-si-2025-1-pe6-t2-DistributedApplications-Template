import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check, Facebook, LoaderCircle, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LiteraryPreference } from "@/types";
import { authService } from "@/services/auth.service";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const literaryPreferences: { value: LiteraryPreference; label: string }[] = [
  { value: "fiction", label: "Ficção" },
  { value: "non-fiction", label: "Não-Ficção" },
  { value: "mystery", label: "Mistério" },
  { value: "science-fiction", label: "Ficção Científica" },
  { value: "fantasy", label: "Fantasia" },
  { value: "romance", label: "Romance" },
  { value: "thriller", label: "Suspense" },
  { value: "horror", label: "Terror" },
  { value: "biography", label: "Biografia" },
  { value: "history", label: "História" },
  { value: "poetry", label: "Poesia" },
  { value: "young-adult", label: "Jovem Adulto" },
  { value: "self-help", label: "Autoajuda" },
];

export default function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<string>("signin");
  const [signupStep, setSignupStep] = useState<number>(1);
  const [selectedPreferences, setSelectedPreferences] = useState<
    LiteraryPreference[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePreferenceToggle = (preference: LiteraryPreference) => {
    if (selectedPreferences.includes(preference)) {
      setSelectedPreferences(
        selectedPreferences.filter((p) => p !== preference)
      );
    } else {
      setSelectedPreferences([...selectedPreferences, preference]);
    }
  };

  const handleContinue = async (e) => {
    const userData = new FormData(e.target);
    const name = userData.get("name");
    const email = userData.get("email");
    const password = userData.get("password");

    const data = await authService.register(
      String(name),
      String(email),
      String(password)
    );
    console.log("DATA", data);

    setSignupStep(2);
  };

  const handleBack = () => {
    setSignupStep(1);
  };

  const handleSignUp = () => {
    setIsLoading(true);

    // authService.register();

    // Reset states for next time
    setIsLoading(false);
    onOpenChange(false);
    setSignupStep(1);
    setSelectedPreferences([]);

    // Simulate API call
    // setTimeout(() => {
    //   setIsLoading(false);
    //   onOpenChange(false);
    //   // Reset states for next time
    //   setSignupStep(1);
    //   setSelectedPreferences([]);
    // }, 1500);
  };

  const handleSignIn = async (event) => {
    setIsLoading(true);
    // Simulate API call

    const userData = new FormData(event.target);

    const email = userData.get("email");
    const password = userData.get("password");

    const data = await authService.login(String(email), String(password));
    console.log("DATA", data);

    setIsLoading(false);
    onOpenChange(false);

    // setTimeout(() => {
    //   setIsLoading(false);
    //   onOpenChange(false);
    // }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        <DialogHeader className="pt-6 px-6">
          <DialogTitle className="text-2xl font-display text-center">
            {activeTab === "signin"
              ? "Bem vindo de volta"
              : "Junte-se ao SaveBook"}
          </DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="signin"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mt-1"
        >
          <TabsList className="grid grid-cols-2 mb-6 px-6">
            <TabsTrigger value="signin">Entrar</TabsTrigger>
            <TabsTrigger value="signup">Inscrever-se</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="px-6 pb-6 pt-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSignIn(e);
              }}
            >
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <Button
                      variant="link"
                      className="px-0 h-auto text-xs text-muted-foreground"
                    >
                      Esqueceu sua senha?
                    </Button>
                  </div>
                  <Input id="password" name="password" type="password" />
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      Entrando
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="px-6 pb-6 pt-0">
            <AnimatePresence mode="wait">
              {signupStep === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      handleContinue(event);
                    }}
                  >
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Nome completo</Label>
                        <Input id="name" name="name" type="text" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          name="email"
                          type="email"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="signup-password">Senha</Label>
                        <Input
                          id="signup-password"
                          name="password"
                          type="password"
                          required
                        />
                      </div>

                      <Button type="submit">Continue</Button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">
                      Selecione suas preferências literárias
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Isso nos ajuda a recomendar livros e conectar você com
                      leitores com interesses semelhantes.
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                      {literaryPreferences.map((preference) => (
                        <Button
                          key={preference.value}
                          type="button"
                          variant="outline"
                          className={cn(
                            "justify-start h-auto py-2 px-3",
                            selectedPreferences.includes(preference.value) &&
                              "border-primary bg-primary/5"
                          )}
                          onClick={() =>
                            handlePreferenceToggle(preference.value)
                          }
                        >
                          <span className="mr-2">
                            {selectedPreferences.includes(preference.value) ? (
                              <Check className="h-4 w-4 text-primary" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                            )}
                          </span>
                          <span className="text-sm">{preference.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleBack}
                      className="text-muted-foreground"
                    >
                      Voltar
                    </Button>

                    <Button
                      type="button"
                      onClick={handleSignUp}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                          Criando conta
                        </>
                      ) : (
                        "Crie sua conta"
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
