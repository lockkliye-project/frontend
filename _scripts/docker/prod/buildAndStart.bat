:: Turns off verbose-messages in command prompt
@ECHO OFF

:: Builds and starts the container
CALL build.bat
docker-compose -f ..\..\..\docker-compose.prod.yml up