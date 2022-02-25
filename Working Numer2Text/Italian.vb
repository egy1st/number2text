Imports NumberingSystem
Friend Class Italian
    Dim NS As New NumberingSystem
    Public Function TranslateNumber(ByVal str_Number As String) As String

        NS.getLanguage(R, Z, H, M, "Italian")

        '===================================================================================
        ' each cycle represents a scale hunderds and tens, thousnads, millions and milliars
        Dim L As Byte
        For L = 1 To 5
            id1 = M((L * 2) - 1)
            id2 = M(L * 2)
            If L = 1 Then
                id1 = " " + id1 + " "
                id2 = " " + id2 + " "
                x = 1
            ElseIf L = 2 Then
                id1 = " " + id1 + " "
                id2 = " " + id2 + " "
                x = 4
            ElseIf L = 3 Then
                x = 7
                n_sum = NS.getSum(N, 3)
            ElseIf L = 4 Then
                id1 = " " + id1 + " "
                id2 = " " + id2 + " "
                x = 10
            ElseIf L = 5 Then
                id1 = " " + id1
                id2 = " " + id2
                x = 14
            End If
            '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            '==============================================================================
            'prepre numbers from 0 to 99

            n_unit = (N(x + 1) * 10) + N(x + 2)
            n_all = N(x) + n_unit
            If n_unit > 0 And n_unit < 21 Then  'keywords
                str_unit = R(n_unit)
            ElseIf N(x + 2) = 0 Then ' tens
                str_unit = Z(N(x + 1))

                ' case compound number whers tens ends with vowels(all tens are do) and units strat with vowels too
                ' as in (1,8)
                ' thus The numbers venti, trenta, and so on drop the final vowel before adding -uno or otto:
                'Asc Integer  ventuno, ventotto. 
            ElseIf N(x + 2) = 1 Or N(x + 2) = 8 Then
                str_unit = removeVowels(Z(N(x + 1))) + R(N(x + 2))
            Else ' others
                str_unit = Z(N(x + 1)) + R(N(x + 2))
            End If

            'When -tre is the last digit of a larger number, it takes an accent: eg. ventitré
            ' note 253623 is duecentocinquantatremila seicentoventitré
            ' only last tre has accent
            If N(x + 2) = 3 And L = 4 Then  ' independent case
                str_unit = modifyAccent(str_unit)
            End If
            '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            '==============================================================================
            'prepare numbers from 100 to 999
            'Hundreds, tens and units are linked together with no space (e.g.: centonove [109]
            If n_all <> 0 Then
                If checkOneThousnad(L, Forma) Then
                    Num += id1
                    'Numbers are grouped in words of three digits, with the specific rule that
                    ' a space is added after the word for thousand if its multiplier
                    ' is greater than one hundred and does not end with a double zero
                    ' (e.g.: duemilatrecentoquarantacinque [2,345], tecentosessantacinquemila duecento [765,200]).
                ElseIf checkHundredThousnad(L, Forma) Then
                    Num += H(N(x)) + str_unit + id2 + " "

                    ' experimantal at http://www.languagesandnumbers.com/how-to-count-in-italian/en/ita/
                    'add space when thausand multipliers greater than 100, for 100 exatly no space , so we use trim function
                ElseIf checkSuperOneHundred(L, Forma) Then
                    Num += H(N(x)) + str_unit + Trim(id2) + " "   ' 
                Else
                    Num += H(N(x)) + str_unit + id2  ' others
                End If
            End If
            '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            If NoCurrency(L, Forma) Then
                Num = removeAnd(Num)
                Num += " " + id2
            End If

        Next L


        'Num = removeComma(Num) ' no comma is used in Italin
        Num = removeSpaces(Num)
        Num = removeAnd(Num)

        If Forma = "000000000000.000" Then
            Num = R(0)
        End If

        Return Num



    End Function
    Public Shared Function modifyAccent(ByVal str As String) As String

        Ln = Len(str)
        Ln2 = Len("tre")
        If Right(str, Ln2) = "tre" Then
            str = Left(str, Ln - Ln2) + "tré"
        End If
        Return str
    End Function
    Public Shared Function removeVowels(ByVal str As String) As String

        Ln = Len(str)
        If Ln > 0 Then
            str = Left(str, Ln - 1)
        End If
        Return str

    End Function
    Public Shared Function checkHundredThousnad(ByVal L As Integer, ByVal Forma As String) As Boolean

        If L = 3 And isPattern(Forma, "xxxxxxdxxxxx.xxx") And Not isPattern(Forma, "xxxxxxxxxx00.xxx") Then
            Return True
        End If

        Return False
    End Function

    Public Shared Function checkSuperOneHundred(ByVal L As Integer, ByVal Forma As String) As Boolean

        If L = 3 And isPattern(Forma, "xxxxxx100xxx.xxx") Then
            Return True
        ElseIf L = 2 And isPattern(Forma, "xxx100xxxxxx.xxx") Then
            Return True
        ElseIf L = 1 And isPattern(Forma, "100xxxxxxxxx.xxx") Then
            Return True
        End If

        Return False
    End Function

End Class
