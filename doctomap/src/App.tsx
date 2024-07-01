import { useState } from "react";
import Card from "./components/Card";
import Nav from "./components/Nav";



function App() {
  const [listDoctors, setListDoctors] = useState([]);
    const [error, setError] = useState("");

    const fetchDoctors = async () => {
        const url = "http://localhost:3000/doctors?_limit=5";
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.Response === "False") {
                setListDoctors([]);
            } else {
                setListDoctors(data);
            }
            console.log("Data fetched:", data);
        } catch (err) {
            setError("Une erreur est survenue lors de votre recherche");
        }
    };

    fetchDoctors();

  return (
    <>
    <Nav />
    <p className="text-center text-red-500">{error ? error : ""}</p>
    <Card doctors={listDoctors} />
    </>
  )
}

export default App
