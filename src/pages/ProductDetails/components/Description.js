import Button from '@mui/material/Button';
import React, { useState } from "react";

const Description = ({ text, charLimit = 250 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Kiểm tra chiều dài của văn bản
  const shouldShowButton = text.length > charLimit;

  return (
    <div className="description-container mb-4 mt-1">
      <div className="text-gray-800 text-sm leading-relaxed">
        {/* Hiển thị văn bản dựa trên trạng thái mở rộng */}
        {isExpanded ? text : `${text.slice(0, charLimit)}...`}

        {/* Chỉ hiển thị nút nếu văn bản lớn hơn charLimit */}
        {shouldShowButton && (
          <Button
            onClick={toggleExpand}
            className="text-purple-700 font-semibold hover:underline mt-0 p-0 ms-2"
          >
            {isExpanded ? "Show Less" : "Show More"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Description;
