Imports NumberingSystem
Friend Class Arabic
    Dim NS As New NumberingSystem
    Public Function TranslateNumber(ByVal str_Number As String) As String
        NS.getLanguage(R, Z, H, M, "Arabic")
        Dim L As Byte

        For L = 1 To 5
            G = 0

            If L = 1 Then
                x = 1
                id1 = " مليار "
                id2 = " ملياران "
                id3 = " مليارات "
            ElseIf L = 2 Then
                x = 4
                id1 = " مليون "
                id2 = " مليونان "
                id3 = " ملايين "
            ElseIf L = 3 Then
                x = 7
                id1 = " ألف "
                id2 = " ألفان "
                id3 = " آلاف "
            ElseIf L = 4 Then
                x = 10
                id1 = " جنيه "
                id2 = " جنيهان "
                id3 = " جنيهات "

                If Left(Forma, 12) = "001000000000" Then
                    Num = " مليار جنيه "
                ElseIf Left(Forma, 12) = "002000000000" Then
                    Num = " مليارى جنيه "
                ElseIf Left(Forma, 12) = "000001000000" Then
                    Num = " مليون جنيه "
                ElseIf Left(Forma, 12) = "002002000000" Then
                    Num = " مليونى جنيه "
                ElseIf Left(Forma, 12) = "000000001000" Then
                    Num = " ألف جنيه "
                ElseIf Left(Forma, 12) = "000000002000" Then
                    Num = " ألفى جنيه "
                End If

            ElseIf L = 5 Then
                x = 14
                id1 = " قرش "
                id2 = " قرشان "
                id3 = " قروش "
            End If

            If N(x + 1) = 0 And N(x + 2) = 0 Then
                H(2) = "مائتى "
            Else
                H(2) = "مائتين "
            End If

            If N(x) = 0 And N(x + 1) = 0 And N(x + 2) = 0 Then
                G = 1
            ElseIf N(x) = 0 And N(x + 1) = 0 And N(x + 2) = 1 Then
                Num = Num + " و " + id1
                G = 1
            ElseIf N(x) = 0 And N(x + 1) = 0 And N(x + 2) = 2 Then
                Num = Num + " و " + id2
                G = 1
            End If


            If N(x) > 0 Then
                Num = Num + " و " + H(N(x))
            End If

            If N(x + 1) = 1 And N(x + 2) = 0 Then
                Num = Num + " و " + Z(1) + id3
                G = 4
            ElseIf N(x + 2) = 1 And N(x + 1) = 1 Then
                Num = Num + " و " + R(11) + Z(1) + id1
                G = 4
            ElseIf N(x + 2) = 2 And N(x + 1) = 1 Then
                Num = Num + " و " + R(12) + Z(1) + id1
                G = 4
            End If


            If N(x) = 0 And N(x + 1) = 0 And N(x + 2) > 2 Then
                Num = Num + " و " + R(N(x + 2)) + id3
                G = 1
            End If

            If N(x + 2) > 0 And G <> 4 And G <> 1 Then
                Num = Num + " و " + R(N(x + 2))
                G = 2
            End If

            If N(x + 1) > 1 Then
                Num = Num + " و " + Z(N(x + 1))
                G = 2
            End If

            If N(x + 1) = 1 And G <> 4 Then
                Num = Num + Z(N(x + 1))
                G = 2
            End If

            If G <> 1 And G <> 4 Then
                Num = Num + id1
            End If


        Next L

        NewNum = Num
        Ln = Len(NewNum)

        If Left(NewNum, Len(" و ")) = " و " Then
            NewNum = Right(NewNum, Ln - Len(" و "))
        End If


        If Forma = "000000000000.000" Then
            NewNum = ""
        End If

        If CurrncyDefined = True Then
            NewNum = NewNum.Replace("جنيه", M(7))
            NewNum = NewNum.Replace("جنيهات", M(8))
            NewNum = NewNum.Replace("قرش", M(9))
            NewNum = NewNum.Replace("قروش", M(10))
            NewNum = NewNum.Replace("جنيهان", M(11))
            NewNum = NewNum.Replace("قرشان", M(12))
        End If

        Return NewNum

    End Function
End Class
