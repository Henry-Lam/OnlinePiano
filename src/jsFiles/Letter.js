class Letter {
    constructor(c, x, y, hitColor, text, sizeScale, id){
        this.x = x;
        this.y = y;

        this.fontSize = sizeScale * 0.05;
        this.fontFamily = "Impact";
        this.font = this.fontSize + "pt " + this.fontFamily;
        this.text = text;
        this.hitColor = hitColor; // color will change to after it's hit
        this.color = "white"; // start out as white, will change to input color later
        this.c = c;
        this.id = id; //Used to know if a shot out note is meant to hit this letter
        this.hit = false; //Did a note hit this yet

        this.grow = true;
        this.originalSize = this.fontSize;

        this.displayText = text.toUpperCase();
        if (this.displayText === "COMMA"){
            this.displayText = ",";
        }
        
    }

    draw () {
        this.c.font = this.font;

        this.c.fillStyle = this.color;
        

        this.c.fillText(this.displayText, this.x, this.y);
        this.c.fill();
    }

    update(){
        this.draw ();

        if (this.hit){
            this.color = this.hitColor;

            if (this.grow){
                this.fontSize += 5;
                this.font = this.fontSize + "pt " + this.fontFamily;
                if (this.fontSize >= (this.originalSize + (this.originalSize * 0.5))){
                    this.grow = false;
                }

            }else{
                this.fontSize -= 3;
                this.font = this.fontSize + "pt " + this.fontFamily;
            }
        }
    }
}

export { Letter };
