/* Full content for the Number Operations & Number Theory strand (Forms 1-3).
   Attaches .content to topics in window.CURRICULUM. Other strands render objectives
   + prerequisites from data.js and show "content coming soon". */
(function(){
  var C=window.CURRICULUM; if(!C) return;
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
      {type:'text', q:'What is the place value of the 6 in 3 6<b> </b>? (the underlined digit in 3<u>6</u>84)', answer:['600','6 hundreds','hundreds'], hint:'Count the columns from the right: units, tens, hundreds…'},
      {type:'text', q:'Round 8 465 to the nearest hundred.', answer:['8500','8 500'], hint:'Look at the tens digit (6). 5 or more rounds up.'},
      {type:'mc', q:'Which of these is a prime number?', options:['21','27','29','33'], answer:2, hint:'A prime has exactly two factors: 1 and itself.'},
      {type:'text', q:'Find the HCF of 18 and 30.', answer:['6'], hint:'18 = 2×3², 30 = 2×3×5. Take common primes to the lowest power.'},
      {type:'text', q:'Find the LCM of 6 and 8.', answer:['24'], hint:'List multiples of each until they meet: 6,12,18,24… and 8,16,24…'},
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
      {type:'text', q:'Simplify '+f('15','20')+'. (write as a/b, e.g. 3/4)', answer:['3/4'], hint:'HCF of 15 and 20 is 5.'},
      {type:'mc', q:'Which fraction is equivalent to '+f('2','3')+'?', options:[f('4','9'),f('6','9'),f('3','4'),f('5','6')], answer:1, hint:'Multiply top and bottom of 2/3 by 3.'},
      {type:'text', q:'Convert 3'+f('1','4')+' to an improper fraction (a/b).', answer:['13/4'], hint:'3×4 + 1, over 4.'},
      {type:'mc', q:'Which is the largest?', options:[f('2','3'),f('3','5'),f('5','8')], answer:0, hint:'Use a common denominator of 120, or convert to decimals.'},
      {type:'text', q:'Write '+f('7','4')+' as a mixed number (e.g. 1 3/4, use 1 3/4 format).', answer:['1 3/4','13/4'], hint:'How many whole 4s fit in 7? The remainder is the new top.'},
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
      {type:'text', q:'Calculate −8 + 5.', answer:['-3','−3'], hint:'Move 5 to the right from −8.'},
      {type:'text', q:'Calculate 6 − (−2).', answer:['8'], hint:'Subtracting a negative is the same as adding.'},
      {type:'text', q:'Calculate (−5) × 3.', answer:['-15','−15'], hint:'Different signs give a negative product.'},
      {type:'mc', q:'The temperature is −3°C and falls by 4°C. What is the new temperature?', options:['−1°C','1°C','−7°C','7°C'], answer:2, hint:'Falling means subtract: −3 − 4.'},
      {type:'text', q:'Calculate (−12) ÷ (−4).', answer:['3'], hint:'Same signs give a positive result.'},
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
      {type:'text', q:'Calculate 2.6 + 0.85.', answer:['3.45'], hint:'Line up the points: 2.60 + 0.85.'},
      {type:'text', q:'Calculate 0.6 × 0.3.', answer:['0.18','.18'], hint:'6×3 = 18, then two decimal places.'},
      {type:'text', q:'Write 0.25 as a fraction in lowest terms (a/b).', answer:['1/4'], hint:'25/100 simplifies by dividing by 25.'},
      {type:'mc', q:'Which is largest?', options:['0.7','0.68','0.702','0.09'], answer:2, hint:'Compare digit by digit after the point: 0.700, 0.680, 0.702…'},
      {type:'text', q:'Convert '+f('3','4')+' to a decimal.', answer:['0.75','.75'], hint:'Divide 3 by 4.'},
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
      {type:'text', q:'Write 0.6 as a percentage (e.g. 55%).', answer:['60%','60'], hint:'Multiply by 100.'},
      {type:'text', q:'Find 25% of 80.', answer:['20'], hint:'25% is a quarter.'},
      {type:'text', q:'Write '+f('3','4')+' as a percentage.', answer:['75%','75'], hint:'3/4 = 75/100.'},
      {type:'mc', q:'40% of a class of 30 wear glasses. How many is that?', options:['10','12','15','8'], answer:1, hint:'0.4 × 30.'},
      {type:'text', q:'Convert 8% to a decimal.', answer:['0.08','.08'], hint:'Divide by 100.'},
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
      {type:'text', q:'CP = $40, SP = $52. Find the profit ($).', answer:['12','$12'], hint:'Profit = SP − CP.'},
      {type:'text', q:'A book bought for $50 is sold for $45. Find the percentage loss.', answer:['10%','10'], hint:'Loss = 5; divide by CP = 50, ×100.'},
      {type:'text', q:'Find the price of a $120 item after a 25% discount ($).', answer:['90','$90'], hint:'Pay 75% of 120.'},
      {type:'mc', q:'A $200 item has 12% VAT added. What is the total?', options:['$212','$224','$188','$240'], answer:1, hint:'112% of 200.'},
      {type:'text', q:'CP = $250, profit is 20%. Find the selling price ($).', answer:['300','$300'], hint:'SP = 120% of CP.'},
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
      {type:'mc', q:'Which statement is true?', options:['−6 > −2','−6 < −2','−6 = −2','−6 > 0'], answer:1, hint:'Further left on the number line = smaller.'},
      {type:'text', q:'Evaluate −5 − (−9).', answer:['4'], hint:'Subtracting a negative adds.'},
      {type:'text', q:'Evaluate (−3) × (−6).', answer:['18'], hint:'Two negatives multiply to a positive.'},
      {type:'text', q:'Evaluate 12 ÷ (−4) + 1.', answer:['-2','−2'], hint:'Divide first: 12 ÷ (−4) = −3, then + 1.'},
      {type:'mc', q:'A diver at −18 m rises 7 m. What is the new depth?', options:['−25 m','−11 m','11 m','25 m'], answer:1, hint:'Rising adds: −18 + 7.'},
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
      {type:'mc', q:'Which law does a(b + c) = ab + ac show?', options:['Commutative','Associative','Distributive','Closure'], answer:2, hint:'It “distributes” the multiply over the add.'},
      {type:'text', q:'Write 320 000 in standard form (use 3.2 x 10^5 style: 3.2e5).', answer:['3.2e5','3.2 x 10^5','3.2×10^5'], hint:'Move the point 5 places.'},
      {type:'text', q:'Write 5.6 × 10³ as an ordinary number.', answer:['5600','5 600'], hint:'Move the point 3 places right.'},
      {type:'mc', q:'Which is the additive inverse of 8?', options:['0','1',f('1','8'),'−8'], answer:3, hint:'It adds to 8 to give 0.'},
      {type:'text', q:'Write 0.00045 in standard form (e.g. 4.5e-4).', answer:['4.5e-4','4.5 x 10^-4','4.5×10^-4'], hint:'The point moves 4 places right, so the power is −4.'},
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
      {type:'text', q:'Convert 1011₂ to base 10.', answer:['11'], hint:'8 + 0 + 2 + 1.'},
      {type:'text', q:'Convert 1000₂ to base 10.', answer:['8'], hint:'Only the 8s column is on.'},
      {type:'text', q:'Convert 6 to base 2.', answer:['110','110_2','110₂'], hint:'4 + 2, so the 4 and 2 columns are on.'},
      {type:'mc', q:'Which base-10 number equals 1111₂?', options:['11','15','8','16'], answer:1, hint:'8 + 4 + 2 + 1.'},
      {type:'text', q:'Convert 12 to base 2.', answer:['1100','1100_2','1100₂'], hint:'8 + 4.'},
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
      {type:'mc', q:'Which of these is irrational?', options:[f('2','7'),'√16','√7','0.5'], answer:2, hint:'A perfect-square root is rational; √7 is not.'},
      {type:'mc', q:'√2 lies between which two integers?', options:['0 and 1','1 and 2','2 and 3','3 and 4'], answer:1, hint:'1²=1, 2²=4, and 2 is between them.'},
      {type:'text', q:'Is 0.666… (recurring) rational or irrational?', answer:['rational'], hint:'It equals 2/3 — a fraction.'},
      {type:'text', q:'Add in base 2: 10₂ + 11₂. (give the base-2 answer, e.g. 101)', answer:['101','101_2','101₂'], hint:'2 + 3 = 5 = 4+1 → 101₂.'},
      {type:'text', q:'Approximate √10 to 1 decimal place.', answer:['3.2'], hint:'3.1² = 9.61, 3.2² = 10.24 — which is closer to 10?'},
    ]
  });

})();
