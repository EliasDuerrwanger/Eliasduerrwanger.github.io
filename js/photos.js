/*
  =========================================================
  YOUR PHOTOS – edit only this file
  =========================================================
  Just drop photos into the project folders inside "images/":
    images/big-bend/  images/purdue/  images/california/  images/croatia/  images/alps/
  The website finds them automatically (any file name, .jpg / .jpeg / .png / .webp).
  Photos are shown in file-name order.
*/

const SITE = {
  // Your GitHub username. Can stay empty while the site runs on <username>.github.io.
  // Fill it in if you use your own domain later, or to preview the site on your computer.
  githubUser: "",
  // Leave empty if your repository is called <username>.github.io
  githubRepo: "",
  branch: "main",
};

/*
  Projects on the "Work" page, in this order.
  folder:  folder name inside images/
  title:   shown under the cover and as "next project"
  caption: line under the slideshow (can be "")
  cover:   optional – file name of the cover photo (otherwise the first photo is used)
  onHome:  false = photos of this project never appear on the homepage
*/
const PROJECTS = [
  {
    folder: "big-bend",
    title: "Big Bend National Park",
    caption: "Big Bend National Park, Texas",
    // cover: "ELIA4589.jpg",
  },
  {
    folder: "purdue",
    title: "Purdue",
    caption: "Purdue University, West Lafayette, Indiana",
    onHome: false,
  },
  {
    folder: "california",
    title: "California",
    caption: "California",
  },
  {
    folder: "croatia",
    title: "Croatia",
    caption: "Croatia",
  },
  {
    folder: "alps",
    title: "Alps",
    caption: "The Alps",
  },
];

/*
  Homepage: leave empty = random photo from all projects (except onHome: false).
  Or pick your favourites, e.g. ["alps/_DSF3555.jpg", "big-bend/ELIA4389.jpg"]
*/
const HOME_IMAGES = [];
