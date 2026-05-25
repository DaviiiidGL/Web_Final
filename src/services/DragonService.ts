const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=30';

const typeTranslations: { [key: string]: string } = {
  grass: 'Hierba',
  fire: 'Fuego',
  water: 'Agua',
  bug: 'Bicho',
  normal: 'Normal',
  flying: 'Volador',
  poison: 'Veneno',
  electric: 'Eléctrico',
  ground: 'Tierra',
  fairy: 'Hada',
  fighting: 'Lucha',
  psychic: 'Psíquico',
  rock: 'Roca',
  ghost: 'Fantasma',
  ice: 'Hielo',
  dragon: 'Dragón',
  dark: 'Siniestro',
  steel: 'Acero',
};

export interface Dragon {
  id: number;
  name: string;
  image: string;
  types: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
  };
  abilities: string[];
}

export interface DragonListItem {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: DragonListItem[];
}

interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonAbility {
  ability: {
    name: string;
  };
}

interface PokemonDetailResponse {
  id: number;
  name: string;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  sprites?: {
    other?: {
      ['official-artwork']?: {
        front_default?: string;
      };
    };
  };
}

export const fetchDragons = async (): Promise<Dragon[]> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Error fetching dragons: ${response.status}`);
    }

    const data: PokemonListResponse = await response.json();

    const dragonPromises = data.results.map((pokemon: DragonListItem) =>
      fetchDragonDetail(pokemon.url)
    );

    const dragons = await Promise.all(dragonPromises);
    return dragons;
  } catch (error) {
    console.error('Error fetching dragons:', error);
    throw error;
  }
};

export const fetchDragonDetail = async (url: string): Promise<Dragon> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching dragon detail: ${response.status}`);
    }

    const data: PokemonDetailResponse = await response.json();

    const types = data.types.map((typeObj: PokemonType) =>
      typeTranslations[typeObj.type.name] || typeObj.type.name
    );

    const stats = {
      hp: data.stats.find((stat: PokemonStat) => stat.stat.name === 'hp')?.base_stat || 0,
      attack: data.stats.find((stat: PokemonStat) => stat.stat.name === 'attack')?.base_stat || 0,
      defense: data.stats.find((stat: PokemonStat) => stat.stat.name === 'defense')?.base_stat || 0,
    };

    const abilities = data.abilities.map((abilityObj: PokemonAbility) =>
      abilityObj.ability.name.charAt(0).toUpperCase() + abilityObj.ability.name.slice(1)
    );

    const dragon: Dragon = {
      id: data.id,
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      image: data.sprites?.other?.['official-artwork']?.front_default || '',
      types,
      stats,
      abilities,
    };

    return dragon;
  } catch (error) {
    console.error('Error fetching dragon detail:', error);
    throw error;
  }
};