#!/bin/sh

# Removes all docker networks, images, containers, volumes etc.
docker system prune -a --volumes