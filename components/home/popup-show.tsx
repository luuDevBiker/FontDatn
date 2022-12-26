import { ModalCutom, Wrapper } from "../../styles/HomeStyled"




export interface IPropsQuickShow{
    Name:string,
    Price:string,
    Decription:string,
    Tag:string,
    changeActive: any,
    handleAction:any
}

export const QuickShow=(props:IPropsQuickShow)=>{
    const {Decription,Name,Price,Tag,changeActive,handleAction}=props
    const handleClose = () => changeActive(false);
    return(
        <ModalCutom
            onCancel={handleClose}
            onOk={handleAction}
        >
            <Wrapper>

            </Wrapper>
        </ModalCutom>
    )
}