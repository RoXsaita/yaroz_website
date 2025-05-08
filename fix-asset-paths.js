const fs = require('fs');
const path = require('path');

// Output directory
const outDir = './out';

// Process a specific HTML file
function processHtmlFile(filePath) {
  try {
    console.log(`Processing ${filePath}`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix _next paths (remove leading slash)
    content = content.replace(/(['"])(\/_next\/)/g, '$1_next/');
    content = content.replace(/src="\/_next\//g, 'src="_next/');
    content = content.replace(/href="\/_next\//g, 'href="_next/');
    
    // Ensure images paths have consistent format (no leading slash)
    content = content.replace(/(['"])\/images\//g, '$1images/');
    
    // Fix links to videos
    content = content.replace(/(['"])\/videos\//g, '$1videos/');
    
    // Writing back the fixed content
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully processed ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

// Main function to process all HTML files in the output directory
function fixPaths() {
  try {
    console.log(`Starting path fixing in ${outDir}`);
    
    // Process main HTML files directly (without using glob)
    const mainHtmlFiles = [
      path.join(outDir, 'index.html'),
      path.join(outDir, '404.html'),
      path.join(outDir, 'placeholder-generator.html')
    ];
    
    let successCount = 0;
    
    // Process main HTML files
    for (const file of mainHtmlFiles) {
      if (fs.existsSync(file) && processHtmlFile(file)) {
        successCount++;
      }
    }
    
    // Check for any HTML files in subdirectories
    const subDirs = ['404'];
    for (const subDir of subDirs) {
      const subDirPath = path.join(outDir, subDir);
      if (fs.existsSync(subDirPath) && fs.statSync(subDirPath).isDirectory()) {
        const subDirFiles = fs.readdirSync(subDirPath);
        for (const file of subDirFiles) {
          if (file.endsWith('.html')) {
            const filePath = path.join(subDirPath, file);
            if (processHtmlFile(filePath)) {
              successCount++;
            }
          }
        }
      }
    }
    
    console.log(`Path fixing completed! Successfully processed ${successCount} files.`);
  } catch (error) {
    console.error('Error fixing paths:', error);
  }
}

// Run the function
fixPaths(); 