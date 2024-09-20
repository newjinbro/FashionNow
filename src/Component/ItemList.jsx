import React, { useState,useEffect } from 'react';
import { Button, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import AOS from 'aos'
import 'aos/dist/aos.css'

export const ItemList = ({ data }) => {
    const [selectedSize, setSelectedSize] = useState(null); // Track selected size

    // Handle adding an item to the cart
    const handleAddToCart = (item) => {
        if (!selectedSize) {
            alert('Please select a size!');
            return;
        }

        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

        const itemExists = existingCart.find(cartItem => cartItem.id === item.id && cartItem.selectedSize === selectedSize);

        if (itemExists) {
            alert('This item with the selected size is already in the cart');
            return;
        }

        const updatedCart = [...existingCart, { ...item, selectedSize }]; // Include the selected size
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        alert('Item added to cart');
    };
    useEffect(()=>{
        AOS.init();
    })

    return (
        <div className='mt-3  container-fluid product-container'>
            
            {data.length > 0 && data.map((item) => (
                <Card data-aos="zoom-in-up"  key={item.id} style={{ width: '18rem' }} className='Card-container'>
                    <img
                    className='product-img'
                        alt={item.name}
                        src={item.image}
                        style={{ width: '100%', height: '300px', backgroundSize: 'cover', objectFit: 'scale-down' }}
                    />
                    <CardBody className='card-body'>
                        <CardTitle tag="h5">{item.name}</CardTitle>
                        <CardSubtitle className="mb-2 " style={{color:"gray"}} tag="h6">{item.description}</CardSubtitle>
                        <CardText>{item.category}</CardText>
                        <CardText><b><i className="bi bi-currency-rupee"></i>{item.price}</b></CardText>
                        <div>
                            Sizes:<br />
                            {item.sizes && item.sizes.map((size, i) => (
                                <Button key={i} className={`size-button ${selectedSize === size ? 'active' : ''}`} onClick={() => setSelectedSize(size)}>
                                    {size}
                                </Button>
                            ))}
                        </div>
                        <div>
                            <Button className='add-cart' onClick={() => handleAddToCart(item)}>
                                Add to Cart
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};
