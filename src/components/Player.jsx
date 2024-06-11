import PropTypes from "prop-types";
import { GoKebabHorizontal } from "react-icons/go";
import {
  TbPlayerPlayFilled,
  TbPlayerPauseFilled,
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import { HiSpeakerWave } from "react-icons/hi2";

function Player({
  currentSong,
  calculateProgress,
  isPlaying,
  togglePlayPause,
  handlePrev,
  handleNext,
  audioRef,
  handleSeekerChange,
  volume,
  handleVolumeChange,
}) {
  const progress = calculateProgress();

  const handleSeekerInputChange = (event) => {
    handleSeekerChange(event.target.value);
  };

  const handleVolumeInputChange = (event) => {
    handleVolumeChange(event.target.value);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="font-bold text-2xl">{currentSong.name}</label>
      <label className="text-sm text-stone-500">{currentSong.artist}</label>

      <div className="py-4">
        <img
          className="w-96 h-96 rounded-lg"
          src={`https://cms.samespace.com/assets/${currentSong.cover}`}
          alt={currentSong.name}
        />
      </div>
      <div className="relative w-full">
        <div className="h-1 rounded-xl bg-stone-600 w-full absolute">
          <div
            className="h-1 rounded-lg bg-stone-50"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeekerInputChange}
          className="absolute top-0 left-0 w-full h-1 opacity-0 cursor-pointer"
        />
      </div>

      <div className="flex justify-between pt-2">
        <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center">
          <GoKebabHorizontal />
        </div>

        <div className="flex justify-between items-center gap-4 w-44 h-14 text-stone-400">
          <TbPlayerTrackPrevFilled className="w-6 h-6" onClick={handlePrev} />

          <div
            className="rounded-full cursor-pointer w-12 h-12 flex justify-center items-center bg-stone-50 text-stone-900"
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

        <div className="w-12 md:hidden h-12 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center">
          <HiSpeakerWave />
        </div>

        <div tabIndex={0} role="button" className="w-12 hidden md:flex dropdown dropdown-top h-12 rounded-full bg-[rgba(255,255,255,0.1)]  items-center justify-center">
          <div >
            <HiSpeakerWave />
            <div tabIndex={0} className="dropdown-content z-[1] menu w-52">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeInputChange}
                className="w-32 rounded-lg bg-white bg-opacity-10 appearance-none transform -rotate-90"
              />
            </div>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={currentSong.url} />
    </div>
  );
}

Player.propTypes = {
  currentSong: PropTypes.shape({
    name: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  calculateProgress: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  togglePlayPause: PropTypes.func.isRequired,
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  audioRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  handleSeekerChange: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
  handleVolumeChange: PropTypes.func.isRequired,
};

export default Player;
