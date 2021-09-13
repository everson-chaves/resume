/* Mostrar menu */
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/* Remover menu no mobile */
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* Rolar as seções */
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/* Mostrar scroll top */ 
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    if(this.scrollY >= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/* Tema light/dark */ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/* Tamanho e impressão pdf */ 
function scaleCv(){
    document.body.classList.add('scale-cv')
}

/* Remover o tamanho depois do download */ 
function removeScale(){
    document.body.classList.remove('scale-cv')
}

/* Gerar o pdf */ 
// PDF área
let areaCv = document.getElementById('area-cv')
let resumeButton = document.getElementById('resume-button')

// Opção de impressão
let opt = {
  margin:       0,
  filename:     'EversonChavesCV.pdf',
  image:        { type: 'jpeg', quality: 0.98 },
  html2canvas:  { scale: 4 },
  jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
};

// Gerar o pdf 
function generateResume(){
    html2pdf(areaCv, opt)
}

// 3 funções são chamadas quando o botão é clicado: 
resumeButton.addEventListener('click', () => {

    // 01. A class .scale-cv é adicionada ao corpo, onde é reduzida o tamanho dos elementos
    scaleCv()

    // 02. O pdf é gerado
    generateResume()


    // 03. A classe .scale-cv é removida do corpo depois de 2 segundo para voltar ao tamanho normal
    setTimeout(removeScale, 2000)

})

