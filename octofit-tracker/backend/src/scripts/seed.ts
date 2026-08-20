import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Maya Chen', email: 'maya.chen@example.com', goal: 'Build endurance', level: 8 },
      { name: 'Jordan Rivera', email: 'jordan.rivera@example.com', goal: 'Increase strength', level: 6 },
      { name: 'Avery Brooks', email: 'avery.brooks@example.com', goal: 'Improve mobility', level: 5 },
    ]);

    const teams = await Team.insertMany([
      { name: 'Sunrise Striders', description: 'Early-morning runners', members: [users[0]._id, users[1]._id] },
      { name: 'Core Collective', description: 'Strength and mobility crew', members: [users[1]._id, users[2]._id] },
    ]);

    await Activity.insertMany([
      { user: users[0]._id, type: 'Run', durationMinutes: 42, distanceKm: 6.4, calories: 470, recordedAt: new Date('2026-08-18') },
      { user: users[1]._id, type: 'Strength', durationMinutes: 35, calories: 290, recordedAt: new Date('2026-08-19') },
      { user: users[2]._id, type: 'Yoga', durationMinutes: 28, calories: 120, recordedAt: new Date('2026-08-19') },
    ]);

    await LeaderboardEntry.insertMany([
      { user: users[0]._id, team: teams[0]._id, points: 860, rank: 1 },
      { user: users[1]._id, team: teams[0]._id, points: 640, rank: 2 },
      { user: users[2]._id, team: teams[1]._id, points: 510, rank: 3 },
    ]);

    await Workout.insertMany([
      { title: 'Tempo Run', category: 'Cardio', difficulty: 'Intermediate', durationMinutes: 35, target: 'Endurance' },
      { title: 'Full-body Foundation', category: 'Strength', difficulty: 'Beginner', durationMinutes: 30, target: 'Strength' },
      { title: 'Desk Reset Flow', category: 'Mobility', difficulty: 'Beginner', durationMinutes: 15, target: 'Mobility' },
    ]);

    // Seed the octofit_db database with test data
    console.log('Database seeding complete');
    await disconnectDatabase();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
