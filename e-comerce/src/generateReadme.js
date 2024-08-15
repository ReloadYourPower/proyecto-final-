const fs = require('fs');
const path = require('path');

function listFiles(dir, baseDir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (file !== 'node_modules') { // Excluir node_modules
        results.push(`${file}/`); // Añadir la carpeta
        results = results.concat(listFiles(filePath, baseDir));
      }
    } else {
      results.push(path.relative(baseDir, filePath)); // Añadir el archivo
    }
  });

  return results;
}

function formatFileStructure(files) {
  let formatted = '';
  files.forEach(file => {
    const indent = ' '.repeat(file.split('/').length - 1) * 2;
    formatted += `${indent}${file}\n`;
  });
  return formatted;
}

const baseDir = path.resolve(__dirname);
const files = listFiles(baseDir, baseDir);
const formattedFiles = formatFileStructure(files);

fs.writeFileSync('README.md', `# E-commerce Project\n\n## Project Structure\n\n${formattedFiles}`, 'utf8');
console.log('README.md file has been generated.');
