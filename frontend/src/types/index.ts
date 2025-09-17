// Literary preferences for users
export type LiteraryPreference =
  | "fiction"
  | "science-fiction"
  | "non-fiction"
  | "sci-fi"
  | "fantasy"
  | "romance"
  | "mystery"
  | "thriller"
  | "biography"
  | "history"
  | "horror"
  | "self-help"
  | "young-adult"
  | "poetry";

// Reading status for bookshelf items
export type ReadStatus = "reading" | "want-to-read" | "read";

// Book condition types
export type BookCondition =
  | "new"
  | "like-new"
  | "very-good"
  | "good"
  | "acceptable"
  | "poor";

// Exchange status for books
export type ExchangeStatus =
  | "available"
  | "pending"
  | "exchanged"
  | "not-available"
  | "donation";

// Request status for exchange requests
export type RequestStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "completed"
  | "cancelled";

// Notification types
export type NotificationType =
  | "exchange-request"
  | "request-accepted"
  | "request-rejected"
  | "exchange-completed"
  | "new-message"
  | "system";

// Book interface
export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  description?: string;
  edition?: string;
  condition?: BookCondition;
  publishYear?: number;
  isbn?: string;
  genres: string[];
  ownerId: string;
  createdAt: Date;
  exchangeStatus: ExchangeStatus;
  averageRating?: number;
  reviewCount?: number;
}

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  preferences: LiteraryPreference[];
  joinDate: Date;
}

// Review interface
export interface Review {
  id: string;
  userId: string;
  bookId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt?: Date;
  likes: number;
  user?: User; // Adding user to match BookDetail expectations
}

// Message interface
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
}

// Exchange Request interface
export interface ExchangeRequest {
  id: string;
  requesterId: string;
  ownerId: string;
  bookId: string;
  status: RequestStatus;
  message?: string;
  createdAt: Date;
  updatedAt?: Date;
}

// Bookshelf Item interface
export interface BookshelfItem {
  id: string;
  userId: string;
  bookId: string;
  status: ReadStatus;
  addedAt: Date;
  completedAt?: Date;
  notes?: string;
}

// Notification interface
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  message: string;
  relatedId?: string;
  isRead: boolean;
  createdAt: Date;
}
