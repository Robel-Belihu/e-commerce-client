import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";

import AppBar from "@material-ui/core/AppBar";
// import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import CardM from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

import { addItem, updateItem, removeItem } from "./cartHelpers";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },

  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  productDescription: {
    height: "100px",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const { pathname } = useLocation();

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link href={`/product/${product._id}`} className="mr-2">
          <button className="text-white bg-amber-500 hover:bg-amber-400 py-1 px-2 rounded-md text-l font-semibold">
            View Product
          </button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="text-white bg-green-500 hover:bg-green-400 py-1 px-2 rounded-md text-l md:mt-0 mt-2 font-semibold"
        >
          Add to cart
        </button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div className="mt-2">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run);
          }}
          variant="contained"
          className="text-white bg-red-500 hover:bg-red-400 py-1 px-2 rounded-md text-l font-semibold mt-2"
          startIcon={<DeleteIcon />}
        >
          Remove Product
        </button>
      )
    );
  };

  const classes = useStyles();

  return (
    <Container className="">
      <CssBaseline />
      <div className="w-60 md:w-72 lg:96 bg-white rounded-lg overflow-hidden shadow-lg mb-4">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-700 text-sm mb-4">
            {product.description.substring(0, 100)}
          </p>
          <p className="text-black-10 mb-2">Price: ${product.price}</p>
          <p className="text-black-9 mb-2">
            Category: {product.category && product.category.name}
          </p>
          <p className="text-black-8 mb-2">
            Added on {moment(product.createdAt).fromNow()}
          </p>
          {showStock(product.quantity)}
          <div className="mt-4">
            {showViewButton(showViewProductButton)}
            {showAddToCartBtn(showAddToCartButton)}
            {showRemoveButton(showRemoveProductButton)}
          </div>
          {showCartUpdateOptions(cartUpdate)}
        </div>
      </div>
    </Container>
  );
};

export default Card;
