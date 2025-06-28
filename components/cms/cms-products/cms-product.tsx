import { NextPageWithLayout } from "@/models/common";
import {
  HeadingTitle,
  WrapperCMSProduct,
  WrapProduct,
} from "@/styles/CmsProductStylead";
import Table from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { Button, Tag } from "antd";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getListProduct, selectProduct } from "@/features/product-slice";
import Modal from "antd/lib/modal/Modal";
import EditProduct from "./cms-products-modals/edit-product";
import { IProduct } from "@/models/product";

export const CmsProduct: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(selectProduct);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detail, setDetail] = useState<IProduct>({} as IProduct);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
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
      key: "Name",
    },
    {
      title: "Hãng",
      dataIndex: "Brand",
      key: "Brand",
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "Category",
      key: "Category",
    },
    {
      title: "Mô tả",
      dataIndex: "Description",
      key: "Description",
    },
  ];

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getListProduct());
    }
  }, [dispatch, products]);
  return (
    <WrapperCMSProduct>
      <HeadingTitle>
        <div>
          <h5 className="mx-2 title-element-1 title-element-3">Sản phẩm</h5>
          <Tag className="mx-2 title-element-1 title-element-3">
            Quản lý sản phẩm
          </Tag>
        </div>
        <div>
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
            rowKey={(record: any) => record.Id}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={products}
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
          visible={isModalOpen}
          onCancel={handleCancel}
          width={"90%"}
        >
          <EditProduct {...detail} />
        </Modal>
      </WrapProduct>
    </WrapperCMSProduct>
  );
};
