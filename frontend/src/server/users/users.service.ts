
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

// Simple in-memory database for users
const USERS = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: '$2b$10$abcdefghijklmnopqrstuvwxyz', // Hashed 'password123'
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop',
    preferences: ['fiction', 'sci-fi', 'fantasy'],
    joinDate: new Date('2023-01-15')
  }
];

@Injectable()
export class UsersService {
  async create(createUserDto): Promise<User> {
    // Simple in-memory creation
    const newUser = {
      id: `${USERS.length + 1}`,
      ...createUserDto,
      joinDate: new Date(),
    };
    USERS.push(newUser);
    return newUser as User;
  }

  async findAll(): Promise<User[]> {
    return USERS as User[];
  }

  async findById(id: string): Promise<User> {
    const user = USERS.find(u => u.id === id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = USERS.find(u => u.email === email);
    return user as User;
  }

  async update(id: string, updateUserDto): Promise<User> {
    const userIndex = USERS.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    USERS[userIndex] = {
      ...USERS[userIndex],
      ...updateUserDto
    };
    
    return USERS[userIndex] as User;
  }

  async remove(id: string): Promise<void> {
    const userIndex = USERS.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error(`User with ID ${id} not found`);
    }
    USERS.splice(userIndex, 1);
  }
}
