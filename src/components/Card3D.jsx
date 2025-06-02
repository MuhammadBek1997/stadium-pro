import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UseGlobalContext } from "./Context";


const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
}));

const Card = styled.div`
  position: relative;
  flex-basis: 100%;
  max-width: 220px;
`;

const CardTemplate = styled("div")(() => ({
  width: "100%",
  backfaceVisibility: "hidden",
  height: "400px",
  borderRadius: "6px",
  transformStyle: "preserve-3d",
  transition: "transform 1s cubic-bezier(0.8, 0.3, 0.3, 1)",
}));

const CardFront = styled(CardTemplate)(({ flip }) => ({
  backgroundImage: "url('images/cardimage.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  transform: flip ? "rotateY(-180deg)" : "rotateY(0deg)",
}));

const CardBack = styled(CardTemplate)(({ flip, image }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  background: `url(${image}) no-repeat`,
  backgroundSize: "contain",
  transform: flip ? "rotateY(0deg)" : "rotateY(180deg)",
}));

const CardContent = styled("div")(() => ({
  height: "100%",
  top: "10%",
  position: "absolute",
  left: 0,
  width: "100%",
  backfaceVisibility: "hidden",
  transform: "translateZ(70px) scale(0.90)",
}));

const BGFade = styled("div")(() => ({
  position: "absolute",
  right: 0,
  bottom: 0,
  left: 0,
  height: "200px",
  background: "linear-gradient(to bottom, rgba(0,0,0,0) 20%,rgba(0,0,0,.8) 90%)",
}));

const Card3D = ({ title, image, id }) => {
  const [flip, setFlip] = useState(false);
  const navigate = useNavigate();
  const { createOrder } = UseGlobalContext();

  const handleOrderClick = () => {
    navigate("/orders", { state: { stadiumId: id, stadiumName: title } });
  };

  return (
    <div>
      <Container>
        <Card>
          <CardFront flip={flip}>
            <CardContent onClick={() => setFlip(true)}>
              <div>
                <img src={image} alt={title} className="card-img" />
                <h4>{title}</h4>
              </div>
            </CardContent>
            <BGFade />
          </CardFront>
          <CardBack flip={flip} image={image}>
            <button className="backCloseBtn" onClick={() => setFlip(false)}>
              X
            </button>
            <CardContent>
              <div>
                <button className="btn btn-warning" onClick={handleOrderClick}>
                  Tanlash
                </button>
                <button className="btn btn-danger" onClick={() => setFlip(false)}>
                  Bekor qilish
                </button>
              </div>
              <div className="bonus-box">
                <h4>Bonus</h4>
              </div>
            </CardContent>
          </CardBack>
        </Card>
      </Container>
    </div>
  );
};

export default Card3D;