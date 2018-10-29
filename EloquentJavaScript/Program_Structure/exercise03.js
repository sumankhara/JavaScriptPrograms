function chessBoard(size) {
    let str = "# # # #"
    for (let index = 1; index <= size; index++) {
        if (index % 2 === 0) {
            console.log(str);            
        }
        else {
            console.log(" " + str);
        }
    }
}

chessBoard(8);