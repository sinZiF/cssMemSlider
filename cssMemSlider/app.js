console.log('еще делаю')
const memBlock = document.querySelector('.slide');
const sliderGroup = document.querySelector('.buttons');
let textMem = document.querySelector('.text-mem');

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

// text memes
const addText = (e, dataset) => {
    textMem.innerText = '';
    textMem.innerText = dataset;
    textMem.classList.add('animation-text')
    let timer = setTimeout(() => {
        textMem.classList.remove('animation-text')
    }, 1000)
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
                        img.classList.add('active-slide');
                    } 
                });
                // console.log(imgs)
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
            btn(ind); 
        });
        textMem.innerText = mem[0].text;
        
        // next mem
        const nodeBtns = document.querySelectorAll('.slide-buttons');
        const imgs = document.querySelectorAll('.mem');
        nextMem(nodeBtns, imgs);
        const textEvent = sliderGroup.addEventListener('click', function text(e) {
            if(!e.target.className.includes('active-slide') && e.target.className.includes('slide-buttons')) {
                textMem.innerText = '';
                addText(textMem, mem[e.target.dataset.btnId].text)
            }
            
            
            
        });

    } catch(err) {
        console.log(err)
    }
});

