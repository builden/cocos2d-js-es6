import {g_resources} from './resource.js';
import HelloWorldScene from './views/helloworld.js';

cc.game.es6Start = function gameStart() {
  if (!cc.sys.isNative && document.getElementById('cocosLoading')) {
    // If referenced loading.js, please remove it
    document.body.removeChild(document.getElementById('cocosLoading'));
  }

  // Pass true to enable retina display, disabled by default to improve performance
  cc.view.enableRetina(false);
  // Adjust viewport meta
  cc.view.adjustViewPort(true);
  // Setup the resolution policy and design resolution size
  cc.view.setDesignResolutionSize(450, 800, cc.ResolutionPolicy.SHOW_ALL);
  // The game will be resized when browser size change
  cc.view.resizeWithBrowserSize(true);

  // load resources
  cc.LoaderScene.preload(g_resources, () => {
    cc.director.runScene(new HelloWorldScene());
  }, this);
};
