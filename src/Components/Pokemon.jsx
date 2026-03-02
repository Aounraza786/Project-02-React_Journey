import "../index.css";
import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

function Pokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=24";

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();
        console.log(data);

        // 1. const detailedPokemonData = data.results.map((currPokemon) => {
        //   console.log(currPokemon.url);
        // }); This is for to get url.

        const detailedPokemonData = data.results.map(async (currPokemon) => {
          const res = await fetch(currPokemon.url);
          const data = await res.json();
          // console.log(data);
          return data;
        });
        // console.log(detailedPokemonData);
        const detailedResponse = await Promise.all(detailedPokemonData);
        // console.log(detailedResponse);
        setPokemon(detailedResponse);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const searchData = pokemon.filter((curCard) =>
    curCard.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div>
        <h1>Loading...............</h1>
      </div>
    );
  }

  if (errors) {
    return (
      <>
        <h1>{errors.message}</h1>
      </>
    );
  }

  return (
    <>
      <section className="container">
        <header>
          <h1> Lets Catch Pokémon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="search item"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="cards">
          {searchData.map((currPokemon) => {
            return (
              <PokemonCard key={currPokemon.id} pokemonData={currPokemon} />
            );
          })}
        </div>
      </section>
    </>
  );
}
export default Pokemon;
