<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
ini_set('error_reporting', E_ALL);


/**
 * @covers NumberingSystem
 *
 */
class NumberingSystem
{

    /**
     * This function sum up each group of 3 digits.
     *
     * @param string $aNum number array parameter
     * @param string $_step which cycle parameter
     *
     * @return int
     */
    public static function getSum($aNum, $_step): int
    {
        $sum = 0;
        if ($aNum != null) {
            if ($_step == 1) {
                $sum = ($aNum[12]) + (($aNum[11]) * 10) + (($aNum[10]) * 100) + (($aNum[9]) * 1000) + (($aNum[8]) * 10000) + (($aNum[7]) * 100000) + (($aNum[6]) * 1000000) + (($aNum[5]) * 10000000) + (($aNum[4]) * 100000000);
            } else if ($_step == 2) {
                $sum = ($aNum[12]) + (($aNum[11]) * 10) + (($aNum[10]) * 100) + (($aNum[9]) * 1000) + (($aNum[8]) * 10000) + (($aNum[7]) * 100000);
            } else if ($_step == 3) {
                $sum = ($aNum[12]) + (($aNum[11]) * 10) + (($aNum[10]) * 100);
            }
        }

        return $sum;
    }

    /**
     * This function removes comma "," from a resulted string.
     *
     * @param string $str string parameter
     *
     * @return string
     */
    public static function removeComma($str): string
    {
        $str = trim($str);
        $Ln = strlen($str);
        if (substr($str, -1) == ",") {
            $str = substr($str, 0, $Ln - 1);
        }
        return $str;
    }

    /**
     * This function substitute IDs accoring to a specific cycle.
     *
     * @param string $strNum strNum1 parameter
     * @param string $strForma strForma parameter
     * @param string $cycle cycle parameter
     * @param string $id1 1st Id  parameter
     * @param string $id2 2nd Id parameter
     *
     * @return string
     */
    public static function substituteIDs($strNum, $strForma, $cycle, $id1, $id2): string
    {

        if (($cycle == 4 & substr($strForma, 0, 12) == "000000000001") || ($cycle == 5 & substr($strForma, -3) == "001")) {
            $strNum = trim($strNum);
            $num_Ln = strlen($strNum);
            if (substr($strNum, -1) == ",") {
                $strNum = substr($strNum, 0, $num_Ln - 1);
            }

            $Ln2 = strlen($id2);
            if (substr($strNum, -$Ln2) == $id2) {
                $newNum = substr($strNum, 0, $num_Ln - ($Ln2 + 1));
                $newNum .= ' ' . $id1;
                return $newNum;
            }


        }
        return $strNum;
    }

    /**
     * This function remove concatanation notion from a resulted string.
     *
     * @param string $str string parameter
     * @param string $and concatanation notion parameter
     *
     * @return string
     */
    public static function removeAnd($str, $and): string
    {
        $str = trim($str);
        $Ln = strlen($str);
        $Ln2 = strlen($and) + 1;
        if (substr($str, -$Ln2) == " " . $and) {
            $str = substr($str, 0, $Ln - $Ln2);
            $str = trim($str);
        }
        return $str;
    }

    /**
     * This function remove first concatanation notion from a resulted string.
     *
     * @param string $str string parameter
     * @param string $and concatanation notion parameter
     *
     * @return string
     */
    public static function remove1stAnd($str, $and): string
    {
        $str = trim($str);
        $Ln = strlen($str);
        $Ln2 = strlen($and) + 1;
        if (substr($str, 0, $Ln2) == $and . " ") {
            $str = substr($str, $Ln2, $Ln - $Ln2);
            $str = trim($str);
        }
        return $str;
    }

    /**
     * This function checks if a currency exist in the result string.
     *
     * @param string $cycle cycle parameter
     * @param string $ptrn pattern parameter
     *
     * @return bool
     */
    public static function NoCurrency($cycle, $ptrn): bool
    {
        if ($cycle === 4) {
            if (self::isPattern($ptrn, "xxxxxxxxx000.xxx")) {
                return true;
            }
        }
        return false;
    }

