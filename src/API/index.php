<?php
// error_reporting(E_ALL);
// ini_set("display_errors", 1);
// ini_set('error_reporting', E_ALL);

//header('Content-Type: text/html; charset=UTF-8');
require_once "Locality.php";
require_once "Number2Text.php";


if (filter_var($number, FILTER_VALIDATE_INT) === true) {
    $number = $_GET ['number']
} else {
    $number = 0;
}


if (filter_var($language, FILTER_VALIDATE_SRING) === true) {
    $language = $_GET ['language']
} else {
   $language = "EN";
}


if (filter_var($output, FILTER_VALIDATE_SRING) === true) {
    $output = $_GET ['output']
} else {
   $output = "text";
}


if (filter_var($locale, FILTER_VALIDATE_SRING) === true) {
    $locale = $_GET ['locale']
} else {
   $locale = "USA";
}


if (filter_var($currency, FILTER_VALIDATE_SRING) === true) {
    $currency = $_GET ['currency']
} else {
   $currency = "$";
}


if (filter_var($units, FILTER_VALIDATE_SRING) === true) {
    $units = $_GET ['units']
} else {
   $units = "¢";
}


$oTextNum = new Number2Text();
$Number2Text = $oTextNum->translateNumber($number, $language, $currency, $units, $locale, $output);
echo trim($Number2Text);

?>