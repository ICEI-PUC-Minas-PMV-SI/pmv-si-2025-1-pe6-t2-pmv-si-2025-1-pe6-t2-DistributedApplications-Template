import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  BookOpen,
  Heart,
  Calendar,
  UserCircle,
  BookMarked,
  MessageSquare,
  Star,
  ThumbsUp,
  Flag,
  Share2,
  LoaderCircle
} from 'lucide-react';
import { fadeIn, pageTransition, slideDown, slideUp } from '@/lib/animations';
import { Book, Review, User } from '@/types';

// DADOS FICTÍCIOS PARA PLACEHOLDER
const bookData: Partial<Book> = {
  id: '1',
  title: 'The Midnight Library',
  author: 'Matt Haig',
  coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=387&auto=format&fit=crop',
  description: 'Entre a vida e a morte existe uma biblioteca, e dentro dessa biblioteca, as prateleiras se estendem para sempre. Cada livro oferece uma chance de tentar outra vida que você poderia ter vivido, para ver como as coisas seriam se tivesse feito outras escolhas. Você teria feito algo diferente, se tivesse a chance de desfazer seus arrependimentos?',
  publishYear: 2020,
  isbn: '9780525559474',
  genres: ['Ficção', 'Fantasia', 'Contemporâneo'],
  averageRating: 4.2,
  reviewCount: 328,
  exchangeStatus: 'available',
  condition: 'very-good',
  ownerId: 'user123',
};

const reviewsData: Partial<Review>[] = [
  {
    id: '1',
    userId: 'user1',
    bookId: '1',
    rating: 5,
    comment: 'Este livro mudou minha perspectiva sobre a vida. O conceito é fascinante e a escrita é linda. Eu não consegui parar de ler e terminei em uma única sentada.',
    createdAt: new Date('2023-05-15'),
    likes: 24,
    user: {
      id: 'user1',
      name: 'Sarah J.',
      photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop',
    } as User,
  },
  {
    id: '2',
    userId: 'user2',
    bookId: '1',
    rating: 4,
    comment: 'Uma leitura instigante que faz você refletir sobre suas escolhas e os caminhos não percorridos. O conceito é intrigante, embora eu tenha achado algumas partes um pouco repetitivas.',
    createdAt: new Date('2023-04-22'),
    likes: 12,
    user: {
      id: 'user2',
      name: 'Michael T.',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop',
    } as User,
  },
  {
    id: '3',
    userId: 'user3',
    bookId: '1',
    rating: 3,
    comment: 'Premissa interessante, mas senti que a execução poderia ter sido melhor. Ainda assim, foi uma leitura agradável, com algumas reflexões significativas.',
    createdAt: new Date('2023-03-10'),
    likes: 8,
    user: {
      id: 'user3',
      name: 'Priya K.',
      photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=961&auto=format&fit=crop',
    } as User,
  },
];

