import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 16px;
  border-radius: 20px;
  background: rgba(224, 224, 224, 0.64);
  gap: 24px;
  max-width: 1500px;
  margin: 0 auto;
  height: min-content;
  @media (min-width: 1024px) {
    padding: 34px 92px;
  }
`;

export const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
`;

export const Title = styled.span`
  color: #ca9300;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
`;

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);

  th,
  td {
    padding: 10px 20px;
    text-align: center;
  }

  th {
    background: #ca9300;
    color: #ffffff;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  td {
    color: #000000;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  tbody tr:nth-child(odd) {
    background: #f2f2f2;
  }
`;
