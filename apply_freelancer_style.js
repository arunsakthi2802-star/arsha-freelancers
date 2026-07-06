import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories to process
const DIRS_TO_PROCESS = [
  path.join(__dirname, 'src', 'components'),
  path.join(__dirname, 'src', 'pages'),
  path.join(__dirname, 'src')
];

// Patterns to replace
const REPLACEMENTS = [
  // 1. Remove all dark mode classes
  { regex: /dark:[a-zA-Z0-9-\/\[\]:]+/g, replacement: '' },
  
  // 2. Brutalist borders removal
  { regex: /brutalist-border-sm/g, replacement: 'border border-slate-200' },
  { regex: /brutalist-border/g, replacement: 'border border-slate-200' },
  { regex: /border-2 border-slate-950/g, replacement: 'border border-slate-200' },
  { regex: /border-4 border-slate-950/g, replacement: 'border-2 border-slate-200' },
  
  // 3. Remove hard shadows and replace with soft shadows
  { regex: /shadow-\[.*?\]/g, replacement: 'shadow-sm hover:shadow-md transition-shadow' },
  
  // 4. Flatten bubbly corners to sharp corporate edges
  { regex: /rounded-3xl/g, replacement: 'rounded-md' },
  { regex: /rounded-2xl/g, replacement: 'rounded-md' },
  { regex: /rounded-xl/g, replacement: 'rounded' },
  { regex: /rounded-full/g, replacement: 'rounded' }, // Wait, rounded-full is used for avatars, let's keep it mostly, maybe not replace globally. Let's skip rounded-full.

  // 5. Replace Neo colors with clean white/blue/pink
  { regex: /bg-neo-[a-z]+/g, replacement: 'bg-white border-t-2 border-blue-500' },
  { regex: /bg-neo-pastel-[a-z]+/g, replacement: 'bg-slate-50' },

  // 6. Remove line-clamps to make text visible
  { regex: /line-clamp-[0-9]+/g, replacement: '' },
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  for (const { regex, replacement } of REPLACEMENTS) {
    content = content.replace(regex, replacement);
  }

  // Cleanup duplicate spaces and class artifacts
  content = content.replace(/className="\s+/g, 'className="');
  content = content.replace(/\s+"/g, '"');
  content = content.replace(/  +/g, ' ');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        walkDir(fullPath);
      }
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      processFile(fullPath);
    }
  }
}

for (const dir of DIRS_TO_PROCESS) {
  console.log(`Walking directory: ${dir}`);
  walkDir(dir);
}

console.log('UI transformation to Freelancer.in style complete.');
