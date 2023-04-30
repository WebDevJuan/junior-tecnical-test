import React, {useState, useEffect} from 'react'
import './style.css'

const LIST_OF_BREEDS_DOGS = 'https://dog.ceo/api/breeds/list/all';

const App = () => {
    const [dogBreeds, setDogBreeds] = useState({});
    const [dogSelected, setDogSelected] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [newSearch, setNewSearch] = useState(false);
    const [callBreedError, setCallBreedError] = useState();

    useEffect(() => {
        fetch(LIST_OF_BREEDS_DOGS).then(res => res.json()).then(data => 
            {
                const {message, status} = data;
                if(status !== 'success') throw new Error('Error fetching BREED LIST')
                console.log(data)
                setDogBreeds(message)
            }
            ).catch(error => {
                console.warn(error)
            });
    }, [])

    // Busca una raza de perro aleatoria en el array 
    useEffect(() => {
        const list_Dogs_Breeds = Object.keys(dogBreeds).length > 0 && Object.keys(dogBreeds) ? Object.keys(dogBreeds) : ['husky'];
        let key = list_Dogs_Breeds[Math.floor(Math.random() * list_Dogs_Breeds.length)];
        if(dogBreeds?.key?.length > 0){
            key = `${dogBreeds.key[Math.floor(Math.random() * dogBreeds.key.length)]} ${key}`
        }
        setDogSelected(key.toUpperCase());
        fetch(`https://dog.ceo/api/breed/${key}/images/random`).then(res => res.json()).then(data => setImageUrl(data.message)).catch(error => console.warn(error));
      
    }, [dogBreeds, newSearch])


    return (
        <main>
            <h1>PERRO ALEATORIO</h1>
            {/* {Object.keys(dogBreeds)?.length > 1 && <ul>{Object.keys(dogBreeds).map(breed => <li key={breed}>{breed}</li> )}</ul>} */}
            {dogSelected && <h2 className='title-breed'>{dogSelected}</h2>}
            {imageUrl && <img className='img-main' src={imageUrl} alt='' width={300} height={300}/>}
            <button onClick={(() => {setNewSearch(!newSearch)})}>Genera perro</button>
        </main>
    )
}
export default App
