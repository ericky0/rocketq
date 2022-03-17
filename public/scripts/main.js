import Modal from './modal.js'

const modal = Modal()

// get values
const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

// functions
function handleClick(event, check = true) {
  event.preventDefault()

  const slug = check ? 'check' : 'delete'
  const roomId = document.querySelector('#room-id').dataset.id
  const questionId = event.target.dataset.id

  const form = document.querySelector('.modal form')
  form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)

  modalTitle.innerHTML = check ? 'Marcar como lida' : 'Excluir'
  modalDescription.innerHTML = check
    ? 'Tem certeza que deseja marcar como lida esta pergunta?'
    : 'Tem certeza que deseja excluir esta perguta?'
  modalButton.innerHTML = check ? 'Sim, marcar como lida' : 'Sim, excluir'

  //
  check ? modalButton.classList.remove('red') : modalButton.classList.add('red')
  // open modal
  modal.open()
}

// taking all the buttons with the class -> check
const checkButtons = document.querySelectorAll('.actions a.check')

checkButtons.forEach(button => {
  // add the listening
  button.addEventListener('click', handleClick)
})

const deleteButton = document.querySelectorAll('.actions .delete')

deleteButton.forEach(button => {
  button.addEventListener('click', event => handleClick(event, false))
})
