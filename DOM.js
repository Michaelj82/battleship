import{Ship} from './script.js'
import { Gameboard } from './script.js'
import { Player } from './script.js'

var Player1Board = Gameboard()
var Player2Board = Gameboard()

var Player1 = Player(NaN, Player1Board, 'Player One', 1, NaN)
var Player2 = Player(NaN, Player2Board, 'Player Two', 2, NaN)
Player1.state.enemy = Player2;
Player2.state.enemy = Player1;

var Player1Qualities = [Player1, Player1Board]
var Player2Qualities = [Player2, Player2Board]
Player1.state.qualities = Player1Qualities;
Player2.state.qualities = Player2Qualities;


var TOTALSHIPTILES = 10
var NUMBEROFSHIPS = 4

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

function refreshBoardItems(board, gameboard, status){

    if (status == 'selecting'){
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
    }else if (status == 'attacking'){
        let children = board.children;

        let num = 0


        for (let i = 0 ; i < gameboard.state.board.length; i++){
            for (let j = 0 ; j < gameboard.state.board[i].length; j++){
                if (gameboard.state.board[i][j] == 9){
                    children[num].classList.add('shipHit')

                    num ++
                }else if (gameboard.state.board[i][j] == 2){
                    children[num].classList.add('missedHit')
                    num ++

                }else{
                    num ++
                }
    
    
            }
        }
    }else if (status == 'yours'){
        let children = board.children;

        let num = 0
      
        for (let i =0 ; i < gameboard.state.board.length; i++){
            for (let j = 0 ; j < gameboard.state.board[i].length; j++){
                if (gameboard.state.board[i][j] == 0){
                    children[num].classList.remove('ship')

                    num ++
                }else if (gameboard.state.board[i][j] == 1){
                    children[num].classList.add('ship')
                    num ++

                }
                else if (gameboard.state.board[i][j] == 9){
                    children[num].classList.add('shipHit')

                    num ++
                }else if (gameboard.state.board[i][j] == 2){
                    children[num].classList.add('missedHit')
                    num ++

                }else{
                    num++
                }
    
            }
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

                    refreshBoardItems(board, gameboard, 'selecting')
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

                                gameboard.state.allShips.splice(k, 1);


                            }
                        }




                    }
                    refreshBoardItems(board, gameboard, 'selecting')

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
            // Vertical.disabled = true
            // Horizontal.disabled = true

        }
    
        Vertical.textContent = 'Vertical'
        Vertical.onclick = function(){
            SELECTION = true
            SELECTIONNUMBER = (i + 1)
            SELECTIONTYPE = 'vertical'
            // Vertical.disabled = true
            // Horizontal.disabled = true
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

        let allShipsPlaced = playerquals[1].state.allShips;


        let sum = allShipsPlaced.reduce(
            (first, second) => first + second.state.shipShape.length,
            0
            )
        
        
        //works but allows other combinations of 4 ships and 10 tiles,
        //make it eventually so that it only allows 4,3,2,1, but dont focus on that now
        if (sum == TOTALSHIPTILES && allShipsPlaced.length == NUMBEROFSHIPS){
            if (playerquals[0].state.playerNum == 1){
                playerSetUp(parent, Player2Qualities)
            }else if (playerquals[0].state.playerNum == 2){
                playerAttacking(parent, Player1Qualities)
            }
        }else{
            alert('You must have a 1 tile, 2 tile, 3 tile, and 4 tile ship')
        }

        
    }
    parent.appendChild(nextRound)

    



}

function makePlayingBoard(parent, gameboard, status, playerquals){
  
    if (status == 'attacking'){
        let board = document.createElement('div')
        board.setAttribute('id', 'shootingboard')
        parent.append(board)
        let total = 0
    
        for (let i = 0; i < (gameboard.state.board.length); i++){
            for(let j = 0 ; j < gameboard.state.board[i].length; j++){
                total ++
                let tile = document.createElement('div')
                tile.classList.add('tile')
                tile.setAttribute('id', `tile${total}`)
                tile.onclick = function(){
                    let test = gameboard.receiveAttack([i, j])
                    if (test instanceof Error){
                        alert('You have already shot there')
                    }else{
                        gameboard.receiveAttack([i, j])
                        refreshBoardItems(board, gameboard, 'attacking')

                        if (gameboard.state.allDead == true){
                            alert('Congrats You have Won!')
                        }else{
                            playerAttacking(parent, playerquals[0].state.enemy.state.qualities)
                        }
                    }
                    
    
                }
                board.appendChild(tile)
    
            }
        }
    }else if(status == 'yours'){
        let board = document.createElement('div')
        board.setAttribute('id', 'yourboard')
        parent.append(board)
        let total = 0
        for (let i = 0; i < (gameboard.state.board.length); i++){
            for(let j = 0 ; j < gameboard.state.board[i].length; j++){
                total ++
                let tile = document.createElement('div')
                tile.classList.add('tile')
                tile.setAttribute('id', `tile${total}`)

                board.appendChild(tile)
    
            }
        }
    }
    
}

function playerAttacking(parent, playerquals){
    clearDiv(parent)
    let header = document.createElement('h1');
    header.textContent = 'BattleShip!'
    parent.appendChild(header)

    let header2 = document.createElement('h3');
    header2.textContent = ` ${playerquals[0].state.name}, choose a tile to hit. ${playerquals[0].state.enemy.state.name}, look away`
    parent.appendChild(header2)

    makePlayingBoard(parent, playerquals[0].state.enemy.state.board, 'attacking', playerquals)
    let shootingboard = document.getElementById('shootingboard')
    refreshBoardItems(shootingboard, playerquals[0].state.enemy.state.board, 'attacking')

    let header3 = document.createElement('h3');
    header3.textContent = 'Your map below'
    parent.appendChild(header3)

    makePlayingBoard(parent, playerquals[1], 'yours', playerquals)
    let yourBoard = document.getElementById('yourboard')
    refreshBoardItems(yourBoard, playerquals[0].state.board, 'yours')


}







// let board = document.getElementById('board')
// board.style.opacity = 0

// let space = document.getElementById('tile1')
// let ship1 = document.createElement('div')
// ship1.classList.add('ship')
// space.appendChild(ship1)