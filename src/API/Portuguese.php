<?php
// error_reporting(E_ALL);
// ini_set("display_errors", 1);
// ini_set('error_reporting', E_ALL);


/**
 * @covers Portuguese
 *
 */
class Portuguese
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

        NumberingSystem::getLanguage($aUnit, $aTen, $aHundred, $aId, $aNum, "Portuguese");
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
                if ($aNum[$x] == 0 & $aNum[$x + 1] == 0 & $aNum[$x + 2] == 0 & substr($strForma, 0, 12) != "000000000000") {
                    $strNum = NumberingSystem::removeComma($strNum);
                    $strNum .= ' ' . $id2;
                }
            } else if ($cycle == 5) {
                $x = 14;
            }

            // ==============================================================================
            // Prepre numbers from 0 to 99
            // Tens and units are linked with e (and), as in trinta e cinco [35]
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
                $strUnit = $aTen[$aNum[$x + 1]] . " " . $aId[0] . " " . $aUnit[$aNum[$x + 2]];
            }


            // ==============================================================================
            // Prepare numbers from 100 to 999
            // Hundreds and tens are linked with e (and), as in cento e quarenta e seis [146])
            if ($nAll != 0) {
                // Mil not um mil eg. 1210 is mil cento e vinte
                if (NumberingSystem::checkOneThousnad($cycle, $strForma)) {
                    // http://www.languagesandnumbers.com/how-to-count-in-portuguese-portugal/en/por-prt/
                    // experimental use added case 'cem not e cem for numbers ends with exactky 100
                    $strNum .= " " . $id1 . " ";
                } else if (NumberingSystem::checkOneHundred($cycle, $strForma)) {
                    $strNum .= " " . $aHundred[10] . " " . $id1 . " ";
                } else if ($aNum[$x] == 0) {
                    $strNum .= $strUnit . " " . $id2 . " ";
                    // only units and tens
                } else if ($nUnit == 0) {
                    $strNum .= $aHundred[$aNum[$x]] . " " . $id2 . " ";
                    // only hundreds
                } else {
                    $strNum .= $aHundred[$aNum[$x]] . " " . $aId[0] . " " . $strUnit . " " . $id2 . " ";
                    // complete compund number
                }
            }


            // ==============================================================================
            // special case
            // thousands and hundreds are not linked with e (and) unless the number ends with a hundred with two zeroes
            // (e.g.: dois mil e trezentos [2,300], but dois mil trezentos e sete [2,307]).
            // http://www.languagesandnumbers.com/how-to-count-in-portuguese-portugal/en/por-prt/
            // experimental use added case and hundreds not 100
            if ($cycle == 3) {
                if (NumberingSystem::isPattern($strForma, "xxxxxxxxxx00.xxx") & $aNum[$x + 3] != 1) {
                    $strNum = NumberingSystem::removeComma($strNum);
                    $strNum .= " " . $aId[0] . " ";
                }
            }

            /*
            if (NumberingSystem::NoCurrency($cycle, $strForma)) {
                $strNum = NumberingSystem::removeAnd($strNum,$aId[0]);
                $strNum .= " " . $id2;
            }
			*/

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

        // Num = removeComma(Num) ' no comma is used in Portuguese
        $strNum = NumberingSystem::removeSpaces($strNum);
        //$strNum = NumberingSystem::removeAnd ( $Num,$aId[0] );
        //echo $strNum ;
        $strNum = NumberingSystem::remove1stAnd($strNum, $aId[0]);

        /*
        if ($strForma == "000000000000.000") {
            $strNum = $aUnit[0];
        }
        */

        return $strNum;
    }
}

?>