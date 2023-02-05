import { useState } from "react";
import { api } from "../../../utils/api";

const List = () => {
  const words = api.words.readAll.useQuery();

  const deletion = api.words.delete.useMutation();

  const updator = api.words.update.useMutation();

  const [updatingWord, setUpdatingWord] = useState({
    id: "",
    englishMeaning: "",
    englishSpelling: "",
    hiragana: "",
    katakana: "",
    kanji: "",
  });

  const inputClasses =
    "rounded-md outline-none w-full h-full bg-none bg-blue-500 text-white";

  if (
    words.status === "loading" ||
    deletion.status === "loading" ||
    updator.status === "loading"
  ) {
    return <div>Loading...</div>;
  }

  if (words.status === "error") {
    return <div>Error: {words.error.message}</div>;
  }

  return (
    <table className="w-full table-auto overflow-hidden rounded-md border bg-blue-500 text-white">
      <thead>
        <tr>
          <th className="px-4 py-2"></th>
          <th className="px-4 py-2">Meaning</th>
          <th className="px-4 py-2">Spelling</th>
          <th className="px-4 py-2">Hiragana</th>
          <th className="px-4 py-2">Katakana</th>
          <th className="px-4 py-2">Kanji</th>
        </tr>
      </thead>
      <tbody>
        {words.data?.map((word) => (
          <tr key={word.id}>
            <td className="border border-pink-200">
              <button
                className="w-full cursor-pointer bg-red-500 p-2 text-white hover:bg-red-400"
                onClick={() => deletion.mutate(word.id)}
              >
                DELETE
              </button>

              {/* <button
                  className="w-1/2 cursor-pointer bg-green-500 p-2 text-white hover:bg-green-400"
                  onClick={() => api.words.update.useMutation().mutate()}
                >
                  UPDATE
                </button> */}
            </td>
            <td className="border border-pink-200">
              <input
                type="text"
                className={inputClasses}
                value={word.englishMeaning}
              />
            </td>
            <td className="border border-pink-200 px-4 py-2">
              {word.englishSpelling}
            </td>
            <td className="border border-pink-200 px-4 py-2">
              {word.hiragana}
            </td>
            <td className="border border-pink-200 px-4 py-2">
              {word.katakana}
            </td>
            <td className="border border-pink-200 px-4 py-2">{word.kanji}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
