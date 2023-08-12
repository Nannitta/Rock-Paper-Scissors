const tbody = document.querySelector('tbody');
const historyMatches = JSON.parse(localStorage.getItem('partida'));

historyMatches.map((match)=> {
  const tr = document.createElement('tr');
  const tdResults = document.createElement('td');
  const tdScore = document.createElement('td');
  const tdDate = document.createElement('td');

  tdResults.innerHTML = match.resultado;
  tdScore.innerHTML = match.puntuacion;
  tdDate.innerHTML = match.date;

  tr.append(tdResults);
  tr.append(tdScore);
  tr.append(tdDate);

  tbody.append(tr);
});
