/**
 * Created by Administrator on 2016/7/31.
 */

window.animate = (function (){
    function animate(ele,target,duration,effect,callback){
        window.clearInterval(ele.timer);
        var effectObj = {
            Linear: function (t, b, c, d) {
                return c * t / d + b;
            }
        };
        var tempEffect = effectObj.Linear;
        if(typeof effect == "number"){
            switch (effect){
                case 0:
                    tempEffect = effectObj.Linear;
                    break;
            }
        }else if(effect instanceof Array){
            tempEffect = effectObj[effect[0]][effect[1]];
        }else if(typeof effect == 'function'){
            callback = effect;
        }
        var time = 0;
        var begin = {};
        var change = {};
        var interval = 10;
        for(var key in target){
            begin[key] = utils.css(ele,key);
            change[key] = target[key] - begin[key];
        }
        ele.timer = window.setInterval(function (){
            time += interval;
            if(time >= duration){
                window.clearInterval(ele.timer);
                for(var key in target){
                    utils.css(ele,key,target[key]);
                }
                if(typeof callback == 'function'){
                    callback.call(ele);
                }
                return;
            }
            for(var key in change){
                if(change[key]){
                    var curWeidu = tempEffect(time,begin[key],change[key],duration);
                    utils.css(ele,key,curWeidu);
                }
            }
        },interval);
    }
    return  animate;
})();
