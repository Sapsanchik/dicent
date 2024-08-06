import { useEffect, useState } from 'react';
import { API } from './api';

function App() {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(API)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных');
                }
                return response.json();
            })
            .then((data) => {
                setCountries(data);
                setError(null);
            })
            .catch((error) => {
                setError(error.message);
                console.error('Error:', error);
            });
    }, []);

    const openModal = (country) => {
        setSelectedCountry(country);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="py-5 flex flex-wrap gap-4 justify-center bg-slate-800 w-full">
            {error && <p className="text-white">{error}</p>}
            {countries.map((country) => (
                <ul className="" key={country.name.common}>
                    <li
                        className="w-56 h-20 flex flex-col justify-center items-center text-white border rounded-lg border-orange-300 bg-neutral-800"
                        onClick={() => openModal(country)}
                    >
                        <p className="pt-1 text-center">{country.name.common}</p>
                    </li>
                </ul>
            ))}

            {isModalOpen && selectedCountry && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-neutral-800 p-4 rounded-lg text-white ">
                        <img
                            className="py-2 w-72 h-36"
                            src={selectedCountry.flags.png}
                            alt=""
                        />
                        <h2 className="text-xl font-bold mb-2">
                            {selectedCountry.name.common}
                        </h2>
                        <p>Capital: {selectedCountry.capital}</p>
                        <p>Region: {selectedCountry.region}</p>
                        <button
                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                            onClick={closeModal}
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
