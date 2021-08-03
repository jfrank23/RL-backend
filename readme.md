To run this 

npm install
npm run serve

It should automatically restart the server when you change index.ts

Database setup:
Ensure you have an env.json file in the RL-Backend/ folder
{
	"user": "postgres",
	"host": "localhost",
	"database": "rldata",
	"password": "YOUR PASSWORD HERE!",
	"port": 5432
}

psql --username postgres
create database rldata;