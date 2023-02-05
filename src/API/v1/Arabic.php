<?php
// error_reporting(E_ALL);
// ini_set("display_errors", 1);
// ini_set('error_reporting', E_ALL);


/**
 * @covers Arabic
 *
 */
class Arabic
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


        NumberingSystem::getLanguage($aUnit, $aTen, $aHundred, $aId, $aNum, "Arabic");
        for ($x = 7; $x <= 12; $x++) {
            $aId[$x] = $aCur [$x - 7];
        }

        // ====================================================================
        // each cycle represent a scale hunderds and tens, thousnads, millions and milliars

        $strForma = Number2Text::prepareNumber($strNumber, $aNum);
        for ($cycle = 1; $cycle <= 5; $cycle++) {
            $G = 0;

            if ($cycle === 1) {
                $x = 1;
                $id1 = " مليار ";
                $id2 = " ملياران ";
                $id3 = " مليارات ";
            } else if ($cycle === 2) {
                $x = 4;
                $id1 = " مليون ";
                $id2 = " مليونان ";
                $id3 = " ملايين ";
            } else if ($cycle === 3) {
                $x = 7;
                $id1 = " ألف ";
                $id2 = " ألفان ";
                $id3 = " آلاف ";
            } else if ($cycle === 4) {
                $x = 10;
                $id1 = " جنيه ";
                $id2 = " جنيهان ";
                $id3 = " جنيهات ";

                if (substr($strForma, 0, 12) === "001000000000") {
                    $strNum = " مليار ";
                } else if (substr($strForma, 0, 12) === "002000000000") {
                    $strNum = " مليارى ";
                } else if (substr($strForma, 0, 12) === "000001000000") {
                    $strNum = " مليون ";
                } else if (substr($strForma, 0, 12) === "000002000000") {
                    $strNum = " مليونى ";
                } else if (substr($strForma, 0, 12) === "000000001000") {
                    $strNum = " ألف ";
                } else if (substr($strForma, 0, 12) === "000000002000") {
                    $strNum = " ألفى ";
                }

                if ($aNum[$x] == 0 & $aNum[$x + 1] == 0 & $aNum[$x + 2] == 0) {
                    $strNum .= $id1;
                }
            } else if ($cycle == 5) {
                $x = 14;
                $id1 = " قرش ";
                $id2 = " قرشان ";
                $id3 = " قروش ";
            }


            if (isset($aNum[$x + 1])) {
                if ($aNum[$x + 1] == 0 & $aNum[$x + 2] == 0) {
                    $aHundred[2] = "مائتى ";
                } else {
                    $aHundred[2] = "مائتين ";
                }
            }

            // ================================================================
            // Prepare numbers from 100 to 999
            
            if ($aNum[$x] == 0 & $aNum[$x + 1] == 0 & $aNum[$x + 2] == 0) {
                $G = 1;
            } else if ($aNum[$x] == 0 & $aNum[$x + 1] == 0 & $aNum[$x + 2] == 1) {
                $strNum = $strNum . " و " . $id1;
                $G = 1;
            } else if ($aNum[$x] == 0 & $aNum[$x + 1] == 0 & $aNum[$x + 2] == 2) {
                $strNum = $strNum . " و " . $id2;
                $G = 1;
            }

            // Print_r($N) ;
            if ($aNum[$x] > 0) {
                $strNum = $strNum . " و " . $aHundred[$aNum[$x]];
            }

            if ($aNum[$x + 1] == 1 & $aNum[$x + 2] == 0) {
                $strNum = $strNum . " و " . $aTen[1] . $id3;
                $G = 4;
                //echo "we are here 1" ;
            } else if ($aNum[$x + 2] == 1 & $aNum[$x + 1] == 1) {
                $strNum = $strNum . " و " . $aUnit[11] . $aTen[1] . $id1;
                $G = 4;
                //echo "we are here 2" ;
            } else if ($aNum[$x + 2] == 2 & $aNum[$x + 1] == 1) {
                $strNum = $strNum . " و " . $aUnit[12] . $aTen[1] . $id1;
                $G = 4;
                //echo "we are here 3" ;
            }

            if ($aNum[$x] == 0 & $aNum[$x + 1] == 0 & $aNum[$x + 2] > 2) {
                $strNum = $strNum . " و " . $aUnit[$aNum[$x + 2]] . $id3;
                $G = 1;
                // Echo "we are here 4" ;
            }

            if ($aNum[$x + 2] > 0 & $G != 4 & $G != 1) {
                $strNum = $strNum . " و " . $aUnit[$aNum[$x + 2]];
                $G = 2;
                //echo "we are here 5" ;
            }

            if ($aNum[$x + 1] > 1) {
                $strNum = $strNum . " و " . $aTen[$aNum[$x + 1]];
                $G = 2;
                //echo "we are here 6" ;
            }

            if ($aNum[$x + 1] == 1 & $G != 4) {
                $strNum = $strNum . $aTen[$aNum[$x + 1]];
                $G = 2;
                // Echo "we are here 7" ;
            }

            if ($G != 1 & $G != 4) {
                $strNum = $strNum . $id1;
                //echo "we are here 8" ;
            }
        }

        $newNum = $strNum;
        $Ln = strlen($newNum);

        if (substr($newNum, 0, strlen(" و ")) == " و ") {
            $newNum = substr($newNum, -($Ln - strlen(" و ")));
        }

        /*
        if ($strForma == "000000000000.000") {
            $newNum = "";
        }
        */

        $newNum = str_replace("جنيه", $aId[7], $newNum);
        $newNum = str_replace("جنيهات", $aId[8], $newNum);
        $newNum = str_replace("قرش", $aId[9], $newNum);
        $newNum = str_replace("قروش", $aId[10], $newNum);
        $newNum = str_replace("جنيهان", $aId[11], $newNum);
        $newNum = str_replace("قرشان", $aId[12], $newNum);

        return $newNum;
    }
}

?>