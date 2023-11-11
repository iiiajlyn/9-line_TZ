import 'es7-object-polyfill';
import $ from 'jquery';
import svg4everybody from 'svg4everybody';
import objectFitImages from 'object-fit-images';
// import objectFitVideos from 'object-fit-videos';

window.$ = $;
window.jQuery = $;
svg4everybody();
objectFitImages();
// objectFitVideos();

window.objectFitImages = objectFitImages;
// window.objectFitVideos = objectFitVideos;
