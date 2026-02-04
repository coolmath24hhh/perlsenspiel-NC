const NOTES = [ "a", "b", "c", "d", "e", "f", "g" ];


let noteheld = -1;
let noteheight = 0;
let heldtime = 0;


//PZ infostuffs
const LATCH_COUNT = 7;
let latches = [];
let noteEffects = [];
let gameWon = false;



PS.init = function( system, options ) {



    PS.statusText("Lock-Breaker");
    PS.gridSize( 7, 10 );
    PS.gridColor( PS.COLOR_GRAY );


    //A
    PS.glyph (0,9,"a");

    //b
    PS.glyph (1,9,"s");

    //c
    PS.glyph (2,9,"d");

    //d
    PS.glyph (3,9,"f");

    //e
    PS.glyph (4,9,"g");

    //f
    PS.glyph (5,9,"h");

    //g
    PS.glyph (6,9,"j");

      
    //Da lOCK :3

    for (let x = 1; x < 6; x++){

    PS.color(x,7,PS.COLOR_YELLOW);
    PS.color(x,5,PS.COLOR_YELLOW);
    PS.color(2,6,PS.COLOR_YELLOW);
    PS.color(1,6,PS.COLOR_YELLOW);
    PS.color(4,6,PS.COLOR_YELLOW);
    PS.color(5,6,PS.COLOR_YELLOW);
    PS.color(3,6,PS.COLOR_BLACK);
    PS.color( 2, 4, { r : 184, g : 184, b : 184 } );
    PS.color( 4, 4, { r : 184, g : 184, b : 184 } );
    PS.color( 2, 3, { r : 184, g : 184, b : 184 } );
    PS.color( 4, 3, { r : 184, g : 184, b : 184 } );
    PS.color( 2, 2, { r : 184, g : 184, b : 184 } );
    PS.color( 4, 2, { r : 184, g : 184, b : 184 } );
    PS.color( 3, 2, { r : 184, g : 184, b : 184 } );
    }


    for ( let x = 0; x < 7; x++ ) {
        PS.color( 5, 9, PS.COLOR_WHITE );
        PS.color( x, 0,PS.COLOR_GRAY);
        
        
    }

setupPuzzle();
};





function setupPuzzle () {

    latches = [];
    noteEffects = [];
    gameWon = false;

    // garentau a win how do yiou spell garantee jeez :/
      for (let n = 0; n < 8; n++) {
        let effects = [ n ];
        let extraCount = PS.random(3) - 1;
          // Random latchessss

        while (effects.length < 1 + extraCount) {
            let r = PS.random(LATCH_COUNT) - 1;
            if (!effects.includes(r)) {
                effects.push(r);
            }
        }
        

        noteEffects[n] = effects;
    }



    // start puzzz so solvable 
    for (let i = 0; i < LATCH_COUNT; i++) {
        latches[i] = true;
    }

//SCRABMMBMLB
let scrambleSteps = 10;
    for (let s = 0; s < scrambleSteps; s++) {
        let n = PS.random(7) - 1;
        let effects = noteEffects[n];

        for (let j = 0; j < effects.length; j++) {
            let l = effects[j];
            latches[l] = !latches[l];
        }
    }

  for (let i = 0; i < LATCH_COUNT; i++) {
        PS.color(i, 8, latches[i] ? PS.COLOR_GREEN : PS.COLOR_RED);
    }
}




  

function applyLatchEffects (note) {

    if (gameWon) return;

    let effects = noteEffects[note];

    for (let i = 0; i < effects.length; i++) {
        let l = effects[i];
        latches[l] = !latches[l];
        PS.color(l, 8, latches[l] ? PS.COLOR_GREEN : PS.COLOR_RED);
    }

    checkWin();
}


function checkWin () {

    for (let i = 0; i < LATCH_COUNT; i++) {
        if (!latches[i]) return;
    }

    gameWon = true;
    PS.statusText("You WIN!!!! (press R to restart)");
    PS.audioPlay("fx_tada");
    PS.color( 4, 4,PS.COLOR_WHITE);



}



PS.keyDown = function(key,shift,ctrl,options ) {
    
// the reset button dun dun duhhhhh
if (key === 114) { // 'r'
    setupPuzzle();
    PS.statusText("Lock-Breaker");
    PS.color( 4, 4, { r : 184, g : 184, b : 184 } );
     PS.audioPlay("fx_pop");

    return;
}
//A1
       if (key === 97) {
        noteheld = 0;
        applyLatchEffects(noteheld);
        noteheight = 0;
        PS.audioPlay("fx_bloop");
        burstLine();
        return;
        }
//B1
        if (key === 115) {
    noteheld = 1;
    applyLatchEffects(noteheld);
    noteheight = 0;
    PS.audioPlay("fx_blip");
        burstLine();
    return
    }

//C1
       if (key === 100) {
    noteheld = 2;
    applyLatchEffects(noteheld);
    noteheight = 0;
    PS.audioPlay("fx_bloink");
        burstLine();
    return
    }


//d1
       if (key === 102){
    noteheld = 3;
    applyLatchEffects(noteheld);
    noteheight = 0;
    PS.audioPlay("fx_tweet");
        burstLine();
    return;
    }

//e1
       if (key === 103) {
    noteheld = 4;
    applyLatchEffects(noteheld);
    noteheight = 0;
    PS.audioPlay("fx_chirp2");
        burstLine();
    
    return
    }

//f1
       if (key === 104) {
    noteheld = 5;
    applyLatchEffects(noteheld);
    noteheight = 0;
    PS.audioPlay("fx_bucket" );
        burstLine();
    return
    }

//g1
        if (key === 106) {
    noteheld = 6;
    applyLatchEffects(noteheld);
    noteheight = 0;
    PS.audioPlay("fx_boop");
            burstLine();
    return
    }





}


PS.keyUp = function () {
    noteheld = -1;
    noteheight = 0;
};

function burstLine () {

    if ( noteheld === -1 ) return;

    let col = noteheld; 
    let y = 8;        

    PS.color(col, 9, PS.COLOR_BLACK);

    PS.timerStart(30, function () { // ~1 second
        PS.color(col, 9, PS.COLOR_WHITE);
        return false;
    });
}
