import express from 'express';
import { connectDatabase } from './config/database.js';
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
    app.listen(port, '0.0.0.0', () => {
      console.log(`OctoFit API listening at ${baseUrl}`);
    });
  } catch (error) {
    console.error('Error connecting to octofit_db:', error);
    process.exitCode = 1;
  }
}

startServer();
