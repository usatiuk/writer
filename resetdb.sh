#!/bin/bash

npm run typeorm -- schema:drop
npm run typeorm -- migration:run
