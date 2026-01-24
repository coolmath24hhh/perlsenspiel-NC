const NOTES = [ "a", "b", "c", "d", "e", "f", "g" ];


let noteheld = -1;
let noteheight = 0;
let heldtime = 0;



PS.init = function( system, options ) {

    PS.gridSize( 7, 8 );
    PS.gridColor( PS.COLOR_GRAY );
    //A
    PS.glyph (0,7,"a");
    PS.glyph (0,6,"A");
    PS.glyphColor(0,6,PS.COLOR_WHITE);
    //b
    PS.glyph (1,7,"b");
    PS.glyph (1,6,"B");
        PS.glyphColor(1,6,PS.COLOR_WHITE);
    //c
    PS.glyph (2,7,"c");
    PS.glyph (2,6,"C");
        PS.glyphColor(2,6,PS.COLOR_WHITE);
    //d
    PS.glyph (3,7,"d");
    PS.glyph (3,6,"D");
        PS.glyphColor(3,6,PS.COLOR_WHITE);
    //e
    PS.glyph (4,7,"e");
    PS.glyph (4,6,"E");
        PS.glyphColor(4,6,PS.COLOR_WHITE);
    //f
    PS.glyph (5,7,"f");
    PS.glyph (5,6,"F");
        PS.glyphColor(5,6,PS.COLOR_WHITE);
    //g
    PS.glyph (6,7,"g");
    PS.glyph (6,6,"G");
        PS.glyphColor(6,6,PS.COLOR_WHITE);


    for ( let x = 0; x < 7; x++ ) {
        PS.color( 5, 7, PS.COLOR_WHITE );
        PS.color(x,6,PS.COLOR_BLACK);
    }


};


PS.keyDown = function(key,shift,ctrl,options ) {
//A1
       if (key === 97) {
        noteheld = 0;
        noteheight = 0;
        PS.audioPlay("piano_a3");
        PS.color(0,7,PS.COLOR_BLUE);
        heldtime = PS.timerStart(1,growLine);
        return;
        }

//A2
        if (key === 65){
            noteheld = 0
            noteheight = 1;
            PS.audioPlay("piano_a4");
            PS.color(0,6,PS.COLOR_BLUE);
            heldtime = PS.timerStart(1,growLine);
            return;

        }

//B1
        if (key === 98) {
    noteheld = 1;
    noteheight = 0;
    PS.audioPlay("piano_b3");
    PS.color(1,7,PS.COLOR_BLUE);
    heldtime = PS.timerStart(1,growLine);
    return
    }


//B2
    if (key === 66 ){
        noteheld = 1;
        noteheight = 1;
        PS.audioPlay("piano_b4");
        PS.color(1,6,PS.COLOR_BLUE);
        heldtime = PS.timerStart(1,growLine);
        return
    }



//C1
       if (key === 99) {
    noteheld = 2;
    noteheight = 0;
    PS.audioPlay("piano_c4");
    PS.color(2,7,PS.COLOR_BLUE);
    heldtime = PS.timerStart(1,growLine);
    return
    }
//C2
    if (key === 67){
        noteheld = 2;
        noteheight = 1;
        PS.audioPlay("piano_c5");
        PS.color(2,6,PS.COLOR_BLUE);
        heldtime=PS.timerStart(1,growLine);
        return
    }



//d1
       if (key === 100){
    noteheld = 3;
    noteheight = 0;
    PS.audioPlay("piano_d4");
    PS.color(3,7,PS.COLOR_BLUE);
    heldtime = PS.timerStart(1,growLine);
    return
    }

//d2
    if(key === 68){
    noteheld = 3;
    noteheight = 1;
    PS.audioPlay("piano_d5");
    PS.color(3,6,PS.COLOR_BLUE);
    heldtime = PS.timerStart(1,growLine);
    return
    }
//e1
       if (key === 101) {
    noteheld = 4;
    noteheight = 0;
    PS.audioPlay("piano_e4");
    PS.color(4,7,PS.COLOR_BLUE);
    heldtime = PS.timerStart(1,growLine);
    
    return
    }
//e2
    if (key === 69){
        noteheld = 4;
        noteheight = 1;
        PS.audioPlay("piano_e5");
        PS.color(4,6,PS.COLOR_BLUE);
        heldtime = PS.timerStart(1,growLine);
        return
    }
//f1
       if (key === 102) {
    noteheld = 5;
    noteheight = 0;
    PS.audioPlay("piano_f4" );
    PS.color(5,7,PS.COLOR_BLUE);
    heldtime = PS.timerStart(1,growLine);
    return
    }
//f2
    if (key === 70){
        noteheld = 5;
        noteheight = 1;
        PS.audioPlay("piano_f5");
        PS.color(5,6,PS.COLOR_BLUE);
        heldtime = PS.timerStart(1,growLine);
        return
    }
//g1
        if (key === 103) {
    noteheld = 6;
    noteheight = 0;
    PS.audioPlay("piano_g4");
    PS.color(6,7,PS.COLOR_BLUE);
    heldtime = PS.timerStart(1,growLine);
    return
    }
//g2
    if(key === 71){
        noteheld = 6;
        noteheight = 1;
        PS.audioPlay("piano_g5");
        PS.color(6,6,PS.COLOR_BLUE);
        heldtime = PS.timerStart(1,growLine);
        return
    }


}


PS.keyUp = function (key,shift,crtl,options) {

 if ( noteheld === -1 ) return;

    PS.timerStop( heldtime );
    heldtime = 0;
    for ( let i = 1; i <= noteheight; i++ ) {
        PS.color( noteheld, 8 - i, PS.COLOR_WHITE );
        PS.color (noteheld, 7 - i, PS.COLOR_WHITE) ;
                PS.color(noteheld,6,PS.COLOR_BLACK);
    }

    noteheld = -1;
    noteheight = 0;
}

function growLine () {
    
    if ( noteheld === -1 ) return;


    if ( noteheight < 7 ) {
        noteheight++;
        PS.color( noteheld, 7 - noteheight, PS.COLOR_BLUE );
    }

    
}

