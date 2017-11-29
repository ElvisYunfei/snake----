
var auiochang = document.getElementById("chang");
var auioduan = document.getElementById("duan");
var numberOne =document.getElementById("numberOne");
var model = document.getElementById("model");
var btn = document.getElementById("starGame") 
//获取大的正方形id
var wep = document.getElementById("wep");
var time =document.getElementById("time");

//创建新的span
var arr =[];
var rise= 20;
var  speed = 150;
var dir = "right";
//将生成的span插入大的正方形里面；
function createSpan(){
    for(var i = 0;i < 4 ; i++){
        //插入一个span 每次生成都需要在插入一遍；
        var spanon = document.createElement("span");
        //将span放入大的div种
        wep.appendChild(spanon);
        //放入数组
        arr.push(spanon);
        //插入的span 的top为0px
        spanon.style.top = 0+'px';
        spanon.style.left = i * rise + "px";
    }
}
function moverSpan(){
    var head = arr[arr.length-1].style.left;
    var top = arr[arr.length-1].style.top;

    if(dir=="right"){
        //点击按键向右移动的位置
        arr[0].style.left =parseInt(head) +rise+"px";

        arr[0].style.top = parseInt(top)+"px"   
    }
        //点击按键向上移动的位置
    if(dir=="top"){
        arr[0].style.left = parseInt(head)+"px"
        arr[0].style.top =parseInt(top) - rise+"px";
    }
    //点击按键向左移动的位置
    if(dir=="left"){
        arr[0].style.top =parseInt(top) +"px"
        arr[0].style.left =parseInt(head)-rise+"px";
    }
    //点击按键向下移动的位置
    if(dir=="bottom"){
        arr[0].style.left = parseInt(head)+"px"
        arr[0].style.top =parseInt(top) +rise+"px";
    }
    //蛇的碰撞检测
    //判断蛇头部的坐标是否与x轴一样
    if(parseInt(head) == foodpointer.x && parseInt(top) ==foodpointer.y){
        snakeFood();
        longBody(); 
                                                                                                          
    }
    //边距的死亡检测
    if(parseInt(head) > 760||parseInt(head) < 0||parseInt(top)  > 460|| parseInt(top) < 0){
        //如果符合以上的任何一种 停止计时 在窗口弹出游戏结束
        clearInterval(s);
        auiochang.play();
        clearInterval(StopTime);
        alert("游戏结束");
        ispaying=false;
        btn.disabled=false;
        
    }
    //碰撞自身的死亡检测
    arr1 = [];
    for(var i in arr){
        snakearr = {};
        snakearr .x = parseInt(arr[i].style.left);
        snakearr .y = parseInt(arr[i].style.top);
        arr1.push(snakearr);
    }
    arr1.pop();
    for(var j in arr1){
        if(parseInt(head) == arr1[j].x &&parseInt(top) ==arr1[j].y){
            auiochang.play();
            alert("游戏结束");
            clearInterval(s);
            ispaying=false;
            btn.disabled=false;  
        }
    }
    arr.push(arr.shift());
}

//判断蛇的按键位置控制方向
window.onkeydown = function(event){ 
    if(event.keyCode == 40  && dir !="top"){
        dir="bottom";
    }
    if(event.keyCode == 39  && dir !="left"){
        dir="right";
    }
    if(event.keyCode == 38  && dir !="bottom"){
        dir="top";
    }
    if(event.keyCode == 37  && dir !="right"){
        dir="left";
    }
}
//生成食物
function snakeFood(){
    var food = wep.getElementsByTagName("i")[0]; 
    if(food){
        wep.removeChild(food);
    }
    var food = document.createElement("i");
    foodpointer={
     x :Math.round(Math.random()*19)*rise,
     y :Math.round(Math.random()*19)*rise
    }
    wep.appendChild(food);
    food.style.left = foodpointer.x +"px" 
    food.style.top = foodpointer.y +"px" 
}
//长身体
function longBody(){
    var spanon = document.createElement("span");
    wep.appendChild(spanon);
    spanon.style.top = arr[0].style.top;
    spanon.style.left =arr[0].style.left;
    arr.unshift(spanon);
    auioduan.play();
    score()
}


//页面上的分数0的分值
function score(){
    numberOne.innerHTML =Number(numberOne.innerHTML)+10;
}
//游戏时间
function gameTime(){
    StopTime=setInterval(function(){
        Time++;
        time.innerHTML=Time+'秒';
        if(Time>60){
            var minutes=Math.floor(Time/60);
            var second=Time-minutes*60;
            time.innerHTML=minutes+'分'+second+'秒';
        }
    },1000)
}
//页面中的难易
model .onchange =function(){
    speed = this.value; 
}
//将蛇为初始化
function startGame(){
    reset();
    createSpan(); 
    snakeFood();
    s = setInterval(function(){
        moverSpan()
    },speed);
    
}
var ispaying = true;
//点击开始游戏 执行游戏
btn.onclick = function(){
    isplaying=true;
    gameTime();
    startGame();
    dir = "right";
    this.disabled = true;
}
//再次点击游戏重置
function reset(){
    Time=0;
    arr = [];
    wep.innerHTML="";
}
    
   