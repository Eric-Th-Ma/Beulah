Personal project for running the card game Beulah

## CREDIT

Most of this code was taken and addapted from a project for a different card game that can be found [here](https://github.com/nguyenank/tien-len).

The playing cards are by Adrian Kennard and can be found (and customised) [here](https://www.me.uk/cards/).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br /> Be sure to change `APP_PRODUCTION` to `false` in `src/config.js`.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You will also need to run `npm run-script server` to get the web server. By default, the web server is on port 8000. The game server and web server ports can be changed in `src/config.js`.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run-script lint` and `npm run-script format`

Lint and format code respectively.

## Deployment

To deploy any modifications. First change `APP_PRODUCTION` to `true`, then commit all changes and run `git push heroku main`. Changes will be deployed [here](https://beulah-game.herokuapp.com/)
