
export interface ITile {
  letter: string;
  correctSpot: boolean;
  selected: boolean;
  presentInWord: boolean;
}

const Tile: React.FC<ITile> = ({
  letter,
  correctSpot,
  selected,
  presentInWord,
}) => {

  const mainStyle = 'flex items-center text-white justify-center md:w-24 md:h-24 shadow-lg xl:w-32 xl:h-32 text-4xl font-bold border-2 border rounded-lg ';

  const highlight = () => {
    if (correctSpot) return 'bg-green-400';
    else if (selected) return 'bg-blue-400';
    else if (presentInWord && !correctSpot) return 'bg-yellow-400';
    else return 'bg-gray-400';
  }

  return (
    <div className={mainStyle + highlight()}>
      {letter}
    </div>
  );
}

export default Tile;