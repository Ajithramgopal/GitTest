import React from "react";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";

const PaymentComponent = () => {
  const { error, isLoading, Razorpay } = useRazorpay();

  const handlePayment = () => {
    const options: RazorpayOrderOptions = {
      key: "rzp_test_7YTIuVLEKjslrm",
      amount: 110, // Amount in paise
      currency: "INR",
      name: "Test Company",
      description: "Test Transaction",
      order_id: "", // Generate order_id on server
      handler: (response) => {
        console.log(response);
        alert("Payment Successful!");
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <div>
      <h1>Payment Page</h1>
      {isLoading && <p>Loading Razorpay...</p>}
      {error && <p>Error loading Razorpay: {error}</p>}
      <button onClick={handlePayment} disabled={isLoading}>
        Pay Now
      </button>
    </div>
  );
};

export default PaymentComponent;
