 let data;

//axios
axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json') // ( /user/12345 ) 網址
	//請求成功就會執行該 function
  .then(function (response) {
    console.log('資料已回傳');
    data = response.data.data;
    init();
  });

//選擇器
const areaList = document.querySelector('.ticketCard-area');
const searchNum = document.querySelector('#searchResult-text');
//表單選擇器
const ticketName = document.querySelector('#ticketCard-name');
const ticketImgUrl = document.querySelector('#ticketImageUrl');
const ticketAreaPlace = document.querySelector('#ticketRegion');
const ticketPrice = document.querySelector('#ticketPrice');
const ticketLevel = document.querySelector('#ticketStar');
const ticketGroup = document.querySelector('#ticketGroup');
const ticketDes = document.querySelector('#ticketDescription');
const form = document.querySelector('form');
//表單按鈕
const addBtn = document.querySelector('.addTicket-btn');
const filterLocal = document.querySelector('#regionSearch');

//初始化
function init(){
  listContentBox();
  filterLocal.value == '全部地區';
  searchNum.textContent =`本次搜尋共 ${data.length} 筆資料`;
}

function listContentBox(){
  let str = '';
  data.forEach(function(item){
    let content = `<li class="ticketCard">
    <div class="ticketCard-img">
    <a href="#">
            <img src="${item.imgUrl}" alt=""></a>
        <div class="ticketCard-region">${item.area}</div>
        <div class="ticketCard-rank">${item.rate}</div>
    </div>
    <div class="ticketCard-content">
        <div>
        <h3><a href="#" class="ticketCard-name">${item.name}</a></h3>
        <p class="ticketCard-description">${item.description}</p>
        </div>
        <div class="ticketCard-info">
        <p class="ticketCard-num">
        <span><i class="fas fa-exclamation-circle"></i></span>
        剩下最後<span id="ticketCard-num">${item.group}</span> 組</p>
        <p class="ticketCard-price">TWD<span id="ticketCard-price">$${item.price}</span></p>
        </div>
    </div>
    </li>`;
    str += content;
  });
  areaList.innerHTML = str;
}

//篩選器
function filterBox(){
  filterLocal.addEventListener('change',function(e){
    let str = '';
    let count = 0;
    data.forEach(function(item){
      if(e.target.value == '全部地區'){
        init();
        return
      }else if(e.target.value == item.area){
        count += 1;
        str += `<li class="ticketCard">
        <div class="ticketCard-img">
        <a href="#">
                <img src="${item.imgUrl}" alt=""></a>
            <div class="ticketCard-region">${item.area}</div>
            <div class="ticketCard-rank">${item.rate}</div>
        </div>
        <div class="ticketCard-content">
            <div>
            <h3><a href="#" class="ticketCard-name">${item.name}</a></h3>
            <p class="ticketCard-description">${item.description}</p>
            </div>
            <div class="ticketCard-info">
            <p class="ticketCard-num">
            <span><i class="fas fa-exclamation-circle"></i></span>
            剩下最後<span id="ticketCard-num">${item.group}</span> 組</p>
            <p class="ticketCard-price">TWD<span id="ticketCard-price">$${item.price}</span></p>
            </div>
        </div>
        </li>`;
        searchNum.textContent =`本次搜尋共 ${count} 筆資料`;
      }
      areaList.innerHTML = str;
    });
    // filterLocal.value = '地區搜尋';
  });
}
filterBox();

//新增表單
function addTicketBox(){
  addBtn.addEventListener('click',function(e){
    if(ticketLevel.value > 10 || ticketLevel.value <= 0){
      alert('星級區間是 1-10 分，請重新填寫')
      form.reset(); //清除表單內容
      return
    }
    data.push({
      id: Date.now(),//產生亂數
      name: ticketName.value,
      imgUrl: ticketImgUrl.value,
      area: ticketAreaPlace.value,
      description:ticketDes.value,
      group: Number(ticketGroup.value),
      price: Number(ticketPrice.value),
      rate:Number(ticketLevel.value)
    })
    form.reset();//清除表單內容
    init();
  })
}
addTicketBox();



