"use strict";(self.webpackChunkreact_homework_template=self.webpackChunkreact_homework_template||[]).push([[681],{681:function(e,r,t){t.r(r);var n=t(861),a=t(439),s=t(687),i=t.n(s),c=t(791),l=t(597),h=t(689),o=t(184);r.default=function(){var e=(0,c.useState)(),r=(0,a.Z)(e,2),t=r[0],s=r[1],d=(0,c.useState)("idle"),u=(0,a.Z)(d,2),p=u[0],m=u[1],v=(0,h.UO)().movieId;return(0,c.useEffect)((function(){function e(){return(e=(0,n.Z)(i().mark((function e(){var r,t;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={method:"GET",url:"https://api.themoviedb.org/3/movie/".concat(v,"/reviews"),params:{language:"en-US",page:"1"},headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZGMyZmM3OWE5Njc5NTQ5MTJjYTVhYWQ0NWI5NTU3NCIsInN1YiI6IjY1MDA0YzQzMWJmMjY2MDBmZmI1YWI1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zirrhOIT7yqxW1n0pdlMVLkB4-AicQWjZCs5JhftH6Q"}},e.prev=1,e.next=4,(0,l.h_)(r);case 4:t=e.sent,s(t.data.results),m("resolved"),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(1),m("rejected"),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[1,9]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[v]),(0,o.jsx)(o.Fragment,{children:"idle"===p?null:(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("div",{className:"wrapper",children:["pending"===p&&(0,o.jsx)("div",{children:"LOAD"}),"rejected"===p&&(0,o.jsx)("div",{children:"Error! Reload page"}),"resolved"===p&&(0===t.length?(0,o.jsx)("div",{children:"We don`t have any reviews for this movie"}):(0,o.jsx)(o.Fragment,{children:(0,o.jsx)("ul",{className:"reviews-items",children:t.map((function(e){var r=e.author,t=e.content;return(0,o.jsxs)("li",{className:"reviews-item",children:[(0,o.jsx)("p",{className:"reviews-author",children:r}),(0,o.jsx)("p",{className:"reviews-text",children:t})]},r)}))})}))]})})})}}}]);
//# sourceMappingURL=681.5a31e9cd.chunk.js.map