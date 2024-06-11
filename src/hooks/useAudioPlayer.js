import { useEffect, useRef, useState } from "react";

const useAudioPlayer = (currentSong) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1); // Volume state (range: 0 to 1)
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
      audioRef.current.volume = volume;
    }
  }, [isPlaying, currentSong, volume]);

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

  const handleSeekerChange = (value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
  };

  return {
    isPlaying,
    currentTime,
    togglePlayPause,
    calculateProgress,
    audioRef,
    setIsPlaying,
    handleSeekerChange,
    volume,
    handleVolumeChange,
  };
};

export default useAudioPlayer;
