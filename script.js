const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = true;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API

// Initial load of 5 photos for faster loading
let imageCount = 5;
const increasedImageCount = 30;
const apiKey = 'YOkY801aW_wMzBWXNihCD8qiNlP69NzPSjggCItkZj4'
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imageCount}`;

//Check if all Images are loaded
const imageLoaded = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        // Increase image count and refresh API Url
        imageCount = increasedImageCount;
        apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imageCount}`;
        console.log(photosArray)
    }
}

// Helper function to Set Attributes on DOM Elements
const setAtt = (element, attributes) => {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key] || 'Unsplash');
    }
}

// Create Elements For Links & Photos, Add to DOM
const displayPhotos = () => {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to full photo
        const item = document.createElement('a');
        setAtt(item, {
            href: photo.links.html,
            target: '_blank'
        })
        // Create <img> for photo
        const img = document.createElement('img');
        setAtt(img, {
            src: photo.urls.regular,
            alt: photo.description,
            title: photo.description
        })
        //Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
const getPhotos = async () => {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();         
        displayPhotos();
    } catch (error) {
        //Catch Error here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
})

// On Load
getPhotos()