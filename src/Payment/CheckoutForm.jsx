import { useState } from 'react';
import { useSelector } from "react-redux";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import CircularProgress from '@mui/material/CircularProgress';
import { NODE_API_ENDPOINT } from '../utils/utils';


export default function CheckoutForm() {
    const { plan, request, session, total } = useSelector(state => state.cart);
    const { jwt } = useSelector(state => state.auth.user);
    const stripe = useStripe();
    const elements = useElements();

    const [email, setEmail] = useState('');

    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);

    const handleError = (error) => {
        setLoading(false);
        setErrorMessage(error.message);
    }

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setLoading(true);

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError) {
            handleError(submitError);
            return;
        }

        // Create the PaymentIntent and obtain clientSecret
        const res = await fetch(`${NODE_API_ENDPOINT}/stripe/create-payment-intent`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: total, plan: 'pro', billingCycle: plan, request, session })
        });

        const { data } = await res.json();
        console.log(data);

        // Confirm the PaymentIntent using the details collected by the Payment Element
        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret: data.clientSecret,
            confirmParams: {
                return_url: 'https://clawlaw.in',
                receipt_email: email
            },
        });

        if (error) {
            // This point is only reached if there's an immediate error when
            // confirming the payment. Show the error to your customer (for example, payment details incomplete)
            handleError(error);
        } else {
            // Your customer is redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer is redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };
    const paymentElementOptions = {
        layout: "tabs"
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>Email</div>
            <CustomInput
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
            />

            <PaymentElement options={paymentElementOptions} />
            <button
                style={{ padding: "15px 80px", border: "none", fontSize: 24, borderRadius: 10, backgroundColor: "#008080", color: "white", alignSelf: "flex-start", marginTop: 25 }}
                disabled={loading || !stripe || !elements}
                type='submit'
            >

                {loading ? <CircularProgress /> : "Pay now"}

            </button>
            {/* Show any error or success messages */}
            {errorMessage && <div >{errorMessage}</div>}
        </form>
    )
}

const CustomInput = (props) => {
    return <input style={{ padding: 15, width: "100%", borderRadius: 5, outline: "none", fontSize: 16, marginBottom: 10 }} {...props} />
}

