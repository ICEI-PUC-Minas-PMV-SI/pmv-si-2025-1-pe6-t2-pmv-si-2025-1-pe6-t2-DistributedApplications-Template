
import { LiteraryPreference } from '@/types';

// Simple create user DTO for a student project
export class CreateUserDto {
  name: string;
  email: string;
  password?: string;
  photoUrl?: string;
  preferences?: LiteraryPreference[];
}
