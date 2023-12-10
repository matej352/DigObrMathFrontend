import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 34px 92px;
  border-radius: 20px;
  background: rgba(224, 224, 224, 0.64);
  gap: 34px;
`;

export const Header = styled.header`
  color: #ca9300;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const LecturesList = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 34px;
`;

export const BackButton = styled.button`
  display: inline-flex;
  padding: 8px 22px 8px 28px;
  align-items: center;
  border-radius: 10px;
  background: #4e7b79;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  border: none;
  width: 100px;
  color: #fff;
  margin-top: 34px;
`;
