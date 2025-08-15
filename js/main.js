// Canvas Particles
const canvas=document.getElementById("bgCanvas");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;canvas.height=window.innerHeight;
let particles=[];
const colors = ["#ff9a9e", "#fad0c4", "#ff6f91", "#ffb3c1"];
class Particle{
  constructor(){this.x=Math.random()*canvas.width;this.y=Math.random()*canvas.height;this.radius=Math.random()*4+1;this.color=colors[Math.floor(Math.random()*colors.length)];this.speedX=Math.random()-0.5;this.speedY=Math.random()-0.5;}
  draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);ctx.fillStyle=this.color;ctx.fill();}
  update(){this.x+=this.speedX;this.y+=this.speedY;if(this.x<0||this.x>canvas.width)this.speedX*=-1;if(this.y<0||this.y>canvas.height)this.speedY*=-1;this.draw();}
}
function initParticles(){particles=[];for(let i=0;i<120;i++){particles.push(new Particle());}}
function animateParticles(){ctx.clearRect(0,0,canvas.width,canvas.height);particles.forEach(p=>p.update());requestAnimationFrame(animateParticles);}
initParticles();animateParticles();
window.addEventListener("resize",()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;initParticles();});

// Typed Text
const typedText=document.getElementById("typed-text");
const textArray=["Web Developer","UI/UX Enthusiast","Creative Problem Solver","Graphics Designer"];
let textIndex=0,charIndex=0,isDeleting=false;
function typeEffect(){
  const current=textArray[textIndex];
  typedText.textContent=current.substring(0,charIndex);
  if(!isDeleting && charIndex<current.length){charIndex++;setTimeout(typeEffect,100);}
  else if(isDeleting && charIndex>0){charIndex--;setTimeout(typeEffect,50);}
  else{isDeleting=!isDeleting;if(!isDeleting) textIndex=(textIndex+1)%textArray.length;setTimeout(typeEffect,1000);}
}
typeEffect();

// Smooth Scroll
document.querySelectorAll(".nav-links a").forEach(link=>{
  link.addEventListener("click",e=>{
    e.preventDefault();
    document.querySelector(link.getAttribute("href")).scrollIntoView({behavior:"smooth"});
  });
});

// Fade-in
const faders=document.querySelectorAll(".fade-in");
const appearOptions={threshold:0.2};
const appearOnScroll=new IntersectionObserver((entries,observer)=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
},appearOptions);
faders.forEach(fader=>appearOnScroll.observe(fader));

// Contact Form
document.getElementById("contact-form").addEventListener("submit",e=>{
  e.preventDefault();
  alert("Thanks for reaching out! I will get back to you soon.");
});

// Active Nav Link
const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll(".nav-links a");
window.addEventListener("scroll",()=>{
  let current="";
  sections.forEach(section=>{
    const sectionTop=section.offsetTop-150;
    if(scrollY>=sectionTop) current=section.getAttribute("id");
  });
  navLinks.forEach(link=>{link.classList.remove("active");if(link.getAttribute("href")==="#"+current) link.classList.add("active");});
});
