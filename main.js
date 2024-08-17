document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('gallery').addEventListener('click', function(event) {
        if (event.target.tagName === 'IMG') {
            openModal(event.target.src, event.target.alt);
        } else if (event.target.classList.contains('add-image-btn')) {
            showUploadForm();
        }
    });
});

function showSection(section) {
    const galleryDiv = document.getElementById('gallery');
    const body = document.body;
    const header = document.getElementById('main-header');

    galleryDiv.innerHTML = '';

    let content = '';

    switch (section) {
        case 'home':
            header.textContent = 'Kon\'LuzHabana Gallery';
            body.classList.add('home-background');
            body.classList.remove('svg-background');
            break;

        case 'ceilingLamps':
            content = `
                <div class="images">
                    <img src="Sources/CieilingLamps/Lamp1.jpg" alt="Ceiling Lamp 1" />
                    <img src="https://via.placeholder.com/300x200" alt="Ceiling Lamp 2" />
                    <img src="https://via.placeholder.com/300x200" alt="Ceiling Lamp 3" />
                    <img src="https://via.placeholder.com/300x200" alt="Ceiling Lamp 4" />
                </div>
                <button class="add-image-btn">Add Image</button>
            `;
            header.textContent = 'Ceiling Lamps';
            body.classList.add('svg-background');
            body.classList.remove('home-background');
            break;

        case 'tableLamps':
            content = `
                <div class="images">
                    <img src="https://via.placeholder.com/300x200" alt="Table Lamp 1" />
                    <img src="https://via.placeholder.com/300x200" alt="Table Lamp 2" />
                    <img src="https://via.placeholder.com/300x200" alt="Table Lamp 3" />
                    <img src="https://via.placeholder.com/300x200" alt="Table Lamp 4" />
                </div>
                <button class="add-image-btn">Add Image</button>
            `;
            header.textContent = 'Table Lamps';
            body.classList.add('svg-background');
            body.classList.remove('home-background');
            break;

        case 'appliques':
            content = `
                <div class="images">
                    <img src="https://via.placeholder.com/300x200" alt="Applique 1" />
                </div>
                <button class="add-image-btn">Add Image</button>
            `;
            header.textContent = 'Appliques';
            body.classList.add('svg-background');
            body.classList.remove('home-background');
            break;

        case 'ornaments':
            content = `
                <div class="images">
                    <img src="https://via.placeholder.com/300x200" alt="Ornament 1" />
                </div>
                <button class="add-image-btn">Add Image</button>
            `;
            header.textContent = 'Ornaments';
            body.classList.add('svg-background');
            body.classList.remove('home-background');
            break;
    }

    galleryDiv.innerHTML = content;
    // Make sure 'add-image-section' is displayed as needed
    document.getElementById('add-image-section').style.display = 'none';
}

function showUploadForm() {
    document.getElementById('add-image-section').style.display = 'block';
}

function hideUploadForm() {
    document.getElementById('add-image-section').style.display = 'none';
}

function uploadImage() {
    const fileInput = document.getElementById('image-file');
    const descriptionInput = document.getElementById('new-image-description');
    const galleryDiv = document.getElementById('gallery');

    if (fileInput.files.length === 0) {
        alert('Please select an image file.');
        return;
    }

    const file = fileInput.files[0];
    const description = descriptionInput.value.trim();

    const reader = new FileReader();
    reader.onload = function(event) {
        const imgSrc = event.target.result;
        const imgElement = document.createElement('img');
        imgElement.src = imgSrc;
        imgElement.alt = description || 'New Image';

        let imagesDiv = galleryDiv.querySelector('.images');
        if (!imagesDiv) {
            imagesDiv = document.createElement('div');
            imagesDiv.classList.add('images');
            galleryDiv.appendChild(imagesDiv);
        }

        imagesDiv.appendChild(imgElement);
        hideUploadForm();
    };

    reader.readAsDataURL(file);
}

function openModal(src, alt) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalTextarea = document.getElementById('modal-textarea');

    modalImage.src = src;
    modalImage.alt = alt;
    modalDescription.textContent = alt;
    modalTextarea.value = alt;

    modal.style.display = 'block';
    document.getElementById('modal-details').classList.remove('editing');
}

function closeModal() {
    const modal = document.getElementById('image-modal');
    modal.style.display = 'none';
}

function toggleEdit() {
    const modalDetails = document.getElementById('modal-details');
    const descriptionTextarea = document.getElementById('modal-textarea');

    if (modalDetails.classList.contains('editing')) {
        const modalImage = document.getElementById('modal-image');
        modalImage.alt = descriptionTextarea.value;
        document.getElementById('modal-description').textContent = descriptionTextarea.value;
        modalDetails.classList.remove('editing');
    } else {
        modalDetails.classList.add('editing');
        descriptionTextarea.style.display = 'block';
        descriptionTextarea.focus();
    }
}

function deleteImage() {
    const modalImage = document.getElementById('modal-image');
    const galleryDiv = document.getElementById('gallery');
    const imgSrc = modalImage.src;

    const images = galleryDiv.querySelectorAll('img');
    images.forEach(img => {
        if (img.src === imgSrc) {
            img.remove();
        }
    });

    closeModal();
}