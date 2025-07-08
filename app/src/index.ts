import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import {SwaggerGeneratorModel} from './models/SwaggerGeneratorModel';
import {SwaggerPromptService} from './services/SwaggerPromptService';
import { generateResponse } from 'ai-service';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());


app.post('/api/generate-swagger', async(req: Request, res: Response): Promise<any> => {
  try{
    const validatedData = SwaggerGeneratorModel.validateAppDescription(req.body);
    const prompt = SwaggerPromptService.generatePrompt(validatedData);

    const resultText = await generateResponse(prompt);

    //const swaggerSpec = SwaggerGeneratorModel.parseSwaggerSpec(resultText);

    res.json({
      success: true,
      specification: resultText,
      metadata: {
        generatedAt: new Date(),
        inputData: validatedData
      }
    });
  }catch(error){
    console.error('Error generating Swagger specification:', error);
    
    if (SwaggerGeneratorModel.isValidationError(error)) {
      return res.status(400).json({
        error: 'Invalid input data',
        details: error.errors
      });
    }
    
    if (SwaggerGeneratorModel.isSwaggerParseError(error)) {
      return res.status(500).json({
        error: 'Failed to generate valid Swagger specification',
        details: error.message
      });
    }
    
    res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }

});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});


// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not found',
    details: `Route ${req.originalUrl} not found`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AI Swagger Generator API running on port ${PORT}`);
  console.log(`📖 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔧 Generate endpoint: http://localhost:${PORT}/api/generate-swagger`);
});

export default app;