const game = document.querySelector("#game");
// const board = [
//     [0, 0, 0],
//     [0, 0, 0],
//     [0, 0, 0],
// ]
let player = 1

const cleanBoard = () => {
    while (game.firstChild) {
        game.removeChild(game.firstChild)
    }
}

const checkValues = (v1, v2, v3) => v1 == v2 && v2 == v3
const checkLines = board => {
    let statuts = false

    board.forEach(line => {
        if (statuts) return true
        if (!line.includes(0)) {
            statuts = checkValues(line[0], line[1], line[2])
        }
    })

    return statuts
}

checkColums = board => checkLines([
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
])

const generateBoard = board => {
    cleanBoard()

    if (checkLines(board) || checkColums(board)) {
        alert("GAME OVER")
        return generateBoard([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ])
    }

    board.forEach((line, lineIndex )=> {
       const lineDiv = document.createElement('div')
       lineDiv.classList.add('line')
       game.appendChild(lineDiv)

       line.forEach((value, squareIndex) => {
           const square = document.createElement('div')
           square.classList.add('square')
           square.dataset.state = value
           lineDiv.appendChild(square)

           square.addEventListener('click', () => {
               if (value !== 0) return
               board[lineIndex][squareIndex] = player
               player = player === 1 ? 2 : 1
               generateBoard(board)
           })
       });
    });
}

generateBoard([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
])