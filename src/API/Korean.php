<?php
//error_reporting(E_ALL);
//ini_set("display_errors", 1);
//ini_set('error_reporting', E_ALL);

require_once "NumberingSystem.php";
require_once "Number2Words.php";

/**
 * @covers Korean
 *
 */
class Korean
{

    public function TranslateNumber($str_Number, $aCur)
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

            $Forma = Number2Words::prepareNumber($str_Number, $N);

            $y = 0;
            $ptrn = $N[$x] . $N[$x + 1] . $N[$x + 2] . $N[$x + 3];


            $i = 0;
            for ($y = $x; $y <= $x + 3; $y++) {
                $i += 1;

                if ($N[$y] != 0) {
                    if ($i == 1 & $KOR->checkKoreanThousand($L, $Forma)) {
                        $Num .= $KOR->getID($y);
                    } else if ($i == 2 & $KOR->checkKoreanHundred($L, $Forma)) {
                        $Num .= $KOR->getID($y);
                    } else if ($i == 3 & $KOR->checkKoreanTen($L, $Forma)) {
                        $Num .= $KOR->getID($y);
                    } else if ($i == 4 & $KOR->checkKoreanOne($L, $Forma)) {
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
            } else if ($L == 4 & !NumberingSystem::isPattern($Forma, "xxxxxxxxxxxx.0000")) {
                $Num .= " " . $M[9];
            }
        }


        //Num = removeComma(Num) ' no comma is used in Finnish
        $Num = NumberingSystem::removeSpaces($Num);
        $Num = NumberingSystem::removeAnd($Num, $M[0]);

        if ($Forma == "000000000000.0000") {
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

    public static function checkKoreanHundred($L, $Forma)
    {
        $NS = new NumberingSystem();

        if ($L == 1 & NumberingSystem::isPattern($Forma, "x1xxxxxxxxxx.xxxx")) {
            return true;
        } else if ($L == 2 & NumberingSystem::isPattern($Forma, "xxxxx1xxxxxx.xxxx")) {
            return true;
        } else if ($L == 3 & NumberingSystem::isPattern($Forma, "xxxxxxxxx1xx.xxxx")) {
            return true;
            // no place in pences places
        } else if ($L == 4) {
            return false;
        }

        return false;
    }

    public static function checkKoreanTen($L, $Forma)
    {

        $NS = new NumberingSystem();

        if ($L == 1 & NumberingSystem::isPattern($Forma, "xx1xxxxxxxxx.xxxx")) {
            return true;
        } else if ($L == 2 & NumberingSystem::isPattern($Forma, "xxxxxx1xxxxx.xxxx")) {
            return true;
        } else if ($L == 3 & NumberingSystem::isPattern($Forma, "xxxxxxxxxx1x.xxxx")) {
            return true;
        } else if ($L == 4 & NumberingSystem::isPattern($Forma, "xxxxxxxxxxxx.xx1x")) {
            return true;
        }

        return false;
    }

    public static function checkKoreanOne($L, $Forma)
    {
        $NS = new NumberingSystem();

        if ($L == 1 & NumberingSystem::isPattern($Forma, "xxx1xxxxxxxx.xxxx")) {
            return true;
        } else if ($L == 2 & NumberingSystem::isPattern($Forma, "xxxxxxx1xxxx.xxxx")) {
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

    public static function checkKoreanThousand($L, $Forma)
    {

        $NS = new NumberingSystem();

        if ($L == 1 & NumberingSystem::isPattern($Forma, "1xxxxxxxxxxx.xxxx")) {
            return true;
        } else if ($L == 2 & NumberingSystem::isPattern($Forma, "xxxx1xxxxxxx.xxxx")) {
            return true;
        } else if ($L == 3 & NumberingSystem::isPattern($Forma, "xxxxxxxx1xxx.xxxx")) {
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
    public static function prepareNumber4Korean($str_Number, $N) {
        $str_Number = str_replace ( ",", ".", $str_Number );
        if ($str_Number > "999999999999.0099") {
            echo ("Cannot translate numbers exceed 999,999,999,999.99");
            return false;
        }

        $Forma = formatNumber ( $str_Number );
        $Num = "";

        $E = 0;
        for($E = 1; $E <= 12; $E ++) {
            $S = substr ( $Forma, $E, 1 );
            $N [$E] = $S;
        }

        for($E = 14; $E <= 17; $E ++) {
            $S = substr ( $Forma, $E, 1 );
            $N [$E] = $S;
        }

        // make(0.23 as 0.0023)
        $N [17] = $N [15];
        $N [16] = $N [14];
        $N [14] = 0;
        $N [15] = 0;

        $Forma = substr ( $Forma, 0, 13 );
        for($E = 14; $E <= 17; $E ++) {
            $Forma += $N [$E];
        }

        return true;
    }
    */

}

?>