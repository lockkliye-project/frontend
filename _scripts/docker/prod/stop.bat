:: Turns off verbose-messages in command prompt
@ECHO OFF

:: Stops the container with the custom file flag -f
docker-compose -f ..\..\..\docker-compose.prod.yml down