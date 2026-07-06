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
  // Remove all dark mode classes
  { regex: /dark:[a-zA-Z0-9-\/\[\]:]+/g, replacement: '' },
  // Remove any double spaces left behind
  { regex: /  +/g, replacement: ' ' }
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  for (const { regex, replacement } of REPLACEMENTS) {
    content = content.replace(regex, replacement);
  }

  // Clean up class=" " or className=" "
  content = content.replace(/className="\s+/g, 'className="');
  content = content.replace(/\s+"/g, '"');

  if (content !== originalContent) {
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
      if (file !== 'node_modules' && file !== '.git') {
        walkDir(fullPath);
      }
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
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

console.log('Dark mode removal complete.');
