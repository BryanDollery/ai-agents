import { describe, test, expect, beforeAll, beforeEach } from '@jest/globals';
import dotenv from 'dotenv';
import { Agent, model, systemPrompt } from '@bryandollery/ai-agents';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type SupportedModel =
  | 'openai:gpt-4'
  | 'openai:gpt-4-turbo'
  | 'openai:gpt-4o-mini';

describe('GreetingAgent E2E Tests', () => {
  let openAIKey: string;

  // Factory function to create agent with specific model
  function createGreetingAgent(
    modelName: SupportedModel = 'openai:gpt-4-turbo',
  ) {
    @model(modelName)
    @systemPrompt(`
      Greet the user by their name in a friendly tone.
    `)
    class DynamicGreetingAgent extends Agent<string, string> { }

    return new DynamicGreetingAgent();
  }

  beforeAll(async () => {
    dotenv.config({ path: '.env' });
    dotenv.config({ path: '.env.local' });

    openAIKey = process.env.OPENAI_API_KEY || '';

    if (!openAIKey) {
      throw new Error(
        'OPENAI_API_KEY environment variable is required for tests',
      );
    }
  });

  beforeEach(async () => {
    // Add a small delay between tests to ensure we're not rate limited
    await sleep(1000);
  });

  test('should greet user with their name using GPT-4', async () => {
    const agent = createGreetingAgent('openai:gpt-4');
    const response = await agent.run('My name is Alice');

    expect(response).toBeTruthy();
    expect(typeof response).toBe('string');
    expect(response.toLowerCase()).toContain('alice');
    expect(response.toLowerCase()).toContain('hello');
  }, 15000);

  test('should handle different names appropriately using GPT-4 Turbo', async () => {
    const agent = createGreetingAgent('openai:gpt-4-turbo');
    const response = await agent.run('My name is Bob');

    expect(response).toBeTruthy();
    expect(typeof response).toBe('string');
    expect(response.toLowerCase()).toContain('bob');
    expect(response.toLowerCase()).toContain('hello');
  }, 15000);

  test('should maintain friendly tone using default model', async () => {
    // Uses default model
    const agent = createGreetingAgent();
    const response = await agent.run('My name is Charlie');

    expect(response).toBeTruthy();
    expect(typeof response).toBe('string');
    // Check for friendly tone indicators
    const friendlyPhrases = ['great', 'nice', 'pleasure', 'happy', 'glad'];
    expect(
      friendlyPhrases.some((phrase) => response.toLowerCase().includes(phrase)),
    ).toBeTruthy();
  }, 15000);

  test('should work with GPT-4o-mini', async () => {
    const agent = createGreetingAgent('openai:gpt-4o-mini');
    const response = await agent.run('My name is David');

    expect(response).toBeTruthy();
    expect(typeof response).toBe('string');
    expect(response.toLowerCase()).toContain('david');
    // Check for any common greeting word
    const greetings = ['hello', 'hi', 'hey', 'greetings'];
    expect(
      greetings.some((greeting) => response.toLowerCase().includes(greeting)),
    ).toBeTruthy();
  }, 15000);
});
