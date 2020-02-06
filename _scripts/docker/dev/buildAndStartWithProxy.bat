@ECHO OFF

..\createNetwork.bat && buildWithProxy.bat && docker-compose -f ..\..\..\docker-compose.dev.yml up