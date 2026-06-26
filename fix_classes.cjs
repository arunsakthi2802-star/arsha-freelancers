const fs = require('fs');
const path = require('path');

const dirs = ['src/components', 'src']; // src for App.jsx
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx') || f.endsWith('.tsx'));
    
    files.forEach(file => {
        let p = path.join(dir, file);
        let content = fs.readFileSync(p, 'utf8');
        let original = content;

        content = content.replace(/text-slate-850/g, 'text-slate-800');
        content = content.replace(/bg-slate-850/g, 'bg-slate-800');
        content = content.replace(/dark:bg-slate-850/g, 'dark:bg-slate-800');
        content = content.replace(/dark:text-slate-250/g, 'dark:text-slate-300');
        
        if (file === 'ProjectsView.jsx') {
            content = content.replace(/hover:text-slate-900"/g, 'hover:text-slate-900 dark:hover:text-white"');
        }

        if (content !== original) {
            fs.writeFileSync(p, content);
            console.log(`Updated ${file}`);
        }
    });
});
