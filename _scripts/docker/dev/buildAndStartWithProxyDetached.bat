:: Turns off verbose-messages in command prompt
@ECHO OFF

:: Builds and start the container with the custom file flag -f and proxy build arguments in detached mode
CALL buildWithProxy.bat
docker-compose -f ..\..\..\docker-compose.dev.yml up -d