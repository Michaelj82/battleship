
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
    let ship = myModule.Ship(3);
    let board = myModule.Gameboard();

    board.placeShip(ship, 1,1, 'vertical')

    expect(board.state.board).toMatchObject([
        [0,0,0,0,0,0,0],
        [0,1,0,0,0,0,0],
        [0,1,0,0,0,0,0],
        [0,1,0,0,0,0,0],
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

    expect(board.placeShip(newShip, 0, 1, 'vertical')).toMatchObject(Error('Overlaps a ship'))

})

test('receiveAttack hits a ship', () =>{
    let ship = myModule.Ship(3);
    let board = myModule.Gameboard();

    board.placeShip(ship, 1,1, 'vertical')
    board.receiveAttack([2,1])
    board.receiveAttack([1,1])



    expect(ship.state.timesHit).toBe(2)
    expect(ship.state.sunk).toBe(false)

    expect(board.state.board).toMatchObject([
        [0,0,0,0,0,0,0],
        [0,9,0,0,0,0,0],
        [0,9,0,0,0,0,0],
        [0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]

    ])
})

test('missing a tile is prevalent on the board', () => {
    let ship = myModule.Ship(3);
    let board = myModule.Gameboard();

    board.placeShip(ship, 1,1, 'vertical')
    board.receiveAttack([4,4])

    expect(board.state.board).toMatchObject([
        [0,0,0,0,0,0,0],
        [0,1,0,0,0,0,0],
        [0,1,0,0,0,0,0],
        [0,1,0,0,0,0,0],
        [0,0,0,0,2,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]

    ])
})

test('Shooting at already shot tile is not allowed', () => {
    let ship = myModule.Ship(3);
    let board = myModule.Gameboard();

    board.placeShip(ship, 1,1, 'vertical')
    board.receiveAttack([1,1])

    expect(board.receiveAttack([1,1])).toMatchObject(Error('Already shot there'))
    expect(board.state.board).toMatchObject([
        [0,0,0,0,0,0,0],
        [0,9,0,0,0,0,0],
        [0,1,0,0,0,0,0],
        [0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]

    ])
})


test('Killing all ships return allDead true', () =>{
    let ship = myModule.Ship(2);
    let ship2 = myModule.Ship(2)
    let board = myModule.Gameboard();

    board.placeShip(ship, 1,1, 'vertical')
    board.receiveAttack([2,1])
    board.receiveAttack([1,1])

    board.placeShip(ship2, 4,1, 'horizontal')
    board.receiveAttack([4,1])
    board.receiveAttack([4,2])



    expect(board.state.allDead).toBe(true)
})


test('Can make multiple players and boardsand attack between them', () =>{
    let BoardPlayer1 = myModule.Gameboard()
    let BoardPlayer2 = myModule.Gameboard()


    let Player1 = myModule.Player(null, BoardPlayer1)
    let Player2 = myModule.Player(null, BoardPlayer2)
    Player1.state.enemy = Player2
    Player2.state.enemy = Player1


    let Player1Ship1 = myModule.Ship(2);
    let Player1Ship2 = myModule.Ship(2);

    let Player2Ship1 = myModule.Ship(2);
    let Player2Ship2 = myModule.Ship(2);

    BoardPlayer1.placeShip(Player1Ship1, 1,1, 'vertical')

    BoardPlayer1.placeShip(Player1Ship2, 4,4, 'horizontal')

    BoardPlayer2.placeShip(Player2Ship1, 1,1, 'vertical')

    BoardPlayer2.placeShip(Player2Ship2, 4,4, 'horizontal')


    Player1.attackEnemy([1,1])
    Player2.attackEnemy([1,1])

    expect(Player1.state.board.state.board).toMatchObject([
        [0,0,0,0,0,0,0],
        [0,9,0,0,0,0,0],
        [0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,1,1,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]

    ])

    expect(Player2.state.board.state.board).toMatchObject([
        [0,0,0,0,0,0,0],
        [0,9,0,0,0,0,0],
        [0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,1,1,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]

    ])


})