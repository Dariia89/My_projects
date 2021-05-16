class Form {
  constructor(...args) {
    this.correctAnswers = {
      name: new RegExp(/^[a-zа-яё]+$/i),
      tel: new RegExp(/\+7\(?[0-9]{3}\)?[0-9]{3}-?[0-9]{4}/g),
      email: new RegExp(/([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,4})/ig),
      age: new RegExp('[0-9]{1,3}') };

    this.inputArr = [...args]; // array with the names of inputs
    this.correct = this.checkInput(this.inputArr);
  }

  checkInput(arr) {
    arr.forEach(input => {
      let inputEl = document.querySelector(`#${input}`);
      for (let key in this.correctAnswers) {
        if (key === inputEl.id) {
          this.checkIfCorrect(this.correctAnswers[key], inputEl);
        }
      }
    });
  }
  checkIfCorrect(correct, input) {
    let value = input.value;
    if (value.match(correct)) {
      input.classList.add("correct");
      input.classList.remove("wrong");
    } else {
      input.classList.add("wrong");
      input.classList.remove("correct");
      alert(`Check ${input.id} again`);
    }
  }}


let btn = document.querySelector("#submit");
btn.addEventListener("click", () => {
  let form = new Form("age", "name", "email", "tel");
});