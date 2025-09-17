import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  BookOpen, 
  BookMarked, 
  BookText, 
  LayoutGrid, 
  List,
  Filter,
  Search
} from 'lucide-react';
import Header from '@/components/Header';
import BookCard from '@/components/BookCard';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ReadStatus, Book } from '@/types';
import { pageTransition, staggerContainer, fadeIn } from '@/lib/animations';

// DADOS FICTÍCIOS DE PLACEHOLDER
const readBooks = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=387&auto=format&fit=crop',
    averageRating: 4.2,
  },
  {
    id: '2',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=398&auto=format&fit=crop',
    averageRating: 4.1,
  },
];

const readingBooks = [
  {
    id: '3',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=870&auto=format&fit=crop',
    averageRating: 4.7,
  },
];

const wantToReadBooks = [
  {
    id: '4',
    title: 'The Four Winds',
    author: 'Kristin Hannah',
    coverUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=876&auto=format&fit=crop',
    averageRating: 4.5,
  },
  {
    id: '5',
    title: 'The Song of Achilles',
    author: 'Madeline Miller',
    coverUrl: 'https://images.unsplash.com/photo-1513001900722-370f803f498d?q=80&w=774&auto=format&fit=crop',
    averageRating: 4.3,
  },
  {
    id: '6',
    title: 'Cloud Cuckoo Land',
    author: 'Anthony Doerr',
    coverUrl: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=870&auto=format&fit=crop',
    averageRating: 4.2,
  },
];

export default function Bookshelf() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isAddBookDialogOpen, setIsAddBookDialogOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <motion.main 
        className="container px-4 py-10 mx-auto"
        initial="hidden"
        animate="visible"
        variants={pageTransition}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-semibold mb-2">Sua estante de livros</h1>
            <p className="text-muted-foreground">Controle livros que você leu, está lendo ou quer ler.</p>
          </div>
          
          <div className="flex space-x-2">
            <Dialog open={isAddBookDialogOpen} onOpenChange={setIsAddBookDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar livro
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Adicionar livro à sua estante</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex items-center gap-4">
                    <Input 
                      className="flex-1" 
                      placeholder="Search by title, author, or ISBN" 
                    />
                    <Button variant="outline" size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="text-sm text-muted-foreground text-center py-8">
                    Procure por um livro para adicionar à sua estante, ou crie uma nova entrada de livro se não conseguir encontrar.
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Cria uma nova entrada de livro
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <div className="hidden md:flex border rounded-md overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-none ${viewMode === 'grid' ? 'bg-secondary' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-none ${viewMode === 'list' ? 'bg-secondary' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="reading" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="reading" className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                Lendo
              </TabsTrigger>
              <TabsTrigger value="want-to-read" className="flex items-center">
                <BookMarked className="mr-2 h-4 w-4" />
                Quero ler
              </TabsTrigger>
              <TabsTrigger value="read" className="flex items-center">
                <BookText className="mr-2 h-4 w-4" />
                Lido
              </TabsTrigger>
            </TabsList>
            
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Filter className="mr-2 h-4 w-4" />
              Filtro
            </Button>
          </div>
          
          <div className="relative">
            <TabsContent 
              value="reading" 
              className="mt-0"
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {readingBooks.length > 0 ? (
                  viewMode === 'grid' ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                      {readingBooks.map((book) => (
                        <motion.div
                          key={book.id}
                          variants={fadeIn}
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <BookCard book={book} showActions={false} />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {readingBooks.map((book) => (
                        <motion.div
                          key={book.id}
                          variants={fadeIn}
                        >
                          <BookCard 
                            book={book} 
                            variant="horizontal" 
                            showActions={false} 
                          />
                        </motion.div>
                      ))}
                    </div>
                  )
                ) : (
                  <EmptyBookshelf 
                    status="reading" 
                    onAddBook={() => setIsAddBookDialogOpen(true)} 
                  />
                )}
              </motion.div>
            </TabsContent>
            
            <TabsContent 
              value="want-to-read" 
              className="mt-0"
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {wantToReadBooks.length > 0 ? (
                  viewMode === 'grid' ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                      {wantToReadBooks.map((book) => (
                        <motion.div
                          key={book.id}
                          variants={fadeIn}
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <BookCard book={book} showActions={false} />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {wantToReadBooks.map((book) => (
                        <motion.div
                          key={book.id}
                          variants={fadeIn}
                        >
                          <BookCard 
                            book={book} 
                            variant="horizontal" 
                            showActions={false} 
                          />
                        </motion.div>
                      ))}
                    </div>
                  )
                ) : (
                  <EmptyBookshelf 
                    status="want-to-read" 
                    onAddBook={() => setIsAddBookDialogOpen(true)} 
                  />
                )}
              </motion.div>
            </TabsContent>
            
            <TabsContent 
              value="read" 
              className="mt-0"
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {readBooks.length > 0 ? (
                  viewMode === 'grid' ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                      {readBooks.map((book) => (
                        <motion.div
                          key={book.id}
                          variants={fadeIn}
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <BookCard book={book} showActions={false} />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {readBooks.map((book) => (
                        <motion.div
                          key={book.id}
                          variants={fadeIn}
                        >
                          <BookCard 
                            book={book} 
                            variant="horizontal" 
                            showActions={false} 
                          />
                        </motion.div>
                      ))}
                    </div>
                  )
                ) : (
                  <EmptyBookshelf 
                    status="read" 
                    onAddBook={() => setIsAddBookDialogOpen(true)} 
                  />
                )}
              </motion.div>
            </TabsContent>
          </div>
        </Tabs>
      </motion.main>
    </div>
  );
}

interface EmptyBookshelfProps {
  status: ReadStatus;
  onAddBook: () => void;
}

function EmptyBookshelf({ status, onAddBook }: EmptyBookshelfProps) {
  const getStatusContent = () => {
    switch (status) {
      case 'reading':
        return {
          title: 'Você ainda não está lendo nenhum livro',
          description: 'Adicione livros que você está lendo para rastrear seu progresso'
        };
      case 'want-to-read':
        return {
          title: 'Sua lista de desejos está vazia',
          description: 'Adicione livros que você planeja ler no futuro'
        };
      case 'read':
        return {
          title: 'Você ainda não adicionou nenhum livro lido',
          description: 'Adicione livros que você já leu para rastrear seu histórico de leitura'
        };
      default:
        return {
          title: 'Nenhum livro encontrado',
          description: 'Adicione alguns livros à sua biblioteca'
        };
    }
  };
  
  const content = getStatusContent();
  
  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">{content.title}</h3>
        <p className="text-muted-foreground mb-6">{content.description}</p>
        <Button onClick={onAddBook}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar livro
        </Button>
      </div>
    </div>
  );
}
