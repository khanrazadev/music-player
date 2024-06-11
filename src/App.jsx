import "./App.css";
import profilePic from "../public/profile-picture.png";
import Logo from "./assets/logo.svg";
import { CiSearch } from "react-icons/ci";
import { GoKebabHorizontal } from "react-icons/go";
import {
  TbPlayerPlayFilled,
  TbPlayerPauseFilled,
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import { HiSpeakerWave } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import useDebounce from "./hooks/useDebounce";

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeTab, setActiveTab] = useState("forYou"); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const audioRef = useRef(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 300); // Debounced search query state


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

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
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

  const playSong = (song, index) => {
    setCurrentSong(song);
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
    setCurrentSongIndex(prevIndex);
    setIsPlaying(true);
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const calculateProgress = () => {
    if (currentSong && audioRef.current) {
      return (currentTime / audioRef.current.duration) * 100;
    }
    return 0;
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredSongs = songs.filter((song) => {
    const matchesSearchQuery =
      song.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(debouncedSearchQuery.toLowerCase());

    return activeTab === "topTracks"
      ? song.top_track && matchesSearchQuery
      : matchesSearchQuery;
  });

  return (
    <div
      className="grid h-[100vh] p-8 sm:grid-cols-12"
      style={{
        background: currentSong
          ? currentSong.accent
          : "linear-gradient(to right, #ff7e5f, #feb47b)",
      }}
    >
      <div className="hidden sm:block col-span-2">
        <div className="flex h-full flex-col justify-between">
          <img className="h-10 w-36" src={Logo} alt="Logo" />
          <img className="w-12 h-12" src={profilePic} alt="Profile" />
        </div>
      </div>
      <div className="hidden sm:block col-span-4 mx-6">
        <div role="tablist" className="tabs gap-10 flex mb-8 mt-2">
          <a
            role="tab"
            className={`tab text-2xl font-bold ${activeTab === "forYou" ? "tab-active" : "opacity-50"
              }`}
            onClick={() => handleTabSwitch("forYou")}
          >
            For You
          </a>
          <a
            role="tab"
            className={`tab text-2xl font-bold ${activeTab === "topTracks" ? "tab-active" : "opacity-50"
              }`}
            onClick={() => handleTabSwitch("topTracks")}
          >
            Top Tracks
          </a>
        </div>

        <div className="bg-[rgba(255,255,255,0.08)] px-4 py-2 rounded-lg w-full flex justify-between items-center">
          <input
            className="w-full bg-transparent outline-none text-lg opacity-60 flex-grow"
            placeholder="Search Song, Artist"
            value={searchQuery}
            onChange={handleSearch}
          />
          <CiSearch className="w-8 h-8 opacity-40 my-auto" />
        </div>

        <div className="max-h-[78vh] scrollbar scrollbar-none overflow-y-auto">
          {filteredSongs.map((song, index) => (
            <div
              key={song.id}
              className={`flex justify-between items-center ${currentSongIndex === index
                ? "border p-2"
                : 'hover:bg-[rgba(255,255,255,0.08)]'
                } my-6 transition-all ease-in-out hover:p-4 rounded-lg`}
              onClick={() => playSong(song, index)}
            >
              <div className="flex items-start gap-4">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={`https://cms.samespace.com/assets/${song.cover}`}
                  alt={song.name}
                />
                <div>
                  <p className="text-lg">{song.name}</p>
                  <p className="opacity-60 text-sm">{song.artist}</p>
                </div>
              </div>
              <p className="text-lg opacity-60 text-right">{song.duration}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-5 mt-16 flex justify-center">
        {currentSong && (
          <div className="flex flex-col space-y-2">
            <label className="font-bold text-2xl">{currentSong.name}</label>
            <p className="text-sm opacity-60">{currentSong.artist}</p>

            <div className="py-4">
              <img
                className="w-96 h-96 rounded-lg"
                src={`https://cms.samespace.com/assets/${currentSong.cover}`}
                alt={currentSong.name}
              />
            </div>
            {/* progress bar  */}
            <div className="h-1 rounded-lg bg-slate-600 w-full">
              <div
                className="h-1 rounded-lg bg-slate-50"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>

            <div className="flex justify-between pt-2">
              <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center">
                <GoKebabHorizontal />
              </div>

              <div className="flex justify-between items-center gap-4 w-44 h-14 text-gray-400">
                <TbPlayerTrackPrevFilled className="w-6 h-6" onClick={handlePrev} />

                <div
                  className="rounded-full w-12 h-12 flex justify-center items-center bg-slate-50 text-slate-900"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <TbPlayerPauseFilled className="w-6 h-6" />
                  ) : (
                    <TbPlayerPlayFilled className="w-6 h-6" />
                  )}
                </div>

                <TbPlayerTrackNextFilled className="w-6 h-6" onClick={handleNext} />
              </div>

              <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center">
                <HiSpeakerWave />
              </div>
            </div>

            <audio ref={audioRef} src={currentSong.url} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
