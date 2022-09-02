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
        <ul onclick= "loadNewsDitails(${news.category_id})">
            <li>${news.category_name}</li>
        </ul>
        `;
        somoyTvNews.appendChild(somoydiv);
    });
    
};

loadSomoyTvNews()