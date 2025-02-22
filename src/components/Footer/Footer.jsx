import './Footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className='h3'>Get the FreshCart app</h3>
        <p className='.p mb-5'>We will send you a link, open it on your phone to download the app</p>
        <div className="email-input">
          <input type="email" placeholder="Enter your email" className='w-[50%]'/>
          <button className='.button'>Share App Link</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
