import React from "react";
import { css } from "styled-components";
import styled from "styled-components";

const categories = [
  { name: "all", text: "전체보기" },
  { name: "sport", text: "스포츠" },
  { name: "health", text: "건강" },
  { name: "business", text: "비즈니즈" },
  { name: "science", text: "과학" },
  { name: "entertainment", text: "엔터테이먼트" },
];

const Category = styled.div`
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 3px;
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      font-weight: bold;
      border-bottom: 2px solid;
      color: red;
    `}
`;
const CategoriesBlock = styled.div`
  display: flex;
  gap: 20px;
`;

const Categories = ({ onSelect, category }) => {
  return (
    <CategoriesBlock>
      {categories.map((c) => (
        <Category
          key={c.name}
          active={category === c.name}
          onClick={() => {
            onSelect(c.name);
          }}
        >
          {c.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default Categories;
