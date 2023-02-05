<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
ini_set('error_reporting', E_ALL);

/**
* Refernce to count
* https://www.mandarintools.com/numbers.html
* https://www.lddgo.net/en/convert/numberupper
* https://flexiclasses.com/chinese-grammar-bank/big-chinese-numbers/
* https://davidsmithtranslation.com/articles/numbers-in-chinese/
*/

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
    public function translateNumber($strNumber, $aCur)
    {

        $strNum = "";

        NumberingSystem::getLanguage($aUnit, $aTen, $aHundred, $aId, $aNum, "Chinese_Simplified");
        for ($x = 7; $x <= 12; $x++) {
            $aId[$x] = $aCur[$x - 7];
        }
         
       
        
        // print_r($aNum) ;
        // echo $strForma . "\n\r" ;
             
        //=====================================================================
        // each cycle represents a scale hunderds and tens, thousnads, millions and milliars
        $cycle = 0;
        $strForma = Number2Text::prepareNumber($strNumber, $aNum);
        for ($cycle = 1; $cycle <= 4; $cycle++) {
            if ($cycle == 1) {
                $x = 1;
            } else if ($cycle == 2) {
                $x = 5;
            } else if ($cycle == 3) {
                $x = 9;
            } else if ($cycle == 4) {
                $countZero = false;
                $x = 14;
            }
   

            // Keywords
            // Counting up to 10,000 since the chinese system is based on 4-digits not 3-digits as other languages.
            $strUnit = "" ;
            $ptrn = substr($strForma,$x-1,4);
            $foundZeros = false;
           
                
           if ($aNum[$x + 0] != 0) {
                $strUnit .= ($aUnit[$aNum[$x + 0]] . $aId[1]);
                // Thousands
            } 

           $foundZeros = $this->checkZeros($cycle, $strNum, $ptrn);
           if ($foundZeros) {
              $strUnit .= $aUnit[0];
           }
              
            
           if ($aNum[$x + 1] != 0) {
                $strUnit .= ($aUnit[$aNum[$x + 1]] . $aHundred[1]);
                // Hundreds
            } 
            

           // Tens             
            if ($aNum[$x + 2] == 1) {
                 $strUnit .= $aTen[1]; 

            } else if($aNum[$x + 2] > 1) {
                $strUnit .= ($aUnit[$aNum[$x + 2]] . $aTen[1]);     
            } 

            // Units
            if ($aNum[$x + 3] != 0) {
                 $strUnit .= ($aUnit[$aNum[$x + 3]]) ;
            }

            if ($ptrn !== "0000"){  // zero-index. should subtract 1 ftom x
                $strUnit .= $this->getGrand($cycle);
            }
    
         
           $strNum .= $strUnit ;
       
       }

              
        /*
        $strNum = NumberingSystem::removeSpaces($strNum);
        $strNum = NumberingSystem::removeAnd($strNum, $aId[0]);

        if ($strForma == "000000000000.0000") {
            $strNum = $aUnit[0];
        }
        */

        return $strNum;

    }
 
    public static function checkZeros($cycle, $strNum, $ptrn): bool {

        if (($cycle == 2 ||  $cycle == 3) && $strNum != '' && $ptrn != '0000'){

            if ( 
                (substr($ptrn,0,3) == '000' && $ptrn[3] != '0')
                || (substr($ptrn,0,2) == '00')
                || ($ptrn[0] == '0' && $ptrn[1] != '0' && $ptrn[2] == '0' && $ptrn[3] == '0' )
                || ($ptrn[0] == '0' && $ptrn[1] != '0' && $ptrn[2] != '0' && $ptrn[3] != '0' )
                || ($ptrn[0] != '0' && $ptrn[1] == '0' && $ptrn[3] != '0' )
                || ($ptrn[0] == '0' && $ptrn[1] != '0' && $ptrn[2] != '0' && $ptrn[3] != '0' )
            ) {
               return true;
            } 
            
            if (
               (substr($ptrn,-3) == '000')
                
            ) {
                 return false;
            } 
            
         
        }
        return false;    
    }

    public static function getGrand($cycle)
    {

       if ($cycle === 1) {
            return "亿"; // 100 Million
         } else if ($cycle === 2) {
            return "万"; // 10 thousand
        } else if ($cycle === 3) {
            return ""; // nothing to return, less than 10000
        } else if ($cycle === 4) {
            return ""; // nothing to return, the deciaml part
         }
    }

}


?>