Imports NumberingSystem

Namespace DynamicComponents
    Public Class Number2Text
        Public Shared Internal_Registration_Key As String = ""

        Public Enum Language_ID As Integer
            Arabic = 1
            English = 2
            Frensh = 3
            German = 4
            Italian = 5
            Spanish = 6
            Portuguese = 7
            Russian = 8
            Turkish = 9
            Persian = 10
            Korean = 11
            Chinese_Formal_Simplified = 12
            Chinese_Formal_Traditional = 13

        End Enum
        Public Enum Currency_Mode As Integer
            Text = 1
            Sign = 2
            Abreviation = 3
        End Enum

        Private Function zeroPad(ByVal str_String As String, ByVal int_Count As Byte) As String
            If str_String <> "" Then
                Return (New String("0", int_Count - Len(Trim(str_String))) & Trim(str_String))
            End If
            Return ""
        End Function
        Public Sub setCurrency(ByVal oneCurrency As String, ByVal CurrencyPlural As String, ByVal oneCurrencyUnit As String, ByVal CurrencyUnitPlural As String)
            CurrncyDefined = True
            M(7) = oneCurrency
            M(8) = CurrencyPlural
            M(9) = oneCurrencyUnit
            M(10) = CurrencyUnitPlural
        End Sub
        Public Sub setCurrencyMode(ByVal mode As Currency_Mode)
            If mode = Currency_Mode.Text Then
                CurrncyDefined = False
                SignDefined = False
                AbvDefined = False
            ElseIf mode = Currency_Mode.Sign Then
                SignDefined = True
                AbvDefined = False
                CurrncyDefined = True
            ElseIf mode = Currency_Mode.Abreviation Then
                AbvDefined = True
                SignDefined = False
                CurrncyDefined = True
            End If
        End Sub
        Public Sub setArabicCurrency(ByVal oneCurrency As String, ByVal twoCurrency As String, ByVal CurrencyPlural As String, ByVal oneCurrencyUnit As String, ByVal twoCurrencyUnits As String, ByVal CurrencyUnitPlural As String)
            CurrncyDefined = True
            M(7) = oneCurrency
            M(8) = CurrencyPlural
            M(9) = oneCurrencyUnit
            M(10) = oneCurrencyUnit
            M(11) = twoCurrencyUnits
            M(12) = CurrencyUnitPlural
        End Sub
        Private Function prepareNumber4Korean(ByVal str_Number As String, ByRef N() As String) As Boolean
            str_Number = str_Number.Replace(",", ".")
            If str_Number > "999999999999.0099" Then
                MsgBox("Cannot translate numbers exceed 999,999,999,999.99")
                Return False
            End If
            Forma = Format(CDec(str_Number), "000000000000.0000")
            Num = ""

            Dim E As Byte
            For E = 1 To 12
                S = Mid(Forma, E, 1)
                N(E) = Val(S)
            Next E

            For E = 14 To 17
                S = Mid(Forma, E, 1)
                N(E) = Val(S)
            Next E

            'make(0.23 Is 0.0023)
            N(17) = N(15)
            N(16) = N(14)
            N(14) = 0
            N(15) = 0


            Forma = Left(Forma, 13)
            For E = 14 To 17
                Forma += N(E)
            Next

            Return True
        End Function
        Private Function prepareNumber(ByVal str_Number As String, ByRef N() As String) As Boolean

            str_Number = str_Number.Replace(",", ".")
            If str_Number > "999999999999.099" Then
                MsgBox("Cannot translate numbers exceed 999,999,999,999.99")
                Return False
            End If
            Forma = Format(CDec(str_Number), "000000000000.000")
            Num = ""

            Dim E As Byte
            For E = 1 To 12
                S = Mid(Forma, E, 1)
                N(E) = Val(S)
            Next E

            For E = 14 To 16
                S = Mid(Forma, E, 1)
                N(E) = Val(S)
            Next E

            'make(0.23 Is 0.023)
            N(16) = N(15)
            N(15) = N(14)
            N(14) = 0

            Forma = Left(Forma, 13)
            For E = 14 To 16
                Forma += N(E)
            Next

            Return True
        End Function
        Public Sub setRegistrationKey(ByVal myKey As String)
            Internal_Registration_Key = myKey
        End Sub
        Public Function translateNumber(ByVal str_Number As String, ByVal Language As Language_ID) As String
            Dim MyProtect As New MyProtection()


            MyProtect.SetAlgorithms(1971, 21, 40)
            If MyProtect.Validate(Internal_Registration_Key) = False Then

                If Val(str_Number) > 10000 Then
                    MsgBox("This is a limited version of DC Number2Text" + vbCrLf + "Maximum number is 10000")
                    Return ""
                End If
            End If



            '            On Error Resume Next
            If Language <> 15 And Language <> 16 Then ' Korean and Chinese 
                If prepareNumber(str_Number, N) = False Then
                    Return "Nan"
                    Exit Function
                End If
            End If


            Select Case Language

                Case Language_ID.Arabic
                    Dim lang As New Arabic()
                    Return lang.TranslateNumber(str_Number)

                Case Language_ID.English
                    Dim lang As New English()
                    Return lang.TranslateNumber(str_Number)

                Case Language_ID.Frensh
                    Dim lang As New French
                    Return lang.TranslateNumber(str_Number)

                Case Language_ID.German
                    Dim lang As New German
                    Return lang.TranslateNumber(str_Number)

                Case Language_ID.Spanish
                    Dim lang As New Spanish()
                    Return lang.TranslateNumber(str_Number)

                Case Language_ID.Portuguese
                    Dim lang As New Portuguese()
                    Return lang.TranslateNumber(str_Number)

                Case Language_ID.Italian
                    Dim lang As New Italian()
                    Return lang.TranslateNumber(str_Number)

                Case Language_ID.Russian
                    Dim lang As New Russian()
                    Return lang.TranslateNumber(str_Number)

                Case Language_ID.Turkish
                    Dim lang As New Turkish()
                    Return lang.TranslateNumber(str_Number)

                Case Language_ID.Persian
                    Dim lang As New Persian()
                    Return lang.TranslateNumber(str_Number)

                Case Language_ID.Korean
                    If prepareNumber4Korean(str_Number, N) = False Then
                        Return "Nan"
                    End If
                    Dim lang As New Korean()
                    Return lang.TranslateNumber(str_Number)

                Case Language_ID.Chinese_Formal_Simplified
                    If prepareNumber4Korean(str_Number, N) = False Then
                        Return "Nan"
                    End If
                    Dim lang As New Chinese_Formal_Simplified
                    Return lang.TranslateNumber(str_Number)

                Case Language_ID.Chinese_Formal_Traditional
                    If prepareNumber4Korean(str_Number, N) = False Then
                        Return "Nan"
                    End If
                    Dim lang As New Chinese_Formal_Traditional
                    Return lang.TranslateNumber(str_Number)

            End Select

            Return ""

        End Function
        Private Function GetPageHTML(ByVal URL As String) As String
            Dim objWC As New System.Net.WebClient()
            Return New System.Text.UTF8Encoding().GetString(objWC.DownloadData(URL))
        End Function

    End Class
End Namespace






