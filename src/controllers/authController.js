import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function register(req, res) {
  try {
    const { username, password } = req.body;

    const userExists = await User.findOne({ where: { username } });
    if (userExists) {
      return res.status(400).json({ error: 'Usuario ya existe' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password_hash,
      role: 'user'
    });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({ message: 'Usuario registrado', token, user_id: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username, deleted_at: null } });
    if (!user) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ message: 'Login exitoso', token, user_id: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function logout(req, res) {
  try {
    res.json({ message: 'Logout exitoso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
