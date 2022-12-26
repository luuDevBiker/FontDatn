import { NextPageWithLayout } from "@/models/common";
import { Box3, BoxGrid, BoxGrid2 } from "@/styles/GridStyled";
import { dataBlog } from "@/utils/blogdata";
import { Button, Col, Row } from "antd";



export const Grid:NextPageWithLayout=()=>{


    return (
        <div style={{marginTop:'50px'}}>
            <Row>
                <Col span={9}>
                    <BoxGrid>
                        <div className="image">
                            <img src={data[0].image}></img>
                        </div>
                        <div className="content">
                            <div className="main-title">
                                <p>Nâng mũi Lightly</p>
                            </div>
                            <div className="main-content">
                                {data[0].Content}
                            </div>
                            <div className="btn">
                                <Button type="primary">Xem thêm</Button>
                            </div>
                        </div>
                       
                    </BoxGrid>
                </Col>
                <Col span={15}>
                    <BoxGrid2>
                        <Row gutter={[20,20]}>
                            {
                                data.map((res:any)=>(
                                    <Col span={8}>
                                        <Box3>
                                            <div className="image">
                                                <img src={res.image}></img>
                                            </div>
                                            <div className="content">
                                                <p>{res.Title}</p>
                                            </div>
                                        </Box3>
                                    </Col>
                                ))
                            }
                            {/* <Col span={8}>
                                <Box3>
                                    <div className="image">
                                        <img src={data[0].image}></img>
                                    </div>
                                    <div className="content">
                                        <p>{data[0].Title}</p>
                                    </div>
                                </Box3>
                            </Col> */}
                        </Row>
                    </BoxGrid2>
                </Col>
            </Row>
        </div>
    )
}


