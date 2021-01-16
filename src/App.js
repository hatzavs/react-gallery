import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [album, setAlbum] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
    .then(res => res.json())
    .then(albumsData => setAlbums(albumsData));
  }, []);

  function findAlbum(albumTitle) {
    return albums.find(album => album.title === albumTitle);
  }

  function chooseAlbum(e) {
    if (e.target.value === "Select...") {
      setAlbum([]);
      return;
    }
    const albumID = findAlbum(e.target.value).id;
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumID}`)
    .then(res => res.json())
    .then(albumData => setAlbum(albumData));
  }

  return (
    <div className="App">
      <h1>Select an album:</h1>
      <form>
        <select name="albums" id="albums" onChange={chooseAlbum}>
        <option selected="selected">Select...</option>
          {albums.map(album => {
            return <option value={album.title}>{album.title}</option>
          })}
        </select>
      </form>
      <div className="pics">
        {album.map((pic, index) => {
          return <img key={index} src={pic.url} alt={pic.thumbnailUrl}/>
        })}
      </div>
    </div>
  );
}

export default App;
