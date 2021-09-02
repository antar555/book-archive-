const toggleSpinner=(displayStyle)=>{
    document.getElementById('spinner').style.display=displayStyle;

}
const toggleSearch=displayStyle=>{
    document.getElementById('book-details').style.display=displayStyle;
}



const searchBook=()=>{
    const searchField= document.getElementById('search-field');
    const searchText= searchField.value;
    document.getElementById('search-found').innerHTML='';
   
    toggleSpinner('block');
    toggleSearch('none');
    console.log(searchText);
    searchField.value='';
    const url=`https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res=> res.json())
        .then(data=> displaySearch(data));


}
const displaySearch=books=>{
    const searchResult= document.getElementById('search-result');
    const found= document.createElement('p');
    
    found.innerHTML=`<p> <strong>Found: ${books.docs.length} of ${books.numFound}</strong></p>`;
    const searchFound= document.getElementById('search-found');
    searchFound.appendChild(found);
   
    console.log(books.length);
    searchResult.textContent='';

    if(books.docs.length===0){
        alert('Not Found');
    }
    
    books.docs.forEach(book=>{
        console.log(book.author_name);
        const div= document.createElement('div');
        
        div.classList.add('col');
        div.innerHTML=`
        <div class="card h-100 shadow-lg">
        
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i? book.cover_i:'10909258'}-M.jpg" class="card-img-top" alt="Picture">
        <div class="card-body">
          <h5 class="card-title">Book Name: ${book.title? book.title:'Not Found'}</h5>
          <p class="card-text"><strong>Author Name:</strong> ${book.author_name? book.author_name: 'Not Found' }</p>
          <p class="card-text"><strong>First Publish Year:</strong> ${book.first_publish_year? book.first_publish_year:'Not Found'} </p>
          <p class="card-text"> <strong>Publisher:</strong> ${book.publisher? book.publisher: 'Not Found'} </p>
        </div>
      </div>
        
        `;
        searchResult.appendChild(div);
    });
    toggleSpinner('none');
    toggleSearch('block');
}