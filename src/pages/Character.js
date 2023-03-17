import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { RICK_AND_MORTY_API_URL } from '../common/constants';

const Character = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate('/', { replace: true });
  const [character, setCharacters] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`${RICK_AND_MORTY_API_URL}/${id}`);
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

      {character && (
        <>
          <div className='characters_image-wrap characters_image-wrap-circle'>
            <img
              alt={character.name}
              className='characters_image characters_image-circle'
              title={character.name}
              src={character.image}
            />
          </div>
          <section class='character_information'>
            <h3>{character.name}</h3>
            <article className='character_information-article'>
              <h4 className='character_information-title'>Informations</h4>
              <ul class='character_description'>
                <li>
                  <span>Gender</span>
                  <p className='description-text'>
                    {character.gender || 'unknown'}
                  </p>
                </li>
                <li>
                  <span>Status</span>
                  <p className='description-text'>
                    {character.status || 'unknown'}
                  </p>
                </li>
                <li>
                  <span>Specie</span>
                  <p className='description-text'>
                    {character.species || 'unknown'}
                  </p>
                </li>
                <li>
                  <span>Origin</span>
                  <p className='description-text'>
                    {character.origin.name || 'unknown'}
                  </p>
                </li>
                <li>
                  <span>Type</span>
                  <p className='description-text'>
                    {character.type || 'unknown'}
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
