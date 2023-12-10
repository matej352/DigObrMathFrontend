import styled from "styled-components";
import { ArrowDown } from "../Icons/ArrowDown";

export const Container = styled.div`
  display: flex;
  height: 51px;
  padding: 8px 20px;
  justify-content: space-between;
  align-items: center;
  gap: 51px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 4px 7px 8px 0px rgba(0, 0, 0, 0.25);
  width: 600px;

  &:hover {
    box-shadow: 4px 7px 8px 0px rgba(0, 0, 0, 0.5);
    transform: scale(1.05);
    transition: all 0.2s ease-in-out;
  }
`;

export const Title = styled.h1`
  color: #444;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const CTA = styled.button`
  width: 98px;
  height: 25px;
  flex-shrink: 0;
  border-radius: 5px;
  background: #ffba00;
  cursor: pointer;
  border: none;
`;

export const ArrowRight = styled(ArrowDown)`
  width: 12px;
  height: 10px;
  transform: rotate(270deg);
  margin-left: 4px;
  align-self: center;
`;
