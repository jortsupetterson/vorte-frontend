import{a as g}from"./chunk-UWXQZKJL.js";import{b as y,c as E}from"./chunk-KMJKQA3K.js";import{a as o}from"./chunk-EI7MMDWY.js";async function h(i,r,t,n,s,c){if(!i||!i.MAIL_SERVICE||typeof i.MAIL_SERVICE.sendEmail!="function")throw new TypeError("env.MAIL_SERVICE.sendEmail is not available.");if(!Array.isArray(r)||r.length===0)throw new TypeError("recipients must be a non-empty array.");if(!t||typeof t.subject!="string"||t.subject.length===0)throw new TypeError("content.subject is required (string).");let f=n===!1?void 0:n,u=s===!1?void 0:s,e=c===!1?void 0:c;return i.MAIL_SERVICE.sendEmail(r,t,f,u,e)}o(h,"sendEmail");function p(){let i=new Uint32Array(1);return crypto.getRandomValues(i),(i[0]%1e8).toString().padStart(8,"0")}o(p,"getEightDigits");async function w(i){return(await y(i)).split(";")}o(w,"parseAuthnCookie");async function O(i,r,t,n,s,c,f,u){if(n==="sign_up"&&u==="initialize")try{let[e,d,a,m]=await Promise.all([s.json(),t.AUTHN_VERIFIER.get(),p(),t.TURNSTILE_SECRET.get()]);if(!e.turnstileToken||!m)return new Response("Bad Request",{status:400});let l=new URLSearchParams;if(l.append("secret",m),l.append("response",e.turnstileToken),!await(await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:l})).json())return new Response(null,{status:400,headers:{"Set-Cookie":'AUTHN_VERIFIER=""; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0;'}});let[T,k,S]=await Promise.all([h(t,[e.email],{subject:{fi:"Olet luomassa tili\xE4 palveluun Vorte",sv:"Du h\xE5ller p\xE5 att skapa ett konto i Vorte",en:"You are creating an account in Vorte"}[i],plainText:{fi:`
Hei ${e.firstname} ${e.lastname}!

Olemme vastaanottaneet pyynt\xF6si luoda k\xE4ytt\xE4j\xE4tili Vorteen s\xE4hk\xF6postille: "${e.email}"

Jos et yritt\xE4nyt luoda tili\xE4, voit j\xE4tt\xE4\xE4 viestin huomiotta.

Vahvistathan, ett\xE4 kyseess\xE4 on todella sin\xE4 \u2013 kertak\xE4ytt\xF6koodi on voimassa 5 minuuttia.

Kertak\xE4ytt\xF6koodisi: ${a}

Parhain terveisin
Vorten tiimi
`,sv:`
Hej ${e.firstname} ${e.lastname}!

Vi har mottagit din beg\xE4ran om att skapa ett Vorte-konto med e-postadressen: "${e.email}"

Om du inte f\xF6rs\xF6kte skapa ett konto kan du bara ignorera detta meddelande.

Bekr\xE4fta att det verkligen \xE4r du \u2013 eng\xE5ngskoden \xE4r giltig i 5 minuter.

Din eng\xE5ngskod: ${a}

V\xE4nliga h\xE4lsningar
Vorte-teamet
`,en:`
Hi ${e.firstname} ${e.lastname}!

We have received your request to create a Vorte account with the email: "${e.email}"

If you did not try to create an account, you can safely ignore this message.

Please confirm it was really you \u2013 the one-time code is valid for 5 minutes.

Your one-time code: ${a}

Best regards
The Vorte team
`}[i]},!1,!1,!1),Date.now(),g()]),[V,R]=await Promise.all([t.AUTHN_SESSIONS_KV.put(S,a,{expirationTtl:300}),E("AUTHN_VERIFIER",`${e.email};${a};${d};${k};${S}`,t,300)]);return new Response(null,{status:202,headers:{"Set-Cookie":R}})}catch(e){return console.error("initializeAuth error:",e),new Response(null,{status:404})}if(n==="sign_up"&&u==="callback")try{let[e,d,a]=await Promise.all([s.json(),t.AUTHN_VERIFIER.get(),w(r.AUTHN_VERIFIER)]);if(await t.AUTHN_SESSIONS_KV.get(a[4])===a[1]&&Date.now()-Number(a[3])<3e5&&a[2]===d&&a[1]===e.code){let[m,l]=await Promise.all([t.AUTHN_SESSIONS_KV.delete(a[4]),t.DATA_SERVICE.createDb(e.form,r)]);return new Response(null,{status:l,headers:{"Set-Cookie":'AUTHN_VERIFIER=""; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0;'}})}return await t.AUTHN_SESSIONS_KV.delete(a[4]),new Response(null,{status:400,headers:{"Set-Cookie":'AUTHN_VERIFIER=""; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0;'}})}catch(e){throw console.error("[AUTHN] Callback error:",e),new Error(e)}}o(O,"initializeAuthentication");export{O as initializeAuthentication};
