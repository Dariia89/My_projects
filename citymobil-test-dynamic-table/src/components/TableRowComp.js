import React from 'react';
import TableCommonComp from './TableCommonComp';

function TableRowComp(props) {

    const cars = props.cars;
    
    return (
      <>
        {cars.map(car => {
            return (
                <TableCommonComp key={`${car.model} ${car.mark}`} showChosenCar={props.showChosenCar} generateTariffs={props.generateTariffs} car={car} />
        )})}

      </>
    )
}

export default TableRowComp;
