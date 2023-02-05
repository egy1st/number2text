<?php
// error_reporting(E_ALL);
// ini_set("display_errors", 1);
// ini_set('error_reporting', E_ALL);


/**
 * @covers Russian
 *
 */
class Russian
{


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

        NumberingSystem::getLanguage($aUnit, $aTen, $aHundred, $aId, $aNum, "Russian");
        for ($x = 7; $x <= 12; $x++) {
            $aId[$x] = $aCur [$x - 7];
        }

        // ====================================================================
        // each cycle represent a scale hunderds and tens, thousnads, millions and milliars
        $strForma = Number2Text::prepareNumber($strNumber, $aNum);
        $cycle = 0;
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
            } else if ($cycle === 5) {
                $x = 14;
            }


            // ==============================================================================
            // Prepre numbers from 0 to 99
            // Tens space units ==> There is no need to use the word "and" in Russian
            $nUnit = ($aNum[$x + 1] * 10) + $aNum[$x + 2];
            $nAll = $aNum[$x] + $nUnit;
            // keywords
            if ($nUnit > 0 & $nUnit < 21) {
                $strUnit = $aUnit[$nUnit];
                // tens
            } else if ($aNum[$x + 2] == 0) {
                $strUnit = $aTen[$aNum[$x + 1]];
                // others
            } else {
                $strUnit = $aTen[$aNum[$x + 1]] . " " . $aUnit[$aNum[$x + 2]];
            }


            // ==============================================================================
            // Prepare numbers from 100 to 999
            // Hundreds and tens are linked just space eg. 131 is сто тридцать один

            if ($nAll != 0) {
                // тысяча not один тысяча.
                if (NumberingSystem::checkOneThousnad($cycle, $strForma)) {
                    $strNum .= " " . $id1 . " ";
                } else if ($aNum[$x] == 0) {
                    $strNum .= $strUnit . " " . $id2 . " ";
                    // only units and tens
                } else if ($nUnit == 0) {
                    $strNum .= $aHundred[$aNum[$x]] . " " . $id2 . " ";
                    // only hundreds
                } else {
                    $strNum .= $aHundred[$aNum[$x]] . " " . $strUnit . " " . $id2 . " ";
                    // complete compund number
                }
            }

            // ================================================================
            if (NumberingSystem::NoCurrency($cycle, $strForma)) {
                $strNum = NumberingSystem::removeAnd($strNum, $aId[0]);
                $strNum .= " " . $id2;
            }
        }

        // Num = removeComma(Num) ' no comma is used in russian
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