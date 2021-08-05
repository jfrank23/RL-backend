import express, { Express, query, Request, Response } from "express";
import { Pool } from "pg";

export const createTeam = (req: Request, res: Response, pool: Pool) => {
  const team:Number[] = req.body;
  let query = '';
  if(team.length === 1){
      query = `INSERT INTO teams(player1)
      Values($1)
      RETURNING *`
  }else if(team.length === 2){
      query = `INSERT INTO teams(player1, player2)
      Values($1, $2)
      RETURNING *`
  } else if(team.length === 3){
      query = `INSERT INTO teams(player1, player2, player3)
      Values($1, $2, $3)
      RETURNING *`
  } else if(team.length === 4){
      query = `INSERT INTO teams(player1, player2, player3, player4)
      Values($1, $2, $3, $4)
      RETURNING *`
  }
  pool.query(
    query,
    [...team],
    (error, response) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      }
      console.log("Inserted ids", team);
      res.sendStatus(200).json(response.rows);
    }
  );
};

export const getTeams = (req: Request, res: Response, pool: Pool) => {
  pool.query(
    `SELECT * from teams`,
    (error, response) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      }
      res.sendStatus(200).json(response.rows);
    }
  );
};