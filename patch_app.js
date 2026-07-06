const fs = require('fs');

let code = fs.readFileSync('src/App.jsx', 'utf8');

const viewsToUpdate = [
  'HomeView', 'AboutView', 'ServicesView', 'ProjectsView', 
  'PortfolioView', 'GalleryView', 'FaqView', 'ContactView', 
  'ReviewView', 'StoriesView', 'LoginView'
];

viewsToUpdate.forEach(view => {
  // Regex to match <ViewName ... /> or <ViewName>
  const regex = new RegExp(`(<${view}\\b[^>]*)(>)`, 'g');
  
  code = code.replace(regex, (match, p1, p2) => {
    // If it already has darkMode, don't add it again
    if (p1.includes('darkMode=')) return match;
    
    // Make sure we put it before the closing bracket
    // p1 might end with a slash if it's self closing, e.g., <FaqView />
    if (p1.endsWith('/')) {
      return p1.slice(0, -1) + ' darkMode={darkMode} />' + (p2 !== '>' ? p2 : '');
    } else {
      return p1 + ' darkMode={darkMode}' + p2;
    }
  });
});

fs.writeFileSync('src/App.jsx', code);
console.log('App.jsx patched successfully!');
