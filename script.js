async function searchSong() {
  const query = document.getElementById('song-input').value;
  if (!query) {
    alert('Please enter a song name.');
    return;
  }

  const apiUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`;
  
  // You need to replace 'YOUR_ACCESS_TOKEN' with a valid Spotify API access token.
  const headers = {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  };
  
  try {
    const response = await fetch(apiUrl, { headers });
    const data = await response.json();
    
    displayResults(data.tracks.items);
  } catch (error) {
    console.error('Error fetching song data:', error);
    alert('Error fetching song data. Please try again.');
  }
}

function displayResults(songs) {
  const resultsContainer = document.getElementById('song-results');
  resultsContainer.innerHTML = ''; // Clear previous results

  if (songs.length === 0) {
    resultsContainer.innerHTML = '<p>No songs found.</p>';
    return;
  }

  songs.forEach(song => {
    const songElement = document.createElement('div');
    songElement.classList.add('song-item');
    
    const songImage = song.album.images[0].url;
    const songName = song.name;
    const artistName = song.artists.map(artist => artist.name).join(', ');
    const songLink = song.external_urls.spotify;
    
    songElement.innerHTML = `
      <img src="${songImage}" alt="${songName}" />
      <div class="song-info">
        <a href="${songLink}" target="_blank" class="song-name">${songName}</a>
        <p class="artist-name">${artistName}</p>
      </div>
    `;
    
    resultsContainer.appendChild(songElement);
  });
}
