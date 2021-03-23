import { useEffect, useState } from "react"
import { api } from "../services/api"

import { Button } from '../components/Button';
export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps  {
  changeGenre: (id: number) => void;
  genreId: number;
}

export function SideBar(props: SideBarProps) {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, [])
 return(
  <nav className="sidebar">
  <span>Watch<p>Me</p></span>

  <div className="buttons-container">
    {genres.map(genre => (
      <Button
        key={String(genre.id)}
        title={genre.title}
        iconName={genre.name}
        onClick={() => props.changeGenre(genre.id)}
        selected={props.genreId === genre.id}
      />
    ))}
  </div>
</nav>
 )
}