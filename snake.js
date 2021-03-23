function init(){
    var canvas=document.getElementById('mycanvas');
    W =canvas.width=600;
    H = canvas.height=600;
    pen = canvas.getContext('2d');
    cs=30;
    game_over=false;
    score = 5;
    food_img = new Image();
    food_img.src = "https://i2.wp.com/ceklog.kindel.com/wp-content/uploads/2013/02/firefox_2018-07-10_07-50-11.png?fit=641%2C618&ssl=1";
    trophy =new Image();
    trophy.src= "https://www.pngitem.com/pimgs/m/339-3393710_cartoon-trophy-hd-png-download.png";
    food=getRandomFood();

    snake = {
        init_len:5,
        color:"blue",
        cells:[],
        direction:"right",

        createSnake:function(){
        for(var i=this.init_len;i>0;i--){
        this.cells.push({x:i,y:0});
        }
       },

        drawSnake:function(){
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-1,cs-1);
            }
        },

        updateSnake:function(){
            var headX=this.cells[0].x;
            var headY=this.cells[0].y;
            if(headX==food.x && headY==food.y){
                food = getRandomFood();
                score++;
            }
            else{
            this.cells.pop();
            }
            
            var nextX,nextY;
            if(this.direction=="right"){
              nextX=headX+1;
              nextY=headY;
            }
            else if(this.direction=="left"){
                nextX=headX-1;
                nextY=headY;
            }
            else if(this.direction=="down"){
                nextX=headX;
                nextY=headY+1;
            }
            else{
                nextX=headX;
                nextY=headY-1;
            }
            this.cells.unshift({x:nextX,y:nextY});
            var last_x =Math.round(W/cs);
            var last_y = Math.round(H/cs);
            if(this.cells[0].y<0 || this.cells[0].x<0 || this.cells[0].x>last_x ||this.cells[0].y>last_y){
            game_over=true;
            }
            else{
                for(let i=3;i<this.cells.length;i++){
                if(this.cells[i].x==this.cells[0].x && this.cells[i].y==this.cells[0].y)
                 game_over=true;
                }
            }

        }
        
    };
    
    snake.createSnake();
    function keyPressed(e){
     if(e.key=="ArrowRight"){
         if(snake.direction!="left")
         snake.direction = "right";
    }
    else if(e.key =="ArrowLeft"){
        if(snake.direction != "right")
        snake.direction = "left";
    }
    else if(e.key=="ArrowDown"){
        if(snake.direction != "up")
        snake.direction= "down"; 
    }
    else{
        if(snake.direction!="down")
        snake.direction = "up";
    }
    }
    
    document.addEventListener('keydown',keyPressed);
}

function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    pen.fillStyle = food.color;
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
    pen.drawImage(trophy,11,12,cs,cs);
    pen.fillStyle= "blue";
    pen.font = "12px Roboto";
    pen.fillText(score,30,30);
}  

function update(){
  snake.updateSnake();
}

function getRandomFood(){
    var foodX =Math.round(Math.random()*(W-cs)/cs);
    var foodY =Math.round(Math.random()*(H-cs)/cs);
    
    
    var food = {
        x:foodX,
        y:foodY,
        color:"red",
    }
    return food;
}

function gameloop(){
    if(game_over==true){
        clearInterval(f);
        alert("Game Over");
        return;
    }
    draw();
    update();
}
init();
var f=setInterval(gameloop,108);