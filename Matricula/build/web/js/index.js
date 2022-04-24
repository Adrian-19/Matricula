

function executeCommand(){
    console.log("executing function")
}

function makeNewInd(){
    executeCommand();
}

function loadedIndex(){
    $("#buttonAction").click(makeNewInd)
}

$(loadedIndex);