import './vendor';
import './components/social';
import vhFix from './vendor/vh-fix';
import header from './components/header';
import preloader from './components/preloader';
import locomotive from './components/locomotiveScroll';
import lazyLoading from './modules/lazyLoading';

preloader.init();
header.init();
lazyLoading.init();
locomotive.init();
vhFix.init();
