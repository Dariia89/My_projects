import React from 'react';

function AddProductsComp(props) {

    let {products, chosenProducts} = props;

    const handleProductClick = (e) => {
        let id = e.currentTarget.value;
        chosenProducts = products.slice(0, id);
        console.log(chosenProducts);
        for (let i = 0; i < chosenProducts.length; i++) {
            switch (id) {
                case '2':
                    chosenProducts[i].price = 22;
                    break;
                case '3': 
                    chosenProducts[i].price = 20;
                    break;
                case '4':
                    chosenProducts[i].price = 18;
                    break;
                case '5':
                    chosenProducts[i].price = 16;
                    break;
                default:
                    chosenProducts[i].price = 24.99;
                    break;
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        props.updateChosenProducts(chosenProducts);
        props.updateState('add');
        props.setAddBlockState(false);
    }

    const countOffer = (i) => {
        if (i === 1) {
            return (
                <h4 className="heading-label-add">{i} product for 24.99</h4>
            )
        } else if (i === 2) {
            return (
              <>
                <h4 className="heading-label-add">{i} products for 44 usd / 22$ for each</h4>
                <p className="text-label-add">You save 12% on each patent check</p>
              </>
            )
        } else if (i > 2) {
            let total = Math.ceil(24.99 * (100 - (12 + 8 * (i - 2)))/100) * i;
            let discount = 12 + 8 * (i - 2);
            return (
              <>
                <h4 className="heading-label-add">{i} products for {total} usd / {total / i}$ for each</h4>
                <p className="text-label-add">You save {discount}% on each patent check</p>
              </>
            )
    }    
}

    return (
      <>
        <div className="add-block">
            <h1 className="heading heading-add">Adding more products</h1>
            <p className="add-text text">The more items you check, the better price.</p>

            <form className="add-form" onSubmit={handleSubmit}>
            <div className="choice-block">
            {products.map((key, i) => {
                let index = products.length - i--;
                            return (
                    <label htmlFor={index} className="add-choice-container" value={index} key={i}>
                            <input 
                                onClick={handleProductClick} 
                                name="choice" 
                                value={index} 
                                id={index} 
                                type="radio" 
                                />                            
                            <div value={index}>  
                                {countOffer(index)}
                            </div>
                        </label>
                    )
                })}
            </div>

                <button className="button" type="submit">Continue</button>
            </form>
        </div>
      </>
    )
}

export default AddProductsComp
