export function productForm() {
    const field =
    `<div class="container">
    <div class="addproduct-form-container">
        <form id="productForm">
            <div>
                <div class="mb-3">
                    <label for="nameInput" class="form-label">Product Name</label>
                    <input
                        type="text"
                        class="form-control"
                        id="nameInput"
                        placeholder="상품명 입력"
                        required
                        >
                </div>
            </div>
            <div>
                <div class="mb-3">
                    <label for="priceInput" class="form-label">Product Pcice</label>
                    <input
                        type="number"
                        class="form-control"
                        id="priceInput"
                        placeholder="상품가격 입력"
                        required
                        >
                </div>
            </div>
            <div>
                <div class="mb-3">
                    <label for="summaryInput" class="form-label">Product Summary</label>
                    <input
                        type="text"
                        class="form-control"
                        id="summaryInput"
                        placeholder="상품소개 작성"
                        required
                        >
                </div>
            </div>
            <div>
                <div class="mb-3">
                    <label for="companyInput" class="form-label">Company</label>
                    <input
                        type="text"
                        class="form-control"
                        id="companyInput"
                        placeholder="상품 제조회사"
                        required
                        >
                </div>
            </div>
            <div>
                <div class="mb-3"></div>
                <label for="categoryInput">Category</label>
                <input
                    type="text"
                    class="form-control"
                    id="categoryInput"
                    placeholder="상품 카테고리 입력"
                    required
                    >
        </div>
            </div>
            <div>
                <div class="mb-3">
                    <label for="stockInput" class="form-label">Product Stock</label>
                    <input
                        type="number"
                        class="form-control"
                        id="stockInput"
                        placeholder="재고입력"
                        required
                        >
                </div>
            </div>
            <div>
                <div class="mb-3">
                    <label for="file" class="form-label upload-btn">
                        <div><img src="https://cdn.icon-icons.com/icons2/2248/PNG/512/file_upload_icon_136628.png" class="image-box" /><div>
                        </label>
                    <input
                        class="form-control"
                        type="file"
                        id="file"
                        >
                </div>
              </div>
            </div>
            <div>
                <div class="mb-3">
                    <label for="descriptionInput" class="form-label">Product Description</label>
                    <input
                        type="text"
                        class="form-control"
                        id="descriptionInput"
                        placeholder=""
                        required
                        >
                </div>
                <div class="d-flex  justify-content-center">
                    <button id="addproductBtn" type="submit" class="btn btn-secondary ms-2">Edit</button>
                    <button id="cancelBtn" type="button"  class="btn btn-danger ms-2">Cancle</button>
                </div>
            </div>
        </div>
        </form> 
    </div>
`;
  
    return field;
  }