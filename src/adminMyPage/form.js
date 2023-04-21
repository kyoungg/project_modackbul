export function productForm() {
    const field =
    `<div class="addproduct-form-container">
        <form id="productForm">
            <div>
                <label for="nameInput">상품이름</label>
                <div>
                    <input
                    type="text"
                    id="nameInput"
                    required
                    >
                </div>
            </div>
            <div>
                <label for="priceInput">상품가격</label>
                <div>
                    <input
                    type="number"
                    id="priceInput"
                    required
                    >
                </div>
            </div>
            <div>
                <label for="summaryInput">상품소개</label>
                <div>
                    <input
                    type="text"
                    id="summaryInput"
                    required
                    >
                </div>
            </div>
            <div>
                <label for="companyInput">제조회사</label>
                <div>
                    <input
                    type="text"
                    id="companyInput"
                    required
                    >
                </div>
            </div>
            <!-- 카테고리 대분류, 소분류 드롭다운 버튼?-->
            <!-- 어떻게 구현해야하는지,, -->
            <div>
                <label for="category">카테고리</label>
                <div>
                    <input
                    type="text"
                    id="category_big"
                    required
                    >
                </div>
                <div>
                    <input
                    type="text"
                    id="category_small"
                    required
                    >
                </div>
            </div>
            <div>
                <label for="stockInput">재고</label>
                <div>
                    <input
                    type="number"
                    id="stockInput"
                    required
                    >
                </div>
            </div>
            <!-- 이미지를 받아와서 삽입해야함. img의 src가 변경되어야합니다! -->
            <div>
                <img src="#" class="image-box" />
                <label for="file" class="upload-btn">
                <input id="file" type="file" accept="image/*" />
                </label>
            </div>
            </div>

            <div>
                <label for="descriptionInput">상품상세</label>
                <div>
                    <input
                    type="text"
                    id="descriptionInput"
                    required
                    >
                </div>
            </div>
            <div id="editBtn"><button type="submit">등록</div>
        </form>
        </div>`;
  
    return field;
  }