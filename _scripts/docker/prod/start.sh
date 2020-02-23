#!/bin/bash

# Runs network creation script and starts the container with the custom file flag -f
sh ../createNetwork.sh
docker-compose -f ../../../docker-compose.prod.yml up