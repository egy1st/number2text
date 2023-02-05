<?php
// error_reporting(E_ALL);
// ini_set("display_errors", 1);
// ini_set('error_reporting', E_ALL);


/**
 * @covers Italian
 *
 */
class Italian
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
        $ITA = new Italian ();
        $strNum = "";

        NumberingSystem::getLanguage($aUnit, $aTen, $aHundred, $aId, $aNum, "Italian");
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
                if ($aNum[$x] === 0 & $aNum[$x + 1] == 0 & $aNum[$x + 2] == 0) {
                    //$strNum = NumberingSystem::removeComma($strNum) ; // do not allow this for italian
                    //$strNum .=  ' ' . $id2 ;
                }
            } else if ($cycle === 5) {
                $x = 14;
            }


            // ================================================================
            // prepre numbers from 0 to 99
            $nUnit = ($aNum[$x + 1] * 10) + $aNum[$x + 2];
            $nAll = $aNum[$x] + $nUnit;
            // keywords
            if ($nUnit > 0 & $nUnit < 21) {
                $strUnit = $aUnit[$nUnit];
                // tens
            } else if ($aNum[$x + 2] == 0) {
                $strUnit = $aTen[$aNum[$x + 1]];

                // Case compound number whers tens ends with vowels(all tens are do) and units strat with vowels too
                // as in (1,8)
                // thus The numbers venti, trenta, and so on drop the final vowel before adding -uno or otto:
                // Asc Integer ventuno, ventotto.
            } else if ($aNum[$x + 2] == 1 | $aNum[$x + 2] == 8) {
                $strUnit = $ITA->removeVowels($aTen[$aNum[$x + 1]]) . $aUnit[$aNum[$x + 2]];
                // others
            } else {
                $strUnit = $aTen[$aNum[$x + 1]] . $aUnit[$aNum[$x + 2]];
            }

            // When -tre is the last digit of a larger number, it takes an accent: eg. ventitré
            // note 253623 is duecentocinquantatremila seicentoventitré
            // only last tre has accent
            // independent case
            if ($aNum[$x + 2] == 3 & $cycle == 4) {
                $strUnit = $ITA->modifyAccent($strUnit);
            }


            // ================================================================
            // Prepare numbers from 100 to 999
            // Hundreds, tens and units are linked together with no space (e.g.: centonove [109]
            if ($nAll != 0) {
                if (NumberingSystem::checkOneThousnad($cycle, $strForma)) {
                    $strNum .= $id1;
                    // Numbers are grouped in words of three digits, with the specific rule that
                    // a space is added after the word for thousand if its multiplier
                    // is greater than one hundred and does not end with a double zero
                    // (e.g.: duemilatrecentoquarantacinque [2,345], tecentosessantacinquemila duecento [765,200]).
                } else if ($ITA->checkHundredThousnad($cycle, $strForma)) {
                    $strNum .= $aHundred[$aNum[$x]] . $strUnit . $id2 . " ";

                    // experimantal at http://www.languagesandnumbers.com/how-to-count-in-italian/en/ita/
                    // add space when thausand multipliers greater than 100, for 100 exatly no space , so we use trim function
                } else if ($ITA->checkSuperOneHundred($cycle, $strForma)) {
                    $strNum .= $aHundred[$aNum[$x]] . $strUnit . trim($id2) . " ";
                    //
                } else {
                    $strNum .= $aHundred[$aNum[$x]] . $strUnit . $id2;
                    // others
                }
            }
            // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            if (NumberingSystem::NoCurrency($cycle, $strForma)) {
                $strNum = NumberingSystem::removeAnd($strNum, $aId[0]);
                $strNum .= " " . $id2;
            }
        }

        // Num = removeComma(Num) ' no comma is used in Italin
        $strNum = NumberingSystem::removeSpaces($strNum);
        $strNum = NumberingSystem::removeAnd($strNum, $aId[0]);

        /*
        if ($strForma == "000000000000.000") {
            $strNum = $aUnit[0];
        }
        */

        return $strNum;
    }

    function removeVowels($str)
    {
        $Ln = strlen($str);
        if ($Ln > 0) {
            $str = substr($str, 0, ($Ln - 1));
        }
        return $str;
    }

    function modifyAccent($str)
    {
        $Ln = strlen($str);
        $Ln2 = strlen("tre");
        if (substr($str, -$Ln2) == "tre") {
            $str = substr($str, 0, ($Ln - $Ln2)) . "tré";
        }
        return $str;
    }

    function checkHundredThousnad($cycle, $strForma)
    {
        $NS = new NumberingSystem ();
        if ($cycle === 3 & NumberingSystem::isPattern($strForma, "xxxxxxdxxxxx.xxx") & !NumberingSystem::isPattern($strForma, "xxxxxxxxxx00.xxx")) {
            return true;
        }

        return false;
    }

    function checkSuperOneHundred($cycle, $strForma)
    {
        $NS = new NumberingSystem ();
        if ($cycle === 3 & NumberingSystem::isPattern($strForma, "xxxxxx100xxx.xxx")) {
            return true;
        } else if ($cycle == 2 & NumberingSystem::isPattern($strForma, "xxx100xxxxxx.xxx")) {
            return true;
        } else if ($cycle == 1 & NumberingSystem::isPattern($strForma, "100xxxxxxxxx.xxx")) {
            return true;
        }

        return false;
    }
}

?>