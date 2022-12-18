import{Ship} from './script.js'
import { Gameboard } from './script.js'
import { Player } from './script.js'

var Player1Board = Gameboard()
var Player2Board = Gameboard()

var Player1 = Player(NaN, Player1Board, 'Player One', 1)
var Player2 = Player(NaN, Player2Board, 'Player Two', 2)
Player1.state.enemy = Player2;
Player2.state.enemy = Player1;

var Player1Qualities = [Player1, Player1Board]
var Player2Qualities = [Player2, Player2Board]



var SELECTION = false
var SELECTIONNUMBER = 0
var SELECTIONTYPE = NaN

var REMOVING = false

let site = document.getElementById('site')


function clearDiv(div){
    div.innerHTML = ''
}


function mainPage(parent){
    clearDiv(parent)
    let header = document.createElement('h1');
    header.textContent = 'BattleShip!'
    parent.appendChild(header)

    let startGame = document.createElement('button');
    startGame.textContent = 'Click me to play!'
    startGame.onclick= function(){
        playerSetUp(parent, Player1Qualities)
    }
    parent.appendChild(startGame)
}


mainPage(site)

function refreshBoardItems(board, gameboard){
    let children = board.children;
    let num = 0
    for (let i =0 ; i < gameboard.state.board.length; i++){
        for (let j = 0 ; j < gameboard.state.board[i].length; j++){
            if (gameboard.state.board[i][j] == 0){
                children[num].classList.remove('ship')
            }
            else if (gameboard.state.board[i][j] == 1){
                children[num].classList.add('ship')
            }


            num ++
        }
    }
}


function makeBoard(parent, gameboard){
    let board = document.createElement('div')
    board.setAttribute('id', 'board')
    parent.append(board)
    let total = 0

    for (let i = 0; i < (gameboard.state.board.length); i++){
        for(let j = 0 ; j < gameboard.state.board[i].length; j++){
            total ++
            let tile = document.createElement('div')
            tile.classList.add('tile')
            tile.setAttribute('id', `tile${total}`)
            tile.onclick = function(){
                if (SELECTION == true){
                    REMOVING = false
                    SELECTION = false
                    let ship = Ship(SELECTIONNUMBER)
                    gameboard.placeShip(ship, i, j, SELECTIONTYPE)

                    refreshBoardItems(board, gameboard)
                }
                if (REMOVING == true){
                    SELECTION = false
                    REMOVING = false


                    let coords = [i, j]

                    for (let k = 0; k < gameboard.state.allShips.length ; k++){
                        let singularShip = gameboard.state.allShips[k];

                        for (let m = 0; m < singularShip.state.shipShape.length; m ++){
                            let shipShapeValue = singularShip.state.shipShape[m]
                            if (JSON.stringify(shipShapeValue) == JSON.stringify(coords)){
                                let total = 0
                                for (let l = 0 ; l < singularShip.state.shipShape.length; l++){
                                    total++
                                    gameboard.state.board[singularShip.state.shipShape[l][0]][singularShip.state.shipShape[l][1]] = 0
                                }
                                let horz = document.getElementById(`Horizontal${total}`)
                                let vert = document.getElementById(`Vertical${total}`)

                                horz.disabled = false
                                vert.disabled = false


                            }
                        }




                    }
                    refreshBoardItems(board, gameboard)

                }
            }

            board.appendChild(tile)
        

            }

        }
    }



function playerSetUp(parent, playerquals){
    clearDiv(parent)
    let header = document.createElement('h1');
    header.textContent = 'BattleShip!'
    parent.appendChild(header)
    let header2 = document.createElement('h3');
    header2.textContent = ` ${playerquals[0].state.name}, put down your ships. ${playerquals[0].state.enemy.state.name}, look away`
    parent.appendChild(header2)

    let allSelections = document.createElement('div');
    allSelections.setAttribute('id', 'allSelections')

    let numbers = ['One', 'Two', 'Three', 'Four'];
    for (let i = 0 ; i < numbers.length ; i++){
        let ShipSelect = document.createElement('div');
        ShipSelect.classList.add('shipSelection')
        ShipSelect.textContent = numbers[i]
    
    
        let Horizontal = document.createElement('button')
        Horizontal.setAttribute('id', `Horizontal${i+1}`)
        let Vertical = document.createElement('button')
        Vertical.setAttribute('id', `Vertical${i+1}`)


        Horizontal.textContent = 'Horizontal'
        Horizontal.onclick = function(){
            SELECTION = true
            SELECTIONNUMBER = (i + 1)
            SELECTIONTYPE = 'horizontal'
            Vertical.disabled = true
            Horizontal.disabled = true

        }
    
        Vertical.textContent = 'Vertical'
        Vertical.onclick = function(){
            SELECTION = true
            SELECTIONNUMBER = (i + 1)
            SELECTIONTYPE = 'vertical'
            Vertical.disabled = true
            Horizontal.disabled = true
        }
    


        ShipSelect.appendChild(Horizontal)
        ShipSelect.appendChild(Vertical)
    
        allSelections.appendChild(ShipSelect)
    
    }
    parent.appendChild(allSelections)

    let removeButton = document.createElement('button')
    removeButton.textContent = 'Remove a Ship'
    removeButton.onclick = function(){
        REMOVING = true
    }


    parent.appendChild(removeButton)

    makeBoard(parent, playerquals[1])

    let nextRound = document.createElement('button');
    nextRound.textContent = 'Next Round'
    nextRound.onclick = function(){
        if (playerquals[0].state.playerNum == 1){
            playerSetUp(parent, Player2Qualities)
        }else if (playerquals[0].state.playerNum == 2){
            console.log('TIME TO PLAY')
        }
    }
    parent.appendChild(nextRound)

    



}







// let board = document.getElementById('board')
// board.style.opacity = 0

// let space = document.getElementById('tile1')
// let ship1 = document.createElement('div')
// ship1.classList.add('ship')
// space.appendChild(ship1)