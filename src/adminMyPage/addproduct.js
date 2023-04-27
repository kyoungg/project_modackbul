import { productForm } from "./form.js";
import { checkAuth } from "../utils/index.js" 

const { isAdmin, token } = checkAuth()

//const main = document.querySelector('.common')
//main.innerHTML = productForm();

const nameInput = document.querySelector("#nameInput")
const priceInput = document.querySelector("#priceInput")
const summaryInput = document.querySelector("#summaryInput")
const companyInput = document.querySelector("#companyInput")
const stockInput = document.querySelector("#stockInput")
const descriptionInput = document.querySelector("#descriptionInput")

//등록, 취소버튼
const saveProductBtn = document.querySelector("#saveProductBtn")
const cancelBtn = document.querySelector("#cancelBtn")

//이미지 preview
const fileDOM = document.querySelector('#file')
const preview = document.querySelector('.image-box')

//해결해야 할 것들..
const fileInput = document.querySelector("#file")
const categoryInput = document.querySelector("#categoryInput")

const fileUploadBtn = document.querySelector("#fileUploadBtn")

//이미지 프리뷰 기능
fileDOM.addEventListener('change', () => {
  const imageSrc = URL.createObjectURL(fileDOM.files[0])
  preview.src = imageSrc
});

//file 저장
fileUploadBtn.addEventListener("click", () => {
  const formData = new FormData();
  // form Data 객체 생성

  formData.append("attachedImage", fileInput.files[0])
  console.log(fileInput.files[0])
})

//취소버튼 -> 관리자 페이지로 이동
cancelBtn.addEventListener("click", () => {window.location.href = "./adminMyPage";})
saveProductBtn.addEventListener("click", addProductSubmit)

async function addProductSubmit(e) {
    e.preventDefault()
    
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

    console.log(productdata)
    console.log(JSON.stringify(productdata))

    
    if(isAdmin){
      const dataJson = JSON.stringify(productdata)
      
      const apiUrl = `http://localhost:5000/api/products/add`
    
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: dataJson,
      });
      
      if (res.ok) {
          alert(`[${name}] 상품 등록에 성공하였습니다!`)
        } else {
          alert(`상품 등록에 실패하였습니다...`)
        }
    } 
  }

