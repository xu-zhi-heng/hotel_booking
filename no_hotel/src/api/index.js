import {get,post} from "./http";

//========================用户登陆========================
export const loginByPhone = (params) => post(`user/loginByPhone`,params)        // 通过手机登陆
export const loginByAccount = (params) => post(`user/loginByAccount`,params)    // 通过账号登陆
export const loadingInfoByPhone = (phone) => get(`user/loadingByPhone?phoneNum=${phone}`)           // 通过手机号查找信息
export const loadingInfoByAccount = (account) => get(`user/loadingByAccount?Account=${account}`)    // 通过手机号查找信息
export const update = (params) => post(`user/update`,params)  // 更新用户信息
export const insert = (params) => post(`user/insert`,params)  // 注册新用户
export const sendCode = (params) => post(`user/sendCode`,params)   // 发送验证码



//========================房间相关========================
export const getAllRoomType = () => get(`roomType/getAllRoomType`)  // 获取所有的房间类型
export const getRoomDelByType= (typeName) => get(`room/getRoomDelByType?typeName=${typeName}`)  // 通过类型名称获取该类型的所有房间
export const getRoomDelById = (id) => get(`room/getRoomDelById?id=${id}`) // 根据id查询room
export const getRoomInfoById = (id) => get(`roomInfo/getRoomInfoById?id=${id}`) //根据id查询房间具体信息
export const getRoomInfoByRoomNum = (roomNum) => get(`roomInfo/getRoomInfoByRoomNum?roomNum=${roomNum}`) // 根据房间号查询房间具体信息

// 收藏
export const collect = (params) => post(`collect/insert`,params)   // 收藏
export const deleteCollect = (params) => post(`collect/delete`,params)   // 取消收藏
export const isLike = (params) => post(`collect/isLike`,params)   // isLike
export const select = (params) => post(`collect/select`,params)   // 查询用户收藏了哪些



//========================订单相关========================
export const insertOrder = (params) => post(`order/insert`,params)
export const getAllOrderByUserId = (userId) => get(`order/getAllOrderByUserId?userId=${userId}`)


