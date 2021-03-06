const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value;
    searchField.value = '';
    url = `https://openlibrary.org/search.json?q=${searchValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBookDetails(data.docs));
}

// display book details;
const displayBookDetails = books => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const totalFound = document.getElementById('total-found');
    totalFound.innerHTML = '';
    const h3 = document.createElement('h3');
    if (books.length === 0) {
        h3.innerText = `No Results Found`;
        totalFound.appendChild(h3);
    }
    else {
        h3.innerText = `Total ${books.length} Books Found`;
        totalFound.appendChild(h3);
    }

    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 border-0 shadow-lg">
            <img height="300px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title text-primary">Book Name : ${book.title}</h5>
                    <h6 class="card-title">First Publish : ${book.first_publish_year}</h6>
                    <h6 class="card-title">Author : ${book.author_name?.[0] ?? 'Not Found'}</h6>
                    <h6 class="card-title">Publisher : ${book.publisher?.[0] ?? 'Not Found'}</h6>
                </div>
        </div>
            `;
        searchResult.appendChild(div);
    });
}