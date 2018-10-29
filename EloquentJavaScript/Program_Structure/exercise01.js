function printTriangle(rows){
    let str = "#";
    for(let index = 1; index <= rows; index++){
        console.log(str + "\n");
        str += "#";
    }
}

printTriangle(7);