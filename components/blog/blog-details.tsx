import { NextPageWithLayout } from "@/models/common";
import { dataBlog } from "@/utils/blogdata";



export const BlogDetail:NextPageWithLayout=()=>{


    return (
        <div>
            {
                dataBlog.map((data:any,index:number)=>{
                    return(
                        <div>
                            <div>{data.Title}</div>
                            <div>{data.DecriptionTitle}</div>
                            {data.Context.map((x:any)=>{
                                return(
                                    <div>
                                        <div>{x.Ul}</div>
                                     <div>{x.ContextUl}</div>
                                     {x.ContextLi.map((x:any)=>{
                                            return(
                                                <div>
                                                    {/* <div>{x.Ul}</div> */}
                                                <div>{x.content}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                            <div>{data.Title}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}