const data=[
    {
        id:1,
        image:'https://media.suckhoe123.vn/uploads/202102/1-nang-mui-lightly-trong-moi-truong-vo-khuan-an-toan-chi-5-ngay-dep-tu-nhien-van-dep-kip-don-tet.jpg',
        Title:'Nâng mũi',
        TitleDetail:'Nâng mũi Lightly',
        Content:'Công nghệ nâng mũi hiện đại, độc quyền tại Thu Cúc giúp tái cấu trúc toàn bộ mũi thông qua kỹ thuật nâng sống mũi bằng sụn sinh học và sử dụng vách ngăn, sụn tự thân để giảm căng tức vùng đầu mũi'
    },
    {
        id:2,
        image:'https://media.suckhoe123.vn/uploads/202102/1-nang-mui-lightly-trong-moi-truong-vo-khuan-an-toan-chi-5-ngay-dep-tu-nhien-van-dep-kip-don-tet.jpg',
        Title:'Cắt mí',
        TitleDetail:'Nâng mũi Lightly',
        Content:'Công nghệ nâng mũi hiện đại, độc quyền tại Thu Cúc giúp tái cấu trúc toàn bộ mũi thông qua kỹ thuật nâng sống mũi bằng sụn sinh học và sử dụng vách ngăn, sụn tự thân để giảm căng tức vùng đầu mũi'
    },
    {
        id:2,
        image:'https://media.suckhoe123.vn/uploads/202102/1-nang-mui-lightly-trong-moi-truong-vo-khuan-an-toan-chi-5-ngay-dep-tu-nhien-van-dep-kip-don-tet.jpg',
        Title:'Cắt mí',
        TitleDetail:'Nâng mũi Lightly',
        Content:'Công nghệ nâng mũi hiện đại, độc quyền tại Thu Cúc giúp tái cấu trúc toàn bộ mũi thông qua kỹ thuật nâng sống mũi bằng sụn sinh học và sử dụng vách ngăn, sụn tự thân để giảm căng tức vùng đầu mũi'
    },
    {
        id:2,
        image:'https://media.suckhoe123.vn/uploads/202102/1-nang-mui-lightly-trong-moi-truong-vo-khuan-an-toan-chi-5-ngay-dep-tu-nhien-van-dep-kip-don-tet.jpg',
        Title:'Cắt mí',
        TitleDetail:'Nâng mũi Lightly',
        Content:'Công nghệ nâng mũi hiện đại, độc quyền tại Thu Cúc giúp tái cấu trúc toàn bộ mũi thông qua kỹ thuật nâng sống mũi bằng sụn sinh học và sử dụng vách ngăn, sụn tự thân để giảm căng tức vùng đầu mũi'
    },
    {
        id:2,
        image:'https://media.suckhoe123.vn/uploads/202102/1-nang-mui-lightly-trong-moi-truong-vo-khuan-an-toan-chi-5-ngay-dep-tu-nhien-van-dep-kip-don-tet.jpg',
        Title:'Cắt mí',
        TitleDetail:'Nâng mũi Lightly',
        Content:'Công nghệ nâng mũi hiện đại, độc quyền tại Thu Cúc giúp tái cấu trúc toàn bộ mũi thông qua kỹ thuật nâng sống mũi bằng sụn sinh học và sử dụng vách ngăn, sụn tự thân để giảm căng tức vùng đầu mũi'
    },
    {
        id:2,
        image:'https://media.suckhoe123.vn/uploads/202102/1-nang-mui-lightly-trong-moi-truong-vo-khuan-an-toan-chi-5-ngay-dep-tu-nhien-van-dep-kip-don-tet.jpg',
        Title:'Cắt mí',
        TitleDetail:'Nâng mũi Lightly',
        Content:'Công nghệ nâng mũi hiện đại, độc quyền tại Thu Cúc giúp tái cấu trúc toàn bộ mũi thông qua kỹ thuật nâng sống mũi bằng sụn sinh học và sử dụng vách ngăn, sụn tự thân để giảm căng tức vùng đầu mũi'
    },
    {
        id:2,
        image:'https://media.suckhoe123.vn/uploads/202102/1-nang-mui-lightly-trong-moi-truong-vo-khuan-an-toan-chi-5-ngay-dep-tu-nhien-van-dep-kip-don-tet.jpg',
        Title:'Cắt mí',
        TitleDetail:'Nâng mũi Lightly',
        Content:'Công nghệ nâng mũi hiện đại, độc quyền tại Thu Cúc giúp tái cấu trúc toàn bộ mũi thông qua kỹ thuật nâng sống mũi bằng sụn sinh học và sử dụng vách ngăn, sụn tự thân để giảm căng tức vùng đầu mũi'
    },
    {
        id:2,
        image:'https://media.suckhoe123.vn/uploads/202102/1-nang-mui-lightly-trong-moi-truong-vo-khuan-an-toan-chi-5-ngay-dep-tu-nhien-van-dep-kip-don-tet.jpg',
        Title:'Cắt mí',
        TitleDetail:'Nâng mũi Lightly',
        Content:'Công nghệ nâng mũi hiện đại, độc quyền tại Thu Cúc giúp tái cấu trúc toàn bộ mũi thông qua kỹ thuật nâng sống mũi bằng sụn sinh học và sử dụng vách ngăn, sụn tự thân để giảm căng tức vùng đầu mũi'
    },
    {
        id:2,
        image:'https://media.suckhoe123.vn/uploads/202102/1-nang-mui-lightly-trong-moi-truong-vo-khuan-an-toan-chi-5-ngay-dep-tu-nhien-van-dep-kip-don-tet.jpg',
        Title:'Cắt mí',
        TitleDetail:'Nâng mũi Lightly',
        Content:'Công nghệ nâng mũi hiện đại, độc quyền tại Thu Cúc giúp tái cấu trúc toàn bộ mũi thông qua kỹ thuật nâng sống mũi bằng sụn sinh học và sử dụng vách ngăn, sụn tự thân để giảm căng tức vùng đầu mũi'
    },
]