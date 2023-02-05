<?php
// error_reporting(E_ALL);
// ini_set("display_errors", 1);
// ini_set('error_reporting', E_ALL);


/**
 * @covers Spanish
 *
 */
class Spanish
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

        NumberingSystem::getLanguage($aUnit, $aTen, $aHundred, $aId, $aNum, "Spanish");
        for ($x = 7; $x <= 12; $x++) {
            $aId[$x] = $aCur [$x - 7];
        }

        // ====================================================================
        // Each cycle represent a scale hunderds and tens, thousnads, millions and milliars
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
            $nUnit = ($aNum[$x + 1] * 10) + $aNum[$x + 2];
            $nAll = $aNum[$x] + $nUnit;
            // Keywords are 30 not 20 as usual
            if ($nUnit > 0 & $nUnit < 31) {
                $strUnit = $aUnit[$nUnit];
                // Tens
            } else if ($aNum[$x + 2] == 0) {
                $strUnit = $aTen[$aNum[$x + 1]];
                // Notice that "y" is used only in numbers 31-99 (and 131-199, 231-299, 331-399, etc.)
                // others
            } else {
                $strUnit = $aTen[$aNum[$x + 1]] . " " . $aId[0] . " " . $aUnit[$aNum[$x + 2]];
            }


            // ================================================================
            // Prepare numbers from 100 to 999
            // y "and" is not used to separate hundreds from tens.
            if ($nAll != 0) {
                // When there is exactly 100 of something use the shortened form "cien" rather than ciento
                // for exactly 100
                if ($aNum[$x] == 1 & $aNum[$x + 1] + $aNum[$x + 2] == 0) {
                    $strNum .= "cien" . " " . $strUnit . " " . $id2 . " ";
                } else {
                    $strNum .= $aHundred[$aNum[$x]] . " " . $strUnit . " " . $id2 . " ";
                    // others
                }
            }

            // ================================================================

            if (NumberingSystem::NoCurrency($cycle, $strForma)) {
                $strNum = NumberingSystem::removeAnd($strNum, $aId[0]);
                $strNum .= " " . $id2;
            }
        }

        // Num = removeComma(Num) ' no comma is used in Spanish
        $strNum = NumberingSystem::removeSpaces($strNum);
        // $strNum = NumberingSystem::removeAnd($strNum);

        /*
        if ($Forma == "000000000000.000") {
            $strNum = $aUnit[0];
        }
        */

        return $strNum;
    }
}

?>