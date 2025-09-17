import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import BookCard from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Book, ExchangeStatus } from '@/types';
import { fadeIn, pageTransition, staggerContainer } from '@/lib/animations';

// DADOS FICTÍCIOS PARA PLACEHOLDER
const allBooks = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=387&auto=format&fit=crop',
    averageRating: 4.2,
    reviewCount: 328,
    exchangeStatus: 'available' as ExchangeStatus,
    genres: ['Ficção', 'Fantasia', 'Contemporâneo'],
  },
  {
    id: '2',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=398&auto=format&fit=crop',
    averageRating: 4.1,
    reviewCount: 256,
    exchangeStatus: 'donation' as ExchangeStatus,
    genres: ['Ficção Científica', 'Ficção'],
  },
  {
    id: '3',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=870&auto=format&fit=crop',
    averageRating: 4.7,
    reviewCount: 412,
    exchangeStatus: 'available' as ExchangeStatus,
    genres: ['Ficção Científica', 'Aventura'],
  },
  {
    id: '4',
    title: 'The Four Winds',
    author: 'Kristin Hannah',
    coverUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=876&auto=format&fit=crop',
    averageRating: 4.5,
    reviewCount: 289,
    exchangeStatus: 'pending' as ExchangeStatus,
    genres: ['Ficção Histórica', 'Drama'],
  },
  {
    id: '5',
    title: 'The Song of Achilles',
    author: 'Madeline Miller',
    coverUrl: 'https://images.unsplash.com/photo-1513001900722-370f803f498d?q=80&w=774&auto=format&fit=crop',
    averageRating: 4.3,
    reviewCount: 352,
    exchangeStatus: 'available' as ExchangeStatus,
    genres: ['Ficção Histórica', 'Romance', 'Mitologia'],
  },
  {
    id: '6',
    title: 'Cloud Cuckoo Land',
    author: 'Anthony Doerr',
    coverUrl: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=870&auto=format&fit=crop',
    averageRating: 4.2,
    reviewCount: 198,
    exchangeStatus: 'donation' as ExchangeStatus,
    genres: ['Ficção Histórica', 'Ficção'],
  },
  {
    id: '7',
    title: 'Circe',
    author: 'Madeline Miller',
    coverUrl: 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=390&auto=format&fit=crop',
    averageRating: 4.4,
    reviewCount: 278,
    exchangeStatus: 'available' as ExchangeStatus,
    genres: ['Fantasia', 'Mitologia', 'Ficção Histórica'],
  },
  {
    id: '8',
    title: 'Hamnet',
    author: "Maggie O'Farrell",
    coverUrl: 'https://images.unsplash.com/photo-1612969308146-066015f5139b?q=80&w=464&auto=format&fit=crop',
    averageRating: 4.1,
    reviewCount: 205,
    exchangeStatus: 'available' as ExchangeStatus,
    genres: ['Ficção Histórica', 'Ficção'],
  },
];

type FilterOption = {
  label: string;
  value: string;
  options?: { label: string; value: string }[];
};

const filters: FilterOption[] = [
  { 
    label: 'Gênero', 
    value: 'genre',
    options: [
      { label: 'Ficção', value: 'fiction' },
      { label: 'Ficção Científica', value: 'science-fiction' },
      { label: 'Fantasia', value: 'fantasy' },
      { label: 'Mistério', value: 'mystery' },
      { label: 'Ficção Histórica', value: 'historical-fiction' },
      { label: 'Romance', value: 'romance' },
      { label: 'Terror', value: 'thriller' },
      { label: 'Não-Ficção', value: 'non-fiction' },
      { label: 'Biografia', value: 'biography' },
      { label: 'Jovem-Adulto', value: 'young-adult' },
    ]
  },
  { 
    label: 'Disponibilidade', 
    value: 'availability',
    options: [
      { label: 'Disponível para troca', value: 'available' },
      { label: 'Gratuito (Doação)', value: 'donation' },
      { label: 'Todos os itens', value: 'all' },
    ]
  },
  { 
    label: 'Nota', 
    value: 'rating',
    options: [
      { label: '4 estrelas ou mais', value: '4-stars' },
      { label: '3 estrelas ou mais', value: '3-stars' },
      { label: 'Qualquer nota', value: 'any' },
    ]
  },
];

