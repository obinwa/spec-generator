import { SwaggerGeneratorModel } from '../models/SwaggerGeneratorModel';
import { 
  AppDescription
 } from '../types/swagger';

export class SwaggerPromptService {
  private static readonly BASE_PROMPT = `
  You are an expert API architect. Generate a comprehensive OpenAPI 3.0 specification based on the following app description.

  App Name: {appName}
  Description: {description}
  Features: {features}
  API Version: {apiVersion}
  Base URL: {baseUrl}

  Requirements:
  1. Create a complete OpenAPI 3.0 specification in JSON format
  2. Include realistic endpoints based on the app description
  3. Add proper HTTP methods (GET, POST, PUT, DELETE)
  4. Include request/response schemas with examples
  5. Add authentication if relevant to the features
  6. Include error responses (400, 401, 404, 500)
  7. Add tags for organization
  8. Include parameter descriptions and validation
  9. Make it production-ready with proper status codes
  10. Infer common CRUD operations and business logic endpoints
  11. Add realistic example data in responses
  12. Include proper data types and formats
  13. Add security schemes if authentication features are specified
  14. Include rate limiting headers if applicable
  15. Add pagination for list endpoints

  Return ONLY valid JSON - no markdown, no explanations, just the OpenAPI specification.
  `;


  /**
   * Generates a comprehensive prompt for OpenAPI specification generation
   */
  public static generatePrompt(appDescription: AppDescription): string {
    const featureSummary = SwaggerGeneratorModel.getFeatureSummary(appDescription.features || []);
    const baseUrl = appDescription.baseUrl || `https://api.${appDescription.appName.toLowerCase().replace(/\s+/g, '-')}.com`;
    
    return this.BASE_PROMPT
      .replace('{appName}', appDescription.appName)
      .replace('{description}', appDescription.description)
      .replace('{features}', featureSummary)
      .replace('{apiVersion}', appDescription.apiVersion)
      .replace('{baseUrl}', baseUrl);
  }

}

