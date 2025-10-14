//what to do when page loads
let gameOver = false;
let buttonReferences = [];
let tileIdentities = [];
let tileComplete = [];
let tilesFlipped = [];
let gameBoard, rows, tileFlipCount

document.addEventListener('DOMContentLoaded', function()
    {
        gameBoard = document.querySelector('.game-board');
        rows = document.querySelectorAll('.myRow');
        gameShuffler();

        gameBoard.addEventListener('click', (e) => 
        {
            const tile = e.target.closest('.tile');
            if (!tile) return;
            console.log(`Tile ${tile.id} clicked`);
            tileclickHandler();
        }
        )
    }
)

//resets the game board with random tile locations (2 of each type)
//sets the values of buttonReferences, tileIdentities, and tileComplete
gameShuffler()
{

}

//checks for matches and win states, then updates any relavent info.
gameChecker()
{

}

matchChecker()
{

}

//this is called whenever a tile is clicked
//flips a tile and decides what to do based on the number of flipped tiles
//just flips the tile if no other tiles are flipped
//if another tile is already flipped, then it calls game checker, then flips tiles back over
tileClickHandler()
{

}