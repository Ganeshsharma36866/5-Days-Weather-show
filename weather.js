import axios from 'axios';
import moment from 'moment'

let data = [];
let dates = ""
let reduce = [];
let uniq = []
let time2 = []
let temp = document.getElementById("temp")
let icon = document.getElementById("icon");
let date = document.getElementById("Date");
let temp1 = document.getElementById("temp1")
let icon1 = document.getElementById("icon1");
let date1 = document.getElementById("Date1");
let temp2 = document.getElementById("temp2")
let icon2 = document.getElementById("icon2");
let date2 = document.getElementById("Date2");
let temp3 = document.getElementById("temp3")
let icon3 = document.getElementById("icon3");
let date3 = document.getElementById("Date3");
let temp4 = document.getElementById("temp4")
let icon4 = document.getElementById("icon4");
let date4 = document.getElementById("Date4");
function getData(city) {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ebeb44a401b24b4ee7ae034c30a24ecc`)
        .then(response => {
            data = response;
            weather(data.data);
            //console.log(data.data)

            //console.log(response.data.list[0].main.temp);
        }
        ).catch(err => console.log(err))
}
document.getElementById("submit").addEventListener("click", (e) => {
    let serarch = document.getElementById("search").value;
    getData(serarch);
})

function weather(city) {
    //console.log(data.data.list[0].weather[0].description)
    //summary.innerHTML = (data.data.list[0].weather[0].description)
    document.getElementById("h2").innerHTML = "City: " + data.data.city.name
    //temp.innerHTML = valNum - 273 + "-°C";
    //let icon1 = data.data.list[i].weather[0].icon;
    let dateArray = data.data.list.map((data, index) => (new Date(data.dt_txt).toISOString().slice(0, 10).replace(/-/g, "-")))
    let uniqueArray = dateArray.filter(function (elem, pos) {
        return dateArray.indexOf(elem) == pos;
    });
    uniq = uniqueArray;
    const changeDate = (d) => {
        let myDate = new Date(d).toISOString().slice(0, 10).replace(/-/g, "-")
        return myDate
    }
    let reduceData = []
    reduceData = data.data.list?.reduce(
        (accumulator, current) => {
            const updatedData = data.data.list.filter(
                listDate => changeDate(listDate.dt_txt) === changeDate(current.dt_txt)
            );
            return { [changeDate(current.dt_txt)]: updatedData, ...accumulator };
        },
        {})
    reduce = reduceData
    let keys = Object.keys(reduceData)
    console.log(keys)
    //console.log(reduceData["2022-02-10"][0].weather[0].main)
    //var img = document.createElement("img");
    //img.src = "clouds.png";
    // icon.appendChild(img);
    if (reduceData[keys[5]][0].weather[0].main == 'Clear') {
        var IMG = document.createElement("IMG");
        IMG.setAttribute("src", "/sun.png")
        IMG.setAttribute("width", "50px");
        IMG.setAttribute("height", "50px");
        icon.appendChild(IMG);
      
        // console.log(reduceData[keys[0]][0].weather[0].main)
    }
    else {
        var IMG = document.createElement("IMG");
        IMG.setAttribute("src", "/clouds.png")
        IMG.setAttribute("width", "50px");
        IMG.setAttribute("height", "50px");
        icon.appendChild(IMG);
        //console.log(reduceData[keys[0]][0].weather[0].main)  
    }
    if (reduceData[keys[4]][0].weather[0].main == 'Clear') {
        var IMG = document.createElement("IMG");
        IMG.setAttribute("src", "/sun.png")
        IMG.setAttribute("width", "50px");
        IMG.setAttribute("height", "50px");
        icon1.appendChild(IMG);
        //console.log(reduceData[keys[1]][0].weather[0].main)
        //console.log(reduceData[keys[3]][0].weather[0].main)
    }
    else {
        var IMG = document.createElement("IMG");
        IMG.setAttribute("src", "/clouds.png")
        IMG.setAttribute("width", "50px");
        IMG.setAttribute("height", "50px");
        icon1.appendChild(IMG);
        console.log(reduceData[keys[3]][0].weather[0].main)
    }

    if (reduceData[keys[3]][0].weather[0].main == 'Clear') {
        var IMG = document.createElement("IMG");
        IMG.setAttribute("src", "/sun.png")
        IMG.setAttribute("width", "50px");
        IMG.setAttribute("height", "50px");
        icon2.appendChild(IMG);
        console.log(reduceData[keys[3]][0].weather[0].main)
    }
    else {
        var IMG = document.createElement("IMG");
        IMG.setAttribute("src", "sun.png")
        IMG.setAttribute("width", "50px");
        IMG.setAttribute("height", "50px");
        icon2.appendChild(IMG);
        console.log(reduceData[keys[3]][0].weather[0].main + "icon2")
    }
    if (reduceData[keys[2]][0].weather[0].main == 'Clear') {
        var IMG = document.createElement("IMG");
        IMG.setAttribute("src", "/sun.png")
        IMG.setAttribute("width", "50px");
        IMG.setAttribute("height", "50px");
        icon3.appendChild(IMG);
    }
    else {
        var IMG = document.createElement("IMG");
        IMG.setAttribute("src", "/sun.png")
        IMG.setAttribute("width", "50px");
        IMG.setAttribute("height", "50px");
        icon3.appendChild(IMG);
        console.log("icon3")
    }
    if (reduceData[keys[1]][0].weather[0].main == 'Clear') {
        var IMG = document.createElement("IMG");
        IMG.setAttribute("src", "/sun.png")
        IMG.setAttribute("width", "50px");
        IMG.setAttribute("height", "50px");
        icon4.appendChild(IMG);
        console.log("icone4")
    }
    else {
        var IMG = document.createElement("IMG");
        IMG.setAttribute("src", "/sun.png")
        IMG.setAttribute("width", "50px");
        IMG.setAttribute("height", "50px");
        icon4.appendChild(IMG);
    }

    console.log(reduce)

    date.innerHTML = uniqueArray[0]
    date1.innerHTML = uniqueArray[1]
    date2.innerHTML = uniqueArray[2]
    date3.innerHTML = uniqueArray[3]
    date4.innerHTML = uniqueArray[4]
    let te = reduceData[keys[0]][0].main.temp - 273;
    temp.innerHTML = parseInt(te) + " °C"
    let te1 = reduceData[keys[1]][0].main.temp - 273;
    temp1.innerHTML = parseInt(te1) + " °C"
    let te2 = reduceData[keys[2]][0].main.temp - 273;
    temp2.innerHTML = parseInt(te2) + " °C"
    let te3 = reduceData[keys[3]][0].main.temp - 273;
    temp3.innerHTML = parseInt(te3) + " °C"
    let te4 = reduceData[keys[4]][0].main.temp - 273;
    temp4.innerHTML = parseInt(te4) + " °C";
    //console.log(reduceData["2022-02-10"])
    //let valNum = parseInt(valNum);
    //uniqueArray[i]
    //valNum - 273 + "-°C"
    //console.log(reduceData["2022-02-10"][0].main.temp);

}
document.getElementById("icon").addEventListener("click", (e) => {

    dates = document.getElementById("Date").innerHTML;
    console.log(dates)
    show()

})
document.getElementById("icon1").addEventListener("click", (e) => {
    console.log(dates)
    dates = document.getElementById("Date1").innerHTML
    show()
})
document.getElementById("icon2").addEventListener("click", (e) => {
    dates = document.getElementById("Date2").innerHTML
    show()

})
document.getElementById("icon3").addEventListener("click", (e) => {
    dates = document.getElementById("Date3").innerHTML
    show()

})
document.getElementById("icon4").addEventListener("click", (e) => {
    dates = document.getElementById("Date4").innerHTML
    show()
})
function show(filter) {
    let date = document.getElementById("Date").value;
    let date1 = document.getElementById("Date1").value;
    let date2 = document.getElementById("Date2").value;
    let date3 = document.getElementById("Date3").value;
    let date4 = document.getElementById("Date4").value;
    console.log(reduce)
    let row = " ";
    const handleTime = (dataD) => {
        let data = new Date(dataD)
        let hrs = data.getHours()
        let mins = data.getMinutes()
        if (hrs <= 9)
            hrs = '0' + hrs
        if (mins < 10)
            mins = '0' + mins
        const postTime = hrs + ':' + mins
        return postTime
    }

    function timeConversion(s) {
        let hour = parseInt(s.substring(0, 2));
        hour = s.indexOf('AM') > - 1 && hour === 12 ? '00' : hour;
        hour = s.indexOf('PM') > - 1 && hour !== 12 ? hour + 12 : hour;
        hour = hour < 10 && hour > 0 ? '0' + hour : hour;
        console.log(hour + s);
        return hour + s.substring(13, 21);
    }
    //var hours = reduce[dates].dt_txt.getHours() > 12 ? date.getHours() - 12 : reduce[dates].dt_txt.getHours();
    //var am_pm = reduce[dates].dt_txt.getHours() >= 12 ? "PM" : "AM";
    // hours = hours < 10 ? "0" + hours : hours;
    let finalTime;
    let table = document.getElementById("tab");
    const time = reduce[dates].map((li, i) => (moment(li.dt_txt).format("hh:mm:ss A")))
    // const time = reduce[dates].map((li, i) => (new Date(li.dt_txt).getTime().toLocaleString()))
    console.log("time ", time)
    // let time1=time;
    //  let AmOrPm=""
    // for( let i=0; i<time1.length;i++){
    //     time1[i]= (time1[i] % 12) || 12;
    //     AmOrPm= time1[i] > 12 ? 'pm' : 'am';  
    //     finalTime =  time1
    // }
    // console.log(time) 
    //console.log(finalTime)
    //let convert24hourTo12HourFormat = (time) => {
    // time = time[0].split(":");
    ////let ampm = 'AM';
    // (time[0] >= 12) {
    //   ampm = 'PM';
    //}
    // if (time[0] > 12) {
    //     time[0] = time[0] - 12;
    // }
    // const formatted_time = time[0] + ':' + time[1] + ':' + time[2] + ' ' + ampm;
    //   //return formatted_time;
    // }
    //moment(time, 'hh:mm a').format('hh:mm a')
    //var am_pm = date.getHours() >= 12 ? "PM" : "AM";
    //   hours = hours < 10 ? "0" + hours : hours;

    for (let i = 0; i < reduce[dates].length; i++) {
        let valNum = reduce[dates][i].main.temp - 273
        valNum = parseInt(valNum);
        // let ur=(time[i] < 12) ?  "AM" : "PM"
        row += `<tr>
               <td>${time[i]}</td>
               <td>${valNum} °C</td>
               <td>${reduce[dates][i].weather[0].description}</td>
               </tr>`
    }
    table.innerHTML = row;

}
