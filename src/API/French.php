<?php
// error_reporting(E_ALL);
// ini_set("display_errors", 1);
// ini_set('error_reporting', E_ALL);


/**
 * @covers French
 *
 */
class French
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

        NumberingSystem::getLanguage($aUnit, $aTen, $aHundred, $aId, $aNum, "French");
        for ($x = 7; $x <= 12; $x++) {
            $aId[$x] = $aCur[$x - 7];
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
                if ($aNum[$x] == 0 & $aNum[$x + 1] == 0 & $aNum[$x + 2] == 0) {
                    $strNum = NumberingSystem::removeComma($strNum);
                    $strNum .= ' ' . $id2;
                }
            } else if ($cycle === 5) {
                $x = 14;
            }


            // ================================================================
            $nUnit = $aNum[$x + 2] + ($aNum[$x + 1] * 10);
            // keywords
            if ($nUnit < 21) {
                $strUnit = $aUnit[$nUnit];
                // tens
            } else if ($aNum[$x + 2] == 0) {
                $strUnit = $aTen[$aNum[$x + 1]];

                // 21 - 69
            } else if ($nUnit < 70 & $aNum[$x + 2] == 1) {
                $strUnit = $aTen[$aNum[$x + 1]] . " " . $aId[0] . " " . $aUnit[$aNum[$x + 2]];
            } else if ($nUnit < 70 & $aNum[$x + 2] != 1) {
                $strUnit = $aTen[$aNum[$x + 1]] . "-" . $aUnit[$aNum[$x + 2]];

                // 71-79
            } else if ($nUnit < 80 & $aNum[$x + 2] == 1) {
                $strUnit = $aTen[$aNum[$x + 1] - 1] . " " . $aId[0] . " " . $aUnit[$aNum[$x + 2] + 10];
            } else if ($nUnit < 80 & $aNum[$x + 2] != 1) {
                $strUnit = $aTen[$aNum[$x + 1] - 1] . "-" . $aUnit[$aNum[$x + 2] + 10];

                // 81-99
            } else if ($nUnit < 90) {
                $strUnit = $aTen[$aNum[$x + 1]] . "-" . $aUnit[$aNum[$x + 2]];
            } else if ($nUnit < 100) {
                $strUnit = $aTen[$aNum[$x + 1] - 1] . "-" . $aUnit[$aNum[$x + 2] + 10];
            }

            // should appear prior to 'Hunders Block
            if ($cycle == 3 & $aNum[$x + 2] == 1) {
                $strUnit = "";
            }

            // Hunders Block
            if ($nUnit != 0) {
                $strNum .= $aHundred[$aNum[$x]] . " " . $strUnit . " " . $id2 . " ";
            } else if ($aNum[$x] == 1 & $nUnit == 0) {
                $strNum .= $aHundred[$aNum[$x]] . " " . $id2 . " ";
            } else if ($aNum[$x] > 1 & $nUnit == 0) {
                $strNum .= $aHundred[$aNum[$x]] . "s " . $id2 . " ";
            }

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

                // Case one dollar
                $strNum = NumberingSystem::substituteIDs($strNum, $strForma, $cycle, $id1, $id2);

                // cond.4
                if (substr($strForma, -3) != "000" & substr($strForma, 0, 12) != "000000000000") {
                    $strNum .= " " . $aId[0] . " ";
                }
            }

            if ($cycle == 5) {
                // One cent
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