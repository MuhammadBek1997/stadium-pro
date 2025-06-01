/* eslint-disable no-unused-vars */
import { useState } from "react";
import { UseGlobalContext } from "../components/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const Orders = () => {
  const { selected } = UseGlobalContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dateTime: new Date(),
    notes: "",
  });

  if (!selected) {
    return (
      <OrderContainer>
        <div className="order-box">
          <h2>Stadion tanlanmadi</h2>
          <p>Iltimos, maydon tanlash uchun <a href="/collection">Maydonlar</a> sahifasiga o'ting.</p>
        </div>
      </OrderContainer>
    );
  }

  const { stadiumName, pricePerHour, landMark, stadiumPhoneNumber } = selected;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, dateTime: date }));
  };

  const sendOrder = async (e) => {
    e.preventDefault();
    const token = "7157344958:AAHLka3iQnKDPjyvobBZQrDB_Yd82wrFyuw";
    const chatID = "958496624";
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const message = `
      Yangi buyurtma:
      Stadion: ${stadiumName}
      Ism: ${formData.name}
      Telefon: ${formData.phone}
      Sana va vaqt: ${formData.dateTime.toLocaleString()}
      Izoh: ${formData.notes || "Yo'q"}
      Narx (soatiga): ${pricePerHour} so'm
      Manzil: ${landMark}
    `;

    try {
      await axios.post(url, {
        chat_id: chatID,
        text: message,
      });
      toast.success("Buyurtma yuborildi!", { position: "top-right" });
      setFormData({
        name: "",
        phone: "",
        dateTime: new Date(),
        notes: "",
      });
      navigate("/collection");
    } catch (error) {
      toast.error("Xatolik yuz berdi!", { position: "top-right" });
      console.error("Telegram error:", error);
    }

    // TODO: Agar backendda buyurtma yaratish endpointi bo'lsa, quyidagi kabi so'rov yuborish mumkin:
    /*
    try {
      await axios.post("http://45.138.158.239:5923/api/Order/Create", {
        stadiumId: selected.id,
        customerName: formData.name,
        customerPhone: formData.phone,
        bookingDateTime: formData.dateTime,
        notes: formData.notes,
      });
      toast.success("Buyurtma muvaffaqiyatli yaratildi!");
    } catch (error) {
      toast.error("Buyurtma yaratishda xatolik!");
    }
    */
  };

  return (
    <OrderContainer>
      <div className="order-box">
        <h2>{stadiumName} uchun buyurtma</h2>
        <div className="order-stadium-info">
          <p><strong>Manzil:</strong> {landMark}</p>
          <p><strong>Telefon:</strong> {stadiumPhoneNumber}</p>
          <p><strong>Narx (soatiga):</strong> {pricePerHour} so'm</p>
        </div>
        <form className="order-form" onSubmit={sendOrder}>
          <div className="form-group">
            <label htmlFor="name">Ism:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ismingizni kiriting"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Telefon:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+998 XX XXX XX XX"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateTime">Sana va vaqt:</label>
            <DatePicker
              selected={formData.dateTime}
              onChange={handleDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
              dateFormat="MMMM d, yyyy h:mm aa"
              minDate={new Date()}
              className="date-picker"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Qo‘shimcha izoh:</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Izohingizni kiriting (ixtiyoriy)"
            />
          </div>
          <button type="submit" className="order-submit-btn">Buyurtma berish</button>
        </form>
      </div>

      <footer className="footer">
        <div className="footer-logo">
          <a href="/">
            <img src="/footLogo.png" alt="logo" />
          </a>
        </div>
        <div className="footer-menu">
          <h3>Bo'limlar</h3>
          <div className="footer-menu-cont">
            <p><a href="/">Asosiy</a></p>
            <p><a href="/aboutus">Biz haqimizda</a></p>
            <p><a href="/collection">Maydonlar</a></p>
            <p><a href="/contacts">Bog'lanish uchun</a></p>
          </div>
        </div>
        <div className="footer-contacts">
          <h3>Kontaktlar</h3>
          <p>Manzil</p>
        </div>
        <div className="footer-linkus">
          <h3>Biz bilan bog'laning</h3>
          <input
            type="text"
            placeholder="pochtangizni kiriting"
          />
          <button>Bog'lanish</button>
        </div>
      </footer>
    </OrderContainer>
  );
};

const OrderContainer = styled.div`
  max-width: 1920px;
  margin: 90px auto 0 auto;
  padding: 0 2%;
`;

export default Orders;