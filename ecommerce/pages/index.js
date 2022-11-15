import React from "react";

import { client } from "../lib/client";

import { Product, FooterBanner, HeroBanner } from "../components";

function Home({ products, bannerData }) {
  return (
    <>
      <div>
        <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
        {/* {console.log(bannerData)} */}
        <div className="products-heading">
          <h2>Best Seller Products</h2>
          <p>speaker There are many variations passages</p>
        </div>

        <div className="products-container">
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>

        <FooterBanner footerBanner={bannerData && bannerData[0]} />
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  // garb all products from sanity
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
