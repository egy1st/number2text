Friend Class NumberingSystem

    Public Shared CurrncyDefined As Boolean
    Public Shared SignDefined As Boolean = False
    Public Shared AbvDefined As Boolean = False
    Public Shared H(11) As String
    Public Shared N(17) As String
    Public Shared Z(11) As String
    Public Shared R(31) As String
    Public Shared M(13) As String
    Public Shared Forma As String
    Public Shared G, E, K, x, L, Ln, Ln2, ln3, S As Integer
    Public Shared Num, NewNum As String
    Public Shared id1, id2, id3 As String
    Public Shared n_unit, n_all As Integer
    Public Shared str_unit As String = ""
    Public Shared n_sum As Integer
    Public Function getSum(ByRef N() As String, ByVal _step As Integer) As Integer

        Dim sum As Integer

        If _step = 1 Then
            sum = Val(N(12)) + (Val(N(11)) * 10) + (Val(N(10)) * 100) + (Val(N(9)) * 1000) + (Val(N(8)) * 10000) + (Val(N(7)) * 100000) + (Val(N(6)) * 1000000) + (Val(N(5)) * 10000000) + (Val(N(4)) * 100000000)
        ElseIf _step = 2 Then
            sum = Val(N(12)) + (Val(N(11)) * 10) + (Val(N(10)) * 100) + (Val(N(9)) * 1000) + (Val(N(8)) * 10000) + (Val(N(7)) * 100000)
        ElseIf _step = 3 Then
            sum = Val(N(12)) + (Val(N(11)) * 10) + (Val(N(10)) * 100)
        End If

        Return sum

    End Function
    Public Shared Function isPattern(ByVal ptrn1 As String, ByVal ptrn2 As String) As Boolean

        Dim n As Integer

        For n = 1 To 16
            If Mid(ptrn2, n, 1) = "d" Then
                If Mid(ptrn1, n, 1) = "0" Then
                    Return False
                End If

            ElseIf Mid(ptrn2, n, 1) <> "x" And Mid(ptrn1, n, 1) <> Mid(ptrn2, n, 1) Then
                Return False
            End If
        Next

        Return True

    End Function
    Public Shared Function removeComma(ByVal str As String) As String
        str = Trim(str)
        Ln = Len(str)
        If Right(str, 1) = "," Then
            str = Left(str, Ln - 1)
        End If
        Return str
    End Function
    Public Shared Function removeAnd(ByVal str As String) As String
        str = Trim(str)
        Ln = Len(str)
        Ln2 = Len(M(0)) + 1
        If Right(str, Ln2) = " " + M(0) Then
            str = Left(str, Ln - Ln2)
            str = Trim(str)
        End If
        Return str
    End Function
    Public Shared Function NoCurrency(ByVal phase As Integer, ByVal ptrn As String) As Boolean
        If phase = 4 Then

            If isPattern(ptrn, "xxxxxxxxx000.xxx") Then
                Return True
            End If

        End If
        Return False
    End Function
    Public Shared Function noKoreanCurrency(ByVal phase As Integer, ByVal ptrn As String) As Boolean
        If phase = 3 Then

            If isPattern(ptrn, "xxxxxxxx0000.xxxx") Then
                Return True
            End If

        End If
        Return False
    End Function
    Public Shared Function removeSpaces(ByVal str As String) As String
        If str = "" Then Return ""

        str = Trim(str)
        Dim newStr As String = Mid(str, 1, 1)

        Ln = Len(str)

        Dim x As Byte
        For x = 2 To Ln
            If Not (Mid(str, x, 1) = " " And Mid(str, x - 1, 1) = " ") Then
                newStr += Mid(str, x, 1)
            End If
        Next
        Return newStr
    End Function
    Public Shared Function checkOneHundred(ByVal L As Integer, ByVal Forma As String) As Boolean


        If L = 4 And isPattern(Forma, "xxxxxxxxx100.xxx") Then
            Return True
        ElseIf L = 3 And isPattern(Forma, "xxxxxx100xxx.xxx") Then
            Return True
        ElseIf L = 2 And isPattern(Forma, "xxx100xxxxxx.xxx") Then
            Return True
        ElseIf L = 1 And isPattern(Forma, "100xxxxxxxxx.xxx") Then
            Num += H(10) + " " + id2 + " "
            Return True
        End If

        Return False
    End Function
    Public Shared Function checkOneThousnad(ByVal L As Integer, ByVal Forma As String) As Boolean

        If L = 3 And isPattern(Forma, "000000001xxx.xxx") Then
            Return True
        End If

        Return False
    End Function


    Public Sub getLanguage(ByRef R() As String, ByRef Z() As String, ByRef H() As String, ByRef M() As String, ByVal Lang As String)
        Select Case Lang
            Case "Arabic"
                R(1) = "واحد "
                R(2) = "إثنين "
                R(3) = "ثلاثة "
                R(4) = "أربعة "
                R(5) = "خمسة "
                R(6) = "ستة "
                R(7) = "سبعة "
                R(8) = "ثمانية "
                R(9) = "تسعة "
                R(11) = "إحدى "
                R(12) = "إثنتا "


                Z(1) = "عشرة "
                Z(2) = "عشرون "
                Z(3) = "ثلاثون "
                Z(4) = "أربعون "
                Z(5) = "خمسون "
                Z(6) = "ستون "
                Z(7) = "سبعون "
                Z(8) = "ثمانون "
                Z(9) = "تسعون "

                H(1) = "مائة "
                H(2) = "مائتين "
                H(3) = "ثلاثمائة "
                H(4) = "أربعمائة "
                H(5) = "خمسمائة "
                H(6) = "ستمائة "
                H(7) = "سبعمائة "
                H(8) = "ثمانمائة "
                H(9) = "تسعمائة "

                M(0) = "و"
                M(1) = " مليار "
                M(2) = " مليارات "
                M(3) = " مليون "
                M(4) = " ملايين "
                M(5) = " ألف "
                M(6) = " آلاف "
                If Not CurrncyDefined Then
                    M(7) = "جنيه"
                    M(8) = "جنيهات"
                    M(9) = "قرش"
                    M(10) = "قروش"
                    M(11) = "جنيهان"
                    M(12) = "قرشان"
                End If


            Case "English"

                R(0) = "zero"
                R(1) = "one"
                R(2) = "two"
                R(3) = "three"
                R(4) = "four"
                R(5) = "five"
                R(6) = "six"
                R(7) = "seven"
                R(8) = "eight"
                R(9) = "nine"
                R(10) = "ten"
                R(11) = "eleven"
                R(12) = "twelve"
                R(13) = "thirteen"
                R(14) = "fourteen"
                R(15) = "fifteen"
                R(16) = "sixteen"
                R(17) = "seventeen"
                R(18) = "eighteen"
                R(19) = "nineteen"
                R(20) = "twenty"

                Z(0) = ""
                Z(1) = "ten"
                Z(2) = "twenty"
                Z(3) = "thirty"
                Z(4) = "forty"
                Z(5) = "fifty"
                Z(6) = "sixty"
                Z(7) = "seventy"
                Z(8) = "eighty"
                Z(9) = "ninety"

                H(0) = ""
                H(1) = "one hundred"
                H(2) = "two hundred"
                H(3) = "three hundred"
                H(4) = "four hundred"
                H(5) = "five hundred"
                H(6) = "six hundred"
                H(7) = "seven hundred"
                H(8) = "eight hundred"
                H(9) = "nine hundred"

                M(0) = "and"
                M(1) = "billion"
                M(2) = "billion"
                M(3) = "million"
                M(4) = "million"
                M(5) = "thousand"
                M(6) = "thousand"

                If Not CurrncyDefined Then
                    M(7) = "dollar"
                    M(8) = "dollars"
                    M(9) = "cent"
                    M(10) = "cent"
                End If

                If SignDefined Then
                    M(7) = ChrW(&H24)
                    M(8) = ChrW(&H24)
                    M(9) = ChrW(&HA2)
                    M(10) = ChrW(&HA2)
                End If

                If AbvDefined Then
                    M(7) = "USD"
                    M(8) = "USD"
                    M(9) = ChrW(&HA2) '"cent"
                    M(10) = ChrW(&HA2) '"cent"
                End If


            Case "French"

                R(0) = "zéro"
                R(1) = "un"
                R(2) = "deux"
                R(3) = "trois"
                R(4) = "quatre"
                R(5) = "cinq"
                R(6) = "six"
                R(7) = "sept"
                R(8) = "huit"
                R(9) = "neuf"
                R(10) = "dix"
                R(11) = "onze"
                R(12) = "douze"
                R(13) = "treize"
                R(14) = "quatorze"
                R(15) = "quinze"
                R(16) = "seize"
                R(17) = "dix-sept"
                R(18) = "dix-huit"
                R(19) = "dix-neuf"
                R(20) = "vingt"

                Z(0) = ""
                Z(1) = "dix"
                Z(2) = "vingt"
                Z(3) = "trente"
                Z(4) = "quarante"
                Z(5) = "cinquante"
                Z(6) = "soixante"
                Z(7) = "soixante-dix"
                Z(8) = "quatre-vingt"
                Z(9) = "quatre-vingt-dix"

                H(0) = ""
                H(1) = "cent"
                H(2) = "deux cent"
                H(3) = "trois cent"
                H(4) = "quatre cent"
                H(5) = "cinq cent"
                H(6) = "six cent"
                H(7) = "sept cent"
                H(8) = "huit cent"
                H(9) = "neuf cent"

                M(0) = "et"
                M(1) = "milliard"
                M(2) = "milliards"
                M(3) = "million"
                M(4) = "millions"
                M(5) = "mille"
                M(6) = "mille"

                If Not CurrncyDefined Then
                    M(7) = "euro"
                    M(8) = "euro"
                    M(9) = "cent"
                    M(10) = "cent"
                End If

                If SignDefined Then
                    M(7) = ChrW(&H20AC)
                    M(8) = ChrW(&H20AC)
                    M(9) = ChrW(&HA2)
                    M(10) = ChrW(&HA2)
                End If

                If AbvDefined Then
                    M(7) = "EUR"
                    M(8) = "EUR"
                    M(9) = ChrW(&HA2)
                    M(10) = ChrW(&HA2)
                End If


            Case "German"

                R(0) = "null"
                R(1) = "ein"
                R(2) = "zwei"
                R(3) = "drei"
                R(4) = "vier"
                R(5) = "fünf"
                R(6) = "sechs"
                R(7) = "sieben"
                R(8) = "acht"
                R(9) = "neun"
                R(10) = "zehn"
                R(11) = "elf"
                R(12) = "zwölf"
                R(13) = "dreizehn"
                R(14) = "vierzehn"
                R(15) = "fünfzehn"
                R(16) = "sechzehn"
                R(17) = "siebzehn"
                R(18) = "achtzehn"
                R(19) = "neunzehn"
                R(20) = "zwanzig"

                Z(0) = ""
                Z(1) = "zehn"
                Z(2) = "zwanzig"
                Z(3) = "dreißig"
                Z(4) = "vierzig"
                Z(5) = "fünfzig"
                Z(6) = "sechzig"
                Z(7) = "siebzig"
                Z(8) = "achtzig"
                Z(9) = "neunzig"

                H(0) = ""
                H(1) = "hundert"
                H(2) = "zweihundert"
                H(3) = "dreihundert"
                H(4) = "vierhundert"
                H(5) = "fünfhundert"
                H(6) = "sechshundert"
                H(7) = "siebenhundert"
                H(8) = "achthundert"
                H(9) = "neunhundert"

                M(0) = "und"
                M(1) = "milliarde"
                M(2) = "milliarden"
                M(3) = "million"
                M(4) = "millionen"
                M(5) = "tausend"
                M(6) = "tausend"

                If Not CurrncyDefined Then
                    M(7) = "euro"
                    M(8) = "euro"
                    M(9) = "cent"
                    M(10) = "cents"
                End If

                If SignDefined Then
                    M(7) = ChrW(&H20AC) '"euro"
                    M(8) = ChrW(&H20AC) '"euro"
                    M(9) = ChrW(&HA2) '"cent"
                    M(10) = ChrW(&HA2) '"cents"
                End If

                If AbvDefined Then
                    M(7) = "EUR"
                    M(8) = "EUR"
                    M(9) = ChrW(&HA2)
                    M(10) = ChrW(&HA2)
                End If

            Case "Spanish"

                R(0) = "cero"
                R(1) = "uno"
                R(2) = "dos"
                R(3) = "tres"
                R(4) = "cuatro"
                R(5) = "cinco"
                R(6) = "seis"
                R(7) = "siete"
                R(8) = "ocho"
                R(9) = "nueve"
                R(10) = "diez"
                R(11) = "once"
                R(12) = "doce"
                R(13) = "trece"
                R(14) = "catorce"
                R(15) = "quince"
                R(16) = "dieciséis"
                R(17) = "diecisiete"
                R(18) = "dieciocho"
                R(19) = "diecinueve"
                R(20) = "veinte"
                R(21) = "veintiuno"
                R(22) = "veintidós"
                R(23) = "veintitrés"
                R(24) = "veinticuatro"
                R(25) = "veinticinco"
                R(26) = "veintiséis"
                R(27) = "veintisiete"
                R(28) = "veintiocho"
                R(29) = "veintinueve"
                R(30) = "treinta"

                Z(0) = ""
                Z(1) = "diez"
                Z(2) = "veinte"
                Z(3) = "treinta"
                Z(4) = "cuarenta"
                Z(5) = "cinquenta"
                Z(6) = "sesenta"
                Z(7) = "setenta"
                Z(8) = "ochenta"
                Z(9) = "noventa"

                H(0) = ""
                H(1) = "ciento"
                H(2) = "doscientos"
                H(3) = "trescientos"
                H(4) = "cuatrocientos"
                H(5) = "quinientos"
                H(6) = "seiscientos"
                H(7) = "setecientos"
                H(8) = "ochocientos"
                H(9) = "novecientos"

                M(0) = "y"
                M(1) = "mil millones"
                M(2) = "mil millones"
                M(3) = "millón"
                M(4) = "millones"
                M(5) = "mil"
                M(6) = "mil"

                If Not CurrncyDefined Then
                    M(7) = "euro"
                    M(8) = "euro"
                    M(9) = "cent"
                    M(10) = "cents"
                End If

                If SignDefined Then
                    M(7) = ChrW(&H20AC) '"euro"
                    M(8) = ChrW(&H20AC) '"euro"
                    M(9) = ChrW(&HA2) '"cent"
                    M(10) = ChrW(&HA2) '"cents"
                End If

                If AbvDefined Then
                    M(7) = "EUR"
                    M(8) = "EUR"
                    M(9) = ChrW(&HA2)
                    M(10) = ChrW(&HA2)
                End If

            Case "Portuguese"
                R(0) = "zero"
                R(1) = "um"
                R(2) = "dois"
                R(3) = "três"
                R(4) = "quatro"
                R(5) = "cinco"
                R(6) = "seis"
                R(7) = "sete"
                R(8) = "oito"
                R(9) = "nove"
                R(10) = "dez"
                R(11) = "onze"
                R(12) = "doze"
                R(13) = "treze"
                R(14) = "catorze"
                R(15) = "quinze"
                R(16) = "dezesseis"
                R(17) = "dezessete"
                R(18) = "dezoito"
                R(19) = "dezenove"
                R(20) = "dez"

                Z(0) = ""
                Z(1) = "dez"
                Z(2) = "vinte"
                Z(3) = "trinta"
                Z(4) = "quarenta"
                Z(5) = "cinquenta"
                Z(6) = "sessenta"
                Z(7) = "setenta"
                Z(8) = "oitenta"
                Z(9) = "noventa"

                H(0) = ""
                H(1) = "cento"
                H(2) = "duzentos"
                H(3) = "trezentos"
                H(4) = "quatrocentos"
                H(5) = "quinhentos"
                H(6) = "seiscentos"
                H(7) = "setecentos"
                H(8) = "oitocentos"
                H(9) = "novecentos"
                H(10) = "cem"

                M(0) = "e"
                M(1) = "mil milhões"
                M(2) = "mil milhões"
                M(3) = "milhão"
                M(4) = "milhões"
                M(5) = "mil"
                M(6) = "mil"

                If Not CurrncyDefined Then
                    M(7) = "euro"
                    M(8) = "euro"
                    M(9) = "cent"
                    M(10) = "cents"
                End If

                If SignDefined Then
                    M(7) = ChrW(&H20AC) '"euro"
                    M(8) = ChrW(&H20AC) '"euro"
                    M(9) = ChrW(&HA2) '"cent"
                    M(10) = ChrW(&HA2) '"cents"
                End If

                If AbvDefined Then
                    M(7) = "EUR"
                    M(8) = "EUR"
                    M(9) = ChrW(&HA2)
                    M(10) = ChrW(&HA2)
                End If


            Case "Italian"
                R(0) = "zero"
                R(1) = "uno"
                R(2) = "due"
                R(3) = "tre"
                R(4) = "quattro"
                R(5) = "cinque"
                R(6) = "sei"
                R(7) = "sette"
                R(8) = "otto"
                R(9) = "nove"
                R(10) = "dieci"
                R(11) = "undici"
                R(12) = "dodici"
                R(13) = "tredici"
                R(14) = "quattordici"
                R(15) = "quindici"
                R(16) = "sedici"
                R(17) = "diciassette"
                R(18) = "diciotto"
                R(19) = "diciannove"
                R(20) = "venti"

                Z(0) = ""
                Z(1) = "dieci"
                Z(2) = "venti"
                Z(3) = "trenta"
                Z(4) = "quaranta"
                Z(5) = "cinquanta"
                Z(6) = "sessanta"
                Z(7) = "settanta"
                Z(8) = "ottanta"
                Z(9) = "novanta"

                H(0) = ""
                H(1) = "cento"
                H(2) = "duecento"
                H(3) = "trecento"
                H(4) = "quattrocento"
                H(5) = "cinquecento"
                H(6) = "seicento"
                H(7) = "settecento"
                H(8) = "ottocento"
                H(9) = "novecento"

                M(0) = ""
                M(1) = "miliardo"
                M(2) = "miliardi"
                M(3) = "milione"
                M(4) = "milioni"
                M(5) = "mille"
                M(6) = "mila"

                If Not CurrncyDefined Then
                    M(7) = "euro"
                    M(8) = "euro"
                    M(9) = "cent"
                    M(10) = "cents"
                End If

                If SignDefined Then
                    M(7) = ChrW(&H20AC) '"euro"
                    M(8) = ChrW(&H20AC) '"euro"
                    M(9) = ChrW(&HA2) '"cent"
                    M(10) = ChrW(&HA2) '"cents"
                End If

                If AbvDefined Then
                    M(7) = "EUR"
                    M(8) = "EUR"
                    M(9) = ChrW(&HA2)
                    M(10) = ChrW(&HA2)
                End If


            Case "Russian"
                R(0) = "ноль"
                R(1) = "один"
                R(2) = "два"
                R(3) = "три"
                R(4) = "четыре"
                R(5) = "пять"
                R(6) = "шесть"
                R(7) = "семь"
                R(8) = "восемь"
                R(9) = "девять"
                R(10) = "десять"
                R(11) = "одиннадцать"
                R(12) = "двенадцать"
                R(13) = "тринадцать"
                R(14) = "четырнадцать"
                R(15) = "пятнадцать"
                R(16) = "шестнадцать"
                R(17) = "семнадцать"
                R(18) = "восемнадцать"
                R(19) = "девятнадцать"
                R(20) = "двадцать"

                Z(0) = ""
                Z(1) = "десять"
                Z(2) = "двадцать"
                Z(3) = "тридцать"
                Z(4) = "сорок"
                Z(5) = "пятьдесят"
                Z(6) = "шестьдесят"
                Z(7) = "семьдесят"
                Z(8) = "восемьдесят"
                Z(9) = "девяносто"

                H(0) = ""
                H(1) = "сто"
                H(2) = "двести"
                H(3) = "триста"
                H(4) = "четыреста"
                H(5) = "пятьсот"
                H(6) = "шестьсот"
                H(7) = "семьсот"
                H(8) = "восемьсот"
                H(9) = "девятьсот"

                M(0) = ""
                M(1) = "миллиард"
                M(2) = "миллиарды"
                M(3) = "миллион"
                M(4) = "миллионов"
                M(5) = "тысяча"
                M(6) = "тысяч"


                If Not CurrncyDefined Then
                    M(7) = "Рубль"
                    M(8) = "рублей"
                    M(9) = "копейка"
                    M(10) = "копеек"
                End If

                If SignDefined Then
                    M(7) = ChrW(&H440) + ChrW(&H443) + ChrW(&H431)
                    M(8) = ChrW(&H440) + ChrW(&H443) + ChrW(&H431)
                    M(9) = "к"
                    M(10) = "к"
                End If

                If AbvDefined Then
                    M(7) = "RUB"
                    M(8) = "RUB"
                    M(9) = "к"
                    M(10) = "к"
                End If


            Case "Turkish"
                R(0) = "sıfır"
                R(1) = "bir"
                R(2) = "iki"
                R(3) = "üç"
                R(4) = "dört"
                R(5) = "beş"
                R(6) = "altı"
                R(7) = "yedi"
                R(8) = "sekiz"
                R(9) = "dokuz"
                R(10) = "yirmi"
                R(11) = "on bir"
                R(12) = "on iki"
                R(13) = "on uç"
                R(14) = "on dört"
                R(15) = "on beş"
                R(16) = "on altı"
                R(17) = "on yedi"
                R(18) = "on sekiz"
                R(19) = "on dokuz"
                R(20) = "yirmi"

                Z(0) = ""
                Z(1) = "on"
                Z(2) = "yirmi"
                Z(3) = "otuz"
                Z(4) = "kırk"
                Z(5) = "elli"
                Z(6) = "altmış"
                Z(7) = "yetmiş"
                Z(8) = "seksen"
                Z(9) = "doksan"

                H(0) = ""
                H(1) = "yüz"
                H(2) = "iki yüz"
                H(3) = "üç yüz"
                H(4) = "dört yüz"
                H(5) = "beş yüz"
                H(6) = "altı yüz"
                H(7) = "yedi yüz"
                H(8) = "sekiz yüz"
                H(9) = "dokuz yüz"


                M(0) = ""
                M(1) = "milyar"
                M(2) = "milyar"
                M(3) = "milyon"
                M(4) = "milyon"
                M(5) = "bin"
                M(6) = "bin"
                If Not CurrncyDefined Then
                    M(7) = "lira"
                    M(8) = "lira"
                    M(9) = "kuruş"
                    M(10) = "kuruş"
                End If

                If SignDefined Then
                    M(7) = ChrW(&H20A4)
                    M(8) = ChrW(&H20A4)
                    M(9) = "Kr"
                    M(10) = "Kr"
                End If

                If AbvDefined Then
                    M(7) = "TRY"
                    M(8) = "TRY"
                    M(9) = "Kr"
                    M(10) = "Kr"
                End If

            Case "Persian"
                R(0) = "صفر"
                R(1) = "یک"
                R(2) = "دو"
                R(3) = "سه"
                R(4) = "چهار"
                R(5) = "پنج"
                R(6) = "شش"
                R(7) = "هفت"
                R(8) = "هشت"
                R(9) = "نه"
                R(10) = "ده"
                R(11) = "یازده"
                R(12) = "دوازده"
                R(13) = "سیزده"
                R(14) = "چهارده"
                R(15) = "پانزده"
                R(16) = "شانزده"
                R(17) = "هفده"
                R(18) = "هجده"
                R(19) = "نوزده"
                R(20) = "بیست"

                Z(0) = ""
                Z(1) = "ده"
                Z(2) = "بیست"
                Z(3) = "سی"
                Z(4) = "چهل"
                Z(5) = "پنجاه"
                Z(6) = "شصت"
                Z(7) = "هفتاد"
                Z(8) = "هشتاد"
                Z(9) = "نود"

                H(0) = ""
                H(1) = "صد"
                H(2) = "دویست"
                H(3) = "سیصد"
                H(4) = "چهارصد"
                H(5) = "پانصد"
                H(6) = "ششصد"
                H(7) = "هفتصد"
                H(8) = "هشتضد"
                H(9) = "نهصد"

                M(0) = "و"
                M(1) = "میلیارد"
                M(2) = "میلیارد"
                M(3) = "میلیون"
                M(4) = "میلیون"
                M(5) = "هزار"
                M(6) = "هزار"

                If Not CurrncyDefined Then
                    M(7) = "ريال"
                    M(8) = "ريال"
                    M(9) = "دینار"
                    M(10) = "دینار"
                End If

                If SignDefined Then
                    M(7) = "ريال"
                    M(8) = "ريال"
                    M(9) = "دینار"
                    M(10) = "دینار"
                End If

                If AbvDefined Then
                    M(7) = "IRR"
                    M(8) = "IRR"
                    M(9) = "دینار"
                    M(10) = "دینار"
                End If


            Case "Korean"
                R(0) = ""
                R(1) = "일"
                R(2) = "이"
                R(3) = "삼"
                R(4) = "사"
                R(5) = "오"
                R(6) = "육"
                R(7) = "칠"
                R(8) = "팔"
                R(9) = "구"
                R(10) = "십"
                R(11) = "십일"
                R(12) = "십이"
                R(13) = "십삼"
                R(14) = "십사"
                R(15) = "십오"
                R(16) = "십육"
                R(17) = "십칠"
                R(18) = "십팔"
                R(19) = "십구"
                R(20) = "이십"

                Z(0) = ""
                Z(1) = "십"
                Z(2) = "이십"
                Z(3) = "삼십"
                Z(4) = "사십"
                Z(5) = "오십"
                Z(6) = "육십"
                Z(7) = "칠십"
                Z(8) = "팔십"
                Z(9) = "구십"

                H(0) = ""
                H(1) = "백"
                H(2) = "이백"
                H(3) = "삼백"
                H(4) = "사백"
                H(5) = "오백"
                H(6) = "육백"
                H(7) = "칠백"
                H(8) = "팔백"
                H(9) = "구백"

                M(0) = ""
                M(1) = "억" ' 100 miliion
                M(2) = "억" ' 100 miliion
                M(3) = "만" ' ten thousand
                M(4) = "만" ' ten thousand
                M(5) = "천" ' one thousand
                M(6) = "천" ' one thousand

                If Not CurrncyDefined Then
                    M(7) = "원"
                    M(8) = "원"
                    M(9) = ""
                    M(10) = ""
                End If

                If SignDefined Then
                    M(7) = ChrW(&H20A9)
                    M(8) = ChrW(&H20A9)
                    M(9) = ""
                    M(10) = ""
                End If

                If AbvDefined Then
                    M(7) = "KRW"
                    M(8) = "KRW"
                    M(9) = ""
                    M(10) = ""
                End If


            Case "Chinese_Formal_Simplified"
                R(0) = "零"
                R(1) = "壹"
                R(2) = "贰"
                R(3) = "叁"
                R(4) = "肆"
                R(5) = "伍"
                R(6) = "陆"
                R(7) = "柒"
                R(8) = "捌"
                R(9) = "玖"
                R(10) = "拾"

                Z(0) = ""
                Z(1) = "拾"
                Z(2) = ""
                Z(3) = ""
                Z(4) = ""
                Z(5) = ""
                Z(6) = ""
                Z(7) = ""
                Z(8) = ""
                Z(9) = ""

                H(0) = ""
                H(1) = "佰"
                H(2) = ""
                H(3) = ""
                H(4) = ""
                H(5) = ""
                H(6) = ""
                H(7) = ""
                H(8) = ""
                H(9) = ""


                M(0) = ""
                M(1) = "亿" ' 100 miliion
                M(2) = "亿" ' 100 miliion
                M(3) = "万" ' ten thousand
                M(4) = "万" ' ten thousand
                M(5) = "仟" ' one thousand
                M(6) = "仟" ' one thousand

                If Not CurrncyDefined Then
                    M(7) = "¥"
                    M(8) = "¥"
                    M(9) = "分"
                    M(10) = "分"
                End If

                If SignDefined Then
                    M(7) = "¥"
                    M(8) = "¥"
                    M(9) = "分"
                    M(10) = "分"
                End If

                If AbvDefined Then
                    M(7) = "CNY"
                    M(8) = "CNY"
                    M(9) = "分"
                    M(10) = "分"
                End If

            Case "Chinese_Formal_Traditional"
                R(0) = "零"
                R(1) = "壹"
                R(2) = "貳"
                R(3) = "參"
                R(4) = "肆"
                R(5) = "伍"
                R(6) = "陸"
                R(7) = "柒"
                R(8) = "捌"
                R(9) = "玖"
                R(10) = "拾"
                R(11) = ""
                R(12) = ""
                R(13) = ""
                R(14) = ""
                R(15) = ""
                R(16) = ""
                R(17) = ""
                R(18) = ""
                R(19) = ""
                R(20) = ""

                Z(0) = ""
                Z(1) = "拾"
                Z(2) = ""
                Z(3) = ""
                Z(4) = ""
                Z(5) = ""
                Z(6) = ""
                Z(7) = ""
                Z(8) = ""
                Z(9) = ""

                H(0) = ""
                H(1) = "佰"
                H(2) = ""
                H(3) = ""
                H(4) = ""
                H(5) = ""
                H(6) = ""
                H(7) = ""
                H(8) = ""
                H(9) = ""


                M(0) = ""
                M(1) = "億" ' 100 miliion
                M(2) = "億" ' 100 miliion
                M(3) = "萬" ' ten thousand
                M(4) = "萬" ' ten thousand
                M(5) = "仟" ' one thousand
                M(6) = "仟" ' one thousand

                If Not CurrncyDefined Then
                    M(7) = "¥"
                    M(8) = "¥"
                    M(9) = "分"
                    M(10) = "分"
                End If

                If SignDefined Then
                    M(7) = "¥"
                    M(8) = "¥"
                    M(9) = "分"
                    M(10) = "分"
                End If

                If AbvDefined Then
                    M(7) = "CNY"
                    M(8) = "CNY"
                    M(9) = "分"
                    M(10) = "分"
                End If


            Case Else
                ' nothing to do


        End Select



    End Sub

End Class
