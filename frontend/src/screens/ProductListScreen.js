import React, {useState, useEffect} from "react";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Table, Button, Row, Col} from "react-bootstrap";
import Message from "../components/Message"
import Loader from "../components/Loader"
import Paginate from "../components/Paginate"
import {listProducts, deleteProduct, createProduct} from "../actions/productActions"
import {PRODUCT_CREATE_RESET} from "../constants/productConstants";

function ProductListScreen({history}) {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products, page, pages} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading: delete_loading, error: delete_error, success: delete_success} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {
        loading: create_loading,
        error: create_error,
        success: create_success,
        product: created_product
    } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    let keyword = history.location.search
    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})
        if (!userInfo.isAdmin) {
            history.push('/login')
        }
        if (create_success) {
            history.push(`/admin/product/${created_product._id}/edit`)
        } else {
            dispatch(listProducts(keyword))
        }
    }, [dispatch, history, userInfo, delete_success, keyword, create_success])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        console.log('Creating product: ')
        dispatch(createProduct())
    }

    return (
        <div>
            <Row className={'align-items-center'}>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className={'text-right'}>
                    <Button className={'my-3'} onClick={createProductHandler}>
                        <i className={'fas fa-plus'}></i> Create Product </Button>
                </Col>
            </Row>

            {create_loading && <Loader/>}
            {create_error && <Message variant={'danger'}>{create_error}</Message>}

            {delete_loading && <Loader/>}
            {delete_error && <Message variant={'danger'}>{delete_error}</Message>}

            {loading ? (<Loader/>) : error ? (<Message variant={'danger'}>{error}</Message>) : (
                <div>
                    <Table striped bordered hover responsive className={'table-sm'}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant={'light'} className={'btn-sm'}>
                                            <i className={'fas fa-edit'}/>
                                        </Button>
                                    </LinkContainer>
                                </td>
                                <td>
                                    <Button variant={'danger'} className={'btn-sm'}
                                            onClick={() => deleteHandler(product._id)}>
                                        <i className={'fas fa-trash'}/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Paginate page={page} pages={pages} isAdmin={true}/>
                </div>
            )}
        </div>
    )
}

export default ProductListScreen