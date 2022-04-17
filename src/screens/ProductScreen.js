import React from 'react'
import products from '../components/products'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Image, ListGroup, Card } from 'react-bootstrap'
import Product from '../components/Product'
import Rating from '../components/Rating'

const ProductScreen = () => {
  const params = useParams()
  const product = products.find((p) => p._id === params.id)

  console.log(product)

  return (
    <>
      <Link to='/' className='btn btn-dark my-3'>
        Go Back
      </Link>

      <Row>
        <Col md={6}>
          <Image src={product.image} alt={Product.name} fluid='true' />
        </Col>
        <Col md={5}>
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
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>{product.description}</p>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
