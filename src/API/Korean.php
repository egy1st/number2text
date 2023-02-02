<?php
// error_reporting(E_ALL);
// ini_set("display_errors", 1);
// ini_set('error_reporting', E_ALL);

require_once "NumberingSystem.php";
require_once "Number2Text.php";

/**
 * @covers Korean
 *
 */
class Korean
{


    /**
     * This is the main function required to convert a number into words.
     *
     * @param string $strNumber number parameter
     * @param string $aCur currency-array parameter
     * @return string
     */
    public function TranslateNumber($strNumber, $aCur)
    {

        $KOR = new Korean();
        $strNum = "";
        $aNum[17] = 0;
        NumberingSystem::getLanguage($aUnit, $aTen, $aHundred, $aId, $aNum, "Korean");
        for ($x = 7; $x <= 12; $x++) {
            $aId[$x] = $aCur [$x - 7];
        }

        //=====================================================================
        // each cycle represents a scale hunderds and tens, thousnads, millions and milliars
        $cycle = 0;
        for ($cycle = 1; $cycle <= 4; $cycle++) {
            if ($cycle === 1) {
                $x = 1;
            } else if ($cycle === 2) {
                $x = 5;
            } else if ($cycle === 3) {
                $x = 9;
            } else if ($cycle === 4) {
                $x = 14;
            }

            //=================================================================
            // Prepre numbers from 0 to 99
            // Tens and units are linked with e (and), as in trinta e cinco [35]

            $strForma = Number2Text::prepareNumber($strNumber, $aNum);

            $y = 0;
            $ptrn = $aNum[$x] . $aNum[$x + 1] . $aNum[$x + 2] . $aNum[$x + 3];


            $i = 0;
            for ($y = $x; $y <= $x + 3; $y++) {
                $i += 1;

                if ($aNum[$y] != 0) {
                    if ($i == 1 & $KOR->checkKoreanThousand($cycle, $strForma)) {
                        $strNum .= $KOR->getID($y);
                    } else if ($i == 2 & $KOR->checkKoreanHundred($cycle, $strForma)) {
                        $strNum .= $KOR->getID($y);
                    } else if ($i == 3 & $KOR->checkKoreanTen($cycle, $strForma)) {
                        $strNum .= $KOR->getID($y);
                    } else if ($i == 4 & $KOR->checkKoreanOne($cycle, $strForma)) {
                        $strNum .= $KOR->getID($y);
                        // nothing of special cases above
                    } else {
                        $strNum .= $aUnit[$aNum[$y]] . $KOR->getID($y);
                    }

                }
            }

            if ($ptrn != "0000") {
                $strNum .= $KOR->getGrand($cycle);
            }

            //=================================================================
            if ($cycle === 3) {
                $strNum = NumberingSystem::removeAnd($strNum, $aId[0]);
                $strNum .= " " . $aId[7];
            } else if ($cycle === 4 & !NumberingSystem::isPattern($strForma, "xxxxxxxxxxxx.0000")) {
                $strNum .= " " . $aId[9];
            }
        }


        // Num = removeComma(Num) ' no comma is used in Finnish
        $strNum = NumberingSystem::removeSpaces($strNum);
        $strNum = NumberingSystem::removeAnd($strNum, $aId[0]);

        if ($strForma == "000000000000.0000") {
            $strNum = $aUnit[0];
        }

        //echo "<br>" .$strNum ;
        return $strNum;

    }

    public static function getGrand($cycle)
    {

        if ($cycle === 1) {
            return "억 ";
            // 100 Million
        } else if ($cycle === 2) {
            return "만 ";
            // Ten Thousands
        } else if ($cycle === 3) {
            return "";
            // units
        }

        //else if ($cycle == 4) {
        // decimals
        return "";

    }


    public static function getID($y)
    {

        if ($y % 4 === 1) {
            return "천";
            // Thousands
        } else if ($y % 4 === 2) {
            return "백";
            // Hundereds
        } else if ($y % 4 === 3) {
            return "십";
            // Tens
        }

        //else if ($y % 4 == 0) {
        // units
        return "";

    }

    public static function checkKoreanHundred($cycle, $strForma)
    {
        $NS = new NumberingSystem();

        if ($cycle === 1 & NumberingSystem::isPattern($strForma, "x1xxxxxxxxxx.xxxx")) {
            return true;
        } else if ($cycle === 2 & NumberingSystem::isPattern($strForma, "xxxxx1xxxxxx.xxxx")) {
            return true;
        } else if ($cycle === 3 & NumberingSystem::isPattern($strForma, "xxxxxxxxx1xx.xxxx")) {
            return true;
            // no place in pences places
        } else if ($cycle === 4) {
            return false;
        }

        return false;
    }

    public static function checkKoreanTen($cycle, $strForma)
    {

        $NS = new NumberingSystem();

        if ($cycle === 1 & NumberingSystem::isPattern($strForma, "xx1xxxxxxxxx.xxxx")) {
            return true;
        } else if ($cycle === 2 & NumberingSystem::isPattern($strForma, "xxxxxx1xxxxx.xxxx")) {
            return true;
        } else if ($cycle === 3 & NumberingSystem::isPattern($strForma, "xxxxxxxxxx1x.xxxx")) {
            return true;
        } else if ($cycle === 4 & NumberingSystem::isPattern($strForma, "xxxxxxxxxxxx.xx1x")) {
            return true;
        }

        return false;
    }

    public static function checkKoreanOne($cycle, $strForma)
    {
        $NS = new NumberingSystem();

        if ($cycle === 1 & NumberingSystem::isPattern($strForma, "xxx1xxxxxxxx.xxxx")) {
            return true;
        } else if ($cycle === 2 & NumberingSystem::isPattern($strForma, "xxxxxxx1xxxx.xxxx")) {
            return true;
            // not applied here
        } else if ($cycle === 3) {
            return false;
            // not applied here
        } else if ($cycle === 4) {
            return false;
        }

        return false;
    }

    public static function checkKoreanThousand($cycle, $strForma)
    {

        $NS = new NumberingSystem();

        if ($cycle === 1 & NumberingSystem::isPattern($strForma, "1xxxxxxxxxxx.xxxx")) {
            return true;
        } else if ($cycle === 2 & NumberingSystem::isPattern($strForma, "xxxx1xxxxxxx.xxxx")) {
            return true;
        } else if ($cycle === 3 & NumberingSystem::isPattern($strForma, "xxxxxxxx1xxx.xxxx")) {
            return true;
            // no place in pences places
        } else if ($cycle === 4) {
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
        $strNum = "";

        $E = 0;
        for($E = 1; $E <= 12; $E ++) {
            $S = substr ( $strForma, $E, 1 );
             $aNum[$E] = $S;
        }

        for($E = 14; $E <= 17; $E ++) {
            $S = substr ( $strForma, $E, 1 );
             $aNum[$E] = $S;
        }

        // make(0.23 as 0.0023)
         $N[17] =  $N[15];
         $N[16] =  $N[14];
         $N[14] = 0;
         $N[15] = 0;

        $strForma = substr ( $strForma, 0, 13 );
        for($E = 14; $E <= 17; $E ++) {
            $strForma +=  $aNum[$E];
        }

        return true;
    }
    */

}

?>