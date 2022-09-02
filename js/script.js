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
            <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${category.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title">${category.title}</h5>
                <p class="card-text">${category.details.slice(0, 400)}</p>
                <img src="${category}" class="img-fluid rounded-start" alt="...">
                <p class="card-text">${category.author.published_date}</p>
                    </div>
                </div>
            </div>
        </div>
        
        
        `;
        newsDitails.appendChild(categoryDiv)

    });
};

loadSomoyTvNews()