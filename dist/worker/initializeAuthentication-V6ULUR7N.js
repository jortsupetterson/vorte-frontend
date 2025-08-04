import{a as k}from"./chunk-UWXQZKJL.js";import{b as g,c as f}from"./chunk-KMJKQA3K.js";import{a as o}from"./chunk-EI7MMDWY.js";async function R(i,r,t,s,l,m){if(!i||!i.MAIL_SERVICE||typeof i.MAIL_SERVICE.sendEmail!="function")throw new TypeError("env.MAIL_SERVICE.sendEmail is not available.");if(!Array.isArray(r)||r.length===0)throw new TypeError("recipients must be a non-empty array.");if(!t||typeof t.subject!="string"||t.subject.length===0)throw new TypeError("content.subject is required (string).");let y=s===!1?void 0:s,u=l===!1?void 0:l,e=m===!1?void 0:m;return i.MAIL_SERVICE.sendEmail(r,t,y,u,e)}o(R,"sendEmail");function S(){let i=new Uint32Array(1);return crypto.getRandomValues(i),(i[0]%1e8).toString().padStart(8,"0")}o(S,"getEightDigits");async function T(i){return(await g(i)).split(";")}o(T,"parseAuthnCookie");async function P(i,r,t,s,l,m,y,u){if(s==="sign_up"&&u==="initialize")try{let[e,p,a,c]=await Promise.all([l.json(),t.AUTHN_VERIFIER.get(),S(),t.TURNSTILE_SECRET.get()]);if(!e.turnstileToken||!c)return new Response("Bad Request",{status:400});let n=new URLSearchParams;if(n.append("secret",c),n.append("response",e.turnstileToken),!await(await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:n})).json())return new Response(null,{status:400,headers:{"Set-Cookie":'AUTHN_VERIFIER=""; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0;'}});let[d,A,h]=await Promise.all([R(t,[e.email],{subject:{fi:"Olet luomassa tili\xE4 palveluun Vorte",sv:"Du h\xE5ller p\xE5 att skapa ett konto i Vorte",en:"You are creating an account in Vorte"}[i],plainText:{fi:`
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
`}[i]},!1,!1,!1),Date.now(),k()]),[V,I]=await Promise.all([t.AUTHN_SESSIONS_KV.put(h,a,{expirationTtl:300}),f("AUTHN_VERIFIER",`${e.email};${a};${p};${A};${h}`,t,300)]);return new Response(null,{status:202,headers:{"Set-Cookie":I}})}catch(e){return console.error("initializeAuth error:",e),new Response(null,{status:404})}if(s==="sign_up"&&u==="callback")try{let[e,p,a]=await Promise.all([l.json(),t.AUTHN_VERIFIER.get(),T(r.AUTHN_VERIFIER)]);if(await t.AUTHN_SESSIONS_KV.get(a[4])===a[1]&&Date.now()-Number(a[3])<3e5&&a[2]===p&&a[1]===e.code){let c=await t.DATA_SERVICE.createDb(e.form,r),n=await JSON.parse(c),[w,E,d]=await Promise.all([t.AUTHN_SESSIONS_KV.delete(a[4]),f("AUTHORIZATION",n.result,t,86400),new Headers]);return d.append("Set-Cookie",'AUTHN_VERIFIER=""; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0;'),d.append("Set-Cookie",E),new Response(null,{status:n.status,headers:d})}return await t.AUTHN_SESSIONS_KV.delete(a[4]),new Response(null,{status:400,headers:{"Set-Cookie":'AUTHN_VERIFIER=""; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0;'}})}catch(e){throw console.error("[AUTHN] Callback error:",e),new Error(e)}}o(P,"initializeAuthentication");export{P as initializeAuthentication};
