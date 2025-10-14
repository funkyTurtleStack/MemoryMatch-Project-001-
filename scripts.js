//what to do when page loads
let gameOver = false;
let tileOptions = ["garmond", "grindle", "hornet", "lace", "nuu", "phantom", "shakra", "sherma", "trobbio"];
let buttonReferences = [];
let tileIdentities = [];
let tileCompleteness = [];
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
            //tileclickHandler();
        }
        )
    }
)

//resets the game board with random tile locations (2 of each type)
//sets the values of buttonReferences, tileIdentities, and tileCompleteness
function gameShuffler()
{
    //setting buttonReferences
    buttonReferences = [];
    for(let i = 0; i < rows.length; i++)
    {
        let buttons = Array.from(rows[i].querySelectorAll('.tile'));
        buttonReferences = buttonReferences.concat(buttons);
    }
    console.log('buttonReferences is now: ', buttonReferences);

    //setting tileIdentities
    let selectedImages = [...tileOptions].sort(() => Math.random() - 0.5).slice(0, 8); //if more than 16 tiles are used later, change the 8 to buttonReferences.length
    selectedImages = selectedImages.concat(selectedImages);
    tileIdentities = selectedImages.sort(() => Math.random() - 0.5);
    console.log('tileIdentities are now: ', tileIdentities);

    //setting tileCompleteness
    tileCompleteness = new Array(buttonReferences.length).fill("incomplete");
    console.log('tileCompleteness is now: ', tileCompleteness);

    //ensure that all tiles are backside up
    buttonReferences.forEach(button => {
        button.className = 'tile';
        button.classList.add('silksong');
    });
    console.log('All tiles set to back side');
}

/*
//checks for matches and win states, then updates any relavent info.
function gameChecker()
{

}

function matchChecker()
{

}

//this is called whenever a tile is clicked
//flips a tile and decides what to do based on the number of flipped tiles
//just flips the tile if no other tiles are flipped
//if another tile is already flipped, then it calls game checker, then flips tiles back over
function tileClickHandler()
{

}
*/