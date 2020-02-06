#!/bin/bash

sh ../createNetwork.sh && docker-compose -f ../../../docker-compose.dev.yml up -d