a#!/bin/sh

# Builds and start the container with the custom file flag -f and proxy build arguments
sh buildWithProxy.sh
docker-compose -f ../../../docker-compose.prod.yml up