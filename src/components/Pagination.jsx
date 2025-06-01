/* eslint-disable react/prop-types */


const Pagination = ({itemPerPage,totalItems,paginate}) => {

    const pageNumbers = [];

    
    

    for(let i = 1; i<= Math.ceil(totalItems/itemPerPage);i++){
        pageNumbers.push(i)
    }


  return (
    <nav className="paginations-nav" >
        <ul className="paginations">
            {
                pageNumbers.map(number=>(
                    <li key={number} onClick={()=>{
                        paginate(number);
                        localStorage.setItem("choo",number)
                    }} style={localStorage.getItem("choo")==number?{backgroundColor: "#f42c37",cursor:"pointer",color:"#FFF"}:{color:"#000",cursor:"pointer"}} className="page-item">
                        <a  style={{cursor:"pointer"}} className="page-link">
                            {number}
                        </a>
                    </li>
                ))
            }
        </ul>
    </nav>
  )
}

export default Pagination
