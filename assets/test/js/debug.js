"use strict";console.log("debug.js loaded");var links=document.querySelectorAll("a");if(null!==links)for(var i=0;i<links.length;i++)void 0!==links[i].getAttribute("data-pageid")&&console.log("page-id:[",links[i].getAttribute("data-pageid"),"] href:[",links[i].getAttribute("href"),"]");