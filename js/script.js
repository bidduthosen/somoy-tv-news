const loadSomoyTvNews = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try{
        const response = await fetch(url)
        const data = await response.json()
        displaySomoyTvNews(data.data.news_category)
    }
    catch(error){
        console.log(error);
    }
};

// category id displsy 
const displaySomoyTvNews = (newsfied) => {
    const somoyTvNews = document.getElementById('somoy-tv-news');
    newsfied.forEach(news => {
        const somoydiv = document.createElement('div');
        somoydiv.innerHTML = `
        <ul onclick= "loadNewsDitails('${news.category_id}')">
            <li class= "li-bg-hover rounded px-4 py-1">${news.category_name}</li>
        </ul>
        `;
        somoyTvNews.appendChild(somoydiv);
    });
    
};

const loadNewsDitails = async (categoryId) =>{
    // taggleSpinner start
    toggleSpinners(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    try{
        const response = await fetch(url)
        const data = await response.json()
        displayNewsDitails(data.data)
    }
    catch(error){
        console.log(error);
    }
};

// category ditails display
const displayNewsDitails = (categoryDitails) => {
    const newsDitails = document.getElementById('news-ditails');
    newsDitails.textContent = ``;

    // categoryDitails length Not found 
    if(categoryDitails.length == 0){
        document.getElementById('not-found').innerHTML =`<h3 class="bg-success bg-opacity-25 rounded ps-4 py-3" >Not News Found</h3>`;
    }
    else{
        document.getElementById('not-found').innerHTML =`<h3 class="bg-success bg-opacity-25 rounded ps-4 py-3">${categoryDitails.length} News Found</h3>`;

        categoryDitails.forEach(category =>{
            const  categoryDiv = document.createElement('div');
            categoryDiv.innerHTML = `
                <div onclick="loadNewsModal('${category._id}')" data-bs-toggle="modal" data-bs-target="#newsDitailsModal" class="card mb-5">
                <div class="row g-0">
                    <div class="col-md-4">
                    <img src="${category.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title pb-4">${category.title}</h5>
                    <p class="card-text text-truncate">${category.details}</p>
                        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4">
                          <div class="col-md-2 d-md-flex align-items-center">
                            <a href="#" class="mb-3 me-2">
                            <img class="author-img" src="${category.author.img ? category.author.img : 'No data found'}" alt="">
                            </a>
                          </div>
                          <div class="col-md-4 text-start">
                            <h6>${category.author.name ? category.author.name : 'No data found'}</h6> 
                            <h6 class= "d-none d-md-block">${category.author.published_date ? category.author.published_date : 'No data found'}</h6>
                          </div>
                          <ul class="nav col-sm-6 col-md-3 justify-content-center d-flex">
                          
                            <li class="ms-3"><i class="fa-solid fa-eye"></i></li>
                            <li class="ms-3">${category.total_view ? category.total_view  : 'No data found' }</li>
                          </ul>
                          <ul class="nav col-sm col-md-3 justify-content-lg-end d-md-flex">
                          <button type="button" class="btn btn-info d-none d-md-block"><i class="fa-solid fa-arrow-right"></i></button>
                          </ul>
                        </footer>
                        </div>
                    </div>
                </div>
            </div> `;
            newsDitails.appendChild(categoryDiv);
        });
    };
    // toggleSpinners stop
    toggleSpinners(false);
};

// toggle spinner ---
const toggleSpinners = isLoader => {
    const toggleLoder = document.getElementById('taggle-loader');
    if(isLoader){
        toggleLoder.classList.remove('d-none')
    }
    else{
        toggleLoder.classList.add('d-none');
    }
};

const loadNewsModal = async(id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    try{
        const response = await fetch(url)
        const data = await response.json()
        displayNewsModal(data.data[0])
    }
    catch(error){
        console.log(error);
    }
};

// modal 
const displayNewsModal = newsModal => {
    // console.log(newsModal)
    const newsModalDitails = document.getElementById('news-modal');
    newsModalDitails.innerHTML = `
    <div class="card">
        <img src="${newsModal.image_url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h4 class="card-title">Name: ${newsModal.author.name ? newsModal.author.name : 'No data avilable' }</h4>
          <h6>Title: ${newsModal.title}</h6>
          <p class="card-text">Ditails: ${newsModal.details}</p>
        </div>
        <div class="modal-footer">
          <p class="card-text">Rating: ${newsModal.rating.number ? newsModal.rating.number : ' No data avilable'}</p>
        </div>
    </div>`;
};

loadNewsDitails('05');

loadSomoyTvNews();