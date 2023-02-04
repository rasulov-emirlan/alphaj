interface AlphabetIProps {
  availableChars: string[];
  pushChar: (char: string) => void;
}

export const Alphabet = ({ availableChars, pushChar }: AlphabetIProps) => {
  return (
    <div className="transition-al grid h-full w-full grid-cols-5 gap-4 rounded-md bg-blue-500 p-2">
      {availableChars.map((char, key) => (
        <button
          key={key}
          onClick={() => pushChar(char)}
          className="p-2 text-3xl text-white hover:font-bold hover:text-pink-400"
        >
          {char}
        </button>
      ))}
    </div>
  );
};
