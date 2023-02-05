<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
ini_set('error_reporting', E_ALL);


class Languages
{
    const ARABIC = 'AR';
    const ENGLISH = 'EN';
    const FRENCH = 'FR';
    const GERMAN = 'DE';
    const ITALIN = 'IT';
    const SPANISH = 'ES';
    const PORTUGUESE = 'PT';
    const RUSSIAN = 'RU';
    const TURKISH = 'TR';
    const PERSIAN = 'FA';
    const KOREAN = 'KO';
    const CHINESE_SIMPLIFIED = 'ZH_CN';
    const CHINESE_TRADITIONAL = 'ZH_TW';


    public static function check_latin($_lang)
    {
        if ($_lang != self::ARABIC
            & $_lang != self::RUSSIAN
            & $_lang != self::PORTUGUESE
            & $_lang != self::SPANISH
            & $_lang != self::TURKISH
            & $_lang != self::PERSIAN
            & $_lang != self::KOREAN
            & $_lang != self::CHINESE_SIMPLIFIED
            & $_lang != self::CHINESE_TRADITIONAL) {
            return true;
        } else {
            return false;
        }
    }

}


class Country_ID
{

    const ALGERIA = 'DZA'; // DZ
    const BAHRAIN = 'BHR'; // BH
    const COMORES = 'COM'; // KM
    const DJIBOUTI = 'DJI'; // DJ
    const EGYPT = 'EGY'; // EG
    const IRAQ = 'IRQ';  // IQ
    const JORDAN = 'JOR'; // JO
    const KUWAIT = 'KWT'; // KW
    const LEBANON = 'LBN'; // LB
    const lIBYA = 'LBY'; // LY
    const MAURITANIA = 'MRT'; // MR
    const MOROCCO = 'MAR'; // MA
    const OMAN = 'OMN'; // OM
    const PALESTINE = 'PSE'; // PS
    const QATAR = 'QAT'; // QA
    const SAUDI_ARABIA = 'SAU'; // SA
    const SOMALIA = 'SOM'; // SO
    const SUDAN = 'SDN'; // SD
    const SYRIA = 'SYR'; // SY
    const TUNISIA = 'TUN'; // TN
    const UNITED_ARAB_EMIRATES = 'ARE'; // ARE
    const YEMEN = 'YEM'; // YE
    const UNITED_STATES = 'USA'; // US
    const EUROPEAN_UNION = 'EUR'; // EU
    const UNITED_KINGDOM = 'GBR'; // GB


}

class Locality
{

