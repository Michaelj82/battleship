
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

        state.board.placeShip(state.shipShape)
        



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
        valid: true,



    }

    function placeShip(coordinates){
        for (let i = 0; i < coordinates.length; i++){
            for (let j = 0; i < coordinates[i].length; j++){
                if (coordinates[i][j] >= 7){
                    valid = false;
                    return false;
                }
            }
        }

        // if (valid == true){
        //     return('bruh')
        // }el
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