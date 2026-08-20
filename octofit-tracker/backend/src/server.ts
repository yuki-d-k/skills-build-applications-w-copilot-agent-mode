import express from 'express';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { createApiRouter } from './routes.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

const allowedOrigins = codespaceName
  ? [`https://${codespaceName}-5173.app.github.dev`]
  : ['http://localhost:5173'];

app.use((request, response, next) => {
  const origin = request.headers.origin;
  if (allowedOrigins.includes(origin)) {
    response.header('Access-Control-Allow-Origin', origin);
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  if (request.method === 'OPTIONS') {
    return response.sendStatus(200);
  }
  next();
});
app.use(express.json());
app.use('/api', createApiRouter());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api', baseUrl });
});

async function startServer(): Promise<void> {
  try {
    await connectDatabase();
    const server = app.listen(port, '0.0.0.0', () => {
      console.log(`OctoFit API listening at ${baseUrl}`);
    });

    process.on('SIGTERM', async () => {
      console.log('SIGTERM received, shutting down gracefully');
      server.close(async () => {
        await disconnectDatabase();
        process.exit(0);
      });
    });

    process.on('SIGINT', async () => {
      console.log('SIGINT received, shutting down gracefully');
      server.close(async () => {
        await disconnectDatabase();
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Error connecting to octofit_db:', error);
    process.exitCode = 1;
  }
}

startServer();
