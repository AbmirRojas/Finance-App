export interface DatabaseUser {
  id_user: number;
  first_name: string;
  last_name: string;
  email: string;
  storedhashedpassword: string;
  profile_image: string;
  user_balance: number;
  // add other properties as needed
}

export interface userSession {
  id_user: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string;
  user_balance: number;
}

export interface DatabaseTransaction {
  id_transaction: number;
  category: string;
  id_member: number;
  amount: number;
  date: Date;
  merchant: string;
  type: string;
}

export interface Database {
  users: DatabaseUser[];
  transactions: DatabaseTransaction[];
    // add other tables as needed
}