interface DatabaseUser {
  id: number;
  email: string;
  password: string;
  // add other properties as needed
}

export interface Database {
  users: DatabaseUser[];
    // add other tables as needed
}