(() => {
'use strict';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const photo = document.getElementById('sarah-photo');
const portraitCore = document.querySelector('.portrait-core');
const secondaryPhoto = document.querySelector('.sarah-secondary');
function markPhoto(img, onSuccess, onFail) {
  img.addEventListener('load', () => { if (img.naturalWidth > 0) onSuccess(); else onFail?.(); });
  img.addEventListener('error', () => onFail?.());
  if (img.complete) { if (img.naturalWidth > 0) onSuccess(); else onFail?.(); }
}
markPhoto(photo, () => portraitCore.classList.add('has-photo'), () => { photo.style.display = 'none'; });
markPhoto(secondaryPhoto, () => { document.querySelector('.about-fallback').style.display = 'none'; }, () => { secondaryPhoto.style.display = 'none'; });

// The browser tab icon uses the supplied smiling portrait. The static favicon file also works before JavaScript runs.
function updateSarahFavicon(){
  const headIcon=document.getElementById('site-favicon');
  if(!headIcon || !photo.complete || !photo.naturalWidth)return;
  try{
    const size=128, c=document.createElement('canvas'); c.width=c.height=size;
    const ctx=c.getContext('2d'); if(!ctx)return;
    const grad=ctx.createLinearGradient(0,0,size,size);
    grad.addColorStop(0,'#ff4da4');grad.addColorStop(.28,'#a44dff');grad.addColorStop(.58,'#26c8f0');grad.addColorStop(.82,'#ffe05d');grad.addColorStop(1,'#ff8d5c');
    ctx.fillStyle=grad; ctx.beginPath();ctx.arc(64,64,64,0,Math.PI*2);ctx.fill();
    ctx.save();ctx.beginPath();ctx.arc(64,64,55,0,Math.PI*2);ctx.clip();
    const scale=Math.max(110/photo.naturalWidth,110/photo.naturalHeight);
    const w=photo.naturalWidth*scale,h=photo.naturalHeight*scale;
    ctx.drawImage(photo,(size-w)/2,(size-h)/2,w,h);ctx.restore();
    headIcon.href=c.toDataURL('image/png');headIcon.type='image/png';
  }catch(e){ /* The SVG icon remains if canvas cannot render the photo. */ }
}
photo.addEventListener('load',updateSarahFavicon);
if(photo.complete && photo.naturalWidth)updateSarahFavicon();

// PHOTO GALLERY — Edit ONLY the src, title, and description fields to add memories.
// Add as many objects as you like. No uploader, database, or build step required.
const memories = [
  { src: 'assets/images/with sis.jpg', title: 'Together, Always', description: 'The happiest moments are the ones we share. 🫂❤️' },
  { src: 'assets/images/college.jpg', title: 'College Days', description: 'Confident, bright, and full of memories. ✨' },
  { src: 'assets/images/with family.jpg', title: 'Family Love', description: 'The people who make every moment feel like home. 💗' },
  { src: 'assets/images/with nani.jpg', title: 'A Day to Remember', description: 'Beautiful memories with loved ones. 🌸' },
  { src: 'assets/images/smiling.png', title: 'That Beautiful Smile', description: 'A smile worth a thousand memories. 😊' },
  { src: 'assets/images/college 2.jpg', title: 'College Memories', description: 'Little chapters filled with big dreams. 💫' },
  { src: 'assets/images/with dad.jpg', title: 'With Dad', description: 'A moment filled with family love. ❤️' },
  { src: 'assets/images/photo sa st.jpg', title: 'Sisters & Smiles', description: 'Good company and unforgettable moments. 🌷' },
  { src: 'assets/images/in village.jpg', title: 'Village Adventures', description: 'Some adventures stay in our hearts forever. 🌿' },
  { src: 'assets/images/with sarah di.jpg', title: 'Together in Mumbai', description: 'An outing that became a beautiful memory. ✨' },
  { src: 'assets/images/teenage.jpg', title: 'Growing Up', description: 'Every chapter has its own magic. 🦋' },
  { src: 'assets/images/cover_photo.jpg', title: 'Her Lovely Glow', description: 'A little sunshine in every photo. 🌼' },
  { src: 'assets/images/Sarah 1.jpg', title: 'Candid Smile', description: 'The little moments make life beautiful. 💕' },
  { src: 'assets/images/Sarah 4.jpg', title: 'Golden Days', description: 'Simple moments, lasting happiness. 🌈' },
  { src: 'assets/images/sarah 5.jpg', title: 'A Happy Portrait', description: 'Keep smiling and shining, Di. 💖' },
  { src: 'assets/images/dp.jpg', title: 'Sweet Adventures', description: 'Every photo tells a special story. ✨' },
  { src: 'assets/images/Screenshot 2026-11-04 013449.png', title: 'Pretty in Pink', description: 'A bright and beautiful day. 🌺' },
  { src: 'assets/images/Screenshot 2026-11-04 013644.png', title: 'Timeless Smile', description: 'Beautiful moments in black and white. 🤍' },
  { src: 'assets/images/Screenshot 2026-11-04 013708.png', title: 'A Quiet Moment', description: 'Some memories are gentle and timeless. 🕊️' },
  { src: 'assets/images/FB_IMG_1767221340669.jpg', title: 'Carefree Days', description: 'Those little moments of laughter. 🌸' },
  { src: 'assets/images/sarah 2.jpg', title: 'Then and Now', description: 'Every chapter is part of your story. 💌' },
  { src: 'assets/images/sarah 3.jpg', title: 'An Adventure', description: 'A day worth remembering. 🌻' },
  { src: 'assets/images/2nd cover photo.jpeg', title: 'Precious Memories', description: 'The joy of looking back together. 🩷' },
  { src: 'assets/images/celebration.png', title: 'Chirtmas', description: 'The chirtsmas  celebrations. 🩷' },
  { src: 'assets/images/sky  look.jpeg', title: 'weather', description: 'The lonavala trip. 🩷' },
  { src: 'assets/images/night out.jpg', title: 'Night', description: 'The Night out. 🩷' }
];
const gallery = document.getElementById('gallery');
const fallbackColors = [
  ['#ff8ccc','#b69bff','#7de3ff'], ['#63c8ff','#76f4d5','#b391ff'],
  ['#ffbe6e','#ff78c7','#ed93ff'], ['#75e6fa','#b88aff','#ff9fb5'],
  ['#ffe17c','#ff97ad','#a88eff'], ['#76eedf','#83adff','#e78dff']
];
const galleryImages = [];
function getMemoryShape(width, height){
  if (!width || !height) return 'square';
  const ratio = width / height;
  if (ratio >= 1.22) return 'landscape';
  if (ratio <= 0.82) return 'portrait';
  return 'square';
}
function applyMemoryShape(card, shape){
  card.classList.remove('landscape','portrait','square');
  card.classList.add(shape);
}
memories.forEach((item, i) => {
  const card = document.createElement('button');
  card.type = 'button'; card.className = 'memory-card';
  card.setAttribute('aria-label', `Open photo: ${item.title}`);
  const palette = fallbackColors[i % fallbackColors.length];
  card.style.setProperty('--g1',palette[0]); card.style.setProperty('--g2',palette[1]);
  const inner = document.createElement('span'); inner.className = 'memory-inner';
  const front = document.createElement('span'); front.className = 'memory-front';
  const img = document.createElement('img'); img.loading = 'eager'; img.decoding = 'async'; img.alt = item.title; img.src = item.src;
  const fallback = document.createElement('span'); fallback.className = 'memory-placeholder'; fallback.textContent = ['🌸','🦋','💖','✨','🌼','🌈'][i%6];
  const fallbackLabel = document.createElement('span'); fallbackLabel.className = 'memory-placeholder-label'; fallbackLabel.textContent = `Photo ${i+1}`;
  const caption = document.createElement('span'); caption.className = 'memory-caption'; caption.textContent = item.title;
  front.append(img,fallback,fallbackLabel,caption);
  const back = document.createElement('span'); back.className = 'memory-back';
  const backIcon = document.createElement('span'); backIcon.className = 'back-icon'; backIcon.textContent='✦';
  const heading = document.createElement('strong'); heading.textContent = item.title;
  const desc = document.createElement('span'); desc.textContent = item.description;
  const action = document.createElement('span'); action.textContent = 'Tap to see photo ↗';
  back.append(backIcon,heading,desc,action);inner.append(front,back);card.append(inner);gallery.append(card);
  const state = {src:item.src, title:item.title, description:item.description, valid:false, shape:'square'};galleryImages.push(state);
  applyMemoryShape(card, i % 4 === 0 ? 'landscape' : (i % 3 === 0 ? 'portrait' : 'square'));
  markPhoto(img, () => {
    state.valid=true;
    state.shape=getMemoryShape(img.naturalWidth, img.naturalHeight);
    applyMemoryShape(card, state.shape);
    front.classList.add('has-photo');
    fallback.style.display='none';
    fallbackLabel.style.display='none';
  },()=>{
    state.valid=false;
    img.style.display='none';
    card.classList.add('image-error');
  });
  card.addEventListener('click',()=>openLightbox(i));
});
const lightbox=document.getElementById('lightbox'),lightboxImg=document.getElementById('lightbox-image');
const lightboxCaption=document.getElementById('lightbox-caption');
let prevFocus=null, activeLightboxIndex=0, lightboxMode='gallery';
const lightboxPrev=document.getElementById('lightbox-prev'),lightboxNext=document.getElementById('lightbox-next');
function showLightbox(){
  const item=galleryImages[activeLightboxIndex];
  const fallback=makeFallbackImage(activeLightboxIndex);
  lightboxImg.src=item.valid ? item.src : fallback;
  lightboxImg.alt=item.title; lightboxCaption.textContent=`${item.title} — ${item.description}`;
  lightboxPrev.hidden=lightboxNext.hidden=galleryImages.length<2;
}
function makeFallbackImage(index){
  const color=fallbackColors[index%fallbackColors.length];
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000"><defs><linearGradient id="a" x2="1" y2="1"><stop stop-color="${color[0]}"/><stop offset=".5" stop-color="${color[1]}"/><stop offset="1" stop-color="${color[2]}"/></linearGradient></defs><rect width="800" height="1000" fill="url(#a)"/><text x="400" y="445" text-anchor="middle" font-size="120">💗</text><text x="400" y="545" text-anchor="middle" font-family="sans-serif" font-size="38" fill="#4b276c">Add your memory photo</text></svg>`;
  return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}
function openLightbox(index){prevFocus=document.activeElement;lightboxMode='gallery';activeLightboxIndex=index;lightbox.hidden=false;showLightbox();document.getElementById('lightbox-close').focus();document.body.style.overflow='hidden';}
function openSingleLightbox(src,caption){prevFocus=document.activeElement;lightboxMode='single';lightbox.hidden=false;lightboxImg.src=src||makeFallbackImage(0);lightboxImg.alt=caption;lightboxCaption.textContent=caption;lightboxPrev.hidden=lightboxNext.hidden=true;document.getElementById('lightbox-close').focus();document.body.style.overflow='hidden';}
function shiftLightbox(by){if(lightboxMode!=='gallery')return;activeLightboxIndex=(activeLightboxIndex+by+galleryImages.length)%galleryImages.length;showLightbox();}
function closeLightbox(){lightbox.hidden=true;lightboxImg.removeAttribute('src');document.body.style.overflow='';prevFocus?.focus();}
lightboxPrev.addEventListener('click',()=>shiftLightbox(-1));lightboxNext.addEventListener('click',()=>shiftLightbox(1));
document.getElementById('lightbox-close').addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener('keydown',e=>{if(lightbox.hidden)return;if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft')shiftLightbox(-1);if(e.key==='ArrowRight')shiftLightbox(1);});

// Mobile navigation with accessible toggle and auto-close.
const menuButton=document.getElementById('mobile-menu-button');
const mainNav=document.getElementById('main-nav');
function closeMenu(){mainNav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open menu');}
menuButton.addEventListener('click',()=>{const opening=!mainNav.classList.contains('open');mainNav.classList.toggle('open',opening);menuButton.setAttribute('aria-expanded',String(opening));menuButton.setAttribute('aria-label',opening?'Close menu':'Open menu');});
mainNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('click',e=>{if(!mainNav.contains(e.target)&&!menuButton.contains(e.target))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});

// Source-code-only memorable portrait — place the file in assets/images/.
const foreverImg=document.getElementById('forever-image'),foreverFrame=document.getElementById('forever-frame');
markPhoto(foreverImg,()=>foreverFrame.classList.add('has-photo'),()=>{foreverImg.style.display='none';foreverFrame.classList.remove('has-photo');});
document.getElementById('forever-view').addEventListener('click',()=>openSingleLightbox(foreverFrame.classList.contains('has-photo')?foreverImg.src:null,'Our forever favorite moment 💗'));

// 3D greeting envelope opening, letter reveal, and confetti.
const greetingScene=document.getElementById('greeting-scene');
const envelopeTrigger=document.getElementById('envelope-trigger');
const greetingCard=document.getElementById('greeting-card');
const greetingClose=document.getElementById('greeting-close');
const greetingPages=[...document.querySelectorAll('[data-greeting-page]')];
const greetingPrev=document.getElementById('greeting-prev');
const greetingNext=document.getElementById('greeting-next');
const greetingPageLabel=document.getElementById('greeting-page-label');
const greetingPageDots=[...document.querySelectorAll('.card-page-dots i')];
const greetingPageViewport=document.getElementById('greeting-page-viewport');
let currentGreetingPage=0;
function showGreetingPage(index, animate=true){
  const next=Math.max(0,Math.min(index,greetingPages.length-1));
  currentGreetingPage=next;
  for(const [i,page] of greetingPages.entries()){
    page.hidden=i!==next;
    page.classList.toggle('is-current',i===next);
  }
  greetingPageViewport.scrollTop=0;
  greetingPageLabel.textContent=`Page ${next+1} of ${greetingPages.length}`;
  greetingPrev.disabled=next===0;
  greetingNext.textContent=next===greetingPages.length-1?'Back to first ↻':'Next →';
  greetingNext.setAttribute('aria-label',next===greetingPages.length-1?'Return to first greeting page':'Next greeting page');
  greetingPageDots.forEach((dot,i)=>dot.classList.toggle('active',i===next));
  if(animate && !reduceMotion){
    const active=greetingPages[next];
    active.classList.remove('page-turn');
    void active.offsetWidth;
    active.classList.add('page-turn');
  }
}
greetingPrev.addEventListener('click',()=>showGreetingPage(currentGreetingPage-1));
greetingNext.addEventListener('click',()=>showGreetingPage(currentGreetingPage===greetingPages.length-1?0:currentGreetingPage+1));
function setGreeting(open){
  greetingScene.classList.toggle('is-open',open);
  envelopeTrigger.setAttribute('aria-expanded',String(open));
  envelopeTrigger.setAttribute('aria-label',open?'Greeting card opened':'Open Sarah Di greeting card');
  greetingCard.setAttribute('aria-hidden',String(!open));
  greetingClose.hidden=!open;
  document.getElementById('greeting-hint').textContent=open?'A little love, just for Sarah Di ❤️':'Tap the glowing heart to open your letter ✨';
  if(open){showGreetingPage(0,false);popConfetti();if(reduceMotion)greetingClose.focus();}
}
envelopeTrigger.addEventListener('click',()=>setGreeting(!greetingScene.classList.contains('is-open')));
greetingClose.addEventListener('click',()=>{setGreeting(false);envelopeTrigger.focus();});

// Birthday celebration interaction: light up the cake and shower confetti.
const birthdaySection=document.getElementById('birthday');
const celebrateButton=document.getElementById('celebrate-button');
const wishButton=document.getElementById('wish-button');
const birthdayNote=document.getElementById('birthday-note');
let celebrateTimeout;
function triggerBirthdayCelebration(message){
  birthdaySection.classList.add('birthday-celebrating');
  birthdayNote.textContent=message;
  popConfetti();
  clearTimeout(celebrateTimeout);
  celebrateTimeout=setTimeout(()=>{birthdaySection.classList.remove('birthday-celebrating');birthdayNote.textContent='Tap celebrate to light up the candles, sparkle the balloons, and shower Sarah Di with confetti. ✨';}, reduceMotion ? 1400 : 4200);
}
celebrateButton?.addEventListener('click',()=>triggerBirthdayCelebration('Happy Birthday, Sarah Di! The balloons are dancing and the cake is glowing just for you. 🎂✨'));
wishButton?.addEventListener('click',()=>triggerBirthdayCelebration('Sending birthday sparkles, warm hugs, and endless blessings to Sarah Di. 💖🌈'));

const portraitTilt=document.getElementById('portrait-tilt'),heroVisual=document.getElementById('hero-visual');
if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
  heroVisual.addEventListener('pointermove',e=>{const r=heroVisual.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;portraitTilt.style.transform=`rotateY(${x*13}deg) rotateX(${-y*13}deg)`;});
  heroVisual.addEventListener('pointerleave',()=>{portraitTilt.style.transition='transform .5s ease';portraitTilt.style.transform='rotateY(0deg) rotateX(0deg)';setTimeout(()=>portraitTilt.style.transition='',500);});
  const glow=document.querySelector('.cursor-glow');window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';},{passive:true});
}

const stage=document.getElementById('surprise-stage'),gift=document.getElementById('gift'),message=document.getElementById('surprise-message');
function popConfetti(){const parent=document.getElementById('confetti');parent.replaceChildren();const colors=['#ff409b','#6e62f5','#00cbe8','#ffe34c','#fc862c','#29e3bb'];let count=reduceMotion?8:90;for(let i=0;i<count;i++){const p=document.createElement('i');p.className='confetti-piece';p.style.setProperty('--color',colors[i%colors.length]);p.style.setProperty('--dx',`${(Math.random()-.5)*window.innerWidth*.95}px`);p.style.setProperty('--dy',`${(Math.random()-.65)*window.innerHeight*.9}px`);p.style.setProperty('--rot',`${(Math.random()-.5)*1200}deg`);p.style.setProperty('--dur',`${1.7+Math.random()*1.8}s`);p.style.animationDelay=`${Math.random()*.35}s`;parent.appendChild(p);}setTimeout(()=>parent.replaceChildren(),4500);}
document.getElementById('gift-button').addEventListener('click',()=>{gift.classList.add('open');popConfetti();setTimeout(()=>{stage.classList.add('opened');message.classList.add('show');},reduceMotion?20:1000);});
document.getElementById('replay-button').addEventListener('click',()=>{stage.classList.remove('opened');message.classList.remove('show');gift.classList.remove('open');stage.scrollIntoView({behavior:reduceMotion?'instant':'smooth',block:'center'});});

const music=document.getElementById('music'),musicButton=document.getElementById('music-toggle'),musicSymbol=document.getElementById('music-symbol'),musicCaption=document.getElementById('music-caption');music.volume=.35;
musicButton.addEventListener('click',async()=>{if(!music.paused){music.pause();musicSymbol.textContent='♫';musicCaption.textContent='Music off';musicButton.setAttribute('aria-label','Play background music');return;}try{await music.play();musicSymbol.textContent='Ⅱ';musicCaption.textContent='Music on';musicButton.setAttribute('aria-label','Pause background music');}catch{musicCaption.textContent='Add background.mp3';musicSymbol.textContent='♫';musicButton.title='Place your licensed music in assets/audio/background.mp3';}});
music.addEventListener('error',()=>{musicCaption.textContent='Add background.mp3';});

const typewriter=document.getElementById('typewriter');const fullText=typewriter.dataset.text;let typed=false;
function startTypewriter(){if(typed)return;typed=true;if(reduceMotion){typewriter.textContent=fullText;return;}let index=0;const step=()=>{index=Math.min(index+3,fullText.length);typewriter.textContent=fullText.slice(0,index);if(index<fullText.length)setTimeout(step,24);};step();}
const typeObserver=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){startTypewriter();typeObserver.disconnect();}},{threshold:.3});typeObserver.observe(typewriter);

function initializeAnimations(){if(typeof gsap!=='undefined' && typeof ScrollTrigger!=='undefined'&&!reduceMotion){gsap.registerPlugin(ScrollTrigger);gsap.utils.toArray('.reveal').forEach(el=>gsap.fromTo(el,{opacity:0,y:35},{opacity:1,y:0,duration:1,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 91%',once:true}}));gsap.to('.decor-left',{y:-70,scrollTrigger:{trigger:'.hero',scrub:1}});gsap.to('.decor-right',{y:90,scrollTrigger:{trigger:'.hero',scrub:1}});} }
initializeAnimations();

function initializeThree(){
 if(reduceMotion||typeof THREE==='undefined')return;
 const mount=document.getElementById('three-bg');
 let renderer;
 try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:window.innerWidth>800,powerPreference:'low-power'});}catch{return;}
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(48,innerWidth/innerHeight,.1,120);
 camera.position.z=19;
 renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<720?1.2:1.65));
 renderer.setSize(innerWidth,innerHeight);renderer.setClearColor(0xffffff,0);mount.appendChild(renderer.domElement);
 scene.add(new THREE.AmbientLight(0xffffff,1.6));
 const pink=new THREE.PointLight(0xff52b5,48,45);pink.position.set(-7,4,8);scene.add(pink);
 const cyan=new THREE.PointLight(0x48edfa,44,45);cyan.position.set(7,-3,9);scene.add(cyan);
 const lilac=new THREE.PointLight(0x9070ff,28,40);lilac.position.set(0,7,4);scene.add(lilac);
 const world=new THREE.Group();scene.add(world);
 const colors=['#ff4d9a','#9c63ff','#27d9f5','#ffd54e','#ff914d','#33e9b4'];
 const basic=(c,opacity=.85)=>new THREE.MeshStandardMaterial({color:c,metalness:.32,roughness:.28,transparent:true,opacity,side:THREE.DoubleSide,emissive:c,emissiveIntensity:.1});
 const meshes=[],decorCount=innerWidth<700?13:29;
 const heartShape=new THREE.Shape();heartShape.moveTo(0,-.25);heartShape.bezierCurveTo(-.75,.14,-.58,.75,0,.38);heartShape.bezierCurveTo(.58,.75,.75,.14,0,-.25);
 const heartGeo=new THREE.ExtrudeGeometry(heartShape,{depth:.16,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.075,bevelThickness:.08,curveSegments:12});heartGeo.center();
 const starShape=new THREE.Shape();for(let i=0;i<10;i++){const ang=-Math.PI/2+i*Math.PI/5,r=i%2?.23:.53;const x=Math.cos(ang)*r,y=Math.sin(ang)*r;i?starShape.lineTo(x,y):starShape.moveTo(x,y);}starShape.closePath();
 const starGeo=new THREE.ExtrudeGeometry(starShape,{depth:.12,bevelEnabled:true,bevelThickness:.03,bevelSize:.03,bevelSegments:2});starGeo.center();
 const sphereGeo=new THREE.SphereGeometry(.25,16,12),petalGeo=new THREE.SphereGeometry(.24,12,10);
 function flower(){const group=new THREE.Group();for(let i=0;i<6;i++){const petal=new THREE.Mesh(petalGeo,basic(colors[i%colors.length],.93));const ang=i*Math.PI/3;petal.position.set(Math.cos(ang)*.35,Math.sin(ang)*.35,0);petal.scale.set(.95,1.35,.5);petal.rotation.z=ang-Math.PI/2;group.add(petal);}const middle=new THREE.Mesh(sphereGeo,basic('#ffe85b'));middle.scale.set(.65,.65,.72);middle.position.z=.14;group.add(middle);return group;}
 function butterfly(){const group=new THREE.Group();for(const side of [-1,1]){for(const upper of [-1,1]){const wing=new THREE.Mesh(new THREE.SphereGeometry(.4,12,8),basic(upper>0?'#ff69c4':'#62e5ff',.9));wing.scale.set(.85,.62,.09);wing.position.set(side*.36,upper*.23,0);wing.rotation.z=side*upper*.47;wing.userData.flap=side;group.add(wing);}}const body=new THREE.Mesh(new THREE.CapsuleGeometry(.085,.35,3,8),basic('#713a9f'));group.add(body);return group;}
 for(let i=0;i<decorCount;i++){
   const kind=i%5;
   const object=kind===0?new THREE.Mesh(heartGeo,basic(colors[i%colors.length])):kind===1?new THREE.Mesh(starGeo,basic(colors[(i+2)%colors.length])):kind===2?flower():kind===3?butterfly():new THREE.Mesh(sphereGeo,basic(colors[i%colors.length],.6));
   object.position.set((Math.random()-.5)*31,(Math.random()-.5)*21,-3-Math.random()*11);
   const scale=.5+Math.random()*.8;object.scale.setScalar(scale);object.rotation.set(Math.random()*2,Math.random()*2,Math.random()*2);
   object.userData.baseY=object.position.y;object.userData.phase=Math.random()*Math.PI*2;
   world.add(object);meshes.push(object);
 }
 const count=innerWidth<720?65:160;const positions=new Float32Array(count*3),vertexColors=new Float32Array(count*3);
 for(let i=0;i<count;i++){positions[i*3]=(Math.random()-.5)*33;positions[i*3+1]=(Math.random()-.5)*21;positions[i*3+2]=-Math.random()*16;const c=new THREE.Color(colors[i%colors.length]);vertexColors.set([c.r,c.g,c.b],i*3);}
 const starsGeometry=new THREE.BufferGeometry();starsGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3));starsGeometry.setAttribute('color',new THREE.BufferAttribute(vertexColors,3));
 const sparkles=new THREE.Points(starsGeometry,new THREE.PointsMaterial({size:.11,vertexColors:true,transparent:true,opacity:.82}));scene.add(sparkles);
 let mouseX=0,mouseY=0,onscreen=!document.hidden,frame=0;
 if(matchMedia('(pointer:fine)').matches)document.addEventListener('pointermove',e=>{mouseX=(e.clientX/innerWidth-.5)*2;mouseY=(e.clientY/innerHeight-.5)*2;},{passive:true});
 document.addEventListener('visibilitychange',()=>onscreen=!document.hidden);
 const clock=new THREE.Clock();
 function animate(){requestAnimationFrame(animate);if(!onscreen)return;const t=clock.getElapsedTime();world.rotation.y+=(mouseX*.075-world.rotation.y)*.018;world.rotation.x+=(-mouseY*.065-world.rotation.x)*.018;
 for(const [i,o] of meshes.entries()){o.rotation.y+=.0025*(i%3+1);o.rotation.z+=.001;o.position.y=o.userData.baseY+Math.sin(t*.6+o.userData.phase)*.22;if(i%5===3)o.children.forEach(child=>{if(child.userData.flap)child.rotation.y=Math.sin(t*7+i)*.32*child.userData.flap;});}
 sparkles.rotation.z=t*.009;
 // Mobile uses a lower render rate to save battery.
 if(innerWidth>720||frame++%2===0)renderer.render(scene,camera);
 }
 animate();
 window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<720?1.2:1.65));},{passive:true});
}
initializeThree();
})();
