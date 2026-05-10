import { prepareWithSegments, layoutNextLineRange, materializeLineRange } from '@chenglou/pretext';

export interface AsciiOptions {
  characters?: string;
  width?: number;
  height?: number;
  contrast?: number;
}

export const DEFAULT_CHARS = ' ·.:=+*#@';

export class AsciiEngine {
  private characters: string;

  constructor(options: AsciiOptions = {}) {
    this.characters = options.characters || DEFAULT_CHARS;
  }

  /**
   * Converts a grayscale value (0-255) to an ASCII character.
   */
  public getCharFromLuminance(luminance: number): string {
    const index = Math.floor((luminance / 255) * (this.characters.length - 1));
    return this.characters[index];
  }

  /**
   * Simple text reflow using pretext.
   * This allows text to wrap correctly without DOM dependencies.
   */
  public reflowText(text: string, maxWidth: number, font: string = '16px Monospace') {
    const prepared = prepareWithSegments(text, font);
    let cursor = { segmentIndex: 0, graphemeIndex: 0 };
    const lines: string[] = [];

    while (true) {
      const range = layoutNextLineRange(prepared, cursor, maxWidth);
      if (range === null) break;

      const line = materializeLineRange(prepared, range);
      lines.push(line.text);
      cursor = range.end;
    }

    return lines;
  }
}
