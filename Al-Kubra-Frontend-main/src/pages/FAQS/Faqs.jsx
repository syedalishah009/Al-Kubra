import React, { useState } from 'react'
import FaqCard from './FaqCard';
import faqs from './faqData.json';

const Faqs = () => {
    const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
};
console.log(faqs.faqs);

  return (
    <section className="flex items-center bg-gray-100 py-11 font-poppins dark:bg-gray-800">
        <div className="max-w-6xl px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
                <span
                    className="inline-block px-2 py-px mb-4 text-xs font-medium leading-5 text-primary bg-blue-100 rounded-full shadow-sm dark:text-gray-400 dark:bg-gray-700">FAQ</span>
                <h2
                    className="mb-6 text-4xl font-bold leading-tight tracking-tighter text-gray-700 dark:text-gray-300 md:text-5xl">
                    Frequently Asked Questions</h2>
                <p className="mb-24 text-lg font-medium text-gray-500 dark:text-gray-400">
                Explore our FAQs to find solutions to common topics and get assistance easily. If you have questions, our FAQ section is a helpful resource.
                </p>
            </div>
            <div className=" flex flex-wrap -mx-4">
               {faqs?.faqs.map((faq)=>(

                    <FaqCard question={faq.question} answer={faq.answer}/>
               ))}
              
            </div>
        </div>
    </section>
  )
}

export default Faqs