<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
ini_set('error_reporting', E_ALL);

//header('Content-Type: text/html; charset=UTF-8');
require_once "Locality.php";
require_once "Number2Text.php";

if (isset($_GET['number']) && !empty($_GET['number'])) {
    $number = $_GET ['number'];
} else {
    $number = 0;
}


if (isset($_GET['language']) && !empty($_GET['language'])) {
    $language = strtoupper ($_GET ['language']);
} else {
    $language = "EN";
}

if (isset($_GET['output']) && !empty($_GET['output'])) {
    $output = $_GET ['output'];
} else {
    $output = "text";
}


if (isset($_GET['locale']) && !empty($_GET['locale'])) {
    $locale = strtoupper ($_GET ['locale']);
} else {
    $locale = NULL;
}


if (isset($_GET['currency']) && !empty($_GET['currency'])) {
    $currency = $_GET ['currency'];
} else {
//$currency = array("جنيه", "جنيهات", "جنيهان");
//$currency = array("dollar", "dollars");
    $currency = "$";
//$currency = NULL ;
}

if (isset($_GET['units']) && !empty($_GET['units'])) {
    $units = $_GET ['units'];
} else {
//$units = array("قرش", "قروش", "قرشان");	
//$units = array("cent", "cents");	
$units = "¢";
//$units = NULL ;
}


$oTextNum = new Number2Text();
$Number2Text = $oTextNum->translateNumber($number, $language, $currency, $units, $locale, $output);
echo trim($Number2Text);

?>