    /**
     * This function make sure that we follw a valid pattern.
     *
     * @param string $ptrn1 pattern 1 parameter
     * @param string $ptrn2 pattern 2 parameter
     *
     * @return bool
     */
    public static function isPattern($ptrn1, $ptrn2): bool
    {
        $n = 0;

        for ($n = 1; $n <= 16; $n++) {
            if (substr($ptrn2, $n, 1) == "d") {
                if (substr($ptrn1, $n, 1) == "0") {
                    return false;
                }
            } else if (substr($ptrn2, $n, 1) != "x" & substr($ptrn1, $n, 1) != substr($ptrn2, $n, 1)) {
                return false;
            }
        }

        return true;
    }


    /*
    public static function noKoreanCurrency($phase, $ptrn) {
        if ($phase == 3) {
            if (self::isPattern ( $ptrn, "xxxxxxxx0000.xxxx" )) {
                return true;
            }
        }
        return false;
    }
   */

    /**
     * This function remove spaces between result string.
     *
     * @param string $str string parameter
     *
     * @return string
     */
    public static function removeSpaces($str)
    {
        if ($str == '')
            return "";

        $str = trim($str);
        $newStr = substr($str, 0, 1);
        $Ln = strlen($str);

        for ($x = 1; $x <= $Ln; $x++) {
            if (!(substr($str, $x, 1) == " " & substr($str, $x - 1, 1) == " ")) {
                $newStr .= substr($str, $x, 1);
            }
        }
        return $newStr;
    }


    /**
     * This function checks if exact 100 is exist in a cycle.
     *
     * @param string $cycle cycle parameter
     * @param string $strForma strForma parameter
     *
     * @return string
     */
    public static function checkOneHundred($cycle, $strForma)
    {
        if ($cycle == 4 & self::isPattern($strForma, "xxxxxxxxx100.xxx")) {
            return true;
        } else if ($cycle == 3 & self::isPattern($strForma, "xxxxxx100xxx.xxx")) {
            return true;
        } else if ($cycle == 2 & self::isPattern($strForma, "xxx100xxxxxx.xxx")) {
            return true;
        } else if ($cycle == 1 & self::isPattern($strForma, "100xxxxxxxxx.xxx")) {
            //$strNum .= $aHundred[10] . " " . $id2 . " ";
            return true;
        }

        return false;
    }

    /*
    public static function hexToStr($hex) {
        $string = '';
        for($i = 0; $i < strlen ( $hex ) - 1; $i += 2) {
            $string .= chr ( hexdec ( $hex [$i] . $hex [$i + 1] ) );
        }
        return $string;
    }
    */


    /**
     * This function checks if exact 1000 is exist in a cycle.
     *
     * @param string $cycle cycle parameter
     * @param string $strForma strForma parameter
     *
     * @return string
     */
    public static function checkOneThousnad($cycle, $strForma)
    {
        if ($cycle == 3 & self::isPattern($strForma, "000000001xxx.xxx")) {
            return true;
        }

        return false;
    }


