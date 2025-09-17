import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import BookCard from '@/components/BookCard';
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations';
import { ArrowRight, BookOpen, Users, RefreshCw } from 'lucide-react';
import { ExchangeStatus } from '@/types';

// DADOS FICTÍCIOS PARA PLACEHOLDER
const featuredBooks = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=387&auto=format&fit=crop',
    averageRating: 4.2,
    reviewCount: 328,
    exchangeStatus: 'available' as ExchangeStatus,
  },
  {
    id: '2',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=398&auto=format&fit=crop',
    averageRating: 4.1,
    reviewCount: 256,
    exchangeStatus: 'donation' as ExchangeStatus,
  },
  {
    id: '3',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=870&auto=format&fit=crop',
    averageRating: 4.7,
    reviewCount: 412,
    exchangeStatus: 'available' as ExchangeStatus,
  },
  {
    id: '4',
    title: 'The Four Winds',
    author: 'Kristin Hannah',
    coverUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=876&auto=format&fit=crop',
    averageRating: 4.5,
    reviewCount: 289,
    exchangeStatus: 'pending' as ExchangeStatus,
  },
];

const testimonials = [
  {
    id: '1',
    name: 'Sarah J.',
    text: "Descobri livros que nunca teria encontrado de outra forma e fiz amizade com pessoas com gostos literários semelhantes.",
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Michael T.',
    text: 'Encontrar pessoas para trocar livros não apenas me fez economizar dinheiro, mas também me apresentou a uma comunidade de leitores.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Priya K.',
    text: "O recurso de estante virtual me ajuda a acompanhar tudo o que já li e o que quero ler. Muito melhor do que a minha planilha!",
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=961&auto=format&fit=crop',
  },
];

export default function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      
      
      <motion.section 
        className="relative py-20 md:py-28 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-transparent -z-10" />
        
        <div className="container px-4 mx-auto text-center">
          <motion.div variants={slideUp} className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight mb-6">
              Compartilhe livros, <span className="text-primary">conecte-se</span> com leitores
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Troque livros com amigos leitores, rastreie sua jornada de leitura e descubra sua próxima história favorita.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button size="lg" className="px-8">
                Junte-se à comunidade
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/explore">
                  Explore livros
                </Link>
              </Button>
            </div>
            
            <div className="hidden md:block max-w-lg mx-auto relative">
              <div className="relative flex items-center">
                <Input 
                  className="pr-12 h-12 rounded-full pl-6 shadow-sm bg-white dark:bg-gray-900" 
                  placeholder="Pesquise por título, autor ou ISBN" 
                />
                <Button 
                  size="icon" 
                  className="absolute right-1 rounded-full h-10 w-10"
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      
      
      <motion.section 
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="section-heading">Livros disponíveis</h2>
            <Button variant="ghost" asChild>
              <Link to="/explore" className="flex items-center">
                Ver tudo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <motion.div
                key={book.id}
                variants={fadeIn}
                viewport={{ once: true }}
              >
                <BookCard book={book} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      
      <motion.section 
        className="py-16 bg-secondary/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading">Como funciona</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              SaveBook torna fácil se conectar a outros leitores, trocar livros e rastrear sua jornada de leitura.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="flex flex-col items-center text-center"
              variants={slideUp}
            >
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Liste seus livros</h3>
              <p className="text-muted-foreground">
                Adicione livros que gostaria de trocar ou doar à sua biblioteca. Inclua detalhes sobre suas condições e preferências.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center"
              variants={slideUp}
            >
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Conecte-se com leitores</h3>
              <p className="text-muted-foreground">
                Encontre leitores com interesses similares ou livros que quer ler. Envie mensagens para combinar uma troca.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center"
              variants={slideUp}
            >
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <RefreshCw className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Troque & Avalie</h3>
              <p className="text-muted-foreground">
                Depois da leitura, compartilhe seus pensamentos avaliando livros, ajudando outros leitores a encontrar ótimos títulos.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      <motion.section 
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading">O que nossa comunidade diz</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div 
                key={testimonial.id}
                className="bg-background rounded-xl p-6 shadow-sm border"
                variants={slideUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">Membro da comunidade</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
    
      <motion.section 
        className="py-20 bg-primary/5 border-y"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <div className="container px-4 mx-auto text-center">
          <h2 className="section-heading">Pronto para se juntar à nossa comunidade?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Conecte-se com leitores, troque livros e descubra sua próxima história favorita.
          </p>
          <Button size="lg" className="px-8">Comece por aqui</Button>
        </div>
      </motion.section>
      
      {/* Footer */}
      <footer className="bg-background py-12 border-t">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="font-display text-xl font-semibold">SaveBook</span>
              </div>
              <p className="text-muted-foreground max-w-xs">
                Uma comunidade para amantes de livros
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h3 className="font-medium mb-4">Navegação</h3>
                <ul className="space-y-3">
                  <li><Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link></li>
                  <li><Link to="/explore" className="text-muted-foreground hover:text-foreground">Explorar</Link></li>
                  <li><Link to="/bookshelf" className="text-muted-foreground hover:text-foreground">Estante</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Recursos</h3>
                <ul className="space-y-3">
                  <li><Link to="/about" className="text-muted-foreground hover:text-foreground">Sobre nós</Link></li>
                  <li><Link to="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
                  <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contato</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Legal</h3>
                <ul className="space-y-3">
                  <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Termos</Link></li>
                  <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacidade</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t text-center text-muted-foreground text-sm">
            <p>© {new Date().getFullYear()} SaveBook. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
