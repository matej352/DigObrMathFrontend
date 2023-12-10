import styled from "styled-components";

export const Card = styled.div`
  border-radius: 10px;
  background: #fff;
  box-shadow: 4px 7px 8px 0px rgba(0, 0, 0, 0.25);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 260px;

  &:hover {
    box-shadow: 4px 7px 8px 0px rgba(0, 0, 0, 0.5);
    transform: scale(1.05);
    transition: all 0.2s ease-in-out;
  }
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  font-size: 50px;
  font-style: normal;
  font-weight: 700;
  width: 230px;
  height: 70px;
  justify-content: center;
  color: #fff;
  background: #888;
  overflow: hidden;
`;

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  justify-content: flex-start;
  height: 180px;
`;

export const BottomTitle = styled.p`
  color: #444;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const Divider = styled.div`
  width: 100px;
  height: 2px;
  flex-shrink: 0;
  background-color: #4e7b79;
  border-radius: 2px;
`;

export const Description = styled.p`
  color: #8c8c8c;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  overflow: hidden;
  height: 100%;
`;

export const CTA = styled.button`
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
`;
