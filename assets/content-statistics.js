/* Full content for the Statistics & Probability strand (Forms 1-3).
   Same pattern as the other content files. Loaded after data.js and qgen.js.
   Diagram primitives (dia/ln/txt/rect/slice) come from QG — see qgen.js. */
(function(){
  var C=window.CURRICULUM; if(!C) return;
  var Q=window.QG;
  var INK=Q.INK, ACC=Q.ACC, FILL=Q.FILL;
  var dia=Q.dia, ln=Q.ln, txt=Q.txt, rect=Q.rect, slice=Q.slice;
  function f(a,b){ return '<span class="frac"><span>'+a+'</span><span>'+b+'</span></span>'; }
  function set(code,content){ if(C[code]) C[code].content=content; }

  // a simple vertical bar chart from [[label, value], …]
  function bars(data,unitH){
    var w=44, gap=18, left=42, base=140, h=unitH||14;
    var body=ln(left-8,base,left+data.length*(w+gap),base)+ln(left-8,base,left-8,20);
    data.forEach(function(d,i){
      var x=left+i*(w+gap), bh=d[1]*h;
      body+=rect(x,base-bh,w,bh,FILL)+txt(x+w/2,base+16,d[0],INK,12)+txt(x+w/2,base-bh-6,String(d[1]),ACC,12);
    });
    return dia(left+data.length*(w+gap)+10,175,body);
  }
  // a pie chart from [[label, degrees], …]
  function pie(data){
    var cx=95, cy=95, r=72, a=90, body='';
    var shades=[FILL,'rgba(43,127,212,0.28)','rgba(43,127,212,0.14)','rgba(36,67,94,0.16)','rgba(43,127,212,0.42)'];
    data.forEach(function(d,i){
      body+=slice(cx,cy,r,a-d[1],a,shades[i%shades.length]);
      a-=d[1];
    });
    var ly=26;
    data.forEach(function(d,i){
      body+=rect(190,ly-9,12,12,shades[i%shades.length])+
            '<text x="208" y="'+ly+'" fill="'+INK+'" font-size="12" font-family="system-ui,sans-serif">'+
            d[0]+' ('+d[1]+'°)</text>';
      ly+=24;
    });
    return dia(340,190,body);
  }

  /* ============================ FORM 1 ============================ */

  set('1.3.1', {
    notes:[
      {h:'Asking a question worth investigating', html:
        '<p>Statistics starts with a <b>question you can actually answer with data</b>. "What is the most popular sport in my class?" works; "Is football the best sport?" does not, because it is an opinion.</p>'+
        '<p>A good statistical question:</p>'+
        '<ul><li>asks about a group, not one person;</li>'+
        '<li>has an answer you can count or measure;</li>'+
        '<li>says clearly <i>who</i> is being surveyed.</li></ul>'+
        '<p><b>Discrete data</b> comes from counting — number of siblings, shoe size, favourite colour. You collect it by survey, observation or experiment.</p>'},
      {h:'Tallying into a frequency table', html:
        '<p>A <b>tally</b> records each response as a stroke, grouped in fives (four uprights with the fifth struck across) so it is easy to total.</p>'+
        '<div class="formula">Colour&nbsp;&nbsp;|&nbsp; Tally &nbsp;&nbsp;&nbsp;|&nbsp; Frequency<br>'+
        'Red&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp; ||||&nbsp;|&nbsp; &nbsp;&nbsp;&nbsp;|&nbsp; 6<br>'+
        'Blue&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp; ||||&nbsp;|||&nbsp;|&nbsp; 8<br>'+
        'Green&nbsp;&nbsp;&nbsp;|&nbsp; ||||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp; 4</div>'+
        '<p>The <b>frequency</b> is how many times each value occurred. Adding the frequency column gives the total surveyed — always check it against the number of people asked.</p>'},
      {h:'Pictographs and block graphs', html:
        '<p>A <b>pictograph</b> uses a symbol to stand for a number of items. The <b>key</b> is essential — without it the picture means nothing.</p>'+
        '<div class="formula">Key: ★ = 5 students&nbsp;&nbsp;so ★★★ = 15 students, and ★★★ plus a half star = 17.5</div>'+
        '<p>A <b>block graph</b> stacks one block per item, so the tallest column is the most common.</p>'+
        '<p>Choose the scale so the tallest bar fits the page but the graph is still readable — a key of 1 for 100 items would be unusable.</p>'},
      {h:'The mode', html:
        '<p>The <b>mode</b> is the value that occurs <b>most often</b> — the tallest bar, or the largest frequency in the table.</p>'+
        '<p>In the table above the mode is <b>Blue</b>, with frequency 8. Note that the mode is the <i>value</i> (Blue), not its frequency (8).</p>'+
        '<p>It is the only average that works for data like colours and names, because you cannot add or order them.</p>'},
    ],
    examples:[
      {q:'A tally shows Red |||| |, Blue |||| |||, Green ||||. What is the frequency of Blue, the total surveyed, and the mode?',
       answer:'Blue = 8, total = 18, mode = Blue',
       steps:['Blue is one full group of five plus three more: 5 + 3 = 8.',
              'Red is 5 + 1 = 6 and Green is 4.','Total = 6 + 8 + 4 = 18.',
              'The largest frequency is 8, so the mode is Blue.']},
      {q:'On a pictograph, ★ = 4 books. A pupil\'s row shows ★★★ and a half star. How many books?',
       answer:'14 books',
       steps:['Each full star is 4 books, so three stars are 3 × 4 = 12.',
              'A half star is half of 4 = 2.','12 + 2 = 14 books.']},
    ],
    practice:[
      {gen:function(){
        var fives=Q.int(0,4), ones=Q.int(0,4), n=fives*5+ones;
        if(n===0) n=3;
        var tally=[]; for(var i=0;i<fives;i++) tally.push('||||');
        if(ones) tally.push('|'.repeat(ones));
        return {type:'text', q:'A tally for one category reads '+tally.join(' ')+
            ' (each group of four with a stroke through it counts as 5). What is its frequency?',
          answer:[String(n)],
          hint:'Count '+fives+' complete group(s) of 5, then add the '+ones+' extra stroke(s).'};
      }},
      {gen:function(){
        var cats=Q.sample(['Red','Blue','Green','Yellow','Purple','Orange'],4);
        var freqs=[], used={};
        for(var i=0;i<4;i++){ var v; do{ v=Q.int(2,15); }while(used[v]); used[v]=1; freqs.push(v); }
        var maxi=freqs.indexOf(Math.max.apply(null,freqs));
        var rows=cats.map(function(c,i){ return c+' = '+freqs[i]; }).join(', ');
        var wantTotal=Q.chance(0.5);
        if(wantTotal){
          return {type:'text', q:'A frequency table shows '+rows+'. How many people were surveyed in total?',
            answer:[String(freqs.reduce(function(a,b){return a+b;},0))],
            hint:'Add every frequency.'};
        }
        var o=Q.mc(cats[maxi], cats.filter(function(c,i){return i!==maxi;}));
        return {type:'mc', q:'A frequency table shows '+rows+'. What is the mode?',
          options:o.options, answer:o.answer,
          hint:'The mode is the value with the LARGEST frequency — the category, not the number.'};
      }},
      {gen:function(){
        var key=Q.pick([2,4,5,10,20]), full=Q.int(2,6), half=Q.chance(0.5);
        var total=full*key+(half?key/2:0);
        return {type:'text', q:'On a pictograph, ★ = '+key+' items. A row shows '+full+' full stars'+
            (half?' and a half star':'')+'. How many items does it represent?',
          answer:Q.dec(total),
          hint:full+' × '+key+(half?', then add half of '+key:'')+'.'};
      }},
      {gen:function(){
        var good=['How many siblings does each pupil in my class have?',
                  'What is the most common shoe size in Form 3?',
                  'How many minutes do pupils spend travelling to school?'];
        var bad=['Is mathematics the best subject?','Do you like my new shoes?',
                 'Should everyone play cricket?'];
        var askGood=Q.chance(0.5);
        var o=Q.mc(askGood?Q.pick(good):Q.pick(bad), askGood?Q.sample(bad,3):Q.sample(good,3));
        return {type:'mc', q:'Which of these '+(askGood?'IS':'is NOT')+' a good statistical question?',
          options:o.options, answer:o.answer,
          hint:'A statistical question asks about a group and has an answer you can count or measure.'};
      }},
      {gen:function(){
        var o=Q.mc('the key — what one symbol stands for',
          ['the title only','the number of rows','the colour of the symbols']);
        return {type:'mc', q:'What must every pictograph include for it to be readable?',
          options:o.options, answer:o.answer,
          hint:'Without it you cannot tell how many each picture represents.'};
      }},
    ]
  });

  set('1.3.2', {
    notes:[
      {h:'Drawing a bar graph', html:
        '<p>A <b>bar graph</b> shows frequency as the height of each bar.</p>'+
        bars([['Red',6],['Blue',8],['Green',4],['Other',3]])+
        '<p>Rules that earn the marks:</p>'+
        '<ul><li>Bars of <b>equal width</b>, with <b>equal gaps</b> between them.</li>'+
        '<li>A scale that goes up in <b>equal steps</b>, starting at 0.</li>'+
        '<li>Both axes labelled, and a title.</li></ul>'+
        '<p>Pick the scale from the tallest bar: if the largest frequency is 18, going up in 2s is sensible.</p>'},
      {h:'The three averages', html:
        '<div class="formula"><b>Mean</b> = '+f('sum of all the values','how many values')+'<br>'+
        '<b>Median</b> = the middle value when they are put IN ORDER<br>'+
        '<b>Mode</b> = the value that occurs most often</div>'+
        '<p>For 3, 7, 4, 7, 9:</p>'+
        '<ul><li>Mean = (3+7+4+7+9) ÷ 5 = 30 ÷ 5 = <b>6</b>.</li>'+
        '<li>Ordered: 3, 4, 7, 7, 9 → median is the middle one, <b>7</b>.</li>'+
        '<li>Mode = <b>7</b> (it appears twice).</li></ul>'+
        '<p><b>Sorting first is not optional</b> for the median — forgetting to order the list is the commonest error in this topic.</p>'},
      {h:'An even number of values, and the range', html:
        '<p>With an <b>even</b> count there are two middle values — the median is their mean.</p>'+
        '<p>For 2, 5, 8, 11: the middles are 5 and 8, so the median is (5 + 8) ÷ 2 = <b>6.5</b>. Notice the median need not be one of the values.</p>'+
        '<div class="formula">Range = largest − smallest</div>'+
        '<p>The range measures <b>spread</b>, not average. For 2, 5, 8, 11 the range is 11 − 2 = 9.</p>'},
    ],
    examples:[
      {q:'Find the mean, median, mode and range of 4, 8, 6, 8, 4, 8.',
       answer:'Mean 6.333…, median 7, mode 8, range 4',
       steps:['Mean: total = 4+8+6+8+4+8 = 38, and there are 6 values → 38 ÷ 6 = 6.33 (2 d.p.).',
              'Order them: 4, 4, 6, 8, 8, 8.',
              'Six values, so the median is the mean of the 3rd and 4th: (6 + 8) ÷ 2 = 7.',
              'Mode: 8 appears three times → 8.','Range: 8 − 4 = 4.']},
      {q:'Find the median of 12, 5, 9, 20, 7.', answer:'9',
       steps:['Put them in order first: 5, 7, 9, 12, 20.',
              'There are 5 values, so the middle is the 3rd.','The median is 9.']},
    ],
    practice:[
      {gen:function(){
        var n=Q.pick([4,5,6]), vals=[], sum=0;
        for(var i=0;i<n;i++){ var v=Q.int(1,20); vals.push(v); sum+=v; }
        // make the total divide exactly so the mean is tidy
        var adjust=(n-(sum%n))%n; vals[0]+=adjust; sum+=adjust;
        return {type:'text', q:'Find the MEAN of '+vals.join(', ')+'.',
          answer:Q.dec(Q.fix(sum/n,2)),
          hint:'Add them (total '+sum+'), then divide by '+n+'.'};
      }},
      {gen:function(){
        var n=Q.pick([5,7]), vals=[];
        while(vals.length<n){ var v=Q.int(1,30); if(vals.indexOf(v)<0) vals.push(v); }
        var sorted=vals.slice().sort(function(a,b){return a-b;});
        return {type:'text', q:'Find the MEDIAN of '+vals.join(', ')+'.',
          answer:[String(sorted[(n-1)/2])],
          hint:'Put them in order first, then take the middle value.'};
      }},
      {gen:function(){
        var mode=Q.int(2,15), others=[];
        while(others.length<3){ var v=Q.int(1,20); if(v!==mode&&others.indexOf(v)<0) others.push(v); }
        var vals=Q.shuffle([mode,mode,mode].concat(others));
        return {type:'text', q:'Find the MODE of '+vals.join(', ')+'.',
          answer:[String(mode)], hint:'Which value appears most often?'};
      }},
      {gen:function(){
        var n=Q.int(5,8), vals=[];
        while(vals.length<n){ var v=Q.int(1,40); if(vals.indexOf(v)<0) vals.push(v); }
        var mx=Math.max.apply(null,vals), mn=Math.min.apply(null,vals);
        return {type:'text', q:'Find the RANGE of '+vals.join(', ')+'.',
          answer:[String(mx-mn)], hint:'Range = largest ('+mx+') − smallest ('+mn+').'};
      }},
      {gen:function(){
        var a=Q.int(1,10), b=a+Q.int(1,6), c=b+Q.int(1,6), d=c+Q.int(1,6);
        var med=(b+c)/2;
        return {type:'text', q:'Find the MEDIAN of '+[a,b,c,d].join(', ')+'.',
          answer:Q.dec(med),
          hint:'There are 4 values — an even number — so average the two middle ones, '+b+' and '+c+'.'};
      }},
      {gen:function(){
        var o=Q.mc('put the values in order first',
          ['add all the values','find the largest value','count how many values there are']);
        return {type:'mc', q:'What must you always do BEFORE finding the median?',
          options:o.options, answer:o.answer,
          hint:'The median is the middle of the ORDERED list.'};
      }},
    ]
  });

  /* ============================ FORM 2 ============================ */

  set('2.3.1', {
    notes:[
      {h:'Reading a frequency distribution', html:
        '<p>A <b>frequency distribution</b> lists each value with how often it occurs. Read it as shorthand for a much longer list:</p>'+
        '<div class="formula">Score (x)&nbsp;&nbsp;|&nbsp; 1 &nbsp; 2 &nbsp; 3 &nbsp; 4<br>'+
        'Frequency (f)&nbsp;|&nbsp; 2 &nbsp; 5 &nbsp; 8 &nbsp; 5</div>'+
        '<p>This means 1 occurred twice, 2 occurred five times, and so on — twenty values in all.</p>'+
        '<p>The total number of values is <b>Σf</b> (the sum of the frequency row) = 2 + 5 + 8 + 5 = 20.</p>'},
      {h:'Mean, median and mode from a table', html:
        '<div class="formula">Mean = '+f('Σfx','Σf')+'</div>'+
        '<p>Add an <b>fx</b> row: multiply each value by its frequency, then total it.</p>'+
        '<ul><li>fx: 1×2 = 2, 2×5 = 10, 3×8 = 24, 4×5 = 20 → Σfx = 56.</li>'+
        '<li>Mean = 56 ÷ 20 = <b>2.8</b>.</li></ul>'+
        '<p><b>Mode</b> — the value with the highest frequency, here <b>3</b> (frequency 8).</p>'+
        '<p><b>Median</b> — with 20 values the middle is between the 10th and 11th. Counting along: values 1–2 are "1", 3–7 are "2", 8–15 are "3". So both the 10th and 11th are 3, giving a median of <b>3</b>.</p>'+
        '<p>The mean need not be one of the values, and often is not a whole number.</p>'},
      {h:'Which average to use', html:
        '<ul><li><b>Mean</b> — uses every value, so it is the most representative, <i>but</i> it is dragged badly by extreme values (outliers).</li>'+
        '<li><b>Median</b> — better when there are outliers, e.g. for house prices or salaries.</li>'+
        '<li><b>Mode</b> — the only one that works for categories (colours, brands), and useful for "most popular".</li></ul>'+
        '<p><i>For 2, 3, 3, 4, 200 the mean is 42.4 — higher than almost every value. The median, 3, describes the data far better.</i></p>'},
      {h:'Types of data', html:
        '<ul><li><b>Nominal</b> — names or labels with no order: eye colour, team names.</li>'+
        '<li><b>Ordinal</b> — ordered categories, but the gaps are not measurable: small/medium/large, exam grades.</li>'+
        '<li><b>Interval</b> — numerical with equal gaps, but no true zero: temperature in °C.</li>'+
        '<li><b>Ratio</b> — numerical with equal gaps and a true zero: height, mass, money.</li></ul>'+
        '<p>The test for ratio is whether "twice as much" means anything. 40 kg really is twice 20 kg, so mass is ratio; 40 °C is not "twice as hot" as 20 °C, so temperature is interval.</p>'},
    ],
    examples:[
      {q:'Find the mean of the distribution x = 1, 2, 3, 4 with frequencies f = 2, 5, 8, 5.',
       answer:'2.8',
       steps:['Work out fx for each column: 1×2 = 2, 2×5 = 10, 3×8 = 24, 4×5 = 20.',
              'Σfx = 2 + 10 + 24 + 20 = 56.','Σf = 2 + 5 + 8 + 5 = 20.',
              'Mean = 56 ÷ 20 = 2.8.']},
      {q:'A set of salaries has one very large value. Which average best describes it, and why?',
       answer:'The median, because the mean is distorted by the outlier',
       steps:['The mean adds every value, so one huge salary pulls it upwards.',
              'The result would be higher than nearly everyone actually earns.',
              'The median is the middle value, so a single extreme value barely moves it.',
              'So the median is the fairer summary here.']},
    ],
    practice:[
      {gen:function(){
        var xs=[1,2,3,4], fs=[Q.int(1,6),Q.int(2,8),Q.int(2,8),Q.int(1,6)];
        var sf=fs.reduce(function(a,b){return a+b;},0);
        var sfx=xs.reduce(function(a,x,i){return a+x*fs[i];},0);
        return {type:'text', q:'A distribution has x = '+xs.join(', ')+' with frequencies f = '+fs.join(', ')+
            '. Find the mean, to 2 decimal places.',
          answer:Q.dec(Q.fix(sfx/sf,2)),
          hint:'Σfx = '+sfx+' and Σf = '+sf+', so divide.'};
      }},
      {gen:function(){
        var xs=[1,2,3,4,5], fs=[], used={};
        for(var i=0;i<5;i++){ var v; do{ v=Q.int(1,12); }while(used[v]); used[v]=1; fs.push(v); }
        var maxi=fs.indexOf(Math.max.apply(null,fs));
        return {type:'text', q:'A distribution has x = '+xs.join(', ')+' with frequencies f = '+fs.join(', ')+
            '. What is the MODE?',
          answer:[String(xs[maxi])],
          hint:'The mode is the x value with the highest frequency ('+fs[maxi]+') — not the frequency itself.'};
      }},
      {gen:function(){
        var xs=[1,2,3,4], fs=[Q.int(1,6),Q.int(1,6),Q.int(1,6),Q.int(1,6)];
        var sf=fs.reduce(function(a,b){return a+b;},0);
        return {type:'text', q:'A distribution has frequencies f = '+fs.join(', ')+
            '. How many values are there altogether (Σf)?',
          answer:[String(sf)], hint:'Add up the frequency row.'};
      }},
      {gen:function(){
        var types=[['eye colour','nominal'],['football team names','nominal'],
                   ['small, medium, large','ordinal'],['exam grades A, B, C','ordinal'],
                   ['temperature in °C','interval'],['height in cm','ratio'],
                   ['mass in kg','ratio'],['money in dollars','ratio']];
        var t=Q.pick(types);
        var o=Q.mc(t[1], ['nominal','ordinal','interval','ratio'].filter(function(x){return x!==t[1];}));
        return {type:'mc', q:'What type of data is '+t[0]+'?', options:o.options, answer:o.answer,
          hint:'No order → nominal. Ordered but not measurable gaps → ordinal. Equal gaps, no true zero → interval. True zero → ratio.'};
      }},
      {gen:function(){
        var outlier=Q.chance(0.5);
        var o=Q.mc(outlier?'the median':'the mode',
          [outlier?'the mode':'the median','the range','the largest value']);
        return {type:'mc', q:'Which average is most appropriate '+
            (outlier?'for data containing one very extreme value':'for data made of categories like favourite colour')+'?',
          options:o.options, answer:o.answer,
          hint:outlier?'The mean would be dragged towards the extreme value.'
                      :'You cannot add or order colours, so only one average works.'};
      }},
    ]
  });

  set('2.3.2', {
    notes:[
      {h:'Discrete or continuous?', html:
        '<ul><li><b>Discrete</b> data is <b>counted</b> — whole, separate values. Number of children, goals scored, shoe size.</li>'+
        '<li><b>Continuous</b> data is <b>measured</b> — it can take any value in a range, limited only by your instrument. Height, mass, time, temperature.</li></ul>'+
        '<p>The test: could a value sit halfway between two others and still make sense? A height of 1.632 m makes sense; 2.5 children does not.</p>'+
        '<p>This choice decides the chart: discrete data gets a <b>bar chart</b> (with gaps), continuous data gets a <b>histogram</b> (no gaps).</p>'},
      {h:'Bar charts, histograms and line graphs', html:
        '<ul><li><b>Bar chart</b> — discrete or categorical data. Equal-width bars with <b>gaps</b> between them.</li>'+
        '<li><b>Histogram</b> — continuous data grouped into intervals. Bars <b>touch</b>, because the data flows without breaks.</li>'+
        '<li><b>Line graph</b> — shows change over <b>time</b>. Plot the points and join them; the direction shows a trend.</li></ul>'+
        bars([['5–9',4],['10–14',9],['15–19',7],['20–24',3]])+
        '<p>The gap between bars is the one visible difference between a bar chart and a histogram, and it is a favourite exam question.</p>'},
      {h:'Pie charts', html:
        '<p>A <b>pie chart</b> shows each category as a slice of a whole circle, so it is best for showing <b>proportions</b> of a total.</p>'+
        '<div class="formula">angle = '+f('frequency','total')+' × 360°</div>'+
        pie([['Walk',120],['Bus',150],['Car',90]])+
        '<p>For 30 pupils of whom 10 walk: angle = '+f('10','30')+' × 360 = <b>120°</b>.</p>'+
        '<p>The angles must total 360° — always check. To go backwards, frequency = '+f('angle','360')+' × total.</p>'},
      {h:'Drawing conclusions', html:
        '<p>Reading a chart means more than reading numbers off it. Say what it <i>shows</i>: which category is largest, whether the trend rises or falls, whether anything looks unusual.</p>'+
        '<p>Be careful of charts whose scale does not start at zero — differences look far bigger than they are.</p>'},
    ],
    examples:[
      {q:'In a survey of 40 pupils, 12 travel by bus. Find the angle for "bus" on a pie chart.',
       answer:'108°',
       steps:['angle = (frequency ÷ total) × 360°.','= (12 ÷ 40) × 360.',
              '= 0.3 × 360 = 108°.']},
      {q:'Why does a histogram have no gaps between its bars, while a bar chart does?',
       answer:'Because a histogram shows continuous data, which flows without breaks',
       steps:['A bar chart shows discrete or categorical data — separate, distinct groups, so gaps are correct.',
              'A histogram shows continuous data grouped into intervals.',
              'Those intervals join end to end with no values missing between them.',
              'So the bars must touch to show the data is unbroken.']},
    ],
    practice:[
      {gen:function(){
        var total=Q.pick([20,24,30,36,40,45,60,72,90]);
        var freq=Q.int(2,Math.floor(total/2));
        var angle=Q.fix(freq/total*360,2);
        return {type:'text', q:'In a survey of '+total+' people, '+freq+
            ' chose one option. Find the angle for that option on a pie chart (in degrees).',
          answer:Q.dec(angle),
          hint:'angle = ('+freq+' ÷ '+total+') × 360.'};
      }},
      {gen:function(){
        var total=Q.pick([20,24,30,36,40,60,72,90,120]);
        var freq=Q.int(2,Math.floor(total/2)), angle=freq/total*360;
        if(angle!==Math.round(angle)){ total=36; freq=Q.int(2,18); angle=freq/total*360; }
        return {type:'text', q:'On a pie chart of '+total+' people, one slice has an angle of '+
            Q.fix(angle,2)+'°. How many people does it represent?',
          answer:[String(freq)],
          hint:'frequency = (angle ÷ 360) × '+total+'.'};
      }},
      {gen:function(){
        var disc=['the number of children in a family','goals scored in a match',
                  'the number of cars in a car park','shoe size'];
        var cont=['the height of a plant','the mass of a parcel','the time taken to run 100 m',
                  'the temperature of a room'];
        var askDisc=Q.chance(0.5);
        var o=Q.mc(askDisc?Q.pick(disc):Q.pick(cont), askDisc?Q.sample(cont,3):Q.sample(disc,3));
        return {type:'mc', q:'Which of these is '+(askDisc?'DISCRETE':'CONTINUOUS')+' data?',
          options:o.options, answer:o.answer,
          hint:'Counted → discrete. Measured → continuous.'};
      }},
      {gen:function(){
        var charts=[['discrete or categorical data','a bar chart'],
                    ['continuous data grouped into intervals','a histogram'],
                    ['a change over time','a line graph'],
                    ['proportions of a whole','a pie chart']];
        var c=Q.pick(charts);
        var o=Q.mc(c[1], ['a bar chart','a histogram','a line graph','a pie chart']
                            .filter(function(x){return x!==c[1];}));
        return {type:'mc', q:'Which chart is most appropriate for showing '+c[0]+'?',
          options:o.options, answer:o.answer,
          hint:'Match the chart to the kind of data — and remember histograms are for continuous data.'};
      }},
      {gen:function(){
        var hist=Q.chance(0.5);
        var o=Q.mc(hist?'a histogram':'a bar chart', [hist?'a bar chart':'a histogram','a pie chart','a line graph']);
        return {type:'mc', q:'Which chart has bars with '+(hist?'NO gaps':'gaps')+' between them?',
          options:o.options, answer:o.answer,
          hint:'Continuous data flows without breaks, so its bars touch.'};
      }},
      {gen:function(){
        var a=Q.int(40,140), b=Q.int(40,140), c=360-a-b;
        while(c<20||c>200){ a=Q.int(40,140); b=Q.int(40,140); c=360-a-b; }
        return {type:'text', q:'A pie chart has three slices. Two of them are '+a+'° and '+b+
            '°. Find the third (in degrees).',
          answer:[String(c), c+'°'], hint:'The angles of a pie chart must add to 360°.'};
      }},
    ]
  });

  /* ============================ FORM 3 ============================ */

  set('3.3.1', {
    notes:[
      {h:'The language of probability', html:
        '<p><b>Probability</b> measures how likely something is.</p>'+
        '<ul><li>An <b>experiment</b> (or trial) is the thing you do — rolling a die, tossing a coin.</li>'+
        '<li>An <b>outcome</b> is one possible result.</li>'+
        '<li>The <b>sample space</b> is the set of <i>all</i> possible outcomes. For a die: {1,2,3,4,5,6}.</li>'+
        '<li>An <b>event</b> is the outcome or outcomes you are interested in — "rolling an even number" is the event {2,4,6}.</li></ul>'},
      {h:'The probability formula', html:
        '<div class="formula">P(E) = '+f('number of favourable outcomes','total number of possible outcomes')+'</div>'+
        '<p>This assumes every outcome is <b>equally likely</b> — a fair die, a fair coin, a well-shuffled pack.</p>'+
        '<p>Rolling an even number on a fair die: 3 favourable out of 6, so P = '+f('3','6')+' = '+f('1','2')+'.</p>'+
        '<p>Give the answer as a fraction in its lowest terms unless asked otherwise. A decimal or percentage is also correct.</p>'},
      {h:'Probability always lies between 0 and 1', html:
        '<div class="formula">0 ≤ P(E) ≤ 1</div>'+
        '<ul><li><b>P = 0</b> — impossible (rolling a 7 on an ordinary die).</li>'+
        '<li><b>P = 1</b> — certain (rolling a number less than 7).</li>'+
        '<li>The closer to 1, the more likely.</li></ul>'+
        '<p>An answer bigger than 1, or negative, is always a mistake — usually favourable and total the wrong way up.</p>'+
        '<p>All the probabilities of a sample space add to <b>1</b>, which gives the complement rule:</p>'+
        '<div class="formula">P(not E) = 1 − P(E)</div>'+
        '<p>If P(rain) = '+f('1','4')+' then P(no rain) = 1 − '+f('1','4')+' = '+f('3','4')+'.</p>'},
      {h:'Probability in the real world', html:
        '<p>Probability drives real decisions: weather forecasting, insurance premiums, medical screening, quality control in a factory, and risk in games.</p>'+
        '<p><b>Theoretical</b> probability is worked out by counting outcomes. <b>Experimental</b> probability comes from actually doing trials — and the more trials you run, the closer it usually gets to the theoretical value.</p>'},
    ],
    examples:[
      {q:'A bag holds 4 red, 3 blue and 5 green marbles. One is picked at random. Find P(blue).',
       answer:f('1','4'),
       steps:['Total marbles = 4 + 3 + 5 = 12.','Favourable (blue) = 3.',
              'P(blue) = '+f('3','12')+'.','Simplify by dividing by 3: '+f('1','4')+'.']},
      {q:'The probability of rain tomorrow is '+f('2','5')+'. What is the probability it does not rain?',
       answer:f('3','5'),
       steps:['The two probabilities must add to 1.','P(not rain) = 1 − '+f('2','5')+'.',
              '= '+f('5','5')+' − '+f('2','5')+' = '+f('3','5')+'.']},
    ],
    practice:[
      {gen:function(){
        var cols=[['red',Q.int(2,8)],['blue',Q.int(2,8)],['green',Q.int(2,8)]];
        var total=cols.reduce(function(a,c){return a+c[1];},0);
        var pick=Q.pick(cols), s=Q.simp(pick[1],total);
        return {type:'text', q:'A bag holds '+cols.map(function(c){return c[1]+' '+c[0];}).join(', ')+
            ' marbles. One is picked at random. Find P('+pick[0]+') as a fraction in its lowest terms (e.g. 1/4).',
          answer:[s[0]+'/'+s[1]],
          hint:'Total = '+total+', favourable = '+pick[1]+'. Then simplify.'};
      }},
      {gen:function(){
        var sides=Q.pick([6,6,6,8,10,12]);   // usually an ordinary die, sometimes not
        var faces=[]; for(var i=1;i<=sides;i++) faces.push(i);
        var k=Q.int(2,sides-1);
        var events=[['an even number',function(x){return x%2===0;}],
                    ['an odd number',function(x){return x%2===1;}],
                    ['a number greater than '+k,function(x){return x>k;}],
                    ['a number less than '+k,function(x){return x<k;}],
                    ['a '+k,function(x){return x===k;}],
                    ['a multiple of 3',function(x){return x%3===0;}],
                    ['a multiple of 4',function(x){return x%4===0;}],
                    ['a prime number',function(x){return [2,3,5,7,11].indexOf(x)>-1;}]];
        var e=Q.pick(events), n=faces.filter(e[1]).length;
        if(n===0) { e=events[0]; n=faces.filter(e[1]).length; }
        var s=Q.simp(n,sides);
        return {type:'text', q:'A fair '+sides+'-sided die is rolled. Find P('+e[0]+
            ') as a fraction in its lowest terms (e.g. 1/2).',
          answer:[s[0]+'/'+s[1]],
          hint:'Count the favourable outcomes out of '+sides+', then simplify.'};
      }},
      {gen:function(){
        var b=Q.pick([4,5,6,8,10]), a=Q.int(1,b-1), s=Q.simp(b-a,b);
        return {type:'text', q:'The probability that it rains tomorrow is '+f(a,b)+
            '. Find the probability that it does NOT rain, as a fraction (e.g. 3/4).',
          answer:[s[0]+'/'+s[1], (b-a)+'/'+b],
          hint:'P(not E) = 1 − P(E) = '+f(b,b)+' − '+f(a,b)+'.'};
      }},
      {gen:function(){
        var kind=Q.pick([['rolling a 7 on an ordinary six-sided die','0 — impossible'],
                         ['rolling a number less than 7 on a six-sided die','1 — certain'],
                         ['tossing a fair coin and getting heads','½ — equally likely'],
                         ['drawing a red card from a normal pack','½ — equally likely']]);
        var o=Q.mc(kind[1], ['0 — impossible','1 — certain','½ — equally likely']
                              .filter(function(x){return x!==kind[1];}).concat(['2 — very likely']));
        return {type:'mc', q:'What is the probability of '+kind[0]+'?',
          options:o.options, answer:o.answer,
          hint:'Probability always lies between 0 and 1 — never above it.'};
      }},
      {gen:function(){
        // every word here has all-different letters, so "how many outcomes" is unambiguous
        var word=Q.pick(['MATHS','NUMBER','ANGLE','GRAPH','VOLUME','SECTOR','PRIME','SQUARE','FACTOR','CUBOID']);
        var things=[['a fair coin is tossed once',2],['a fair six-sided die is rolled once',6],
                    ['a card is drawn from a normal pack',52],
                    ['a letter is chosen from the word '+word,word.length],
                    ['a day is chosen from a week',7],['a month is chosen from a year',12],
                    ['a fair eight-sided die is rolled once',8],
                    ['a ball is chosen from balls numbered 1 to 20',20],
                    ['a suit is chosen from a pack of cards',4]];
        var t=Q.pick(things);
        return {type:'text', q:'How many outcomes are in the sample space when '+t[0]+'?',
          answer:[String(t[1])], hint:'The sample space lists every possible outcome.'};
      }},
      {gen:function(){
        var o=Q.mc('It must be wrong — probability can never exceed 1',
          ['It means the event is very likely','It means the event is certain',
           'It is fine if there are many outcomes']);
        return {type:'mc', q:'A student calculates a probability of '+Q.fix(1+Q.int(1,9)/10,1)+'. What does that tell you?',
          options:o.options, answer:o.answer,
          hint:'0 ≤ P(E) ≤ 1 always. Check favourable and total are the right way up.'};
      }},
    ]
  });

})();
