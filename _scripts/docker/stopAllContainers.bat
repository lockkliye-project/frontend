:: Turns off verbose-messages in command prompt
@ECHO OFF

FOR /f "tokens=*" %%i IN ('docker ps -q') DO docker stop %%i