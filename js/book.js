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
    document.getElementById('not-found').innerHTML='';
   
    toggleSpinner('block');
    toggleSearch('none');
   
    // searchField.value='';
    const url=`https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res=> res.json())
        .then(data=> displaySearch(data));


}
const displaySearch=books=>{
    const searchResult= document.getElementById('search-result');
    const found= document.createElement('p');
    
    found.innerHTML=`<p> <strong>Found: ${books.docs.slice(0, 30).length} of ${books.numFound}</strong></p>`;
    const searchFound= document.getElementById('search-found');
    searchFound.appendChild(found);
   
    console.log(books.length);
    searchResult.textContent='';

    if(books.docs.length===0){
        const notFoundDiv= document.getElementById('not-found');
        const h1= document.createElement('h1');
        h1.classList.add('text-center');
        h1.style.color='red';
        h1.innerText='Not Found';
        notFoundDiv.appendChild(h1);
    }
    
    books.docs.slice(0,30).forEach(book=>{
        // console.log(book.author_name);
        const div= document.createElement('div');
        
        div.classList.add('col');
        div.innerHTML=`
        <div class="card h-100 shadow-lg">
        
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i? book.cover_i:'10909258'}-M.jpg" class="card-img-top" alt="Picture">
        <div class="card-body">
          <h5 class="card-title">Book Name: ${book.title? book.title:'Not Found'}</h5>
          <p class="card-text"><strong>Author Name:</strong> ${book.author_name? book.author_name[0]: 'Not Found' }</p>
          <p class="card-text"><strong>First Publish Year:</strong> ${book.first_publish_year? book.first_publish_year:'Not Found'} </p>
          <p class="card-text"> <strong>Publisher:</strong> ${book.publisher? book.publisher[0]: 'Not Found'} </p>
        </div>
      </div>
        
        `;
        searchResult.appendChild(div);
        const searchField= document.getElementById('search-field');
      
        searchField.value='';

       
    });
    toggleSpinner('none');
    
    toggleSearch('block');
}