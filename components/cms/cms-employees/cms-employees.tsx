import { NextPageWithLayout } from "@/models/common";
import { ButtonExport, HeadingTitle, WrapperCMSProduct, WrapProduct } from "@/styles/CmsProductStylead";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useMemo, useState } from "react";
import {Button,Image, Space} from 'antd'
import ExportIcon from '@/assets/icon/ExportIcon.svg'
import { useRouter } from "next/router";
import { EditOutlined } from "@ant-design/icons";
import { LockCustom, UnLockCustom } from "@/styles/EmployeesStyled";

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
export const CmsEmployees:NextPageWithLayout=()=>{
    const router = useRouter();
    const [check,setCheck]=useState<boolean>(false)
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
            dataIndex: 'stt',
            title: 'STT',
            align:"center",
            width:60,
            render: (text, object, index) =>  index + 1
        },    
        {
          title: 'Tên nhân viên',
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
            dataIndex: 'action',
            width:160,
            align:'center',
            title: 'Hành động',
            render: function renderColumn(text: string, record: any) {
              return (
                <div>
                  <Space size={10}>
                    <EditOutlined className='icon-action'
                                               
                    />
                    {check?
                      <UnLockCustom  className='icon-action' />:
                      <LockCustom className='icon-action'/>
                    }                
                  </Space>
                </div>
              );
            },
          },
    ],[])

    const data: DataType[] = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            image: `London, Park Lane no. ${i}`,
            product: `Nhân viên` + i,
            type: `Áo`,
            brand: `Gucci`,
            sales: `London, Park Lane no. ${i}`,
            status: `Đang bán`,
            import: `20/01/2002`,
        });
    }

    return (
            <WrapperCMSProduct>
                <HeadingTitle>
                    <h5>Sản phẩm</h5>
                    
                    <div>

                        {/* <ButtonExport type="default">
                            <img src={ExportIcon.src} alt="" />
                            <div>Export</div>              
                        </ButtonExport> */}
                        <Button  type='primary' size='large' onClick={()=>router.push('/cms/cms-employees/employees')}>+&nbsp;&nbsp;Thêm nhân viên</Button>
                    </div>
                </HeadingTitle>
                <div>Tất cả sản phẩm</div>
                <div>
                    <WrapProduct>
                      <Table  columns={columns} dataSource={data} />
                    </WrapProduct>
                    
                </div>
            </WrapperCMSProduct>
    )
}