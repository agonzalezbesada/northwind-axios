import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DataManager() {
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState({ id: "", data: "" });

  useEffect(() => {
    axios
      .get("https://northwind.vercel.app/api/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function changeData(event, id) {
    setData({ id: id, customerId: (event.target.name == "customerId" ? event.target.value : false) });
  }

  function updateData(event, id) {
    let index = orders.findIndex((x) => x.id === id);

    // [...orders] returns the same reference (shouldn´t?)
    let newOrders = JSON.parse(JSON.stringify(orders));

    if (data.id == id) {
      newOrders[index].customerId = data.customerId;
      console.log("Valores cambiados");
    }

    if (orders[index].customerId == newOrders[index].customerId) {
    } else {
      axios
        .put(
          `https://northwind.vercel.app/api/orders/${newOrders[index].id}`,
          newOrders[index]
        )
        .then((response) => {

          axios
            .get("https://northwind.vercel.app/api/orders")
            .then((response) => {
              setOrders(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function deleteData(event, id) {
    axios
      .delete(`https://northwind.vercel.app/api/orders/${id}`)
      .then((response) => {
        console.log(response);

        axios
          .get("https://northwind.vercel.app/api/orders")
          .then((response) => {
            setOrders(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });;

      

  }

  return (
    <>
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
        
        {orders && orders?.map((order) => (
          <tr key={order.id}>
            <td className="value-cell">
              {/* {order.customerId} */}
              {/* <span className="data">{order.customerId}</span> */}
              <input
                type="text"
                name="customerId"
                id={order.id}
                placeholder={order.customerId}
                onChange={(event) => changeData(event, order.id)}
              />
            </td>
            <td>
              <span>{order.shipName}</span>
            </td>
            <td>
              <span>{order.shipVia}</span>
            </td>
            <td>
              <span>{order.employeeId}</span>
            </td>
            <td>
              <span>{order.details[0].unitPrice}</span>
            </td>
            <td>
              <button onClick={(event) => updateData(event, order.id)}>
                Update
              </button>
            </td>
            <td>
              <button onClick={(event) => deleteData(event, order.id)}>
                Delete
              </button>
            </td>

            {/* Details are no included, but it can be done this way: <td>{order.details[0].productId}</td> */}
          </tr>
        ))}
      </tbody>
    </>
  );
}