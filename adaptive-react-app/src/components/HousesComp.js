import React, {useState} from 'react';
import FilterComp from './FilterComp';
import HouseCardComp from './HouseCardComp';


function HousesComp(props) {
    // здесь будут храниться отфильтрованные дома
    let [filtered, setFiltered] = useState([]); 
    // следим за состоянием поисковой строки
    const [filteredState, setFilteredState] = useState(false);

    let houses = props.houses;

    /**
     *
     *  обновляем состояние
    *  в зависимости от его значения показываем либо полный список домов, либо отфильтрованный
     * @param {*} value массив отфильтрованных домов
     */
    const updateFiltered = (value) => {
        setFiltered(value);

        if (filtered.length === -1) {
            setFilteredState(false);
        } else {
            setFilteredState(true);
        }
    }

    return (
        <>
            <FilterComp houses={houses} updateFiltered={updateFiltered} />

            <section className="main__houses houses">
                        
                {
                filteredState === false ? (
                houses.map(house => {
                return (
                    <HouseCardComp key={`key${house.id}`} house={house} />
                )
                })) : (
                filtered.map(house => {
                    return (
                        <HouseCardComp key={`key${house.id}`} house={house} />
                    )
                }))
            }
            
            </section>
        </>
    )
}

export default HousesComp;
