import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Image, ListGroup, Card } from 'react-bootstrap'
import Product from '../components/Product'
import Rating from '../components/Rating'
import axios from 'axios'

const ProductScreen = () => {
  const [product, setProduct] = useState(null)
  const { id } = useParams()
  useEffect(() => {
    console.log('id number is: ', id)
    const getProduct = async () => {
      const result = await axios.get(`/api/products/${id}`)
      setProduct(result.data)
    }

    getProduct()
  }, [id])

  console.log(product)
  // render nothing during the time product is loading
  if (!product) return null
  return (
    <>
      <Link to='/' className='btn btn-dark my-3'>
        Go Back
      </Link>

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
              <ListGroup.Item>
                <Button
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
    </>
  )
}

export default ProductScreen
