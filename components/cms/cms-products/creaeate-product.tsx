import { NextPageWithLayout } from "@/models/common";
import { BoxMedia, OptionWrapp, WrapperCMSProduct, WrapperOptions, WrapProduct } from "@/styles/CmsProductStylead";
import { Button, Checkbox, Form, Input, message,Row ,Col,Select, Table, Space, Tag, InputNumber, Typography, Popconfirm} from 'antd';
import React, { useEffect, useState } from "react";
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { DeleteOutlined, EditOutlined, FundFilled, PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from 'antd';
import { AnyARecord } from "dns";
import { Color, OptionProduct } from "@/utils/common";
const { TextArea } = Input;
const { Option } = Select;
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
// import QRCode from "react-qr-code";
import type { ColumnsType } from 'antd/es/table';
import moment from "moment";
import Barcodes from "./generate-barcode";
import { useAppDispatch } from "@/app/hooks";
import { addNewProduct } from "@/features/product-slice";
import { IAddProduct, IVariant } from "@/models/product";
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});


const options = [{ value: 'gold' }, { value: 'lime' }, { value: 'green' }, { value: 'cyan' }];

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={'red'}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

interface Item {
    key: string;
    name: string;
    age: number;
    address: string;
    Barcode:string;
    sku:string;
    prices:number;
    quantity:number;
  }

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
    children: React.ReactNode;
}


const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

