import { useEffect, useState } from "react";
import axios from "axios";

const useSongs = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  useEffect(() => {
    axios
      .get("https://cms.samespace.com/items/songs")
      .then((response) => {
        const songsWithDuration = response.data.data.map((song) => ({
          ...song,
          duration: "0:00", // Default duration
        }));
        setSongs(songsWithDuration);
        setCurrentSong(songsWithDuration[0]); // Set the first song as the default current song

        // Load the durations of all songs
        songsWithDuration.forEach((song, index) => {
          const audio = new Audio(song.url);
          audio.addEventListener("loadedmetadata", () => {
            const duration = formatDuration(audio.duration);
            setSongs((prevSongs) => {
              const newSongs = [...prevSongs];
              newSongs[index].duration = duration;
              return newSongs;
            });
          });
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return {
    songs,
    currentSong,
    currentSongIndex,
    setCurrentSong,
    setCurrentSongIndex,
  };
};

export default useSongs;
