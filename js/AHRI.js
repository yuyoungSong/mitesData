
const values = {};
var formData = new FormData();
///////////////////////////////////필수데이터//////////////////////////
// 장소중분류 관련 코드
const siteset = document.querySelector('#siteInput div input');
const siteSelect = document.querySelectorAll('.list1');
var valueText=null; //장소중분류 선택 값
siteset.addEventListener("focus", (event) => {
$('#inputDataListSection').css("display","block");
$('#inputDataListSection #site').css("display","block");

});
siteSelect.forEach(item => {
item.addEventListener('click', (event) => {
    valueText = event.target.textContent;
    // console.log(valueText);
    $('#inputDataListSection').css("display","none");
    $('#inputDataListSection #site').css("display","none");
    siteset.value = valueText;
    values["category"]=valueText;
    formData.append("category",valueText);
});
});

//집먼지진드기 코드
const mites = document.querySelectorAll('#homedust li');
mites.forEach(item => {
  item.addEventListener('click', (event) => {
    mites.forEach(element => element.classList.remove('active_button'));
    event.target.classList.add('active_button');
    values["mites"]=event.target.textContent;
    formData.append("mites",event.target.textContent);
  });
});

//숫자입력 코드
const fields = [
    {
      id: "co2",
      inputId: "co2-input",
      pId: "co2-p",
      min: 219,
      max: 3757,
    },
    {
      id: "tvoc",
      inputId: "tvoc-input",
      pId: "tvoc-p",
      min: 0,
      max: 768,
    },
    {
        id: "pm2_5",
        inputId: "pm2_5-input",
        pId: "pm2_5-p",
        min: 1,
        max: 427,
      },
      {
        id: "pm10",
        inputId: "pm10-input",
        pId: "pm10-p",
        min: 1,
        max: 537,
      },
      {
        id: "hcho",
        inputId: "hcho-input",
        pId: "hcho-p",
        min: 0,
        max: 192,
      },
      {
        id: "molds",
        inputId: "molds-input",
        pId: "molds-p",
        min: 0,
        max: 15814,
      }
  ];
  
  fields.forEach(field => {
    const inputElement = document.querySelector(`#${field.id} input`);
    const pElement = document.querySelector(`#${field.id} p`);
    // let value = null;
  
    inputElement.addEventListener("focusout", (event) => {
      const inputValue = parseFloat(inputElement.value);
  
      if (isNaN(inputValue)) {
        pElement.textContent = "";
      } else if (inputValue < field.min || inputValue > field.max) {
        pElement.textContent = "수치를 다시 확인해주세요.";
      } else {
        // value = inputValue;
        values[field.id] = inputValue;
        formData.append(field.id,inputValue);
        pElement.textContent = "";
      }
      console.log(values)
    });
  });
  

///////////////////////////////////선택데이터//////////////////////////
//지역(시도, 시군구)
const sidoset = document.querySelector('#sidoData');
var valueId=null;
var valueText1=null;
sidoset.addEventListener("focus", (event) => {
  $('#inputDataListSection').css("display","block");
  $('#inputDataListSection #sido').css("display","block");
});
const sidoSelect = document.querySelectorAll('.list2');
sidoSelect.forEach(item => {
  item.addEventListener('click', (event) => {
    valueText1 = event.target.textContent;
    valueId = event.target.id;
    values["sido"]=valueText1;
    formData.append("sido",valueText1);
    // $('#inputDataListSection').css("display","none");
    console.log("시도: ",valueText1);
    console.log(formData);
    $('#inputDataListSection #sido').css("display","none");
    $('#'+valueId+'gunGu').css("display","block");
  });
});
const sigunguset = document.querySelectorAll('.list3');
sigunguset.forEach(item => {
  item.addEventListener('click', (event) => {
    const valueText2 = event.target.textContent;
    values["sgg"]=valueText2;
    formData.append("sgg",valueText2);
    $('#inputDataListSection').css("display","none");
    $('#'+valueId+'gunGu').css("display","none");
    sidoData.value = valueText1 +" "+ valueText2;
  });
});

//성별 코드
const sex = document.querySelectorAll('#sex li');
sex.forEach(item => {
  item.addEventListener('click', (event) => {
    sex.forEach(element => element.classList.remove('active_button'));
    event.target.classList.add('active_button');
    values["sex"]=event.target.value;
    formData.append("sex",event.target.value);
  });
});

//소득수 코드
const incm = document.querySelectorAll('#incm li');
incm.forEach(item => {
  item.addEventListener('click', (event) => {
    incm.forEach(element => element.classList.remove('active_button'));
    event.target.classList.add('active_button');
    values["incm"]=event.target.value;
    formData.append("incm",event.target.value);
  });
});


