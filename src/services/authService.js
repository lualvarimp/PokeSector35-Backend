import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, RefreshToken } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

export async function registerUser(username, password) {
  const userExists = await User.findOne({ where: { username } });
  if (userExists) {
    throw new Error('Usuario ya existe');
  }

  const password_hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password_hash,
    role: 'user'
  });

  return user;
}

export async function loginUser(username, password) {
  const user = await User.findOne({ where: { username, deleted_at: null } });
  if (!user) {
    throw new Error('Usuario o contraseña incorrectos');
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatch) {
    throw new Error('Usuario o contraseña incorrectos');
  }

  return user;
}

export function generateAccessToken(user) {
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return token;
}

export async function generateRefreshToken(user) {
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES }
  );

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await RefreshToken.create({
    user_id: user.id,
    token: refreshToken,
    expires_at: expiresAt
  });

  return refreshToken;
}

export async function refreshAccessToken(refreshToken) {
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  const storedToken = await RefreshToken.findOne({
    where: { token: refreshToken, user_id: decoded.id }
  });

  if (!storedToken) {
    throw new Error('Refresh token inválido o expirado');
  }

  const user = await User.findByPk(decoded.id);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  return generateAccessToken(user);
}