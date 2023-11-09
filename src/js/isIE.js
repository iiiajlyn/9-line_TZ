import './vendor';
import 'es7-object-polyfill';
import svg4everybody from 'svg4everybody';
import objectFitImages from 'object-fit-images';
// import objectFitVideos from 'object-fit-videos';

svg4everybody();
objectFitImages();
// objectFitVideos();

window.objectFitImages = objectFitImages;
// window.objectFitVideos = objectFitVideos;
