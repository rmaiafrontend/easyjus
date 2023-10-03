import styled from "styled-components";

export const Campo = styled.div`
  display: flex;
  width: 100%;
  height: 4.1rem;
  background-color: #f2f2f2;
  border-radius: 5px;
  display: flex;
  margin-bottom: 1rem;
`;

export const Title = styled.div`
  padding: 0 10px;
  display: flex;
  align-items: center;
  border-right: 1px solid transparent;
  border-image: linear-gradient(270deg, rgba(82, 50, 255, 0.06) 0%, #5232ff 50.95%, rgba(82, 50, 255, 0) 100%); /* Gradiente para a borda */
  border-image-slice: 1; /* Use o gradiente em toda a borda */
  span {
    width: 100%;
    text-align: center;
    color: #000;
    font-size: 12px;
    font-weight: 400;
    white-space: nowrap;
  }
`;

export const Input = styled.input`
  padding: 0 10px;
  width: 100%;
  &::placeholder {
    /* Use & para se referir ao próprio componente "input" */
    font-weight: 300;
    color: #9d9d9d;
  }

  input[type="date"]:hover::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
  input[type="time"]:hover::-webkit-datetime-edit-hour-field,
  input[type="time"]:hover::-webkit-datetime-edit-minute-field {
    cursor: pointer;
  }
`;
