Imports NumberingSystem
Friend Class Spanish
    Dim NS As New NumberingSystem
    Public Function TranslateNumber(ByVal str_Number As String) As String

        NS.getLanguage(R, Z, H, M, "Spanish")

        '===================================================================================
        ' each cycle represents a scale hunderds and tens, thousnads, millions and milliars
        Dim L As Byte
        For L = 1 To 5
            id1 = M((L * 2) - 1)
            id2 = M(L * 2)
            If L = 1 Then
                x = 1
                n_sum = NS.getSum(N, 1)
            ElseIf L = 2 Then
                x = 4
                n_sum = NS.getSum(N, 2)
            ElseIf L = 3 Then
                x = 7
                n_sum = NS.getSum(N, 3)
            ElseIf L = 4 Then
                x = 10
            ElseIf L = 5 Then
                x = 14
            End If
            '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            '==============================================================================
            'prepre numbers from 0 to 99

            n_unit = (N(x + 1) * 10) + N(x + 2)
            n_all = N(x) + n_unit
            If n_unit > 0 And n_unit < 31 Then  'keywords are 30 not 20 as usual
                str_unit = R(n_unit)
            ElseIf N(x + 2) = 0 Then ' tens
                str_unit = Z(N(x + 1))
                'Notice that "y" is used only in numbers 31-99 (and 131-199, 231-299, 331-399, etc.)
            Else ' others
                str_unit = Z(N(x + 1)) + " " + M(0) + " " + R(N(x + 2))
            End If
            '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            '==============================================================================
            'prepare numbers from 100 to 999
            ' y "and"  is not used to separate hundreds from tens.
            If n_all <> 0 Then
                'When there is exactly 100 of something use the shortened form "cien" rather than ciento
                If N(x) = 1 And N(x + 1) + N(x + 2) = 0 Then ' for exactly 100 
                    Num += "cien" + " " + str_unit + " " + id2 + " "
                Else
                    Num += H(N(x)) + " " + str_unit + " " + id2 + " " ' others
                End If
            End If
            '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            If NoCurrency(L, Forma) Then
                Num = removeAnd(Num)
                Num += " " + id2
            End If


        Next L


        'Num = removeComma(Num) ' no comma is used in Spanish
        Num = removeSpaces(Num)
        Num = removeAnd(Num)

        If Forma = "000000000000.000" Then
            Num = R(0)
        End If

        Return Num




    End Function

End Class
