import axios from 'axios';

// axios.defaults.baseURL = 'https://api.themoviedb.org/3';
// API = 3dc2fc79a967954912ca5aad45b95574


const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/trending/all/day',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZGMyZmM3OWE5Njc5NTQ5MTJjYTVhYWQ0NWI5NTU3NCIsInN1YiI6IjY1MDA0YzQzMWJmMjY2MDBmZmI1YWI1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zirrhOIT7yqxW1n0pdlMVLkB4-AicQWjZCs5JhftH6Q'
  }
};

export const fetch = async () => {
  return await axios.request(options)
}

export const fetchById = async ( optionsForId ) => {
  return await axios.request(optionsForId)
}

export const fetchByName = async ( optionsForName ) => {
  return await axios.request(optionsForName)
}





