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
                                <p>PC Gamming chiến mọi loại game</p>
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
        image:'https://product.hstatic.net/1000026716/product/titan_plus_i4090_1b77124e50cd4ec997aee054a436322a.jpg',
        Title:'PC Gamming',
        TitleDetail:'PC Gamming chiến mọi loại game',
        Content:'PC gamming cấu hình khủng cân mọi tựa game từ quốc dân đến chuyên nghiệp, sắm ngay cho mình một bộ PC như ý tại F-ShopComputer'
    },
    {
        id:2,
        image:'https://product.hstatic.net/1000026716/product/titan_plus_i4090_1b77124e50cd4ec997aee054a436322a.jpg',
        Title:'PC Gamming',
        TitleDetail:'PC Gamming chiến mọi loại game',
        Content:'PC gamming cấu hình khủng cân mọi tựa game từ quốc dân đến chuyên nghiệp, sắm ngay cho mình một bộ PC như ý tại F-ShopComputer'
    },
    {
        id:2,
        image:'https://product.hstatic.net/1000026716/product/titan_plus_i4090_1b77124e50cd4ec997aee054a436322a.jpg',
        Title:'PC Gamming',
        TitleDetail:'PC Gamming chiến mọi loại game',
        Content:'PC gamming cấu hình khủng cân mọi tựa game từ quốc dân đến chuyên nghiệp, sắm ngay cho mình một bộ PC như ý tại F-ShopComputer'
    },
    {
        id:2,
        image:'https://product.hstatic.net/1000026716/product/titan_plus_i4090_1b77124e50cd4ec997aee054a436322a.jpg',
        Title:'PC Gamming',
        TitleDetail:'PC Gamming chiến mọi loại game',
        Content:'PC gamming cấu hình khủng cân mọi tựa game từ quốc dân đến chuyên nghiệp, sắm ngay cho mình một bộ PC như ý tại F-ShopComputer'
    },
    {
        id:2,
        image:'https://product.hstatic.net/1000026716/product/titan_plus_i4090_1b77124e50cd4ec997aee054a436322a.jpg',
        Title:'PC Gamming',
        TitleDetail:'PC Gamming chiến mọi loại game',
        Content:'PC gamming cấu hình khủng cân mọi tựa game từ quốc dân đến chuyên nghiệp, sắm ngay cho mình một bộ PC như ý tại F-ShopComputer'
    },
    {
        id:2,
        image:'https://product.hstatic.net/1000026716/product/titan_plus_i4090_1b77124e50cd4ec997aee054a436322a.jpg',
        Title:'PC Gamming',
        TitleDetail:'PC Gamming chiến mọi loại game',
        Content:'PC gamming cấu hình khủng cân mọi tựa game từ quốc dân đến chuyên nghiệp, sắm ngay cho mình một bộ PC như ý tại F-ShopComputer'
    },
    {
        id:2,
        image:'https://product.hstatic.net/1000026716/product/titan_plus_i4090_1b77124e50cd4ec997aee054a436322a.jpg',
        Title:'PC Gamming',
        TitleDetail:'PC Gamming chiến mọi loại game',
        Content:'PC gamming cấu hình khủng cân mọi tựa game từ quốc dân đến chuyên nghiệp, sắm ngay cho mình một bộ PC như ý tại F-ShopComputer'
    },
    {
        id:2,
        image:'https://product.hstatic.net/1000026716/product/titan_plus_i4090_1b77124e50cd4ec997aee054a436322a.jpg',
        Title:'PC Gamming',
        TitleDetail:'PC Gamming chiến mọi loại game',
        Content:'PC gamming cấu hình khủng cân mọi tựa game từ quốc dân đến chuyên nghiệp, sắm ngay cho mình một bộ PC như ý tại F-ShopComputer'
    },
    {
        id:2,
        image:'https://product.hstatic.net/1000026716/product/titan_plus_i4090_1b77124e50cd4ec997aee054a436322a.jpg',
        Title:'PC Gamming',
        TitleDetail:'PC Gamming chiến mọi loại game',
        Content:'PC gamming cấu hình khủng cân mọi tựa game từ quốc dân đến chuyên nghiệp, sắm ngay cho mình một bộ PC như ý tại F-ShopComputer'
    },
]