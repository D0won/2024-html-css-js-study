document.addEventListener('DOMContentLoaded', () => { // DOMContentLoaded 이벤트 리스너 추가, 페이지가 완전히 로드되면 실행
    const puzzleContainer = document.getElementById('puzzle-container'); // 퍼즐 컨테이너 요소 참조
    const shuffleButton = document.getElementById('shuffle-button'); // 셔플 버튼 요소 참조
    const undoButton = document.getElementById('undo-button'); // 뒤로가기 버튼 요소 참조
    const redoButton = document.getElementById('redo-button'); // 앞으로 가기 버튼 요소 참조

    let tiles = []; // 현재 퍼즐 상태를 저장하는 배열
    let moveHistory = []; // 이동 기록을 저장하는 배열
    let redoStack = []; // 앞으로 가기 기능을 위한 배열

    // 퍼즐 타일을 생성하는 함수
    function createTiles() {
        tiles = []; // 타일 배열 초기화
        for (let i = 1; i <= 15; i++) { // 1부터 15까지의 숫자 타일 생성
            const tile = document.createElement('div'); // 새로운 div 요소 생성
            tile.classList.add('tile'); // 타일 클래스 추가
            tile.textContent = i; // 타일에 숫자 추가
            tile.addEventListener('click', moveTile); // 타일 클릭 이벤트 리스너 추가
            tiles.push(tile); // 타일 배열에 추가
        }
        const emptyTile = document.createElement('div'); // 빈 타일 생성
        emptyTile.classList.add('tile', 'empty'); // 빈 타일 클래스 추가
        tiles.push(emptyTile); // 타일 배열에 빈 타일 추가
    }
    
     // 퍼즐 컨테이너에 타일을 렌더링하는 함수
    function renderTiles() {
        puzzleContainer.innerHTML = ''; // 퍼즐 컨테이너 비우기
        tiles.forEach(tile => { //  foreach 함수를 활용해서 타일 배열을 순회
            puzzleContainer.appendChild(tile); // 퍼즐 컨테이너에 타일 추가
        });
    }  
    // 타일을 섞는 함수
    function shuffleTiles() { 
        for (let i = tiles.length - 1; i > 0; i--) { // 배열의 마지막 요소부터 순회
            const j = Math.floor(Math.random() * (i + 1)); // 0부터 i 사이의 랜덤 인덱스 생성
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]]; // 두 타일을 서로 교환
        }
        moveHistory = []; // 이동 기록 초기화
        redoStack = []; // 앞으로 가기 스택 초기화
        renderTiles(); // 섞인 타일을 렌더링
    }

    // 타일을 이동시키는 함수
    function moveTile(e) { 
        const tileIndex = tiles.indexOf(e.target); // 클릭한 타일의 인덱스
        const emptyIndex = tiles.indexOf(document.querySelector('.empty')); // 빈 타일의 인덱스

        const validMoves = [tileIndex - 1, tileIndex + 1, tileIndex - 4, tileIndex + 4]; // 유효한 이동 범위 계산
        if (validMoves.includes(emptyIndex) && Math.abs(emptyIndex - tileIndex) !== 3) { // 빈 타일이 유효한 이동 범위에 있고 같은 행에 있을 때
            moveHistory.push(tiles.map(tile => tile.textContent ? parseInt(tile.textContent) : 0)); // 현재 상태를 이동 기록에 저장
            redoStack = []; // 이동 시마다 앞으로 가기 스택 초기화
            [tiles[tileIndex], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[tileIndex]]; // 클릭한 타일과 빈 타일의 위치를 교환
            renderTiles(); // 변경된 타일을 렌더링
        }
    }
    // 뒤로 가기 기능을 구현하는 함수
    function undoMove() { 
        if (moveHistory.length > 0) { // 이동 기록이 있을 때만 실행
            redoStack.push(tiles.map(tile => tile.textContent ? parseInt(tile.textContent) : 0)); // 현재 상태를 앞으로 가기 스택에 저장
            const previousState = moveHistory.pop(); // 이동 기록에서 마지막 상태를 가져옴
            tiles = previousState.map(value => { // 이전 상태로 타일을 복원
                const tile = document.createElement('div'); // 새로운 div 요소 생성
                tile.classList.add('tile'); // 타일 클래스 추가
                if (value !== 0) { // 빈 타일이 아닌 경우
                    tile.textContent = value; // 타일에 숫자 추가
                    tile.addEventListener('click', moveTile); // 타일 클릭 이벤트 리스너 추가
                } else { // 빈 타일인 경우
                    tile.classList.add('empty'); // 빈 타일 클래스 추가
                }
                return tile; // 복원된 타일 반환
            });
            renderTiles(); // 복원된 타일을 렌더링
        }
    }
    // 앞으로 가기 기능을 구현하는 함수
    function redoMove() { 
        if (redoStack.length > 0) { // 앞으로 가기 스택이 있을 때만 실행
            moveHistory.push(tiles.map(tile => tile.textContent ? parseInt(tile.textContent) : 0)); // 현재 상태를 이동 기록에 저장
            const nextState = redoStack.pop(); // 앞으로 가기 스택에서 마지막 상태를 가져옴
            tiles = nextState.map(value => { // 다음 상태로 타일을 복원
                const tile = document.createElement('div'); // 새로운 div 요소 생성
                tile.classList.add('tile'); // 타일 클래스 추가
                if (value !== 0) { // 빈 타일이 아닌 경우
                    tile.textContent = value; // 타일에 숫자 추가
                    tile.addEventListener('click', moveTile); // 타일 클릭 이벤트 리스너 추가
                } else { // 빈 타일인 경우
                    tile.classList.add('empty'); // 빈 타일 클래스 추가
                }
                return tile; // 복원된 타일 반환
            });
            renderTiles(); // 복원된 타일을 렌더링
        }
    }

    shuffleButton.addEventListener('click', shuffleTiles); // 셔플 버튼 클릭 시 타일을 섞는 함수 호출
    undoButton.addEventListener('click', undoMove); // 뒤로 가기 버튼 클릭 시 이동 취소 함수 호출
    redoButton.addEventListener('click', redoMove); // 앞으로 가기 버튼 클릭 시 이동 복원 함수 호출

    createTiles(); // 초기 타일 생성
    renderTiles(); // 초기 타일 렌더링
});
