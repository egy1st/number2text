<?php
// error_reporting(E_ALL);
// ini_set("display_errors", 1);
// ini_set('error_reporting', E_ALL);


/**
 * @covers German
 *
 */
class German
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

        NumberingSystem::getLanguage($aUnit, $aTen, $aHundred, $aId, $aNum, "German");
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
                if ($aNum[$x] == 0 & $aNum[$x + 1] == 0 & $aNum[$x + 2] == 0) {
                    $strNum = NumberingSystem::removeComma($strNum);
                    $strNum .= ' ' . $id2;
                }
            } else if ($cycle === 5) {
                $x = 14;
            }

            // ================================================================
            // Special condition for germany language
            if ($aNum[$x + 1] == 0 & $aNum[$x + 2] == 1 & $cycle <= 2) {
                $aUnit[1] .= "e";
            } else if ($aNum[$x + 1] == 0 & $aNum[$x + 2] == 1 & $cycle == 4) {
                $aUnit[1] .= "s";
            }
            // End of special condition

            $nUnit = $aNum[$x + 2] + ($aNum[$x + 1] * 10);
            // keywords
            if ($nUnit < 21) {
                $strUnit = $aUnit[$nUnit];
                // tens
            } else if ($aNum[$x + 2] == 0) {
                $strUnit = $aTen[$aNum[$x + 1]];
            } else {
                $strUnit = $aUnit[$aNum[$x + 2]] . $aId[0] . $aTen[$aNum[$x + 1]];
            }

            if ($cycle == 1 & substr($strForma, 1, 3) == "001") {
                $id2 = $id1;
            } else if ($cycle === 1 & substr($strForma, 4, 3) === "001") {
                $id2 = $id1;
            }

            if ($cycle <= 2 | $cycle === 4) {
                $id2 = " " . $id2 . " ";
                $id1 = " " . $id1 . " ";
            }

            if ($aNum[$x] != 0) {
                if ($aNum[$x + 1] + $aNum[$x + 2] != 0) {
                    $strNum .= $aHundred[$aNum[$x]] . $strUnit . $id2;
                } else {
                    $strNum .= $aHundred[$aNum[$x]] . $id2;
                }
            } else if ($aNum[$x + 1] + $aNum[$x + 2] != 0) {
                $strNum .= $strUnit . " " . $id2;
            } else {
                // nothing to do
            }

            if ($cycle === 3) {
                if (substr($strForma, 7, 3) === "001") {
                    $strNum = $id1;
                }
            }

            if ($cycle === 4) {

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

        // $strNum = removeComma(Num) ; // no comma used in Germany
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