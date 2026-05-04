const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const upload = document.getElementById('upload');
const download = document.getElementById('download');

// Тохиргооны хэсэг
const brightness = document.getElementById('brightness');
const contrast = document.getElementById('contrast');
const blur = document.getElementById('blur');

let img = new Image();

// 1. Зураг ачааллах
upload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        }
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

// 2. Шүүлтүүрүүдийг ажиллуулах функц
function applyFilters() {
    ctx.filter = `
        brightness(${brightness.value}%)
        contrast(${contrast.value}%)
        blur(${blur.value}px)
    `;
    ctx.drawImage(img, 0, 0);
}

// Удирдлагыг хөдөлгөхөд зураг өөрчлөгдөнө
[brightness, contrast, blur].forEach(input => {
    input.addEventListener('input', applyFilters);
});

// 3. Зургийг татаж авах
download.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'edited-photo.jpg';
    link.href = canvas.toDataURL();
    link.click();
});
