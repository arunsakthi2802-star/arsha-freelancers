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
  // Remove line clamping so all text is visible
  { regex: /line-clamp-[0-9]+/g, replacement: '' },
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
