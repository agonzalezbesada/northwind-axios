import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DataManager() {
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState({ id: "", data: "" }); // Prototipe
  const [order, setOrder] = useState({});
  const [visibility, setVisibility] = useState("hidden");

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
    setOrder({
      id: order.id,
      customerId: order.customerId,
      shipName: order.shipName,
      shipVia: order.shipVia,
      employeeId: order.employeeId,
      unitPrice: order.unitPrice,
    });
    setVisibility("visible");
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
      order.unitPrice = event.target.value;
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

  function deleteData(event, id) {
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
      <div className="modal-update" style={{ visibility: `${visibility}` }}>
        <table>
          <thead>
            <tr>
              <th>customerId</th>
              <th>shipName</th>
              <th>shipVia</th>
              <th>employeeId</th>
              <th>unit price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="customerId"
                  placeholder={order.customerId}
                  onChange={(event) => updateOrder(event)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="shipName"
                  placeholder={order.shipName}
                  onChange={(event) => updateOrder(event)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="shipVia"
                  placeholder={order.shipVia}
                  onChange={(event) => updateOrder(event)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="employeeId"
                  placeholder={order.employeeId}
                  onChange={(event) => updateOrder(event)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="unitPrice"
                  placeholder={order.unitPrice}
                  onChange={(event) => updateOrder(event)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="confirm">
          <button onClick={updateAPI}>Ok</button>
          <button onClick={() => setVisibility("hidden")}>Cancel</button>
        </div>
      </div>

      <table className="orders-data" onClick={() => (visibility == "visible" ? setVisibility("hidden") : false)}>
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
                <td>
                  {order.customerId}
                  {/* <input
                type="text"
                name="customerId"
                id={order.id}
                placeholder={order.customerId}
                onChange={(event) => changeData(event, order.id)}
                /> */}
                </td>
                <td>{order.shipName}</td>
                <td>{order.shipVia}</td>
                <td>{order.employeeId}</td>
                <td>{order.details[0].unitPrice}</td>
                <td>
                  <button
                    onClick={(event) =>
                      modalUpdate({
                        id: order.id,
                        customerId: order.customerId,
                        shipName: order.shipName,
                        shipVia: order.shipVia,
                        employeeId: order.employeeId,
                        unitPrice: order.details[0].unitPrice,
                      })
                    }
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button onClick={(event) => deleteData(event, order.id)}>
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
