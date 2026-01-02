import { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const res = await axios.get(`${API_URL}/api/contacts`);
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center mb-6">
          Contact Management App
        </h1>

        <ContactForm fetchContacts={fetchContacts} />
        <ContactList contacts={contacts} fetchContacts={fetchContacts} />
      </div>
    </div>
  );
}

export default App;
