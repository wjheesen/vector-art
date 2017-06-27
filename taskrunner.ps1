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
    $res = "$src\res"
        $icon = "$res\build\icon"

$gulpfileJs = "$PSScriptRoot\gulpfile.js"
$gulpfileTs = "$PSScriptRoot\gulpfile.ts"

function Initialize-Repository(){
    Set-Location $PSScriptRoot
    npm.cmd install
    Update-All
}

function Update-Gulpfile(){
    tsc.cmd $gulpfileTs
}

function Update-MeshSpecifications {
    gulp.cmd update:meshes --gulpfile $gulpfileJs
}

function Update-Meshes(){
    Update-MeshSpecifications
    Update-Svgs
    Update-Icons
    Update-Js
}

function Update-Shaders(){
    gulp.cmd update:shaders --gulpfile $gulpfileJs
}

function Update-Svgs(){
    gulp.cmd update:svgs --gulpfile $gulpfileJs
}

function Update-Js(){
    Remove-Item "$debug\*.js" -ErrorAction Ignore
    # tsc --project "$src\ts\tsconfig.json"
    gulp.cmd update:js --gulpfile $gulpfileJs
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
    icon-font-generator.cmd "$res\**\*.svg" --out $icon --prefix "icon" --center --normalize
    Remove-Directory "$debug\icon";
    Remove-Directory "$release\icon"
    Copy-Item $icon $debug -Recurse -ErrorAction Ignore
    Copy-Item $icon $release -Recurse -ErrorAction Ignore
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
    Update-Meshes
    Update-Shaders
    Update-Build
}

function Publish-App([string] $msg){
    Copy-Item "$release/*" $app -Force -Recurse
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