const ownerData: Partial<User> = {
  id: 'user123',
  name: 'Alex Johnson',
  photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=987&auto=format&fit=crop',
  joinDate: new Date('2022-06-01'),
};

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isExchangeDialogOpen, setIsExchangeDialogOpen] = useState(false);
  const [isFullDescriptionVisible, setIsFullDescriptionVisible] = useState(false);
  
  const book: Partial<Book> = bookData; 
  const reviews = reviewsData;
  const owner = ownerData;
  
  const maxDescriptionLength = 300;
  const isDescriptionLong = book.description && book.description.length > maxDescriptionLength;
  const shortDescription = isDescriptionLong 
    ? `${book.description?.substring(0, maxDescriptionLength)}...` 
    : book.description;
  
  const handleAddToShelf = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };
  
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  
  const formatCondition = (condition: string) => {
    switch (condition) {
      case 'new': return 'Novo';
      case 'like-new': return 'Como novo';
      case 'very-good': return 'Muito bom';
      case 'good': return 'Bom';
      case 'acceptable': return 'Aceitável';
      case 'poor': return 'Ruim';
      default: return condition;
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <motion.main 
        className="container px-4 py-10 mx-auto"
        initial="hidden"
        animate="visible"
        variants={pageTransition}
      >
        <div className="flex flex-col md:flex-row gap-8">
          
          <div className="md:w-1/3 lg:w-1/4">
            <div className="sticky top-24">
              <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-muted mb-4">
                <div className={`absolute inset-0 ${!isImageLoaded && "image-loading"}`}></div>
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
                  onLoad={handleImageLoad}
                />
              </div>
              
              <div className="space-y-3">
                {book.exchangeStatus && (
                  <Badge 
                    variant="outline" 
                    className="w-full py-1.5 justify-center"
                    style={{ 
                      backgroundColor: book.exchangeStatus === 'available' 
                        ? 'rgba(16, 185, 129, 0.1)' 
                        : book.exchangeStatus === 'donation'
                          ? 'rgba(79, 70, 229, 0.1)'
                          : 'rgba(245, 158, 11, 0.1)',
                      color: book.exchangeStatus === 'available'
                        ? 'rgb(16, 185, 129)'
                        : book.exchangeStatus === 'donation'
                          ? 'rgb(79, 70, 229)'
                          : 'rgb(245, 158, 11)'
                    }}
                  >
                    {book.exchangeStatus === 'available' 
                      ? 'Available for exchange' 
                      : book.exchangeStatus === 'donation'
                        ? 'Free to good home'
                        : 'Exchange pending'}
                  </Badge>
                )}
                
                {book.exchangeStatus && book.exchangeStatus !== 'not-available' && (
                  <Button 
                    className="w-full"
                    onClick={() => setIsExchangeDialogOpen(true)}
                  >
                    Solicite este livro
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleAddToShelf}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      Adicionando...
                    </>
                  ) : (
                    <>
                      <BookMarked className="mr-2 h-4 w-4" />
                      Adicionar à sua estante
                    </>
                  )}
                </Button>
                
                <Button variant="ghost" className="w-full">
                  <Heart className="mr-2 h-4 w-4" />
                  Salvar para mais tarde
                </Button>
              </div>
            </div>
          </div>
          
          
          <div className="md:w-2/3 lg:w-3/4">
            <motion.div variants={fadeIn}>
              
              <Link
                to="/explore"
                className="inline-flex items-center text-muted-foreground text-sm mb-6 hover:text-foreground transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                  <path d="M9.5 12.5L4.5 8L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Voltar para resoltados
              </Link>
              
              
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-display font-semibold mb-2">
                  {book.title}
                </h1>
                <p className="text-xl text-muted-foreground">por {book.author}</p>
                
                
                {book.averageRating && (
                  <div className="flex items-center mt-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.round(book.averageRating)
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-medium">
                      {book.averageRating.toFixed(1)}
                    </span>
                    {book.reviewCount && (
                      <span className="ml-2 text-muted-foreground">
                        ({book.reviewCount} reviews)
                      </span>
                    )}
                  </div>
                )}
                
                
                {book.genres && book.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {book.genres.map((genre) => (
                      <Badge key={genre} variant="secondary">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              
              {owner && (
                <div className="mb-8 p-4 bg-accent/50 rounded-lg">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={owner.photoUrl} />
                      <AvatarFallback>{owner.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">Livro compartilhado por {owner.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        <span className="inline-flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Cadastrado em {owner.joinDate && new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(new Date(owner.joinDate))}
                        </span>
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contato
                    </Button>
                  </div>
                </div>
              )}
              
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Sobre este livro</h2>
                <p className="text-muted-foreground mb-4">
                  {isFullDescriptionVisible ? book.description : shortDescription}
                  {isDescriptionLong && (
                    <button
                      className="ml-1 text-primary hover:underline font-medium"
                      onClick={() => setIsFullDescriptionVisible(!isFullDescriptionVisible)}
                    >
                      {isFullDescriptionVisible ? 'Ver menos' : 'Ver mais'}
                    </button>
                  )}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  {book.publishYear && (
                    <div>
                      <p className="text-sm text-muted-foreground">Ano de publicação</p>
                      <p className="font-medium">{book.publishYear}</p>
                    </div>
                  )}
                  {book.isbn && (
                    <div>
                      <p className="text-sm text-muted-foreground">ISBN</p>
                      <p className="font-medium">{book.isbn}</p>
                    </div>
                  )}
                  {book.condition && (
                    <div>
                      <p className="text-sm text-muted-foreground">Condição</p>
                      <p className="font-medium">{formatCondition(book.condition)}</p>
                    </div>
                  )}
                </div>
              </div>
              
              
              <div>
                <Tabs defaultValue="reviews">
                  <TabsList className="mb-6">
                    <TabsTrigger value="reviews">
                      Reviews ({reviews.length})
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="reviews">
                    <div className="space-y-8">
                      {reviews.map((review) => (
                        <motion.div 
                          key={review.id}
                          className="p-4 border rounded-lg"
                          variants={fadeIn}
                          whileHover={{ y: -2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-start">
                            <Avatar className="h-10 w-10 mr-4">
                              <AvatarImage src={review.user?.photoUrl} />
                              <AvatarFallback>{review.user?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium">{review.user?.name}</h4>
                                <span className="text-sm text-muted-foreground">
                                  {review.createdAt && new Intl.DateTimeFormat('en-US', { 
                                    year: 'numeric', 
                                    month: 'short', 
                                    day: 'numeric' 
                                  }).format(new Date(review.createdAt))}
                                </span>
                              </div>
                              
                              <div className="flex items-center mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-4 h-4 ${
                                      star <= (review.rating || 0)
                                        ? 'text-yellow-500 fill-yellow-500'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              
                              <p className="text-muted-foreground">{review.comment}</p>
                              
                              <div className="flex items-center mt-4">
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  <span className="text-xs">{review.likes}</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                                  <Flag className="h-4 w-4 mr-1" />
                                  <span className="text-xs">Reportar</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.main>
      
      
      <Dialog open={isExchangeDialogOpen} onOpenChange={setIsExchangeDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Solicitar livro para troca</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex gap-4 mb-6">
              <div className="w-24 h-36 flex-shrink-0 rounded-md overflow-hidden">
                <img 
                  src={book.coverUrl} 
                  alt={book.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-lg">{book.title}</h3>
                <p className="text-muted-foreground">{book.author}</p>
                <Badge 
                  variant="outline" 
                  className="mt-2"
                  style={{ 
                    backgroundColor: book.exchangeStatus === 'available' 
                      ? 'rgba(16, 185, 129, 0.1)' 
                      : 'rgba(79, 70, 229, 0.1)',
                    color: book.exchangeStatus === 'available'
                      ? 'rgb(16, 185, 129)'
                      : 'rgb(79, 70, 229)'
                  }}
                >
                  {book.exchangeStatus === 'available' 
                    ? 'Disponível para troca' 
                    : 'Grátis para doação'}
                </Badge>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Enviar mensagem para dono do livro
              </label>
              <textarea 
                className="w-full h-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Se apresente e explique por qu você está interessado neste livro."
              />
            </div>
            
            {book.exchangeStatus === 'available' && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Livros que você pode oferecer em troca
                </label>
                <div className="text-center p-6 border border-dashed rounded-md">
                  <p className="text-muted-foreground">
                    Você não tem livros listados para troca ainda.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                  >
                    Adicione um livro para troca
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
                Enviar solicitação
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}