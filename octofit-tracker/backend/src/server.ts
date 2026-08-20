import express from 'express';
import { connectDatabase } from './config/database.js';
import { createApiRouter } from './routes.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());
app.use('/api', createApiRouter());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api', baseUrl });
});

async function startServer(): Promise<void> {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`OctoFit API listening at ${baseUrl}`);
    });
  } catch (error) {
    console.error('Error connecting to octofit_db:', error);
    process.exitCode = 1;
  }
}

startServer();
