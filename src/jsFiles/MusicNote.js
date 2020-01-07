class MusicNote {
    constructor(c, x, y, dx, dy, letter, width, color, id){
        this.c = c;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.letter = letter;
        this.color = color;
        this.width = width;
        this.height = this.width * 2;
        this.first = true;
        this.id = id;

        // Associate this with an image
        this.noteImage = new Image();

        // inside the onload function this, refers to noteImage (new image object) NOT MusicNote
        // so gotta set the this.c to another variable to be called in the onload method

        this.noteImage.onload = function () {
            c.drawImage(this, x, y, width, width*2); 
            // Can't use 'this.x this.y etc' in function because 'this' refers to noteImage NOT MusicNote
        }
        this.noteImage.src = "./images/note" + this.color.slice(1) + ".png";
    }

    draw () {
        this.c.drawImage(this.noteImage, this.x, this.y, this.width, this.width * 2);        
    }

    update(){
        this.x += this.dx;
        this.y += this.dy;
        this.draw ();
    }

}

export default MusicNote;