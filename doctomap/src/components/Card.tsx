import { Link } from 'react-router-dom';

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

interface Doctors {
    doctors: Card[];
}

export default function Card({ doctors }: Doctors) {
    return (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-5">
            {doctors.map((card) => (
                <div className="p-3 transition-shadow duration-200 ease-in-out border rounded-lg shadow-md bg-slate-50 hover:shadow-lg" key={card.id}>
                    <div className="">
                        <div className="flex flex-col justify-between p-2">
                            <h5 className="text-xl font-light">{card.name}</h5>
                            <p className="">{card.specialty}</p>
                            <p className="">{card.city}</p>
                            <div className='flex flex-row'>
                            <Link to={`/show/${card.id}`}>
                                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 m-1">Voir plus</button>
                            </Link>
                            <Link to={`/edit/${card.id}`}>
                                <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 m-1">Modifier</button>
                            </Link>
                            <Link to={`/delete/${card.id}`}>
                                <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 m-1">Supprimer</button>
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}
