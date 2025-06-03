/* eslint-disable react/no-unescaped-entities */


import { useEffect, useState } from "react";
import { UseGlobalContext } from "../components/Context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



const Home = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const { data } = UseGlobalContext()
  const navigate = useNavigate();




  const sendMessage = (event) => {
    event.preventDefault();

    const token = "7157344958:AAHLka3iQnKDPjyvobBZQrDB_Yd82wrFyuw";
    const chatID = "958496624";
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    // Assuming you have form inputs with ids 'name' and 'number'
    const email = document.getElementById('email').value;
    // const notify = () => toast.success(`Send to ${name}`,{position:"top-right"});

    axios.post(url, {
      chat_id: chatID,
      text: `Name: ${email}`
    }).then(() => () => {
      alert.success(`${t("send"), email}`);
    })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!data) return <div>Yuklanmoqda...</div>


  return (
    <div className="home">

      {/* Hero */}

      <div className="home-hero">
        <img src={"/hero-image.png"} alt="hero-image" className="home-hero-img" />
        <h1 className="home-hero-text">
          <span className="home-hero-text-s">
            Biz
          </span>
          <br />
          <span className="home-hero-text-m">
            Sportni
          </span>
          <br />
          <span className="home-hero-text-l">
            Tanlaymiz
          </span>
        </h1>
      </div>


      {/* Services */}


      <div className="home-ourserv-box">
        <div className="home-ourserv">
          <ul className="home-ourserv-list">
            <li className="home-ourserv-list-item">
              <img src="/noun_delivery_1095359.svg" alt="" className="" />
              <div className="about-serv">
                <h3 className="serv-name">
                  Sifatli
                </h3>
                <p className="serv-info">
                  hizmatlar
                </p>
              </div>
            </li>
            <li className="home-ourserv-list-item">
              <img src="/noun_guarantee_952398.svg" alt="" className="" />
              <div className="about-serv">
                <h3 className="serv-name">
                  Maroqli
                </h3>
                <p className="serv-info">
                  lahzalar
                </p>
              </div>
            </li>
            <li className="home-ourserv-list-item">
              <img src="/Group-995.svg" alt="" className="" />
              <div className="about-serv">
                <h3 className="serv-name">
                  Doimiy
                </h3>
                <p className="serv-info">
                  qo'llab-quvvatlash
                </p>
              </div>
            </li>
            <li className="home-ourserv-list-item">
              <img src="/noun_Wallet_745515.svg" alt="" className="" />
              <div className="about-serv">
                <h3 className="serv-name">
                  Tezkor
                </h3>
                <p className="serv-info">
                  qabul
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Winter collection */}

      <div className="winter-collection-top-box">
        <div className="winter-collection-top">
          <div>
            <h2>
              100%
            </h2>
            <span>Sifat</span>
          </div>
          <img src="/winter-stadium.png" alt="" />
          <div className="winter-collection-top-text-cont">
            <h3>
              Qishki
            </h3>
            <p>
              maydonlar
            </p>
            <button className="winter-collectBtn" onClick={() => {
              navigate("/");
              scrollTo(0, 0)
            }}>
              To'plami
            </button>
          </div>
        </div>
      </div>

      <div className="winter-collection">
        {data.slice(0, 3).map((item, index) => (
          <div key={index} className="stadium-card" onClick={() => navigate(`/single/${item.id}`)}>
            <img src={item.stadiumMedias[0]?.photoUrl} alt={item.stadiumName} className="stadium-image" />
            <div className="stadium-info">
              <h3 className="stadium-name">{item.stadiumName}</h3>
              <p className="stadium-location">📍 {item.landMark}</p>
              <p className="stadium-phone">📞 {item.stadiumPhoneNumber}</p>
              <p className="stadium-price">💰 {item.pricePerHour.toLocaleString()} so'm/soat</p>
              <p className="stadium-lights">{item.hasLights ? '💡 Yoritish mavjud' : '🌑 Yoritish yo‘q'}</p>
              <p className="stadium-rating">⭐ {item.averageRating} ({item.totalVotes} ovoz)</p>
              <p className="stadium-rules">📋 Qoidalar: {item.rules}</p>
            </div>
          </div>
        ))}
      </div>





      {/* Summer collection */}





      <div className="summer-collection-top-box">
        <div className="summer-collection-top">
          <div>
            <h2>
              100%
            </h2>
            <span>Sifat</span>
          </div>
          <img src="/summer-stadium.png" alt="" />
          <div className="summer-collection-top-text-cont">
            <h3>
              Yozgi
            </h3>
            <p>
              maydonlar
            </p>

            <button className="summer-collectBtn" onClick={() => {
              navigate("/collection")
              scrollTo(0, 0)
            }}>
              to'plam
            </button>
          </div>
        </div>
      </div>

      <div className="summer-collection">
        {data.slice(0, 3).map((item, index) => (
          <div key={index} className="stadium-card" onClick={() => navigate(`/single/${item.id}`)}>
            <img src={item.stadiumMedias[0]?.photoUrl} alt={item.stadiumName} className="stadium-image" />
            <div className="stadium-info">
              <h3 className="stadium-name">{item.stadiumName}</h3>
              <p className="stadium-location">📍 {item.landMark}</p>
              <p className="stadium-phone">📞 {item.stadiumPhoneNumber}</p>
              <p className="stadium-price">💰 {item.pricePerHour.toLocaleString()} so'm/soat</p>
              <p className="stadium-lights">{item.hasLights ? '💡 Yoritish mavjud' : '🌑 Yoritish yo‘q'}</p>
              <p className="stadium-rating">⭐ {item.averageRating} ({item.totalVotes} ovoz)</p>
              <p className="stadium-rules">📋 Qoidalar: {item.rules}</p>
            </div>
          </div>
        ))}

      </div>






      <footer className="footer">
        <div className="footer-logo">
          <Link to={"/"}>
            <img src="/footLogo.png" alt="logo" />
          </Link>
        </div>
        <div className="footer-menu">
          <h3>
            Bo'limlar
          </h3>
          <div className="footer-menu-cont">
            <p>
              <Link to={"/"}>
                Asosiy
              </Link>
            </p>
            <p>
              <Link to={"/aboutus"}>
                Biz haqimizda
              </Link>
            </p>
            <p>
              <Link to={"/collection"}>
                Maydonlar
              </Link>
            </p>
            <p>
              <Link to={"/contacts"}>
                Bog'lanish uchun
              </Link>
            </p>
          </div>
        </div>
        <div className="footer-contacts">
          <h3>
            Kontaktlar
          </h3>
          <p>
            Manzil
          </p>
        </div>
        <form className="footer-linkus" onSubmit={sendMessage}>
          <h3>
            Biz bilan bog'laning
          </h3>
          <input type="text" placeholder={width > 500 ? ("pochtangizni kiriting") : null} id="email" />
          <button>
            Yuborish
          </button>
        </form>
      </footer>

    </div>
  )
}

export default Home
