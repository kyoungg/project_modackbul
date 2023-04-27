import { productForm } from "./form.js";
import {checkAuth} from "../utils/index.js" 

const { isAdmin, token } = checkAuth()

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


//기존 데이터 받아와서 보여주는 함수
async function insertProductElement() {

  //로컬에 상품 정보가 같이 넘어왔다면
  if(localStorage.getItem('targetName')){
    const targetName = localStorage.getItem('targetName')
    
    //특정 상품 정보 조회
    //if(isAdmin){
      const data = await getProductData()
      console.log(data.data)
      const productdata = data.data
      const productId = productdata._id

      nameInput.value = productdata.name
      priceInput.value = productdata.price
      summaryInput.value = productdata.summary
      companyInput.value = productdata.company
      stockInput.value = productdata.stock
      descriptionInput.value = productdata.description
      categoryInput.value = productdata.category
      preview.src = productdata.imgPath //이미지
      
      sessionStorage.setItem('productId', productId);
    //}
    } else{ //로컬에 상품 정보가 들어있지 않다면
    alert('잘못된 경로입니다!')
    window.location.href = "/index.html"
  }
}

insertProductElement();


   //특정상품 API통신으로 조회하는 함수
 async function getProductData(){
   const targetName = localStorage.getItem('targetName')
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
  const productId = sessionStorage.getItem('productId')

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
    console.log(productId)

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