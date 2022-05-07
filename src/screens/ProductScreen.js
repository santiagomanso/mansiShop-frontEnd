import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Image, ListGroup, Card, Form } from 'react-bootstrap'
import Product from '../components/Product'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { listProductsDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useNavigate } from 'react-router-dom'

const ProductScreen = () => {
  const [qty, setQty] = useState(1)
  const { id } = useParams()
  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(listProductsDetails(id))
  }, [dispatch, id])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  // render nothing during the time product is loading
  if (!product) return null
  return (
    <>
      <Link to='/' className='btn btn-dark my-3'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product.image} alt={Product.name} fluid='true' />
          </Col>
          <Col md={4}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h5>{product.name}</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  color='#FF9900'
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>{' '}
              <ListGroup.Item>
                <h6>
                  Price: ${product.price} | Stock {product.countInStock}
                </h6>
              </ListGroup.Item>
              <ListGroup.Item>
                <h6>Stock: {product.countInStock}</h6>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>{product.description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <p>price:</p>
                    </Col>
                    <Col>
                      <p>${product.price}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>Status:</p>
                    </Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => {
                            setQty(e.target.value)
                          }}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                    variant='dark'
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
