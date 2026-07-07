# Fix script for Windows/Live Server blank page with Vite+React
# Run in PowerShell from project root (d:\Rehan\xyz)

$ErrorActionPreference = 'Stop'

Write-Host "1) Ensure you are using Vite dev server (not VSCode Live Server)" -ForegroundColor Cyan
Write-Host "   Run: npm run dev" -ForegroundColor Yellow

Write-Host "2) Disable Live Server for index.html" -ForegroundColor Cyan
Write-Host "   In VSCode: Right-click index.html -> 'Stop' Live Server, then open the local Vite URL." -ForegroundColor Yellow

Write-Host "3) (Optional) Quick check: open in a browser the Vite URL shown by npm run dev" -ForegroundColor Cyan

Write-Host "Done." -ForegroundColor Green

