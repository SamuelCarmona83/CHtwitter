import React from "react";

const Search = () => {
  return (
    <>
      <div className="d-flex flex-column text-center px-4">
        <div className="input-group my-3 bg-light ">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Busqueda"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>

        <div className="">
          <h4>Trending Now 🆕</h4>

          <div class="card">
            <ul class="list-group list-group-flush">
              <li class="list-group-item bg-light text-start">#Florentino</li>
              <li class="list-group-item bg-light text-start">
                #Miguel Cabrera
              </li>
              <li class="list-group-item bg-light text-start">#CR7</li>
              <li class="list-group-item bg-light text-start">#Cavani</li>
              <li class="list-group-item bg-light text-start">
                #CaneloVsMessi
              </li>
              <li class="list-group-item bg-light text-start">
                Messi balón de oro
              </li>
              <li class="list-group-item bg-light text-start">
                vinicius balon de oro
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
