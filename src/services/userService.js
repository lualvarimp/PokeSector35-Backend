import { User, Ranking, CapturedPokemon } from '../models/index.js';
import sequelize from '../config/database.js';

export async function getUserStats(userId) {
  const user = await User.findByPk(userId);
  
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const totalGames = await Ranking.count({ where: { user_id: userId } });
  
  const totalCaptured = await sequelize.query(
    `SELECT SUM(captured_count) as total FROM ranking WHERE user_id = ${userId}`
  );

  const totalEscaped = await sequelize.query(
    `SELECT SUM(escaped_count) as total FROM ranking WHERE user_id = ${userId}`
  );

  const uniquePokemon = await sequelize.query(
    `SELECT COUNT(DISTINCT pokemon_id) as count FROM captured_pokemon WHERE user_id = ${userId} AND is_global = true`
  );

  return {
    username: user.username,
    total_games: totalGames,
    total_captured: totalCaptured[0][0]?.total || 0,
    total_escaped: totalEscaped[0][0]?.total || 0,
    unique_pokemon: uniquePokemon[0][0]?.count || 0
  };
}