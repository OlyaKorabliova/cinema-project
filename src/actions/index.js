export const fetchMoviesStart = (id) => {
    return {
        type: 'FETCH_MOVIES',
        id
    }
}

export const fetchActorsStart = () => {
    return {
        type: 'FETCH_ACTOR',
        id: 'actor'
    }
}

export const fetchActorsSucess = (id, actor) => ({type: 'FETCH_ACTOR__SUCCESS', id: 'actor', actor})

export const fetchMoviesFail = (id) => {
    console.log("FETCH FAIL");
    return {
        type: 'FETCH_MOVIES_FAIL',
        error: true,
        id
    }
}

export const fetchMoviesSuccess = (id, ids, movies = []) => {
    return {
        type: 'FETCH_MOVIES_SUCCESS',
        id,
        movies,
        ids
    }
}

export const fetchCarouselleMoviesSuccess = (ids, movies, label) => {
      return {
          type: 'FETCH_CAROUSELLE_MOVIES_SUCCESS',
          id: 'carouselle',
          movies,
          ids,
          label
      }
}

export const fetchMoviesByScheduleSuccess = (ids, movies) => {
    return {
        type: 'FETCH_SCHEDULE_MOVIES_SUCCESS',
        id: 'schedule',
        movies,
        ids
    }
}
