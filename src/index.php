<?php 
$package = json_decode(file_get_contents(realpath(__DIR__ . '/../package.json'))); 
$version = explode(".", $package->version);
$major = $version[0];
$minor = $version[1];
$title = "$package->displayName v$major.$minor";

$meshes = [
    "triangle", "trapezoid", "square", "pentagon", "hexagon", "octagon", "circle",
    "diamond", "raindrop", "star3", "star4", "star5", "star6", "star8", 
    "sun", "heart", "pineTree", "leaf", "bat", "cloud", "umbrella",  
    "flower", "chevron", "arrow", "x", "hourglass", "triangleFlower1", "triangleFlower2", 
    "triangleFrame", "triforce", "blockFlower4", "blockFlower5", "spray", "star16",
];

$tools = [
    "shapeAspect", "shape", "shapeStroke", "stroke", "shapeLine", "line", "shapeSpray"
];

$cursors = [
    /*"colorSampler",*/ "pan", "edit", 
];

$actions = ["undo", "redo", "paste"];

$editActions = [
     "copy", "moveForward", "moveToFront", "moveBackward", "moveToBack", "remove"
];

$btn = "btn btn-sm";
$btn_toggle = "$btn dropdown-toggle";
$md = "md";
$md_inactive = "$md md-inactive";
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <meta name="msapplication-tap-highlight" content="no" />
	<meta name="description" content="<?= $package->description ?>" />
	<meta name="author" content="<?= $package->author ?>" />
	<title><?= $title ?></title>
   <link rel="stylesheet" href="style.css"/>
   <link rel="stylesheet" href="icon/icons.css"/>
</head>
<body>
    <div id="toolbar">
        <div class="btn-group">
            <input id="fill-color" type="text" style="display: none" />
            <input id="stroke-color" type="text" style="display: none" />
        </div>
        <div class="btn-group"> 
            <div class="btn-group">
                <button id="mesh-button" type="button" class="<?=$btn_toggle?>" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="<?=$md?>"></i><span class="sr-only">Toggle Dropdown</span>
                </button>
                <div id="mesh-settings" class="dropdown-menu" aria-labelledby="shape-button">
                    <?php foreach($meshes as $key=>$value): ?>
                        <a id="<?= $value?>" role="button">
                            <i class="icon-<?= $value?> <?=$md?>"></i>
                        </a>
                    <?php endforeach; ?>
                </div>
            </div>
            <div class="btn-group">
                <button id="tool-button" type="button" class="<?=$btn_toggle?>" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="<?=$md?>"></i><span class="sr-only">Toggle Dropdown</span>
                </button>
                <div id="tool-settings" class="dropdown-menu dropdown-menu-right" aria-labelledby="tool-button">
                    <?php foreach($tools as $key=>$value): ?>
                        <a id="<?= $value?>" role="button">
                            <i class="icon-<?= $value?> <?=$md?>"></i>
                        </a>
                    <?php endforeach; ?>
                </div>
            </div>
            <div class="btn-group">
                <button id="other-button" type="button" class="<?=$btn_toggle?>" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="icon-cog <?=$md?>"></i>
                    <span class="sr-only">Toggle Dropdown</span>
                </button>
                <div id="other-settings" class="dropdown-menu dropdown-menu-right" aria-labelledby="settings-button">
                    <label for="line-width">Line Width:</label>
                    <input name="line-width" type="number" />
                    <label for="zoom-speed">Zoom Speed:</label>
                    <input name="zoom-speed" type="number" />
                </div>
            </div>
        </div>
        <div id="cursor-settings" class="btn-group">
            <?php foreach($cursors as $key=>$value): ?>
                <button id="<?=$value?>" class="<?=$btn?>" type='button'>
                    <i class="<?="icon-$value $md_inactive"?>"></i>
                </button>
            <?php endforeach; ?>
        </div>
        <div class="btn-group">
            <?php foreach($actions as $key=>$value): ?>
                <button id="<?=$value?>" class="<?=$btn?>" type='button'>
                    <i class="<?="icon-$value $md"?>"></i>
                </button>
            <?php endforeach; ?>
        </div>
        <div id="edit-actions" class="btn-group">
            <?php foreach($editActions as $key=>$value): ?>
                <button id="<?=$value?>" class="<?=$btn?>" type='button'>
                    <i class="<?="icon-$value $md"?>"></i>
                </button>
            <?php endforeach; ?>
        </div>
    </div>
    <canvas id="canvas" width="0" height="0"></canvas>
    <script src="bundle.js"></script>
</body>
</html>