import { urlFor } from "../lib/client"
import Link from "next/link"

const HeroBanner = ({bannerProduct}) => {
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{bannerProduct.smallText}</p>
        <h3>{bannerProduct.midText}</h3>
        <h1>{bannerProduct.largeText1}</h1>
        <img src={urlFor(bannerProduct?.image)} alt="headphones" className="hero-banner-image" />
        <div>
          <Link href={`/product/${bannerProduct.product}`}>
            <button type="button">{bannerProduct.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{bannerProduct.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner