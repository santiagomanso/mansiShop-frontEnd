import React from 'react'
import { Card } from 'react-bootstrap'

const Product = ({product}) => {
  return (
    <>
        <Card className='my-3'>

            <a href={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </a>

            <Card.Body>

                <a href={`/product/${product._id}`}>
                    <Card.Title as='div'> 
                        {product.name}
                    </Card.Title>    
                </a>

                <Card.Text as='div'>
                    <div>
                        {product.rating} from {product.numReviews} Reviews
                    </div>
                </Card.Text>

                <Card.Text as='h6'>
                    ${product.price}
                </Card.Text>

            </Card.Body>

        </Card>
    </>
  )
}

export default Product