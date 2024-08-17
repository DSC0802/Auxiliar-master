// Utilizo un Event Listener para manejar los clicks en las secciones de galleria
//Si es una imagen abre el open Modal, sino entonces el click es en el boton addImg x lo tanto se abre el formulario de agregar la imagen 
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('gallery').addEventListener('click', function(event) {
        if (event.target.tagName === 'IMG') {
            openModal(event.target.src, event.target.alt);
        } else if (event.target.classList.contains('add-image-btn')) {
            showUploadForm();
        }
    });
});
//Funcion de mostrar la seccion dependiendo de lo tocado en el nav.
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
    
    document.getElementById('add-image-section').style.display = 'none';
}
// Funcion para mostrar el formulario de carga de imágenes.
function showUploadForm() {
    document.getElementById('add-image-section').style.display = 'block';
}
// Funcion para ocultarlo
function hideUploadForm() {
    document.getElementById('add-image-section').style.display = 'none';
}
//Funcion de Cargar  y Añadir la imagen a la galeria en que se encuentra el usuario
function uploadImage() {
    const fileInput = document.getElementById('image-file');
    const descriptionInput = document.getElementById('new-image-description');
    const galleryDiv = document.getElementById('gallery');
    //Alerta x si el usuario no elige ninguna imagen y toca el boton de subir la imagen
    if (fileInput.files.length === 0) {
        alert('Please select an image file.');
        return;
    }

    const file = fileInput.files[0];
    const description = descriptionInput.value.trim();
    const reader = new FileReader();
     // Creamos la imagen con su contenedor
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
//Funcion para Abrir el modal de Edicion de descripcion y Eliminar
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
//Funcion para cambiar entre el modo edicion y el modo vista en el modal
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
//Funcion para eliminar la imagen de la galeria
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
// Cerramos el modal luego de terminar, funcion implementada arriba
    closeModal();
}