:: Turns off verbose-messages in command prompt
@ECHO OFF

:: Removes all docker networks, images, containers, volumes etc.
docker system prune -a --volumes