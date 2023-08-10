import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
const pLoader = document.querySelector('.loader');
const error = document.querySelector('.error');

pLoader.classList.add('is-hidden');
error.classList.add('is-hidden');

function showLoader() {
  Notiflix.Loading.custom(pLoader.textContent, {
    customSvgUrl:
      'https://notiflix.github.io/content/media/loading/notiflix-loading-nx-light.svg',
  });
}

function hideLoader() {
  pLoader.classList.add('is-hidden');
  Notiflix.Loading.remove();
}

function showError(message) {
  error.textContent = message;
  // error.classList.remove('is-hidden');
  Notiflix.Notify.failure(message);
}

function hideError() {
  error.classList.add('is-hidden');
}
showLoader();

fetchBreeds()
  .then(
    response => response.data
    // response => {
    //   console.log(response.data);
    //   return response.data;
    // }
  )
  .then(breeds => {
    hideLoader();
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  })
  .catch(error => {
    hideLoader();
    showError('Failed to fetch cat breeds.');
  });

breedSelect.addEventListener('change', event => {
  const selectedBreedId = event.target.value;
  // const selectedBreedId = 'nonexisting';
  showLoader();
  hideError();

  fetchCatByBreed(selectedBreedId)
    .then(catResponse => {
      hideLoader();
      if (!catResponse) {
        showError('Failed to fetch cat by breed.');
        return;
      }
      const { breeds, url: image } = catResponse.data[0];
      catInfoDiv.innerHTML = `
  <div style="max-width: 600px;">
    <img src="${image}" alt="${breeds[0].name}" style="max-width: 100%; margin-top: 20px;">
    <h3>${breeds[0].name}</h3>
    <p><strong>Description:</strong> ${breeds[0].description}</p>
    <p><strong>Temperament:</strong> ${breeds[0].temperament}</p>
  </div>
`;
    })
    .catch(error => {
      hideLoader();
      showError('Failed to fetch cat by breed.');
    });
});
