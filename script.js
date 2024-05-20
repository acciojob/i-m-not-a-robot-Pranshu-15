//your JS code here. If required.
const main = document.querySelector('main');
const h3 = document.createElement('h3');
h3.id = 'h';
h3.textContent = "Please click on the identical tiles to verify that you are not a robot.";
main.appendChild(h3);

let selectedImages = [];
let verifyButton;
let resetButton;
let para;

const renderImages = () => {
    const imageUrls = [
      'https://picsum.photos/id/237/200/300',
      'https://picsum.photos/seed/picsum/200/300',
      'https://picsum.photos/200/300?grayscale',
      'https://picsum.photos/200/300/',
      'https://picsum.photos/200/300.jpg'
    ];
  
    const duplicateIndex = Math.floor(Math.random() * 5);
    const duplicateUrl = imageUrls[duplicateIndex];
  
    const shuffledUrls = [...imageUrls, duplicateUrl].sort(() => Math.random() - 0.5);
  
    // Remove existing images
    const existingImages = main.querySelectorAll('img');
    existingImages.forEach(img => img.remove());
  
    // Create and append new images
    shuffledUrls.forEach((url, index) => {
      const img = document.createElement('img');
      img.src = url;
      img.classList.add(`img${index + 1}`);
      img.addEventListener('click', handleImageClick);
      main.appendChild(img);
    });
};

const handleImageClick = (e) => {
  const img = e.target;
  if (selectedImages.includes(img)) {
    img.classList.remove('selected');
    selectedImages = selectedImages.filter(item => item !== img);
  } else {
    img.classList.add('selected');
    selectedImages.push(img);
  }

  if (selectedImages.length === 1) {
    renderResetButton();
  } else if (selectedImages.length === 2) {
    renderVerifyButton();
  }
};

const renderResetButton = () => {
  if (!resetButton) {
    resetButton = document.createElement('button');
    resetButton.id = 'reset';
    resetButton.textContent = 'Reset';
    resetButton.addEventListener('click', resetState);
    main.appendChild(resetButton);
  }
};

const renderVerifyButton = () => {
  if (!verifyButton) {
    verifyButton = document.createElement('button');
    verifyButton.id = 'verify';
    verifyButton.innerHTML = 'Verify';
    verifyButton.addEventListener('click', verifyImages);
    main.appendChild(verifyButton);
  }
};

const verifyImages = () => {
  const [img1, img2] = selectedImages;
  const isIdentical = normalizeUrl(img1.src) === normalizeUrl(img2.src);

  if (para) {
    para.remove();
  }

  para = document.createElement('p');
  para.id = 'para';

  if (isIdentical) {
    para.innerText = "You are a human. Congratulations!";
    para.style.color = "green";
    console.log("Human");
  } else {
    para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
    para.style.color = "red";
    console.log("not human");
  }

  main.appendChild(para);
  verifyButton.remove();
  resetButton.remove();
  resetButton = null;
  verifyButton = null;
  selectedImages = [];
};

const resetState = () => {
  selectedImages.forEach(img => img.classList.remove('selected'));
  selectedImages = [];
  if (resetButton) {
    resetButton.remove();
    resetButton = null;
  }
  if (verifyButton) {
    verifyButton.remove();
    verifyButton = null;
  }
  if (para) {
    para.remove();
    para = null;
  }
  renderImages();
};

const normalizeUrl = (url) => {
  return url.split('?')[0];
};

renderImages();
