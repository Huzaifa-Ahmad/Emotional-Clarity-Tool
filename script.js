var xhr = new XMLHttpRequest();

document.getElementById("start").onclick = () => {
    xhr.open("GET", "http://127.0.0.1:5000/test2", true);
    xhr.send();
    xhr.onload = function () {
        console.log(xhr.response);
        renderResponse(JSON.parse(xhr.response))
     };

    
}

const renderResponse = res => {
    let max = res["text"];
    console.log(max);
    let emotionsList = [];
    // for (i in max) {
    //     emotionsList.push(res["document_tone"]["tones"][i][2]);
    // }
    // console.log(emotionsList);
    return emotionsList;
}