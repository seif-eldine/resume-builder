/* global daliaApp */

window.daliaApp = {
  userLoggedIn: false,
  loggedInName: "",
  jwtToken: null,
  currentActiveSection: "firstSect",
};

window.addEventListener("load", () => {
  const firstSect = document.getElementById("firstSect");
  const secondSect = document.getElementById("secondSect");
  const thirdSect = document.getElementById("thirdSect");

  const fromFirstToSecondBtn = document.getElementById("fromFirstToSecondBtn");
  const fromSecondToThirdBtn = document.getElementById("fromSecondToThirdBtn");

  const fromSecondToFirstBtn = document.getElementById("fromSecondToFirstBtn");
  const fromThirdToSecondBtn = document.getElementById("fromThirdToSecondBtn");
  const submitBtn = document.getElementById("submitBtn");

  firstSectActive();
  enableEventListeners();
});

function firstSectActive() {
  firstSect.style.display = "block";
  secondSect.style.display = "none";
  thirdSect.style.display = "none";
}

function secondSectActive() {
  firstSect.style.display = "none";
  secondSect.style.display = "block";
  thirdSect.style.display = "none";
}

function thirdSectActive() {
  firstSect.style.display = "none";
  secondSect.style.display = "none";
  thirdSect.style.display = "block";
}

function enableEventListeners() {
  const firstNameInp = document.getElementById("firstName");
  const lastNameInp = document.getElementById("lastName");
  const ageInp = document.getElementById("age");
  const emailInp = document.getElementById("email");
  const reasonsInp = document.getElementById("reasons");
  const nextGoalInp = document.getElementById("nextGoal");
  const fillingEnjoymentInp = document.getElementById("fillingEnjoyment");
  const advicesInp = document.getElementById("advices");
  const readinessInp = document.getElementById("readiness");
  const loginBtn = document.getElementById("loginBtn");
  const usernameInp = document.getElementById("username");
  const passwordInp = document.getElementById("password");

  loginBtn.addEventListener("click", () => {
    login(usernameInp.value, passwordInp.value);
  })

  fromFirstToSecondBtn.addEventListener("click", () => {
    postData('1')
    secondSectActive()
  })

  fromSecondToThirdBtn.addEventListener("click", () => {
    postData('2')
    thirdSectActive()
  })

  fromSecondToFirstBtn.addEventListener("click", () => {
    firstSectActive()
  })

  fromThirdToSecondBtn.addEventListener("click", () => {
    secondSectActive()
  })

  submitBtn.addEventListener("click", () => {
    submitBtn.disabled = true;
    postData('3')
  })
}

function postData(stageNum) {
  const data = { stageNum, loggedInName: daliaApp.loggedInName }
  const form = document.getElementById('resume-form')
  for (const element of form.elements) {
    if (element.dataset.stage !== stageNum) continue
    data[element.name] = element.value
  }
  fetch(`/resumes/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: daliaApp.jwtToken,
    },
    body: JSON.stringify(data),
  });
}

function login(username, pass) {
  const loginSect = document.getElementById("loginSectHolder");
  const resumeSects = document.getElementById("resumeSectsHolder");

  fetch(`/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: pass,
    }),
  })
    .then(async (data) => {
      let response = await data.json();
      daliaApp.jwtToken = response.accessToken;
      window.userLoggedIn = true;
      loginSect.style.display = "none";
      resumeSects.style.display = "block";
      loggedInName = username;

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
      } = response.user.data;

      stageNum === 3
        ? thirdSectActive()
        : stageNum === 2
        ? secondSectActive()
        : firstSectActive();

      document.getElementById("firstName").value = firstName ? firstName : "";
      document.getElementById("lastName").value = lastName ? lastName : "";
      document.getElementById("age").value = age ? age : "";
      document.getElementById("email").value = email ? email : "";
      document.getElementById("reasons").value = reasons ? reasons : "";
      document.getElementById("nextGoal").value = nextGoal ? nextGoal : "";
      document.getElementById("fillingEnjoyment").value = enjoyFilling
        ? enjoyFilling
        : "";
      document.getElementById("advices").value = advices ? advices : "";
      document.getElementById("readiness").value = readiness ? readiness : "";
    })
    .catch((err) => {
      const errMsg = document.getElementById("errMsg");
      errMsg.style.display = "block";
    });
}

function localStorageValueGetter(keyStr) {
  let val = localStorage.getItem(keyStr);
  return val;
}

function localStorageValueSetter(arrOfKeys) {
  arrOfKeys.forEach((val, idx) => {
    if (idx % 2 === 0) localStorage.setItem(val, arrOfKeys[idx + 1]);
  });
}
