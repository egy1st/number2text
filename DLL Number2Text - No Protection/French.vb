Imports NumberingSystem
Friend Class French
    Dim NS As New NumberingSystem

    Public Function TranslateNumber(ByVal str_Number As String) As String

        NS.getLanguage(R, Z, H, M, "French")

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

            n_unit = N(x + 2) + (N(x + 1) * 10)
            If n_unit < 21 Then  'keywords
                str_unit = R(n_unit)
            ElseIf N(x + 2) = 0 Then ' tens
                str_unit = Z(N(x + 1))

                '21 - 69
            ElseIf n_unit < 70 And N(x + 2) = 1 Then
                str_unit = Z(N(x + 1)) + " " + M(0) + " " + R(N(x + 2))
            ElseIf n_unit < 70 And N(x + 2) <> 1 Then
                str_unit = Z(N(x + 1)) + "-" + R(N(x + 2))

                '71-79
            ElseIf n_unit < 80 And N(x + 2) = 1 Then
                str_unit = Z(N(x + 1) - 1) + " " + M(0) + " " + R(N(x + 2) + 10)
            ElseIf n_unit < 80 And N(x + 2) <> 1 Then
                str_unit = Z(N(x + 1) - 1) + "-" + R(N(x + 2) + 10)

                '81-99
            ElseIf n_unit < 90 Then
                str_unit = Z(N(x + 1)) + "-" + R(N(x + 2))
            ElseIf n_unit < 100 Then
                str_unit = Z(N(x + 1) - 1) + "-" + R(N(x + 2) + 10)
            End If


            ' should appear prior to  'Hunders Block
            If L = 3 And N(x + 2) = 1 Then
                str_unit = ""
            End If


            'Hunders Block
            If n_unit <> 0 Then
                Num += H(N(x)) + " " + str_unit + " " + id2 + " "
            ElseIf N(x) = 1 And n_unit = 0 Then
                Num += H(N(x)) + " " + id2 + " "
            ElseIf N(x) > 1 And n_unit = 0 Then
                Num += H(N(x)) + "s " + id2 + " "
            End If


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
