import React from 'react';
import MainCanvasClass from './MainCanvas.js';
import SideBar from './SideBar';

class CanvasBar extends React.Component{


    notifySongChange = (newSong) => {
        // songName = newSong;
        // songNoteIndex = 0;
        // console.log(newSong);
        this.refs.MainCanvas.songChange(newSong);
    }

    

    render(){
        return(
            <div>
                <MainCanvasClass ref="MainCanvas"/>
                <SideBar notifySongChange={this.notifySongChange}/>
            </div>
        )
    }
}

export default CanvasBar;