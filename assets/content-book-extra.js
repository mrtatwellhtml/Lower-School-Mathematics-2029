/* Extra practice generators — ADDITIVE, with difficulty levels (Basic / Core / Challenge).
   Original randomised questions modelled on CSEC/NCSE/textbook TYPES only (nothing copied).
   Pushes onto existing topic practice arrays; app.js sorts practice by level and shows a
   difficulty badge. Load AFTER all content-*.js and BEFORE app.js. */
(function () {
  var C = window.CURRICULUM, Q = window.QG;
  if (!C || !Q) return;
  function f(a, b) { return '<span class="frac"><span>' + a + '</span><span>' + b + '</span></span>'; }
  function add(code, gens) {
    var t = C[code];
    if (!t || !t.content || !Array.isArray(t.content.practice)) return;
    gens.forEach(function (g) { t.content.practice.push(g); });
  }
  function B(fn){return {level:'Basic',gen:fn};}
  function K(fn){return {level:'Core',gen:fn};}
  function H(fn){return {level:'Challenge',gen:fn};}
  function mc(v,ds){return Q.mc(String(v),ds.map(String));}
  function pool(list){ // list of [q,correct,[d1,d2,d3]] ; returns an mc item generator
    return function(){ var p=Q.pick(list); var o=Q.mc(p[1],p[2]); return {type:'mc',q:p[0],options:o.options,answer:o.answer,hint:p[3]||'Recall the definition or rule.'}; };
  }

  /* 2.1.1 Integers */
  add('2.1.1',[
    B(function(){var a=Q.int(-12,12),b=Q.int(-12,12);return {type:'text',q:a+' + ('+b+') =',answer:[String(a+b)],hint:'Move along the number line.'};}),
    B(function(){var a=Q.int(1,15),b=Q.int(1,15);return {type:'text',q:a+' − (−'+b+') =',answer:[String(a+b)],hint:'Subtracting a negative adds.'};}),
    K(function(){var a=Q.sign()*Q.int(2,12),b=Q.sign()*Q.int(2,9);var o=mc(a*b,[-a*b,a*b+a,Math.abs(a*b)+1]);return {type:'mc',q:'('+a+') × ('+b+') =',options:o.options,answer:o.answer,hint:'Same signs → positive.'};}),
    K(function(){var a=Q.int(-8,8),b=Q.int(2,6),c=Q.sign()*Q.int(2,6);return {type:'text',q:a+' + '+b+' × ('+c+') =',answer:[String(a+b*c)],hint:'Multiply before adding.'};}),
    H(function(){var d=Q.int(2,18),r=Q.int(1,25);return {type:'text',q:'The temperature was −'+d+' °C, then fell by '+r+' °C. New temperature (°C)?',answer:[String(-d-r)],hint:'Falling makes it more negative.'};}),
    H(function(){var b=Q.sign()*Q.int(2,9),q=Q.sign()*Q.int(2,9),a=b*q;return {type:'text',q:'('+a+') ÷ ('+b+') =',answer:[String(q)],hint:'Different signs → negative.'};}),
  ]);

  /* 2.1.2 Laws & Standard Form */
  add('2.1.2',[
    B(function(){var m=Q.int(11,99)/10,e=Q.int(3,6),n=Math.round(m*Math.pow(10,e));return {type:'text',q:'Write '+n.toLocaleString('en').replace(/,/g,' ')+' in standard form.',answer:Q.stdform(m,e),hint:'One digit before the point.'};}),
    B(function(){var m=Q.int(11,99)/10,e=Q.int(2,4),v=Math.round(m*Math.pow(10,e));return {type:'text',q:'Write '+m+'×10^'+e+' as an ordinary number.',answer:[String(v)],hint:'Move the point '+e+' places right.'};}),
    K(function(){var m=Q.int(11,99)/10,e=Q.int(2,5),v=m/Math.pow(10,e);return {type:'text',q:'Write '+(''+v)+' in standard form.',answer:Q.stdform(m,-e),hint:'A negative power for small numbers.'};}),
    K(pool([
      ['Which law does  a + b = b + a  show?','Commutative',['Associative','Distributive','Identity']],
      ['Which law does  a(b + c) = ab + ac  show?','Distributive',['Commutative','Associative','Inverse']],
      ['Which law does  (a+b)+c = a+(b+c)  show?','Associative',['Commutative','Distributive','Closure']],
      ['a + 0 = a demonstrates the additive…','identity',['inverse','associative','commutative']],
      ['a × 1 = a demonstrates the multiplicative…','identity',['inverse','distributive','associative']],
      ['The set of integers is closed under…','addition',['division','square roots','none']],
      ['Which operation is NOT commutative?','subtraction',['addition','multiplication','both add & multiply']],
      ['The additive inverse of a is…','−a',['1/a','0','a']],
    ])),
    H(function(){var m=Q.int(11,99)/10,e=Q.int(3,5);return {type:'text',q:'Calculate 0.1 × '+m+'×10^'+e+', in standard form.',answer:Q.stdform(m,e-1),hint:'0.1 = 10^-1, so the power drops by 1.'};}),
    H(function(){var a=Q.int(2,20);return {type:'text',q:'What is the additive inverse of '+a+'?',answer:[String(-a)],hint:'It adds to give 0.'};}),
  ]);

  /* 2.1.3 Number Bases */
  function tob(n,b){if(n===0)return '0';var s='';while(n){s=(n%b)+s;n=Math.floor(n/b);}return s;}
  add('2.1.3',[
    B(function(){var n=Q.int(4,31);return {type:'text',q:'Convert '+tob(n,2)+' (base 2) to base 10.',answer:[String(n)],hint:'Add place values 8,4,2,1…'};}),
    B(function(){var n=Q.int(5,31);return {type:'text',q:'Convert '+n+' (base 10) to base 2.',answer:[tob(n,2)],hint:'Divide by 2, read remainders upward.'};}),
    K(function(){var n=Q.int(6,60);return {type:'text',q:'Convert '+n+' (base 10) to base 5.',answer:[tob(n,5)],hint:'Divide by 5, read remainders upward.'};}),
    K(function(){var n=Q.int(6,60);return {type:'text',q:'Convert '+tob(n,5)+' (base 5) to base 10.',answer:[String(n)],hint:'Place values are 25, 5, 1.'};}),
    H(function(){var a=Q.int(2,7),b=Q.int(2,7);return {type:'text',q:'Work out '+tob(a,2)+' + '+tob(b,2)+' in base 2 (answer in base 2).',answer:[tob(a+b,2)],hint:'Add, then convert the total to base 2.'};}),
    H(function(){var n=Q.int(32,63);return {type:'text',q:'Convert '+n+' (base 10) to base 8.',answer:[tob(n,8)],hint:'Divide by 8, read remainders upward.'};}),
  ]);

  /* 2.2.1 Sets */
  add('2.2.1',[
    B(function(){var both=Q.int(2,7),a=both+Q.int(1,8),b=both+Q.int(1,8);return {type:'text',q:'n(A)='+a+', n(B)='+b+', n(A∩B)='+both+'. Find n(A∪B).',answer:[String(a+b-both)],hint:'n(A)+n(B)−n(A∩B).'};}),
    B(function(){var t=Q.int(20,45),a=Q.int(5,t-3);return {type:'text',q:'The universal set has '+t+' members and n(A)='+a+'. Find n(A′).',answer:[String(t-a)],hint:"A′ is everything not in A."};}),
    K(function(){var n=Q.int(2,9);return {type:'text',q:'How many subsets does a set of '+n+' members have?',answer:[String(Math.pow(2,n))],hint:'2 to the power of the number of members.'};}),
    K(function(){var all=Q.sample([1,2,3,4,5,6,7,8,9,10],6),srt=function(z){return z.slice().sort(function(x,y){return x-y;});};
      var inter=all.slice(0,2),aO=all.slice(2,4),bO=all.slice(4,6);
      var A=srt(inter.concat(aO)),Bs=srt(inter.concat(bO)),corr='{'+srt(inter).join(', ')+'}';
      var o=Q.mc(corr,['{'+A.join(', ')+'}','{'+Bs.join(', ')+'}','{'+srt(aO.concat(bO)).join(', ')+'}']);
      return {type:'mc',q:'A = {'+A.join(', ')+'} and B = {'+Bs.join(', ')+'}. Find A∩B.',options:o.options,answer:o.answer,hint:'Elements in BOTH sets.'};}),
    H(function(){var both=Q.int(2,8),a=both+Q.int(1,9),b=both+Q.int(1,9);return {type:'text',q:'In a class, '+a+' play cricket, '+b+' play football and '+both+' play both. How many play at least one?',answer:[String(a+b-both)],hint:'n(A∪B).'};}),
    H(function(){var both=Q.int(2,7),a=both+Q.int(2,9);return {type:'text',q:'n(A)='+a+' and n(A∩B)='+both+'. How many are in A only?',answer:[String(a-both)],hint:'A only = n(A) − n(A∩B).'};}),
  ]);

  /* 2.2.2 Relations, Mappings & Functions */
  add('2.2.2',[
    B(function(){var a=Q.int(2,6),b=Q.int(1,9),x=Q.int(2,9);return {type:'text',q:'For f(x) = '+a+'x + '+b+', find f('+x+').',answer:[String(a*x+b)],hint:'Substitute x = '+x+'.'};}),
    B(function(){var x=Q.int(2,12);return {type:'text',q:'Under the mapping x → 2x − 1, find the image of '+x+'.',answer:[String(2*x-1)],hint:'Double it, then subtract 1.'};}),
    K(function(){var a=Q.int(2,5),x=Q.int(2,9),b=Q.int(1,9),v=a*x+b;return {type:'text',q:'For f(x) = '+a+'x + '+b+', f(x) = '+v+'. Find x.',answer:Q.root(x),hint:'Solve '+a+'x + '+b+' = '+v+'.'};}),
    K(function(){var xs=Q.sample([1,2,3,4,5,6],3).sort(function(a,b){return a-b;});var ys=xs.map(function(x){return 2*x;});var corr='{'+ys.join(', ')+'}';
      var o=Q.mc(corr,['{'+xs.join(', ')+'}','{'+xs.map(function(x){return x+2;}).join(', ')+'}','{'+xs.map(function(x){return 2*x+1;}).join(', ')+'}']);
      return {type:'mc',q:'Find the range of {'+xs.map(function(x){return '('+x+', '+2*x+')';}).join(', ')+'}.',options:o.options,answer:o.answer,hint:'The range is the set of second coordinates.'};}),
    H(function(){var a=Q.int(2,5),b=Q.int(1,6),x=Q.int(2,7),v=a*(x)-b;return {type:'text',q:'For f(x) = '+a+'x − '+b+', find f('+x+').',answer:[String(a*x-b)],hint:'Multiply then subtract.'};}),
    H(pool([
      ['A relation where each input has exactly one output is a…','function',['mapping error','subset','variable']],
      ['The set of first coordinates of a relation is the…','domain',['range','image','codomain']],
      ['The set of second coordinates is the…','range',['domain','input','origin']],
      ['A mapping that is one-to-one and onto is a…','function',['relation only','subset','loop']],
      ['In f(x), x is the…','input',['output','image','range']],
      ['f(3) means…','the output when x = 3',['x times 3','3 times f','the domain']],
      ['A relation can be shown by an…','arrow diagram',['angle','bar chart','pie chart']],
      ['If every x gives one y, the relation IS a…','function',['non-function','many-valued map','set']],
    ])),
  ]);

  /* 2.2.3 Ordered Pairs */
  add('2.2.3',[
    B(function(){var m=Q.int(2,5),c=Q.int(1,6),x=Q.int(1,6);return {type:'text',q:'For y = '+m+'x + '+c+', write the ordered pair when x = '+x+' (form (x, y)).',answer:['('+x+', '+(m*x+c)+')','('+x+','+(m*x+c)+')'],hint:'Find y, then write (x, y).'};}),
    B(function(){var m=Q.int(2,5),c=Q.int(1,8);return {type:'text',q:'The point (0, k) lies on y = '+m+'x + '+c+'. Find k.',answer:[String(c)],hint:'Put x = 0.'};}),
    K(function(){var m=Q.int(2,4),c=Q.int(1,5),x=Q.int(1,5),y=m*x+c;var o=Q.mc('('+x+', '+y+')',['('+x+', '+(y+1)+')','('+(x+1)+', '+y+')','('+x+', '+(y-2)+')']);
      return {type:'mc',q:'Which ordered pair satisfies y = '+m+'x + '+c+'?',options:o.options,answer:o.answer,hint:'Test each pair in the equation.'};}),
    K(function(){var m=Q.int(2,5),c=Q.int(1,6),y=Q.int(10,30);
      // choose x so y = m x + c integer
      var x=(y-c);var yy=m*x+c;return {type:'text',q:'For y = '+m+'x + '+c+', find y when x = '+x+'.',answer:[String(yy)],hint:'Substitute the x-value.'};}),
    H(function(){var m=Q.int(2,4),c=Q.int(1,5),x=Q.int(2,6),y=m*x+c;return {type:'text',q:'The pair ('+x+', y) satisfies y = '+m+'x + '+c+'. Find y.',answer:[String(y)],hint:'Substitute x = '+x+'.'};}),
    H(function(){var m=Q.int(2,4),x=Q.int(-4,-1),c=Q.int(1,6),y=m*x+c;return {type:'text',q:'For y = '+m+'x + '+c+', write the pair when x = '+x+' (form (x, y)).',answer:['('+x+', '+y+')','('+x+','+y+')'],hint:'Careful with the negative x.'};}),
  ]);

  /* 2.2.4 Graphs of Linear Equations */
  add('2.2.4',[
    B(function(){var m=Q.int(2,7),c=Q.sign()*Q.int(1,9);var o=mc(m,[c,-m,m+1]);return {type:'mc',q:'Gradient of y = '+m+'x + '+c+'?',options:o.options,answer:o.answer,hint:'The number in front of x.'};}),
    B(function(){var m=Q.int(2,7),c=Q.int(1,9);var o=mc(c,[m,-c,0]);return {type:'mc',q:'y-intercept of y = '+m+'x + '+c+'?',options:o.options,answer:o.answer,hint:'The constant term.'};}),
    K(function(){var m=Q.int(2,5),x1=Q.int(0,3),y1=Q.int(0,4),r=Q.int(1,3),x2=x1+r,y2=y1+m*r;return {type:'text',q:'Gradient of the line joining ('+x1+', '+y1+') and ('+x2+', '+y2+')?',answer:[String(m)],hint:'(change in y) ÷ (change in x).'};}),
    K(function(){var m=Q.int(1,4),c=Q.int(1,5),x=Q.int(1,4),y=m*x+c;var o=Q.mc('('+x+', '+y+')',['('+x+', '+(y+1)+')','('+(x+1)+', '+y+')','('+x+', '+(y-2)+')']);
      return {type:'mc',q:'Which point lies on y = '+m+'x + '+c+'?',options:o.options,answer:o.answer,hint:'Substitute to check.'};}),
    H(function(){var m=Q.int(2,5),x1=Q.int(0,3),y1=Q.int(0,4),r=Q.int(1,3),x2=x1+r,y2=y1-m*r;return {type:'text',q:'Gradient of the line joining ('+x1+', '+y1+') and ('+x2+', '+y2+')?',answer:[String(-m)],hint:'y decreases, so the gradient is negative.'};}),
    H(function(){var m=Q.int(2,4),c=Q.int(1,6),x=Q.int(1,4),y=m*x+c;return {type:'text',q:'The line y = '+m+'x + '+c+' passes through ('+x+', y). Find y.',answer:[String(y)],hint:'Substitute x = '+x+'.'};}),
  ]);

  /* 2.3.1 Statistical Analysis */
  add('2.3.1',[
    B(function(){var xs=[];for(var i=0;i<5;i++)xs.push(Q.int(2,14));var s=xs.reduce(function(a,b){return a+b;},0);while(s%5){xs[0]++;s++;}return {type:'text',q:'Find the mean of '+xs.join(', ')+'.',answer:[String(s/5)],hint:'Add up, divide by 5.'};}),
    B(function(){var xs=[];for(var i=0;i<6;i++)xs.push(Q.int(1,30));return {type:'text',q:'Find the range of '+xs.join(', ')+'.',answer:[String(Math.max.apply(null,xs)-Math.min.apply(null,xs))],hint:'Highest − lowest.'};}),
    K(function(){var xs=[];for(var i=0;i<5;i++)xs.push(Q.int(1,20));var s=xs.slice().sort(function(a,b){return a-b;});return {type:'text',q:'Find the median of '+xs.join(', ')+'.',answer:[String(s[2])],hint:'Order them; take the middle.'};}),
    K(function(){var base=Q.sample([1,2,3,4,5,6,7,8,9],3),m=Q.pick(base),xs=base.concat([m,m]);xs=Q.shuffle(xs);return {type:'text',q:'Find the mode of '+xs.join(', ')+'.',answer:[String(m)],hint:'The most frequent value.'};}),
    H(function(){var mean=Q.int(5,12),known=[],s=0;for(var i=0;i<3;i++){var v=Q.int(2,15);known.push(v);s+=v;}var fourth=mean*4-s;if(fourth<1){fourth=1;}return {type:'text',q:'The mean of 4 numbers is '+mean+'. Three are '+known.join(', ')+'. Find the fourth.',answer:[String(fourth)],hint:'Total = mean × 4.'};}),
    H(function(){var xs=[];for(var i=0;i<6;i++)xs.push(Q.int(2,12));var s=xs.reduce(function(a,b){return a+b;},0);while(s%6){xs[0]++;s++;}return {type:'text',q:'Find the mean of '+xs.join(', ')+'.',answer:[String(s/6)],hint:'Add up, divide by 6.'};}),
  ]);

  /* 2.3.2 Data Displays */
  add('2.3.2',[
    B(function(){var p=5*Q.int(1,19),a=p*3.6;return {type:'text',q:'On a pie chart, '+p+'% of data is shown. Find the sector angle (degrees).',answer:[String(a).replace(/\.0$/,'')],hint:p+'% of 360°.'};}),
    B(pool([['On a bar chart, each bar height represents the…','frequency',['angle','total','median']],
      ['A pie chart shows data as parts of a…','circle',['line','square','table']],
      ['The whole of a pie chart is…','360°',['180°','100°','90°']],
      ['Equal bars in a bar chart mean equal…','frequencies',['angles','means','ranges']],
      ['A pictograph represents data using…','pictures/symbols',['angles','bars only','points']],
      ['The mode can be read from a bar chart as the…','tallest bar',['shortest bar','middle bar','first bar']],
      ['A line graph is best for showing data over…','time',['categories','angles','sets']],
      ['The total of all pie-chart sector angles is…','360°',['100°','270°','200°']],
    ])),
    K(function(){var ang=Q.pick([30,45,60,72,90,120,180]);var g=Q.gcd(ang,360);var corr=(ang/g)+'/'+(360/g);
      var o=Q.mc(corr,[ang+'/100',(ang/g)+'/'+(360/g+1),'1/'+(360/g+2)]);return {type:'mc',q:'A pie-chart sector is '+ang+'°. What fraction of the total is this?',options:o.options,answer:o.answer,hint:'Fraction = angle ÷ 360.'};}),
    K(function(){var p=5*Q.int(2,18),a=p*3.6;return {type:'text',q:'In a survey '+p+'% chose blue. What angle shows blue on a pie chart (degrees)?',answer:[String(a).replace(/\.0$/,'')],hint:p+'% of 360°.'};}),
    H(function(){var tot=Q.pick([20,24,30,36,40]),cat=Q.int(2,tot-2);var ang=Math.round(cat/tot*360);
      // ensure divisible for a clean answer
      var cands=[];for(var c=1;c<tot;c++){if((c/tot*360)%1===0)cands.push(c);}var cc=Q.pick(cands);var aa=cc/tot*360;
      return {type:'text',q:'In a pie chart of '+tot+' people, '+cc+' chose tea. Find its sector angle (degrees).',answer:[String(aa)],hint:'(count ÷ total) × 360.'};}),
    H(function(){var ang=18*Q.int(1,10);var p=ang/360*100;return {type:'text',q:'A pie-chart sector is '+ang+'°. What percentage of the total is this?',answer:[String(p).replace(/\.0$/,'')+'%',String(p).replace(/\.0$/,'')],hint:'(angle ÷ 360) × 100.'};}),
  ]);

  /* 2.4.1 Coordinate Geometry */
  add('2.4.1',[
    B(function(){var x1=Q.int(-4,5),y1=Q.int(-4,5),x2=x1+2*Q.int(1,4),y2=y1+2*Q.int(1,4);return {type:'text',q:'Midpoint of ('+x1+', '+y1+') and ('+x2+', '+y2+')? (form (x, y))',answer:['('+(x1+x2)/2+', '+(y1+y2)/2+')','('+(x1+x2)/2+','+(y1+y2)/2+')'],hint:'Average each coordinate.'};}),
    B(function(){var x=Q.pick([-4,-3,3,4]),y=Q.pick([-4,-3,3,4]);var q=(x>0?(y>0?'first':'fourth'):(y>0?'second':'third'));var o=Q.mc(q,['first','second','third','fourth'].filter(function(z){return z!==q;}));return {type:'mc',q:'In which quadrant does ('+x+', '+y+') lie?',options:o.options,answer:o.answer,hint:'Signs of x and y.'};}),
    K(function(){var base=Q.pick([[3,4,5],[5,12,13],[8,15,17],[6,8,10],[9,12,15]]),k=Q.int(1,3);var a=base[0]*k,b=base[1]*k;if(Q.chance(0.5)){var t=a;a=b;b=t;}return {type:'text',q:'Length of the line from (0, 0) to ('+a+', '+b+')?',answer:[String(base[2]*k)],hint:'√(x² + y²).'};}),
    K(function(){var x1=Q.int(-6,-1),y1=Q.int(-6,-1),x2=x1+2*Q.int(1,4),y2=y1+2*Q.int(1,4);return {type:'text',q:'Midpoint of ('+x1+', '+y1+') and ('+x2+', '+y2+')? (form (x, y))',answer:['('+(x1+x2)/2+', '+(y1+y2)/2+')','('+(x1+x2)/2+','+(y1+y2)/2+')'],hint:'Average each coordinate.'};}),
    H(function(){var base=Q.pick([[8,15,17],[7,24,25],[20,21,29],[9,40,41],[12,35,37]]),k=Q.int(1,3);var a=base[0]*k,b=base[1]*k;if(Q.chance(0.5)){var t=a;a=b;b=t;}return {type:'text',q:'Length of the line from (0, 0) to ('+a+', '+b+')?',answer:[String(base[2]*k)],hint:'Use Pythagoras.'};}),
    H(function(){var mx=Q.int(0,6),my=Q.int(0,6),ax=Q.int(-4,4),ay=Q.int(-4,4);var bx=2*mx-ax,by=2*my-ay;return {type:'text',q:'M('+mx+', '+my+') is the midpoint of A('+ax+', '+ay+') and B. Find B (form (x, y)).',answer:['('+bx+', '+by+')','('+bx+','+by+')'],hint:'B = 2M − A for each coordinate.'};}),
  ]);

  /* 2.4.2 Transformations */
  add('2.4.2',[
    B(function(){var x=Q.pick([-6,-5,-4,-3,3,4,5,6]),y=Q.pick([-6,-5,-4,-3,3,4,5,6]);return {type:'text',q:'Reflect ('+x+', '+y+') in the x-axis (form (x, y)).',answer:['('+x+', '+(-y)+')','('+x+','+(-y)+')'],hint:'Change the sign of y.'};}),
    B(function(){var x=Q.pick([-6,-5,-4,-3,3,4,5,6]),y=Q.pick([-6,-5,-4,-3,3,4,5,6]);return {type:'text',q:'Reflect ('+x+', '+y+') in the y-axis (form (x, y)).',answer:['('+(-x)+', '+y+')','('+(-x)+','+y+')'],hint:'Change the sign of x.'};}),
    K(function(){var x=Q.int(-5,5),y=Q.int(-5,5),a=Q.int(-5,5),b=Q.int(-5,5);return {type:'text',q:'Translate ('+x+', '+y+') by the vector ('+a+', '+b+') (form (x, y)).',answer:['('+(x+a)+', '+(y+b)+')','('+(x+a)+','+(y+b)+')'],hint:'Add the vector.'};}),
    K(function(){var x=Q.int(-6,6),y=Q.int(-6,6);if(x===y)y=x+1;return {type:'text',q:'Reflect ('+x+', '+y+') in the line y = x (form (x, y)).',answer:['('+y+', '+x+')','('+y+','+x+')'],hint:'Swap the coordinates.'};}),
    H(function(){var x=Q.nz(-6,6),y=Q.nz(-6,6);return {type:'text',q:'Reflect ('+x+', '+y+') in the origin (form (x, y)).',answer:['('+(-x)+', '+(-y)+')','('+(-x)+','+(-y)+')'],hint:'Change both signs.'};}),
    H(function(){var x=Q.int(-4,4),y=Q.int(-4,4),a=Q.int(-4,4),b=Q.int(-4,4);var x2=x+a,y2=y+b;return {type:'text',q:'Translate ('+x+', '+y+') by ('+a+', '+b+'), then reflect in the x-axis (form (x, y)).',answer:['('+x2+', '+(-y2)+')','('+x2+','+(-y2)+')'],hint:'Translate first, then flip y.'};}),
  ]);

  /* 2.4.3 Angles */
  add('2.4.3',[
    B(function(){var a=Q.int(20,160);return {type:'text',q:'Two angles lie on a straight line. One is '+a+'°. Find the other (degrees).',answer:[String(180-a)],hint:'They add to 180°.'};}),
    B(function(){var a=Q.int(80,300);return {type:'text',q:'Angles at a point: one is '+a+'°. Find the remaining angle (degrees).',answer:[String(360-a)],hint:'Angles at a point add to 360°.'};}),
    K(function(){var a=Q.int(30,90),b=Q.int(30,90);if(180-a-b<10)b=60;return {type:'text',q:'A triangle has angles '+a+'° and '+b+'°. Find the third (degrees).',answer:[String(180-a-b)],hint:'Angles in a triangle add to 180°.'};}),
    K(function(){var combos=[[1,4],[2,3],[1,5],[2,4],[1,8],[2,7],[4,5],[1,9],[3,7],[4,6],[7,8],[6,9]];var c=Q.pick(combos),x=90/(c[0]+c[1]);return {type:'text',q:'In a right-angled triangle the other two angles are '+c[0]+'x and '+c[1]+'x. Find x (degrees).',answer:[String(x)],hint:(c[0]+c[1])+'x = 90.'};}),
    H(function(){var a=Q.int(20,80);return {type:'text',q:'An isosceles triangle has a top angle of '+a+'°. Find each equal base angle (degrees).',answer:[String((180-a)/2).replace(/\.0$/,'')],hint:'The two base angles are equal; all three add to 180°.'};}),
    H(function(){var a=Q.int(40,140);return {type:'text',q:'Between two parallel lines, co-interior angles include one of '+a+'°. Find the other (degrees).',answer:[String(180-a)],hint:'Co-interior (allied) angles add to 180°.'};}),
  ]);

  /* 2.4.4 Constructions (concept-limited; pooled + a couple parameterised) */
  add('2.4.4',[
    B(function(){var k=Q.int(10,80);return {type:'text',q:'An angle of '+(2*k)+'° is bisected. Each half is ___ °.',answer:[String(k)],hint:'Bisect means cut into two equal parts.'};}),
    K(pool([
      ['The construction that cuts an angle into two equal parts is the…','angle bisector',['perpendicular bisector','protractor','median']],
      ['The perpendicular bisector of a segment passes through its…','midpoint',['endpoint','gradient','origin']],
      ['Which instrument draws arcs of a fixed radius?','a pair of compasses',['a protractor','a set square','a ruler']],
      ['Which instrument measures an angle in degrees?','a protractor',['compasses','a ruler','a set square']],
      ['A 60° angle is constructed using the method for an…','equilateral triangle',['isosceles triangle','square','circle']],
      ['Every point on the perpendicular bisector of AB is…','equidistant from A and B',['closer to A','closer to B','on AB']],
      ['Two lines meeting at 90° are…','perpendicular',['parallel','equal','bisected']],
      ['Lines that never meet and stay the same distance apart are…','parallel',['perpendicular','intersecting','skew']],
    ])),
    H(pool([
      ['A 90° angle can be made by bisecting a…','straight angle (180°)',['60° angle','45° angle','full turn']],
      ['A 30° angle can be made by bisecting a…','60° angle',['90° angle','45° angle','120° angle']],
      ['To bisect a segment you use…','compasses and a straight edge',['only a ruler','only a protractor','freehand drawing']],
      ['The set of points a fixed distance from a point forms a…','circle',['line','square','triangle']],
      ['A 45° angle is obtained by bisecting a…','90° angle',['60° angle','30° angle','180° angle']],
      ['Equal arcs from A and B are used to draw the…','perpendicular bisector of AB',['midpoint only','angle bisector','a parallel line']],
      ['To copy an angle accurately you use…','compasses and a straight edge',['a protractor only','a ruler only','estimation']],
      ['The point equidistant from all three vertices of a triangle is found using…','perpendicular bisectors',['angle bisectors','medians','altitudes']],
    ])),
    K(function(){var a=Q.int(30,150);var o=Q.mc('supplementary',['complementary','vertically opposite','alternate']);return {type:'mc',q:'Angles of '+a+'° and '+(180-a)+'° on a straight line are described as…',options:o.options,answer:o.answer,hint:'They add up to 180°.'};}),
    K(function(){var a=Q.int(20,70);var o=Q.mc('complementary',['supplementary','vertically opposite','corresponding']);return {type:'mc',q:'Angles of '+a+'° and '+(90-a)+'° are described as…',options:o.options,answer:o.answer,hint:'They add up to 90°.'};}),
    H(pool([
      ['A straight angle measures…','180°',['90°','360°','45°']],
      ['Bisecting a right angle gives two angles of…','45°',['30°','60°','90°']],
      ['Bisecting a 60° angle gives two angles of…','30°',['45°','15°','60°']],
      ['A full turn (revolution) measures…','360°',['180°','270°','90°']],
      ['The three angle bisectors of a triangle meet at the…','incentre',['centroid','vertex','midpoint']],
      ['The three perpendicular bisectors of a triangle meet at the…','circumcentre',['incentre','centroid','orthocentre']],
      ['The locus of points a fixed distance from a straight line is a…','pair of parallel lines',['circle','single point','triangle']],
      ['A 120° angle can be made by adding two constructed angles of…','60° and 60°',['90° and 30°','45° and 45°','30° and 30°']],
    ])),
  ]);

  /* 2.5.1 Units */
  add('2.5.1',[
    B(function(){var v=Q.int(2,90)/10;return {type:'text',q:'Convert '+v+' km to metres.',answer:[String(v*1000)],hint:'1 km = 1000 m.'};}),
    B(function(){var v=Q.int(2,60)*100;return {type:'text',q:'Convert '+v+' g to kilograms.',answer:Q.dec(v/1000),hint:'1 kg = 1000 g.'};}),
    K(function(){var h=Q.pick([0.25,0.5,0.75,1,1.5,2,2.5,3,3.5,4,4.5,5]);return {type:'text',q:'Convert '+h+' hours to minutes.',answer:[String(h*60)],hint:'1 hour = 60 minutes.'};}),
    K(function(){var v=Q.int(2,9);return {type:'text',q:'Convert '+v+' m² to cm². (1 m² = 10 000 cm²)',answer:[String(v*10000)],hint:'Multiply by 10 000.'};}),
    H(function(){var v=Q.int(150,900);return {type:'text',q:'Convert '+v+' cm to metres.',answer:Q.dec(v/100),hint:'100 cm = 1 m.'};}),
    H(function(){var v=Q.int(2,9)*1000;return {type:'text',q:'Convert '+v+' mL to litres.',answer:[String(v/1000)],hint:'1000 mL = 1 L.'};}),
  ]);

  /* 2.5.2 Circles */
  add('2.5.2',[
    B(function(){var r=7*Q.int(1,12);return {type:'text',q:'Circumference of a circle, radius '+r+' cm (π = 22/7).',answer:[String(2*22/7*r)],hint:'2 × π × r.'};}),
    B(function(){var r=Q.int(3,20);return {type:'text',q:'A circle has radius '+r+' cm. Find its diameter (cm).',answer:[String(2*r)],hint:'Diameter = 2 × radius.'};}),
    K(function(){var r=7*Q.int(1,12);return {type:'text',q:'Area of a circle, radius '+r+' cm (π = 22/7).',answer:[String(22/7*r*r)],hint:'π × r².'};}),
    K(function(){var d=2*Q.int(3,20);return {type:'text',q:'A circle has diameter '+d+' cm. Find its radius (cm).',answer:[String(d/2)],hint:'Radius = diameter ÷ 2.'};}),
    H(function(){var r=7*Q.int(1,8);return {type:'text',q:'Circumference of a circle, diameter '+(2*r)+' cm (π = 22/7).',answer:[String(2*22/7*r)],hint:'π × diameter.'};}),
    H(function(){var r=7*Q.int(1,12);return {type:'text',q:'A semicircle has radius '+r+' cm. Find its curved edge length (π = 22/7).',answer:[String(22/7*r)],hint:'Half of the full circumference.'};}),
  ]);

  /* 2.5.3 Area & Perimeter */
  add('2.5.3',[
    B(function(){var l=Q.int(4,20),w=Q.int(3,15);return {type:'text',q:'Area of a rectangle '+l+' cm by '+w+' cm (cm²).',answer:[String(l*w)],hint:'length × width.'};}),
    B(function(){var l=Q.int(4,20),w=Q.int(3,15);return {type:'text',q:'Perimeter of a rectangle '+l+' cm by '+w+' cm (cm).',answer:[String(2*(l+w))],hint:'2 × (l + w).'};}),
    K(function(){var b=2*Q.int(2,9),h=Q.int(3,14);return {type:'text',q:'Area of a triangle, base '+b+' cm, height '+h+' cm (cm²).',answer:[String(b*h/2)],hint:'½ × base × height.'};}),
    K(function(){var s=Q.int(3,15);return {type:'text',q:'Area of a square of side '+s+' cm (cm²).',answer:[String(s*s)],hint:'side × side.'};}),
    H(function(){var a=Q.int(6,14),b=Q.int(4,10),c=Q.int(3,8);return {type:'text',q:'A rectangle '+a+' cm by '+b+' cm has a '+c+' cm by '+c+' cm square cut out. Find the remaining area (cm²).',answer:[String(a*b-c*c)],hint:'Rectangle area − square area.'};}),
    H(function(){var s=Q.int(4,12);return {type:'text',q:'Find the perimeter of a square of side '+s+' cm (cm).',answer:[String(4*s)],hint:'4 × side.'};}),
  ]);

  /* 2.5.4 Volume */
  add('2.5.4',[
    B(function(){var a=Q.int(2,9),b=Q.int(2,9),c=Q.int(2,9);return {type:'text',q:'Volume of a cuboid '+a+'×'+b+'×'+c+' cm (cm³).',answer:[String(a*b*c)],hint:'l × w × h.'};}),
    B(function(){var s=Q.int(2,9);return {type:'text',q:'Volume of a cube of side '+s+' cm (cm³).',answer:[String(s*s*s)],hint:'side³.'};}),
    K(function(){var ar=Q.int(8,40),l=Q.int(3,12);return {type:'text',q:'A prism has cross-section area '+ar+' cm² and length '+l+' cm. Find its volume (cm³).',answer:[String(ar*l)],hint:'area × length.'};}),
    K(function(){var v=Q.int(2,9);return {type:'text',q:'How many millilitres are in '+v+' litres?',answer:[String(v*1000)],hint:'1 L = 1000 mL.'};}),
    H(function(){var a=Q.int(2,6),b=Q.int(2,6),c=Q.int(2,6);return {type:'text',q:'A tank '+a+'×'+b+'×'+c+' cm is filled with water. How many cm³ does it hold?',answer:[String(a*b*c)],hint:'Volume of a cuboid.'};}),
    H(function(){var s=Q.int(2,7),n=Q.int(2,5);return {type:'text',q:n+' cubes of side '+s+' cm are stacked. Find the total volume (cm³).',answer:[String(n*s*s*s)],hint:'Volume of one cube × '+n+'.'};}),
  ]);

  /* 2.5.5 Ratio & Proportion */
  add('2.5.5',[
    B(function(){var k=Q.int(2,6),a=Q.int(1,5),b=Q.int(1,5);if(a===b)b++;var g=Q.gcd(a,b);return {type:'text',q:'Write the ratio '+(a*k)+' : '+(b*k)+' in simplest form (a:b).',answer:[(a/g)+':'+(b/g),(a/g)+' : '+(b/g)],hint:'Divide both parts by their HCF.'};}),
    B(function(){var n1=Q.int(2,6),unit=Q.int(2,9),n2=Q.int(3,9);return {type:'text',q:'If '+n1+' pens cost $'+(unit*n1)+', find the cost of '+n2+' pens ($).',answer:[String(unit*n2)],hint:'Find one pen first.'};}),
    K(function(){var a=Q.int(1,5),b=Q.int(1,5);if(a===b)b++;var part=Q.int(3,12),total=(a+b)*part;return {type:'text',q:'$'+total+' is shared in the ratio '+a+' : '+b+'. Find the larger share ($).',answer:[String(Math.max(a,b)*part)],hint:'One part = total ÷ (a+b).'};}),
    K(function(){var k=Q.int(2,5),b=Q.int(2,15),total=(k+1)*b;return {type:'text',q:'One share is '+k+' times another; together $'+total+'. Find the smaller share ($).',answer:[String(b)],hint:'There are '+(k+1)+' equal parts.'};}),
    H(function(){var a=Q.int(2,4),b=Q.int(2,4),c=Q.int(2,4);var part=Q.int(2,8),total=(a+b+c)*part;return {type:'text',q:'$'+total+' is shared among three in the ratio '+a+' : '+b+' : '+c+'. Find the largest share ($).',answer:[String(Math.max(a,b,c)*part)],hint:'Total parts = '+(a+b+c)+'.'};}),
    H(function(){var speed=Q.int(40,80),t=Q.int(2,5);return {type:'text',q:'A car travels at '+speed+' km/h for '+t+' hours. How far does it go (km)?',answer:[String(speed*t)],hint:'distance = speed × time.'};}),
  ]);

  /* 2.5.6 Consumer Arithmetic */
  add('2.5.6',[
    B(function(){var mp=Q.int(4,20)*10,d=Q.pick([10,15,20,25]);return {type:'text',q:'A $'+mp+' item has a '+d+'% discount. Find the amount paid ($).',answer:[String(mp*(100-d)/100)],hint:'Pay '+(100-d)+'% of the price.'};}),
    B(function(){var cp=Q.int(2,20)*10,pct=Q.pick([10,20,25,50]);return {type:'text',q:'An item costs $'+cp+' and is sold at '+pct+'% profit. Find the selling price ($).',answer:[String(cp*(100+pct)/100)],hint:'Sell at '+(100+pct)+'% of cost.'};}),
    K(function(){var p=Q.int(2,12)*100,r=Q.pick([2,4,5,10]),t=Q.int(1,4);return {type:'text',q:'Simple interest on $'+p+' at '+r+'% per year for '+t+' years ($).',answer:[String(p*r*t/100)],hint:'(P × R × T) ÷ 100.'};}),
    K(function(){var p=Q.int(5,30)*10,v=Q.pick([10,12,15]);return {type:'text',q:'Add '+v+'% VAT to a $'+p+' bill. Find the total ($).',answer:[String(p*(100+v)/100)],hint:'Pay '+(100+v)+'% of the bill.'};}),
    H(function(){var cp=Q.int(2,20)*10,pct=Q.pick([10,20,25,50]),sp=cp*(100+pct)/100;return {type:'text',q:'An item costs $'+cp+' and sells for $'+sp+'. Find the percentage profit.',answer:[pct+'%',String(pct)],hint:'(profit ÷ cost) × 100.'};}),
    H(function(){var rate=Q.int(10,25),hrs=Q.int(35,45);return {type:'text',q:'A worker earns $'+rate+'/hour for '+hrs+' hours. Find the weekly wage ($).',answer:[String(rate*hrs)],hint:'rate × hours.'};}),
  ]);

  /* 2.6.1 Substitution */
  add('2.6.1',[
    B(function(){var a=Q.int(2,6),b=Q.int(1,9),x=Q.int(2,9);return {type:'text',q:'Find '+a+'x + '+b+' when x = '+x+'.',answer:[String(a*x+b)],hint:'Substitute x = '+x+'.'};}),
    B(function(){var a=Q.int(2,5),b=Q.int(2,5),c=Q.int(1,6);return {type:'text',q:'Find ab + c when a = '+a+', b = '+b+', c = '+c+'.',answer:[String(a*b+c)],hint:'Work out ab first.'};}),
    K(function(){var a=Q.int(2,5),x=Q.int(2,6);return {type:'text',q:'Find '+a+'x² when x = '+x+'.',answer:[String(a*x*x)],hint:'Square x first, then multiply.'};}),
    K(function(){var a=Q.int(2,6),b=Q.int(1,9),x=Q.nz(-5,-1);return {type:'text',q:'Find '+a+'x + '+b+' when x = '+x+'.',answer:[String(a*x+b)],hint:'Careful with the negative.'};}),
    H(function(){var x=Q.int(2,12);return {type:'text',q:'Find x² − 2x when x = '+x+'.',answer:[String(x*x-2*x)],hint:'Square, then subtract 2x.'};}),
    H(function(){var a=Q.int(2,4),b=Q.int(2,4),x=Q.int(2,5),y=Q.int(1,4);return {type:'text',q:'Find '+a+'x + '+b+'y when x = '+x+', y = '+y+'.',answer:[String(a*x+b*y)],hint:'Substitute both values.'};}),
  ]);

  /* 2.6.2 Simplification */
  add('2.6.2',[
    B(function(){var a=Q.int(3,9),c=Q.int(1,a-1),b=Q.int(1,9);return {type:'text',q:'Simplify '+a+'x + '+b+' − '+c+'x.',answer:[(a-c)+'x+'+b,(a-c)+'x + '+b],hint:'Collect the x-terms.'};}),
    B(function(){var a=Q.int(2,6),b=Q.int(2,9);return {type:'text',q:'Expand '+a+'(x + '+b+').',answer:[a+'x+'+(a*b),a+'x + '+(a*b)],hint:'Multiply '+a+' by each term.'};}),
    K(function(){var a=Q.int(2,5),b=Q.int(2,5);return {type:'text',q:'Simplify '+a+'x × '+b+'x.',answer:[(a*b)+'x^2',(a*b)+'x²'],hint:'Multiply numbers, add powers of x.'};}),
    K(function(){var a=Q.int(2,6),b=Q.int(2,6),c=Q.int(1,a-1),d=Q.int(1,5);return {type:'text',q:'Simplify '+a+'a + '+b+'b − '+c+'a + '+d+'b.',answer:[(a-c)+'a+'+(b+d)+'b',(a-c)+'a + '+(b+d)+'b'],hint:'Collect a-terms and b-terms separately.'};}),
    H(function(){var a=Q.int(2,5),b=Q.int(1,6),c=Q.int(2,5),d=Q.int(1,6);return {type:'text',q:'Expand and simplify '+a+'(x + '+b+') + '+c+'(x + '+d+').',answer:[(a+c)+'x+'+(a*b+c*d),(a+c)+'x + '+(a*b+c*d)],hint:'Expand both brackets, then collect.'};}),
    H(function(){var a=Q.int(2,5),b=Q.int(2,6);return {type:'text',q:'Expand '+a+'x(x + '+b+').',answer:[a+'x^2+'+(a*b)+'x',a+'x² + '+(a*b)+'x'],hint:'Multiply '+a+'x by each term.'};}),
  ]);

  /* 2.6.3 Linear Equations */
  add('2.6.3',[
    B(function(){var a=Q.int(2,6),x=Q.int(1,9),b=Q.int(1,9);return {type:'text',q:'Solve '+a+'x + '+b+' = '+(a*x+b)+'.',answer:Q.root(x),hint:'Subtract '+b+', then divide by '+a+'.'};}),
    B(function(){var d=Q.int(2,6),q=Q.int(2,9);return {type:'text',q:'Solve x/'+d+' = '+q+'.',answer:Q.root(q*d),hint:'Multiply both sides by '+d+'.'};}),
    K(function(){var a=Q.int(2,5),x=Q.int(2,8),b=Q.int(1,6);return {type:'text',q:'Solve '+a+'(x − '+b+') = '+(a*(x-b))+'.',answer:Q.root(x),hint:'Divide by '+a+' first.'};}),
    K(function(){var a=Q.int(3,6),b=Q.int(1,a-1),x=Q.int(1,7),c=(a-b)*x;return {type:'text',q:'Solve '+a+'x = '+b+'x + '+c+'.',answer:Q.root(x),hint:'Bring the x-terms together.'};}),
    H(function(){var a=Q.int(2,5),b=Q.int(1,9),x=Q.int(1,8),c=Q.int(1,6);var rhs=a*x+b;return {type:'text',q:'Solve '+a+'x + '+b+' = '+(rhs-c)+' + '+c+'.',answer:Q.root(x),hint:'Simplify the right side first.'};}),
    H(function(){var a=Q.int(2,4),x=Q.int(2,7),b=Q.int(1,6),c=Q.int(1,5);var rhs=a*x-b+c;return {type:'text',q:'Solve '+a+'x − '+b+' = '+(rhs-c)+' + '+c+'.',answer:Q.root(x),hint:'Combine constants, then solve.'};}),
  ]);

  /* 2.6.4 Linear Inequalities */
  add('2.6.4',[
    B(function(){var x=Q.int(1,9),b=Q.int(1,9);return {type:'text',q:'Solve x + '+b+' &gt; '+(x+b)+'. Give x &gt; …',answer:Q.ineq('>',x),hint:'Subtract '+b+' from both sides.'};}),
    B(function(){var a=Q.int(2,5),x=Q.int(2,9);return {type:'text',q:'Solve '+a+'x ≤ '+(a*x)+'. Give x ≤ …',answer:Q.ineq('<=',x),hint:'Divide both sides by '+a+'.'};}),
    K(function(){var x=Q.int(3,12),b=Q.int(1,x-1);return {type:'text',q:'Solve x − '+b+' &lt; '+(x-b)+'. Give x &lt; …',answer:Q.ineq('<',x),hint:'Add '+b+' to both sides.'};}),
    K(function(){var a=Q.int(2,4),x=Q.int(1,7),b=Q.int(1,6);return {type:'text',q:'Solve '+a+'x + '+b+' ≤ '+(a*x+b)+'. Give x ≤ …',answer:Q.ineq('<=',x),hint:'Subtract '+b+', then divide by '+a+'.'};}),
    H(function(){var lo=Q.int(1,4);var o=Q.mc(String(lo+1),[String(lo),String(lo+2),String(lo+3)]);return {type:'mc',q:'Which integer satisfies both x &gt; '+lo+' and x &lt; '+(lo+2)+'?',options:o.options,answer:o.answer,hint:'Strictly between the two values.'};}),
    H(function(){var a=Q.int(2,4),x=Q.int(2,6),b=Q.int(1,5);return {type:'text',q:'Solve '+a+'x − '+b+' &gt; '+(a*x-b-a)+'. Give x &gt; …',answer:Q.ineq('>',x-1),hint:'Add '+b+', then divide by '+a+'.'};}),
  ]);

})();
