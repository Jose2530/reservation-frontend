
const BASE_URL = 'http://api.localhost:8001/Reservation-Mngr/V1';


const fetchData = async (url: string, options?: RequestInit) => {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  };

  export const getMovies = async () => {
    return await fetchData(`${BASE_URL}/list/movie`);
  };
  

  export const createMovie = async (movie: {title: string; gender: string; duration: number; clasification: string }) => {
    console.log("movie", movie)
    const response = await fetch(`${BASE_URL}/create/movie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },  
      body: JSON.stringify(movie),
    });
    const result = await response.json();
    return result; 
  }
  export const getRooms = async (room: {name:string; capacity: string}) => {
    const response = await fetch(`${BASE_URL}/list/rooms`);
    const data = await response.json();
    console.log(data)
    return data;
  };
  
  export const createReservation = async (reservation: {movie:string; room: string; schedule:string; emailAddres:string; selectedSeats:string[]}) => {
    const response = await fetch(`${BASE_URL}/create/reservation`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },  
      body: JSON.stringify(reservation),
    });
    console.log("reservation", reservation);
    const result = await response.json();
    console.log("result", result)
    return result; 
  }
  
  export const getReservations = async () => {
    const response = await fetch(`${BASE_URL}/list/reservation`);
    const data = await response.json();
    console.log(data)
    return data;
  };
  
  