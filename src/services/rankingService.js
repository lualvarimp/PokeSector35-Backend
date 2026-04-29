import { Ranking } from '../models/index.js';
import sequelize from '../config/database.js';

export async function getRankingGlobal(difficulty = null) {
  let query = 'SELECT * FROM ranking_view';

  if (difficulty) {
    query += ` WHERE difficulty_id = '${difficulty}'`;
  }

  query += ' ORDER BY captured_count DESC';

  const ranking = await sequelize.query(query);
  return ranking[0];
}

export async function getRankingByUser(userId) {
  const userRanking = await Ranking.findAll({
    where: { user_id: userId },
    order: [['completed_at', 'DESC']]
  });

  return userRanking;
}

export async function createNewRanking(userId, rankingData) {
  const ranking = await Ranking.create({
    user_id: userId,
    ...rankingData
  });

  return ranking;
}

export async function deleteRankingById(rankingId) {
  const ranking = await Ranking.findByPk(rankingId);

  if (!ranking) {
    throw new Error('Ranking no encontrado');
  }

  await ranking.destroy();
  return { message: 'Ranking eliminado' };
}

export async function getRankingByPercentage(difficulty = null) {
  let query = `
    SELECT 
      r.id,
      r.user_id,
      u.username,
      r.captured_count,
      r.escaped_count,
      r.difficulty_id,
      r.completed_at,
      ROUND((r.captured_count * 100.0 / NULLIF(r.captured_count + r.escaped_count, 0))::numeric, 2) AS capture_rate
    FROM ranking r
    JOIN users u ON r.user_id = u.id
    WHERE u.deleted_at IS NULL
      AND (r.captured_count + r.escaped_count) >= 10
  `;

  if (difficulty) {
    query += ` AND r.difficulty_id = '${difficulty}'`;
  }

  query += ` ORDER BY capture_rate DESC, r.completed_at ASC`;

  const ranking = await sequelize.query(query);
  return ranking[0];
}