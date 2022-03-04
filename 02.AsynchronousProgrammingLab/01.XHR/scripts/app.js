function loadRepos() {
   let httpRequest = new XMLHttpRequest();
   let responseDiv = document.getElementById('res');
   let url = 'https://api.github.com/users/testnakov/repos';
   httpRequest.addEventListener('readystatechange', () => {
      if (httpRequest.readyState == 4 && httpRequest.status == 200) {
         //let repoNames = JSON.parse(httpRequest.responseText).map(e => e['name']);

         responseDiv.textContent = httpRequest.responseText;//repoNames.join(', ');
      }
   });
   httpRequest.open('GET', url);
   httpRequest.send();
}