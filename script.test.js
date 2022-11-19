
let myModule = require('./script.js')

//Ship tests


test('hit increases timesHit', () =>{

    let ship = myModule.Ship(3);
    ship.hit()
    expect(ship.state.timesHit).toBe(1);

});

test('Having timesHit equal to length makes ship sunk', () =>{
    let ship = myModule.Ship(1);
    ship.hit()
    expect(ship.state.timesHit).toBe(1);
    expect(ship.state.sunk).toBe(true);


})