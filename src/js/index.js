import './vendor';
import './components/social';
import vhFix from './vendor/vh-fix';
import header from './components/header';
import experience from './components/experience';
import preloader from './components/preloader';
import locomotive from './components/locomotiveScroll';
import lazyLoading from './modules/lazyLoading';

preloader.init();
header.init();
experience.init();
lazyLoading.init();
locomotive.init();
vhFix.init();
