/* Diagram-based practice — ADDITIVE. Original SVG figures drawn with the site's own
   qgen primitives (dia/ln/polyg/circ/arc/slice/rightAngle/txt). No figure is copied from
   any book or paper; the linked resources informed only the question TYPES. Adds tiered
   practice (Basic/Intermediate/Advanced) to the diagram-heavy Form 3 topics. Load LAST. */
(function () {
  var C = window.CURRICULUM, Q = window.QG;
  if (!C || !Q) return;
  var dia=Q.dia, ln=Q.ln, txt=Q.txt, polyg=Q.polyg, rect=Q.rect, circ=Q.circ, slice=Q.slice, rightAngle=Q.rightAngle;
  function add(code, gens){ var t=C[code]; if(!t||!t.content||!Array.isArray(t.content.practice)) return; gens.forEach(function(g){ t.content.practice.push(g); }); }
  function B(fn){return {level:'Basic',gen:fn};}
  function K(fn){return {level:'Intermediate',gen:fn};}
  function H(fn){return {level:'Advanced',gen:fn};}
  function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t;}return a;}

  // right triangle, right angle bottom-left, angle theta at bottom-right
  function rtri(o){
    var ox=48,oy=120,bw=120,bh=88;
    var body=polyg(ox+','+oy+' '+(ox+bw)+','+oy+' '+ox+','+(oy-bh))+rightAngle(ox,oy,14,-14);
    if(o.base!=null)  body+=txt(ox+bw/2, oy+19, o.base);
    if(o.height!=null)body+=txt(ox-18, oy-bh/2+4, o.height);
    if(o.hyp!=null)   body+=txt(ox+bw/2+18, oy-bh/2-2, o.hyp);
    if(o.angle!=null) body+=txt(ox+bw-26, oy-9, o.angle);
    return dia(ox+bw+34, oy+28, body);
  }
  function ngonPts(n,cx,cy,r){var p=[];for(var i=0;i<n;i++){var a=(90+i*360/n)*Math.PI/180;p.push((cx+r*Math.cos(a)).toFixed(1)+','+(cy-r*Math.sin(a)).toFixed(1));}return p.join(' ');}
  function cuboid(a,b,c){
    var x=34,y=44,w=96,h=64,d=30;
    var body=polyg(x+','+y+' '+(x+d)+','+(y-d)+' '+(x+w+d)+','+(y-d)+' '+(x+w)+','+y,'#eef6ff')
      +polyg((x+w)+','+y+' '+(x+w+d)+','+(y-d)+' '+(x+w+d)+','+(y+h-d)+' '+(x+w)+','+(y+h),'#dce9fb')
      +rect(x,y,w,h)
      +txt(x+w/2,y+h+18,a+' cm')+txt(x-18,y+h/2+4,b+' cm')+txt(x+w+d/2+14,y-d/2-3,c+' cm');
    return dia(x+w+d+42,y+h+28,body);
  }
  function sector(r,ang){
    var cx=70,cy=95,R=62;
    var body=circ(cx,cy,R,'none','#c9d7e6')+slice(cx,cy,R,0,ang,'#dce9fb')
      +txt(cx+R/2+2,cy+16,r+' cm')+txt(cx+20,cy-10,ang+'°');
    return dia(150,150,body);
  }
  function venn(oa,both,ob,out){
    var cy=80,r=52,ax=70,bx=118;
    var body=circ(ax,cy,r,'none','#2b7fd4')+circ(bx,cy,r,'none','#c55a11')
      +txt(ax-24,cy+5,''+oa)+txt((ax+bx)/2,cy+5,''+both)+txt(bx+24,cy+5,''+ob)
      +txt(ax-30,cy-r-4,'A')+txt(bx+30,cy-r-4,'B')+txt(178,148,'ξ '+out);
    return dia(200,168,body);
  }

  /* 3.4.3 Pythagoras */
  var TRIP=[[3,4,5],[6,8,10],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,12,15]];
  add('3.4.3',[
    B(function(){var t=TRIP[Q.int(0,TRIP.length-1)],k=Q.int(1,2),a=t[0]*k,b=t[1]*k,c=t[2]*k;
      return {type:'text', q:rtri({base:a+' cm',height:b+' cm',hyp:'?'})+'Find the length of the hypotenuse, in cm.',
        answer:[String(c)], hint:'hypotenuse² = '+a+'² + '+b+'².'};}),
    K(function(){var t=TRIP[Q.int(0,TRIP.length-1)],k=Q.int(1,2),a=t[0]*k,b=t[1]*k,c=t[2]*k;
      return {type:'text', q:rtri({base:a+' cm',height:'?',hyp:c+' cm'})+'Find the length of the missing side, in cm.',
        answer:[String(b)], hint:'missing² = '+c+'² − '+a+'².'};}),
    H(function(){var t=TRIP[Q.int(0,TRIP.length-1)],k=Q.int(2,4),a=t[0]*k,b=t[1]*k,c=t[2]*k;
      return {type:'text', q:rtri({base:a+' cm',height:b+' cm',hyp:'?'})+'A ladder leans on a wall forming this right triangle. Find the hypotenuse, in cm.',
        answer:[String(c)], hint:'√('+a+'² + '+b+'²).'};}),
  ]);

  /* 3.4.4 Trigonometric ratios (clean fraction ratios from integer triangles) */
  function ratio(p,q0){var g=gcd(p,q0);return (p/g)+'/'+(q0/g);}
  add('3.4.4',[
    B(function(){var t=TRIP[Q.int(0,4)],k=Q.int(1,3),o=t[0]*k,adj=t[1]*k,h=t[2]*k;
      return {type:'text', q:rtri({base:adj+' cm',height:o+' cm',hyp:h+' cm',angle:'θ'})+'Find tan θ. Give your answer as a fraction.',
        answer:[ratio(o,adj), o+'/'+adj], hint:'tan θ = opposite ÷ adjacent = '+o+'/'+adj+'.'};}),
    K(function(){var t=TRIP[Q.int(0,4)],k=Q.int(1,3),o=t[0]*k,adj=t[1]*k,h=t[2]*k;
      return {type:'text', q:rtri({base:adj+' cm',height:o+' cm',hyp:h+' cm',angle:'θ'})+'Find sin θ. Give your answer as a fraction.',
        answer:[ratio(o,h), o+'/'+h], hint:'sin θ = opposite ÷ hypotenuse = '+o+'/'+h+'.'};}),
    H(function(){var t=TRIP[Q.int(0,4)],k=Q.int(1,3),o=t[0]*k,adj=t[1]*k,h=t[2]*k;
      return {type:'text', q:rtri({base:adj+' cm',height:o+' cm',hyp:h+' cm',angle:'θ'})+'Find cos θ. Give your answer as a fraction.',
        answer:[ratio(adj,h), adj+'/'+h], hint:'cos θ = adjacent ÷ hypotenuse = '+adj+'/'+h+'.'};}),
  ]);

  /* 3.4.2 Similarity (right triangle enlarged by a scale factor) */
  add('3.4.2',[
    B(function(){var a=Q.int(2,6),b=Q.int(2,6);if(a===b)b++;var k=Q.int(2,4);
      var svg=rtri({base:a+' cm',height:b+' cm'})+rtri({base:(a*k)+' cm',height:'x'});
      return {type:'text', q:svg+'The second triangle is an enlargement of the first. Find x, in cm.',
        answer:[String(b*k)], hint:'Scale factor = '+(a*k)+' ÷ '+a+' = '+k+'. Multiply '+b+' by '+k+'.'};}),
    K(function(){var a=Q.int(2,5),b=Q.int(3,7),k=Q.int(2,3);
      var svg=rtri({base:a+' cm',height:b+' cm'})+rtri({base:'x',height:(b*k)+' cm'});
      return {type:'text', q:svg+'The triangles are similar. Find x, in cm.',
        answer:[String(a*k)], hint:'Scale factor = '+(b*k)+' ÷ '+b+' = '+k+'.'};}),
  ]);

  /* 3.4.1 Congruency (corresponding parts of congruent triangles) */
  add('3.4.1',[
    B(function(){var s=Q.int(4,12);var svg=rtri({base:s+' cm',height:Q.int(3,9)+' cm'});
      return {type:'text', q:svg+'Triangle ABC (shown) is congruent to triangle PQR, where the base AB = PQ. If PQ = '+s+' cm, find AB, in cm.',
        answer:[String(s)], hint:'Congruent triangles have equal corresponding sides.'};}),
    K(function(){var o=Q.mc('SSS',['SSA','AAA','ASS']);
      return {type:'mc', q:'Two triangles have all three pairs of sides equal. Which condition proves them congruent?', options:o.options, answer:o.answer, hint:'Three equal sides.'};}),
    K(function(){var o=Q.mc('RHS',['SSA','AAA','SSS']);
      return {type:'mc', q:'Two right-angled triangles have equal hypotenuses and one equal side. Which condition proves congruence?', options:o.options, answer:o.answer, hint:'Right angle, Hypotenuse, Side.'};}),
  ]);

  /* 3.4.6 Polygons (regular n-gon interior/exterior angles) */
  function polyDia(n){return dia(150,150, polyg(ngonPts(n,74,78,58))+txt(74,82,n+' sides'));}
  add('3.4.6',[
    B(function(){var n=Q.pick([3,4,5,6,8,9,10,12,15,18]);return {type:'text', q:polyDia(n)+'Find the size of each exterior angle of this regular '+n+'-sided polygon, in degrees.',
        answer:[String(360/n)], hint:'Exterior angle = 360° ÷ '+n+'.'};}),
    K(function(){var n=Q.pick([3,4,5,6,8,9,10,12,15,18]);return {type:'text', q:polyDia(n)+'Find the size of each interior angle of this regular '+n+'-sided polygon, in degrees.',
        answer:[String(180-360/n)], hint:'Interior = 180° − exterior (360°÷'+n+').'};}),
    H(function(){var n=Q.int(3,12);return {type:'text', q:polyDia(n)+'Find the sum of the interior angles of a '+n+'-sided polygon, in degrees.',
        answer:[String((n-2)*180)], hint:'Sum = (n − 2) × 180°.'};}),
  ]);

  /* 3.5.1 Area & arc of a sector (π = 22/7) */
  add('3.5.1',[
    B(function(){var r=7*Q.int(1,6),ang=Q.pick([30,45,60,72,90,120,180]);
      return {type:'text', q:sector(r,ang)+'Find the arc length of this sector (π = 22/7), in cm. Give your answer to 1 d.p. if needed.',
        answer:Q.dec(Math.round(ang/360*2*22/7*r*10)/10), hint:'Arc = (θ/360) × 2 × π × r.'};}),
    K(function(){var r=7*Q.int(1,6),ang=Q.pick([36,72,90,120,144,180]);
      return {type:'text', q:sector(r,ang)+'Find the area of this sector (π = 22/7), in cm². Give your answer to 1 d.p. if needed.',
        answer:Q.dec(Math.round(ang/360*22/7*r*r*10)/10), hint:'Area = (θ/360) × π × r².'};}),
  ]);

  /* 3.5.2 Surface area & volume of a cuboid */
  add('3.5.2',[
    B(function(){var a=Q.int(2,9),b=Q.int(2,9),c=Q.int(2,9);
      return {type:'text', q:cuboid(a,b,c)+'Find the volume of this cuboid, in cm³.',
        answer:[String(a*b*c)], hint:'Volume = length × width × height.'};}),
    K(function(){var a=Q.int(2,9),b=Q.int(2,9),c=Q.int(2,9);
      return {type:'text', q:cuboid(a,b,c)+'Find the total surface area of this cuboid, in cm².',
        answer:[String(2*(a*b+a*c+b*c))], hint:'Surface area = 2(ab + ac + bc).'};}),
  ]);

  /* 3.2.1 Venn diagrams (two sets) */
  add('3.2.1',[
    B(function(){var oa=Q.int(2,9),bo=Q.int(1,6),ob=Q.int(2,9),out=Q.int(0,5);
      return {type:'text', q:venn(oa,bo,ob,out)+'From the Venn diagram, find n(A ∪ B).',
        answer:[String(oa+bo+ob)], hint:'Add every number inside the two circles.'};}),
    K(function(){var oa=Q.int(2,9),bo=Q.int(1,6),ob=Q.int(2,9),out=Q.int(0,5);
      return {type:'text', q:venn(oa,bo,ob,out)+'From the Venn diagram, find n(A).',
        answer:[String(oa+bo)], hint:'A is everything inside circle A: the "only A" part plus the overlap.'};}),
    H(function(){var oa=Q.int(2,9),bo=Q.int(1,6),ob=Q.int(2,9),out=Q.int(1,6);
      return {type:'text', q:venn(oa,bo,ob,out)+'From the Venn diagram, find the total number of elements in the universal set ξ.',
        answer:[String(oa+bo+ob+out)], hint:'Everything inside the circles plus the number outside.'};}),
  ]);

})();
