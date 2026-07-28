/* Full content for the Measurement strand (Forms 1-3).
   Same pattern as content.js / content-algebra.js: attaches .content to topics in
   window.CURRICULUM. Loaded after data.js and qgen.js.

   Notes and worked examples are fixed; practice questions are GENERATED — see the
   "Generated practice" section of CLAUDE.md. */
(function(){
  var C=window.CURRICULUM; if(!C) return;
  var Q=window.QG;
  function f(a,b){ return '<span class="frac"><span>'+a+'</span><span>'+b+'</span></span>'; } // fraction
  function set(code,content){ if(C[code]) C[code].content=content; }

  /* ============================ FORM 1 ============================ */

  set('1.5.1', {
    notes:[
      {h:'Why we need standard units', html:
        '<p>Long ago people measured with whatever was handy — a <b>hand span</b>, a <b>foot</b>, a <b>cubit</b> (elbow to fingertip). These are <b>non-standard units</b>: my span is not the same as yours, so the same wall gives two different answers.</p>'+
        '<p>A <b>standard unit</b> is agreed by everyone and never changes. That is why a metre is a metre in every country, and why measurements can be compared, recorded and trusted.</p>'+
        '<div class="formula">Non-standard: spans, paces, cups&nbsp;&nbsp;·&nbsp;&nbsp;Standard: mm, cm, m, km, g, kg, s, min, h</div>'},
      {h:'The metric system follows place value', html:
        '<p>The metric system is built on <b>powers of 10</b>, exactly like our denary (base-10) number system. That is what makes converting so easy — you only move the decimal point.</p>'+
        '<div class="formula">kilo- = 1000&nbsp;·&nbsp;centi- = '+f('1','100')+'&nbsp;·&nbsp;milli- = '+f('1','1000')+'</div>'+
        '<ul><li>1 km = 1000 m &nbsp;·&nbsp; 1 m = 100 cm &nbsp;·&nbsp; 1 cm = 10 mm</li>'+
        '<li>1 kg = 1000 g &nbsp;·&nbsp; 1 litre = 1000 ml</li></ul>'+
        '<p>The same prefixes work for every quantity, so learning them once covers length, mass and capacity.</p>'},
      {h:'Metric and imperial', html:
        '<p>The <b>imperial</b> system (inches, feet, pounds, pints) is still used in some places. It has no neat pattern — 12 inches to a foot, 3 feet to a yard, 16 ounces to a pound — which is exactly why the metric system replaced it for science.</p>'+
        '<p>Useful rough equivalents:</p>'+
        '<div class="formula">1 inch ≈ 2.5 cm&nbsp;·&nbsp;1 foot ≈ 30 cm&nbsp;·&nbsp;1 mile ≈ 1.6 km&nbsp;·&nbsp;1 kg ≈ 2.2 pounds&nbsp;·&nbsp;1 litre ≈ 1.75 pints</div>'},
    ],
    examples:[
      {q:'Explain why measuring a classroom in "paces" can give two different answers.', answer:'A pace is a non-standard unit — it differs from person to person',
       steps:['A pace depends on the length of the person\'s stride.',
              'A tall person\'s pace covers more ground than a short person\'s.',
              'So the same room measures, say, 12 paces for one and 15 for another.',
              'A standard unit like the metre is fixed, so everyone gets the same answer.']},
      {q:'How many centimetres are there in 3.5 metres?', answer:'350 cm',
       steps:['1 metre = 100 centimetres.','So multiply by 100: 3.5 × 100.','3.5 × 100 = 350 cm.']},
    ],
    practice:[
      {gen:function(){
        var items=[['the length of a pencil','centimetres (cm)','kilometres (km)','metres (m)','millilitres (ml)'],
                   ['the distance between two towns','kilometres (km)','centimetres (cm)','millimetres (mm)','grams (g)'],
                   ['the mass of a bag of flour','kilograms (kg)','kilometres (km)','litres (l)','seconds (s)'],
                   ['the water in a drinking glass','millilitres (ml)','metres (m)','grams (g)','hours (h)'],
                   ['the thickness of a coin','millimetres (mm)','kilometres (km)','litres (l)','kilograms (kg)'],
                   ['the length of a football field','metres (m)','millimetres (mm)','grams (g)','millilitres (ml)']];
        var it=Q.pick(items), o=Q.mc(it[1],[it[2],it[3],it[4]]);
        return {type:'mc', q:'Which is the most sensible standard unit for measuring '+it[0]+'?',
          options:o.options, answer:o.answer, hint:'Pick the unit that gives a convenient-sized number.'};
      }},
      {gen:function(){
        var nonstd=['hand spans','paces','cubits','cups','strides','arm lengths'];
        var std=['metres','centimetres','kilograms','litres','millimetres'];
        var askNon=Q.chance(0.5);
        var correct=askNon?Q.pick(nonstd):Q.pick(std);
        var wrong=askNon?Q.sample(std,3):Q.sample(nonstd,3);
        var o=Q.mc(correct,wrong);
        return {type:'mc', q:'Which of these is a '+(askNon?'NON-standard':'standard')+' unit of measure?',
          options:o.options, answer:o.answer,
          hint:askNon?'A non-standard unit changes from person to person.'
                     :'A standard unit is agreed by everyone and never changes.'};
      }},
      {gen:function(){
        var conv=[['km','m',1000],['m','cm',100],['cm','mm',10],['kg','g',1000],['litres','ml',1000]];
        var c=Q.pick(conv), n=Q.pick([1,2,3,4,5,6,7,8,9,10,12,15,20]);
        return {type:'text', q:'How many '+c[1]+' are there in '+n+' '+c[0]+'?',
          answer:[String(n*c[2])], hint:'1 '+c[0]+' = '+c[2]+' '+c[1]+', so multiply by '+c[2]+'.'};
      }},
      {gen:function(){
        var pairs=[['1 inch','2.5 cm'],['1 foot','30 cm'],['1 mile','1.6 km'],['1 kg','2.2 pounds'],['1 litre','1.75 pints']];
        var p=Q.pick(pairs);
        var o=Q.mc(p[1], Q.sample(pairs.filter(function(x){return x!==p;}),3).map(function(x){return x[1];}));
        return {type:'mc', q:'Roughly, '+p[0]+' is about the same as…', options:o.options, answer:o.answer,
          hint:'These are the everyday metric/imperial equivalents worth remembering.'};
      }},
      {gen:function(){
        var big=Q.pick([['m','cm',100],['km','m',1000],['kg','g',1000],['cm','mm',10]]);
        var n=Q.pick([1.5,2.5,3.5,4.5,0.5,2.25,1.25]);
        return {type:'text', q:'Convert '+n+' '+big[0]+' into '+big[1]+'.',
          answer:Q.dec(Q.fix(n*big[2],2)),
          hint:'Multiply by '+big[2]+' — the metric system moves in powers of 10.'};
      }},
    ]
  });

  set('1.5.2', {
    notes:[
      {h:'Choosing the instrument', html:
        '<p>Match the tool to the job:</p>'+
        '<ul><li><b>Ruler</b> — short straight lengths, in mm and cm.</li>'+
        '<li><b>Measuring tape</b> — longer or curved things (a room, a waist).</li>'+
        '<li><b>Trundle wheel</b> — long distances along the ground; it clicks each metre.</li>'+
        '<li><b>Metre rule</b> — lengths around a metre.</li></ul>'+
        '<p>Always start at the <b>zero</b> mark, not the end of the ruler, and read straight down onto the scale.</p>'},
      {h:'The ladder of units', html:
        '<div class="formula">km &nbsp;<b>×1000↓ ÷1000↑</b>&nbsp; m &nbsp;<b>×100↓ ÷100↑</b>&nbsp; cm &nbsp;<b>×10↓ ÷10↑</b>&nbsp; mm</div>'+
        '<p>Going <b>down</b> to a smaller unit, <b>multiply</b> (you need more of them). Going <b>up</b> to a bigger unit, <b>divide</b>.</p>'+
        '<p>4 m = 4 × 100 = 400 cm.&nbsp;&nbsp;·&nbsp;&nbsp;2500 m = 2500 ÷ 1000 = 2.5 km.</p>'+
        '<p>To skip a rung, combine: m → mm is ×100 then ×10, i.e. <b>×1000</b>.</p>'},
      {h:'Problems with length', html:
        '<p>Before adding or subtracting, put <b>everything in the same unit</b> — that is where most marks are lost.</p>'+
        '<p><i>A plank 2.4 m long has 65 cm cut off. What is left?</i></p>'+
        '<p>2.4 m = 240 cm, so 240 − 65 = <b>175 cm</b> (or 1.75 m).</p>'},
    ],
    examples:[
      {q:'Convert 3.6 km into metres.', answer:'3600 m',
       steps:['km → m is going down a rung, so multiply.','1 km = 1000 m.','3.6 × 1000 = 3600 m.']},
      {q:'A ribbon is 1.2 m long. Three pieces of 25 cm are cut from it. How much ribbon is left?', answer:'45 cm',
       steps:['Put everything in the same unit: 1.2 m = 120 cm.',
              'Three pieces of 25 cm use 3 × 25 = 75 cm.',
              '120 − 75 = 45 cm left.']},
    ],
    practice:[
      {gen:function(){
        var c=Q.pick([['m','cm',100],['km','m',1000],['cm','mm',10],['m','mm',1000]]);
        var n=Q.pick([1.5,2.4,3.6,4.2,5.8,0.75,2.25,6,7,12]);
        return {type:'text', q:'Convert '+n+' '+c[0]+' into '+c[1]+'.',
          answer:Q.dec(Q.fix(n*c[2],2)), hint:'Going to a smaller unit, so multiply by '+c[2]+'.'};
      }},
      {gen:function(){
        var c=Q.pick([['cm','m',100],['m','km',1000],['mm','cm',10]]);
        var k=Q.pick([1.5,2.5,3.2,4.8,6,7.5,12,25]), n=Q.fix(k*c[2],2);
        return {type:'text', q:'Convert '+n+' '+c[0]+' into '+c[1]+'.',
          answer:Q.dec(k), hint:'Going to a bigger unit, so divide by '+c[2]+'.'};
      }},
      {gen:function(){
        var jobs=[['the length of your exercise book','a ruler','a trundle wheel','a measuring jug','a stopwatch'],
                  ['the distance around a running track','a trundle wheel','a ruler','a measuring jug','a thermometer'],
                  ['a person\'s waist','a measuring tape','a ruler','a trundle wheel','a balance'],
                  ['the width of a doorway','a measuring tape','a stopwatch','a measuring jug','a thermometer'],
                  ['the thickness of a sheet of card','a ruler','a trundle wheel','a measuring tape','a balance']];
        var j=Q.pick(jobs), o=Q.mc(j[1],[j[2],j[3],j[4]]);
        return {type:'mc', q:'Which instrument would you use to measure '+j[0]+'?',
          options:o.options, answer:o.answer, hint:'Match the size of the job to the size of the tool.'};
      }},
      {gen:function(){
        var m=Q.pick([1.2,1.5,2,2.4,3,3.6]), cm=m*100, n=Q.int(2,5), piece=Q.pick([15,20,25,30,35]);
        while(n*piece>=cm) n--;
        return {type:'text', q:'A ribbon is '+m+' m long. '+n+' pieces of '+piece+' cm are cut from it. How many cm are left?',
          answer:[String(cm-n*piece)],
          hint:'Change '+m+' m to '+cm+' cm first, then subtract '+n+' × '+piece+' = '+(n*piece)+'.'};
      }},
      {gen:function(){
        var a=Q.pick([1.2,2.5,3.4,0.8,4.6]), b=Q.pick([40,55,70,85,120,150]);
        return {type:'text', q:'Add '+a+' m and '+b+' cm. Give your answer in centimetres.',
          answer:[String(Q.fix(a*100+b,0))],
          hint:'Convert '+a+' m to '+(a*100)+' cm first — both must be in the same unit.'};
      }},
    ]
  });

  set('1.5.3', {
    notes:[
      {h:'What perimeter is', html:
        '<p><b>Perimeter</b> is the total distance all the way <i>around the outside</i> of a flat shape — the length of fence needed to enclose it.</p>'+
        '<p>Because it is a length, it is measured in <b>cm, m, km</b> — never in squared units.</p>'+
        '<p>For any shape, perimeter = <b>add up every side</b>. The formulas below are just shortcuts for that.</p>'},
      {h:'The shortcuts', html:
        '<div class="formula">Rectangle: P = 2(l + w)&nbsp;&nbsp;·&nbsp;&nbsp;Square: P = 4s<br>'+
        'Regular polygon with n sides: P = n × s</div>'+
        '<p>A rectangle 8 cm by 5 cm: P = 2(8 + 5) = 2 × 13 = <b>26 cm</b>.</p>'+
        '<p>A regular hexagon of side 7 cm: P = 6 × 7 = <b>42 cm</b>.</p>'},
      {h:'Working backwards', html:
        '<p>Given the perimeter, you can find a missing side — just undo the formula.</p>'+
        '<p><i>A square has perimeter 36 cm. Find its side.</i> → s = 36 ÷ 4 = <b>9 cm</b>.</p>'+
        '<p><i>A rectangle has perimeter 30 cm and width 4 cm. Find its length.</i></p>'+
        '<p>2(l + 4) = 30 → l + 4 = 15 → l = <b>11 cm</b>.</p>'+
        '<p>Give answers <b>to the accuracy asked for</b> — if the question says "to 1 decimal place", round at the very end, not part-way through.</p>'},
    ],
    examples:[
      {q:'Find the perimeter of a rectangle 12 cm long and 7 cm wide.', answer:'38 cm',
       steps:['P = 2(l + w).','l + w = 12 + 7 = 19.','P = 2 × 19 = 38 cm.']},
      {q:'A square field has a perimeter of 48 m. How long is each side?', answer:'12 m',
       steps:['A square has 4 equal sides, so P = 4s.','48 = 4s.','s = 48 ÷ 4 = 12 m.']},
    ],
    practice:[
      {gen:function(){
        var l=Q.int(4,20), w=Q.int(2,l-1);
        return {type:'text', q:'Find the perimeter of a rectangle '+l+' cm long and '+w+' cm wide (in cm).',
          answer:[String(2*(l+w))], hint:'P = 2(l + w) = 2('+l+' + '+w+').'};
      }},
      {gen:function(){
        var s=Q.int(3,25);
        return {type:'text', q:'Find the perimeter of a square of side '+s+' cm (in cm).',
          answer:[String(4*s)], hint:'A square has 4 equal sides: P = 4 × '+s+'.'};
      }},
      {gen:function(){
        var s=Q.int(3,25), p=4*s;
        return {type:'text', q:'A square has a perimeter of '+p+' m. How long is each side (in m)?',
          answer:[String(s)], hint:'P = 4s, so divide '+p+' by 4.'};
      }},
      {gen:function(){
        var shapes=[[3,'equilateral triangle'],[5,'regular pentagon'],[6,'regular hexagon'],
                    [8,'regular octagon'],[4,'square']];
        var sh=Q.pick(shapes), s=Q.int(3,15), p=sh[0]*s;
        var o=Q.mc(p+' cm', [(sh[0]*s+s)+' cm', (sh[0]*s-s)+' cm', (2*sh[0]*s)+' cm']);
        return {type:'mc', q:'What is the perimeter of a'+(sh[1][0]==='e'?'n ':' ')+sh[1]+' with sides of '+s+' cm?',
          options:o.options, answer:o.answer, hint:'A'+(sh[1][0]==='e'?'n ':' ')+sh[1]+' has '+sh[0]+' equal sides.'};
      }},
      {gen:function(){
        var w=Q.int(2,12), l=Q.int(w+1,20), p=2*(l+w);
        return {type:'text', q:'A rectangle has a perimeter of '+p+' cm and a width of '+w+' cm. Find its length (in cm).',
          answer:[String(l)],
          hint:'2(l + '+w+') = '+p+', so l + '+w+' = '+(p/2)+'.'};
      }},
    ]
  });

  set('1.5.4', {
    notes:[
      {h:'What area is', html:
        '<p><b>Area</b> is the amount of flat surface a shape covers — how much paint, tile or grass it would take to cover it.</p>'+
        '<p>We measure it in <b>squares</b>, so the units are always <b>squared</b>: cm², m², km².</p>'+
        '<p>A rectangle 4 cm by 3 cm holds 3 rows of 4 unit squares = 12 squares, so its area is <b>12 cm²</b>. That is exactly why the formula is length × width.</p>'+
        '<div class="formula">Perimeter is measured in cm &nbsp;·&nbsp; Area is measured in cm²</div>'},
      {h:'The formulas', html:
        '<div class="formula">Rectangle: A = l × w&nbsp;&nbsp;·&nbsp;&nbsp;Square: A = s²<br>Triangle: A = '+f('1','2')+' × base × height</div>'+
        '<p>The triangle formula works because any triangle is exactly <b>half</b> of a rectangle drawn around it.</p>'+
        '<p>The <b>height</b> must be the <i>perpendicular</i> height — straight up from the base at right angles, not a slanted side.</p>'},
      {h:'Working backwards', html:
        '<p><i>A rectangle has area 48 cm² and length 8 cm. Find its width.</i></p>'+
        '<p>A = l × w → 48 = 8 × w → w = 48 ÷ 8 = <b>6 cm</b>.</p>'+
        '<p>Watch the units: if the sides are in metres the area is in m², and you cannot mix cm with m in one calculation.</p>'},
    ],
    examples:[
      {q:'Find the area of a rectangle 9 cm by 6 cm.', answer:'54 cm²',
       steps:['A = l × w.','A = 9 × 6.','A = 54 cm² — note the squared unit.']},
      {q:'Find the area of a triangle with base 10 cm and perpendicular height 7 cm.', answer:'35 cm²',
       steps:['A = '+f('1','2')+' × base × height.','A = '+f('1','2')+' × 10 × 7.',
              '10 × 7 = 70, and half of 70 is 35.','A = 35 cm².']},
    ],
    practice:[
      {gen:function(){
        var l=Q.int(3,20), w=Q.int(2,15);
        return {type:'text', q:'Find the area of a rectangle '+l+' cm by '+w+' cm (in cm²).',
          answer:[String(l*w)], hint:'A = l × w = '+l+' × '+w+'.'};
      }},
      {gen:function(){
        var s=Q.int(3,20);
        return {type:'text', q:'Find the area of a square of side '+s+' cm (in cm²).',
          answer:[String(s*s)], hint:'A = s² = '+s+' × '+s+'.'};
      }},
      {gen:function(){
        var b=Q.pick([4,6,8,10,12,14,16,18,20]), h=Q.int(3,15);
        return {type:'text', q:'Find the area of a triangle with base '+b+' cm and perpendicular height '+h+' cm (in cm²).',
          answer:Q.dec(Q.fix(b*h/2,2)), hint:'A = ½ × '+b+' × '+h+'.'};
      }},
      {gen:function(){
        var o=Q.mc('cm²',['cm','cm³','ml']);
        return {type:'mc', q:'Which unit is used for the AREA of a shape measured in centimetres?',
          options:o.options, answer:o.answer, hint:'Area counts squares, so the unit is squared.'};
      }},
      {gen:function(){
        var l=Q.int(3,15), w=Q.int(2,12), a=l*w;
        return {type:'text', q:'A rectangle has an area of '+a+' cm² and a length of '+l+' cm. Find its width (in cm).',
          answer:[String(w)], hint:'A = l × w, so divide '+a+' by '+l+'.'};
      }},
    ]
  });

  set('1.5.5', {
    notes:[
      {h:'Mass and weight', html:
        '<p><b>Mass</b> is how much matter an object contains — measured in <b>grams (g)</b>, <b>kilograms (kg)</b> and <b>tonnes (t)</b>. Mass never changes.</p>'+
        '<p><b>Weight</b> is the pull of gravity on that mass. On the Moon your mass is the same but your weight is about a sixth.</p>'+
        '<p>In everyday life the words are used interchangeably, and we measure both with a <b>balance</b> or <b>scale</b>.</p>'},
      {h:'Converting', html:
        '<div class="formula">1 tonne = 1000 kg&nbsp;&nbsp;·&nbsp;&nbsp;1 kg = 1000 g&nbsp;&nbsp;·&nbsp;&nbsp;1 g = 1000 mg</div>'+
        '<p>kg → g: <b>multiply</b> by 1000. &nbsp; g → kg: <b>divide</b> by 1000.</p>'+
        '<p>2.5 kg = 2500 g&nbsp;&nbsp;·&nbsp;&nbsp;750 g = 0.75 kg</p>'},
      {h:'Choosing sensible units', html:
        '<ul><li><b>mg</b> — a grain of salt, a tablet</li>'+
        '<li><b>g</b> — a letter, an apple, a bag of sugar</li>'+
        '<li><b>kg</b> — a person, a bag of cement</li>'+
        '<li><b>tonnes</b> — a car, a truckload</li></ul>'+
        '<p>In a problem, convert everything to one unit <i>first</i>, then add or subtract.</p>'},
    ],
    examples:[
      {q:'Convert 3.4 kg into grams.', answer:'3400 g',
       steps:['1 kg = 1000 g.','Going to a smaller unit, so multiply.','3.4 × 1000 = 3400 g.']},
      {q:'A box weighs 2 kg. Six tins of 350 g are put inside. What is the total mass in kg?', answer:'4.1 kg',
       steps:['Six tins: 6 × 350 = 2100 g.','2100 g = 2100 ÷ 1000 = 2.1 kg.','Total = 2 + 2.1 = 4.1 kg.']},
    ],
    practice:[
      {gen:function(){
        var n=Q.fix(Q.int(25,950)/100,2);          // 0.25 - 9.50 kg, in hundredths
        return {type:'text', q:'Convert '+n+' kg into grams.', answer:[String(Q.fix(n*1000,0))],
          hint:'1 kg = 1000 g, so multiply by 1000.'};
      }},
      {gen:function(){
        var kg=Q.fix(Q.int(25,1200)/100,2), g=Q.fix(kg*1000,0);
        return {type:'text', q:'Convert '+g+' g into kilograms.', answer:Q.dec(kg),
          hint:'1000 g = 1 kg, so divide by 1000.'};
      }},
      {gen:function(){
        var box=Q.int(1,5), n=Q.int(3,8), tin=Q.pick([150,200,250,300,350,400,500]);
        var total=box+n*tin/1000;
        return {type:'text', q:'A box has a mass of '+box+' kg. '+n+' tins of '+tin+' g are put inside. What is the total mass in kg?',
          answer:Q.dec(Q.fix(total,3)),
          hint:n+' × '+tin+' g = '+(n*tin)+' g = '+(n*tin/1000)+' kg, then add '+box+'.'};
      }},
      {gen:function(){
        var items=[['a grain of rice','milligrams (mg)'],['an apple','grams (g)'],['a person','kilograms (kg)'],
                   ['a lorry','tonnes (t)'],['a bag of cement','kilograms (kg)'],['a letter','grams (g)']];
        var it=Q.pick(items);
        var all=['milligrams (mg)','grams (g)','kilograms (kg)','tonnes (t)'];
        var o=Q.mc(it[1], Q.sample(all.filter(function(u){return u!==it[1];}),3));
        return {type:'mc', q:'Which unit would you sensibly use for the mass of '+it[0]+'?',
          options:o.options, answer:o.answer, hint:'Choose the unit that gives a convenient-sized number.'};
      }},
      {gen:function(){
        var each=Q.pick([125,200,250,400,500]), n=Q.int(3,12), total=each*n;
        return {type:'text', q:'Sugar is packed into bags of '+each+' g. How many bags can be filled from '+Q.fix(total/1000,3)+' kg?',
          answer:[String(n)],
          hint:Q.fix(total/1000,3)+' kg = '+total+' g. Divide by '+each+'.'};
      }},
    ]
  });

  set('1.5.6', {
    notes:[
      {h:'Units of time', html:
        '<p>Time is the one measure that is <b>not</b> metric — it runs in 60s and 24s, not powers of 10.</p>'+
        '<div class="formula">60 seconds = 1 minute&nbsp;·&nbsp;60 minutes = 1 hour&nbsp;·&nbsp;24 hours = 1 day<br>'+
        '7 days = 1 week&nbsp;·&nbsp;52 weeks ≈ 1 year&nbsp;·&nbsp;12 months = 1 year</div>'+
        '<p>So 2 hours = 2 × 60 = <b>120 minutes</b>, and 150 seconds = 150 ÷ 60 = <b>2 min 30 s</b>.</p>'},
      {h:'The 24-hour clock', html:
        '<p>The 24-hour clock avoids am/pm confusion. After midday keep counting: 1 pm is <b>13:00</b>, 8 pm is <b>20:00</b>.</p>'+
        '<div class="formula">09:45 = 9:45 am&nbsp;&nbsp;·&nbsp;&nbsp;15:20 = 3:20 pm&nbsp;&nbsp;·&nbsp;&nbsp;00:30 = half past midnight</div>'+
        '<p>To go from pm to 24-hour, <b>add 12</b> to the hours.</p>'},
      {h:'Finding a duration', html:
        '<p>To find how long something lasted, count on from the start time — <b>do not</b> subtract the digits like ordinary numbers, because there are 60 minutes in an hour, not 100.</p>'+
        '<p><i>From 10:40 to 13:15:</i></p>'+
        '<ol><li>10:40 → 11:00 is 20 minutes.</li>'+
        '<li>11:00 → 13:00 is 2 hours.</li>'+
        '<li>13:00 → 13:15 is 15 minutes.</li>'+
        '<li>Total: 2 hours 35 minutes.</li></ol>'},
    ],
    examples:[
      {q:'Convert 3.5 hours into minutes.', answer:'210 minutes',
       steps:['1 hour = 60 minutes.','3.5 × 60 = 210.','So 3.5 hours = 210 minutes.']},
      {q:'A film starts at 18:45 and ends at 21:10. How long is it?', answer:'2 hours 25 minutes',
       steps:['18:45 → 19:00 is 15 minutes.','19:00 → 21:00 is 2 hours.','21:00 → 21:10 is 10 minutes.',
              'Total: 2 hours + 15 + 10 = 2 hours 25 minutes.']},
    ],
    practice:[
      {gen:function(){
        var h=Q.pick([2,3,4,5,1.5,2.5,3.5,0.5,6]);
        return {type:'text', q:'Convert '+h+' hours into minutes.', answer:[String(Q.fix(h*60,0))],
          hint:'1 hour = 60 minutes, so multiply by 60.'};
      }},
      {gen:function(){
        var m=Q.pick([2,3,4,5,1.5,2.5,10,15]);
        return {type:'text', q:'Convert '+m+' minutes into seconds.', answer:[String(Q.fix(m*60,0))],
          hint:'1 minute = 60 seconds, so multiply by 60.'};
      }},
      {gen:function(){
        var sh=Q.int(8,18), sm=Q.pick([5,10,15,20,25,35,40,45,50]);
        var dh=Q.int(1,3), dm=Q.pick([10,15,20,25,30,35,40]);
        var tot=sh*60+sm+dh*60+dm, eh=Math.floor(tot/60), em=tot%60;
        var pad=function(n){ return (n<10?'0':'')+n; };
        return {type:'text', q:'A film starts at '+pad(sh)+':'+pad(sm)+' and ends at '+pad(eh)+':'+pad(em)+
            '. How many MINUTES long is it?',
          answer:[String(dh*60+dm)],
          hint:'Count on from '+pad(sh)+':'+pad(sm)+' to the next whole hour first, then add the rest.'};
      }},
      {gen:function(){
        var w=Q.int(2,12), o=Q.mc(String(7*w), [String(7*w+7), String(w*5), String(w*30)]);
        return {type:'mc', q:'How many days are there in '+w+' weeks?', options:o.options, answer:o.answer,
          hint:'1 week = 7 days.'};
      }},
      {gen:function(){
        var h=Q.int(1,6), m=Q.pick([5,10,15,20,25,30,35,40,45,50]);
        return {type:'text', q:'Write '+(h*60+m)+' minutes in hours and minutes. (use the format 2 h 35 min)',
          answer:[h+'h'+m+'min', h+' h '+m+' min', h+':'+(m<10?'0':'')+m],
          hint:'Divide by 60: the whole number is the hours, the remainder is the minutes.'};
      }},
    ]
  });

  /* ============================ FORM 2 ============================ */

  set('2.5.1', {
    notes:[
      {h:'Instrument, unit, accuracy', html:
        '<p>Three decisions before you measure anything:</p>'+
        '<ol><li><b>Which instrument?</b> ruler / tape / trundle wheel for length, balance for mass, measuring cylinder for volume, stopwatch for time, thermometer for temperature.</li>'+
        '<li><b>Which unit?</b> the one giving a sensible-sized number — a road in km, a pencil in cm.</li>'+
        '<li><b>How accurately?</b> to the nearest mm, to 1 decimal place, and so on.</li></ol>'+
        '<p><b>Reading a scale:</b> work out what one small division is worth first. If 0 to 10 is split into 5 gaps, each gap is 2 units — not 1. Read straight on to avoid parallax error.</p>'},
      {h:'Converting within the metric system', html:
        '<div class="formula">km &nbsp;×1000&nbsp; m &nbsp;×100&nbsp; cm &nbsp;×10&nbsp; mm&nbsp;&nbsp;(divide going the other way)</div>'+
        '<p>The same powers of 10 apply to mass (t, kg, g, mg) and capacity (l, ml).</p>'},
      {h:'Converting units of AREA — the trap', html:
        '<p>Area conversions are <b>not</b> the same as length conversions. A square metre is 100 cm by 100 cm:</p>'+
        '<div class="formula">1 m² = 100 × 100 = <b>10 000 cm²</b>&nbsp;&nbsp;·&nbsp;&nbsp;1 cm² = 10 × 10 = <b>100 mm²</b><br>1 km² = 1000 × 1000 = <b>1 000 000 m²</b></div>'+
        '<p>So you <b>square the conversion factor</b>. Writing 1 m² = 100 cm² is the single commonest error in this topic.</p>'},
      {h:'The unitary method', html:
        '<p>To convert between systems, first find the value of <b>one</b>.</p>'+
        '<p><i>If 5 kg costs $40, what do 8 kg cost?</i></p>'+
        '<p>1 kg costs 40 ÷ 5 = $8, so 8 kg cost 8 × 8 = <b>$64</b>.</p>'+
        '<p>The same idea converts miles to km: if 1 mile ≈ 1.6 km, then 15 miles ≈ 15 × 1.6 = 24 km.</p>'},
    ],
    examples:[
      {q:'Convert 3 m² into cm².', answer:'30 000 cm²',
       steps:['1 m = 100 cm, so 1 m² = 100 × 100 = 10 000 cm².',
              'Multiply by 10 000, not 100.','3 × 10 000 = 30 000 cm².']},
      {q:'If 4 pens cost $18, what do 7 pens cost?', answer:'$31.50',
       steps:['Find the cost of one pen: 18 ÷ 4 = $4.50.','Then 7 pens: 7 × 4.50.','= $31.50.']},
    ],
    practice:[
      {gen:function(){
        var c=Q.pick([['m','cm',100],['km','m',1000],['cm','mm',10],['kg','g',1000],['l','ml',1000]]);
        var n=Q.pick([1.5,2.4,3.6,4.8,0.75,5,7.2,12]);
        return {type:'text', q:'Convert '+n+' '+c[0]+' into '+c[1]+'.',
          answer:Q.dec(Q.fix(n*c[2],2)), hint:'Multiply by '+c[2]+'.'};
      }},
      {gen:function(){
        var c=Q.pick([['m²','cm²',10000],['cm²','mm²',100],['km²','m²',1000000]]);
        var n=Q.int(2,9);
        return {type:'text', q:'Convert '+n+' '+c[0]+' into '+c[1]+'.',
          answer:[String(n*c[2])],
          hint:'For AREA you square the factor: 1 '+c[0]+' = '+c[2]+' '+c[1]+'.'};
      }},
      {gen:function(){
        var jobs=[['the volume of a liquid','a measuring cylinder','a trundle wheel','a balance','a protractor'],
                  ['the mass of a parcel','a balance','a stopwatch','a ruler','a thermometer'],
                  ['the time for a race','a stopwatch','a measuring jug','a tape measure','a balance'],
                  ['the temperature of water','a thermometer','a balance','a trundle wheel','a protractor'],
                  ['the size of an angle','a protractor','a balance','a stopwatch','a measuring cylinder']];
        var j=Q.pick(jobs), o=Q.mc(j[1],[j[2],j[3],j[4]]);
        return {type:'mc', q:'Which instrument measures '+j[0]+'?', options:o.options, answer:o.answer,
          hint:'Match the instrument to the quantity being measured.'};
      }},
      {gen:function(){
        var n1=Q.int(2,8), unit=Q.pick(['pens','books','kg of rice','litres of paint']);
        var each=Q.pick([1.5,2.5,3,4,4.5,6,7.5]), n2=Q.int(n1+1,12);
        return {type:'text', q:'If '+n1+' '+unit+' cost $'+Q.fix(n1*each,2)+', what do '+n2+' '+unit+' cost? (in $)',
          answer:Q.money(n2*each),
          hint:'Find the cost of one first: '+Q.fix(n1*each,2)+' ÷ '+n1+' = $'+each+'.'};
      }},
      {gen:function(){
        var miles=Q.int(5,60), km=Q.fix(miles*1.6,2);
        return {type:'text', q:'Taking 1 mile = 1.6 km, convert '+miles+' miles into kilometres.',
          answer:Q.dec(km), hint:'Multiply '+miles+' by 1.6.'};
      }},
    ]
  });

  set('2.5.2', {
    notes:[
      {h:'The parts of a circle', html:
        '<ul><li><b>Centre</b> — the middle point.</li>'+
        '<li><b>Radius (r)</b> — centre to the edge.</li>'+
        '<li><b>Diameter (d)</b> — right across through the centre. <b>d = 2r</b>.</li>'+
        '<li><b>Circumference (C)</b> — the distance all the way round (the circle\'s perimeter).</li>'+
        '<li><b>Chord</b> — a straight line joining two points on the edge (a diameter is the longest chord).</li>'+
        '<li><b>Arc</b> — part of the circumference. <b>Sector</b> — a "pizza slice". <b>Segment</b> — the piece cut off by a chord.</li>'+
        '<li><b>Tangent</b> — a line touching the circle at exactly one point.</li></ul>'},
      {h:'Where π comes from', html:
        '<p>Measure the circumference and diameter of <i>any</i> circle and divide. You always get the same number, a little over 3. That number is <b>π (pi)</b>.</p>'+
        '<div class="formula">π = '+f('C','d')+' ≈ 3.14 ≈ '+f('22','7')+'</div>'+
        '<p>Rearranging that definition gives the circumference formula.</p>'},
      {h:'The two formulas', html:
        '<div class="formula">Circumference: C = πd = 2πr<br>Area: A = πr²</div>'+
        '<p>Use <b>d</b> for circumference and <b>r</b> for area — mixing them up is the classic mistake. If you are given the diameter, halve it before finding the area.</p>'+
        '<p><b>Estimating:</b> since π ≈ 3, a circle\'s circumference is roughly 3 diameters, and its area is roughly 3r². Use that to check your answer is sensible.</p>'+
        '<p>Take π = 3.14 unless told otherwise; use '+f('22','7')+' when the radius is a multiple of 7.</p>'},
    ],
    examples:[
      {q:'Find the circumference of a circle of radius 5 cm. Take π = 3.14.', answer:'31.4 cm',
       steps:['C = 2πr.','C = 2 × 3.14 × 5.','2 × 5 = 10, and 10 × 3.14 = 31.4 cm.']},
      {q:'Find the area of a circle of radius 7 cm. Take π = '+f('22','7')+'.', answer:'154 cm²',
       steps:['A = πr².','r² = 7 × 7 = 49.','A = '+f('22','7')+' × 49. Since 49 ÷ 7 = 7, this is 22 × 7.','A = 154 cm².']},
    ],
    practice:[
      {gen:function(){
        var r=Q.int(2,20);
        return {type:'text', q:'Find the circumference of a circle of radius '+r+' cm. Take π = 3.14. (in cm)',
          answer:Q.dec(Q.fix(2*3.14*r,2)), hint:'C = 2πr = 2 × 3.14 × '+r+'.'};
      }},
      {gen:function(){
        var r=Q.int(2,15);
        return {type:'text', q:'Find the area of a circle of radius '+r+' cm. Take π = 3.14. (in cm²)',
          answer:Q.dec(Q.fix(3.14*r*r,2)), hint:'A = πr² = 3.14 × '+r+'².'};
      }},
      {gen:function(){
        var d=2*Q.int(2,15);
        return {type:'text', q:'A circle has a diameter of '+d+' cm. Find its circumference. Take π = 3.14. (in cm)',
          answer:Q.dec(Q.fix(3.14*d,2)), hint:'C = πd — you already have the diameter, so no need to halve it.'};
      }},
      {gen:function(){
        var parts=[['the distance from the centre to the edge','radius'],
                   ['the distance right across through the centre','diameter'],
                   ['the distance all the way around the circle','circumference'],
                   ['a straight line joining two points on the edge','chord'],
                   ['a line touching the circle at exactly one point','tangent'],
                   ['a "pizza slice" bounded by two radii and an arc','sector']];
        var p=Q.pick(parts);
        var all=['radius','diameter','circumference','chord','tangent','sector','arc'];
        var o=Q.mc(p[1], Q.sample(all.filter(function(x){return x!==p[1];}),3));
        return {type:'mc', q:'What is the name for '+p[0]+'?', options:o.options, answer:o.answer,
          hint:'Picture the circle and where that measurement sits.'};
      }},
      {gen:function(){
        var r=7*Q.int(1,12), wantArea=Q.chance(0.5);
        return wantArea
          ? {type:'text', q:'Find the area of a circle of radius '+r+' cm. Take π = '+f('22','7')+'. (in cm²)',
             answer:Q.dec(Q.fix(22/7*r*r,2)),
             hint:'A = πr² = '+f('22','7')+' × '+r+'² — the 7 cancels neatly.'}
          : {type:'text', q:'Find the circumference of a circle of radius '+r+' cm. Take π = '+f('22','7')+'. (in cm)',
             answer:Q.dec(Q.fix(2*22/7*r,2)),
             hint:'C = 2πr = 2 × '+f('22','7')+' × '+r+' — the 7 cancels neatly.'};
      }},
      {gen:function(){
        var r=Q.int(2,20), c=Q.fix(2*3.14*r,2);
        return {type:'text', q:'A circle has a circumference of '+c+' cm. Find its radius. Take π = 3.14. (in cm)',
          answer:Q.dec(r), hint:'C = 2πr, so r = C ÷ (2 × 3.14) = '+c+' ÷ 6.28.'};
      }},
    ]
  });

  set('2.5.3', {
    notes:[
      {h:'Conservation of area', html:
        '<p>If you cut a shape up and rearrange the pieces without overlapping, the <b>total area does not change</b>. That is conservation of area, and it is what lets us break a hard shape into easy ones.</p>'+
        '<p>Note that the <b>perimeter usually does</b> change when you rearrange pieces — only the area is conserved.</p>'},
      {h:'Splitting a compound shape', html:
        '<p>A <b>compound shape</b> is made from simpler shapes joined together. Two strategies:</p>'+
        '<ul><li><b>Add:</b> cut it into rectangles/triangles/semicircles, find each area, add them.</li>'+
        '<li><b>Subtract:</b> draw the big rectangle around it and take away the missing piece — often quicker for an L-shape.</li></ul>'+
        '<p>Always mark on any missing lengths first: opposite sides of the whole shape must agree.</p>'+
        '<div class="formula">Area of L-shape = big rectangle − cut-out rectangle</div>'},
      {h:'Perimeter of a compound shape', html:
        '<p><b>Only go around the outside.</b> The internal lines you drew to split the shape are <i>not</i> part of the perimeter — a very common slip.</p>'+
        '<p>For shapes with a curved edge, add the arc length. A semicircle contributes '+f('πd','2')+', a quarter circle '+f('πd','4')+'.</p>'},
      {h:'Working backwards', html:
        '<p>Given the area or perimeter, you can find a missing dimension.</p>'+
        '<p><i>A rectangle has perimeter 26 cm and length 8 cm.</i> → 2(8 + w) = 26 → 8 + w = 13 → w = <b>5 cm</b>.</p>'},
    ],
    examples:[
      {q:'An L-shape is made from a 10 cm × 8 cm rectangle with a 4 cm × 3 cm rectangle cut out of one corner. Find its area.',
       answer:'68 cm²',
       steps:['Area of the big rectangle: 10 × 8 = 80 cm².','Area of the cut-out: 4 × 3 = 12 cm².',
              'Conservation of area: subtract the missing piece.','80 − 12 = 68 cm².']},
      {q:'A shape is a 12 cm × 5 cm rectangle with a semicircle of diameter 5 cm on one end. Find its area. Take π = 3.14.',
       answer:'69.8125 cm²  (about 69.8 cm²)',
       steps:['Rectangle: 12 × 5 = 60 cm².','The semicircle has diameter 5, so radius 2.5.',
              'Full circle: 3.14 × 2.5² = 3.14 × 6.25 = 19.625 cm².',
              'Half of that: 9.8125 cm².','Total: 60 + 9.8125 = 69.8125 cm².']},
    ],
    practice:[
      {gen:function(){
        var L=Q.int(8,20), W=Q.int(5,15), l=Q.int(2,L-3), w=Q.int(2,W-2);
        return {type:'text', q:'An L-shape is a '+L+' cm × '+W+' cm rectangle with a '+l+' cm × '+w+
            ' cm rectangle cut out of one corner. Find its area (in cm²).',
          answer:[String(L*W-l*w)],
          hint:'Big rectangle '+L+'×'+W+' = '+(L*W)+', minus the cut-out '+l+'×'+w+' = '+(l*w)+'.'};
      }},
      {gen:function(){
        var a=Q.int(4,12), b=Q.int(3,10), c=Q.int(4,12), d=Q.int(3,10);
        return {type:'text', q:'A compound shape is made of two rectangles joined together: one '+a+' cm × '+b+
            ' cm and one '+c+' cm × '+d+' cm. Find the total area (in cm²).',
          answer:[String(a*b+c*d)],
          hint:'Find each area and add: '+a+'×'+b+' = '+(a*b)+' and '+c+'×'+d+' = '+(c*d)+'.'};
      }},
      {gen:function(){
        var l=Q.int(6,16), w=Q.int(4,12), b=Q.pick([4,6,8,10]), h=Q.int(3,10);
        return {type:'text', q:'A shape is a '+l+' cm × '+w+' cm rectangle with a triangle of base '+b+
            ' cm and height '+h+' cm on top. Find the total area (in cm²).',
          answer:Q.dec(Q.fix(l*w+b*h/2,2)),
          hint:'Rectangle = '+(l*w)+', triangle = ½ × '+b+' × '+h+' = '+(b*h/2)+'.'};
      }},
      {gen:function(){
        var o=Q.mc('The area stays the same but the perimeter may change',
          ['Both the area and the perimeter stay the same',
           'The perimeter stays the same but the area may change',
           'Both the area and the perimeter change']);
        return {type:'mc', q:'A shape is cut up and the pieces rearranged without overlapping. What happens?',
          options:o.options, answer:o.answer,
          hint:'This is the conservation of area — the amount of surface cannot change.'};
      }},
      {gen:function(){
        var L=Q.int(10,24), W=Q.int(6,16), r=Q.int(2,Math.min(4,Math.floor(W/2)));
        var area=Q.fix(L*W-3.14*r*r,2);
        return {type:'text', q:'A '+L+' cm × '+W+' cm rectangular sheet has a circular hole of radius '+r+
            ' cm cut out. Find the remaining area. Take π = 3.14. (in cm²)',
          answer:Q.dec(area),
          hint:'Rectangle '+(L*W)+' minus circle 3.14 × '+r+'² = '+Q.fix(3.14*r*r,2)+'.'};
      }},
      {gen:function(){
        var l=Q.int(5,16), w=Q.int(3,14), p=2*(l+w);
        return {type:'text', q:'A rectangle has a perimeter of '+p+' cm and a length of '+l+' cm. Find its width (in cm).',
          answer:[String(w)], hint:'2('+l+' + w) = '+p+', so '+l+' + w = '+(p/2)+'.'};
      }},
    ]
  });

  set('2.5.4', {
    notes:[
      {h:'Classifying solids', html:
        '<p>A <b>prism</b> has the same cross-section all the way through — cut it anywhere along its length and you get the same shape. A cuboid, a cube, a triangular prism and a cylinder are all prisms.</p>'+
        '<p>A <b>pyramid</b> tapers to a point (an apex). A cone is a pyramid with a circular base.</p>'+
        '<p>Solids are described by their <b>faces</b> (flat surfaces), <b>edges</b> (where faces meet) and <b>vertices</b> (corners). A cube has 6 faces, 12 edges and 8 vertices.</p>'},
      {h:'Volume and capacity', html:
        '<p><b>Volume</b> is the space a solid takes up, measured in <b>cm³, m³</b>. <b>Capacity</b> is how much a container holds, measured in <b>ml and litres</b>. They describe the same thing in different units:</p>'+
        '<div class="formula">1 cm³ = 1 ml&nbsp;&nbsp;·&nbsp;&nbsp;1000 cm³ = 1 litre&nbsp;&nbsp;·&nbsp;&nbsp;1 m³ = 1000 litres</div>'},
      {h:'Volume of a prism', html:
        '<p>Every prism follows one rule:</p>'+
        '<div class="formula">Volume of a prism = area of cross-section × length</div>'+
        '<ul><li><b>Cuboid:</b> V = l × w × h</li>'+
        '<li><b>Cube:</b> V = s³</li>'+
        '<li><b>Triangular prism:</b> V = ('+f('1','2')+' × b × h) × length</li>'+
        '<li><b>Cylinder:</b> V = πr² × h</li></ul>'+
        '<p>All three dimensions must be in the <b>same unit</b> before you multiply.</p>'},
    ],
    examples:[
      {q:'Find the volume of a cuboid 8 cm by 5 cm by 3 cm.', answer:'120 cm³',
       steps:['V = l × w × h.','V = 8 × 5 × 3.','8 × 5 = 40, and 40 × 3 = 120 cm³.']},
      {q:'A tank measures 40 cm × 25 cm × 20 cm. How many litres does it hold?', answer:'20 litres',
       steps:['V = 40 × 25 × 20 = 20 000 cm³.','1000 cm³ = 1 litre.','20 000 ÷ 1000 = 20 litres.']},
    ],
    practice:[
      {gen:function(){
        var l=Q.int(3,15), w=Q.int(2,12), h=Q.int(2,10);
        return {type:'text', q:'Find the volume of a cuboid '+l+' cm by '+w+' cm by '+h+' cm (in cm³).',
          answer:[String(l*w*h)], hint:'V = l × w × h = '+l+' × '+w+' × '+h+'.'};
      }},
      {gen:function(){
        var s=Q.int(2,12);
        return {type:'text', q:'Find the volume of a cube of side '+s+' cm (in cm³).',
          answer:[String(s*s*s)], hint:'V = s³ = '+s+' × '+s+' × '+s+'.'};
      }},
      {gen:function(){
        var l=Q.pick([20,25,30,40,50]), w=Q.pick([10,20,25,30]), h=Q.pick([10,20,25,40]);
        var litres=l*w*h/1000;
        return {type:'text', q:'A tank measures '+l+' cm × '+w+' cm × '+h+' cm. How many LITRES does it hold?',
          answer:Q.dec(Q.fix(litres,3)),
          hint:'Volume = '+(l*w*h)+' cm³, and 1000 cm³ = 1 litre.'};
      }},
      {gen:function(){
        var solids=[['cube','prism'],['cuboid','prism'],['triangular prism','prism'],['cylinder','prism'],
                    ['square-based pyramid','pyramid'],['cone','pyramid']];
        var s=Q.pick(solids);
        var o=Q.mc(s[1]==='prism'?'A prism — the cross-section is the same all the way through'
                                 :'A pyramid — it tapers to a point',
          [s[1]==='prism'?'A pyramid — it tapers to a point'
                         :'A prism — the cross-section is the same all the way through',
           'A sphere — every point is the same distance from the centre',
           'A polygon — it is a flat shape, not a solid']);
        return {type:'mc', q:'How would you classify a '+s[0]+'?', options:o.options, answer:o.answer,
          hint:'Ask whether the cross-section stays the same or shrinks to a point.'};
      }},
      {gen:function(){
        var l=Q.int(3,12), w=Q.int(2,10), h=Q.int(2,9), v=l*w*h;
        return {type:'text', q:'A cuboid has a volume of '+v+' cm³. Its length is '+l+' cm and its width is '+
            w+' cm. Find its height (in cm).',
          answer:[String(h)],
          hint:'V = l × w × h, so h = '+v+' ÷ ('+l+' × '+w+') = '+v+' ÷ '+(l*w)+'.'};
      }},
      {gen:function(){
        var b=Q.pick([4,6,8,10,12]), h=Q.int(3,10), len=Q.int(5,20);
        return {type:'text', q:'A triangular prism has a cross-section of base '+b+' cm and height '+h+
            ' cm, and is '+len+' cm long. Find its volume (in cm³).',
          answer:Q.dec(Q.fix(b*h/2*len,2)),
          hint:'Cross-section = ½ × '+b+' × '+h+' = '+(b*h/2)+' cm², then × '+len+'.'};
      }},
    ]
  });

  set('2.5.5', {
    notes:[
      {h:'Rate, ratio and proportion', html:
        '<ul><li>A <b>rate</b> compares two <i>different</i> quantities — km per hour, $ per kg, words per minute.</li>'+
        '<li>A <b>ratio</b> compares quantities of the <i>same kind</i> — sharing $60 in the ratio 2 : 3.</li>'+
        '<li>A <b>proportion</b> says two ratios are equal — used to scale a recipe up or down.</li></ul>'+
        '<p><b>Sharing in a ratio:</b> add the parts, divide, then multiply. To share $60 in 2 : 3 — there are 5 parts, so one part is $12, giving <b>$24 and $36</b>.</p>'},
      {h:'Direct proportion and the unitary method', html:
        '<p>Two quantities are in <b>direct proportion</b> if doubling one doubles the other. Find the value of <b>one</b>, then scale up.</p>'+
        '<p><i>If 6 books cost $42, what do 10 cost?</i> → one book is 42 ÷ 6 = $7, so 10 cost <b>$70</b>.</p>'},
      {h:'Speed, distance and time', html:
        '<div class="formula">Speed = '+f('Distance','Time')+'&nbsp;&nbsp;·&nbsp;&nbsp;Distance = Speed × Time&nbsp;&nbsp;·&nbsp;&nbsp;Time = '+f('Distance','Speed')+'</div>'+
        '<p>Remember the triangle: <b>D</b> on top, <b>S</b> and <b>T</b> underneath. Cover the one you want and read off what is left.</p>'+
        '<p>The <b>units must match</b>: km with hours gives km/h; metres with seconds gives m/s. To use minutes in a km/h calculation, convert them to hours first — 30 minutes is 0.5 h, not 30.</p>'+
        '<p>A car travelling 150 km in 2 hours has speed 150 ÷ 2 = <b>75 km/h</b>.</p>'},
    ],
    examples:[
      {q:'A car travels 240 km in 3 hours. Find its average speed.', answer:'80 km/h',
       steps:['Speed = distance ÷ time.','Speed = 240 ÷ 3.','Speed = 80 km/h.']},
      {q:'Share $80 between two people in the ratio 3 : 5.', answer:'$30 and $50',
       steps:['Add the parts: 3 + 5 = 8 parts.','One part = 80 ÷ 8 = $10.',
              '3 parts = 3 × 10 = $30; 5 parts = 5 × 10 = $50.','Check: 30 + 50 = $80 ✓']},
    ],
    practice:[
      {gen:function(){
        var s=Q.pick([40,50,60,70,75,80,90,100]), t=Q.int(2,8), d=s*t;
        return {type:'text', q:'A car travels '+d+' km in '+t+' hours. Find its average speed in km/h.',
          answer:[String(s)], hint:'Speed = distance ÷ time = '+d+' ÷ '+t+'.'};
      }},
      {gen:function(){
        var s=Q.pick([40,45,50,60,65,80,90]), t=Q.pick([2,3,4,1.5,2.5,0.5]);
        return {type:'text', q:'A bus travels at '+s+' km/h for '+t+' hours. How far does it go (in km)?',
          answer:Q.dec(Q.fix(s*t,2)), hint:'Distance = speed × time = '+s+' × '+t+'.'};
      }},
      {gen:function(){
        var s=Q.pick([20,30,40,50,60,80]), t=Q.int(2,9), d=s*t;
        return {type:'text', q:'A cyclist covers '+d+' km at '+s+' km/h. How many hours does it take?',
          answer:[String(t)], hint:'Time = distance ÷ speed = '+d+' ÷ '+s+'.'};
      }},
      {gen:function(){
        var a=Q.int(1,7), b=Q.int(a+1,9), part=Q.pick([5,10,12,15,20,25]), total=(a+b)*part;
        return {type:'text', q:'Share $'+total+' in the ratio '+a+' : '+b+'. What is the SMALLER share (in $)?',
          answer:[String(a*part), '$'+(a*part)],
          hint:'There are '+a+' + '+b+' = '+(a+b)+' parts, so one part is $'+part+'.'};
      }},
      {gen:function(){
        var n1=Q.int(3,9), each=Q.pick([4,5,6,7,8,12]), n2=Q.int(n1+1,15);
        var o=Q.mc('$'+n2*each, ['$'+(n1*each+n2), '$'+(n2*each+each), '$'+Q.fix(n1*each*n2/10,0)]);
        return {type:'mc', q:'If '+n1+' books cost $'+(n1*each)+', what do '+n2+' books cost?',
          options:o.options, answer:o.answer,
          hint:'Find the cost of one first: '+(n1*each)+' ÷ '+n1+' = $'+each+'.'};
      }},
      {gen:function(){
        var n1=Q.int(2,8), each=Q.pick([3,4,5,6,8,10]), n2=Q.int(n1+1,14);
        return {type:'text', q:'If '+n1+' kg of rice costs $'+(n1*each)+', what does '+n2+' kg cost (in $)?',
          answer:Q.money(n2*each), hint:'One kg costs $'+each+', so multiply by '+n2+'.'};
      }},
    ]
  });

  set('2.5.6', {
    notes:[
      {h:'Wages and salaries', html:
        '<ul><li>A <b>wage</b> is paid by the hour: pay = rate × hours.</li>'+
        '<li>A <b>salary</b> is a fixed yearly amount, usually paid monthly (÷ 12) or fortnightly (÷ 26).</li>'+
        '<li><b>Overtime</b> is paid at a higher rate — "time and a half" means 1.5 × the basic rate, "double time" means 2 ×.</li></ul>'+
        '<p><i>Basic $20/h for 40 h, plus 6 h at time and a half:</i><br>40 × 20 = $800, plus 6 × 30 = $180 → <b>$980</b>.</p>'},
      {h:'Hire purchase', html:
        '<p><b>Hire purchase (HP)</b> spreads payment over time: a <b>deposit</b> now, then regular instalments. You always pay <i>more</i> than the cash price — the extra is the cost of the credit.</p>'+
        '<div class="formula">HP price = deposit + (number of instalments × amount of each)</div>'+
        '<p>A $2000 fridge with a $500 deposit and 12 monthly payments of $150:<br>HP price = 500 + 12 × 150 = 500 + 1800 = <b>$2300</b>, so the extra paid is $300.</p>'},
      {h:'Percentage increase and decrease', html:
        '<p>To increase by r%, multiply by (100 + r)%. To decrease, multiply by (100 − r)%.</p>'+
        '<div class="formula">Increase $400 by 15% → 400 × 1.15 = $460<br>Decrease $400 by 15% → 400 × 0.85 = $340</div>'},
      {h:'Currency conversion', html:
        '<p>Use the exchange rate as a multiplier, exactly like the unitary method.</p>'+
        '<p><i>If US$1 = TT$6.80, then US$50 = 50 × 6.80 = <b>TT$340</b>.</i></p>'+
        '<p>Going the other way, <b>divide</b>: TT$680 = 680 ÷ 6.80 = US$100.</p>'},
    ],
    examples:[
      {q:'A television costs $3000 cash, or a $600 deposit and 10 monthly payments of $270. How much extra does hire purchase cost?',
       answer:'$300 extra',
       steps:['Instalments: 10 × 270 = $2700.','HP price = 600 + 2700 = $3300.',
              'Extra = 3300 − 3000 = $300.']},
      {q:'Kemi is paid $18 per hour for a 40-hour week, with overtime at time and a half. One week she works 46 hours. Find her pay.',
       answer:'$882',
       steps:['Basic: 40 × 18 = $720.','Overtime hours: 46 − 40 = 6.',
              'Overtime rate: 1.5 × 18 = $27 per hour.','Overtime pay: 6 × 27 = $162.',
              'Total: 720 + 162 = $882.']},
    ],
    practice:[
      {gen:function(){
        var dep=Q.pick([200,300,400,500,600,800]), n=Q.pick([6,10,12,18,24]), inst=Q.pick([50,75,100,120,150,180]);
        return {type:'text', q:'A fridge is bought with a $'+dep+' deposit and '+n+' monthly payments of $'+inst+
            '. Find the total hire purchase price (in $).',
          answer:Q.money(dep+n*inst),
          hint:'HP price = deposit + '+n+' × '+inst+' = '+dep+' + '+(n*inst)+'.'};
      }},
      {gen:function(){
        var rate=Q.pick([12,15,18,20,22,25]), h=Q.int(30,40);
        return {type:'text', q:'A worker is paid $'+rate+' per hour and works '+h+' hours. Find the wage (in $).',
          answer:Q.money(rate*h), hint:'Pay = rate × hours = '+rate+' × '+h+'.'};
      }},
      {gen:function(){
        var amt=Q.pick([200,300,400,500,600,800,1000]), pc=Q.pick([5,10,12,15,20,25]);
        var up=Q.chance(0.5);
        return {type:'text', q:(up?'Increase':'Decrease')+' $'+amt+' by '+pc+'%. (in $)',
          answer:Q.money(amt*(up?100+pc:100-pc)/100),
          hint:'Multiply by '+((up?100+pc:100-pc)/100)+' — that is '+(up?100+pc:100-pc)+'% of the original.'};
      }},
      {gen:function(){
        var rate=Q.pick([6.5,6.8,7.2,4.5,5.5]), usd=Q.pick([20,50,80,100,150,200,250]);
        return {type:'text', q:'If US$1 = TT$'+rate+', how many TT$ do you get for US$'+usd+'?',
          answer:Q.money(usd*rate), hint:'Multiply '+usd+' by the rate '+rate+'.'};
      }},
      {gen:function(){
        var rate=Q.pick([16,18,20,24]), basic=40, extra=Q.int(2,10);
        var otMult=Q.chance(0.5)?1.5:2, name=otMult===1.5?'time and a half':'double time';
        var pay=basic*rate+extra*rate*otMult;
        var o=Q.mc('$'+Q.fix(pay,2), ['$'+Q.fix((basic+extra)*rate,2), '$'+Q.fix(basic*rate,2),
                                      '$'+Q.fix(basic*rate+extra*rate,2)]);
        return {type:'mc', q:'A worker earns $'+rate+'/h for a '+basic+'-hour week, with overtime at '+name+
            '. What is the pay for a '+(basic+extra)+'-hour week?',
          options:o.options, answer:o.answer,
          hint:'Basic '+basic+' × '+rate+' = '+(basic*rate)+', then '+extra+' hours at '+(rate*otMult)+'/h.'};
      }},
    ]
  });

  /* ============================ FORM 3 ============================ */

  set('3.5.1', {
    notes:[
      {h:'Arcs and sectors', html:
        '<p>A <b>sector</b> is a slice of a circle bounded by two radii and an arc. The angle at the centre, <b>θ</b>, tells you what fraction of the whole circle you have.</p>'+
        '<div class="formula">fraction of the circle = '+f('θ','360')+'</div>'+
        '<p>A quarter circle (quadrant) is θ = 90°, i.e. '+f('1','4')+'. A semicircle is θ = 180°, i.e. '+f('1','2')+'.</p>'},
      {h:'The two formulas', html:
        '<div class="formula">Arc length = '+f('θ','360')+' × 2πr&nbsp;&nbsp;·&nbsp;&nbsp;Sector area = '+f('θ','360')+' × πr²</div>'+
        '<p>Both are just "that fraction of the whole circle" — take the circumference or area formula and scale it by '+f('θ','360')+'.</p>'+
        '<p>For a sector of radius 6 cm and angle 60°, with π = 3.14:</p>'+
        '<p>Arc = '+f('60','360')+' × 2 × 3.14 × 6 = '+f('1','6')+' × 37.68 = <b>6.28 cm</b>.</p>'},
      {h:'Perimeter of a sector — do not forget the radii', html:
        '<p>The perimeter of a sector is the arc <b>plus the two straight radii</b>:</p>'+
        '<div class="formula">Perimeter of a sector = arc length + 2r</div>'+
        '<p>Leaving off the 2r is the most common error in this topic.</p>'},
      {h:'Compound shapes with parts of a circle', html:
        '<p>Break the shape into a polygon plus a sector, work out each piece, then add (or subtract for a hole).</p>'+
        '<p>For the perimeter, trace right around the outside — include the arc, exclude any internal line.</p>'},
    ],
    examples:[
      {q:'Find the arc length of a sector of radius 9 cm with angle 40°. Take π = 3.14.', answer:'6.28 cm',
       steps:['Fraction of the circle: '+f('40','360')+' = '+f('1','9')+'.',
              'Full circumference: 2 × 3.14 × 9 = 56.52 cm.',
              'Arc = '+f('1','9')+' × 56.52 = 6.28 cm.']},
      {q:'Find the area of a quadrant (quarter circle) of radius 10 cm. Take π = 3.14.', answer:'78.5 cm²',
       steps:['A quadrant is '+f('90','360')+' = '+f('1','4')+' of the circle.',
              'Full area: 3.14 × 10² = 3.14 × 100 = 314 cm².',
              'Quarter of that: 314 ÷ 4 = 78.5 cm².']},
    ],
    practice:[
      {gen:function(){
        var r=Q.int(3,18), th=Q.pick([30,36,40,45,60,72,90,120,180]);
        return {type:'text', q:'Find the arc length of a sector of radius '+r+' cm with angle '+th+
            '°. Take π = 3.14. (in cm)',
          answer:Q.dec(Q.fix(th/360*2*3.14*r,2)),
          hint:'Arc = '+f(th,360)+' × 2 × 3.14 × '+r+'.'};
      }},
      {gen:function(){
        var r=Q.int(3,15), th=Q.pick([30,45,60,90,120,180]);
        return {type:'text', q:'Find the area of a sector of radius '+r+' cm with angle '+th+
            '°. Take π = 3.14. (in cm²)',
          answer:Q.dec(Q.fix(th/360*3.14*r*r,2)),
          hint:'Sector area = '+f(th,360)+' × 3.14 × '+r+'².'};
      }},
      {gen:function(){
        var r=Q.int(4,16), th=Q.pick([60,90,120,180]);
        return {type:'text', q:'Find the PERIMETER of a sector of radius '+r+' cm with angle '+th+
            '°. Take π = 3.14. (in cm)',
          answer:Q.dec(Q.fix(th/360*2*3.14*r+2*r,2)),
          hint:'Perimeter = arc ('+Q.fix(th/360*2*3.14*r,2)+') + the two radii (2 × '+r+').'};
      }},
      {gen:function(){
        var shapes=[['a quadrant','90',f('1','4')],['a semicircle','180',f('1','2')],
                    ['a sector of angle 120°','120',f('1','3')],['a sector of angle 60°','60',f('1','6')]];
        var s=Q.pick(shapes);
        var o=Q.mc(s[2], [f('1','2'),f('1','3'),f('1','4'),f('1','6'),f('1','8')].filter(function(x){return x!==s[2];}).slice(0,3));
        return {type:'mc', q:'What fraction of a whole circle is '+s[0]+'?', options:o.options, answer:o.answer,
          hint:'Fraction = '+f(s[1],'360')+'.'};
      }},
      {gen:function(){
        var l=Q.int(8,20), w=Q.int(4,12), r=Q.int(2,Math.min(5,w));
        var area=Q.fix(l*w+0.25*3.14*r*r,2);
        return {type:'text', q:'A shape is a rectangle '+l+' cm × '+w+' cm with a quadrant of radius '+r+
            ' cm added to one corner. Find the total area. Take π = 3.14. (in cm²)',
          answer:Q.dec(area),
          hint:'Rectangle '+(l*w)+' plus a quarter circle: ¼ × 3.14 × '+r+'² = '+Q.fix(0.25*3.14*r*r,2)+'.'};
      }},
      {gen:function(){
        var r=Q.int(4,14);
        return {type:'text', q:'Find the area of a semicircle of radius '+r+' cm. Take π = 3.14. (in cm²)',
          answer:Q.dec(Q.fix(0.5*3.14*r*r,2)),
          hint:'Half of the full circle: ½ × 3.14 × '+r+'².'};
      }},
    ]
  });

  set('3.5.2', {
    notes:[
      {h:'Surface area', html:
        '<p><b>Surface area</b> is the total area of every face — think of unfolding the solid into its <b>net</b> and adding up all the flat pieces. It is an area, so the unit is <b>squared</b>.</p>'+
        '<div class="formula">Cube: SA = 6s²<br>Cuboid: SA = 2(lw + lh + wh)<br>Cylinder: SA = 2πr² + 2πrh</div>'+
        '<p>The cuboid formula counts three <i>pairs</i> of identical faces — top/bottom, front/back, left/right — which is why everything is doubled.</p>'},
      {h:'Volume of prisms and pyramids', html:
        '<div class="formula">Prism: V = area of cross-section × length<br>Cylinder: V = πr²h<br>'+
        'Pyramid: V = '+f('1','3')+' × base area × height<br>Cone: V = '+f('1','3')+'πr²h</div>'+
        '<p>Every pyramid is exactly <b>one third</b> of the prism with the same base and height — that '+f('1','3')+' is the whole difference, so never forget it.</p>'+
        '<p>The <b>height</b> in these formulas is the perpendicular height, straight up from the base — not the slant height along the sloping face.</p>'},
      {h:'Solving problems', html:
        '<p>Work in one unit throughout, and state the unit in your answer (cm² for surface area, cm³ for volume).</p>'+
        '<p>To find a missing dimension, substitute what you know and solve the resulting equation.</p>'+
        '<p><i>A cube has surface area 96 cm². Find its side.</i> → 6s² = 96 → s² = 16 → s = <b>4 cm</b>.</p>'},
    ],
    examples:[
      {q:'Find the surface area of a cuboid 6 cm × 4 cm × 3 cm.', answer:'108 cm²',
       steps:['SA = 2(lw + lh + wh).','lw = 6×4 = 24, lh = 6×3 = 18, wh = 4×3 = 12.',
              'Sum: 24 + 18 + 12 = 54.','SA = 2 × 54 = 108 cm².']},
      {q:'Find the volume of a pyramid with a 9 cm × 9 cm square base and height 10 cm.', answer:'270 cm³',
       steps:['V = '+f('1','3')+' × base area × height.','Base area = 9 × 9 = 81 cm².',
              '81 × 10 = 810.','V = 810 ÷ 3 = 270 cm³.']},
    ],
    practice:[
      {gen:function(){
        var s=Q.int(2,14);
        return {type:'text', q:'Find the surface area of a cube of side '+s+' cm (in cm²).',
          answer:[String(6*s*s)], hint:'A cube has 6 identical square faces: SA = 6 × '+s+'².'};
      }},
      {gen:function(){
        var l=Q.int(3,12), w=Q.int(2,10), h=Q.int(2,9);
        return {type:'text', q:'Find the surface area of a cuboid '+l+' cm × '+w+' cm × '+h+' cm (in cm²).',
          answer:[String(2*(l*w+l*h+w*h))],
          hint:'SA = 2(lw + lh + wh) = 2('+(l*w)+' + '+(l*h)+' + '+(w*h)+').'};
      }},
      {gen:function(){
        var b=Q.pick([4,6,8,10,12]), h=Q.int(3,10), len=Q.int(5,18);
        return {type:'text', q:'A triangular prism has a cross-section of base '+b+' cm and height '+h+
            ' cm, and length '+len+' cm. Find its volume (in cm³).',
          answer:Q.dec(Q.fix(b*h/2*len,2)),
          hint:'Cross-section = ½ × '+b+' × '+h+' = '+(b*h/2)+' cm², then × '+len+'.'};
      }},
      {gen:function(){
        var s=Q.pick([3,6,9,12]), h=Q.pick([3,6,9,12,15]);
        return {type:'text', q:'Find the volume of a pyramid with a '+s+' cm × '+s+' cm square base and height '+
            h+' cm (in cm³).',
          answer:Q.dec(Q.fix(s*s*h/3,2)),
          hint:'V = ⅓ × base area × height = ⅓ × '+(s*s)+' × '+h+'.'};
      }},
      {gen:function(){
        var o=Q.mc('V = '+f('1','3')+'πr²h', ['V = πr²h', 'V = '+f('1','3')+'πrh', 'V = 2πr²h']);
        return {type:'mc', q:'What is the formula for the volume of a cone?', options:o.options, answer:o.answer,
          hint:'A cone is a pyramid with a circular base, so it is a third of the cylinder.'};
      }},
      {gen:function(){
        var r=Q.int(2,10), h=Q.int(3,15);
        return {type:'text', q:'Find the volume of a cylinder of radius '+r+' cm and height '+h+
            ' cm. Take π = 3.14. (in cm³)',
          answer:Q.dec(Q.fix(3.14*r*r*h,2)),
          hint:'V = πr²h = 3.14 × '+r+'² × '+h+'.'};
      }},
    ]
  });

  set('3.5.3', {
    notes:[
      {h:'What a scale means', html:
        '<p>A <b>scale</b> tells you how a drawing relates to the real thing. It is a ratio, and both sides must be in the <b>same unit</b>.</p>'+
        '<div class="formula">1 : 50 000 means 1 cm on the map = 50 000 cm in real life = 500 m = 0.5 km</div>'+
        '<ul><li><b>Map → real:</b> multiply by the scale factor.</li>'+
        '<li><b>Real → map:</b> divide by the scale factor.</li></ul>'+
        '<p>On a 1 : 200 plan, a wall drawn 6 cm long is really 6 × 200 = 1200 cm = <b>12 m</b>.</p>'},
      {h:'Scale factor for length, area and volume', html:
        '<p>This is the part most often got wrong. If lengths are multiplied by k:</p>'+
        '<div class="formula">Length × k&nbsp;&nbsp;·&nbsp;&nbsp;Area × k²&nbsp;&nbsp;·&nbsp;&nbsp;Volume × k³</div>'+
        '<p>Double every length of a cube (k = 2) and its surface area becomes <b>4</b> times bigger while its volume becomes <b>8</b> times bigger.</p>'+
        '<p>That is why a scale model weighing a fraction of the real thing still looks right — volume falls away much faster than length.</p>'},
      {h:'Drawings, nets and accuracy', html:
        '<p>For an accurate scale drawing: choose a scale that fits the paper, convert every real measurement, draw with a sharp pencil and ruler, and <b>label the scale</b> on the drawing.</p>'+
        '<p>A <b>net</b> is the solid unfolded flat. Fold a net of six equal squares and you get a cube — useful for finding surface area, since the net shows every face at once.</p>'},
    ],
    examples:[
      {q:'A map has a scale of 1 : 25 000. Two towns are 8 cm apart on the map. Find the real distance in km.',
       answer:'2 km',
       steps:['Real distance = 8 × 25 000 = 200 000 cm.',
              '200 000 cm ÷ 100 = 2000 m.','2000 m ÷ 1000 = 2 km.']},
      {q:'A model is built to a scale factor of 3. If the real box has a volume of 5 cm³, what is the model\'s volume?',
       answer:'135 cm³',
       steps:['Volume scales by k³, not k.','k = 3, so k³ = 27.','5 × 27 = 135 cm³.']},
    ],
    practice:[
      {gen:function(){
        var sc=Q.pick([1000,2000,5000,10000,25000,50000]), cm=Q.int(2,15);
        var km=Q.fix(cm*sc/100000,4);
        return {type:'text', q:'A map has a scale of 1 : '+sc+'. Two places are '+cm+
            ' cm apart on the map. Find the real distance in KM.',
          answer:Q.dec(km),
          hint:'Real = '+cm+' × '+sc+' = '+(cm*sc)+' cm. Divide by 100 for m, then by 1000 for km.'};
      }},
      {gen:function(){
        var sc=Q.pick([50,100,200,500]), m=Q.int(2,20), cm=Q.fix(m*100/sc,3);
        return {type:'text', q:'A plan has a scale of 1 : '+sc+'. A wall is really '+m+
            ' m long. How long is it on the plan, in CM?',
          answer:Q.dec(cm),
          hint:m+' m = '+(m*100)+' cm. Divide by the scale factor '+sc+'.'};
      }},
      {gen:function(){
        var k=Q.int(2,6);
        var o=Q.mc(String(k*k), [String(k), String(k*k*k), String(2*k)]);
        return {type:'mc', q:'Every length of a shape is multiplied by '+k+'. By what factor is its AREA multiplied?',
          options:o.options, answer:o.answer, hint:'Area scales by k², not k.'};
      }},
      {gen:function(){
        var k=Q.int(2,5), v=Q.int(2,20);
        return {type:'text', q:'A model is built with a scale factor of '+k+'. The original has a volume of '+v+
            ' cm³. Find the model\'s volume (in cm³).',
          answer:[String(v*k*k*k)],
          hint:'Volume scales by k³ = '+k+'³ = '+(k*k*k)+'.'};
      }},
      {gen:function(){
        var sc=Q.pick([100,200,500,1000]), cm=Q.int(3,20), m=Q.fix(cm*sc/100,3);
        return {type:'text', q:'On a 1 : '+sc+' plan, a room measures '+cm+' cm. What is its real length in METRES?',
          answer:Q.dec(m),
          hint:'Real = '+cm+' × '+sc+' = '+(cm*sc)+' cm, and 100 cm = 1 m.'};
      }},
      {gen:function(){
        var k=Q.int(2,5), a=Q.int(3,25);
        return {type:'text', q:'Every length of a shape is multiplied by '+k+'. If the original area was '+a+
            ' cm², what is the new area (in cm²)?',
          answer:[String(a*k*k)], hint:'Area scales by k² = '+(k*k)+'.'};
      }},
    ]
  });

  set('3.5.4', {
    notes:[
      {h:'Earnings', html:
        '<ul><li><b>Wage</b> = hourly rate × hours worked.</li>'+
        '<li><b>Salary</b> is annual; monthly pay = salary ÷ 12, fortnightly = salary ÷ 26.</li>'+
        '<li><b>Overtime</b>: "time and a half" = 1.5 × basic rate, "double time" = 2 × basic rate.</li>'+
        '<li><b>Gross pay</b> is before deductions; <b>net pay</b> ("take-home") is after tax and other deductions.</li></ul>'},
      {h:'Utility bills', html:
        '<p>Most bills combine a <b>fixed charge</b> with a <b>charge per unit used</b>.</p>'+
        '<div class="formula">Bill = fixed charge + (units used × rate per unit)</div>'+
        '<p>Units used come from the difference between two meter readings: <b>present reading − previous reading</b>.</p>'+
        '<p>A meter goes from 4310 to 4585 kWh at $0.40 per unit with a $25 fixed charge:<br>units = 275, so the bill is 25 + 275 × 0.40 = 25 + 110 = <b>$135</b>.</p>'},
      {h:'Simple vs compound interest', html:
        '<p><b>Simple interest</b> is paid on the original principal only, every year.</p>'+
        '<p><b>Compound interest</b> is paid on the principal <i>plus the interest already earned</i> — so the amount grows faster each year. The interest earns interest.</p>'+
        '<div class="formula">A = P(1 + '+f('r','100')+')<sup>n</sup>&nbsp;&nbsp;·&nbsp;&nbsp;Compound interest = A − P</div>'+
        '<p>P = principal, r = rate % per year, n = number of years, A = final amount.</p>'},
      {h:'Working it year by year', html:
        '<p>For two or three years you can just step through it, which shows clearly why it beats simple interest.</p>'+
        '<p><i>$1000 at 10% for 2 years:</i></p>'+
        '<ul><li>Year 1: interest = 10% of 1000 = $100 → amount $1100.</li>'+
        '<li>Year 2: interest = 10% of <b>1100</b> = $110 → amount $1210.</li></ul>'+
        '<p>Compound interest = 1210 − 1000 = <b>$210</b>. Simple interest would have given only $200.</p>'},
    ],
    examples:[
      {q:'Find the compound interest on $2000 at 5% per year for 2 years.', answer:'$205',
       steps:['Year 1: 5% of 2000 = $100, so the amount becomes $2100.',
              'Year 2: 5% of 2100 = $105, so the amount becomes $2205.',
              'Compound interest = 2205 − 2000 = $205.',
              '(By formula: A = 2000 × 1.05² = $2205.)']},
      {q:'An electricity meter reads 5240 kWh, up from 5100 kWh. With a fixed charge of $30 and a rate of $0.50 per unit, find the bill.',
       answer:'$100',
       steps:['Units used = 5240 − 5100 = 140 kWh.','Cost of units = 140 × 0.50 = $70.',
              'Add the fixed charge: 70 + 30 = $100.']},
    ],
    practice:[
      {gen:function(){
        var P=Q.pick([1000,2000,4000,5000,8000,10000]), r=Q.pick([5,10,20,25]), n=2;
        var A=Q.fix(P*Math.pow(1+r/100,n),2);
        return {type:'text', q:'Find the AMOUNT after '+n+' years when $'+P+' is invested at '+r+
            '% per year compound interest. (in $)',
          answer:Q.money(A),
          hint:'Year 1 gives $'+Q.fix(P*(1+r/100),2)+'; now add '+r+'% of that.'};
      }},
      {gen:function(){
        var P=Q.pick([1000,2000,3000,5000,8000]), r=Q.pick([5,10,20]), n=2;
        var A=Q.fix(P*Math.pow(1+r/100,n),2);
        return {type:'text', q:'Find the COMPOUND INTEREST on $'+P+' at '+r+'% per year for '+n+' years. (in $)',
          answer:Q.money(Q.fix(A-P,2)),
          hint:'Work out the final amount ($'+A+'), then subtract the original $'+P+'.'};
      }},
      {gen:function(){
        var prev=Q.int(1000,8000), used=Q.pick([80,100,120,140,150,200,250,300]);
        var rate=Q.pick([0.25,0.4,0.5,0.6,0.75]), fixed=Q.pick([15,20,25,30,40]);
        return {type:'text', q:'A meter reads '+(prev+used)+' kWh, up from '+prev+' kWh. With a fixed charge of $'+
            fixed+' and a rate of $'+rate+' per unit, find the bill (in $).',
          answer:Q.money(fixed+used*rate),
          hint:'Units used = '+(prev+used)+' − '+prev+' = '+used+'. Bill = '+fixed+' + '+used+' × '+rate+'.'};
      }},
      {gen:function(){
        var o=Q.mc('Compound interest, because the interest itself earns interest',
          ['Simple interest, because it is paid every year',
           'They always give exactly the same amount',
           'Simple interest, because the principal grows']);
        return {type:'mc', q:'Over several years at the same rate, which gives the larger return?',
          options:o.options, answer:o.answer,
          hint:'Compound interest is worked out on the principal PLUS the interest already earned.'};
      }},
      {gen:function(){
        var rate=Q.pick([15,18,20,22,25,30]), basic=40, extra=Q.int(2,12);
        var mult=Q.chance(0.5)?1.5:2, name=mult===1.5?'time and a half':'double time';
        return {type:'text', q:'A worker earns $'+rate+' per hour for a '+basic+
            '-hour week, with overtime paid at '+name+'. Find the pay for a '+(basic+extra)+'-hour week (in $).',
          answer:Q.money(basic*rate+extra*rate*mult),
          hint:'Basic: '+basic+' × '+rate+' = '+(basic*rate)+'. Overtime: '+extra+' hours at $'+(rate*mult)+'/h.'};
      }},
      {gen:function(){
        var sal=Q.pick([36000,42000,48000,54000,60000,72000,90000]);
        var per=Q.pick([['month',12],['fortnight',26]]);
        return {type:'text', q:'A salary of $'+sal+' per year is paid each '+per[0]+'. How much is each payment (in $)?',
          answer:Q.money(sal/per[1]), hint:'Divide $'+sal+' by '+per[1]+'.'};
      }},
    ]
  });

})();