//연령대 코드
const ageset = document.querySelector('#age');
const ageSelect = document.querySelectorAll('.list4');
var valueAge=null; //장소중분류 선택 값
ageset.addEventListener("focus", (event) => {
$('#inputDataListSection').css("display","block");
$('#inputDataListSection #agelist').css("display","block");
});
ageSelect.forEach(item => {
item.addEventListener('click', (event) => {
    valueText = event.target.textContent;
    // console.log(valueText);
    $('#inputDataListSection').css("display","none");
    $('#inputDataListSection #agelist').css("display","none");
    ageset.value = valueText;
    values["ageg"]=valueText;
    formData.append("ageg",valueText);
});
});


///////////////////////////////////그래프결과//////////////////////////


$("#start").click(function () {
  
  var prev =[];
  var attack=[];
  var inci=[];
  var disease = ['H10','J30','J44','J45','L20'];

// div 요소 가져오기
var chart = document.getElementById('chart_result');

// div 안에 있는 모든 p 태그 찾기
var paragraphs = chart.getElementsByTagName('svg');

// p 태그가 존재하는지 확인하고 있다면 삭제
if (paragraphs.length > 0) {
  // p 태그 삭제
  for (var i = paragraphs.length - 1; i >= 0; i--) {
    var paragraph = paragraphs[i];
    paragraph.parentNode.removeChild(paragraph);
  }
} 


  $('#resultGraphSection').css('display','flex');
  $('#loading').css('display','flex');



  console.log("formdata=========>",formData)
    var settings = {
        "url": "//175.118.126.237:5005/predict_01", // 원하는 API 엔드포인트 URL로 변경
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": formData, // FormData 객체 전달,
        "dataType":'json'
    };

    $.ajax(settings).done(function (result) {
        console.log(result);
         $('#loading').css('display','none');
        $('#chart_result').css('display','block');
        // console.log('prev===> ',Number(result.results.H10.prev.toFixed(2)));

        for( var i = 0 ;i<disease.length;i++){
          prev.push(Number(result.results[disease[i]].prev.toFixed(2)));
          attack.push(Number(result.results[disease[i]].attack.toFixed(2)));
          inci.push(Number(result.results[disease[i]].inci.toFixed(2)));
        }
        console.log(prev);

          


      var unit='%';
      var series = [{
              type: 'bar',
              
              data: prev,
              color:'#251A70',
              name:'유병률',
              dataLabels: {
                  enable: true,
                  font: {
                      size: '11pt',
                      color: 'black',
                      weight: 'bold',
                  },
                  inside:false 
              },
              
          },{
              type: 'bar',
          
              data: attack,
              color:'#4371FA',
              name:'발병룰',
              dataLabels: {
              enable: true,
                  font: {
                      
                      size: '11pt',
                      color: 'black',
                      weight: 'bold',
                  },
                  inside:false 
              }
          },{
              type: 'bar',
        
              data: inci,
              color:'#00E5FF',
              name:'발생률',
              dataLabels: {
              enable: true,
                  font: {
                      size: '11pt',
                      color: 'black',
                      weight: 'bold',
                  },
                  inside:false 
              },
          }];
      var options = {
          axisX: {
          data: ['결막염','알레르기비염','만성폐색성폐질환','천식','아토피피부염']
          },
          axisY: {
            
              title: {

                  enable: true,

                  text: unit[0],

                  align: 'right',

                  font: {

                    family: 'Arial',

                    size: '12px',

                    color: '#3B444B',

                    weight: 'bold'

                  },
              rotation:90}
          },
          legend : {
              enable :true, 
              align: 'right',
              position: 'top',
              floating: false,
              font: {
                      family: 'Arial',
                      size: '12pt',
                      color: 'black',
                      weight: 'normal'
              },

              floating : false,
              format: undefined,
              formatter: undefined,
              x: 0,
          }
      };

      var chart = new crownix.Chart('chart_result');
      chart.build(series, options);
            
     })
   
  })
///////////////////////////////////팝업에서 검은바탕누르면 종료되는거까지//////////////////////////

  $('#inputDataListSection').click(function(){
  $('#inputDataListSection').css("display","none");
  $('.popList').css("display","none");
});

$('#resultGraphSection').click(function(){
  $('#resultGraphSection').css("display","none");
  $('#chart_result').css("display","none");
});

$('.popList').click(function(event){
  // 이벤트 전파 중지
  event.stopPropagation();
});
$('#chart_result').click(function(event){
  // 이벤트 전파 중지
  event.stopPropagation();
});
