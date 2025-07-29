import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import Button from "react-bootstrap/esm/Button";

const ReadChapter = () => {
  const { bookId, chapterId } = useParams();
  const { getChapters } = useFirebase();
  const [chapters, setChapters] = useState([]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChapters = async () => {
      const chps = await getChapters(bookId);
      const sorted = chps.sort((a, b) => a.time - b.time); // ascending
      setChapters(sorted);

      const index = sorted.findIndex((c) => c.id === chapterId);
      setCurrentChapterIndex(index);
      setCurrentChapter(sorted[index]);
    };

    fetchChapters();
  }, [bookId, chapterId]);

  const goToChapter = (index) => {
    const chapter = chapters[index];
    if (chapter) {
      navigate(`/book/${bookId}/chapter/${chapter.id}`);
    }
  };

  if (!currentChapter) return <p>Loading...</p>;

  return (
    <div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh", paddingTop: "40px" }}>
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <Button
          variant="secondary"
          disabled={currentChapterIndex === 0}
          onClick={() => goToChapter(currentChapterIndex - 1)}
          style={{ margin: "0 12px" }}
        >
          PREV
        </Button>

        <Button variant="secondary" onClick={() => navigate(`/book/${bookId}`)} style={{ margin: "0 12px" }}>
          HOME
        </Button>

        <Button
          variant="secondary"
          disabled={currentChapterIndex === chapters.length - 1}
          onClick={() => goToChapter(currentChapterIndex + 1)}
          style={{ margin: "0 12px" }}
        >
          NEXT
        </Button>
      </div>

      <h2 style={{ marginBottom: "24px", textAlign: "center" }}>{currentChapter.title}</h2>

      

      <div
        style={{
          backgroundColor: "white",
          maxWidth: "900px",
          margin: "0 auto",
          minHeight: "500px",
          padding: "32px",
          borderRadius: "8px",
          boxShadow: "0 0 12px rgba(0,0,0,0.1)",
          lineHeight: 1.7,
          fontSize: "18px",
          whiteSpace: "pre-wrap",
        }}
      >
        
        {currentChapter.content}
      </div>
    </div>
  );
};

export default ReadChapter;
