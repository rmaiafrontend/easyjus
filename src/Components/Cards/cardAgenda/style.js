import styled from "styled-components";

export const Card = styled.button`
  margin-bottom: 10px;
  padding: 10px 14px;
  width: 100%;
  height: auto;
  border-radius: 12px;
  border: 0.5px solid rgba(43, 54, 116, 0.26);
  background: #fff;
`;

export const Top = styled.div`
  margin-bottom: 8px;
  h4 {
    text-align: start;
    color: #2b3674;
    font-size: 18px;
    font-weight: 600;
  }
`;

export const Infos = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InfoDiligencia = styled.div`
  .titulo {
    text-overflow: ellipsis;
    text-align: start;
    color: #000;
    font-size: 12px;
    font-weight: 400;
  }
  .campo {
    text-align: left;
    text-overflow: ellipsis;
    color: #2b3674;
    font-size: 16px;
    font-weight: 400;
  }
`;
