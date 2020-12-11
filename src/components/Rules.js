import React from "react";

const requestImageFile = require.context("../assets/other", true, /.png$/);
export default function Rules() {
  return (
    <div style={{ padding: 50 }}>
      <h1 id="playing-online">Online playing</h1>
      <h2 id="create-game">Making a game</h2>
      <p>
        This website allows you to play Beulah online. To do so you must enter your name to get into 
        the game lobby, and then have one person create a game with the number of players that will be 
        playing.
      </p>
      <p>
        Everyone who is playing will need to join on a seperate device, and enter their name. Then all 
        players will need to join the game. <b><em>Important Note: </em></b> the order that people join
        will be the game order. The first person to join will go first in the first round, the second 
        person to join will go first in the second round and so on, and within each round turns will pass 
        in that order as well.
      </p>

      <h2 id="play-game">Playing</h2>
      <h3 id="Starting-the-game">Starting the Game</h3>
      <p>
        Once the game is full, players will click play to start the game. A hand will automatically be 
        dealt to all players and the center, and the first person can take their turn.
      </p>

      <h3 id="Starting-the-game">Making Moves</h3>
      <p>
        When playing you will see the following screen:
      </p>
      <img className="playerScreen" src={requestImageFile(`./playerScreen.png`).default}></img>
      <p>
        On this screen you will see whose turn it is, and you will see the following sections:
      </p>
      <ul>
        <li>
          <b>Center Hand </b> This shows the hand in the center. Until someone takes it or everyone 
          passes these cards will be face down. To take cards from the middle you can click them or drag
          them to move them into the staging area.
        </li>
        <li>
          <b>Player Info </b> Your name and the number of chips you have remaining. Hover over this to 
          see the same information for all players.
        </li>
        <li>
          <b>Staging Area For Swaps </b> This is where you will place cards before swapping them. Click 
          or drag cards to move them in and out of the staging area. The left (or top on narrow screens) is 
          for cards staged to move from the center into your hand. The right (or bottom on narrow screens) 
          is for cards staged to move from your hand into the center.
        </li>
        <li>
          <b>Play Buttons </b>
          <ul>
            <li>
              <b>Clear Staging Area </b> This removes all cards from both staging areas and returns them 
              to where they were before.
            </li>
            <li>
              <b>Swap All Cards </b> This adds all cards to both staging areas from the center and your hand.
            </li>
            <li>
              <b>Confirm Swap </b> This swaps all cards from the staging areas to their destinations. If you 
              cannot make the swap then this button will not be clickable but will explain why you cannot make 
              the swap.
            </li>
            <li>
              <b>Pass Turn </b> This passes your turn. This button will only appear if it is your turn.
            </li>
            <li>
              <b>Knock! </b> This knocks and passes your turn. This button will only appear if it is your turn.
            </li>
          </ul>
        </li>
        <li>
          <b>Your Hand </b> This shows your hand. You can click or drag cards to move them into the staging area. 
          You may also want to drag cards within your hand to organize your hand.
        </li>
      </ul>
      <h3 id="end-round">Round Ending</h3>
      <p>
        Once a round ends (after a knock or a full cycle of passing). All hands will be revealed automatically. 
        Players can go around and tell others what hand they have. After that players can select who lost. Once two 
        players have picked the same losing player that player will automatically lose one chip (or two if they knocked), 
        and the next round will automatically start.
      </p>
      <p>
        In subsequent rounds chips will appear above the text announcing whose turn it is. These chips denote center chips, 
        so the number of chips determines the wild card. For simplicity once the number of center chips exceeds 13 only the 
        relevant chips are shown (i.e. if there are 15 chips in the center only two will be shown because twos are wild).
      </p>
      <h3 id="losing">Losing players</h3>
      <p>
        Once a player reaches 0 chips if they are the first player to do so they will automatically recieve the Beulah chip, 
        otherwise they have lost the game and their play area will go grey. They will still see the center cards, and all chip 
        counts, but will not have a hand, staging areas, or play buttons. They can remain online and select the losing player 
        following each round.
      </p>
      <p>
        Once all players except for 1 has lost the game will end and that player will win!
      </p>


      <h1 id="rules-of-Beulah">Rules of Beulah</h1>
      <p>
        <em>Beulah</em> is a card game for 2-9 players. The
        object of the game is to be the last person with at least one chip remaining.
      </p>

      <h2 id="cards">Cards and Hands</h2>
      <p>
        Beulah uses a standard, 52-card deck. It uses the typical poker hands which are, from high to low:
      </p>
      <ol>
        <li><b>Royal Flush </b> ten, jack, queen, king and ace of the same suit</li>
        <li><b>Five of a Kind </b> 5 cards of the same value (only possible with at least one wild)</li>
        <li><b>Straight Flush </b> 5 cards in order of the same suit</li>
        <li><b>Four of a Kind </b> 4 cards of the same value</li>
        <li><b>Full House </b> 3 cards of the same value, and 2 cards of the same value</li>
        <li><b>Flush </b> 5 cards of the same suit</li>
        <li><b>Straight </b> 5 cards in order</li>
        <li><b>Three of a Kind </b> 3 cards of the same value</li>
        <li><b>Two Pair </b> 2 cards of the same value and 2 more cards of the same value</li>
        <li><b>Pair </b> 2 cards of the same value</li>
        <li><b>High Card </b> None of the above</li>
      </ol>
      <p>
        Ties for worst hand are broken by card ordering 2,3,4,5,6,7,8,9,10,J,Q,K,A. If there is still a tie the player 
        using more wilds loses.
      </p>
      
      <h2 id="setup">Setup</h2>
      <p>
        Each player starts with 3 chips. The game consists of rounds. 
        To start each round each player is dealt five cards and five cards 
        are dealt face down to the center of the table.
      </p>

      <h2 id="playing-the-game">Playing the Game</h2>

      <h3 id="Starting-a-round">Starting a round</h3>
      <p>
        The starting player is the player who sits to the left of the dealer. The next 
        rounds dealer is the previous rounds starter. Begining with the starting player 
        and proceeding to the left each player has the choice of keeping the hand they 
        were dealt (by passing or knocking) or taking the entire face down center hand
        and placing their hand face up in its place. If all players pass on the opportunity 
        to take the center hand then it is flipped over and play proceeds.
      </p>

      <h3 id="standard-combinations">Rest of the round</h3>
      <p>
        Once the center has been flipped (either because it was taken or everyone passed) 
        players have 4 possible plays for each turn:
      </p>
      <ul>
        <li>
          <strong>Single card swap: </strong> Swapping a card from your hand to the middle, 
          and a card from the middle to your hand.
        </li>
        <li>
          <strong>Full hand swap: </strong> Swapping your entire hand to the middle, 
          and the entire middle to your hand.
        </li>
        <li>
          <strong>Pass: </strong> Do nothing and allow the next person to take a turn. 
          <em>Note: </em> if all players pass while the middle is face up then the round 
          will end immediately.
        </li>
        <li>
          <strong>Knock: </strong> When someone is confident in their hand they can knock 
          on their turn. This immediately ends their turn. Everyone else will get to take 
          one more turn then the round will end.
        </li>
      </ul>

      <h3 id="beating-a-combination">End of a round</h3>
      <p>
        When a round ends everyone reveals their hands and whoever has the <em>worst</em> hand 
        (by the poker hands listed above) loses 1 chip, unless they knocked in which case they 
        lose 2 chips.
      </p>

      <h2 id="losing">Losing</h2>
      <p>
        When a player loses their last chip, if no one else has lost their last chip they may 
        have the Beulah chip, otherwise they have lost and are out of the game.
      </p>
      <h2 id="wilds">Wilds</h2>
      <p>
        Following the first round the number of chips in the middle determines the wild card. One chip makes Aces wild, two chips 
        makes twos wild, and so on up to 13 chips which makes kings wild. After 13 chips this cycles back to Aces at 14 chips, twos 
        at 15 and so on.
      </p>
    </div>
  );
}
