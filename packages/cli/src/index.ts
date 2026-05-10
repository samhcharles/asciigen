#!/usr/bin/env node

import { Command } from 'commander';
import { AsciiEngine } from '@asciigen/engine';
import sharp from 'sharp';

const program = new Command();

program
  .name('asciigen')
  .description('CLI to generate ASCII art and backgrounds')
  .version('0.1.0');

program
  .command('convert')
  .description('Convert an image to ASCII')
  .argument('<path>', 'path to the image')
  .option('-w, --width <number>', 'width of the output', '80')
  .action(async (path, options) => {
    const engine = new AsciiEngine();
    const width = parseInt(options.width);

    try {
      const { data, info } = await sharp(path)
        .resize(width)
        .grayscale()
        .raw()
        .toBuffer({ resolveWithObject: true });

      let output = '';
      for (let i = 0; i < data.length; i++) {
        output += engine.getCharFromLuminance(data[i]);
        if ((i + 1) % info.width === 0) {
          output += '\n';
        }
      }

      console.log(output);
    } catch (err) {
      console.error('Error processing image:', err);
    }
  });

program.parse();
