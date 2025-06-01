/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { UseGlobalContext } from "../components/Context";
import styled from "styled-components";

const Single = () => {
  const { id } = useParams(); // URL dan StadiumID ni olish
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(
    `http://45.138.158.239:5923/api/Stadium/GetById?StadiumID=${id}`
  );
  const { setSelected } = UseGlobalContext();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <div>Yuklanmoqda...</div>;
  if (error) return <div>Xatolik: {error.message}</div>;
  if (!data) return <div>Ma'lumot topilmadi</div>;

  const {
    stadiumName,
    stadiumPhoneNumber,
    landMark,
    hasLights,
    pricePerHour,
    rules,
    latitude,
    longitude,
    averageRating,
    totalVotes,
    stadiumMedias,
    comments,
  } = data;

  const handleBook = () => {
    setSelected(data); // Global context'ga stadion ma'lumotlarini saqlash
    navigate("/order");
  };

  return (
    <SingleContainer>
      <div className="single-box">
        <div className="single-image">
          <img
            src={stadiumMedias[0]?.photoUrl || "/default-stadium.png"}
            alt={stadiumName}
          />
        </div>
        <div className="single-info">
          <h2>{stadiumName}</h2>
          <div className="single-info-table">
            <div className="single-info-table-row">
              <span className="single-info-table-column">Telefon:</span>
              <span className="single-info-table-column">{stadiumPhoneNumber}</span>
            </div>
            <div className="single-info-table-row">
              <span className="single-info-table-column">Manzil:</span>
              <span className="single-info-table-column">{landMark}</span>
            </div>
            <div className="single-info-table-row">
              <span className="single-info-table-column">Yorug'lik:</span>
              <span className="single-info-table-column">
                {hasLights ? "Mavjud" : "Mavjud emas"}
              </span>
            </div>
            <div className="single-info-table-row">
              <span className="single-info-table-column">Narx (soatiga):</span>
              <span className="single-info-table-column">{pricePerHour} so'm</span>
            </div>
            <div className="single-info-table-row">
              <span className="single-info-table-column">Reyting:</span>
              <span className="single-info-table-column">
                {averageRating} ({totalVotes} ovoz)
              </span>
            </div>
          </div>
          <div className="single-rules">
            <h3>Qoidalar</h3>
            <p>{rules}</p>
          </div>
          <button className="book-btn" onClick={handleBook}>
            Bron qilish
          </button>
        </div>
      </div>

      <div className="single-map">
        <h3>Joylashuv</h3>
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          style={{ height: "400px", width: "100%", borderRadius: "15px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[latitude, longitude]}>
            <Popup>{stadiumName}</Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="single-comments">
        <h3>Sharhlar</h3>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment, index) => (
              <li key={index} className="comment-item">
                <p>
                  {comment.isAnonymous ? "Anonim" : `Foydalanuvchi ${comment.customerId}`}
                </p>
                <p>{comment.textMessage}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Hozircha sharhlar yo'q</p>
        )}
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
            <p>
              <a href="/">Asosiy</a>
            </p>
            <p>
              <a href="/aboutus">Biz haqimizda</a>
            </p>
            <p>
              <a href="/collection">Maydonlar</a>
            </p>
            <p>
              <a href="/contacts">Bog'lanish uchun</a>
            </p>
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
            placeholder={width > 500 ? "pochtangizni kiriting" : null}
          />
          <button>Bog'lanish</button>
        </div>
      </footer>
    </SingleContainer>
  );
};

const SingleContainer = styled.div`
  max-width: 1920px;
  margin: 90px auto 0 auto;
  padding: 0 2%;
`;

export default Single;