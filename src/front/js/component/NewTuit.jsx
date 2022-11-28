import React from "react";

const NewTuit = () => {
  return (
    <>
      <div className="mb-3">
        <label className="form-label">¿Qué está pasando? 🌐</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
        <div className="d-flex flex-row justify-content-end">
          <span className="text-info d-flex flex-row">
            <i className="fa-solid fa-image my-auto mx-4"></i>
          </span>
          <button className="btn btn-info m-1 ">CHwittear</button>
        </div>
      </div>
    </>
  );
};

export default NewTuit;
