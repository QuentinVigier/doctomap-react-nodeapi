import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

export default function Show() {
    const { id } = useParams<{ id: string }>();
    const [doctor, setDoctor] = useState<Card | null>(null);

    useEffect(() => {
        const fetchDoctor = async () => {
            const url = `http://localhost:3000/doctors/${id}`;
            try {
                const res = await fetch(url);
                const data = await res.json();
                setDoctor(data);
            } catch (err) {
                console.error('Error fetching doctor:', err);
            }
        };

        fetchDoctor();
    }, [id]);

    if (!doctor) return <p>Loading...</p>;

    return (
        <>
        <Nav />
        <h1 className='flex items-center justify-center text-xl font-semibold text-amber-700 uppercase mt-6'>{doctor.name}</h1>
        <h2 className='flex items-center justify-center text-xl font-semibold text-amber-700 uppercase'>Specialty : {doctor.specialty}</h2>
        <div className="flex flex-col gap-2 mt-4">
    <div className="m-auto  px-6 py-4 w-full max-w-md bg-white shadow border-t-4 border-amber-600 rounded">
        <header className="border-b grid grid-cols-2 pb-2"> 
            <div className='text-base leading-7'>
                <p className='text-xs font-semibold text-amber-700 uppercase'>Phone</p>
                <p  className='text-md text-gray-500'> {doctor.phone} </p>
            </div>
             <div className='text-base leading-7'>
                <p className='text-xs font-semibold text-amber-700 uppercase'>Email </p>
                <p  className='text-md text-gray-500'> {doctor.email} </p>
            </div>
        </header>
        <div className="w-full grid grid-cols-2 pt-4">            
            <div className='text-base leading-7'>
                <p className='text-xs font-semibold text-amber-700 uppercase'> Address </p>
                <p  className='text-md text-gray-500'> {doctor.address} </p>
            </div>    
            <div className='text-base leading-7'>
                <p className='text-xs font-semibold text-amber-700 uppercase'>Website </p>
                <p  className='text-md text-gray-500'><a href={doctor.url} target="_blank" rel="noopener noreferrer">{doctor.url}</a> </p>
            </div>              
        </div>
    </div>
</div>
        </>
    );
}
