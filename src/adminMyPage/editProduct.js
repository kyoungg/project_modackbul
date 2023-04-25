import { productForm } from "./form.js";

const main = document.querySelector('.common')

main.innerHTML = productForm();

const nameInput = document.querySelector("#nameInput")
const priceInput = document.querySelector("#priceInput");
const summaryInput = document.querySelector("#summaryInput");
const companyInput = document.querySelector("#companyInput");
//카테고리-드롭다운 버튼 구현 방법?
const stockInput = document.querySelector("#stockInput");
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

editBtn.addEventListener('click', editProduct)

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
    //특정 상품 정보 조회하는 부분입니다~ im GET!
    // const res = await fetch(`/api/products/:name`)
    // const data = await res.json()

    const data = Data[0]

    nameInput.value = data.name;
    priceInput.value = data.price;
    summaryInput.value = data.summary;
    companyInput.value = data.company;
    stockInput.value = data.stock;
    descriptionInput.value = data.description;
    preview.src = data.img; //기존 이미지 프리뷰가 안됨...어째서?
}

async function editProduct(e) {
        e.preventDefault
    
        const name = nameInput.value;
        const price = priceInput.value;
        const summary = summaryInput.value;
        const company = companyInput.value;
        //카테고리
        const stock = stockInput.value;
        //이미지
        const description = descriptionInput.value;

        const productdata = {
            name,
            price,
            //카테고리
            description,
            summary,
            company,
            stock,
            //이미지
        };
    
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