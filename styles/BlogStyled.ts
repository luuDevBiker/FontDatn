import styled from "styled-components";


export const WrapperBlog=styled.div`
    /* margin: 30px 0 30px 0; */
    margin-top: 30px;
`
export const WrapperHeader=styled.div`
    width: 100%;
    height: 200px;
    border-radius:20px;
    background-color: antiquewhite;
    margin-top: 40px;
`

export const Container=styled.div`
    margin-top: 40px;
`

export const BoxBlog=styled.div`
    width: 100%;
    height: 360px;
    /* background-color: beige; */
    /* font-family: 'Quicksand', sans-serif; */
    position: relative;
    :hover{
            animation-duration: 2;
            transition: all opacity .5s, margin-top .5s, margin-bottom .5s;
            -webkit-transition: opacity .5s, margin-top .5s, margin-bottom .5s;
            transform: translateY(-8px);
        }
    .blogImage{
        width: 100%;
        height: 64%;
        /* background-color: antiquewhite; */
        /* background-image: url(https://cdn.shopify.com/s/files/1/0652/4570/8532/articles/blog-8.jpg?v=1658225448&width=832); */
        border-radius: 10px;
        margin-bottom: 15px;
        img{
            width: 100%;
            border-radius: 10px;
            object-fit: cover;
        }
        
    }
    .blogContent{
        font-weight: 600;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: auto;
        .user{
            opacity: 0.6;
        }
        .spans{
            width: 80%;
            margin-bottom: 0px;
        }
    }
    div{
        text-align: center;
    }
    span{
        font-size: 22px;
        color: #253d4e;
        /* width: 120px; */
        font-weight: 600;
        :hover{
            color: rgb(59, 183, 126);
        }
    }
`