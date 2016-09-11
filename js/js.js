
var mogujie = document.getElementById('mogujie');
var daohang = utils.getElementsByClass('daohang')[0];
var content =utils.getElementsByClass('content')[0];
var list = utils.getElementsByClass('list')[0];
var list4 = utils.getElementsByClass('list4')[0];
var list3 = utils.getElementsByClass('list3')[0];
var list2 = utils.getElementsByClass('list2')[0];
var right = utils.getElementsByClass('right')[0];
var right70 = utils.getElementsByClass('right70')[0];
var content2 = utils.getElementsByClass('content2')[0];
var input = utils.getElementsByClass('input')[0];
var input1 = utils.getElementsByClass('input1')[0];
var ols = utils.getElementsByClass('ols');
var shangping = utils.getElementsByClass('shangping')[0];
var dianpu = utils.getElementsByClass('dianpu')[0];
var li5 =utils.getElementsByClass('li5')[0];
var input2 = utils.getElementsByClass('input2')[0];
list4.onmouseover = function(){
utils.children(list4,'ul')[0].style.display='block'
};
list4.onmouseout = function(){
    utils.children(list4,'ul')[0].style.display='none'
};
list3.onmouseover = function(){
    utils.children(list3,'ul')[0].style.display='block'
};
list3.onmouseout = function(){
    utils.children(list3,'ul')[0].style.display='none'
};
list2.onmouseover = function(){
    utils.children(list2,'div')[0].style.display='block'
};
list2.onmouseout = function(){
    utils.children(list2,'div')[0].style.display='none'
};
input1.onmouseover =function(){
ols[0].style.display = 'block';
};
input1.onmouseout = function(){
    ols[0].style.display = 'none'
};
input2.onmouseover =function(){
    ols[1].style.display = 'block';
};
input2.onmouseout = function(){
    ols[1].style.display = 'none'
};
shangping.onmouseover = function(){
    shangping.style.background = '#f7f7f7'
};
shangping.onmouseout = function(){
    shangping.style.background = 'none'
};
dianpu.onmouseover = function(){
    dianpu.style.background = '#f7f7f7'
};
dianpu.onmouseout = function(){
    dianpu.style.background = 'none'
};
//???????
li5.onclick = function () {
    utils.win("scrollTop", 0);
};
//???????
function moren(){
    var Top = utils.win('scrollTop');
    if(Top > 0 ){
       utils.css(li5,'display',"block")
    }else{
        utils.css(li5,'display',"none");
    }
}
window.onscroll =function(){
    moren();
    fn();
};
var top20 = utils.getElementsByClass('top20')[0];

function fn(){
    var client = document.documentElement.clientHeight|| document.body.clientHeight;
    var Top = utils.win('scrollTop');
    if(Top >client ){
        utils.css(top20,'top',0);
    }else{
        utils.css(top20,'top',-50);

    }
}

//????
var lunbo =utils.getElementsByClass('lunbo')[0];
var inner = utils.getElementsByClass('inner')[0];
var imgsBox = inner.getElementsByTagName('div');
var imgs =inner.getElementsByTagName('img');
var focus = utils.getElementsByClass('focus')[0];
var lis =  focus.getElementsByTagName('li');
var left10 = utils.getElementsByClass('left10')[0];
var right10 = utils.getElementsByClass('right10')[0];
(function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open("get","data.txt?_="+Math.random(),false);
    xhr.onreadystatechange = function () {
        if(xhr.readyState ==4 && /^2\d{2}$/.test(xhr.status)){
            window.data = utils.jsonParse(xhr.responseText);
        }
    };
    xhr.send(null);
})();
console.log(data);
;(function dataBind() {
    if(window.data){
        var str = "";
        var liStr = "";
        for(var i=0;i<data.length;i++){
            var curData = data[i];
            str += '<div class="imgsBox"><img src="" trueSrc="'+curData.src+'"/></div>';
            liStr += i === 0 ? '<li class="bg"></li>' : '<li></li>'
        }
        inner.innerHTML = str;
        focus.innerHTML = liStr;
    }
})();
function jiazai(){
    for(var i=0;i<imgs.length;i++){
        (function(i){
            var img = imgs[i];
            if(img.isloaded)return;
            var temp = new Image();
            temp.src = img.getAttribute('trueSrc');
            temp.onload = function () {
                img.src = this.src;
                utils.css(img,"display","block");
                if(i === 0){
                    utils.css(img.parentNode,"zIndex",1);
                    animate(img.parentNode,{opacity:1},300);
                }else{
                    utils.css(img.parentNode,"zIndex",0);
                    utils.css(img.parentNode,"opacity",0);
                }
            };
            temp = null;
            img.isloaded = true;
        })(i);
    }
}
window.setTimeout(jiazai,500);
//????????
var step = 0;
var timer = null;
var inter = 2000;
timer= window.setInterval(move,inter);
function move(){
    step++;
    if(step ==imgs.length){
        step = 0;
    }
    jiaodian()
}
function jiaodian(){
    for(var i=0;i<imgs.length;i++){
        var curImg = imgs[i];
        if(i === step){
            utils.css(curImg.parentNode,"zIndex",1);
            animate(curImg.parentNode,{opacity:1},300,function(){
                var siblings = utils.siblings(this);
                for(var j=0;j<siblings.length;j++){
                    utils.css(siblings[j],"opacity",0)
                }
            })
        }else{
            utils.css(curImg.parentNode,"zIndex",0);
        }
    }
    for(var i=0;i<lis.length;i++){
        lis[i].className = i == step ? 'bg' : '';
    }
}
lunbo.onmouseover = function(){
    console.log(1);
    left10.style.display = right10.style.display = 'block';
    window.clearInterval(timer);
};
lunbo.onmouseout = function(){
    left10.style.display = right10.style.display = 'none';
    timer=window.setInterval(move,inter);
};
left10.onclick= function () {
    if(step == 0){
        step = data.length;
    }
    step--;
    jiaodian();
};
right10.onclick = move;
function dianji(){
    for(var i=0;i<lis.length;i++){
        var li = lis[i];
        li.index = i;
        li.onclick = function () {
            step = this.index;
            jiaodian();
        }
    }
}
dianji();



