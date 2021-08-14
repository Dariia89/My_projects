import React, {useState} from 'react';

function FilterComp(props) {
    // здесь сохраняем то, что пользователь вводит в поисковую строку
    const [value, setValue] = useState('');
    // создаем пустой массив, в котором будем хранить отфильтрованные дома
    let filtered = [];

    /**
     * с помощью регулярного выражения фильтруем дома, сравнивая ввод пользователя с названием 
     * (title) дома в основном массиве houses 
     */
    const showFound = () => {
        // здесь проверяем, ввел ли что-нибудь пользователь в поисковую строку
        if (value.length === 0) {
            props.updateFiltered(props.houses);
        }  else if (value.length > 2) { // если пользователь ввел 3 и более символов, начинаем фильтрацию
            const regexp = new RegExp(value, 'iy');
            regexp.lastIndex = 0;
            filtered = props.houses.filter(house => regexp.exec(`${house.title}`));
            
            props.updateFiltered(filtered); // передаем массив с отфильтрованными домами
        }
    }

    /**
     * обновляем ввод пользователя и вызываем функцию showFound
     * @param {*} e событие
     */
    const handleChange = e => {
        e.preventDefault();
        
        setValue(e.target.value);
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
        <div className="houses__filter filter">
            <form className="filter__form" onSubmit={handleSubmit}>
                <label htmlFor="input" className="filter__form_label">Filter</label>
                <input id="input" className="filter__form_input" type="text" value={value} onChange={handleChange} />
            </form>
        </div>
    )
}

export default FilterComp;
