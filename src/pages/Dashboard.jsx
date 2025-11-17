import { Divider, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Badge, Button } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { createWar, deleteWar, getWar, updateWar } from "../services/allAPI";
import Swal from "sweetalert2";
import { Link } from "react-router";

const Dashboard = () => {
  const [cname, setCname] = useState("");
  const [category, setCategory] = useState("Shirt");
  const [color, setColor] = useState("");
  const [season, setSeason] = useState("");
  const [url, setUrl] = useState("");
  const [itemId, setItemID] = useState(null);
  const [itemData, setItemData] = useState([]);
  useEffect(() => {
    displayItem();
  }, []);

  const createItem = async () => {
    try {
      let reqBody = {
        cname: cname,
        category: category,
        color: color,
        season: season,
        url: url,
      };
      let apiResponse = await createWar(reqBody);
      console.log(apiResponse.data);
      if (apiResponse.status == 201) {
        Swal.fire({
          title: "Created!",
          text: "You have succesfully added your Item.",
          icon: "success",
        });
        displayItem();
      } else {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong...",
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const displayItem = async () => {
    try {
      let apiResponse = await getWar();
      console.log(apiResponse.data);
      if (apiResponse.status == 200) {
        setItemData(apiResponse.data);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong...",
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      let apiResponse = await deleteWar(id);
      console.log(apiResponse.data);
      if (apiResponse.status == 200) {
        Swal.fire({
          title: "Deleted!",
          text: "You have succesfully deleted your Item.",
          icon: "success",
        });
        displayItem();
      } else {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong...",
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateItem = async () => {
    try {
      let reqBody = {
        cname: cname,
        category: category,
        color: color,
        season: season,
        url: url,
      };
      let apiResponse = await updateWar(itemId, reqBody);
      if (apiResponse.status == 200) {
        Swal.fire({
          title: "Updated!",
          text: "You have succesfully updated your Item.",
          icon: "success",
        });
        displayItem();
        setCname("");
        setCategory("");
        setColor("");
        setSeason("");
        setUrl("");
        setItemID(null);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong...",
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadItem = async (itemObj) => {
    setCname(itemObj.cname);
    setCategory(itemObj.category);
    setColor(itemObj.color);
    setSeason(itemObj.season);
    setUrl(itemObj.url);
    setItemID(itemObj.id);
  };

  return (
    <div className="container">
      <Link to="/">
        <Button className=" mt-5">Back</Button>
      </Link>
      <div className="shadow mt-5 container d-flex flex-column gap-3 w-50 p-4">
        <Typography variant="h4">Add new Item</Typography>
        <TextField
          id="outlined-basic"
          label="Cloth Name"
          variant="outlined"
          value={cname}
          onChange={(e) => setCname(e.target.value)}
        />
        <select
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Shirt">Shirt</option>
          <option value="Pants">Pants</option>
          <option value="Dress">Dress</option>
          <option value="Shoe">Shoe</option>
          <option value="Jacket">Jacket</option>
          <option value="Skirt">Skirt</option>
          <option value="Sweater">Sweater</option>
          <option value="Accessory">Accessory</option>
        </select>
        <TextField
          id="outlined-basic"
          label="Color"
          variant="outlined"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <select
          className="form-control"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          <option value="All Season">All Season</option>
          <option value="Summer">Summer</option>
          <option value="Winter">Winter</option>
          <option value="Rainy">Rainy</option>
          <option value="Spring">Spring</option>
          <option value="Fall">Fall</option>
        </select>
        <TextField
          id="outlined-basic"
          label="Image URL"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="d-flex justify-content-end">
          {itemId ? (
            <>
              <Button onClick={updateItem}>Update Item</Button>
            </>
          ) : (
            <>
              <Button onClick={createItem}>Save Item</Button>
            </>
          )}
        </div>
      </div>

      <div className="container p-4 mt-5 shadow rounded row gap-3">
        <Typography variant="h4" className="text-center mb-5">
          Your Wardrobe
        </Typography>
        {itemData.length > 0 ? (
          <>
            {itemData.map((item, index) => (
              <Card sx={{ width: 350 }} index={index} className="col-4">
                <div>
                  <img
                    height="200px"
                    src={item.url}
                    alt="green iguana"
                    style={{ objectFit: "cover", minWidth: "100%" }}
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-3 d-flex flex-column align-items-center">
                    <Typography variant="h5" className="mb-1">
                      {item.cname}
                    </Typography>
                    <div className="d-flex gap-3 justify-content-center">
                      <Badge variant="secondary">{item.category}</Badge>
                      <Badge variant="secondary">{item.color}</Badge>
                      <Badge variant="secondary">{item.season}</Badge>
                    </div>
                  </div>
                  <Divider className="bg-dark mt-3" variant="middle"></Divider>
                  <div className="mt-4 d-flex gap-3 justify-content-center">
                    <button
                      onClick={() => {
                        loadItem(item);
                      }}
                      className="btn w-50 bg-warning"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteItem(item.id);
                      }}
                      className="btn w-50 bg-danger"
                    >
                      Delete
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <>
            <Typography>No Items to Display</Typography>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
