<?php 
$package = json_decode(file_get_contents(realpath(__DIR__ . '/../package.json'))); 
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <meta name="msapplication-tap-highlight" content="no" />
	<meta name="description" content="<?= $package->description ?>" />
	<meta name="author" content="<?= $package->author ?>" />
	<title><?= "$package->displayName $package->version"?></title>
  <link rel="stylesheet" href="style.css"/>
</head>
<body>
    <div id="toolbar"></div>
    <canvas id="canvas" width="0" height="0"></canvas>
    <script src="bundle.js"></script>
</body>
</html>