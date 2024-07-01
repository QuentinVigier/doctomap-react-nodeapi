import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

interface Card {
    id: string;
    name: string;
    specialty: string;
    phone: string;
    email: string;
    address: string;
    zip: string;
    city: string;
    url: string;
    hospitalID: string;
}

export default function Delete() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState<Card | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDoctor = async () => {
            const url = `http://localhost:3000/doctors/${id}`;
            try {
                const res = await fetch(url);
                const data = await res.json();
                setDoctor(data);
            } catch (err) {
                console.error('Error fetching doctor:', err);
                setError("Une erreur est survenue lors de la récupération des données.");
            }
        };

        fetchDoctor();
    }, [id]);

    const handleDelete = async () => {
        const url = `http://localhost:3000/doctors/${id}`;
        try {
            const res = await fetch(url, {
                method: 'DELETE',
            });

            if (res.ok) {
                navigate('/');
            } else {
                setError("Une erreur est survenue lors de la suppression des données.");
            }
        } catch (err) {
            console.error('Error deleting doctor:', err);
            setError("Une erreur est survenue lors de la suppression des données.");
        }
    };

    if (!doctor) return <p>Loading...</p>;

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-xl font-bold mb-4">Supprimer le Médecin</h1>
                {error && <p className="text-red-500">{error}</p>}
                <p className="mb-4">Êtes-vous sûr de vouloir supprimer le médecin suivant?</p>
                <p className="mb-2"><strong>ID:</strong> {doctor.id}</p>
                <p className="mb-2"><strong>Nom:</strong> {doctor.name}</p>
                <p className="mb-4"><strong>Spécialité:</strong> {doctor.specialty}</p>
                <button onClick={handleDelete} className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Oui, supprimer</button>
                <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">Annuler</button>
            </div>
        </div>
    );
    
}

