Imports NumberingSystem
Friend Class Portuguese
    Dim NS As New NumberingSystem
    Public Function TranslateNumber(ByVal str_Number As String) As String

        NS.getLanguage(R, Z, H, M, "Portuguese")

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
            'Tens and units are linked with e (and), as in trinta e cinco [35]
            n_unit = (N(x + 1) * 10) + N(x + 2)
            n_all = N(x) + n_unit
            If n_unit > 0 And n_unit < 21 Then  'keywords
                str_unit = R(n_unit)
            ElseIf N(x + 2) = 0 Then ' tens
                str_unit = Z(N(x + 1))
            Else ' others
                str_unit = Z(N(x + 1)) + " " + M(0) + " " + R(N(x + 2))
            End If
            '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            '==============================================================================
            'prepare numbers from 100 to 999
            'hundreds and tens are linked with e (and), as in cento e quarenta e seis [146])

            If n_all <> 0 Then
                'mil not um mil eg. 1210 is mil cento e vinte
                If checkOneThousnad(L, Forma) Then
                    'http://www.languagesandnumbers.com/how-to-count-in-portuguese-portugal/en/por-prt/
                    'experimental use added case 'cem not e cem for numbers ends with exactky 100
                    Num += " " + id1 + " "
                ElseIf checkOneHundred(L, Forma) Then
                    Num += " " + H(10) + " " + id1 + " "
                ElseIf N(x) = 0 Then
                    Num += str_unit + " " + id2 + " "  ' only units and tens
                ElseIf n_unit = 0 Then
                    Num += H(N(x)) + " " + id2 + " "   ' only hundreds
                Else
                    Num += H(N(x)) + " " + M(0) + " " + str_unit + " " + id2 + " "  ' complete compund number
                End If
            End If
            '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            '==============================================================================
            ' special case
            'thousands and hundreds are not linked with e (and) unless the number ends with a hundred with two zeroes
            ' (e.g.: dois mil e trezentos [2,300], but dois mil trezentos e sete [2,307]).
            'http://www.languagesandnumbers.com/how-to-count-in-portuguese-portugal/en/por-prt/
            'experimental use added case and hundreds not 100
            If L = 3 Then
                If isPattern(Forma, "xxxxxxxxxx00.xxx") And N(x + 3) <> 1 Then
                    Num = removeComma(Num)
                    Num += " " + M(0) + " "
                End If

            End If

            If NoCurrency(L, Forma) Then
                Num = removeAnd(Num)
                Num += " " + id2
            End If

        Next L


        'Num = removeComma(Num) ' no comma is used in Portuguese
        Num = removeSpaces(Num)
        Num = removeAnd(Num)

        If Forma = "000000000000.000" Then
            Num = R(0)
        End If

        Return Num

    End Function

End Class
