import express, { Request, Response, NextFunction } from "express";
import env from "dotenv";
import bcrypt from "bcrypt";
import pg from "pg";
import { DatabaseTransaction, DatabaseUser, userSession } from "./types/database.js";
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

// Función auxiliar para obtener el balance actual de un usuario
app.get("/getUserBalance/:userId", verifyToken, async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await db.query(
      `SELECT user_balance FROM users WHERE id_user = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    res.json([result.rows[0]]);

  } catch (error) {
    console.error("Error al obtener el balance: ", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.get("/getTeamTransactions", verifyToken, async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM transactions");

    if (result.rows.length < 0) {
      res.json({message: "no hay transacciones"});
      return;
    } else {
      res.json(result.rows);
    }

  } catch (error) {
    console.error("Error al obtener las transacciones: ", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }

});

app.get("/userTransactions/:userId", verifyToken, async (req, res) => {

  const { userId } = req.params;

  try {
    const result = await db.query("SELECT * FROM transactions WHERE id_member = $1", [userId]);

    if (result.rows.length < 0) {
      res.json({message: "no hay transacciones"});
      return;
    } else {
      res.json(result.rows);
    }

  } catch (error) {
    console.error("Error al obtener las transacciones: ", error);
    res.status(500).json({ error: "Error interno del servidor" });
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
        const token = jwt.sign({ id: user.id_user, email: user.email }, secretKey, { expiresIn: "1h" });
        
        // Preparar datos del usuario (sin la contraseña)
        const userData: userSession = {
          id_user: user.id_user,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          profile_image: user.profile_image,
          balance: user.balance,
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
  const balance = 0;

  try {
    const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (existingUser.rows.length > 0) {
      res.status(400).json({ error: "El usuario ya existe" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await db.query(
      `INSERT INTO users (first_name, last_name, email, storedHashedPassword, profile_image, user_balance)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [firstName, lastName, email, hashedPassword, profileImage, balance]
    );

    const newUser: DatabaseUser = result.rows[0];

    const token = jwt.sign(
      { id: newUser.id_user, email: newUser.email },
      secretKey,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Usuario registrado exitosamente",
      token,
      user:<userSession> {
        id_user: newUser.id_user,
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        profile_image: newUser.profile_image,
        balance: newUser.balance,
      }
    });

  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.post("/addTransaction", verifyToken, async (req, res) => {
  const { id_member, merchant, category, date, amount, transactionType } = req.body;

  try {
    // Validar que todos los campos requeridos estén presentes
    if (!id_member || !merchant || !category || !date || !amount || !transactionType) {
      res.status(400).json({ error: "Todos los campos son requeridos" });
      return;
    }

    // Validar que el amount sea un número válido
    const transactionAmount = parseFloat(amount);
    if (isNaN(transactionAmount) || transactionAmount <= 0) {
      res.status(400).json({ error: "El monto debe ser un número positivo válido" });
      return;
    }

    // Validar que el tipo de transacción sea válido
    if (!['income', 'expense'].includes(transactionType)) {
      res.status(400).json({ error: "El tipo de transacción debe ser 'income' o 'expense'" });
      return;
    }

    // Insertar la transacción en la base de datos
    const result = await db.query(
      `INSERT INTO transactions (id_member, category, amount, date, merchant, type)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [id_member, category, transactionAmount, date, merchant, transactionType]
    );

    const transaction: DatabaseTransaction = result.rows[0];

    // Obtener el balance actual del usuario
    const userBalanceResult = await db.query(
      `SELECT user_balance FROM users WHERE id_user = $1`, 
      [id_member]
    );

    if (userBalanceResult.rows.length === 0) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    const currentBalance = parseFloat(userBalanceResult.rows[0].balance) || 0;
    
    // Calcular el nuevo balance según el tipo de transacción
    let newBalance;
    if (transactionType === 'income') {
      newBalance = currentBalance + transactionAmount;
    } else { // expense
      newBalance = currentBalance - transactionAmount;
    }

    // Actualizar el balance del usuario
    await db.query(
      `UPDATE users SET user_balance = $1 WHERE id_user = $2`,
      [newBalance, id_member]
    );

    // Respuesta exitosa con información de la transacción y nuevo balance
    res.status(201).json({
      message: "Transacción registrada exitosamente",
      transaction: {
        id_member: transaction.id_member,
        category: transaction.category,
        merchant: transaction.merchant,
        amount: transaction.amount,
        date: transaction.date,
        type: transaction.type
      },
      previousBalance: currentBalance,
      newBalance: newBalance,
      balanceChange: transactionType === 'income' ? `+${transactionAmount}` : `-${transactionAmount}`
    });

  } catch (error) {
    console.error("Error al registrar la transacción: ", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});