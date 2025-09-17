
import { LiteraryPreference } from '@/types';

// Simple update user DTO for a student project
export class UpdateUserDto {
  name?: string;
  email?: string;
  photoUrl?: string;
  preferences?: LiteraryPreference[];
}
