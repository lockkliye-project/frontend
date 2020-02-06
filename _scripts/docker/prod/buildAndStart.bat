@ECHO OFF

..\createNetwork.bat && build.bat && docker-compose -f ..\..\..\docker-compose.prod.yml up