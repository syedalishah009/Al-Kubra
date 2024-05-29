import React from "react";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <React.Fragment>
      <footer className="bg-secondary text-white py-8">
        <div className="container pt-4 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-4">AlKubra</h1>
            <p>
            Discover the story behind Al-Kubra, our mission, and the incredible artisans we work with to bring you unique handmade products.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-primary md:mt-10">
              About Us
            </h2>
            <ul >
              {/* <li className="link text-white">Careers</li> */}
              <Link to={'/production-centers'}>
              <li className="link text-white">Production Centers</li>
              </Link>
              <Link to={'/Faqs'}>
              <li className="link text-white">FAQ's</li>
              </Link>
              {/* <Link>
              <li className="link text-white">Terms & Conditions</li>
              </Link>
              <Link>
              <li className="link text-white">Privacy Policy</li>
              </Link> */}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-primary md:mt-10">
              Production Centers
            </h2>
            <ul>
              <li className="">Mirpur </li>
              <li className="">Kotli </li>
              <li className="">Bhimber </li>
              <li className="">Rawlakot </li>
              <li className="">Phonch </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-primary md:mt-10">
              Contact Us
            </h2>
            <ul>
              <li>Mirpur, Azad Kashmir, Pakistan</li>
              <li>Email: alkubra.help@gmail.com</li>
              <li>Phone: +92 300 0000000</li>
            </ul>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
