const loadSomoyTvNews = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const response = await fetch(url)
    const data = await response.json()
    displaySomoyTvNews(data.data.news_category)
};

const displaySomoyTvNews = (newsfied) => {
    // console.log(newsfied);
    const somoyTvNews = document.getElementById('somoy-tv-news');
    newsfied.forEach(news => {
        const somoydiv = document.createElement('div');
        somoydiv.innerHTML = `
        <ul onclick= "loadNewsDitails('${news.category_id}')">
            <li>${news.category_name}</li>
        </ul>
        `;
        somoyTvNews.appendChild(somoydiv);
    });
    
};
const loadNewsDitails = async (categoryId) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    const response = await fetch(url)
    const data = await response.json()
    displayNewsDitails(data.data)

};
const displayNewsDitails = (categoryDitails) => {
    const newsDitails = document.getElementById('news-ditails');
    newsDitails.textContent = ``;
    categoryDitails.forEach(category =>{
        console.log(category)
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
            <div class="card mb-5">
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${category.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title">${category.title}</h5>
                <p class="card-text">${category.details.slice(0, 400)}</p>
                    <footer class="d-md-flex flex-wrap justify-content-between align-items-center py-3 my-4">
                      <div class="col-sm-12 col-md-2 d-md-flex align-items-center">
                        <a href="#" class="mb-3 me-2 mb-md-0 text-decoration-none">
                        <img class="h-50 w-50 rounded-5" src="${category.author.img}" alt="">
                        </a>
                      </div>
                      <div class="col-sm-12 col-md-4 text-md-start">
                        <h6>${category.author.name}</h6> 
                        <h6>${category.author.published_date}</h6>
                      </div>
                      <ul class="nav col-sm-12 col-md-3 justify-content-md-center d-md-flex">
                      
                        <li class="ms-3"><i class="fa-solid fa-eye"></i></li>
                        <li class="ms-3">${category.rating.number}M</li>
                      </ul>
                      <ul class="nav col-sm col-md-3 justify-content-lg-end d-md-flex">
                      <button type="button" class="btn btn-info"><i class="fa-solid fa-arrow-right"></i></button>
                      </ul>
                    </footer>
                    </div>
                </div>
            </div>
        </div>
        
        `;
        newsDitails.appendChild(categoryDiv)

    });
};

loadSomoyTvNews()