/* Full content for the Algebra strand (Forms 1-3).
   Same pattern as content.js: attaches .content to topics in window.CURRICULUM.
   Loaded after data.js and qgen.js.

   Notes and worked examples are fixed. Practice questions are GENERATED — each item
   is { gen:function(){…} } returning fresh numbers every time, so a student can press
   "New questions" and get an unlimited supply of the same kind of problem. */
(function(){
  var C=window.CURRICULUM; if(!C) return;
  var Q=window.QG;
  function f(a,b){ return '<span class="frac"><span>'+a+'</span><span>'+b+'</span></span>'; } // fraction
  function set(code,content){ if(C[code]) C[code].content=content; }

  /* ============================ FORM 1 ============================ */

  set('1.6.1', {
    notes:[
      {h:'Constants, variables and symbols', html:
        '<p>Some quantities never change — the number of days in a week is always 7. That is a <b>constant</b>.</p>'+
        '<p>Other quantities vary — the cost of your lunch changes from day to day. A quantity that can change is a <b>variable</b>, and in algebra we give it a <b>letter</b>.</p>'+
        '<p>If a pen costs <b>p</b> dollars, then 3 pens cost <b>3p</b> dollars. The letter simply holds the place of a number we do not know yet.</p>'+
        '<div class="formula">A <b>term</b> is a single number–letter product (5x). An <b>expression</b> is terms joined by + or − (5x − 3y + 2). An expression has <u>no</u> equals sign.</div>'},
      {h:'Turning words into algebra', html:
        '<p>Read the words slowly and translate one phrase at a time. Let the unknown number be <b>n</b>.</p>'+
        '<ul>'+
        '<li>the sum of n and 5 → <b>n + 5</b></li>'+
        '<li>7 less than n → <b>n − 7</b> (not 7 − n!)</li>'+
        '<li>twice a number → <b>2n</b></li>'+
        '<li>a number divided by 4 → '+f('n','4')+'</li>'+
        '<li>3 more than double a number → <b>2n + 3</b></li>'+
        '</ul>'+
        '<p>Watch the order with subtraction and division — "less than" and "divided into" reverse the words.</p>'},
      {h:'Substitution', html:
        '<p><b>Substitute</b> means replace the letter with its number, then work out the answer using BODMAS.</p>'+
        '<p>If x = 6, then 5x − 4 means 5 × 6 − 4 = 30 − 4 = <b>26</b>.</p>'+
        '<p>Always put the number in brackets first if you are squaring or multiplying: 2x² with x = 3 is 2 × (3)² = 2 × 9 = 18, <i>not</i> (2 × 3)².</p>'},
      {h:'Like terms and the distributive law', html:
        '<p><b>Like terms</b> have exactly the same letter part: 4a and 7a are like; 4a and 7b are not; 4a and 4a² are not.</p>'+
        '<p>You may only <b>add or subtract like terms</b>. Collect them by keeping each term with the sign in front of it.</p>'+
        '<div class="formula">8a + 5b − 3a + 2b = (8a − 3a) + (5b + 2b) = 5a + 7b</div>'+
        '<h3>The distributive law</h3>'+
        '<p>Multiply everything inside the bracket by the term outside.</p>'+
        '<div class="formula">a(b + c) = ab + ac</div>'+
        '<p>3(2x + 5) = 6x + 15. A <b>minus</b> outside changes every sign inside: −2(x − 4) = −2x + 8.</p>'},
    ],
    examples:[
      {q:'Simplify 5a + 3b − 2a + 7b.', answer:'3a + 10b',
       steps:['Group the like terms, keeping each sign: (5a − 2a) + (3b + 7b).',
              '5a − 2a = 3a.','3b + 7b = 10b.','Answer: 3a + 10b — it cannot be simplified further because a and b are unlike.']},
      {q:'Expand and simplify 3(2x + 4) − 2(x − 1).', answer:'4x + 14',
       steps:['Expand the first bracket: 3 × 2x = 6x and 3 × 4 = 12, giving 6x + 12.',
              'Expand the second: −2 × x = −2x and −2 × (−1) = +2, giving −2x + 2.',
              'Now collect: 6x − 2x = 4x, and 12 + 2 = 14.','Answer: 4x + 14.']},
    ],
    practice:[
      {gen:function(){
        var v=Q.pick(['m','k','t','p']), a=Q.int(4,12), b=Q.int(2,9), c=Q.int(2,a+b-1);
        return {type:'text', q:'Simplify '+a+v+' + '+b+v+' − '+c+v+'.',
          answer:[(a+b-c)+v], hint:'All three are like terms — just work with the numbers in front.'};
      }},
      {gen:function(){
        var k=Q.int(2,6), c=Q.int(2,9), words=['twice','three times','four times','five times','six times'][k-2];
        var right=Q.polyAns([[k,'n'],[-c,'']]);
        var o=Q.mc(right,[Q.polyAns([[-k,'n'],[c,'']]), k+'(n-'+c+')', Q.polyAns([[c,'n'],[-k,'']])]);
        return {type:'mc', q:'Which expression means “'+c+' less than '+words+' a number n”?',
          options:o.options, answer:o.answer,
          hint:'“'+words.charAt(0).toUpperCase()+words.slice(1)+' a number” is '+k+'n; “'+c+' less than” it means take '+c+' away from that.'};
      }},
      {gen:function(){
        var a=Q.int(3,9), b=Q.int(2,12), x=Q.int(2,9);
        return {type:'text', q:'If x = '+x+', find the value of '+a+'x − '+b+'.',
          answer:Q.root(a*x-b), hint:a+' × '+x+' first, then subtract '+b+'.'};
      }},
      {gen:function(){
        var k=Q.int(2,9), c=Q.int(2,9), v=Q.pick(['y','a','w']);
        return {type:'text', q:'Expand '+k+'('+v+' + '+c+'). (write it like '+k+v+'+'+(k*c)+')',
          answer:[k+v+'+'+k*c, k*c+'+'+k+v], hint:'Multiply both the '+v+' and the '+c+' by '+k+'.'};
      }},
      {gen:function(){
        var v=Q.pick(['x','a','m']), w=Q.pick(['y','b','n']), p=Q.int(2,9), q=Q.int(2,9);
        var o=Q.mc(p+v+' and '+q+v, [p+v+' and '+q+w, p+v+' and '+q+v+'²', p+' and '+q+v]);
        return {type:'mc', q:'Which pair are LIKE terms?', options:o.options, answer:o.answer,
          hint:'Like terms must have exactly the same letter, to the same power.'};
      }},
      {gen:function(){
        var a=Q.int(4,9), b=Q.int(2,8), c=Q.int(1,a-1), d=Q.int(2,8);
        var ans=Q.polyAns([[a-c,'p'],[b+d,'q']]);
        return {type:'text', q:'Simplify '+a+'p + '+b+'q − '+(c===1?'':c)+'p + '+d+'q. (write it like 5p+7q)',
          answer:[ans], hint:a+'p − '+(c===1?'':c)+'p is '+(a-c)+'p. Now do the q terms.'};
      }},
    ]
  });

  set('1.6.2', {
    notes:[
      {h:'Substituting directed numbers', html:
        '<p>Variables often stand for <b>negative</b> numbers. The safe method is: write the expression, put every substituted value <b>in brackets</b>, then simplify.</p>'+
        '<p>If a = −3, then 4a = 4 × (−3) = <b>−12</b>.</p>'+
        '<p>If a = −3, then a² = (−3)² = (−3) × (−3) = <b>+9</b>. A negative squared is positive; a negative cubed stays negative.</p>'+
        '<div class="formula">Two signs together: + + = +&nbsp;&nbsp;·&nbsp;&nbsp;+ − = −&nbsp;&nbsp;·&nbsp;&nbsp;− + = −&nbsp;&nbsp;·&nbsp;&nbsp;− − = +</div>'+
        '<p>So 5 − 3a with a = −2 becomes 5 − 3(−2) = 5 + 6 = 11.</p>'},
      {h:'Sequences and patterns', html:
        '<p>A <b>sequence</b> is a list of numbers following a rule. Each number is a <b>term</b>; its position is <b>n</b> (1st, 2nd, 3rd…).</p>'+
        '<p>In a <b>linear</b> sequence the gap between terms is constant — the <b>common difference</b>, d.</p>'+
        '<p>5, 8, 11, 14, … goes up by 3 each time, so d = 3.</p>'},
      {h:'Finding the nth term', html:
        '<p>For a linear sequence the rule always looks like <b>dn + c</b>.</p>'+
        '<div class="formula">nth term = (common difference) × n + (the term before the first)</div>'+
        '<p>For 5, 8, 11, 14: d = 3, so start with 3n → 3, 6, 9, 12. Every real term is 2 more, so the rule is <b>3n + 2</b>.</p>'+
        '<p>Check with n = 4: 3(4) + 2 = 14 ✓. Now any term is instant — the 50th term is 3(50) + 2 = 152.</p>'},
    ],
    examples:[
      {q:'If a = −3 and b = 2, find the value of 4a − 2b.', answer:'−16',
       steps:['Substitute with brackets: 4(−3) − 2(2).','4 × (−3) = −12.','2 × 2 = 4, so we have −12 − 4.','−12 − 4 = −16.']},
      {q:'Find the nth term of 5, 8, 11, 14, … and use it to find the 10th term.', answer:'nth term = 3n + 2; 10th term = 32',
       steps:['The common difference is 8 − 5 = 3, so the rule starts 3n.',
              '3n gives 3, 6, 9, 12 — each is 2 less than the sequence.',
              'So the nth term is 3n + 2.',
              '10th term: 3(10) + 2 = 30 + 2 = 32.']},
    ],
    practice:[
      {gen:function(){
        var a=-Q.int(2,9), k=Q.int(2,6), c=Q.int(3,15);
        return {type:'text', q:'If a = '+Q.num(a)+', find the value of '+k+'a + '+c+'.',
          answer:Q.root(k*a+c), hint:k+' × ('+Q.num(a)+') = '+Q.num(k*a)+', then add '+c+'.'};
      }},
      {gen:function(){
        var x=-Q.int(2,7), y=Q.int(2,9);
        return {type:'text', q:'If x = '+Q.num(x)+' and y = '+y+', find the value of x² + y.',
          answer:Q.root(x*x+y), hint:'('+Q.num(x)+')² is +'+(x*x)+' — a negative squared is positive.'};
      }},
      {gen:function(){
        var d=Q.int(2,7), c=Q.int(1,9), seq=[1,2,3,4].map(function(n){return d*n+c;});
        return {type:'text', q:'Find the nth term of the sequence '+seq.join(', ')+', … (write it like 3n+4)',
          answer:[Q.polyAns([[d,'n'],[c,'']])],
          hint:'The common difference is '+d+'. What must you add to '+d+'n to get '+seq[0]+' when n = 1?'};
      }},
      {gen:function(){
        var d=Q.int(2,6), c=-Q.int(1,9), k=Q.pick([10,12,15,20,25]);
        var right=d*k+c;
        var o=Q.mc(right,[d*k-c, d*k, d*(k-1)+c]);
        return {type:'mc', q:'A sequence has nth term '+Q.polyHtml([[d,'n'],[c,'']])+'. What is the '+k+'th term?',
          options:o.options, answer:o.answer, hint:'Replace n with '+k+': '+d+'('+k+') − '+Math.abs(c)+'.'};
      }},
      {gen:function(){
        var d=Q.int(3,8), c=-Q.int(1,9), seq=[1,2,3,4].map(function(n){return d*n+c;});
        return {type:'text', q:'Find the nth term of '+seq.join(', ')+', … (write it like 5n-1)',
          answer:[Q.polyAns([[d,'n'],[c,'']])],
          hint:'d = '+d+', so start with '+d+'n: '+[1,2,3,4].map(function(n){return d*n;}).join(', ')+'. Compare with the sequence.'};
      }},
      {gen:function(){
        var p=-Q.int(2,9), k=Q.int(2,6);
        return {type:'text', q:'If p = '+Q.num(p)+', find the value of −'+k+'p.',
          answer:Q.root(-k*p), hint:'A negative times a negative is positive.'};
      }},
    ]
  });

  set('1.6.6', {
    notes:[
      {h:'Expressions vs equations', html:
        '<p>An <b>expression</b> has no equals sign — 3x + 5. You can only simplify or evaluate it.</p>'+
        '<p>An <b>equation</b> says two things are equal — 3x + 5 = 20. It can be <b>solved</b>: there is a value of x that makes it true.</p>'+
        '<p>Think of an equation as a <b>balance</b>. Whatever you do to one side you must do to the other, or the scales tip.</p>'},
      {h:'The balance method', html:
        '<p>Undo the operations around x, in reverse order, until x stands alone.</p>'+
        '<div class="formula">3x + 7 = 22<br>3x + 7 <b>− 7</b> = 22 <b>− 7</b> → 3x = 15<br>3x <b>÷ 3</b> = 15 <b>÷ 3</b> → x = 5</div>'+
        '<p>Undo <b>+</b> with <b>−</b>, <b>×</b> with <b>÷</b>. Deal with the addition/subtraction first, then the multiplication/division.</p>'+
        '<p><b>Always check</b>: put x = 5 back in — 3(5) + 7 = 22 ✓.</p>'},
      {h:'Word problems', html:
        '<p>Four steps that never fail:</p>'+
        '<ol><li><b>Let</b> the unknown be a letter — "let the number be n".</li>'+
        '<li><b>Translate</b> the sentence into an equation.</li>'+
        '<li><b>Solve</b> it.</li>'+
        '<li><b>Answer in words</b>, and check it makes sense.</li></ol>'+
        '<p>"When 8 is added to three times a number the result is 29." → 3n + 8 = 29 → 3n = 21 → n = <b>7</b>.</p>'},
    ],
    examples:[
      {q:'Solve 3x + 7 = 22.', answer:'x = 5',
       steps:['Subtract 7 from both sides: 3x = 22 − 7 = 15.',
              'Divide both sides by 3: x = 15 ÷ 3.',
              'x = 5.','Check: 3(5) + 7 = 15 + 7 = 22 ✓']},
      {q:'I think of a number, multiply it by 4 and subtract 6. The result is 26. Find the number.', answer:'The number is 8',
       steps:['Let the number be n.','Multiply by 4 and subtract 6: 4n − 6. This equals 26, so 4n − 6 = 26.',
              'Add 6 to both sides: 4n = 32.','Divide by 4: n = 8. Check: 4(8) − 6 = 32 − 6 = 26 ✓']},
    ],
    practice:[
      {gen:function(){
        var x=Q.int(2,20), a=Q.int(3,15);
        return {type:'text', q:'Solve x + '+a+' = '+(x+a)+'.', answer:Q.root(x),
          hint:'Subtract '+a+' from both sides.'};
      }},
      {gen:function(){
        var a=Q.int(3,12), x=Q.int(2,12);
        return {type:'text', q:'Solve '+a+'x = '+(a*x)+'.', answer:Q.root(x),
          hint:'Divide both sides by '+a+'.'};
      }},
      {gen:function(){
        var a=Q.int(2,8), x=Q.int(2,12), b=Q.int(2,15);
        return {type:'text', q:'Solve '+a+'x − '+b+' = '+(a*x-b)+'.', answer:Q.root(x),
          hint:'Add '+b+' to both sides first, then divide by '+a+'.'};
      }},
      {gen:function(){
        var k=Q.int(2,6), c=Q.int(3,12), tot=Q.int(20,60);
        var o=Q.mc(k+'n + '+c+' = '+tot, [k+'n − '+c+' = '+tot, c+'n + '+k+' = '+tot, k+'(n + '+c+') = '+tot]);
        return {type:'mc', q:'Which equation matches “'+c+' more than '+k+' times a number is '+tot+'”?',
          options:o.options, answer:o.answer,
          hint:'“'+k+' times a number” is '+k+'n; “'+c+' more than” that is '+k+'n + '+c+'.'};
      }},
      {gen:function(){
        var a=Q.int(2,9), x=Q.int(2,12);
        return {type:'text', q:'Solve '+f('x',a)+' = '+x+'.', answer:Q.root(a*x),
          hint:'The x has been divided by '+a+', so multiply both sides by '+a+'.'};
      }},
      {gen:function(){
        var n=Q.int(5,40), a=Q.int(4,20);
        return {type:'text', q:'The sum of a number and '+a+' is '+(n+a)+'. What is the number?',
          answer:[String(n)], hint:'Let the number be n: n + '+a+' = '+(n+a)+'.'};
      }},
    ]
  });

  /* ============================ FORM 2 ============================ */

  set('2.6.1', {
    notes:[
      {h:'What a variable really is', html:
        '<p>A <b>variable</b> is a letter standing in for a number that can change. It is not a mystery — it is a placeholder.</p>'+
        '<p>The same letter must mean the same number throughout one problem. Different letters may (but need not) be different numbers.</p>'+
        '<p>Concrete → pictorial → symbolic: three counters plus two counters is five counters; ▲▲▲ + ▲▲ = ▲▲▲▲▲; 3t + 2t = 5t. It is the same idea each time.</p>'},
      {h:'Statements with two operations', html:
        '<p>Most statements combine two operations. Translate left to right, and use <b>brackets</b> whenever the words group things together.</p>'+
        '<ul>'+
        '<li>five more than twice a number → <b>2n + 5</b></li>'+
        '<li>twice the sum of a number and five → <b>2(n + 5)</b></li>'+
        '<li>half of a number, decreased by 3 → '+f('n','2')+' − 3</li>'+
        '<li>the cost of x books at $12 each plus $5 postage → <b>12x + 5</b></li>'+
        '</ul>'+
        '<p>Notice how much the brackets matter: 2n + 5 and 2(n + 5) are different expressions.</p>'},
      {h:'Substituting integers', html:
        '<p>Replace each letter with its value <b>in brackets</b>, then apply BODMAS: <b>B</b>rackets, <b>O</b>rders (powers), <b>D</b>ivision/<b>M</b>ultiplication, <b>A</b>ddition/<b>S</b>ubtraction.</p>'+
        '<div class="formula">If m = −4: 2m² − 3 = 2(−4)² − 3 = 2(16) − 3 = 32 − 3 = 29</div>'+
        '<p>Common slip: 2m² means 2 × m × m, so square <i>first</i>, then multiply by 2.</p>'},
    ],
    examples:[
      {q:'The formula v = u + at gives speed. Find v when u = 5, a = −2 and t = 3.', answer:'v = −1',
       steps:['Substitute: v = 5 + (−2)(3).','Do the multiplication first: (−2)(3) = −6.','v = 5 − 6 = −1.']},
      {q:'If m = −4 and n = 5, find the value of 2m² − 3n.', answer:'17',
       steps:['Substitute with brackets: 2(−4)² − 3(5).','Powers first: (−4)² = 16, so 2(16) = 32.','3(5) = 15.','32 − 15 = 17.']},
    ],
    practice:[
      {gen:function(){
        var a=Q.int(2,8), b=-Q.int(2,6), p=Q.int(2,6), q=Q.int(2,6);
        return {type:'text', q:'If a = '+a+' and b = '+Q.num(b)+', find the value of '+p+'a + '+q+'b.',
          answer:Q.root(p*a+q*b), hint:(p*a)+' + ('+Q.num(q*b)+').'};
      }},
      {gen:function(){
        var x=-Q.int(2,7), k=Q.int(2,5);
        return {type:'text', q:'If x = '+Q.num(x)+', find the value of x² − '+k+'x.',
          answer:Q.root(x*x-k*x), hint:'('+Q.num(x)+')² = '+(x*x)+', and −'+k+'('+Q.num(x)+') = +'+(-k*x)+'.'};
      }},
      {gen:function(){
        var c=Q.int(3,9), o=Q.mc('2(n + '+c+')', ['2n + '+c, 'n + '+(2*c), c+'(n + 2)']);
        return {type:'mc', q:'Which expression means “twice the sum of a number and '+c+'”?',
          options:o.options, answer:o.answer,
          hint:'“The sum of a number and '+c+'” must be bracketed before doubling.'};
      }},
      {gen:function(){
        var l=Q.int(5,15), w=Q.int(2,l-1);
        return {type:'text', q:'The perimeter of a rectangle is P = 2(l + w). Find P when l = '+l+' and w = '+w+'.',
          answer:Q.root(2*(l+w),'p'), hint:'Work out the bracket first: '+l+' + '+w+'.'};
      }},
      {gen:function(){
        var t=-Q.int(1,5), c=Q.int(3,12), k=Q.int(2,6);
        return {type:'text', q:'If t = '+Q.num(t)+', find the value of '+c+' − '+k+'t.',
          answer:Q.root(c-k*t), hint:'−'+k+' × ('+Q.num(t)+') = +'+(-k*t)+', so '+c+' + '+(-k*t)+'.'};
      }},
      {gen:function(){
        var y=-Q.int(2,8), right=y*y*y;
        var o=Q.mc(Q.num(right),[String(-right), Q.num(3*y), String(y*y)]);
        return {type:'mc', q:'If y = '+Q.num(y)+', what is the value of y³?',
          options:o.options, answer:o.answer,
          hint:'('+Q.num(y)+')('+Q.num(y)+')('+Q.num(y)+') — an odd number of negatives stays negative.'};
      }},
    ]
  });

  set('2.6.2', {
    notes:[
      {h:'Terms, coefficients and signs', html:
        '<p>An expression is built from <b>terms</b> separated by + and −.</p>'+
        '<p>In <b>7x − 3y + 5</b> there are three terms: 7x, −3y and 5.</p>'+
        '<ul><li>The <b>coefficient</b> is the number multiplying the letter — in −3y the coefficient is <b>−3</b>, not 3.</li>'+
        '<li>The <b>operational sign</b> is the + or − joining terms. Always read the sign as <i>belonging to the term after it</i>.</li>'+
        '<li>A term with no number in front has coefficient 1: x means 1x.</li>'+
        '<li>A term with no letter is a <b>constant</b> (the 5).</li></ul>'},
      {h:'Like and unlike terms', html:
        '<p><b>Like terms</b> have identical letter parts, including powers.</p>'+
        '<div class="formula">Like: 4x and −9x · 2ab and 7ab · 3x² and x²<br>Unlike: 4x and 4y · 3x and 3x² · 2ab and 2a</div>'+
        '<p>Only like terms can be added or subtracted. 5x + 3y stays as 5x + 3y — it is already simplified.</p>'},
      {h:'Simplifying', html:
        '<p><b>Adding/subtracting:</b> collect like terms, keeping each sign.</p>'+
        '<p>8x − 3y − 5x + 7y = (8x − 5x) + (−3y + 7y) = 3x + 4y</p>'+
        '<h3>Multiplying and dividing terms</h3>'+
        '<p>Here the letters need <i>not</i> be alike. Multiply the numbers, then the letters.</p>'+
        '<div class="formula">2m × 5n = 10mn&nbsp;&nbsp;·&nbsp;&nbsp;4a × 3a = 12a²&nbsp;&nbsp;·&nbsp;&nbsp;'+f('12ab','4a')+' = 3b</div>'+
        '<h3>Brackets first</h3>'+
        '<p>Expand any brackets with the distributive law, <i>then</i> collect like terms.</p>'},
    ],
    examples:[
      {q:'Simplify 8x − 3y − 5x + 7y.', answer:'3x + 4y',
       steps:['Take each sign with its term: +8x, −3y, −5x, +7y.',
              'x terms: 8x − 5x = 3x.','y terms: −3y + 7y = 4y.','Answer: 3x + 4y.']},
      {q:'Simplify 5(2x − 3) − 4(x − 2).', answer:'6x − 7',
       steps:['Expand the first bracket: 5(2x) = 10x and 5(−3) = −15 → 10x − 15.',
              'Expand the second: −4(x) = −4x and −4(−2) = +8 → −4x + 8.',
              'Collect x terms: 10x − 4x = 6x.','Collect constants: −15 + 8 = −7.','Answer: 6x − 7.']},
    ],
    practice:[
      {gen:function(){
        var v=Q.pick(['k','h','r','d']), a=Q.int(6,14), b=Q.int(2,5), c=Q.int(2,6);
        return {type:'text', q:'Simplify '+a+v+' − '+b+v+' + '+c+v+'.',
          answer:[(a-b+c)+v], hint:a+' − '+b+' + '+c+', all with '+v+'.'};
      }},
      {gen:function(){
        var c=Q.int(2,9), k=Q.int(2,9), v=Q.pick(['x','y','a']);
        var o=Q.mc('−'+k, [String(k), String(c), '1']);
        return {type:'mc', q:'What is the coefficient of '+v+' in the expression '+c+' − '+k+v+'?',
          options:o.options, answer:o.answer, hint:'The sign in front belongs to the term.'};
      }},
      {gen:function(){
        var a=Q.int(4,10), c=Q.int(1,a-1), b=Q.int(2,6), d=Q.int(b+1,10);
        return {type:'text', q:'Simplify '+a+'a + '+b+'b − '+c+'a − '+d+'b. (write it like 4a-2b)',
          answer:[Q.polyAns([[a-c,'a'],[b-d,'b']])],
          hint:a+'a − '+c+'a for the a terms; '+b+'b − '+d+'b for the b terms.'};
      }},
      {gen:function(){
        var k=Q.int(2,7), c=Q.int(2,9), m=Q.int(2,6);
        return {type:'text', q:'Simplify '+k+'(x + '+c+') + '+m+'x. (write it like 5x+12)',
          answer:[Q.polyAns([[k+m,'x'],[k*c,'']]), (k*c)+'+'+(k+m)+'x'],
          hint:'Expand first: '+k+'x + '+(k*c)+', then add the '+m+'x.'};
      }},
      {gen:function(){
        var a=Q.int(2,9), b=Q.int(2,9), v=Q.pick(['m','p','s']), w=Q.pick(['n','q','t']);
        return {type:'text', q:'Simplify '+a+v+' × '+b+w+'.',
          answer:[(a*b)+v+w, (a*b)+w+v], hint:'Multiply the numbers, then write the letters together.'};
      }},
      {gen:function(){
        var a=Q.int(2,9), v=Q.pick(['x','a','m']), w=Q.pick(['y','b','n']);
        var o=Q.mc(a+v+'² and −'+v+'²', [a+v+'² and '+a+v, a+v+' and '+a+w, a+v+'² and '+a+w+'²']);
        return {type:'mc', q:'Which of these pairs are LIKE terms?', options:o.options, answer:o.answer,
          hint:'Same letter AND same power.'};
      }},
    ]
  });

  set('2.6.3', {
    notes:[
      {h:'Expression or equation?', html:
        '<p>The equals sign is the whole difference.</p>'+
        '<div class="formula">3x − 7&nbsp;&nbsp;→ expression (simplify / evaluate)<br>3x − 7 = 5&nbsp;&nbsp;→ equation (solve)</div>'+
        '<p>Solving means finding the value of the variable that makes both sides equal. That value is the <b>solution</b> or <b>root</b>.</p>'},
      {h:'Variables on both sides', html:
        '<p>Move all the variable terms to one side and all the numbers to the other. Choose the side with the <b>larger</b> variable term so you stay positive.</p>'+
        '<div class="formula">5x − 4 = 2x + 11<br>5x − 2x − 4 = 11&nbsp;&nbsp;(subtract 2x from both sides)<br>3x = 15&nbsp;&nbsp;(add 4 to both sides)<br>x = 5</div>'+
        '<p>Check by substituting into the <i>original</i>: 5(5) − 4 = 21 and 2(5) + 11 = 21 ✓</p>'},
      {h:'Equations with brackets', html:
        '<p><b>Expand first</b>, then solve as usual. Take great care with a minus in front of a bracket.</p>'+
        '<p>3(x + 2) = 2(x + 7) → 3x + 6 = 2x + 14 → x = 8.</p>'+
        '<p>4 − 2(x − 3) = 6 → 4 − 2x + 6 = 6 → 10 − 2x = 6 → −2x = −4 → x = 2.</p>'},
      {h:'Word problems', html:
        '<p>Same four steps: <b>let</b>, <b>translate</b>, <b>solve</b>, <b>answer in words</b>.</p>'+
        '<p><i>"A number is multiplied by 5 and 3 is subtracted. The answer is the same as adding 9 to twice the number. Find it."</i></p>'+
        '<p>Let the number be n: 5n − 3 = 2n + 9 → 3n = 12 → n = <b>4</b>.</p>'+
        '<p>For consecutive numbers use n, n + 1, n + 2. For "£x each" problems, cost = price × quantity.</p>'},
    ],
    examples:[
      {q:'Solve 7x − 3 = 4x + 12.', answer:'x = 5',
       steps:['Subtract 4x from both sides: 3x − 3 = 12.',
              'Add 3 to both sides: 3x = 15.','Divide by 3: x = 5.',
              'Check: 7(5) − 3 = 32 and 4(5) + 12 = 32 ✓']},
      {q:'Solve 3(x + 2) = 2(x + 7).', answer:'x = 8',
       steps:['Expand both sides: 3x + 6 = 2x + 14.',
              'Subtract 2x: x + 6 = 14.','Subtract 6: x = 8.',
              'Check: 3(10) = 30 and 2(15) = 30 ✓']},
    ],
    practice:[
      {gen:function(){
        var x=Q.int(2,10), a=Q.int(5,10), c=Q.int(2,a-2), b=Q.int(2,12);
        // ax - b = cx + d  with d chosen so the root is x
        var d=(a-c)*x-b;
        return {type:'text', q:'Solve '+a+'x − '+b+' = '+c+'x '+(d<0?'− '+(-d):'+ '+d)+'.',
          answer:Q.root(x), hint:'Take '+c+'x from both sides first.'};
      }},
      {gen:function(){
        var k=Q.int(2,6), b=Q.int(2,9), x=Q.int(b+1,b+12);
        return {type:'text', q:'Solve '+k+'(x − '+b+') = '+(k*(x-b))+'.',
          answer:Q.root(x), hint:'Expand to '+k+'x − '+(k*b)+' = '+(k*(x-b))+', or divide both sides by '+k+' first.'};
      }},
      {gen:function(){
        /* a(x + b) = c(x + d), solution x. Expanding gives d = ((a−c)x + ab)/c, so we
           search the (a, c, b, x) grid for the combinations where d is a whole number. */
        var ok=[];
        for(var a=3;a<=6;a++) for(var c=2;c<a;c++) for(var b=1;b<=6;b++) for(var x=2;x<=12;x++){
          var num=(a-c)*x+a*b;
          if(num%c===0 && num/c<=30) ok.push([a,c,b,x,num/c]);
        }
        var p=Q.pick(ok), A=p[0], Cc=p[1], B=p[2], X=p[3], D=p[4];
        return {type:'text', q:'Solve '+A+'(x + '+B+') = '+Cc+'(x + '+D+').',
          answer:Q.root(X), hint:'Expand both sides: '+A+'x + '+(A*B)+' = '+Cc+'x + '+(Cc*D)+'.'};
      }},
      {gen:function(){
        var a=Q.int(2,9), b=Q.int(2,9), c=Q.int(2,9), v=Q.pick(['x','a','m']);
        var o=Q.mc(a+v+' − '+b+' = '+c, [a+v+' + '+b+'y', b+'('+v+' + '+c+')', v+'² − '+a+v]);
        return {type:'mc', q:'Which one is an EQUATION (not an expression)?',
          options:o.options, answer:o.answer, hint:'Look for the equals sign.'};
      }},
      {gen:function(){
        var x=Q.int(2,10), k=Q.int(1,5), a=Q.int(2,20);
        // a - kx = x - c  ->  c = x + kx - a
        var c=(k+1)*x-a;
        return {type:'text', q:'Solve '+a+' − '+(k===1?'':k)+'x = x '+(c<=0?'+ '+(-c):'− '+c)+'.',
          answer:Q.root(x),
          hint:'Add '+(k===1?'':k)+'x to both sides to keep the x term positive: '+a+' = '+(k+1)+'x '+(c<=0?'+ '+(-c):'− '+c)+'.'};
      }},
      {gen:function(){
        var k=Q.int(2,6), n=Q.int(3,20), words=['twice','three times','four times','five times','six times'][k-2];
        return {type:'text', q:'The sum of a number and '+words+' the number is '+((k+1)*n)+'. Find the number.',
          answer:[String(n)], hint:'n + '+k+'n = '+((k+1)*n)+', so '+(k+1)+'n = '+((k+1)*n)+'.'};
      }},
    ]
  });

  set('2.6.4', {
    notes:[
      {h:'Inequalities in the real world', html:
        '<p>Life is full of statements that are not equations:</p>'+
        '<ul><li>You must be <b>at least</b> 18 to vote → age ≥ 18</li>'+
        '<li>The minibus holds <b>at most</b> 15 people → n ≤ 15</li>'+
        '<li>The budget must stay <b>under</b> $500 → c &lt; 500</li></ul>'+
        '<div class="formula">&lt; less than&nbsp;·&nbsp;&gt; greater than&nbsp;·&nbsp;≤ less than or equal to (at most, no more than)&nbsp;·&nbsp;≥ greater than or equal to (at least, minimum)</div>'},
      {h:'Solving inequalities', html:
        '<p>Solve exactly like an equation — add, subtract, multiply and divide both sides — with <b>one golden rule</b>:</p>'+
        '<div class="formula">If you multiply or divide both sides by a <b>NEGATIVE</b> number, <b>REVERSE</b> the inequality sign.</div>'+
        '<p>Why? 4 &gt; 2 is true. Multiply both sides by −1: −4 &gt; −2 is false. It must become −4 &lt; −2.</p>'+
        '<p>3x − 5 ≤ 7 → 3x ≤ 12 → x ≤ 4.<br>−2x &gt; 8 → x &lt; −4 &nbsp;(divided by −2, so the sign flipped).</p>'+
        '<p>Tip: you can avoid flipping by moving the variable to the side that keeps it positive — −2x &gt; 8 becomes −8 &gt; 2x, so −4 &gt; x, i.e. x &lt; −4.</p>'},
      {h:'The number line', html:
        '<p>Show the solution as a line with an arrow.</p>'+
        '<ul><li><b>Open circle</b> ○ for &lt; or &gt; — the endpoint is <i>not</i> included.</li>'+
        '<li><b>Closed (filled) circle</b> ● for ≤ or ≥ — the endpoint <i>is</i> included.</li>'+
        '<li>Arrow points left for &lt; and ≤, right for &gt; and ≥.</li></ul>'+
        '<div class="formula">x &gt; 2 &nbsp;→&nbsp; ——○════▶ &nbsp;(open at 2, shaded to the right)<br>x ≤ 4 &nbsp;→&nbsp; ◀════● —— &nbsp;(closed at 4, shaded to the left)</div>'},
      {h:'Set-builder notation', html:
        '<p>Write the solution as a <b>set</b>, stating which numbers you are choosing from.</p>'+
        '<div class="formula">{ x : x &gt; 2, x ∈ ℝ }&nbsp;&nbsp;read as “the set of all x such that x is greater than 2, where x is a real number”</div>'+
        '<p>The answer changes with the number set! For 2x &lt; 9:</p>'+
        '<ul><li>if x ∈ ℝ, the solution is x &lt; 4.5;</li>'+
        '<li>if x ∈ ℕ (natural numbers), the solution is { 1, 2, 3, 4 }.</li></ul>'},
    ],
    examples:[
      {q:'Solve 3x − 5 ≤ 7 and show the solution on a number line.', answer:'x ≤ 4  (closed circle at 4, shaded to the left)',
       steps:['Add 5 to both sides: 3x ≤ 12.',
              'Divide both sides by 3 — 3 is positive, so the sign does not change: x ≤ 4.',
              'On the number line: closed circle at 4 (because of the “or equal to”), arrow to the left.',
              'In set-builder notation: { x : x ≤ 4, x ∈ ℝ }.']},
      {q:'Solve −2x &gt; 8.', answer:'x &lt; −4',
       steps:['Divide both sides by −2.','Because −2 is negative, the &gt; must be reversed to &lt;.',
              'x &lt; −4.','Check with x = −5: −2(−5) = 10, and 10 &gt; 8 ✓']},
    ],
    practice:[
      {gen:function(){
        var a=Q.int(3,12), x=Q.int(2,15);
        return {type:'text', q:'Solve x + '+a+' &lt; '+(x+a)+'. (write it like x&lt;7)',
          answer:Q.ineq('<',x), hint:'Subtract '+a+' from both sides; the sign does not change.'};
      }},
      {gen:function(){
        var a=Q.int(2,9), x=Q.int(2,12);
        return {type:'text', q:'Solve '+a+'x ≥ '+(a*x)+'. (write it like x&gt;=5)',
          answer:Q.ineq('>=',x).concat(['x≥'+x,'≥'+x]),
          hint:'Divide by '+a+' — a positive number, so no flip.'};
      }},
      {gen:function(){
        var k=-Q.int(2,7);
        var o=Q.mc('Reverse the inequality sign',
          ['Nothing changes','Change the sign of the answer only','Make both sides positive']);
        return {type:'mc', q:'You divide both sides of an inequality by '+Q.num(k)+'. What must you do?',
          options:o.options, answer:o.answer, hint:'Test it on 6 > 3 and see what happens.'};
      }},
      {gen:function(){
        var a=Q.int(2,12);
        return {type:'text', q:'Solve −x &gt; '+a+'. (write it like x&lt;-3)',
          answer:Q.ineq('<',-a), hint:'Multiply both sides by −1 and reverse the sign.'};
      }},
      {gen:function(){
        var v=Q.int(1,9), open=Q.chance(0.5), right=Q.chance(0.5);
        var correct=(open?(right?'x &gt; ':'x &lt; '):(right?'x ≥ ':'x ≤ '))+v;
        var o=Q.mc(correct, ['x ≥ '+v,'x &gt; '+v,'x ≤ '+v,'x &lt; '+v]);
        return {type:'mc', q:'A number line shows '+(open?'an OPEN':'a CLOSED (filled)')+' circle at '+v+
          ' with shading to the '+(right?'right':'left')+'. Which inequality is it?',
          options:o.options, answer:o.answer,
          hint:(open?'Open circle = endpoint not included':'Filled circle = endpoint included')+
               '; '+(right?'right = greater than':'left = less than')+'.'};
      }},
      {gen:function(){
        var a=Q.int(2,7), b=Q.int(1,9), x=Q.int(2,12);
        return {type:'text', q:'Solve '+a+'x + '+b+' ≤ '+(a*x+b)+'. (write it like x&lt;=4)',
          answer:Q.ineq('<=',x).concat(['x≤'+x,'≤'+x]),
          hint:'Subtract '+b+', then divide by '+a+'.'};
      }},
    ]
  });

  /* ============================ FORM 3 ============================ */

  set('3.6.1', {
    notes:[
      {h:'Why clear the fractions?', html:
        '<p>An equation like '+f('x','3')+' + '+f('x','4')+' = 7 is much easier once the denominators are gone.</p>'+
        '<p>Multiply <b>every term on both sides</b> by the <b>LCM of the denominators</b>. The fractions cancel and you are left with an ordinary linear equation.</p>'+
        '<div class="formula">LCM of 3 and 4 is 12 → 12 × '+f('x','3')+' + 12 × '+f('x','4')+' = 12 × 7 → 4x + 3x = 84 → x = 12</div>'+
        '<p>The commonest mistake is forgetting to multiply the term that has <i>no</i> fraction (the 7 above).</p>'},
      {h:'When the numerator is a binomial', html:
        '<p>If the top is more than one term, such as '+f('x + 2','3')+', the fraction line acts as a <b>bracket</b>. Put the bracket in as soon as the denominator goes.</p>'+
        '<div class="formula">'+f('x + 2','3')+' = '+f('x − 4','2')+' &nbsp;→&nbsp; 2(x + 2) = 3(x − 4)</div>'+
        '<p>Then expand: 2x + 4 = 3x − 12 → 16 = x, so <b>x = 16</b>.</p>'+
        '<p>Cross-multiplying like this is just multiplying both sides by 6, the LCM.</p>'},
      {h:'Method and checking', html:
        '<ol><li>Find the LCM of all denominators.</li>'+
        '<li>Multiply <b>every</b> term by it, bracketing any binomial numerator.</li>'+
        '<li>Expand and collect like terms.</li>'+
        '<li>Solve the linear equation.</li>'+
        '<li><b>Check</b> in the original equation — fractions are easy to slip on.</li></ol>'+
        '<p>Watch a minus in front of a fraction: −'+f('x − 1','2')+' becomes −(x − 1) = −x + 1 once you multiply by 2.</p>'},
    ],
    examples:[
      {q:'Solve '+f('x','3')+' + '+f('x','4')+' = 7.', answer:'x = 12',
       steps:['The denominators are 3 and 4, so the LCM is 12.',
              'Multiply every term by 12: 4x + 3x = 84.',
              'Collect: 7x = 84.','x = 12. Check: '+f('12','3')+' + '+f('12','4')+' = 4 + 3 = 7 ✓']},
      {q:'Solve '+f('x + 2','3')+' = '+f('x − 4','2')+'.', answer:'x = 16',
       steps:['The LCM of 3 and 2 is 6. Multiply both sides by 6.',
              'Left: 6 × '+f('x + 2','3')+' = 2(x + 2). Right: 6 × '+f('x − 4','2')+' = 3(x − 4).',
              'So 2(x + 2) = 3(x − 4) → 2x + 4 = 3x − 12.',
              'Subtract 2x: 4 = x − 12, so x = 16.',
              'Check: '+f('18','3')+' = 6 and '+f('12','2')+' = 6 ✓']},
    ],
    practice:[
      {gen:function(){
        var a=Q.int(2,9), b=Q.int(2,12);
        return {type:'text', q:'Solve '+f('x',a)+' = '+b+'.', answer:Q.root(a*b),
          hint:'Multiply both sides by '+a+'.'};
      }},
      {gen:function(){
        var p=Q.coprime(), a=p[0], b=p[1], L=a*b, k=Q.int(1,5), x=L*k;
        var rhs=x/a+x/b;
        return {type:'text', q:'Solve '+f('x',a)+' + '+f('x',b)+' = '+rhs+'.', answer:Q.root(x),
          hint:'LCM of '+a+' and '+b+' is '+L+' → '+(L/a)+'x + '+(L/b)+'x = '+(L*rhs)+'.'};
      }},
      {gen:function(){
        var a=Q.int(1,9), b=Q.int(2,8), c=Q.int(2,9);
        return {type:'text', q:'Solve '+f('x − '+a,b)+' = '+c+'.', answer:Q.root(b*c+a),
          hint:'Multiply both sides by '+b+': x − '+a+' = '+(b*c)+'.'};
      }},
      {gen:function(){
        /* (kx + b)/c = rhs. Search for the combinations where rhs comes out whole,
           so the denominator is always a genuine 2-or-more (never a pointless ÷1). */
        var ok=[];
        for(var k=2;k<=5;k++) for(var b=1;b<=9;b++) for(var c=2;c<=6;c++) for(var x=2;x<=12;x++)
          if((k*x+b)%c===0) ok.push([k,b,c,x,(k*x+b)/c]);
        var p=Q.pick(ok);
        return {type:'text', q:'Solve '+f(p[0]+'x + '+p[1],p[2])+' = '+p[4]+'.', answer:Q.root(p[3]),
          hint:'Multiply by '+p[2]+': '+p[0]+'x + '+p[1]+' = '+(p[2]*p[4])+'.'};
      }},
      {gen:function(){
        var p=Q.pick([[6,4,12],[4,6,12],[3,4,12],[6,9,18],[4,10,20],[6,8,24],[10,15,30],[8,12,24]]);
        var o=Q.mc(String(p[2]), [String(p[0]*p[1]), String(p[0]+p[1]), String(Math.max(p[0],p[1]))]);
        return {type:'mc', q:'To clear the fractions in '+f('x',p[0])+' − '+f('x',p[1])+' = 1, what must every term be multiplied by?',
          options:o.options, answer:o.answer,
          hint:'The LCM of '+p[0]+' and '+p[1]+' — the smallest number both divide into.'};
      }},
      {gen:function(){
        var a=Q.int(2,6), m=Q.int(2,4), b=a*m, L=b, k=Q.int(1,4), x=L*k;
        var rhs=x/a-x/b;
        return {type:'text', q:'Solve '+f('x',a)+' − '+f('x',b)+' = '+rhs+'.', answer:Q.root(x),
          hint:'Multiply by '+L+': '+(L/a)+'x − '+(L/b)+'x = '+(L*rhs)+'.'};
      }},
    ]
  });

  set('3.6.2', {
    notes:[
      {h:'Same clearing, one extra rule', html:
        '<p>Clear the denominators exactly as you would in an equation — multiply every term by the LCM.</p>'+
        '<p>But remember the inequality golden rule: <b>multiplying or dividing by a negative reverses the sign</b>. LCMs are positive, so clearing fractions is safe; the danger comes later, when the variable ends up negative.</p>'+
        '<div class="formula">'+f('x','2')+' + 1 &lt; 4 → x + 2 &lt; 8 → x &lt; 6</div>'+
        '<p>−'+f('x','2')+' &gt; 3 → −x &gt; 6 → <b>x &lt; −6</b> (sign reversed when dividing by −1).</p>'},
      {h:'Showing the solution on a number line', html:
        '<p>Exactly as in Form 2:</p>'+
        '<ul><li>○ open circle for &lt; and &gt;; ● closed circle for ≤ and ≥.</li>'+
        '<li>Shade left for &lt; and ≤, right for &gt; and ≥.</li></ul>'+
        '<div class="formula">x ≥ 8 &nbsp;→&nbsp; ——●════▶</div>'+
        '<p>In set-builder notation: { x : x ≥ 8, x ∈ ℝ }.</p>'},
      {h:'Showing the solution on the Cartesian plane', html:
        '<p>An inequality in x alone still describes a <b>region</b> of the plane.</p>'+
        '<ul><li><b>x &gt; 4</b> — draw the <i>vertical</i> line x = 4 and shade everything to its right.</li>'+
        '<li><b>y ≤ 3</b> — draw the <i>horizontal</i> line y = 3 and shade everything below it.</li>'+
        '<li>Use a <b>broken</b> line for &lt; or &gt; (boundary not included) and a <b>solid</b> line for ≤ or ≥.</li></ul>'+
        '<p>Always label the line with its equation and state clearly which side is the required region.</p>'},
      {h:'Real-world problems', html:
        '<p><i>"A taxi charges a $10 flag-down plus $3 per km. Ravi has at most $40. How far can he travel?"</i></p>'+
        '<p>Let the distance be d km: 10 + 3d ≤ 40 → 3d ≤ 30 → <b>d ≤ 10 km</b>.</p>'+
        '<p>Then sanity-check the context: distance cannot be negative, so the full answer is 0 ≤ d ≤ 10.</p>'},
    ],
    examples:[
      {q:'Solve '+f('2x − 1','3')+' ≥ 5 and show it on a number line.', answer:'x ≥ 8  (closed circle at 8, shaded right)',
       steps:['Multiply both sides by 3 (positive, so no flip): 2x − 1 ≥ 15.',
              'Add 1 to both sides: 2x ≥ 16.','Divide by 2: x ≥ 8.',
              'Number line: closed circle at 8, arrow to the right. Set-builder: { x : x ≥ 8, x ∈ ℝ }.']},
      {q:'Solve '+f('x','2')+' − '+f('x','3')+' &lt; 1.', answer:'x &lt; 6',
       steps:['LCM of 2 and 3 is 6. Multiply every term: 3x − 2x &lt; 6.',
              'Collect: x &lt; 6.','6 is positive so nothing reverses.',
              'Check with x = 0: 0 − 0 = 0, and 0 &lt; 1 ✓']},
    ],
    practice:[
      {gen:function(){
        var a=Q.int(2,8), b=Q.int(2,12);
        return {type:'text', q:'Solve '+f('x',a)+' &gt; '+b+'. (write it like x&gt;12)',
          answer:Q.ineq('>',a*b), hint:'Multiply both sides by '+a+'.'};
      }},
      {gen:function(){
        var a=Q.int(1,9), b=Q.int(2,7), c=Q.int(2,8);
        return {type:'text', q:'Solve '+f('x + '+a,b)+' ≤ '+c+'. (write it like x&lt;=8)',
          answer:Q.ineq('<=',b*c-a).concat(['x≤'+(b*c-a),'≤'+(b*c-a)]),
          hint:'Multiply by '+b+': x + '+a+' ≤ '+(b*c)+'.'};
      }},
      {gen:function(){
        var a=Q.int(2,6), b=Q.int(2,9);
        return {type:'text', q:'Solve −'+f('x',a)+' &gt; '+b+'. (write it like x&lt;-6)',
          answer:Q.ineq('<',-a*b),
          hint:'Multiply by '+a+' to get −x > '+(a*b)+', then divide by −1 and reverse the sign.'};
      }},
      {gen:function(){
        var v=Q.int(2,9), vert=Q.chance(0.5), solid=Q.chance(0.5), gt=Q.chance(0.5);
        var letter=vert?'x':'y', op=solid?(gt?'≥':'≤'):(gt?'&gt;':'&lt;');
        var side=vert?(gt?'right':'left'):(gt?'above':'below');
        var correct=(solid?'Solid':'Broken')+' '+(vert?'vertical':'horizontal')+' line at '+letter+' = '+v+', shade '+side;
        var o=Q.mc(correct, [
          (solid?'Broken':'Solid')+' '+(vert?'vertical':'horizontal')+' line at '+letter+' = '+v+', shade '+side,
          (solid?'Solid':'Broken')+' '+(vert?'vertical':'horizontal')+' line at '+letter+' = '+v+', shade '+
            (vert?(gt?'left':'right'):(gt?'below':'above')),
          (solid?'Solid':'Broken')+' '+(vert?'horizontal':'vertical')+' line at '+(vert?'y':'x')+' = '+v+', shade '+side]);
        return {type:'mc', q:'On the Cartesian plane, how is '+letter+' '+op+' '+v+' shown?',
          options:o.options, answer:o.answer,
          hint:(solid?'“Or equal to” means a solid boundary':'A strict inequality means a broken boundary')+'; think about which side satisfies it.'};
      }},
      {gen:function(){
        var a=Q.int(2,5), m=Q.int(2,3), b=a*m, k=Q.int(1,4), x=b*k;
        var rhs=x/a+x/b;
        return {type:'text', q:'Solve '+f('x',a)+' + '+f('x',b)+' &lt; '+rhs+'. (write it like x&lt;6)',
          answer:Q.ineq('<',x),
          hint:'Multiply everything by '+b+': '+(b/a)+'x + x &lt; '+(b*rhs)+'.'};
      }},
      {gen:function(){
        var solid=Q.chance(0.5);
        var correct='the endpoint is '+(solid?'included':'excluded');
        var o=Q.mc(correct,['the endpoint is '+(solid?'excluded':'included'),
                            'the solution is negative','there is no solution']);
        return {type:'mc', q:'A'+(solid?' solid (filled)':'n open (unfilled)')+' circle on a number line tells you that…',
          options:o.options, answer:o.answer,
          hint:solid?'Filled = included, and matches ≤ or ≥.':'Open = not included, and matches &lt; or &gt;.'};
      }},
    ]
  });

  set('3.6.3', {
    notes:[
      {h:'What “simultaneous” means', html:
        '<p>A single equation with two unknowns has endlessly many solutions: x + y = 10 is true for (1, 9), (2, 8), (4.5, 5.5)…</p>'+
        '<p><b>Simultaneous equations</b> are two equations that must both be true <i>at the same time</i>. Together they usually pin down exactly one pair (x, y).</p>'+
        '<div class="formula">x + y = 10&nbsp;&nbsp;and&nbsp;&nbsp;x − y = 4&nbsp;&nbsp;→&nbsp;&nbsp;x = 7, y = 3</div>'+
        '<p>Graphically, each equation is a straight line and the solution is the <b>point where they cross</b>.</p>'},
      {h:'Method 1 — elimination', html:
        '<p>Get one variable to have the same size coefficient in both equations, then add or subtract to make it vanish.</p>'+
        '<div class="formula">Same sign → <b>SUBTRACT</b>&nbsp;&nbsp;·&nbsp;&nbsp;Different signs → <b>ADD</b><br>(remember: <b>S</b>ame <b>S</b>igns <b>S</b>ubtract)</div>'+
        '<p>3x + 2y = 14 … (1)<br>3x − y = 2 …… (2)</p>'+
        '<p>The x coefficients match with the same sign, so subtract: (1) − (2) gives 3y = 12, so y = 4.</p>'+
        '<p>Put y = 4 back into the simpler equation (2): 3x − 4 = 2 → 3x = 6 → <b>x = 2</b>. Always check in the <i>other</i> equation: 3(2) + 2(4) = 14 ✓</p>'+
        '<p>If neither coefficient matches, multiply one or both equations first: to solve 2x + 3y = 12 and x + y = 5, double the second to get 2x + 2y = 10, then subtract.</p>'},
      {h:'Method 2 — substitution', html:
        '<p>Best when one equation already has a variable on its own.</p>'+
        '<p>y = 2x + 1 …… (1)<br>3x + y = 11 … (2)</p>'+
        '<ol><li>Replace y in (2) with 2x + 1: 3x + (2x + 1) = 11.</li>'+
        '<li>Solve: 5x + 1 = 11 → 5x = 10 → x = 2.</li>'+
        '<li>Back-substitute into (1): y = 2(2) + 1 = 5.</li>'+
        '<li>Solution: x = 2, y = 5. Check in (2): 3(2) + 5 = 11 ✓</li></ol>'},
      {h:'Word problems', html:
        '<p>Two unknowns need two facts. Name both unknowns, then write one equation per fact.</p>'+
        '<p><i>"3 pens and 2 books cost $31. 1 pen and 4 books cost $37."</i></p>'+
        '<p>Let a pen cost p and a book cost b:<br>3p + 2b = 31 and p + 4b = 37.</p>'+
        '<p>Double the first: 6p + 4b = 62. Subtract the second: 5p = 25 → p = 5, so b = 8. <b>A pen costs $5 and a book $8.</b></p>'},
    ],
    examples:[
      {q:'Solve simultaneously by elimination: x + y = 9 and x − y = 3.', answer:'x = 6, y = 3',
       steps:['The y coefficients are +1 and −1 — different signs, so ADD the equations.',
              '(x + y) + (x − y) = 9 + 3 → 2x = 12 → x = 6.',
              'Substitute x = 6 into the first: 6 + y = 9 → y = 3.',
              'Check in the second: 6 − 3 = 3 ✓']},
      {q:'Solve by substitution: y = 2x + 1 and 3x + y = 11.', answer:'x = 2, y = 5',
       steps:['The first equation gives y on its own, so substitute it into the second.',
              '3x + (2x + 1) = 11 → 5x + 1 = 11.','5x = 10, so x = 2.',
              'Back-substitute: y = 2(2) + 1 = 5.','Check: 3(2) + 5 = 11 ✓']},
    ],
    practice:[
      {gen:function(){
        var x=Q.int(3,12), y=Q.int(1,x-1);
        return {type:'text', q:'Solve x + y = '+(x+y)+' and x − y = '+(x-y)+'. What is the value of x?',
          answer:Q.root(x), hint:'Add the two equations to eliminate y.'};
      }},
      {gen:function(){
        var x=Q.int(3,12), y=Q.int(1,x-1);
        return {type:'text', q:'Solve x + y = '+(x+y)+' and x − y = '+(x-y)+'. What is the value of y?',
          answer:Q.root(y,'y'), hint:'Add to find x first, then substitute back into x + y = '+(x+y)+'.'};
      }},
      {gen:function(){
        var a=Q.int(2,5), x=Q.int(2,9), y=Q.int(1,9);
        return {type:'text', q:'Solve '+a+'x + y = '+(a*x+y)+' and x + y = '+(x+y)+'. What is x?',
          answer:Q.root(x), hint:'Same signs on y — subtract one equation from the other.'};
      }},
      {gen:function(){
        var add=Q.chance(0.5);
        var correct='are equal with '+(add?'opposite signs':'the same sign');
        var o=Q.mc(correct, ['are equal with '+(add?'the same sign':'opposite signs'),
                             'are both even','are both 1']);
        return {type:'mc', q:'When eliminating, you should '+(add?'ADD':'SUBTRACT')+
          ' the two equations when the matching coefficients…',
          options:o.options, answer:o.answer, hint:'Same Signs Subtract — so different signs means add.'};
      }},
      {gen:function(){
        var a=Q.int(2,5), b=Q.int(2,5), x=Q.int(2,9), y=Q.int(1,6);
        return {type:'text', q:'Solve '+a+'x + '+b+'y = '+(a*x+b*y)+' and y = '+y+'. What is x?',
          answer:Q.root(x), hint:'Substitute y = '+y+' straight in: '+a+'x + '+(b*y)+' = '+(a*x+b*y)+'.'};
      }},
      {gen:function(){
        var big=Q.int(8,25), small=Q.int(2,big-2);
        return {type:'text', q:'Two numbers add to '+(big+small)+' and differ by '+(big-small)+'. What is the LARGER number?',
          answer:[String(big)],
          hint:'x + y = '+(big+small)+' and x − y = '+(big-small)+'. Add them to get 2x = '+(2*big)+'.'};
      }},
    ]
  });

  set('3.6.4', {
    notes:[
      {h:'Base and exponent', html:
        '<p>In the index form <b>b<sup>a</sup></b>, the number b is the <b>base</b> and a is the <b>exponent</b> (or index, or power).</p>'+
        '<div class="formula">2<sup>5</sup> = 2 × 2 × 2 × 2 × 2 = 32&nbsp;&nbsp;→ base 2, exponent 5</div>'+
        '<p>The exponent tells you how many copies of the base are multiplied together. Read 3<sup>4</sup> as "3 to the power 4" — it is 81, not 12.</p>'+
        '<p>The same works with letters: x<sup>3</sup> means x × x × x, and 5a<sup>2</sup> means 5 × a × a.</p>'},
      {h:'The laws of indices', html:
        '<p>These only work when the <b>bases are the same</b>.</p>'+
        '<div class="formula">'+
        '<b>Multiply</b> → add the powers: a<sup>m</sup> × a<sup>n</sup> = a<sup>m+n</sup><br>'+
        '<b>Divide</b> → subtract the powers: a<sup>m</sup> ÷ a<sup>n</sup> = a<sup>m−n</sup><br>'+
        '<b>Power of a power</b> → multiply: (a<sup>m</sup>)<sup>n</sup> = a<sup>mn</sup><br>'+
        '<b>Zero index</b>: a<sup>0</sup> = 1 (for any a ≠ 0)<br>'+
        '<b>Negative index</b>: a<sup>−n</sup> = '+f('1','a<sup>n</sup>')+
        '</div>'+
        '<p>Why is a<sup>0</sup> = 1? Because a<sup>3</sup> ÷ a<sup>3</sup> = a<sup>0</sup>, and anything divided by itself is 1.</p>'},
      {h:'Applying them', html:
        '<p>Deal with the numbers and each letter separately.</p>'+
        '<p>(3x<sup>2</sup>)<sup>3</sup> = 3<sup>3</sup> × (x<sup>2</sup>)<sup>3</sup> = <b>27x<sup>6</sup></b> — the power outside hits <i>everything</i> inside.</p>'+
        '<p>'+f('12a<sup>5</sup>b<sup>3</sup>','4a<sup>2</sup>b')+' = 3a<sup>5−2</sup>b<sup>3−1</sup> = <b>3a<sup>3</sup>b<sup>2</sup></b></p>'+
        '<p><b>Careful:</b> you cannot add indices when the bases differ. 2<sup>3</sup> × 5<sup>2</sup> must be worked out as 8 × 25 = 200.</p>'},
    ],
    examples:[
      {q:'Simplify 2<sup>5</sup> × 2<sup>3</sup> ÷ 2<sup>6</sup>, leaving your answer as a whole number.', answer:'4',
       steps:['Same base, so use the laws. Multiplying adds: 2<sup>5</sup> × 2<sup>3</sup> = 2<sup>8</sup>.',
              'Dividing subtracts: 2<sup>8</sup> ÷ 2<sup>6</sup> = 2<sup>8−6</sup> = 2<sup>2</sup>.',
              '2<sup>2</sup> = 4.']},
      {q:'Simplify (3x<sup>2</sup>)<sup>3</sup>.', answer:'27x<sup>6</sup>',
       steps:['The outside power applies to every factor inside: 3<sup>3</sup> × (x<sup>2</sup>)<sup>3</sup>.',
              '3<sup>3</sup> = 27.','(x<sup>2</sup>)<sup>3</sup> = x<sup>2×3</sup> = x<sup>6</sup>.',
              'Answer: 27x<sup>6</sup>.']},
    ],
    practice:[
      {gen:function(){
        var b=Q.pick([2,3,5]), m=Q.int(1,3), n=Q.int(1,3);
        if(b===5&&m+n>3) n=1;
        return {type:'text', q:'Evaluate '+Q.pow(b,m)+' × '+Q.pow(b,n)+' as a whole number.',
          answer:[String(Math.pow(b,m+n))], hint:'Add the powers first: '+Q.pow(b,m+n)+'.'};
      }},
      {gen:function(){
        var v=Q.pick(['x','a','m','p']), m=Q.int(4,9), n=Q.int(1,m-2);
        return {type:'text', q:'Simplify '+Q.pow(v,m)+' ÷ '+Q.pow(v,n)+'. (write it like '+v+'^3)',
          answer:[v+'^'+(m-n)], hint:'Dividing means subtract the powers.'};
      }},
      {gen:function(){
        var b=Q.int(2,12);
        var o=Q.mc('1',['0',String(b),'undefined']);
        return {type:'mc', q:'What is the value of '+Q.pow(b,0)+'?', options:o.options, answer:o.answer,
          hint:'Anything (except 0) to the power zero is 1.'};
      }},
      {gen:function(){
        var v=Q.pick(['y','b','t','k']), m=Q.int(2,5), n=Q.int(2,5);
        return {type:'text', q:'Simplify ('+Q.pow(v,m)+')'+Q.sup(n)+'. (write it like '+v+'^12)',
          answer:[v+'^'+(m*n)], hint:'A power of a power — multiply the indices.'};
      }},
      {gen:function(){
        var b=Q.int(2,6), n=Q.int(2,3);
        return {type:'text', q:'Write '+b+Q.sup('-'+n)+' as a fraction. (write it like 1/9)',
          answer:['1/'+Math.pow(b,n)],
          hint:'A negative index means the reciprocal: 1 over '+Q.pow(b,n)+'.'};
      }},
      {gen:function(){
        var b=Q.int(2,7), m=Q.int(2,6), n=Q.int(2,6);
        var o=Q.mc(Q.pow(b,m+n), [Q.pow(b,m*n), Q.pow(b*b,m+n), Q.pow(b,Math.abs(m-n))]);
        return {type:'mc', q:'Simplify '+Q.pow(b,m)+' × '+Q.pow(b,n)+'.', options:o.options, answer:o.answer,
          hint:'Same base, multiplying — add the indices.'};
      }},
    ]
  });

  set('3.6.5', {
    notes:[
      {h:'Multiplying two binomials', html:
        '<p>A <b>binomial</b> has two terms, like (x + 3). To multiply two of them, every term in the first bracket must multiply every term in the second — four products in all.</p>'+
        '<div class="formula"><b>F</b>irst · <b>O</b>uter · <b>I</b>nner · <b>L</b>ast<br>(x + 3)(x − 5) = x² − 5x + 3x − 15 = x² − 2x − 15</div>'+
        '<p>Then collect the like terms in the middle. Two special results worth memorising:</p>'+
        '<ul><li>(a + b)(a − b) = a² − b² &nbsp;(<i>difference of two squares</i> — the middle terms cancel)</li>'+
        '<li>(a + b)² = a² + 2ab + b² &nbsp;(<b>not</b> a² + b²!)</li></ul>'},
      {h:'The LCM of algebraic expressions', html:
        '<p>The LCM must contain every factor, each to its <b>highest</b> power appearing in any expression.</p>'+
        '<ul><li>LCM of 4x and 6x²: numbers → LCM(4, 6) = 12; letters → highest power is x²; so <b>12x²</b>.</li>'+
        '<li>LCM of 3ab and 2b²: <b>6ab²</b>.</li>'+
        '<li>LCM of (x + 1) and (x + 2): they share no factor, so <b>(x + 1)(x + 2)</b>.</li></ul>'+
        '<p>You need this whenever you add algebraic fractions or clear denominators.</p>'},
      {h:'Simplifying products and quotients', html:
        '<p><b>Products</b> — multiply the numbers, then add indices for each common base.</p>'+
        '<p>(2x)(3x²) = 6x³ &nbsp;·&nbsp; (4a²b)(3ab³) = 12a³b⁴</p>'+
        '<h3>Quotients with a monomial denominator</h3>'+
        '<p>Divide <b>every</b> term on top by the bottom.</p>'+
        '<p>'+f('x² + 5x','x')+' = '+f('x²','x')+' + '+f('5x','x')+' = x + 5</p>'+
        '<h3>Quotients with a binomial denominator</h3>'+
        '<p><b>Factorise first</b>, then cancel the common factor. You may only cancel <i>factors</i>, never individual terms.</p>'+
        '<div class="formula">'+f('x² − 9','x + 3')+' = '+f('(x + 3)(x − 3)','x + 3')+' = x − 3</div>'},
    ],
    examples:[
      {q:'Expand and simplify (x + 3)(x − 5).', answer:'x² − 2x − 15',
       steps:['First: x × x = x².','Outer: x × (−5) = −5x.','Inner: 3 × x = 3x.','Last: 3 × (−5) = −15.',
              'Collect the middle terms: −5x + 3x = −2x.','Answer: x² − 2x − 15.']},
      {q:'Simplify '+f('x² − 9','x + 3')+'.', answer:'x − 3',
       steps:['The numerator is a difference of two squares: x² − 9 = x² − 3².',
              'Factorise it: (x + 3)(x − 3).',
              'The expression becomes '+f('(x + 3)(x − 3)','x + 3')+'.',
              'Cancel the common factor (x + 3): the answer is x − 3.']},
    ],
    practice:[
      {gen:function(){
        var a=Q.int(1,9), b=Q.int(1,9);
        return {type:'text', q:'Expand and simplify (x + '+a+')(x + '+b+'). (write it like x^2+7x+10)',
          answer:[Q.polyAns([[1,'x²'],[a+b,'x'],[a*b,'']])],
          hint:'FOIL, then collect '+b+'x + '+a+'x.'};
      }},
      {gen:function(){
        var a=Q.int(2,10);
        return {type:'text', q:'Expand and simplify (x − '+a+')(x + '+a+'). (write it like x^2-16)',
          answer:[Q.polyAns([[1,'x²'],[-a*a,'']])],
          hint:'Difference of two squares — the middle terms cancel.'};
      }},
      {gen:function(){
        var k=Q.int(2,6), q=Q.int(2,5), m=Q.int(2,5), n=Q.int(1,3);
        // (k*q) a^(m+n) b^n ÷ (k a^n b^n)  =  q a^m
        return {type:'text', q:'Simplify '+(k*q)+Q.pow('a',m+n)+Q.pow('b',n)+' ÷ '+k+Q.pow('a',n)+Q.pow('b',n)+
            '. (write it like 4a^2)',
          answer:[q+'a^'+m],
          hint:(k*q)+' ÷ '+k+' = '+q+'; subtract the indices for a and for b.'};
      }},
      {gen:function(){
        var p=Q.pick([[4,6,12],[6,9,18],[4,10,20],[6,8,24],[3,4,12],[8,12,24],[5,10,10]]);
        var o=Q.mc(p[2]+'x²', [p[0]*p[1]+'x³', p[2]+'x', Q.gcd(p[0],p[1])+'x']);
        return {type:'mc', q:'What is the LCM of '+p[0]+'x and '+p[1]+'x²?', options:o.options, answer:o.answer,
          hint:'LCM of '+p[0]+' and '+p[1]+', then the highest power of x.'};
      }},
      {gen:function(){
        var a=Q.int(2,9);
        return {type:'text', q:'Simplify '+f('x² + '+a+'x','x')+'. (write it like x+5)',
          answer:['x+'+a], hint:'Divide each term on the top by x.'};
      }},
      {gen:function(){
        var a=Q.int(2,6), b=Q.int(2,6), n=Q.int(2,4);
        var o=Q.mc(a*b+'x'+Q.sup(n+1), [a*b+'x'+Q.sup(n), (a+b)+'x'+Q.sup(n+1), a*b+'x'+Q.sup(n+2)]);
        return {type:'mc', q:'Simplify ('+a+'x)('+b+'x'+Q.sup(n)+').', options:o.options, answer:o.answer,
          hint:'Multiply '+a+' × '+b+', then add the indices of x.'};
      }},
    ]
  });

  set('3.6.6', {
    notes:[
      {h:'Factorising is expanding in reverse', html:
        '<p>Expanding turns 3(x + 4) into 3x + 12. <b>Factorising</b> turns 3x + 12 back into 3(x + 4).</p>'+
        '<p>You are looking for what the terms have <b>in common</b>, and putting it outside a bracket.</p>'+
        '<p>Always check your answer by expanding it again.</p>'},
      {h:'Two terms — the highest common factor', html:
        '<p>Find the HCF of the numbers <i>and</i> the lowest power of each shared letter.</p>'+
        '<p>6x²y − 9xy²:</p>'+
        '<ul><li>Numbers: HCF(6, 9) = 3.</li>'+
        '<li>Letters: both terms contain x and y — lowest powers are x¹ and y¹.</li>'+
        '<li>So the HCF is 3xy.</li></ul>'+
        '<div class="formula">6x²y − 9xy² = 3xy(2x − 3y)</div>'+
        '<p>Divide each original term by the HCF to find what goes inside the bracket.</p>'+
        '<p>Also spot the <b>difference of two squares</b>: a² − b² = (a + b)(a − b), so x² − 16 = (x + 4)(x − 4).</p>'},
      {h:'Four terms — factorising by grouping', html:
        '<p>Split into two pairs, factorise each pair, then take out the bracket they share.</p>'+
        '<div class="formula">ax + ay + bx + by<br>= a(x + y) + b(x + y)&nbsp;&nbsp;← both pairs give (x + y)<br>= (a + b)(x + y)</div>'+
        '<p>If the shared bracket does not appear, try pairing the terms differently.</p>'+
        '<p>Careful with a minus: 2x − 2y + ax − ay = 2(x − y) + a(x − y) = (2 + a)(x − y).</p>'},
      {h:'Three terms', html:
        '<p>A trinomial x² + bx + c factorises into (x + p)(x + q) where <b>p × q = c</b> and <b>p + q = b</b>.</p>'+
        '<p>x² + 7x + 12: which two numbers multiply to 12 and add to 7? 3 and 4 → <b>(x + 3)(x + 4)</b>.</p>'+
        '<p>This is covered fully in the Quadratics topic — always take out a common factor first if there is one.</p>'},
    ],
    examples:[
      {q:'Factorise 6x²y − 9xy².', answer:'3xy(2x − 3y)',
       steps:['HCF of 6 and 9 is 3.','Both terms contain x and y, to at least the first power, so xy comes out too.',
              'The HCF is 3xy.','6x²y ÷ 3xy = 2x, and −9xy² ÷ 3xy = −3y.',
              'Answer: 3xy(2x − 3y). Check by expanding ✓']},
      {q:'Factorise ax + ay + bx + by.', answer:'(a + b)(x + y)',
       steps:['Group into pairs: (ax + ay) + (bx + by).',
              'Factorise the first pair: a(x + y).','Factorise the second pair: b(x + y).',
              'Both share the bracket (x + y), so take it out: (x + y)(a + b).']},
    ],
    practice:[
      {gen:function(){
        var k=Q.int(2,9), c=Q.int(2,9), v=Q.pick(['x','a','m']);
        return {type:'text', q:'Factorise '+k+v+' + '+(k*c)+'. (write it like 5(x+3))',
          answer:[k+'('+v+'+'+c+')'], hint:'The HCF of '+k+v+' and '+(k*c)+' is '+k+'.'};
      }},
      {gen:function(){
        var c=Q.int(2,9), v=Q.pick(['x','y','n']);
        return {type:'text', q:'Factorise '+v+'² − '+c+v+'. (write it like x(x-4))',
          answer:[v+'('+v+'-'+c+')'], hint:'Both terms contain a'+(v==='x'?'n ':' ')+v+'.'};
      }},
      {gen:function(){
        var h=Q.int(2,6), p=Q.int(2,5), q=Q.int(2,5);
        if(p===q) q=p+1;
        return {type:'text', q:'Factorise '+(h*p)+'a²b + '+(h*q)+'ab². (write it like 4ab(2a+3b))',
          answer:[h+'ab('+p+'a+'+q+'b)'],
          hint:'HCF of '+(h*p)+' and '+(h*q)+' is '+h+'; both terms have ab.'};
      }},
      {gen:function(){
        var k=Q.int(2,7), v=Q.pick(['a','b','c','p']);
        var o=Q.mc('('+k+' + '+v+')(x + y)',
          ['('+k+'x + '+v+')(y + '+k+')', k+v+'(x + y)', '('+k+' + x)('+v+' + y)']);
        return {type:'mc', q:'Factorise '+k+'x + '+k+'y + '+v+'x + '+v+'y by grouping.',
          options:o.options, answer:o.answer, hint:k+'(x + y) + '+v+'(x + y).'};
      }},
      {gen:function(){
        var k=Q.int(2,6), c=Q.int(2,9), v=Q.pick(['m','t','k']);
        return {type:'text', q:'Factorise '+k+v+'² − '+(k*c)+v+'. (write it like 3m(m-4))',
          answer:[k+v+'('+v+'-'+c+')'], hint:'HCF is '+k+v+'.'};
      }},
      {gen:function(){
        var h=Q.int(2,6), p=Q.coprime(), a=h*p[0], b=h*p[1];
        var o=Q.mc(h+'x', [h+'x²', Q.lcm(a,b)+'x²', 'x']);
        return {type:'mc', q:'What is the HCF of '+a+'x² and '+b+'x?', options:o.options, answer:o.answer,
          hint:'HCF of '+a+' and '+b+', then the LOWEST power of x.'};
      }},
    ]
  });

  set('3.6.7', {
    notes:[
      {h:'What makes it quadratic', html:
        '<p>A <b>quadratic expression</b> has a squared variable and nothing higher:</p>'+
        '<div class="formula">ax² + bx + c&nbsp;&nbsp;(a ≠ 0)</div>'+
        '<p>In x² − 5x + 6, a = 1, b = −5 and c = 6.</p>'+
        '<p>An <b>expression</b> (x² − 5x + 6) can be factorised. An <b>equation</b> (x² − 5x + 6 = 0) can be solved — and a quadratic equation usually has <b>two</b> solutions.</p>'},
      {h:'Factorising x² + bx + c', html:
        '<p>Find two numbers that <b>multiply to c</b> and <b>add to b</b>.</p>'+
        '<p>x² + 7x + 12: factor pairs of 12 are 1×12, 2×6, 3×4. Which pair adds to 7? <b>3 and 4</b>.</p>'+
        '<div class="formula">x² + 7x + 12 = (x + 3)(x + 4)</div>'+
        '<p>Signs are the giveaway:</p>'+
        '<ul><li>c positive, b positive → both numbers positive: x² + 5x + 6 = (x + 2)(x + 3)</li>'+
        '<li>c positive, b negative → both negative: x² − 5x + 6 = (x − 2)(x − 3)</li>'+
        '<li>c negative → one of each sign: x² + x − 6 = (x + 3)(x − 2)</li></ul>'},
      {h:'The difference of two squares', html:
        '<p>When there is no middle term and both parts are perfect squares:</p>'+
        '<div class="formula">a² − b² = (a + b)(a − b)</div>'+
        '<p>x² − 9 = (x + 3)(x − 3) &nbsp;·&nbsp; 4x² − 25 = (2x + 5)(2x − 5)</p>'+
        '<p>Note that a² + b² does <b>not</b> factorise — the minus is essential.</p>'},
      {h:'Solving by factorisation', html:
        '<p>The whole method rests on one fact — the <b>null factor law</b>:</p>'+
        '<div class="formula">If P × Q = 0, then P = 0 or Q = 0.</div>'+
        '<ol><li>Rearrange so that one side is <b>zero</b>.</li>'+
        '<li>Factorise the quadratic.</li>'+
        '<li>Set <b>each</b> bracket equal to zero.</li>'+
        '<li>Solve each little equation.</li></ol>'+
        '<p>x² − 5x + 6 = 0 → (x − 2)(x − 3) = 0 → x − 2 = 0 or x − 3 = 0 → <b>x = 2 or x = 3</b>.</p>'+
        '<p>For x² − k² = 0: x² = k², so x = k <b>or</b> x = −k. Do not lose the negative root.</p>'},
    ],
    examples:[
      {q:'Factorise x² + 7x + 12.', answer:'(x + 3)(x + 4)',
       steps:['We need two numbers that multiply to +12 and add to +7.',
              'Pairs for 12: 1 and 12 (sum 13), 2 and 6 (sum 8), 3 and 4 (sum 7) ✓',
              'So the numbers are 3 and 4.','x² + 7x + 12 = (x + 3)(x + 4). Check by expanding ✓']},
      {q:'Solve x² − 5x + 6 = 0.', answer:'x = 2 or x = 3',
       steps:['One side is already zero, so factorise the left.',
              'Two numbers multiplying to +6 and adding to −5: −2 and −3.',
              '(x − 2)(x − 3) = 0.',
              'By the null factor law, x − 2 = 0 or x − 3 = 0.',
              'So x = 2 or x = 3. Check x = 2: 4 − 10 + 6 = 0 ✓']},
    ],
    practice:[
      {gen:function(){
        var p=Q.int(1,8), q=Q.int(1,8);
        return {type:'text', q:'Factorise '+Q.polyHtml([[1,'x²'],[p+q,'x'],[p*q,'']])+'. (write it like (x+2)(x+3))',
          answer:['(x+'+p+')(x+'+q+')','(x+'+q+')(x+'+p+')'],
          hint:'Two numbers multiplying to '+(p*q)+' and adding to '+(p+q)+'.'};
      }},
      {gen:function(){
        var k=Q.int(2,12);
        return {type:'text', q:'Factorise x² − '+(k*k)+'. (write it like (x+3)(x-3))',
          answer:['(x+'+k+')(x-'+k+')','(x-'+k+')(x+'+k+')'],
          hint:'Difference of two squares: '+(k*k)+' = '+k+'².'};
      }},
      {gen:function(){
        var k=Q.int(2,12);
        var o=Q.mc('x = '+k+' or x = −'+k, ['x = '+k+' only','x = '+(k*k),'x = −'+k+' only']);
        return {type:'mc', q:'Solve x² − '+(k*k)+' = 0.', options:o.options, answer:o.answer,
          hint:'x² = '+(k*k)+' has two square roots.'};
      }},
      {gen:function(){
        var b=Q.int(2,12);
        return {type:'text', q:'Solve x² + '+b+'x = 0. Give the NEGATIVE root.',
          answer:Q.root(-b), hint:'Factorise to x(x + '+b+') = 0, then set each factor to zero.'};
      }},
      {gen:function(){
        var p=Q.int(1,7), q=Q.int(p+1,9);
        return {type:'text', q:'Solve '+Q.polyHtml([[1,'x²'],[-(p+q),'x'],[p*q,'']])+
            ' = 0. Give both roots separated by a comma, smaller first (e.g. 2,5).',
          answer:[p+','+q], hint:'Two numbers multiplying to '+(p*q)+' and adding to −'+(p+q)+'.'};
      }},
      {gen:function(){
        var a=Q.int(2,9), b=Q.int(2,9);
        var o=Q.mc('x² − '+a+'x = 0', ['x² − '+a+'x', b+'x + '+a+' = 0', b+'x² + x − '+a]);
        return {type:'mc', q:'Which of these is a quadratic EQUATION?', options:o.options, answer:o.answer,
          hint:'It needs an x² term AND an equals sign.'};
      }},
    ]
  });

})();
