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

export default function Edit() {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDoctor((prevDoctor) => (prevDoctor ? { ...prevDoctor, [name]: value } : null));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!doctor) return;

        const url = `http://localhost:3000/doctors/${id}`;
        try {
            const res = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(doctor)
            });

            if (res.ok) {
                navigate(`/show/${id}`);
            } else {
                setError("Une erreur est survenue lors de la mise à jour des données.");
            }
        } catch (err) {
            console.error('Error updating doctor:', err);
            setError("Une erreur est survenue lors de la mise à jour des données.");
        }
    };

    if (!doctor) return <p>Loading...</p>;

    return (
        <>
            <Nav />
            <div className='bg-white p-8 rounded shadow-md max-w-md w-full mx-auto flex flex-col'>
                <h1 className='text-2xl font-semibold mb-4'>Modifier le Médecin</h1>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label>
                                Nom:
                                <input type="text" name="name" value={doctor.name} onChange={handleChange} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Spécialité: 
                                <input type="text" name="specialty" value={doctor.specialty} onChange={handleChange} />
                            </label>
                        </div>
                    </div>

                    <div className='mt-4 grid grid-cols-1'>
                        <label>
                            Email: 
                            <input type="email" name="email" value={doctor.email} onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Téléphone: 
                            <input type="text" name="phone" value={doctor.phone} onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Adresse: 
                            <input type="text" name="address" value={doctor.address} onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Code Postal: 
                            <input type="text" name="zip" value={doctor.zip} onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Ville: 
                            <input type="text" name="city" value={doctor.city} onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Site Web: 
                            <input type="url" name="url" value={doctor.url} onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <button type="submit">Enregistrer les modifications</button>
                    </div>



                </form>
            </div>
        </>
    );
}
