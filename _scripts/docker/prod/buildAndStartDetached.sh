#!/bin/sh

# Builds and starts the container in detached mode
sh build.sh
docker-compose -f ../../../docker-compose.prod.yml up