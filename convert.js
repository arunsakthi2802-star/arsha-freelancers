import fs from 'fs';
import path from 'path';
import babel from '@babel/core';
import presetTypescript from '@babel/preset-typescript';

const srcDir = './src';

async function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      const isTsx = fullPath.endsWith('.tsx');
      const ext = isTsx ? '.jsx' : '.js';
      const outPath = fullPath.replace(/\.tsx?$/, ext);
      
      const content = fs.readFileSync(fullPath, 'utf8');
      
      try {
          const result = babel.transformSync(content, {
            filename: fullPath,
            presets: [
              [presetTypescript, { isTSX: isTsx, allExtensions: isTsx }]
            ],
            retainLines: true,
          });
          
          fs.writeFileSync(outPath, result.code);
          fs.unlinkSync(fullPath); // remove old file
          console.log(`Converted ${fullPath} -> ${outPath}`);
      } catch (err) {
          console.error(`Failed to convert ${fullPath}:`, err);
      }
    }
  }
}

processDir(srcDir).catch(console.error);
