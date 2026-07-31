const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'blogs');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const images = [
  {
    src: 'C:\\Users\\mypc\\.gemini\\antigravity-ide\\brain\\e4885362-7d4d-46d2-892d-043ceb2eb82a\\burnout_blog_hero_1785483366068.png',
    dest: 'workplace-burnout-signs.png'
  },
  {
    src: 'C:\\Users\\mypc\\.gemini\\antigravity-ide\\brain\\e4885362-7d4d-46d2-892d-043ceb2eb82a\\stress_management_blog_hero_1785484310620.png',
    dest: 'workplace-stress-management.png'
  },
  {
    src: 'C:\\Users\\mypc\\.gemini\\antigravity-ide\\brain\\e4885362-7d4d-46d2-892d-043ceb2eb82a\\hermind_burnout_blog_hero_1785485845269.png',
    dest: 'burnout-in-women.png'
  },
  {
    src: 'C:\\Users\\mypc\\.gemini\\antigravity-ide\\brain\\e4885362-7d4d-46d2-892d-043ceb2eb82a\\hermind_hormonal_mood_swings_hero_1785486872832.png',
    dest: 'hormonal-mood-swings-natural-management.png'
  }
];


images.forEach(img => {
  const destPath = path.join(targetDir, img.dest);
  if (fs.existsSync(img.src)) {
    fs.copyFileSync(img.src, destPath);
    console.log(`Successfully copied ${img.src} -> ${destPath}`);
  } else {
    console.error(`Source not found: ${img.src}`);
  }
});
