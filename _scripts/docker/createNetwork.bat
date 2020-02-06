@ECHO OFF
SETLOCAL EnableDelayedExpansion

docker network create VisionService
ECHO You can ignore warnings regarding an existing VisionService-Network