/*
  =========================================================
  YOUR PHOTOS – edit only this file
  =========================================================
  Just drop photos into the project folders inside "images/":
    images/The American Experience/  images/purdue/  images/california/  images/croatia/  images/big-bend/  images/alps/  images/Film/
  The website finds them automatically (any file name, .jpg / .jpeg / .png / .webp).
  Photos are shown in file-name order.
*/

const SITE = {
  // Needed for the custom domain eliasduerrwanger.com
  githubUser: "EliasDuerrwanger",
  githubRepo: "Eliasduerrwanger.github.io",
  branch: "main",
};

/*
  Projects on the "Work" page, in this order.
  folder:  folder name inside images/ (exactly as on GitHub, including spaces and capital letters)
  title:   shown under the cover and as "next project"
  caption: line under the slideshow (can be "")
  cover:   optional – file name of the cover photo (otherwise the first photo is used)
  onHome:  false = photos of this project never appear on the homepage
*/
const PROJECTS = [
    // 1. America
  {
    folder: "The American Experience",
    title: "America",
    caption: "America",
    // cover: "_DSF1218.jpg",
  },
  // 2. Purdue
  {
    folder: "purdue",
    title: "Purdue",
    caption: "Purdue University, West Lafayette, Indiana",
    cover: "_DSF1340.jpg",
    onHome: false,
  },
  // 3. California
  {
    folder: "california",
    title: "California",
    caption: "California",
    cover: "_DSF0355.jpg",
  },
  // 4. Croatia
  {
    folder: "croatia",
    title: "Croatia",
    caption: "Croatia",
    cover: "ELIA3982.jpg",
  },
  // 5. Big Bend
  {
    folder: "big-bend",
    title: "Big Bend National Park",
    caption: "Big Bend National Park, Texas",
    cover: "ELIA4389.jpg",
  },
  // 6. Alps
  {
    folder: "alps",
    title: "Alps",
    caption: "The Alps",
    cover: "_DSF3565.jpg",
  },
  // 7. Film
  {
    folder: "Film",
    title: "Film",
    caption: "Shot on film",
    // cover: "000029040003.jpg",
  },
];

/*
  Homepage: leave empty = random photo from all projects (except onHome: false).
  Or pick your favourites, e.g. ["alps/_DSF3555.jpg", "big-bend/ELIA4389.jpg"]
*/
const HOME_IMAGES = ["purdue/_DSF1340.jpg"];
