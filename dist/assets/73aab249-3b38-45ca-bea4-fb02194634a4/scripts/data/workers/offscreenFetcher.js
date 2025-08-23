self.addEventListener("message",async e=>{let s=await(await fetch(`/services/data/${e.data}`)).text();postMessage(s)});
