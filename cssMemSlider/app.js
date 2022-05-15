console.log('cssMemSlider')
const memBlock = document.querySelector('.slide');

const createMemSlider = (src, imgClass, alt, ind) => {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add(imgClass);
    img.alt = alt;
    img.dataset.ind = ind;
    memBlock.appendChild(img);
}

const memes = async (json) => {
    try {
        const url = json;
        const res = await fetch(url)
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err)
    }
};

memes('./memes.json')
.then((data) => {
    const mem = data.memes;
    mem.forEach((mem, ind) => {
        let slide = createMemSlider(mem.images, 'mem', mem.name, ind);
    });
});



