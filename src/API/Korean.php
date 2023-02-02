<?php
//error_reporting(E_ALL);
//ini_set("display_errors", 1);
//ini_set('error_reporting', E_ALL);

require_once "NumberingSystem.php";
require_once "Number2Text.php";

/**
 * @covers Korean
 *
 */
class Korean
{

    public function TranslateNumber($strNumber, $aCur)
    {

        $KOR = new Korean();
        $Num = "";
        $N[17] = 0;
        NumberingSystem::getLanguage($R, $Z, $H, $M, $N, "Korean");
        for ($x = 7; $x <= 12; $x++) {
            $M [$x] = $aCur [$x - 7];
        }

        //===================================================================================
        // each cycle represents a scale hunderds and tens, thousnads, millions and milliars
        $L = 0;
        for ($L = 1; $L <= 4; $L++) {
            if ($L == 1) {
                $x = 1;
            } else if ($L == 2) {
                $x = 5;
            } else if ($L == 3) {
                $x = 9;
            } else if ($L == 4) {
                $x = 14;
            }
            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            //==============================================================================
            //prepre numbers from 0 to 99
            //Tens and units are linked with e (and), as in trinta e cinco [35]

            $strForma = Number2Text::prepareNumber($strNumber, $N);

            $y = 0;
            $ptrn = $N[$x] . $N[$x + 1] . $N[$x + 2] . $N[$x + 3];


            $i = 0;
            for ($y = $x; $y <= $x + 3; $y++) {
                $i += 1;

                if ($N[$y] != 0) {
                    if ($i == 1 & $KOR->checkKoreanThousand($L, $strForma)) {
                        $Num .= $KOR->getID($y);
                    } else if ($i == 2 & $KOR->checkKoreanHundred($L, $strForma)) {
                        $Num .= $KOR->getID($y);
                    } else if ($i == 3 & $KOR->checkKoreanTen($L, $strForma)) {
                        $Num .= $KOR->getID($y);
                    } else if ($i == 4 & $KOR->checkKoreanOne($L, $strForma)) {
                        $Num .= $KOR->getID($y);
                        // nothing of special cases above
                    } else {
                        $Num .= $R[$N[$y]] . $KOR->getID($y);
                    }

                }
            }

            if ($ptrn != "0000") {
                $Num .= $KOR->getGrand($L);
            }
            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            if ($L == 3) {
                $Num = NumberingSystem::removeAnd($Num, $M[0]);
                $Num .= " " . $M[7];
            } else if ($L == 4 & !NumberingSystem::isPattern($strForma, "xxxxxxxxxxxx.0000")) {
                $Num .= " " . $M[9];
            }
        }


        //Num = removeComma(Num) ' no comma is used in Finnish
        $Num = NumberingSystem::removeSpaces($Num);
        $Num = NumberingSystem::removeAnd($Num, $M[0]);

        if ($strForma == "000000000000.0000") {
            $Num = $R[0];
        }

        //echo "<br>" .$Num ;
        return $Num;

    }

    public static function getGrand($L)
    {

        if ($L == 1) {
            return "억 ";
            // 100 Million
        } else if ($L == 2) {
            return "만 ";
            // Ten Thousands
        } else if ($L == 3) {
            return "";
            // units
        }

        //else if ($L == 4) {
        // decimals
        return "";

    }


    public static function getID($y)
    {

        if ($y % 4 == 1) {
            return "천";
            // Thousands
        } else if ($y % 4 == 2) {
            return "백";
            // Hundereds
        } else if ($y % 4 == 3) {
            return "십";
            // Tens
        }

        //else if ($y % 4 == 0) {
        // units
        return "";

    }

    public static function checkKoreanHundred($L, $strForma)
    {
        $NS = new NumberingSystem();

        if ($L == 1 & NumberingSystem::isPattern($strForma, "x1xxxxxxxxxx.xxxx")) {
            return true;
        } else if ($L == 2 & NumberingSystem::isPattern($strForma, "xxxxx1xxxxxx.xxxx")) {
            return true;
        } else if ($L == 3 & NumberingSystem::isPattern($strForma, "xxxxxxxxx1xx.xxxx")) {
            return true;
            // no place in pences places
        } else if ($L == 4) {
            return false;
        }

        return false;
    }

    public static function checkKoreanTen($L, $strForma)
    {

        $NS = new NumberingSystem();

        if ($L == 1 & NumberingSystem::isPattern($strForma, "xx1xxxxxxxxx.xxxx")) {
            return true;
        } else if ($L == 2 & NumberingSystem::isPattern($strForma, "xxxxxx1xxxxx.xxxx")) {
            return true;
        } else if ($L == 3 & NumberingSystem::isPattern($strForma, "xxxxxxxxxx1x.xxxx")) {
            return true;
        } else if ($L == 4 & NumberingSystem::isPattern($strForma, "xxxxxxxxxxxx.xx1x")) {
            return true;
        }

        return false;
    }

    public static function checkKoreanOne($L, $strForma)
    {
        $NS = new NumberingSystem();

        if ($L == 1 & NumberingSystem::isPattern($strForma, "xxx1xxxxxxxx.xxxx")) {
            return true;
        } else if ($L == 2 & NumberingSystem::isPattern($strForma, "xxxxxxx1xxxx.xxxx")) {
            return true;
            // not applied here
        } else if ($L == 3) {
            return false;
            // not applied here
        } else if ($L == 4) {
            return false;
        }

        return false;
    }

    public static function checkKoreanThousand($L, $strForma)
    {

        $NS = new NumberingSystem();

        if ($L == 1 & NumberingSystem::isPattern($strForma, "1xxxxxxxxxxx.xxxx")) {
            return true;
        } else if ($L == 2 & NumberingSystem::isPattern($strForma, "xxxx1xxxxxxx.xxxx")) {
            return true;
        } else if ($L == 3 & NumberingSystem::isPattern($strForma, "xxxxxxxx1xxx.xxxx")) {
            return true;
            // no place in pences places
        } else if ($L == 4) {
            return false;
        }

        return false;
    }


    /*
    // This function is a specific function for Korean language.
    // It format number in special mode depends on 4-places mode rather than 3-places mode used in latin languages
    // Thus, the multiplier is 10,000 rather than 1,000
    public static function prepareNumber4Korean($strNumber, $N) {
        $strNumber = str_replace ( ",", ".", $strNumber );
        if ($strNumber > "999999999999.0099") {
            echo ("Cannot translate numbers exceed 999,999,999,999.99");
            return false;
        }

        $strForma = formatNumber ( $strNumber );
        $Num = "";

        $E = 0;
        for($E = 1; $E <= 12; $E ++) {
            $S = substr ( $strForma, $E, 1 );
            $N [$E] = $S;
        }

        for($E = 14; $E <= 17; $E ++) {
            $S = substr ( $strForma, $E, 1 );
            $N [$E] = $S;
        }

        // make(0.23 as 0.0023)
        $N [17] = $N [15];
        $N [16] = $N [14];
        $N [14] = 0;
        $N [15] = 0;

        $strForma = substr ( $strForma, 0, 13 );
        for($E = 14; $E <= 17; $E ++) {
            $strForma += $N [$E];
        }

        return true;
    }
    */

}

?>