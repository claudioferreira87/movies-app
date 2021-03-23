import { useEffect, useState } from 'react';
import { api } from './services/api';

import { SideBar, GenreResponseProps } from './components/SideBar';
import { Content, MovieProps } from './components/Content';

import './styles/global.scss';
import './styles/sidebar.scss';
import './styles/content.scss';


export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar genreId = {selectedGenreId} changeGenre={handleClickButton}/>
      <Content movies={movies} selectedGenre={selectedGenre}/>
    </div>
  )
}