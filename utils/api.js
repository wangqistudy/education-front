/*
 * @Author: David
 * @Date: 2019-08-23 14:04:31
 * @LastEditTime: 2019-11-26 10:43:35
 * @LastEditors: Do not edit
 * @Description: 接口列表
 */
/* eslint-disable */
import   {post,get} from './fetch'
let apiList = {
    sendCode:'/v1/front/code',
    register:'/v1/front/register',
    login:'/v1/front/login',
    forget:'/v1/front/forget/password',
    gradeOptions:'/v1/front/grade/config',
    userEdit:'/v1/front/user/edit',
    get_common_setting:'/v1/front/setting/get_common_setting',
    get_user_info:'/v1/front/user/get_user_info',
    get_banner:'/v1/front/banner/list',
    get_course:'/v1/front/course/front_list',
    get_teacher:'/v1/front/teacher/index_list',
    course_collector_add:'/v1/front/course_collector/add',
    course_collector_remove:'/v1/front/course_collector/remove',
    teacher_collector_add:'/v1/front/teacher_collector/add',
    teacher_collector_remove:'/v1/front/teacher_collector/remove',
    news_list:'/v1/front/news/index_list',
    shcool_list:'/v1/front/school/index_list',
    course_detail:'/v1/front/course/detail',
    course_hours:'/v1/front/course_hour/detail',
    teacher_search_config:'/v1/front/teacher/search_config',
    teacher_list:'/v1/front/teacher/teacher_list',
    course_config:'/v1/front/course/get_config',
    course_list:'/v1/front/course/course_list',
    teacher_list_banner:'/v1/front/banner/teacher_list',
    video_list:'/v1/front/video/list',
    video_search_config:'/v1/front/video/search_config',
    news_full_list:'/v1/front/news/list',
    banner_list:'/v1/front/banner/list',
    video_detail:'/v1/front/video/detail',
    teacher_detail:'/v1/front/teacher/detail',
    calendar:'/v1/front/user/calendar',
    user_course_list:'/v1/front/user/course_list',
    course_order_list:'/v1/front/course_order/list',
    course_seat_choose:'/v1/front/course_seat/choose',
    get_qrcode:'/v1/front/wechat/get_qrcode',
    bind_mobile:'/v1/front/bind_mobile',
    et_list:'/v1/front/feature/list',
    et_detail:'/v1/front/feature/detail',
    order_detail:'/v1/front/course_order/detail',
    course_order_create:'/v1/front/course_order/create',
    wechat_pay:'/v1/front/course_order/wechat_pay',
    pay_check:'/v1/front/course_order/pay_check',
    course_seat_list:'/v1/front/course_seat/list',
    alipay:'/v1/front/alipay/pay',
    course_collector_list:'/v1/front/course_collector/list',
    teacher_collector_list:'/v1/front/teacher_collector/list',
    protocol_detail:'/v1/front/protocol/detail',
    about_us_detail:'/v1/front/about_us/detail',
    news_detail:'/v1/front/news/detail',
    get_captcha:'/v1/front/captcha/get',
    float_new:'/v1/front/news/float_new',
    report_search_log:'/v1/front/course/report_search_log',
}
let list = {}
Object.keys(apiList).forEach((key,index)=>{
    list[key] = (data,subUrl)=>{
        return post(apiList[key]+(subUrl?subUrl:''),data||{});
    }
})

export {apiList};
export default list;