import { motion } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

const faqs = [
  {
    question: "What is the mission of the Ojeri Nkporo Caring Heart Foundation?",
    answer: "Our mission is to nurture hope and empower lives by providing educational scholarships, entrepreneurial grants, and essential resources to those in need within our community."
  },
  {
    question: "Who can benefit from the foundation’s programs?",
    answer: "Our programs are designed to support the underprivileged, students, widows, small business owners, and community members in need within Ebonyi State and neighboring regions."
  },
  {
    question: "How does the foundation select beneficiaries for its programs?",
    answer: "Beneficiaries are selected through a rigorous assessment process, considering the applicant’s needs, impact potential, and alignment with our foundation's goals."
  },
  {
    question: "What types of scholarships does the foundation offer?",
    answer: "We offer scholarships to secondary school students and other educational grants for students from underprivileged backgrounds who are committed to academic excellence."
  },
  {
    question: "How can I apply for an educational scholarship?",
    answer: "Eligible students can apply through the “Scholarships” section on our website. Please provide the required documentation and submit a completed application by the deadline."
  },
  {
    question: "Who is eligible to apply for the Entrepreneurship Grant?",
    answer: "Eligible applicants must be indigene of Ebonyi State and operate a business or start-up that shows promise for economic and social impact."
  },
  {
    question: "What is the application process for the Entrepreneurship Grant?",
    answer: "Interested applicants can apply by filling out an application form on our website under the “Entrepreneurship Grants” section. Each application undergoes a review by our team to ensure eligibility."
  },
  {
    question: "Does the Entrepreneurship Grant provide mentorship along with funding?",
    answer: "Yes, recipients of the grant not only receive financial support but are also paired with mentors who can guide them in scaling their business and enhancing community impact."
  },
  {
    question: "How can I contact the foundation for additional inquiries?",
    answer: "You can contact us via email, phone, or through the contact form on our website. Our team is happy to assist with any questions or support you may need."
  },
  {
    question: "Where is the foundation located?",
    answer: "Our foundation is based in Ebonyi State, Nigeria, with programs and outreach services available to surrounding communities."
  },
  {
    question: "How can I volunteer with the foundation?",
    answer: "We welcome volunteers who are passionate about community service. To get involved, fill out the “Become a Volunteer” form, and we will contact you with further details."
  },
  {
    question: "Can I donate to support the foundation’s programs?",
    answer: "Yes, donations are appreciated to help us expand our reach and impact. Visit the “Donate” section to learn about ways you can contribute."
  },
  {
    question: "Are donations to the foundation tax-deductible?",
    answer: "Yes, donations may be tax-deductible depending on local tax laws. Please consult a tax professional for specific guidance."
  },
  {
    question: "Does the foundation host annual events or fundraisers?",
    answer: "Yes, we host various events throughout the year, including our annual empowerment programs and community initiatives. Check our “Events” page for the latest updates."
  },
  {
    question: "Can businesses or organizations partner with the foundation?",
    answer: "We welcome partnerships with businesses and organizations that share our values. Please reach out through our “Contact” page to discuss partnership opportunities."
  }

];

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps & { key?: React.Key }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left group"
      >
        <h3 className="text-xl font-serif text-brand-navy group-hover:text-brand-royal transition-colors">
          {question}
        </h3>
        {isOpen ? <ChevronUp className="text-brand-royal" /> : <ChevronDown className="text-brand-text-light" />}
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-4 text-brand-text-light leading-relaxed"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="pt-24 pb-20">
      <div className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-serif text-brand-navy mb-8">Frequently Asked Questions</h1>
          <p className="text-xl text-brand-text-light leading-relaxed">
            Find answers to common questions about our foundation, programs, and how you can get involved.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center bg-brand-navy text-white p-12 rounded-3xl"
        >
          <h2 className="text-3xl font-serif mb-4">Still have questions?</h2>
          <p className="text-lg opacity-80 mb-8">We're here to help. Reach out to our team and we'll get back to you as soon as possible.</p>
          <button className="bg-brand-royal hover:bg-brand-sky text-white px-8 py-4 rounded-full font-semibold transition-all">
            Contact Us
          </button>
        </motion.div>
      </div>
    </div>
  );
}
