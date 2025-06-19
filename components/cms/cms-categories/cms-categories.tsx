import React, { useEffect, useState } from "react";
import { NextPageWithLayout } from "@/models/common";
import { getCategories } from "@/features/product-slice";
import { useAppDispatch } from "@/app/hooks";
import {
  HeadingTitle,
  WrapperCMSProduct,
  WrapProduct,
} from "@/styles/CmsProductStylead";
import { Button, Tag } from "antd";
import Table from "antd/lib/table";
import { useRouter } from "next/router";
import Modal from "antd/lib/modal/Modal";
import { ICategory, CategoryTypeLabels } from "@/models/product";
import UpdateCategories from "./update-categories";

export const CmsCategories: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<any>();
  const [detail, setDetail] = useState<ICategory>({} as ICategory);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const columns = [
    {
      title: "Danh mục",
      dataIndex: "Name",
      editTable: true,
      key: "Name",
    },
    {
      title: "Loại",
      dataIndex: "Type",
      key: "Type",
      render: (value: number) => CategoryTypeLabels[value] || "Không xác định",
    },
    {
      title: "Mô tả",
      dataIndex: "Description",
      key: "Description",
    },
  ];

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    dispatch(getCategories())
      .unwrap()
      .then()
      .then((res: any) => {
        setData(res.Payload);
      });
  }, []);

  return (
    <WrapperCMSProduct>
      <HeadingTitle>
        <div>
          <h5 className="mx-2">Danh mục</h5>
          <Tag>Quản lý danh mục</Tag>
        </div>
        <div>
          <Button
            type="primary"
            size="large"
            onClick={() => router.push("/cms/cms-categories/create-categories")}
          >
            +&nbsp;&nbsp;Tạo mới danh mục
          </Button>
        </div>
      </HeadingTitle>
      <WrapProduct>
        <div>Tất cả danh mục</div>
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
          title="Chi tiết danh mục"
          visible={isModalOpen}
          onCancel={handleCancel}
          width={"90%"}
        >
          <UpdateCategories {...detail} />
        </Modal>
      </WrapProduct>
    </WrapperCMSProduct>
  );
};
