/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';

const initialKeywords = {
    1: '',
    2: '',
    3: '',
    4: '',
    5: ''
};

const initialURLs = {
    'URL1': '',
    'URL2': '',
    'URL3': '',
    'URL4': '',
    'URL5': ''
};

function ProductsComp(props) {
    let {chosenProducts} = props;

    console.log(chosenProducts);

    const [keywords, setKeywords] = useState(initialKeywords);
    const [URLs, setURLs] = useState(initialURLs);

    const handleKeywordChange = (e) => {
        const { name, value } = e.target;

        setKeywords({
            ...keywords,
            [name]: value,
        });

    }

    const handleURLChange = (e) => {
        const { name, value } = e.target;

        setURLs({
            ...URLs,
            [name]: value,
        });
    }

    const deleteProduct = e => {
        e.preventDefault();
        
        let id = e.target.id;
        let foundProduct = chosenProducts.find(product => `delete${product.key}` === id);
        console.log(foundProduct);
        for (let i = 0; i < chosenProducts.length; i++) {
            if (chosenProducts[i].key === foundProduct.key) {
                chosenProducts.splice(i, 1);
                for (let i = 0; i < chosenProducts.length; i++) {
                    switch (chosenProducts.length) {
                        case 2:
                            chosenProducts[i].price = 22;
                            break;
                        case 3: 
                            chosenProducts[i].price = 20;
                            break;
                        case 4:
                            chosenProducts[i].price = 18;
                            break;
                        case 5:
                            chosenProducts[i].price = 16;
                            break;
                        default:
                            chosenProducts[i].price = 24.99;
                            break;
                    }
                }
                props.calcSum();
                props.updateChosenProducts(chosenProducts);
            }
        }
        
    }

    return (
        <>
                {chosenProducts.map(product => {
                    console.log(product.key);
            return (
                <fieldset className="fieldset" key={product.key}>
                        <h2 className="heading">
                            Product {product.key} <span>  </span>
                                <i 
                                    id={`delete${product.key}`} 
                                    onClick={deleteProduct} 
                                    className="far delete-cross fa-times-circle">
                                </i>
                        </h2>

                    <label className="label-main-page text" htmlFor={`keyword${product.key}`}>
                        Enter main keyword for the product
                    </label>
                    <input 
                        onChange={handleKeywordChange} 
                        id={`keyword${product.key}`} 
                        className="keyword" 
                        value={keywords[product.key]}
                        name={product.key} 
                        type="text" 
                        placeholder="For example, silicon wine cup"/>
                    <br />
                    <label className="label-main-page text" htmlFor={`url${product.key}`}>
                        Enter link to similar product as a reference
                    </label>
                    <input 
                        onChange={handleURLChange} 
                        id={`url${product.key}`} 
                        className="url" 
                        value={URLs[product.key]} 
                        name={`URL${product.key}`}
                        type="text" 
                        placeholder="https://..."/>
            </fieldset>
            )
        })}
            
        </>
    )
}


export default ProductsComp;
