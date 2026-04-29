import { registerUser, loginUser, generateAccessToken, generateRefreshToken, refreshAccessToken } from '../services/index.js';

export async function register(req, res) {
  try {
    const { username, password } = req.body;
    const user = await registerUser(username, password);
    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    res.status(201).json({ 
      message: 'Usuario registrado', 
      access_token: accessToken,
      refresh_token: refreshToken,
      user_id: user.id 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await loginUser(username, password);
    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    res.json({ 
      message: 'Login exitoso', 
      access_token: accessToken,
      refresh_token: refreshToken,
      user_id: user.id 
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

export async function refresh(req, res) {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({ error: 'Refresh token requerido' });
    }

    const accessToken = await refreshAccessToken(refresh_token);
    res.json({ access_token: accessToken });
  } catch (error) {
    res.status(401).json({ error: 'Refresh token inválido o expirado' });
  }
}

export async function logout(req, res) {
  try {
    res.json({ message: 'Logout exitoso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}