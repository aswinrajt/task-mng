import base_url from "./base_url";
import commonApi from "./commonApi";

export const registerApi=async(data)=>{
    return await commonApi(`${base_url}/reg`,'POST',"",data)
}
export const loginApi=async(data)=>{
    return await commonApi(`${base_url}/log`,'POST',"",data)
}
export const addTaskApi=async(data,header)=>{
    return await commonApi(`${base_url}/addtask`,'POST',header,data)
}
export const getTaskApi=async(header,searchKey)=>{
    return await commonApi(`${base_url}/gettask?search=${searchKey}`,'GET',header,"")
}
export const getTaskById=async(tid,header)=>{
    return await commonApi(`${base_url}/getbyid/${tid}`,'GET',header,"")
}
export const deleteTaskApi=async(id,header)=>{
    return await commonApi(`${base_url}/deletetask/${id}`,'DELETE',header,{})
}
export const editTaskApi=async(data,id,header)=>{
    return await commonApi(`${base_url}/updatetask/${id}`,'PUT',header,data)
}
