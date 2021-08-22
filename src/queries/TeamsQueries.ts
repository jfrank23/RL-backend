import { Request, Response } from "express";
import { Pool } from "pg";

export const createTeam = (req: Request, res: Response, pool: Pool) => {
  const team: Number[] = req.body;
  let query = "";
  if (team.length === 1) {
    query = `INSERT INTO teams(player1)
      Values($1)
      RETURNING *`;
  } else if (team.length === 2) {
    query = `INSERT INTO teams(player1, player2)
      Values($1, $2)
      RETURNING *`;
  } else if (team.length === 3) {
    query = `INSERT INTO teams(player1, player2, player3)
      Values($1, $2, $3)
      RETURNING *`;
  } else if (team.length === 4) {
    query = `INSERT INTO teams(player1, player2, player3, player4)
      Values($1, $2, $3, $4)
      RETURNING *`;
  } else {
    return res.sendStatus(400);
  }
  pool.query(query, [...team], (error, response) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    }
    console.log("Inserted ids", team);
    return res.status(200).json(response.rows);
  });
};

export const getTeams = (req: Request, res: Response, pool: Pool) => {
  pool.query(`SELECT * from teams`, (error, response) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    }
    return res.status(200).json(response.rows);
  });
};

export const getSinglePlayersTeams = (
  req: Request,
  res: Response,
  pool: Pool
) => {
  const playerId = req.params.id;
  pool.query(
    `select * from teams
  where player1=$1 or player2=$1 or player3=$1 or player4=$1`,
    [playerId],
    (error, response) => {
      if (error) {
        console.log(error);
        return res.sendStatus(500);
      }
      return res.status(200).json(response.rows);
    }
  );
};

export const getTeamsById = (req: Request, res: Response, pool: Pool) => {
  const teamId = req.params.id;
  pool.query(
    `SELECT * from teams
  WHERE team_id = $1`,
    [teamId],
    (error, response) => {
      if (error) {
        console.log(error);
        return res.sendStatus(500);
      }
      return res.status(200).json(response.rows[0]);
    }
  );
};
