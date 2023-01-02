import { NextPageWithLayout } from "@/models/common";
import {
  ButtonExport,
  HeadingTitle,
  WrapperCMSProduct,
  WrapProduct,
} from "@/styles/CmsProductStylead";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Image } from "antd";
import ExportIcon from "@/assets/icon/ExportIcon.svg";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/app/hooks";
import { getListProduct } from "@/features/product-slice";
import moment from "moment";
import Modal from "antd/lib/modal/Modal";
import EditProduct from "./cms-products-modals/edit-product";
import { IProduct } from "@/models/product";

export const CmsProduct: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detail, setDetail] = useState<IProduct>({} as IProduct);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log(newSelectedRowKeys);

    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "Name",
      editTable: true,
      key:"Name"
    },
    {
      title: "Hãng",
      dataIndex: "Brand",
      key:"Brand"
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "Category",
      key:"Category"
    },
    {
      title: "Mô tả",
      dataIndex: "Description",
      key:"Description"
    },
  ];

  useEffect(() => {
    dispatch(getListProduct())
      .unwrap()
      .then()
      .then((res: any) => {
        setData(res.Payload);
      });
  }, []);

  return (
    <WrapperCMSProduct>
      <HeadingTitle>
        <h5>Sản phẩm</h5>

        <div>
          <ButtonExport type="default">
            <img src={ExportIcon.src} alt="" />
            <div>Export</div>
          </ButtonExport>
          <Button
            type="primary"
            size="large"
            onClick={() => router.push("/cms/cms-products/new-products")}
          >
            +&nbsp;&nbsp;Tạo sản phẩm
          </Button>
        </div>
      </HeadingTitle>
      <WrapProduct>
        <div>Tất cả sản phẩm hiện có</div>
        <div>
          <Table
            rowKey={(record) => record.Id}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            onRow={(r) => ({
              onClick: () => {
                setIsModalOpen(true);
                setDetail(r);
              },
            })}
          />
        </div>
        <Modal
          title="Chi tiết sản phẩm"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={"90%"}
        >
          <EditProduct {...detail}/>
        </Modal>
      </WrapProduct>
    </WrapperCMSProduct>
  );
};
