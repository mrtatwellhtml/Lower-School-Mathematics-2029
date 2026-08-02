/* Exam-style practice — ADDITIVE, Advanced tier. Original worded / multi-step questions
   written to match the FORMAT and DIFFICULTY of CSEC/NCSE Paper-2 items (real-world
   context, several steps, one clean final answer). Nothing is copied from any exam paper;
   the linked papers informed only the style and level. Forms 2 & 3. Loads last. */
(function () {
  var C = window.CURRICULUM, Q = window.QG;
  if (!C || !Q) return;
  function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t;}return a;}
  function fr(p,q){var g=gcd(p,q)||1;return (p/g)+'/'+(q/g);}
  function A(fn){return {level:'Advanced',gen:fn};}
  function add(code,gens){var t=C[code];if(!t||!t.content||!Array.isArray(t.content.practice))return;gens.forEach(function(g){t.content.practice.push(g);});}
  function tob(n,b){if(n===0)return'0';var s='';while(n){s=(n%b)+s;n=Math.floor(n/b);}return s;}

  /* ===== FORM 2 ===== */
  add('2.1.1',[
    A(function(){var d1=Q.int(6,15),u=Q.int(3,8),d2=Q.int(4,12);return{type:'text',q:'A diver descends '+d1+' m, rises '+u+' m, then descends a further '+d2+' m. Find the diver’s final depth, as a directed number (m).',answer:[String(-d1+u-d2),'-'+(d1-u+d2)+' m'],hint:'Down is negative, up is positive.'};}),
    A(function(){var s=Q.int(2,6),r=Q.int(2,5),h=Q.int(3,6);return{type:'text',q:'At 6 a.m. the temperature was −'+s+' °C. It then rose by '+r+' °C each hour for '+h+' hours. Find the temperature at '+(6+h)+' a.m. (°C).',answer:[String(-s+r*h)],hint:'Add ('+r+' × '+h+') to −'+s+'.'};}),
  ]);
  add('2.1.2',[
    A(function(){var m=Q.int(11,99)/10,e=Q.int(3,6),n=Math.round(m*Math.pow(10,e)),t=Q.int(2,9);
      return{type:'text',q:'A machine makes '+n.toLocaleString('en').replace(/,/g,' ')+' parts a day. Write the number of parts made in '+t+' days in standard form.',answer:Q.stdform(Math.round(m*t*10)/10,e),hint:'Multiply, then write as A × 10ⁿ with 1 ≤ A < 10.'};}),
    A(function(){var m=Q.int(12,90)/10,e=Q.int(3,5),val=m/Math.pow(10,e);return{type:'text',q:'The width of a fibre is '+val.toFixed(e+1)+' m. Write this number in standard form.',answer:Q.stdform(m,-e),hint:'A small number takes a negative power of 10.'};}),
  ]);
  add('2.1.3',[
    A(function(){var n=Q.int(20,63);return{type:'text',q:'A computer stores the denary number '+n+' in binary (base 2). Write the binary numeral.',answer:[tob(n,2)],hint:'Divide by 2 repeatedly; read remainders upward.'};}),
    A(function(){var n=Q.int(8,40);return{type:'text',q:'Convert '+tob(n,2)+' (base 2) to base 5.',answer:[tob(n,5)],hint:'First convert to base 10, then to base 5.'};}),
  ]);
  add('2.2.1',[
    A(function(){var both=Q.int(3,8),oa=Q.int(3,10),ob=Q.int(3,10),nei=Q.int(1,6);var tot=oa+both+ob+nei;
      return{type:'text',q:'In a class of '+tot+' students, '+(oa+both)+' study French, '+(ob+both)+' study Spanish and '+both+' study both. How many study neither?',answer:[String(nei)],hint:'Total − n(F ∪ S). n(F∪S)=n(F)+n(S)−n(both).'};}),
    A(function(){var both=Q.int(2,7),oa=Q.int(2,9),ob=Q.int(2,9);return{type:'text',q:'In a survey, '+(oa+both)+' people own a car, '+(ob+both)+' own a bike and '+both+' own both. How many own a car OR a bike?',answer:[String(oa+both+ob)],hint:'n(A∪B) = n(A)+n(B)−n(A∩B).'};}),
  ]);
  add('2.2.2',[
    A(function(){var base=Q.int(5,15),per=Q.int(2,6),km=Q.int(4,12);return{type:'text',q:'A taxi charges a $'+base+' base fee plus $'+per+' per km, so f(x) = '+per+'x + '+base+'. Find the cost of a '+km+' km trip ($).',answer:[String(per*km+base)],hint:'Substitute x = '+km+'.'};}),
    A(function(){var a=Q.int(2,5),b=Q.int(1,9),x=Q.int(3,9),v=a*x-b;return{type:'text',q:'For f(x) = '+a+'x − '+b+', find the value of x for which f(x) = '+v+'.',answer:Q.root(x),hint:'Solve '+a+'x − '+b+' = '+v+'.'};}),
  ]);
  add('2.2.3',[
    A(function(){var m=Q.int(2,5),c=Q.int(1,8),a=Q.int(2,7),y=m*a+c;return{type:'text',q:'The line y = '+m+'x + '+c+' passes through the point (a, '+y+'). Find the value of a.',answer:[String(a)],hint:'Set '+m+'a + '+c+' = '+y+' and solve.'};}),
  ]);
  add('2.2.4',[
    A(function(){var m=Q.int(2,5),c=Q.int(-4,-1),x=Q.int(3,7);return{type:'text',q:'A line has gradient '+m+' and cuts the y-axis at '+c+'. Find its y-value when x = '+x+'.',answer:[String(m*x+c)],hint:'The equation is y = '+m+'x '+c+'.'};}),
  ]);
  add('2.3.1',[
    A(function(){var mean=Q.int(10,18),known=[],s=0;for(var i=0;i<5;i++){var v=Q.int(6,20);known.push(v);s+=v;}var sixth=mean*6-s;if(sixth<1||sixth>30){sixth=Q.int(6,20);}var real=Math.round((s+sixth)/6*100)/100;
      return{type:'text',q:'The mean of six test scores is '+mean+'. Five of the scores are '+known.join(', ')+'. Find the sixth score.',answer:[String(mean*6-s)],hint:'Total = mean × 6 = '+(mean*6)+'. Subtract the five you know.'};}),
    A(function(){var xs=[];for(var i=0;i<6;i++)xs.push(Q.int(2,20));var s=xs.slice().sort(function(a,b){return a-b;});return{type:'text',q:'Find the median of '+xs.join(', ')+'.',answer:Q.dec((s[2]+s[3])/2),hint:'Order the six values; average the middle two.'};}),
  ]);
  add('2.3.2',[
    A(function(){var tot=360*Q.int(1,5),ang=Q.pick([30,45,60,72,90,120]);return{type:'text',q:'In a pie chart representing '+tot+' people, the sector for "walk to school" is '+ang+'°. How many people walk to school?',answer:[String(tot*ang/360)],hint:'people = (angle ÷ 360) × total.'};}),
  ]);
  add('2.4.1',[
    A(function(){var ax=Q.int(-4,4),ay=Q.int(-4,4),mx=ax+Q.int(2,6),my=ay+Q.int(2,6);var bx=2*mx-ax,by=2*my-ay;return{type:'text',q:'M('+mx+', '+my+') is the midpoint of A('+ax+', '+ay+') and B. Find the coordinates of B, in the form (x, y).',answer:['('+bx+', '+by+')','('+bx+','+by+')'],hint:'B = 2M − A for each coordinate.'};}),
    A(function(){var t=Q.pick([[3,4,5],[6,8,10],[5,12,13]]),x1=Q.int(0,3),y1=Q.int(0,3);return{type:'text',q:'Find the distance between the points ('+x1+', '+y1+') and ('+(x1+t[0])+', '+(y1+t[1])+').',answer:[String(t[2])],hint:'distance = √((Δx)² + (Δy)²).'};}),
  ]);
  add('2.4.2',[
    A(function(){var x=Q.nz(-5,5),y=Q.nz(-5,5),a=Q.nz(-4,4),b=Q.nz(-4,4);return{type:'text',q:'The point P('+x+', '+y+') is reflected in the x-axis, then translated by the vector ('+a+', '+b+'). Find the image, in the form (x, y).',answer:['('+(x+a)+', '+(-y+b)+')','('+(x+a)+','+(-y+b)+')'],hint:'Reflect first: ('+x+', '+(-y)+'), then add the vector.'};}),
  ]);
  add('2.4.3',[
    A(function(){var parts=Q.pick([[1,2,3],[2,3,4],[1,3,5],[3,4,5],[2,3,5],[1,4,5],[2,4,6],[3,5,7],[4,5,9],[2,7,9],[1,5,6],[1,2,6]]);var sum=parts[0]+parts[1]+parts[2],x=180/sum;var big=Math.max.apply(null,parts)*x;
      return{type:'text',q:'The three angles of a triangle are in the ratio '+parts.join(' : ')+'. Find the size of the largest angle (degrees).',answer:[String(big)],hint:'The parts add to '+sum+', so each part = 180 ÷ '+sum+' = '+x+'°.'};}),
  ]);
  add('2.4.4',[
    A(function(){var o=Q.mc('incentre',['circumcentre','centroid','orthocentre']);return{type:'mc',q:'The three angle bisectors of a triangle meet at a single point that is equidistant from the three sides. What is this point called?',options:o.options,answer:o.answer,hint:'It is the centre of the inscribed circle.'};}),
  ]);
  add('2.5.1',[
    A(function(){var cups=Q.int(8,15),ml=Q.pick([100,150,200,250]);var litres=cups*ml/1000;return{type:'text',q:'A container holds '+litres+' litres of juice. How many '+ml+' mL cups can be completely filled from it?',answer:[String(cups)],hint:'Convert litres to mL (×1000), then divide by '+ml+'.'};}),
  ]);
  add('2.5.2',[
    A(function(){var r=7*Q.int(1,12);return{type:'text',q:'A circular pond has radius '+r+' m. A gardener walks once around its edge. How far does she walk (π = 22/7), in m?',answer:[String(2*22/7*r)],hint:'Distance = circumference = 2 × π × r.'};}),
    A(function(){var r=7*Q.int(1,12);return{type:'text',q:'A bicycle wheel has radius '+r+' cm. How far does the bike move in one full turn of the wheel (π = 22/7), in cm?',answer:[String(2*22/7*r)],hint:'One turn covers one circumference.'};}),
  ]);
  add('2.5.3',[
    A(function(){var L=Q.int(12,20),W=Q.int(8,14),s=Q.int(3,6);return{type:'text',q:'A rectangular sheet of metal '+L+' cm by '+W+' cm has a square of side '+s+' cm cut from one corner. Find the area of metal remaining (cm²).',answer:[String(L*W-s*s)],hint:'Rectangle area − square area.'};}),
  ]);
  add('2.5.4',[
    A(function(){var a=Q.int(20,60),b=Q.int(20,50),c=Q.int(10,40);return{type:'text',q:'A rectangular tank measures '+a+' cm by '+b+' cm by '+c+' cm. How many litres of water does it hold when full? (1 litre = 1000 cm³)',answer:Q.dec(Math.round(a*b*c/1000*1000)/1000),hint:'Find the volume in cm³, then divide by 1000.'};}),
  ]);
  add('2.5.5',[
    A(function(){var a=Q.int(2,6),b=Q.int(2,6);if(a===b)b++;var unit=Q.int(20,80);var flour=a*unit;return{type:'text',q:'A recipe mixes flour and sugar in the ratio '+a+' : '+b+'. If '+flour+' g of flour is used, how much sugar is needed (g)?',answer:[String(b*unit)],hint:'One part = '+flour+' ÷ '+a+' = '+unit+' g.'};}),
  ]);
  add('2.5.6',[
    A(function(){var cp=Q.int(4,20)*100,pct=Q.pick([10,15,20,25]);return{type:'text',q:'A shopkeeper buys a television for $'+cp+' and sells it at a profit of '+pct+'%. Find the selling price ($).',answer:[String(cp*(100+pct)/100)],hint:'Selling price = '+(100+pct)+'% of cost.'};}),
    A(function(){var r=Q.int(6,12)*2,h=Q.int(42,48),reg=40*r,ot=(h-40)*r*1.5;return{type:'text',q:'A worker is paid $'+r+' per hour for the first 40 hours, and time-and-a-half (1.5×) for overtime. Find the total pay for a '+h+'-hour week ($).',answer:[String(reg+ot)],hint:'40 × '+r+' plus '+(h-40)+' × '+(r*1.5)+'.'};}),
  ]);
  add('2.6.1',[
    A(function(){var u=Q.int(2,9),a=Q.int(2,6),t=Q.int(2,7);return{type:'text',q:'Using the formula v = u + at, find v when u = '+u+', a = '+a+' and t = '+t+'.',answer:[String(u+a*t)],hint:'Substitute the three values.'};}),
    A(function(){var b=2*Q.int(3,9),h=Q.int(4,12);return{type:'text',q:'The area of a triangle is A = ½bh. Find A when b = '+b+' cm and h = '+h+' cm (cm²).',answer:[String(b*h/2)],hint:'Half of base × height.'};}),
  ]);
  add('2.6.2',[
    A(function(){var a=Q.int(2,4),b=Q.int(1,5),c=Q.int(1,4),x=Q.int(3,8);var per=2*((a*x+b)+(c*x+1));return{type:'text',q:'A rectangle has length ('+a+'x + '+b+') cm and width ('+c+'x + 1) cm. Find its perimeter, in cm, when x = '+x+'.',answer:[String(per)],hint:'Perimeter = 2(length + width). Substitute x = '+x+'.'};}),
  ]);
  add('2.6.3',[
    A(function(){var a=Q.int(2,5),x=Q.int(10,Math.floor(170/a)),b=180-a*x;return{type:'text',q:'Two angles that lie on a straight line are ('+a+'x)° and '+b+'°. Find the value of x.',answer:Q.root(x),hint:'Angles on a straight line add to 180°, so '+a+'x + '+b+' = 180.'};}),
    A(function(){var n=Q.int(4,15),m=Q.int(2,5),add0=Q.int(3,12),res=m*n+add0;return{type:'text',q:'A number is multiplied by '+m+', then '+add0+' is added, giving '+res+'. Find the number.',answer:[String(n)],hint:'Solve '+m+'n + '+add0+' = '+res+'.'};}),
  ]);
  add('2.6.4',[
    A(function(){var base=Q.int(4,8),per=Q.int(2,4),budget=base+per*Q.int(5,12);var k=Math.floor((budget-base)/per);return{type:'text',q:'A taxi charges $'+base+' plus $'+per+' per km. With $'+budget+', what is the greatest whole number of kilometres you can travel?',answer:[String(k)],hint:'Solve '+base+' + '+per+'k ≤ '+budget+', then round down.'};}),
  ]);

  /* ===== FORM 3 ===== */
  add('3.1.1',[
    A(function(){var n=Q.int(2,9),sq=n*n,x=Q.int(sq+1,(n+1)*(n+1)-1);return{type:'text',q:'Between which two consecutive whole numbers does √'+x+' lie? Give the smaller number.',answer:[String(n)],hint:''+n+'² = '+sq+' and '+(n+1)+'² = '+((n+1)*(n+1))+'.'};}),
    A(function(){var a=Q.int(2,6),b=Q.int(2,6);return{type:'text',q:'Work out '+tob(a,2)+' + '+tob(b,2)+' in base 2, giving your answer in base 2.',answer:[tob(a+b,2)],hint:'Add, then convert the total to base 2.'};}),
  ]);
  add('3.2.1',[
    A(function(){var both=Q.int(4,12),oa=Q.int(4,14),ob=Q.int(4,14),nei=Q.int(2,8);var tot=oa+both+ob+nei;return{type:'text',q:'In a survey of '+tot+' people, '+(oa+both)+' like tea, '+(ob+both)+' like coffee and '+nei+' like neither. How many like BOTH tea and coffee?',answer:[String(both)],hint:'n(both)=n(T)+n(C)−n(T∪C), and n(T∪C)=total−neither.'};}),
  ]);
  add('3.2.2',[
    A(function(){var m=Q.int(2,5),x1=Q.int(0,3),c=Q.int(1,6),y1=m*x1+c,x2=x1+Q.int(1,3),y2=m*x2+c;return{type:'text',q:'A straight line passes through ('+x1+', '+y1+') and ('+x2+', '+y2+'). Find its y-intercept.',answer:[String(c)],hint:'Find the gradient first, then use y = mx + c with one point.'};}),
  ]);
  add('3.2.3',[
    A(function(){var x=Q.int(1,8),c1=Q.int(1,8),b=2*x+c1;return{type:'text',q:'The lines y = x + '+c1+' and y = −x + '+b+' intersect. Find the x-coordinate of the point of intersection.',answer:Q.root(x),hint:'Set x + '+c1+' = −x + '+b+' and solve for x.'};}),
  ]);
  add('3.3.1',[
    A(function(){var r=Q.int(3,7),bl=Q.int(2,6),g=Q.int(2,6);var tot=r+bl+g;return{type:'text',q:'A bag has '+r+' red, '+bl+' blue and '+g+' green marbles. One is drawn at random. Find P(not blue), as a fraction in lowest terms.',answer:[fr(tot-bl,tot),(tot-bl)+'/'+tot],hint:'P(not blue) = (red + green) ÷ total.'};}),
    A(function(){var a=Q.int(2,6),b=Q.int(2,6),c=Q.int(2,6),tot=a+b+c,col=Q.pick([['red',a],['white',b],['green',c]]);return{type:'text',q:'A bag contains '+a+' red, '+b+' white and '+c+' green balls. One ball is drawn at random. Find P('+col[0]+'), as a fraction in lowest terms.',answer:[fr(col[1],tot),col[1]+'/'+tot],hint:'P = favourable outcomes ÷ total outcomes.'};}),
  ]);
  add('3.4.1',[
    A(function(){var o=Q.mc('SAS',['SSA','AAA','ASS']);return{type:'mc',q:'Two triangles have two pairs of equal sides and the angle BETWEEN those sides equal. Which condition proves them congruent?',options:o.options,answer:o.answer,hint:'Side–Angle–Side.'};}),
  ]);
  add('3.4.2',[
    A(function(){var t=Q.pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17]]),k=Q.int(2,4);var per=(t[0]+t[1]+t[2])*k;return{type:'text',q:'A triangle with sides '+t[0]+' cm, '+t[1]+' cm and '+t[2]+' cm is enlarged by scale factor '+k+'. Find the perimeter of the enlarged triangle (cm).',answer:[String(per)],hint:'Multiply the original perimeter by '+k+'.'};}),
  ]);
  add('3.4.3',[
    A(function(){var t=Q.pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]]),k=Q.int(1,3);return{type:'text',q:'A ladder '+(t[2]*k)+' m long leans against a vertical wall with its foot '+(t[0]*k)+' m from the base of the wall. How far up the wall does it reach (m)?',answer:[String(t[1]*k)],hint:'height = √(ladder² − base²).'};}),
  ]);
  add('3.4.4',[
    A(function(){var t=Q.pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[9,40,41]]),k=Q.int(1,3),t=[t[0]*k,t[1]*k,t[2]*k];return{type:'text',q:'A ramp rises '+t[0]+' m vertically over a horizontal distance of '+t[1]+' m. Find the tangent of its angle of elevation, as a fraction in lowest terms.',answer:[fr(t[0],t[1]),t[0]+'/'+t[1]],hint:'tan = opposite ÷ adjacent = rise ÷ run.'};}),
  ]);
  add('3.4.5',[
    A(function(){var o=Q.mc('perpendicular bisector',['angle bisector','median','altitude']);return{type:'mc',q:'To find the point equidistant from two towns A and B on a map, you construct the …',options:o.options,answer:o.answer,hint:'Every point on it is the same distance from A and B.'};}),
  ]);
  add('3.4.6',[
    A(function(){var n=Q.pick([5,6,8,9,10,12,15,18,20,24]),interior=180-360/n;return{type:'text',q:'Each interior angle of a regular polygon is '+interior+'°. How many sides does it have?',answer:[String(n)],hint:'Exterior angle = 180 − interior; number of sides = 360 ÷ exterior.'};}),
    A(function(){var n=Q.int(5,12),sum=(n-2)*180;return{type:'text',q:'The interior angles of a polygon add up to '+sum+'°. How many sides does it have?',answer:[String(n)],hint:'Sum = (n − 2) × 180, so n = sum ÷ 180 + 2.'};}),
  ]);
  add('3.5.1',[
    A(function(){var r=7*Q.int(1,4),ang=Q.pick([90,180,72,120,144]);return{type:'text',q:'A sector of a circle has radius '+r+' cm and angle '+ang+'° at the centre. Find its area (π = 22/7), in cm². Give to 1 d.p. if needed.',answer:Q.dec(Math.round(ang/360*22/7*r*r*10)/10),hint:'Area = (θ/360) × π × r².'};}),
  ]);
  add('3.5.2',[
    A(function(){var a=Q.int(2,5),b=Q.int(1,4),c=Q.int(1,4);var m3=a*b*c;return{type:'text',q:'A water tank is a cuboid measuring '+a+' m by '+b+' m by '+c+' m. Find its capacity in litres. (1 m³ = 1000 litres)',answer:[String(m3*1000)],hint:'Volume in m³, then × 1000.'};}),
  ]);
  add('3.5.3',[
    A(function(){var s=Q.pick([25000,50000,100000]),d=Q.int(3,12);var km=d*s/100000;return{type:'text',q:'On a map with scale 1 : '+s.toLocaleString('en').replace(/,/g,' ')+', two towns are '+d+' cm apart. Find the real distance between them, in km.',answer:Q.dec(km),hint:'Real distance = '+d+' × '+s+' cm; convert to km (÷100 000).'};}),
  ]);
  add('3.5.4',[
    A(function(){var p=Q.int(10,60)*100,r=Q.pick([5,6,8,10]),t=Q.int(2,4);var si=p*r*t/100;return{type:'text',q:'A man borrows $'+p+' at '+r+'% simple interest per year for '+t+' years. Find the total amount he must repay ($).',answer:[String(p+si)],hint:'Interest = (P×R×T)/100; add it to the principal.'};}),
  ]);
  add('3.6.1',[
    A(function(){var k=Q.int(2,14),x=6*k;return{type:'text',q:'Solve  x/2 + x/3 = '+(5*k)+'.',answer:Q.root(x),hint:'Multiply every term by 6: 3x + 2x = '+(30*k)+'.'};}),
  ]);
  add('3.6.2',[
    A(function(){var d=Q.int(2,5),v=Q.int(3,9);return{type:'text',q:'Solve the inequality  x/'+d+' &gt; '+v+'. Give your answer in the form x &gt; …',answer:Q.ineq('>',d*v),hint:'Multiply both sides by '+d+'.'};}),
  ]);
  add('3.6.3',[
    A(function(){var x=Q.int(2,9),y=Q.int(1,8),s=x+y,d=x-y;return{type:'text',q:'Solve the simultaneous equations  x + y = '+s+'  and  x − y = '+d+'. Find the value of x.',answer:Q.root(x),hint:'Add the two equations to eliminate y.'};}),
  ]);
  add('3.6.4',[
    A(function(){var a=Q.int(2,4),m=Q.int(2,4),n=Q.int(2,4);return{type:'text',q:'Simplify  '+a+'^'+m+' × '+a+'^'+n+', giving your answer as a single power of '+a+' (write the index only).',answer:[String(m+n)],hint:'When multiplying powers of the same base, add the indices.'};}),
  ]);
  add('3.6.5',[
    A(function(){var co=Q.int(2,5),c2=co*Q.int(2,5),p1=Q.int(4,7),p2=Q.int(1,3);return{type:'text',q:'Simplify  ('+c2+'x^'+p1+') ÷ ('+co+'x^'+p2+').',answer:[(c2/co)+'x^'+(p1-p2),(c2/co)+'x'+(p1-p2)],hint:'Divide the numbers and subtract the indices.'};}),
  ]);
  add('3.6.6',[
    A(function(){var a=Q.int(2,6),b=Q.int(2,9);var g=gcd(a,b);return{type:'text',q:'Factorise completely  '+a+'x + '+(a*b)+'.',answer:[a+'(x+'+b+')',a+'(x + '+b+')'],hint:'Take out the highest common factor, '+a+'.'};}),
  ]);
  add('3.6.7',[
    A(function(){var r1=Q.int(1,6),r2=Q.int(1,6);if(r1<r2){var t=r1;r1=r2;r2=t;}var b=r1+r2,c=r1*r2;return{type:'text',q:'Solve  x² − '+b+'x + '+c+' = 0. Give the larger root.',answer:[String(r1)],hint:'Factorise to (x − '+r1+')(x − '+r2+') = 0.'};}),
  ]);

})();
