#!/bin/sh

# Runs network creation script and builds the container with the custom file flag -f
sh ../createNetwork.sh
docker-compose -f ../../../docker-compose.dev.yml build