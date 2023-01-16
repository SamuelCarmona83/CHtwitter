import React from "react";

const Tuit = (props) => {
  return (
    <>
      <div className="card bg-primary text-start p-3 my-2">
        <figure className="mb-0">
          <blockquote className="blockquote text-white">
            <p>{props.tweet.content + ` ` + props.tweet.date}</p>
          </blockquote>
          {props.tweet.image && (
            <img
              className="p-2 m-2"
              src={props.tweet.image}
              alt={"chuit-"}
              style={{ width: "100%", borderRadius: "20px" }}
            />
          )}
          <figcaption className="blockquote-footer mb-0 text-white">
            <cite title="Source Title">{props.tweet.author.username}</cite>
          </figcaption>
        </figure>
      </div>
    </>
  );
};

export default Tuit;
