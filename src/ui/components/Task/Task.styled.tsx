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

export const Divider = styled.div`
  width: 100px;
  height: 2px;
  flex-shrink: 0;
  background-color: #4e7b79;
  border-radius: 2px;
`;

export const Subtitle = styled.span`
  color: #ca9300;
  font-size: 23px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto;
  grid-column-gap: 24px;
  grid-row-gap: 24px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const TaskContainer = styled.div`
  grid-area: 1 / 1 / 3 / 5;
`;

export const InputContainer = styled.div`
  grid-area: 3 / 1 / 7 / 5;
`;

export const DifficultyContainer = styled.div`
  grid-area: 1 / 5 / 2 / 7;

  div {
    max-width: 100%;
  }
`;

export const HelpContainer = styled.div`
  grid-area: 2 / 5 / 5 / 7;
`;

export const Task = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  height: 296px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fff;
  box-shadow: 4px 7px 8px 0px rgba(0, 0, 0, 0.25);
  padding: 20px;
`;

export const BoxTitle = styled.span`
  color: #444;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
`;

export const Answer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  height: 400px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 4px 7px 8px 0px rgba(0, 0, 0, 0.25);
  padding: 20px;
`;

export const Help = styled.div`
  display: flex;
  padding: 12px 13px 277px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fff;
  box-shadow: 4px 7px 8px 0px rgba(0, 0, 0, 0.25);
`;

export const Text = styled.span`
  color: #8c8c8c;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
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
  font-size: 16px;
`;

export const TaskFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: end;
  flex: 1;
  gap: 30px;
  align-self: flex-end;
`;

export const ClickableText = styled.span<{ color?: string }>`
  color: ${({ color }) => color || "#4E7B79"};
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  cursor: pointer;
`;

export const TextAnswer = styled.textarea`
  background: #f4f4f4;
  border-radius: 10px;
  font-size: 16px;
  border: none;
  resize: none;
  padding: 10px;
`;

export const SendButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  flex-direction: column;
  gap: 10px;
`;

export const SendButton = styled.button<{ isDisabled: boolean }>`
  border-radius: 8px;
  background: #ffba00;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  border: none;
  width: 100px;
  padding: 5px 10px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;

  ${({ isDisabled }) =>
    isDisabled &&
    `
    background: #e0e0e0;
    cursor: not-allowed;
  `}
`;

export const AnswerResult = styled.span<{ color?: string }>`
  color: ${({ color }) => color || "#4E7B79"};

  font-size: 18px;
  font-style: normal;
  font-weight: 600;
`;
