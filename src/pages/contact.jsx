import React from 'react';

const ContactUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6">
      <div className="max-w-md w-full mx-auto bg-white rounded-lg overflow-hidden shadow-md">
        <div className="py-4 px-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">Contact Us</h2>
          <div className="flex flex-col space-y-4">
            <ContactCard name="Fredy Somy" phone="9076543267" />
            <ContactCard name="Jeslin Kuriakose" phone="9807654243" />
            <ContactCard name="Irine Ann Jikku" phone="3456789098" />
            <ContactCard name="Jefrin Thomas Mathew" phone="9087654325" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactCard = ({ name, phone }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600">{phone}</p>
      </div>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Contact</button>
    </div>
  );
};

export default ContactUsPage;
