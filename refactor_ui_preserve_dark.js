import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories to process
const DIRS_TO_PROCESS = [
  path.join(__dirname, 'src', 'components'),
  path.join(__dirname, 'src', 'pages')
];

// Patterns to replace
const REPLACEMENTS = [
  // Heavy shadows
  {
    regex: /shadow-\[[^\]]+\]/g,
    replacement: 'shadow-sm hover:shadow-md transition-shadow dark:shadow-sm hover:shadow-md transition-shadow'
  },
  // Hard borders (remove thick black borders)
  {
    regex: /border-2 border-slate-950/g,
    replacement: 'border border-slate-200 dark:border-slate-800'
  },
  {
    regex: /border-4 border-slate-950/g,
    replacement: 'border-2 border-slate-200 dark:border-slate-800'
  },
  {
    regex: /border-2 border-black/g,
    replacement: 'border border-slate-200 dark:border-slate-800'
  },
  // Rounding replacements for sharper aesthetic
  { regex: /rounded-3xl/g, replacement: 'rounded-md' },
  { regex: /rounded-2xl/g, replacement: 'rounded-md' },
  { regex: /rounded-xl/g, replacement: 'rounded' },
  
  // Brutalist borders removal
  { regex: /brutalist-border-sm/g, replacement: 'border border-slate-200 dark:border-slate-700' },
  { regex: /brutalist-border/g, replacement: 'border border-slate-200 dark:border-slate-700' },
  
  // Remove line clamping so all text is visible
  { regex: /line-clamp-[0-9]+/g, replacement: '' }
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  for (const { regex, replacement } of REPLACEMENTS) {
    content = content.replace(regex, replacement);
  }

  if (content !== originalContent) {
    // clean up any double spaces introduced
    content = content.replace(/  +/g, ' ');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

for (const dir of DIRS_TO_PROCESS) {
  if (fs.existsSync(dir)) {
    console.log(`Walking directory: ${dir}`);
    walkDir(dir);
  } else {
    console.warn(`Directory not found: ${dir}`);
  }
}

console.log('UI Refactoring Complete.');
