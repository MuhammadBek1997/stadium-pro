/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { UseGlobalContext } from "../components/Context";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import Card3D from "../components/Card3D";

const Collection = () => {
  const { data } = UseGlobalContext();
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(width > 425 ? 10 : 5);

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data ? data.slice(indexOfFirstItem, indexOfLastItem) : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!data) return <div>Yuklanmoqda...</div>;

  return (
    <>
      <div className="collection-box">
        <div className="collection">
          <div className="collection-top">
            <div className="collection-top-left">
              <h2 className="collection-top-left-head">Maydonlar</h2>
              <div className="collection-top-left-shows">
                <p>
                  {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, data.length)}
                </p>
              </div>
            </div>
            <div className="collection-top-right">
              <div className="pagination-box">
                <Pagination
                  itemPerPage={itemPerPage}
                  totalItems={data.length}
                  paginate={paginate}
                />
              </div>
            </div>
          </div>
          <div className="collection-list">
            {currentItems.map((item, index) => (
              <Card3D key={index} {...item} />
            ))}
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-logo">
          <Link to={"/"}>
            <img src="/footLogo.png" alt="logo" />
          </Link>
        </div>
        <div className="footer-menu">
          <h3>Bo'limlar</h3>
          <div className="footer-menu-cont">
            <p>
              <Link to={"/"}>Asosiy</Link>
            </p>
            <p>
              <Link to={"/aboutus"}>Biz haqimizda</Link>
            </p>
            <p>
              <Link to={"/collection"}>Maydonlar</Link>
            </p>
            <p>
              <Link to={"/contacts"}>Bog'lanish uchun</Link>
            </p>
          </div>
        </div>
        <div className="footer-contacts">
          <h3>Kontaktlar</h3>
          <p>manzil</p>
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
    </>
  );
};

export default Collection;