
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

test('Making a ship and its length go out of bounds returns false', () => {
    let ship = myModule.Ship(4);
    expect(ship.place(5,5, 'vertical')).tobeFalsy();
})