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

const stepConfig = {
  '1': { nextBtn: { enabled: true }, previousBtn: {}, submitBtn: {} },
  '2': { nextBtn: { enabled: true }, previousBtn: { enabled: true }, submitBtn: {} },
  '3': { nextBtn: {}, previousBtn: { enabled: true }, submitBtn: { enabled: true } }
}

//Function to update the state of shown section 
function activeSectionUpdater(idxReceived){

  const firstSect = document.getElementById('firstSect')
  const secondSect = document.getElementById('secondSect')
  const thirdSect = document.getElementById('thirdSect')

  const sectsArray = [firstSect, secondSect, thirdSect]
  let counter = 1

  for (const sect of sectsArray) {
    if (idxReceived === counter++) {
      sect.style.display = 'block'
      continue
    }
    sect.style.display = 'none'
  }

  const config = stepConfig[idxReceived]
  nextBtn.style.display = config.nextBtn.enabled ? 'inline' : 'none'
  previousBtn.style.display = config.previousBtn.enabled ? 'inline' : 'none'
  submitBtn.style.display = config.submitBtn.enabled ? 'inline' : 'none'

  // if (idxReceived === 1) {
  //   previousBtn.style.display = 'none'
  //   nextBtn.style.display = 'inline'
  //   submitBtn.style.display = 'none'
  // }

  // if (idxReceived === 2) {
  //   previousBtn.style.display = 'inline'
  //   nextBtn.style.display = 'inline'
  //   submitBtn.style.display = 'none'
  // }

  // if (idxReceived === 3) {
  //   previousBtn.style.display = 'inline'
  //   nextBtn.style.display = 'none'
  //   submitBtn.style.display = 'inline'
  // }
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

      const { stageNum } = response.user.data
      daliaApp.currentActiveSection = stageNum
      activeSectionUpdater(Number(stageNum))
    })
    .catch(() => {
      const errMsg = document.getElementById('errMsg')
      errMsg.style.display = 'block'
    })
}