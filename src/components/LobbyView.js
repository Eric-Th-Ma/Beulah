/*
 * Copyright 2018 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from "react";
import GithubCorner from "react-github-corner";
import { Lobby } from "boardgame.io/react";
import { GAME_SERVER_URL, WEB_SERVER_URL, APP_PRODUCTION } from "../config";
import { default as BoardTienLen } from "../TienLenBoard";
import { default as GameTienLen } from "../TienLen";
import Rules from "./Rules";
import "./lobby.scss";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

GameTienLen.minPlayers = 1;
GameTienLen.maxPlayers = 9;// ERIC. change back to 4

const { protocol, hostname, port } = window.location;

let gameServer = APP_PRODUCTION
  ? `${protocol}//${hostname}:${port}`
  : GAME_SERVER_URL;
let lobbyServer = APP_PRODUCTION
  ? `${protocol}//${hostname}:${port}`
  : WEB_SERVER_URL;

const importedGames = [{ game: GameTienLen, board: BoardTienLen }];

function LobbyView() {
  return (
    <div style={{ padding: 0 }}>
      <Router>
        <div className="center-container">
          <button className="Beulah">
            <Link to="/">Beulah</Link>
          </button>
          <button className="Beulah">
            <Link to="/rules">Rules</Link>
          </button>
        </div>
        <Switch>
          <Route exact path="/">
            <div>
              {" "}
              <h1>Beulah</h1>
              <Lobby
                gameServer={gameServer}
                lobbyServer={lobbyServer}
                gameComponents={importedGames}
              />
            </div>
          </Route>
          <Route path="/rules">
            <Rules />
          </Route>
        </Switch>
      </Router>
      <GithubCorner
        href="https://github.com/Eric-Th-Ma/Beulah"
        octoColor="#f7f3dc"
        bannerColor="#bd4a39"
      />
    </div>
  );
}

export default LobbyView;
