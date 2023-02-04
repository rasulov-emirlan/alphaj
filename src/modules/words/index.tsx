import { useState } from "react";
import { AlphabetHiragana, AlphabetKatakana } from "./alphabets";
import { Alphabet } from "./components/alphabet";
import { WordsLogic, AlphabetType } from "./logic";
import { words } from "./words";

const logic = new WordsLogic(words);

const Words = () => {
  const [currentAlphabet, setCurrentAlphabet] = useState({
    currAlphabet: AlphabetHiragana,
    currAlphabetName: "hiragana" as AlphabetType,
  });

  const [inputWord, setInputWord] = useState<string>("");

  const [guessingWord, setGuessingWord] = useState(["ha", "ha"]);

  //prettier-ignore
  const setHiragana = () => {setCurrentAlphabet({currAlphabet: AlphabetHiragana,currAlphabetName: "hiragana",});};
  //prettier-ignore
  const setKatakana = () => {setCurrentAlphabet({currAlphabet: AlphabetKatakana,currAlphabetName: "katakana",});};

  const pushChar = (char: string) => setInputWord(inputWord + char);

  const anotherWord = () => setGuessingWord(logic.getWord());

  const handleTry = () => {
    try {
      const answer = logic.checkAnswer(
        guessingWord,
        inputWord,
        currentAlphabet.currAlphabetName
      );

      if (answer.isCorrect) {
        alert("Correct!");
        anotherWord();
        setInputWord("");
        return;
      }

      alert("Wrong!");
      setInputWord("");
    } catch (error) {
      alert(error);
      anotherWord();
      setInputWord("");
    }
  };

  return (
    <main className="m-auto max-w-[1260px] p-2">
      <section className="h-20">
        <h1
          className="mx-4 flex cursor-pointer justify-center gap-2 text-4xl text-blue-500 hover:text-blue-400"
          onClick={anotherWord}
        >
          {guessingWord.map((char, key) => (
            <span key={key}>{char}</span>
          ))}
        </h1>
      </section>

      <form
        className="m-auto flex flex-col gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex w-full">
          <input
            type="text"
            value={inputWord}
            placeholder="Enter japanese pronunciation here"
            onChange={(e) => {
              setInputWord(e.target.value);
            }}
            className="focus:pink-500 w-full rounded-md rounded-r-none border border-blue-500 p-2 text-center text-xl text-blue-500 outline-none"
          />
          <button
            type="submit"
            className="w-[10%] min-w-[20px] rounded-md rounded-l-none bg-blue-500 p-2 font-bold text-white"
            onClick={handleTry}
          >
            Try
          </button>
        </div>

        <div className="flex w-full justify-between gap-2 rounded-md bg-pink-200 p-2">
          <button
            onClick={setHiragana}
            className={`w-full rounded-md ${
              currentAlphabet.currAlphabetName === "hiragana"
                ? "bg-blue-500"
                : "bg-blue-300"
            } p-2 text-center text-white`}
          >
            Hiragana
          </button>
          <button
            onClick={setKatakana}
            className={`w-full rounded-md ${
              currentAlphabet.currAlphabetName === "katakana"
                ? "bg-blue-500"
                : "bg-blue-300"
            } p-2 text-center text-white`}
          >
            Katakana
          </button>
        </div>
        <Alphabet
          availableChars={currentAlphabet.currAlphabet}
          pushChar={pushChar}
        />
      </form>
    </main>
  );
};

export default Words;
