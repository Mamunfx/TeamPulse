import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const PayrollTable = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPayReq, setCurrentPayReq] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [payReqs, setPayReqs] = useState([]);
  const [modifiedSalary, setModifiedSalary] = useState(0);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const fetchPayReqs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/payReq`, {
          withCredentials: true
        });
        const sortedPayReqs = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setPayReqs(sortedPayReqs);
      } catch (error) {
        console.error('Error fetching pay requests:', error);
      }
    };

    fetchPayReqs();
  }, []);

  const handlePayClick = async (PayReq) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
        amount: PayReq.salary * 100,
        name: PayReq.name,
        salary: PayReq.salary,
        month: PayReq.month,
        year: PayReq.year,
        email: PayReq.email,
      }, {
        withCredentials: true
      });
      setClientSecret(response.data.clientSecret);
      setCurrentPayReq(PayReq);
      setModifiedSalary(PayReq.salary);
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleConfirmPayment = async (event) => {
    event.preventDefault();
    try {
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: currentPayReq.name,
          },
        },
      });

      if (paymentResult.error) {
        console.error(paymentResult.error.message);
      } else {
        if (paymentResult.paymentIntent.status === 'succeeded') {
          await axios.post(`${import.meta.env.VITE_API_URL}/confirm-payment`, {
            paymentIntentId: paymentResult.paymentIntent.id,
            name: currentPayReq.name,
            salary: modifiedSalary,
            month: currentPayReq.month,
            year: currentPayReq.year,
            email: currentPayReq.email,
          });
          //console.log('Payment successful!');
          setModalIsOpen(false);

          // Update the local state to reflect the payment status change
          setPayReqs((prevPayReqs) =>
            prevPayReqs.map((req) =>
              req._id === currentPayReq._id ? { ...req, isPaid: "true" } : req
            )
          );
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSalaryChange = (event) => {
    const newSalary = parseFloat(event.target.value);
    if (newSalary >= currentPayReq.salary) {
      setModifiedSalary(newSalary);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Amount</th>
              <th>Month</th>
              <th>Year</th>
              <th>Pay</th>
            </tr>
          </thead>
          <tbody>
            {payReqs.map((PayReq, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{PayReq.name}</td>
                <td>{PayReq.salary}</td>
                <td>{PayReq.month}</td>
                <td>{PayReq.year}</td>
                <td>
                  <button
                    className='btn btn-warning'
                    onClick={() => handlePayClick(PayReq)}
                    disabled={PayReq.isPaid === "true"}
                  >
                    {PayReq.isPaid === "true" ? 'Paid' : 'Pay'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Confirm Payment</h2>
          {currentPayReq && (
            <div>
              <p className="mb-4">Paying ${modifiedSalary} for {currentPayReq.name}</p>
              <form onSubmit={handleConfirmPayment} className="space-y-4">
                <CardElement className="p-4 border border-gray-300 rounded-lg"/>
                <div>
                  <label className="block text-sm font-medium mb-2">Salary Amount</label>
                  <input
                    type="number"
                    value={modifiedSalary}
                    onChange={handleSalaryChange}
                    min={currentPayReq.salary}
                    className="p-2 border border-gray-300 rounded-lg w-full"
                  />
                </div>
                <button type="submit" className="btn btn-success w-full">Confirm Payment</button>
              </form>
            </div>
          )}
          <button onClick={() => setModalIsOpen(false)} className="btn btn-secondary w-full mt-4">
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PayrollTable;
