// import { Button } from "@material-ui/core";
import { Card, TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import { storage, db } from "../config/Config.js";
import { Link } from "react-router-dom";

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
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (err) => setError(err.message),
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
    <div>
      <br />
      <h1 className="center-add">ADD PRODUCTS</h1>
      <div className="center-add">
        <Card className="container-add">
          <form autoComplete="off" className="form-group" onSubmit={addProduct}>
            <TextField
              htmlFor="p-name"
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
              label="Name"
              variant="outlined"
              className="textField-add"
            ></TextField>
            {/* <label htmlFor="p-name">Name</label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <br /> */}
            <TextField
              htmlFor="p-desc"
              type="text"
              required
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              label="Description"
              variant="outlined"
              className="textField-add"
              style={{ marginTop: 30 }}
            ></TextField>
            {/* <label htmlFor="p-desc">Description</label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
            <br /> */}
            <TextField
              htmlFor="p-price"
              type="number"
              required
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              label="Price"
              variant="outlined"
              className="textField-add"
              style={{ marginTop: 30 }}
            ></TextField>
            {/* <label htmlFor="p-price">Price</label>
            <input
              type="number"
              className="form-control"
              required
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
            <br /> */}
            <br />
            <label htmlFor="p-img" className="title-add">
              Product Image :
            </label>
            <input
              type="file"
              onChange={imgHandler}
              id="file"
              style={{ marginTop: 20, marginBottom: 20 }}
            />

            <Button
              type="submit"
              fullWidth
              style={{
                color: "#fff",
                backgroundColor: "#ea5455",
              }}
            >
              add
            </Button>
            <Link to="/">
              <Button
                fullWidth
                style={{
                  marginTop: 20 + "px",
                  color: "#fff",
                  backgroundColor: "#2d4059",
                }}
              >
                Cancle
              </Button>
            </Link>
          </form>
        </Card>
      </div>

      {error && <span>{error}</span>}
    </div>
  );
};
