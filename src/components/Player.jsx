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
}) {
  return (
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
};

export default Player;
