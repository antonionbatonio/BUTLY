import { io } from "socket.io-client";
import bridge from '@vkontakte/vk-bridge';
import CreateUser from './CreateUser.js';
import CreateUserTransfer from './CreateUserTransfer.js';
import ReactDOM from 'react-dom';
import Reconnect from "./Reconnect.js";

var id;
var fullname;
var coins_for_click;
var clicks = 0;
var coins = 0;
var boostx2 = 0;
var boostx2_for_ad = 0;
var ref;
var photo;
const socket = io("https://mine-click.xyz", {
    transports: ['websocket'],
    upgrade: false
})

socket.on("multiple_connections", () => {
    ReactDOM.render(
        <Reconnect/>,
        document.getElementsByClassName("App")[0]
    )
})

socket.on("user_info", (data) => {
    coins_for_click = data.coins_for_click;
    coins = data.coins;
    boostx2 = data.boostx2;
    boostx2_for_ad = data.boostx2_for_ad;
    if(boostx2 == 1) coins_for_click = coins_for_click*2;
    if(boostx2 == 1 && boostx2_for_ad == 1) coins_for_click = coins_for_click*4;
    if(boostx2 == 0 && boostx2_for_ad == 1) coins_for_click = coins_for_click*2;
    if(boostx2 == 1 && boostx2_for_ad == 0) coins_for_click = coins_for_click*2;
})

socket.on("wait", (data) => {
    const wait = document.getElementsByClassName("wait")[0];
    const messages = [
        document.getElementsByClassName("msg_fail")[0],
        document.getElementsByClassName("fail_msg")[0],
        document.getElementsByClassName("success_message")[0]
    ]

    messages.forEach((e) => {
        if(!e) {
            return
        }
        e.style.display="none";
    })

    wait.style.display="flex"
    setTimeout(()=>{
        wait.style.display="none"
    },2500)
})

socket.on("please wait", (data) => {
    const please_wait = document.getElementsByClassName("please_wait")[0];
    const msg_pls_wait = document.getElementsByClassName("msg_pls_wait")[0];

    please_wait.style.display="flex";
    msg_pls_wait.innerHTML=data.msg;
    setTimeout(()=>{
        please_wait.style.display="none";
    },2500)
})

socket.on("boostx2_activated", (data) => {
    const boostx2_activated = document.getElementsByClassName("boostx2_activated")[0];

    boostx2_activated.style.display="flex";
    setTimeout(()=>{
        boostx2_activated.style.display="none";
    },3500)
})

socket.on("success_viewing", (data) => {
    const success_message = document.getElementsByClassName("success_message")[0];
    const msg_money = document.getElementsByClassName("msg_money")[0];

    msg_money.innerHTML = `Получено монет: ${data.msg.toLocaleString()}`;
    success_message.style.display="flex";
    setTimeout(()=>{
        success_message.style.display="none";
    },3500)
})

socket.on("msg_fail", (data) => {
    const msg_fail = document.getElementsByClassName("msg_fail")[0];

    msg_fail.style.display="flex";
    setTimeout(()=>{
        msg_fail.style.display="none";
    },2500)
})

socket.on("fail_msg", (data) => {
    const fail_msg = document.getElementsByClassName("fail_msg")[0];

    fail_msg.style.display="flex";
    setTimeout(()=>{
        fail_msg.style.display="none";
    },2500)
})

socket.on("fail", (data) => {
    const fail_msg = document.getElementsByClassName("fail_message")[0];

    fail_msg.style.display="flex";
    setTimeout(()=>{
        fail_msg.style.display="none";
    },2500)
})

socket.on("success", (data) => {
    const success_msg = document.getElementsByClassName("success_message")[0];

    success_msg.style.display="flex";
    setTimeout(()=>{
        success_msg.style.display="none";
    },2500)
})

socket.on("updateBalance", (data) => {
    const amount = document.getElementsByClassName("amount")[0];
    const loading = document.getElementsByClassName("loading")[0];
    const amount1 = document.getElementsByClassName("amount")[1];
    const amount2 = document.getElementsByClassName("amount")[2];
    const clicks = data.sumClicks;
    const coins = data.sumCoins;

    amount1.innerHTML=Math.round(coins).toLocaleString();
    amount2.innerHTML=Math.round(clicks).toLocaleString();
    if(!data.coins) {
        loading.style.display="none";
        return;
    }
    if(!amount) {
        return
    } else {
        amount.innerHTML=data.coins.toLocaleString();
        loading.style.display="none";
    }
})

socket.on("CreateUserTransfer", (data) => {
    const len = data.len;
    const children = [];
    const container = document.getElementsByClassName("users")[0];
    for(let i = 0; i < len; i++) {
        const photo = data.users[i].photo;
        const name = data.users[i].name;
        const coins = data.users[i].coins;
        const recepient_id = data.users[i].id;

        children.push(
            <CreateUserTransfer
                photo={photo}
                name={name}
                coins={Math.round(coins)}
                recepient_id={recepient_id}
            />
        )
    }

    ReactDOM.render(children, container);
})

