import { create } from "zustand";
import axios from 'axios';

const apiKey = 'e5d538ae943a6780dedc485d3558c71f';

const useStore = create((set) => ({
    movies: [],
    genres: [],
    cast: [],
    videos: [],
    loading: false,
    error: null,

    fetchMovies: async (page = 1) => {
        set({ loading: true, error: null });
        
        try { 
            const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;
            const response = await axios.get(url);
            const data = response.data.results.map((m) => {
                return {
                    ...m,
                    imageBig: `https://image.tmdb.org/t/p/w1280${m.poster_path}`,
                    imageSmall: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
                }
            })
            set({ movies: data, loading: false })
        } catch(err) {
            console.log(err)
            set({ error: err.message, loading: false })
        }
    },
    fetchGenres: async () => {
        set({ loading: true, error: null });

        try {
            const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
            set({ genres: response.data.genres, loading: false })
        } catch(err) {
            console.log(err)
            set({ error: err.message, loading: false })
        }
    },
    fetchCast: async (id) => {
        try {
            const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`;
            const response = await axios.get(url);
            set({ cast: response.data.cast, loading: false })
        } catch(err) {
            console.log(err)
            set({ error: err.message, loading: false })
        }
    },
    fetchVideos: async (id) => {
        try {
            const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=${apiKey}`;
            const response = await axios.get(url);
            set({ videos: response.data.results, loading: false })
        } catch(err) {
            console.log(err)
            set({ error: err.message, loading: false })
        }
    }
}))

export default useStore;