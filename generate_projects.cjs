const fs = require('fs');

const htmlContent = fs.readFileSync('data/1000_it_project_ideas_explorer(1).html', 'utf8');

// Extract arrays and objects using regex
const techMatch = htmlContent.match(/const TECH_PREFIXES = (\[[\s\S]*?\]);/);
const funcsMatch = htmlContent.match(/const FUNCTIONS = (\[[\s\S]*?\]);/);
const subjectsMatch = htmlContent.match(/const SUBJECTS = (\{[\s\S]*?\});/);
const metaMatch = htmlContent.match(/const META = (\{[\s\S]*?\});/);

const originalProjectsJS = fs.readFileSync('src/data/projects.js', 'utf8');

// Change export const studentProjects = [ to const baseProjects = [
let updatedProjectsJS = originalProjectsJS.replace('export const studentProjects = [', 'const baseProjects = [');

const generatorCode = `
// --- 5000 GENERATED PROJECTS ---
const TECH_PREFIXES = ${techMatch[1]};
const FUNCTIONS = ${funcsMatch[1]};
const SUBJECTS = ${subjectsMatch[1]};
const META = ${metaMatch[1]};

const DEPARTMENTS = ['CS', 'IT', 'MCA', 'BCA', 'ECE', 'EEE', 'MBA'];
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];
const DURATIONS = ['2 Weeks', '3 Weeks', '4 Weeks', '5 Weeks', '6 Weeks'];

const generatedProjects = [];
let sno = 18; // base projects has 17

Object.keys(SUBJECTS).forEach(category => {
  const catSubjects = SUBJECTS[category];
  const meta = META[category];
  
  TECH_PREFIXES.forEach((tech, tIdx) => {
    FUNCTIONS.forEach((func, fIdx) => {
      const subject = catSubjects[(tIdx + fIdx) % 10];
      const title = \`\${tech} \${subject} \${func}\`;
      
      const stackString = meta.stack[sno % meta.stack.length];
      const technology = stackString.split(',').map(s => s.trim());
      
      const categoryName = category.split('&')[0].trim().toLowerCase();
      const description = \`The "\${title}" is a specialized software engineering initiative targeting \${categoryName} challenges. Designed specifically for \${meta.users}, it utilizes modern IT frameworks to replace manual inefficiencies with scalable automation.\`;
      
      const details = \`Core Architecture involves: (1) Secure Authentication, (2) The core processing engine using \${technology[0]}, (3) Database management via \${technology[technology.length-1]}, and (4) An administrative dashboard for real-time overview. Tested for high availability and low latency. Recommended complete stack: \${stackString}.\`;
      
      generatedProjects.push({
        id: \`PRJ-\${sno.toString().padStart(4, '0')}\`,
        title: title,
        description: description,
        technology: technology,
        category: category,
        difficulty: DIFFICULTIES[sno % DIFFICULTIES.length],
        duration: DURATIONS[sno % DURATIONS.length],
        features: [
            'Secure Authentication',
            'Real-time Dashboard',
            'Automated Reporting',
            'Scalable Database'
        ],
        department: DEPARTMENTS[sno % DEPARTMENTS.length],
        details: details,
        impact: meta.impact,
        existing: meta.existing
      });
      sno++;
    });
  });
});

export const studentProjects = [...baseProjects, ...generatedProjects];
`;

fs.writeFileSync('src/data/projects.js', updatedProjectsJS + generatorCode);
console.log('Successfully generated 5000 projects inside projects.js');
