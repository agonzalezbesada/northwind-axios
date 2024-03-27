import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";

export default function DataManager() {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({});
  const [visibility, setVisibility] = useState(false);

  function getOrders() {
    axios
      .get("https://northwind.vercel.app/api/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getOrders();
  }, []);

  function modalUpdate(order) {
    setOrder(order);
    setVisibility(true);
  }

  function updateOrder(event) {
    if (event.target.name == "customerId") {
      order.customerId = event.target.value;
    } else if (event.target.name == "shipName") {
      order.shipName = event.target.value;
    } else if (event.target.name == "shipVia") {
      order.shipVia = event.target.value;
    } else if (event.target.name == "employeeId") {
      order.employeeId = event.target.value;
    } else if (event.target.name == "unitPrice") {
      console.log(order.details[0].unitPrice);
      order.details[0].unitPrice = event.target.value;
    }
  }

  function updateAPI() {
    let index = orders.findIndex((x) => x.id === order.id);

    // [...orders] returns the same reference (shouldn´t?)
    let newOrders = JSON.parse(JSON.stringify(orders));

    newOrders[index].customerId = order.customerId;
    newOrders[index].shipName = order.shipName;
    newOrders[index].shipVia = order.shipVia;
    newOrders[index].employeeId = order.employeeId;
    newOrders[index].details[0].unitPrice = order.unitPrice;

    if (JSON.stringify(orders[index]) === JSON.stringify(newOrders[index])) {
    } else {
      axios
        .put(
          `https://northwind.vercel.app/api/orders/${newOrders[index].id}`,
          newOrders[index]
        )
        .then((response) => {
          getOrders();
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setVisibility("hidden");
  }

  function deleteData(id) {
    axios
      .delete(`https://northwind.vercel.app/api/orders/${id}`)
      .then((response) => {
        console.log(response);

        getOrders();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      {visibility === true ? (
        <Modal
          setVisibility={setVisibility}
          order={order}
          updateOrder={updateOrder}
          updateAPI={updateAPI}
        />
      ) : null}
      <table
        className="orders-data"
        onClick={() => (visibility == true ? setVisibility(false) : false)}
      >
        <thead>
          <tr>
            <th>customerId</th>
            <th>shipName</th>
            <th>shipVia</th>
            <th>employeeId</th>
            <th>unit price</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders?.map((order) => (
              <tr key={order.id}>
                <td>{order.customerId}</td>
                <td>{order.shipName}</td>
                <td>{order.shipVia}</td>
                <td>{order.employeeId}</td>
                <td>{order.details[0].unitPrice}</td>
                <td>
                  <button onClick={() => modalUpdate(order)}>Update</button>
                </td>
                <td>
                  <button onClick={(event) => deleteData(order.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
