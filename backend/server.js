import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import jsonServer from "json-server";

const PORT = process.env.PORT ?? 3000;
const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret";

const app = express();
app.use(cors());
app.use(express.json());

const router = jsonServer.router("db.json");
const db = router.db;

function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: "2h" }
  );
}

function authRequired(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return res.status(401).json({ message: "Falta el token" });

  const token = header.slice("Bearer ".length);
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
}

const userIdFromReq = (req) => Number(req.user?.sub);


function movieBelongsToUser(movie, userId) {
  return movie && Number(movie.userId) === Number(userId);
}

// AUTENTICACIÓN

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) return res.status(400).json({ message: "Faltan credenciales" });

  const user = db.get("users").find({ email }).value();
  if (!user || !user.passwordHash) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  // LÓGICA DE BANEO
  if (user.banned) {
    return res.status(403).json({ message: "TU CUENTA ESTÁ SUSPENDIDA. Contacta al administrador." });
  }


  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Credenciales inválidas" });

  const token = signToken(user);
  
  // Enviamos el token Y el rol
  return res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name, role: user.role }
  });
});

app.post("/auth/register", async (req, res) => {
    const { email, password, name } = req.body ?? {};
    if (!email || !password || !name) return res.status(400).json({ message: "Faltan datos" });

    const exists = db.get("users").find({ email }).value();
    if (exists) return res.status(409).json({ message: "Email ya registrado" });

    const passwordHash = await bcrypt.hash(password, 10);
    const users = db.get("users");
    const nextId = (users.maxBy("id").value()?.id ?? 0) + 1;

    const newUser = { 
        id: nextId, 
        email, 
        name, 
        passwordHash,
        role: "user",
        banned: false
    };
  
    users.push(newUser).write();

    return res.status(201).json({ id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role });
});

// GET ALL
app.get("/movies", authRequired, (req, res) => {
  const movies = db.get("movies").value();
  return res.json(movies);
});

// GET ONE
app.get("/movies/:id", authRequired, (req, res) => {
  const id = Number(req.params.id);
  const movie = db.get("movies").find({ id }).value();

  if (!movie) {
    return res.status(404).json({ message: "Película no encontrada" });
  }
  return res.json(movie);
});

// CREATE
app.post("/movies", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  const { titulo, director, anio, poster, genero, sinopsis } = req.body ?? {};

  if (!titulo) return res.status(400).json({ message: "El título es obligatorio" });

  const movies = db.get("movies");
  const nextId = (movies.maxBy("id").value()?.id ?? 0) + 1;

  const newMovie = {
    id: nextId,
    titulo,
    director: director || "",
    anio: Number(anio) || new Date().getFullYear(),
    poster: poster || "",
    genero: genero || "General",
    sinopsis: sinopsis || "",
    userId
  };

  movies.push(newMovie).write();
  return res.status(201).json(newMovie);
});

// UPDATE
app.patch("/movies/:id", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  const isAdmin = req.user?.role === 'admin';
  const id = Number(req.params.id);
  const movie = db.get("movies").find({ id }).value();

  if (!movie) return res.status(404).json({ message: "Película no encontrada" });

  if (!movieBelongsToUser(movie, userId) && !isAdmin) {
    return res.status(403).json({ message: "No tienes permisos para editar esta película" });
  }

  const patch = req.body;
  delete patch.id;

  const updated = db.get("movies").find({ id }).assign(patch).write();
  return res.json(updated);
});

// DELETE
app.delete("/movies/:id", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  const isAdmin = req.user?.role === 'admin'; 
  const id = Number(req.params.id);
  const movie = db.get("movies").find({ id }).value();

  if (!movie) return res.status(404).json({ message: "Película no encontrada" });

  if (!movieBelongsToUser(movie, userId) && !isAdmin) {
    return res.status(403).json({ message: "No tienes permisos para borrar esta película" });
  }

  db.get("movies").remove({ id }).write();
  return res.status(204).send();
});

app.use(jsonServer.defaults());
app.use(router);

app.listen(PORT, () => {
  console.log(`API Películas escuchando en http://localhost:${PORT}`);
});