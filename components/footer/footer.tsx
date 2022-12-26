import { FooterCustom, FooterItem } from "@/styles/HomeStyled";
import { Button, Col, Input, Row, Typography } from "antd";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo_Computer from "../../assets/images/F-Computer.png";

export const Footer = () => {
  return (
    <FooterCustom>
      <div
        className="container-fluid bg-dark footer mt-5 py-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <Row gutter={[20, 20]}>
            <Col span={6}>
              {/* <h5 style={{color:'white'}}>F-Computer</h5> */}
              <img src={Logo_Computer.src} alt="logo" width={200} />
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3"></i>123 Phố Trịnh Văn
                Bô, Nam Từ Liêm, Hà Nội
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3"></i>+84 897 578 344
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3"></i>FComputer@gmail.com
              </p>
              {/* <div className="d-flex pt-3">
                                <a className="btn btn-square btn-secondary rounded-circle me-2" href=""><FontAwesomeIcon icon={faCoffee} /></a>
                                <a className="btn btn-square btn-secondary rounded-circle me-2" href=""><FontAwesomeIcon icon={faCoffee} /></a>
                                <a className="btn btn-square btn-secondary rounded-circle me-2" href=""><i className="fab fa-youtube"></i></a>
                                <a className="btn btn-square btn-secondary rounded-circle me-2" href=""><i className="fab fa-linkedin-in"></i></a>
                            </div> */}
            </Col>
            <Col span={6}>
              <Typography.Title level={3} style={{ color: "white" }}>
                Xem nhanh
              </Typography.Title>

              <p style={{ color: "white" }}>Về chúng tôi</p>
              <p style={{ color: "white" }}>Liên hệ</p>
              <p style={{ color: "white" }}>Dịch vụ</p>
              <p style={{ color: "white" }}>Điều khoản</p>
              <p style={{ color: "white" }}>Hỗ trợ</p>
            </Col>
            <Col span={6} style={{ color: "white" }}>
              <Typography.Title level={3} style={{ color: "white" }}>
                Giờ làm việc
              </Typography.Title>
              <p className="mb-1">Cả tuần</p>
              <h6 className="text-light" style={{ color: "white" }}>
                09:00 am - 10:00 pm
              </h6>
              <p className="mb-1">Thứ 7</p>
              <h6 className="text-light" style={{ color: "white" }}>
                09:00 am - 12:00 pm
              </h6>
              <p className="mb-1">Chủ nhật</p>
              <h6 className="text-light" style={{ color: "white" }}>
                09:00 am - 11:00 pm
              </h6>
            </Col>
            <Col span={6} style={{ color: "white" }}>
              <Typography.Title level={3} style={{ color: "white" }}>
                Góp ý
              </Typography.Title>
              <p>Quý khách cần thư vấn.</p>
              <FooterItem>
                <Input
                  className="form-control bg-transparent w-100 py-3 ps-4 pe-5"
                  type="text"
                  placeholder="Your email"
                />
                <Button>Gửi</Button>
              </FooterItem>
            </Col>
          </Row>
        </div>
      </div>
    </FooterCustom>
  );
};
