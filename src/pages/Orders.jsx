import React from 'react';
import { UseGlobalContext } from '../components/Context';

const Orders = () => {
  const { data: orders } = UseGlobalContext();

  if (!orders) return <p>Yuklanmoqda...</p>;
  if (orders.length === 0) return <p>Buyurtmalar mavjud emas</p>;

  return (
    <div className="orders-page">
      <h2 className="orders-title">Buyurtmalar ro‘yxati</h2>
      <ul className="orders-list">
        {orders.map(order => (
          <li key={order.id} className="order-card">
            <p className="order-item"><span className="label">Buyurtma ID:</span> {order.id}</p>
            <p className="order-item"><span className="label">Mijoz:</span> {order.customerFullName}</p>
            <p className="order-item"><span className="label">Stadion:</span> {order.stadiumName}</p>
            <p className="order-item"><span className="label">Telefon:</span> {order.stadiumPhoneNumber}</p>
            <p className="order-item"><span className="label">Boshlanish:</span> {new Date(order.startTime).toLocaleString()}</p>
            <p className="order-item"><span className="label">Tugash:</span> {new Date(order.endTime).toLocaleString()}</p>
            <p className="order-item"><span className="label">Narx:</span> {order.overallPrice} so‘m</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
