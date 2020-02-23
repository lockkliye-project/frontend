:: Turns off verbose-messages in command prompt
@ECHO OFF

:: Builds and starts the container in detached mode
CALL build.bat
docker-compose -f ..\..\..\docker-compose.prod.yml up -d