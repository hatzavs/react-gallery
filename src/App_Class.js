import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      album: []
    }
  }
  
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/albums')
    .then(res => res.json())
    .then(albumsData => this.setState({
      albums: albumsData
    }));
  }

  findAlbum(albumTitle) {
    return this.state.albums.find(album => album.title === albumTitle);
  }

  chooseAlbum(e) {
    if (e.target.value === "Select...") {
      this.setState({
        album:[]
      });
      return;
    }
    const albumID = this.findAlbum(e.target.value).id;
    console.log(albumID);
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumID}`)
    .then(res => res.json())
    .then(albumData => {
      this.setState({
        album: albumData
      });
    });
  }

  render() {
    return (
        <div className="App">
          <h1>Select an album:</h1>
          <form>
            <select name="albums" id="albums" onChange={this.chooseAlbum.bind(this)} placeholder="Select...">
            <option selected="selected">Select...</option>
              {this.state.albums.map(album => {
                return <option value={album.title}>{album.title}</option>
              })}
            </select>
          </form>
          <div className="pics">
            {this.state.album.map((pic, index) => {
              return <img key={index} src={pic.url} alt={pic.thumbnailUrl}/>
            })}
          </div>
        </div>
    );
  }

}

export default App;
