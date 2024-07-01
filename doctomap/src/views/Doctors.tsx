import { useState } from "react";
import Nav from "../components/Nav";
import Card from "../components/Card";

export default function Doctors() {
    const [listDoctors, setListDoctors] = useState([]);
    const [error, setError] = useState("");

    const fetchDoctors = async () => {
        const url = "http://localhost:3000/doctors";
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

    return (
        <main>
            <Nav />
            <div className="flex flex-row items-center justify-center m-6">
            <h1>Trouver un médecin</h1>
            <button
                onClick={fetchDoctors}
                type="submit"
                className="ml-2 px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="#ffffff"
                        d="M3 20V4l19 8M5 17l11.85-5L5 7v3.5l6 1.5l-6 1.5M5 17V7v6.5Z"
                    />
                </svg>
            </button>
            </div>
            <p className="text-center text-red-500">{error ? error : ""}</p>
            {listDoctors && listDoctors.length > 0 ? (
                <Card doctors={listDoctors} />
            ) : (
                "Aucun résultat"
            )}
        </main>
    );
}
