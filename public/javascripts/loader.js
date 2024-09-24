window.onload = loader;
    function loader() {
        setTimeout(() => window.scrollTo(0, 0), 100);
      let loaderPage = document.querySelector('.loader-page');
      let fill = document.querySelector('.loader-fill');
      let amount = 10;
      let interval = setInterval(loop, 10);
      function loop() {
        if (amount >= 100) {
          clearInterval(interval);
          loaderPage.style.visibility = 'hidden';
          loaderPage.style.opacity = '0'
        }else {
          amount++;
          fill.style.width = amount + '%';
        }
      }
    }