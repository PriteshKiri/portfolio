const navBottom = document.querySelector("nav");

const aboutTop = document.querySelector("#about-top");
const about = document.querySelector("#about");

const skillsTop = document.querySelector(".tech-stack");
const skills = document.querySelector("#skills");

const projectTop = document.querySelector(".project-title");
const project = document.querySelector("#projects");

const contactTop = document.querySelector(".contact-top");
const contact = document.querySelector("#contact");

function movetoabout(e) {
  e.preventDefault();

  window.scrollTo(0, aboutTop.offsetTop - navBottom.offsetHeight);
}

function movetoskills(e) {
  e.preventDefault();

  window.scrollTo(0, skillsTop.offsetTop - navBottom.offsetHeight);
}

function movetoproject(e) {
  e.preventDefault();

  window.scrollTo(0, projectTop.offsetTop - navBottom.offsetHeight);
}

function movetocontact(e) {
  e.preventDefault();
  window.scrollTo(0, contactTop.offsetTop - navBottom.offsetHeight);
}

about.addEventListener("click", movetoabout);
skills.addEventListener("click", movetoskills);
project.addEventListener("click", movetoproject);
contact.addEventListener("click", movetocontact);