export default function Explore() {
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isExchangeDialogOpen, setIsExchangeDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Partial<Book> | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: string[] }>({});
  
  const handleExchangeClick = (book: Partial<Book>) => {
    setSelectedBook(book);
    setIsExchangeDialogOpen(true);
  };
  
  const handleFilterToggle = (category: string, value: string) => {
    setActiveFilters(prev => {
      const current = prev[category] || [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      
      return {
        ...prev,
        [category]: updated
      };
    });
  };
  
  const clearFilters = () => {
    setActiveFilters({});
  };
  
  const removeFilter = (category: string, value: string) => {
    setActiveFilters(prev => {
      const current = prev[category] || [];
      const updated = current.filter(v => v !== value);
      
      const newFilters = {
        ...prev,
        [category]: updated
      };
      
      
      if (newFilters[category].length === 0) {
        delete newFilters[category];
      }
      
      return newFilters;
    });
  };
  
  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((count, values) => count + values.length, 0);
  };
  
  const getActiveFilterLabel = (category: string, value: string) => {
    const filterCategory = filters.find(f => f.value === category);
    if (!filterCategory || !filterCategory.options) return value;
    
    const option = filterCategory.options.find(o => o.value === value);
    return option ? option.label : value;
  };
  
  
  const filteredBooks = allBooks.filter(book => {
    
    if (searchQuery && !book.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !book.author.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    
    for (const [category, values] of Object.entries(activeFilters)) {
      if (values.length === 0) continue;
      
      if (category === 'genre') {
        const hasMatchingGenre = values.some(value => 
          book.genres.some(genre => genre.toLowerCase() === value.toLowerCase())
        );
        if (!hasMatchingGenre) return false;
      }
      
      if (category === 'availability') {
        if (!values.includes('all') && !values.includes(book.exchangeStatus)) {
          return false;
        }
      }
      
      if (category === 'rating') {
        if (values.includes('4-stars') && book.averageRating < 4) {
          return false;
        } else if (values.includes('3-stars') && book.averageRating < 3) {
          return false;
        }
      }
    }
    
    return true;
  });

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
            <h1 className="text-3xl md:text-4xl font-display font-semibold mb-2">Explore Livros</h1>
            <p className="text-muted-foreground">Descubra livros disponíveis para troca ou doação</p>
          </div>
        </div>
        
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              className="pl-10" 
              placeholder="Pesquise por título, autor ou ISBN"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-shrink-0 relative">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filtros
                {getActiveFilterCount() > 0 && (
                  <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                    {getActiveFilterCount()}
                  </Badge>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Filtro</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                {filters.map((filter) => (
                  <div key={filter.value} className="mb-6">
                    <h3 className="font-medium mb-3">{filter.label}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {filter.options?.map((option) => (
                        <Button
                          key={option.value}
                          type="button"
                          variant="outline"
                          className={`justify-start h-auto py-2 px-3 ${
                            activeFilters[filter.value]?.includes(option.value) 
                              ? 'border-primary bg-primary/5' 
                              : ''
                          }`}
                          onClick={() => handleFilterToggle(filter.value, option.value)}
                        >
                          <span className="mr-2">
                            {activeFilters[filter.value]?.includes(option.value) ? (
                              <Check className="h-4 w-4 text-primary" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                            )}
                          </span>
                          <span className="text-sm">{option.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-between pt-4 border-t">
                  <Button 
                    variant="ghost" 
                    onClick={clearFilters}
                    disabled={getActiveFilterCount() === 0}
                  >
                    Limpar tudo
                  </Button>
                  <Button onClick={() => setIsFilterDialogOpen(false)}>
                    Aplicar filtros
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
       
        {getActiveFilterCount() > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(activeFilters).map(([category, values]) => 
              values.map(value => (
                <Badge 
                  key={`${category}-${value}`} 
                  variant="secondary"
                  className="px-3 py-1 h-auto flex items-center gap-1"
                >
                  {getActiveFilterLabel(category, value)}
                  <button 
                    onClick={() => removeFilter(category, value)}
                    className="ml-1 rounded-full hover:bg-background/20 p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-7"
              onClick={clearFilters}
            >
              Limpar tudo
            </Button>
          </div>
        )}
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="exchange">Para troca</TabsTrigger>
            <TabsTrigger value="donation">Livros gratuitos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <BookGrid 
              books={filteredBooks}
              onExchangeClick={handleExchangeClick}
            />
          </TabsContent>
          
          <TabsContent value="exchange" className="mt-0">
            <BookGrid 
              books={filteredBooks.filter(book => book.exchangeStatus === 'available')}
              onExchangeClick={handleExchangeClick}
            />
          </TabsContent>
          
          <TabsContent value="donation" className="mt-0">
            <BookGrid 
              books={filteredBooks.filter(book => book.exchangeStatus === 'donation')}
              onExchangeClick={handleExchangeClick}
            />
          </TabsContent>
        </Tabs>
      </motion.main>
      
      
      <Dialog open={isExchangeDialogOpen} onOpenChange={setIsExchangeDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Solicitar troca de livros</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedBook && (
              <div className="flex gap-4 mb-6">
                <div className="w-24 h-36 flex-shrink-0 rounded-md overflow-hidden">
                  <img 
                    src={selectedBook.coverUrl} 
                    alt={selectedBook.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{selectedBook.title}</h3>
                  <p className="text-muted-foreground">{selectedBook.author}</p>
                  <Badge 
                    variant="outline" 
                    className="mt-2"
                    style={{ 
                      backgroundColor: selectedBook.exchangeStatus === 'available' 
                        ? 'rgba(16, 185, 129, 0.1)' 
                        : 'rgba(79, 70, 229, 0.1)',
                      color: selectedBook.exchangeStatus === 'available'
                        ? 'rgb(16, 185, 129)'
                        : 'rgb(79, 70, 229)'
                    }}
                  >
                    {selectedBook.exchangeStatus === 'available' 
                      ? 'Disponível para troca' 
                      : 'Gratuito para doação'}
                  </Badge>
                </div>
              </div>
            )}
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Fale com o dono do livro
              </label>
              <textarea 
                className="w-full h-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Se apresente e explique o motivo de você querer este livro"
              />
            </div>
            
            {selectedBook?.exchangeStatus === 'available' && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Livros que você pode oferecer em troca
                </label>
                <div className="text-center p-6 border border-dashed rounded-md">
                  <p className="text-muted-foreground">
                    Você ainda não tem nenhum livro listado para troca
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                  >
                    Adicionar livro para troca
                  </Button>
                </div>
              </div>
            )}
            
            <div className="flex justify-end pt-4 border-t">
              <Button 
                variant="ghost" 
                className="mr-2"
                onClick={() => setIsExchangeDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={() => setIsExchangeDialogOpen(false)}>
                Enviar pedido
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface BookGridProps {
  books: Partial<Book>[];
  onExchangeClick: (book: Partial<Book>) => void;
}

function BookGrid({ books, onExchangeClick }: BookGridProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-medium mb-2">Nenhum livro encontrado</h3>
        <p className="text-muted-foreground mb-6">
          Tente ajustar seus filtros ou critério de pesquisa
        </p>
        <Button variant="outline">
          Limpar todos os filtros
        </Button>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {books.map((book) => (
        <motion.div
          key={book.id}
          variants={fadeIn}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <BookCard 
            book={book} 
            onExchangeClick={onExchangeClick}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}