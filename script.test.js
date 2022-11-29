
let myModule = require('./script.js')

//Ship tests


test('hit increases timesHit', () =>{

    let ship = myModule.Ship(3);
    ship.hit()
    expect(ship.state.timesHit).toBe(1);

});

test('Having timesHit equal to length makes ship sunk', () =>{
    let ship = myModule.Ship(2);
    ship.hit()
    ship.hit()
    expect(ship.state.timesHit).toBe(2);
    expect(ship.state.sunk).toBe(true);


})


test('Making ship with length makes right direction plus right length', () =>{

    let horizontalShip = myModule.Ship(3);
    horizontalShip.place(2,2, 'horizontal');
    expect(horizontalShip.state.shipShape).toMatchObject([[2,2],[2,3],[2,4]])
})

test('Making a ship and its length go out of bounds returns Error', () => {
    let ship = myModule.Ship(4);

    let board = myModule.Gameboard();

    expect(board.placeShip(ship, 6, 6, 'vertical')).toMatchObject(Error('Ship overextends map'))

})

test('If you place down a ship it sets the Gameboards coordinate to 1', () =>{
    let ship = myModule.Ship(2);
    let board = myModule.Gameboard();

    board.placeShip(ship, 1,1, 'vertical')

    expect(board.state.board).toMatchObject([
        [0,0,0,0,0,0,0],
        [0,1,0,0,0,0,0],
        [0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ])

})


test('Cant overlap ships', () =>{
    let ship = myModule.Ship(2);
    let board = myModule.Gameboard();

    board.placeShip(ship, 1,1, 'vertical')

    let newShip = myModule.Ship(3)

    board.placeShip

    expect(board.placeShip(newShip, 0, 1, 'vertical')).toMatchObject(Error('Overlaps a ship'))

})