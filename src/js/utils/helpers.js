export function reloadPage() {
  window.location.reload();
}

export function readCookie(name) {
  const searchName = name + "=";
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i];

    while (c.charAt(0) === " ") {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(searchName) === 0) {
      return c.substring(searchName.length, c.length);
    }
  }

  return null;
}

export function deleteCookie(name) {
  const domain = window.location.hostname,
    path = "/"; // root path

  document.cookie = [
    name,
    "=",
    "; expires=" + new Date(0).toUTCString(),
    "; path=" + path,
    "; domain=" + domain,
  ].join("");
}
