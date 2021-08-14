import React, {useState, useEffect} from "react";
import HousesComp from "./components/HousesComp";

const API = 'https://603e38c548171b0017b2ecf7.mockapi.io/homes';

function App() {

  const [houses, setHouses] = useState([]); // здесь храним массив с информацией о домах

  // забираем данные с api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API);

          if (response.ok) {
            const dataJson = await response.json();
            const data = [...dataJson]; 
            setHouses(data.splice(0, 6));
          }
      } catch(err) {
        console.log(err);
      }
    }

    fetchData();
  }, []) 

  return (
    <>
      <header className="header">
        <div className="header__container container">
          <a className="header__heading_link" href="/">
            <h1 className="header__heading">
              Our Latest Developments
            </h1>
          </a>
        </div>
      </header>

      <main className="main">
        <div className="main__container container">
        <HousesComp houses={houses} />

          <button className="main__button btn">
            <span className="btn_text">See more </span><i className="btn__arrow fas fa-chevron-right"></i>
          </button>
        </div>
      </main>

      <footer className="footer"></footer>
    </>
  );
}

export default App;
