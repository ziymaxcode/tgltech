const fs = require('fs');
const glob = require('glob');

glob('src/**/*.tsx', (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('max-w-[1600px]')) {
      content = content.replace(/max-w-\[1600px\]/g, 'w-full');
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  });
});
