Namespace DynamicComponents

    Friend Class MyProtection

        Private Company As String = "Egyfirst Software,Inc."
        Private AuthorName As String = "Mohamed Ali Abbas Mohamed "
        Private AuthorNation As String = "Egypt-Alexandria-Smouha "
        Private AuthorPhone As String = "20-1007500290"
        Private AuthorMail As String = "mohamed.alyabbas@gmail.com"
        Public NotLicensed As Boolean = False
        Private KeyAlgorithm1 As Integer
        Private KeyAlgorithm2 As Integer
        Private KeyAlgorithm3 As Integer
        Private ProductID As Integer = 21
        Public Function ZeroPad(ByVal str_String As String, ByVal int_Count As Byte) As String
            If str_String <> "" Then
                Return (New String("0", int_Count - Len(Trim(str_String))) & Trim(str_String))
            End If
            Return ""
        End Function
        Public Function CheckSum(ByVal strNum As String) As Boolean

            Dim intCheckSum, X, intDigit As Integer
            Dim blnDoubleFlag As Boolean = False

            For X = Len(strNum) To 1 Step -1
                intDigit = Asc(Mid(strNum, X, 1))
                If intDigit >= 48 And intDigit <= 57 Then ' is it a digit starting 0 and ending 9
                    intDigit = intDigit - 48

                    If blnDoubleFlag = True Then
                        intDigit = intDigit + intDigit
                        If intDigit > 9 Then
                            intDigit = intDigit - 9
                        End If
                    End If
                    blnDoubleFlag = Not blnDoubleFlag
                    intCheckSum = intCheckSum + intDigit
                    If intCheckSum > 9 Then
                        intCheckSum = intCheckSum - 10
                    End If
                End If
            Next
            If intCheckSum = 0 Then Return True
            Return False
        End Function
        Private Function Formula(ByVal Num As Integer, ByVal Mode As Byte) As Integer
            Dim result As String
            result = (13 * Num ^ 3 + 12 * Num ^ 2 + KeyAlgorithm2 * Num ^ 1 + KeyAlgorithm3 * Num ^ 0).ToString

            If Mode = 1 Then
                Return Mid(result, 1, 3)
            ElseIf Mode = 2 Then
                Return Mid(result, 4, 3)
            ElseIf Mode = 3 Then
                Return Mid(result, 7, 3)
            ElseIf Mode = 4 Then
                Return Mid(result, 10, 3)
            End If
        End Function

        Public Sub SetAlgorithms(ByVal int_Algorithms1 As Integer, ByVal int_Algorithms2 As Integer, ByVal int_Algorithms3 As Integer)

            If int_Algorithms1 >= 1000 And int_Algorithms1 <= 7000 Then
                KeyAlgorithm1 = int_Algorithms1
            Else
                MsgBox("int_Algorithms1 must be between 1000 and 7000", , ProductID)
                Exit Sub
            End If

            If int_Algorithms2 >= 10 And int_Algorithms2 <= 99 Then
                KeyAlgorithm2 = int_Algorithms2
            Else
                MsgBox("int_Algorithms2 must be between 10 and 99", , ProductID)
                Exit Sub
            End If

            If int_Algorithms3 >= 10 And int_Algorithms3 <= 99 Then
                KeyAlgorithm3 = int_Algorithms3
            Else
                MsgBox("int_Algorithms3 must be between 10 and 99", , ProductID)
                Exit Sub
            End If
        End Sub

        Public Function Validate(ByVal myKey As String) As Boolean

            Dim KeyRnd As Integer
            Dim KeyVer As String

            'On Error GoTo erroMsg

            If myKey = "" Or Len(myKey) <> 21 Then
                Return False
            End If

            KeyRnd = Mid(myKey, 1, 4)
            KeyVer = ZeroPad((KeyAlgorithm1 * KeyAlgorithm1).ToString, 8)
            KeyRnd -= CInt(Mid(KeyVer, 1, 4))
            '---------------------------------------------------------------------
            If Not CheckSum(Mid(myKey, 1, 4) + Mid(myKey, 6, 3) + Mid(myKey, 10, 3) + Mid(myKey, 14, 3) + Mid(myKey, 18, 4)) = True Then
                Return False
            End If
            '---------------------------------------------------------------------
            If Mid(myKey, 6, 3) <> Formula(KeyRnd, 1) + CInt(Mid(KeyVer, 5, 1)) Then
                Return False
            End If

            If Mid(myKey, 10, 3) <> Formula(KeyRnd, 2) + CInt(Mid(KeyVer, 6, 1)) Then
                Return False
            End If

            If Mid(myKey, 14, 3) <> Formula(KeyRnd, 3) + CInt(Mid(KeyVer, 7, 1)) Then
                Return False
            End If

            If Mid(myKey, 18, 3) <> Formula(KeyRnd, 4) + CInt(Mid(KeyVer, 8, 1)) Then
                Return False
            End If

            NotLicensed = False

            Return True
erroMsg:
            Return False


        End Function



    End Class
End Namespace



