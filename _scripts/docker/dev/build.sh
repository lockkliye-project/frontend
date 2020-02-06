#!/bin/sh

sh ../createNetwork.sh && docker-compose -f ../../../docker-compose.dev.yml build