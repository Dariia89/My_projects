import React from 'react';

function SuccessComp(props) {

    const handleClick = (e) => {
        e.preventDefault();
        
        props.updateState('success');
    }

    return (
        <>
        <div className="payment-outcome">
            <div>
                <h1 className="heading">
                        Successful Payment
                    </h1>
                    <p className="text">
                        Your request has been accepted and will be processed within 24 working hours. 
                        We will send you a payment details and all information to your email.
                    </p>
                    <div className="img-container success"><img alt="successful" className="success-img" src="../../img/success.png" /></div>
            </div>
                
                <button className="button" onClick={handleClick}>Back</button>
            </div>
        </>
    )
}

export default SuccessComp
