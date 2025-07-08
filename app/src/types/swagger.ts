import { z } from 'zod';

export interface AppDescription {
  appName: string;
  description: string;
  features?: string[];
  apiVersion: string;
  baseUrl?: string;
}

export interface SwaggerSpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description?: string;
  };
  paths: Record<string, any>;
  [key: string]: any;
}

export interface GeneratedResponse {
  success: boolean;
  specification: SwaggerSpec;
  metadata: {
    generatedAt: string;
    inputData: AppDescription;
    tokenUsed: number;
  };
}

// Zod schemas 
export const AppDescriptionSchema = z.object({
  appName: z.string().min(1, 'App name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  features: z.array(z.string()).optional().default([]),
  apiVersion: z.string().default('1.0.0'),
  baseUrl: z.string().optional(),
});

export const SwaggerSpecSchema = z.object({
  openapi: z.string(),
  info: z.object({
    title: z.string(),
    version: z.string(),
    description: z.string().optional(),
  }),
  paths: z.record(z.any()),
}).passthrough();