//what to do when page loads
let gameOver = false;
let tileOptions = ["garmond", "grindle", "hornet", "lace", "nuu", "phantom", "shakra", "sherma", "trobbio"];
let buttonReferences = [];
let tileIdentities = [];
let tileState = []; //will say whether the tiles are "matched", "flipped", or "faceDown"
let tilesFlipped = [];
let gameBoard, rows, tileFlipCount, guesses, incorrectGuesses, newGame;

document.addEventListener('DOMContentLoaded', function()
    {
        gameBoard = document.querySelector('.game-board');
        rows = document.querySelectorAll('.myRow');
        guesses = document.querySelector('#guesses');
        incorrectGuesses = document.querySelector('#incorrectGuesses');
        newGame = document.querySelector('#newGameButton');
        gameShuffler();

        gameBoard.addEventListener('click', (e) =>
        {
            const tile = e.target.closest('.tile');
            if (!tile) return;
            console.log(`Tile ${tile.id} clicked`);
            tileClickHandler(tile);
        })

        newGame.addEventListener('click', (e) =>
        {
            gameShuffler();
        })
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

    //reset guesses and incorrectGuesses
    guesses.textContent = 0;
    incorrectGuesses.textContent = 0;
}

//check for matches and update tileState
//assumes two tiles are flipped
//corrects tile state at the end
function matchChecker()
{
    disableTileClicks();//stops more tiles from being clicked

    let firstTile, secondTile;

    for(let i = 0; i < tileState.length; i++)
    {
        if(tileState[i] == "flipped")
        {
            if(firstTile === undefined)
            {
                firstTile = i;
            }
            else if(secondTile === undefined)
            {
                secondTile = i;

                //this is where we check if it's a match or not
                if(tileIdentities[firstTile] == tileIdentities[secondTile]) //it's a match
                {
                    
                    tileState[firstTile] = 'matched';
                    tileState[secondTile] = 'matched';
                    console.log('Tiles ', buttonReferences[firstTile].id, ' and ', buttonReferences[secondTile].id, ' are marked as matched');

                    //wait before changing class to matched
                    setTimeout(() =>
                    {
                        //adds the matched class to the tiles
                        buttonReferences[firstTile].classList.add('matched')
                        console.log('the tile ', buttonReferences[firstTile].id, ' now has the classList values(', buttonReferences[firstTile].classList.value, ')');
                        buttonReferences[secondTile].classList.add('matched')
                        console.log('the tile ', buttonReferences[secondTile].id, ' now has the classList values(', buttonReferences[secondTile].classList.value, ')');

                        //update guesses count
                        guesses.textContent = parseInt(guesses.textContent) + 1;
                    }, 500);
                    setTimeout(() => {
                        enableTileClicks();
                    }, 700);
                }
                else //it's not a match
                {
                    tileState[firstTile] = 'faceDown';
                    tileState[secondTile] = 'faceDown';
                    console.log('Tiles ', buttonReferences[firstTile].id, ' and ', buttonReferences[secondTile].id, ' are not a match, and marked as faceDown');

                    //wait before flipping tiles back over
                    setTimeout(() =>
                    {
                        //flip tiles back over
                        buttonReferences[firstTile].className = 'tile';
                        buttonReferences[firstTile].classList.add('silksong')
                        console.log('the tile ', buttonReferences[firstTile].id, ' now has the classList values(', buttonReferences[firstTile].classList.value, ')');
                        buttonReferences[secondTile].className = 'tile';
                        buttonReferences[secondTile].classList.add('silksong')
                        console.log('the tile ', buttonReferences[secondTile].id, ' now has the classList values(', buttonReferences[secondTile].classList.value, ')');

                        //update guesses and incorrectGuesses counts
                        guesses.textContent = parseInt(guesses.textContent) + 1;
                        incorrectGuesses.textContent = parseInt(incorrectGuesses.textContent) + 1;
                    }, 1000);
                    setTimeout(() => {
                        enableTileClicks();
                    }, 1200);
                }
                return;
            }
            else
            {
                console.error("There was an error with matchChecker");
            }
        }
    }
    //enables tile clicks again in the case of an error
    setTimeout(() => {
        enableTileClicks();
    }, 1200)
}

//checks for a win state
function checkWinState()
{
    for(let i = 0; i < buttonReferences.length; i++)
    {
        if(tileState[i] != 'matched')
        {
            console.log('game continues');
            return;
        }
    }
    console.log('game won');
    setTimeout(() => alert('You Win'), 1000);
}

//this is called whenever a tile is clicked
//flips a tile and decides what to do based on the number of flipped tiles
//just flips the tile if no other tiles are flipped
//if another tile is already flipped, then it calls game checker, then flips tiles back over
function tileClickHandler(tile)
{
    targetIndex = buttonReferences.indexOf(tile);

    //check that tile isn't already clicked or matched
    if(tileState[targetIndex] == 'faceDown')
    {
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
    else if(tileState[targetIndex] == 'matched')
    {
        console.log('tile is already matched, can not choose this tile');
    }
    else if(tileState[targetIndex] == 'flipped')
    {
        console.log('tile is already flipped, can not choose this tile');
    }
    else
    {
        console.error('there was an error with tileClickHandler. Could not recognize tile state');
    }
}

function disableTileClicks()
{
    gameBoard.style.pointerEvents = 'none';
}

function enableTileClicks()
{
    gameBoard.style.pointerEvents = 'auto';
}