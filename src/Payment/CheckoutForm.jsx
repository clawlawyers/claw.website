import { useEffect, useState } from 'react';
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import CircularProgress from '@mui/material/CircularProgress';


export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [email, setEmail] = useState('');

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:3000",
                receipt_email: email,
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
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
            <button style={{ padding: "15px 80px", border: "none", fontSize: 24, borderRadius: 10, backgroundColor: "#8940FF", color: "white", alignSelf: "flex-start", marginTop: 25 }} disabled={isLoading || !stripe || !elements} type='submit'>
                <span>
                    {isLoading ? <CircularProgress /> : "Pay now"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div >{message}</div>}
        </form>
    )
}

const CustomInput = (props) => {
    return <input style={{ padding: 15, width: "100%", borderRadius: 5, outline: "none", fontSize: 16, marginBottom: 10 }} {...props} />
}

