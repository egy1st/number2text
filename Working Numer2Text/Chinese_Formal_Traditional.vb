Imports NumberingSystem
Friend Class Chinese_Formal_Traditional
    Dim NS As New NumberingSystem
    Public Function TranslateNumber(ByVal str_Number As String) As String
        Dim countZero As Boolean = False
        NS.getLanguage(R, Z, H, M, "Chinese_Formal_Traditional")


        '===================================================================================
        ' each cycle represents a scale hunderds and tens, thousnads, millions and milliars
        Dim L As Byte
        For L = 1 To 4
            If L = 1 Then
                x = 1
            ElseIf L = 2 Then
                x = 5
            ElseIf L = 3 Then
                x = 9
            ElseIf L = 4 Then
                countZero = False
                x = 14
            End If
            '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            '==============================================================================
            'prepre numbers from 0 to 99
            'Eleven in Chinese is "ten one". Twelve is "ten two", and so on. Twenty is "Two ten", twenty-one is
            ' "two ten one" (2*10 + 1), and so on up to 99. One-hundred is "one hundred". One-hundred and one is
            ' "one hundred zero one". One hundred and eleven is "one hundred one ten one". Notice that for eleven '
            'alone, you only need "ten one" and not "one ten one", but when used in a larger number (such as 111),
            ' you must add the extra "one". One thousand and above is done in a similar fashion, where you say how
            ' many thousands you have, then how many hundreds, tens, and ones. An exception to this is for zeroes.
            ' When a zero occurs in the number (except at the end), you need to say "zero",
            ' but only once for two or more consecutive zeroes. So one-thousand and one would be "one thousand zero one",
            ' where zero stands in for the hundreds and tens places. Try different numbers in the
            ' converter above to practice and check on other numbers.

            'What is different from American English is that when you get to ten-thousand,
            ' Chinese has its own word (wan4), unlike English where you must use a compound of ten and thousand.
            'Only after ten thousand does Chinese start using compounds itself. One-hundred thousand is "one ten wan4"
            ' (where wan4 is the Chinese word for ten-thousand that English lacks).
            ' Chinese goes on like this until 100 million (yi4), where it introduces a new character.
            ' This happens every four decimal places, unlike American English where it happens every three decimal places
            ' (thousand, million, billion, trillion, etc. are all separated by three decimal places). 
            Dim y As Integer = 0
            Dim ptrn As String = N(x) + N(x + 1) + N(x + 2) + N(x + 3)


            Dim i As Integer = 0

            For y = x To x + 3
                i += 1
                If N(y) <> 0 Or countZero Then

                    countZero = True
                    'check ten for units only' 
                    If i = 3 And L = 3 And checkKoreanTen(L, Forma) Then
                        Num += getID(y)
                    ElseIf N(y) <> 0 Then
                        Num += R(N(y)) + getID(y)
                    ElseIf N(y) = 0 And getChineseSubSum(N, L, i) = 0 Then 'And getChineseSum(N, y) = 0
                        ' nothing to do
                        y = y
                    ElseIf N(y) = 0 And getChineseSubSum(N, L, i) <> 0 Then 'And getChineseSum(N, y) = 0
                        ' do not count zero again
                        Num += R(N(y))
                        countZero = False
                    Else
                        Num += R(N(y))
                    End If

                End If
            Next

            If ptrn <> "0000" Then
                Num += getGrand(L)
            End If
            '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            If L = 3 Then
                Num = removeAnd(Num)
                Num += " " + M(7)
            ElseIf L = 4 And Not isPattern(Forma, "xxxxxxxxxxxx.0000") Then
                Num += " " + M(9)
            End If
        Next L

        'Num = removeComma(Num) ' no comma is used in Finnish
        Num = removeSpaces(Num)
        Num = removeAnd(Num)

        If Forma = "000000000000.0000" Then
            Num = R(0)
        End If

        Return Num

    End Function
    Public Shared Function getGrand(ByVal L As Integer) As String

        If L = 1 Then
            Return "億" ' 100 Million
        ElseIf L = 2 Then
            Return "萬" ' Ten Thousands
        ElseIf L = 3 Then
            Return "" ' units
        ElseIf L = 4 Then
            Return "" ' decimals
        End If

        Return ""
    End Function
    Public Shared Function getID(ByVal y As Integer) As String

        If y Mod 4 = 1 Then
            Return "仟" ' Thousands
        ElseIf y Mod 4 = 2 Then
            Return "佰" ' Hundereds
        ElseIf y Mod 4 = 3 Then
            Return "拾" ' Tens
        ElseIf y Mod 4 = 0 Then
            Return "" ' units
        End If

        Return ""
    End Function
    Public Shared Function checkKoreanHundred(ByVal L As Integer, ByVal Forma As String) As Boolean

        If L = 1 And isPattern(Forma, "x1xxxxxxxxxx.xxxx") Then
            Return True
        ElseIf L = 2 And isPattern(Forma, "xxxxx1xxxxxx.xxxx") Then
            Return True
        ElseIf L = 3 And isPattern(Forma, "xxxxxxxxx1xx.xxxx") Then
            Return True
        ElseIf L = 4 Then ' no place in pences places
            Return False
        End If

        Return False
    End Function
    Public Shared Function checkKoreanTen(ByVal L As Integer, ByVal Forma As String) As Boolean

        If L = 1 And isPattern(Forma, "0010xxxxxxxx.xxxx") Then
            Return True
        ElseIf L = 2 And isPattern(Forma, "xxxx0010xxxx.xxxx") Then
            Return True
        ElseIf L = 3 And isPattern(Forma, "xxxxxxxx0010.xxxx") Then
            Return True
        ElseIf L = 4 And isPattern(Forma, "xxxxxxxxxxxx.0010") Then
            Return True
        End If

        Return False
    End Function
    Public Shared Function checkKoreanOne(ByVal L As Integer, ByVal Forma As String) As Boolean

        If L = 1 And isPattern(Forma, "0001xxxxxxxx.xxxx") Then
            Return True
        ElseIf L = 2 And isPattern(Forma, "xxxx0001xxxx.xxxx") Then
            Return True
        ElseIf L = 3 Then ' not applied here
            Return False
        ElseIf L = 4 Then  ' not applied here
            Return False
        End If

        Return False
    End Function

    Public Shared Function checkKoreanThousand(ByVal L As Integer, ByVal Forma As String) As Boolean

        If L = 1 And isPattern(Forma, "1xxxxxxxxxxx.xxxx") Then
            Return True
        ElseIf L = 2 And isPattern(Forma, "xxxx1xxxxxxx.xxxx") Then
            Return True
        ElseIf L = 3 And isPattern(Forma, "xxxxxxxx1xxx.xxxx") Then
            Return True
        ElseIf L = 4 Then ' no place in pences places
            Return False
        End If

        Return False
    End Function
    Public Function getChineseSubSum(ByRef N() As String, ByVal _phase As Integer, ByVal _step As Integer) As Integer

        Dim sum As Integer
        Dim x As Integer

        For x = _step To 4
            sum += Val(N(((_phase - 1) * 4) + x))
        Next

        Return sum

    End Function

    Public Function getChineseSum(ByRef N() As String, ByVal _step As Integer) As Integer

        Dim sum As Integer
        Dim x As Integer

        For x = _step To 12
            sum += Val(N(x))
        Next

        Return sum

    End Function

End Class


