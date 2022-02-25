[Setup]
#define DC_Path "Dynamic Components\Number2Text" 

AppName=DynamicComponents Number2Text v4.0
AppVerName=DC Number2Text v4.0
AppPublisher=EgyFirst Software
AppPublisherURL=http://www.egy1st.com
AppSupportURL=support@egyfirst.com
DefaultDirName={pf}\Dynamic Components\Number2Text\
DefaultGroupName=Dynamic Components\Number2Text\
LicenseFile=License.txt
OutputBaseFilename=num2text
VersionInfoCompany=EgyFirst Software
VersionInfoDescription=Dynamic Components Number2Text
VersionInfoVersion=4.0.0.0
InfoAfterFile=How to order.txt
RestartIfNeededByRun = True
WizardImageFile = Big02.bmp
WizardSmallImageFile=logo.bmp
BackColorDirection =toptobottom
BackColor = clBlue
BackColor2= clgreen
BackSolid=false
WindowStartMaximized=yes
WindowVisible=yes
WindowShowCaption=no
AppCopyright=EgyFirst Software 2005-2015 Copyright


[Tasks]
Name: "desktopicon"; Description: "Create a &desktop icon"; GroupDescription: "Additional icons:"; Flags: unchecked


[Files]
Source: "DC_Number2Text40.dll"; DestDir: "{sys}"
Source: "DC_Number2Text40.dll"; DestDir: "{app}"

; Application Files //////////////////////////////////////////////////////// 
Source: "DC Number2Text v4.0.chm"; DestDir: "{app}"
Source: "License.txt"; DestDir: "{app}"
Source: "License Agreement.doc"; DestDir: "{app}"
Source: "egyfirst.url"; DestDir: "{app}"
Source: "Order Now.url"; DestDir: "{app}"
Source: "egyfirst.png"   ; DestDir: "{app}"


; Executable Demo ////////////////////////////////////////////////////////
Source: "DC_Number2Text.exe"  ; DestDir: "{userdocs}\{#DC_Path}\Demo"
Source: "DC_Number2Text40.dll"; DestDir: "{userdocs}\{#DC_Path}\Demo"


; Visual Studio 2010 ////////////////////////////////////////////////////////
Source: "Tutorials\Visual Studio 2010\*.*"; DestDir: "{userdocs}\{#DC_Path}\Tutorials\Visual Studio 2010\"
Source: "Tutorials\Visual Studio 2010\My Project\*.*"; DestDir: "{userdocs}\{#DC_Path}\Tutorials\Visual Studio 2010\My Project"
Source: "DC_Number2Text40.dll"; DestDir: "{userdocs}\{#DC_Path}\Tutorials\Visual Studio 2010\bin\Debug"



[LangOptions]
LanguageName=English
LanguageID=$0409
DialogFontName=
DialogFontSize=8
WelcomeFontName=Verdana
WelcomeFontSize=12
TitleFontName=Arial
TitleFontSize=29
CopyrightFontName=Arial
CopyrightFontSize=10

[Icons]
Name: "{group}\Order Now"; Filename: "{app}\Order Now.url"
Name: "{group}\EgyFirst Software Homepage"; Filename: "{app}\egyfirst.url"
Name: "{group}\Help"; Filename: "{app}\DC Number2Text v4.0.chm"
Name: "{group}\Tutorials"; Filename: "{userdocs}\{#DC_Path}\Tutorials\"
Name: "{group}\Executable Demo"; Filename: "{userdocs}\{#DC_Path}\Demo\DC_Number2Text.exe"
Name: "{group}\Uninstall DC Number2Text"; Filename: "{app}\unins000.exe"
Name: "{userdesktop}\Number2Text Projects"; Filename: "{userdocs}\{#DC_Path}"; Tasks: desktopicon;  Flags: 
Name: "{userdesktop}\Number2Text Files"; Filename: "{app}"; Tasks: desktopicon; 

[Run]
; NOTE: The following entry contains an English phrase ("Launch"). You are free to translate it into another language if required.
Filename: "{userdocs}\{#DC_Path}\Demo\DC_Number2Text.exe"; Description: "launch Demo"; Flags: shellexec postinstall skipifsilent
Filename: "{userdocs}\{#DC_Path}\Tutorials\"; Description: "Tutorials"; Flags: shellexec postinstall skipifsilent
Filename: "{app}\DC Number2Text v4.0.chm"; Description: "Launch Help"; Flags: shellexec postinstall skipifsilent
;Filename: "{app}\egyfirst.url"; Description: "Visit Homepage"; Flags: shellexec postinstall skipifsilent

