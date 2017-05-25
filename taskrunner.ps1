$website = "$PSScriptRoot\..\wjheesen.github.io"
$app = "$website\vector-art"

$build = "$PSScriptRoot\build"
    $debug = "$build\debug"
        $html = "$debug\index.html"
        $css = "$debug\style.css"
        $js = "$debug\bundle.js"
        
    $release = "$build\release"
        $minHtml = "$release\index.html"
        $minCss = "$release\style.css"
        $minJs = "$release\bundle.js"
        
$src = "$PSScriptRoot\src"
    $php = "$src\index.php"
    $scss = "$src\style.scss"
    $ts = "$src\bundle.ts"
    $svg = "$src\svg"
    $icon = "$src\icon"

$gulpfile = "$PSScriptRoot\gulpfile.js"
$taskrunner = "$PSScriptRoot\taskrunner.ps1"
$tsconfig = "$PSScriptRoot\tsconfig.json"

function Initialize-Repository(){
    Set-Location $PSScriptRoot
    npm.cmd install
    Update-All
}

function Update-Gulpfile(){
    tsc.cmd --project $tsconfig
}

function Update-Shaders(){
    gulp.cmd update:shaders
}

function Update-Js(){
    gulp.cmd update:bundle --gulpfile $gulpfile
}

function Update-Css(){
    node-sass.cmd $scss | Out-Utf8 $css
} 

function Update-Html(){
    php.exe $php | Out-Utf8 $html
} 

function Update-Icons(){
    Remove-Directory $icon
    New-Item $icon -ItemType "Directory"
    icon-font-generator.cmd "$svg\*.svg" --out $icon --prefix "icon"
}

function Update-Debug(){
    Remove-Directory $debug
    Update-Js
    Update-Css
    Update-Html
    Copy-Item $icon $debug -Recurse
}

function Update-Release(){
    Remove-Directory $release
    Get-Content $html | Out-Utf8 $minHtml
    cleancss.cmd -O2 $css | Out-Utf8 $minCss
    uglifyjs.cmd $js --compress --mangle | Out-Utf8 $minJs
    Copy-Item $icon $release -Recurse
}

function Update-Build(){
    Remove-Directory $build
    Update-Debug
    Update-Release
}

function Update-All(){
    Update-Gulpfile
    Update-Shaders
    Update-Build
}

function Publish-App([string] $msg){
    Copy-Item "$release/*" $app -Force
    Set-Location $website
    git commit --all --message $msg
    git push
    Set-Location $PSScriptRoot
}

# Utilities
function Out-Utf8([string] $Path){
    $input | Out-File (New-Item $Path -Force) -Encoding "utf8"
}

function Remove-Directory([string] $Path){
    Remove-Item $Path -recurse -ErrorAction Ignore
}