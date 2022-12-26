import { NextPageWithLayout } from "@/models/common";
import { ButtonExport, HeadingTitle, WrapperCMSProduct } from "@/styles/CmsProductStylead";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useMemo, useState } from "react";
import {Button,Image} from 'antd'
import ExportIcon from '@/assets/icon/ExportIcon.svg'

interface DataType {
    key: React.Key;
    image: string;
    product: string;
    type: string;
    brand: string;
    sales: string;
    status: string;
    import: string;
  }
export const BestSeller:NextPageWithLayout=()=>{


    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);

    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
          setSelectedRowKeys([]);
          setLoading(false);
        }, 1000);
      };
    
      const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
      };
    
      const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
      };
      const hasSelected = selectedRowKeys.length > 0;

    const columns: ColumnsType<DataType> = useMemo(()=>
    [
        {
          title: 'Ảnh',
          dataIndex: 'image',
          render:  () => <React.Fragment>
                <Image preview={false} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsyz5moQV9LR5P7gEmg51wUe2iq35A0GcbCw&usqp=CAU" alt=""  width={'35px'} height={'100%'}/>
          </React.Fragment>
        },
        {
          title: 'Sản phẩm',
          dataIndex: 'product',
        },
        {
          title: 'Loại',
          dataIndex: 'type',
        },
        {
            title: 'Nhãn hiệu',
            dataIndex: 'brand',
        },
        {
            title: 'Có thể bán',
            dataIndex: 'sales',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
        },
        {
            title: 'Ngày nhập',
            dataIndex: 'import',
        },
    ],[])

    const data: DataType[] = [];
    for (let i = 0; i < 46; i++) {
        data.push({
            key: i,
            image: `London, Park Lane no. ${i}`,
            product: `Sản phẩm` + i,
            type: `Áo`,
            brand: `Gucci`,
            sales: `London, Park Lane no. ${i}`,
            status: `Đang bán`,
            import: `20/01/2002`,
        });
    }

    return (
        <div>
            <div>
                <Table  rowSelection={rowSelection} columns={columns} dataSource={data} />                   
            </div>
        </div>
    )
}