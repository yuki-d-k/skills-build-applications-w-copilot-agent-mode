import { Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';

export function createApiRouter(): Router {
  const router = Router();

  router.get('/users/', async (_request, response) => {
    try {
      const users = await User.find().lean();
      response.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      response.status(500).json({ error: 'Failed to fetch users' });
    }
  });

  router.get('/teams/', async (_request, response) => {
    try {
      const teams = await Team.find().populate('members', 'name email level').lean();
      response.json(teams);
    } catch (error) {
      console.error('Error fetching teams:', error);
      response.status(500).json({ error: 'Failed to fetch teams' });
    }
  });

  router.get('/activities/', async (_request, response) => {
    try {
      const activities = await Activity.find().populate('user', 'name email').lean();
      response.json(activities);
    } catch (error) {
      console.error('Error fetching activities:', error);
      response.status(500).json({ error: 'Failed to fetch activities' });
    }
  });

  router.get('/leaderboard/', async (_request, response) => {
    try {
      const entries = await LeaderboardEntry.find()
        .populate('user', 'name email level')
        .populate('team', 'name description')
        .sort({ points: -1 })
        .lean();
      response.json(entries);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      response.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
  });

  router.get('/workouts/', async (_request, response) => {
    try {
      const workouts = await Workout.find().lean();
      response.json(workouts);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      response.status(500).json({ error: 'Failed to fetch workouts' });
    }
  });

  return router;
}