    public static function getLocale($locale)
    {

        $aCurrencies = array();
        switch ($locale) {

            case Country_ID::UNITED_STATES :
                $aCurrencies[0] = "dollar";
                $aCurrencies[1] = "dollars";
                $aCurrencies[2] = "cent";
                $aCurrencies[3] = "cents";
                $aCurrencies[4] = "dollars";
                $aCurrencies[5] = "cents";
                break;

            case Country_ID::EUROPEAN_UNION :
                $aCurrencies[0] = "euro";
                $aCurrencies[1] = "euros";
                $aCurrencies[2] = "cent";
                $aCurrencies[3] = "cents";
                $aCurrencies[4] = "euros";
                $aCurrencies[5] = "cents";
                break;

            case Country_ID::UNITED_KINGDOM :
                $aCurrencies[0] = "pound";
                $aCurrencies[1] = "pounds";
                $aCurrencies[2] = "pence";
                $aCurrencies[3] = "pences";
                $aCurrencies[4] = "pounds";
                $aCurrencies[5] = "pences";
                break;

            case Country_ID::BAHRAIN :
            case Country_ID::JORDAN :
            case Country_ID::KUWAIT :
            case Country_ID::IRAQ :
                // دينار - فلس
                $aCurrencies[0] = "دينار";
                $aCurrencies[1] = "دنانير";
                $aCurrencies[2] = "فلس";
                $aCurrencies[3] = "فلس";
                $aCurrencies[4] = "ديناران";
                $aCurrencies[5] = "فلس";
                break;

            case Country_ID::EGYPT :
            case Country_ID::SUDAN :
            case Country_ID::PALESTINE :
                //جنيه - قرش
                $aCurrencies[0] = "جنيه";
                $aCurrencies[1] = "جنيهات";
                $aCurrencies[2] = "قرش";
                $aCurrencies[3] = "قروش";
                $aCurrencies[4] = "جنيهان";
                $aCurrencies[5] = "قرشان";
                break;

            case Country_ID::SYRIA :
            case Country_ID::LEBANON :
                // ليرة - قرش
                $aCurrencies[0] = "ليرة";
                $aCurrencies[1] = "ليرات";
                $aCurrencies[2] = "قرش";
                $aCurrencies[3] = "قروش";
                $aCurrencies[4] = "ليراتان";
                $aCurrencies[5] = "قرشان";
                break;

            case Country_ID::DJIBOUTI :
            case Country_ID::COMORES :
                // فرنك - سنتيم
                $aCurrencies[0] = "فرنك";
                $aCurrencies[1] = "فرنك";
                $aCurrencies[2] = "فرنك";
                $aCurrencies[3] = "سنتيم";
                $aCurrencies[4] = "سنتيم";
                $aCurrencies[5] = "سنتيم";
                break;


            /////////////////////////////// ريال
            case Country_ID::SAUDI_ARABIA :
                $aCurrencies[0] = "ريال";
                $aCurrencies[1] = "ريالات";
                $aCurrencies[2] = "هللة";
                $aCurrencies[3] = "هللة";
                $aCurrencies[4] = "ريالان";
                $aCurrencies[5] = "هللة";
                break;

            case Country_ID::OMAN :
                $aCurrencies[0] = "ريال";
                $aCurrencies[1] = "ريالات";
                $aCurrencies[2] = "بيسة";
                $aCurrencies[3] = "بيسة";
                $aCurrencies[4] = "ريالان";
                $aCurrencies[5] = "بيسة";
                break;

            case Country_ID::QATAR :
                $aCurrencies[0] = "ريال";
                $aCurrencies[1] = "ريالات";
                $aCurrencies[2] = "درهم";
                $aCurrencies[3] = "دراهم";
                $aCurrencies[4] = "ريالان";
                $aCurrencies[5] = "درهمان";
                break;

            case Country_ID::YEMEN :
                $aCurrencies[0] = "ريال";
                $aCurrencies[1] = "ريالات";
                $aCurrencies[2] = "فلس";
                $aCurrencies[3] = "فلس";
                $aCurrencies[4] = "ريالان";
                $aCurrencies[5] = "فلس";
                break;


            /////////////////////////////// دينار
            case Country_ID::TUNISIA :
                $aCurrencies[0] = "دينار";
                $aCurrencies[1] = "دنانير";
                $aCurrencies[2] = "مليم";
                $aCurrencies[3] = "مليم";
                $aCurrencies[4] = "ديناران";
                $aCurrencies[5] = "مليم";
                break;

            case Country_ID::ALGERIA :
                $aCurrencies[0] = "دينار";
                $aCurrencies[1] = "دنانير";
                $aCurrencies[2] = "سنتيم";
                $aCurrencies[3] = "سنتيم";
                $aCurrencies[4] = "ديناران";
                $aCurrencies[5] = "سنتيم";
                break;

            case Country_ID::lIBYA :
                $aCurrencies[0] = "دينار";
                $aCurrencies[1] = "دنانير";
                $aCurrencies[2] = "درهم";
                $aCurrencies[3] = "دراهم";
                $aCurrencies[4] = "ديناران";
                $aCurrencies[5] = "درهمان";
                break;


            case Country_ID::UNITED_ARAB_EMIRATES :
                ////////////////////////////////  درهم
                $aCurrencies[0] = "درهم";
                $aCurrencies[1] = "دراهم";
                $aCurrencies[2] = "فلس";
                $aCurrencies[3] = "فلس";
                $aCurrencies[4] = "درهمان";
                $aCurrencies[5] = "فلس";
                break;

            case Country_ID::MOROCCO :
                ////////////////////////////////  درهم
                $aCurrencies[0] = "درهم";
                $aCurrencies[1] = "دراهم";
                $aCurrencies[2] = "سنتيم";
                $aCurrencies[3] = "سنتيم";
                $aCurrencies[4] = "درهمان";
                $aCurrencies[5] = "سنتيم";
                break;


            case Country_ID::SOMALIA :
                ////////////////////////////////// شلن
                $aCurrencies[0] = "شلن";
                $aCurrencies[1] = "شلنات";
                $aCurrencies[2] = "سنتسيمي";
                $aCurrencies[3] = "سنتسيمي";
                $aCurrencies[4] = "شلنان";
                $aCurrencies[5] = "سنتسيمي";
                break;

            case Country_ID::MAURITANIA :
                ///////////////////////////// أوقية
                $aCurrencies[0] = "أوقية";
                $aCurrencies[1] = "أوقيات";
                $aCurrencies[2] = "خمس";
                $aCurrencies[3] = "خمسات";
                $aCurrencies[4] = "أوقيتان";
                $aCurrencies[5] = "خمسان";
                break;

        }

        return $aCurrencies;
    }


    // This function assign currency name to each currency and units in single and plural cases.
    // For example one dollar, two euro, five cents.
    public static function setCurrency($currency, $units)
    {

        if (is_array($currency)) {

            if (count($currency) == 2) {
                $aCurrencies [0] = $currency[0]; // single of currency جنيه
                $aCurrencies [1] = $currency[1]; // plural of currency جنيهات
                $aCurrencies [4] = $currency[1]; // plural of currency جنيهات
                $aCurrencies [2] = $units[0]; // single unit قرش
                $aCurrencies [3] = $units[1]; // plural of units قروش
                $aCurrencies [5] = $units[1]; // plural of units قروش

            } else if (count($currency) == 3) {
                $aCurrencies [0] = $currency[0]; // single of currency جنيه
                $aCurrencies [1] = $currency[1]; // plural of currency جنيهات
                $aCurrencies [4] = $currency[2]; // two of currency جنيهان
                $aCurrencies [2] = $units[0]; // single unit قرش
                $aCurrencies [3] = $units[1]; // plural of units قروش
                $aCurrencies [5] = $units[2]; // two of units قرشان
            }
        } else if (!is_array($currency)) {
            $aCurrencies [0] = $currency; // single of currency جنيه
            $aCurrencies [1] = $currency; // plural of currency جنيهات
            $aCurrencies [4] = $currency; // two currency جنيهان
            $aCurrencies [2] = $units; // single unit قرش
            $aCurrencies [3] = $units; // plural of units قروش
            $aCurrencies [5] = $units; // two unit قرشان
        }

        return $aCurrencies;


    }

}


?>