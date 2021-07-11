import React from 'react';


function FailComp(props) {

    const handleClick = (e) => {
        e.preventDefault();
        
        props.updateState('fail');
    }

    return (
        <>
            <div className="payment-outcome">
                <div>
                    <h1 className="heading">
                        Your payment failed
                    </h1>
                    <p className="text" id="fail-text">
                        Sorry, but we're having trouble processing your payment. 
                        You have been not charged for this transaction.
                    </p>
                    <div className="img-container fail"><img alt="failed" width="310" height="246" src="../../img/fail.png" /></div>
                </div>
                <button className="button" id="fail-button" onClick={handleClick}>Back</button>
            </div>
        </>
    )
}

export default FailComp
