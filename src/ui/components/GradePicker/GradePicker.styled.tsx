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

export const GradeList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: stretch;
  gap: 34px;
`;
