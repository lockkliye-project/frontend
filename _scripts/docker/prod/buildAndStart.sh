#!/bin/sh

sh ../createNetwork.sh && sh build.sh && docker-compose -f ../../../docker-compose.prod.yml up