import  sanityClient  from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url'
export const client = sanityClient({
    projectId: 's43r8227',
    dataset: 'production',
    apiVersion: '2023-02-25',
    useCdn: true,
    token: process.env.SANITY_ECOMMERCE_TOKEN
})

const builder = imageUrlBuilder(client)
export const urlFor = (source)=> builder.image(source)