Imports NumberingSystem
Friend Class English
    Dim NS As New NumberingSystem
    Public Function TranslateNumber(ByVal str_Number As String) As String

        NS.getLanguage(R, Z, H, M, "English")


        '===================================================================================
        ' each cycle represent a scale hunderds and tens, thousnads, millions and milliars
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

            n_unit = N(x + 2) + (N(x + 1) * 10)
            If n_unit < 21 Then  'keywords
                str_unit = R(n_unit)
            ElseIf N(x + 2) = 0 Then ' tens
                str_unit = Z(N(x + 1))
            Else ' others
                str_unit = Z(N(x + 1)) + "-" + R(N(x + 2))
            End If
            '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            '==============================================================================
            'prepare numbers from 100 to 999

            If N(x) <> 0 Then
                If N(x + 1) + N(x + 2) <> 0 Then 'hundereds with (tens or units) eg. 250, 385, 504
                    Num += H(N(x)) + " " + M(0) + " " + str_unit + " " + id2 + ", "
                Else
                    Num += H(N(x)) + " " + id2 + ", " ' hundereds without (tens and units) eg. 100, 200
                End If

            ElseIf N(x + 1) + N(x + 2) <> 0 Then
                Num += str_unit + " " + id2 + ", "
            Else
                ' nothing to do
            End If
            '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            ' Special condition for english language
            If n_sum > 0 And n_sum < 100 And L < 4 And Right(Num, Len(M(0)) + 1) <> M(0) + " " Then
                Num = Trim(Num)
                Ln = Len(Num)
                If Right(Num, 1) = "," Then
                    Num = Left(Num, Ln - 1)
                    Num += " " + M(0) + " "
                End If

            End If
            ' End of special condition

            If L = 4 Then
                If Left(Forma, 12) = "000000000001" Then
                    Num = R(1) + " " + id1
                ElseIf Left(Forma, 12) = "000000000000" Then
                    Num = ""
                Else
                    Num = Trim(Num)
                    Ln = Len(Num)
                    If Right(Num, 1) = "," Then
                        Num = Left(Num, Ln - 1)
                    End If
                End If

                ' this shoud apear prior to cond.4
                Ln = Len(M(7))
                Ln2 = Len(M(8))
                If Right(Num, Ln) <> M(7) And Right(Num, Ln2) <> M(8) And Left(Forma, 12) <> "000000000000" Then
                    Num += " " + M(8)
                End If

                'cond.4
                If Right(Forma, 3) <> "000" And Left(Forma, 12) <> "000000000000" Then
                    Num += " " + M(0) + " "
                End If


            End If


            If L = 5 Then
                If Right(Forma, 3) = "010" Then ' one cent
                    Num = Trim(Num)
                    Ln = Len(Num)
                    If Right(Num, 1) = "," Then
                        Num = Left(Num, Ln - 1)
                    End If

                    Ln = Len(Num)
                    Ln2 = Len(id2)
                    Num = Left(Num, Ln - (Ln2)) + id1 ' remove s
                End If
            End If

        Next L


        Num = Trim(Num)
        Ln = Len(Num)
        If Right(Num, 1) = "," Then
            Num = Left(Num, Ln - 1)
        End If

        If Forma = "000000000000.000" Then
            Num = R(0)
        End If

        Return Num

    End Function

End Class
