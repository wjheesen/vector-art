<?php 
$package = json_decode(file_get_contents(realpath(__DIR__ . '/../package.json'))); 
$version = explode(".", $package->version);
$major = $version[0];
$minor = $version[1];
$title = "$package->displayName v$major.$minor";
$shapes = ["triangle", "square", "diamond", "pentagon", "hexagon", "circle", "star", "heart", "flower", "bat"]
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
                <button id="shape-button" type="button" class="btn btn-sm">
                    <i></i>
                </button>
                <button type="button" class="btn btn-sm dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="sr-only">Toggle Dropdown</span>
                </button>
                <div class="dropdown-menu">
                    <label for="maintainAspect">Maintain aspect:</label>
                    <input name="maintainAspect" type="checkbox" checked />
                    <div class="dropdown-divider"></div>
                    <?php foreach($shapes as $key=>$value): ?>
                        <a id="<?= $value?>" role="button">
                            <i class="icon-<?= $value?> md-dark md-18"></i>
                        </a>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php 
            $buttons = ["line", "brush", "spray", "pan", "select", "delete"];
            foreach ($buttons as $key => $value) {
                echo "<button id='$value-button' class='btn btn-sm btn-primary' type='button'>$value</button>\n";
            }
        ?>
    </div>
    <canvas id="canvas" width="0" height="0"></canvas>
    <script src="bundle.js"></script>
</body>
</html>