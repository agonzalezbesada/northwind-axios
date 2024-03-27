import React from "react";

export default function Modal({setVisibility, order, updateOrder, updateAPI}) {

    return (
      <div className="modal-update">
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
              <td className="modal-td">
                <input className="modal-input"
                  type="text"
                  name="modal-input customerId"
                  placeholder={order.customerId}
                  onChange={(event) => updateOrder(event)}
                />
              </td>
              <td className="modal-td">
                <input className="modal-input"
                  type="text"
                  name="modal-input shipName"
                  placeholder={order.shipName}
                  onChange={(event) => updateOrder(event)}
                />
              </td>
              <td className="modal-td">
                <input className="modal-input"
                  type="text"
                  name="modal-input shipVia"
                  placeholder={order.shipVia}
                  onChange={(event) => updateOrder(event)}
                />
              </td>
              <td className="modal-td">
                <input className="modal-input"
                  type="text"
                  name="modal-input employeeId"
                  placeholder={order.employeeId}
                  onChange={(event) => updateOrder(event)}
                />
              </td>
              <td className="modal-td">
                <input className="modal-input"
                  type="text"
                  name="modal-input unitPrice"
                  placeholder={order.details[0].unitPrice}
                  onChange={(event) => updateOrder(event)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="confirm">
          <button onClick={updateAPI}>Ok</button>
          <button onClick={() => setVisibility(false)}>Cancel</button>
        </div>
      </div>
    );
}