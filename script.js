
module.exports = {};


//Ship fatory
const Ship = (length) => {

    let state = {
        length: length,
        timesHit: 0,
        sunk: false,
        shipShape: [],
        board: Gameboard(),

    }

    function isSunk(){
        if (length === state.timesHit){
            state.sunk = true;
        }
    };

    function hit(){
        state.timesHit++
        isSunk()
    }

    function place(x, y, direction){

        if (direction == 'vertical'){
            for (let i = 0; i < state.length; i++){
                state.shipShape.push([y+i,x])
            }
        }else if (direction == 'horizontal'){
            for (let i = 0; i < state.length; i++){
                state.shipShape.push([y,x+i])

            }
        }
        



    }

    return Object.assign(
        {state, hit, place}
    )


};

module.exports.Ship = Ship



const Gameboard = () =>{

    let state = {
        board: [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
        ],
        hitCoordinates:[],
        missedCoordinates:[],



    }

    function placeShip(ship, x, y, direction){
        ship.place(x,y,direction)

        let valid = true;

        for (let i = 0; i < ship.state.shipShape.length; i++){
            for (let j = 0; j < ship.state.shipShape[i].length; j++){
                if (ship.state.shipShape[i][j] >= 7){

                    valid = false
                }

            }

        }

        if (valid == true){

            for (let i = 0; i < ship.state.shipShape.length; i++){
                let y = ship.state.shipShape[i][0]
                let x = ship.state.shipShape[i][1]

                if (state.board[y][x] == 1){
                    return Error('Overlaps a ship')
                }else{
                    state.board[y][x] = 1
                }

            }


        }else if (valid == false){
            return Error('Ship overextends map')
        }

    }

    // function attackOnBoard(coordinates){
    //     //format y,x

    // }

    // function receiveAttack(coordinates){

    // }

    return Object.assign(
        {state, placeShip}
    )


}



module.exports.Gameboard = Gameboard