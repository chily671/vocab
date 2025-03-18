import { useState } from "react";
import EditWordModal from "./EditWordModal";

const WordList = ({ words, refreshData }) => {
  const [selectedWord, setSelectedWord] = useState(null);

  return (
    <div>
      {words.map((word) => (
        <div key={word._id}>
          <p>{word.word} - {word.meaning}</p>
          <button onClick={() => setSelectedWord(word)}>Chỉnh sửa</button>
        </div>
      ))}

      {selectedWord && (
        <EditWordModal
          wordData={selectedWord}
          onClose={() => setSelectedWord(null)}
          onSave={refreshData} // Hàm reload danh sách từ
        />
      )}
    </div>
  );
};

export default WordList;
