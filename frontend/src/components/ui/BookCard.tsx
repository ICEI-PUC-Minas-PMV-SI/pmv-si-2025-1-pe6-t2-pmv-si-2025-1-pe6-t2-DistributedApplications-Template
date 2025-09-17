import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book } from '@/types';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, BookOpen, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookCardProps {
  book: Partial<Book>;
  className?: string;
  variant?: 'default' | 'compact' | 'horizontal';
  showActions?: boolean;
  onExchangeClick?: (book: Partial<Book>) => void;
}

export default function BookCard({
  book,
  className,
  variant = 'default',
  showActions = true,
  onExchangeClick,
}: BookCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const placeholderUrl = '/placeholder.svg';
  
  const renderRating = () => {
    if (!book.averageRating) return null;
    
    return (
      <div className="flex items-center mt-1">
        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        <span className="ml-1 text-sm font-medium">
          {book.averageRating.toFixed(1)}
        </span>
        {book.reviewCount && (
          <span className="ml-1 text-xs text-muted-foreground">
            ({book.reviewCount})
          </span>
        )}
      </div>
    );
  };
  
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  
  if (variant === 'compact') {
    return (
      <motion.div 
        whileHover={{ y: -5 }}
        className={cn("book-card overflow-hidden", className)}
      >
        <Link to={`/books/${book.id}`} className="block">
          <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-muted">
            <div className={cn("absolute inset-0", !isImageLoaded && "image-loading")}></div>
            <img
              src={book.coverUrl || placeholderUrl}
              alt={book.title}
              className={cn(
                "w-full h-full object-cover transition-opacity duration-300",
                isImageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={handleImageLoad}
            />
          </div>
          <div className="mt-2">
            <h3 className="book-title truncate">{book.title}</h3>
            <p className="book-author truncate">{book.author}</p>
            {renderRating()}
          </div>
        </Link>
      </motion.div>
    );
  }
  
  if (variant === 'horizontal') {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <div className="flex">
          <div className="flex-shrink-0 w-[100px]">
            <div className="relative h-full">
              <div className={cn("absolute inset-0", !isImageLoaded && "image-loading")}></div>
              <img
                src={book.coverUrl || placeholderUrl}
                alt={book.title}
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-300",
                  isImageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={handleImageLoad}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between p-4">
            <div>
              <Link to={`/books/${book.id}`}>
                <h3 className="book-title">{book.title}</h3>
              </Link>
              <p className="book-author">{book.author}</p>
              {book.exchangeStatus && (
                <Badge 
                  variant="outline" 
                  className="mt-2"
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
              {renderRating()}
            </div>
            {showActions && (
              <div className="flex items-center gap-2 mt-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                >
                  <BookOpen className="mr-1 h-3 w-3" />
                  Add to shelf
                </Button>
                {book.exchangeStatus === 'available' && (
                  <Button 
                    size="sm" 
                    className="text-xs"
                    onClick={() => onExchangeClick?.(book)}
                  >
                    Request
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  }
  

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={cn("book-card", className)}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative aspect-[2/3] overflow-hidden">
          <div className={cn("absolute inset-0", !isImageLoaded && "image-loading")}></div>
          <Link to={`/books/${book.id}`}>
            <img
              src={book.coverUrl || placeholderUrl}
              alt={book.title}
              className={cn(
                "w-full h-full object-cover transition-opacity duration-300",
                isImageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={handleImageLoad}
            />
          </Link>
        </div>
        <CardContent className="pt-4 pb-2 flex-grow">
          <Link to={`/books/${book.id}`}>
            <h3 className="book-title">{book.title}</h3>
          </Link>
          <p className="book-author">{book.author}</p>
          {book.exchangeStatus && (
            <Badge 
              variant="outline" 
              className="mt-2"
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
                ? 'Disponível para troca' 
                : book.exchangeStatus === 'donation'
                ? 'Grátis para doação'
                : 'Troca pendente'}
            </Badge>
          )}
          {renderRating()}
        </CardContent>
        {showActions && (
          <CardFooter className="pt-0 pb-4 px-4">
            <div className="flex items-center justify-between w-full">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:text-foreground p-0"
              >
                <Heart className="h-4 w-4 mr-1" />
                <span className="text-xs">Salvar</span>
              </Button>
              {book.exchangeStatus && book.exchangeStatus !== 'not-available' && (
                <Button 
                  variant="default" 
                  size="sm"
                  className="text-xs"
                  onClick={() => onExchangeClick?.(book)}
                >
                  Solicitar
                </Button>
              )}
            </div>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
