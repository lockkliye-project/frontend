:: Turns off verbose-messages in command prompt
@ECHO OFF

:: Causes variables to be expanded at execution time rather than at parse time
SETLOCAL EnableDelayedExpansion

:: Execute network creation script to ensure local docker-network is up and running
CALL ..\createNetwork

:: Creating jump point
:SUBROUTINE

:: Read lines in proxy.ini
FOR /f "delims=" %%a in (..\proxy.ini) DO SET %%a
IF "%http_proxy%" == "" (
    GOTO SUBROUTINE
)
IF "%https_proxy%" == "" (
    GOTO SUBROUTINE
)
ECHO Using %http_proxy% as http-proxy.
ECHO Using %https_proxy% as https-proxy.

:: Running docker-compose build argument with custom file flag -f and proxy build arguments
docker-compose -f ..\..\..\docker-compose.prod.yml build --build-arg HTTP_PROXY=%http_proxy% --build-arg HTTPS_PROXY=%https_proxy%