    /**
     * This function set the dictionary for each language.
     *
     * @param string $aUnit aUnit parameter
     * @param string $aTen aTen parameter
     * @param string $aHundred aHundred parameter
     * @param string $aId aId parameter
     * @param string $aNum aNum parameter
     * @param string $Lang Lang parameter
     *
     * @return void
     */
    public static function getLanguage(&$aUnit, &$aTen, &$aHundred, &$aId, &$aNum, $Lang)
    {
        $aId[7] = "";
        $aId[8] = "";
        $aId[9] = "";
        $aId[10] = "";

        switch ($Lang) {
            case "Arabic" :
                $aUnit[1] = "واحد ";
                $aUnit[2] = "إثنين ";
                $aUnit[3] = "ثلاثة ";
                $aUnit[4] = "أربعة ";
                $aUnit[5] = "خمسة ";
                $aUnit[6] = "ستة ";
                $aUnit[7] = "سبعة ";
                $aUnit[8] = "ثمانية ";
                $aUnit[9] = "تسعة ";
                $aUnit[11] = "إحدى ";
                $aUnit[12] = "إثنتا ";

                $aTen[1] = "عشرة ";
                $aTen[2] = "عشرون ";
                $aTen[3] = "ثلاثون ";
                $aTen[4] = "أربعون ";
                $aTen[5] = "خمسون ";
                $aTen[6] = "ستون ";
                $aTen[7] = "سبعون ";
                $aTen[8] = "ثمانون ";
                $aTen[9] = "تسعون ";

                $aHundred[1] = "مائة ";
                $aHundred[2] = "مائتين ";
                $aHundred[3] = "ثلاثمائة ";
                $aHundred[4] = "أربعمائة ";
                $aHundred[5] = "خمسمائة ";
                $aHundred[6] = "ستمائة ";
                $aHundred[7] = "سبعمائة ";
                $aHundred[8] = "ثمانمائة ";
                $aHundred[9] = "تسعمائة ";

                $aId[0] = "و";
                $aId[1] = " مليار ";
                $aId[2] = " مليارات ";
                $aId[3] = " مليون ";
                $aId[4] = " ملايين ";
                $aId[5] = " ألف ";
                $aId[6] = " آلاف ";

                $aId[7] = "";
                $aId[8] = "";
                $aId[9] = "";
                $aId[10] = "";
                $aId[11] = "";
                $aId[12] = "";

                break;

            case "English" :

                $aUnit[0] = "zero";
                $aUnit[1] = "one";
                $aUnit[2] = "two";
                $aUnit[3] = "three";
                $aUnit[4] = "four";
                $aUnit[5] = "five";
                $aUnit[6] = "six";
                $aUnit[7] = "seven";
                $aUnit[8] = "eight";
                $aUnit[9] = "nine";
                $aUnit[10] = "ten";
                $aUnit[11] = "eleven";
                $aUnit[12] = "twelve";
                $aUnit[13] = "thirteen";
                $aUnit[14] = "fourteen";
                $aUnit[15] = "fifteen";
                $aUnit[16] = "sixteen";
                $aUnit[17] = "seventeen";
                $aUnit[18] = "eighteen";
                $aUnit[19] = "nineteen";
                $aUnit[20] = "twenty";

                $aTen[0] = "";
                $aTen[1] = "ten";
                $aTen[2] = "twenty";
                $aTen[3] = "thirty";
                $aTen[4] = "forty";
                $aTen[5] = "fifty";
                $aTen[6] = "sixty";
                $aTen[7] = "seventy";
                $aTen[8] = "eighty";
                $aTen[9] = "ninety";

                $aHundred[0] = "";
                $aHundred[1] = "one hundred";
                $aHundred[2] = "two hundred";
                $aHundred[3] = "three hundred";
                $aHundred[4] = "four hundred";
                $aHundred[5] = "five hundred";
                $aHundred[6] = "six hundred";
                $aHundred[7] = "seven hundred";
                $aHundred[8] = "eight hundred";
                $aHundred[9] = "nine hundred";

                $aId[0] = "and";
                $aId[1] = "billion";
                $aId[2] = "billion";
                $aId[3] = "million";
                $aId[4] = "million";
                $aId[5] = "thousand";
                $aId[6] = "thousand";

                break;

            case "French" :

                $aUnit[0] = "zéro";
                $aUnit[1] = "un";
                $aUnit[2] = "deux";
                $aUnit[3] = "trois";
                $aUnit[4] = "quatre";
                $aUnit[5] = "cinq";
                $aUnit[6] = "six";
                $aUnit[7] = "sept";
                $aUnit[8] = "huit";
                $aUnit[9] = "neuf";
                $aUnit[10] = "dix";
                $aUnit[11] = "onze";
                $aUnit[12] = "douze";
                $aUnit[13] = "treize";
                $aUnit[14] = "quatorze";
                $aUnit[15] = "quinze";
                $aUnit[16] = "seize";
                $aUnit[17] = "dix-sept";
                $aUnit[18] = "dix-huit";
                $aUnit[19] = "dix-neuf";
                $aUnit[20] = "vingt";

                $aTen[0] = "";
                $aTen[1] = "dix";
                $aTen[2] = "vingt";
                $aTen[3] = "trente";
                $aTen[4] = "quarante";
                $aTen[5] = "cinquante";
                $aTen[6] = "soixante";
                $aTen[7] = "soixante-dix";
                $aTen[8] = "quatre-vingt";
                $aTen[9] = "quatre-vingt-dix";

                $aHundred[0] = "";
                $aHundred[1] = "cent";
                $aHundred[2] = "deux cent";
                $aHundred[3] = "trois cent";
                $aHundred[4] = "quatre cent";
                $aHundred[5] = "cinq cent";
                $aHundred[6] = "six cent";
                $aHundred[7] = "sept cent";
                $aHundred[8] = "huit cent";
                $aHundred[9] = "neuf cent";

                $aId[0] = "et";
                $aId[1] = "milliard";
                $aId[2] = "milliards";
                $aId[3] = "million";
                $aId[4] = "millions";
                $aId[5] = "mille";
                $aId[6] = "mille";

                break;

            case "German" :

                $aUnit[0] = "null";
                $aUnit[1] = "ein";
                $aUnit[2] = "zwei";
                $aUnit[3] = "drei";
                $aUnit[4] = "vier";
                $aUnit[5] = "fünf";
                $aUnit[6] = "sechs";
                $aUnit[7] = "sieben";
                $aUnit[8] = "acht";
                $aUnit[9] = "neun";
                $aUnit[10] = "zehn";
                $aUnit[11] = "elf";
                $aUnit[12] = "zwölf";
                $aUnit[13] = "dreizehn";
                $aUnit[14] = "vierzehn";
                $aUnit[15] = "fünfzehn";
                $aUnit[16] = "sechzehn";
                $aUnit[17] = "siebzehn";
                $aUnit[18] = "achtzehn";
                $aUnit[19] = "neunzehn";
                $aUnit[20] = "zwanzig";

                $aTen[0] = "";
                $aTen[1] = "zehn";
                $aTen[2] = "zwanzig";
                $aTen[3] = "dreißig";
                $aTen[4] = "vierzig";
                $aTen[5] = "fünfzig";
                $aTen[6] = "sechzig";
                $aTen[7] = "siebzig";
                $aTen[8] = "achtzig";
                $aTen[9] = "neunzig";

                $aHundred[0] = "";
                $aHundred[1] = "hundert";
                $aHundred[2] = "zweihundert";
                $aHundred[3] = "dreihundert";
                $aHundred[4] = "vierhundert";
                $aHundred[5] = "fünfhundert";
                $aHundred[6] = "sechshundert";
                $aHundred[7] = "siebenhundert";
                $aHundred[8] = "achthundert";
                $aHundred[9] = "neunhundert";

                $aId[0] = "und";
                $aId[1] = "milliarde";
                $aId[2] = "milliarden";
                $aId[3] = "million";
                $aId[4] = "millionen";
                $aId[5] = "tausend";
                $aId[6] = "tausend";

                break;
            case "Spanish" :

                $aUnit[0] = "cero";
                $aUnit[1] = "uno";
                $aUnit[2] = "dos";
                $aUnit[3] = "tres";
                $aUnit[4] = "cuatro";
                $aUnit[5] = "cinco";
                $aUnit[6] = "seis";
                $aUnit[7] = "siete";
                $aUnit[8] = "ocho";
                $aUnit[9] = "nueve";
                $aUnit[10] = "diez";
                $aUnit[11] = "once";
                $aUnit[12] = "doce";
                $aUnit[13] = "trece";
                $aUnit[14] = "catorce";
                $aUnit[15] = "quince";
                $aUnit[16] = "dieciséis";
                $aUnit[17] = "diecisiete";
                $aUnit[18] = "dieciocho";
                $aUnit[19] = "diecinueve";
                $aUnit[20] = "veinte";
                $aUnit[21] = "veintiuno";
                $aUnit[22] = "veintidós";
                $aUnit[23] = "veintitrés";
                $aUnit[24] = "veinticuatro";
                $aUnit[25] = "veinticinco";
                $aUnit[26] = "veintiséis";
                $aUnit[27] = "veintisiete";
                $aUnit[28] = "veintiocho";
                $aUnit[29] = "veintinueve";
                $aUnit[30] = "treinta";

                $aTen[0] = "";
                $aTen[1] = "diez";
                $aTen[2] = "veinte";
                $aTen[3] = "treinta";
                $aTen[4] = "cuarenta";
                $aTen[5] = "cinquenta";
                $aTen[6] = "sesenta";
                $aTen[7] = "setenta";
                $aTen[8] = "ochenta";
                $aTen[9] = "noventa";

                $aHundred[0] = "";
                $aHundred[1] = "ciento";
                $aHundred[2] = "doscientos";
                $aHundred[3] = "trescientos";
                $aHundred[4] = "cuatrocientos";
                $aHundred[5] = "quinientos";
                $aHundred[6] = "seiscientos";
                $aHundred[7] = "setecientos";
                $aHundred[8] = "ochocientos";
                $aHundred[9] = "novecientos";

                $aId[0] = "y";
                $aId[1] = "mil millones";
                $aId[2] = "mil millones";
                $aId[3] = "millón";
                $aId[4] = "millones";
                $aId[5] = "mil";
                $aId[6] = "mil";

                break;
            case "Portuguese" :
                $aUnit[0] = "zero";
                $aUnit[1] = "um";
                $aUnit[2] = "dois";
                $aUnit[3] = "três";
                $aUnit[4] = "quatro";
                $aUnit[5] = "cinco";
                $aUnit[6] = "seis";
                $aUnit[7] = "sete";
                $aUnit[8] = "oito";
                $aUnit[9] = "nove";
                $aUnit[10] = "dez";
                $aUnit[11] = "onze";
                $aUnit[12] = "doze";
                $aUnit[13] = "treze";
                $aUnit[14] = "catorze";
                $aUnit[15] = "quinze";
                $aUnit[16] = "dezesseis";
                $aUnit[17] = "dezessete";
                $aUnit[18] = "dezoito";
                $aUnit[19] = "dezenove";
                $aUnit[20] = "dez";

                $aTen[0] = "";
                $aTen[1] = "dez";
                $aTen[2] = "vinte";
                $aTen[3] = "trinta";
                $aTen[4] = "quarenta";
                $aTen[5] = "cinquenta";
                $aTen[6] = "sessenta";
                $aTen[7] = "setenta";
                $aTen[8] = "oitenta";
                $aTen[9] = "noventa";

                $aHundred[0] = "";
                $aHundred[1] = "cento";
                $aHundred[2] = "duzentos";
                $aHundred[3] = "trezentos";
                $aHundred[4] = "quatrocentos";
                $aHundred[5] = "quinhentos";
                $aHundred[6] = "seiscentos";
                $aHundred[7] = "setecentos";
                $aHundred[8] = "oitocentos";
                $aHundred[9] = "novecentos";
                $aHundred[10] = "cem";

                $aId[0] = "e";
                $aId[1] = "mil milhões";
                $aId[2] = "mil milhões";
                $aId[3] = "milhão";
                $aId[4] = "milhões";
                $aId[5] = "mil";
                $aId[6] = "mil";

                break;

            case "Italian" :
                $aUnit[0] = "zero";
                $aUnit[1] = "uno";
                $aUnit[2] = "due";
                $aUnit[3] = "tre";
                $aUnit[4] = "quattro";
                $aUnit[5] = "cinque";
                $aUnit[6] = "sei";
                $aUnit[7] = "sette";
                $aUnit[8] = "otto";
                $aUnit[9] = "nove";
                $aUnit[10] = "dieci";
                $aUnit[11] = "undici";
                $aUnit[12] = "dodici";
                $aUnit[13] = "tredici";
                $aUnit[14] = "quattordici";
                $aUnit[15] = "quindici";
                $aUnit[16] = "sedici";
                $aUnit[17] = "diciassette";
                $aUnit[18] = "diciotto";
                $aUnit[19] = "diciannove";
                $aUnit[20] = "venti";

                $aTen[0] = "";
                $aTen[1] = "dieci";
                $aTen[2] = "venti";
                $aTen[3] = "trenta";
                $aTen[4] = "quaranta";
                $aTen[5] = "cinquanta";
                $aTen[6] = "sessanta";
                $aTen[7] = "settanta";
                $aTen[8] = "ottanta";
                $aTen[9] = "novanta";

                $aHundred[0] = "";
                $aHundred[1] = "cento";
                $aHundred[2] = "duecento";
                $aHundred[3] = "trecento";
                $aHundred[4] = "quattrocento";
                $aHundred[5] = "cinquecento";
                $aHundred[6] = "seicento";
                $aHundred[7] = "settecento";
                $aHundred[8] = "ottocento";
                $aHundred[9] = "novecento";

                $aId[0] = "";
                $aId[1] = "miliardo";
                $aId[2] = "miliardi";
                $aId[3] = "milione";
                $aId[4] = "milioni";
                $aId[5] = "mille";
                $aId[6] = "mila";

                break;

            case "Russian" :
                $aUnit[0] = "ноль";
                $aUnit[1] = "один";
                $aUnit[2] = "два";
                $aUnit[3] = "три";
                $aUnit[4] = "четыре";
                $aUnit[5] = "пять";
                $aUnit[6] = "шесть";
                $aUnit[7] = "семь";
                $aUnit[8] = "восемь";
                $aUnit[9] = "девять";
                $aUnit[10] = "десять";
                $aUnit[11] = "одиннадцать";
                $aUnit[12] = "двенадцать";
                $aUnit[13] = "тринадцать";
                $aUnit[14] = "четырнадцать";
                $aUnit[15] = "пятнадцать";
                $aUnit[16] = "шестнадцать";
                $aUnit[17] = "семнадцать";
                $aUnit[18] = "восемнадцать";
                $aUnit[19] = "девятнадцать";
                $aUnit[20] = "двадцать";

                $aTen[0] = "";
                $aTen[1] = "десять";
                $aTen[2] = "двадцать";
                $aTen[3] = "тридцать";
                $aTen[4] = "сорок";
                $aTen[5] = "пятьдесят";
                $aTen[6] = "шестьдесят";
                $aTen[7] = "семьдесят";
                $aTen[8] = "восемьдесят";
                $aTen[9] = "девяносто";

                $aHundred[0] = "";
                $aHundred[1] = "сто";
                $aHundred[2] = "двести";
                $aHundred[3] = "триста";
                $aHundred[4] = "четыреста";
                $aHundred[5] = "пятьсот";
                $aHundred[6] = "шестьсот";
                $aHundred[7] = "семьсот";
                $aHundred[8] = "восемьсот";
                $aHundred[9] = "девятьсот";

                $aId[0] = "";
                $aId[1] = "миллиард";
                $aId[2] = "миллиарды";
                $aId[3] = "миллион";
                $aId[4] = "миллионов";
                $aId[5] = "тысяча";
                $aId[6] = "тысяч";

                break;

            case "Turkish" :
                $aUnit[0] = "sıfır";
                $aUnit[1] = "bir";
                $aUnit[2] = "iki";
                $aUnit[3] = "üç";
                $aUnit[4] = "dört";
                $aUnit[5] = "beş";
                $aUnit[6] = "altı";
                $aUnit[7] = "yedi";
                $aUnit[8] = "sekiz";
                $aUnit[9] = "dokuz";
                $aUnit[10] = "yirmi";
                $aUnit[11] = "on bir";
                $aUnit[12] = "on iki";
                $aUnit[13] = "on uç";
                $aUnit[14] = "on dört";
                $aUnit[15] = "on beş";
                $aUnit[16] = "on altı";
                $aUnit[17] = "on yedi";
                $aUnit[18] = "on sekiz";
                $aUnit[19] = "on dokuz";
                $aUnit[20] = "yirmi";

                $aTen[0] = "";
                $aTen[1] = "on";
                $aTen[2] = "yirmi";
                $aTen[3] = "otuz";
                $aTen[4] = "kırk";
                $aTen[5] = "elli";
                $aTen[6] = "altmış";
                $aTen[7] = "yetmiş";
                $aTen[8] = "seksen";
                $aTen[9] = "doksan";

                $aHundred[0] = "";
                $aHundred[1] = "yüz";
                $aHundred[2] = "iki yüz";
                $aHundred[3] = "üç yüz";
                $aHundred[4] = "dört yüz";
                $aHundred[5] = "beş yüz";
                $aHundred[6] = "altı yüz";
                $aHundred[7] = "yedi yüz";
                $aHundred[8] = "sekiz yüz";
                $aHundred[9] = "dokuz yüz";

                $aId[0] = "";
                $aId[1] = "milyar";
                $aId[2] = "milyar";
                $aId[3] = "milyon";
                $aId[4] = "milyon";
                $aId[5] = "bin";
                $aId[6] = "bin";

                break;

            case "Persian" :
                $aUnit[0] = "صفر";
                $aUnit[1] = "یک";
                $aUnit[2] = "دو";
                $aUnit[3] = "سه";
                $aUnit[4] = "چهار";
                $aUnit[5] = "پنج";
                $aUnit[6] = "شش";
                $aUnit[7] = "هفت";
                $aUnit[8] = "هشت";
                $aUnit[9] = "نه";
                $aUnit[10] = "ده";
                $aUnit[11] = "یازده";
                $aUnit[12] = "دوازده";
                $aUnit[13] = "سیزده";
                $aUnit[14] = "چهارده";
                $aUnit[15] = "پانزده";
                $aUnit[16] = "شانزده";
                $aUnit[17] = "هفده";
                $aUnit[18] = "هجده";
                $aUnit[19] = "نوزده";
                $aUnit[20] = "بیست";

                $aTen[0] = "";
                $aTen[1] = "ده";
                $aTen[2] = "بیست";
                $aTen[3] = "سی";
                $aTen[4] = "چهل";
                $aTen[5] = "پنجاه";
                $aTen[6] = "شصت";
                $aTen[7] = "هفتاد";
                $aTen[8] = "هشتاد";
                $aTen[9] = "نود";

                $aHundred[0] = "";
                $aHundred[1] = "صد";
                $aHundred[2] = "دویست";
                $aHundred[3] = "سیصد";
                $aHundred[4] = "چهارصد";
                $aHundred[5] = "پانصد";
                $aHundred[6] = "ششصد";
                $aHundred[7] = "هفتصد";
                $aHundred[8] = "هشتضد";
                $aHundred[9] = "نهصد";

                $aId[0] = "و";
                $aId[1] = "میلیارد";
                $aId[2] = "میلیارد";
                $aId[3] = "میلیون";
                $aId[4] = "میلیون";
                $aId[5] = "هزار";
                $aId[6] = "هزار";

                break;

            case "Korean" :
                $aUnit[0] = "";
                $aUnit[1] = "일";
                $aUnit[2] = "이";
                $aUnit[3] = "삼";
                $aUnit[4] = "사";
                $aUnit[5] = "오";
                $aUnit[6] = "육";
                $aUnit[7] = "칠";
                $aUnit[8] = "팔";
                $aUnit[9] = "구";
                $aUnit[10] = "십";
                $aUnit[11] = "십일";
                $aUnit[12] = "십이";
                $aUnit[13] = "십삼";
                $aUnit[14] = "십사";
                $aUnit[15] = "십오";
                $aUnit[16] = "십육";
                $aUnit[17] = "십칠";
                $aUnit[18] = "십팔";
                $aUnit[19] = "십구";
                $aUnit[20] = "이십";

                $aTen[0] = "";
                $aTen[1] = "십";
                $aTen[2] = "이십";
                $aTen[3] = "삼십";
                $aTen[4] = "사십";
                $aTen[5] = "오십";
                $aTen[6] = "육십";
                $aTen[7] = "칠십";
                $aTen[8] = "팔십";
                $aTen[9] = "구십";

                $aHundred[0] = "";
                $aHundred[1] = "백";
                $aHundred[2] = "이백";
                $aHundred[3] = "삼백";
                $aHundred[4] = "사백";
                $aHundred[5] = "오백";
                $aHundred[6] = "육백";
                $aHundred[7] = "칠백";
                $aHundred[8] = "팔백";
                $aHundred[9] = "구백";

                $aId[0] = "";
                $aId[1] = "억"; // 100 miliion
                $aId[2] = "억";// 100 miliion
                $aId[3] = "만";// ten thousand
                $aId[4] = "만";  // ten thousand
                $aId[5] = "천";// one thousand
                $aId[6] = "천"; // one thousand

                break;

            case "Chinese_Simplified" :
                
                $aUnit[0] = "零";
                $aUnit[1] = "一";
                $aUnit[2] = "二";  // 两 ==> two of
                $aUnit[3] = "三";
                $aUnit[4] = "四";
                $aUnit[5] = "五";
                $aUnit[6] = "六";    
                $aUnit[7] = "七";
                $aUnit[8] = "八";
                $aUnit[9] = "九";
                $aUnit[10] = "十";
                
                $aTen[0] = "";
                $aTen[1] = "十";

                $aHundred[0] = "";
                $aHundred[1] = "百";
    
                $aId[0] = "";
                $aId[1] = "千"; // one thousand
                 
                break;

            case "Chinese_Traditional" :
                $aUnit[0] = "零";
                $aUnit[1] = "壹";
                $aUnit[2] = "貳";
                $aUnit[3] = "參";
                $aUnit[4] = "肆";
                $aUnit[5] = "伍";
                $aUnit[6] = "陸";
                $aUnit[7] = "柒";
                $aUnit[8] = "捌";
                $aUnit[9] = "玖";
                $aUnit[10] = "拾";
                $aUnit[11] = "";
                $aUnit[12] = "";
                $aUnit[13] = "";
                $aUnit[14] = "";
                $aUnit[15] = "";
                $aUnit[16] = "";
                $aUnit[17] = "";
                $aUnit[18] = "";
                $aUnit[19] = "";
                $aUnit[20] = "";

                $aTen[0] = "";
                $aTen[1] = "拾";
                $aTen[2] = "";
                $aTen[3] = "";
                $aTen[4] = "";
                $aTen[5] = "";
                $aTen[6] = "";
                $aTen[7] = "";
                $aTen[8] = "";
                $aTen[9] = "";

                $aHundred[0] = "";
                $aHundred[1] = "佰";
                $aHundred[2] = "";
                $aHundred[3] = "";
                $aHundred[4] = "";
                $aHundred[5] = "";
                $aHundred[6] = "";
                $aHundred[7] = "";
                $aHundred[8] = "";
                $aHundred[9] = "";


                $aId[0] = "";
                $aId[1] = "億"; // 100 miliion
                $aId[2] = "億"; // 100 miliion
                $aId[3] = "萬"; // ten thousand
                $aId[4] = "萬"; // ten thousand
                $aId[5] = "仟"; // one thousand
                $aId[6] = "仟"; // one thousand

                break;

            default :
                //	break;
                // nothing to do
        }
    }
}

?>