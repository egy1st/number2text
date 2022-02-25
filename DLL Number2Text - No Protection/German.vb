Imports NumberingSystem
Friend Class German
    Dim NS As New NumberingSystem
    Public Function TranslateNumber(ByVal str_Number As String) As String

        NS.getLanguage(R, Z, H, M, "German")

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


            ' Special condition for germany language
            If N(x + 1) = 0 And N(x + 2) = 1 And L <= 2 Then
                R(1) += "e"
            ElseIf N(x + 1) = 0 And N(x + 2) = 1 And L = 4 Then
                R(1) += "s"
            End If
            ' End of special condition


            n_unit = N(x + 2) + (N(x + 1) * 10)
            If n_unit < 21 Then  'keywords
                str_unit = R(n_unit)
            ElseIf N(x + 2) = 0 Then ' tens
                str_unit = Z(N(x + 1))
            Else
                str_unit = R(N(x + 2)) + M(0) + Z(N(x + 1))
            End If


            If L = 1 And Mid(Forma, 1, 3) = "001" Then
                id2 = id1
            ElseIf L = 1 And Mid(Forma, 4, 3) = "001" Then
                id2 = id1
            End If

            If L <= 2 Or L = 4 Then
                id2 = " " + id2 + " "
                id1 = " " + id1 + " "
            End If


            If N(x) <> 0 Then
                If N(x + 1) + N(x + 2) <> 0 Then
                    Num += H(N(x)) + str_unit + id2
                Else
                    Num += H(N(x)) + id2
                End If

            ElseIf N(x + 1) + N(x + 2) <> 0 Then

                Num += str_unit + id2
            Else
                ' nothing to do
            End If





            If L = 3 Then
                If Mid(Forma, 7, 3) = "001" Then
                    Num = id1
                End If
            End If



            If L = 4 Then
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
