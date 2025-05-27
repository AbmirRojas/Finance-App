// types/express.d.ts
declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      password: string;
      // Add other user properties from your usuarios table
      // For example:
      // name?: string;
      // created_at?: Date;
      // role?: string;
    }
  }
}

export {};