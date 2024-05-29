import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const Top = () => {

  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };


  return (
    <React.Fragment>
      <section className="hidden sm:block bg-secondary p-[10px] text-white">
        <div className="container flex justify-between items-center">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faPhone} />
            <label className="mr-[20px] ml-1">+92 300 0000000</label>
            <FontAwesomeIcon icon={faEnvelope} />
            <label className="mr-[20px] ml-1">support@alkubra.com</label>
          </div>
          <div className="flex">
            <Link className="link" to={'/Faqs'}>
            <label className="mr-[20px] cursor-pointer">FAQ"s</label>
            </Link>
            {/* <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="bg-transparent text-white focus:outline-none"
            >
              <option className="text-black hover:bg-primary" value="en">ENG</option>
              <option className="text-black" value="ur">Urdu</option>
            </select> */}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Top;
