import{A as d,g as f,R as p}from"./index.1d7ec4c2.js";import{r as E,A as m,R as a}from"./Text.0931af7a.js";const P="modulepreload",g={},h="/tmagic-editor/playground/runtime/react/",y=function(t,c){return!c||c.length===0?t():Promise.all(c.map(n=>{if(n=`${h}${n}`,n in g)return;g[n]=!0;const s=n.endsWith(".css"),l=s?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${l}`))return;const r=document.createElement("link");if(r.rel=s?"stylesheet":P,s||(r.as="script",r.crossOrigin=""),r.href=n,document.head.appendChild(r),s)return new Promise((e,i)=>{r.addEventListener("load",e),r.addEventListener("error",()=>i(new Error(`Unable to preload CSS for ${n}`)))})})).then(()=>t())};function C(){var c,n;const o=E.exports.useContext(m);if(!((c=o==null?void 0:o.page)!=null&&c.data))return null;const t=o.resolveComponent("page");return a.createElement(t,{config:(n=o==null?void 0:o.page)==null?void 0:n.data})}const v="/tamgic-editor/playground/runtime/react/assets/components.js";y(()=>import(v),[]).then(()=>{var r;const{components:o}=window.magicPresetComponents,t=new d({config:{},curPage:f("page")});let c="";const n=e=>{t==null||t.setConfig(e),s(),window.magic.onPageElUpdate(document.querySelector(".magic-ui-page"))},s=()=>{p.render(a.createElement(a.StrictMode,null,a.createElement(m.Provider,{value:t},a.createElement(C,null))),document.getElementById("root"))},l={app:t,updateRootConfig(e){console.log("update root config",e),t==null||t.setConfig(e)},updatePageId(e){console.log("update page id",e),c=e,t==null||t.setPage(c),s()},getSnapElementQuerySelector(){return"[class*=magic-ui][id]"},select(e){console.log("select config",e);const i=document.getElementById(e);return i||new Promise(u=>{setTimeout(()=>{u(document.getElementById(e))},0)})},add({root:e}){console.log("add config",e),n(e)},update({root:e}){console.log("update config",e),n(e)},sortNode({root:e}){console.log("sort config",e),n(e)},remove({root:e}){console.log("remove config",e),n(e)}};Object.keys(o).forEach(e=>t.registerComponent(e,o[e])),(r=window.magic)==null||r.onRuntimeReady(l)});