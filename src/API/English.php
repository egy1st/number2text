<?php
// error_reporting(E_ALL);
// ini_set("display_errors", 1);
// ini_set('error_reporting', E_ALL);

// require_once "Number2Text.php";

/**
 * @covers English
 *
 */
class English
{

    const LANGUAGE_ID = 'en';

    /**
     * This is the main function required to convert a number into words.
     *
     * @param string $strNumber number parameter
     * @param string $aCur currency-array parameter
     *
     * @return string
     */
    public function translateNumber($strNumber, $aCur)
    {
        $strNum = "";

        NumberingSystem::getLanguage($aUnit, $aTen, $aHundred, $aId, $aNum, "English");

        for ($x = 7; $x <= 12; $x++) {
            $aId[$x] = $aCur[$x - 7];
        }


        // =================================================================================
        // Each cycle represent a scale hunderds and tens, thousnads, millions and milliars

        $cycle = 0;
        $strForma = Number2Text::prepareNumber($strNumber, $aNum);
        for ($cycle = 1; $cycle <= 5; $cycle++) {
            $id1 = $aId[($cycle * 2) - 1];

            $id2 = $aId[$cycle * 2];
            if ($cycle === 1) {
                $x = 1;
                $nSum = NumberingSystem::getSum($aNum, 1);
            } else if ($cycle === 2) {
                $x = 4;
                $nSum = NumberingSystem::getSum($aNum, 2);
            } else if ($cycle === 3) {
                $x = 7;
                $nSum = NumberingSystem::getSum($aNum, 3);
            } else if ($cycle === 4) {
                $x = 10;
                if ($aNum[$x] == 0 & $aNum[$x + 1] == 0 & $aNum[$x + 2] == 0) {
                    $strNum = NumberingSystem::removeComma($strNum);
                    $strNum .= ' ' . $id2;
                }
            } else if ($cycle === 5) {
                $x = 14;
            }

            // ================================================================
            // Prepre numbers from 0 to 99
        
            $nUnit = ($aNum[$x + 2] + ($aNum[$x + 1] * 10));

            // Keywords
            if ($nUnit < 21) {
                $strUnit = $aUnit[$nUnit];
                // tens
            } else if ($aNum[$x + 2] == 0) {
                $strUnit = $aTen[$aNum[$x + 1]];
                // others
            } else {
                $strUnit = $aTen[$aNum[$x + 1]] . "-" . $aUnit[$aNum[$x + 2]];
            }

            // ================================================================
            // Prepare numbers from 100 to 999
            if ($aNum[$x] != 0) {
                // hundereds with (tens or units) eg. 250, 385, 504
                if ($aNum[$x + 1] + $aNum[$x + 2] != 0) {
                    $strNum .= $aHundred[$aNum[$x]] . " " . $aId[0] . " " . $strUnit . " " . $id2 . ", ";
                } else {
                    $strNum .= $aHundred[$aNum[$x]] . " " . $id2 . ", ";
                    // hundereds without (tens and units) eg. 100, 200
                }
            } else if ($aNum[$x + 1] + $aNum[$x + 2] != 0) {
                $strNum .= $strUnit . " " . $id2 . ", ";
            } else {
                // nothing to do
            }

            /*
            // Special condition for english language
            if (is_numeric($strNum)) {
                if ($nSum > 0 & $nSum < 100 & $cycle < 4 & substr ( $Num, (- 1) * (strlen ( $aId[0] ) + 1) ) != $aId[0] + " ") {
                    $strNum = trim ( $strNum );
                    $Ln = strlen ( $strNum );
                    if (substr ( $Num, - 1 ) == ",") {
                        $strNum = substr ( $Num, 0, $Ln - 1 );
                        $strNum .= " " . $aId[0] . " ";
                    }
                }

            }
            // End of special condition
            */

            if ($cycle == 4) {

                if (substr($strForma, 0, 12) === "000000000001") {
                    $strNum = $aUnit[1] . " " . $id1;
                } else if (substr($strForma, 0, 12) === "000000000000") {
                    $strNum = "";
                } else {
                    $strNum = trim($strNum);
                    $Ln = strlen($strNum);
                    if (substr($strNum, -1) === ",") {
                        $strNum = substr($strNum, 0, $Ln - 1);
                    }
                }

                // this shoud apear prior to cond.4
                // case one dollar
                $strNum = NumberingSystem::substituteIDs($strNum, $strForma, $cycle, $id1, $id2);

                // cond.4
                if (substr($strForma, -3) != "000" & substr($strForma, 0, 12) != "000000000000") {
                    $strNum .= " " . $aId[0] . " ";
                }
            }


            if ($cycle === 5) {
                // one cent
                $strNum = NumberingSystem::substituteIDs($strNum, $strForma, $cycle, $id1, $id2);
            }

        }

        $strNum = NumberingSystem::removeComma($strNum);
        $strNum = NumberingSystem::removeSpaces($strNum);
        $strNum = NumberingSystem::removeAnd($strNum, $aId[0]);

        /*
        if ($strForma == "000000000000.000") {
            $strNum = $aUnit[0];
        }
        */

        return $strNum;
    }
}

?>