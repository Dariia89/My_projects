import React from 'react';

function HouseCardComp(props) {
    let house = props.house;

    /**
     * 
     * @param {*} title // название дома
     * @returns название дома, где каждое слово написано с большой буквы
     */
    const formatTitle = title => {
        title = title.split(' ');
        let newTitle = title.map(word => {
            word = word.split('');
            word[0] = word[0].toUpperCase();
            return word.join('');
        }).join(' ');

        return newTitle;
    }

    /**
     * 
     * @param {*} price // цена
     * @returns // цена, соответствующая формату валюты
     */
    const formatPrice = price => {
        return price.toLocaleString('en-EN', { currency: 'GBP' });
    }

    return (
        <div className="houses__house house" >
            <a href={`/details/${house.id}`} className="house__link">
                <div className="house__img-container">
                    {house.type === 'IndependentLiving' ? (
                        <div className="house__img-container_house-type" style={{backgroundColor: '#006F79', width: 134}}>Independent living</div>
                    ) : (
                        <div className="house__img-container_house-type" style={{backgroundColor: '#EC6608', width: 204}}>Restaurant &amp; Support available</div>
                    )}
                    <img alt="house" src="https://via.placeholder.com/376x228/DCDCDC/000000?text=house" className="house__img-container_img" />

                </div>

                <div className="house__info">
                    <h2 className="house__info_title">{formatTitle(house.title)}</h2>
                    <p className="house__info_address">{house.address}</p>
                    <p className="house__info_price">New Properties for Sale from <span className="house__info_price_bold">&#163;{formatPrice(house.price)}</span></p>
                    <p className="housee__info_text">Shared Ownership Available</p>
                </div>
            </a>
            
        </div>
    )
}

export default HouseCardComp;
