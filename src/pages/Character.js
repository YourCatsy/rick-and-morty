import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Character = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate('/', { replace: true });
  const [characters, setCharacters] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      const data = await response.json();
      const res = data;

      setCharacters(res);
    }
    fetchPost();
  }, [id])

  return (
    <div className='container_character'>
      <button className='character_button' onClick={goBack}>
        Go back
      </button>

      {characters && (
        <>
          <div className='characters_image-wrap characters_image-wrap-circle'>
            <img
              alt='Character'
              className='characters_image characters_image-circle '
              src={characters.image}
            />
          </div>
          <section class='character_information'>
            <h3>{characters.name}</h3>
            <article className='character_information-article'>
              <h4 className='character_information-title'>Informations</h4>
              <ul class='character_description'>
                <li>
                  <span>Gender</span>
                  <p className='description-text'>
                    {characters.gender || 'unknown'}
                  </p>
                </li>
                <li>
                  <span>Status</span>
                  <p className='description-text'>
                    {characters.status || 'unknown'}
                  </p>
                </li>
                <li>
                  <span>Specie</span>
                  <p className='description-text'>
                    {characters.species || 'unknown'}
                  </p>
                </li>
                <li>
                  <span>Origin</span>
                  <p className='description-text'>
                    {characters.origin.name || 'unknown'}
                  </p>
                </li>
                <li>
                  <span>Type</span>
                  <p className='description-text'>
                    {characters.type || 'unknown'}
                  </p>
                </li>
              </ul>
            </article>
          </section>
        </>
      )}
    </div>
  )
}

export { Character };
