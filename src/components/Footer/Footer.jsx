const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 text-center mt-8">
      <div className="max-w-4xl mx-auto">
        <h3 className="mb-4">Get the FreshCart app</h3>
        <p className="text-gray-600 mb-5">We will send you a link, open it on your phone to download the app</p>
        <div className="flex gap-4 justify-center mb-8">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 border border-gray-300 rounded w-1/2"
          />
          <button className="p-2 bg-green-600 text-white rounded hover:bg-green-700">Share App Link</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;