
const header=document.getElementById("header");let lastPos=document.documentElement.scrollTop;window.addEventListener("scroll",(()=>{const e=document.documentElement.scrollTop;e>lastPos?e>header.offsetHeight&&(header.classList.add("-translate-y-full"),header.classList.remove("shadow-md")):(header.classList.remove("-translate-y-full"),header.classList.add("shadow-md")),lastPos=e}),!1);const menu=document.getElementById("menu"),searchBox=document.getElementById("search"),social=document.getElementById("social"),menuToggle=document.getElementById("menu-toggle");menuToggle.addEventListener("click",(()=>{menu.classList.toggle("hidden"),social.classList.toggle("hidden")}),!1);const lazyImages=document.getElementsByClassName("lazy");document.addEventListener("DOMContentLoaded",(()=>{[...lazyImages].forEach((e=>{const t=e.dataset.src;e.setAttribute("src",t),e.removeAttribute("data-src")}))}),!1);class SearchPosts{async init(){const e=new URL(location.href).searchParams;this.start=Number(e.get("start"))||1,this.size=Number(e.get("size"))||12,this.posts=await fetch("../index.json").then((e=>e.json())),this.render(e.get("q"))}render(e){const t=document.getElementById("wrapper"),s=document.getElementById("searchbox"),n=document.getElementById("info");if(e="string"==typeof e?e.toLowerCase():"",history.replaceState(null,null,`?q=${e}&start=${this.start}&size=${this.size}`),s.value=e,t.innerHTML="",""===e)return void(n.textContent="Enter keywords in the search box above");const o=this.posts.filter((t=>-1!==t.title.toLowerCase().indexOf(e)));if(0===o.length)return void(n.textContent=`No results were found for "${e}"`);const a=this.size,r=this.start-1,l=o.slice(r,r+a),d=r+l.length,i=this.start<d||1!==this.start?`${this.start} to ${d}`:this.start,c=o.length>1?"s":"";n.textContent=`Showing ${i} of ${o.length} result${c} found for "${e}"`,l.forEach((e=>{const{url:s,title:n,date:o}=e;t.innerHTML+=`\n        <div class="w-full sm:w-1/2 md:w-1/3 self-stretch p-2 mb-2">\n          <a href="${s}">\n            <div class="rounded shadow-md h-full px-6 py-5">\n              <div class="font-semibold text-lg mb-2">${n}</div>\n              <p class="text-gray-700 mb-1" title="Published date">${o}</p>\n            </div>\n          </a>\n        </div>\n      `}))}}if("/search/"===location.pathname){const e=document.getElementById("searchbox"),t=new SearchPosts;t.init(),e.addEventListener("keyup",debounce((function(){t.render(this.value)}),400))}function debounce(e,t){let s,n=[];return function(...o){return new Promise((a=>{clearTimeout(s),s=setTimeout((()=>{s=null;const t=e.apply(this,o);for(a of n)a(t);n=[]}),t),n.push(a)}))}}