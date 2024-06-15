function reset() {
    // 게임 초기화
    isStarted = false; // 게임이 시작되었는지 여부
    isGameEnd = false; // 게임이 종료되었는지 여부

    remainBombs = 99; // 남은 폭탄의 수
    curTime = 0; // 현재 시간

    leftMB = false; // 왼쪽 마우스 버튼 상태
    rightMB = false; // 오른쪽 마우스 버튼 상태
    bothMB = false; // 양쪽 마우스 버튼 상태
    savedID = 16 * 30 + 1; // 저장된 ID

    cells.fill(0); // 모든 셀을 초기화
    checked.fill(0); // 모든 체크를 초기화
    clearInterval(myInterval); // 타이머를 중지

    // 게임 보드 초기화
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            id = i * width + j;
            document.getElementById(String(id)).className = 'cellClosed'; // 셀 클래스 초기화
            document.getElementById(String(id)).innerHTML = ""; // 셀 내용 초기화
            document.getElementById(String(id)).style.backgroundColor = "lightgray"; // 셀 배경색 초기화
        }
    }
}

function mouseDown(e, element, id) {
    // 마우스 버튼을 눌렀을 때 처리
    if (e.button == 0) {
        leftMB = true;
        if (rightMB == true) bothDown(element, id); // 양쪽 버튼을 모두 눌렀을 때
    } else if (e.button == 2) {
        if (leftMB == true) bothDown(element, id); // 양쪽 버튼을 모두 눌렀을 때
        rightMB = true;
    }
}

function mouseUp(e, element, id) {
    // 마우스 버튼을 뗐을 때 처리
    if (bothMB) {
        leftMB = false;
        rightMB = false;
        bothMB = false;
        return;
    }
    if (e.button == 0) {
        if (rightMB == false) leftClick(element, id); // 왼쪽 버튼을 뗐을 때
        else {
            bothMB = true;
            bothUp(element, id); // 양쪽 버튼을 뗐을 때
        }
        leftMB = false;
    } else if (e.button == 2) {
        if (leftMB == false) rightClick(element, id); // 오른쪽 버튼을 뗐을 때
        else {
            bothMB = true;
            bothUp(element, id); // 양쪽 버튼을 뗐을 때
        }
        rightMB = false;
    }
}

function doNothing(e) {
    // 기본 컨텍스트 메뉴 동작을 방지
    e.preventDefault();
}

function leftClick(element, id) {
    // 왼쪽 마우스 버튼 클릭 처리
    if (isGameEnd == true) return; // 게임 종료 시 아무 작업도 하지 않음
    if (cells[id] == 1) {
        document.getElementById(id).style.backgroundColor = "red"; // 폭탄 클릭 시 배경색을 빨간색으로 변경
        gameOver(); // 게임 종료
        return;
    }
    const i = parseInt(id / width);
    const j = id % width;
    let ii, jj;
    if (isStarted == false) {
        // 게임이 시작되지 않았을 때 폭탄 배치
        for (k = 0; k < nBombs; k++) {
            ii = i; jj = j;
            while ((ii - i) * (ii - i) < 2 && (jj - j) * (jj - j) < 2 || cells[ii * width + jj] == 1) {
                ii = Math.floor(Math.random() * height);
                jj = Math.floor(Math.random() * width);
            }
        
            cells[ii * width + jj] = 1; // 폭탄 배치
        }
        isStarted = true;
        myInterval = setInterval(timeCount, 1000); // 타이머 시작
    }
    openCell(i, j); // 셀 열기
}

function openCell(i, j) {
    // 셀 열기 처리
    let id = i * width + j;
    cells[id] = 2; // 셀 상태 변경
    bombs = bombCount(i, j); // 주변 폭탄 수 계산
    extBombCount = "<span class='count cnt" + bombs + "'>" + (bombs ? bombs : "") + "</span>"; // 폭탄 수 표시

    document.getElementById(String(id)).className = 'cellOpen'; // 셀 클래스 변경
    document.getElementById(String(id)).innerHTML = extBombCount; // 셀 내용 변경

    let won = true;
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            id = i * width + j;
            if (cells[id] == 0) {
                won = false;
                break;
            }
        }
    }
    if (won) gameOver(); // 모든 셀을 열었을 때 게임 종료
}

function bombCount(i, j) {
    // 주변 폭탄 수 계산
    let bombs = 0;
    let ii;
    let jj;
    for (let k = 0; k < 8; k++) {
        ii = i + neighbor[k][0];
        jj = j + neighbor[k][1];
        if (ii < 0 || ii >= height) continue;
        if (jj < 0 || jj >= width) continue;
        if (cells[ii * width + jj] == 1) bombs++;
    }
    return bombs;
}

function checkCount(i, j) {
    // 주변 체크 수 계산 (bombCount와 유사)
    let checks = 0;
    let ii;
    let jj;
    for (let k = 0; k < 8; k++) {
        ii = i + neighbor[k][0];
        jj = j + neighbor[k][1];
        if (ii < 0 || ii >= height) continue;
        if (jj < 0 || jj >= width) continue;
        if (cells[ii * width + jj] == 1) checks++;
    }
    return checks;
}

function timeCount() {
    // 타이머 증가
    curTime++;
    document.getElementById("time").innerHTML = leadingZero(curTime, 3);
    if (curTime == 999) {
        gameOver(); // 최대 시간이 되면 게임 종료
    }
}

function leadingZero(n, digits) {
    // 숫자를 0으로 채워서 반환
    var zero = '';
    n = n.toString();
    if (n.length < digits) {
        for (var i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
}

function gameOver() {
    // 게임 종료 처리
    isGameEnd = true;
    clearInterval(myInterval); // 타이머 중지
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            id = i * width + j;
            if (cells[id] == 1) {
                document.getElementById(String(id)).innerHTML = "<span class='bomb'>+</span>"; // 폭탄 표시
            }
            if (cells[id] == 0 && checked[id] == 1) {
                document.getElementById(String(id)).style.backgroundColor = "red"; // 잘못된 체크 표시
                document.getElementById(String(id)).innerHTML = "<span class='bomb cnt7'>-</span>";
            }
        }
    }
}

function rightClick(element, id) {
    // 오른쪽 마우스 버튼 클릭 처리
    if (isGameEnd == true) return;
    if (remainBombs == 0 && checked[id] == 0) return; // 남은 폭탄이 없고 체크되지 않은 경우
    if (cells[id] == 2) return; // 이미 열린 셀인 경우

    const i = parseInt(id / width);
    const j = id % width;
    if (checked[id] == 1) {
        checked[id] = 0;
        remainBombs++;
        document.getElementById(String(i * width + j)).style.backgroundColor = "lightgray"; // 체크 해제
    } else {
        checked[id] = 1;
        remainBombs--;
        document.getElementById(String(i * width + j)).style.backgroundColor = "orange"; // 체크 설정
    }
    document.getElementById("bomb").innerHTML = leadingZero(remainBombs, 3); // 남은 폭탄 수 갱신
}

function bothDown(element, id) {
    // 양쪽 마우스 버튼을 누를 때 처리
    console.log("both mouse buttons down");
    // 추가 기능 구현 가능
}

function bothUp(element, id) {
    // 양쪽 마우스 버튼을 뗄 때 처리
    console.log("both mouse buttons up");
    // 추가 기능 구현 가능
}
