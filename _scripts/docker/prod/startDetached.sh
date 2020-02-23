#!/bin/bash

# Runs network creation script and starts the container with the custom file flag -f in detached mode
sh ../createNetwork.sh
docker-compose -f ../../../docker-compose.prod.yml up -d