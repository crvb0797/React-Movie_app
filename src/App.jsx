import { useEffect, useState } from "react";

function NavPage(props) {
  return (
    <header className="d-flex justify-content-between align-items-center">
      <p>Page: {props.page}</p>
      <div className="pagination">
        <button
          className="btn btn-small btn-primary mx-2 my-4 page-link"
          onClick={() => {
            props.setPage(props.page - 1);
          }}
        >
          Prev page
        </button>
        <button
          className="btn btn-small btn-primary page-link mx-2 my-4"
          onClick={() => {
            props.setPage(props.page + 1);
          }}
        >
          Next page
        </button>
      </div>
    </header>
  );
}


function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function TraerPeliculas() {
      const respuesta = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=f1cf7e540cb099c09a357b2df5454f84&language=es-GT&page=${page}`
      );
      const datos = await respuesta.json();
      setMovies(datos.results);
      console.log(datos.results);
    }
    TraerPeliculas();
  }, [page]);

  return (
    <div className="p-5">
      {/* <div className="d-flex justify-content-start align-items-end fw-bolder">
        <img
          src="https://cdn.icon-icons.com/icons2/272/PNG/512/Movie_Studio_30032.png"
          className=""
          style={{ width: "3rem" }}
          alt=""
        />
        <h2 className="" style={{fontSize: "1rem"}}>MOVIE APP REACT</h2>
      </div> */}
      <h1 className="text-center mb-5 fs-3 display-1">
        Peliculas más populares
      </h1>
            <NavPage page={page} setPage={setPage} />
      <div className="d-flex flex-wrap justify-content-between align-items-baseline">
        {movies.map((movie) => {
          return (
            <div className="mx-auto" key={movie.id}>
              <div
                className="card mb-5"
                style={{ maxWidth: "18rem", height: "36rem", background: "#3F0071" }}
              >
                <img
                  src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                  className="card-img-top img-fluid"
                  alt={movie.name}
                />
                <div className="card-body">
                  <h3 className="card-title fs-5 fw-bold">{movie.title}</h3>
                  <p
                    className={
                      movie.vote_average >= 6
                        ? "card-text fs-5 fw-bold text-success"
                        : "card-text fs-5 fw-bold text-danger"
                    }

                    style={{padding: "3px 3px 5px 5px", background: "#fff", width: "5rem", textAlign: "center", borderRadius: "10px", marginTop: "20px" }}
                  >
                    {movie.vote_average + "/10"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
