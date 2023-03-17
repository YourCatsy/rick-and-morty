import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {RICK_AND_MORTY_API_URL} from '../common/constants';
import inputIcon from '../images/search_icon-input.png';
import logo from '../images/logo.png';

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(RICK_AND_MORTY_API_URL);
      const data = await response.json();
      const res = data.results.sort((a, b) => a.name.localeCompare(b.name));

      setCharacters(res);
    }
    fetchPost();
  }, [])

  const handleChange = event => {
    setSearchTerm(event.target.value);
    localStorage.setItem('searchTerm', event.target.value);
  }

  const filteredPosts = characters.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container'>
      <div>
        <img alt='Rick and Morty' title='Rick and Morty' className='header_logo' src={logo} />
      </div>
      <div className='search_wrapper'>
        <form className='search_form'>
          <div className='search_input-wrapper'>
            <input
              type='text'
              id='search'
              name='search'
              className='search_input'
              placeholder='Filter by name...'
              value={searchTerm}
              onChange={handleChange}
            />
            <img src={inputIcon} alt='Search' className='search_icon' />
          </div>
        </form>
      </div>
      <section className='characters'>
        {filteredPosts.map(character => (
          <div key={character.id} className='characters_information'>
            <Link key={character.id} to={`/${character.id}`}>
              <div className='characters_image-wrap'>
                <img
                  className='characters_image'
                  alt='Character'
                  
                  src={character.image}
                />
              </div>
            </Link>
            <div className='characters_title-wrap'>
              <h2 className='characters_name'>{character.name}</h2>
              <p className='characters_specie'>{character.species}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export { Characters };
