<?php
// error_reporting(E_ALL);
// ini_set("display_errors", 1);
// ini_set('error_reporting', E_ALL);

require_once "NumberingSystem.php";
require_once "Number2Text.php";

/**
 * @covers Chinese_Simplified
 *
 */
class Chinese_Simplified
{

    /**
     * This is the main function required to convert a number into words.
     *
     * @param string $strNumber number parameter
     * @param string $aCur currency-array parameter
     *
     * @return string
     */
    public function TranslateNumber($strNumber, $aCur)
    {

        $KOR = new Korean();

        $strNum = "";
        $countZero = false;
        NumberingSystem::getLanguage($aUnit, $aTen, $aHundred, $aId, $aNum, "Chinese_Simplified");
        for ($x = 7; $x <= 12; $x++) {
            $aId[$x] = $aCur[$x - 7];
        }

        //===================================================================================
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
                $countZero = false;
                $x = 13;
            }


            /* 
            // Prepre numbers from 0 to 99
            // Eleven in Chinese is "ten one". Twelve is "ten two", and so on. Twenty is "Two ten",
            // twenty-one is  "two ten one" (2*10 + 1), and so on up to 99.
            // One-hundred is "one hundred". One-hundred and one is "one hundred zero one". 
            // One hundred and eleven is "one hundred one ten one". 
            // Notice that for eleven alone, you only need "ten one" and not "one ten one", but when used in a larger number (such as 111), you must add the extra "one". One thousand and above is done in a similar fashion, where you say how
            // many thousands you have, then how many hundreds, tens, and ones. An exception to this is for zeroes.
            // When a zero occurs in the number (except at the end), you need to say "zero",
            // but only once for two or more consecutive zeroes. So one-thousand and one would be "one thousand zero one",
            // where zero stands in for the hundreds and tens places. Try different numbers in the
            // converter above to practice and check on other numbers.

            //What is different from American English is that when you get to ten-thousand,
            // Chinese has its own word (wan4), unlike English where you must use a compound of ten and thousand.
            //Only after ten thousand does Chinese start using compounds itself. One-hundred thousand is "one ten wan4"
            // (where wan4 is the Chinese word for ten-thousand that English lacks).
            // Chinese goes on like this until 100 million (yi4), where it introduces a new character.
            // This happens every four decimal places, unlike American English where it happens every three decimal places
            // (thousand, million, billion, trillion, etc. are all separated by three decimal places).
            */

            $strForma = Number2Text::prepareNumber($strNum, $aNum);

            $y = 0;

            //if (isset($aNum[$x + 3])) 
            // this condition should not appear in chinese simplified
            // but it is a must for chinese traditional
             $ptrn = $N[$x] . $N[$x + 1] . $N[$x + 2] . $N[$x + 3];


