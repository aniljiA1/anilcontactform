import { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ContactForm = ({ fetchContacts }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    const err = {};
    if (!form.name) err.name = "Name required";
    if (!form.phone) err.phone = "Phone required";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      err.email = "Invalid email";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) return setErrors(err);

    await axios.post(`${API_URL}/api/contacts`, form);
    setForm({ name: "", email: "", phone: "", message: "" });
    setErrors({});
    setSuccess("Contact submitted successfully!");
    fetchContacts();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      <div>
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <textarea
        className="md:col-span-3 border px-3 py-2 rounded"
        placeholder="Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <div className="md:col-span-3 text-center">
        <button
          disabled={!form.name || !form.phone}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Submit
        </button>
      </div>

      {success && (
        <p className="md:col-span-3 text-green-600 text-center">{success}</p>
      )}
    </form>
  );
};

export default ContactForm;
