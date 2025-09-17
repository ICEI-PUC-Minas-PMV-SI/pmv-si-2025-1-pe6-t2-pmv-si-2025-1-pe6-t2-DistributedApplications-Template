
import { LiteraryPreference } from '@/types';

// Simple register DTO for a student project
export class RegisterDto {
  name: string;
  email: string;
  password: string;
  photoUrl?: string;
  preferences?: LiteraryPreference[];
}
