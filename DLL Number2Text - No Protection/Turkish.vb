Imports NumberingSystem
Friend Class Turkish
    Dim NS As New NumberingSystem
    Public Function TranslateNumber(ByVal str_Number As String) As String

        NS.getLanguage(R, Z, H, M, "Turkish")

        '===================================================================================
        ' each cycle represents a scale hunderds and tens, thousnads, millions and milliars
        Dim L As Byte
        For L = 1 To 5
            id1 = M((L * 2) - 1)
            id2 = M(L * 2)
            If L = 1 Then
                x = 1
            ElseIf L = 2 Then
                x = 4
            ElseIf L = 3 Then
                x = 7
            ElseIf L = 4 Then
                x = 10
            ElseIf L = 5 Then
                x = 14
            End If
            '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            '==============================================================================
            'prepre numbers from 0 to 99
            'Numbers up to ninety-nine are built by spelling out the ten, then the digit (e.g.: otuz iki [32],
            n_unit = (N(x + 1) * 10) + N(x + 2)
            n_all = N(x) + n_unit


            If n_unit > 0 And n_unit < 11 Then  'keywords are only 10 not 20
                str_unit = R(n_unit)
            ElseIf N(x + 2) = 0 Then ' tens
                str_unit = Z(N(x + 1))
                'Please note that üç [3] loses its umlaut when composed within a number (e.g.: on uç [13]).
                ' thousnads multipier from 11 to 19 ara contcatentaed without space
                ' we test it is less than 20 as we are sure it is above 10 
            ElseIf N(x + 2) = 3 And N(x + 1) > 0 And (L = 3 And n_unit < 20) Then
                str_unit = Z(N(x + 1)) + "uç"
            ElseIf N(x + 2) = 3 And N(x + 1) > 0 And Not (L = 3 And n_unit < 20) Then
                str_unit = Z(N(x + 1)) + " " + "uç"
                ' thousnads multipier from 11 to 19 ara contcatentaed without space
                ' we test it is less than 20 as we are sure it is above 10 
            ElseIf (L = 3 And n_unit < 20) Then ' others
                str_unit = Z(N(x + 1)) + R(N(x + 2))
            Else
                str_unit = Z(N(x + 1)) + " " + R(N(x + 2))
            End If
            '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            '==============================================================================
            'prepare numbers from 100 to 999
            'Hundreds and thousands are built by telling the multiplier digit, then the hundred or thousand word
            ' (e.g.: beş yüz [500], beş bin [5,000]).

            If n_all <> 0 Then
                'yüz not bir yüz 
                If checkOneHundred(L, Forma) Then
                    Num += " " + H(1) + " " + id1 + " "
                ElseIf N(x) = 0 Then
                    Num += str_unit + " " + id2 + " "  ' only units and tens
                ElseIf n_unit = 0 Then
                    Num += H(N(x)) + " " + id2 + " "   ' only hundreds
                Else
                    Num += H(N(x)) + " " + str_unit + " " + id2 + " "  ' complete compund number
                End If
            End If
            '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            If NoCurrency(L, Forma) Then
                Num = removeAnd(Num)
                Num += " " + id2
            End If

        Next L


        'Num = removeComma(Num) ' no comma is used in Finnish
        Num = removeSpaces(Num)
        Num = removeAnd(Num)

        If Forma = "000000000000.000" Then
            Num = R(0)
        End If

        Return Num

    End Function

End Class


