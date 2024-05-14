// Dados de exemplo dos posts
let posts = [
    {
        text: "Este é o primeiro post",
        category: "Notícias",
        images: ["https://via.placeholder.com/150", "https://via.placeholder.com/150"],
        date: "12/10/2021 12:00:00"
    },
    {
        text: "Este é o segundo post",
        category: "Dicas",
        images: ["https://via.placeholder.com/150"],
        date: "12/10/2022 12:00:00"
    },
    {
        text: "Este é o terceiro post",
        category: "Eventos",
        images: [],
        date: "12/10/2023 12:00:00"
    }
];

// Função para adicionar um novo post
function addPost(event) {
    event.preventDefault();
    const postText = document.getElementById('postText').value;
    const postCategory = document.getElementById('postCategory').value;
    const postImages = [];
    for (let i = 1; i <= 3; i++) {
        const postImageUrl = document.getElementById(`postImage${i}`).value;
        if (postImageUrl) {
            postImages.push(postImageUrl);
        }
    }
    const postDate = new Date().toLocaleString(); // Obtém a data e hora atual
    const post = { text: postText, category: postCategory, images: postImages, date: postDate };
    posts.unshift(post);
    document.getElementById('postForm').reset();
    displayPosts();
}

// Função para navegar para o próximo slide
function nextSlide() {
    const carouselInner = this.parentElement.querySelector('.carousel-inner');
    const firstItem = carouselInner.querySelector('.carousel-item');
    carouselInner.style.transition = 'transform 0.5s ease';
    carouselInner.style.transform = `translateX(-${firstItem.offsetWidth}px)`;
    setTimeout(() => {
        carouselInner.appendChild(firstItem);
        carouselInner.style.transition = 'none';
        carouselInner.style.transform = 'translateX(0)';
    }, 500);
}

// Função para navegar para o slide anterior
function prevSlide() {
    const carouselInner = this.parentElement.querySelector('.carousel-inner');
    const lastItem = carouselInner.lastElementChild;
    carouselInner.insertBefore(lastItem, carouselInner.firstElementChild);
    carouselInner.style.transition = 'none';
    carouselInner.style.transform = `translateX(-${lastItem.offsetWidth}px)`;
    setTimeout(() => {
        carouselInner.style.transition = 'transform 0.5s ease';
        carouselInner.style.transform = 'translateX(0)';
    }, 10);
}

// Função para exibir os posts
function displayPosts(categoryFilter = 'Todos') {
    const postList = document.getElementById('postList');
    postList.innerHTML = '';

    posts
        .filter(post => categoryFilter === 'Todos' || post.category === categoryFilter)
        .forEach(post => {
            const postElement = document.createElement('div');
            let imagesHtml = '';
            if (post.images.length > 0) {
                imagesHtml += `<div class="carousel">
                                    <div class="carousel-inner">`;
                post.images.forEach((image) => {
                    imagesHtml += `<div class="carousel-item"><img src="${image}" alt="Imagem do post"></div>`;
                });
                imagesHtml += `</div>
                               <button onclick="prevSlide.call(this)" class="carousel-btn carousel-btn-left">◀</button>
                               <button onclick="nextSlide.call(this)" class="carousel-btn carousel-btn-right">▶</button>
                             </div>`;
            }
            postElement.innerHTML = `
                <p>${post.text}</p>
                ${imagesHtml}
                <p><em>Categoria: ${post.category}</em></p>
                <p><em>Data e Hora: ${post.date}</em></p>
                <button onclick="editPost(${posts.indexOf(post)})"><i class="fa-solid fa-pen-to-square"></i> Editar</button>
                <button onclick="deletePost(${posts.indexOf(post)})"><i class="fa-solid fa-eraser"></i> Apagar</button>
                <hr style="margin:30px;">`;
            postList.appendChild(postElement);
        });
}

// Função para filtrar os posts por categoria
function filterPostsByCategory() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    displayPosts(categoryFilter);
}

// Adiciona um event listener para o menu suspenso
document.getElementById('categoryFilter').addEventListener('change', filterPostsByCategory);

// Função para editar um post
function editPost(index) {
    const newText = prompt("Editar post:", posts[index].text);
    if (newText !== null) {
        posts[index].text = newText;
        displayPosts();
    }
}

// Função para apagar um post
function deletePost(index) {
    const confirmDelete = confirm("Tem certeza que deseja apagar este post?");
    if (confirmDelete) {
        posts.splice(index, 1);
        displayPosts();
    }
}

// Atualiza a lista de posts quando a página carrega
window.onload = function() {
    displayPosts();
};

// Adiciona um event listener para o formulário de post
document.getElementById('postForm').addEventListener('submit', addPost);
