const localDeTrabalhoInput = document.querySelector('.localTrabalho');
const adicionarButton = document.querySelector('.adicionar');
const predioInput = document.querySelector(".predio");
const tbody = document.querySelector('.tbody');
const editarButton = document.querySelector('.editar');

adicionarButton.addEventListener('click', () => {
  var strUser = predioInput.options[predioInput.selectedIndex].text;
  const previousObject = JSON.parse(sessionStorage.getItem('arrLocaisTrabalho'));
  const object = {
      predio: strUser,
      localTrabalho: localDeTrabalhoInput.value,
  };
  if (previousObject) {
    sessionStorage.setItem('arrLocaisTrabalho', JSON.stringify(
      [...previousObject, object]
    ));
  } else {
    sessionStorage.setItem('arrLocaisTrabalho', JSON.stringify(
      [object]
    ));
  }
  localDeTrabalhoInput.value = '';
  listagem();
})

const listagem = () => {
  tbody.replaceChildren();
  const arrLocaisTrabalho = JSON.parse(sessionStorage.getItem('arrLocaisTrabalho'));
  arrLocaisTrabalho.map((item, index) => {
    const tr = document.createElement('tr');
    tr.id = `tr-${index}`
    const td1 = document.createElement('td');
    td1.innerText = item.predio;
    const td2 = document.createElement('td');
    td2.innerText = item.localTrabalho;
    const td3 = document.createElement('td');
    td3.className = 'three';
    const buttonEdit = document.createElement('button');
    buttonEdit.className = 'material-icons editar';
    buttonEdit.innerText = 'edit';
    buttonEdit.id = index;
    buttonEdit.addEventListener('click', () => adicionarInputs(index));
    const buttonDelete = document.createElement('button');
    buttonDelete.className = 'material-icons deletar';
    buttonDelete.innerText = 'delete';
    buttonDelete.id = index;
    buttonDelete.addEventListener('click', deletarLista);
    td3.appendChild(buttonEdit);
    td3.appendChild(buttonDelete);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tbody.appendChild(tr);
  })
}

const adicionarInputs = (index) => {
  const tr = document.querySelector(`#tr-${index}`)
  const predio = tr.children[0]
  predio.innerHTML = '<select name="predio" class="predio"><option value="predio 1">Prédio 1</option><option value="predio 2">Prédio 2</option><option value="predio 3">Prédio 3</option><option value="predio 4">Prédio 4</option><option value="predio 5">Prédio 5</option></select>'
  const valorAtual = tr.children[1].innerText
  tr.children[1].innerHTML = `<input type="text" value=${valorAtual} class="localTrabalho" />`;
  tr.children[2].innerHTML = '<td><button class="material-icons atualizar">check</button><button class="material-icons cancelar">clear</button></td>';
  const cancelar = document.querySelector('.cancelar');
  cancelar.addEventListener('click', () => listagem())
  const atualizar = document.querySelector('.atualizar');
  atualizar.addEventListener('click', () => atualizarLista(index));
};

const deletarLista = () => {
  const list = JSON.parse(sessionStorage.getItem('arrLocaisTrabalho'));
  list.splice(event.target.id, 1)
  sessionStorage.setItem('arrLocaisTrabalho', JSON.stringify(list));
  listagem();
};

const atualizarLista = (index) => {
  const locaisTrabalho = JSON.parse(sessionStorage.getItem('arrLocaisTrabalho'));
  const tr = document.querySelector(`#tr-${index}`)
  const predio = tr.children[0].firstChild
  const local = tr.children[1].firstChild
  const newValue = {
    predio: predio.options[predio.selectedIndex].text,
    localTrabalho: local.value,
  }
  locaisTrabalho.splice(index, 1);
  locaisTrabalho.splice(index, 0, newValue)

  sessionStorage.setItem('arrLocaisTrabalho', JSON.stringify(locaisTrabalho));
  
  listagem()
}

window.onload = function onload() {
  listagem()
};