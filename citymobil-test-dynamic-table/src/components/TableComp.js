import React, {useState} from 'react';
import SearchComp from './SearchComp';
import TableRowComp from './TableRowComp';
import TableCommonComp from './TableCommonComp';

function TableComp(props) {

    const cars = props.cars;

    // здесь будут хранится отфильтрованные машины
    let [filtered, setFiltered] = useState([]);

    /**
     * эта функция проверяет, есть ли в переданном обекте машины тот или иной тариф
     * если есть, то возвращает год выпуска, если нет, то '-'
     * @param {*} car
     * @return {*} возвращает разметку с тарифами и годом выпуска для каждой машины
     */
    const generateTariffs = car => {
        return(
            <>
                {car.tariffs.hasOwnProperty('Эконом') ? (
                    <td data-year={car.tariffs['Эконом'].year}>
                        {car.tariffs['Эконом'].year}
                    </td>
                    ) : (
                        <td data-year={""}>-</td>
                    )}

                {car.tariffs.hasOwnProperty('Комфорт') ? (
                    <td data-year={car.tariffs['Комфорт'].year}>        
                        {car.tariffs['Комфорт'].year}
                    </td>
                    ) : (
                        <td data-year={""}>-</td>
                    )}
                {car.tariffs.hasOwnProperty('Комфорт+') ? (
                    <td data-year={car.tariffs['Комфорт+'].year}>
                        {car.tariffs['Комфорт+'].year}
                    </td>
                    ) : (
                        <td data-year={""}>-</td>
                    )}
                {car.tariffs.hasOwnProperty('Минивен') ? (
                    <td data-year={car.tariffs['Минивен'].year}>
                        {car.tariffs['Минивен'].year}
                    </td>
                    ) : (
                        <td data-year={""}>-</td>
                    )}
                {car.tariffs.hasOwnProperty('Бизнес') ? (
                    <td data-year={car.tariffs['Бизнес'].year}>     
                        {car.tariffs['Бизнес'].year}
                    </td>
                    ) : (
                        <td data-year={""}>-</td>
                    )}
            </>
        )
    }

    // следим за состоянием поисковой строки
    const [filteredState, setFilteredState] = useState(false);
 
    /**
     *
     *  обновляем состояние
    *  в зависимости от его значения показываем либо полный список машин, либо отфильтрованный
     * @param {*} value массив отфильтрованных машин
     */
    const updateFiltered = (value) => {
        setFiltered(value);

        if (filtered.length === -1) {
            setFilteredState(false);
        } else {
            setFilteredState(true);
        }
    }

    // сюда сохраняем модель, марку и год выпуска машины, по которой кликнул пользователь
    const [chosenCar, setChosenCar] = useState({
        car: '',
        year: ''
    });

    /**
     * обновляем данные о машине, на которую кликнул пользователь
     * @param {*} car модель и марка машины в виде строки
     * @param {*} year год выпуска машины
     */
    const showChosenCar = (car, year) => {
        setChosenCar({
            car: car,
            year: year
        });
    }

    /**
     * выводим данные о машине, на которую кликнул пользователь, на страницу
     * @return {*} 
     */
    const showChosenCarString = () => {
        const {car, year} = chosenCar;
        if (year === '') {
            return (
                <span>{`Выбран автомобиль ${car}`}</span>
            )
        } else {
            return (
                <span>{`Выбран автомобиль ${car} ${year} года выпуска`}</span>
            )
        }
    }


    const [order, setOrder] = useState(true);

    /**
     * меняем состояние order и передаем массив машин в функцию updateCars для дальнейшей сортировки 
     */
    const sortCars = () => {
        setOrder(!order);
        props.updateCars(cars);
    }

    return (
      <section id="table-block">

        <SearchComp cars={cars} updateFiltered={updateFiltered} generateTariffs={generateTariffs} />

        <div id="table-container">
            <table id="table-head">
                    <thead>
                        <tr>
                            <td>
                                <label htmlFor="sort">
                                    Марка и модель {order === true ? <i className="fas fa-sort-alpha-down"></i> : <i className="fas fa-sort-alpha-up-alt"></i>}
                                </label>
                                <input onChange={sortCars} type="checkbox" className="hidden" id="sort" name="sort" />
                            </td>
                            <td><span>Эконом</span></td>
                            <td><span>Комфорт</span></td>
                            <td><span>Комфорт+</span></td>
                            <td><span>Минивен</span></td>
                            <td><span>Бизнес</span></td>
                        </tr>
                    </thead>
                </table>
                
                    <div id="scroll-block">
                        <table>
                            <tbody>
                                {filtered.length === props.cars.length || filteredState === false ? (
                                    <TableRowComp showChosenCar={showChosenCar} generateTariffs={generateTariffs} cars={cars} />
                                ) : (
                                    filtered.map(car => {
                                        return (
                                            <TableCommonComp showChosenCar={showChosenCar} generateTariffs={generateTariffs} car={car} />
                                        )
                                    })
                                )
                                }
                            </tbody>
                        </table>
                    </div>
        </div>        

        <div className="chosen-car-text">{ showChosenCarString() }</div>

      </section>
    )
}

export default TableComp;