import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

export const Cart = ({}) => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from localStorage when the component mounts
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
  }, []);

  // Handle removing an item from the cart
  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update cart in localStorage
  };

  // Handle the checkout process
  const handleCheckout = () => {
    alert('Proceeding to checkout!');
    // Logic for handling checkout can go here, such as redirecting to a payment page.
  };

  return (
    <div className="container mt-5">
      <h1 className='text-light'>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className='text-danger'>Your cart is empty.</p>
      ) : (
        <div className="m-0 container-fluid">
          {cartItems.map((item) => (
            <Card key={item.id} style={{ width: '18rem' }} className='Card-container'>
              <img
                alt={item.name}
                src={item.image || 'default-image-url.jpg'} // Add a default image if no image is available
                style={{ width: '100%', height: '200px', backgroundSize: 'cover', objectFit: 'scale-down' }}
              />
              <CardBody>
                <CardTitle tag="h5">{item.name}</CardTitle>
                <CardSubtitle className="mb-2 text-muted-light">{item.description}</CardSubtitle>
                <CardText>Price: ${item.price}</CardText>
                <CardText>Size: {item.selectedSize}</CardText> {/* Display the selected size */}
                <Button color="danger" onClick={() => handleRemoveItem(item.id)}>
                  Remove
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="mt-4">
          <Button color="primary" onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
};
