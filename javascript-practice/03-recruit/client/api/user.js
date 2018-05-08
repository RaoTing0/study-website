import request from '@/config/request';

// 获取用于信息
export const getUserInfo = data => request('/userinfo', data);

export const getUserList = data => request('/userlist', data);

// 注册请求
export const userRegister = data => request('/register', data, 'POST');

// 登陆
export const userLogin = data => request('/login', data, 'POST');

// 获取用户简历
export const userResume = data => request('/resume', data);

// 获取所有职位
export const getAllPosition = data => request('/getPosition', data);
// 获取某个职位
export const getOnePosition = data => request('/getOnePosition', data);

// 投递简历
export const putResume = data => request('/putResume', data);

// 完善简历
export const completeResume = data => request('/writeResume', data, 'POST');
// 更新简历
export const updateResume = data => request('/updateResume', data, 'POST');

// 添加职位信息
export const addPosition = data => request('/addPosition', data, 'POST');
// 更新职位信息
export const updatePosition = data => request('/updatePosition', data, 'POST');