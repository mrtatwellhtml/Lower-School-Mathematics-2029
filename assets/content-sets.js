/* Full content for the Sets, Relations & Functions strand (Forms 1-3).
   Same pattern as the other content files. Loaded after data.js and qgen.js.
   Diagram primitives (dia/ln/txt/circ/rect) come from QG — see qgen.js. */
(function(){
  var C=window.CURRICULUM; if(!C) return;
  var Q=window.QG;
  var INK=Q.INK, ACC=Q.ACC, FILL=Q.FILL;
  var dia=Q.dia, ln=Q.ln, txt=Q.txt, circ=Q.circ, rect=Q.rect;
  function f(a,b){ return '<span class="frac"><span>'+a+'</span><span>'+b+'</span></span>'; }
  function set(code,content){ if(C[code]) C[code].content=content; }

  /* A two-set Venn diagram with the four region counts filled in.
     Pass null for any count to leave the region blank. */
  function venn2(onlyA,both,onlyB,outside,nameA,nameB){
    return dia(320,180,
      rect(8,8,304,164,'#fff')+
      circ(120,95,68,FILL)+circ(200,95,68,'rgba(43,127,212,0.12)')+
      txt(72,20,nameA||'A',ACC,14)+txt(250,20,nameB||'B',ACC,14)+
      txt(24,26,'U',INK,13)+
      (onlyA!=null?txt(90,101,String(onlyA)):'')+
      (both!=null?txt(160,101,String(both)):'')+
      (onlyB!=null?txt(230,101,String(onlyB)):'')+
      (outside!=null?txt(290,160,String(outside)):''));
  }

  /* ============================ FORM 1 ============================ */

  set('1.2.1', {
    notes:[
      {h:'What a set is', html:
        '<p>A <b>set</b> is a well-defined collection of things. Each thing in it is an <b>element</b> (or member).</p>'+
        '<p>Two ways to define one:</p>'+
        '<ul><li><b>Listing</b> the elements inside curly brackets: A = {2, 4, 6, 8}</li>'+
        '<li><b>Describing</b> them in words: A = {even numbers between 1 and 9}</li></ul>'+
        '<div class="formula">∈ means "is an element of"&nbsp;·&nbsp;∉ means "is not an element of"<br>'+
        'n(A) means "the number of elements in A"</div>'+
        '<p>So for A = {2, 4, 6, 8}: 4 ∈ A, 5 ∉ A, and n(A) = 4.</p>'+
        '<p>Order does not matter and repeats are not counted: {1, 2, 2, 3} is just {1, 2, 3}.</p>'},
      {h:'Types of set', html:
        '<ul><li><b>Empty</b> (null) set — no elements at all. Written { } or ∅. Example: {months with 40 days}.</li>'+
        '<li><b>Finite</b> — you could finish counting it: {days of the week}.</li>'+
        '<li><b>Infinite</b> — the counting never ends: {whole numbers}.</li>'+
        '<li><b>Equal</b> sets — exactly the same elements: {1,2,3} = {3,2,1}.</li>'+
        '<li><b>Equivalent</b> sets — the same <i>number</i> of elements, but not necessarily the same ones: {a,b,c} and {1,2,3}.</li></ul>'+
        '<p>Equal is stronger than equivalent: equal sets are always equivalent, but not the other way round.</p>'},
      {h:'Relationships between sets', html:
        '<ul><li><b>Universal set (U)</b> — everything under discussion in that problem.</li>'+
        '<li><b>Complement (A′)</b> — everything in U that is <i>not</i> in A.</li>'+
        '<li><b>Union (A ∪ B)</b> — everything in A <b>or</b> B (or both). Think "all of it".</li>'+
        '<li><b>Intersection (A ∩ B)</b> — only what is in <b>both</b>. Think "the overlap".</li>'+
        '<li><b>Subset (A ⊂ B)</b> — every element of A is also in B.</li>'+
        '<li><b>Disjoint</b> — no elements in common, so A ∩ B = ∅ and the circles do not overlap.</li></ul>'+
        '<p>With A = {1,2,3,4} and B = {3,4,5}: A ∪ B = {1,2,3,4,5} and A ∩ B = {3,4}.</p>'},
      {h:'Venn diagrams', html:
        '<p>A <b>Venn diagram</b> shows sets as circles inside a rectangle (the universal set). The overlap is the intersection.</p>'+
        venn2(null,null,null,null,'A','B')+
        '<p>The left-only region is "A but not B", the middle is A ∩ B, the right-only region is "B but not A", and the space outside both circles is everything in neither — that is (A ∪ B)′.</p>'},
    ],
    examples:[
      {q:'A = {1,2,3,4,5} and B = {4,5,6,7}. Find A ∪ B, A ∩ B and n(A ∪ B).',
       answer:'A ∪ B = {1,2,3,4,5,6,7}, A ∩ B = {4,5}, n(A ∪ B) = 7',
       steps:['Union: put everything from both sets together, listing each element once → {1,2,3,4,5,6,7}.',
              'Intersection: only the elements in BOTH → 4 and 5 are in each, so {4,5}.',
              'n(A ∪ B) counts the union: 7 elements.']},
      {q:'U = {1,2,3,...,10} and A = {even numbers in U}. Find A′.',
       answer:"A′ = {1,3,5,7,9}",
       steps:['A = {2,4,6,8,10}.','The complement A′ is everything in U that is not in A.',
              'Removing the evens leaves the odds: {1,3,5,7,9}.']},
    ],
    practice:[
      {gen:function(){
        var pool=Q.shuffle([1,2,3,4,5,6,7,8,9,10,11,12]);
        var A=Q.shuffle(pool.slice(0,Q.int(3,5))).sort(function(a,b){return a-b;});
        var inA=Q.chance(0.5);
        var el=inA?Q.pick(A):Q.pick(pool.filter(function(x){return A.indexOf(x)<0;}));
        return {type:'text', q:'A = {'+A.join(', ')+'}. Is '+el+
            ' an element of A? (answer yes or no)',
          answer:[inA?'yes':'no'], hint:'∈ means "is an element of" — just check the list.'};
      }},
      {gen:function(){
        var n=Q.int(3,7), A=Q.sample([1,2,3,4,5,6,7,8,9,10,11,12,13,14],n).sort(function(a,b){return a-b;});
        return {type:'text', q:'A = {'+A.join(', ')+'}. Find n(A).',
          answer:[String(n)], hint:'n(A) is simply the number of elements in A.'};
      }},
      {gen:function(){
        var both=Q.sample([3,4,5,6,7],Q.int(1,2));
        var onlyA=Q.sample([1,2,11,12],Q.int(1,2)), onlyB=Q.sample([8,9,10,13],Q.int(1,2));
        var A=onlyA.concat(both).sort(function(a,b){return a-b;});
        var B=onlyB.concat(both).sort(function(a,b){return a-b;});
        var wantUnion=Q.chance(0.5);
        var ans=wantUnion?A.concat(onlyB).sort(function(a,b){return a-b;}):both.slice().sort(function(a,b){return a-b;});
        return {type:'text', q:'A = {'+A.join(', ')+'} and B = {'+B.join(', ')+'}. List A '+
            (wantUnion?'∪':'∩')+' B. (write the numbers separated by commas, smallest first)',
          answer:[ans.join(','), '{'+ans.join(',')+'}'],
          hint:wantUnion?'The union is everything in either set, each listed once.'
                        :'The intersection is only what appears in BOTH sets.'};
      }},
      {gen:function(){
        var kinds=[['{months of the year with 40 days}','an empty set'],
                   ['{days of the week}','a finite set'],
                   ['{whole numbers}','an infinite set'],
                   ['{multiples of 5}','an infinite set'],
                   ['{letters of the alphabet}','a finite set'],
                   ['{triangles with four sides}','an empty set']];
        var k=Q.pick(kinds);
        var o=Q.mc(k[1], ['an empty set','a finite set','an infinite set'].filter(function(x){return x!==k[1];}));
        return {type:'mc', q:'What kind of set is '+k[0]+'?', options:o.options, answer:o.answer,
          hint:'Could you finish counting it? Is there anything in it at all?'};
      }},
      {gen:function(){
        var top=Q.int(8,14), U=[]; for(var i=1;i<=top;i++) U.push(i);
        var k=Q.int(3,Math.min(8,top-2));
        var rules=[['even numbers',function(x){return x%2===0;}],
                   ['odd numbers',function(x){return x%2===1;}],
                   ['multiples of 3',function(x){return x%3===0;}],
                   ['multiples of 4',function(x){return x%4===0;}],
                   ['numbers greater than '+k,function(x){return x>k;}],
                   ['numbers less than '+k,function(x){return x<k;}],
                   ['prime numbers',function(x){return [2,3,5,7,11,13].indexOf(x)>-1;}],
                   ['square numbers',function(x){return [1,4,9].indexOf(x)>-1;}]];
        var r=Q.pick(rules);
        var comp=U.filter(function(x){return !r[1](x);});
        return {type:'text', q:'U = {1, 2, 3, …, '+top+'} and A = {'+r[0]+' in U}. List A′ (the complement of A). '+
            '(numbers separated by commas, smallest first)',
          answer:[comp.join(','), '{'+comp.join(',')+'}'],
          hint:'A′ is everything in U that is NOT in A.'};
      }},
      {gen:function(){
        var eq=Q.chance(0.5);
        var o=Q.mc(eq?'equal':'equivalent', [eq?'equivalent':'equal','disjoint','empty']);
        return {type:'mc', q:'Two sets have '+(eq?'exactly the same elements':
            'the same NUMBER of elements, but different ones')+'. What are they called?',
          options:o.options, answer:o.answer,
          hint:'Equal means the same elements; equivalent means only the same count.'};
      }},
    ]
  });

  set('1.2.2', {
    notes:[
      {h:'Reading the four regions', html:
        '<p>Every two-set Venn diagram has exactly <b>four</b> regions. Label them and most problems solve themselves:</p>'+
        venn2('only A','both','only B','neither','A','B')+
        '<ul><li><b>only A</b> — in A but not B</li>'+
        '<li><b>both</b> — the overlap, A ∩ B</li>'+
        '<li><b>only B</b> — in B but not A</li>'+
        '<li><b>neither</b> — outside both circles</li></ul>'+
        '<div class="formula">n(U) = only A + both + only B + neither</div>'},
      {h:'Always fill in the overlap first', html:
        '<p>This is the one habit that makes these problems easy. The number given for a whole set <i>includes</i> the overlap, so:</p>'+
        '<div class="formula">only A = n(A) − n(A ∩ B)&nbsp;&nbsp;·&nbsp;&nbsp;only B = n(B) − n(A ∩ B)</div>'+
        '<p><i>30 students; 18 play football, 14 play cricket, 6 play both.</i></p>'+
        '<ul><li>Overlap = 6.</li>'+
        '<li>Football only = 18 − 6 = 12.</li>'+
        '<li>Cricket only = 14 − 6 = 8.</li>'+
        '<li>Neither = 30 − (12 + 6 + 8) = 4.</li></ul>'+
        venn2(12,6,8,4,'Football','Cricket')},
      {h:'Common questions', html:
        '<ul><li><b>"How many play at least one?"</b> → only A + both + only B (the union).</li>'+
        '<li><b>"How many play only one?"</b> → only A + only B (leave out the overlap).</li>'+
        '<li><b>"How many play neither?"</b> → total − union.</li></ul>'+
        '<p>Read the wording carefully: <i>"18 play football"</i> usually means 18 altogether including those who also play cricket, whereas <i>"18 play only football"</i> is the left region alone.</p>'},
    ],
    examples:[
      {q:'In a class of 30, 18 play football, 14 play cricket and 6 play both. How many play neither?',
       answer:'4 students',
       steps:['Fill the overlap first: 6 play both.',
              'Football only = 18 − 6 = 12. Cricket only = 14 − 6 = 8.',
              'At least one = 12 + 6 + 8 = 26.','Neither = 30 − 26 = 4.']},
      {q:'Using the same class, how many play only one of the two sports?', answer:'20 students',
       steps:['Football only = 12 and cricket only = 8.',
              '"Only one" means we leave out the 6 who play both.','12 + 8 = 20.']},
    ],
    practice:[
      {gen:function(){
        var both=Q.int(3,10), onlyA=Q.int(4,15), onlyB=Q.int(4,15), neither=Q.int(2,8);
        var total=onlyA+both+onlyB+neither;
        return {type:'text', q:'In a group of '+total+' people, '+(onlyA+both)+' like tea, '+(onlyB+both)+
            ' like coffee and '+both+' like both. How many like NEITHER?',
          answer:[String(neither)],
          hint:'Tea only = '+(onlyA+both)+' − '+both+' = '+onlyA+'. Do the same for coffee, add all three, subtract from '+total+'.'};
      }},
      {gen:function(){
        var both=Q.int(3,12), onlyA=Q.int(4,15), onlyB=Q.int(4,15);
        return {type:'text', q:'In a survey, '+(onlyA+both)+' students study French, '+(onlyB+both)+
            ' study Spanish and '+both+' study both. How many study AT LEAST ONE of the two?',
          answer:[String(onlyA+both+onlyB)],
          hint:'Use n(A ∪ B) = n(A) + n(B) − n(A ∩ B) = '+(onlyA+both)+' + '+(onlyB+both)+' − '+both+'.'};
      }},
      {gen:function(){
        var both=Q.int(3,12), onlyA=Q.int(4,15), onlyB=Q.int(4,15);
        return {type:'text', q:''+(onlyA+both)+' people own a dog, '+(onlyB+both)+' own a cat and '+both+
            ' own both. How many own ONLY a dog?',
          answer:[String(onlyA)],
          hint:'The '+(onlyA+both)+' includes the '+both+' who own both, so subtract.'};
      }},
      {gen:function(){
        var both=Q.int(2,9), onlyA=Q.int(3,12), onlyB=Q.int(3,12);
        return {type:'text', q:''+(onlyA+both)+' pupils play the piano, '+(onlyB+both)+' play the guitar and '+
            both+' play both. How many play ONLY ONE of the two instruments?',
          answer:[String(onlyA+onlyB)],
          hint:'Piano only = '+onlyA+', guitar only = '+onlyB+'. Leave out the overlap.'};
      }},
      {gen:function(){
        var o=Q.mc('the number in the overlap, A ∩ B',
          ['the total number of people','the number in neither set','the number in A only']);
        return {type:'mc', q:'When solving a two-set Venn diagram problem, what should you always fill in FIRST?',
          options:o.options, answer:o.answer,
          hint:'Every other region depends on it, because the set totals include it.'};
      }},
    ]
  });

  /* ============================ FORM 2 ============================ */

  set('2.2.1', {
    notes:[
      {h:'Counting a union', html:
        '<p>If you simply add n(A) and n(B), everything in the overlap gets counted <b>twice</b>. Take it off once:</p>'+
        '<div class="formula">n(A ∪ B) = n(A) + n(B) − n(A ∩ B)</div>'+
        '<p>With n(A) = 20, n(B) = 15 and n(A ∩ B) = 5: n(A ∪ B) = 20 + 15 − 5 = <b>30</b>.</p>'+
        '<p>The formula rearranges, so any one of the four values can be found from the other three:</p>'+
        '<div class="formula">n(A ∩ B) = n(A) + n(B) − n(A ∪ B)</div>'},
      {h:'Disjoint and subset cases', html:
        '<ul><li><b>Disjoint</b> sets have no overlap, so n(A ∩ B) = 0 and the formula collapses to n(A ∪ B) = n(A) + n(B).</li>'+
        '<li>If <b>A ⊂ B</b> (A sits entirely inside B) then A ∩ B = A, so n(A ∪ B) = n(B).</li></ul>'+
        '<p>Recognising these two special cases saves a lot of work.</p>'},
      {h:'Word problems with a "neither" group', html:
        '<p>When some members belong to neither set, the universal set is bigger than the union:</p>'+
        '<div class="formula">n(U) = n(A ∪ B) + n(neither)</div>'+
        '<p><i>40 people; 25 read novels, 18 read poetry, 5 read neither. How many read both?</i></p>'+
        '<ul><li>Union = 40 − 5 = 35.</li>'+
        '<li>n(A ∩ B) = 25 + 18 − 35 = <b>8</b>.</li></ul>'+
        venn2(17,8,10,5,'Novels','Poetry')},
    ],
    examples:[
      {q:'n(A) = 24, n(B) = 16 and n(A ∩ B) = 7. Find n(A ∪ B).', answer:'33',
       steps:['n(A ∪ B) = n(A) + n(B) − n(A ∩ B).','= 24 + 16 − 7.','= 40 − 7 = 33.']},
      {q:'In a group of 40, 25 read novels, 18 read poetry and 5 read neither. How many read both?',
       answer:'8 people',
       steps:['First find the union: 40 − 5 = 35 read at least one.',
              'Rearrange the formula: n(A ∩ B) = n(A) + n(B) − n(A ∪ B).',
              '= 25 + 18 − 35 = 8.',
              'Check: novels only 17, both 8, poetry only 10, neither 5 → 17+8+10+5 = 40 ✓']},
    ],
    practice:[
      {gen:function(){
        var both=Q.int(2,12), a=both+Q.int(3,15), b=both+Q.int(3,15);
        return {type:'text', q:'n(A) = '+a+', n(B) = '+b+' and n(A ∩ B) = '+both+'. Find n(A ∪ B).',
          answer:[String(a+b-both)],
          hint:'n(A ∪ B) = '+a+' + '+b+' − '+both+'.'};
      }},
      {gen:function(){
        var both=Q.int(2,12), a=both+Q.int(3,15), b=both+Q.int(3,15), union=a+b-both;
        return {type:'text', q:'n(A) = '+a+', n(B) = '+b+' and n(A ∪ B) = '+union+'. Find n(A ∩ B).',
          answer:[String(both)],
          hint:'Rearrange: n(A ∩ B) = n(A) + n(B) − n(A ∪ B) = '+a+' + '+b+' − '+union+'.'};
      }},
      {gen:function(){
        var both=Q.int(3,12), onlyA=Q.int(5,18), onlyB=Q.int(5,18), neither=Q.int(2,9);
        var total=onlyA+both+onlyB+neither;
        return {type:'text', q:'In a group of '+total+', '+(onlyA+both)+' play chess, '+(onlyB+both)+
            ' play draughts and '+neither+' play neither. How many play BOTH?',
          answer:[String(both)],
          hint:'Union = '+total+' − '+neither+' = '+(total-neither)+'. Then n(A ∩ B) = '+
               (onlyA+both)+' + '+(onlyB+both)+' − '+(total-neither)+'.'};
      }},
      {gen:function(){
        var a=Q.int(5,20), b=Q.int(5,20);
        return {type:'text', q:'A and B are DISJOINT sets with n(A) = '+a+' and n(B) = '+b+'. Find n(A ∪ B).',
          answer:[String(a+b)],
          hint:'Disjoint means no overlap, so n(A ∩ B) = 0 and you simply add.'};
      }},
      {gen:function(){
        var b=Q.int(12,30), a=Q.int(3,b-2);
        var o=Q.mc(String(b), [String(a+b), String(b-a), String(a)]);
        return {type:'mc', q:'A ⊂ B, with n(A) = '+a+' and n(B) = '+b+'. What is n(A ∪ B)?',
          options:o.options, answer:o.answer,
          hint:'If A sits entirely inside B, the union is just B.'};
      }},
      {gen:function(){
        var both=Q.int(3,10), onlyA=Q.int(4,14), onlyB=Q.int(4,14);
        return {type:'text', q:''+(onlyA+both)+' students like maths, '+(onlyB+both)+
            ' like science and '+both+' like both. How many like science but NOT maths?',
          answer:[String(onlyB)],
          hint:'Take the overlap off the science total: '+(onlyB+both)+' − '+both+'.'};
      }},
    ]
  });

  set('2.2.2', {
    notes:[
      {h:'Relations and arrow diagrams', html:
        '<p>A <b>relation</b> is a rule linking the members of one set to the members of another.</p>'+
        '<p>An <b>arrow diagram</b> draws the two sets side by side and joins each element to whatever it maps to.</p>'+
        dia(300,170,
          '<ellipse cx="80" cy="85" rx="46" ry="66" fill="'+FILL+'" stroke="'+INK+'" stroke-width="2"/>'+
          '<ellipse cx="220" cy="85" rx="46" ry="66" fill="rgba(43,127,212,0.12)" stroke="'+INK+'" stroke-width="2"/>'+
          txt(80,20,'Domain',ACC,12)+txt(220,20,'Range',ACC,12)+
          txt(80,50,'1')+txt(80,90,'2')+txt(80,130,'3')+
          txt(220,50,'3')+txt(220,90,'5')+txt(220,130,'7')+
          ln(94,47,206,47,ACC)+ln(94,87,206,87,ACC)+ln(94,127,206,127,ACC))+
        '<p>Above, the rule is <b>x → 2x + 1</b>.</p>'+
        '<ul><li>The <b>domain</b> is the set of inputs (the left set).</li>'+
        '<li>The <b>range</b> is the set of outputs actually used (the right set).</li></ul>'},
      {h:'Relation, mapping, function', html:
        '<p>These three words describe how many arrows leave each element:</p>'+
        '<ul><li>A <b>relation</b> is any set of links at all.</li>'+
        '<li>A <b>function</b> (or mapping) sends <b>each input to exactly one output</b> — one arrow out of every element of the domain.</li></ul>'+
        '<div class="formula">Every function is a relation, but not every relation is a function.</div>'+
        '<p>Types of mapping:</p>'+
        '<ul><li><b>one-to-one</b> — each input has its own output (x → 2x)</li>'+
        '<li><b>many-to-one</b> — several inputs share one output (x → x², since 2 and −2 both give 4). Still a function.</li>'+
        '<li><b>one-to-many</b> — one input gives several outputs. <b>Not</b> a function.</li></ul>'+
        '<p>The test is simple: if any input has <i>two or more</i> arrows leaving it, it is not a function.</p>'},
      {h:'Finding missing terms', html:
        '<p>Apply the rule forwards to find an output, or undo it to find an input.</p>'+
        '<p>If the rule is x → 3x − 2 and the input is 5, the output is 3(5) − 2 = <b>13</b>.</p>'+
        '<p>If the output is 19, then 3x − 2 = 19 → 3x = 21 → x = <b>7</b>.</p>'},
    ],
    examples:[
      {q:'The relation x → 2x + 1 has domain {1, 2, 3}. Find the range.', answer:'{3, 5, 7}',
       steps:['Apply the rule to each element of the domain.',
              '1 → 2(1) + 1 = 3.','2 → 2(2) + 1 = 5.','3 → 2(3) + 1 = 7.','Range = {3, 5, 7}.']},
      {q:'Why is a one-to-many relation not a function?',
       answer:'Because a function must give exactly one output for each input',
       steps:['A function sends every element of the domain to exactly one element of the range.',
              'One-to-many means a single input has two or more outputs.',
              'That breaks the rule, so it is a relation but not a function.',
              '(Many-to-one is fine — that is still one output per input.)']},
    ],
    practice:[
      {gen:function(){
        var m=Q.int(2,6), c=Q.nz(-6,8), d=[Q.int(1,4),Q.int(5,8),Q.int(9,12)];
        var r=d.map(function(x){return m*x+c;});
        return {type:'text', q:'The relation x → '+Q.polyHtml([[m,'x'],[c,'']])+' has domain {'+d.join(', ')+
            '}. List the range. (numbers separated by commas, smallest first)',
          answer:[r.join(','), '{'+r.join(',')+'}'],
          hint:'Apply the rule to each input in turn.'};
      }},
      {gen:function(){
        var m=Q.int(2,7), c=Q.nz(-9,9), x=Q.int(2,12);
        return {type:'text', q:'A relation is x → '+Q.polyHtml([[m,'x'],[c,'']])+'. What is the image of '+x+'?',
          answer:[String(m*x+c)], hint:'Substitute x = '+x+' into the rule.'};
      }},
      {gen:function(){
        var m=Q.int(2,7), c=Q.nz(-9,9), x=Q.int(2,12), y=m*x+c;
        return {type:'text', q:'A relation is x → '+Q.polyHtml([[m,'x'],[c,'']])+
            '. Which input gives an output of '+y+'?',
          answer:Q.root(x), hint:'Solve '+Q.polyHtml([[m,'x'],[c,'']])+' = '+y+'.'};
      }},
      {gen:function(){
        var kinds=[['each input has exactly one output, and no two inputs share it','one-to-one'],
                   ['two different inputs give the same output','many-to-one'],
                   ['one input gives two different outputs','one-to-many']];
        var k=Q.pick(kinds);
        var o=Q.mc(k[1], ['one-to-one','many-to-one','one-to-many'].filter(function(x){return x!==k[1];})
                            .concat(['none-to-one']));
        return {type:'mc', q:'What type of mapping is it when '+k[0]+'?',
          options:o.options, answer:o.answer,
          hint:'Count the arrows leaving each input, and arriving at each output.'};
      }},
      {gen:function(){
        var isFn=Q.chance(0.5);
        var o=Q.mc(isFn?'Yes — it is a function':'No — it is not a function',
          [isFn?'No — it is not a function':'Yes — it is a function',
           'Only if the domain is infinite','Only if the range is empty']);
        return {type:'mc', q:'A relation is '+(isFn?'many-to-one':'one-to-many')+'. Is it a function?',
          options:o.options, answer:o.answer,
          hint:'A function needs exactly ONE output per input. Many inputs sharing an output is allowed.'};
      }},
      {gen:function(){
        var which=Q.chance(0.5);
        var o=Q.mc(which?'the set of inputs':'the set of outputs',
          [which?'the set of outputs':'the set of inputs','the rule itself','the number of arrows']);
        return {type:'mc', q:'What is the '+(which?'domain':'range')+' of a relation?',
          options:o.options, answer:o.answer,
          hint:'Domain is on the left of an arrow diagram, range on the right.'};
      }},
    ]
  });

  set('2.2.3', {
    notes:[
      {h:'Ordered pairs', html:
        '<p>An <b>ordered pair</b> (x, y) records an input with its output. <b>Order matters</b>: (2, 5) and (5, 2) are different pairs.</p>'+
        '<p>Any relation can be written as a <b>set of ordered pairs</b>:</p>'+
        '<div class="formula">x → 2x + 1 on {1, 2, 3} gives {(1, 3), (2, 5), (3, 7)}</div>'+
        '<p>From that set you can read off both:</p>'+
        '<ul><li><b>Domain</b> = all the first coordinates = {1, 2, 3}</li>'+
        '<li><b>Range</b> = all the second coordinates = {3, 5, 7}</li></ul>'},
      {h:'Does a pair satisfy a relation?', html:
        '<p>Substitute and check whether the equation is true.</p>'+
        '<p><i>Does (3, 11) satisfy y = 3x + 2?</i> → 3(3) + 2 = 11 ✓ <b>Yes.</b></p>'+
        '<p><i>Does (4, 15) satisfy y = 3x + 2?</i> → 3(4) + 2 = 14, not 15. ✗ <b>No.</b></p>'+
        '<p>To <b>write</b> pairs satisfying a relation, choose x values and work out each y.</p>'},
      {h:'Plotting, and spotting a linear relation', html:
        '<p>Each ordered pair is a point on the Cartesian plane — x across, y up. Plot the set and look at the shape.</p>'+
        '<p>A relation is <b>linear</b> if the points lie on a straight line. The test with numbers: as x goes up in equal steps, y must also change by a <b>constant</b> amount.</p>'+
        '<div class="formula">{(1,4), (2,7), (3,10), (4,13)} — y rises by 3 every time → linear<br>'+
        '{(1,1), (2,4), (3,9), (4,16)} — rises by 3, then 5, then 7 → NOT linear</div>'},
    ],
    examples:[
      {q:'For the set {(1, 5), (2, 8), (3, 11)}, state the domain and the range.',
       answer:'Domain = {1, 2, 3}, Range = {5, 8, 11}',
       steps:['The domain is the set of first coordinates: 1, 2 and 3.',
              'The range is the set of second coordinates: 5, 8 and 11.']},
      {q:'Does the ordered pair (5, 17) satisfy y = 3x + 2?', answer:'Yes',
       steps:['Substitute x = 5 into the rule: 3(5) + 2.','= 15 + 2 = 17.',
              'That matches the y in the pair, so yes it satisfies the relation.']},
    ],
    practice:[
      {gen:function(){
        var m=Q.int(2,6), c=Q.nz(-8,9), xs=[Q.int(1,3),Q.int(4,6),Q.int(7,10)];
        var which=Q.chance(0.5);
        var pairs=xs.map(function(x){return '('+x+', '+(m*x+c)+')';});
        var ans=which?xs:xs.map(function(x){return m*x+c;});
        return {type:'text', q:'For the set {'+pairs.join(', ')+'}, list the '+(which?'domain':'range')+
            '. (numbers separated by commas, smallest first)',
          answer:[ans.join(','), '{'+ans.join(',')+'}'],
          hint:which?'The domain is the set of FIRST coordinates.':'The range is the set of SECOND coordinates.'};
      }},
      {gen:function(){
        var m=Q.int(2,6), c=Q.nz(-8,9), x=Q.int(2,10);
        var ok=Q.chance(0.5), y=m*x+c+(ok?0:Q.pick([1,-1,2,-2]));
        return {type:'text', q:'Does the ordered pair ('+x+', '+y+') satisfy y = '+
            Q.polyHtml([[m,'x'],[c,'']])+'? (answer yes or no)',
          answer:[ok?'yes':'no'],
          hint:'Substitute x = '+x+' and see whether you get '+y+'.'};
      }},
      {gen:function(){
        var m=Q.int(2,7), c=Q.nz(-9,9), x=Q.int(2,12);
        return {type:'text', q:'Find the value of y that makes ('+x+
            ', y) satisfy y = '+Q.polyHtml([[m,'x'],[c,'']])+'.',
          answer:Q.root(m*x+c,'y'), hint:'Substitute x = '+x+' into the rule.'};
      }},
      {gen:function(){
        var linear=Q.chance(0.5), d=Q.int(2,5), c=Q.int(1,6);
        var ys=linear?[1,2,3,4].map(function(n){return d*n+c;})
                     :[1,2,3,4].map(function(n){return n*n+c;});
        var pairs=[1,2,3,4].map(function(n,i){return '('+n+', '+ys[i]+')';});
        var o=Q.mc(linear?'Yes — y changes by the same amount each time':'No — the change in y is not constant',
          [linear?'No — the change in y is not constant':'Yes — y changes by the same amount each time',
           'Only if all the numbers are positive','It is impossible to tell from ordered pairs']);
        return {type:'mc', q:'Does {'+pairs.join(', ')+'} represent a LINEAR relation?',
          options:o.options, answer:o.answer,
          hint:'Work out the differences between consecutive y values.'};
      }},
      {gen:function(){
        var x=Q.nz(-8,8), y=Q.nz(-8,8);
        var o=Q.mc('('+x+', '+y+')', ['('+y+', '+x+')','('+(-x)+', '+(-y)+')','('+x+', '+(-y)+')']);
        return {type:'mc', q:'Which ordered pair has an x-coordinate of '+x+' and a y-coordinate of '+y+'?',
          options:o.options, answer:o.answer, hint:'Ordered pairs are written (x, y) — x first.'};
      }},
    ]
  });

  set('2.2.4', {
    notes:[
      {h:'From equation to graph', html:
        '<p>A <b>linear</b> relation has a graph that is a straight line. Its equation has x and y only to the first power — no x², no xy.</p>'+
        '<p>To draw it, make a small <b>table of values</b>, plot the points, and join them with a ruler:</p>'+
        '<div class="formula">y = 2x + 1<br>'+
        'x&nbsp;&nbsp;|&nbsp; 0 &nbsp;&nbsp;1 &nbsp;&nbsp;2 &nbsp;&nbsp;3<br>'+
        'y&nbsp;&nbsp;|&nbsp; 1 &nbsp;&nbsp;3 &nbsp;&nbsp;5 &nbsp;&nbsp;7</div>'+
        '<p>Three points are plenty — the third checks the first two. If any point is off the line, you have made an arithmetic slip.</p>'},
      {h:'Intercepts', html:
        '<p>The two easiest points to find are where the line crosses the axes:</p>'+
        '<ul><li><b>y-intercept</b> — put x = 0.</li>'+
        '<li><b>x-intercept</b> — put y = 0.</li></ul>'+
        '<p>For y = 2x + 6: at x = 0, y = 6; at y = 0, 2x + 6 = 0 so x = −3. Plot (0, 6) and (−3, 0) and join them.</p>'+
        '<p>Special lines: <b>y = k</b> is horizontal, <b>x = k</b> is vertical.</p>'},
      {h:'Graphing an inequality', html:
        '<p>An inequality describes a <b>region</b>, not a line.</p>'+
        '<ol><li>Draw the boundary line as if it were an equation.</li>'+
        '<li>Make it <b>broken</b> for &lt; or &gt;, and <b>solid</b> for ≤ or ≥.</li>'+
        '<li>Shade the correct side. To decide, test a point — (0, 0) is easiest. If it satisfies the inequality, shade its side.</li></ol>'+
        '<div class="formula">x &gt; 2 → broken vertical line at x = 2, shade to the right<br>'+
        'y ≤ 3 → solid horizontal line at y = 3, shade below</div>'+
        '<p>Always label the line with its equation and state which region is wanted.</p>'},
    ],
    examples:[
      {q:'Complete the table for y = 3x − 2 when x = 0, 1, 2, 3.', answer:'y = −2, 1, 4, 7',
       steps:['x = 0: y = 3(0) − 2 = −2.','x = 1: y = 3(1) − 2 = 1.',
              'x = 2: y = 3(2) − 2 = 4.','x = 3: y = 3(3) − 2 = 7.',
              'The y values rise by 3 each time, confirming a straight line.']},
      {q:'Where does the line y = 2x + 6 cross the x-axis?', answer:'(−3, 0)',
       steps:['On the x-axis, y = 0.','So 2x + 6 = 0.','2x = −6, giving x = −3.',
              'The line crosses at (−3, 0).']},
    ],
    practice:[
      {gen:function(){
        var m=Q.int(2,6), c=Q.nz(-9,9), x=Q.int(0,8);
        return {type:'text', q:'For the line y = '+Q.polyHtml([[m,'x'],[c,'']])+', find y when x = '+x+'.',
          answer:Q.root(m*x+c,'y'), hint:'Substitute x = '+x+' into the equation.'};
      }},
      {gen:function(){
        var m=Q.int(2,6), c=Q.nz(-9,9);
        return {type:'text', q:'Where does the line y = '+Q.polyHtml([[m,'x'],[c,'']])+
            ' cross the y-axis? Give the y value.',
          answer:Q.root(c,'y'), hint:'On the y-axis x = 0, so y is just the constant term.'};
      }},
      {gen:function(){
        var m=Q.int(2,6), x=Q.nz(-6,6), c=-m*x;
        return {type:'text', q:'Where does the line y = '+Q.polyHtml([[m,'x'],[c,'']])+
            ' cross the x-axis? Give the x value.',
          answer:Q.root(x), hint:'On the x-axis y = 0, so solve '+Q.polyHtml([[m,'x'],[c,'']])+' = 0.'};
      }},
      {gen:function(){
        var strict=Q.chance(0.5);
        var o=Q.mc(strict?'a broken (dashed) line':'a solid line',
          [strict?'a solid line':'a broken (dashed) line','no line at all','a curved line']);
        return {type:'mc', q:'When graphing the inequality y '+(strict?'&gt;':'≥')+
            ' 2x + 1, what kind of boundary line do you draw?',
          options:o.options, answer:o.answer,
          hint:strict?'A strict inequality excludes the boundary.':'"Or equal to" includes the boundary.'};
      }},
      {gen:function(){
        var k=Q.nz(-6,6), vert=Q.chance(0.5);
        var o=Q.mc(vert?'a vertical line':'a horizontal line',
          [vert?'a horizontal line':'a vertical line','a line through the origin','a curve']);
        return {type:'mc', q:'What does the graph of '+(vert?'x = '+k:'y = '+k)+' look like?',
          options:o.options, answer:o.answer,
          hint:vert?'Every point has the same x value, whatever y is.'
                   :'Every point has the same y value, whatever x is.'};
      }},
      {gen:function(){
        var m=Q.int(2,5), c=Q.nz(-8,8), x=Q.int(1,6), y=m*x+c;
        var on=Q.chance(0.5);
        return {type:'text', q:'Does the point ('+x+', '+(on?y:y+Q.pick([1,-1,2]))+
            ') lie on the line y = '+Q.polyHtml([[m,'x'],[c,'']])+'? (answer yes or no)',
          answer:[on?'yes':'no'],
          hint:'Substitute x = '+x+' and compare with the y value given.'};
      }},
    ]
  });

  /* ============================ FORM 3 ============================ */

  set('3.2.1', {
    notes:[
      {h:'The real number system as a Venn diagram', html:
        '<p>The number sets nest inside one another, which a Venn diagram shows beautifully:</p>'+
        '<div class="formula">ℕ ⊂ 𝕎 ⊂ ℤ ⊂ ℚ ⊂ ℝ</div>'+
        '<ul><li><b>ℕ</b> natural (counting) numbers: 1, 2, 3, …</li>'+
        '<li><b>𝕎</b> whole numbers: 0, 1, 2, 3, …</li>'+
        '<li><b>ℤ</b> integers: … −2, −1, 0, 1, 2 …</li>'+
        '<li><b>ℚ</b> rationals: anything writable as a fraction, including terminating and recurring decimals</li>'+
        '<li><b>ℝ</b> reals: rationals together with the irrationals (√2, π)</li></ul>'+
        '<p>So −5 is an integer and a rational and a real, but not a whole number. And √2 is real but <b>not</b> rational — it sits in ℝ outside ℚ.</p>'},
      {h:'Set notation on a Venn diagram', html:
        '<p>Practise reading each region off the picture:</p>'+
        venn2('A only','A ∩ B','B only',"(A ∪ B)′",'A','B')+
        '<ul><li><b>A ∩ B</b> — the overlap only.</li>'+
        '<li><b>A ∪ B</b> — all three inner regions.</li>'+
        '<li><b>A′</b> — everything outside A, which is "B only" plus the outside region.</li>'+
        '<li><b>(A ∪ B)′</b> — the region outside both circles.</li></ul>'},
      {h:'Subsets and disjoint sets in pictures', html:
        '<ul><li><b>A ⊂ B</b> — draw A as a circle entirely <i>inside</i> B. Then A ∩ B = A and A ∪ B = B.</li>'+
        '<li><b>Disjoint</b> — draw two separate circles that do not touch. Then A ∩ B = ∅.</li>'+
        '<li><b>Intersecting</b> — the usual overlapping pair.</li></ul>'},
      {h:'Using a Venn diagram for simultaneous equations', html:
        '<p>With small, discrete sets you can solve a pair of equations by listing.</p>'+
        '<p>Let A be the pairs satisfying x + y = 7 and B those satisfying y = x + 1, taking x and y from {1,…,6}:</p>'+
        '<ul><li>A = {(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)}</li>'+
        '<li>B = {(1,2), (2,3), (3,4), (4,5), (5,6)}</li></ul>'+
        '<p>The intersection is the single pair <b>(3, 4)</b> — the simultaneous solution.</p>'},
    ],
    examples:[
      {q:'To which of ℕ, 𝕎, ℤ, ℚ, ℝ does −4 belong?', answer:'ℤ, ℚ and ℝ',
       steps:['−4 is negative, so it is not a natural number or a whole number.',
              'It is an integer, so −4 ∈ ℤ.',
              'It can be written as a fraction (−4/1), so it is rational: −4 ∈ ℚ.',
              'Every rational is real, so −4 ∈ ℝ.']},
      {q:'A ∩ B is found by listing to be {(2, 5)}. What does that tell you about the equations?',
       answer:'x = 2, y = 5 is the simultaneous solution',
       steps:['Set A holds the pairs satisfying the first equation.',
              'Set B holds the pairs satisfying the second.',
              'A pair in BOTH satisfies both equations at once.',
              'So x = 2 and y = 5 solve them simultaneously.']},
    ],
    practice:[
      {gen:function(){
        var items=[['7','ℕ, 𝕎, ℤ, ℚ and ℝ'],['0','𝕎, ℤ, ℚ and ℝ'],['−3','ℤ, ℚ and ℝ'],
                   ['0.5','ℚ and ℝ only'],['√2','ℝ only']];
        var it=Q.pick(items);
        var o=Q.mc(it[1], items.filter(function(x){return x!==it;}).map(function(x){return x[1];}).slice(0,3));
        return {type:'mc', q:'To which number sets does '+it[0]+' belong?',
          options:o.options, answer:o.answer,
          hint:'Work outwards: is it a counting number? whole? an integer? a fraction? real?'};
      }},
      {gen:function(){
        var regions=[['the overlap of the two circles only','A ∩ B'],
                     ['everything inside either circle','A ∪ B'],
                     ['the region outside both circles',"(A ∪ B)′"],
                     ['everything outside circle A',"A′"]];
        var r=Q.pick(regions);
        var o=Q.mc(r[1], ['A ∩ B','A ∪ B',"(A ∪ B)′","A′"].filter(function(x){return x!==r[1];}));
        return {type:'mc', q:'On a two-set Venn diagram, which notation describes '+r[0]+'?',
          options:o.options, answer:o.answer,
          hint:'∩ is the overlap, ∪ is everything, and a dash means "not in".'};
      }},
      {gen:function(){
        var rel=Q.pick([['A ⊂ B','A sits entirely inside B'],
                        ['A ∩ B = ∅','the circles do not touch at all'],
                        ['A and B intersect','the circles overlap partly']]);
        var o=Q.mc(rel[1], [['A sits entirely inside B','the circles do not touch at all',
                             'the circles overlap partly'].filter(function(x){return x!==rel[1];})[0],
                            ['A sits entirely inside B','the circles do not touch at all',
                             'the circles overlap partly'].filter(function(x){return x!==rel[1];})[1],
                            'the circles are the same size']);
        return {type:'mc', q:'How is '+rel[0]+' drawn on a Venn diagram?',
          options:o.options, answer:o.answer, hint:'Picture where the two circles sit relative to each other.'};
      }},
      {gen:function(){
        var x=Q.int(1,6), y=Q.int(1,6), s=x+y, d=y-x;
        return {type:'text', q:'Set A holds the pairs with x + y = '+s+' and set B the pairs with y − x = '+d+
            '. A ∩ B contains one pair. What is x?',
          answer:Q.root(x),
          hint:'Add the two equations: 2y = '+(s+d)+', then work back to x.'};
      }},
      {gen:function(){
        var b=Q.int(10,25), a=Q.int(3,b-2);
        return {type:'text', q:'A ⊂ B, with n(A) = '+a+' and n(B) = '+b+'. Find n(A ∩ B).',
          answer:[String(a)],
          hint:'If A is entirely inside B, the overlap is the whole of A.'};
      }},
    ]
  });

  set('3.2.2', {
    notes:[
      {h:'Gradient — slope, steepness, the same thing', html:
        '<p><b>Gradient</b>, <b>slope</b> and <b>steepness</b> are three words for one idea: how much the line rises for each step across.</p>'+
        '<div class="formula">m = '+f('rise','run')+' = '+f('y₂ − y₁','x₂ − x₁')+'</div>'+
        '<p>For A(1, 2) and B(4, 11): m = '+f('11 − 2','4 − 1')+' = '+f('9','3')+' = <b>3</b>.</p>'+
        '<p>Subtract in the <b>same order</b> on top and bottom. Doing y₂ − y₁ over x₁ − x₂ flips the sign.</p>'},
      {h:'Positive, negative, zero', html:
        '<ul><li><b>Positive</b> gradient — the line rises left to right (uphill).</li>'+
        '<li><b>Negative</b> gradient — it falls left to right (downhill).</li>'+
        '<li><b>Zero</b> gradient — horizontal, y = k.</li>'+
        '<li><b>Undefined</b> — vertical, x = k (you would divide by zero).</li></ul>'+
        dia(300,140,
          ln(30,110,120,30,ACC)+txt(75,128,'positive',ACC,11)+
          ln(180,30,270,110,ACC)+txt(225,128,'negative',ACC,11))},
      {h:'y = mx + c', html:
        '<p>Every straight line can be written in this form:</p>'+
        '<div class="formula">y = mx + c&nbsp;&nbsp;where m is the GRADIENT and c is the y-INTERCEPT</div>'+
        '<p>So for y = 4x − 3, the gradient is 4 and the line crosses the y-axis at −3.</p>'+
        '<p>Going the other way: gradient 2 and y-intercept 5 give <b>y = 2x + 5</b>.</p>'+
        '<p>If the equation is not in that form, rearrange it first. 2y = 6x + 8 becomes y = 3x + 4, so m = 3 and c = 4.</p>'},
      {h:'Parallel lines', html:
        '<p><b>Parallel lines have equal gradients.</b> They rise at exactly the same rate, so they never meet.</p>'+
        '<p>Any line parallel to y = 5x − 2 has gradient 5; only c changes. So y = 5x + 9 is parallel to it.</p>'+
        '<p><b>Modelling:</b> in a real-world graph the gradient is a <i>rate</i> — dollars per hour, km per litre — and c is the starting value (a fixed fee, an initial reading).</p>'},
    ],
    examples:[
      {q:'Find the gradient of the line through A(2, 3) and B(6, 15).', answer:'3',
       steps:['m = (y₂ − y₁) ÷ (x₂ − x₁).','= (15 − 3) ÷ (6 − 2).','= 12 ÷ 4 = 3.']},
      {q:'State the gradient and y-intercept of 3y = 12x − 9.', answer:'Gradient 4, y-intercept −3',
       steps:['Rearrange into y = mx + c by dividing every term by 3.',
              'y = 4x − 3.','So m = 4 and c = −3.']},
    ],
    practice:[
      {gen:function(){
        var x1=Q.int(-6,4), m=Q.int(2,6), x2=x1+Q.int(1,5), y1=Q.nz(-8,8);
        var y2=y1+m*(x2-x1);
        return {type:'text', q:'Find the gradient of the line through A('+x1+', '+y1+') and B('+x2+', '+y2+').',
          answer:[String(m)],
          hint:'m = ('+y2+' − '+y1+') ÷ ('+x2+' − '+x1+').'};
      }},
      {gen:function(){
        var m=Q.nz(-8,8), c=Q.nz(-9,9), which=Q.chance(0.5);
        return {type:'text', q:'For the line y = '+Q.polyHtml([[m,'x'],[c,'']])+', state the '+
            (which?'gradient':'y-intercept')+'.',
          answer:[String(which?m:c)],
          hint:'In y = mx + c, m is the gradient and c is the y-intercept.'};
      }},
      {gen:function(){
        var m=Q.nz(-6,6), c=Q.nz(-9,9);
        return {type:'text', q:'Write the equation of the line with gradient '+m+' and y-intercept '+c+
            '. (write it like y=2x+5)',
          answer:['y='+Q.polyAns([[m,'x'],[c,'']])],
          hint:'Substitute into y = mx + c.'};
      }},
      {gen:function(){
        var m=Q.nz(-7,7), c=Q.nz(-9,9), c2=Q.nz(-9,9);
        while(c2===c) c2=Q.nz(-9,9);
        return {type:'text', q:'A line is parallel to y = '+Q.polyHtml([[m,'x'],[c,'']])+
            '. What is its gradient?',
          answer:[String(m)], hint:'Parallel lines have equal gradients.'};
      }},
      {gen:function(){
        var k=Q.int(2,6), m=Q.int(2,6), c=Q.nz(-6,8);
        return {type:'text', q:'Rearrange '+k+'y = '+Q.polyHtml([[k*m,'x'],[k*c,'']])+
            ' into the form y = mx + c and state the gradient.',
          answer:[String(m)], hint:'Divide every term by '+k+'.'};
      }},
      {gen:function(){
        var kind=Q.pick([['rises from left to right','positive'],['falls from left to right','negative'],
                         ['is horizontal','zero'],['is vertical','undefined']]);
        var o=Q.mc(kind[1], ['positive','negative','zero','undefined'].filter(function(x){return x!==kind[1];}));
        return {type:'mc', q:'What kind of gradient does a line have if it '+kind[0]+'?',
          options:o.options, answer:o.answer,
          hint:'Uphill is positive, downhill negative, flat is zero, and vertical divides by zero.'};
      }},
    ]
  });

  set('3.2.3', {
    notes:[
      {h:'The point of intersection is the solution', html:
        '<p>Draw both lines on <b>one</b> pair of axes. Where they cross, the x and y values satisfy <i>both</i> equations at once — so that point is the simultaneous solution.</p>'+
        '<div class="formula">The coordinates of the point of intersection are the solution (x, y)</div>'+
        dia(240,200,
          ln(20,170,220,170)+ln(45,20,45,190)+
          ln(55,160,215,40,ACC)+ln(55,50,215,150,ACC)+
          '<circle cx="135" cy="100" r="5" fill="#c0392b"/>'+
          txt(168,96,'solution','#c0392b',11))+
        '<p>So if the lines cross at (2, 5), the solution is x = 2, y = 5.</p>'},
      {h:'The method', html:
        '<ol><li>Make a small table of values for the first equation and plot it.</li>'+
        '<li>Do the same for the second, on the same axes.</li>'+
        '<li>Read off the coordinates where they cross.</li>'+
        '<li><b>Check</b> by substituting into both original equations.</li></ol>'+
        '<p>Rearrange to y = mx + c first if it helps: 2x + y = 8 becomes y = −2x + 8.</p>'+
        '<p>Accuracy matters — use a sharp pencil and a ruler, and read the scale carefully. A graphical answer is only as good as the drawing, which is why you always check algebraically.</p>'},
      {h:'When there is no single answer', html:
        '<ul><li><b>Parallel lines</b> (equal gradients, different intercepts) never cross → <b>no solution</b>.</li>'+
        '<li><b>The same line twice</b> → every point is a solution, so there are <b>infinitely many</b>.</li></ul>'+
        '<p>Otherwise two straight lines cross exactly once, giving one unique solution.</p>'},
    ],
    examples:[
      {q:'Two lines are drawn and cross at (3, 4). What is the solution of the simultaneous equations?',
       answer:'x = 3, y = 4',
       steps:['The point of intersection satisfies both equations.',
              'Its coordinates are x = 3 and y = 4.','So that is the simultaneous solution.']},
      {q:'Why do the equations y = 2x + 1 and y = 2x + 5 have no simultaneous solution?',
       answer:'The lines are parallel — equal gradients, so they never cross',
       steps:['Both have gradient 2, so they rise at the same rate.',
              'Their y-intercepts differ (1 and 5), so they are different lines.',
              'Parallel lines never meet, so there is no point of intersection and no solution.']},
    ],
    practice:[
      {gen:function(){
        var x=Q.nz(-6,6), y=Q.nz(-6,6), which=Q.chance(0.5);
        return {type:'text', q:'The graphs of two linear equations cross at ('+x+', '+y+
            '). What is the value of '+(which?'x':'y')+' in the simultaneous solution?',
          answer:Q.root(which?x:y, which?'x':'y'),
          hint:'The coordinates of the crossing point ARE the solution.'};
      }},
      {gen:function(){
        var x=Q.int(1,6), y=Q.int(1,8), m=Q.int(1,4);
        var c=y-m*x, s=x+y;
        return {type:'text', q:'Solve graphically: y = '+Q.polyHtml([[m,'x'],[c,'']])+' and x + y = '+s+
            '. What is x?',
          answer:Q.root(x),
          hint:'Substitute the first into the second: x + ('+Q.polyHtml([[m,'x'],[c,'']])+') = '+s+'.'};
      }},
      {gen:function(){
        var m=Q.int(2,6), c1=Q.nz(-8,8), c2=Q.nz(-8,8);
        while(c2===c1) c2=Q.nz(-8,8);
        var o=Q.mc('No solution — the lines are parallel',
          ['Exactly one solution','Infinitely many solutions','Exactly two solutions']);
        return {type:'mc', q:'How many solutions do y = '+Q.polyHtml([[m,'x'],[c1,'']])+' and y = '+
            Q.polyHtml([[m,'x'],[c2,'']])+' have?',
          options:o.options, answer:o.answer,
          hint:'Compare the gradients, then the y-intercepts.'};
      }},
      {gen:function(){
        var x=Q.nz(-5,5), y=Q.nz(-5,5), m=Q.nz(-3,3), c=y-m*x;
        var on=Q.chance(0.5), testY=on?y:y+Q.pick([1,-1,2]);
        return {type:'text', q:'Does ('+x+', '+testY+') lie on the line y = '+Q.polyHtml([[m,'x'],[c,'']])+
            '? (answer yes or no)',
          answer:[on?'yes':'no'],
          hint:'A simultaneous solution must satisfy the equation exactly — substitute and check.'};
      }},
      {gen:function(){
        var o=Q.mc('substitute them into BOTH original equations',
          ['redraw the graph on bigger axes','check only the first equation',
           'round the coordinates to whole numbers']);
        return {type:'mc', q:'After reading a solution off a graph, how should you check it?',
          options:o.options, answer:o.answer,
          hint:'A graphical reading is only as accurate as the drawing.'};
      }},
    ]
  });

})();
