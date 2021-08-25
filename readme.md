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
\c rldata

drop table ranks;
drop table stats;
drop table games;
drop table teams;
drop table players;


CREATE TABLE players
(player_id serial PRIMARY KEY,
first_name text NULL,
last_name text NULL
);

CREATE TABLE teams
(team_id serial PRIMARY KEY,
player1 bigint NULL,
player2 bigint NULL,
player3 bigint NULL,
player4 bigint NULL,
CONSTRAINT fkp1 FOREIGN KEY (player1) REFERENCES players(player_id),
CONSTRAINT fkp2 FOREIGN KEY (player2) REFERENCES players(player_id),
CONSTRAINT fkp3 FOREIGN KEY (player3) REFERENCES players(player_id),
CONSTRAINT fkp4 FOREIGN KEY (player4) REFERENCES players(player_id)
);

CREATE TABLE games
(game_id serial PRIMARY KEY,
blue_team bigint NOT NULL,
red_team bigint NOT NULL,
game_time TIMESTAMP NULL,
red_score int NOT NULL,
blue_score int NOT NULL,
CONSTRAINT fkt1 FOREIGN KEY (blue_team) REFERENCES teams(team_id),
CONSTRAINT fkt2 FOREIGN KEY (red_team) REFERENCES teams(team_id)
);

CREATE TABLE stats
(stat_id serial PRIMARY KEY,
game_id bigint NULL,
team_id bigint NULL,
player_id bigint NULL,
goals int NULL,
assists int NULL,
saves int NULL,
shots int NULL,
CONSTRAINT fkg1 FOREIGN KEY (game_id) REFERENCES games(game_id),
CONSTRAINT fkt1 FOREIGN KEY (team_id) REFERENCES teams(team_id),
CONSTRAINT fkp1 FOREIGN KEY (player_id) REFERENCES players(player_id)
);

CREATE TABLE ranks
(rank_id serial PRIMARY KEY,
game_id bigint NULL,
team_id bigint NULL,
rank int NULL,
CONSTRAINT fkg1 FOREIGN KEY (game_id) REFERENCES games(game_id),
CONSTRAINT fkt1 FOREIGN KEY (team_id) REFERENCES teams(team_id)
);
