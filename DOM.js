import{Ship} from './script.js'



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


function makeBoard(parent, sizeOfBoard){
    let board = document.createElement('div')
    board.setAttribute('id', 'board')
    parent.append(board)


    for (let i = 0; i < (sizeOfBoard * sizeOfBoard); i++){
        let tile = document.createElement('div')
        tile.classList.add('tile')
        tile.setAttribute('id', `tile${i}`)
        board.appendChild(tile)
    }

}


function playerOneSetUp(parent){
    clearDiv(parent)
    let header = document.createElement('h1');
    header.textContent = 'BattleShisdfp!'
    parent.appendChild(header)

}




// makeBoard(site, 7)




// let board = document.getElementById('board')
// board.style.opacity = 0

// let space = document.getElementById('tile1')
// let ship1 = document.createElement('div')
// ship1.classList.add('ship')
// space.appendChild(ship1)