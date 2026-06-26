const fs = require('fs');
const imageAsBase64 = fs.readFileSync('public/arsha logo.jpeg', 'base64');
fs.mkdirSync('src/utils', { recursive: true });
fs.writeFileSync('src/utils/logoBase64.js', `export const logoBase64 = 'data:image/jpeg;base64,${imageAsBase64}';\n`);
console.log('Logo converted successfully!');
