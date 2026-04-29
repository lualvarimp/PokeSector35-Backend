import { Ranking, User } from '../models/index.js';
import sequelize from '../config/database.js';

export async function getAllRanking(req, res) {
  try {
    const difficulty = req.query.difficulty;
    let where = {};
    if (difficulty) {
      where.difficulty_id = difficulty;
    }

    const ranking = await sequelize.query(
      `SELECT * FROM ranking_view ${difficulty ? "WHERE difficulty_id = '" + difficulty + "'" : ""} ORDER BY captured_count DESC`
    );
    res.json(ranking[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUserRanking(req, res) {
  try {
    const userRanking = await Ranking.findAll({
      where: { user_id: req.params.userId },
      order: [['completed_at', 'DESC']]
    });
    res.json(userRanking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createRanking(req, res) {
  try {
    const ranking = await Ranking.create({
      user_id: req.params.userId,
      ...req.body
    });
    res.status(201).json(ranking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteRanking(req, res) {
  try {
    const ranking = await Ranking.findByPk(req.params.rankingId);
    if (!ranking) {
      return res.status(404).json({ error: 'Ranking no encontrado' });
    }
    await ranking.destroy();
    res.json({ message: 'Ranking eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}