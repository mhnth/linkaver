import axios from 'axios';

export const fetcherCollections = (url: string) =>
  axios.get(url).then<{ name: string; id: string }[]>((res) => {
    return res.data.collection;
  });

export const getLinks = (url: string) =>
  axios.get(url).then<{ link: string; id: string }[]>((res) => {
    return res.data.link;
  });
