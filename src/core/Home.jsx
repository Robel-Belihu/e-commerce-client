import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import "fontsource-roboto";
import Copyright from "./Copyright";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState([]);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout>
      <Search />
      <div class="flex">
        <div className="flex w-full flex-col">
          <h2 className="font-semibold text-xl mb-3">New Arrivals</h2>
          <div className="row">
            {productsByArrival.map((product, i) => (
              <div key={i} className="">
                <Card product={product} />
              </div>
            ))}
          </div>

          <h2 className="font-semibold text-xl mb-3">Best Sellers</h2>
          <div className="row">
            {productsBySell.map((product, i) => (
              <div key={i} className="">
                <Card product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <Copyright /> */}
    </Layout>
  );
};

export default Home;
