import React from 'react';

function TableCommonComp(props) {

    const car = props.car; 

    /**
     * эта функция сохраняет и передает в функцию showChosenCar модель, марку и год выпуска машины,
     * по которой кликнул пользователь
     * @param {*} e событие
     */
    const handleRowClick = (e) => {
        let id = e.currentTarget.dataset.id;
        let year = e.target.dataset.year;
        console.log(year);
        props.showChosenCar(id, year);
    }

    return (
        <tr onClick={handleRowClick} data-id={`${car.mark} ${car.model}`}>
                    <td data-year={''}>
                        <div>{`${car.mark} ${car.model}`}</div>
                    </td>
                    {props.generateTariffs(car)}
                </tr>
    )
}

export default TableCommonComp;