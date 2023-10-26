import { useEffect, useState } from "react";
import { Table } from "./components";
import { PokemonAPI } from "./api/pokemon";
import { Pokemon } from "./types/Pokemon";

const COLUMNS = [
  { fieldname: 'id', title: 'ID' },
  { fieldname: 'name', title: 'Name' },
  { fieldname: 'type', title: 'Type' },
  { fieldname: 'hp', title: 'Health Points' },
  { fieldname: 'attack', title: 'Attack' },
  { fieldname: 'defense', title: 'Defense' },
  { fieldname: 'special_attack', title: 'Special Attack' },
  { fieldname: 'special_defense', title: 'Special Defense' },
  { fieldname: 'speed', title: 'Speed' },
  { fieldname: 'power', title: 'Power' },
]

function App() {

  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  const initialization = async () => {
    const data: Pokemon[] = await PokemonAPI.getAll()

    // appending power field
    const data_ = data.map(
      (element: Pokemon) => {
        const { hp, defense, special_attack, special_defense, speed } = element;
        element.power = hp + defense + special_attack + special_defense + speed;

        // type field array to string conversion
        if (typeof element.type === 'string') return element
        element.type = element.type.join(', ')

        return element
      })

    setPokemons(data_)
  }

  useEffect(() => {
    initialization()
  }, [])


  return (
    <div className="main">
      <Table
        columns={COLUMNS}
        data={pokemons}
      />
    </div>
  )
}

export default App;
