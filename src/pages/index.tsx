import { useEffect, useState } from 'react';
import { getPokemons } from '../../lib/getsPokemons';
import styles from '../../styles/Home.module.css';

export default function Home() {
  const [pokemons, setPokemons] = useState<Array<any>>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemons = async () => {
      console.log('Fetching pokemons...');
      const pokemonData = await getPokemons();
      console.log('Fetched pokemons:', pokemonData);
      setPokemons(pokemonData);
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage}></div>
      <main className={styles.main}>
        <h1 className={styles.title}>Pokédex Eléctrica</h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Buscar Pokémon..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.grid}>
          {filteredPokemons.map(pokemon => (
            <div key={pokemon.id} className={styles.card}>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className={styles.cardImage}
              />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{pokemon.name}</h3>
                <p className={styles.cardInfo}>Tipo: {pokemon.types.map((type: any) => type.type.name).join(', ')}</p>
                <p className={styles.cardInfo}>Altura: {pokemon.height / 10} m</p>
                <p className={styles.cardInfo}>Peso: {pokemon.weight / 10} kg</p>
                <h4 className={styles.cardSubtitle}>Habilidades:</h4>
                {pokemon.abilities.map((ability: any, index: number) => (
                  <div key={index} className={styles.abilityInfo}>
                    <p className={styles.abilityName}>{ability.ability.name}</p>
                    <p className={styles.abilityDescription}>{ability.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}