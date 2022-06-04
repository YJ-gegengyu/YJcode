import request from 'utils/request'
// 添加字典
export const insertOrUpdateDic = data => request.post('/Home/InsertOrUpdateDic', data)
