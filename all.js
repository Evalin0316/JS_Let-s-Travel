 let data;

//axios
axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json') 
  .then(function (response) {
    console.log('資料回傳');
    data = response.data.data;
    init();
  });

//cardselector
const ticketCardarea = document.querySelector('.ticketCard-area');
const searchNum = document.querySelector('#searchResult-text');
//form
const ticketName = document.querySelector('#ticketName');
const ticketImgUrl = document.querySelector('#ticketImageUrl');
const ticketRegion = document.querySelector('#ticketRegion');
const ticketPrice = document.querySelector('#ticketPrice');
const ticketStar = document.querySelector('#ticketStar');
const ticketGroup = document.querySelector('#ticketGroup');
const ticketDescription = document.querySelector('#ticketDescription');
const form = document.querySelector('form');
//button
const addBtn = document.querySelector('.addTicket-btn');
const filterLocal = document.querySelector('#regionSearch');

//初始化
function init(){
  listContent();
  filterLocal.value == '全部地區';
  searchNum.textContent =`本次搜尋共 ${data.length} 筆資料`;
}

function listContent(){
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
  ticketCardarea.innerHTML = str;
}

//selector
function filterfn(){
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
      ticketCardarea.innerHTML = str;
    });
  });
}
filterfn();


function addTicket(){
  addBtn.addEventListener('click',function(e){
    if(ticketStar.value > 10 || ticketStar.value <= 0){
      alert('星級區間需是 1-10 分，請重新填寫')
      form.reset();
      return
    }
    data.push({
      id: Date.now(),
      name: ticketName.value,
      imgUrl: ticketImgUrl.value,
      area: ticketRegion.value,
      description:ticketDescription.value,
      group: Number(ticketGroup.value),
      price: Number(ticketPrice.value),
      rate:Number(ticketStar.value)
    })
    form.reset();//清除表單內容
    init();
  })
}
addTicket();



