import React from "react";

const SideBar = () => {
  return (
    <>
      {/* Button Home */}
      <div className="text-center">
        <button className="btn btn-primary btn-sm mt-2" role="button">
          <span className="text-white d-flex flex-row">
            Home
            <i className="fa-solid fa-house my-auto mx-4"></i>
          </span>
        </button>
      </div>
      {/* Button Profile */}
      <div className="text-center">
        <button className="btn btn-primary btn-sm mt-2" role="button">
          <span className="text-white d-flex flex-row">
            Profile
            <i className="fa-solid fa-user my-auto mx-4"></i>
          </span>
        </button>
      </div>
      <div className="text-center">
        <button className="btn btn-info btn-sm mt-2 rounded-pill" role="button">
          <span className="text-white d-flex flex-row">CHtwitter</span>
        </button>
      </div>
    </>
  );
};

export default SideBar;
