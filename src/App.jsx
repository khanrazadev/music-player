import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import SearchBar from "./components/SearchBar.jsx";
import SongList from "./components/SongList";
import Player from "./components/Player";
import useDebounce from "./hooks/useDebounce";
import useSongs from "./hooks/useSongs";
import useAudioPlayer from "./hooks/useAudioPlayer";
import Logo from "./assets/logo.svg";
import { IoMenu } from "react-icons/io5";

function App() {
  const {
    songs,
    currentSong,
    currentSongIndex,
    setCurrentSong,
    setCurrentSongIndex,
  } = useSongs();
  const {
    isPlaying,
    togglePlayPause,
    calculateProgress,
    audioRef,
    setIsPlaying,
    handleSeekerChange,
    volume,
    handleVolumeChange,
  } = useAudioPlayer(currentSong);
  const [activeTab, setActiveTab] = useState("forYou");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const playSong = (song, index) => {
    setCurrentSong(song);
    setCurrentSongIndex(index);
    setIsPlaying(true);
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

  const handleTabSwitch = (tab) => setActiveTab(tab);

  const handleSearch = (event) => setSearchQuery(event.target.value);

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
      className="md:grid h-[100vh] p-8 md:grid-cols-12"
      style={{
        background: currentSong
          ? currentSong.accent
          : "linear-gradient(to right, #ff7e5f, #feb47b)",
      }}
    >
      <Header />

      {/* mobile sidebar */}
      <div className="drawer md:hidden">
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle p-0 m-0"
        />
        <div className="drawer-content flex justify-between items-center">
          <img className="h-10 w-36" src={Logo} alt="Logo" />
          <label htmlFor="my-drawer" className="btn bg-black bg-opacity-30">
            <IoMenu />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div
            style={{
              background: currentSong
                ? currentSong.accent
                : "linear-gradient(to right, #ff7e5f, #feb47b)",
            }}
            className="menu p-4 w-[90%] min-h-full"
          >
            <div className="px-2">
              <Tabs activeTab={activeTab} handleTabSwitch={handleTabSwitch} />
            </div>
            <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
            <SongList
              songs={filteredSongs}
              currentSongIndex={currentSongIndex}
              playSong={playSong}
            />
          </div>
        </div>
      </div>
      <div className="hidden md:block col-span-4 mx-6">
        <Tabs activeTab={activeTab} handleTabSwitch={handleTabSwitch} />
        <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
        <SongList
          songs={filteredSongs}
          currentSongIndex={currentSongIndex}
          playSong={playSong}
        />
      </div>
      <div className="col-span-5 mt-16 flex justify-center">
        {currentSong && (
          <Player
            currentSong={currentSong}
            calculateProgress={calculateProgress}
            isPlaying={isPlaying}
            togglePlayPause={togglePlayPause}
            handlePrev={handlePrev}
            handleNext={handleNext}
            audioRef={audioRef}
            handleSeekerChange={handleSeekerChange}
            volume={volume}
            handleVolumeChange={handleVolumeChange}
          />
        )}
      </div>
    </div>
  );
}

export default App;
