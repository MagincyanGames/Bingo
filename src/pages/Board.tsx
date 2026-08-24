import { useState } from 'react';
import seedrandom from 'seedrandom';

const generateUniqueBingoNumbers = () => {
  const result: number[] = [];
  const rng = seedrandom()

  for (let col = 0; col < 9; col++) {
    const min = col * 10;
    const colSet = new Set<number>();

    while (colSet.size < 3) {
      colSet.add(min + Math.floor(rng() * 10 + 1));
    }

    result.push(...Array.from(colSet));
  }

  return result;
};

export default function Board() {
  const [numbers] = useState(generateUniqueBingoNumbers);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])

  return (
    <div className="flex flex-1 flex-col md:flex-row justify-center items-center h-full w-full gap-8 md:gap-20">
      <div className="grid grid-rows-3 grid-flow-col gap-4 bg-ctp-surface0 p-4 rounded-4xl">
        {numbers.map((n, index) => (
          <div
            key={index}
            className={`flex items-center justify-center h-18 w-18 rounded-full text-2xl leading-none cursor-pointer 
              ${selectedNumbers.includes(n) ? 'bg-ctp-lavender-700 hover:bg-ctp-lavender-200 text-ctp-base' : 'bg-ctp-surface1 text-ctp-text hover:bg-ctp-overlay0'}
              `}

            onClick={() => {
              if (selectedNumbers.includes(n))
                setSelectedNumbers(prev => prev.filter(i => i !== n))
              else setSelectedNumbers(prev => [...prev, n])

            }}
          >
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}
