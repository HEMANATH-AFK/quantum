import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import axios from "axios";
import { Store } from "../Store";

const BACKEND_URL = process.env.BACKEND_URL || 'https://quantumafk-backend.onrender.com';

function Product({ product }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart: { cartItems } } = state;

  const AddToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === item._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`${BACKEND_URL}/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  // Handle both full URLs and relative paths
  const getImageUrl = (img) => {
    if (!img) return ''; // fallback
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    return `${process.env.REACT_APP_API_URL || ''}${img}`;
  };

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img
          src={getImageUrl(product.image)}
          className="card-img-top"
          alt={product.name}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} reviews={product.reviews} />
        <Card.Text>₹{product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>Out of stock</Button>
        ) : (
          <Button onClick={() => AddToCartHandler(product)}>Add to Cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
