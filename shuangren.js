        var canvas;

        var context;
        

        var isWhite = true;//设置是否该轮到白棋

        var isWell = false;//设置该局棋盘是否赢了，如果赢了就不能再走了

        var img_b = new Image();

        img_b.src = "images/b.png";//白棋图片

        var img_w = new Image();

        img_w.src = "images/w.png";//黑棋图片



        var chessData = new Array(15);//这个为棋盘的二维数组用来保存棋盘信息，初始化0为没有走过的，1为白棋走的，2为黑棋走的

        for (var x = 0; x < 15; x++) {

            chessData[x] = new Array(15);

            for (var y = 0; y < 15; y++) {

                chessData[x][y] = 0;

            }

        }



        function drawRect() {//页面加载完毕调用函数，初始化棋盘

            canvas = document.getElementById("canvas");

            context = canvas.getContext("2d");
            
            



            //for (var i = 0; i <= 420; i += 30) {//绘制棋盘的线

                //context.lineWidth="1";//设置线宽
                //context.beginPath();

                //context.moveTo(0, i);

                //context.lineTo(420, i);

                //context.closePath();

                //context.stroke();
            
            for(var i=0;i<15;i++){
               /* context.strokeStyle="#fff";*/
                context.moveTo(15+i*30,15) ; //绘制棋盘上的横线
                context.lineTo(15+i*30,435);  //15和435都为留白
                context.stroke();
                context.moveTo(15,15+i*30) ;  //棋盘上的竖线（横纵坐标互换即可）
                context.lineTo(435,15+i*30);  
                context.stroke();


    //}    




              //  context.beginPath();

              //  context.moveTo(i, 0);

              //  context.lineTo(i, 420);

              //  context.closePath();
              //  context.strokeStyle = "#000000" 

              //  context.stroke();


                //绘制天元，棋盘中间的点
                context.beginPath();
                context.arc(225,225,4,0,2*Math.PI,true);
                context.closePath();
                context.fill();

                //左上角小圆点
                context.beginPath();
                context.arc(105,105,3.5,0,2*Math.PI,true);
                context.closePath();
                context.fill();

                //右上角小圆点
                context.beginPath();
                context.arc(345,105,3.5,0,2*Math.PI,true);
                context.closePath();
                context.fill();

                //左下角小圆点
                context.beginPath();
                context.arc(105,345,3.5,0,2*Math.PI,true);
                context.closePath();
                context.fill();

                //右下角小圆点
                context.beginPath();
                context.arc(345,345,3.5,0,2*Math.PI,true);
                context.closePath();
                context.fill();

                //绘制棋盘外框
                context.beginPath();
                context.lineWidth="1";
                context.strokeRect(15,15,420,420);
                context.closePath();



            }

        }

        function play(e) {//鼠标点击时发生
            canvas=document.getElementById("canvas");

            //var x = parseInt((e.clientX -canvas.offsetLeft-15) / 30);//计算鼠标点击的区域，如果点击了（65，65），那么就是点击了（1，1）的位置

            //var y = parseInt((e.clientY -canvas.offsetTop-15) / 30);
              
              var x=Math.floor(e.offsetX/30);
              var y=Math.floor(e.offsetY/30);
            


            if (chessData[x][y] != 0) {//判断该位置是否被下过了

                //alert("你不能在这个位置下棋");

                return;

            }



            if (isWhite) {

                isWhite = false;

                drawChess(1, x, y);

            }

            else {

                isWhite = true;

                drawChess(2, x, y);

            }



        }

        function drawChess(chess, x, y) {//参数为，棋（1为白棋，2为黑棋），数组位置

            if (isWell == true) {

                alert("已经结束了，如果需要重新玩，请刷新");

                return;

            }

            if (x >= 0 && x < 15 && y >= 0 && y < 15) {

                if (chess == 1) {

                    context.drawImage(img_w, x * 30, y * 30 );//绘制白棋

                    chessData[x][y] = 1;

                }

                else {

                    context.drawImage(img_b, x * 30, y * 30);

                    chessData[x][y] = 2;

                }

                judge(x, y, chess);

            }

        }

        function judge(x, y, chess) {//判断该局棋盘是否赢了

            var count1 = 0;

            var count2 = 0;

            var count3 = 0;

            var count4 = 0;



            //左右判断

            for (var i = x; i >= 0; i--) {

                if (chessData[i][y] != chess) {

                    break;

                }

                count1++;

            }

            for (var i = x + 1; i < 15; i++) {

                if (chessData[i][y] != chess) {

                    break;

                }

                count1++;

            }

            //上下判断

            for (var i = y; i >= 0; i--) {

                if (chessData[x][i] != chess) {

                    break;

                }

                count2++;

            }

            for (var i = y + 1; i < 15; i++) {

                if (chessData[x][i] != chess) {

                    break;

                }

                count2++;

            }

            //左上右下判断

            for (var i = x, j = y; i >= 0, j >= 0; i--, j--) {

                if (chessData[i][j] != chess) {

                    break;

                }

                count3++;

            }

            for (var i = x + 1, j = y + 1; i < 15, j < 15; i++, j++) {

                if (chessData[i][j] != chess) {

                    break;

                }

                count3++;

            }

            //右上左下判断

            for (var i = x, j = y; i >= 0, j < 15; i--, j++) {

                if (chessData[i][j] != chess) {

                    break;

                }

                count4++;

            }

            for (var i = x + 1, j = y - 1; i < 15, j >= 0; i++, j--) {

                if (chessData[i][j] != chess) {

                    break;

                }

                count4++;

            }



            if (count1 >= 5 || count2 >= 5 || count3 >= 5 || count4 >= 5) {

                if (chess == 1) {

                    alert("白棋赢了");

                }

                else {

                    alert("黑棋赢了");

                }

                isWell = true;//设置该局棋盘已经赢了，不可以再走了

            }

        }


        //悔棋
        function goback(){
           var step
            if(step==1){
                return;
            }
            if(step>2){
                //如果下了多于两步
                for(x=0;y<15;x++){
                    for(y=0;y<15;y++){
                        if(chessData[x][y].step==step-1){
                            //找到上一步
                            chessData[x][y].step=0;//清空棋子
                            renew(chessData,x,y);
                        }//重绘棋盘
                        else if(chessData[x][y].step==step-2){
                            //找到上两步
                            chessData[x][y].step=0;//清空棋子标志
                            renew(chessData,x,y);//重绘棋盘
                        }
                    }
                }
            }
            else if(step==2){
                //如果下了一步
                for(x=0;x<15;x++){
                    if(chessData[x][y].step==step-1){
                        //找到上两步
                        chessData[x][y].step=0;//清空棋子标志
                        renew(chessData,x,y);
                    }//重绘棋盘
                renew(chessData,x,y);
                }
            }
        }