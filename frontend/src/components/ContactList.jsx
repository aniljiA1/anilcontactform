import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const ContactList = ({ contacts, fetchContacts }) => {
  const deleteContact = async (id) => {
    await axios.delete(`${API_URL}/api/contacts/${id}`);
    fetchContacts();
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-3 py-2">Name</th>
            <th className="border px-3 py-2">Email</th>
            <th className="border px-3 py-2">Phone</th>
            <th className="border px-3 py-2">Message</th>
            <th className="border px-3 py-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((c) => (
            <tr key={c._id} className="text-center">
              <td className="border px-3 py-2">{c.name}</td>
              <td className="border px-3 py-2">{c.email}</td>
              <td className="border px-3 py-2">{c.phone}</td>
              <th className="border px-3 py-2">{c.message}</th>
              <td className="border px-3 py-2">
                <button
                  onClick={() => deleteContact(c._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
