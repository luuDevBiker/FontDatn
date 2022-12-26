import styled from "styled-components";

export const SliderLandingPage=styled.div`
    margin-top: 45px;
`

export const BoxLandingPage=styled.div`
    .image_bg{
        
    }
`
export const BackgroundCarousel=styled.div`
    position: relative;
    height: 650px;
    width: 100%;
    transform-origin: 0px 0px;
    /* transform: scale(0.46875); */
    background: url(https://cdn.shopify.com/s/files/1/1215/2782/files/leo_ziggypet_sllide1-h1.png?v=1654160259)  0% 0% / 100% no-repeat;
`
export const BackgroundCarousel2=styled.div`
    position: relative;
    height: 650px;
    width: 100px;
    transform-origin: 0px 0px;
    /* transform: scale(0.46875); */
    background: url(https://cdn.shopify.com/s/files/1/1215/2782/files/leo_ziggypet_sllide2-h1.png) 0% 0% / 100% no-repeat;
`

export const WrapperBox=styled.div`
    height: 80%;
    margin: 0 120px 0 120px;
`

export const WrapperDeal=styled.div`
    font-family: Quicksand, sans-serif;
    /* background: url(https://img.freepik.com/free-photo/adorable-kittens-with-fuzzy-hair-sitting-white-surface-with-two-guinea-pigs_181624-43705.jpg?size=626&ext=jpg&ga=GA1.2.2093328414.1666320185) 0% 0% / 100% no-repeat; */
    height: 420px;
    .deal{
        color: red;
        font-size: 26px;
        margin-top:10px;
        font-weight: 700;
    }
    .title{
        font-size: 45px;
        transition-duration: .2s;
        font-weight: 700;
    }
    .all{
        font-size: 25px;
        transition-duration: .2s;
        font-weight: 700;
        margin-bottom: 20px;
        opacity: 0.6;
    }
    /* display: flex; */
    text-align: center;
`

export const WrapperNewProduct=styled.div`
    margin-top: 24px;
    border: 2px solid #45ab49;
    border-style: solid;
    padding: 20px;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    flex-shrink: 0;
    .left-product{
        position: relative;
        -webkit-box-flex: 0;
        -webkit-flex: 0 0 45%;
        flex: 0 0 45%;
        background-color: #45ab49;
        width: 100%;
        height: auto;
        img{
            vertical-align: middle;
            width: 100%;
        }
    }
    .right-product{
        flex: 1;
        padding-left: 20px;
        width: 100%;
        height: auto;
        /* background-color: red; */
        .reviews{

        }
    }
`