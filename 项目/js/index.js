window.onload = function () {  //等待页面其他资源加载完成，在执行js代码
  //获取dom元素
  //头部dom元素
  var headerLiNodes = document.querySelectorAll('#header li');
  var headerUpNodes = document.querySelectorAll('#header li .up');
  var headerArrowNode = document.querySelector('#header .arrow');
  //内容dom元素
  var contentNode = document.getElementById('content');
  var contentUlNode = document.querySelector('#content .contentMain');
  //第一屏dom元素
  var homePointNodes = document.querySelectorAll('#content .home .home_point li');
  var homeLiNodes = document.querySelectorAll('#content .contentMain .home .home_carousel li');
  var homeUlNode = document.querySelector('#content .contentMain .home .home_carousel');
  //第五屏dom元素
  var teamLiNodes = document.querySelectorAll('#content .contentMain .team .team_lists li');
  var teamUlNode = document.querySelector('#content .contentMain .team .team_lists');
  //侧边导航
  var navBarNodes = document.querySelectorAll('.navBar li');
  //music
  var musicNode = document.querySelector('.music');
  var audioNode = document.querySelector('.music audio');
  
  //初始化下标为0
  var nowIndex = 0;
  
  //逻辑代码
  //头部js
  headerHandle();
  function headerHandle() {
    //初始化时第一个upnode宽度为100%
    headerUpNodes[0].style.width = '100%';
    //初始化时让小箭头来到第一个Li下面
    headerArrowNode.style.left = headerLiNodes[0].getBoundingClientRect().left + headerLiNodes[0].offsetWidth / 2
      - headerArrowNode.offsetWidth / 2 + 'px';
  
    //给所有li绑定点击事件
    for (var i = 0; i < headerLiNodes.length; i++) {
      //给所有的li添加下标属性
      headerLiNodes[i].index = i;
      headerLiNodes[i].onclick = function () {
        //同步nowIndex的值
        nowIndex = this.index;
        move(nowIndex);
      }
    }
  }
  
  // move(4);
  function move(nowIndex) {
    //改变内容区ul位置
    contentUlNode.style.top = - nowIndex * contentNode.offsetHeight + 'px';
    //改变小箭头的位置
    headerArrowNode.style.left = headerLiNodes[nowIndex].getBoundingClientRect().left + headerLiNodes[nowIndex].offsetWidth / 2
      - headerArrowNode.offsetWidth / 2 + 'px';
    //将所有的upnodes宽度设置为0
    for (var j = 0; j < headerUpNodes.length; j++) {
      headerUpNodes[j].style.width = '';  //不会添加相应的行内样式
      navBarNodes[j].className = '';
    }
    //将当前点击的upnode宽度设置为100%
    //this代表当前被点击的li元素
    headerUpNodes[nowIndex].style.width = '100%';
    //将当前的侧边导航li加上class
    navBarNodes[nowIndex].className = 'active';
  }
  
  //内容区js
  contentHandle();
  function contentHandle() {
   //页面滚动
   //兼容ie/chrome
   document.onmousewheel = wheel;
   //兼容firefox
   if (document.addEventListener) {
     document.addEventListener('DOMMouseScroll', wheel);
   }
   /*
     函数反抖：对于一个频繁触发的函数，为了节约性能，在规定时间内只让最后一次函数的触发生效，其他的都忽略
       让多次的函数调用变成一次
     函数节流：对于一个频繁触发的函数，为了节约性能，在规定时间内只让第一次函数的触发生效，其他的都忽略
    */
  
   var wheelTimer = null;
  
   function wheel(event) {
     event = event || window.event;
     //清除延时器
     //清除上一个延时器
     clearTimeout(wheelTimer);
     //设置延时器
     wheelTimer = setTimeout(function () {
       var flag = '';
       if (event.wheelDelta) {
         //ie/chrome
         if (event.wheelDelta > 0) {
           flag = 'up';
         } else {
           flag = 'down'
         }
       } else if (event.detail) {
         //firefox
         if (event.detail < 0) {
           flag = 'up';
         } else {
           flag = 'down'
         }
       }
       console.log('滚轮事件被触发了');
       switch (flag) {
         case 'up' :
           /*
             向上移动ul
             小箭头位置
             upNode宽度
            */
           if (nowIndex > 0) {
             nowIndex--;
             move(nowIndex);
           }
           break;
         case 'down' :
           if (nowIndex < headerLiNodes.length - 1) {
             nowIndex++;
             move(nowIndex);
           }
           break;
       }
     }, 200)
    
     //禁止默认行为
     event.preventDefault && event.preventDefault();
     return false;
   }
  
   //用户缩放浏览器
   window.onresize = function () {
     //更新小箭头的位置
     headerArrowNode.style.left = headerLiNodes[nowIndex].getBoundingClientRect().left + headerLiNodes[nowIndex].offsetWidth / 2
       - headerArrowNode.offsetWidth / 2 + 'px';
     //更新ul的位置
     contentUlNode.style.top = - nowIndex * contentNode.offsetHeight + 'px';
   }
 }
 
  //第一屏js
  homeHandle();
  function homeHandle() {
    //上一次的下标
    var lastIndex = 0;
    //当前下标
    var nowIndex = 0;
    //初始化上一次点击时间
    var lastTime = 0;
    //自动轮播定时器
    var timer = null;
    
    //给每一个小圆点绑定点击事件
    for (var i = 0; i < homePointNodes.length; i++) {
      homePointNodes[i].index = i;
      homePointNodes[i].onclick = function () {
        //获取当前点击的时间
        var nowTime = Date.now();
        if (nowTime - lastTime < 2100) {
          //说明两次点击间隔时间少于两秒
          return;
        }
        //同步nowIndex的值
        nowIndex = this.index;
        //如果下标相等，说明点击的就是当前小圆点，不进行处理
        if (nowIndex === lastIndex) return;
        
        //清除定时器
        clearInterval(timer);
        
        //清除掉所有class
        for (var j = 0; j < homeLiNodes.length; j++) {
          homeLiNodes[j].className = 'commonTitle';
        }
        
        if (nowIndex > lastIndex) {
          //说明点击的是右边
          homeLiNodes[nowIndex].className = 'commonTitle rightShow';
          homeLiNodes[lastIndex].className = 'commonTitle leftHide';
        } else {
          //说明点击的是左边
          homeLiNodes[nowIndex].className = 'commonTitle leftShow';
          homeLiNodes[lastIndex].className = 'commonTitle rightHide';
        }
        
        //修正小圆点的显示
        homePointNodes[lastIndex].className = '';
        homePointNodes[nowIndex].className = 'active';
    
        //同步下标
        lastIndex = nowIndex;
        //同步时间
        lastTime = nowTime;
        
        //重新开启自动轮播
        autoPlay();
        
      }
    }
    
    //开启自动轮播
    autoPlay();
    function autoPlay() {
      //自动轮播
      timer = setInterval(function () {
        //相当于点击右边小圆点  右边显示 左边隐藏
        nowIndex++;
    
        if (nowIndex === 4) {
          nowIndex = 0;
        }
    
        homeLiNodes[nowIndex].className = 'commonTitle rightShow';
        homeLiNodes[lastIndex].className = 'commonTitle leftHide';
        //修正小圆点的显示
        homePointNodes[lastIndex].className = '';
        homePointNodes[nowIndex].className = 'active';
    
        //同步下标
        lastIndex = nowIndex;
        //更新lastTime时间
        lastTime = Date.now();
    
      }, 2500)
    }
    
    //鼠标移入移出事件
    homeUlNode.onmouseenter = function () {
      clearInterval(timer);
    }
    homeUlNode.onmouseleave = autoPlay;
    
  }
  
  //第五屏js
  teamHandle();
  function teamHandle() {
    //保存canvas的容器
    var canvas = null;
    //保存的定时器变量
    var timer1 = null;
    var timer2 = null;
    
    //给li绑定鼠标移入事件
    for (var i = 0; i < teamLiNodes.length; i++) {
      teamLiNodes[i].index = i;
      
      teamLiNodes[i].onmouseenter = function () {
        //其他li透明度为0.5
        for (var j = 0; j < teamLiNodes.length; j++) {
          teamLiNodes[j].style.opacity = 0.5;
        }
        this.style.opacity = 1;
        //创建画布，产生气泡运动
        addCanvas(this.index);
      }
    }
    
    //给ul绑定鼠标移出事件
    teamUlNode.onmouseleave = function () {
      //将所有li透明度改为1
      for (var j = 0; j < teamLiNodes.length; j++) {
        teamLiNodes[j].style.opacity = 1;
      }
      //清除画布
      canvas.remove();
      canvas = null; //为了让下一次能产生新的画布
      //清除定时器
      clearInterval(timer1);
      clearInterval(timer2);
    }
    
    //添加画布
    function addCanvas(index) {
      /*
        如果之前没有，我要新创建一个
        如果之前有，使用之前的，改变位置left
       */
      if (!canvas) {
        //创建canvas
        canvas = document.createElement('canvas');
        //设置宽度和高度
        canvas.width = 236;
        canvas.height = 448;
  
        canvas.style.position = 'absolute';
        canvas.style.left = index * 236 + 'px';
        //产生气泡运动
        bubble();
        //添加到ul中
        teamUlNode.appendChild(canvas);
      } else {
        canvas.style.left = index * 236 + 'px';
      }
    }
    //气泡运动函数
    function bubble() {
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
    
        var circleArr = [];
    
        //生成随机圆
        timer1 = setInterval(function () {
          //颜色随机
          var r = Math.round(Math.random() * 255);
          var g = Math.round(Math.random() * 255);
          var b = Math.round(Math.random() * 255);
          //半径随机
          var c_r = Math.round(Math.random() * 8 + 2);
          //缩放系数
          var s = Math.round(Math.random() * 50 + 50);
          //起始位置 x轴坐标随机 y轴坐标不变
          var x = Math.round(Math.random() * canvas.width);
          var y = canvas.height + c_r;
      
          //添加到数组中
          circleArr.push({
            r: r,
            g: g,
            b: b,
            c_r: c_r,
            s: s,
            x: x,
            y: y,
            d: 0  //角度
          })
      
        }, 20)
    
        //画圆
        timer2 = setInterval(function () {
          //清除画布, 清除上一次画的东西
          ctx.clearRect(0, 0, canvas.width, canvas.height);
      
          for (var i = 0; i < circleArr.length; i++) {
            //获取单个圆
            var item = circleArr[i];
            //角度增加
            item.d += 4;
            //计算得出弧度
            var rad = item.d * Math.PI / 180;
            //计算圆心的坐标
            var x = Math.round(item.x + Math.sin(rad) * item.s);
            var y = Math.round(item.y - rad * item.s);
            //判断y轴的坐标，如果小于0，清除掉
            if (y <= 0) {
              circleArr.splice(i, 1);
              continue;
            }
        
            //画圆
            ctx.fillStyle = 'rgb(' + item.r + ',' + item.g + ',' + item.b + ')';
            ctx.beginPath();
            ctx.arc(x, y, item.c_r, 0, 2 * Math.PI);
            ctx.fill();
          }
      
        }, 1000 / 60)
    
      } else {
        alert('您的浏览器不支持canvas');
      }
    }
  
  }
  
  //侧边导航
  for (var i = 0; i < navBarNodes.length; i++) {
    navBarNodes[i].index = i;
    navBarNodes[i].onclick = function () {
      nowIndex = this.index;
      move(nowIndex);
    }
  }
  
  //音乐播放
  musicNode.onclick = function () {
    if (audioNode.paused) {
      //说明当前音乐是暂停的，点击播放
      audioNode.play();
      this.style.backgroundImage = 'url("../../img/musicon.gif")';
    } else {
      //说明当前音乐是播放的，点击暂停
      audioNode.pause();
      this.style.backgroundImage = 'url("../../img/musicoff.gif")';
    }
  }
  
  //手动触发播放
  audioNode.play();
  //设置静音
  audioNode.muted = false;

}