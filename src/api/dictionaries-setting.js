import request from 'utils/request'
// 添加字典
export const insertOrUpdateDic = data => request.post('/Home/InsertOrUpdateDic', data)
// 字典删除
export const deleteDic = data => request.post('/Home/DeleteDic', data)
// 品牌 品类 来源 列表查询
export const getDic = data => request.post('/Home/GetDic', data)
// 添加产品
export const insertOrUpdateProduct = data => request.post('/Home/InsertOrUpdateProduct', data)
// 产品删除
export const deleteProduct = data => request.post('/Home/DeleteProduct', data)
// 产品列表查询
export const getProduct = data => request.get('/Home/GetProduct', data)
