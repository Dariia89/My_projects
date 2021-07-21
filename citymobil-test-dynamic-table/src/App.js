import React, {useState, useEffect} from 'react';
import './css/index.css';
import TableComp from './components/TableComp';

const API = 'https://city-mobil.ru/api/cars';

function App() {

  // следим за массивом с машинами и тарифами
  const [info, setInfo] = useState({
    cars: [],
    tariffsList: []
  });
  
  // достаем данные с api 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API);
  
        if (response.ok) {
          const jsonResponse = await response.json();
          // делаем деструктурирующее присваивание
          const {cars, tariffs_list: tariffsList} = jsonResponse;
          // и сохраняем в info
          setInfo({
            cars: cars,
            tariffsList: tariffsList
          });
        }
      } catch(err) {
        console.log(err);
      }
    }

    fetchData()
  }, []);
   
  /**
   * функция, которая принимает в себя массив с объектами, 
   * сортирует их в обратном порядке и сохраняет в текущее состояние
   * @param {*} cars 
   */
  const updateCars = (cars) => {
    setInfo({
      cars: cars.reverse(),
    })
  }

  return (
    <>
      <header className="header-footer structure-block">
      <h1 className="heading">header</h1>
    </header>

    <main id="main" className="structure-block">

      <section id="sidebar">
        <h1 className="heading">sidebar</h1>
      </section>

      <TableComp updateCars={updateCars} cars={info.cars} />

    </main>

    <footer className="header-footer structure-block">
      <h1 className="heading">footer</h1>
    </footer>
      
    </>
  );

}

export default App;
