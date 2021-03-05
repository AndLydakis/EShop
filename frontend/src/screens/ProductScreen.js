import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Row, Col, Image, ListGroup, Button, Card, Form} from 'react-bootstrap'
import Rating from "../components/Rating";
import {listProductDetails, createProductReview} from '../actions/productActions';
import {PRODUCT_CREATE_REVIEW_RESET} from "../constants/productConstants";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductScreen({match, history}) {
    /*Item quantity*/
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    /*use effect gets triggered when the component loads*/
    /*or when state attributes get updated*/

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productReviewCreate = useSelector(state => state.productCreateReview)
    const {
        loading: review_create_loading,
        error: review_create_error,
        success: review_create_success,
    } = productReviewCreate

    useEffect(() => {
        if (review_create_success) {
            setRating(0);
            setComment('')
            dispatch({
                type: PRODUCT_CREATE_REVIEW_RESET
            })
        }
        dispatch(listProductDetails(match.params.id))
    }, [review_create_success, dispatch, match])

    const createReviewHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            match.params.id, {
            rating,
            comment,
        }))
    }
    const addToCart = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    }
    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ?
                <Loader/>
                : error ?
                    <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            <Row>
                                <Col md={6}>
                                    <Image src={product.image} alt={product.name} fluid/>
                                </Col>
                                <Col md={3}>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <h3>{product.name}</h3>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Rating value={product.rating} text={`${product.numReviews} reviews`}
                                                    color={'#f8e825'}/>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Price: ${product.price}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            {product.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Price:
                                                    </Col>
                                                    <Col>
                                                        <strong>${product.price}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Status:
                                                    </Col>
                                                    <Col>
                                                        {product.countInStock > 0 ? 'In' : 'Out of'} Stock
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty</Col>
                                                        <Col xs="auto" className="my-1">
                                                            <Form.Control
                                                                as="select"
                                                                value={qty}
                                                                onChange={(e) => setQty(e.target.value)}>
                                                                {
                                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}
                                            <ListGroup.Item>
                                                <Button onClick={addToCart}
                                                        className='btn-block'
                                                        disabled={product.countInStock === 0}
                                                        type='button'>
                                                    Add to Cart
                                                </Button>
                                            </ListGroup.Item>

                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                            <Row md={6}>
                                <h4>Reviews</h4>
                                <ListGroup variant={'flush'}>
                                    {product.reviews.length === 0 && <Message variant={'info'}>No Reviews</Message>}
                                    {product.reviews.map((review) => (
                                        <ListGroup.Item key={review._id}>
                                            <strong>{review.name}</strong>
                                            {/*{review.comment}*/}
                                            <Rating value={review.rating} color={"#f8e825"}/>
                                            <p>{review.createdAt}</p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))}
                                    <ListGroup.Item>
                                        <h4>Write a Review</h4>

                                        {review_create_loading && <Loader/>}

                                        {review_create_success &&
                                        <Message variant={'success'}>Review Submitted</Message>}

                                        {review_create_error &&
                                        <Message variant={'danger'}>{review_create_error}</Message>}

                                        {userInfo ? (
                                            <Form onSubmit={createReviewHandler}>
                                                <Form.Group controlId={'rating'}>
                                                    <Form.Label>Rating</Form.Label>
                                                    <Form.Control
                                                        as={'select'}
                                                        value={rating}
                                                        onChange={(e) => setRating(e.target.value)}
                                                    >
                                                        <option value={''}>
                                                            Select...
                                                        </option>
                                                        <option value={'1'}>1 - Poor</option>
                                                        <option value={'2'}>2 - Fair</option>
                                                        <option value={'3'}>3 - Good</option>
                                                        <option value={'4'}>4 - V.Good</option>
                                                        <option value={'5'}>5 - Excellent</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId={'comment'}>
                                                    <Form.Label>Review</Form.Label>
                                                    <Form.Control
                                                        as={'textarea'}
                                                        row={'5'}
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    >

                                                    </Form.Control>
                                                </Form.Group>
                                                <Button
                                                    disabled={review_create_loading}
                                                    type={'submit'}
                                                    variant={'primary'}
                                                >
                                                    Submit Review
                                                </Button>
                                            </Form>
                                        ) : (
                                            <Message variant={'info'}><Link to={'/login'}>Log In</Link> to write a
                                                review</Message>
                                        )}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Row>
                        </div>
                    )
            }
        </div>
    );
}

export default ProductScreen;