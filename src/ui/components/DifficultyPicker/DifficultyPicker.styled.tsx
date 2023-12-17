import styled from "styled-components";

export const Container = styled.div`
  max-width: 399px;
  height: 150px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fff;
  box-shadow: 4px 7px 8px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 20px;
  overflow: hidden;
  padding: 0 20px;
`;

export const Title = styled.span`
  color: #444;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Progress = styled.div`
  color: #ca9300;
  font-size: 23px;
  font-style: normal;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  @media (min-width: 720px) {
    flex-direction: row;
  }
`;

export const Button = styled.button<{ disabled?: boolean }>`
  width: 97px;
  height: 21px;
  flex-shrink: 0;
  border-radius: 5px;
  background: #ffba00;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  align-self: flex-end;

  ${({ disabled }) =>
    disabled &&
    `
        background: #e0e0e0;
        cursor: not-allowed;
    `}
`;
