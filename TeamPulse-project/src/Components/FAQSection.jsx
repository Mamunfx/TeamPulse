import React from "react";

const faqs = [
  {
    question: "What is the purpose of this platform?",
    answer:
      "Our platform aims to streamline HR operations by monitoring employee workloads, managing salaries, and handling contracts efficiently.",
  },
  {
    question: "How do employees update their workflow?",
    answer:
      "Employees can post their workflow updates through their dedicated dashboard, ensuring transparency and real-time task tracking.",
  },
  {
    question: "How does the salary disbursement work?",
    answer:
      "The HR department manages salary disbursements and other financial records, ensuring timely and accurate payments to employees.",
  },
  {
    question: "Can the platform handle contract management?",
    answer:
      "Yes, our platform efficiently manages and updates employee contracts and related documentation through a centralized system.",
  },
  {
    question: "Is the platform secure?",
    answer:
      "Security is our top priority. We implement industry-standard security measures to protect your data and ensure privacy.",
  },
];

const FAQSection = () => {
  return (
    <div className="my-12">
      <h2 className="text-4xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h2>
      <div className="join join-vertical w-full">

        {faqs.map((faq, index) => (
          <div key={index} className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              {faq.question}
            </div>
            <div className="collapse-content">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
