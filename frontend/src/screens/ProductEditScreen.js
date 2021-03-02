import React, {useState, useEffect} from "react";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Table, Button, Row, Col, Image, ListGroup, Card, Form, FormGroup} from "react-bootstrap";
import Message from "../components/Message"
import Loader from "../components/Loader"
import {updateProduct, listProductDetails, uploadImage} from "../actions/productActions"
import {Link} from "react-router-dom";
import axios from "axios";
import FormContainer from "../components/FormContainer";
import {PRODUCT_UPDATE_RESET} from "../constants/productConstants";

function ProductEditScreen({match, history}) {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [uploading, setUpload] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {error: update_error, loading: update_loading, success: update_success} = productUpdate

    useEffect(() => {
        if (update_success) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist');
        } else {
            if (!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setDescription(product.description)
                setCategory(product.category)
                setCountInStock(product.countInStock)
            }
        }

    }, [product, productId, history, dispatch, update_success])

    const updateHandler = (e) => {
        e.preventDefault()
        let up_prod = {
            _id: productId,
            name,
            price,
            brand,
            description,
            category,
            countInStock,
            image,
        }
        console.log(up_prod)
        dispatch(updateProduct(up_prod))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('product_id', productId)
        formData.append('image', file)

        setUpload(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
            const {data} = await axios.post('/api/products/upload/', formData, config)
            setImage(data)
            setUpload(false)
        } catch (error) {
            setUpload(false)
        }
    }

    return (
        <div>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>

                {uploading && <Loader/>}
                {update_loading && <Loader/>}
                {update_error && <Message variant={'danger'}>{update_error}</Message>}

                {loading ? <Loader/> : error ? (<Message variant={'danger'}>{error}</Message>) : (
                    <Form onSubmit={updateHandler}>

                        <FormGroup controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e => {
                                    setName(e.target.value)
                                })}
                            />
                        </FormGroup>

                        <FormGroup controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Price'
                                value={price}
                                onChange={(e => {
                                    setPrice(e.target.value)
                                })}
                            />
                        </FormGroup>

                        <FormGroup controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Image'
                                value={image}
                                onChange={(e => {
                                    setImage(e.target.value)
                                })}
                            />
                            {uploading && <Loader/>}
                            <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                            />
                        </FormGroup>

                        <FormGroup controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Brand'
                                value={brand}
                                onChange={(e => {
                                    setBrand(e.target.value)
                                })}
                            />
                        </FormGroup>

                        <FormGroup controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Category'
                                value={category}
                                onChange={(e => {
                                    setCategory(e.target.value)
                                })}
                            />
                        </FormGroup>

                        <FormGroup controlId='countInStock'>
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Stock'
                                value={countInStock}
                                onChange={(e => {
                                    setCountInStock(e.target.value)
                                })}
                            />
                        </FormGroup>

                        <FormGroup controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Description'
                                value={description}
                                onChange={(e => {
                                    setDescription(e.target.value)
                                })}
                            />
                        </FormGroup>

                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                )}

            </FormContainer>
        </div>
    )
}

export default ProductEditScreen