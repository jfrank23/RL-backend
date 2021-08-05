import express, { Express, Request, Response } from "express";
import { Pool } from "pg";

export const updatePlayer = (req: Request, res: Response, pool: Pool) => {
  const player: Player = req.body;
  pool.query(
    `UPDATE players
      SET first_name = $1, last_name = $2
      WHERE player_id=$3`,
    [player.firstName, player.lastName, player.id],
    (error, response) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      }
      console.log("Updated player", player);
      res.sendStatus(200);
    }
  );
};

export const getPlayers = (req: Request, res: Response, pool: Pool) => {
  pool.query(`SELECT * FROM players`, (error, response) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    }
    res.status(200).json(response.rows);
  });
};

export const getPlayer = (req: Request, res: Response, pool: Pool) => {
  const playerId = req.params.id;
  pool.query(
    `SELECT * FROM players WHERE player_id = $1`,
    [playerId],
    (error, response) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      }
      res.status(200).json(response.rows[0]);
    }
  );
};

export const addPlayer = (req: Request, res: Response, pool: Pool) => {
  const player: Player = req.body;
  pool.query(
    `INSERT INTO players(first_name, last_name)
    Values($1, $2)
    RETURNING *`,
    [player.firstName, player.lastName],
    (error, response) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      }
      console.log("Inserted player", player);
      res.sendStatus(200);
    }
  );
};
