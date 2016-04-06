/**
 * Created by caoyang on 11/20/15.
 */
export const IWXIAO_HOST='http://t.iwxiao.com';
const IWXIAO_MANGE='../../../';

export const iwxiao_url={
    blog:{
        get_index: IWXIAO_HOST + '/Blog/Index/index/1.json',
        get_tag_list: IWXIAO_HOST + '/Blog/Index/tag/1.json',
        get_blog_list_by_tag_id: IWXIAO_HOST + '/Blog/Index/topic/1.json',
        get_blog_list_by_school: IWXIAO_HOST + '/Blog/Detail/school/1.json',
        get_blog_detail:IWXIAO_HOST + '/Blog/Detail/index/1.json',
        get_blog_reply:IWXIAO_HOST + '/Blog/Detail/reply/1.json',
        post_new_reply:IWXIAO_HOST + '/Blog/Post/reply/1.json',
        post_new_blog: IWXIAO_HOST + '/Blog/Post/index/1.json',
        favored:IWXIAO_HOST + '/Blog/Favor/index/1.json',
        tipoff:IWXIAO_HOST + '/Blog/Tipoff/index/1.json'
    },
    file:{
        get_img:IWXIAO_HOST + '/File/Getimg/index',
        get_upload_page: IWXIAO_HOST + '/File/Upload/index/1.html',
    },
    account:{
        get_login:IWXIAO_HOST + '/Account/Login/login/1.json',
        get_VerifyCode:IWXIAO_HOST + '/Account/Register/VerifyCode/1.json',
        get_school_list:IWXIAO_HOST + '/Account/Quesinfo/schoollist/1.json',
        get_user_info: IWXIAO_HOST + '/Account/Center/self/1.json',
        get_unread_msg: IWXIAO_HOST + '/Account/Message/list/1.json',
        get_my_blog_list: IWXIAO_HOST + '/Blog/Center/self/1.json',
        get_my_enroll_event_list: IWXIAO_HOST + '/Events/Center/self/1.json',
        get_my_join_event_list: IWXIAO_HOST + '/Events/Center/join/1.json',
        get_my_watch_event_list: IWXIAO_HOST + '/Events/Watch/index/1.json',
        get_user_money:IWXIAO_HOST + '/Market/Center/money/1.json',
        post_register: IWXIAO_HOST + '/Account/Register/Register/1.json',
        post_forget:IWXIAO_HOST + '/Account/Register/forget/1.json',
        post_self:IWXIAO_HOST + '/Account/Edit/self/1.json',
        post_edit_pw: IWXIAO_HOST + '/Account/Edit/pw/1.json',
        login:IWXIAO_MANGE + 'application/account/view/account_login.html',
        club_confirm: IWXIAO_MANGE + 'application/account/view/account_club_confirm.html',
        club_confirm_info:IWXIAO_MANGE + 'application/account/view/account_confirm_info.html',
        register:'account_register.html',
        reassign_password:'account_reassign_password.html',
        message_detail:IWXIAO_MANGE + 'application/account/view/account_message.html',
        message_list:IWXIAO_MANGE + 'application/account/view/account_message_list.html',
        file_upload:IWXIAO_HOST + '/File/Upload/account/1.html'
    },
    event:{
        get_event_list: IWXIAO_HOST + '/Club/Event/list/1.json',
        get_event_detail: IWXIAO_HOST + '/Events/Detail/index/1.json',
        get_event_list_by_filter: IWXIAO_HOST + '/Events/Sort/by/1.json',
        get_comment_list: IWXIAO_HOST + '/Events/Post/index/1.json',
        get_qrcode:IWXIAO_HOST + '/File/Getqr/index',
        get_event_enlist: IWXIAO_HOST + '/Events/Enlist/index/1.json',
        get_event_result:IWXIAO_HOST + '/Events/Result/index/1.json',
        get_event_survey_result:IWXIAO_HOST + '/Events/Survey/index/1.json',
        get_event_lucky_result:IWXIAO_HOST + '/Club/Luck/draw_list/1.json',
        get_event_lucky_prize:IWXIAO_HOST + '/Club/Luck/showdraw/1.json',
        post_event_send_prize:IWXIAO_HOST + '/Club/Luck/send_prize/1.json',
        post_add_favor: IWXIAO_HOST + '/Events/Favor/index/1.json',
        post_add_watch: IWXIAO_HOST + '/Events/Watch/index/1.json',
        post_add_comment: IWXIAO_HOST + '/Events/Post/index/1.json',
        post_location: IWXIAO_HOST + '/Club/Event/location/1.json',
        file_upload:IWXIAO_HOST + '/File/Upload/event/1.html',
        post_add_event_sign: IWXIAO_HOST + '/Club/Event/sign/1.json',
        event_add : IWXIAO_MANGE + 'application/event/view/event_add.html',
        event_count: IWXIAO_MANGE + 'application/event/view/event_count.html',
        event_detail: IWXIAO_MANGE + 'application/event/view/event_detail.html',
        comment_add: IWXIAO_MANGE + 'application/event/view/event_comment_add.html',
        comment_list: IWXIAO_MANGE + 'application/event/view/event_comment_list.html',
        event_qrcode:IWXIAO_MANGE + 'application/event/view/event_qrcode.html',
        add_luck_draw_html:IWXIAO_MANGE + 'application/event/view/event_add_luck_draw.html',
        add_event_vote_html:IWXIAO_MANGE + 'application/event/view/event_add_vote.html',
        post_add_event_comment:IWXIAO_HOST + '/Club/Event/comment/1.json',
        post_add_event_vote: IWXIAO_HOST + '/Club/Event/survey/1.json',
        post_add_event_vote_question: IWXIAO_HOST + '/Club/Event/question/1.json',
        post_add_event_luck: IWXIAO_HOST + '/Club/Luck/adddraw/1.json',
        post_add_event_luck_prize: IWXIAO_HOST + '/Club/Luck/addprize/1.json',
    },
    club:{
        post_add_club_info: IWXIAO_HOST + '/Club/Index/index/1.json',
        get_edit_club_info: IWXIAO_HOST + '/Club/Index/edit/1.json',
        post_edit_club_info: IWXIAO_HOST + '/Club/Index/edit/1.json',
        post_beleader: IWXIAO_HOST + '/Club/Index/beleader/1.json',//提升为管理员club_id,authid,other_user_id
    },
    other:{
        home_main:IWXIAO_MANGE + 'application/home/view/home_main.html',
        agreement: 'http://www.iwxiao.com/privacy.html',
        app_push_page: IWXIAO_HOST + '/Apppush/Index/index.html',
    },
    home:{
        home_html:IWXIAO_MANGE + 'application/home/view/home_main.html',
        edit_club:IWXIAO_MANGE + 'application/home/view/home_edit_club.html',
        get_club_info: IWXIAO_HOST + '/Club/Index/myclub/1.json',
        post_edit_club_info: IWXIAO_HOST + '/Club/Index/edit/1.json',
        statistics_common: IWXIAO_MANGE + 'application/event/view/event_statistics_common.html',
        statistics_luck:IWXIAO_MANGE + 'application/event/view/event_statistics_luck.html',
        statistics_vote:IWXIAO_MANGE + 'application/event/view/event_statistics_vote.html',
    },
    coupon:{
        get_ad_list:IWXIAO_HOST + '/Coupon/Ad/index/1.json',
        get_hot_classify_list:IWXIAO_HOST + '/Coupon/Classify/hot/1.json',
        get_root_classify_list: IWXIAO_HOST + '/Coupon/Classify/rootClassify/1.json',
        get_all_classify_list: IWXIAO_HOST + '/Coupon/Classify/index/1.json',
        get_hot_merchant_list:IWXIAO_HOST + '/Coupon/Merchant/hot/1.json',
        get_all_merchant_list:IWXIAO_HOST + '/Coupon/Merchant/all/1.json',
        get_ticket_list:IWXIAO_HOST + '/Coupon/Ticket/index/1.json',
        get_ticket_detail: IWXIAO_HOST + '/Coupon/Ticket/byTicketId/1.json',
        share_ticket:IWXIAO_HOST + '/Coupon/Share/index/1.html',
        get_take_ticket: IWXIAO_HOST + '/Coupon/Package/take/1.json',
        get_my_ticket: IWXIAO_HOST + '/Coupon/Package/index/1.json',
        get_ticket_by_classify: IWXIAO_HOST + '/Coupon/Ticket/byClassifyId/1.json',
        get_ticket_by_merchant_id: IWXIAO_HOST + '/Coupon/Ticket/byMerchantId/1.json',
        get_search_result: IWXIAO_HOST + '/Coupon/Ticket/search/1.json',
        get_search_result_by_merchant_id: IWXIAO_HOST + '/Coupon/Ticket/byMerchantId/1.json',
        get_hot_city_list: IWXIAO_HOST + '/Coupon/Location/hotCity/1.json',
        get_all_city_list: IWXIAO_HOST + '/Coupon/Location/cityList/1.json',
        get_hot_lable:IWXIAO_HOST + '/Coupon/Label/hot/id/1.json',
        get_ticket_by_label_id:IWXIAO_HOST+ '/Coupon/Ticket/byLabelId/id/1.json',
    }
}

export const iwx_version='3';

export const iwx_local_data={
    blog:{
        chanel_list:'chanel_list',
    },
    account:{
        user_info:'account_user_info',
        login_info:'account_login_info',
        club_info:'account_club_info',
        is_show_info:'account_club_show_info',//是否已经提示过申请信息
        current_location_info:'account_iyh_current_location_info',
        search_key:'local_coupon_search_key'
    },
    event:{
        new_event_id:'event_id',
        event_add_info:'event_add_info',
    }
}

export const iwxiao_debug=true;

export const iwxiao_pub_key="-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDHN+JEhXCXEWJtsntcpMrsadAh5JnYVvfbE5P6IuuTPNC0xsKuiYxnQRkRR3UlRweey92VWNW47ktPTf0L24GKDtLurdJtYOkmrxMYRX9Crz8m+Jhldw7XV0csRiFzsmVKS1C5BL1OpAMazLUWDh5N5VDhQxCj2+sybHJdmeLR9QIDAQAB-----END PUBLIC KEY-----";

export const iwx_qrcode='com.iwxiao.client:///';

export const iwx_qrcode_command={
    sign:'sign',
};

export const iwx_event_tag={survey:'1',lucky_draw:'2',sign:'3',post_comment:'5',out_link:'6'}
