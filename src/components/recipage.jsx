import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

function Recipage() {
    const location = useLocation()
    const {id} = useParams()
console.log(id)
    // const handelProductDetails = (product) => {
    //     console.log('Navigating to product:', product); // Log to see if product is correct
    //     navigate(`/product/${product.id}`, { state: { product } });
    //   };


 
  return (
    <div>ecipage</div>
  )
}

export default Recipage