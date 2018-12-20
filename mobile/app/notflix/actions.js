import axios from 'axios'

export function newRelease(){
    // data simulation
    // const movies= [
    //     { imageRelese: require('./images/new4.jpg'), title: 'Venom' },
    //     { imageRelese: require('./images/new1.jpg'), title: 'What Keeps You Alive' },
    //     { imageRelese: require('./images/new2.jpg'), title: 'Roma' },
    //     { imageRelese: require('./images/new3.jpg'), title: 'White Boy Rick' },
    // ]
    
  

    return {
        type: 'NEW_RELEASE',
        payload: axios.get('http://192.168.0.6:3333/api/v1/movies/cached/trending/4')
    }
}
export function mostRated(){
    // data simulation
   

    return {
        type: 'MOST_RATE',
       payload: axios.get('http://192.168.0.6:3333/api/v1/movies/popular/4')
    }
}
export function allMovies(){
    // data simulation
    const allmovies= [
        { name: 'Aquaman', realese: '2018', lenght: '120', age: '13', uri: './images/aquaman7.png' },
        { name: 'Fifty Shades Darker', realese: '2018', lenght: '90', age: '18', uri: 'https://m.media-amazon.com/images/S/aplus-media/vc/a8cfa74c-c5c5-4eb1-a23b-0a5a786542a4.png' },
        { name: 'Avengers Infiniry Wars', realese: '2019', lenght: '150', age: '13', uri: 'http://irnpost.com/wp-content/uploads/2018/12/marvel.jpg' },
    ]

    return {
        type: 'ALL_MOVIES',
        payload: allmovies
    }
}
export function GET_MOVIE(id){
    return {
        type: "GET_MOVIE",
        payload: axios.get(`http://192.168.0.6:3333/api/v1/movie/${id}`)
    }
}
export function GET_CATEGORY(name){
    return {
        type: "GET_CATEGORY",
        payload: axios.get(`http://192.168.0.6:3333/api/v1/movies/${name}/4`)
    }
}