export const CreateProduct:NextPageWithLayout=()=>{
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [optionProduct,setOptionProduct]=useState<any>()
    const [dataProduct,setDataProduct]=useState<any>()
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-3',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }
    ]);
    const [checkedOtion,setCheckedOption]=useState<Boolean>()
    const handleCancel = () => setPreviewOpen(false);
    const [index,setIndex]=useState<number>(0)
    const [valueName,setValueName]=useState<any>()
    const [inputList, setInputList] = useState([{ optionValue: ""}]);
    const [saveOption,setSaveOption]=useState<any>()
    const {getFieldValue,setFieldValue}=form
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record: Item) => record.key === editingKey;
    const [data, setData] = useState<any>([]);
    const [skuname,setSkuName]=useState<string>('')
    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ name: '', sku: '', quantity: '', ...record });
        setEditingKey(record.key);
    };
    const [generateCode,setGenerateCode]=useState<string>('')
    const cancel = () => {
        setEditingKey('');
    };
    const dispatch=useAppDispatch();

    const save = async (key: React.Key) => {
        try {
          const row = (await form.validateFields()) as Item;
    
          const newData = [...data];
          const index = newData.findIndex(item => key === item.key);
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
              ...item,
              ...row,
            });
            setData(newData);
            setEditingKey('');
          } else {
            newData.push(row);
            setData(newData);
            setEditingKey('');
          }
        } catch (errInfo) {
        }
    };

    const onCheckboxChange=(e:any)=>{
        setCheckedOption(e.target.checked)
    }
    const handleInputChange = (e:any, index:number) => {
        const { name, value } = e.target;
        const list:any= [...inputList];
        list[index][name] = value;
        setInputList(list);
    };
   //#region  Columes Table
    const columns= [
        {
            dataIndex: 'stt',
            title: 'STT',
            align:"center",
            width:60,
            render: (text:any, object:any, index:number) =>  index + 1
        },    
        {
        title: 'Name',
        dataIndex: 'productVariantName',
        render: (text:any, object:any, index:number) =>  (
            text.includes(",")?text:text.toString().replaceAll(',',' / ')
        )
        },
        {
        title: 'Số lương',
        dataIndex: 'quantity',
        render:(text:any, object:any, index:number)=>(
            <Input type="Number" value={object?.quantity}></Input>
        )
        },
        {
        title: 'Giá tiền',
        dataIndex: 'prices',
        editable: true,
        render:(text:any, object:any, index:number)=>(
            <Input type="Number" value={object?.prices}></Input>
        )
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            editable: true,
            // render:(record:any)=>(
            // <Input value={record?.sku}></Input>
            // )
        },
        {
            title: 'Barcode',
            dataIndex: 'Barcode',
            editable: true,
            render:(text:any, object:any, index:number)=>(
                <Barcodes value={object?.sku} color='White' size={'1'}/>
            )
        },
        {
            dataIndex: 'action',
            width:88,
            align:'center' as 'center',
            title: 'Hành động',
            render: (text:any, object:any, index:number) => {
                // const editable = isEditing(record);
                // return editable ? (
                //   <span>
                //     <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                //       Save
                //     </Typography.Link>
                //     <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                //       <a>Cancel</a>
                //     </Popconfirm>
                //   </span>
                // ) : (
                //   <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                //     Edit
                //   </Typography.Link>
                // );
                return(
                    <DeleteOutlined onClick={()=>{handleRemoveOptionsValue(index)}} style={{cursor:'pointer'}}/>
                )
            },
        },
    ];
   //#endregion

    const  rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
        },
        getCheckboxProps: (record: any) => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
          sku:record?.sku,
          quantity:record?.quantity,
          Barcode:record?.Barcode,
        //   sku:record?.sku,
        //   sku:record?.sku,
        }),
        
    };

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: (record: Item) => ({
            record,
            inputType: col.dataIndex === 'age' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }),
        };
      });

    //#region handlePreview Image
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj as RcFile);
        }
    
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };
    //#endregion
  
    const handleRemoveClick = (index:number) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };
    const handleRemoveOptions = (index:number) => {
        const list = [...optionProduct];
        list.splice(index, 1);
        setOptionProduct(list);
    };

   

    const handleAddClick = () => {
        setInputList([...inputList, { optionValue: ""}]);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
      setFileList(newFileList);

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    
    const addNewOptions=()=>{
        getFieldValue('OptionName')
        setSaveOption([...inputList])
        let arr:any=[{Name:getFieldValue('OptionName'),inputList}]
        if(optionProduct){
            setOptionProduct([...optionProduct,...arr])
        }else{
            setOptionProduct([...arr])
        }
        setInputList([{optionValue:''}])
        setFieldValue('OptionName','')
    }

    const string2=moment().format('DD/MM/YY');
    const generateDay=string2.split('/',3)
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    function generateString(length:number) {
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        setGenerateCode(result.toUpperCase())
    }
   //#region Data Dynamic Product
    useEffect(()=>{
        if(optionProduct!==undefined){
            let attrs = optionProduct?.map((o:any) => {
                return o.inputList?.map((i:any) => ({ [o.Name]: i["optionValue"] }));
            });
    
            attrs = attrs?.reduce((a:any, b:any) => {
                return a?.flatMap((d:any) => {
                return b?.map((e:any) => ({ ...d, ...e }));
                });
            });
            const outputs = attrs?.reduce((pre:any, cur:any) => {
                return [
                ...pre,
                { option: Object.keys(cur).map((key) => ({ [key]: cur[key] })) },
                ];
            }, []);
    
            const outputs2 = attrs?.reduce((pre:any, cur:any) => {
                return [
                ...pre,
                { 
                    option: Object.keys(cur).map((key) => ({ 
                        "optionsName":key,
                        "optionValue":cur[key]
                    })) ,
                },
                ];
            }, []);
            const newOut= attrs?.reduce((pre:any, cur:any) => {
                return [
                ...pre,
                { option: Object.keys(cur).map((key) => ( cur[key] )) },
                ];
            }, []);
    
    
            const newOut23= attrs?.reduce((pre:any, cur:any) => {
                return [
                ...pre,
                { 
                    option: Object.keys(cur).map((key) => ({ 
                        "optionsName":key,
                        "optionValue":cur[key]
                    })) ,
                    productVariantName: Object.keys(cur).map((key) => ( cur[key]+'' )).toString(),
                    // sku: Object.keys(cur).map((key) => ('PW-'+ String(cur[key]).toUpperCase().replaceAll(',','-')).slice(0,15)+'-'+generateDay?.toString().replaceAll(',','')),
                    quantity:0,
                    price:0,
                    
                },
                ];
            }, []);
            setDataProduct(newOut23)
        }
    },[optionProduct])

        //#endregion

    const handleOnchangeInputName=(values:any)=>{
        generateString(3)
        setSkuName('PW-'+removeVietnameseTones(values.target.value.slice(0,3).toUpperCase())+generateDay.toString().replaceAll(',',''))
        setFieldValue('sku','PW-'+removeVietnameseTones(values.target.value.slice(0,3).toUpperCase())+generateDay.toString().replaceAll(',','')+'-'+generateCode.toUpperCase())
    }

   //#region Chuyển tiếng việt qua tiếng anh 
    function removeVietnameseTones(str:string) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
        str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
        str = str.replace(/đ/g,"d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        str = str.replace(/ + /g," ");
        str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
        return str;
    }
   //#endregion
 
   const handleRemoveOptionsValue = (index:number) => {

    const list = [...dataProduct];
    list.splice(index, 1);
};  

    const handleOnsubmit=(record:any)=>{

        const payload={
            ...record,
            varian:[...dataProduct]
        }
        dispatch(addNewProduct(payload)).unwrap().then().then((res:any)=>{
        })
    }

    return(
        <WrapperCMSProduct>           
            <Form
                    name='basic'  
                    layout='vertical'  
                    form={form}
                    onFinish={handleOnsubmit}
            >
                <Row gutter={[15,15]}>
                    <Col xs={24} sm={17} md={17}  xxl={17} xl={17}>
                        <WrapProduct>
                            <Form.Item
                                label='Tên sản phẩm'
                                required
                                name={'productName'}
                                rules={[
                                    {
                                        required:true,
                                        message:'Tên sản phẩm không được để trống!'
                                    }
                                ]}
                            >
                                <Input placeholder="Tên sản phẩm" onChange={handleOnchangeInputName}></Input>
                            </Form.Item>
                            <Form.Item
                                label='Mô tả'
                                // required
                                name={'decription'}
                            >
                                <TextArea placeholder="Mô tả"></TextArea>
                            </Form.Item>
                        </WrapProduct>
                        <WrapProduct>
                            <div className="title">Media</div>
                            <BoxMedia>
                            <Upload
                                action="https://thumbsnap.com/api/upload"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                className="upload-list-inline"
                                name="file"
                                multiple
                                // headers={
                                //     {
                                //         // "Content-Type":'multipart/form-data',
                                //         "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IlVzZXItNTI3ZTdkZDktNjNhNi00ZmU2LThhOTItMGI1NjU1MDY5ZWJkIiwiZW1haWwiOiJrYXVkaWJldWxvcHBvaS0yNTQzQHlvcG1haWwuY29tIiwibmFtZWlkIjoiNTI3ZTdkZDktNjNhNi00ZmU2LThhOTItMGI1NjU1MDY5ZWJkIiwiYWN0aXZlLXByb2ZpbGUtaWQiOiJiNDQzNDU5YS1lYzJkLTQxMzktYTgzZi1mMWU4ZGI0YzU0ZDYiLCJhY2Nlc3Mtc3lzdGVtIjoiTWVyZ2lzZXJ2aWNlIiwic2NvcGUiOlsiTm90aWZpY2F0aW9uLkZ1bGxBY2Nlc3MiLCJDb25maWd1cmF0aW9uLkZ1bGxBY2Nlc3MiLCJMb2NhbGl6YXRpb24uRnVsbEFjY2VzcyIsIlVzZXJQcm9maWxlLkZ1bGxBY2Nlc3MiLCJLcGkuRnVsbEFjY2VzcyIsIlBoYXNlS3BpLkZ1bGxBY2Nlc3MiLCJQaGFzZS5GdWxsQWNjZXNzIiwiUmF0ZUtwaS5GdWxsQWNjZXNzIiwiRGVwYXJ0bWVudC5GdWxsQWNjZXNzIiwiVGVuYW50LkZ1bGxBY2Nlc3MiLCJQZXJtaXNzaW9uLkZ1bGxBY2Nlc3MiLCJSb2xlLlZpZXciLCJSb2xlLkNyZWF0ZSIsIlJvbGUuVXBkYXRlIiwiUm9sZS5SZWNvdmVyIiwiVXNlci5GdWxsQWNjZXNzIiwiU3RyYXRlcnlNYXAuRnVsbEFjY2VzcyIsIlJvYWRNYXBLcGkuRnVsbEFjY2VzcyIsIlJvYWRNYXAuRnVsbEFjY2VzcyJdLCJuYmYiOjE2NjY4NTk4MDQsImV4cCI6MTY2Njk0NjIwNCwiaWF0IjoxNjY2ODU5ODA0LCJpc3MiOiJodHRwczovL21lZ2lzZXJ2aWNlcy5jb20iLCJhdWQiOiJodHRwczovL21lZ2lzZXJ2aWNlcy5jb20ifQ.xAG9vBcxQof4zSqKeFFN4-SOE7_tq_W5qQfCxDkK1Qc` ,               
                                //     }
                                // }
                            >
                                {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                            </BoxMedia>
                        </WrapProduct>
                        
                        <WrapProduct>
                            <div className="title">Nhập kho</div>
                           <Row gutter={[30,0]}>
                                <Col span={12}>
                                    <Form.Item
                                        label='SKU'
                                        name={'sku'}
                                        initialValue={skuname}
                                        
                                    >   
                                        <Input placeholder="SKU" value={skuname}></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label='Barcode'
                                        name='barcode'
                                    >
                                        <Input placeholder="Barcode"></Input>
                                        {/* <Barcodes value={skuname} color='White' size={'1'}/>     */}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        label='Số lượng'
                                        name='quantity'
                                        required
                                        rules={[
                                            {
                                                required:true,
                                                message:'Số lượng sản phẩm không được để trống!!'
                                            }
                                        ]}
                                    >
                                        <Input type='number' min={0} placeholder="Số lượng"></Input>
                                    </Form.Item>
                                </Col>
                           </Row>
                        </WrapProduct>
                        <WrapProduct>
                            <div className="title">Thêm thuộc tính</div>
                            
                            <Checkbox onChange={onCheckboxChange}>Sản phẩm có các thuộc tính khác (Trọng lượng,Màu sắc,..)</Checkbox>
                            {checkedOtion?                
                                <WrapperOptions>
                                    <OptionWrapp>
                                        <div className="border">
                                            <Form.Item
                                                        label='Options Name'
                                                        required
                                                        name={'OptionName'}
                                                        rules={[
                                                            {
                                                                required:true,
                                                                message:'Tên thuộc tính không được để trống!!'
                                                            }
                                                        ]}
                                            >
                                                <Input  placeholder="Options name"></Input>
                                            </Form.Item>
                                        </div>
                                        <DeleteOutlined />
                                    </OptionWrapp>    
                                    <Form.Item
                                                name={'OPTIONVALUE'}
                                                label='Option Value'
                                                // required
                                                // rules={[
                                                //     {
                                                //         required:true,
                                                //         message:'Giá trị thuộc tính không được để trống!!!'
                                                //     }
                                                // ]}
                                    >
                                        {inputList.map((x, i) => {
                                            return( 
                                                <OptionWrapp>
                                                    <div className="border" style={{marginBottom:'3px'}}>                                  
                                                        <Input
                                                                name={`optionValue`} 
                                                                onChange={e => handleInputChange(e, i)} 
                                                                placeholder="Options Value"
                                                                value={x.optionValue}
                                                                // onPressEnter={handleAddClick}
                                                        >
                                                        </Input>                                
                                                    </div>
                                                    <div className="btn-box">
                                                        {inputList.length !== 1 && <DeleteOutlined  onClick={() => handleRemoveClick(i)}/>}
                                                        {inputList.length - 1 === i && <PlusOutlined style={{marginLeft:'6px'}} onClick={handleAddClick}/>}
                                                    </div>                                   
                                                </OptionWrapp>                        
                                            )
                                        })}    
                                    </Form.Item>                                                        
                                    <Button onClick={addNewOptions}>Thêm mới</Button>     
                                        {optionProduct&&optionProduct.map((x:any, i:number) => {
                                            return(
                                                <OptionWrapp>
                                                    <div>{x?.Name}:
                                                        <div>
                                                            {x?.inputList?.map((c:any,i:number)=>{
                                                                    return(                                                         
                                                                        <Tag color={Color[i].name}>{c?.optionValue}</Tag>                            
                                                                    )
                                                            })}  
                                                        </div> 
                                                    </div>
                                                    <div>
                                                    <EditOutlined />
                                                    {<DeleteOutlined style={{paddingLeft:'15px'}} onClick={() => handleRemoveOptions(i)}/>}
                                                    </div>
                                                </OptionWrapp>   
                                            )
                                        })}                         
                                </WrapperOptions>:null
                            }
                            <div className="addnew" onClick={()=>{
                                setIndex(index+1)
                            }}>+ Thêm mới thuộc tính khác </div>
                        </WrapProduct>
                        <WrapProduct>
                        <div className="title">Product varian</div>
                        <div>
                        <Row gutter={[15,15]}>
                            {optionProduct&&optionProduct.map((dataa:any)=>{
                               return(
                                <Col span={8}>
                                    <Select
                                        // labelInValue
                                        size='large'
                                        placeholder={dataa.Name}
                                        className='ipDashboard'
                                        // value={department || []}
                                        tagRender={tagRender}
                                        mode='multiple'
                                        showArrow
                                        // onChange={onChangeInput}
                                        optionLabelProp="label"
                                        style={{width:'100%'}}
                                    >
                                        {dataa.inputList.map((data:any)=>{
                                            return(
                                                <Option key={data.optionValue} label={data.optionValue} value={data.optionValue}>
                                                    <p className="displayName">{data.optionValue}</p>  
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                </Col>
                               ) 
                            })} 
                            <Col span={8}>

                            </Col>
                        </Row>
                        </div>
                        <Table  rowSelection={{
                                    type: 'checkbox',
                                    ...rowSelection,
                                }} columns={columns} dataSource={dataProduct} size="middle" 
                                    rowKey={(record:any)=>record?.name}
                                />

                                {/* <Form form={form} component={false}>
                                    <Table
                                        components={{
                                        body: {
                                            cell: EditableCell,
                                        },
                                        }}
                                        bordered
                                        dataSource={newOut23}
                                        columns={mergedColumns}
                                        rowClassName="editable-row"
                                        pagination={{
                                        onChange: cancel,
                                        }}
                                        rowKey={(record:any)=>record?.name}
                                        rowSelection={{
                                            type: 'checkbox',
                                            ...rowSelection,
                                        }}
                                    />
    </Form> */}
                        </WrapProduct>
                    </Col>
                    <Col span={7}>
                        <WrapProduct>
                                <div className="title">Giá</div>
                                <Form.Item 
                                    label='Giá nhập'
                                    required
                                    name={'importPrice'}
                                    rules={[
                                        {
                                            required:true,
                                            message:'Giá nhập không được để trống'
                                        }
                                    ]}
                                >
                                    <Input placeholder="Giá nhập"></Input>
                                </Form.Item>
                                <Form.Item 
                                    label='Giá bán'
                                    required
                                    name={'exportPrice'}
                                    rules={[
                                        {
                                            required:true,
                                            message:'Giá bán không được để trống'
                                        }
                                    ]}
                                >
                                    <Input placeholder="Giá bán"></Input>
                                </Form.Item>
                            </WrapProduct>
                        <WrapProduct>
                            
                            <div className="title">Tổ chức sản phẩm</div>
                            <Form.Item
                                label='Danh mục sản phẩm'
                                name={'category'}
                            >
                                <Select>
                                    <Option value="Thức ăn">Thức ăn</Option>
                                    <Option value="Đồ chơi">Đồ chơi</Option>
                                    <Option value="Quần">Quần</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label='Người nhập'
                                name='user'
                            >
                                <Select>
                                    <Option value="Thức ăn">Thức ăn</Option>
                                    <Option value="Đồ chơi">Đồ chơi</Option>
                                    <Option value="Quần">Quần</Option>
                                </Select>
                            </Form.Item>
                        </WrapProduct>
                    </Col>
                </Row>
                <Button htmlType="submit">Lưu</Button>
            </Form>
            
        </WrapperCMSProduct>
    )
}