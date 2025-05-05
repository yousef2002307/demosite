import React from "react";

const InfoVideoBanner = () => {
  return (
    <div className="container row gap-5 p-3 justify-content-around">
      {/* Right Video Section */}
      <div className="col-md-6">
        <div className="ratio ratio-16x9 rounded rounded-4 overflow-hidden shadow-lg border border-0 border-secondary">
          <iframe
            width="460"
            height="315"
            src="https://www.youtube.com/embed/YuzClM_OAO0"
            title="Buses for Sale & Financing"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      {/* Left Content */}
      <div className="col-md-4 mt-5">
        <h1 className="fw-bold text-orange mb-2" style={{ color: "#ff7107" }}>
          PKR Solution
        </h1>
        <h4 className="text-dark mb-1">Make it simple here</h4>
        <p className="text-muted">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsum
          accusantium distinctio, ipsa aliquam dolorem neque aut qui harum
          libero commodi, eligendi similique. Cumque deserunt et explicabo sequi
          minima maxime.
        </p>
      </div>
    </div>
  );
};

export default InfoVideoBanner;
