# PowerShell script to fix paths in HTML files
# This script ensures paths to /_next and images start with a leading slash

$docsDir = "docs"
$htmlFiles = Get-ChildItem -Path $docsDir -Filter "*.html" -Recurse

Write-Host "Found $($htmlFiles.Count) HTML files to process..."

foreach ($file in $htmlFiles) {
    Write-Host "Processing $($file.FullName)..."
    
    $content = Get-Content -Path $file.FullName -Raw
    
    # Fix /_next paths (ensure they start with /)
    $content = $content -replace '(src|href)="(_next)', '$1="/$2'
    
    # Fix image paths (ensure they start with /)
    $content = $content -replace '(src)="(images/)', '$1="/$2'
    
    # Write the modified content back to the file
    Set-Content -Path $file.FullName -Value $content
}

Write-Host "Path fixing completed!" 