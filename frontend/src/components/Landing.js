import "./landing.css";
import { useNavigate } from "react-router-dom";
// import priceup from "./price-up.svg";  
// import image2 from "./image2.svg";
// import image3 from "./image3.svg";

const Landing = () => {
    const navigate = useNavigate();
    const handleButton = () =>
    {
        navigate("/signup");
    }
  return (
    <div>
      <div className="hero">
        <h1>Tradeverse</h1>
        <p>
          Simulate real-time stock trading and enhance your financial skills in
          a risk-free environment.
        </p>
        {/* <a href="#" className="btn">
          Start Trading Now
            <button>
          Start Trading Now
            </button>
        </a> */}
        <button onClick = {handleButton}>Start Trading</button>
        
      </div>

      <section className="features">
        <div className="feature">
          <img src="/image1.svg" alt="Real-Time Trading" />
          <h3>Real-Time Simulation</h3>
          <p>Access real-time market data to develop trading strategies.</p>
        </div>
        <div className="feature">
          <img src="/image2.svg" alt="Virtual Portfolio" />
          <h3>Virtual Portfolio</h3>
          <p>
            Trade with virtual money and improve your decision-making skills.
          </p>
        </div>
        <div className="feature">
          <img src="/image3.svg" alt="Learn & Grow" />
          <h3>Learn & Grow</h3>
          <p>Gain insights into your trades enhance your trading knowledge.</p>
        </div>
      </section>

      <footer>
        <p>© 2025 Tradeverse. All Rights Reserved.</p>
      </footer>

    </div>
  );
};

export default Landing;


