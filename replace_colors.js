const fs = require('fs');
const path = require('path');

const rules = [
  { regex: /\bbg-white\b/g, replace: 'bg-[var(--color-surface-elevated)]' },
  { regex: /text-\[#3A332D\]/g, replace: 'text-[var(--color-text-primary)]' },
  { regex: /text-\[#8A837D\]/g, replace: 'text-[var(--color-text-secondary)]' },
  { regex: /bg-\[#FCF8F2\]/g, replace: 'bg-[var(--color-bg-ivory)]' },
  { regex: /bg-\[#F8F4EF\]/g, replace: 'bg-[var(--color-surface-secondary)]' },
  { regex: /bg-\[#FDFBF9\]/g, replace: 'bg-[var(--color-surface-secondary)]' },
  { regex: /text-\[#D9895B\]/g, replace: 'text-[var(--color-accent-peach)]' },
  { regex: /bg-\[#D9895B\]/g, replace: 'bg-[var(--color-accent-peach)]' },
  { regex: /border-\[#E8DED5\]/g, replace: 'border-[var(--color-border-soft)]' }
];

function processDir(dir) {
  let modifiedCount = 0;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      modifiedCount += processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content;
      for (const rule of rules) {
        newContent = newContent.replace(rule.regex, rule.replace);
      }
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        modifiedCount++;
      }
    }
  }
  return modifiedCount;
}

const count = processDir('./src');
console.log('Modified ' + count + ' files.');
