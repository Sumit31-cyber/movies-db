import axios from "axios";
// Get popular Movies
const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=f7af3ed5561a5f32d27102c8b459b40e';
export const getPopularMovie = async () => {
    const response = await axios.get(`${apiUrl}/movie/popular?${apiKey}`)
    return response.data.results;
}
// Get Upcoming Movies
export const getUpcomingMovies = async () => {
    const response = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`)
    return response.data.results;
}

//Get Popular tv
export const getPopularTv = async () => {
    const response = await axios.get(`${apiUrl}/tv/popular?${apiKey}`)
    return response.data.results;
}

//Get Family movies
export const getFamilyMovies = async () => {
    const response = await axios.get(`${apiUrl}/discover/movie?${apiKey}&with_genres=10751`)
    return response.data.results;
}

//Get Documentry 
export const getDocumentry = async () => {
    const response = await axios.get(`${apiUrl}/discover/movie?${apiKey}&with_genres=99`)
    return response.data.results;
}

//Get Movie 
export const getMovie = async (id) => {
    const response = await axios.get(`${apiUrl}/movie/${id}?${apiKey}`)
    return response.data;
}
