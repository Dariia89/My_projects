import React, {useState} from 'react';

function SearchComp(props) {

    // здесь следим за тем, что пользователь вводит в поисковую строку
    const [found, setFound] = useState('');

    // создаем пустой массив, где потом будут храниться отфильтрованные машины
    let filtered = [];

    /**
     * с помощью регулярного выражения фильтруем машины, сравнивая ввод пользователя с полями mark 
     * объекта машины в основном массиве cars
     */
    
    const showFound = () => {
        
        const regexp = new RegExp(found, 'iy');
        regexp.lastIndex = 0;
        filtered = props.cars.filter(car => regexp.exec(`${car.mark} ${car.model}`));

        props.updateFiltered(filtered);   
    }

    /**
     * обновляем ввод пользователя и вызываем функцию showFound
     * @param {*} e событие
     */
    const handleChange = (e) => {
        e.preventDefault()

        setFound(e.target.value);
        showFound();
    }

    /**
     * отменяем дефолтное поведение у формы и вызываем showFound
     * @param {*} e событие
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        showFound();
    }

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input className="search-input fontAwesome" onChange={handleChange} type="text" value={found} placeholder="&#61442;  Поиск" />
            <button className="search-btn" type="submit">Найти</button>
        </form>
    )
}

export default SearchComp;
