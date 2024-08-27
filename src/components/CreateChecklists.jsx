import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function CreateChecklists() {
  const [checklists, setChecklists] = useState([]);
  const [newChecklist, setNewChecklist] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChecklists = async () => {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://94.74.86.174:8080/api/checklist",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      if (response.status === 401) {
        navigate("/");
      }
      // if (response.status === 400) {
      // const data = await response.json();
      // console.log(data);
      // setChecklists(data);
      // } else {
      // navigate("/");
      // }
    };

    fetchChecklists();
  }, [navigate]);

  const handleCreateChecklist = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://94.74.86.174:8080/api/checklists", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newChecklist }),
    });

    if (response.ok) {
      const data = await response.json();
      setChecklists([...checklists, data]);
      setNewChecklist("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Checklists</h1>
      <div className="mt-4">
        <input
          type="text"
          value={newChecklist}
          onChange={(e) => setNewChecklist(e.target.value)}
          placeholder="New Checklist"
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <button
          onClick={handleCreateChecklist}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Create Checklist
        </button>
      </div>
      <ul className="mt-4">
        {checklists.map((checklist) => (
          <li key={checklist.id} className="border-b py-2">
            {checklist.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
