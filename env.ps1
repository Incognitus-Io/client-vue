param (
  [switch]$switch,
  [switch]$save,
  [Int][ValidateRange(2, 3)]$set
)

Write-Host $set

if ($set -eq 2 -or $set -eq 3) {
  $mode = [int]"$(yarn -s json -f .\package.json mode)"
  if ($mode -eq $set) {
    return;
  }

  Write-Host "Setting to " -NoNewLine
  if ($set -eq 3) {
    Write-Host "v3" -ForegroundColor Cyan
    yarn json -I -f .\package.json -e "this.peerDependencies2=this.peerDependencies"
    yarn json -I -f .\package.json -e "this.peerDependencies=undefined"
    yarn json -I -f .\package.json -e "this.peerDependencies=this.peerDependencies3"
    yarn json -I -f .\package.json -e "this.mode=3"
  }
  elseif ($set -eq 2) {
    Write-Host "v2" -ForegroundColor Cyan
    yarn json -I -f .\package.json -e "this.peerDependencies3=this.peerDependencies"
    yarn json -I -f .\package.json -e "this.peerDependencies=undefined"
    yarn json -I -f .\package.json -e "this.peerDependencies=this.peerDependencies2"
    yarn json -I -f .\package.json -e "this.mode=2"
  }
  return
}

if ($switch.IsPresent) {
  $mode = [int]"$(yarn -s json -f .\package.json mode)"
  Write-Host "Switching to " -NoNewLine
  if ($mode -eq 2) {
    Write-Host "v3" -ForegroundColor Cyan
    yarn json -I -f .\package.json -e "this.peerDependencies2=this.peerDependencies"
    yarn json -I -f .\package.json -e "this.peerDependencies=undefined"
    yarn json -I -f .\package.json -e "this.peerDependencies=this.peerDependencies3"
    yarn json -I -f .\package.json -e "this.mode=3"
  }
  elseif ($mode -eq 3) {
    Write-Host "v2" -ForegroundColor Cyan
    yarn json -I -f .\package.json -e "this.peerDependencies3=this.peerDependencies"
    yarn json -I -f .\package.json -e "this.peerDependencies=undefined"
    yarn json -I -f .\package.json -e "this.peerDependencies=this.peerDependencies2"
    yarn json -I -f .\package.json -e "this.mode=2"
  }
  
  return
}

if ($save.IsPresent) {
  $mode = [int]"$(yarn -s json -f .\package.json mode)"
  Write-Host "Saving to " -NoNewLine
  Write-Host "v$mode" -ForegroundColor Cyan
  if ($mode -eq 2) {
    yarn json -I -f .\package.json -e "this.peerDependencies2=this.peerDependencies"
  }
  elseif ($mode -eq 3) {
    yarn json -I -f .\package.json -e "this.peerDependencies3=this.peerDependencies"
  }
  
  return
}

Write-Host "Invalid command" -ForegroundColor Red

