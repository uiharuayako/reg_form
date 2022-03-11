cd /d %~dp0
del  /f /s /q docs\*
xcopy userListOf5.json docs
xcopy dist\* docs /s/y