            $i = 0;
            for ($y = $x; $y <= $x + 3; $y++) {
                $i += 1;

                if ($aNum[$y] != 0 || $countZero) {
                    $countZero = true;
                    //check ten for units only'
                    if ($i === 3 & $cycle === 3 & $this->checkChineseTen($cycle, $strForma)) {
                        $strNum .= $this->getID($y);
                    } else if ($aNum[$y] != 0) {
                        $strNum .= $aUnit[$aNum[$y]] . $this->getID($y);
                        //And getChineseSum(N, y) = 0
                    } else if ($aNum[$y] == 0 & $this->getChineseSubSum($aNum, $cycle, $i) == 0) {
                        // nothing to do
                        $y = $y;
                        //And getChineseSum(N, y) = 0
                    } else if ($aNum[$y] == 0 & $this->getChineseSubSum($aNum, $cycle, $i) != 0) {
                        // do not count zero again
                        $strNum .= $aUnit[$aNum[$y]];
                        $countZero = false;
                    } else {
                        $strNum .= $aUnit[$aNum[$y]];
                    }

                }
             }

            }

            if ($ptrn != "0000") {
                $strNum .= $this->getGrand($cycle);
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
       // $strNum = NumberingSystem::removeSpaces($strNum);
        $strNum = NumberingSystem::removeAnd($strNum, $aId[0]);

        if ($strForma === "000000000000.0000") {
            $strNum = $aUnit[0];
        }

        return $strNum;


    }

    public static function checkChineseTen($cycle, $strForma)
    {

        if ($cycle === 1 & NumberingSystem::isPattern($strForma, "0010xxxxxxxx.xxxx")) {
            return true;
        } else if ($cycle === 2 & NumberingSystem::isPattern($strForma, "xxxx0010xxxx.xxxx")) {
            return true;
        } else if ($cycle === 3 & NumberingSystem::isPattern($strForma, "xxxxxxxx0010.xxxx")) {
            return true;
        } else if ($cycle === 4 & NumberingSystem::isPattern($strForma, "xxxxxxxxxxxx.0010")) {
            return true;
        }

        return false;
    }

    public static function getID($y)
    {

        if ($y % 4 === 1) {
            return "仟";
            // Thousands
        } else if ($y % 4 === 2) {
            return "佰";
            // Hundereds
        } else if ($y % 4 === 3) {
            return "拾";
            // Tens
        }

        //else if ($y % 4 == 0) {
        // units

        return "";
    }

    /*
    public static function checkChineseHundred($cycle, $strForma)
    {

        if ($cycle == 1 & NumberingSystem::isPattern($strForma, "x1xxxxxxxxxx.xxxx")) {
            return true;
        } else if ($cycle == 2 & NumberingSystem::isPattern($strForma, "xxxxx1xxxxxx.xxxx")) {
            return true;
        } else if ($cycle == 3 & NumberingSystem::isPattern($strForma, "xxxxxxxxx1xx.xxxx")) {
            return true;
        // no place in pences places
        } else if ($cycle == 4) {
            return false;
        }

        return false;
    }
    */

    public static function getChineseSubSum($aNum, $_cycle, $_step)
    {

        $sum = 0;
        $x = 0;

        $_cycle = $_cycle - 1;
        $_cycle = $_cycle * 4;
        for ($x = $_step; $x <= 4; $x++) {
            //echo 'sum ' . $aNum[$_phase + $x] ;
            $sum += $aNum[$_cycle + $x];
        }

        return $sum;

    }

    /*
    public static function checkChineseOne($cycle, $Forma)
    {

        if ($cycle == 1 & NumberingSystem::isPattern($Forma, "0001xxxxxxxx.xxxx")) {
            return true;
        } else if ($cycle == 2 & NumberingSystem::isPattern($Forma, "xxxx0001xxxx.xxxx")) {
            return true;
        // not applied here
        } else if ($cycle == 3) {
            return false;
        // not applied here
        } else if ($cycle == 4) {
            return false;
        }

        return false;
    }
    */


    /*
	public static function checkChineseThousand($cycle, $Forma)
	{

		if ($cycle == 1 & NumberingSystem::isPattern($Forma, "1xxxxxxxxxxx.xxxx")) {
			return true;
		} else if ($cycle == 2 & NumberingSystem::isPattern($Forma, "xxxx1xxxxxxx.xxxx")) {
			return true;
		} else if ($cycle == 3 & NumberingSystem::isPattern($Forma, "xxxxxxxx1xxx.xxxx")) {
			return true;
		// no place in pences places
		} else if ($cycle == 4) {
			return false;
		}

		return false;
	}
	
	*/

    public static function getGrand($cycle)
    {

        if ($cycle === 1) {
            return "亿";
            // 100 Million
        } else if ($cycle === 2) {
            return "万";
            // Ten Thousands
        } else if ($cycle === 3) {
            return "";
            // units
        }

        //else if ($cycle == 4) {
        // decimals

        return "";
    }

    /*
     public static function getChineseSum($aNum, $_step)
     {

         $sum = 0;
         $x = 0;

         for ($x = $_step; $x <= 12; $x++) {
             $sum += $aNum[$x];
         }

         return $sum;

     }
     */

}

?>