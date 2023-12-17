import styled from "styled-components";

export const Container = styled.div`
  padding: 0 92px;
  height: 89px;
  flex-shrink: 0;
  border-radius: 20px;
  background: rgba(224, 224, 224, 0.64);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 1500px;
  margin: 0 auto;
  margin-bottom: 50px;
`;

export const Username = styled.h1`
  color: #ca9300;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const LogoutButton = styled.button`
  width: 106px;
  height: 41px;
  flex-shrink: 0;
  border-radius: 17px;
  border: 3px solid #ca9300;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: transparent;
  color: #ca9300;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;

  @media (min-width: 768px) {
    width: 200px;
  }
`;
