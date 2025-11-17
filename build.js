const fs = require('fs');
const path = require('path');

// Read all source files
const html = fs.readFileSync('wedding-invitation.html', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');
const js = fs.readFileSync('script.js', 'utf8');

// Inline CSS and JS into HTML
let bundledHtml = html;

// Replace the CSS link with inline styles
bundledHtml = bundledHtml.replace(
    '<link rel="stylesheet" href="styles.css">',
    `<style>\n${css}\n</style>`
);

// Replace the script src with inline script
bundledHtml = bundledHtml.replace(
    '<script src="script.js"></script>',
    `<script>\n${js}\n</script>`
);

// Create dist folder if it doesn't exist
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

// Create dist/assets folder if it doesn't exist
if (!fs.existsSync('dist/assets')) {
    fs.mkdirSync('dist/assets');
}

// Copy all assets to dist/assets
const assetsDir = 'assets';
if (fs.existsSync(assetsDir)) {
    const assetFiles = fs.readdirSync(assetsDir);
    assetFiles.forEach(file => {
        const srcPath = path.join(assetsDir, file);
        const destPath = path.join('dist/assets', file);
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${file}`);
    });
}

// Write the bundled HTML file
fs.writeFileSync('dist/wedding-invitation-bundle.html', bundledHtml);

console.log('\nBuild complete! File saved to dist/wedding-invitation-bundle.html');
console.log('\nFor Google Sites:');
console.log('1. Host this file on GitHub Pages, Netlify, or any web hosting');
console.log('2. In Google Sites, use "Embed" > "Embed code" or "By URL"');
console.log('3. Paste your hosted URL as an iframe');
