import React from 'react';

function SubmitComp(props) {

    let totalPrice = props.calcSum();

    return (
        <div className="submit-container">
            <button className="button">
             {props.loadingState ? (<div className="lds-ring"><div></div><div></div><div></div><div></div></div>
             ) : (
                 <span>Submit and Pay {totalPrice} USD</span>
             )}
            </button>
            <p className="secure-payment-text">
                <i className="fas lock fa-lock"></i>
               <span>Secure payment with Stripe</span></p>
        </div>
        
    )
}

export default SubmitComp
