import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router";
import { getWar } from "../services/allAPI";

const Home = () => {
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    displayItem();
  }, []);

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

  let total = itemData.length;
  let clothes = itemData.filter(
    (item) => item.category != "Shoe" && item.category != "Accessory"
  );
  let shoes = itemData.filter((item) => item.category == "Shoe");
  console.log(clothes);
  console.log(shoes);

  return (
    <div
      className="container mb-5 d-flex flex-column align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <img
        src="src/assets/attachment_51051281-removebg-preview.png"
        alt=""
        style={{height:400}}
      />
      <Typography variant="h7" className="">
        Keeping track of your wardrobe shouldn’t feel like a chore. This space
        helps you organize every item you own from everyday outfits to seasonal
        pieces in one simple and visually clean dashboard. Add new items, browse
        your collection, check your categories, and easily manage everything
        without the mess of a real closet. Your style stays organized, and so do
        you.
      </Typography>
      <div className=" mt-5 mb-5">
        <Link to="/dashboard">
          <Button>View All</Button>
        </Link>
      </div>
      <div className="row container shadow p-5 text-light gap-5 justify-content-center">
        <div className="col-3 text-center bg-primary rounded p-4">
          <Typography variant="p">Total Items</Typography>
          <Typography>{total}</Typography>
        </div>
        <div className="col-3 text-center bg-primary rounded p-4">
          <Typography variant="p">Shoes</Typography>
          <Typography>{shoes.length}</Typography>
        </div>
        <div className="col-3 text-center bg-primary rounded p-4">
          <Typography variant="p">Clothes</Typography>
          <Typography>{clothes.length}</Typography>
        </div>
      </div>
    </div>
  );
};

export default Home;
