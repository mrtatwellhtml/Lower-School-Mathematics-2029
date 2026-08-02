/* Full content for the Number Operations & Number Theory strand (Forms 1-3).
   Attaches .content to topics in window.CURRICULUM. Each of the six strands has its
   own content file; all 70 topics are built. */
(function(){
  var C=window.CURRICULUM; if(!C) return;
  var Q=window.QG;   // question generators — see qgen.js
  function f(a,b){ return '<span class="frac"><span>'+a+'</span><span>'+b+'</span></span>'; } // fraction
  function set(code,content){ if(C[code]) C[code].content=content; }

  /* ============================ FORM 1 ============================ */

  set('1.1.1', {
    notes:[
      {h:'Our number system', html:
        '<p>We count using the <b>denary (base-10) system</b> — ten digits, 0 to 9. It grew from ancient tally marks and finger-counting into the place-value system we use today.</p>'+
        '<h3>Place value</h3>'+
        '<p>The <b>value of a digit depends on its position</b>. In <b>4 <u>7</u> 3 6</b> the 7 is in the <i>hundreds</i> place, so it means 700.</p>'+
        '<div class="formula">Millions · Hundred-thousands · Ten-thousands · Thousands · Hundreds · Tens · Units</div>'},
      {h:'Rounding & estimation', html:
        '<p>To <b>round</b>, look at the digit to the <i>right</i> of the place you are rounding to. If it is 5 or more, round up; if 4 or less, round down.</p>'+
        '<ul><li>3 <b>4</b>82 to the nearest hundred → next digit is 8 → <b>3500</b></li>'+
        '<li>Estimating lets you check answers quickly by rounding first.</li></ul>'},
      {h:'Types of numbers', html:
        '<ul>'+
        '<li><b>Factors</b> of a number divide into it exactly (factors of 12: 1,2,3,4,6,12).</li>'+
        '<li><b>Multiples</b> are the times-table (multiples of 4: 4,8,12,16…).</li>'+
        '<li><b>Prime</b>: exactly two factors (2,3,5,7,11…). <b>Composite</b>: more than two.</li>'+
        '<li><b>Square numbers</b>: 1,4,9,16… <b>Triangular</b>: 1,3,6,10…</li></ul>'+
        '<h3>HCF and LCM</h3>'+
        '<p><b>HCF</b> (Highest Common Factor) is the largest number that divides two numbers. <b>LCM</b> (Lowest Common Multiple) is the smallest number both divide into. Use prime factorisation.</p>'},
    ],
    examples:[
      {q:'Find the HCF and LCM of 24 and 36.', answer:'HCF = 12, LCM = 72',
       steps:['Prime factorise: 24 = 2³ × 3, and 36 = 2² × 3².',
              'HCF = product of the <i>lowest</i> powers of common primes = 2² × 3 = 12.',
              'LCM = product of the <i>highest</i> powers = 2³ × 3² = 8 × 9 = 72.']},
      {q:'Round 47 519 to the nearest thousand.', answer:'48 000',
       steps:['The thousands digit is 7. Look one place right: it is 5.',
              '5 means round up: 7 → 8.','Everything after becomes 0 → 48 000.']},
    ],
    practice:[
      {gen:function(){
        var d=[Q.int(1,9),Q.int(0,9),Q.int(0,9),Q.int(0,9)], p=Q.int(0,3);
        d[p]=Q.int(1,9);                                   // never underline a zero
        var pv=d[p]*Math.pow(10,3-p);
        var shown=d.map(function(x,i){ return i===p?'<u>'+x+'</u>':String(x); }).join('');
        return {type:'text', q:'What is the place value of the underlined digit in '+shown+'?',
          answer:[String(pv)], hint:'Columns from the right: units, tens, hundreds, thousands.'};
      }},
      {gen:function(){
        var place=Q.pick([[10,'ten'],[100,'hundred'],[1000,'thousand']]);
        var n=Q.int(place[0]*2, 9999);
        if(n%place[0]===place[0]/2) n+=1;                  // avoid an exact-half tie
        return {type:'text', q:'Round '+n+' to the nearest '+place[1]+'.',
          answer:[String(Math.round(n/place[0])*place[0])],
          hint:'Look at the digit one place to the right. 5 or more rounds up.'};
      }},
      {gen:function(){
        var primes=[11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];
        var comps=[21,25,27,33,35,39,49,51,55,57,63,65,69,77,81,85,87,91,93,95];
        var o=Q.mc(Q.pick(primes), Q.sample(comps,3));
        return {type:'mc', q:'Which of these is a prime number?', options:o.options, answer:o.answer,
          hint:'A prime has exactly two factors: 1 and itself.'};
      }},
      {gen:function(){
        var g=Q.int(2,12), p=Q.coprime(), a=g*p[0], b=g*p[1];
        return {type:'text', q:'Find the HCF of '+a+' and '+b+'.', answer:[String(g)],
          hint:'Write each as a product of primes, then take the common primes to the lowest power.'};
      }},
      {gen:function(){
        var a=Q.int(3,15), b=Q.int(3,15);
        if(a===b) b=a+Q.int(1,4);
        return {type:'text', q:'Find the LCM of '+a+' and '+b+'.', answer:[String(Q.lcm(a,b))],
          hint:'List the multiples of each until they meet: '+[1,2,3,4].map(function(k){return a*k;}).join(',')+
               '… and '+[1,2,3,4].map(function(k){return b*k;}).join(',')+'…'};
      }},
    ]
  });

  set('1.1.2', {
    notes:[
      {h:'What a fraction means', html:
        '<p>A fraction '+f('a','b')+' shows <b>a parts out of b equal parts</b>. The word "equal" matters — cutting a cake into four uneven pieces does not give quarters.</p>'+
        '<ul><li>The top number is the <b>numerator</b> — how many parts you have.</li>'+
        '<li>The bottom is the <b>denominator</b> — how many parts the whole was split into.</li></ul>'+
        '<p>The bigger the denominator, the <i>smaller</i> each piece: '+f('1','8')+' is less than '+f('1','3')+'.</p>'+
        '<ul><li><b>Proper</b>: top &lt; bottom ('+f('3','4')+') — less than one whole.</li>'+
        '<li><b>Improper</b>: top ≥ bottom ('+f('7','4')+') — one whole or more.</li>'+
        '<li><b>Mixed</b>: a whole number and a fraction together (1'+f('3','4')+').</li></ul>'+
        '<p>Improper and mixed are two ways of writing the <i>same</i> amount: '+f('7','4')+' = 1'+f('3','4')+'.</p>'},
      {h:'Equivalent fractions', html:
        '<p>Multiply or divide top and bottom by the <b>same</b> number to get an equal fraction.</p>'+
        '<div class="formula">'+f('1','2')+' = '+f('2','4')+' = '+f('3','6')+' = '+f('50','100')+'</div>'+
        '<p><b>Simplify</b> by dividing both parts by their HCF. '+f('12','18')+' ÷ 6 = '+f('2','3')+'.</p>'},
      {h:'Comparing & ordering', html:
        '<p>You can only compare fractions directly when the pieces are the same size — so rewrite them with a <b>common denominator</b>, then compare the numerators.</p>'+
        '<p>Compare '+f('2','3')+' and '+f('3','5')+': the LCM of 3 and 5 is 15, giving '+f('10','15')+' vs '+f('9','15')+'. So '+f('2','3')+' is larger.</p>'+
        '<p>Converting each to a decimal works too: 2 ÷ 3 = 0.667 and 3 ÷ 5 = 0.6.</p>'},
      {h:'Converting between mixed and improper', html:
        '<p><b>Mixed → improper:</b> multiply the whole number by the denominator, add the numerator, keep the denominator.</p>'+
        '<div class="formula">2'+f('3','5')+' → (2 × 5) + 3 = 13 → '+f('13','5')+'</div>'+
        '<p><b>Improper → mixed:</b> divide the top by the bottom. The quotient is the whole number and the remainder becomes the new numerator.</p>'+
        '<div class="formula">'+f('17','5')+' → 17 ÷ 5 = 3 remainder 2 → 3'+f('2','5')+'</div>'+
        '<p>Answers are usually left as mixed numbers, but improper fractions are easier to calculate with — convert to improper first when multiplying or dividing.</p>'},
    ],
    examples:[
      {q:'Simplify '+f('24','36')+' to its lowest terms.', answer:f('2','3'),
       steps:['Find the HCF of 24 and 36, which is 12.','Divide top and bottom by 12: 24÷12 = 2, 36÷12 = 3.','Result: '+f('2','3')+'.']},
      {q:'Convert 2'+f('3','5')+' to an improper fraction.', answer:f('13','5'),
       steps:['Multiply the whole number by the denominator: 2 × 5 = 10.','Add the numerator: 10 + 3 = 13.','Keep the denominator: '+f('13','5')+'.']},
    ],
    practice:[
      {gen:function(){
        var p=Q.coprime(), k=Q.int(2,9), a=k*p[0], b=k*p[1];
        return {type:'text', q:'Simplify '+f(a,b)+'. (write as a/b, e.g. 3/4)',
          answer:[p[0]+'/'+p[1]], hint:'The HCF of '+a+' and '+b+' is '+k+'.'};
      }},
      {gen:function(){
        var p=Q.coprime(), k=Q.int(2,5);
        var right=f(k*p[0], k*p[1]);
        var o=Q.mc(right, [f(p[0]+1, k*p[1]), f(k*p[0], p[1]+k), f(p[0]+k, p[1]+k)]);
        return {type:'mc', q:'Which fraction is equivalent to '+f(p[0],p[1])+'?',
          options:o.options, answer:o.answer,
          hint:'Multiply the top and the bottom of '+p[0]+'/'+p[1]+' by '+k+'.'};
      }},
      {gen:function(){
        var w=Q.int(2,6), b=Q.int(3,9), a=Q.int(1,b-1);
        return {type:'text', q:'Convert '+w+f(a,b)+' to an improper fraction (a/b).',
          answer:[(w*b+a)+'/'+b], hint:w+'×'+b+' + '+a+', over '+b+'.'};
      }},
      {gen:function(){
        var fr=[], seen={};
        while(fr.length<3){
          var p=Q.coprime(), v=p[0]/p[1];
          if(p[0]>=p[1]||seen[v]) continue;              // proper fractions, all different
          seen[v]=1; fr.push(p);
        }
        var best=fr.reduce(function(x,y){ return x[0]/x[1]>=y[0]/y[1]?x:y; });
        var o=Q.mc(f(best[0],best[1]), fr.filter(function(p){return p!==best;}).map(function(p){return f(p[0],p[1]);}));
        return {type:'mc', q:'Which is the largest?', options:o.options, answer:o.answer,
          hint:'Use a common denominator, or convert each to a decimal.'};
      }},
      {gen:function(){
        var b=Q.int(3,9), w=Q.int(1,5), a=Q.int(1,b-1), top=w*b+a;
        return {type:'text', q:'Write '+f(top,b)+' as a mixed number (use the format 1 3/4).',
          answer:[w+' '+a+'/'+b],
          hint:'How many whole '+b+'s fit into '+top+'? The remainder becomes the new top.'};
      }},
    ]
  });

  set('1.1.3', {
    notes:[
      {h:'Positive and negative numbers', html:
        '<p><b>Directed numbers</b> have a sign showing direction from zero: +3 is 3 to the right, −3 is 3 to the left on the number line.</p>'+
        '<div class="formula">−5 −4 −3 −2 −1 &nbsp;0&nbsp; +1 +2 +3 +4 +5</div>'+
        '<p>They model real situations: temperature below zero, debts, floors below ground.</p>'},
      {h:'Adding & subtracting', html:
        '<ul><li>Adding a positive → move <b>right</b>. Adding a negative → move <b>left</b>.</li>'+
        '<li>Subtracting is the opposite move.</li>'+
        '<li><b>Two like signs make a plus, two unlike signs make a minus:</b> 5 − (−3) = 5 + 3 = 8.</li></ul>'},
      {h:'Multiplying & dividing', html:
        '<div class="formula">(+)(+) = +&nbsp;&nbsp; (−)(−) = +&nbsp;&nbsp; (+)(−) = −&nbsp;&nbsp; (−)(+) = −</div>'+
        '<p>Same signs → positive answer. Different signs → negative answer. The same rule works for division.</p>'},
    ],
    examples:[
      {q:'Work out −7 + 4.', answer:'−3',
       steps:['Start at −7 on the number line.','Adding +4 means move 4 to the right.','−7 → −6 → −5 → −4 → −3.']},
      {q:'Work out (−6) × (−4).', answer:'24',
       steps:['Two negative signs multiplied give a positive.','6 × 4 = 24, so the answer is +24.']},
    ],
    practice:[
      {gen:function(){
        var a=-Q.int(2,15), b=Q.int(2,15);
        return {type:'text', q:'Calculate '+Q.num(a)+' + '+b+'.', answer:[String(a+b)],
          hint:'Move '+b+' to the right from '+Q.num(a)+'.'};
      }},
      {gen:function(){
        var a=Q.int(2,15), b=Q.int(2,12);
        return {type:'text', q:'Calculate '+a+' − ('+Q.num(-b)+').', answer:[String(a+b)],
          hint:'Subtracting a negative is the same as adding.'};
      }},
      {gen:function(){
        var a=-Q.int(2,12), b=Q.int(2,9);
        return {type:'text', q:'Calculate ('+Q.num(a)+') × '+b+'.', answer:[String(a*b)],
          hint:'Different signs give a negative product.'};
      }},
      {gen:function(){
        var start=-Q.int(1,10), drop=Q.int(2,12), ans=start-drop;
        var o=Q.mc(Q.num(ans)+'°C', [Q.num(start+drop)+'°C', String(Math.abs(ans))+'°C', Q.num(-drop)+'°C']);
        return {type:'mc', q:'The temperature is '+Q.num(start)+'°C and falls by '+drop+'°C. What is the new temperature?',
          options:o.options, answer:o.answer, hint:'Falling means subtract: '+Q.num(start)+' − '+drop+'.'};
      }},
      {gen:function(){
        var b=Q.int(2,9), q=Q.int(2,9);
        return {type:'text', q:'Calculate ('+Q.num(-b*q)+') ÷ ('+Q.num(-b)+').', answer:[String(q)],
          hint:'Same signs give a positive result.'};
      }},
    ]
  });

  set('1.1.4', {
    notes:[
      {h:'Decimals continue place value', html:
        '<p>A decimal point does not start a new system — it simply continues the place-value columns <b>past the units</b>, each one ten times smaller than the last.</p>'+
        '<div class="formula">Hundreds · Tens · <b>Units</b> · <b>.</b> · tenths · hundredths · thousandths</div>'+
        '<p>So in <b>3.4<u>7</u>2</b> the 7 is in the <i>hundredths</i> column and means '+f('7','100')+'.</p>'+
        '<p>Every decimal place is a fraction with a power of ten underneath:</p>'+
        '<div class="formula">0.<b>4</b> = '+f('4','10')+' &nbsp;·&nbsp; 0.0<b>7</b> = '+f('7','100')+' &nbsp;·&nbsp; 0.00<b>3</b> = '+f('3','1000')+'</div>'+
        '<p>Adding a zero on the <b>end</b> of a decimal changes nothing: 0.4 = 0.40 = 0.400. That is why 0.4 and 0.40 are the same number, and it is the trick that makes comparing easy.</p>'},
      {h:'Comparing and ordering', html:
        '<p>Never compare by length — 0.7 is bigger than 0.68, even though 68 looks like the larger number.</p>'+
        '<p>Give every decimal the <b>same number of decimal places</b> by padding with zeros, then compare column by column from the left:</p>'+
        '<div class="formula">0.7 → 0.<b>7</b>00&nbsp;&nbsp;0.68 → 0.<b>6</b>80&nbsp;&nbsp;0.702 → 0.<b>7</b>02<br>'+
        'tenths first: 7, 6, 7 → 0.68 is smallest; then 0.700 vs 0.702 → 0.702 is largest</div>'},
      {h:'The four operations', html:
        '<ul><li><b>Add / subtract:</b> line the decimal <b>points</b> up underneath each other — not the last digits — then work as usual. Pad with zeros so both have the same length.</li>'+
        '<li><b>Multiply:</b> ignore the points and multiply as whole numbers. Then count the decimal places in the <i>question</i> and put that many into the answer. 3.7 × 0.4 → 37 × 4 = 148, and 1 + 1 = 2 places → 1.48.</li>'+
        '<li><b>Divide by a whole number:</b> divide as usual, keeping the point in line.</li>'+
        '<li><b>Divide by a decimal:</b> multiply <b>both</b> numbers by 10, 100… until the divisor is a whole number. 6 ÷ 0.2 becomes 60 ÷ 2 = 30.</li></ul>'+
        '<p>Notice that dividing by a number below 1 makes the answer <i>bigger</i> — worth an estimate to check.</p>'},
      {h:'Converting', html:
        '<p><b>Fraction → decimal:</b> divide the top by the bottom. '+f('3','8')+' = 3 ÷ 8 = 0.375.</p>'+
        '<p><b>Decimal → fraction:</b> write it over 10, 100 or 1000 (one zero per decimal place), then simplify.</p>'+
        '<div class="formula">0.6 = '+f('6','10')+' = '+f('3','5')+'&nbsp;&nbsp;·&nbsp;&nbsp;0.25 = '+f('25','100')+' = '+f('1','4')+'</div>'+
        '<p>A fraction gives a <b>terminating</b> decimal when its denominator is built only from 2s and 5s ('+f('1','8')+' = 0.125). Otherwise it <b>recurs</b>: '+f('1','3')+' = 0.333…</p>'},
    ],
    examples:[
      {q:'Work out 3.7 × 0.4.', answer:'1.48',
       steps:['Ignore the points: 37 × 4 = 148.','Count decimal places in the question: 1 + 1 = 2.','Place the point 2 from the right: 1.48.']},
      {q:'Convert 0.375 to a fraction in lowest terms.', answer:f('3','8'),
       steps:['0.375 = '+f('375','1000')+'.','Divide top and bottom by their HCF, 125.','375÷125 = 3, 1000÷125 = 8 → '+f('3','8')+'.']},
    ],
    practice:[
      {gen:function(){
        // work in hundredths so the arithmetic is exact
        var a=Q.int(110,890), b=Q.int(5,99);
        var A=(a/100).toFixed(a%10?2:1), B=(b/100).toFixed(2);
        return {type:'text', q:'Calculate '+A+' + '+B+'.',
          answer:Q.dec((a+b)/100), hint:'Line up the decimal points before you add.'};
      }},
      {gen:function(){
        var a=Q.int(2,9), b=Q.int(2,9), p=a*b;
        return {type:'text', q:'Calculate 0.'+a+' × 0.'+b+'.',
          answer:Q.dec(p/100), hint:a+'×'+b+' = '+p+', then two decimal places.'};
      }},
      {gen:function(){
        var b=Q.pick([2,4,5,8,10,20,25,50]), a=Q.int(1,b-1), s=Q.simp(a,b);
        return {type:'text', q:'Write '+(a/b)+' as a fraction in lowest terms (a/b).',
          answer:[s[0]+'/'+s[1]],
          hint:'Write it over '+(b<=10?'10':b<=100?'100':'1000')+', then divide top and bottom by their HCF.'};
      }},
      {gen:function(){
        var vals=[], seen={};
        while(vals.length<4){
          var v=(Q.int(1,999)/1000);
          var s=v.toFixed(Q.int(1,3)).replace(/0+$/,'').replace(/\.$/,'.0');
          if(seen[parseFloat(s)]||parseFloat(s)===0) continue;
          seen[parseFloat(s)]=1; vals.push(s);
        }
        var best=vals.reduce(function(x,y){ return parseFloat(x)>=parseFloat(y)?x:y; });
        var o=Q.mc(best, vals.filter(function(v){return v!==best;}));
        return {type:'mc', q:'Which is largest?', options:o.options, answer:o.answer,
          hint:'Give them all the same number of decimal places, then compare digit by digit.'};
      }},
      {gen:function(){
        var b=Q.pick([2,4,5,8,10,20,25]), a=Q.int(1,b-1), d=a/b;
        return {type:'text', q:'Convert '+f(a,b)+' to a decimal.',
          answer:Q.dec(d), hint:'Divide '+a+' by '+b+'.'};
      }},
    ]
  });

  set('1.1.5', {
    notes:[
      {h:'Percent means “per hundred”', html:
        '<p>The word says it: <b>per cent</b> = out of 100. A percentage is just a fraction whose denominator is 100.</p>'+
        '<div class="formula">45% = '+f('45','100')+' = 0.45</div>'+
        '<p>That makes percentages the easiest way to <b>compare</b> proportions — scoring 17 out of 20 and 21 out of 25 is hard to judge, but 85% and 84% is instant.</p>'},
      {h:'Converting between all three forms', html:
        '<div class="formula">Fraction ⇄ Decimal ⇄ Percentage</div>'+
        '<ul><li><b>Decimal → %:</b> multiply by 100 (move the point two places right). 0.3 → 30%.</li>'+
        '<li><b>% → decimal:</b> divide by 100 (two places left). 72% → 0.72.</li>'+
        '<li><b>Fraction → %:</b> make the denominator 100, or divide top by bottom then ×100. '+f('3','5')+' = '+f('60','100')+' = 60%.</li>'+
        '<li><b>% → fraction:</b> write over 100 and simplify. 40% = '+f('40','100')+' = '+f('2','5')+'.</li></ul>'+
        '<p>Worth memorising, because they appear constantly:</p>'+
        '<div class="formula">'+f('1','2')+' = 50%&nbsp;·&nbsp;'+f('1','4')+' = 25%&nbsp;·&nbsp;'+f('3','4')+' = 75%&nbsp;·&nbsp;'+
        f('1','5')+' = 20%&nbsp;·&nbsp;'+f('1','10')+' = 10%&nbsp;·&nbsp;'+f('1','3')+' ≈ 33.3%</div>'},
      {h:'Percentage of a quantity', html:
        '<p>Convert the percentage to a decimal (or a fraction) and <b>multiply</b>.</p>'+
        '<div class="formula">15% of 240 = 0.15 × 240 = 36</div>'+
        '<p>For mental work, build the answer from easy pieces:</p>'+
        '<ul><li>10% — divide by 10.</li>'+
        '<li>5% — half of 10%.</li>'+
        '<li>1% — divide by 100.</li></ul>'+
        '<p>So 35% of 80 = 10% (8) × 3 + 5% (4) = 24 + 4 = <b>28</b>.</p>'},
      {h:'The other direction', html:
        '<p>To express one amount <b>as a percentage of</b> another, make a fraction and multiply by 100.</p>'+
        '<div class="formula">score as a % = '+f('score','total')+' × 100</div>'+
        '<p>18 out of 24 = '+f('18','24')+' × 100 = 0.75 × 100 = <b>75%</b>.</p>'+
        '<p>Check the size of your answer: a part of something can never exceed 100% of it, so an answer of 750% means the fraction went in upside down.</p>'},
    ],
    examples:[
      {q:'Find 30% of 150.', answer:'45',
       steps:['30% = 0.30.','0.30 × 150 = 45.']},
      {q:'Write '+f('7','20')+' as a percentage.', answer:'35%',
       steps:['Make the denominator 100: '+f('7','20')+' × '+f('5','5')+' = '+f('35','100')+'.',f('35','100')+' = 35%.']},
    ],
    practice:[
      {gen:function(){
        var p=Q.int(1,99), d=p/100;
        return {type:'text', q:'Write '+d+' as a percentage (e.g. 55%).',
          answer:[p+'%', String(p)], hint:'Multiply by 100.'};
      }},
      {gen:function(){
        var p=Q.pick([5,10,20,25,40,50,60,75,80]), n=Q.pick([20,40,60,80,120,140,160,200,240,300]);
        return {type:'text', q:'Find '+p+'% of '+n+'.', answer:[String(p*n/100)],
          hint:p+'% = '+(p/100)+', so multiply '+n+' by '+(p/100)+'.'};
      }},
      {gen:function(){
        var b=Q.pick([4,5,10,20,25,50]), a=Q.int(1,b-1), pc=a*100/b;
        return {type:'text', q:'Write '+f(a,b)+' as a percentage.',
          answer:[pc+'%', String(pc)], hint:a+'/'+b+' = '+pc+'/100.'};
      }},
      {gen:function(){
        var p=Q.pick([10,20,25,40,50,60,75]), n=Q.pick([20,24,28,30,32,36,40]);
        var ans=p*n/100;
        if(ans!==Math.round(ans)){ n=40; ans=p*n/100; }
        var o=Q.mc(String(ans), [String(ans+2), String(Math.round(n/2)), String(p/10)]);
        return {type:'mc', q:p+'% of a class of '+n+' wear glasses. How many is that?',
          options:o.options, answer:o.answer, hint:(p/100)+' × '+n+'.'};
      }},
      {gen:function(){
        var p=Q.int(1,99), d=p/100;
        return {type:'text', q:'Convert '+p+'% to a decimal.',
          answer:Q.dec(d), hint:'Divide by 100.'};
      }},
    ]
  });

  set('1.1.6', {
    notes:[
      {h:'Buying and selling', html:
        '<p><b>Cost Price (CP)</b> is what the seller paid for the item. <b>Selling Price (SP)</b> is what the buyer pays for it.</p>'+
        '<div class="formula">Profit = SP − CP&nbsp;&nbsp;·&nbsp;&nbsp;Loss = CP − SP</div>'+
        '<p>If SP is greater than CP the seller makes a <b>profit</b>; if it is less, a <b>loss</b>. Only one of the two formulas applies at a time — work out which by comparing the prices first.</p>'+
        '<p>A shop buys a shirt for $60 and sells it for $85. Profit = 85 − 60 = <b>$25</b>.</p>'},
      {h:'Profit and loss as a percentage', html:
        '<p>A $25 profit means very different things on a $60 shirt and on a $6000 car, so we express it as a percentage.</p>'+
        '<p><b>Percentage profit and loss are always worked out on the COST price</b> — never on the selling price. This is the single most common error in the topic.</p>'+
        '<div class="formula">% Profit = '+f('Profit','CP')+' × 100&nbsp;&nbsp;·&nbsp;&nbsp;% Loss = '+f('Loss','CP')+' × 100</div>'+
        '<p>The shirt above: '+f('25','60')+' × 100 = <b>41.7%</b> profit (1 d.p.).</p>'},
      {h:'Discount and sales tax', html:
        '<p>Both are percentage changes applied to a price, so use a single multiplier rather than working out the change and then adding it.</p>'+
        '<ul><li><b>Discount</b> reduces the marked price: you pay <b>(100 − d)%</b> of it.</li>'+
        '<li><b>VAT / sales tax</b> is added on: you pay <b>(100 + t)%</b>.</li></ul>'+
        '<div class="formula">$80 with 15% off → 85% of 80 = 0.85 × 80 = $68<br>'+
        '$200 plus 12% VAT → 112% of 200 = 1.12 × 200 = $224</div>'+
        '<p>The one-step multiplier is quicker and much less error-prone than finding 15% and subtracting.</p>'},
      {h:'Working backwards to the selling price', html:
        '<p>Given the cost price and a required percentage profit, the selling price is:</p>'+
        '<div class="formula">SP = (100 + % profit)% of CP</div>'+
        '<p>CP $250 with 20% profit → 120% of 250 = 1.2 × 250 = <b>$300</b>.</p>'+
        '<p>For a loss, use (100 − % loss)% instead. Always finish by checking the answer sits on the right side of the cost price — above it for a profit, below for a loss.</p>'},
    ],
    examples:[
      {q:'A phone costs the shop $600 and is sold for $750. Find the percentage profit.', answer:'25%',
       steps:['Profit = SP − CP = 750 − 600 = $150.','% profit = '+f('150','600')+' × 100.','= 0.25 × 100 = 25%.']},
      {q:'A $80 jacket has 15% off. Find the sale price.', answer:'$68',
       steps:['Discount = 15% of 80 = 0.15 × 80 = $12.','Sale price = 80 − 12 = $68. (Or 85% × 80 = $68.)']},
    ],
    practice:[
      {gen:function(){
        var cp=Q.int(20,200), profit=Q.int(5,60);
        return {type:'text', q:'CP = $'+cp+', SP = $'+(cp+profit)+'. Find the profit ($).',
          answer:[String(profit), '$'+profit], hint:'Profit = SP − CP.'};
      }},
      {gen:function(){
        var pc=Q.pick([5,10,15,20,25,40]), cp=Q.pick([40,50,60,80,100,120,200,250]);
        var loss=cp*pc/100;
        return {type:'text', q:'A book bought for $'+cp+' is sold for $'+(cp-loss)+'. Find the percentage loss.',
          answer:[pc+'%', String(pc)], hint:'Loss = '+loss+'; divide by CP = '+cp+', then × 100.'};
      }},
      {gen:function(){
        var pc=Q.pick([10,15,20,25,30,40,50]), mp=Q.pick([80,120,150,200,240,300,400]);
        return {type:'text', q:'Find the price of a $'+mp+' item after a '+pc+'% discount ($).',
          answer:[String(mp*(100-pc)/100), '$'+(mp*(100-pc)/100)],
          hint:'Pay '+(100-pc)+'% of '+mp+'.'};
      }},
      {gen:function(){
        var t=Q.pick([5,10,12,15,20]), p=Q.pick([150,200,250,300,400,500]);
        var tot=p*(100+t)/100;
        var o=Q.mc('$'+tot, ['$'+(p*(100-t)/100), '$'+(p+t), '$'+(p*2)]);
        return {type:'mc', q:'A $'+p+' item has '+t+'% VAT added. What is the total?',
          options:o.options, answer:o.answer, hint:(100+t)+'% of '+p+'.'};
      }},
      {gen:function(){
        var pc=Q.pick([10,15,20,25,30,40,50]), cp=Q.pick([80,120,150,200,250,300,400]);
        var sp=cp*(100+pc)/100;
        return {type:'text', q:'CP = $'+cp+', profit is '+pc+'%. Find the selling price ($).',
          answer:[String(sp), '$'+sp], hint:'SP = '+(100+pc)+'% of CP.'};
      }},
    ]
  });

  /* ============================ FORM 2 ============================ */

  set('2.1.1', {
    notes:[
      {h:'The set of integers', html:
        '<p><b>Integers</b> are the whole numbers together with their negatives — no fractions, no decimals.</p>'+
        '<div class="formula">ℤ = { … −3, −2, −1, 0, 1, 2, 3 … }</div>'+
        '<p>They model anything that runs both ways from a zero point: temperature above and below freezing, money owed and owned, floors above and below ground, metres above and below sea level.</p>'+
        '<p>Zero is an integer, and it is neither positive nor negative.</p>'},
      {h:'Ordering integers', html:
        '<p>On the number line, numbers <b>increase to the right</b> — always. So the further left a number sits, the smaller it is.</p>'+
        '<div class="formula">−9 &nbsp; −5 &nbsp; −2 &nbsp; 0 &nbsp; 3 &nbsp; 7&nbsp;&nbsp;&nbsp;(smallest to largest)</div>'+
        '<p>This is where negatives catch people out: <b>−9 &lt; −1</b>, even though 9 is bigger than 1. A bigger digit after the minus sign means a <i>smaller</i> number.</p>'+
        '<p>A debt of $9 leaves you worse off than a debt of $1 — that is exactly what −9 &lt; −1 says.</p>'},
      {h:'The sign rules', html:
        '<p><b>Adding and subtracting:</b> two signs side by side collapse into one.</p>'+
        '<div class="formula">+ + = +&nbsp;&nbsp;·&nbsp;&nbsp;+ − = −&nbsp;&nbsp;·&nbsp;&nbsp;− + = −&nbsp;&nbsp;·&nbsp;&nbsp;− − = +</div>'+
        '<p>So 5 − (−3) becomes 5 + 3 = 8, and 5 + (−3) becomes 5 − 3 = 2.</p>'+
        '<p><b>Multiplying and dividing:</b></p>'+
        '<div class="formula">same signs → <b>+</b>&nbsp;&nbsp;·&nbsp;&nbsp;different signs → <b>−</b></div>'+
        '<p>(−3) × (−6) = +18, but (−3) × 6 = −18. The same rule governs division.</p>'},
      {h:'Order of operations', html:
        '<p>In a chain of operations, work in this order:</p>'+
        '<div class="formula"><b>B</b>rackets → <b>O</b>rders (powers) → <b>D</b>ivide / <b>M</b>ultiply → <b>A</b>dd / <b>S</b>ubtract</div>'+
        '<p>Divide and multiply rank equally — do them left to right. The same goes for add and subtract.</p>'+
        '<p>−4 + 3 × (−2): the multiplication comes first, giving −6, so the answer is −4 + (−6) = <b>−10</b>. Working left to right instead would wrongly give 2.</p>'},
    ],
    examples:[
      {q:'Arrange in ascending order: 3, −7, 0, −2, 5.', answer:'−7, −2, 0, 3, 5',
       steps:['Ascending means smallest first.','The most negative is −7, then −2, then 0, then the positives 3 and 5.']},
      {q:'Evaluate −4 + 3 × (−2).', answer:'−10',
       steps:['Order of operations: multiply first. 3 × (−2) = −6.','Then −4 + (−6) = −10.']},
    ],
    practice:[
      {gen:function(){
        var big=-Q.int(5,20), small=-Q.int(1,4);   // big is further left, so smaller
        var o=Q.mc(Q.num(big)+' &lt; '+Q.num(small),
          [Q.num(big)+' &gt; '+Q.num(small), Q.num(big)+' = '+Q.num(small), Q.num(big)+' &gt; 0']);
        return {type:'mc', q:'Which statement is true?', options:o.options, answer:o.answer,
          hint:'Further left on the number line = smaller.'};
      }},
      {gen:function(){
        var a=-Q.int(1,12), b=-Q.int(2,15);
        return {type:'text', q:'Evaluate '+Q.num(a)+' − ('+Q.num(b)+').', answer:[String(a-b)],
          hint:'Subtracting a negative adds.'};
      }},
      {gen:function(){
        var a=-Q.int(2,9), b=-Q.int(2,9);
        return {type:'text', q:'Evaluate ('+Q.num(a)+') × ('+Q.num(b)+').', answer:[String(a*b)],
          hint:'Two negatives multiply to a positive.'};
      }},
      {gen:function(){
        var b=Q.int(2,6), q=Q.int(2,9), c=Q.int(1,10);
        return {type:'text', q:'Evaluate '+(b*q)+' ÷ ('+Q.num(-b)+') + '+c+'.',
          answer:[String(-q+c)],
          hint:'Divide first: '+(b*q)+' ÷ ('+Q.num(-b)+') = '+Q.num(-q)+', then + '+c+'.'};
      }},
      {gen:function(){
        var depth=-Q.int(10,40), rise=Q.int(3,depth*-1-1), ans=depth+rise;
        var o=Q.mc(Q.num(ans)+' m', [Q.num(depth-rise)+' m', Math.abs(ans)+' m', Math.abs(depth-rise)+' m']);
        return {type:'mc', q:'A diver at '+Q.num(depth)+' m rises '+rise+' m. What is the new depth?',
          options:o.options, answer:o.answer, hint:'Rising adds: '+Q.num(depth)+' + '+rise+'.'};
      }},
    ]
  });

  set('2.1.2', {
    notes:[
      {h:'The laws of numbers', html:
        '<ul><li><b>Commutative:</b> order doesn’t matter for + and ×. a + b = b + a; a × b = b × a.</li>'+
        '<li><b>Associative:</b> grouping doesn’t matter for + and ×. (a + b) + c = a + (b + c).</li>'+
        '<li><b>Distributive:</b> a(b + c) = ab + ac.</li></ul>'+
        '<p>Note: subtraction and division are <b>not</b> commutative (7 − 3 ≠ 3 − 7).</p>'},
      {h:'Special properties', html:
        '<ul><li><b>Identity:</b> a + 0 = a and a × 1 = a.</li>'+
        '<li><b>Inverse:</b> a + (−a) = 0; a × '+f('1','a')+' = 1.</li>'+
        '<li><b>Closure:</b> a set is closed under an operation if the result stays in the set (integers are closed under +, −, × but not ÷).</li></ul>'},
      {h:'Standard form', html:
        '<p><b>Standard form</b> writes a number as A × 10<sup>n</sup>, where 1 ≤ A &lt; 10.</p>'+
        '<div class="formula">4 500 = 4.5 × 10<sup>3</sup> &nbsp;·&nbsp; 0.0072 = 7.2 × 10<sup>−3</sup></div>'},
    ],
    examples:[
      {q:'Use the distributive law to work out 7 × 103.', answer:'721',
       steps:['Split 103 = 100 + 3.','7 × (100 + 3) = 7×100 + 7×3.','= 700 + 21 = 721.']},
      {q:'Write 68 000 in standard form.', answer:'6.8 × 10⁴',
       steps:['Place the point after the first non-zero digit: 6.8.','Count how many places it moved: 4 places left.','So 68 000 = 6.8 × 10⁴.']},
    ],
    practice:[
      {gen:function(){
        var laws=[
          ['a(b + c) = ab + ac','Distributive','It “distributes” the multiply over the add.'],
          ['a + b = b + a','Commutative','The order was swapped.'],
          ['a × b = b × a','Commutative','The order was swapped.'],
          ['(a + b) + c = a + (b + c)','Associative','Only the grouping changed.'],
          ['(a × b) × c = a × (b × c)','Associative','Only the grouping changed.']
        ];
        var L=Q.pick(laws);
        var o=Q.mc(L[1], ['Commutative','Associative','Distributive','Closure'].filter(function(x){return x!==L[1];}).slice(0,3));
        return {type:'mc', q:'Which law does '+L[0]+' show?', options:o.options, answer:o.answer, hint:L[2]};
      }},
      {gen:function(){
        var A=(Q.int(11,99)/10), n=Q.int(3,7), val=A*Math.pow(10,n);
        return {type:'text', q:'Write '+val.toLocaleString('en-US').replace(/,/g,' ')+
            ' in standard form (use the style 3.2e5).',
          answer:Q.stdform(A,n), hint:'Move the point '+n+' places.'};
      }},
      {gen:function(){
        var A=(Q.int(11,99)/10), n=Q.int(2,5), val=Math.round(A*Math.pow(10,n));
        // Math.round is essential: 4.6 × 10⁵ evaluates to 459999.99999999994 in floating
        // point, and storing that string marks a student typing 460000 WRONG.
        return {type:'text', q:'Write '+A+' × 10'+Q.sup(n)+' as an ordinary number.',
          answer:[String(val)], hint:'Move the point '+n+' places right.'};
      }},
      {gen:function(){
        var a=Q.int(2,15);
        var o=Q.mc('−'+a, ['0','1',f('1',a)]);
        return {type:'mc', q:'Which is the additive inverse of '+a+'?', options:o.options, answer:o.answer,
          hint:'It adds to '+a+' to give 0.'};
      }},
      {gen:function(){
        var A=(Q.int(11,99)/10), n=Q.int(3,6), val=A*Math.pow(10,-n);
        return {type:'text', q:'Write '+val.toFixed(n+1)+' in standard form (e.g. 4.5e-4).',
          answer:Q.stdform(A,-n), hint:'The point moves '+n+' places right, so the power is −'+n+'.'};
      }},
    ]
  });

  set('2.1.3', {
    notes:[
      {h:'What a base means', html:
        '<p>Our everyday system is <b>base 10</b> — ten digits (0–9), and each column worth ten times the one to its right: units, tens, hundreds, thousands.</p>'+
        '<p>A different base changes two things together: <b>how many digits you may use</b>, and <b>what each column is worth</b>.</p>'+
        '<div class="formula">Base 10 columns: … 1000 &nbsp; 100 &nbsp; 10 &nbsp; 1&nbsp;&nbsp;(powers of 10)<br>'+
        'Base 2 columns:&nbsp; … &nbsp;&nbsp;16 &nbsp;&nbsp; 8 &nbsp;&nbsp; 4 &nbsp;&nbsp; 2 &nbsp;&nbsp; 1&nbsp;&nbsp;(powers of 2)</div>'+
        '<p>In <b>base 2 (binary)</b> the only digits are 0 and 1 — there is no digit "2", just as base 10 has no single digit for ten. In base 3 the digits are 0, 1 and 2.</p>'+
        '<p>We write the base as a small subscript: 1101<b>₂</b> means "1101 in base 2", which is a different number from 1101 in base 10.</p>'+
        '<p>Binary matters because computers store everything with two states — off and on, 0 and 1.</p>'},
      {h:'Converting TO base 10', html:
        '<p>Write the column values above the digits, multiply each digit by its column, and add.</p>'+
        '<div class="formula">&nbsp;8 &nbsp; 4 &nbsp; 2 &nbsp; 1&nbsp;&nbsp;← column values<br>'+
        '&nbsp;1 &nbsp; 1 &nbsp; 0 &nbsp; 1&nbsp;&nbsp;← the digits of 1101₂<br>'+
        '1×8 + 1×4 + 0×2 + 1×1 = <b>13</b></div>'+
        '<p>Only the columns with a 1 contribute, so in binary you are really just adding up the column values that are switched on: 8 + 4 + 1 = 13.</p>'},
      {h:'Converting FROM base 10', html:
        '<p><b>Repeatedly divide</b> by the base, writing down the remainder each time, then read the remainders <b>bottom to top</b>.</p>'+
        '<div class="formula">13 ÷ 2 = 6 remainder <b>1</b><br>&nbsp;6 ÷ 2 = 3 remainder <b>0</b><br>'+
        '&nbsp;3 ÷ 2 = 1 remainder <b>1</b><br>&nbsp;1 ÷ 2 = 0 remainder <b>1</b><br>read upwards → <b>1101₂</b></div>'+
        '<p>Keep dividing until you reach 0. Reading the remainders the wrong way round is the classic error — the <i>last</i> remainder is the <i>first</i> digit.</p>'+
        '<p>Alternatively, subtract the largest column value that fits and repeat: 13 − 8 = 5, 5 − 4 = 1, 1 − 1 = 0, so the 8, 4 and 1 columns are on → 1101₂.</p>'+
        '<p><b>Always check</b> by converting back the other way.</p>'},
    ],
    examples:[
      {q:'Convert 10110₂ to base 10.', answer:'22',
       steps:['Columns (right to left): 1,2,4,8,16.','Digits: 1×16 + 0×8 + 1×4 + 1×2 + 0×1.','= 16 + 4 + 2 = 22.']},
      {q:'Convert 25 to base 2.', answer:'11001₂',
       steps:['25÷2 = 12 r1; 12÷2 = 6 r0; 6÷2 = 3 r0; 3÷2 = 1 r1; 1÷2 = 0 r1.','Read remainders bottom-to-top: 11001.','Check: 16+8+0+0+1 = 25 ✓']},
    ],
    practice:[
      {gen:function(){
        var n=Q.int(5,31), b=Q.toBase(n,2);
        var cols=b.split('').map(function(d,i){ return d+'×'+Math.pow(2,b.length-1-i); }).join(' + ');
        return {type:'text', q:'Convert '+b+'₂ to base 10.', answer:[String(n)], hint:cols+'.'};
      }},
      {gen:function(){
        var p=Q.int(2,7), n=Math.pow(2,p), extra=Q.chance(0.5)?1:0;
        return {type:'text', q:'Convert '+Q.toBase(n+extra,2)+'₂ to base 10.', answer:[String(n+extra)],
          hint:extra?'The '+n+'s column and the units column are on.':'Only the '+n+'s column is on.'};
      }},
      {gen:function(){
        var n=Q.int(3,20), b=Q.toBase(n,2);
        var on=b.split('').map(function(d,i){ return d==='1'?Math.pow(2,b.length-1-i):0; })
                .filter(function(v){return v;});
        return {type:'text', q:'Convert '+n+' to base 2.', answer:[b, b+'_2', b+'₂'],
          hint:on.join(' + ')+', so those columns are on.'};
      }},
      {gen:function(){
        var n=Q.int(5,31), b=Q.toBase(n,2);
        var o=Q.mc(String(n), [String(n+1), String(n-2), String(b.length*4)]);
        return {type:'mc', q:'Which base-10 number equals '+b+'₂?', options:o.options, answer:o.answer,
          hint:'Add the column values wherever there is a 1.'};
      }},
      {gen:function(){
        var n=Q.int(8,40), b=Q.toBase(n,2);
        return {type:'text', q:'Convert '+n+' to base 2.', answer:[b, b+'_2', b+'₂'],
          hint:'Divide by 2 repeatedly and read the remainders bottom to top.'};
      }},
    ]
  });

  /* ============================ FORM 3 ============================ */

  set('3.1.1', {
    notes:[
      {h:'The real number system', html:
        '<p>Every number you meet at this level is a <b>real number</b>. Reals split into:</p>'+
        '<ul><li><b>Rational</b> — can be written as a fraction '+f('a','b')+' (includes integers, terminating and recurring decimals). E.g. '+f('3','4')+', −5, 0.333…</li>'+
        '<li><b>Irrational</b> — cannot be written as an exact fraction; the decimal never repeats or ends. E.g. √2, π.</li></ul>'+
        '<div class="formula">Natural ⊂ Whole ⊂ Integers ⊂ Rational ⊂ Real</div>'},
      {h:'Approximating irrationals', html:
        '<p>Since irrationals never terminate, we <b>approximate</b> them (round to a number of decimal places or significant figures).</p>'+
        '<p>√2 ≈ 1.41 (2 d.p.), π ≈ 3.14. Between which integers does √2 lie? 1² = 1 and 2² = 4, so 1 &lt; √2 &lt; 2.</p>'},
      {h:'Number bases revisited', html:
        '<p>You can add and subtract directly in base 2 or base 3, carrying/borrowing the base instead of 10.</p>'+
        '<p>In base 2: 1 + 1 = 10 (write 0, carry 1). E.g. 101₂ + 11₂ = 1000₂.</p>'},
    ],
    examples:[
      {q:'Classify each as rational or irrational: 0.75, √9, √5, π.', answer:'Rational: 0.75, √9 (=3). Irrational: √5, π.',
       steps:['0.75 = '+f('3','4')+' → rational.','√9 = 3, a whole number → rational.','√5 = 2.236… never repeats → irrational.','π = 3.1415… never repeats → irrational.']},
      {q:'Add in base 2: 110₂ + 101₂.', answer:'1011₂',
       steps:['Right column: 0 + 1 = 1.','Middle: 1 + 0 = 1.','Left: 1 + 1 = 10 → write 0, carry 1.','Carried 1 to the front: 1011₂. (Check: 6 + 5 = 11 = 8+2+1 ✓)']},
    ],
    practice:[
      {gen:function(){
        var nonSq=[2,3,5,6,7,8,10,11,12,13,15,17,18,19,20].filter(function(n){
          return Math.sqrt(n)!==Math.round(Math.sqrt(n)); });
        var irr='√'+Q.pick(nonSq), sq=Q.pick([4,9,16,25,36,49]), p=Q.coprime();
        var o=Q.mc(irr, [f(p[0],p[1]), '√'+sq, String(Q.int(1,9)/10)]);
        return {type:'mc', q:'Which of these is irrational?', options:o.options, answer:o.answer,
          hint:'A perfect-square root is rational; the root of a non-square is not.'};
      }},
      {gen:function(){
        var lo=Q.int(1,9), n=Q.int(lo*lo+1, (lo+1)*(lo+1)-1);
        var o=Q.mc(lo+' and '+(lo+1),
          [(lo+1)+' and '+(lo+2), Math.max(0,lo-1)+' and '+lo, (lo+2)+' and '+(lo+3)]);
        return {type:'mc', q:'√'+n+' lies between which two integers?', options:o.options, answer:o.answer,
          hint:lo+'²='+(lo*lo)+', '+(lo+1)+'²='+((lo+1)*(lo+1))+', and '+n+' is between them.'};
      }},
      {gen:function(){
        var rational=Q.chance(0.5), item, why;
        if(rational){
          var p=Q.pick([['0.'+String(Q.int(1,8)).repeat(3)+'… (recurring)','it is a recurring decimal, so it equals a fraction'],
                        [String(Q.int(1,20)/8),'it is a terminating decimal'],
                        ['√'+Q.pick([4,9,16,25,36,49,64]),'the root of a perfect square is a whole number']]);
          item=p[0]; why=p[1];
        } else {
          var ns=[2,3,5,6,7,8,10,11,12,13,14,15,17,18,19,20];
          item=Q.chance(0.25)?'π':'√'+Q.pick(ns);
          why='its decimal never ends and never repeats';
        }
        return {type:'text', q:'Is '+item+' rational or irrational? (write rational or irrational)',
          answer:[rational?'rational':'irrational'], hint:'Ask yourself whether '+why+'.'};
      }},
      {gen:function(){
        var a=Q.int(2,15), b=Q.int(2,15), s=a+b;
        return {type:'text', q:'Add in base 2: '+Q.toBase(a,2)+'₂ + '+Q.toBase(b,2)+
            '₂. (give the base-2 answer, e.g. 101)',
          answer:[Q.toBase(s,2), Q.toBase(s,2)+'_2', Q.toBase(s,2)+'₂'],
          hint:a+' + '+b+' = '+s+', and '+s+' in base 2 has '+Q.toBase(s,2).length+' digits.'};
      }},
      {gen:function(){
        var n=Q.int(2,99);
        if(Math.sqrt(n)===Math.round(Math.sqrt(n))) n+=1;
        var r=Math.round(Math.sqrt(n)*10)/10, lo=(Math.floor(Math.sqrt(n)*10)/10);
        return {type:'text', q:'Approximate √'+n+' to 1 decimal place.', answer:[r.toFixed(1)],
          hint:lo.toFixed(1)+'² = '+(lo*lo).toFixed(2)+' and '+(lo+0.1).toFixed(1)+'² = '+
               ((lo+0.1)*(lo+0.1)).toFixed(2)+' — which is closer to '+n+'?'};
      }},
    ]
  });

})();
