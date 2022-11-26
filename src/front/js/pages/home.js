import React, { useContext } from "react";

import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>CHwitter🛫</h1>

      <div className="alert alert-info">
        {store.tuits &&
          store.tuits.map((tweet, index) => {
            return (
              <div key={index} className="card bg-primary text-start p-3 my-2">
                <figure className="mb-0">
                  <blockquote className="blockquote text-white">
                    <p>{tweet.content + ` ` + tweet.date}</p>
                  </blockquote>
                  <figcaption className="blockquote-footer mb-0 text-white">
                    <cite title="Source Title">{tweet.author.username}</cite>
                  </figcaption>
                </figure>
              </div>
            );
          })}
      </div>
    </div>
  );
};
