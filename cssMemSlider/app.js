console.log('cssMemSlider')
const memBlock = document.querySelector('.slide');
const sliderGroup = document.querySelector('.buttons');

const createMemSlider = (src, imgClass, alt, ind) => {
    const img = document.createElement('img');
    img.src = src;
    ind === 0 ? img.classList.add('active-slide', imgClass) : img.classList.add(imgClass);
    img.alt = alt;
    img.dataset.ind = ind;
    memBlock.appendChild(img);
}
// add btns

const btn = (dataId) => {
    const btn = document.createElement('div');
    dataId === 0 ? btn.classList.add('active-btn', 'slide-buttons') : btn.classList.add('slide-buttons');
    btn.dataset.btnId = dataId;
    sliderGroup.appendChild(btn);
}

// add a event button
const nextMem = (btn, imgs) => {
    sliderGroup.addEventListener('click', (e) => {
        const target = e.target;
        if (target.className.includes('slide-buttons')) {
            if (!target.className.includes('active-btn')) {
                let datasetNumber = target.dataset;
                btn.forEach(cur => cur.classList.remove('active-btn'));
                target.classList.add('active-btn')

                // add img active status
                imgs.forEach((img, ind) => {
                    img.style.display = 'none';
                    img.classList.remove('active-slide')
                    if(img.dataset.ind === target.dataset.btnId) {
                        img.style.display = 'block';
                        img.classList.add('active-slide')
                    } 
                    
                });
                console.log(imgs)
            }
    
        }
    })
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
    try {
        const mem = data.memes;
        mem.forEach((mem, ind) => {
            createMemSlider(mem.images, 'mem', mem.name, ind);
            console.log(mem)
            btn(ind);
        });

        // next mem
        const nodeBtns = document.querySelectorAll('.slide-buttons');
        const imgs = document.querySelectorAll('.mem');
        nextMem(nodeBtns, imgs);

    } catch(err) {
        console.log(err)
    }
});

