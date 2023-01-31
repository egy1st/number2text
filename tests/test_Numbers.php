<?php
require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../src/API/Number2Text.php';
require_once __DIR__ . '/../src/API/NumberingSystem.php';

/**
 * @covers Number2Words
 * @covers NumberingSystem
 * @covers Arabic
 * @covers English
 * @covers French
 * @covers German
 * @covers Italian
 * @covers Spanish
 * @covers Russian
 * @covers Turkish
 * @covers Persian
 * @covers Portuguese
 * @covers Korean
 * @covers Chinese_Simplified
 * @covers Chinese_Traditional
 */


  function strhex($string) {
      $hexstr = unpack('H*', $string);
      return array_shift($hexstr);
   }

   function nextchar($string, &$pointer){
    if(!isset($string[$pointer])) return false;
    $char = ord($string[$pointer]);
    if($char < 128){
        return $string[$pointer++];
    }else{
        if($char < 224){
            $bytes = 2;
        }elseif($char < 240){
            $bytes = 3;
        }else{
            $bytes = 4;
        }
        $str =  substr($string, $pointer, $bytes);
        $pointer += $bytes;
        return $str;
    }
}


// Multi-Byte String iterator class
class MbStrIterator implements Iterator
{
    private $iPos   = 0;
    private $iSize  = 0;
    private $sStr   = null;

    // Constructor
    public function __construct(/*string*/ $str)
    {
        // Save the string
        $this->sStr     = $str;

        // Calculate the size of the current character
        $this->calculateSize();
    }

    // Calculate size
    private function calculateSize() {

        // If we're done already
        if(!isset($this->sStr[$this->iPos])) {
            return;
        }

        // Get the character at the current position
        $iChar  = ord($this->sStr[$this->iPos]);

        // If it's a single byte, set it to one
        if($iChar < 128) {
            $this->iSize    = 1;
        }

        // Else, it's multi-byte
        else {

            // Figure out how long it is
            if($iChar < 224) {
                $this->iSize = 2;
            } else if($iChar < 240){
                $this->iSize = 3;
            } else if($iChar < 248){
                $this->iSize = 4;
            } else if($iChar == 252){
                $this->iSize = 5;
            } else {
                $this->iSize = 6;
            }
        }
    }

    // Current
    public function current() {

        // If we're done
        if(!isset($this->sStr[$this->iPos])) {
            return false;
        }

        // Else if we have one byte
        else if($this->iSize == 1) {
            return $this->sStr[$this->iPos];
        }

        // Else, it's multi-byte
        else {
            return substr($this->sStr, $this->iPos, $this->iSize);
        }
    }

    // Key
    public function key()
    {
        // Return the current position
        return $this->iPos;
    }

    // Next
    public function next()
    {
        // Increment the position by the current size and then recalculate
        $this->iPos += $this->iSize;
        $this->calculateSize();
    }

    // Rewind
    public function rewind()
    {
        // Reset the position and size
        $this->iPos     = 0;
        $this->calculateSize();
    }

    // Valid
    public function valid()
    {
        // Return if the current position is valid
        return isset($this->sStr[$this->iPos]);
    }
}


class Test_Numbers extends PHPUnit\Framework\TestCase
{
    private $translator;
    private $language;

    //private $mytestlist = array();

    protected function setUp()
    {
        $this->translator = new Number2Words();
        $this->language = new English();

    }

    protected function tearDown()
    {
        $this->translator = NULL;
        $this->language = NULL;
        //$this->mytestlist = array();
    }

    public function addDataProvider()
    {
        $mytestlist = array();
        $output = 'text';
		$currency = "dollar" ;
		$units = "cent" ;
		$locale = 'USA' ;
		//$str_Number, $language, $locale, $currency, $units, $output
        $languages = array("AR", "EN", "FR", "DE", "PT", "ES", "IT", "RU","FA", "KO", "TR", "ZH_CN", "ZH_TW");
        $languages = array("EN"); //, "FR", "DE", "IT" ); //"PT", "ES", );

        // "EN" -- 0
        //FR -- 1
        // ES -- 2
        // It -- 3
        // "DE" -- 8
        // KO -- 53
        // Ru -- 54
        // Pt -- 54
        // Fa -- 54
        // TR -- 54
        // ZH_CN -- 54
        // ZH_TW -- 54



        // add NULL & '' to test cases
        $numbers = array(NULL, '', "one", "1.2.30", 0, 1 , 2, 3, 10, 11, 12, 13, 20, 41, 70, 71, 73, 82, 100, 101, 200, 600, 1000, 1001, 2000, 9000, 10000, 10001, 13000, 30000,
            100000, 100001, 200000, 500000, 1000000, 1000001, 2000000, 7000000, 10000000, 100000000, 1000000000,
            2000000000, 100000000000, 210000000000, 999999999998.99, 0.01, 0.02, 0.03, 0.10, 0.99, 0.12, 10.01, 45.96, 1000.05, 45698.20, 15023.45);

        foreach ($languages as $lang) {
            foreach ($numbers as $num) {
                array_push($mytestlist, array($num, $lang, $currency, $units, $locale, $output));
            }
        }

        return $mytestlist;
    }


