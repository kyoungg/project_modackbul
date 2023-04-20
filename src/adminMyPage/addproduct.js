const nameInput = document.querySelector("#nameInput")
const priceInput = document.querySelector("#priceInput");
const summaryInput = document.querySelector("#summaryInput");
const companyInput = document.querySelector("#companyInput");
//카테고리-드롭다운 버튼 구현 방법?
const stockInput = document.querySelector("#stockInput");
const descriptionInput = document.querySelector("#descriptionInput");

const addproductBtn = document.querySelector("#addproductBtn");
const cancelBtn = document.querySelector("#cancelBtn");

//이미지 preview
const fileDOM = document.querySelector('#file');
const preview = document.querySelector('.image-box');

fileDOM.addEventListener('change', () => {
  const imageSrc = URL.createObjectURL(fileDOM.files[0]);
  preview.src = imageSrc;
});

//관리자 페이지로 이동
cancelBtn.addEventListener("click", () => {window.location.href = "./adminMyPage";});

addproductBtn.addEventListener("click", addProductSubmit);

async function addProductSubmit(e) {
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
    
    const apiUrl = `/api/products/add`
  
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: dataJson,
    });
    
    if (res.status === "응답 성공값") {
        alert(`[${name}] 상품 등록에 성공하였습니다!`)
      } else {
        alert(`[${name}] 상품 등록에 실패하였습니다...`)
      }
  }