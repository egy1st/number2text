<?php
//error_reporting(E_ALL);
//ini_set("display_errors", 1);
//ini_set('error_reporting', E_ALL);

header('Content-Type: text/html; charset=UTF-8');
require_once "Locality.php";
require_once "Number2Words.php";

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



$oTextNum = new Number2Words();
$a_Test = array (2.02);
$a_Test = array ("one", 0.0, 0.01, 0.02, 0.03, 0.10, 0.11, 0.12, 0.13, 0.73, 1, 1.01, 1.02, 1.03, 1.71, 2, 2.01, 2.02, 2.03, 3, 3.5, 10, 100, 200, 1000, 1001, 100001, 1000002, 2000, 2001.47, 100000, 200000, 2000000, 2000000000, 20000000000.58, 200000000000, 200045.15,  1100000, 6100, 6105, 1100008 );
//$a_Test = array (1, 2, 2.02, 1000, 2000, 2000.12, 2002.25, 10000, 10000.88, 20048.25, 100000, 200000, 200004.12, 1000000, 1000000, 2000000, 2000000.58, 2000005.69, 10000000, 10000000.58, 10000008.23, 10003.45, 10000.45 );
//$a_Test = array (0.02);

foreach ($a_Test as $num) {
  $Number2Words = $oTextNum->translateNumber($num, "PT",NULL, NULL, "EUR", "text");
 // echo  $Number2Words . PHP_EOL;
  echo $num . '    ' . $Number2Words . PHP_EOL;


}

?>