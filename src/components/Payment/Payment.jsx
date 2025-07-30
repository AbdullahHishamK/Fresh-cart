import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userEmail, totalPrice } = location.state || {};

  useEffect(() => {
    if (!userEmail || !totalPrice) {
      navigate('/cart');
    }
  }, [userEmail, totalPrice, navigate]);

  const processPayment = async (paymentData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Payment processed successfully', paymentData);
      alert('Payment processed successfully');
      navigate('/home'); 
    } catch (error) {
      console.error('Payment processing failed', error);
      alert('Payment processing failed');
    }
  };

  const formik = useFormik({
    initialValues: {
      email: userEmail || '',
      cardInfo: '',
      nameOnCard: '',
      country: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      cardInfo: Yup.string().matches(/^[0-9]+$/, 'Card information must be numbers only').required('Required'),
      nameOnCard: Yup.string().matches(/^[A-Za-z\s]+$/, 'Name on card must be letters only').required('Required'),
      country: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      await processPayment(values);
    },
  });

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center mt-32">Payment Page</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full px-3 py-2 border rounded-lg"
            
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="totalPrice" className="block text-gray-700">Total Price:</label>
          <input
            id="totalPrice"
            name="totalPrice"
            type="text"
            value={totalPrice}
            className="w-full px-3 py-2 border rounded-lg"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cardInfo" className="block text-gray-700">Card Information:</label>
          <input
            id="cardInfo"
            name="cardInfo"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cardInfo}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {formik.touched.cardInfo && formik.errors.cardInfo ? (
            <div className="text-red-500 text-sm">{formik.errors.cardInfo}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="nameOnCard" className="block text-gray-700">Name on Card:</label>
          <input
            id="nameOnCard"
            name="nameOnCard"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nameOnCard}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {formik.touched.nameOnCard && formik.errors.nameOnCard ? (
            <div className="text-red-500 text-sm">{formik.errors.nameOnCard}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block text-gray-700">Country or Region:</label>
          <input
            id="country"
            name="country"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.country}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {formik.touched.country && formik.errors.country ? (
            <div className="text-red-500 text-sm">{formik.errors.country}</div>
          ) : null}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700">Pay</button>
      </form>
    </div>
  );
};

export default Payment;
