import PropTypes from "prop-types";

function SongList({ songs, currentSongIndex, playSong }) {
  return (
    <div className="max-h-[78vh] scrollbar scrollbar-none overflow-y-auto">
      {songs.map((song, index) => (
        <div
          key={song.id}
          className={`flex justify-between items-center ${
            currentSongIndex === index
              ? "border p-2"
              : "hover:bg-[rgba(255,255,255,0.08)]"
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
  );
}

SongList.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      cover: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentSongIndex: PropTypes.number.isRequired,
  playSong: PropTypes.func.isRequired,
};

export default SongList;
