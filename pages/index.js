import React from 'react'
import {Product, FooterBanner, HeroBanner} from "../components"
import {client} from "../lib/client"

const index = ({products, bannerProducts}) => {
  return (
    <>
      <HeroBanner bannerProduct={bannerProducts.length && bannerProducts[0]}/>

      <div className='products-heading'>
        <h2>Best Selling Product</h2>
        <p>speaker there are many variations passages</p>
      </div>

      <div className='products-container'>
          {products?.map((product)=><Product key={product._id} product={product}/>
          )}
      </div>

      <FooterBanner footerBanner={bannerProducts.length && bannerProducts[0]}/>
    </>
  )
}

export async function getServerSideProps(context) {
  const products = await client.fetch(`*[_type == "product"]`);
  const bannerProducts = await client.fetch(`*[_type == "banner"]`);
  return {
    props: {products, bannerProducts}, // will be passed to the page component as props
  }
}

export default index