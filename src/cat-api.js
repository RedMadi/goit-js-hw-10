import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_kbszEMZZ4RuDhF4Ji2l3qlxYjQmzA5erm1YDV8rL3yPBqz5THUCcujcH4UKXkSa4';

const pLoader = document.querySelector('.loader');
// const catInfoDiv = document.querySelector('.cat-info');

export const fetchBreeds = () => {
  Notiflix.Loading.custom(pLoader.textContent, {
    customSvgUrl:
      'https://notiflix.github.io/content/media/loading/notiflix-loading-nx-light.svg',
  });
  return axios.get('https://api.thecatapi.com/v1/breeds');
};

export const fetchCatByBreed = breedId => {
  return axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  );
};
