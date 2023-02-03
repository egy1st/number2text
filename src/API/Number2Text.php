<?php
// error_reporting(E_ALL);
// ini_set("display_errors", 1);
// ini_set('error_reporting', E_ALL);


require_once "Arabic.php";
require_once "English.php";
require_once "French.php";
require_once "German.php";
require_once "Italian.php";
require_once "Spanish.php";
require_once "Portuguese.php";
require_once "Russian.php";
require_once "Turkish.php";
require_once "Persian.php";
require_once "Korean.php";
require_once "Chinese_Simplified.php";
require_once "Chinese_Traditional.php";
require_once "NumberingSystem.php";
require_once "Locality.php";


/**
 * @covers Arabic
 * @covers English
 * @covers French
 * @covers German
 * @covers Italian
 * @covers Russian
 * @covers Turkish
 * @covers Persian
 * @covers Spanish
 * @covers Portuguese
 * @covers Korean
 * @covers Chinese_Simplified
 * @covers Chinese_Traditional
 */
class Number2Text
{

    // This function left pad zeros, for example 123 will be 000000000123
    public static function prepareNumber($strNumber, &$aNum)
    {

        if (is_numeric($strNumber)) {

            // $strNumber = $para_number;
            $strNumber = str_replace(",", ".", $strNumber);
            if ($strNumber > "999999999999.099") {
                echo("Cannot translate numbers exceed 999,999,999,999.00");
                return false;
            }

            $strForma = self::formatNumber($strNumber);
            // $strNum = ""; maa make sure not used

            $E = 0;
            for ($E = 0; $E < 12; $E++) {
                $S = substr($strForma, $E, 1);
                $aNum[$E + 1] = $S;
            }

            for ($E = 13; $E < 16; $E++) {
                $S = substr($strForma, $E, 1);
                $aNum[$E + 1] = $S;
            }

            // make(0.23 as 0.023)
            $aNum[16] = $aNum[15];
            $aNum[15] = $aNum[14];
            $aNum[14] = 0;
            $aNum[17] = 0;

            $strForma = substr($strForma, 0, 13);
            for ($E = 14; $E <= 16; $E++) {
                $strForma .= $aNum[$E];
            }

             
            return $strForma;
        }
    }


    // This function format number as integer.decimal where integer is 12 fixed places and decimal is 3 fixed placed
    // Integer is left zero padded, for example 123 will be 000000000123
    // Decimal is left and right zeros padded, for example 0.3 will be 0.030

    public static function formatNumber($strNumber)
    {
        if (is_numeric($strNumber)) {
            $whole = floor($strNumber); // 1
            $fraction = $strNumber - $whole; // 0.25
            if ($fraction != 0)
                $fraction = round($fraction, 2) * 100;
            else if ($fraction == 0)
                $fraction = "000";
            if ($whole == 0) return ('000000000000') . "." . self::zeroPad($fraction, 2);
            return (self::zeroPad($whole, 12) . "." . self::zeroPad($fraction, 2));
        }
    }



    // This function populates digits in an array to master it one by one
    // Then, it format it to the proper format

    public static function zeroPad($strNum, $intCount)
    {

        //if ($strNum != NULL & trim($strNum) != '') {
        if (is_numeric($strNum)) {
            $strNum = str_pad($strNum, $intCount, '0', STR_PAD_LEFT);
        } else {
            $strNum = "000000000000.000";
        }

        return $strNum;
    }

    // this function will output the translation into 2 format
    // 1- text 2- image

    public static function translateNumber($strNumber, $_language, $_currency, $_units, $_locale, $_output)
    {

        global $aCurrencies, $number, $language, $currency, $units, $output, $locale;

        if (!isset ($strNumber)) {
            $strNumber = $number;
        }

        if (!isset ($_language)) {
            $_language = $language;
        }


        if (!isset ($_locale)) {
            $_locale = $locale;
        }

        if (!isset ($_currency)) {
            $_currency = $currency;
        }

        if (!isset ($_units)) {
            $_units = $units;
        }

        if (!isset ($_output)) {
            $_output = $output;
        }

        if (!is_numeric($strNumber)) {
            return "invalid number";
        }

        if (isset($_locale)) {
            $aCurrencies = Locality::getLocale($_locale);
            //echo "1" ;
            //print_r($aCurrencies);

        }
        if (isset($_currency) & isset($_units) & !isset($_locale)) {
            $aCurrencies = Locality::setCurrency($_currency, $_units);
            //echo "2" ;
            //print_r($aCurrencies);
        }


        $oLang = null;
        switch ($_language) {

            case Languages::ARABIC :
                $oLang = new Arabic ();
                break;
            case Languages::ENGLISH :
                $oLang = new English ();
                break;
            case Languages::FRENCH :
                $oLang = new French ();
                break;
            case Languages::GERMAN :
                $oLang = new German ();
                break;
            case Languages::SPANISH :
                $oLang = new Spanish ();
                break;
            case Languages::PORTUGUESE :
                $oLang = new Portuguese ();
                break;
            case Languages::ITALIN :
                $oLang = new Italian ();
                break;
            case Languages::RUSSIAN :
                $oLang = new Russian ();
                break;
            case Languages::TURKISH :
                $oLang = new Turkish ();
                break;
            case Languages::PERSIAN :
                $oLang = new Persian ();
                break;
            case Languages::KOREAN :
                $oLang = new Korean ();
                break;
            case Languages::CHINESE_SIMPLIFIED :
                $oLang = new Chinese_Simplified ();
                break;
            case Languages::CHINESE_TRADITIONAL :
                $oLang = new Chinese_Traditional ();
                break;

        }

        // very important
        //$lang->TranslateNumber takes number and acuurency as parameters
        //num2text::TranslateNumber takes number and language_id as parameters


        $strNumber = $oLang->translateNumber($strNumber, $aCurrencies); //$lang->TranslateNumber takes number and acuurency as parameters
        $strNumber = self::outputFormat($strNumber, $_output);


        $strNumber = trim($strNumber);


        return $strNumber;
    }

    // This function is main function
    // It translates number to string based on the selected language

    public static function outputFormat($txt, $output_format)
    {
        $font_size = 11;

        if ($output_format == 'image') {

            $txt = iconv('UTF-8', 'ASCII//TRANSLIT', $txt);
            $txt = preg_replace('/[ ]{2,}|[\t]/', ' ', trim($txt));
            ob_start();

            $width = imagefontwidth($font_size) * strlen($txt);
            $height = imagefontheight($font_size);
            $image = imagecreatetruecolor($width, $height);
            $white = imagecolorallocate($image, 255, 255, 255);
            $black = imagecolorallocate($image, 0, 0, 0);
            imagefill($image, 0, 0, $white);
            imagestring($image, $font_size, 0, 0, $txt, $black);
            imagepng($image);
            $img = ob_get_clean();
            $data = base64_encode($img);
            $encodedimg = "<img src='data:image/png;base64, " . $data . "' width='" . $width . "' height='" . $height . "'/>";
            //$encodedimg = "data:image/png;base64, " . $data ;
            //echo  $encodedimg ;
            return $encodedimg;
            imagedestroy($image);
        } elseif ($output_format == 'text')
            return $txt;
    }
}

?> 