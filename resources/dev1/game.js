const NOTES = [ "a", "b", "c", "d", "e", "f", "g" ];
const SOUNDS = [
    "piano_a4",
    "piano_b4",
    "piano_c5",
    "piano_d5",
    "piano_e5",
    "piano_f5",
    "piano_g5"
];

let noteheld = -1;
let noteheight = 0;
let heldtime = 0;



PS.init = function( system, options ) {

    PS.gridSize( 7, 8 );
    PS.gridColor( PS.COLOR_BLACK );

    for ( let x = 0; x < 7; x++ ) {
        PS.color( x, 7, PS.COLOR_WHITE );
        PS.border( x, 0, 2 );
        PS.borderColor( x, 0, PS.COLOR_GRAY );
        PS.glyph( x, 0, NOTES[ x ].toUpperCase() );
        PS.glyphColor( x, 0, PS.COLOR_BLACK );
    }
    for ( let i = 0; i < SOUNDS.length; i++ ) {
        PS.audioLoad( SOUNDS[ i ] );
    }

};


PS.keyDown = function(key,shift,ctrl,options ) {
//A
       if (key === 97) {
        noteheld = 0;
        noteheight = 0;
        PS.audioPlay("piano_a4");
        heldtime = PS.timerStart(1,growLine);
        return;
        }
//B
        if (key === 98) {
    noteheld = 1;
    noteheight = 0;
    PS.audioPlay("piano_b4");
    heldtime = PS.timerStart(1,growLine);
    return
    }
//C
       if (key === 99) {
    noteheld = 2;
    noteheight = 0;
    PS.audioPlay("piano_c5");
    heldtime = PS.timerStart(1,growLine);
    return
    }
//d
       if (key === 100){
    noteheld = 3;
    noteheight = 0;
    PS.audioPlay("piano_d5");
    heldtime = PS.timerStart(1,growLine);
    return
    }
//e
       if (key === 101) {
    noteheld = 4;
    noteheight = 0;
    PS.audioPlay("piano_e5");
    heldtime = PS.timerStart(1,growLine);
    
    return
    }
//f
       if (key === 102) {
    noteheld = 5;
    noteheight = 0;
    PS.audioPlay("piano_f5" );
    heldtime = PS.timerStart(1,growLine);
    return
    }
//g
        if (key === 103) {
    noteheld = 6;
    noteheight = 0;
    PS.audioPlay("piano_g5");
    heldtime = PS.timerStart(1,growLine);
    return
    }
}



PS.keyUp = function (key,shift,crtl,options) {

 if ( noteheld === -1 ) return;

    PS.timerStop( heldtime );
    heldtime = 0;
    for ( let i = 1; i <= noteheight; i++ ) {
        PS.color( noteheld, 7 - i, PS.COLOR_WHITE );
    }

    noteheld = -1;
    noteheight = 0;
}











PS.touch = function( x, y, data, options ) {

    if ( y !== 7 ) return;

    noteheld = x;
    noteheight = 0;

    PS.audioPlay( SOUNDS[ x ] );
    PS.statusText( "Note: " + NOTES[ x ].toUpperCase() );

    heldtime = PS.timerStart( 1, growLine );
    
};


function growLine () {
    
    if ( noteheld === -1 ) return;


    if ( noteheight < 7 ) {
        noteheight++;
        PS.color( noteheld, 7 - noteheight, PS.COLOR_GREEN );
    }

    
}


PS.release = function( x, y, data, options ) {

    if ( noteheld === -1 ) return;

    PS.timerStop( heldtime );
    heldtime = 0;
    for ( let i = 1; i <= noteheight; i++ ) {
        PS.color( noteheld, 7 - i, PS.COLOR_WHITE );
    }

    noteheld = -1;
    noteheight = 0;
};
