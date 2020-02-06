#!/bin/sh

sh ../createNetwork.sh && sh buildWithProxy.sh && docker-compose -f ../../../docker-compose.prod.yml up