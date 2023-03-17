import React from "react";
import Categories from "./Categories";
import styled from "styled-components";

const NavArea = styled.div`
  width: 40%;
  left: 0;
  right: 0;
  height: 100px;
  margin: 0 auto;
  position: fixed;
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.5);
  top: 30px;
  z-index: 10;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Navigation = ({ category, onSelect }) => {
  return (
    <NavArea>
      <Categories category={category} onSelect={onSelect} />
    </NavArea>
  );
};

export default Navigation;
