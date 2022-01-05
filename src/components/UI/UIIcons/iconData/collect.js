const fs = require('fs');
const path = require('path');

const IGNORE = ['collect.js', 'index.ts'];

const collect = () => {
  const icons = fs.readdirSync(path.join(__dirname));
  const result = icons.reduce((acc, file) => {
    if (IGNORE.includes(file)) return acc;
    const ff = file.split('.')[0];
    return `${acc}\nexport { default as ${ff} } from './${ff}';`;
  }, '');

  fs.writeFileSync(path.join(__dirname, 'index.ts'), result);
};

collect();
