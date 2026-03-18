import React, { useState } from "react";

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [issue, setIssue] = useState("");
  const [message, setMessage] = useState("");

  const issues = [
    "Order Issue",
    "Payment Problem",
    "Account Help",
    "Return / Refund",
    "Other"
  ];

  const handleIssueSelect = (selected) => {
    setIssue(selected);
    setStep(2);
  };

  const handleSubmit = () => {
    alert(`Submitted:\nIssue: ${issue}\nMessage: ${message}`);
    setStep(1);
    setMessage("");
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-8">

        <h1 className="text-2xl font-semibold mb-6 text-center">
          Contact Us
        </h1>

        {/* STEP 1: Select Issue */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-gray-600">What can we help you with?</p>

            {issues.map((item, index) => (
              <button
                key={index}
                onClick={() => handleIssueSelect(item)}
                className="w-full border px-4 py-3 text-left hover:bg-gray-100"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* STEP 2: Show Help + Message */}
        {step === 2 && (
          <div className="space-y-4">

            <p className="text-gray-700">
              Selected: <strong>{issue}</strong>
            </p>

            {/* Simulated Help Content */}
            <div className="bg-gray-100 p-4 text-sm text-gray-600 rounded">
              {issue === "Order Issue" && "Check your order status in 'My Orders'."}
              {issue === "Payment Problem" && "Ensure your payment method is valid."}
              {issue === "Account Help" && "Try resetting your password."}
              {issue === "Return / Refund" && "Go to orders and select return item."}
              {issue === "Other" && "Please describe your issue below."}
            </div>

            {/* Message Box */}
            <textarea
              placeholder="Describe your issue..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border px-3 py-2"
              rows="4"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="border px-6 py-2"
              >
                Back
              </button>

              <button
                onClick={handleSubmit}
                className="bg-black text-white px-6 py-2"
              >
                Submit
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}