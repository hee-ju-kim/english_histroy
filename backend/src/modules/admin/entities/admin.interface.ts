import { Model } from 'mongoose';

export interface Admin {
  id: string;
  password: string;
  salt: string;
}

export interface AdminMethods {
  hashPassword(password: string): string;
  authenticate(password: string): boolean;
}

export interface AdminStatic extends Model<Admin, {}, AdminMethods> {
  getNo(): Promise<number>; 
}
