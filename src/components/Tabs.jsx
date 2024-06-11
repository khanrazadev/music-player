import PropTypes from "prop-types";

function Tabs({ activeTab, handleTabSwitch }) {
  return (
    <div className=" flex mb-8 gap-8 mt-2">
      <a
        className={` cursor-pointer text-2xl font-bold ${
          activeTab === "forYou" ? "tab-active" : "opacity-50"
        }`}
        onClick={() => handleTabSwitch("forYou")}
      >
        For You
      </a>
      <a
        className={` cursor-pointer text-2xl font-bold ${
          activeTab === "topTracks" ? "tab-active" : "opacity-50"
        }`}
        onClick={() => handleTabSwitch("topTracks")}
      >
        Top Tracks
      </a>
    </div>
  );
}

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  handleTabSwitch: PropTypes.func.isRequired,
};

export default Tabs;
