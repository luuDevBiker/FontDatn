import { BoxBlog, Container, WrapperBlog, WrapperHeader } from "@/styles/BlogStyled"
import { Col, Row, Image, Tooltip } from "antd"
import { useRouter } from "next/router"


export const Blog = () => {
    const router = useRouter()
    return (
        <WrapperBlog>
            <WrapperHeader>
            </WrapperHeader>
            <Container>
                <Row gutter={[20, 20]}>
                    <Col span={18}>
                        <Row gutter={[30, 30]}>
                            <Col span={8}>
                                <BoxBlog>
                                    <div className="blogImage">
                                        <Image src="https://cdn.shopify.com/s/files/1/0652/4570/8532/articles/blog-8.jpg?v=1658225448&width=832" alt="" />
                                    </div>
                                    <div className="blogContent">
                                        <div className="spans">
                                            <span onClick={() => router.push('/blog/blog-details/{1}')}>Cách phòng bệnh cho cún cưng khitới</span>
                                        </div>
                                        <div className="user">
                                            <div>
                                                21/10/2022
                                            </div>
                                            <div>
                                                Hoàng Chung
                                            </div>
                                        </div>
                                    </div>
                                </BoxBlog>
                            </Col>
                            <Col span={8}>
                                <BoxBlog>
                                    <div className="blogImage">
                                        <Image src="https://cdn.shopify.com/s/files/1/0652/4570/8532/articles/blog-8.jpg?v=1658225448&width=832" alt="" />
                                    </div>
                                    <div className="blogContent">
                                        <Tooltip placement="topLeft" title="Prompt Text" arrowPointAtCenter>
                                            <span>Cách phòng bệnh đông đông đông đông đông đông đông đông đông</span>
                                        </Tooltip>
                                        <div className="user">
                                            <div>
                                                21/10/2022
                                            </div>
                                            <div>
                                                Hoàng Chung
                                            </div>
                                        </div>
                                    </div>
                                </BoxBlog>
                            </Col>
                            <Col span={8}>
                                <BoxBlog>
                                    <div className="blogImage">
                                        <Image src="https://cdn.shopify.com/s/files/1/0652/4570/8532/articles/blog-8.jpg?v=1658225448&width=832" alt="" />
                                    </div>
                                    <div className="blogContent">
                                        <span>Cách phòng bệnh</span>
                                        <div className="user">
                                            <div>
                                                21/10/2022
                                            </div>
                                            <div>
                                                Hoàng Chung
                                            </div>
                                        </div>
                                    </div>
                                </BoxBlog>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <BoxBlog>

                        </BoxBlog>
                    </Col>
                </Row>
            </Container>

        </WrapperBlog>
    )
}