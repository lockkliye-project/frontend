@ECHO OFF
SETLOCAL EnableDelayedExpansion

..\createNetwork.bat && docker-compose -f ..\..\..\docker-compose.prod.yml build