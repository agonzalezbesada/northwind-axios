import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function Details() {
  const params = useParams();
  const { id } = params;
  const [order, setOrder] = useState({});

  useEffect(() => {
    axios
      .get(`https://northwind.vercel.app/api/orders/${id}`)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="details">
      <h1>Order details</h1>
      <div className="order-details">
        <p className="detail">id: {order.id}</p>
        <p className="detail">customerId: {order.customerId}</p>
        <p className="detail">employeeId: {order.employeeId}</p>
        <p className="detail">orderDate: {order.orderDate}</p>
        <p className="detail">requiredDate: {order.requiredDate}</p>
        <p className="detail">shippedDate: {order.shippedDate}</p>
        <p className="detail">shipVia: {order.shipVia}</p>
        <p className="detail">freight: {order.freight}</p>
        <p className="detail">shipName: {order.shipName}</p>
        <p className="detail">employeeId: {order.employeeId}</p>
      </div>
      <h1>Product details</h1>
      {order.details &&
        order.details.length > 0 &&
        order.details?.map((order) => (
          <div className="product-details" key={order.productId}>
            <p className="product-detail">productId: {order.productId}</p>
            <p className="product-detail">unitPrice: {order.unitPrice}</p>
            <p className="product-detail">quantity: {order.quantity}</p>
            <p className="product-detail">discount: {order.discount}</p>
          </div>
        ))}
    </div>
  );
}
