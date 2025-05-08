# Create necessary directories in the yaroz-sweets project
New-Item -Force -ItemType Directory -Path public\images\Cakes
New-Item -Force -ItemType Directory -Path public\images\Sweets
New-Item -Force -ItemType Directory -Path public\images\Catering
New-Item -Force -ItemType Directory -Path public\images\aboutus
New-Item -Force -ItemType Directory -Path public\images\Hero

Write-Host "Created directory structure in yaroz-sweets\public\images\"

# Source directory with the images (parent folder)
$sourceDir = "C:\Deving\Yara_Website\public\images"

# Check if source directory exists
if (Test-Path -Path $sourceDir) {
    Write-Host "Found source directory at $sourceDir"
    
    # Copy from source Sweets to destination Sweets
    if (Test-Path -Path "$sourceDir\Sweets") {
        Copy-Item -Path "$sourceDir\Sweets\*.jpg" -Destination "public\images\Sweets\" -Force
        Copy-Item -Path "$sourceDir\Sweets\*.mp4" -Destination "public\images\Sweets\" -Force -ErrorAction SilentlyContinue
        Write-Host "Copied Sweets images and videos"
    }
    
    # Copy from source Cakes to destination Cakes
    if (Test-Path -Path "$sourceDir\Cakes") {
        Copy-Item -Path "$sourceDir\Cakes\*.jpg" -Destination "public\images\Cakes\" -Force
        Copy-Item -Path "$sourceDir\Cakes\*.mp4" -Destination "public\images\Cakes\" -Force -ErrorAction SilentlyContinue
        Write-Host "Copied Cakes images and videos"
    }
    
    # Copy from source Catering to destination Catering
    if (Test-Path -Path "$sourceDir\Catering") {
        Copy-Item -Path "$sourceDir\Catering\*.jpg" -Destination "public\images\Catering\" -Force
        Copy-Item -Path "$sourceDir\Catering\*.mp4" -Destination "public\images\Catering\" -Force -ErrorAction SilentlyContinue
        Write-Host "Copied Catering images and videos"
    }
    
    # Copy about us images if they exist
    if (Test-Path -Path "$sourceDir\aboutus") {
        Copy-Item -Path "$sourceDir\aboutus\*.jpg" -Destination "public\images\aboutus\" -Force
        Copy-Item -Path "$sourceDir\aboutus\*.mp4" -Destination "public\images\aboutus\" -Force -ErrorAction SilentlyContinue
        Write-Host "Copied aboutus images and videos"
    }
    
    # Copy hero images if they exist
    if (Test-Path -Path "$sourceDir\Hero") {
        Copy-Item -Path "$sourceDir\Hero\*.jpg" -Destination "public\images\Hero\" -Force
        Copy-Item -Path "$sourceDir\Hero\*.mp4" -Destination "public\images\Hero\" -Force -ErrorAction SilentlyContinue
        Write-Host "Copied Hero images and videos"
    }

    # Check if videos directory exists and copy from there too
    if (Test-Path -Path "C:\Deving\Yara_Website\public\videos") {
        New-Item -Force -ItemType Directory -Path public\videos
        Copy-Item -Path "C:\Deving\Yara_Website\public\videos\*.mp4" -Destination "public\videos\" -Force -ErrorAction SilentlyContinue
        Write-Host "Copied videos from videos directory"
    }
} else {
    Write-Host "Source directory $sourceDir not found"
}

# Also check for video files directly in the Hero folder without jpg extension
if (Test-Path -Path "C:\Deving\Yara_Website\public\images\Hero") {
    # Copy all file types from Hero to make sure we get the video
    Copy-Item -Path "C:\Deving\Yara_Website\public\images\Hero\*.*" -Destination "public\images\Hero\" -Force -ErrorAction SilentlyContinue
    Write-Host "Copied all files from Hero directory"
}

# Ensure we have an OG image for social sharing
Write-Host "Checking for OG image..."
if (!(Test-Path -Path "public\images\yaroz-og-image.jpg") -and (Test-Path -Path "public\images\placeholders\logo.png")) {
    Write-Host "Creating OG image from logo..."
    Copy-Item -Path "public\images\placeholders\logo.png" -Destination "public\images\yaroz-og-image.jpg" -Force
    Write-Host "OG image created from logo."
} else {
    Write-Host "OG image already exists or logo not found."
}

Write-Host "Script completed. If you see any images and videos being copied, they should now be available in your website."
Write-Host "Please restart your Next.js development server to see the changes." 