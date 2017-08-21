#!/bin/sh -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --password "$POSTGRES_PASSWORD" <<-EOSQL
  CREATE DATABASE prod;
  CREATE DATABASE dev;
  CREATE DATABASE test;
EOSQL
