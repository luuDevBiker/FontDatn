import styled from "styled-components"

export const Box=styled.div`
    background: #ffffff;
    box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
    margin-top: 24px;
    border-radius: 10px;
    
`
export const BoxHeader=styled.div`
    height: 54px;
    box-shadow: inset 0px -1px 0px black;  
    display: flex;
    align-items: center;
    padding:0px 24px 0 15px;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 22px;
    color: black;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
export const BoxBody=styled.div`
    padding: 15px 24px 10px 24px;
    .option{
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 8px;
    }
    .css{
        input{
            width: 1000 px;
        }
    }
`
export const ContenRight=styled.div`
    color: black;
    opacity: 40%;
`