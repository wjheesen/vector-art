$src = "$PSScriptRoot\src";

function Initialize-Repository(){
    Set-Location $PSScriptRoot
    npm install
    Update-All
}

function Update-Gulpfile(){
    tsc --project "$PSScriptRoot\tsconfig.json"
}

function Update-Main(){
    Set-Location $PSScriptRoot
    gulp update:main
}

function Update-All(){
    Update-Gulpfile
    Update-Main
}

export-modulemember -function Initialize-Repository, Update-Main, Update-Gulpfile, Update-All