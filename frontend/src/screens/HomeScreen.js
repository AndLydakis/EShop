import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

function HomeScreen() {
    const [products, setProducts] = useState([])
    /*use effect gets triggered when the component loads*/
    /*or when state attributes get updated*/
    useEffect(() => {
        console.log('Use Effect triggered')

        /* Returns a promise */
        async function fetchProducts() {
            const {data} = await axios.get('/api/products')
            setProducts(data)
        }

        /*need to allow CORS for this to go through*/
        fetchProducts()
    }, [])
    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen