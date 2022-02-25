Imports DynamicComponents.Number2Text
Public Class Form1
    Dim oTextNum As New DynamicComponents.Number2Text()
    Dim currentDomain As AppDomain = AppDomain.CurrentDomain
    Dim firstrun As Boolean = True

    Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load

        oTextNum = New DynamicComponents.Number2Text()
        oTextNum.setRegistrationKey("3766-505-242-565-5635")
        Me.Combo_Language.Text = "English"
        Me.ComboMode.Text = "text"
        Me.txt_bialldate.Text = Today.Date()
    End Sub
    Private Function valid(ByVal str As String) As Decimal
        On Error Resume Next
        If str = "" Then
            Return 0.0
        Else
            Return CDec(str)
        End If

    End Function
    Private Sub calculate()

        'Update each line total
        Me.txt_value01.Text = valid(Me.txt_price01.Text) * valid(Me.txt_qty01.Text)
        Me.txt_value02.Text = valid(Me.txt_price02.Text) * valid(Me.txt_qty02.Text)
        Me.txt_value03.Text = valid(Me.txt_price03.Text) * valid(Me.txt_qty03.Text)

        'update the grand total
        Me.txt_value.Text = valid(Me.txt_value01.Text) + valid(Me.txt_value02.Text) + valid(Me.txt_value03.Text)

    End Sub
    Private Sub textOfNumber()

        Select Case Me.Combo_Language.Text

            Case "English"
                'oTextNum.setCurrency("dollar", "dollars", "cent", "cent")
                Me.txt_translation.RightToLeft = Windows.Forms.RightToLeft.No
                Me.txt_translation.Text = oTextNum.translateNumber(valid(Me.txt_value.Text), Language_ID.English)

            Case "French"
                Me.txt_translation.RightToLeft = Windows.Forms.RightToLeft.No
                Me.txt_translation.Text = oTextNum.translateNumber(valid(Me.txt_value.Text), Language_ID.Frensh)

            Case "German"
                Me.txt_translation.RightToLeft = Windows.Forms.RightToLeft.No
                Me.txt_translation.Text = oTextNum.translateNumber(valid(Me.txt_value.Text), Language_ID.German)

            Case "Arabic"
                'oTextNum.SetِArabicCurrency("دينار", "ديناران", "دنانير", "درهم", "درهمان", "دراهم")
                Me.txt_translation.RightToLeft = Windows.Forms.RightToLeft.Yes
                Me.txt_translation.Text = oTextNum.translateNumber(valid(Me.txt_value.Text), Language_ID.Arabic)

            Case "Spanish"
                Me.txt_translation.RightToLeft = Windows.Forms.RightToLeft.No
                Me.txt_translation.Text = oTextNum.translateNumber(valid(Me.txt_value.Text), Language_ID.Spanish)

            Case "Portuguese"
                Me.txt_translation.RightToLeft = Windows.Forms.RightToLeft.No
                Me.txt_translation.Text = oTextNum.translateNumber(valid(Me.txt_value.Text), Language_ID.Portuguese)

            Case "Italian"
                Me.txt_translation.RightToLeft = Windows.Forms.RightToLeft.No
                Me.txt_translation.Text = oTextNum.translateNumber(valid(Me.txt_value.Text), Language_ID.Italian)

            Case "Russian"
                Me.txt_translation.RightToLeft = Windows.Forms.RightToLeft.No
                Me.txt_translation.Text = oTextNum.translateNumber(valid(Me.txt_value.Text), Language_ID.Russian)

            Case "Turkish"
                Me.txt_translation.RightToLeft = Windows.Forms.RightToLeft.No
                Me.txt_translation.Text = oTextNum.translateNumber(valid(Me.txt_value.Text), Language_ID.Turkish)

            Case "Persian"
                Me.txt_translation.RightToLeft = Windows.Forms.RightToLeft.Yes
                Me.txt_translation.Text = oTextNum.translateNumber(valid(Me.txt_value.Text), Language_ID.Persian)

            Case "Korean"
                Me.txt_translation.RightToLeft = Windows.Forms.RightToLeft.No
                Me.txt_translation.Text = oTextNum.translateNumber(valid(Me.txt_value.Text), Language_ID.Korean)

            Case "Chinese_Formal_Simplified"
                Me.txt_translation.RightToLeft = Windows.Forms.RightToLeft.No
                Me.txt_translation.Text = oTextNum.translateNumber(valid(Me.txt_value.Text), Language_ID.Chinese_Formal_Simplified)

            Case "Chinese_Formal_Traditional"
                Me.txt_translation.RightToLeft = Windows.Forms.RightToLeft.No
                Me.txt_translation.Text = oTextNum.translateNumber(valid(Me.txt_value.Text), Language_ID.Chinese_Formal_Traditional)

        End Select

    End Sub

    Private Sub TextBox1_TextChanged(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles txt_price01.TextChanged
        calculate()
    End Sub

    Private Sub TextBox7_TextChanged(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles txt_qty01.TextChanged
        calculate()
    End Sub

    Private Sub TextBox3_TextChanged(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles txt_price02.TextChanged
        calculate()
    End Sub

    Private Sub TextBox4_TextChanged(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles txt_price03.TextChanged
        calculate()
    End Sub

    Private Sub TextBox6_TextChanged(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles txt_qty02.TextChanged
        calculate()
    End Sub

    Private Sub TextBox5_TextChanged(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles txt_qty03.TextChanged
        calculate()
    End Sub

    Private Sub txt_value_TextChanged(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles txt_value.TextChanged
        textOfNumber()
    End Sub

    Private Sub Combo_Language_SelectedIndexChanged(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Combo_Language.SelectedIndexChanged
        textOfNumber()
    End Sub


    Private Sub ComboMode_SelectedIndexChanged(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles ComboMode.SelectedIndexChanged
        oTextNum.setCurrencyMode(ComboMode.SelectedIndex + 1)
        textOfNumber()
    End Sub

   
    Private Sub LinkLabel1_LinkClicked(ByVal sender As System.Object, ByVal e As System.Windows.Forms.LinkLabelLinkClickedEventArgs) Handles LinkLabel1.LinkClicked
        LinkLabel1.Links(LinkLabel1.Links.IndexOf(e.Link)).Visited = True
        System.Diagnostics.Process.Start("http://egyfirst.com/number2text/")

    End Sub

    Private Sub LinkLabel2_LinkClicked(ByVal sender As System.Object, ByVal e As System.Windows.Forms.LinkLabelLinkClickedEventArgs) Handles LinkLabel2.LinkClicked
        LinkLabel2.Links(LinkLabel2.Links.IndexOf(e.Link)).Visited = True
        System.Diagnostics.Process.Start("https://www.2checkout.com/checkout/purchase?sid=202299173&quantity=1&product_id=3")
    End Sub
End Class
