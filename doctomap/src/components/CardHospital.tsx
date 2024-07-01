interface CardHospital {
    id: string;
    name: string;
    specialty: string;
    phone: string;
    email: string;
    address: string;
    zip: string;
    city: string;
    url: string;
}

interface Hospitals {
    doctors: CardHospital[];
}


export default function CardHospital({ hospitals }: Hospitals) {
    return (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-5">
            {hospitals.map((card) => (
                <div className="p-3 transition-shadow duration-200 ease-in-out border rounded-lg shadow-md bg-slate-50 hover:shadow-lg" key={card.id}>
                    <div className="">
                        <div className="flex flex-col justify-between p-2">
                            <h5 className="text-xl font-light">{card.name}</h5>
                            <p className="">{card.specialty}</p>
                            <p className="">{card.city}</p>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}