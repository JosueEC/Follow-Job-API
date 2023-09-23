-- CREATE THE DATABASE followMyJob_db IF NOT EXISTS
SELECT 'CREATE DATABASE followMyJob_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'followMyJob_db')\gexec