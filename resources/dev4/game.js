let movesLeft = Infinity;
let levelRules = [];
let levelScrambles = [];
let currentLevel = 0;
let showNext = false;

const LEVELS = [];

// Eas lvls like 0-9
for (let i = 0; i < 10; i++) {
    LEVELS.push({
        difficulty: "easy",
        moves: 100,
        scramble: 8,
        extraMax: 1
    });
}

// Med um levls uh 10-19
for (let i = 0; i < 10; i++) {
    LEVELS.push({
        difficulty: "medium",
        moves: 50,
        scramble: 12,
        extraMax: 2
    });
}

// the hardest of hards 20-29
for (let i = 0; i < 10; i++) {
    LEVELS.push({
        difficulty: "hard",
        moves: 25,
        scramble: 10,
        extraMax: 2
    });
}





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
    showNext = false;
movesLeft = LEVELS[currentLevel].moves;
    // clear da button
    PS.glyph(6, 0, "");
    PS.color(6, 0, PS.COLOR_GRAY);

 // 1) Da rules (its a refrence)
if (!levelRules[currentLevel]) {

    levelRules[currentLevel] = [];

    for (let n = 0; n < 7; n++) {
        let effects = [ n ];
        let extraCount = PS.random(LEVELS[currentLevel].extraMax + 1);

        while (effects.length < 1 + extraCount) {
            let r = PS.random(LATCH_COUNT) - 1;
            if (!effects.includes(r)) effects.push(r);
        }

        levelRules[currentLevel][n] = effects;
    }
}

noteEffects = levelRules[currentLevel];


    // 2) START puzzzz SOLVED
    for (let i = 0; i < LATCH_COUNT; i++) {
        latches[i] = true;
    }

    // 3) DEFine the stuff idk i just wokr herew
if (!levelScrambles[currentLevel]) {
    levelScrambles[currentLevel] = [];

    for (let s = 0; s < LEVELS[currentLevel].scramble; s++) {
        levelScrambles[currentLevel].push(PS.random(7) - 1);
    }
}

// APPLY SCRAMBLE wooooo
for (let s = 0; s < levelScrambles[currentLevel].length; s++) {
    let n = levelScrambles[currentLevel][s];
    let effects = noteEffects[n];

    for (let j = 0; j < effects.length; j++) {
        let l = effects[j];
        latches[l] = !latches[l];
    }
}

    // 4) DRAW the LATCHES
    for (let i = 0; i < LATCH_COUNT; i++) {
        PS.color(i, 8, latches[i] ? PS.COLOR_GREEN : PS.COLOR_RED);
    }

    PS.statusText(
    "Level " + (currentLevel + 1) +
    " (" + LEVELS[currentLevel].difficulty + ")" +
    " — Moves: " + movesLeft
);

}





  

function applyLatchEffects (note) {

    if (gameWon) return;

    // consume a move yum
    movesLeft--;

    if (movesLeft < 0) return;

    PS.statusText(
        "Level " + (currentLevel + 1) +
        " (" + LEVELS[currentLevel].difficulty + ")" +
        " — Moves: " + movesLeft
    );

    let effects = noteEffects[note];

    for (let i = 0; i < effects.length; i++) {
        let l = effects[i];
        latches[l] = !latches[l];
        PS.color(l, 8, latches[l] ? PS.COLOR_GREEN : PS.COLOR_RED);
    }

       // check for win FIRST please
    checkWin();

    // failed must reset
      if (!gameWon && movesLeft === 0) {
        PS.audioPlay("fx_squawk");
        setupPuzzle(); // retry SAME level okay
    }

}



function checkWin () {

    for (let i = 0; i < LATCH_COUNT; i++) {
        if (!latches[i]) return;
    }

    gameWon = true;
    showNext = true;

    PS.statusText("Level " + (currentLevel + 1) + " complete!");
    PS.audioPlay("fx_tada");

    // nxt
    PS.color(6, 0, PS.COLOR_GREEN);
    PS.glyph(6, 0, "▶");
    PS.glyphColor(6, 0, PS.COLOR_BLACK);
}




PS.keyDown = function(key,shift,ctrl,options ) {
    
// the reset button dun dun duhhhhh
if (key === 114) { // 'r'
    setupPuzzle();      
    PS.statusText("Lock-Breaker");
    PS.color(4, 4, { r : 184, g : 184, b : 184 });
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

    PS.timerStart(30, function () { 
        PS.color(col, 9, PS.COLOR_WHITE);
        return false;
    });
}

PS.touch = function (x, y) {

    if (showNext && x === 6 && y === 0) {

        if (currentLevel < LEVELS.length - 1) {
            currentLevel++;
            setupPuzzle();
            PS.audioPlay("fx_click");
        } else {
            PS.statusText("All levels complete!");
        }
    }
};
