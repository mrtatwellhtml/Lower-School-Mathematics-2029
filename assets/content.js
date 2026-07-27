/* Full content for the Number Operations & Number Theory strand (Forms 1-3).
   Attaches .content to topics in window.CURRICULUM. Other strands render objectives
   + prerequisites from data.js and show "content coming soon". */
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
        '<p>A fraction '+f('a','b')+' shows <b>a parts out of b equal parts</b>. The top is the <b>numerator</b>, the bottom the <b>denominator</b>.</p>'+
        '<ul><li><b>Proper</b>: top &lt; bottom ('+f('3','4')+').</li>'+
        '<li><b>Improper</b>: top ≥ bottom ('+f('7','4')+').</li>'+
        '<li><b>Mixed</b>: whole + fraction (1'+f('3','4')+').</li></ul>'},
      {h:'Equivalent fractions', html:
        '<p>Multiply or divide top and bottom by the <b>same</b> number to get an equal fraction.</p>'+
        '<div class="formula">'+f('1','2')+' = '+f('2','4')+' = '+f('3','6')+' = '+f('50','100')+'</div>'+
        '<p><b>Simplify</b> by dividing both parts by their HCF. '+f('12','18')+' ÷ 6 = '+f('2','3')+'.</p>'},
      {h:'Comparing & ordering', html:
        '<p>Rewrite fractions with a <b>common denominator</b>, then compare numerators.</p>'+
        '<p>Compare '+f('2','3')+' and '+f('3','5')+': common denominator 15 → '+f('10','15')+' vs '+f('9','15')+', so '+f('2','3')+' is larger.</p>'},
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
      {h:'Decimals are fractions', html:
        '<p>Decimal places continue place value <b>past the point</b>: tenths, hundredths, thousandths.</p>'+
        '<div class="formula">0.<b>4</b> = '+f('4','10')+' &nbsp; 0.0<b>7</b> = '+f('7','100')+' &nbsp; 0.4 = '+f('40','100')+'</div>'},
      {h:'Operations with decimals', html:
        '<ul><li><b>Add/subtract:</b> line up the decimal points, then work as usual.</li>'+
        '<li><b>Multiply:</b> ignore points, multiply, then put back the total number of decimal places.</li>'+
        '<li><b>Divide by a decimal:</b> multiply both numbers by 10, 100… until the divisor is whole.</li></ul>'},
      {h:'Converting', html:
        '<p><b>Fraction → decimal:</b> divide top by bottom. '+f('3','8')+' = 3 ÷ 8 = 0.375.</p>'+
        '<p><b>Decimal → fraction:</b> write over 10, 100… then simplify. 0.6 = '+f('6','10')+' = '+f('3','5')+'.</p>'},
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
        '<p>A percentage is a fraction out of 100. <b>45% = '+f('45','100')+' = 0.45</b>.</p>'+
        '<div class="formula">Fraction ⇄ Decimal ⇄ Percentage</div>'+
        '<ul><li>Decimal → %: multiply by 100 (0.3 → 30%).</li>'+
        '<li>% → decimal: divide by 100 (72% → 0.72).</li>'+
        '<li>Fraction → %: '+f('3','5')+' = '+f('60','100')+' = 60%.</li></ul>'},
      {h:'Percentage of a quantity', html:
        '<p>To find a percentage of an amount, convert to a decimal (or fraction) and multiply.</p>'+
        '<div class="formula">15% of 240 = 0.15 × 240 = 36</div>'},
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
        '<p><b>Cost Price (CP)</b> is what the seller paid; <b>Selling Price (SP)</b> is what the buyer pays.</p>'+
        '<div class="formula">Profit = SP − CP &nbsp;&nbsp;·&nbsp;&nbsp; Loss = CP − SP</div>'},
      {h:'Profit & loss as a percentage', html:
        '<p>Percentage profit/loss is always worked out <b>on the cost price</b>.</p>'+
        '<div class="formula">% Profit = '+f('Profit','CP')+' × 100</div>'},
      {h:'Discount & sales tax', html:
        '<ul><li><b>Discount</b> reduces the price: pay (100 − d)% of the marked price.</li>'+
        '<li><b>VAT / sales tax</b> adds on: pay (100 + t)% of the price.</li></ul>'},
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
        '<p><b>Integers</b> are the whole numbers together with their negatives: … −3, −2, −1, 0, 1, 2, 3 …  (symbol ℤ). No fractions or decimals.</p>'},
      {h:'Ordering integers', html:
        '<p>On the number line, numbers <b>increase to the right</b>. So −5 &lt; −2 &lt; 0 &lt; 3. A “larger” negative digit is actually a <i>smaller</i> number: −9 &lt; −1.</p>'},
      {h:'Operations recap', html:
        '<p>All the directed-number rules apply.</p>'+
        '<div class="formula">same signs × or ÷ → +&nbsp;&nbsp;·&nbsp;&nbsp;different signs → −</div>'+
        '<p>For a chain, apply <b>order of operations</b> (brackets, then × ÷, then + −).</p>'},
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
        var A=(Q.int(11,99)/10), n=Q.int(2,5), val=A*Math.pow(10,n);
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
        '<p>Our usual system is <b>base 10</b>: each column is a power of 10. In <b>base 2 (binary)</b> each column is a power of 2 and only digits 0 and 1 are used.</p>'+
        '<div class="formula">Base 2 columns: … 16 &nbsp; 8 &nbsp; 4 &nbsp; 2 &nbsp; 1</div>'},
      {h:'Converting to base 10', html:
        '<p>Multiply each digit by its column value and add.</p>'+
        '<p>1101₂ = 1×8 + 1×4 + 0×2 + 1×1 = <b>13</b>.</p>'},
      {h:'Converting from base 10', html:
        '<p><b>Repeatedly divide</b> by the base and read the remainders <i>bottom to top</i>.</p>'+
        '<p>13 → 2: 13÷2 = 6 r1, 6÷2 = 3 r0, 3÷2 = 1 r1, 1÷2 = 0 r1 → read up: 1101₂.</p>'},
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
