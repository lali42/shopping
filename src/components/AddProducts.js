// import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { storage, db } from "../config/Config";

export const AddProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState(null);
  const [error, setError] = useState("");

  const types = ["image/png", "image/jpeg", "image/jpg"];

  const imgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setImg(selectedFile);
      setError("");
    } else {
      setImg(null);
      setError("Please select a valid image type (jpg , png or jpeg)");
    }
  };

  const addProduct = (e) => {
    e.preventDefault();
    // console.log(name, price, img, desc);
    const uploadTask = storage.ref(`images/${img.name}`).put(img);
    uploadTask.on(
      "state_change",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (err) => {
        setError(err.message);
      },
      () => {
        storage
          .ref("images")
          .child(img.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("products")
              .add({
                name: name,
                desc: desc,
                price: Number(price),
                img: url,
              })
              .then(() => {
                setName("");
                setDesc("");
                setPrice(0);
                setImg("");
                setError("");
                document.getElementById("file").value = "";
              })
              .catch((err) => setError(err.message));
          });
      }
    );
  };

  return (
    <div className="container">
      <br />
      <h2>ADD PRODUCTS</h2>
      <hr />
      <form autoComplete="off" className="form-group" onSubmit={addProduct}>
        <label htmlFor="p-name">Name</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <br />
        <label htmlFor="p-desc">Description</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
        <br />
        <label htmlFor="p-price">Price</label>
        <input
          type="number"
          className="form-control"
          required
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        <br />
        <label htmlFor="p-img">Image</label>
        <input
          type="file"
          className="form-control"
          onChange={imgHandler}
          id="file"
        />
        <br />
        <button className="btn btn-success btn-md mybtn">ADD</button>
      </form>
      {error && <span>{error}</span>}
    </div>
  );
};
