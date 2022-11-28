import React, { useContext } from "react";

import Tuit from "../component/Tuit.jsx";
import { Context } from "../store/appContext";
import "../../styles/home.css";

import NuevoTuit from "../component/NewTuit.jsx";
import SideBar from "../component/SideBar.jsx";
import Search from "../component/Search.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="">
      <div className="row">
        <div className="col-2 d-flex flex-column">
          <SideBar />
        </div>
        {/* Feed */}
        <div className="col-6">
          <h3>Inicio</h3>
          <NuevoTuit />
          <div className="alert alert-info">
            {store.tuits &&
              store.tuits.map((chTuit, index) => {
                return <Tuit key={index} tweet={chTuit} />;
              })}
          </div>
        </div>
        <div className="col-4">
          <Search />
        </div>
      </div>
    </div>
  );
};
