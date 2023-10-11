// for sidebar//
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-btn');
const main =document.getElementById('main');

toggleBtn.addEventListener('click', () => {
  if (sidebar.style.left === '-250px') {
    sidebar.style.left = '0px';
     
      

  } else {
    sidebar.style.left = '-250px';
    
   
  }
});






// for fetching and display data through api//
let API ="AIzaSyChIJFgED1diOgVOT5Bqe5woJdW8zdMmvs";
async function mostpopular(){
  let res =await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&chart=mostPopular&regionCode=IN&key=${API}`);


  let data =await res.json();
  console.log(data.items);
  // Data(data.items);
  append(data.items);
}

mostpopular();


function append(data){
  let box = document.querySelector(".container");
  box.innerHTML =null;
  data.forEach(({snippet, id:{videoId} })=> {
    let img =snippet.thumbnails.high.url;
    let title =snippet.title;
    let channelTitle =snippet.channelTitle;
    let imgg=snippet.thumbnails.default.url;
    console.log(imgg);

    let div =document.createElement("div");
    let image =document.createElement("img");
    image.src=img;
    let name =document.createElement("p");
    name.innerText =title;
    let div2=document.createElement("div2");
    let icon =document.createElement("i");
    icon.innerHTML=`<img src="${imgg}" alt=""/>`;
    let Cname =document.createElement("p");
    Cname.innerText=channelTitle;
    div2.append(icon,Cname);
    div.append(image,name,div2);
    box.append(div);

    let data ={snippet,videoId};

    div.addEventListener("click",function(){
      localStorage.setItem("video",JSON.stringify(data));
      window.location.href="sidebarVideo.html";
    });
});
}


//  https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=[YOUR_API_KEY]





//  https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=[YOUR_API_KEY]




// for searching//

async function search(){
  let query =document.getElementById("query").value;
  let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${API}`);
  let data = await res.json();
  append(data.items);
}


// https://youtube.googleapis.com/youtube/v3/search?maxResults=50&q=${query}&key=${API}


let loader = document.getElementById("preloader");

window.addEventListener("load",function(){
  loader.style.display="none";

})


function voice(){
  var recognition = new webkitSpeechRecognition();
  recognition.lang="en-GB";
  recognition.onresult= function(event){
    console.log(event);
    document.getElementById("query").value = event.results[0][0].transcript;
  }
  recognition.start();
}





// profile image upload
const id2 =document.querySelector("#id2");
const myfile =document.querySelector(".my_file");
const profile =document.querySelector("#profile");

myfile.addEventListener("change",()=>{
  let reader = new FileReader();
  reader.readAsDataURL(myfile.files[0]);
  reader.addEventListener("load",()=>{
    profile.src =reader.result;
  });
});

// `<img src=${reader.result} alt="" width="100%" ; height="100%" ;background-size="cover" ; object-fit="cover";z-index="-999";margin-bottom="-3px";/>`;