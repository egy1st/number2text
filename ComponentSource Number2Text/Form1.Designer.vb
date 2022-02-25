<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class Form1
    Inherits System.Windows.Forms.Form

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()> _
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()> _
    Private Sub InitializeComponent()
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(Form1))
        Me.Combo_Language = New System.Windows.Forms.ComboBox()
        Me.Label2 = New System.Windows.Forms.Label()
        Me.Label1 = New System.Windows.Forms.Label()
        Me.txt_price01 = New System.Windows.Forms.TextBox()
        Me.Label3 = New System.Windows.Forms.Label()
        Me.Label4 = New System.Windows.Forms.Label()
        Me.Label5 = New System.Windows.Forms.Label()
        Me.Label6 = New System.Windows.Forms.Label()
        Me.Label7 = New System.Windows.Forms.Label()
        Me.txt_price02 = New System.Windows.Forms.TextBox()
        Me.txt_price03 = New System.Windows.Forms.TextBox()
        Me.txt_qty03 = New System.Windows.Forms.TextBox()
        Me.txt_qty02 = New System.Windows.Forms.TextBox()
        Me.txt_qty01 = New System.Windows.Forms.TextBox()
        Me.txt_value03 = New System.Windows.Forms.TextBox()
        Me.txt_value02 = New System.Windows.Forms.TextBox()
        Me.txt_value01 = New System.Windows.Forms.TextBox()
        Me.Label8 = New System.Windows.Forms.Label()
        Me.txt_value = New System.Windows.Forms.TextBox()
        Me.Label9 = New System.Windows.Forms.Label()
        Me.Label10 = New System.Windows.Forms.Label()
        Me.TextBox1 = New System.Windows.Forms.TextBox()
        Me.txt_bialldate = New System.Windows.Forms.TextBox()
        Me.Label11 = New System.Windows.Forms.Label()
        Me.TextBox3 = New System.Windows.Forms.TextBox()
        Me.Label13 = New System.Windows.Forms.Label()
        Me.Panel1 = New System.Windows.Forms.Panel()
        Me.Panel2 = New System.Windows.Forms.Panel()
        Me.Panel3 = New System.Windows.Forms.Panel()
        Me.Panel4 = New System.Windows.Forms.Panel()
        Me.txt_translation = New System.Windows.Forms.RichTextBox()
        Me.ComboMode = New System.Windows.Forms.ComboBox()
        Me.Label12 = New System.Windows.Forms.Label()
        Me.LinkLabel2 = New System.Windows.Forms.LinkLabel()
        Me.LinkLabel1 = New System.Windows.Forms.LinkLabel()
        Me.LinkLabel3 = New System.Windows.Forms.LinkLabel()
        Me.LinkLabel4 = New System.Windows.Forms.LinkLabel()
        Me.LinkLabel5 = New System.Windows.Forms.LinkLabel()
        Me.SuspendLayout()
        '
        'Combo_Language
        '
        Me.Combo_Language.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList
        Me.Combo_Language.Font = New System.Drawing.Font("Tahoma", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Combo_Language.Items.AddRange(New Object() {"Arabic", "Chinese_Formal_Simplified", "Chinese_Formal_Traditional", "English", "French", "German", "Italian", "Korean", "Persian", "Portuguese", "Russian", "Spanish", "Turkish"})
        Me.Combo_Language.Location = New System.Drawing.Point(122, 9)
        Me.Combo_Language.Name = "Combo_Language"
        Me.Combo_Language.Size = New System.Drawing.Size(199, 24)
        Me.Combo_Language.TabIndex = 0
        '
        'Label2
        '
        Me.Label2.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.Label2.Location = New System.Drawing.Point(12, 12)
        Me.Label2.Name = "Label2"
        Me.Label2.Size = New System.Drawing.Size(93, 21)
        Me.Label2.TabIndex = 16
        Me.Label2.Text = "Language"
        '
        'Label1
        '
        Me.Label1.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.Label1.Location = New System.Drawing.Point(13, 146)
        Me.Label1.Name = "Label1"
        Me.Label1.Size = New System.Drawing.Size(88, 16)
        Me.Label1.TabIndex = 15
        Me.Label1.Text = "item"
        '
        'txt_price01
        '
        Me.txt_price01.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.txt_price01.Location = New System.Drawing.Point(124, 168)
        Me.txt_price01.MaxLength = 16
        Me.txt_price01.Name = "txt_price01"
        Me.txt_price01.Size = New System.Drawing.Size(129, 26)
        Me.txt_price01.TabIndex = 1
        '
        'Label3
        '
        Me.Label3.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.Label3.Location = New System.Drawing.Point(124, 146)
        Me.Label3.Name = "Label3"
        Me.Label3.Size = New System.Drawing.Size(88, 16)
        Me.Label3.TabIndex = 18
        Me.Label3.Text = "Price/unit"
        '
        'Label4
        '
        Me.Label4.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.Label4.Location = New System.Drawing.Point(307, 146)
        Me.Label4.Name = "Label4"
        Me.Label4.Size = New System.Drawing.Size(79, 16)
        Me.Label4.TabIndex = 19
        Me.Label4.Text = "Quantity"
        '
        'Label5
        '
        Me.Label5.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.Label5.Location = New System.Drawing.Point(13, 174)
        Me.Label5.Name = "Label5"
        Me.Label5.Size = New System.Drawing.Size(88, 16)
        Me.Label5.TabIndex = 20
        Me.Label5.Text = "Item 01"
        '
        'Label6
        '
        Me.Label6.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.Label6.Location = New System.Drawing.Point(13, 207)
        Me.Label6.Name = "Label6"
        Me.Label6.Size = New System.Drawing.Size(88, 16)
        Me.Label6.TabIndex = 21
        Me.Label6.Text = "Item 02"
        '
        'Label7
        '
        Me.Label7.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.Label7.Location = New System.Drawing.Point(13, 237)
        Me.Label7.Name = "Label7"
        Me.Label7.Size = New System.Drawing.Size(88, 16)
        Me.Label7.TabIndex = 22
        Me.Label7.Text = "Item 03"
        '
        'txt_price02
        '
        Me.txt_price02.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.txt_price02.Location = New System.Drawing.Point(124, 202)
        Me.txt_price02.MaxLength = 16
        Me.txt_price02.Name = "txt_price02"
        Me.txt_price02.Size = New System.Drawing.Size(129, 26)
        Me.txt_price02.TabIndex = 3
        '
        'txt_price03
        '
        Me.txt_price03.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.txt_price03.Location = New System.Drawing.Point(124, 235)
        Me.txt_price03.MaxLength = 16
        Me.txt_price03.Name = "txt_price03"
        Me.txt_price03.Size = New System.Drawing.Size(129, 26)
        Me.txt_price03.TabIndex = 5
        '
        'txt_qty03
        '
        Me.txt_qty03.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.txt_qty03.Location = New System.Drawing.Point(309, 235)
        Me.txt_qty03.MaxLength = 16
        Me.txt_qty03.Name = "txt_qty03"
        Me.txt_qty03.Size = New System.Drawing.Size(77, 26)
        Me.txt_qty03.TabIndex = 6
        '
        'txt_qty02
        '
        Me.txt_qty02.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.txt_qty02.Location = New System.Drawing.Point(309, 202)
        Me.txt_qty02.MaxLength = 16
        Me.txt_qty02.Name = "txt_qty02"
        Me.txt_qty02.Size = New System.Drawing.Size(77, 26)
        Me.txt_qty02.TabIndex = 4
        '
        'txt_qty01
        '
        Me.txt_qty01.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.txt_qty01.Location = New System.Drawing.Point(309, 168)
        Me.txt_qty01.MaxLength = 16
        Me.txt_qty01.Name = "txt_qty01"
        Me.txt_qty01.Size = New System.Drawing.Size(77, 26)
        Me.txt_qty01.TabIndex = 2
        Me.txt_qty01.Text = "1"
        '
        'txt_value03
        '
        Me.txt_value03.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.txt_value03.Location = New System.Drawing.Point(491, 235)
        Me.txt_value03.MaxLength = 16
        Me.txt_value03.Name = "txt_value03"
        Me.txt_value03.ReadOnly = True
        Me.txt_value03.Size = New System.Drawing.Size(148, 26)
        Me.txt_value03.TabIndex = 31
        '
        'txt_value02
        '
        Me.txt_value02.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.txt_value02.Location = New System.Drawing.Point(491, 202)
        Me.txt_value02.MaxLength = 16
        Me.txt_value02.Name = "txt_value02"
        Me.txt_value02.ReadOnly = True
        Me.txt_value02.Size = New System.Drawing.Size(148, 26)
        Me.txt_value02.TabIndex = 30
        '
        'txt_value01
        '
        Me.txt_value01.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.txt_value01.Location = New System.Drawing.Point(491, 168)
        Me.txt_value01.MaxLength = 16
        Me.txt_value01.Name = "txt_value01"
        Me.txt_value01.ReadOnly = True
        Me.txt_value01.Size = New System.Drawing.Size(148, 26)
        Me.txt_value01.TabIndex = 29
        '
        'Label8
        '
        Me.Label8.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.Label8.Location = New System.Drawing.Point(531, 146)
        Me.Label8.Name = "Label8"
        Me.Label8.Size = New System.Drawing.Size(88, 16)
        Me.Label8.TabIndex = 28
        Me.Label8.Text = "Value"
        '
        'txt_value
        '
        Me.txt_value.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.txt_value.Location = New System.Drawing.Point(492, 286)
        Me.txt_value.MaxLength = 16
        Me.txt_value.Name = "txt_value"
        Me.txt_value.ReadOnly = True
        Me.txt_value.Size = New System.Drawing.Size(147, 26)
        Me.txt_value.TabIndex = 32
        '
        'Label9
        '
        Me.Label9.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.Label9.Location = New System.Drawing.Point(14, 293)
        Me.Label9.Name = "Label9"
        Me.Label9.Size = New System.Drawing.Size(88, 16)
        Me.Label9.TabIndex = 33
        Me.Label9.Text = "Gross Value"
        '
        'Label10
        '
        Me.Label10.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.Label10.Location = New System.Drawing.Point(12, 62)
        Me.Label10.Name = "Label10"
        Me.Label10.Size = New System.Drawing.Size(88, 16)
        Me.Label10.TabIndex = 34
        Me.Label10.Text = "Bill No"
        '
        'TextBox1
        '
        Me.TextBox1.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.TextBox1.Location = New System.Drawing.Point(123, 59)
        Me.TextBox1.MaxLength = 16
        Me.TextBox1.Name = "TextBox1"
        Me.TextBox1.Size = New System.Drawing.Size(95, 26)
        Me.TextBox1.TabIndex = 7
        Me.TextBox1.Text = "1920056"
        '
        'txt_bialldate
        '
        Me.txt_bialldate.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.txt_bialldate.Location = New System.Drawing.Point(510, 59)
        Me.txt_bialldate.MaxLength = 16
        Me.txt_bialldate.Name = "txt_bialldate"
        Me.txt_bialldate.Size = New System.Drawing.Size(130, 26)
        Me.txt_bialldate.TabIndex = 8
        Me.txt_bialldate.Text = "25/4/2012"
        '
        'Label11
        '
        Me.Label11.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.Label11.Location = New System.Drawing.Point(384, 62)
        Me.Label11.Name = "Label11"
        Me.Label11.Size = New System.Drawing.Size(88, 16)
        Me.Label11.TabIndex = 36
        Me.Label11.Text = "Bill Date"
        '
        'TextBox3
        '
        Me.TextBox3.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.TextBox3.Location = New System.Drawing.Point(124, 91)
        Me.TextBox3.MaxLength = 16
        Me.TextBox3.Name = "TextBox3"
        Me.TextBox3.Size = New System.Drawing.Size(197, 26)
        Me.TextBox3.TabIndex = 9
        Me.TextBox3.Text = "Jan Michael Edson "
        '
        'Label13
        '
        Me.Label13.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.Label13.Location = New System.Drawing.Point(13, 97)
        Me.Label13.Name = "Label13"
        Me.Label13.Size = New System.Drawing.Size(114, 20)
        Me.Label13.TabIndex = 38
        Me.Label13.Text = "Customer Name"
        '
        'Panel1
        '
        Me.Panel1.BackColor = System.Drawing.SystemColors.GradientInactiveCaption
        Me.Panel1.Location = New System.Drawing.Point(127, 270)
        Me.Panel1.Name = "Panel1"
        Me.Panel1.Size = New System.Drawing.Size(513, 10)
        Me.Panel1.TabIndex = 40
        '
        'Panel2
        '
        Me.Panel2.BackColor = System.Drawing.SystemColors.GradientInactiveCaption
        Me.Panel2.Location = New System.Drawing.Point(128, 319)
        Me.Panel2.Name = "Panel2"
        Me.Panel2.Size = New System.Drawing.Size(512, 10)
        Me.Panel2.TabIndex = 41
        '
        'Panel3
        '
        Me.Panel3.BackColor = System.Drawing.SystemColors.GradientInactiveCaption
        Me.Panel3.Location = New System.Drawing.Point(125, 128)
        Me.Panel3.Name = "Panel3"
        Me.Panel3.Size = New System.Drawing.Size(511, 10)
        Me.Panel3.TabIndex = 42
        '
        'Panel4
        '
        Me.Panel4.BackColor = System.Drawing.SystemColors.GradientInactiveCaption
        Me.Panel4.Location = New System.Drawing.Point(122, 43)
        Me.Panel4.Name = "Panel4"
        Me.Panel4.Size = New System.Drawing.Size(521, 10)
        Me.Panel4.TabIndex = 43
        '
        'txt_translation
        '
        Me.txt_translation.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.txt_translation.Location = New System.Drawing.Point(19, 336)
        Me.txt_translation.Name = "txt_translation"
        Me.txt_translation.Size = New System.Drawing.Size(620, 56)
        Me.txt_translation.TabIndex = 44
        Me.txt_translation.Text = ""
        '
        'ComboMode
        '
        Me.ComboMode.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList
        Me.ComboMode.Font = New System.Drawing.Font("Tahoma", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.ComboMode.Items.AddRange(New Object() {"Text", "Sign(symbol)", "Abbreviation"})
        Me.ComboMode.Location = New System.Drawing.Point(510, 9)
        Me.ComboMode.Name = "ComboMode"
        Me.ComboMode.Size = New System.Drawing.Size(133, 24)
        Me.ComboMode.TabIndex = 45
        '
        'Label12
        '
        Me.Label12.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(178, Byte))
        Me.Label12.Location = New System.Drawing.Point(380, 12)
        Me.Label12.Name = "Label12"
        Me.Label12.Size = New System.Drawing.Size(110, 21)
        Me.Label12.TabIndex = 46
        Me.Label12.Text = "Currency Mode"
        '
        'LinkLabel2
        '
        Me.LinkLabel2.AutoSize = True
        Me.LinkLabel2.Font = New System.Drawing.Font("Tahoma", 24.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.LinkLabel2.Location = New System.Drawing.Point(244, 467)
        Me.LinkLabel2.Name = "LinkLabel2"
        Me.LinkLabel2.Size = New System.Drawing.Size(142, 39)
        Me.LinkLabel2.TabIndex = 50
        Me.LinkLabel2.TabStop = True
        Me.LinkLabel2.Text = "Buy Now"
        '
        'LinkLabel1
        '
        Me.LinkLabel1.AutoSize = True
        Me.LinkLabel1.Font = New System.Drawing.Font("Tahoma", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.LinkLabel1.Location = New System.Drawing.Point(18, 414)
        Me.LinkLabel1.Name = "LinkLabel1"
        Me.LinkLabel1.Size = New System.Drawing.Size(144, 19)
        Me.LinkLabel1.TabIndex = 49
        Me.LinkLabel1.TabStop = True
        Me.LinkLabel1.Text = "Product Homepage"
        '
        'LinkLabel3
        '
        Me.LinkLabel3.AutoSize = True
        Me.LinkLabel3.Font = New System.Drawing.Font("Tahoma", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.LinkLabel3.Location = New System.Drawing.Point(190, 414)
        Me.LinkLabel3.Name = "LinkLabel3"
        Me.LinkLabel3.Size = New System.Drawing.Size(131, 19)
        Me.LinkLabel3.TabIndex = 51
        Me.LinkLabel3.TabStop = True
        Me.LinkLabel3.Text = "Watch Screencast"
        '
        'LinkLabel4
        '
        Me.LinkLabel4.AutoSize = True
        Me.LinkLabel4.Font = New System.Drawing.Font("Tahoma", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.LinkLabel4.Location = New System.Drawing.Point(346, 414)
        Me.LinkLabel4.Name = "LinkLabel4"
        Me.LinkLabel4.Size = New System.Drawing.Size(116, 19)
        Me.LinkLabel4.TabIndex = 52
        Me.LinkLabel4.TabStop = True
        Me.LinkLabel4.Text = "Watch Youtube"
        '
        'LinkLabel5
        '
        Me.LinkLabel5.AutoSize = True
        Me.LinkLabel5.Font = New System.Drawing.Font("Tahoma", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.LinkLabel5.Location = New System.Drawing.Point(491, 414)
        Me.LinkLabel5.Name = "LinkLabel5"
        Me.LinkLabel5.Size = New System.Drawing.Size(148, 19)
        Me.LinkLabel5.TabIndex = 53
        Me.LinkLabel5.TabStop = True
        Me.LinkLabel5.Text = "Free Online Version"
        '
        'Form1
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 13.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(652, 524)
        Me.Controls.Add(Me.LinkLabel5)
        Me.Controls.Add(Me.LinkLabel4)
        Me.Controls.Add(Me.LinkLabel3)
        Me.Controls.Add(Me.LinkLabel2)
        Me.Controls.Add(Me.LinkLabel1)
        Me.Controls.Add(Me.ComboMode)
        Me.Controls.Add(Me.Label12)
        Me.Controls.Add(Me.txt_translation)
        Me.Controls.Add(Me.Panel4)
        Me.Controls.Add(Me.Panel3)
        Me.Controls.Add(Me.Panel2)
        Me.Controls.Add(Me.Panel1)
        Me.Controls.Add(Me.TextBox3)
        Me.Controls.Add(Me.Label13)
        Me.Controls.Add(Me.txt_bialldate)
        Me.Controls.Add(Me.Label11)
        Me.Controls.Add(Me.TextBox1)
        Me.Controls.Add(Me.Label10)
        Me.Controls.Add(Me.Label9)
        Me.Controls.Add(Me.txt_value)
        Me.Controls.Add(Me.txt_value03)
        Me.Controls.Add(Me.txt_value02)
        Me.Controls.Add(Me.txt_value01)
        Me.Controls.Add(Me.Label8)
        Me.Controls.Add(Me.txt_qty03)
        Me.Controls.Add(Me.txt_qty02)
        Me.Controls.Add(Me.txt_qty01)
        Me.Controls.Add(Me.txt_price03)
        Me.Controls.Add(Me.txt_price02)
        Me.Controls.Add(Me.Label7)
        Me.Controls.Add(Me.Label6)
        Me.Controls.Add(Me.Label5)
        Me.Controls.Add(Me.Label4)
        Me.Controls.Add(Me.Label3)
        Me.Controls.Add(Me.Combo_Language)
        Me.Controls.Add(Me.Label2)
        Me.Controls.Add(Me.Label1)
        Me.Controls.Add(Me.txt_price01)
        Me.Icon = CType(resources.GetObject("$this.Icon"), System.Drawing.Icon)
        Me.Name = "Form1"
        Me.Text = "Number 2 Text Tutorial"
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub
    Friend WithEvents Combo_Language As System.Windows.Forms.ComboBox
    Friend WithEvents Label2 As System.Windows.Forms.Label
    Friend WithEvents Label1 As System.Windows.Forms.Label
    Friend WithEvents txt_price01 As System.Windows.Forms.TextBox
    Friend WithEvents Label3 As System.Windows.Forms.Label
    Friend WithEvents Label4 As System.Windows.Forms.Label
    Friend WithEvents Label5 As System.Windows.Forms.Label
    Friend WithEvents Label6 As System.Windows.Forms.Label
    Friend WithEvents Label7 As System.Windows.Forms.Label
    Friend WithEvents txt_price02 As System.Windows.Forms.TextBox
    Friend WithEvents txt_price03 As System.Windows.Forms.TextBox
    Friend WithEvents txt_qty03 As System.Windows.Forms.TextBox
    Friend WithEvents txt_qty02 As System.Windows.Forms.TextBox
    Friend WithEvents txt_qty01 As System.Windows.Forms.TextBox
    Friend WithEvents txt_value03 As System.Windows.Forms.TextBox
    Friend WithEvents txt_value02 As System.Windows.Forms.TextBox
    Friend WithEvents txt_value01 As System.Windows.Forms.TextBox
    Friend WithEvents Label8 As System.Windows.Forms.Label
    Friend WithEvents txt_value As System.Windows.Forms.TextBox
    Friend WithEvents Label9 As System.Windows.Forms.Label
    Friend WithEvents Label10 As System.Windows.Forms.Label
    Friend WithEvents TextBox1 As System.Windows.Forms.TextBox
    Friend WithEvents txt_bialldate As System.Windows.Forms.TextBox
    Friend WithEvents Label11 As System.Windows.Forms.Label
    Friend WithEvents TextBox3 As System.Windows.Forms.TextBox
    Friend WithEvents Label13 As System.Windows.Forms.Label
    Friend WithEvents Panel1 As System.Windows.Forms.Panel
    Friend WithEvents Panel2 As System.Windows.Forms.Panel
    Friend WithEvents Panel3 As System.Windows.Forms.Panel
    Friend WithEvents Panel4 As System.Windows.Forms.Panel
    Friend WithEvents txt_translation As System.Windows.Forms.RichTextBox
    Friend WithEvents ComboMode As System.Windows.Forms.ComboBox
    Friend WithEvents Label12 As System.Windows.Forms.Label
    Friend WithEvents LinkLabel2 As System.Windows.Forms.LinkLabel
    Friend WithEvents LinkLabel1 As System.Windows.Forms.LinkLabel
    Friend WithEvents LinkLabel3 As System.Windows.Forms.LinkLabel
    Friend WithEvents LinkLabel4 As System.Windows.Forms.LinkLabel
    Friend WithEvents LinkLabel5 As System.Windows.Forms.LinkLabel

End Class
