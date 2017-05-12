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
    $less = "$src\style.less"
    $ts = "$src\bundle.ts"

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

function Update-Bundle(){
    gulp.cmd update:bundle --gulpfile $gulpfile
}

function Update-Css(){
    lessc.cmd $less | Out-Utf8 $css
} 

function Update-Html(){
    php.exe $php | Out-Utf8 $html
} 

function Update-Debug(){
    Remove-Directory $debug
    Update-Bundle
    Update-Css
    Update-Html
}

function Update-Release(){
    Remove-Directory $release
    Get-Content $html | Out-Utf8 $minHtml
    cleancss.cmd -O2 $css | Out-Utf8 $minCss
    uglifyjs.cmd $js --compress --mangle | Out-Utf8 $minJs
}

function Update-Build(){
    Remove-Directory $build
    Update-Debug
    Update-Release
}

function Update-All(){
    Update-Gulpfile
    Update-Build
}

# Utilities
function Out-Utf8([string] $Path){
    $input | Out-File (New-Item $Path -Force) -Encoding "utf8"
}

function Remove-Directory([string] $Path){
    Remove-Item $Path -recurse -ErrorAction Ignore
}