socket.on("getUsersRatingMoney", (data) => {
    const children = [];
    const len = data.len;
    const users = data.users;
    const container = document.getElementsByClassName("users")[0];
    const active_button = document.getElementsByClassName("btn_clicks")[0];
    const inactive_button = document.getElementsByClassName("btn_money")[0];
    
    for(let i = 0; i < len; i++) {
        const photo = data.users[i].photo;
        const name = data.users[i].name;
        const id = data.users[i].id;
        const coins = data.users[i].coins;
        const place = i + 1;

        children.push(
            <CreateUser
                photo={photo}
                name={name}
                place={place}
                coins={Math.round(coins)}
                link={`https://vk.com/id${id}`}
            />
        )
    }

    active_button.style="background: #fff; color: #000000";
    inactive_button.style="background: rgb(249 87 87); color: #fff";
    ReactDOM.render(children, container);
})

socket.on("getUsersRatingClicks", (data) => {
    const children = [];
    const len = data.len;
    const container = document.getElementsByClassName("users")[0];
    const active_button = document.getElementsByClassName("btn_money")[0];
    const inactive_button = document.getElementsByClassName("btn_clicks")[0];
    
    for(let i = 0; i < len; i++) {
        const photo = data.users[i].photo;
        const name = data.users[i].name;
        const id = data.users[i].id;
        const clicks = data.users[i].clicks;
        const place = i + 1;

        children.push(
            <CreateUser
                photo={photo}
                name={name}
                place={place}
                coins={clicks}
                link={`https://vk.com/id${id}`}
            />
        )
    }

    active_button.style="background: #fff; color: #000000";
    inactive_button.style="background: rgb(249 87 87); color: #fff";
    ReactDOM.render(children, container);
})

setInterval(()=>{
    socket.emit("click", {
        id: id,
        params: window.location.search.slice(1),
        clicks: clicks
    })
    clicks = 0;
},1050)

export class Socket {
    getId() {
        return id;
    }
    boostx2_for_ad() {
        socket.emit("boostx2_for_ad", {
            id: id,
            params: window.location.search.slice(1)
        })
    }
    money_for_ad() {
        socket.emit("money_for_ad", {
            id: id,
            params: window.location.search.slice(1)
        })
    }
    transfer(recepient_id, amount) {
        socket.emit("transfer", {
            id: id,
            recepient_id: recepient_id,
            params: window.location.search.slice(1),
            amount: parseInt(amount)
        })
    }
    search(text) {
        socket.emit("search", {
            text: text
        })
    }
    getUsersRatingClicks() {
        socket.emit("getUsersRatingClicks");
    }
    getUsersRatingMoney() {
        socket.emit("getUsersRatingMoney");
    }
    getUsersRatingWeek() {
        socket.emit("getUsersRatingWeek");
    }
    conn() {
        bridge.send("VKWebAppGetUserInfo").then(data => {
            id = data.id;
            fullname = data.first_name+" "+data.last_name;
            photo = data.photo_200;
            if(!window.location.hash) {
                socket.emit("conn", {
                    id: id,
                    params: window.location.search.slice(1),
                    name: fullname,
                    photo: photo
                })
            } else {
                socket.emit("conn", {
                    id: id,
                    params: window.location.search.slice(1),
                    name: fullname,
                    ref: window.location.hash.slice(1),
                    photo: photo
                })
            }
        })
    }
    getBalance() {
        socket.emit("getBalance", {
            id: id,
            params: window.location.search.slice(1)
        })
    }
    click() {
        if(clicks >= 20) return;
        clicks += 1;
        const amount = document.getElementsByClassName("amount")[0];
        const newBal = coins + coins_for_click;
        coins = newBal;
        amount.innerHTML = newBal.toLocaleString();
    }
    updateBalance() {
        socket.emit("getBalance", {
            id: id,
            params: window.location.search.slice(1)
        })
    }
    buyPen() {
        socket.emit("buyPen", {
            id: id,
            params: window.location.search.slice(1)
        })
    }
    buyMicrophone() {
        socket.emit("buyMicrophone", {
            id: id,
            params: window.location.search.slice(1)
        })
    }
    buyCamera() {
        socket.emit("buyCamera", {
            id: id,
            params: window.location.search.slice(1)
        })
    }
    buyBook() {
        socket.emit("buyBook", {
            id: id,
            params: window.location.search.slice(1)
        })
    }
    buyBomb() {
        socket.emit("buyBomb", {
            id: id,
            params: window.location.search.slice(1)
        })
    }
    buyBall() {
        socket.emit("buyBall", {
            id: id,
            params: window.location.search.slice(1)
        })
    }
    buyBank() {
        socket.emit("buyBank", {
            id: id,
            params: window.location.search.slice(1)
        })
    }
    buyBus() {
        socket.emit("buyBus", {
            id: id,
            params: window.location.search.slice(1)
        })
    }
    buyCompass() {
        socket.emit("buyCompass", {
            id: id,
            params: window.location.search.slice(1)
        })
    }
    buyCar() {
        socket.emit("buyCar", {
            id: id,
            params: window.location.search.slice(1)
        })
    }
    buyBoostCoinsx2() {
        socket.emit("buyBoostCoinsx2", {
            id: id,
            params: window.location.search.slice(1)
        })
    }
}