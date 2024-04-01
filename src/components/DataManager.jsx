import React, { useEffect, useState } from "react";
import axios from "axios";
import lodash from "lodash";
import Modal from "./Modal";
import { Link } from "react-router-dom";

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
    setOrder(lodash.cloneDeep(order));
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
      order.details[0].unitPrice = isNaN(event.target.value)
        ? event.target.value
        : parseInt(event.target.value);
    }
  }

  function updateAPI() {
    let index = orders.findIndex((x) => x.id === order.id);

    let newOrders = lodash.cloneDeep(orders);

    newOrders[index].customerId = order.customerId;
    newOrders[index].shipName = order.shipName;
    newOrders[index].shipVia = order.shipVia;
    newOrders[index].employeeId = order.employeeId;
    newOrders[index].details[0].unitPrice = order.details[0].unitPrice;

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
            <th>Details</th>
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
                <td>
                  <Link to={`/orders/${order.id}`}>Details</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
