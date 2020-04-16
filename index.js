const start = () => {
  const selector = document.getElementById("movies");
  const movieSelect = document.getElementById("movieSelect").value;
  const URL = `http://www.omdbapi.com/?apikey=b064d5d9&s=${movieSelect}`;

  fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .then((response) => {
      let movie = response.Search;
      selector.innerHTML = "";
      for (let i = 0; i < 6; i++) {
      const infoURL = `http://www.omdbapi.com/?apikey=b064d5d9&i=${movie[i].imdbID}`;
        fetch(infoURL)
        .then((response1) => response1.json())
        .then((response1) => {
          return response1;
        })
        .then((response1) => {
          showMovies(
            selector,
            movie[i].Poster,
            movie[i].Title,
            response1.Released,
            movie[i].imdbID,
            response1.Plot,
            );
          observerAnimation();
          })
          }
          })
    .catch((error) => console.error(error));
};

const showMovies = (selector, poster, name, date, id, resume) => {
  selector.innerHTML += `
      <div class="card m-5 col-md-7 mx-auto obs">
        <div class="row"> 
          <img src="${poster}" style="max-height:250px;" class="col-md-auto my-3 d-flex align-self-center flex-column">
          <div class="col-md-5 m-3 d-flex align-self-center flex-column">
            <h4 class="text-center text-info p-2 font-weight-bold"> ${name}</h4>
            <p class="p-2 text-center">Release date : ${date}</p>
            <button type="button" class="btn btn-info btn-block mt-5 p-2" data-toggle="modal" data-target="#${id}Modal" id="info"> Read more</button>
          </div>
        </div>
      </div>
      <div class="modal fade" id="${id}Modal" tabindex="-1" role="dialog" aria-labelledby="${id}ModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="${id}ModalLabel">${name}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row"> 
                <img src="${poster}" style="max-height:250px;" class="col-md-auto my-3 d-flex align-self-center flex-column">
                <div class="col-md-5 m-3 d-flex align-self-center flex-column">
                  <h4 class="text-center text-info p-2 font-weight-bold"> ${name}</h4>
                  <p class="p-2 text-center">Date de sortie : ${date}</p>
                  <p>${resume}</p>
                </div>
            </div>
          </div>
          <div class="modal-footer mx-auto">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <a type="button" href="https://videospider.stream/personal?key=B6BOiL05fieBJ3HP&video_id=${id}" target="_blank" class="btn btn-warning">Stream</a>
        </div>
        </div>
      </div>
  `;
};


const observerAnimation = () =>{
let observer = new IntersectionObserver(
  function (observables) {
    observables.forEach(function (observable) {
      if (observable.intersectionRatio > 0.5) {
        observable.target.classList.remove("invisible");
        observer.unobserve(observable.target);
      }
    });
  },
  {
    threshold: [0.5],
  }
  );
  
  let items = document.querySelectorAll(".obs");
  items.forEach(function (item) {
    item.classList.add("invisible");
    observer.observe(item);
  });
}

document.getElementById("valid").addEventListener("click", start);