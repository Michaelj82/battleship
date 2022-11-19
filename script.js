
module.exports = {};


//Ship fatory
const Ship = (length) => {

    let state = {
        length: length,
        timesHit: 0,
        sunk: false,

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

    return Object.assign(
        {state, hit}
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



    }

    function placeShip(direction){
        
    }

    // function attackOnBoard(coordinates){
    //     //format y,x

    // }

    // function receiveAttack(coordinates){

    // }

    return Object.assign(
        {state, }
    )


}



module.exports.Gameboard = Gameboard