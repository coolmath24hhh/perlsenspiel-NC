const NOTES = [ "a", "b", "c", "d", "e", "f", "g" ];


let noteheld = -1;
let noteheight = 0;
let heldtime = 0;



PS.init = function( system, options ) {

    PS.statusText("Burst Key");
    PS.gridSize( 7, 8 );
    PS.gridColor( PS.COLOR_GRAY );

    PS.glyph (0,0,"A");
    PS.glyph (1,0,"B");
    PS.glyph (2,0,"C");
    PS.glyph (3,0,"D");
    PS.glyph (4,0,"E");
    PS.glyph (5,0,"F");
    PS.glyph (6,0,"G");

    //A
    PS.glyph (0,7,"z");
    PS.glyph (0,6,"a");
    PS.glyphColor(0,6,PS.COLOR_WHITE);
    //b
    PS.glyph (1,7,"x");
    PS.glyph (1,6,"s");
        PS.glyphColor(1,6,PS.COLOR_WHITE);
    //c
    PS.glyph (2,7,"c");
    PS.glyph (2,6,"d");
        PS.glyphColor(2,6,PS.COLOR_WHITE);
    //d
    PS.glyph (3,7,"v");
    PS.glyph (3,6,"f");
        PS.glyphColor(3,6,PS.COLOR_WHITE);
    //e
    PS.glyph (4,7,"b");
    PS.glyph (4,6,"g");
        PS.glyphColor(4,6,PS.COLOR_WHITE);
    //f
    PS.glyph (5,7,"n");
    PS.glyph (5,6,"h");
        PS.glyphColor(5,6,PS.COLOR_WHITE);
    //g
    PS.glyph (6,7,"m");
    PS.glyph (6,6,"j");
        PS.glyphColor(6,6,PS.COLOR_WHITE);


    for ( let x = 0; x < 7; x++ ) {
        PS.color( 5, 7, PS.COLOR_WHITE );
        PS.color(x,6,PS.COLOR_BLACK);
        PS.color( x, 0,PS.COLOR_GRAY);
    }


};


PS.keyDown = function(key,shift,ctrl,options ) {
//A1
       if (key === 97) {
        noteheld = 0;
        noteheight = 0;
        PS.audioPlay("piano_a3");
        PS.color(0,7,PS.COLOR_BLUE);
        burstLine();
        return;
        }

//A2
        if (key === 122){
            noteheld = 0
            noteheight = 1;
            PS.audioPlay("piano_a4");
            PS.color(0,6,PS.COLOR_BLUE);
burstLine();
            return;

        }

//B1
        if (key === 115) {
    noteheld = 1;
    noteheight = 0;
    PS.audioPlay("piano_b3");
    PS.color(1,7,PS.COLOR_BLUE);
        burstLine();
    return
    }


//B2
    if (key === 120 ){
        noteheld = 1;
        noteheight = 1;
        PS.audioPlay("piano_b4");
        PS.color(1,6,PS.COLOR_BLUE);
        burstLine();
        return
    }



//C1
       if (key === 100) {
    noteheld = 2;
    noteheight = 0;
    PS.audioPlay("piano_c4");
    PS.color(2,7,PS.COLOR_BLUE);
        burstLine();
    return
    }
//C2
    if (key === 99){
        noteheld = 2;
        noteheight = 1;
        PS.audioPlay("piano_c5");
        PS.color(2,6,PS.COLOR_BLUE);
        burstLine();
        return;
    }



//d1
       if (key === 102){
    noteheld = 3;
    noteheight = 0;
    PS.audioPlay("piano_d4");
    PS.color(3,7,PS.COLOR_BLUE);
        burstLine();
    return;
    }

//d2
    if(key === 118){
    noteheld = 3;
    noteheight = 1;
    PS.audioPlay("piano_d5");
    PS.color(3,6,PS.COLOR_BLUE);
        burstLine();
    return
    }
//e1
       if (key === 103) {
    noteheld = 4;
    noteheight = 0;
    PS.audioPlay("piano_e4");
    PS.color(4,7,PS.COLOR_BLUE);
        burstLine();
    
    return
    }
//e2
    if (key === 98){
        noteheld = 4;
        noteheight = 1;
        PS.audioPlay("piano_e5");
        PS.color(4,6,PS.COLOR_BLUE);
        burstLine();
        return
    }
//f1
       if (key === 104) {
    noteheld = 5;
    noteheight = 0;
    PS.audioPlay("piano_f4" );
    PS.color(5,7,PS.COLOR_BLUE);
        burstLine();
    return
    }
//f2
    if (key === 110){
        noteheld = 5;
        noteheight = 1;
        PS.audioPlay("piano_f5");
        PS.color(5,6,PS.COLOR_BLUE);
        burstLine();
        return
    }
//g1
        if (key === 106) {
    noteheld = 6;
    noteheight = 0;
    PS.audioPlay("piano_g4");
    PS.color(6,7,PS.COLOR_BLUE);
        burstLine();
    return
    }
//g2
    if(key === 109){
        noteheld = 6;
        noteheight = 1;
        PS.audioPlay("piano_g5");
        PS.color(6,6,PS.COLOR_BLUE);
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

    PS.timerStart(3, function () {

   
        if ( y < 6 && y >= 0 ) {
            PS.color( col, y, PS.COLOR_WHITE );
        }

        y--;

        if ( y < 0 ) {
         
            PS.color(col, 7, PS.COLOR_WHITE); 
            PS.color(col, 6, PS.COLOR_BLACK); 
            PS.color(col,0,PS.COLOR_GRAY);
            return false;
        }

        PS.color( col, y, PS.COLOR_BLUE );
    });
}
