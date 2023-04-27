import { productForm } from "./form.js";

const main = document.querySelector('.common')

main.innerHTML = productForm();

const nameInput = document.querySelector("#nameInput")
const priceInput = document.querySelector("#priceInput");
const summaryInput = document.querySelector("#summaryInput");
const companyInput = document.querySelector("#companyInput");
const categoryInput = document.querySelector("#categoryInput")
const stockInput = document.querySelector("#stockInput");
const fileInput = document.querySelector("#file")
const descriptionInput = document.querySelector("#descriptionInput");

const editBtn = document.querySelector("#addproductBtn");
const cancelBtn = document.querySelector("#cancelBtn");

//이미지 preview
const fileDOM = document.querySelector('#file');
const preview = document.querySelector('.image-box');

fileDOM.addEventListener('change', () => {
  const imageSrc = URL.createObjectURL(fileDOM.files[0]);
  preview.src = imageSrc;
});

//수정버튼 클릭시
editBtn.addEventListener('click', editProductData)

//취소버튼 클릭시
cancelBtn.addEventListener('click', () => {
    window.location.href = "/admin-productListPage";
})


//난 더미데이터, 나중에 지워주세용
const Data = [
    {
      name: "포근 담요",
      price: 12000,
      //category: 대분류,소분류
      description: "뉴질랜드 양 티미의 털로 만든 가로세로 1cm 양털 담요입니다",
      summary: "양털로 만든 담요",
      company: "sad sheep",
      stock: 20,
      img : "https://stock.adobe.com/kr/templates/can-mockup/591789500"
    },
  ];

  insertProductElement();

//기존 데이터 받아와서 보여주는 함수
async function insertProductElement() {

  //로컬에 상품 정보가 같이 넘어왔다면
  if(localStorage.getItem('targetName')){
    const targetName = localStorage.getItem('targetName')
    
    //특정 상품 정보 조회
    if(isAdmin){
      const data = await getProductData()
      const productdata = data.data
      console.log(productdata.imgPath) //이미지 출력 안됨
    }

  } else{ //로컬에 상품 정보가 들어있지 않다면
    alert('잘못된 경로입니다!')
    window.location.href = "/index.html"
  }
  const productdata = Data[0]

  nameInput.value = productdata.name
  priceInput.value = productdata.price
  summaryInput.value = productdata.summary
  companyInput.value = productdata.company
  stockInput.value = productdata.stock
  descriptionInput.value = productdata.description
  companyInput.value = productdata.category
  preview.src = productdata.imgPath //기존 이미지 프리뷰가 안됨...어째서?
}

async function editProduct(e) {
        e.preventDefault
    
        const name = nameInput.value
        const price = priceInput.value
        const summary = summaryInput.value
        const company = companyInput.value
        const category = categoryInput.value
        const stock = stockInput.value
        const imagePath = fileInput.name
        const description = descriptionInput.value

        const productdata = {
            name,
            price,
            category,
            description,
            summary,
            company,
            stock,
            imagePath,
        }
    
        const dataJson = JSON.stringify(productdata)
    
        const apiUrl = `/api/products/:productId`
    
        const res = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        },
        body: dataJson,
        });
    
        if (res.status === "응답성공시") {
        alert("상품 수정에 성공하였습니다!")
        } else {
        alert("상품 수정에 실패하였습니다...")
        }
    
    }

  //특정상품 API통신으로 조회하는 함수
async function getProductData(){
  const apiUrl = `http://localhost:5000/api/products/${targetName}`

  const res = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization : "bearer " + token,
    },
  });

  if (res.ok) {
    const data = await res.json()
    return data;
  } else {
    alert(`페이지 로딩이 실패했습니다...`)
  }
}

  //특정상품 정보 수정하는 함수
async function editProductData(){

  const updatedata = {
        name : nameInput.value,
        price : priceInput.value,
        category: categoryInput.value,
        description : descriptionInput.value,
        summary :summaryInput.value ,
        company : companyInput.value,
        stock : stockInput.value,
        imagePath: fileInput.name,
    }

    const updateData = JSON.stringify(updatedata)
    const apiUrl = `http://localhost:5000/api/products/${productId}`

    const res = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization : "bearer " + token,
      },
      body: updateData,
    });

    if (res.ok) {
      alert('상품 정보가 수정되었습니다!');
      window.location.reload();
  } else {
    alert('상품 정보 수정에 실패하였습니다...');
  }

}