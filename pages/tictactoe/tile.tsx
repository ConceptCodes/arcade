const Tile =  ({ value, highlight, onClick }) => {
  return (
    <button className={`w-20 h-20 md:w-40 md:h-40 border-2 rounded-xl shadow-lg text-md md:text-2xl ${highlight ? 'border-black' : ''}`} onClick={onClick}>
      {value}
    </button>
  );
}

export default Tile;