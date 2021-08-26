import express, { Express, query, Request, Response } from "express";
import { Pool } from "pg";

export const createRank = (req: Request, res: Response, pool: Pool) => {
  const rank: Rank = req.body;
  if (!rank.teamId || !rank.gameId || !rank.rank) {
    return res.sendStatus(400);
  }
  pool.query(
    `INSERT INTO ranks(game_id, team_id, rank)
    values($1, $2, $3)
    RETURNING *`,
    [rank.gameId, rank.teamId, rank.rank],
    (error, response) => {
      if (error) {
        console.log(error);
        return res.sendStatus(500);
      }
      console.log("Inserted rank", rank);
      return res.sendStatus(200);
    }
  );
};

export const getRanks = (req: Request, res: Response, pool: Pool) => {
  pool.query(`SELECT * from ranks`, (error, response) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    }
    return res.status(200).json(response.rows);
  });
};

export const getRanksByTeam = (req: Request, res: Response, pool: Pool) => {
  const teamId = req.params.id;
  pool.query(
    `SELECT * from ranks
  WHERE team_id = $1`,
    [teamId],
    (error, response) => {
      if (error) {
        console.log(error);
        return res.sendStatus(500);
      }
      return res.status(200).json(response.rows);
    }
  );
};

export const getMostRecentRankByTeam = (
  req: Request,
  res: Response,
  pool: Pool
) => {
  const teamId = req.params.id;
  pool.query(
    `select ranks.rank_id, ranks.game_id, ranks.rank, ranks.team_id
    from games
    left join ranks
    on ranks.game_id = games.game_id
    where ranks.team_id = $1
    order by game_time DESC; `,
    [teamId],
    (error, response) => {
      if (error) {
        console.log(error);
        return res.sendStatus(500);
      }
      console.log(response.rows);
      return res.status(200).json(response.rows[0]);
    }
  );
};
