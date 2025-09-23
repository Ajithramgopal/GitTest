import React from "react";
import "./OrderTable.css"; // <-- Import CSS file

const orders = [
  {
    id: "#4544321",
    date: "04 February, 2024",
    customer: { name: "Yaga Masamichi", avatar: "https://i.pravatar.cc/40?img=1" },
    payment: "Paid",
    fulfillment: "Fulfilled",
    shipping: "Standard",
  },
  {
    id: "#1644322",
    date: "05 February, 2024",
    customer: { name: "Manami Suda", avatar: "https://i.pravatar.cc/40?img=2" },
    payment: "Paid",
    fulfillment: "Partially Fulfilled",
    shipping: "Express",
  },
  {
    id: "#8244323",
    date: "06 February, 2024",
    customer: { name: "Okkotsu Yuta", avatar: "https://i.pravatar.cc/40?img=3" },
    payment: "Refunded",
    fulfillment: "Unfulfilled",
    shipping: "Standard",
  },
  {
    id: "#6944324",
    date: "07 February, 2024",
    customer: { name: "Kugisaki Nobara", avatar: "https://i.pravatar.cc/40?img=4" },
    payment: "Paid",
    fulfillment: "Fulfilled",
    shipping: "Standard",
  },
  {
    id: "#1244325",
    date: "07 February, 2024",
    customer: { name: "Nanami Kento", avatar: "https://i.pravatar.cc/40?img=5" },
    payment: "Cancelled",
    fulfillment: "Fulfilled",
    shipping: "Economy",
  },
];

export default function OrderTable() {
  return (
    <div className="order-table-wrapper">
      <table className="order-table">
        <thead>
          <tr>
            <th></th>
            <th>Order</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Payment status</th>
            <th>Fulfillment status</th>
            <th>Shipping</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={idx}>
              <td>
                <input type="checkbox" />
              </td>
              <td className="order-link">{order.id}</td>
              <td>{order.date}</td>
              <td className="customer-cell">
                <img
                  src={order.customer.avatar}
                  alt={order.customer.name}
                  className="avatar"
                />
                {order.customer.name}
              </td>
              <td>
                <span className={`status-pill ${order.payment.toLowerCase()}`}>
                  {order.payment}
                </span>
              </td>
              <td>
                <span className={`status-pill ${order.fulfillment.toLowerCase().replace(" ", "-")}`}>
                  {order.fulfillment}
                </span>
              </td>
              <td className={`shipping ${order.shipping.toLowerCase()}`}>
                {order.shipping}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
