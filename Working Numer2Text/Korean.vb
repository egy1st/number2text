Imports NumberingSystem
Friend Class Korean
    Dim NS As New NumberingSystem
    Public Function TranslateNumber(ByVal str_Number As String) As String

        NS.getLanguage(R, Z, H, M, "Korean")

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
                x = 14
            End If
            '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            '==============================================================================
            'prepre numbers from 0 to 99
            'Tens and units are linked with e (and), as in trinta e cinco [35]
            Dim y As Integer = 0
            Dim ptrn As String = N(x) + N(x + 1) + N(x + 2) + N(x + 3)


            Dim i As Integer = 0
            For y = x To x + 3
                i += 1
                If N(y) <> 0 Then

                    If i = 1 And checkKoreanThousand(L, Forma) Then
                        Num += getID(y)
                    ElseIf i = 2 And checkKoreanHundred(L, Forma) Then
                        Num += getID(y)
                    ElseIf i = 3 And checkKoreanTen(L, Forma) Then
                        Num += getID(y)
                    ElseIf i = 4 And checkKoreanOne(L, Forma) Then
                        Num += getID(y)
                    Else ' nothing of special cases above
                        Num += R(N(y)) + getID(y)
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
            Return "억 " ' 100 Million
        ElseIf L = 2 Then
            Return "만 " ' Ten Thousands
        ElseIf L = 3 Then
            Return "" ' units
        ElseIf L = 4 Then
            Return "" ' decimals
        End If

        Return ""
    End Function
    Public Shared Function getID(ByVal y As Integer) As String

        If y Mod 4 = 1 Then
            Return "천" ' Thousands
        ElseIf y Mod 4 = 2 Then
            Return "백" ' Hundereds
        ElseIf y Mod 4 = 3 Then
            Return "십" ' Tens
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

        If L = 1 And isPattern(Forma, "xx1xxxxxxxxx.xxxx") Then
            Return True
        ElseIf L = 2 And isPattern(Forma, "xxxxxx1xxxxx.xxxx") Then
            Return True
        ElseIf L = 3 And isPattern(Forma, "xxxxxxxxxx1x.xxxx") Then
            Return True
        ElseIf L = 4 And isPattern(Forma, "xxxxxxxxxxxx.xx1x") Then
            Return True
        End If

        Return False
    End Function
    Public Shared Function checkKoreanOne(ByVal L As Integer, ByVal Forma As String) As Boolean

        If L = 1 And isPattern(Forma, "xxx1xxxxxxxx.xxxx") Then
            Return True
        ElseIf L = 2 And isPattern(Forma, "xxxxxxx1xxxx.xxxx") Then
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

End Class


