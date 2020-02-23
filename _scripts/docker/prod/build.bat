:: Turns off verbose-messages in command prompt
@ECHO OFF

:: Runs network creation script and builds the container with the custom file flag -f
CALL ..\createNetwork.bat
docker-compose -f ..\..\..\docker-compose.prod.yml build