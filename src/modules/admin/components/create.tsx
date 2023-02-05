import { useState } from "react";
import { z } from "zod";
import { api } from "../../../utils/api";

interface ICreateFormProps {
  forceUpdate: () => void; // this should force the parent component to fetch the data again
}

const CreateForm = ({ forceUpdate }: ICreateFormProps) => {
  const wordsMutator = api.words.create.useMutation();
  const [word, setWord] = useState({
    englishSpelling: "",
    englishMeaning: "",
    hiragana: "",
    katakana: "",
    kanji: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    wordsMutator.mutate(
      {
        englishSpelling: word.englishSpelling,
        englishMeaning: word.englishMeaning,
        hiragana: word.hiragana,
        katakana: word.katakana,
        kanji: word.kanji,
      },
      {
        onSuccess: () => {
          forceUpdate();
        },
        onError: (error) => {
          console.error(error);
          alert(error.message);
        },
      }
    );
  };

  const inputClasses = "rounded-md p-2 outline-none w-full";

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="my-4 flex flex-col items-center gap-2 rounded-md bg-pink-200 p-2"
    >
      <input
        type="text"
        placeholder="English spelling"
        required
        lang="en"
        value={word.englishSpelling}
        onChange={(e) => setWord({ ...word, englishSpelling: e.target.value })}
        className={inputClasses}
      />

      <input
        type="text"
        placeholder="English meaning"
        required
        lang="en"
        value={word.englishMeaning}
        onChange={(e) => setWord({ ...word, englishMeaning: e.target.value })}
        className={inputClasses}
      />

      <input
        type="text"
        placeholder="Hiragana"
        required
        value={word.hiragana}
        onChange={(e) => setWord({ ...word, hiragana: e.target.value })}
        className={inputClasses}
      />

      <input
        type="text"
        placeholder="Katakana"
        value={word.katakana}
        onChange={(e) => setWord({ ...word, katakana: e.target.value })}
        className={inputClasses}
      />

      <input
        type="text"
        placeholder="Kanji"
        value={word.kanji}
        onChange={(e) => setWord({ ...word, kanji: e.target.value })}
        className={inputClasses}
      />

      <input
        type="submit"
        value="CREATE"
        className="cursor-pointer rounded-md bg-blue-500 p-2 px-8 text-white hover:bg-blue-400"
      />
    </form>
  );
};

export default CreateForm;
