import { getRankingGlobal, getRankingByUser, createNewRanking, deleteRankingById } from '../services/index.js';
import { getRankingByPercentage } from '../services/index.js';

export async function getAllRanking(req, res) {
  try {
    const difficulty = req.query.difficulty;
    const ranking = await getRankingGlobal(difficulty);
    res.json(ranking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUserRanking(req, res) {
  try {
    const userRanking = await getRankingByUser(req.params.userId);
    res.json(userRanking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createRanking(req, res) {
  try {
    const ranking = await createNewRanking(req.params.userId, req.body);
    res.status(201).json(ranking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteRanking(req, res) {
  try {
    const result = await deleteRankingById(req.params.rankingId);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export async function getRankingPercentage(req, res) {
  try {
    const difficulty = req.query.difficulty;
    const ranking = await getRankingByPercentage(difficulty);
    res.json(ranking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}