var eggs = new Array(3);
eggs[0] = new Array(8);
eggs[1] = new Array(8);
eggs[2] = new Array(8);

var timerId;
var seceond;
var start = document.getElementById('start');
var gameover;
var success;
var remain = document.getElementById('remain');
var remainsNumber = 8;
var fail = document.getElementById('fail');
var failsNumber = 0;
var time = document.getElementById('time');
var order = document.getElementById('order');
var hint = document.getElementById('hint');
var chance;
var find;
var numberOfDogs;
var correct = new Audio('chimes.mp3');
var wrong = new Audio('bad.mp3');
var ending = new Audio('ending.mp3');

function gameStart() {
  start.innerHTML = '게임시작';
  remain.innerHTML = '남은 수 : 8';
  remainsNumber = 8;
  fail.innerHTML = '실패 수 : 0';
  failsNumber = 0;
  numberOfDogs = 0;
  timerId = null;
  find = false;
  hint.innerHTML = '힌트 기회는 1번';
  chance = true;

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 8; j++) {
      eggs[i][j] = null;
      var egg = document.getElementById('egg' + i + j);
      egg.src = 'img1.gif';
      egg.style.border = 'none';
    }
  }
  if (gameover != null) {
    document.body.removeChild(gameover);
    gameover = null;
  } else if (success != null) {
    document.body.removeChild(success);
    success = null;
  }
  second = 6;
  timerId = setInterval('countDown()', 1000);
  alert('5초동안 숨은 그림을 잘 보세요.');
  order.innerHTML = '숨은 그림을 보세요.';
  showImg();
}

function showImg() {
  while (numberOfDogs != 8) {
    var row = Math.floor(Math.random() * 3);
    var col = Math.floor(Math.random() * 8);
    if (eggs[row][col] == null) {
      eggs[row][col] = 'dog';
      numberOfDogs++;
      var egg = document.getElementById('egg' + row + col);
      egg.src = 'img2.gif';
    }
  }
}

function hideImg() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 8; j++) {
      var egg = document.getElementById('egg' + i + j);
      egg.src = 'img1.gif';
    }
  }
}

function giveHint() {
  if (chance == true && find == true) {
    correct.play();
    var check = false;
    remainsNumber--;
    remain.innerHTML = '남은 수 : ' + remainsNumber;
    chance = false;
    hint.innerHTML = '힌트 기회를 모두 사용했습니다.';
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 8; j++) {
        if (eggs[i][j] == 'dog') {
          var egg = document.getElementById('egg' + i + j);
          egg.src = 'img2.gif';
          eggs[i][j] = 'checked';
          check = true;
          break;
        }
      }
      if (check == true) {
        break;
      }
    }
  } else {
    hint.innerHTML = '힌트 기회가 없습니다.';
  }
}

function countDown() {
  second--;
  time.innerHTML = '시간 : ' + second;
  if (second == 0 && find == false) {
    hideImg();
  }
  if (second == -1 && find == false) {
    clearInterval(timerId);
    second = 21;
    timerId = setInterval('countDown()', 1000);
    find = true;
    alert('20초 동안 정답을 찾으세요. 오답 시 1초씩 줄어듭니다.');
    order.innerHTML = '정답을 찾으세요.';
  }

  if (second <= 0 && find == true) {
    alert('시간이 종료 되었습니다.');
    order.innerHTML = '실패';
    clearInterval(timerId);
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 8; j++) {
        if (eggs[i][j] == 'dog') {
          var egg = document.getElementById('egg' + i + j);
          egg.src = 'img2.gif';
          egg.style.border = '1px solid red';
        }
      }
    }
    makeGameover();
  } else if (remainsNumber == 0 && find == true) {
    alert('모든 강아지를 찾았습니다!');
    order.innerHTML = '성공';
    clearInterval(timerId);
    makeSuccess();
    ending.play();
  }
}

function checkEgg(e) {
  var egg = e.target;
  var i = egg.id[3];
  var j = egg.id[4];

  if (find == true && eggs[i][j] == 'dog') {
    var egg = document.getElementById('egg' + i + j);
    egg.src = 'img2.gif';
    remainsNumber--;
    remain.innerHTML = '남은 수 : ' + remainsNumber;
    order.innerHTML = '정답입니다. 계속 찾아보세요.';
    eggs[i][j] = 'checked';
    correct.play();
  } else if (find == true && eggs[i][j] != 'dog') {
    second--;
    failsNumber++;
    fail.innerHTML = '실패 수 : ' + failsNumber;
    order.innerHTML = '오답입니다. 1초 줄어들었습니다.';
    wrong.play();
  }
}

function makeGameover() {
  gameover = document.createElement('div');
  gameover.innerHTML = 'GAME OVER';
  gameover.setAttribute('id', 'gameover');
  document.body.appendChild(gameover);
}

function makeSuccess() {
  success = document.createElement('div');
  success.innerHTML = 'SUCCESS';
  success.setAttribute('id', 'success');
  document.body.appendChild(success);
}
