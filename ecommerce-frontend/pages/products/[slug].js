import Head from 'next/head'
import { fromImageToUrl, API_URL } from '../../utils/urls'
import { twoDecimals } from '../../utils/format'


const Product = ({ product }) => {
    return (
        <div>
            <Head>
                {product.meta_title && 
                    <title>{product.meta_title}</title>
                }
                {product.meta_description && 
                    <meta name="description" content={product.meta_description} />
                }
            </Head>
            <h3>{product.name}</h3>
            <img src={fromImageToUrl(product.image)} />
            <h3>{product.name}</h3>
            <p>${twoDecimals(product.price)}</p>
            <p>{product.content}</p>
        </div>
        )
}

export async function getStaticProps({ params: { slug } }){
    const product_res = await fetch(`${API_URL}/products/?slug=${slug}`)
    const found = await product_res.json()

    return {
        props: {
            //for the API filter response is 
            //an array an we are choosing 1st array
            product: found[0] 
            
        }
    }
}

export async function getStaticPaths() {
    //Retrieve all the possible paths
        const products_res = await fetch(`${API_URL}/products/`)
        const products = await products_res.json()

    //Return them to NextJs content
    return {
        paths: products.map(product => ({
            params: { slug: String(product.slug)}
        })),
        fallback: false // Tells to next.js 404 if the param is not found
    }
}

export default Product