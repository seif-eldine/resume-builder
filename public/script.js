/* global daliaApp */

window.daliaApp = {
  userLoggedIn: false,
  jwtToken: null,
  currentActiveSection: 1,
}

window.addEventListener('load', enableEventListeners)

function enableEventListeners() {
  const usernameInp = document.getElementById('username')
  const passwordInp = document.getElementById('password')
  
  const loginBtn = document.getElementById('loginBtn')
  const previousBtn = document.getElementById('previousBtn')
  const nextBtn = document.getElementById('nextBtn')
  const submitBtn = document.getElementById('submitBtn')

  nextBtn.addEventListener('click', nextBtnUpdater)

  previousBtn.addEventListener('click', previousBtnUpdater)

  loginBtn.addEventListener('click', () => {
    login(usernameInp.value, passwordInp.value)
  })

  submitBtn.addEventListener('click', () => {
    submitBtn.disabled = true
    postData('3')
  })
}

//Function to update the state of shown section 
function activeSectionUpdater(sectionId = 1){
  const sectionSelector = `.section-${sectionId}`
  const section = document.querySelector(sectionSelector)

  document.querySelectorAll(`.section:not(${sectionSelector})`).forEach(s => s.style.display = 'none')
  section.style.display = 'block'
  nextBtn.style.display = section.dataset.nextDisplay
  previousBtn.style.display = section.dataset.previousDisplay
  submitBtn.style.display = section.dataset.submitDisplay
}

function nextBtnUpdater(){
  daliaApp.currentActiveSection++
  activeSectionUpdater(Number(daliaApp.currentActiveSection))
  postData(daliaApp.currentActiveSection)
}

function previousBtnUpdater(){
  daliaApp.currentActiveSection--
  activeSectionUpdater(Number(daliaApp.currentActiveSection))
}

function postData(stageNum) {
  const data = { stageNum }
  const form = document.getElementById('resume-form')
  for (const element of form.elements) {
    if (element.type == 'button') continue
    data[element.name] = element.value
  }
  fetch(`/resumes/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: daliaApp.jwtToken,
    },
    body: JSON.stringify(data),
  })
}

function login(username, pass) {
  const loginSect = document.getElementById('loginSectHolder')
  const resumeSects = document.getElementById('resumeSectsHolder')
  const form = document.getElementById('resume-form')

  fetch(`/resumes/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: pass,
    }),
  })
    .then(async (data) => {
      let response = await data.json()
      daliaApp.jwtToken = response.accessToken
      window.userLoggedIn = true
      loginSect.style.display = 'none'
      resumeSects.style.display = 'block'

      for (let property in response.user.data) {
        for (let input of form.elements) {
          if (input.id === property) {
            input.value = response.user.data[`${property}`]
          }
        }
      }

      const { stageNum = 1 } = response.user.data
      daliaApp.currentActiveSection = stageNum
      activeSectionUpdater(Number(stageNum))
    })
    .catch(() => {
      const errMsg = document.getElementById('errMsg')
      errMsg.style.display = 'block'
    })
}