import { readCookie } from '@/config/util';

// 登录判断
export const isLogin = () => {
    let token = readCookie('admin_uluk');

    if (process.env.NODE_ENV == 'development') {
        token = true;
    }

    return !!token;
}