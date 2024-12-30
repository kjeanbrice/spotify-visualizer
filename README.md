
# Spotify Visualizer

A web application that provides users with personalized Spotify data, allowing them to view their top artists, top tracks, and recently played songs. The app also features functionality for creating and saving recommended playlists based on existing playlists.  

## Features  
- **Personalized Data:** View top artists, tracks, and recently played songs from your Spotify account.  
- **Playlist Recommendations:** Create and save playlists of recommended tracks based on your existing playlists.  
- **Seamless Integration:** Built with a RESTful API backend and Angular's HTTP library for smooth data retrieval and communication.  

## Technologies Used  
- **Frontend:** Angular (with HTTP library for API integration)  
- **Backend:** RESTful API development using Node.js and Express.js  
- **API Integration:** Spotify Web API for fetching user data and managing playlists  

## Setup and Installation  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/your-username/spotify-data-insights.git  
   cd spotify-data-insights  
   ```  

2. Install dependencies:  
   ```bash  
   npm install  
   ```  

3. Set up Spotify API credentials:  
   - Register your application on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).  
   - Note your **Client ID** and **Client Secret**.  
   - Update your environment variables:  
     ```env  
     SPOTIFY_CLIENT_ID=your_client_id  
     SPOTIFY_CLIENT_SECRET=your_client_secret  
     REDIRECT_URI=http://localhost:3000/callback  
     ```  

4. Start the development server:  
   ```bash  
   npm start  
   ```  

5. Open the application in your browser:  
   ```
   http://localhost:4200  
   ```  

## Usage  
- Authenticate with your Spotify account to access personalized data.  
- Explore your top artists, top tracks, and recently played songs.   

## License  
This project is licensed under the [MIT License](LICENSE).  
