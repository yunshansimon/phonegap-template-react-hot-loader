/**
 * Created by caoyang on 16/3/11.
 */
export function fromNow(dateString){
    var now=new Date();
    var minutes = 1000 * 60;
    var hours = minutes * 60;
    var days = hours * 24;
    var months =days *30;
    var years = days * 365;
    var t = now.getTime()- Date.parse(dateString);
    if(t/years > 1){
        return translate_number_to_chinese(Math.floor(t/years)) + '年前';
    }else if (t/months >1){
        return translate_number_to_chinese(Math.floor(t/months)) + '月前';
    }else if (t/days >1){
        return translate_number_to_chinese(Math.floor(t/days)) + '日前';
    }else if (t/hours >1){
        return translate_number_to_chinese(Math.floor(t/hours)) + '小时前';
    }else{
        return '一小时内';
    }
}


function translate_number_to_chinese(number){
    const chinese_num=['零','一','二','三','四','五','六','七','八','九'];
    const chinese_bit=['','十','百'];
    var str=String(number),result='';
    for(var i=0;i<str.length;i++){
        result += chinese_num[parseInt(str.charAt(i))] + chinese_bit[str.length-1-i];
    }
    if(str.length>1){
        if(str.charAt(0)=='1'){
            result=result.substr(1);
        }
        if(str.substr(-1)=='0'){
            result=result.substr(0,result.length-1);
        }
    }
    return result;
}

export function getDate(dateString){
    return dateString.split(' ')[0];
}