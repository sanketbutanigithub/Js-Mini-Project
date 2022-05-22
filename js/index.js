const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

let keys = { ArrowUp : false , ArrowDown : false , ArrowRight : false, ArrowLeft :false};


startScreen.addEventListener('click',startGame);

let player = { speed : 5 , score : 0};

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
}

function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
}

function startGame(){
    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    for(x=0;x<5;x++){
        let roadline = document.createElement('div');
        roadline.setAttribute('class','lines');
        roadline.y = (x*150);
        roadline.style.top = roadline.y +"px";
        gameArea.appendChild(roadline);
    }

    let car = document.createElement('div');
    car.setAttribute('class','car');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    console.log("Top position "+car.offsetTop)
    console.log("Left position "+car.offsetLeft)

    for(x=0;x<3;x++){
        let enemycar = document.createElement('div');
        enemycar.setAttribute('class','enemy');
        enemycar.y = ((x+1) * 350) * -1;
        enemycar.style.top = enemycar.y +"px";
        enemycar.style.backgroundColor = randomColor();
        enemycar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemycar);
    }
}

function randomColor(){
    function c(){
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return "#"+c()+c()+c();
}

function gamePlay(){
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();

    // console.log(road);
    if(player.start){
        movelines();
        moveEnemy(car);

        if(keys.ArrowUp && player.y > (road.top+100)){
            player.y -= player.speed;
        }
        if(keys.ArrowDown && player.y < road.bottom - 75){
            player.y += player.speed;
        }
        if(keys.ArrowLeft && player.x > 0){
            player.x -= player.speed;
        }
        if(keys.ArrowRight && player.x < (road.width-50)){
            player.x += player.speed;
        }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        window.requestAnimationFrame(gamePlay)
        console.log(player.score++)
        player.score++;
        let ps = player.score-2;
        score.innerText = "Score : "+ps
    }
}

function isCollide(a,b){
    //a actual car , b enemy car
    aReact = a.getBoundingClientRect();
    bReact = b.getBoundingClientRect();

    return !((aReact.bottom < bReact.top) || (aReact.top > bReact.bottom) || (aReact.right < bReact.left) || (aReact.left > bReact.right))
}


 function movelines(){
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function(item){
        if(item.y >=700){
            item.y -= 750
        }
        item.y += player.speed;
        item.style.top = item.y +"px";
    })
 }
function endGame(){
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over <br> Your Final Score is "+player.score +"<br> Press here to Restart Game"

}

 function moveEnemy(car){
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function(item){
        if(isCollide(car,item)){
            endGame();
        }
        if(item.y >=700){
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y +"px";
    })
 }



