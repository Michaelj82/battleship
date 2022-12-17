import{Ship} from './script.js'
import { Gameboard } from './script.js'
import { Player } from './script.js'

var Player1Board = Gameboard()
var Player2Board = Gameboard()

var Player1 = Player(NaN, Player1Board)
var Player2 = Player(NaN, Player2Board)
Player1.state.enemy = Player2;
Player2.state.enemy = Player1;


var SELECTION = false
var SELECTIONNUMBER = 0
var SELECTIONTYPE = NaN

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
        playerOneSetUp(parent)
    }
    parent.appendChild(startGame)
}


mainPage(site)

function refreshBoardItems(board, gameboard){
    console.log('yo')
    let children = board.children;
    let num = 0
    for (let i =0 ; i < gameboard.state.board.length; i++){
        for (let j = 0 ; j < gameboard.state.board[i].length; j++){
            console.log(gameboard.state.board[i][j])
            if (gameboard.state.board[i][j] == 1){
                console.log(children)
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
                    SELECTION = false
                    let ship = Ship(SELECTIONNUMBER)
                    gameboard.placeShip(ship, i, j, SELECTIONTYPE)
                    console.log(gameboard.state.board)
                    refreshBoardItems(board, gameboard)
                }
            }

            board.appendChild(tile)
        
            // if (SELECTION == true){




                // for (let j = 0 ; j < SELECTIONNUMBER; j++){
                //     if (SELECTIONTYPE == 'Horizontal'){
                //     let selectTile = document.getElementById(`tile${i+j}`)
                //     selectTile.classList.add('ship')
                //     }else if (SELECTIONTYPE == 'Vertical'){
                //         let selectTile = document.getElementById(`tile${i+(j*7)}`)
                //         selectTile.classList.add('ship')
                //     }
                // }


                // SELECTION = false
            }

        }
    }



function playerOneSetUp(parent){
    clearDiv(parent)
    let header = document.createElement('h1');
    header.textContent = 'BattleShip!'
    parent.appendChild(header)
    let header2 = document.createElement('h3');
    header2.textContent = 'Player 1, put down your ships. Player 2, look away'
    parent.appendChild(header2)

    let allSelections = document.createElement('div');
    allSelections.setAttribute('id', 'allSelections')

    let numbers = ['One', 'Two', 'Three', 'Four'];
    for (let i = 0 ; i < 4 ; i++){
        let ShipSelect = document.createElement('div');
        ShipSelect.classList.add('shipSelection')
        ShipSelect.textContent = numbers[i]
    
    
        let Horizontal = document.createElement('button')
        Horizontal.textContent = 'Horizontal'
        Horizontal.onclick = function(){
            SELECTION = true
            SELECTIONNUMBER = (i + 1)
            SELECTIONTYPE = 'horizontal'
        }
    
        let Vertical = document.createElement('button')
        Vertical.textContent = 'Vertical'
        Vertical.onclick = function(){
            SELECTION = true
            SELECTIONNUMBER = (i + 1)
            SELECTIONTYPE = 'vertical'
        }
    


        ShipSelect.appendChild(Horizontal)
        ShipSelect.appendChild(Vertical)
    
        allSelections.appendChild(ShipSelect)
    
    }
    parent.appendChild(allSelections)
    
    makeBoard(parent, Player1Board)

}







// let board = document.getElementById('board')
// board.style.opacity = 0

// let space = document.getElementById('tile1')
// let ship1 = document.createElement('div')
// ship1.classList.add('ship')
// space.appendChild(ship1)