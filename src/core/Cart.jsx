import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";

import Copyright from "./Copyright";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2 className="font-semibold text-xl">
          Your cart has
          <span className="text-red-700 font-bold text-2xl">
            {" "}
            {`${items.length}`}{" "}
          </span>
          items
        </h2>
        <hr className="mb-4" />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
    </h2>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items. Add remove checkout or continue shopping."
      className="flex flex-col justify-center "
    >
      <div className="flex flex-col md:flex-row justify-center">
        <div className="">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="flex flex-col bg-amber-500 p-4 h-2/5 rounded-md m-4">
          <h2 className="font-semibold text-xl">Your cart summary</h2>
          <hr className="mb-4" />
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
      </div>
      <Copyright />
    </Layout>
  );
};

export default Cart;
