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
                    <img src="Sources/CieilingLamps/Lamp1.jpg" alt="Lamp madde of wood and glass" />
                    <img src="Sources/CieilingLamps/Especial.jpg" alt="Lamp with straw  with warm light" />
                    <img src="Sources/CieilingLamps/Circular.jpg" alt="Lamp made with processed bamboo" />
                    <img src="Sources/CieilingLamps/Dos juntas.jpg" alt="Lamp made with processed bamboo" />
                    <img src="Sources/CieilingLamps/Lampara Blanca.jpg" alt="Lamp made with PVC and Straw" />
                     <img src="Sources/CieilingLamps/two.jpg" alt="Lamp made with processed bamboo" />
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
                    <img src="Sources/TableLamps/Cuadrada de paja.jpg" alt="Lamp whit bottle base and square straw shade" />
                    <img src="Sources/TableLamps/GinMare.jpg" alt="Lamp whit Gin Mare bottle base and rope lampshade" />
                    <img src="Sources/TableLamps/Tequila Rose.jpg" alt="Lamp whit Tequila Rose bottle base and canvas lampshade" />
                    <img src="Sources/TableLamps/Circular Paja.jpg" alt="Lamp whit 3-leg base and circular straw shade" />
                    <img src="Sources/TableLamps/Mesa de noche.jpg" alt="Lamp made whit Bamboo and Wood" />
                    <img src="Sources/TableLamps/Preferida.jpg" alt="Lamp made whit vintage wood and copper" />
                    <img src="Sources/TableLamps/Ron Santiago.jpg" alt="Lamp whit Ron Santiago bottle " />
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
                    <img src="Sources/Appliques/3Bottle.jpg" alt="Special applique lamp with 3 bottles" />
                    <img src="Sources/Appliques/pasillo.jpg" alt="Special applique lamp with slab and pencil holder" />
                
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
                    <img src="Sources/Ornaments/Hallowen.jpg" alt="Bottle lamp wwith decoration for Hallowen" />
                    <img src="Sources/Ornaments/EspecialKonLuz.jpg" alt="Lamp with secial decoration by Kon'Luz" />
                    <img src="Sources/Ornaments/Tuberia.jpg" alt="Night Table decoration" />
                    <img src="Sources/Ornaments/BotellaCepaso.jpg" alt="Bottle Cepaso lamp" />
                    <img src="Sources/Ornaments/bomb.jpg" alt="Oil Lamp" />
                    <img src="Sources/Ornaments/best.jpg" alt="Kettle Lamp with true plant" />
                    <img src="Sources/Ornaments/Muñeco.jpg" alt="Doll" />
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
// Función de Cargar y Añadir la imagen a la galería en la que se encuentra el usuario
function uploadImage() {
    const fileInput = document.getElementById('image-file');
    const galleryDiv = document.getElementById('gallery');

    
    if (fileInput.files.length === 0) {
        alert('Please select an image file.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    
    const description = prompt('Enter a description for the image:');
    if (description === null || description.trim() === '') {
        alert('Description is required.');
        return;
    }

    
    reader.onload = function(event) {
        const imgSrc = event.target.result;
        const imgElement = document.createElement('img');
        imgElement.src = imgSrc;
        imgElement.alt = description; 
        
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
//Funcion para guardar la imagen en el almacenamiento del navegador
function saveImage() {
    const modalImage = document.getElementById('modal-image');
    const imageUrl = modalImage.src;
    
    if (imageUrl) {
        localStorage.setItem('savedImage', imageUrl);
        alert('Image saved Successfully.');
    } 
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
        descriptionTextarea.style.display = 'none';
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