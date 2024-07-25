#!/bin/sh
# start.sh

# Aplique as migrations
npm run prisma:migrate

# Inicie a aplicação
npm run start
