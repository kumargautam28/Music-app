import { useRef, useEffect, useState } from "react";
import "./App.css";

function App() {
  //USE STATE
  const [currentMusicDetails, setcurrentMusicDetails] = useState({
    songName: "Kesariya",
    songArtist: "PRITAM",
    songSrc: "./assets/songs/Kesariya(PagalWorld.com.sb).mp3",
    songAvatar: "./assets/Images/image1.jpg",
  });
  const [audioProgress, setaudioProgress] = useState(0);
  const [isAudioPlaying, setisAudioPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState("04 : 38");
  const [musicCurrentTime, setMusicCurrentTime] = useState("00 : 00");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const currentAudio = useRef();

  const handleMusicProgressBar = (e) => {
    setaudioProgress(e.target.value);
    currentAudio.current.currentTime =
      (e.target.value * currentAudio.current.duration) / 100;
  };
  let avatarClass = ["objectFitCover", "objectFitContain", "none"];
  const [avatarClassIndex, setAvatarClassIndex] = useState(0);
  const handleAvatar = () => {
    if (avatarClassIndex >= avatarClass.length - 1) {
      setAvatarClassIndex(0);
    } else {
      setAvatarClassIndex(avatarClassIndex + 1);
    }
  };

  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setisAudioPlaying(true);
    } else {
      currentAudio.current.pause();
      setisAudioPlaying(false);
    }
  };

  const musicAPI = [
    {
      songName: "Kesariya",
      songArtist: "PRITAM",
      songSrc: "./assets/songs/Kesariya(PagalWorld.com.sb).mp3",
      songAvatar: "./assets/Images/image1.jpg",
    },
    {
      songName: "Ikko Mikke",
      songArtist: "Satinder-Sartaj",
      songSrc: "./assets/songs/Ikko - Mikke - Title Track 128 Kbps.mp3",
      songAvatar: "./assets/Images/image2.jpg",
    },
    {
      songName: "Dekha Tenu",
      songArtist: "FAIZ",
      songSrc:
        "./assets/songs/Dekha Tenu Pehli Pehli Baar Ve(PagalWorld.com.sb).mp3",
      songAvatar: "./assets/Images/image8.jpg",
    },
    {
      songName: "Desh Mere",
      songArtist: "Arijit Singh",
      songSrc: "./assets/songs/Desh Mere(PagalWorld.com.sb).mp3",
      songAvatar: "./assets/Images/image4.jpg",
    },
    {
      songName: "Maan Meri Jaan",
      songArtist: "King",
      songSrc: "./assets/songs/Maan Meri Jaan Champagne Talk 320 Kbps.mp3",
      songAvatar: "./assets/Images/image6.jpg",
    },
    {
      songName: "Apna Bana Le",
      songArtist: "Arijit Singh",
      songSrc:
        "./assets/songs/Apna Bana Le - Full Audio _ Bhediya _ Varun Dhawan, Kriti Sanon_ Sachin-Jigar,Arijit Singh,Amitabh B.webm",
      songAvatar: "./assets/Images/image7.jpg",
    },
    {
      songName: "ROOTS",
      songArtist: "Bintu Pabra",
      songSrc: "./assets/songs/Roots(PagalWorld.com.sb).mp3",
      songAvatar: "./assets/Images/image9.jpg",
    },
    {
      songName: "Pehla Pyaar",
      songArtist: "Armaan Malik",
      songSrc:
        "/assets/songs/new_192_07 - Pehla Pyaar - Kabir Singh (2019).mp3",
      songAvatar: "./assets/Images/image3.jpeg",
    },
  ];

  const handleNextSong = () => {
    if (musicIndex >= musicAPI.length - 1) {
      let setNumber = 0;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber = musicIndex + 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  };

  const handlePreviousSong = () => {
    if (musicIndex === 0) {
      let setNumber = musicAPI.length - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber = musicIndex - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  };

  const updateCurrentMusicDetails = (number) => {
    let musicObject = musicAPI[number];
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.play();
    setcurrentMusicDetails({
      songName: musicObject.songName,
      songArtist: musicObject.songArtist,
      songSrc: musicObject.songSrc,
      songAvatar: musicObject.songAvatar,
    });
    setisAudioPlaying(true);
  };

  const handleAudioUpdate = () => {
    //input total length of audio
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${minutes < 10 ? `0${minutes}` : minutes} : ${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
    setMusicTotalLength(musicTotalLength0);

    //input music current time
    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin < 10 ? `0${currentMin}` : currentMin} : ${
      currentSec < 10 ? `0${currentSec}` : currentSec
    }`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt(
      (currentAudio.current.currentTime / currentAudio.current.duration) * 100
    );
    setaudioProgress(isNaN(progress) ? 0 : progress);
  };

  const vidArray = [
    "./assets/Videos/video7.mp4",
    "./assets/Videos/video10.mp4",
    "./assets/Videos/video4.mp4",
    "./assets/Videos/video3.mp4",
    "./assets/Videos/video9.mp4",
    "./assets/Videos/video1.mp4",
    "./assets/Videos/video13.mp4",
    "./assets/Videos/video12.mp4",
    "./assets/Videos/video11.mp4",
  ];

  //USE TO CHANGE BACKGROUND VIDEO
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % vidArray.length);
      setLoading(true);
    }, 5000); // Change video every 6 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [vidArray.length]);

  const handleLoadedData=()=>{
    setLoading(false);
  }
  return (
    <>
      <div className="container">{loading}
        <audio
          src="./assets/songs/Kesariya(PagalWorld.com.sb).mp3"
          ref={currentAudio}
          onEnded={handleNextSong}
          onTimeUpdate={handleAudioUpdate}
        ></audio>
        <video
          key={vidArray[currentVideoIndex]}
          autoPlay
          loop
          muted
          src={vidArray[currentVideoIndex]}
          className="backgroundVideo"
          onLoadedData={handleLoadedData}
        ></video>
        <div className="blackScreen"></div>
        <div className="music-Container">
          <p className="musicPlayer">Music Player</p>
          <p className="music-Head-Name">{currentMusicDetails.songName}</p>
          <p className="music-Artist-name">{currentMusicDetails.songArtist}</p>
          <img
            src={currentMusicDetails.songAvatar}
            className={avatarClass[avatarClassIndex]}
            onClick={handleAvatar}
            alt="song Avatar"
            id="songAvatar"
          />
          <div className="musicTimerDiv">
            <p className="musicCurrentTime">{musicCurrentTime}</p>
            <p className="musicTotalLength">{musicTotalLength}</p>
          </div>
          <input
            type="range"
            name="musicProgressBar"
            className="musicProgressBar"
            value={audioProgress}
            onChange={handleMusicProgressBar}
          />
          <div className="musicControllers">
            <i
              className="fa-solid fa-backward musicControllers"
              onClick={handlePreviousSong}
            ></i>
            <i className={`fa-solid ${isAudioPlaying ? "fa-pause-circle" : "fa-play-circle"} playBtn`}onClick={handleAudioPlay}></i>
            <i
              className="fa-solid fa-forward musicControllers"
              onClick={handleNextSong}
            ></i>
            <p className="details">Created by Gautam Kumar</p>
          </div>
        </div>
        
        {/* <div className="changeBackBtn" onClick={handleChangeBackground}>
          Change Background
        </div> */}
      </div>
    </>
  );
}

export default App;
