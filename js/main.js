var productNameInput = document.getElementById('productNameInput');//Input kolo
var productPriceInput = document.getElementById('productPriceInput');//Input kolo
var productCategoryInput = document.getElementById('productCategoryInput');//Input kolo
var productDescInput = document.getElementById('productDescInput');//Input kolo
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');
var productsContainer = [];
var currentIndex = 0;
if (localStorage.getItem('myProducts') != null) {
  productsContainer = JSON.parse(localStorage.getItem('myProducts'));
  displayProducts();// هنا عاوزاه يضيف ويعرض الاتنين مع بعض 
}
else {
  productsContainer = [];
}
// add product
function addProduct() {
  var product = {
    Name: productNameInput.value,
    Price: productPriceInput.value,
    categ: productCategoryInput.value,
    desc: productDescInput.value
  };
  //عشان اضيف منتج جديد
  productsContainer.push(product);
  //local storage
  //JSON.stringify(productsContainer)=>عشان يحولها ل string
  //myProducts=>اي اسم عادي بخزن فيه 
  localStorage.setItem('myProducts', JSON.stringify(productsContainer));
  displayProducts();//عرض المنتجات 
  clearForm();//هنا عاوزين نفضي الفورم بعد ما نضيف المنتج
}
//فانكشن لعرض المنتجات
function displayProducts() {
  var container = ``;
  for (var i = 0; i < productsContainer.length; i++) {
    container += `<tr>
    <td>${i}</td>
    <td>${productsContainer[i].Name}</td>
     <td>${productsContainer[i].Price}</td>
     <td>${productsContainer[i].categ}</td>
     <td>${productsContainer[i].desc}</td>
       <td> <button class="btn btn-outline-warning " onclick='updateProduct(${i});'>update</button> </td>
        <td> <button class="btn btn-outline-danger" onclick="deleteProduct(${i});">delete</button> </td> 
    </tr>
    `
  }
  document.getElementById('tableBody').innerHTML = container;
}
function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = "";
}
// delete product by it's index
function deleteProduct(index) {
  productsContainer.splice(index, 1);
  //هخزنهم تاني بعد المسح
  localStorage.setItem('myProducts', JSON.stringify(productsContainer));
  // هنادي  ع الفانكشن دي عشان تعرضهمرتاني بعد المسح
  displayProducts();
}
// update product 
function updateProduct(index) {
  updateBtn.classList.replace("d-none", "d-inline-block");// appear update button
  addBtn.classList.add("d-none");// hide add button
  currentIndex = index;// حزنته ف متغير عشان اعرف استخدمه في الفانكشن التانيه لاني محتاجه العنصر اللي تم التعديل عليه يرجع نفس مكانه في الأرراي بعد التعديل
  // كدا انا برجع القيم اللي محتاجه تعديل مكانها تاني في الاينبوتس عشان اقدر اضيقهم مره تانيه
  productNameInput.value = productsContainer[index].Name;
  productPriceInput.value = productsContainer[index].Price;
  productCategoryInput.value = productsContainer[index].categ;
  productDescInput.value = productsContainer[index].desc;
}
// add updated product
function addUpdatedProduct() {
  updateBtn.classList.replace("d-inline-block", "d-none");// hide update button
  addBtn.classList.remove("d-none"); // appear add button again
  //هنا هرجع اكون الاوبجكت تاني عشان اعرف اعمله اضافه بس ف نفس الايندكس
  productsContainer[currentIndex].Name = productNameInput.value;
  productsContainer[currentIndex].Price = productPriceInput.value;
  productsContainer[currentIndex].categ = productCategoryInput.value;
  productsContainer[currentIndex].desc = productDescInput.value;
  //هخزنهم تاني عشان حصل عليهم تغيير 
  localStorage.setItem('myProducts', JSON.stringify(productsContainer));
  // هعرضهم تاني بعد التعديل
  displayProducts();
  //هفضي الفورم
  clearForm();
}




