//what to do when page loads
let gameOver = false;
let tileOptions = ["garmond", "grindle", "hornet", "lace", "nuu", "phantom", "shakra", "sherma", "trobbio"];
let buttonReferences = [];
let tileIdentities = [];
let tileState = []; //will say whether the tiles are "matched", "flipped", or "faceDown"
let tilesFlipped = [];
let gameBoard, rows, tileFlipCount;

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
            tileClickHandler(tile);
        }
        )
    }
)

//resets the game board with random tile locations (2 of each type)
//sets the values of buttonReferences, tileIdentities, and tileState
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

    //setting tileState
    tileState = new Array(buttonReferences.length).fill("faceDown");
    console.log('tileState is now: ', tileState);

    //ensure that all tiles are backside up and tileFlipCount is 0
    buttonReferences.forEach(button => {
        button.className = 'tile';
        button.classList.add('silksong');
    });
    tileFlipCount = 0;
    console.log('All tiles set to back side and tileFlipCount is 0');
}

//check for matches and update tileState
//assumes two tiles are flipped
function matchChecker()
{
    let firstTile, secondTile;

    for(let i = 0; i < tileState.length; i++)
    {
        if(tileState[i] == "flipped")
        {
            if(!firstTile)
            {
                firstTile = i;
            }
            else if(!secondTile)
            {
                secondTile = i;
                //////////////////////////////////
                // this is where we check if it's a match or not
                if(tileIdentities[firstTile] == tileIdentities[secondTile])
                {
                    tileState[firstTile] = 'matched';
                    tileState[secondTile] = 'matched';
                    console.log('Tiles ', buttonReferences[firstTile].id, ' and ', buttonReferences[secondTile].id, ' are marked as matched');
                }
                else
                {
                    tileState[firstTile] = 'faceDown';
                    tileState[secondTile] = 'faceDown';
                    console.log('Tiles ', buttonReferences[firstTile].id, ' and ', buttonReferences[secondTile].id, ' are not a match, and marked as faceDown');
                }
            }
            else
            {
                console.log("There was an error with matchChecker");
            }
        }
    }
}

//checks for a win state
function checkWinState()
{

}

//this is called whenever a tile is clicked
//flips a tile and decides what to do based on the number of flipped tiles
//just flips the tile if no other tiles are flipped
//if another tile is already flipped, then it calls game checker, then flips tiles back over
function tileClickHandler(tile)
{
    targetIndex = buttonReferences.indexOf(tile);

    //flip the tile
    tile.className = 'tile';
    tile.classList.add(tileIdentities[targetIndex]);

    //set tileState as flipped
    tileState[targetIndex] = 'flipped'
    console.log("tile states are now: ", tileState)
    console.log('the tile ', tile.id, ' now has the classList values(', tile.classList.value, ')');

    //check how many tiles are flipped and if another is already flipped, then check match
    if(tileFlipCount > 0)
    {
        console.log('second tile flipped');
        matchChecker();
        checkWinState();

        tileFlipCount = 0;
    }
    else
    {
        console.log('first tile flipped');
        tileFlipCount ++;
    }
    console.log("tile states are now: ", tileState);
}