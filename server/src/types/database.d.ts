export interface DatabaseUser {
  idUser: number;
  email: string;
  fName: string;
  lName: string;
  storedhashedpassword: string;
  idImage: number;
  // add other properties as needed
}

export interface Database {
  users: DatabaseUser[];
    // add other tables as needed
}