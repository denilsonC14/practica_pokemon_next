export async function getPokemons() {
  const headers = new Headers({
    "Content-Type": "application/json"
  });

  const requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow' as RequestRedirect
  };

  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10", requestOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon: any) => {
        const res = await fetch(pokemon.url);
        const details = await res.json();

        // Obtener descripciones de habilidades
        const abilitiesWithDescriptions = await Promise.all(
          details.abilities.map(async (ability: any) => {
            const abilityRes = await fetch(ability.ability.url);
            const abilityDetails = await abilityRes.json();
            const description = abilityDetails.effect_entries.find((entry: any) => entry.language.name === "en")?.effect || "No description available";
            return {
              ...ability,
              description
            };
          })
        );

        return {
          ...details,
          abilities: abilitiesWithDescriptions
        };
      })
    );
    return pokemonDetails;
  } catch (error) {
    console.error('Failed to fetch pokemons:', error);
    return [];
  }
}