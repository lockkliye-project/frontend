@ECHO OFF
SETLOCAL EnableDelayedExpansion

..\createNetwork.bat
:SUBROUTINE
FOR /f "delims=" %%a in (..\proxy.ini) DO SET %%a
IF "%http_proxy%" == "" (
    GOTO SUBROUTINE
)
IF "%https_proxy%" == "" (
    GOTO SUBROUTINE
)
ECHO Using %http_proxy% as http-proxy.
ECHO Using %https_proxy% as https-proxy.
docker-compose -f ..\..\..\docker-compose.prod.yml build --build-arg HTTP_PROXY=%http_proxy% --build-arg HTTPS_PROXY=%https_proxy%