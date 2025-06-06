import express, { Request, Response, NextFunction } from "express";
import env from "dotenv";
import bcrypt from "bcrypt";
import pg from "pg";
import { DatabaseUser } from "./types/database.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import cors from 'cors';

const app = express();
const PORT = 3000;
const saltRounds = 10;

env.config({path: "./.env"});

const secretKey: string = process.env.SESSION_SECRET || (() => {
  throw new Error('SESSION_SECRET no está definido');
})();

app.use(express.json());
app.use(express.static("public"));

app.use(cors({
  origin: 'http://localhost:5173', // o el puerto de tu front
  credentials: true
}));

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: +process.env.PG_PORT!,
});

db.connect();

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    res.status(403).json({ error: "Acceso denegado" });
    return; // Usar return en lugar de return res.status()
  }
  
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(401).json({ error: "Token inválido" });
      return; // Usar return en lugar de return res.status()
    }
    req.user = decoded as JwtPayload; // Almacenar datos del usuario
    next();
  });
};

//Get Routes

app.get("/getAllUsers", verifyToken, async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    
    res.json(result.rows);
    
  } catch (error) {
    console.error("Error obteniendo los usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

//Post Routes

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
     
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
         
    if (result.rows.length > 0) {
      const user: DatabaseUser = result.rows[0];
      const match = await bcrypt.compare(password, user.storedhashedpassword);

             
      if (match) {
        // Generar el token JWT
        const token = jwt.sign({ id: user.idUser, email: user.email }, secretKey, { expiresIn: "1h" });
        
        // Preparar datos del usuario (sin la contraseña)
        const userData = {
          id: user.idUser,
          email: user.email,
          fName: user.fName,
          lName: user.lName,
          idImage: user.idImage,
          // otros campos que necesites
        };
                
        res.json({ 
          message: "Login exitoso", 
          token,
          user: userData // ← Agregar los datos del usuario
        });
      } else {
        res.status(401).json({ error: "Contraseña incorrecta" });
      }
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error(`Error en login: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.post("/register", async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, profileImage } = req.body;

  try {
    const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (existingUser.rows.length > 0) {
      res.status(400).json({ error: "El usuario ya existe" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await db.query(
      `INSERT INTO users (first_name, last_name, email, storedHashedPassword, profile_image)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [firstName, lastName, email, hashedPassword, profileImage]
    );

    const newUser = result.rows[0];

    const token = jwt.sign(
      { id: newUser.id_user, email: newUser.email },
      secretKey,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Usuario registrado exitosamente",
      token,
      user: {
        id: newUser.id_user,
        firstName: newUser.first_name,
        lastName: newUser.last_name,
        email: newUser.email,
        profileImage: newUser.profile_image
      }
    });

  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});