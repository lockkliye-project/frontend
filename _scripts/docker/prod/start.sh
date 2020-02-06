#!/bin/bash

sh ../createNetwork.sh && docker-compose -f ../../../docker-compose.prod.yml up