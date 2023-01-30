<?php
//error_reporting(E_ALL);
//ini_set("display_errors", 1);
//ini_set('error_reporting', E_ALL);

require_once "NumberingSystem.php";
require_once "Number2Words.php";

/**
 * @covers German
 *
 */
class German
{
    public function TranslateNumber($str_Number, $aCur)
    {
        $Num = "";

        NumberingSystem::getLanguage($R, $Z, $H, $M, $N, "German");
        for ($x = 7; $x <= 12; $x++) {
            $M [$x] = $aCur [$x - 7];
        }

        // ===================================================================================
        // each cycle represent a scale hunderds and tens, thousnads, millions and milliars
        $L = 0;
        for ($L = 1; $L <= 5; $L++) {
            $id1 = $M [($L * 2) - 1];
            $id2 = $M [$L * 2];
            if ($L == 1) {
                $x = 1;
                $n_sum = NumberingSystem::getSum($N, 1);
            } else if ($L == 2) {
                $x = 4;
                $n_sum = NumberingSystem::getSum($N, 2);
            } else if ($L == 3) {
                $x = 7;
                $n_sum = NumberingSystem::getSum($N, 3);
            } else if ($L == 4) {
                $x = 10;
				if ($N [$x] == 0 & $N [$x + 1] == 0 & $N [$x + 2] == 0) {
					$Num = NumberingSystem::removeComma($Num) ;
                	$Num .=  ' ' . $id2 ;
			      }
            } else if ($L == 5) {
                $x = 14;
            }
            // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            // ==============================================================================

            $Forma = Number2Words::prepareNumber($str_Number, $N);

            // Special condition for germany language
            if ($N [$x + 1] == 0 & $N [$x + 2] == 1 & $L <= 2) {
                $R [1] .= "e";
            } else if ($N [$x + 1] == 0 & $N [$x + 2] == 1 & $L == 4) {
                $R [1] .= "s";
            }
            // End of special condition

            $n_unit = $N [$x + 2] + ($N [$x + 1] * 10);
            // keywords
            if ($n_unit < 21) {
                $str_unit = $R [$n_unit];
                // tens
            } else if ($N [$x + 2] == 0) {
                $str_unit = $Z [$N [$x + 1]];
            } else {
                $str_unit = $R [$N [$x + 2]] . $M [0] . $Z [$N [$x + 1]];
            }

            if ($L == 1 & substr($Forma, 1, 3) == "001") {
                $id2 = $id1;
            } else if ($L == 1 & substr($Forma, 4, 3) == "001") {
                $id2 = $id1;
            }

            if ($L <= 2 | $L == 4) {
                $id2 = " " . $id2 . " ";
                $id1 = " " . $id1 . " ";
            }

            if ($N [$x] != 0) {
                if ($N [$x + 1] + $N [$x + 2] != 0) {
                    $Num .= $H [$N [$x]] . $str_unit . $id2;
                } else {
                    $Num .= $H [$N [$x]] . $id2;
                }
            } else if ($N [$x + 1] + $N [$x + 2] != 0) {
                $Num .= $str_unit . " " . $id2;
            } else {
                // nothing to do
            }

            if ($L == 3) {
                if (substr($Forma, 7, 3) == "001") {
                    $Num = $id1;
                }
            }

             if ($L == 4) {
				
                 if (substr($Forma, 0, 12) == "000000000001") {
                    $Num = $R [1] . " " . $id1;
                } else if (substr($Forma, 0, 12) == "000000000000") {
                    $Num = "";
                } else {
                    $Num = trim($Num);
                    $Ln = strlen($Num);
                    if (substr($Num, -1) == ",") {
                        $Num = substr($Num, 0, $Ln - 1);
                    }
                }

                // case one dollar
				$Num = NumberingSystem::substituteIDs($Num, $Forma, $L, $id1,  $id2 ) ;
				  
                // cond.4
                if (substr($Forma, -3) != "000" & substr($Forma, 0, 12) != "000000000000") {
                    $Num .= " " . $M [0] . " ";
                }
            }

           if ($L == 5) {
				// one cent
                $Num = NumberingSystem::substituteIDs($Num, $Forma, $L, $id1,  $id2 ) ;
            }

        }

        // $Num = removeComma(Num) ; // no comma used in Germany
        $Num = NumberingSystem::removeSpaces($Num);
        $Num = NumberingSystem::removeAnd($Num, $M [0]);

        if ($Forma == "000000000000.000") {
            $Num = $R [0];
        }

        return $Num;
    }
}

?>