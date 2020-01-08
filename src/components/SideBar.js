import React, {Component} from "react";
import {randomIntFromRange, distance, letterToColor, keyCodeToLetter, letterToPiano, songs} from "../jsFiles/helperFunc";
class SideBar extends Component {

    componentDidMount(){
        var mainCanvas = document.querySelector('#mainCanvas');
        var sideBar = document.querySelector('#SideBar');

        // sideBar.style.width = (window.innerWidth - mainCanvas.width - 20) + "px";
            // 20px cus sometimes we have the scroll bar on right and that takes ~20px
        // sideBar.style.height = window.innerHeight + "px";

        function updateSideBarSize(){

            // sideBar.style.width = (window.innerWidth - mainCanvas.width - 20) + "px";
            // // 20px cus sometimes we have the scroll bar on right and that takes ~20px
            // sideBar.style.height = window.innerHeight + "px";
        }

        window.addEventListener('resize', function(){
            // function called every time window 'resizes'
            updateSideBarSize();   
        })
        updateSideBarSize();
        var currentSongName = document.querySelector("#currentSongName");
        var dropBtn = document.querySelector(".dropbtn");
        
        var songNameCode = "noSongSelected";

        function getSongNameCode(songName){
            // Returns input with first letter becomming lower case, and removed all spaces
            var result = songName[0].toLowerCase();
            for (var i = 1; i < songName.length; i++){
                if (songName[i] !== " "){
                    result += songName[i];
                }
            }
            return result;
        }

        var currNoteIndex;
        var notesBox = document.querySelector(".notesBox");

        function updateNotesBox(notesBox, songNameCode){
            currNoteIndex = 0;
            notesBox.innerHTML = "";
            var notesBoxLetterId = 0;
            var notesList = songs[songNameCode];
            if (notesList.length < 1){
                return 1;
            }
            
            for (var i =0; i < notesList.length; i ++){
                notesBox.innerHTML += '<span id="' + "n" + notesBoxLetterId  + '">' + notesList[notesBoxLetterId] + " " + "</span>"
                // id of each span is "n#" where # is the index of that letter in the song list
                notesBoxLetterId += 1;
            }
        }
        var outside = this;

        var all_a = document.querySelectorAll(".listSongs");
        for (var i=0; i < all_a.length; i++){
            all_a[i].addEventListener("click", function(){
                currentSongName.textContent = this.textContent;
                dropBtn.textContent = this.textContent;
                songNameCode = getSongNameCode(this.textContent);
                updateNotesBox(notesBox, songNameCode);
                currNoteIndex = 0;
                outside.props.notifySongChange(songNameCode);
                
            })
        }
        
        // Add Keyboard event listener
        function keydownUpdateNotesBox(event){
            var letterPressed =  keyCodeToLetter[event.keyCode];
            if (letterPressed == "comma"){
                letterPressed = ",";
            }
            
            if ((event.keyCode in keyCodeToLetter) && songs[songNameCode][currNoteIndex] == letterPressed){
                var currNotesBoxLetter = document.querySelector("#n" + currNoteIndex);
                currNotesBoxLetter.style.color = "black";
                currNoteIndex ++;
            }
        }
        window.addEventListener('keydown', keydownUpdateNotesBox ,false);
    }

    render(){
        return (
        <div id="SideBar">
            <h1 id="currentSongName" className="headings">No Song Selected</h1>
            <div className = "notesBox">
            </div>
            
            <h1 className="headings">Choose a Song</h1>

            <div className="dropdown">
                <button className="dropbtn">No Song Selected</button>
                
                    <div className="dropdown-content">
                        <a href="#" className = "listSongs">No Song Selected</a>
                        <a href="#" className = "listSongs">Fur Elise</a>
                    </div>
            </div>
        </div>
        );
    }
}

export default SideBar;