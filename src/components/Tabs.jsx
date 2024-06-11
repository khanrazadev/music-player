import PropTypes from 'prop-types';

function Tabs({ activeTab, handleTabSwitch }) {
    return (
        <div role="tablist" className="tabs gap-10 flex mb-8 mt-2">
            <a
                role="tab"
                className={`tab text-2xl font-bold ${activeTab === "forYou" ? "tab-active" : "opacity-50"}`}
                onClick={() => handleTabSwitch("forYou")}
            >
                For You
            </a>
            <a
                role="tab"
                className={`tab text-2xl font-bold ${activeTab === "topTracks" ? "tab-active" : "opacity-50"}`}
                onClick={() => handleTabSwitch("topTracks")}
            >
                Top Tracks
            </a>
        </div>
    );
}

Tabs.propTypes = {
    activeTab: PropTypes.string.isRequired,
    handleTabSwitch: PropTypes.func.isRequired
};


export default Tabs;
