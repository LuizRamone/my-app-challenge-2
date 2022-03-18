import styled from "styled-components";

export const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  /* margin: 50px; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 30px;
  background: #edebeb;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: black;
  }
`;

export const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 100px;
`;

export const H1 = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: 100px;
  margin-bottom: 100px;
`;
export const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  padding: 10px;
  margin-left: 30px;
`;

export const Select = styled.select`
  text-align: center;
  height: 35px;
  background: white;
  color: gray;
  font-size: 14px;
  border-color: black;
  margin-left: 30px;
  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;
