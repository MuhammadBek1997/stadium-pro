/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react"
import { UseGlobalContext } from "../components/Context"
import { Link, useNavigate } from "react-router-dom"
import Pagination from "../components/Pagination";
import Card3D from "../components/Card3D";



const Collection = () => {
    const { data } = UseGlobalContext()
    
    if(!data) return <div>Yuklanmoqda...</div>
    
    const [width, setWidth] = useState(window.innerWidth);
    const [current, setCurrent] = useState(data)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(width > 425 ? 10 : 5);
    
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstitem = indexOfLastItem - itemPerPage;
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    
    
    
    const navigate = useNavigate();
    

    useEffect(() => {
        // Function to update width when the window is resized
        const handleResize = () => setWidth(window.innerWidth);

        // Add event listener on component mount
        window.addEventListener('resize', handleResize);

        // Remove event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <>
            <div className="collection-box">
                <div className="collection-sidebar">
                    <h2 className="collection-sidebar-categories-toptext">
                        Maydonlar
                    </h2>
                    <div className="collection-sidebar-categories">
                        <h2 onClick={() => setCurrent(data)} className="selected">
                            Qishgi
                        </h2>
                        <h2 onClick={() => setCurrent(data)} className="selected">
                            Yozgi
                        </h2>
                    </div>
                </div>






                <div className="collection" >
                    <div className="collection-top">
                        <div className="collection-top-left">
                            <h2 className="collection-top-left-head">
                                to'plam
                            </h2>
                            <div className="collection-top-left-shows">
                                <p>
                                    {indexOfFirstitem + 1}-{indexOfLastItem}
                                </p>
                            </div>
                        </div>
                        <div className="collection-top-right">
                            <div className="pagination-box">
                                <Pagination itemPerPage={itemPerPage} totalItems={current.length} paginate={paginate} />
                            </div>
                            <button className={current.length===20?"collection-top-right-sort-none":"collection-top-right-sort"} onClick={() => setCurrent([].concat(data))}>
                                barchasi
                            </button>

                        </div>
                    </div>
                    <div className="collection-list">


                        {current.map((item,index) => <Card3D key={index} {...item} />)}

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
                        manzil
                    </p>
                </div>
                <div className="footer-linkus">
                    <h3>
                        Biz bog'lanish
                    </h3>
                    <input type="text" placeholder={width > 500 ? ("pochtangizni kiriting") : null} />
                    <button>
                        Bog'lanish
                    </button>
                </div>
            </footer>

        </>
    )
}

export default Collection
