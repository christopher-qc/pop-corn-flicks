import axios from 'axios';

const apiKey = 'e5d538ae943a6780dedc485d3558c71f';
const urlGeners = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

export const fetchAllMovies = async (page) => {
    const numPage = page || 1    
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${numPage}`;
    const response = await axios.get(url);
    return response.data;
}

export const fetchGenres = async () => {
    const response = await axios.get(urlGeners);
    return response.data.genres;
}