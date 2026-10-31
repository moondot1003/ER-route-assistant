import type { Character } from '../domain/models';

interface Props {
  characters: Character[];
  value: string;
  onChange: (characterId: string) => void;
}

export function CharacterSelector({ characters, value, onChange }: Props) {
  return (
    <label className="field">
      <span className="field-label">실험체</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {characters.map((character) => (
          <option key={character.id} value={character.id}>{character.name}</option>
        ))}
      </select>
    </label>
  );
}
