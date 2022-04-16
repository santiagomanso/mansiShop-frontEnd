import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <>
      <Card className='my-3'>
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant='top' />
        </Link>

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as='div'>{product.name}</Card.Title>
          </Link>

          <Card.Text as='div'>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color='#FF9900'
            />
          </Card.Text>

          <Card.Text as='h6'>${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default Product
