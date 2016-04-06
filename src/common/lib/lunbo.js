/**
 * Created by test on 16-3-2.
 */
import {load_img_url,isEmpty,open_outer_url,get_idfa} from './functions'

export default function(el,img_url_list,second,innerHandler){
    var active_index=0;
    var max_index=0;
    var creat_el=function (el_name,el_class){
        var el=document.createElement(el_name);
        el_class=el_class || '';
        el_class!=='' && el.classList.add(el_class);
        return el;
    };
    var innerEl=creat_el('div','lunbo-inner');
    var lunbo_indicatorsEl=creat_el('div','lunbo-indicators');
    var but_viewEl=creat_el('div','but-view');
    var flog=0;
    var show_img=function(index) {
        [].forEach.call(innerEl.children, function (el, el_index) {
            if(el_index==index){
                el.classList.add('active');
                el.classList.remove('active-out');
            }else{
                el.classList.remove('active');
                if(el_index==(index-1)){
                    el.classList.add('active-out');
                }else{
                    el.classList.remove('active-out');
                }
            }
        });
        [].forEach.call(lunbo_indicatorsEl.children,function(el,el_index){
            if(el_index==index){
                [].forEach.call(el.children,function(el_view){
                    el_view.classList.add('active');
                });
            }else{
                [].forEach.call(el.children,function(el_view){
                    el_view.classList.remove('active');
                });
            }
        });
    }
    let idfa=get_idfa();
    img_url_list.forEach(function(img_url){
        var imgEl=creat_el('img','');
        load_img_url(imgEl,img_url.img);
        var itemEl=creat_el('div','item');
        itemEl.appendChild(imgEl);
        itemEl.addEventListener('click',function(){
            let regex=/^http/i;
            let url=img_url.url.replace(/%idfa%/i,idfa);
            if (regex.test(url)){
                open_outer_url(url)
            }else{
                if(!isEmpty(innerHandler)){
                    innerHandler(url)
                }
            }
        });
        innerEl.appendChild(itemEl);
        var indicatorEl=creat_el('div','but');
        var but_viewEl=creat_el('div','but-view');
        indicatorEl.appendChild(but_viewEl);
        indicatorEl.setAttribute('data',max_index);
        indicatorEl.addEventListener('click',function(e){
            active_index=this.getAttribute('data');
            show_img(active_index);
        });
        lunbo_indicatorsEl.appendChild(indicatorEl);
        max_index++;
    });
    el.appendChild(innerEl);
    el.appendChild(lunbo_indicatorsEl);
    var controlEl=creat_el('div','lunbo-control');
    var leftEl=creat_el('div','left');
    leftEl.addEventListener('click',function(){
        active_index--;
        if(active_index<0){
            active_index=(max_index-1);
        }
        show_img(active_index);
    });
    controlEl.appendChild(leftEl);
    var rightEl=creat_el('div','right');
    rightEl.addEventListener('click',function(){
        active_index++;
        if(active_index>=max_index){
            active_index=0;
        }
        show_img(active_index);
    });
    controlEl.appendChild(rightEl);
    el.appendChild(controlEl);
    show_img(active_index);
    setInterval(function(){
        ++active_index;
        if(active_index>=max_index){
            active_index=0;
        }
        show_img(active_index);
    },second);
}


