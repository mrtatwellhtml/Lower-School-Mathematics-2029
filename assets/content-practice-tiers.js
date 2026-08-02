/* The practice TIER LAYER — Basic / Intermediate / Advanced for every topic.
   Original randomised questions modelled on CSEC/NCSE/textbook TYPES only (nothing copied).
   Purely additive: pushes onto each topic's existing practice array, never replaces.
   app.js sorts by level and prints a heading for each tier, so a student works up through
   Basic then Intermediate then Advanced. Items with no level count as Intermediate.
   Load AFTER all content-*.js and BEFORE app.js. */
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
  function K(fn){return {level:'Intermediate',gen:fn};}
  function H(fn){return {level:'Advanced',gen:fn};}
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

  /* ==================================================================================
     FORM 1 and FORM 3 TIERS
     The section above covers Form 2. Everything below gives the remaining 47 topics a
     Basic and an Advanced tier, so every one of the 70 topics can be worked right up.
     ================================================================================== */

  /* ---------------- Number ---------------- */
  add('1.1.1',[
    B(function(){var d=[Q.int(1,9),Q.int(0,9),Q.int(0,9)],p=Q.int(0,2);d[p]=Q.int(1,9);
      return {type:'text',q:'Place value of the underlined digit in '+d.map(function(x,i){return i===p?'<u>'+x+'</u>':x;}).join('')+'?',answer:[String(d[p]*Math.pow(10,2-p))],hint:'Units, tens, hundreds from the right.'};}),
    B(function(){var n=Q.int(11,99)*10+Q.int(1,9);return {type:'text',q:'Round '+n+' to the nearest 10.',answer:[String(Math.round(n/10)*10)],hint:'Look at the units digit.'};}),
    H(function(){var a=Q.int(2,12),b=Q.int(2,12);return {type:'text',q:'Two bells ring every '+a+' and '+b+' minutes, together now. After how many minutes do they next ring together?',answer:[String(Q.lcm(a,b))],hint:'This is the LCM.'};}),
    H(function(){var g=Q.int(2,9),p=Q.coprime(),a=g*p[0],b=g*p[1];return {type:'text',q:'For '+a+' and '+b+', work out HCF × LCM.',answer:[String(a*b)],hint:'HCF × LCM always equals the product of the two numbers.'};}),
  ]);
  add('1.1.2',[
    B(function(){var k=Q.int(2,9),p=Q.coprime();return {type:'text',q:'Simplify '+f(k*p[0],k*p[1])+' (a/b).',answer:[p[0]+'/'+p[1]],hint:'Divide both by '+k+'.'};}),
    B(function(){var b=Q.int(3,9),c=Q.int(b+1,12);var o=Q.mc(f(1,b),[f(1,c),f(1,c+2),f(1,c+4)]);return {type:'mc',q:'Which is the LARGEST?',options:o.options,answer:o.answer,hint:'A bigger bottom number means smaller pieces.'};}),
    H(function(){var p=Q.coprime(),a=p[0],b=p[1],c=Q.int(2,6),L=Q.lcm(b,c),n=a*(L/b)+1*(L/c),s=Q.simp(n,L);
      return {type:'text',q:'Work out '+f(a,b)+' + '+f(1,c)+' (a/b).',answer:[s[0]+'/'+s[1]],hint:'Common denominator '+L+'.'};}),
    H(function(){var b=Q.pick([3,4,5,6,8]),a=Q.int(1,b-1),n=b*Q.int(2,12);return {type:'text',q:'Find '+f(a,b)+' of '+n+'.',answer:[String(a*n/b)],hint:'Divide by '+b+', then multiply by '+a+'.'};}),
  ]);
  add('1.1.3',[
    B(function(){var a=-Q.int(1,9),b=Q.int(1,9);return {type:'text',q:'Work out '+a+' + '+b+'.',answer:[String(a+b)],hint:'Move right along the number line.'};}),
    B(function(){var s=-Q.int(1,12),r=Q.int(1,20);return {type:'text',q:'The temperature is '+s+' °C and rises by '+r+' °C. Find the new temperature (°C).',answer:[String(s+r)],hint:'Rising means add.'};}),
    H(function(){var a=Q.nz(-9,9),b=Q.nz(-9,9),c=Q.nz(-5,5);return {type:'text',q:'Work out ('+a+') × ('+b+') × ('+c+').',answer:[String(a*b*c)],hint:'Multiply two at a time, watching the signs.'};}),
    H(function(){var a=Q.nz(-10,10),b=Q.int(2,6),c=Q.nz(-8,8);return {type:'text',q:'Work out '+a+' − '+b+' × ('+c+').',answer:[String(a-b*c)],hint:'Multiply before subtracting.'};}),
  ]);
  add('1.1.4',[
    B(function(){var a=Q.int(11,89)/10,b=Q.int(11,89)/10;return {type:'text',q:'Work out '+a+' + '+b+'.',answer:Q.dec(Q.fix(a+b,2)),hint:'Line up the decimal points.'};}),
    B(function(){var v=Q.int(11,99)/10,k=Q.pick([10,100]);return {type:'text',q:'Work out '+v+' × '+k+'.',answer:Q.dec(Q.fix(v*k,2)),hint:'Move the point '+(k===10?'one place':'two places')+' right.'};}),
    H(function(){var q=Q.int(2,40),d=Q.pick([0.2,0.5,0.4,0.25]);return {type:'text',q:'Work out '+Q.fix(q*d,2)+' ÷ '+d+'.',answer:Q.dec(q),hint:'Multiply both numbers by 10 (or 100) first.'};}),
    H(function(){var a=Q.int(2,9)/10,b=Q.int(11,99)/100;return {type:'text',q:'Work out '+a+' × '+b+'.',answer:Q.dec(Q.fix(a*b,3)),hint:'Ignore the points, multiply, then count 3 decimal places.'};}),
  ]);
  add('1.1.5',[
    B(function(){var n=Q.int(2,60)*10;return {type:'text',q:'Find 10% of '+n+'.',answer:Q.dec(n/10),hint:'Divide by 10.'};}),
    B(function(){var n=2*Q.int(5,60);return {type:'text',q:'Find 50% of '+n+'.',answer:[String(n/2)],hint:'Half of it.'};}),
    H(function(){var a=Q.pick([12,15,16,20,24,25,30,40,50]),b=a*Q.int(2,5);return {type:'text',q:'Express '+a+' as a percentage of '+b+'.',answer:[Q.fix(a/b*100,2)+'%',String(Q.fix(a/b*100,2))],hint:'('+a+' ÷ '+b+') × 100.'};}),
    H(function(){var n=Q.pick([200,250,400,500,800]),p=Q.pick([5,10,15,20,25]);return {type:'text',q:'A price of $'+n+' rises by '+p+'%. Find the new price ($).',answer:Q.money(n*(100+p)/100),hint:'Multiply by '+((100+p)/100)+'.'};}),
  ]);
  add('1.1.6',[
    B(function(){var cp=Q.int(10,90),pr=Q.int(5,40);return {type:'text',q:'CP = $'+cp+', SP = $'+(cp+pr)+'. Find the profit ($).',answer:[String(pr),'$'+pr],hint:'SP − CP.'};}),
    B(function(){var mp=Q.pick([100,200,300,400,500]),d=Q.pick([10,20,25,50]);return {type:'text',q:'Find the DISCOUNT on a $'+mp+' item at '+d+'% off ($).',answer:Q.money(mp*d/100),hint:d+'% of '+mp+'.'};}),
    H(function(){var cp=Q.pick([40,50,60,80,100,200]),p=Q.pick([10,20,25,50]);return {type:'text',q:'CP = $'+cp+' and SP = $'+(cp*(100+p)/100)+'. Find the percentage profit.',answer:[p+'%',String(p)],hint:'(profit ÷ CP) × 100.'};}),
    H(function(){var cp=Q.pick([80,120,200,240,300]),l=Q.pick([10,20,25]);return {type:'text',q:'CP = $'+cp+' with a '+l+'% loss. Find the selling price ($).',answer:Q.money(cp*(100-l)/100),hint:'Sell at '+(100-l)+'% of cost.'};}),
  ]);
  add('3.1.1',[
    B(pool([['Is 0.75 rational or irrational?','rational',['irrational','neither','both']],
            ['Is √9 rational or irrational?','rational',['irrational','neither','both']],
            ['Is π rational or irrational?','irrational',['rational','neither','both']],
            ['Is √5 rational or irrational?','irrational',['rational','neither','both']],
            ['Is −4 rational or irrational?','rational',['irrational','neither','both']],
            ['Is 0.333… (recurring) rational or irrational?','rational',['irrational','neither','both']]],
           'A rational number can be written as a fraction.')),
    B(function(){var k=Q.int(2,12);return {type:'text',q:'Evaluate √'+(k*k)+'.',answer:[String(k)],hint:'Which number times itself gives '+(k*k)+'?'};}),
    H(function(){var a=Q.int(2,20),b=Q.int(2,20);return {type:'text',q:'Add in base 2: '+Q.toBase(a,2)+'₂ + '+Q.toBase(b,2)+'₂ (answer in base 2).',answer:[Q.toBase(a+b,2)],hint:'Add in base 10 first, then convert.'};}),
    H(function(){var lo=Q.int(2,9),n=Q.int(lo*lo+1,(lo+1)*(lo+1)-1);return {type:'text',q:'√'+n+' lies between which two consecutive integers? Give the SMALLER one.',answer:[String(lo)],hint:lo+'² = '+(lo*lo)+' and '+(lo+1)+'² = '+((lo+1)*(lo+1))+'.'};}),
  ]);

  /* ---------------- Sets, Relations & Functions ---------------- */
  add('1.2.1',[
    B(function(){var n=Q.int(3,7),A=Q.sample([1,2,3,4,5,6,7,8,9,10,11,12],n).sort(function(a,b){return a-b;});
      return {type:'text',q:'A = {'+A.join(', ')+'}. Find n(A).',answer:[String(n)],hint:'Count the members.'};}),
    B(function(){var A=Q.sample([2,4,6,8,10,12],4).sort(function(a,b){return a-b;}),inA=Q.chance(0.5);
      var e=inA?Q.pick(A):Q.pick([1,3,5,7,9,11].filter(function(x){return A.indexOf(x)<0;}));
      return {type:'text',q:'A = {'+A.join(', ')+'}. Is '+e+' ∈ A? (yes or no)',answer:[inA?'yes':'no'],hint:'Just check the list.'};}),
    H(function(){var n=Q.int(2,12);return {type:'text',q:'How many subsets does a set with '+n+' members have?',answer:[String(Math.pow(2,n))],hint:'2 to the power of the number of members.'};}),
    H(function(){var top=Q.int(9,20),U=[];for(var i=1;i<=top;i++)U.push(i);
      var k=Q.pick([3,4,5]);var A=U.filter(function(x){return x%2===0;}),B2=U.filter(function(x){return x%k===0;});
      var res=U.filter(function(x){return A.indexOf(x)<0&&B2.indexOf(x)<0;});
      return {type:'text',q:'U = {1…'+top+'}, A = {even}, B = {multiples of '+k+'}. List (A ∪ B)′ (commas, smallest first).',answer:[res.join(','),'{'+res.join(',')+'}'],hint:'Everything that is neither even nor a multiple of '+k+'.'};}),
  ]);
  add('1.2.2',[
    B(function(){var both=Q.int(2,8),a=both+Q.int(2,10);return {type:'text',q:''+a+' students study French and '+both+' study both French and Spanish. How many study French ONLY?',answer:[String(a-both)],hint:'Subtract the overlap.'};}),
    B(function(){var onlyA=Q.int(3,12),both=Q.int(2,8),onlyB=Q.int(3,12),nei=Q.int(1,6);
      return {type:'text',q:'A Venn diagram has '+onlyA+' in A only, '+both+' in both, '+onlyB+' in B only and '+nei+' in neither. How many altogether?',answer:[String(onlyA+both+onlyB+nei)],hint:'Add all four regions.'};}),
    H(function(){var both=Q.int(3,10),onlyA=Q.int(4,14),onlyB=Q.int(4,14),nei=Q.int(2,8),t=onlyA+both+onlyB+nei;
      return {type:'text',q:'Of '+t+' people, '+(onlyA+both)+' play tennis, '+(onlyB+both)+' play squash and '+nei+' play neither. How many play BOTH?',answer:[String(both)],hint:'Union = '+t+' − '+nei+'; then use n(A)+n(B)−n(A∪B).'};}),
    H(function(){var both=Q.int(3,9),onlyA=Q.int(4,12),onlyB=Q.int(4,12);
      return {type:'text',q:''+(onlyA+both)+' like maths, '+(onlyB+both)+' like science, '+both+' like both. How many like EXACTLY ONE subject?',answer:[String(onlyA+onlyB)],hint:'Leave out the overlap entirely.'};}),
  ]);
  add('3.2.1',[
    B(pool([['Which set does 7 belong to?','ℕ (natural numbers)',['only ℝ','only ℚ','none']],
            ['Which set contains 0 but no negatives?','𝕎 (whole numbers)',['ℕ','ℤ','ℚ']],
            ['Which set contains the negatives of the whole numbers?','ℤ (integers)',['ℕ','𝕎','irrationals']],
            ['√2 belongs to which set?','ℝ but not ℚ',['ℕ','ℤ','𝕎']],
            ['Every fraction a/b belongs to…','ℚ (rationals)',['ℕ','𝕎','irrationals']]],
           'Work outwards: counting → whole → integers → rationals → reals.')),
    B(function(){var b=Q.int(12,30),a=Q.int(3,b-2);return {type:'text',q:'A ⊂ B with n(A) = '+a+' and n(B) = '+b+'. Find n(A ∪ B).',answer:[String(b)],hint:'A sits entirely inside B.'};}),
    H(function(){var x=Q.int(1,7),y=Q.int(1,7);return {type:'text',q:'Set A holds pairs with x + y = '+(x+y)+', set B pairs with y − x = '+(y-x)+'. Find the y in A ∩ B.',answer:Q.root(y,'y'),hint:'Add the two equations to eliminate x.'};}),
    H(function(){var t=Q.int(30,60),a=Q.int(10,25),b=Q.int(10,25),nei=Q.int(2,8);var both=a+b-(t-nei);
      if(both<1){both=1;a=Q.int(10,25);b=(t-nei)+both-a;}
      return {type:'text',q:'n(U) = '+t+', n(A) = '+a+', n(B) = '+b+' and '+nei+' are in neither. Find n(A ∩ B).',answer:[String(a+b-(t-nei))],hint:'n(A∪B) = '+t+' − '+nei+'.'};}),
  ]);
  add('3.2.2',[
    B(function(){var m=Q.nz(-9,9),c=Q.nz(-9,9);return {type:'text',q:'State the gradient of y = '+Q.polyHtml([[m,'x'],[c,'']])+'.',answer:[String(m)],hint:'The number in front of x.'};}),
    B(function(){var m=Q.nz(-9,9),c=Q.nz(-9,9);return {type:'text',q:'State the y-intercept of y = '+Q.polyHtml([[m,'x'],[c,'']])+'.',answer:[String(c)],hint:'The constant term.'};}),
    H(function(){var x1=Q.nz(-6,6),y1=Q.nz(-8,8),m=Q.nz(-5,5),r=Q.int(1,4),x2=x1+r,y2=y1+m*r;
      return {type:'text',q:'A line passes through ('+x1+', '+y1+') and ('+x2+', '+y2+'). Find its gradient.',answer:[String(m)],hint:'(change in y) ÷ (change in x).'};}),
    H(function(){var m=Q.nz(-5,5),x=Q.nz(-5,5),y=Q.nz(-8,8),c=y-m*x;
      return {type:'text',q:'A line of gradient '+m+' passes through ('+x+', '+y+'). Find its y-intercept c.',answer:[String(c)],hint:'Substitute into y = mx + c and solve for c.'};}),
  ]);
  add('3.2.3',[
    B(function(){var x=Q.nz(-6,6),y=Q.nz(-6,6);return {type:'text',q:'Two lines cross at ('+x+', '+y+'). What is x in the simultaneous solution?',answer:Q.root(x),hint:'The crossing point IS the solution.'};}),
    B(function(){var m=Q.int(1,4),c=Q.int(1,6),x=Q.int(1,5);return {type:'text',q:'Where does y = '+Q.polyHtml([[m,'x'],[c,'']])+' meet the vertical line x = '+x+'? Give y.',answer:Q.root(m*x+c,'y'),hint:'Substitute x = '+x+'.'};}),
    H(function(){var x=Q.int(1,7),y=Q.int(1,9),a=Q.int(1,4);var s=a*x+y,d=x+y;
      return {type:'text',q:'Solve graphically '+a+'x + y = '+s+' and x + y = '+d+'. Give y.',answer:Q.root(y,'y'),hint:'Subtract the second from the first to remove y… then back-substitute.'};}),
    H(function(){var m=Q.int(2,5),c1=Q.nz(-8,8),c2=Q.nz(-8,8);if(c2===c1)c2=c1+3;
      var o=Q.mc('They are parallel, so there is no solution',['They cross once','They are the same line','They cross twice']);
      return {type:'mc',q:'What happens when you graph y = '+Q.polyHtml([[m,'x'],[c1,'']])+' and y = '+Q.polyHtml([[m,'x'],[c2,'']])+'?',options:o.options,answer:o.answer,hint:'Compare the gradients.'};}),
  ]);

  /* ---------------- Statistics & Probability ---------------- */
  add('1.3.1',[
    B(function(){var fives=Q.int(1,4),ones=Q.int(0,4),n=fives*5+ones;var t=[];for(var i=0;i<fives;i++)t.push('||||');if(ones)t.push('|'.repeat(ones));
      return {type:'text',q:'A tally reads '+t.join(' ')+' (each crossed group = 5). What is the frequency?',answer:[String(n)],hint:fives+' fives plus '+ones+'.'};}),
    B(function(){var k=Q.pick([2,5,10]),n=Q.int(2,7);return {type:'text',q:'On a pictograph ★ = '+k+' items. How many items do '+n+' stars show?',answer:[String(k*n)],hint:n+' × '+k+'.'};}),
    H(function(){var fs=[Q.int(3,12),Q.int(3,12),Q.int(3,12),Q.int(3,12)],tot=fs.reduce(function(a,b){return a+b;},0);
      return {type:'text',q:'A frequency table shows '+fs.join(', ')+'. How many were surveyed in total?',answer:[String(tot)],hint:'Add every frequency.'};}),
    H(function(){var k=Q.pick([4,5,10,20]),n=Q.int(3,8),half=Q.chance(0.5);
      return {type:'text',q:'★ = '+k+' items. A row shows '+n+' stars'+(half?' and a half star':'')+'. How many items?',answer:Q.dec(n*k+(half?k/2:0)),hint:'Each full star is '+k+'.'};}),
  ]);
  add('1.3.2',[
    B(function(){var v=[];for(var i=0;i<4;i++)v.push(Q.int(1,20));var mx=Math.max.apply(null,v),mn=Math.min.apply(null,v);
      return {type:'text',q:'Find the range of '+v.join(', ')+'.',answer:[String(mx-mn)],hint:'Largest − smallest.'};}),
    B(function(){var m=Q.int(2,12),o=[];while(o.length<2){var x=Q.int(1,15);if(x!==m&&o.indexOf(x)<0)o.push(x);}
      var v=Q.shuffle([m,m,m].concat(o));return {type:'text',q:'Find the mode of '+v.join(', ')+'.',answer:[String(m)],hint:'The most common value.'};}),
    H(function(){var mean=Q.int(4,15),k=Q.pick([4,5]),known=[],s=0;for(var i=0;i<k-1;i++){var x=Q.int(2,20);known.push(x);s+=x;}
      var last=mean*k-s;if(last<1){last=1;mean=Math.round((s+1)/k);}
      return {type:'text',q:'The mean of '+k+' numbers is '+mean+'. '+(k-1)+' of them are '+known.join(', ')+'. Find the last.',answer:[String(mean*k-s)],hint:'Total must be '+mean+' × '+k+'.'};}),
    H(function(){var a=Q.int(1,9),b=a+Q.int(1,5),c=b+Q.int(1,5),d=c+Q.int(1,5);
      return {type:'text',q:'Find the median of '+[a,b,c,d].join(', ')+'.',answer:Q.dec((b+c)/2),hint:'Even count — average the two middle values.'};}),
  ]);
  add('3.3.1',[
    B(function(){var o=Q.mc(f(1,2),[f(1,3),f(1,4),f(1,6)]);return {type:'mc',q:'A fair coin is tossed. What is P(heads)?',options:o.options,answer:o.answer,hint:'Two equally likely outcomes.'};}),
    B(function(){var n=Q.int(2,6),tot=Q.int(n+2,12),s=Q.simp(n,tot);
      return {type:'text',q:'A bag has '+tot+' balls, '+n+' of them red. Find P(red) as a fraction in lowest terms.',answer:[s[0]+'/'+s[1]],hint:n+' out of '+tot+', then simplify.'};}),
    H(function(){var b=Q.pick([4,5,6,8,10]),a=Q.int(1,b-1),s=Q.simp(b-a,b);
      return {type:'text',q:'P(an event) = '+f(a,b)+'. Find P(NOT the event) as a fraction.',answer:[s[0]+'/'+s[1],(b-a)+'/'+b],hint:'1 − P(E).'};}),
    H(function(){var r=Q.int(2,6),bl=Q.int(2,6),g=Q.int(2,6),tot=r+bl+g,s=Q.simp(r+bl,tot);
      return {type:'text',q:'A bag holds '+r+' red, '+bl+' blue and '+g+' green. Find P(red OR blue) as a fraction in lowest terms.',answer:[s[0]+'/'+s[1]],hint:'Favourable = '+r+' + '+bl+' out of '+tot+'.'};}),
  ]);

  /* ---------------- Geometry ---------------- */
  add('1.4.1',[
    B(pool([['How many faces has a cube?','6',['4','8','12']],['How many edges has a cube?','12',['6','8','10']],
            ['How many vertices has a cube?','8',['6','12','4']],['How many faces has a triangular prism?','5',['6','4','8']],
            ['How many sides has a hexagon?','6',['5','7','8']],['How many sides has a pentagon?','5',['6','4','7']]],
           'Count carefully, or picture the net.')),
    B(function(){var p=Q.pick([[3,'triangle'],[4,'quadrilateral'],[5,'pentagon'],[6,'hexagon'],[7,'heptagon'],[8,'octagon'],[9,'nonagon'],[10,'decagon'],[12,'dodecagon']]);
      return {type:'text',q:'How many sides has '+Q.an(p[1])+'?',answer:[String(p[0])],hint:'The name gives it away.'};}),
    H(function(){var s=Q.pick([['cube',6,8],['cuboid',6,8],['square-based pyramid',5,5],['triangular prism',5,6],['hexagonal prism',8,12],['octahedron',8,6],['pentagonal prism',7,10],['tetrahedron',4,4],['pentagonal pyramid',6,6],['heptagonal prism',9,14],['octagonal prism',10,16],['hexagonal pyramid',7,7]]);
      return {type:'text',q:Q.an(s[0]).charAt(0).toUpperCase()+Q.an(s[0]).slice(1)+' has '+s[1]+' faces and '+s[2]+' vertices. Use F + V − E = 2 to find E.',answer:[String(s[1]+s[2]-2)],hint:'E = F + V − 2.'};}),
    H(function(){var o=Q.mc('Their angles divide exactly into 360°',['They have equal sides','They are regular','They have an even number of sides']);
      return {type:'mc',q:'Why do squares, equilateral triangles and regular hexagons tessellate?',options:o.options,answer:o.answer,hint:'Think about the angles meeting at a point.'};}),
  ]);
  add('1.4.2',[
    B(pool([['A line with two endpoints is a…','line segment',['ray','point','plane']],
            ['A line with exactly one endpoint is a…','ray',['line segment','point','angle']],
            ['Lines that never meet are…','parallel',['perpendicular','equal','curved']],
            ['Lines meeting at 90° are…','perpendicular',['parallel','equal','acute']],
            ['A position with no size is a…','point',['line','ray','plane']]],'Think about endpoints and direction.')),
    B(function(){var n=Q.int(3,10);return {type:'text',q:'A polygon has '+n+' sides. How many line segments form its outline?',answer:[String(n)],hint:'One segment per side.'};}),
    H(function(){var o=Q.mc('⊥',['∥','=','≅']);return {type:'mc',q:'Which symbol means "is perpendicular to"?',options:o.options,answer:o.answer,hint:'It looks like a right angle.'};}),
    H(function(){var n=Q.int(4,16);return {type:'text',q:'How many diagonals can be drawn from ONE vertex of a polygon with '+n+' sides?',answer:[String(n-3)],hint:'You cannot join a vertex to itself or its two neighbours.'};}),
  ]);
  add('1.4.3',[
    B(function(){var a=Q.int(15,165);return {type:'text',q:'Angles on a straight line: one is '+a+'°. Find the other (degrees).',answer:[String(180-a)],hint:'They add to 180°.'};}),
    B(function(){var k=Q.pick([[90,'quarter'],[180,'half'],[270,'three-quarter'],[360,'full'],[45,'eighth'],[120,'third'],[60,'sixth'],[30,'twelfth'],[720,'double']]);
      return {type:'text',q:'How many degrees is a'+('aeiou'.indexOf(k[1][0])>-1?'n ':' ')+k[1]+' turn?',answer:[String(k[0])],hint:'A full turn is 360°.'};}),
    H(function(){var a=Q.int(40,140),b=Q.int(40,Math.max(41,320-a-40));return {type:'text',q:'Three angles at a point are '+a+'°, '+b+'° and x. Find x (degrees).',answer:[String(360-a-b)],hint:'Angles at a point add to 360°.'};}),
    H(function(){var r=Q.pick([[1,2],[1,3],[1,4],[1,5],[1,8],[1,9],[2,3],[2,7],[3,5],[3,7],[4,5],[5,7],[2,13],[4,11]]);var a=180*r[0]/(r[0]+r[1]);return {type:'text',q:'Two angles on a straight line are in the ratio '+r[0]+' : '+r[1]+'. Find the SMALLER (degrees).',answer:Q.dec(Q.fix(a,2)),hint:'There are '+(r[0]+r[1])+' parts making 180°.'};}),
  ]);
  add('1.4.4',[
    B(function(){var a=Q.int(30,110),b=Q.int(20,170-a);return {type:'text',q:'A triangle has angles '+a+'° and '+b+'°. Find the third (degrees).',answer:[String(180-a-b)],hint:'They add to 180°.'};}),
    B(function(){var o=Q.mc('60°',['90°','45°','30°']);return {type:'mc',q:'Each angle of an equilateral triangle is…',options:o.options,answer:o.answer,hint:'180 ÷ 3.'};}),
    H(function(){var base=Q.int(20,80),apex=180-2*base;return {type:'text',q:'An isosceles triangle has base angles of '+base+'°. Find the apex angle (degrees).',answer:[String(apex)],hint:'180 − 2 × '+base+'.'};}),
    H(function(){var k=Q.pick([[1,2,3],[1,1,2],[2,3,4],[1,3,5],[3,4,5],[1,2,2],[1,1,4],[2,2,5],[1,4,5],[2,3,5],[1,1,1],[3,3,4],[1,2,6],[2,5,8]]);var s=k[0]+k[1]+k[2],u=180/s;
      return {type:'text',q:'The angles of a triangle are in the ratio '+k.join(' : ')+'. Find the LARGEST (degrees).',answer:Q.dec(Q.fix(Math.max.apply(null,k)*u,2)),hint:'There are '+s+' parts making 180°.'};}),
  ]);
  add('1.4.5',[
    B(function(){var a=Q.int(60,120),b=Q.int(60,120),c=Q.int(60,120),d=360-a-b-c;
      if(d<25||d>170){a=90;b=90;c=Q.int(60,120);d=360-a-b-c;}
      return {type:'text',q:'Three angles of a quadrilateral are '+a+'°, '+b+'° and '+c+'°. Find the fourth (degrees).',answer:[String(360-a-b-c)],hint:'They add to 360°.'};}),
    B(pool([['Which has 4 equal sides and 4 right angles?','square',['rectangle','trapezium','kite']],
            ['Which has exactly one pair of parallel sides?','trapezium',['square','rhombus','kite']],
            ['Which has 4 equal sides but not always right angles?','rhombus',['rectangle','trapezium','kite']],
            ['Which has two pairs of adjacent sides equal?','kite',['square','trapezium','parallelogram']]],
           'Check sides first, then angles.')),
    H(function(){var a=Q.int(40,140);return {type:'text',q:'One angle of a parallelogram is '+a+'°. Find the sum of the OTHER three (degrees).',answer:[String(360-a)],hint:'All four add to 360°.'};}),
    H(function(){var k=Q.pick([[1,2,3,4],[1,1,2,2],[2,3,3,4],[1,2,2,3],[1,1,1,1],[1,3,3,5],[2,2,3,3],[1,2,4,5],[3,4,5,6],[1,1,3,3],[2,3,4,6],[1,4,5,8]]);var s=k.reduce(function(a,b){return a+b;},0),u=360/s;
      return {type:'text',q:'The angles of a quadrilateral are in the ratio '+k.join(' : ')+'. Find the LARGEST (degrees).',answer:Q.dec(Q.fix(Math.max.apply(null,k)*u,2)),hint:s+' parts make 360°.'};}),
  ]);
  add('1.4.6',[
    B(function(){var s=Q.pick([['square',4],['rectangle',2],['equilateral triangle',3],['regular hexagon',6],['regular pentagon',5],['rhombus',2],['isosceles triangle',1],['regular octagon',8],['regular heptagon',7],['regular decagon',10],['kite',1]]);
      return {type:'text',q:'How many lines of symmetry has '+Q.an(s[0])+'?',answer:[String(s[1])],hint:'A regular n-sided shape has n.'};}),
    B(function(){var x=Q.int(1,9),y=Q.int(1,9),a=Q.int(1,6),b=Q.int(1,6);
      return {type:'text',q:'Translate ('+x+', '+y+') '+a+' right and '+b+' up. Give the image as (x,y).',answer:['('+(x+a)+','+(y+b)+')',(x+a)+','+(y+b)],hint:'Add to each coordinate.'};}),
    H(function(){var n=Q.int(5,20);return {type:'text',q:'How many lines of symmetry has a regular polygon with '+n+' sides?',answer:[String(n)],hint:'One per side.'};}),
    H(function(){var x=Q.nz(-8,8),y=Q.nz(-8,8);return {type:'text',q:'Reflect ('+x+', '+y+') in the x-axis, then translate 2 right. Give the image as (x,y).',answer:['('+(x+2)+','+(-y)+')',(x+2)+','+(-y)],hint:'Flip the y sign first, then add 2 to x.'};}),
  ]);
  add('3.4.1',[
    B(pool([['All three pairs of sides equal proves congruency by…','SSS',['SAS','ASA','AAA']],
            ['Two sides and the included angle proves…','SAS',['SSS','AAS','AAA']],
            ['Two angles and the included side proves…','ASA',['SSS','SAS','AAA']],
            ['Right angle, hypotenuse and one side proves…','RHS',['AAA','SSS','ASA']],
            ['Which does NOT prove congruency?','AAA',['SSS','SAS','RHS']]],'S is a side, A is an angle.')),
    B(function(){var s=Q.int(3,18);return {type:'text',q:'△ABC ≅ △PQR and BC = '+s+' cm. Find QR (cm).',answer:[String(s)],hint:'B matches Q and C matches R.'};}),
    H(function(){var a=Q.int(30,80),b=Q.int(30,80);return {type:'text',q:'△ABC ≅ △PQR. Angles A = '+a+'° and B = '+b+'°. Find angle R (degrees).',answer:[String(180-a-b)],hint:'R matches C, and the angles add to 180°.'};}),
    H(function(){var o=Q.mc('Equal angles fix the shape but not the size',['It uses too few angles','It only works for right angles','It needs the sides in order']);
      return {type:'mc',q:'Why is AAA not enough to prove two triangles congruent?',options:o.options,answer:o.answer,hint:'Think of a small and a large triangle with identical angles.'};}),
  ]);
  add('3.4.2',[
    B(function(){var a=Q.int(2,10),k=Q.int(2,5);return {type:'text',q:'Two similar shapes have matching sides '+a+' cm and '+(a*k)+' cm. Find the scale factor.',answer:[String(k)],hint:'Divide image by object.'};}),
    B(function(){var a=Q.int(20,80),b=Q.int(20,80);while(a+b>=165){a=Q.int(20,80);b=Q.int(20,80);}
      return {type:'text',q:'Two triangles are similar. One has angles '+a+'° and '+b+'°. Find the third angle of the OTHER (degrees).',answer:[String(180-a-b)],hint:'Similar triangles have equal angles.'};}),
    H(function(){var k=Q.int(2,5),v=Q.int(2,20);return {type:'text',q:'A solid is enlarged by scale factor '+k+'. Its volume was '+v+' cm³. Find the new volume (cm³).',answer:[String(v*k*k*k)],hint:'Volume scales by k³.'};}),
    H(function(){var k=Q.int(2,5),a=Q.int(3,24);return {type:'text',q:'A shape of area '+(a*k*k)+' cm² is a scale-factor-'+k+' enlargement of another. Find the ORIGINAL area (cm²).',answer:[String(a)],hint:'Divide by k² = '+(k*k)+'.'};}),
  ]);
  add('3.4.3',[
    B(function(){var t=Q.pick([[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15],[7,24,25],[12,16,20],[10,24,26],[20,21,29],[15,20,25],[12,35,37],[9,40,41]]);
      return {type:'text',q:'A right-angled triangle has legs '+t[0]+' cm and '+t[1]+' cm. Find the hypotenuse (cm).',answer:[String(t[2])],hint:'a² + b², then square root.'};}),
    B(function(){var t=Q.pick([[3,4,5],[6,8,10],[5,12,13],[9,12,15],[8,15,17],[7,24,25],[12,16,20],[10,24,26],[15,20,25],[20,21,29],[18,24,30],[12,35,37]]);
      return {type:'text',q:'A right-angled triangle has hypotenuse '+t[2]+' cm and one leg '+t[0]+' cm. Find the other leg (cm).',answer:[String(t[1])],hint:'Subtract the squares, then take the root.'};}),
    H(function(){var a=Q.int(3,20),b=Q.int(3,20);return {type:'text',q:'A rectangle is '+a+' cm by '+b+' cm. Find its diagonal to 2 d.p. (cm).',answer:Q.dec(Q.fix(Math.sqrt(a*a+b*b),2)),hint:'The diagonal is the hypotenuse of a right-angled triangle.'};}),
    H(function(){var t=Q.pick([[9,12,15],[8,15,17],[7,24,25],[20,21,29],[3,4,5],[6,8,10],[5,12,13],[12,16,20],[10,24,26],[15,20,25],[18,24,30],[9,40,41]]);
      return {type:'text',q:'A ladder '+t[2]+' m long reaches '+t[1]+' m up a wall. How far is its foot from the wall (m)?',answer:[String(t[0])],hint:t[2]+'² − '+t[1]+'².'};}),
  ]);
  add('3.4.4',[
    B(pool([['sin θ is which ratio?','opposite ÷ hypotenuse',['adjacent ÷ hypotenuse','opposite ÷ adjacent','hypotenuse ÷ opposite']],
            ['cos θ is which ratio?','adjacent ÷ hypotenuse',['opposite ÷ hypotenuse','opposite ÷ adjacent','adjacent ÷ opposite']],
            ['tan θ is which ratio?','opposite ÷ adjacent',['opposite ÷ hypotenuse','adjacent ÷ hypotenuse','hypotenuse ÷ adjacent']],
            ['The longest side of a right-angled triangle is the…','hypotenuse',['opposite','adjacent','base']]],'Remember SOH CAH TOA.')),
    B(function(){var t=Q.pick([[3,4,5],[6,8,10],[5,12,13],[8,15,17],[7,24,25],[9,12,15],[20,21,29],[12,16,20],[10,24,26],[9,40,41],[15,20,25],[12,35,37]]);
      return {type:'text',q:'Opposite = '+t[0]+', hypotenuse = '+t[2]+'. Find sin θ as a fraction (e.g. 3/5).',answer:[Q.simp(t[0],t[2])[0]+'/'+Q.simp(t[0],t[2])[1]],hint:'SOH.'};}),
    H(function(){var h=2*Q.int(3,15);return {type:'text',q:'A right-angled triangle has hypotenuse '+h+' cm and an angle of 30°. Find the opposite side (cm). (sin 30° = 0.5)',answer:Q.dec(h/2),hint:'opp = '+h+' × 0.5.'};}),
    H(function(){var adj=Q.int(3,20);return {type:'text',q:'A ramp rises at 45° over a horizontal distance of '+adj+' m. How high does it rise (m)? (tan 45° = 1)',answer:Q.dec(adj),hint:'tan 45° = opp ÷ '+adj+', and tan 45° = 1.'};}),
  ]);
  add('3.4.5',[
    B(function(){var k=Q.int(10,85);return {type:'text',q:'An angle of '+(2*k)+'° is bisected. How big is each half (degrees)?',answer:[String(k)],hint:'Bisect means halve.'};}),
    B(pool([['Which bearing is due east?','090°',['000°','180°','270°']],
            ['Which bearing is due south?','180°',['090°','270°','000°']],
            ['Which bearing is due west?','270°',['090°','180°','000°']],
            ['Which bearing is due north?','000°',['090°','180°','270°']]],'Measured clockwise from north.')),
    H(function(){var n=Q.pick([3,4,5,6,8,9,10,12]);return {type:'text',q:'What angle at the centre is used to construct a regular '+n+'-sided polygon (degrees)?',answer:[String(360/n)],hint:'360 ÷ '+n+'.'};}),
    H(function(){var n=Q.pick([3,4,5,6,8,9,10,12,15,18,20,24]);return {type:'text',q:'A regular polygon is constructed by stepping '+(360/n)+'° round a circle. How many sides has it?',answer:[String(n)],hint:'360 ÷ '+(360/n)+'.'};}),
  ]);
  add('3.4.6',[
    B(function(){var n=Q.int(3,12);return {type:'text',q:'Find the sum of the interior angles of a polygon with '+n+' sides (degrees).',answer:[String((n-2)*180)],hint:'(n − 2) × 180.'};}),
    B(function(){var n=Q.pick([3,4,5,6,8,9,10,12]);return {type:'text',q:'Find each exterior angle of a regular polygon with '+n+' sides (degrees).',answer:[String(360/n)],hint:'360 ÷ n.'};}),
    H(function(){var n=Q.pick([5,6,8,9,10,12,15,18,20]);return {type:'text',q:'Find each INTERIOR angle of a regular polygon with '+n+' sides (degrees).',answer:Q.dec(Q.fix(180-360/n,2)),hint:'180 − exterior, and exterior = 360 ÷ '+n+'.'};}),
    H(function(){var n=Q.pick([5,6,8,9,10,12,15,18,20,24]);return {type:'text',q:'Each interior angle of a regular polygon is '+Q.fix(180-360/n,2)+'°. How many sides has it?',answer:[String(n)],hint:'Exterior = 180 − interior, then 360 ÷ exterior.'};}),
  ]);

  /* ---------------- Measurement ---------------- */
  add('1.5.1',[
    B(function(){var c=Q.pick([['km','m',1000],['m','cm',100],['cm','mm',10],['kg','g',1000],['litre','ml',1000],['m','mm',1000],['tonne','kg',1000],['g','mg',1000],['minute','seconds',60],['hour','minutes',60],['day','hours',24],['week','days',7]]);
      return {type:'text',q:'How many '+c[1]+' in 1 '+c[0]+'?',answer:[String(c[2])],hint:'A metric prefix — a power of 10.'};}),
    B(function(){var c=Q.pick([['km','m',1000],['m','cm',100],['cm','mm',10],['kg','g',1000]]),n=Q.int(2,9);
      return {type:'text',q:'Convert '+n+' '+c[0]+' to '+c[1]+'.',answer:[String(n*c[2])],hint:'Multiply by '+c[2]+'.'};}),
    H(function(){var mi=Q.int(5,80);return {type:'text',q:'Taking 1 mile = 1.6 km, convert '+mi+' miles to km.',answer:Q.dec(Q.fix(mi*1.6,2)),hint:'Multiply by 1.6.'};}),
    H(function(){var kg=Q.int(2,40);return {type:'text',q:'Taking 1 kg = 2.2 pounds, convert '+kg+' kg to pounds.',answer:Q.dec(Q.fix(kg*2.2,2)),hint:'Multiply by 2.2.'};}),
  ]);
  add('1.5.2',[
    B(function(){var n=Q.int(2,90);return {type:'text',q:'Convert '+n+' cm to mm.',answer:[String(n*10)],hint:'1 cm = 10 mm.'};}),
    B(function(){var n=Q.int(2,90)*100;return {type:'text',q:'Convert '+n+' cm to metres.',answer:Q.dec(n/100),hint:'100 cm = 1 m.'};}),
    H(function(){var m=Q.pick([1.5,2,2.4,3,3.6]),n=Q.int(2,5),p=Q.pick([20,25,30,40]);while(n*p>=m*100)n--;
      return {type:'text',q:'A '+m+' m rope has '+n+' pieces of '+p+' cm cut off. How many cm remain?',answer:[String(m*100-n*p)],hint:'Work in centimetres throughout.'};}),
    H(function(){var a=Q.pick([1.2,2.5,3.4,4.6]),b=Q.int(30,180);return {type:'text',q:'Add '+a+' m and '+b+' cm, giving the answer in METRES.',answer:Q.dec(Q.fix(a+b/100,2)),hint:'Convert the cm to metres first.'};}),
  ]);
  add('1.5.3',[
    B(function(){var s=Q.int(3,25);return {type:'text',q:'Find the perimeter of a square of side '+s+' cm (cm).',answer:[String(4*s)],hint:'4 × side.'};}),
    B(function(){var l=Q.int(4,20),w=Q.int(2,l-1);return {type:'text',q:'Find the perimeter of a '+l+' cm by '+w+' cm rectangle (cm).',answer:[String(2*(l+w))],hint:'2(l + w).'};}),
    H(function(){var w=Q.int(3,14),l=Q.int(w+1,22),p=2*(l+w);return {type:'text',q:'A rectangle has perimeter '+p+' cm and width '+w+' cm. Find its length (cm).',answer:[String(l)],hint:'Halve the perimeter, then subtract '+w+'.'};}),
    H(function(){var n=Q.pick([[3,'equilateral triangle'],[5,'regular pentagon'],[6,'regular hexagon'],[8,'regular octagon']]),s=Q.int(3,18);
      return {type:'text',q:Q.an(n[1]).charAt(0).toUpperCase()+Q.an(n[1]).slice(1)+' has perimeter '+(n[0]*s)+' cm. Find the length of one side (cm).',answer:[String(s)],hint:'Divide by '+n[0]+'.'};}),
  ]);
  add('1.5.4',[
    B(function(){var l=Q.int(3,18),w=Q.int(2,14);return {type:'text',q:'Find the area of a '+l+' cm by '+w+' cm rectangle (cm²).',answer:[String(l*w)],hint:'length × width.'};}),
    B(function(){var s=Q.int(3,18);return {type:'text',q:'Find the area of a square of side '+s+' cm (cm²).',answer:[String(s*s)],hint:'side × side.'};}),
    H(function(){var l=Q.int(4,18),w=Q.int(3,14),a=l*w;return {type:'text',q:'A rectangle has area '+a+' cm² and width '+w+' cm. Find its length (cm).',answer:[String(l)],hint:'Divide '+a+' by '+w+'.'};}),
    H(function(){var b=2*Q.int(2,10),h=Q.int(3,15),a=b*h/2;return {type:'text',q:'A triangle has area '+a+' cm² and base '+b+' cm. Find its perpendicular height (cm).',answer:[String(h)],hint:'Area = ½bh, so h = 2 × area ÷ base.'};}),
  ]);
  add('1.5.5',[
    B(function(){var n=Q.int(2,9);return {type:'text',q:'Convert '+n+' kg to grams.',answer:[String(n*1000)],hint:'1 kg = 1000 g.'};}),
    B(function(){var n=Q.int(2,9)*1000;return {type:'text',q:'Convert '+n+' g to kilograms.',answer:[String(n/1000)],hint:'Divide by 1000.'};}),
    H(function(){var e=Q.pick([125,200,250,400,500]),n=Q.int(3,12);return {type:'text',q:'How many '+e+' g bags can be filled from '+Q.fix(e*n/1000,3)+' kg?',answer:[String(n)],hint:'Convert to grams, then divide by '+e+'.'};}),
    H(function(){var box=Q.int(1,4),n=Q.int(3,8),t=Q.pick([150,250,300,400]);
      return {type:'text',q:'A '+box+' kg box holds '+n+' tins of '+t+' g. Find the total mass in kg.',answer:Q.dec(Q.fix(box+n*t/1000,3)),hint:'Convert the tins to kg first.'};}),
  ]);
  add('1.5.6',[
    B(function(){var h=Q.int(2,9);return {type:'text',q:'Convert '+h+' hours to minutes.',answer:[String(h*60)],hint:'1 hour = 60 minutes.'};}),
    B(function(){var w=Q.int(2,10);return {type:'text',q:'How many days are there in '+w+' weeks?',answer:[String(7*w)],hint:'7 days a week.'};}),
    H(function(){var h=Q.int(1,5),m=Q.pick([5,10,15,20,25,35,40,45,50]);
      return {type:'text',q:'Write '+(h*60+m)+' minutes in hours and minutes (format 2 h 35 min).',answer:[h+'h'+m+'min',h+' h '+m+' min'],hint:'Divide by 60; the remainder is the minutes.'};}),
    H(function(){var sh=Q.int(7,17),sm=Q.pick([10,15,20,25,40,45,50]),dh=Q.int(1,4),dm=Q.pick([10,15,20,30,35,40]);
      var tot=sh*60+sm+dh*60+dm,eh=Math.floor(tot/60),em=tot%60,p=function(n){return (n<10?'0':'')+n;};
      return {type:'text',q:'A journey runs from '+p(sh)+':'+p(sm)+' to '+p(eh)+':'+p(em)+'. How many MINUTES is it?',answer:[String(dh*60+dm)],hint:'Count on to the next whole hour first.'};}),
  ]);
  add('3.5.1',[
    B(function(){var r=Q.int(3,15);return {type:'text',q:'Find the area of a semicircle of radius '+r+' cm (π = 3.14, cm²).',answer:Q.dec(Q.fix(0.5*3.14*r*r,2)),hint:'Half of πr².'};}),
    B(function(){var p=Q.pick([[90,'a quadrant'],[180,'a semicircle'],[120,'a 120° sector'],[60,'a 60° sector'],[45,'a 45° sector'],[30,'a 30° sector'],[72,'a 72° sector'],[36,'a 36° sector'],[240,'a 240° sector'],[270,'a 270° sector'],[144,'a 144° sector'],[40,'a 40° sector']]);
      return {type:'text',q:'What fraction of a whole circle is '+p[1]+'? Give it as a fraction (e.g. 1/4).',answer:[Q.simp(p[0],360)[0]+'/'+Q.simp(p[0],360)[1]],hint:p[0]+' out of 360.'};}),
    H(function(){var r=Q.int(4,16),th=Q.pick([60,90,120,180]);
      return {type:'text',q:'Find the perimeter of a sector, radius '+r+' cm, angle '+th+'° (π = 3.14, cm).',answer:Q.dec(Q.fix(th/360*2*3.14*r+2*r,2)),hint:'Arc + the two radii.'};}),
    H(function(){var r=Q.int(3,12),l=Q.int(8,20);return {type:'text',q:'A '+l+' cm × '+(2*r)+' cm rectangle has a semicircle of radius '+r+' cm on one end. Find the total area (π = 3.14, cm²).',answer:Q.dec(Q.fix(l*2*r+0.5*3.14*r*r,2)),hint:'Rectangle + half a circle.'};}),
  ]);
  add('3.5.2',[
    B(function(){var s=Q.int(2,12);return {type:'text',q:'Find the surface area of a cube of side '+s+' cm (cm²).',answer:[String(6*s*s)],hint:'6 identical square faces.'};}),
    B(function(){var a=Q.int(2,9),b=Q.int(2,9),c=Q.int(2,9);return {type:'text',q:'Find the volume of a cuboid '+a+' × '+b+' × '+c+' cm (cm³).',answer:[String(a*b*c)],hint:'l × w × h.'};}),
    H(function(){var s=Q.pick([3,6,9,12]),h=Q.pick([3,6,9,12]);return {type:'text',q:'Find the volume of a pyramid with a '+s+' cm square base and height '+h+' cm (cm³).',answer:Q.dec(Q.fix(s*s*h/3,2)),hint:'⅓ × base area × height.'};}),
    H(function(){var s=Q.int(2,12),sa=6*s*s;return {type:'text',q:'A cube has surface area '+sa+' cm². Find the length of one edge (cm).',answer:[String(s)],hint:'Divide by 6, then take the square root.'};}),
  ]);
  add('3.5.3',[
    B(function(){var sc=Q.pick([100,200,500,1000]),cm=Q.int(2,15);return {type:'text',q:'On a 1 : '+sc+' plan a wall measures '+cm+' cm. Find the real length in METRES.',answer:Q.dec(Q.fix(cm*sc/100,3)),hint:'Multiply by '+sc+', then convert cm to m.'};}),
    B(function(){var k=Q.int(2,12);return {type:'text',q:'Lengths are multiplied by '+k+'. By what factor is AREA multiplied?',answer:[String(k*k)],hint:'Area scales by k².'};}),
    H(function(){var sc=Q.pick([25000,50000,100000]),cm=Q.int(2,15);return {type:'text',q:'A map has scale 1 : '+sc+'. Two towns are '+cm+' cm apart. Find the real distance in KM.',answer:Q.dec(Q.fix(cm*sc/100000,4)),hint:'Convert to cm, then m, then km.'};}),
    H(function(){var k=Q.int(2,5),v=Q.int(2,20);return {type:'text',q:'A model has scale factor '+k+'. The real object has volume '+(v*k*k*k)+' cm³. Find the MODEL\'s volume if the model is the smaller (cm³).',answer:[String(v)],hint:'Divide by k³ = '+(k*k*k)+'.'};}),
  ]);
  add('3.5.4',[
    B(function(){var r=Q.int(10,30),h=Q.int(20,45);return {type:'text',q:'A worker earns $'+r+' per hour for '+h+' hours. Find the wage ($).',answer:Q.money(r*h),hint:'rate × hours.'};}),
    B(function(){var s=12*Q.int(150,900)*Q.pick([1,2]);return {type:'text',q:'A salary of $'+s+' a year is paid monthly. Find each payment ($).',answer:Q.money(s/12),hint:'Divide by 12.'};}),
    H(function(){var P=Q.pick([1000,2000,4000,5000]),r=Q.pick([5,10,20]);
      return {type:'text',q:'Find the compound interest on $'+P+' at '+r+'% for 2 years ($).',answer:Q.money(Q.fix(P*Math.pow(1+r/100,2)-P,2)),hint:'Amount − principal.'};}),
    H(function(){var u=Q.pick([100,150,200,250,300]),rt=Q.pick([0.4,0.5,0.6]),fx=Q.pick([20,25,30]);
      return {type:'text',q:'A bill has a $'+fx+' fixed charge plus '+u+' units at $'+rt+' each. Find the total ($).',answer:Q.money(fx+u*rt),hint:fx+' + '+u+' × '+rt+'.'};}),
  ]);

  /* ---------------- Algebra ---------------- */
  add('1.6.1',[
    B(function(){var v=Q.pick(['x','m','k']),a=Q.int(3,12),b=Q.int(2,9);return {type:'text',q:'Simplify '+a+v+' + '+b+v+'.',answer:[(a+b)+v],hint:'Add the numbers in front.'};}),
    B(function(){var a=Q.int(2,9),x=Q.int(2,10);return {type:'text',q:'If x = '+x+', find '+a+'x.',answer:[String(a*x)],hint:'Multiply.'};}),
    H(function(){var k=Q.int(2,6),c=Q.int(2,9),m=Q.int(2,6),d=Q.int(2,9);
      return {type:'text',q:'Expand and simplify '+k+'(x + '+c+') + '+m+'(x + '+d+').',answer:[Q.polyAns([[k+m,'x'],[k*c+m*d,'']])],hint:'Expand both brackets, then collect.'};}),
    H(function(){var k=Q.int(2,6),c=Q.int(2,9),m=Q.int(2,5),d=Q.int(2,9);
      return {type:'text',q:'Expand and simplify '+k+'(x + '+c+') − '+m+'(x + '+d+').',answer:[Q.polyAns([[k-m,'x'],[k*c-m*d,'']])],hint:'The minus changes BOTH signs in the second bracket.'};}),
  ]);
  add('1.6.2',[
    B(function(){var a=-Q.int(2,9),k=Q.int(2,5);return {type:'text',q:'If a = '+a+', find '+k+'a.',answer:[String(k*a)],hint:'A positive times a negative is negative.'};}),
    B(function(){var d=Q.int(2,6),c=Q.int(1,9);return {type:'text',q:'Find the next term of '+[1,2,3,4].map(function(n){return d*n+c;}).join(', ')+', …',answer:[String(d*5+c)],hint:'It goes up by '+d+' each time.'};}),
    H(function(){var d=Q.int(2,7),c=Q.nz(-9,9),k=Q.pick([20,25,30,50,100]);
      return {type:'text',q:'A sequence has nth term '+Q.polyHtml([[d,'n'],[c,'']])+'. Find the '+k+'th term.',answer:[String(d*k+c)],hint:'Put n = '+k+'.'};}),
    H(function(){var d=Q.int(2,6),c=Q.nz(-8,8),k=Q.int(6,20),v=d*k+c;
      return {type:'text',q:'A sequence has nth term '+Q.polyHtml([[d,'n'],[c,'']])+'. Which term equals '+v+'?',answer:[String(k)],hint:'Solve '+d+'n '+(c<0?'− '+(-c):'+ '+c)+' = '+v+'.'};}),
  ]);
  add('1.6.6',[
    B(function(){var x=Q.int(2,15),a=Q.int(2,12);return {type:'text',q:'Solve x + '+a+' = '+(x+a)+'.',answer:Q.root(x),hint:'Subtract '+a+'.'};}),
    B(function(){var a=Q.int(2,9),x=Q.int(2,12);return {type:'text',q:'Solve '+a+'x = '+(a*x)+'.',answer:Q.root(x),hint:'Divide by '+a+'.'};}),
    H(function(){var a=Q.int(2,7),x=Q.int(2,12),b=Q.int(2,12);return {type:'text',q:'Solve '+a+'x + '+b+' = '+(a*x+b)+'.',answer:Q.root(x),hint:'Subtract '+b+', then divide by '+a+'.'};}),
    H(function(){var n=Q.int(3,20),k=Q.int(2,5);return {type:'text',q:'I think of a number, multiply it by '+k+' and add '+n+'. The result is '+(k*n+n)+'. Find the number.',answer:[String(n)],hint:'Let the number be n and write an equation.'};}),
  ]);
  add('3.6.1',[
    B(function(){var a=Q.int(2,9),b=Q.int(2,12);return {type:'text',q:'Solve '+f('x',a)+' = '+b+'.',answer:Q.root(a*b),hint:'Multiply both sides by '+a+'.'};}),
    // x = b·k keeps the right-hand side a whole number by construction
    B(function(){var a=Q.int(2,8),b=Q.int(2,6),k=Q.int(2,9),x=b*k;
      return {type:'text',q:'Solve '+f(a+'x',b)+' = '+(a*k)+'.',answer:Q.root(x),hint:'Multiply both sides by '+b+', then divide by '+a+'.'};}),
    H(function(){var p=Q.coprime(),a=p[0],b=p[1],L=a*b,k=Q.int(1,5),x=L*k;
      return {type:'text',q:'Solve '+f('x',a)+' + '+f('x',b)+' = '+(x/a+x/b)+'.',answer:Q.root(x),hint:'Multiply everything by '+L+'.'};}),
    H(function(){var b=Q.int(2,8),c=Q.int(2,9),a=Q.int(1,9);return {type:'text',q:'Solve '+f('x − '+a,b)+' = '+c+'.',answer:Q.root(b*c+a),hint:'Multiply by '+b+', then add '+a+'.'};}),
  ]);
  add('3.6.2',[
    B(function(){var a=Q.int(2,8),b=Q.int(2,12);return {type:'text',q:'Solve '+f('x',a)+' &gt; '+b+'. Give x &gt; …',answer:Q.ineq('>',a*b),hint:'Multiply both sides by '+a+'.'};}),
    B(function(){var a=Q.int(2,9),x=Q.int(2,12);return {type:'text',q:'Solve '+a+'x ≤ '+(a*x)+'. Give x ≤ …',answer:Q.ineq('<=',x).concat(['x≤'+x]),hint:'Divide by '+a+'.'};}),
    H(function(){var a=Q.int(2,6),b=Q.int(2,9);return {type:'text',q:'Solve −'+f('x',a)+' ≥ '+b+'. Give x ≤ …',answer:Q.ineq('<=',-a*b).concat(['x≤'+(-a*b)]),hint:'Multiply by '+a+', then divide by −1 and REVERSE the sign.'};}),
    H(function(){var a=Q.int(2,5),m=Q.int(2,3),b=a*m,k=Q.int(1,4),x=b*k;
      return {type:'text',q:'Solve '+f('x',a)+' + '+f('x',b)+' &lt; '+(x/a+x/b)+'. Give x &lt; …',answer:Q.ineq('<',x),hint:'Multiply everything by '+b+'.'};}),
  ]);
  add('3.6.3',[
    B(function(){var x=Q.int(2,12),y=Q.int(1,x-1);return {type:'text',q:'Solve x + y = '+(x+y)+' and x − y = '+(x-y)+'. Give x.',answer:Q.root(x),hint:'Add the equations.'};}),
    B(function(){var a=Q.int(2,5),x=Q.int(2,9),y=Q.int(1,8);return {type:'text',q:'Solve '+a+'x + y = '+(a*x+y)+' when y = '+y+'. Give x.',answer:Q.root(x),hint:'Substitute y = '+y+'.'};}),
    H(function(){var x=Q.int(2,8),y=Q.int(2,8),a=Q.int(2,4),b=Q.int(2,4);
      return {type:'text',q:'Solve '+a+'x + '+b+'y = '+(a*x+b*y)+' and x − y = '+(x-y)+'. Give x.',answer:Q.root(x),hint:'From the second, x = y + '+(x-y)+'. Substitute.'};}),
    H(function(){var big=Q.int(10,30),small=Q.int(2,big-2);return {type:'text',q:'Two numbers have sum '+(big+small)+' and difference '+(big-small)+'. Find the SMALLER.',answer:[String(small)],hint:'Add the equations for the larger, then subtract.'};}),
  ]);
  add('3.6.4',[
    B(function(){var b=Q.pick([2,3,5]),m=Q.int(1,3),n=Q.int(1,2);
      return {type:'text',q:'Evaluate '+Q.pow(b,m)+' × '+Q.pow(b,n)+' as a whole number.',answer:[String(Math.pow(b,m+n))],hint:'Add the indices.'};}),
    B(function(){var b=Q.int(2,12);return {type:'text',q:'Evaluate '+Q.pow(b,0)+'.',answer:['1'],hint:'Anything to the power zero.'};}),
    H(function(){var v=Q.pick(['x','a','y']),m=Q.int(4,9),n=Q.int(2,4),p=Q.int(1,2);
      return {type:'text',q:'Simplify ('+Q.pow(v,m)+' × '+Q.pow(v,n)+') ÷ '+Q.pow(v,p)+' (write like '+v+'^3).',answer:[v+'^'+(m+n-p)],hint:'Add then subtract the indices.'};}),
    H(function(){var b=Q.int(2,5),n=Q.int(2,3);return {type:'text',q:'Write '+b+Q.sup('-'+n)+' as a fraction (e.g. 1/9).',answer:['1/'+Math.pow(b,n)],hint:'A negative index means the reciprocal.'};}),
  ]);
  add('3.6.5',[
    B(function(){var a=Q.int(2,6),b=Q.int(2,6),n=Q.int(1,3);
      return {type:'text',q:'Simplify '+a+'x × '+b+Q.pow('x',n)+' (write like 6x^3).',answer:[(a*b)+'x^'+(n+1)],hint:'Multiply the numbers, add the indices.'};}),
    B(function(){var a=Q.int(1,9);return {type:'text',q:'Simplify '+f('x² + '+a+'x','x')+' (write like x+5).',answer:['x+'+a],hint:'Divide each term by x.'};}),
    H(function(){var a=Q.int(1,9),b=Q.int(1,9);return {type:'text',q:'Expand and simplify (x + '+a+')(x − '+b+') (write like x^2+2x-15).',answer:[Q.polyAns([[1,'x²'],[a-b,'x'],[-a*b,'']])],hint:'FOIL, then collect the middle terms.'};}),
    H(function(){var k=Q.int(2,10);return {type:'text',q:'Simplify '+f('x² − '+(k*k),'x + '+k)+' (write like x-3).',answer:['x-'+k],hint:'Factorise the top as a difference of two squares, then cancel.'};}),
  ]);
  add('3.6.6',[
    B(function(){var k=Q.int(2,9),c=Q.int(2,9);return {type:'text',q:'Factorise '+k+'x + '+(k*c)+' (write like 5(x+3)).',answer:[k+'('+'x+'+c+')'],hint:'Take out '+k+'.'};}),
    B(function(){var c=Q.int(2,9);return {type:'text',q:'Factorise x² + '+c+'x (write like x(x+4)).',answer:['x(x+'+c+')'],hint:'Both terms contain x.'};}),
    H(function(){var h=Q.int(2,6),p=Q.int(2,5),q=Q.int(2,5);if(p===q)q=p+1;
      return {type:'text',q:'Factorise '+(h*p)+'x²y + '+(h*q)+'xy² (write like 4ab(2a+3b)).',answer:[h+'xy('+p+'x+'+q+'y)'],hint:'HCF is '+h+'xy.'};}),
    H(function(){var k=Q.int(2,10);return {type:'text',q:'Factorise x² − '+(k*k)+' (write like (x+3)(x-3)).',answer:['(x+'+k+')(x-'+k+')','(x-'+k+')(x+'+k+')'],hint:'Difference of two squares.'};}),
  ]);
  add('3.6.7',[
    B(function(){var k=Q.int(2,10);return {type:'text',q:'Solve x² = '+(k*k)+'. Give the POSITIVE root.',answer:Q.root(k),hint:'Take the square root.'};}),
    B(function(){var b=Q.int(2,10);return {type:'text',q:'Solve x² + '+b+'x = 0. Give the NEGATIVE root.',answer:Q.root(-b),hint:'Factorise as x(x + '+b+') = 0.'};}),
    H(function(){var p=Q.int(1,7),q=Q.int(p+1,9);return {type:'text',q:'Solve '+Q.polyHtml([[1,'x²'],[-(p+q),'x'],[p*q,'']])+' = 0. Give both roots, smaller first (e.g. 2,5).',answer:[p+','+q],hint:'Two numbers multiplying to '+(p*q)+' and adding to −'+(p+q)+'.'};}),
    H(function(){var p=Q.int(1,6),q=Q.int(1,6);return {type:'text',q:'Solve '+Q.polyHtml([[1,'x²'],[p-q,'x'],[-p*q,'']])+' = 0. Give both roots, smaller first (e.g. -3,2).',answer:[(-p)+','+q,(-p)+', '+q],hint:'Two numbers multiplying to −'+(p*q)+' and adding to '+(p-q)+'.'};}),
  ]);

})();
