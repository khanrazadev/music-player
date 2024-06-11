import { useEffect, useRef, useState } from "react";

const useAudioPlayer = (currentSong) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);

      audio.addEventListener("timeupdate", updateTime);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
      };
    }
  }, [currentSong]);

  const togglePlayPause = () => setIsPlaying(!isPlaying);

  const calculateProgress = () =>
    currentSong && audioRef.current
      ? (currentTime / audioRef.current.duration) * 100
      : 0;

  return {
    isPlaying,
    currentTime,
    togglePlayPause,
    calculateProgress,
    audioRef,
    setIsPlaying,
  };
};

export default useAudioPlayer;
