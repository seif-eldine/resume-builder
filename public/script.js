/* global daliaApp */

window.daliaApp = {
  userLoggedIn: false,
  // loggedInName: '',
  jwtToken: null,
  currentActiveSection: 1,
}

window.addEventListener('load', () => {
  enableEventListeners()
})

function enableEventListeners() {
  const usernameInp = document.getElementById('username')
  const passwordInp = document.getElementById('password')
  
  const loginBtn = document.getElementById('loginBtn')
  const previousBtn = document.getElementById('previousBtn')
  const nextBtn = document.getElementById('nextBtn')
  const submitBtn = document.getElementById('submitBtn')

  nextBtn.addEventListener('click', () => {
    nextBtnUpdater()
  })

  previousBtn.addEventListener('click', () => {
    previousBtnUpdater()
  })

  loginBtn.addEventListener('click', () => {
    login(usernameInp.value, passwordInp.value)
  })

  submitBtn.addEventListener('click', () => {
    submitBtn.disabled = true
    postData('3')
  })
}

//Function to update the state of shown section 
function activeSectionUpdater(idxReceived){

  const firstSect = document.getElementById('firstSect')
  const secondSect = document.getElementById('secondSect')
  const thirdSect = document.getElementById('thirdSect')

  console.log("idx received", idxReceived)
  const sectsArray = [firstSect, secondSect, thirdSect]
  let counter = 1

  for (const sect of sectsArray) {
    if (idxReceived === counter) {
      sect.style.display = 'block'
      counter++
    }else{
      sect.style.display = 'none'
      counter++
    }
  }

  if (idxReceived === 1) {
    previousBtn.style.display = 'none'
    nextBtn.style.display = 'inline'
    submitBtn.style.display = 'none'
  }

  if (idxReceived === 2) {
    previousBtn.style.display = 'inline'
    nextBtn.style.display = 'inline'
    submitBtn.style.display = 'none'
  }

  if (idxReceived === 3) {
    previousBtn.style.display = 'inline'
    nextBtn.style.display = 'none'
    submitBtn.style.display = 'inline'
  }
}

function nextBtnUpdater(){
  daliaApp.currentActiveSection++
  activeSectionUpdater(Number(daliaApp.currentActiveSection))
  postData(daliaApp.currentActiveSection)
}

function previousBtnUpdater(){
  daliaApp.currentActiveSection--
  activeSectionUpdater(Number(daliaApp.currentActiveSection))
  // postData(daliaApp.currentActiveSection)
}

function postData(stageNum) {
  // const data = { stageNum, username: daliaApp.loggedInName }
  const data = { stageNum }
  const form = document.getElementById('resume-form')
  for (const element of form.elements) {
    console.log('El element', element)
    if (element.type == 'button') continue
    data[element.name] = element.value
  }
  console.log('data to backend', data)
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
      daliaApp.loggedInName = username

      const {
        age,
        email,
        firstName,
        lastName,
        nextGoal,
        reasons,
        readiness,
        enjoyFilling,
        advices,
        stageNum,
      } = response.user.data

      daliaApp.currentActiveSection = stageNum
      activeSectionUpdater(Number(stageNum))

      document.getElementById('firstName').value = firstName ? firstName : ''
      document.getElementById('lastName').value = lastName ? lastName : ''
      document.getElementById('age').value = age ? age : ''
      document.getElementById('email').value = email ? email : ''
      document.getElementById('reasons').value = reasons ? reasons : ''
      document.getElementById('nextGoal').value = nextGoal ? nextGoal : ''
      document.getElementById('fillingEnjoyment').value = enjoyFilling
        ? enjoyFilling
        : ''
      document.getElementById('advices').value = advices ? advices : ''
      document.getElementById('readiness').value = readiness ? readiness : ''
    })
    .catch((err) => {
      const errMsg = document.getElementById('errMsg')
      errMsg.style.display = 'block'
    })
}

function localStorageValueGetter(keyStr) {
  let val = localStorage.getItem(keyStr)
  return val
}

function localStorageValueSetter(arrOfKeys) {
  arrOfKeys.forEach((val, idx) => {
    if (idx % 2 === 0) localStorage.setItem(val, arrOfKeys[idx + 1])
  })
}
