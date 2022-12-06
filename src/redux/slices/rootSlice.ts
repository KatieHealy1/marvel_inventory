import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: 'Black Panther',
        description: "superhero",
        powers: 'fast',
        enemies: "Kilmonger",
        movies: 'Black Panther',
        comics: 'Avengers',
        shows: 'Black Panther',
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload},
        chooseDescription: (state, action) => { state.description = action.payload},
        choosePowers: (state, action) => { state.powers = action.payload},
        chooseEnemies: (state, action) => { state.enemies = action.payload},
        chooseMovies: (state, action) => { state.movies = action.payload},
        chooseComics: (state, action) => { state.comics = action.payload},
        chooseShows: (state, action) => { state.shows = action.payload}
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { 
    chooseName, 
    chooseDescription,
    choosePowers,
    chooseEnemies,
    chooseMovies,
    chooseComics,
    chooseShows
} = rootSlice.actions;