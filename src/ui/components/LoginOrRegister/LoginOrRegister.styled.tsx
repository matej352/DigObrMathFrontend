import styled from "styled-components";

export const Container = styled.div`
  width: 1043px;
  height: 80%;
  flex-shrink: 0;
  border-radius: 20px;
  background: rgba(224, 224, 224, 0.64);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  align-self: center;
`;

export const Title = styled.h1`
  color: #4e7b79;
  font-size: 64px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

export const SVGWrapper = styled.div`
  width: 200px;
  height: 200px;
  flex-shrink: 0;
  border-radius: 259px;
  background: #fff;
`;

export const Description = styled.p`
  width: 365px;
  height: 46px;
  flex-shrink: 0;
  color: #555;
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
`;

export const Button = styled.button<{ isFilled: boolean }>`
  width: 200px;
  height: 43px;
  flex-shrink: 0;
  border-radius: 17px;
  border: 3px solid #4e7b79;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: ${({ isFilled }) => (isFilled ? "#4E7B79" : "transparent")};
  color: ${({ isFilled }) => (isFilled ? "#fff" : "#4E7B79")};
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
`;

export const Subtitle = styled.h2`
  color: #000;
  text-align: center;
  font-size: 23px;
  font-style: normal;
  font-weight: 500;
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
