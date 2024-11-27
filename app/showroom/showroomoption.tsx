import React, { useState } from "react";
import "./showroomoption.css";
import "../option.css"; // 공통 CSS 파일을 임포트합니다.
import PriceOption from "../priceoption.tsx"

function ShowRoomOption() {
  const [selectedTags, setSelectedTags] = useState([]);

  const tags = ["태그1", "태그2", "태그3", "태그4", "태그5", "태그6", "태그7", "태그8", "태그9"];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="option-background"> {/* 공통 클래스 사용 */}
        <div className="category">카테고리</div>
        <hr className="form-divider-thick"></hr>
      <div className="d-flex flex-wrap">
        {tags.map((tag, index) => (
          <button
            key={index}
            className={`tag-button col-3 ${selectedTags.includes(tag) ? "selected" : ""}`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <PriceOption onReset={() => console.log("Prices reset")} />
    </div>
  );
}

export default ShowRoomOption;
