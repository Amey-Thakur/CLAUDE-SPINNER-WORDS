param (
    [Parameter(Mandatory=$true)]
    [string]$ThemeFile
)

$SettingsPath = "$env:USERPROFILE\.claude\settings.json"

if (-not (Test-Path $ThemeFile)) {
    Write-Error "Theme file not found at $ThemeFile"
    exit
}

# Ensure directory exists
$Dir = [System.IO.Path]::GetDirectoryName($SettingsPath)
if (-not (Test-Path $Dir)) {
    New-Item -ItemType Directory -Path $Dir -Force
}

# Initialize settings.json if missing
if (-not (Test-Path $SettingsPath)) {
    "{}" | Out-File -FilePath $SettingsPath -Encoding utf8
}

# Read theme and settings
$ThemeJson = Get-Content -Raw $ThemeFile | ConvertFrom-Json
$Settings = Get-Content -Raw $SettingsPath | ConvertFrom-Json

# Update settings
$Settings | Add-Member -MemberType NoteProperty -Name "spinner" -Value @{
    mode = "replace"
    verbs = $ThemeJson.verbs
} -Force

# Write back
$Settings | ConvertTo-Json -Depth 10 | Out-File -FilePath $SettingsPath -Encoding utf8

Write-Host "Success: Theme applied to $SettingsPath"
Write-Host "Restart Claude Code to see changes."
