import React, {Component} from "react";
import { Letter } from "../jsFiles/Letter";
import {randomIntFromRange, distance, letterToColor, keyCodeToLetter, letterToPiano, songs} from "../jsFiles/helperFunc";
import MusicNote from "../jsFiles/MusicNote";
import {Howl, Howler} from 'howler';
import SideBar from './SideBar';
// Had to do npm install react-howler

class MainCanvasClass extends Component {

    state = {
        songName : "noSongSelected",
        changed : false
    }

    songChange(newSong){
        this.state.songName = newSong;
        this.state.changed = true;
    }

    componentDidMount(){
        var songName = this.state.songName;
        var songNoteIndex = 0;
        var outside = this;

        var mainCanvas = document.querySelector('#mainCanvas');

        var reduceFactor = 0.28;
        mainCanvas.width = window.innerWidth - (window.innerWidth * reduceFactor); // 0.23
        mainCanvas.height = window.innerHeight - (window.innerHeight * reduceFactor);
        
        function updateCanvasSize (mainCanvas, window){
            // I put mainCanvas / window as input so I can put this function
            // in helperFunc.js later
            // var reduceFactor = 0.28;
            // mainCanvas.width = window.innerWidth - (window.innerWidth * reduceFactor); // 0.23
            // mainCanvas.height = window.innerHeight - (window.innerHeight * reduceFactor);
        }

        updateCanvasSize(mainCanvas, window);

        var c = mainCanvas.getContext('2d');
        
        var centerImage = new Image();
        var centerImageWidth = window.innerWidth;
        var centerImageHeight = window.innerHeight;
        var centerImageX = mainCanvas.width/2 - centerImageWidth/2;
        var centerImageY = mainCanvas.height/2 - centerImageHeight/2;
        // var scale = window.innerWidth / window.innerHeight;
        var allLetter = [];
        
        
        
        var scale = mainCanvas.width + mainCanvas.height;

        
        window.addEventListener('resize', function(){
            // function called every time window 'resizes'
            updateCanvasSize(mainCanvas, window);
            scale = mainCanvas.width + mainCanvas.height;
        })


        centerImage.onload = function(){
            c.drawImage(centerImage,centerImageX,centerImageY, centerImageWidth, centerImageHeight);
        }
        centerImage.src = './images/pianoClear2.png'

        function updateCenterImage(){
            centerImageWidth = mainCanvas.width *0.145;
            centerImageHeight = centerImageWidth;
            centerImageX = mainCanvas.width/2 - centerImageWidth/2 + (mainCanvas.width * -0.01)
            centerImageY = mainCanvas.height/2 - centerImageHeight/2 + (mainCanvas.height * 0.06);

            c.drawImage(centerImage,centerImageX,centerImageY, centerImageWidth, centerImageHeight);
        }

        


        // Center Image
        
        
        
        // Set onload THEN set src
        // ---------------------------------------------------------------------------------------------------
        
        // Keyboard event listener

        var currentLetter = undefined;
        var allCorrectNotes = [];
        var allIncorrectNotes = [];

        function createCorrectNote(currentLetter){
            var width = scale * 0.015;
            var height = width * 2;
            var x = (mainCanvas.width + width) / 2.0;
            var y = (mainCanvas.height + height) / 2.0;

            var pathLength = distance(currentLetter.x, currentLetter.y, (x + width / 2.0), (y + height / 2.0));
            var speed = 4;
            var dx = (currentLetter.x - (x + width / 2.0)) / (pathLength / speed);
            var dy = (currentLetter.y - (y + height / 2.0)) / (pathLength / speed);
            
            var musicNote = new MusicNote(c, x, y, dx, dy, currentLetter.text, width, letterToColor[currentLetter.text], currentLetter.id);
            allCorrectNotes.push(musicNote);
            return musicNote;
        }

        function createIncorrectNote(letterPressed){
            var width = scale * 0.015;
            var height = width * 2;
            // var x = centerImageX + centerImageWidth/2 -width/2;
            var x = (mainCanvas.width + width) / 2.0;
            var y = (mainCanvas.height + height) / 2.0;
            
            var dx = randomIntFromRange(-1,1);
            var dy = randomIntFromRange(-4,4);
            while (dy === 0 || dy === 1 || dy === -1){
                dy = randomIntFromRange(-4,4);
            }
            
            var musicNote = new MusicNote(c, x, y, dx, dy, letterPressed, width, letterToColor[letterPressed], -1);
            allIncorrectNotes.push(musicNote);
            return musicNote;
        }

        function decreaseVolumeGradually(obj, seconds){

            var callInterval = seconds/10.0;
            var perDecrease = obj.key.volume()/ 10.0;
            // The more decrease calls I have the more smoothly the sound drops

            var interval = setInterval(function(){
                obj.key.volume(obj.key.volume() - perDecrease);
            }, callInterval * 1000);
            
            var timer = setTimeout(function(){
                clearInterval(interval);
            }, seconds * 1000);
        }

        function playNote(s){
            var fileName = letterToPiano[s];
            var filePath ="./sounds/" + fileName + ".mp3";
            var sound = new Howl({
                src:[filePath],
                volume: 1
            });
            sound.play();
            
            // if I pass the sound obj directly the parameter will be alias to sound obj
            // so changes won't be made to the actual object, this way its like passing in a list
            // the items inside are mutable
            var obj = {key: sound};
            decreaseVolumeGradually(obj, 4);
        }

        function checkKeyDown(event){

            var letterPressed =  keyCodeToLetter[event.keyCode];
            
            if(!(letterPressed in letterToPiano)){
                //Do nothing for now (They typed a key with no associated sound)
            }else if (currentLetter !== undefined && letterPressed === currentLetter.text){
                createCorrectNote (currentLetter);
                currentLetter.color = "#d3d3d3";
                songNoteIndex += 1;
                currentLetter = undefined;
                
            }else {
                createIncorrectNote(letterPressed);
            }

            if (letterPressed in letterToPiano){
                playNote(letterPressed);
            }
        }
        window.addEventListener('keydown', checkKeyDown ,false);

        function withinRange (note, letter, range){
            var noteCenterX = note.x + (note.width/2.0);
            var noteCenterY = note.y + (note.height/2.0);
            var inRangeX = (noteCenterX >= letter.x - range) && (noteCenterX <= letter.x + range);
            var inRangeY = (noteCenterY >= letter.y - range) && (noteCenterY <= letter.y + range);
            
            return inRangeX && inRangeY;
        }

        function noteNotOnScreen (note){
            // remove incorrect notes the fly off edge
            return (note.x + note.width < 0 || note.x > mainCanvas.width ||
                 note.y + note.height < 0 || note.y > mainCanvas.height);
        }

        
        function animate(){
            
            c.clearRect(0,0, mainCanvas.width, mainCanvas.height);
            updateCenterImage();
            var i;
            // animate the correct notes

            for (var k=0; k < allLetter.length; k++){
                var letter = allLetter[k];
                for (i=0; i < allCorrectNotes.length; i++){
                    var note = allCorrectNotes[i];
                    note.update();
                    if (letter.id === note.id && withinRange(note, letter, letter.fontSize)){
                        letter.hit = true;
                        var index = allCorrectNotes.indexOf(note);
                        if (index !== -1){
                            allCorrectNotes.splice(index, 1);
                        }                        
                    }
                }
                if (letter.fontSize < 5){
                    var indexLetter = allLetter.indexOf(letter);
                    if (index !== -1){
                        allLetter.splice(indexLetter, 1);
                    }
                }
            }

            // animate the incorrect notes
            for (i = 0; i < allIncorrectNotes.length ; i++){
                var currentNote = allIncorrectNotes[i];
                currentNote.update();
                
                // remove incorrect notes the fly off edge
                if(noteNotOnScreen(currentNote)){
                    var index = allIncorrectNotes.indexOf(currentNote);
                    allIncorrectNotes.splice(index, 1);
                }
            }

            if (songName !== "noSongSelected" && songNoteIndex < songs[songName].length){

                var pixelsFromEdge = scale * 0.05;
                var awayFromCenter = centerImageWidth * 0.2;

                if (currentLetter === undefined){
                    var letterX = randomIntFromRange(pixelsFromEdge, mainCanvas.width - pixelsFromEdge);
                    var letterY = randomIntFromRange(pixelsFromEdge, mainCanvas.height - pixelsFromEdge);

                    while ((letterX >= centerImageX - awayFromCenter) && (letterX <= centerImageX + centerImageWidth + awayFromCenter) &&
                            (letterY >= centerImageY - awayFromCenter) && (letterY <= centerImageY + centerImageHeight + awayFromCenter)){

                        letterX = randomIntFromRange(pixelsFromEdge, mainCanvas.width - pixelsFromEdge);
                        letterY = randomIntFromRange(pixelsFromEdge, mainCanvas.height - pixelsFromEdge);
                    }
                    
                    var text = songs[songName][songNoteIndex]; 
                    var id = songNoteIndex;

                    var actualText = text;
                    if (text === ","){
                        text = "comma";
                    }
                    
                    var color = letterToColor[actualText];

                    currentLetter = new Letter(c, letterX, letterY, color, text, scale, id);
                    allLetter.push(currentLetter);
                }
            }
            var j;
            for (j=0; j < allLetter.length; j++){
                allLetter[j].update();
            };
            if (outside.state.changed){
                songName = outside.state.songName;
                songNoteIndex = 0;
                allCorrectNotes = [];
                allIncorrectNotes = [];
                allLetter = [];
                currentLetter = undefined;
                outside.state.changed = false;
            }
            // Gradually reduce volume
            requestAnimationFrame(animate);
        }
        animate();
    }
    

    render(){
        return (
            <div id="canvasDiv">
                <h1>Hello Title</h1>
                <canvas id="mainCanvas"></canvas>
            </div>
        );
    }
}

export default MainCanvasClass;
