const input1 = document.querySelector("#input1");
const input2 = document.querySelector("#input2");
const response1 = document.querySelector("#response1");
const response2 = document.querySelector("#response2");

const reset = document.querySelector("#redo");

const mic1 = document.querySelector("#microphone1");
const mic2 = document.querySelector("#microphone2");

const fl1 = document.querySelector("#fl1");
const fl2 = document.querySelector("#fl2");
const fl3 = document.querySelector("#fl3");
const sl1 = document.querySelector("#sl1");
const sl2 = document.querySelector("#sl2");
const sl3 = document.querySelector("#sl3");

const primary = "#334";
const anger = "#B22222";
const fear = "3C1F41";
const joy = "#EBE939";
const sadness = "#87CEEB";
const analytical = "#2E8B57";
const confident = "#FF8C00";
const tentative = "#A9A9A9";



var xhr = new XMLHttpRequest();

const case1 = "JOY";
const case2 = "SADNESS";

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

mic1.onclick = () => {
    console.log("Start talking!");

    input1.style.display = "block";
    setTimeout(function () {
        fl1.style.display = "block";
        fl2.style.display = "block";
        fl3.style.display = "block";
    }, 900);


    xhr.open("GET", "http://127.0.0.1:5000/test2", true);
    xhr.send();
    xhr.onload = function () {
        console.log(xhr.response);
        renderResponse1(JSON.parse(xhr.response));
    };
}

mic2.onclick = () => {
    console.log("Start talking!");
    input2.style.display = "block";
    setTimeout(function () {
        sl1.style.display = "block";
        sl2.style.display = "block";
        sl3.style.display = "block";

    }, 1300)


    xhr.open("GET", "http://127.0.0.1:5000/test2", true);
    xhr.send();
    xhr.onload = function () {
        console.log(xhr.response);
        renderResponse2(JSON.parse(xhr.response));
    };
}

const renderResponse1 = res => {
    let text = res["text"];

    fl1.style.display = "none";
    fl2.style.display = "none";
    fl3.style.display = "none";

    try {
        let emotion1 = res["response"]["document_tone"]["tones"][0]["tone_id"];
        var emotion2 = null;
        try {
            emotion2 = res["response"]["document_tone"]["tones"][1]["tone_id"];
        } catch (e) {}

        console.log(emotion1 + " " + emotion2);
        colorEmotion(emotion1);
        // response1.innerHTML = emotion1 + " " + emotion2;
        response1.innerHTML = responseFeedback(emotion1, emotion2);
    } catch (e) {
        console.error(e);
        colorEmotion();
        response1.innerHTML = responseFeedback();
    }
    input1.innerHTML = text;
    mic1.style.display = "none";
    mic2.style.display = "block";
    response1.style.display = "block";
    return;
}

const renderResponse2 = res => {
    let text = res["text"];

    sl1.style.display = "none";
    sl2.style.display = "none";
    sl3.style.display = "none";

    try {
        let emotion1 = res["response"]["document_tone"]["tones"][0]["tone_id"];
        var emotion2 = null;
        try {
            emotion2 = res["response"]["document_tone"]["tones"][1]["tone_id"];
        } catch (e) {}

        console.log(emotion1 + " " + emotion2);
        colorEmotion(emotion1);
        // response2.innerHTML = emotion1 + " " + emotion2
        response2.innerHTML = responseFeedback(emotion1, emotion2)
    } catch (e) {
        console.error(e);
        colorEmotion();
        response2.innerHTML = responseFeedback();

    }

    response2.style.display = "block";
    input2.innerHTML = text;
    mic2.style.display = "none";

    response2.style.display = "block";
    reset.style.display = "block";
    reset.disabled = false;
    return;
}

const colorEmotion = (emote = null) => {
    let color;
    switch (emote) {
        case "anger":
            color = anger;
            break;
        case "fear":
            color = fear
            break;
        case "joy":
            color = joy
            break;
        case "sadness":
            color = sadness
            break;
        case "analytical":
            color = analytical
            break;
        case "confident":
            color = confident
            break;
        case "tentative":
            color = tentative
            break;

        default:
            color = primary
            break;
    }
    document.body.style.backgroundColor = color;
}

const responseFeedback = (emote1 = null, emote2 = null) => {
    if (emote1 === "joy" && emote2 === "confident" || emote1 === "joy" || emote1 === "confident") {
        return "The other person is happy and confident, so there is nothing to worry about. You could express your happiness for them.";
    } else if (emote1 === "joy" && emote2 === "tentative") {
        return "In this situation, maybe take joy in the fact that the other person is happy but also make an attempt to reassure them if they are not sure of something";
    } else if (emote1 === "fear" && emote2 === "confident" || emote1 === "fear") {
        return "The other person is confident that there is something to be afraid of. Perhaps make an attempt to calm them down ";
    } else if (emote1 === "fear" && emote2 === "tentative") {
        return "The other person is confused about their feelings of fear. Perhaps make an attempt to reassure them and calm them down";
    } else if (emote1 === "sadness" && emote2 === "confident" || emote1 === "sadness" || emote1 === "tentative") {
        return "The other person feels deeply sad. Make an effort to cheer them up and perhaps help with their situation";
    } else if (emote1 === "sadness" && emote2 === "tentative") {
        return "The other person is conufsed about their feelings of sadness. Perhaps tread lightly and assist in finding the source of their sadness";
    } else if (emote1 === "anger" && emote2 === "confident" || emote1 === "anger") {
        return "The other person is feeling greatly angry. Make an attempt to find the source of their anger and think about ways to calm them down";
    } else if (emote1 === "anger" && emote2 === "tentative") {
        return "The other person is confused about their feelings of anger. Make an attempt to let them know you are there for them and think of ways to calm them down";
    } else if (emote1 === "analytical" && emote2 === "confident" || emote1 === "analytical") {
        return "The other person is feeling highly analytical and focused. If you can, help them on whatever they are focused on. If not, wish them the best on whatever it is their mind is on.";
    } else if (emote1 === "analytical" && emote2 === "tentative") {
        return "This person is focused on something but something is holding them back in their thought process. Find ways to reassure them and give them the confidence they need";
    }else {
        return "Sorry, we were not able to help you.";
    }
}

reset.onclick = () => {
    mic1.style.display = "block";
    input1.innerHTML = "";
    input2.innerHTML = "";
    response1.innerHTML = "";
    response2.innerHTML = "";

    input2.style.display = "none";
    response1.style.display = "none";
    response2.style.display = "none";

    reset.disabled = true;
    return;
}