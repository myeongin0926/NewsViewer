import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const categories = [
  { name: "all", text: "전체보기" },
  { name: "sport", text: "스포츠" },
  { name: "health", text: "건강" },
  { name: "business", text: "비즈니즈" },
  { name: "science", text: "과학" },
  { name: "entertainment", text: "엔터테이먼트" },
];

const Category = styled(NavLink)`
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 3px;
  cursor: pointer;
  text-decoration: none;
  color: black;
  &.active {
    font-weight: bold;
    border-bottom: 2px solid;
    color: rgb(157, 157, 122);
  }
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
          className={({ isActive }) => (isActive ? "active" : undefined)}
          to={c.name === "all" ? "/" : `/${c.name}`}
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
