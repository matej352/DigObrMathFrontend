import styled from "styled-components";

export const LoadingSpinner = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 10px solid lightblue;
  border-top-color: transparent;
  animation: spin 1s infinite linear;
  position: absolute;
  top: 42%;
  left: 47.5%;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px
    height: 200px;
    justify-content: center;
    background-color: #fff;
    border-radius: 10px;
    `;
