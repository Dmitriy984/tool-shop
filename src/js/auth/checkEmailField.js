export default function checkEmailField(elem) {
  if (!this.value.includes("@")) {
    this.classList.add("error");
    elem.focus();
  } else {
    this.classList.remove("error");
  }
}
