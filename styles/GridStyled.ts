import styled from "styled-components";


export const BoxGrid=styled.div`
    height: 600px;
    border-radius: 10px;
    border: solid 2px yellowgreen;
    box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
    .image{
        width: 100%;
        height: 70%;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .content{
        .main-title{
            text-align: center;
            p{
                font-weight: 700;
                margin-top: 7px;
                font-size: 15px;
            }
        }   
        .main-content{
            text-align: center;
            margin: -12px 8px 0px 8px;
            font-weight: 480;
        }
        .btn{
            display: flex;
            align-items: center;
            justify-content: center;
            button{
                border-radius: 8px;
                width: 110px;
                font-size: 15px;
                font-weight: 600;
                height: 36px;
            }
            margin: 10px 0 12px 0;
        }
    }

`
export const BoxGrid2=styled.div`
    margin: 30px;
`
export const Box3=styled.div`
    height: 172px;
    .image{
            width: 80%;
            margin-top: 7px;

            height: 90%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: auto;
            img{
                width: 100%;
                height: 100%;
            }
    }
    .content{
        text-align: center;
        font-weight: 700;
                margin-top: 7px;
                font-size: 15px;
    }
`