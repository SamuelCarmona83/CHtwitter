import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

const NewTuit = () => {
  const { store, actions } = useContext(Context);
  const [chuit, setChuit] = useState();

  const [image, setImage] = useState();
  const [file, setFile] = useState();

  const postChuit = async () => {
    //console.log("Post the chuit ✅");
    actions.postChuit(chuit, image);
    setChuit("");
  };

  const uploadImage = async () => {
    const urlCloudinary =
      "https://api.cloudinary.com/v1_1/dd0wschpy/image/upload";

    const formData = new FormData();

    formData.append("file", file);

    formData.append("upload_preset", "rvpoparu");

    try {
      let resp = await fetch(urlCloudinary, {
        method: "POST",
        body: formData,
      });

      let data = await resp.json();
      setImage(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const loadImage = (evento) => {
    //setImage(URL.createObjectURL(evento[0]));
    setFile(evento[0]);
  };

  return (
    <>
      <div className="mb-3">
        <label className="form-label">¿Qué está pasando?🌐</label>
        {image && <img style={{ width: "150px" }} src={image} alt="img" />}
        <textarea
          value={chuit}
          onChange={(event) => setChuit(event.target.value)}
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
        <div className="d-flex flex-row justify-content-end">
          <input
            onChange={(event) => loadImage(event.target.files)}
            type="file"
            name="imagen"
            accept="image/*"
          />
          <span className="text-info d-flex flex-row" onClick={uploadImage}>
            <i className="fa-solid fa-image my-auto mx-4"></i>
          </span>
          <button className="btn btn-info m-1 " onClick={postChuit}>
            CHwittear
          </button>
        </div>
      </div>
    </>
  );
};

export default NewTuit;
