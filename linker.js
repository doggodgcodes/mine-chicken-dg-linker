// linker.js
// Injects linker.css from jsdelivr (gh) into the host page when this script is embedded
// Logs: "doggodgcodes is connected to the site btw"
(function () {
  try {
    const OWNER = 'doggodgcodes';
    const REPO = 'mine-chicken-dg-linker';
    const repoDgIo = 'doggodgcodes.github.io';

    // You can override branch and path by adding data-branch or data-path attributes to the <script> tag:
    // <script src=".../linker.js" data-branch="main" data-path="linker.css"></script>
    const currentScript = document.currentScript || (function () {
      // Fallback: find the last script element
      const scripts = document.getElementsByTagName('script');
      return scripts[scripts.length - 1];
    })();

    const branch = (currentScript && currentScript.getAttribute('data-branch')) || 'main';
    const cssPath = (currentScript && currentScript.getAttribute('data-path')) || 'linker.css';
    const cssPathDgIo = (currentScript && currentScript.getAttribute('data-path')) || 'mine-chicken-dg/app.css';

    const cdnUrl = `https://cdn.jsdelivr.net/gh/doggodgcodes/mine-chicken-dg-linker@main/linker.css`;
    const cdnUrlDg = `https://cdn.jsdelivr.net/gh/doggodgcodes/doggodgcodes.github.io@main/mine-chicken-dg/app.css`;
    const linkId = 'mine-chicken-dg-linker';

    // Prevent double injection
    if (!document.getElementById(linkId)) {
      const linkEl = document.createElement('link');
      linkEl.id = linkId;
      linkEl.rel = 'stylesheet';
      linkEl.href = cdnUrl;
      linkEl.crossOrigin = 'anonymous';
      const linkElDg = document.createElement('link');
      linkElDg.id = linkId;
      linkElDg.rel = 'stylesheet';
      linkElDg.href = cdnUrlDg;
      linkElDg.crossOrigin = 'anonymous';

      // Optional: add load/error listeners to know when CSS finishes loading
      linkEl.addEventListener('load', function () {
        try { console.log('mine-chicken-dg-linker CSS loaded'); } catch (e) {}
      });
      linkEl.addEventListener('error', function () {
        try { console.warn('mine-chicken-dg-linker CSS failed to load:', cdnUrl); } catch (e) {}
      });

      // Append to head when available, otherwise to documentElement
      (document.head || document.getElementsByTagName('head')[0] || document.documentElement).appendChild(linkEl);

      // Inform the page that the author is connected
      console.log('doggodgcodes is connected to the site btw');
    } else {
      console.log('doggodgcodes linker.css already injected');
    }
  } catch (err) {
    // Avoid breaking the host page
    try { console.error('linker.js error:', err); } catch (e) {}
  }
})();
