import React, {useState} from 'react';

import ProductsComp from './ProductsComp';
import SuccessComp from './SuccessComp';
import FailComp from './FailComp';
import SubmitComp from './SubmitComp';
import AddProductsComp from './AddProductsComp';

import SimpleBarReact from 'simplebar-react';
import "simplebar/src/simplebar.css";

 function MainForm() {
    const [emailText, setEmailText] = useState('');
    const [emailTouched, setEmailTouched] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
 
    const [addState, setAddState] = useState(false);
    const [successPaymentState, setSuccessPaymentState] = useState(false);
    const [failPaymentState, setFailPaymentState] = useState(false);

    const [loadingState, setLoadingState] = useState(false);

    const [addBlockState, setAddBlockState] = useState(true);

    let [chosenProducts, setChosenProducts] = useState({
        chosenProducts: [
            {
                key: 1,
                keyword: '',
                URL: '',
                price: 24.99 
           }
        ]
    })

    const products = [
        {
            key: 1,
            keyword: '',
            URL: '',
            price: 24.99
        },
        {
            key: 2,
            keyword: '',
            URL: '',
            price: 24.99
        },
        {
            key: 3,
            keyword: '',
            URL: '',
            price: 24.99
        },
        {
            key: 4,
            keyword: '',
            URL: '',
            price: 24.99
        },
        {
            key: 5,
            keyword: '',
            URL: '',
            price: 24.99
        },
    ];

    const blurHandler = e => {
        setEmailTouched(true);
    }

    const handleInput = (e) => {
        let emailCorrect = new RegExp(/([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z.]{2,4})/ig);
        
        setEmailText(e.target.value);

        if (!e.target.value.match(emailCorrect)) {
            setEmailErr(true);
         }   else {
            setEmailErr(false);

        } 
    }

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    async function handleSubmit(e) {
        e.preventDefault();

        let randomResult = renderRandomResult();

        setLoadingState(true);

        await delay(3000);

        setLoadingState(false);
        if (randomResult < 25) {
            return setFailPaymentState(true);
        } else {
            return setSuccessPaymentState(true);
        }

    }


    const renderRandomResult = () => {
        return Math.floor(Math.random() * 50);
    }

    const handleClick = (e) => {
        setAddState(true);
    }

    const updateState = (state) => {
        if (state === 'success') {
            setSuccessPaymentState(false);
        } else if (state === 'fail') {
            setFailPaymentState(false);
        } else if (state === 'add') {
            setAddState(false)
        }
    }

    const updateChosenProducts = (arr) => {
        setChosenProducts({chosenProducts: arr});
    }

    const calcSum = () => {
        let total = 0;
        chosenProducts.chosenProducts.forEach(product => {
            total += product.price;
        });

        return total;
    }


    return (
        <div className="form-container">
         {addState ? <AddProductsComp 
                        setAddBlockState={setAddBlockState}
                        updateState={updateState} 
                        products={products} 
                        chosenProducts={chosenProducts.chosenProducts} 
                        updateChosenProducts={updateChosenProducts}/> : 
                (successPaymentState) ? <SuccessComp updateState={updateState} /> :
                (failPaymentState) ? <FailComp updateState={updateState} /> :
                (<form className="main-form" noValidate onSubmit={handleSubmit}>
                  <div className="form-block"> 
                    <SimpleBarReact style={{ maxHeight: 320 }}>
                        <fieldset className="fieldset">
                            <h2 className="heading">Info</h2>

                            <label className="label-main-page text" htmlFor="email">
                                Enter your email address
                            </label>
                            
                            {(emailTouched && emailErr) ? (
                                <input onBlur={e => blurHandler(e)} name="email" style={{  borderBottom: '1px solid #EA717F', color: '#EA717F'}} required onChange={handleInput} id="email" value={emailText} type="text" placeholder="team@checkforpatent.com"/>
                            ) : (
                                <input onBlur={e => blurHandler(e)} name="email" style={{  borderBottom: '1px solid #E1E3EE' }} required onChange={handleInput} id="email" value={emailText} type="text" placeholder="team@checkforpatent.com"/>
                            )}
                        </fieldset>

                        <ProductsComp updateChosenProducts={updateChosenProducts} calcSum={calcSum}  products={products} chosenProducts={chosenProducts.chosenProducts}/>

                    </SimpleBarReact>
                
                    {addBlockState && <>
                        <label className="add-products" htmlFor="addInput"><span>Add more products</span><img className="add-img" alt="add" src="../../img/add.png" /></label>
                        <input id="addInput" onClick={handleClick} type="radio" className="hidden"/>
                        <p className="text add-main-text">We offer discount up to 36% for multiple checks</p>
                    </>}
            </div>
                
                    <SubmitComp loadingState={loadingState} calcSum={calcSum} chosenProducts={chosenProducts.chosenProducts}/>
                </form>)}
        </div>
    )
}

export default MainForm;