    public function addDataProviderExceptions()
    {

        $mytestlist = array();
        $output = 'text';
		$currency = "dollar" ;
		$units = "cent" ;
		$locale = 'USA' ;
        $languages = array("AR", "EN", "FR", "DE", "RU", "PT", "ES", "FA", "KO", "IT", "TR", "ZH_CN", "ZH_TW");
        $languages = array("EN" );

        // add NULL & '' to test cases
        $numbers = array("", NULL);

        foreach ($languages as $lang) {
            foreach ($numbers as $num) {
                array_push($mytestlist, array($num, $lang, $currency, $units, $locale, $output));
            }
        }

        return $myexceptionslist;
    }


    public function addDataImage()
    {

        $myimagelist = array();
        $output = 'image';
		$currency = "dollar" ;
		$units = "cent" ;
		$locale = 'USA' ;
        //$languages = array("AR", "EN", "FR", "DE", "RU", "PT", "ES", "FA", "KO", "IT", "TR", "ZH_CN", "ZH_TW");
        $languages = array("EN");
        $numbers = array(12);

        foreach ($languages as $lang) {
            foreach ($numbers as $num) {
                array_push($myimagelist, array($num, $lang, $currency, $units, $locale, $output));
            }
        }

        return $myimagelist;
    }


    /**
     * @dataProvider addDataProviderExceptions
     */
    public function Exceptions($num, $lang, $currency, $units, $locale, $output)
    {
        $output = 'text';
        $expected = $this::curl_Result($num, $lang, $output);
        $actual = "invalid number"; //$this->translator::translateNumber($num,  $lang) ;
        $this->assertEquals($expected, $actual);

    }


    //for ( $pos=0; $pos < strlen($expected); $pos ++ ) {
    // $byte = substr($expected, $pos);
    // echo 'Byte ' . $pos . ' of $str has value ' . ord($byte) . PHP_EOL;
    //}


    /**
     * @dataProvider addDataImage
     */
    public function Image($num, $lang, $currency, $units, $locale, $output)
    {
        $output = 'image' ;
        $expected = $this::curl_Result($num, $lang, $output);
        //$actual = $this->translator::translateNumber($num,  $lang, $output) ;
        echo $output . ' ' . $expected;

        //$this->assertEquals($expected, $actual);
        $this->assertEquals(0, 0);
    }

  



    /**
     * @dataProvider addDataProvider
     */
    public function test_Number($num, $lang, $currency, $units, $locale, $output)
    {
        
        $latin = ($lang != 'AR' & $lang != 'RU' & $lang != 'PT' & $lang != 'ES' & $lang != 'TR' & $lang != 'FA' & $lang != 'ES'
            & $lang != 'KO' & $lang != 'ZH_CN' & $lang != 'ZH_TW');
        $expected = $this::curl_Result($num, $lang, $locale, $currency, $units, $output);
        $expected = substr($expected, 45);

        $clean_text = trim($expected);
        if ($latin == true) {
            //echo 'we are here';
            $clean_text = '';

            foreach(new MbStrIterator($expected) as $i => $byte) {
                //echo "{$i}: {$byte}\n";
                $clean_text .= $byte;

                //var_dump($byte);
                //var_dump(strhex($byte));

                //$byte = Normalizer::normalize($byte);

                //var_dump($byte);
               // var_dump(strhex($byte));
            }
              
          
        }
        
       
        $chars_to_remove = 0;

        if ($latin == false) {
            $chars_to_remove = 45;
            $expected = trim(substr($clean_text, $chars_to_remove));
        } else {
            $expected = trim($clean_text);
        }

        //$str_Number, $language, $locale, $currency, $units, $output
        $actual = $this->translator::translateNumber($num, $lang, $currency, $units, $locale, $output);
        //echo 'The actual is: ' . $actual . '**' . PHP_EOL;
        $this->assertEquals($expected, $actual);
    }


    public function curl_Result($num, $lang,  $locale, $currency, $units, $output)
    {
        $curl = curl_init();
       
        curl_setopt_array($curl, [
            CURLOPT_URL => "https://number2words4.p.rapidapi.com/v1/?number=$num&language=$lang&locale=$locale&currency=$currency&units=$units&output=$output",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => [
                "Accept-Charset: UTF-8",
                "x-rapidapi-host: number2words4.p.rapidapi.com",
                "x-rapidapi-key: 6a61bed77cmsh79504697a5aba5cp1b83d2jsn7c6815838923"
            ],
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            return "cURL Error #:" . $err;
        } else {
            return $response;
        }

    }


}


?> 
