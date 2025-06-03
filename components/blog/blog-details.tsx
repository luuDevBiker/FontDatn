import { NextPageWithLayout } from "@/models/common";
import { dataBlog } from "@/utils/blogdata";



export const BlogDetail:NextPageWithLayout=()=>{


    return (
        <div>
            {
                dataBlog.map((data: any, index: number) => {
                    return (
                        <div key={index}>
                            <div>{data.Title}</div>
                            <div>{data.DecriptionTitle}</div>
                
                            {data.Context.map((x: any, subIndex: number) => {
                                return (
                                    <div key={subIndex}>
                                        <div>{x.Ul}</div>
                                        <div>{x.ContextUl}</div>
                
                                        {x.ContextLi.map((li: any, liIndex: number) => {
                                            return (
                                                <div key={liIndex}>
                                                    <div>{li.content}</div>
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