<?php 
$package = json_decode(file_get_contents(realpath(__DIR__ . '/../package.json'))); 
$version = explode(".", $package->version);
$major = $version[0];
$minor = $version[1];
$title = "$package->displayName v$major.$minor";
$shapes = ["triangle", "square", "diamond", "pentagon", "hexagon", "circle", "star", "heart", "flower", "bat"];
$strokes = ["brush", "line"];
$tools = ["select", "pan"];
$actions = ["undo", "redo"];
$btn = "btn btn-sm";
$toggle = "dropdown-toggle dropdown-toggle-split";
$btn_toggle = "$btn $toggle";
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
        <input id="color-picker" type="text" style="display: none" />
        <div class="btn-group"> 
            <div class="btn-group">
                <button id="shape-button" type="button" class="<?=$btn?>">
                    <i class="<?=$md_inactive?>"></i>
                </button>
                <button type="button" class="<?=$btn_toggle?>" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="sr-only">Toggle Dropdown</span>
                </button>
                <div id="shape-settings" class="dropdown-menu">
                    <label for="maintain-aspect">Maintain aspect:</label>
                    <input name="maintain-aspect" type="checkbox" checked />
                    <div class="dropdown-divider"></div>
                    <?php foreach($shapes as $key=>$value): ?>
                        <a id="<?= $value?>" role="button">
                            <i class="icon-<?= $value?> <?=$md?>"></i>
                        </a>
                    <?php endforeach; ?>
                </div>
            </div>
            <div class="btn-group">
                <button id="stroke-button" type="button" class="<?=$btn?>">
                    <i class="<?=$md_inactive?>"></i>
                </button>
                <button type="button" class="<?=$btn_toggle?>" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="sr-only">Toggle Dropdown</span>
                </button>
                <div id="stroke-settings" class="dropdown-menu">
                    <label for="stroke-thickness">Thickness:</label>
                    <input name="stroke-thickness" type="number" />
                    <div class="dropdown-divider"></div>
                    <?php foreach($strokes as $key=>$value): ?>
                        <a id="<?= $value?>" role="button">
                            <i class="icon-<?= $value?> <?=$md?>"></i>
                        </a>
                    <?php endforeach; ?>
                </div>
            </div>
            <div class="btn-group">
                <button id="cursor-button" type="button" class="<?=$btn?>">
                    <i class="<?=$md_inactive?>"></i>
                </button>
                <button type="button" class="<?=$btn_toggle?>" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="sr-only">Toggle Dropdown</span>
                </button>
                <div id="cursor-settings" class="dropdown-menu">
                    <?php foreach($tools as $key=>$value): ?>
                        <a id="<?= $value?>" role="button">
                            <i class="icon-<?= $value?> <?=$md?>"></i>
                        </a>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
        <div class="btn-group">
            <?php foreach($actions as $key=>$value): ?>
                <button id="<?=$value?>" class="<?=$btn?>" type='button'>
                    <i class="icon-<?= $value?> <?=$md?>"></i>
                </button>
            <?php endforeach; ?>
        </div>
    </div>
    <canvas id="canvas" width="0" height="0"></canvas>
    <script src="bundle.js"></script>
</body>
</html>