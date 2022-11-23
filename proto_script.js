const navbar = document.getElementById('navbar');
const navbar_position = navbar.offsetTop;
console.log("navbar_position: " + navbar_position);

const headtainer = document.getElementById('headtainer')
const headtainer_height = headtainer.offsetHeight;
console.log("headtainer_height: " + headtainer_height);

const heading_container = document.getElementById('heading_container');
const heading_container_height = heading_container.offsetHeight;
console.log("heading_container_height: " + heading_container_height);

const navbar_gap = heading_container_height/2 - headtainer_height;
console.log("navbar_gap :" + navbar_gap);