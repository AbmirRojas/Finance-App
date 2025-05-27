import express from "express";
import session from "express-session";
import env from "dotenv";
import bodyParser from "body-parser";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import pg from "pg";
import { DatabaseUser } from "./types/database.js";


const app = express();
env.config();


const PORT: number = Number(process.env.PORT)
const secret: string = process.env.SESSION_SECRET || (() => {
  throw new Error('SESSION_SECRET no está definido');
})();;

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: PORT,
});
db.connect();

app.get("/", (req, res) => {
  res.send("Welcome to the Finance App!");
});

passport.use(
  "local",
  new Strategy(async function verify(email: string, password: string, cb: (err: Error | null, user?: Express.User | false) => void) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
      
      if (result.rows.length > 0) {
        const user = result.rows[0] as DatabaseUser;
        const storedHashedPassword = user.password;
        
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb(new Error("User not found"));
      }
    } catch (err) {
      console.log(err);
      return cb(new Error("Database query failed"));
    }
  })
);

// Serialize user - store user ID in session
passport.serializeUser((user: Express.User, cb: (err: Error | null, id?: number) => void) => {
  cb(null, user.id);
});

// Deserialize user - retrieve user from database using stored ID
passport.deserializeUser(async (id: number, cb: (err: Error | null, user?: Express.User | false) => void) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    
    if (result.rows.length > 0) {
      const user = result.rows[0];
      cb(null, user);
    } else {
      cb(null, false);
    }
  } catch (err) {
    cb(err as Error);
  }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

