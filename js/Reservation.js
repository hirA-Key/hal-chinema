var getNowPlayingURL = "https://api.themoviedb.org/3/search/movie?api_key=1163a77321ef2e19206fac34c16e24f6&language=ja-JA&query=ヴァイオレット&page=1&include_adult=false";
var sumchair = 0;
var whereC ="";
console.log(getNowPlayingURL);
fetch(getNowPlayingURL)
.then(response => {
return response.json();
})
.then(data => {
var images = "";
data.results.map(movie => {
    if(location.search.split("?").length >4){
        document.getElementById("time").options[Number(location.search.split("?")[1])].selected = true;
        document.getElementById("chairs").options[Number(location.search.split("?")[2])].selected = true;
        document.getElementById("money_sum").innerHTML=Number(location.search.split("?")[2])*1000+"円";
        for(i=0;Number(location.search.split("?")[2])>i;i++){
            document.getElementById("seet").value+=location.search.split("?")[i+3]+",";
        }
    }
    images+="<img src='http://image.tmdb.org/t/p/w500"+ movie.poster_path +"' alt=''><br>";
    document.getElementById("Reservation_title").innerHTML = movie.title;
    document.getElementById("Reservation_img").innerHTML = images;
    });
})
.catch(error => {
console.log(error);
});


window.onload = function(){
        var content = "";
        var Y = ["A","B","C","D","E","F","G"];
        for (let i = 0; i < 8; i++) {
            content += "<div class='chair'>"
            for (let a = 0; a < 11; a++) {
                //座席空欄
                if(i==0 && a == 0|| a>=3 && a<=7 && i == 0){
                    content += "<div></div>"
                }
                //Y番号
                else if(i >= 1 && a == 0){
                    content += "<div>"+Y[i-1]+"</div>"
                }
                //X番号
                else if(i == 0 && a>=1 && a<=2 || i == 1 && a>=3 && a<=7 || i == 0 && a>=8 && a<=10 ){
                    content += "<div>"+a+"</div>"
                }
                //客席(以下で購入の有無の確認)
                else{
                    //購入済み
                    //<div class='chair_used'></div>
                    //X = 横番、Y = アルファベット番
                    content += "<div class='chair_unused' id='"+String(Y[i-1]+a)+"' onclick='chair_select("+String(Y[i-1]+a)+")'></div>"
                }
            }
            content += "</div>"
        }
        document.getElementById("chair_select").innerHTML = content;
};


function chair_select(a){
        if(document.getElementById(a.id).className == "chair_unused"){
            if (sumchair > document.getElementsByClassName("chair_select").length) {
                whereC +=a.id+"?";
                document.getElementById(a.id).className = "chair_select";
            }
        }
        else if(document.getElementById(a.id).className == "chair_select"){
            w = whereC.replace(String(a.id+"?"),"");
            document.getElementById(a.id).className = "chair_unused";
        }
    document.getElementById("money_sum").innerHTML=document.getElementsByClassName("chair_select").length*1000+"円";
}

function sum_chair(a) {
    sumchair = a;
}

function next() {
    var time = document.getElementById("time").value;
    var chairs = document.getElementById("chairs").value;
    console.log(document.getElementById("url").href+=time+"?"+chairs+"?"+whereC);
}
