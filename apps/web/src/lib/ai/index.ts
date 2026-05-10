export interface SceneConfig {
  type: 'text-reflow' | '3d-ascii' | 'video-ascii';
  params: {
    characters?: string;
    resolution?: number;
    contrast?: number;
    motionSpeed?: number;
    obstacles?: Array<{ type: 'sphere' | 'box'; position: [number, number, number]; size: number }>;
  };
}

/**
 * Translates a plain language prompt into a SceneConfig.
 * In a production environment, this would call an LLM (e.g. Gemini).
 */
export async function generateConfigFromPrompt(prompt: string): Promise<SceneConfig> {
  // Placeholder: In reality, we'd use Gemini to parse the prompt
  // For now, let's detect some keywords to simulate 'AI' behavior
  
  const lower = prompt.toLowerCase();
  
  if (lower.includes('matrix') || lower.includes('rain')) {
    return {
      type: 'text-reflow',
      params: {
        characters: '01',
        motionSpeed: 2.0,
        resolution: 0.5
      }
    };
  }

  if (lower.includes('sphere') || lower.includes('ball')) {
    return {
      type: '3d-ascii',
      params: {
        obstacles: [{ type: 'sphere', position: [0, 0, 0], size: 2.0 }],
        resolution: 0.8
      }
    };
  }

  // Default fallback
  return {
    type: 'text-reflow',
    params: {
      characters: ' ·.:=+*#@',
      motionSpeed: 1.0,
      resolution: 0.5
    }
  };
}
