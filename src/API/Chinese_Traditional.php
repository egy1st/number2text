<?php
//error_reporting(E_ALL);
//ini_set("display_errors", 1);
//ini_set('error_reporting', E_ALL);

require_once "NumberingSystem.php";
require_once "Number2Words.php";

/**
 * @covers Chinese_Traditional
 *
 */
class Chinese_Traditional
{

    public function TranslateNumber($str_Number, $aCur)
    {

        $Num = "";
        $countZero = false;
        NumberingSystem::getLanguage($R, $Z, $H, $M, $N, "Chinese_Traditional");
        for ($x = 7; $x <= 12; $x++) {
            $M [$x] = $aCur [$x - 7];
        }

        //===================================================================================
        // each cycle represents a scale hunderds and tens, thousnads, millions and milliars
        $L = 0;
        for ($L = 1; $L <= 4; $L++) {
            if ($L == 1) {
                $x = 1;
            } else if ($L == 2) {
                $x = 5;
            } else if ($L == 3) {
                $x = 9;
            } else if ($L == 4) {
                $countZero = false;
                $x = 14;
            }

            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            //==============================================================================
            //prepre numbers from 0 to 99
            //Eleven in Chinese is "ten one". Twelve is "ten two", and so on. Twenty is "Two ten", twenty-one is
            // "two ten one" (2*10 + 1), and so on up to 99. One-hundred is "one hundred". One-hundred and one is
            // "one hundred zero one". One hundred and eleven is "one hundred one ten one". Notice that for eleven '
            //alone, you only need "ten one" and not "one ten one", but when used in a larger number (such as 111),
            // you must add the extra "one". One thousand and above is done in a similar fashion, where you say how
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

            $Forma = Number2Words::prepareNumber($str_Number, $N);

            $y = 0;
			
				
			if ( isset($N[$x + 3]) ){
            $ptrn = $N[$x] . $N[$x + 1] . $N[$x + 2] . $N[$x + 3];


				$i = 0;
				for ($y = $x; $y <= $x + 3; $y++) {
					$i += 1;
					if ($N[$y] != 0 || $countZero) {
						$countZero = true;
					//check ten for units only'
					if ($i == 3 & $L == 3 & $this->checkChineseTen($L, $Forma)) {
						$Num .= $this->getID($y);
					} else if ($N[$y] != 0) {
						$Num .= $R[$N[$y]] . $this->getID($y);
						//And getChineseSum(N, y) = 0
					} else if ($N[$y] == 0 & $this->getChineseSubSum($N, $L, $i) == 0) {
						// nothing to do
						$y = $y;
						//And getChineseSum(N, y) = 0
					} else if ($N[$y] == 0 & $this->getChineseSubSum($N, $L, $i) != 0) {
						// do not count zero again
						$Num .= $R[$N[$y]];
						$countZero = false;
					} else {
						$Num .= $R[$N[$y]];
					}

				  }
			   }
			}

            if ($ptrn != "0000") {
                $Num .= $this->getGrand($L);
            }
            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            if ($L == 3) {
                $Num = NumberingSystem::removeAnd($Num, $M [0]);
                $Num .= " " . $M[7];
            } else if ($L == 4 & !NumberingSystem::isPattern($Forma, "xxxxxxxxxxxx.0000")) {
                $Num .= " " . $M[9];
            }
        }

        //Num = removeComma(Num) ' no comma is used in Finnish
        $Num = NumberingSystem::removeSpaces($Num);
        $Num = NumberingSystem::removeAnd($Num, $M [0]);

        if ($Forma == "000000000000.0000") {
            $Num = $R[0];
        }

        return $Num;

    }

    public static function getGrand($L)
    {

        if ($L == 1) {
            return "億";
            // 100 Million
        } else if ($L == 2) {
            return "萬";
            // Ten Thousands
        } else if ($L == 3) {
            return "";
            // units
        }

        //else if ($L == 4) {
        // decimals

        return "";
    }

    public static function getID($y)
    {

        if ($y % 4 == 1) {
            return "仟";
            // Thousands
        } else if ($y % 4 == 2) {
            return "佰";
            // Hundereds
        } else if ($y % 4 == 3) {
            return "拾";
            // Tens
        }

        //else if ($y % 4 == 0) {
        // units

        return "";

    }

    /*
    public static function checkChineseHundred($L, $Forma)
    {

        if ($L == 1 & NumberingSystem::isPattern($Forma, "x1xxxxxxxxxx.xxxx")) {
            return true;
        } else if ($L == 2 & NumberingSystem::isPattern($Forma, "xxxxx1xxxxxx.xxxx")) {
            return true;
        } else if ($L == 3 & NumberingSystem::isPattern($Forma, "xxxxxxxxx1xx.xxxx")) {
            return true;
        // no place in pences places
        } else if ($L == 4) {
            return false;
        }

        return false;
    }
    */

    public static function checkChineseTen($L, $Forma)
    {

        if ($L == 1 & NumberingSystem::isPattern($Forma, "0010xxxxxxxx.xxxx")) {
            return true;
        } else if ($L == 2 & NumberingSystem::isPattern($Forma, "xxxx0010xxxx.xxxx")) {
            return true;
        } else if ($L == 3 & NumberingSystem::isPattern($Forma, "xxxxxxxx0010.xxxx")) {
            return true;
        } else if ($L == 4 & NumberingSystem::isPattern($Forma, "xxxxxxxxxxxx.0010")) {
            return true;
        }

        return false;
    }

    /*
    public static function checkChineseOne($L, $Forma)
    {

        if ($L == 1 & NumberingSystem::isPattern($Forma, "0001xxxxxxxx.xxxx")) {
            return true;
        } else if ($L == 2 & NumberingSystem::isPattern($Forma, "xxxx0001xxxx.xxxx")) {
            return true;
        // not applied here
        } else if ($L == 3) {
            return false;
        // not applied here
        } else if ($L == 4) {
            return false;
        }

        return false;
    }
   */


    /*
	public static function checkChineseThousand($L, $Forma)
	{

		if ($L == 1 & NumberingSystem::isPattern($Forma, "1xxxxxxxxxxx.xxxx")) {
			return true;
		} else if ($L == 2 & NumberingSystem::isPattern($Forma, "xxxx1xxxxxxx.xxxx")) {
			return true;
		} else if ($L == 3 & NumberingSystem::isPattern($Forma, "xxxxxxxx1xxx.xxxx")) {
			return true;
		// no place in pences places
		} else if ($L == 4) {
			return false;
		}

		return false;
	}
	*/


    public static function getChineseSubSum($N, $_phase, $_step)
    {

        $sum = 0;
        $x = 0;

        $_phase = $_phase - 1;
        $_phase = $_phase * 4;
        for ($x = $_step; $x <= 4; $x++) {
            //echo 'sum ' . $N[$_phase + $x] ;
            $sum += $N[$_phase + $x];
        }

        return $sum;

    }

    /*
	public static function getChineseSum($N, $_step)
	{

		$sum = 0;
		$x = 0;

		for ($x = $_step; $x <= 12; $x++) {
			$sum += $N[$x];
		}

		return $sum;

	}
	*/


}

?>