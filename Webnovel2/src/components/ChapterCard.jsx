import React from "react";

const ChapterCard = ({ name,chapID,openChap }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "12px 16px",
        marginBottom: "8px",
        cursor: "pointer",
        width: "100%",
        transition: "background-color 0.2s ease",
        borderRadius: "6px",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f2f2f2")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
    >
      <span style={{ marginLeft: "8px", fontSize: "16px", fontWeight: 500 }} onClick={()=>openChap(chapID)}>
        {name}
      </span>
    </div>
  );
};

export default ChapterCard;
