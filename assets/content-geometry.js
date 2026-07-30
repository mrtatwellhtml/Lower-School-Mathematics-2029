/* Full content for the Geometry strand (Forms 1-3).
   Same pattern as the other content files. Loaded after data.js and qgen.js.

   Geometry is the first strand that needs pictures, so the notes use small inline
   SVG diagrams via the dia() helper below. They are plain markup with no external
   files, so they cost nothing and work offline. */
(function(){
  var C=window.CURRICULUM; if(!C) return;
  var Q=window.QG;
  function f(a,b){ return '<span class="frac"><span>'+a+'</span><span>'+b+'</span></span>'; }
  // A column vector is NOT a fraction — same stacking, but bracketed and with no dividing line.
  function vec(a,b){ return '<span class="vec"><span>'+Q.num(a)+'</span><span>'+Q.num(b)+'</span></span>'; }
  function set(code,content){ if(C[code]) C[code].content=content; }

  // ---- diagram helpers: shared primitives from qgen.js ------------------
  var INK=Q.INK, ACC=Q.ACC, FILL=Q.FILL;
  var dia=Q.dia, ln=Q.ln, txt=Q.txt, poly=Q.polyg, arc=Q.arc, rightAngle=Q.rightAngle;

  /* ============================ FORM 1 ============================ */

  set('1.4.1', {
    notes:[
      {h:'Solids: faces, edges and vertices', html:
        '<p>A <b>solid</b> is a 3-D object. We describe it by three counts:</p>'+
        '<ul><li><b>Face</b> — a flat surface.</li>'+
        '<li><b>Edge</b> — where two faces meet.</li>'+
        '<li><b>Vertex</b> — a corner where edges meet (plural: vertices).</li></ul>'+
        '<div class="formula">Cube: 6 faces, 12 edges, 8 vertices&nbsp;·&nbsp;Square pyramid: 5 faces, 8 edges, 5 vertices<br>'+
        'Triangular prism: 5 faces, 9 edges, 6 vertices&nbsp;·&nbsp;Cylinder: 3 faces, 2 edges, 0 vertices</div>'+
        '<p>For any solid with flat faces, <b>Euler\'s rule</b> holds: F + V − E = 2. Check the cube: 6 + 8 − 12 = 2 ✓</p>'},
      {h:'Nets', html:
        '<p>A <b>net</b> is the solid unfolded flat. Fold it back up and you get the solid — so the net shows every face at once, which is exactly what you need for surface area.</p>'+
        '<p>The net of a cube is six squares (there are 11 different arrangements that work). The net of a square pyramid is a square with a triangle on each side.</p>'+
        dia(260,110,
          [1,2,3,4].map(function(i){ return '<rect x="'+(20+i*40-40)+'" y="40" width="38" height="38" fill="'+FILL+'" stroke="'+INK+'" stroke-width="2"/>'; }).join('')+
          '<rect x="60" y="2" width="38" height="38" fill="'+FILL+'" stroke="'+INK+'" stroke-width="2"/>'+
          '<rect x="60" y="78" width="38" height="38" fill="'+FILL+'" stroke="'+INK+'" stroke-width="2"/>'+
          txt(200,62,'net of a cube'))},
      {h:'Polygons', html:
        '<p>A <b>polygon</b> is a closed flat shape with straight sides. It is <b>regular</b> if all sides and all angles are equal.</p>'+
        '<div class="formula">3 triangle · 4 quadrilateral · 5 pentagon · 6 hexagon · 7 heptagon · 8 octagon · 9 nonagon · 10 decagon</div>'+
        '<p>A shape with a curved edge (a circle) is <b>not</b> a polygon.</p>'+
        '<h3>Tessellation</h3>'+
        '<p>Shapes <b>tessellate</b> if copies fit together with no gaps and no overlaps. Squares, equilateral triangles and regular hexagons tessellate on their own — because their angles divide exactly into 360°. Regular pentagons do not (108° does not divide into 360°).</p>'},
    ],
    examples:[
      {q:'How many faces, edges and vertices does a triangular prism have?', answer:'5 faces, 9 edges, 6 vertices',
       steps:['Faces: 2 triangular ends + 3 rectangular sides = 5.',
              'Edges: 3 around each triangle (6) + 3 joining them = 9.',
              'Vertices: 3 corners on each triangle = 6.',
              'Check with Euler: 5 + 6 − 9 = 2 ✓']},
      {q:'Explain why regular hexagons tessellate but regular pentagons do not.',
       answer:'Hexagon angles are 120°, and 3 × 120° = 360°; pentagon angles are 108°, which does not divide into 360°',
       steps:['At any point where shapes meet, the angles must add to exactly 360°.',
              'A regular hexagon has interior angles of 120°. Three meet: 3 × 120 = 360 ✓',
              'A regular pentagon has interior angles of 108°. Three give 324° (a gap), four give 432° (an overlap).',
              'So hexagons tessellate and pentagons do not.']},
    ],
    practice:[
      {gen:function(){
        var solids=[['cube',6,12,8],['cuboid',6,12,8],['square-based pyramid',5,8,5],
                    ['triangular prism',5,9,6],['tetrahedron (triangular pyramid)',4,6,4],
                    ['hexagonal prism',8,18,12]];
        var s=Q.pick(solids), which=Q.pick([[1,'faces'],[2,'edges'],[3,'vertices']]);
        return {type:'text', q:'How many '+which[1]+' does a '+s[0]+' have?',
          answer:[String(s[which[0]])],
          hint:'Faces are flat surfaces, edges are where two faces meet, vertices are corners.'};
      }},
      {gen:function(){
        var polys=[[3,'triangle'],[4,'quadrilateral'],[5,'pentagon'],[6,'hexagon'],
                   [7,'heptagon'],[8,'octagon'],[9,'nonagon'],[10,'decagon']];
        var p=Q.pick(polys), askName=Q.chance(0.5);
        if(askName){
          var o=Q.mc(p[1], Q.sample(polys.filter(function(x){return x!==p;}),3).map(function(x){return x[1];}));
          return {type:'mc', q:'What is the name of a polygon with '+p[0]+' sides?',
            options:o.options, answer:o.answer, hint:'Count up from triangle (3) and quadrilateral (4).'};
        }
        return {type:'text', q:'How many sides does a '+p[1]+' have?', answer:[String(p[0])],
          hint:'The name tells you the number of sides.'};
      }},
      {gen:function(){
        var yes=['square','equilateral triangle','regular hexagon','rectangle'];
        var no=['regular pentagon','regular heptagon','regular nonagon','circle'];
        var askYes=Q.chance(0.5);
        var o=Q.mc(askYes?Q.pick(yes):Q.pick(no), askYes?Q.sample(no,3):Q.sample(yes,3));
        return {type:'mc', q:'Which of these '+(askYes?'DOES':'does NOT')+' tessellate on its own?',
          options:o.options, answer:o.answer,
          hint:'The angles meeting at a point must add to exactly 360°.'};
      }},
      {gen:function(){
        var solids=[['cube',6,12,8],['square-based pyramid',5,8,5],['triangular prism',5,9,6],
                    ['tetrahedron',4,6,4],['pentagonal prism',7,15,10],['hexagonal prism',8,18,12],
                    ['octahedron',8,12,6],['pentagonal pyramid',6,10,6],['hexagonal pyramid',7,12,7],
                    ['cuboid',6,12,8],['heptagonal prism',9,21,14],['octagonal prism',10,24,16]];
        var s=Q.pick(solids);
        return {type:'text', q:'A '+s[0]+' has '+s[1]+' faces and '+s[3]+
            ' vertices. Use Euler\'s rule F + V − E = 2 to find the number of edges.',
          answer:[String(s[2])],
          hint:s[1]+' + '+s[3]+' − E = 2, so E = '+s[1]+' + '+s[3]+' − 2.'};
      }},
      {gen:function(){
        var items=[['a shape with six square faces','cube'],
                   ['a solid that tapers from a square base to a point','square-based pyramid'],
                   ['a solid with two circular ends and no vertices','cylinder'],
                   ['a solid with two triangular ends and three rectangular faces','triangular prism']];
        var it=Q.pick(items);
        var all=['cube','square-based pyramid','cylinder','triangular prism','cone','sphere'];
        var o=Q.mc(it[1], Q.sample(all.filter(function(x){return x!==it[1];}),3));
        return {type:'mc', q:'Which solid is '+it[0]+'?', options:o.options, answer:o.answer,
          hint:'Picture unfolding it into its net.'};
      }},
    ]
  });

  set('1.4.2', {
    notes:[
      {h:'The building blocks', html:
        '<ul><li>A <b>point</b> marks a position. It has no size. We label it with a capital letter: A.</li>'+
        '<li>A <b>straight line</b> goes on for ever in both directions.</li>'+
        '<li>A <b>line segment</b> is the part between two points — it has a definite length. Written AB.</li>'+
        '<li>A <b>ray</b> starts at a point and goes on for ever in one direction.</li></ul>'+
        dia(300,120,
          ln(20,25,180,25)+'<polygon points="180,20 194,25 180,30" fill="'+INK+'"/>'+
          '<polygon points="20,20 6,25 20,30" fill="'+INK+'"/>'+txt(240,29,'line')+
          ln(20,60,180,60)+'<circle cx="20" cy="60" r="4" fill="'+INK+'"/>'+
          '<circle cx="180" cy="60" r="4" fill="'+INK+'"/>'+txt(245,64,'segment')+
          ln(20,95,180,95)+'<circle cx="20" cy="95" r="4" fill="'+INK+'"/>'+
          '<polygon points="180,90 194,95 180,100" fill="'+INK+'"/>'+txt(238,99,'ray'))},
      {h:'Parallel and perpendicular', html:
        '<p><b>Parallel</b> lines run in the same direction and stay exactly the same distance apart. They never meet, however far you extend them. We mark them with matching arrows.</p>'+
        '<p><b>Perpendicular</b> lines cross at a right angle (90°). We mark the right angle with a small square.</p>'+
        dia(300,120,
          ln(20,30,140,30,ACC)+ln(20,70,140,70,ACC)+
          '<polygon points="72,25 82,30 72,35" fill="'+ACC+'"/>'+
          '<polygon points="72,65 82,70 72,75" fill="'+ACC+'"/>'+
          txt(80,100,'parallel')+
          ln(190,15,190,95)+ln(170,55,270,55)+rightAngle(190,55,12,-12)+
          txt(230,110,'perpendicular'))+
        '<p>The symbol for parallel is <b>∥</b> and for perpendicular is <b>⊥</b>. So AB ∥ CD, and PQ ⊥ RS.</p>'},
    ],
    examples:[
      {q:'What is the difference between a line, a line segment and a ray?',
       answer:'A line goes on for ever both ways; a segment has two endpoints; a ray has one endpoint and goes on for ever one way',
       steps:['A line has no endpoints — arrows on both ends.',
              'A line segment has two endpoints, so it has a measurable length.',
              'A ray has exactly one endpoint and continues for ever in the other direction.']},
      {q:'The rungs of a ladder are all the same distance apart and never meet the others. What word describes them?',
       answer:'Parallel',
       steps:['Parallel lines stay the same distance apart.','They never meet no matter how far they are extended.',
              'The rungs of a ladder are therefore parallel to one another.']},
    ],
    practice:[
      {gen:function(){
        var defs=[['goes on for ever in both directions','a straight line'],
                  ['has two endpoints and a definite length','a line segment'],
                  ['starts at one point and goes on for ever in one direction','a ray'],
                  ['marks a position and has no size','a point']];
        var d=Q.pick(defs);
        var all=['a straight line','a line segment','a ray','a point'];
        var o=Q.mc(d[1], all.filter(function(x){return x!==d[1];}));
        return {type:'mc', q:'Which term describes something that '+d[0]+'?',
          options:o.options, answer:o.answer, hint:'Think about whether it has endpoints, and how many.'};
      }},
      {gen:function(){
        var para=Q.chance(0.5);
        var o=Q.mc(para?'parallel':'perpendicular', [para?'perpendicular':'parallel','intersecting','curved']);
        return {type:'mc', q:'Two lines '+(para?'stay exactly the same distance apart and never meet'
                                              :'cross each other at a right angle')+'. What are they called?',
          options:o.options, answer:o.answer,
          hint:para?'Same distance apart for ever.':'A right angle is 90°.'};
      }},
      {gen:function(){
        var items=[['the opposite edges of a ruler','parallel'],['the corner of a page','perpendicular'],
                   ['the rungs of a ladder','parallel'],['the lines of a football pitch meeting at a corner','perpendicular'],
                   ['railway tracks','parallel'],['the hands of a clock at 3 o\'clock','perpendicular'],
                   ['the opposite sides of a rectangle','parallel'],['the walls and floor of a room','perpendicular'],
                   ['the lines on ruled paper','parallel'],['the arms of a capital L','perpendicular']];
        var it=Q.pick(items);
        var o=Q.mc(it[1], [it[1]==='parallel'?'perpendicular':'parallel','intersecting at 45°','curved']);
        return {type:'mc', q:'Are '+it[0]+' parallel or perpendicular?',
          options:o.options, answer:o.answer,
          hint:'Do they stay apart for ever, or do they meet at 90°?'};
      }},
      {gen:function(){
        var sym=Q.chance(0.5);
        var o=Q.mc(sym?'∥':'⊥', [sym?'⊥':'∥','=','≅']);
        return {type:'mc', q:'Which symbol means "is '+(sym?'parallel':'perpendicular')+' to"?',
          options:o.options, answer:o.answer,
          hint:sym?'The symbol looks like two parallel lines.':'The symbol looks like a right angle.'};
      }},
      {gen:function(){
        var n=Q.int(3,12);
        return {type:'text', q:'How many line segments make up the outline of a polygon with '+n+' sides?',
          answer:[String(n)], hint:'Each side of a polygon is one line segment.'};
      }},
    ]
  });

  set('1.4.3', {
    notes:[
      {h:'An angle is an amount of turn', html:
        '<p>An <b>angle</b> measures how far something has turned, not how long the lines are. Two lines drawn short or long make the same angle if the turn is the same.</p>'+
        '<div class="formula">Quarter turn = 90°&nbsp;·&nbsp;Half turn = 180°&nbsp;·&nbsp;Three-quarter turn = 270°&nbsp;·&nbsp;Full turn = 360°</div>'},
      {h:'The five types', html:
        dia(340,110,
          ln(30,90,30,30)+ln(30,90,80,70)+arc(30,90,22,0,50)+txt(45,105,'acute')+
          ln(115,90,115,30)+ln(115,90,170,90)+rightAngle(115,90,14,-14)+txt(140,105,'right')+
          ln(215,90,215,30)+ln(215,90,175,55,INK)+arc(215,90,20,90,140)+txt(210,105,'obtuse')+
          ln(290,90,250,90)+ln(290,90,330,90)+arc(290,90,18,0,180)+txt(290,105,'straight'))+
        '<ul><li><b>Acute</b> — less than 90°</li>'+
        '<li><b>Right</b> — exactly 90°</li>'+
        '<li><b>Obtuse</b> — between 90° and 180°</li>'+
        '<li><b>Straight</b> — exactly 180°</li>'+
        '<li><b>Reflex</b> — between 180° and 360°</li></ul>'},
      {h:'Angle facts you will use constantly', html:
        '<div class="formula">Angles on a straight line add to <b>180°</b><br>'+
        'Angles around a point add to <b>360°</b><br>'+
        'Vertically opposite angles are <b>equal</b></div>'+
        '<p>So if one angle on a straight line is 125°, the other is 180 − 125 = <b>55°</b>.</p>'+
        '<p>To find a <b>reflex</b> angle, subtract the ordinary one from 360°: the reflex of 70° is 360 − 70 = <b>290°</b>.</p>'},
      {h:'Using a protractor', html:
        '<ol><li>Put the centre of the protractor exactly on the vertex.</li>'+
        '<li>Line the 0° line up along one arm.</li>'+
        '<li>Read where the other arm crosses the scale — use the scale that starts at 0 on your arm.</li></ol>'+
        '<p>Check your reading against the type: if the angle looks acute, the answer must be under 90°. That one check catches nearly every protractor mistake.</p>'},
    ],
    examples:[
      {q:'Two angles sit on a straight line. One is 118°. Find the other.', answer:'62°',
       steps:['Angles on a straight line add to 180°.','180 − 118 = 62.','So the other angle is 62°.']},
      {q:'Find the reflex angle that goes with an angle of 145°.', answer:'215°',
       steps:['A full turn is 360°.','The reflex angle is what is left: 360 − 145.','= 215°.']},
    ],
    practice:[
      {gen:function(){
        var a=Q.int(15,165);
        return {type:'text', q:'Two angles lie on a straight line. One is '+a+'°. Find the other (in degrees).',
          answer:[String(180-a), (180-a)+'°'], hint:'Angles on a straight line add to 180°.'};
      }},
      {gen:function(){
        var a=Q.int(20,170);
        return {type:'text', q:'Find the reflex angle that goes with an angle of '+a+'°.',
          answer:[String(360-a), (360-a)+'°'], hint:'A full turn is 360°, so subtract from 360.'};
      }},
      {gen:function(){
        var kinds=[[Q.int(1,89),'acute'],[90,'right'],[Q.int(91,179),'obtuse'],[180,'straight'],[Q.int(181,359),'reflex']];
        var k=Q.pick(kinds);
        var o=Q.mc(k[1], Q.sample(['acute','right','obtuse','straight','reflex'].filter(function(x){return x!==k[1];}),3));
        return {type:'mc', q:'What type of angle is '+k[0]+'°?', options:o.options, answer:o.answer,
          hint:'Under 90 acute, exactly 90 right, 90–180 obtuse, exactly 180 straight, over 180 reflex.'};
      }},
      {gen:function(){
        var a=Q.int(40,140), b=Q.int(40,Math.max(41,320-a-40)), c=360-a-b;
        return {type:'text', q:'Three angles meet at a point. Two of them are '+a+'° and '+b+
            '°. Find the third (in degrees).',
          answer:[String(c), c+'°'],
          hint:'Angles around a point add to 360°, so subtract '+a+' and '+b+' from 360.'};
      }},
      {gen:function(){
        var turns=[['a quarter turn',90],['a half turn',180],['a three-quarter turn',270],['a full turn',360]];
        var t=Q.pick(turns);
        var o=Q.mc(t[1]+'°', turns.filter(function(x){return x!==t;}).map(function(x){return x[1]+'°';}));
        return {type:'mc', q:'How many degrees is '+t[0]+'?', options:o.options, answer:o.answer,
          hint:'A full turn is 360°.'};
      }},
    ]
  });

  set('1.4.4', {
    notes:[
      {h:'The angle sum of a triangle', html:
        '<p>The three interior angles of <b>any</b> triangle always add to 180°. Tear the three corners off a paper triangle and fit them together — they make a straight line.</p>'+
        '<div class="formula">a + b + c = 180°</div>'+
        dia(240,120,
          poly('30,100 210,100 90,25')+
          txt(45,93,'a',ACC)+txt(196,93,'b',ACC)+txt(92,45,'c',ACC))+
        '<p>So if two angles are 65° and 40°, the third is 180 − 65 − 40 = <b>75°</b>.</p>'},
      {h:'Classifying triangles', html:
        '<p><b>By sides:</b></p>'+
        '<ul><li><b>Equilateral</b> — all 3 sides equal, all angles 60°.</li>'+
        '<li><b>Isosceles</b> — 2 sides equal, and the 2 <i>base angles</i> are equal.</li>'+
        '<li><b>Scalene</b> — all sides different, all angles different.</li></ul>'+
        '<p><b>By angles:</b> <b>acute-angled</b> (all under 90°), <b>right-angled</b> (one 90°), <b>obtuse-angled</b> (one over 90°).</p>'+
        '<p>A triangle can have <b>at most one</b> angle of 90° or more — two would already use up 180°.</p>'},
      {h:'Bigger side, bigger angle', html:
        '<p>In any triangle, the <b>largest angle is opposite the longest side</b>, and the smallest angle is opposite the shortest side.</p>'+
        '<p>That is why an isosceles triangle has two equal angles: the two equal sides sit opposite them.</p>'+
        '<h3>Drawing a triangle</h3>'+
        '<p>Given two sides and the angle between them (SAS): draw the base, measure the angle at one end with a protractor, mark the second side along it, join up.</p>'+
        '<p>Given one side and two angles (ASA): draw the side, construct the angle at each end, and extend the arms until they cross.</p>'},
    ],
    examples:[
      {q:'Two angles of a triangle are 72° and 55°. Find the third.', answer:'53°',
       steps:['The angles of a triangle add to 180°.','72 + 55 = 127.','180 − 127 = 53°.']},
      {q:'An isosceles triangle has an apex angle of 40°. Find each base angle.', answer:'70° each',
       steps:['The two base angles of an isosceles triangle are equal.',
              'They share what is left after the apex: 180 − 40 = 140°.',
              '140 ÷ 2 = 70° each.']},
    ],
    practice:[
      {gen:function(){
        var a=Q.int(20,110), b=Q.int(20,170-a), c=180-a-b;
        return {type:'text', q:'Two angles of a triangle are '+a+'° and '+b+'°. Find the third (in degrees).',
          answer:[String(c), c+'°'], hint:'The three angles add to 180°, so subtract both from 180.'};
      }},
      {gen:function(){
        var apex=2*Q.int(10,80), base=(180-apex)/2;
        return {type:'text', q:'An isosceles triangle has an apex angle of '+apex+
            '°. Find the size of each base angle (in degrees).',
          answer:[String(base), base+'°'],
          hint:'The two base angles are equal and share 180 − '+apex+' = '+(180-apex)+'°.'};
      }},
      {gen:function(){
        var kinds=[['all three sides equal','equilateral'],['exactly two sides equal','isosceles'],
                   ['all three sides different','scalene'],['one angle of exactly 90°','right-angled'],
                   ['one angle greater than 90°','obtuse-angled']];
        var k=Q.pick(kinds);
        var all=['equilateral','isosceles','scalene','right-angled','obtuse-angled'];
        var o=Q.mc(k[1], Q.sample(all.filter(function(x){return x!==k[1];}),3));
        return {type:'mc', q:'What do you call a triangle with '+k[0]+'?', options:o.options, answer:o.answer,
          hint:'Sides give equilateral/isosceles/scalene; angles give acute/right/obtuse-angled.'};
      }},
      {gen:function(){
        var o=Q.mc('60°', ['90°','45°','180°']);
        return {type:'mc', q:'What is the size of each angle in an equilateral triangle?',
          options:o.options, answer:o.answer, hint:'Three equal angles sharing 180°.'};
      }},
      {gen:function(){
        var a=Q.int(25,80), b=Q.int(25,80), c=180-a-b;
        while(c<=0||c>=180){ a=Q.int(25,80); b=Q.int(25,80); c=180-a-b; }
        var sides=[[a,'a'],[b,'b'],[c,'c']];
        var biggest=sides.reduce(function(x,y){ return x[0]>=y[0]?x:y; });
        var o=Q.mc('the side opposite the '+biggest[0]+'° angle',
          sides.filter(function(s){return s!==biggest;}).map(function(s){return 'the side opposite the '+s[0]+'° angle';})
            .concat(['all three sides are equal']));
        return {type:'mc', q:'A triangle has angles '+a+'°, '+b+'° and '+c+'°. Which is the LONGEST side?',
          options:o.options, answer:o.answer,
          hint:'The longest side is always opposite the largest angle.'};
      }},
    ]
  });

  set('1.4.5', {
    notes:[
      {h:'The angle sum of a quadrilateral', html:
        '<p>Any quadrilateral splits into <b>two triangles</b> by drawing one diagonal. Two triangles give 2 × 180°, so:</p>'+
        '<div class="formula">The interior angles of a quadrilateral add to <b>360°</b></div>'+
        dia(240,130,
          poly('25,110 215,110 180,25 60,30')+
          ln(25,110,180,25,ACC)+
          txt(120,125,'one diagonal makes two triangles',ACC,11))+
        '<p>So if three angles are 100°, 85° and 95°, the fourth is 360 − 280 = <b>80°</b>.</p>'},
      {h:'The family of quadrilaterals', html:
        '<ul><li><b>Square</b> — 4 equal sides, 4 right angles, diagonals equal and perpendicular.</li>'+
        '<li><b>Rectangle</b> — opposite sides equal, 4 right angles, diagonals equal.</li>'+
        '<li><b>Rhombus</b> — 4 equal sides, opposite angles equal, diagonals perpendicular.</li>'+
        '<li><b>Parallelogram</b> — opposite sides parallel and equal, opposite angles equal.</li>'+
        '<li><b>Trapezium</b> — exactly one pair of parallel sides.</li>'+
        '<li><b>Kite</b> — two pairs of adjacent sides equal, one pair of opposite angles equal.</li></ul>'+
        '<p>They overlap: every square is also a rectangle, a rhombus <i>and</i> a parallelogram. A square is simply the most special of them all.</p>'},
      {h:'Using the properties', html:
        '<p>In a <b>parallelogram</b> the opposite angles are equal and neighbouring angles add to 180°. So one angle of 70° forces the others to be 110°, 70° and 110°.</p>'+
        '<p>When drawing a quadrilateral from measurements, draw the longest side first, then build each angle and side in turn with protractor and ruler.</p>'},
    ],
    examples:[
      {q:'Three angles of a quadrilateral are 95°, 120° and 60°. Find the fourth.', answer:'85°',
       steps:['The angles of a quadrilateral add to 360°.','95 + 120 + 60 = 275.','360 − 275 = 85°.']},
      {q:'One angle of a parallelogram is 65°. Find the other three.', answer:'115°, 65° and 115°',
       steps:['Opposite angles of a parallelogram are equal, so one other angle is also 65°.',
              'Neighbouring angles add to 180°: 180 − 65 = 115°.',
              'So the angles are 65°, 115°, 65°, 115°.']},
    ],
    practice:[
      {gen:function(){
        var a=Q.int(50,130), b=Q.int(50,130), c=Q.int(50,130), d=360-a-b-c;
        while(d<20||d>170){ a=Q.int(50,130); b=Q.int(50,130); c=Q.int(50,130); d=360-a-b-c; }
        return {type:'text', q:'Three angles of a quadrilateral are '+a+'°, '+b+'° and '+c+
            '°. Find the fourth (in degrees).',
          answer:[String(d), d+'°'], hint:'They add to 360°, so subtract all three from 360.'};
      }},
      {gen:function(){
        var a=Q.int(35,145);
        return {type:'text', q:'One angle of a parallelogram is '+a+
            '°. Find the size of the angle NEXT TO it (in degrees).',
          answer:[String(180-a), (180-a)+'°'],
          hint:'Neighbouring angles of a parallelogram add to 180°.'};
      }},
      {gen:function(){
        var props=[['4 equal sides and 4 right angles','square'],
                   ['opposite sides equal and 4 right angles','rectangle'],
                   ['4 equal sides but no right angles needed','rhombus'],
                   ['exactly one pair of parallel sides','trapezium'],
                   ['two pairs of adjacent sides equal','kite'],
                   ['opposite sides parallel and equal','parallelogram']];
        var p=Q.pick(props);
        var all=['square','rectangle','rhombus','trapezium','kite','parallelogram'];
        var o=Q.mc(p[1], Q.sample(all.filter(function(x){return x!==p[1];}),3));
        return {type:'mc', q:'Which quadrilateral has '+p[0]+'?', options:o.options, answer:o.answer,
          hint:'Check the sides first, then the angles.'};
      }},
      {gen:function(){
        var o=Q.mc('360°', ['180°','270°','540°']);
        return {type:'mc', q:'What do the interior angles of ANY quadrilateral add up to?',
          options:o.options, answer:o.answer, hint:'It splits into two triangles, each 180°.'};
      }},
      {gen:function(){
        var a=Q.int(40,140);
        return {type:'text', q:'One angle of a parallelogram is '+a+
            '°. What is the size of the angle OPPOSITE it (in degrees)?',
          answer:[String(a), a+'°'], hint:'Opposite angles of a parallelogram are equal.'};
      }},
    ]
  });

  set('1.4.6', {
    notes:[
      {h:'Translation — a slide', html:
        '<p>A <b>translation</b> slides every point of a shape the same distance in the same direction. Nothing turns and nothing changes size.</p>'+
        '<p>The image is <b>congruent</b> to the object — identical in shape and size, just in a new place. We describe the slide by how far right/left and how far up/down.</p>'+
        '<div class="formula">"4 right and 2 down" moves every point the same way</div>'},
      {h:'Reflection — a mirror image', html:
        '<p>A <b>reflection</b> flips the shape over a <b>mirror line</b>. Each point of the image is:</p>'+
        '<ul><li>the <b>same distance</b> from the mirror line as the original point, and</li>'+
        '<li>on the <b>opposite side</b>, measured at right angles to the line.</li></ul>'+
        '<p>Any point sitting <i>on</i> the mirror line does not move. A reflection reverses the shape — like reading text in a mirror — but keeps its size.</p>'+
        dia(280,120,
          ln(140,10,140,110,ACC)+
          poly('40,35 100,35 70,90')+poly('240,35 180,35 210,90')+
          txt(140,118,'mirror line',ACC,11))},
      {h:'Lines of symmetry', html:
        '<p>A shape has a <b>line of symmetry</b> if folding along that line makes the two halves match exactly.</p>'+
        '<div class="formula">Square: 4&nbsp;·&nbsp;Rectangle: 2&nbsp;·&nbsp;Equilateral triangle: 3&nbsp;·&nbsp;'+
        'Isosceles triangle: 1&nbsp;·&nbsp;Regular hexagon: 6&nbsp;·&nbsp;Circle: infinitely many</div>'+
        '<p>A regular polygon with n sides has exactly <b>n</b> lines of symmetry.</p>'+
        '<p><b>Letters:</b> A, M, T, U, V, W, Y have a vertical line of symmetry. B, C, D, E, K have a horizontal one. H, I, O, X have both. F, G, J, L, N, P, Q, R, S, Z have none.</p>'},
    ],
    examples:[
      {q:'A triangle is translated 5 right and 3 down. A vertex was at (2, 7). Where is its image?',
       answer:'(7, 4)',
       steps:['Right 5 adds to the x-coordinate: 2 + 5 = 7.',
              'Down 3 subtracts from the y-coordinate: 7 − 3 = 4.','The image is at (7, 4).']},
      {q:'How many lines of symmetry does a regular octagon have?', answer:'8',
       steps:['A regular polygon with n sides has n lines of symmetry.',
              'An octagon has 8 sides.','So it has 8 lines of symmetry.']},
    ],
    practice:[
      {gen:function(){
        var shapes=[['square',4],['rectangle',2],['equilateral triangle',3],['isosceles triangle',1],
                    ['regular pentagon',5],['regular hexagon',6],['regular octagon',8],['rhombus',2]];
        var s=Q.pick(shapes);
        return {type:'text', q:'How many lines of symmetry does a '+s[0]+' have?',
          answer:[String(s[1])],
          hint:'A regular polygon with n sides has n lines of symmetry.'};
      }},
      {gen:function(){
        var x=Q.int(-8,8), y=Q.int(-8,8), dx=Q.int(-6,6), dy=Q.int(-6,6);
        if(dx===0&&dy===0) dx=3;
        var desc=[];
        if(dx) desc.push(Math.abs(dx)+' '+(dx>0?'right':'left'));
        if(dy) desc.push(Math.abs(dy)+' '+(dy>0?'up':'down'));
        return {type:'text', q:'A point at ('+x+', '+y+') is translated '+desc.join(' and ')+
            '. Where is its image? (write it like (3,5))',
          answer:['('+(x+dx)+','+(y+dy)+')', (x+dx)+','+(y+dy)],
          hint:'Right/left changes x, up/down changes y.'};
      }},
      {gen:function(){
        var both='HIOX'.split(''), vert='AMTUVWY'.split(''), horiz='BCDEK'.split(''), none='FGJLNPRSZ'.split('');
        var pick=Q.pick([['exactly one VERTICAL line of symmetry',vert],
                         ['exactly one HORIZONTAL line of symmetry',horiz],
                         ['NO lines of symmetry',none],
                         ['BOTH a vertical and a horizontal line of symmetry',both]]);
        var others=[].concat(vert,horiz,none,both).filter(function(l){ return pick[1].indexOf(l)<0; });
        var o=Q.mc(Q.pick(pick[1]), Q.sample(others,3));
        return {type:'mc', q:'Which capital letter has '+pick[0]+'?', options:o.options, answer:o.answer,
          hint:'Imagine folding the letter in half.'};
      }},
      {gen:function(){
        var trans=Q.chance(0.5);
        var o=Q.mc(trans?'a translation':'a reflection',
          [trans?'a reflection':'a translation','a rotation','an enlargement']);
        return {type:'mc', q:'Which transformation '+(trans?'slides a shape without turning or flipping it'
                                                          :'flips a shape over a mirror line')+'?',
          options:o.options, answer:o.answer,
          hint:trans?'Every point moves the same distance in the same direction.'
                    :'Each point ends up the same distance the other side of the line.'};
      }},
      {gen:function(){
        var o=Q.mc('It stays exactly the same size and shape',
          ['It gets bigger','It gets smaller','It changes shape']);
        return {type:'mc', q:'What happens to a shape\'s size when it is translated or reflected?',
          options:o.options, answer:o.answer,
          hint:'Both transformations produce a congruent image.'};
      }},
    ]
  });

  /* ============================ FORM 2 ============================ */

  set('2.4.1', {
    notes:[
      {h:'The Cartesian plane', html:
        '<p>Two number lines at right angles fix the position of any point on a flat surface (a <b>plane</b>).</p>'+
        '<ul><li>The horizontal line is the <b>x-axis</b>, the vertical one the <b>y-axis</b>.</li>'+
        '<li>They cross at the <b>origin</b>, the point (0, 0).</li></ul>'+
        dia(240,220,
          ln(20,120,220,120)+ln(120,20,120,220)+
          '<polygon points="220,115 232,120 220,125" fill="'+INK+'"/>'+
          '<polygon points="115,20 120,8 125,20" fill="'+INK+'"/>'+
          txt(228,136,'x')+txt(104,20,'y')+txt(112,136,'O')+
          txt(175,60,'1st',ACC,12)+txt(65,60,'2nd',ACC,12)+
          txt(65,180,'3rd',ACC,12)+txt(175,180,'4th',ACC,12))},
      {h:'Reading and writing coordinates', html:
        '<p>A point is written as an <b>ordered pair (x, y)</b> — <b>along first, then up</b>. The order matters: (3, 5) and (5, 3) are different points.</p>'+
        '<div class="formula">(x, y) → x tells you how far ACROSS, y tells you how far UP</div>'+
        '<p>Negative numbers mean left (for x) or down (for y). So (−4, 2) is 4 left and 2 up.</p>'},
      {h:'The four quadrants', html:
        '<p>The axes cut the plane into four <b>quadrants</b>, numbered anticlockwise from the top right:</p>'+
        '<div class="formula">1st: x &gt; 0, y &gt; 0&nbsp;&nbsp;·&nbsp;&nbsp;2nd: x &lt; 0, y &gt; 0<br>'+
        '3rd: x &lt; 0, y &lt; 0&nbsp;&nbsp;·&nbsp;&nbsp;4th: x &gt; 0, y &lt; 0</div>'+
        '<p>Read off the <b>signs</b> to identify the quadrant: (−5, −2) has both negative, so it is in the 3rd quadrant.</p>'+
        '<p>A point with y = 0 sits <i>on</i> the x-axis; a point with x = 0 sits on the y-axis. Those are on the boundary, not in any quadrant.</p>'},
    ],
    examples:[
      {q:'In which quadrant does the point (−3, 6) lie?', answer:'The 2nd quadrant',
       steps:['The x-coordinate is −3, which is negative, so the point is to the left.',
              'The y-coordinate is 6, which is positive, so the point is above.',
              'Left and above is the 2nd quadrant.']},
      {q:'Start at the origin. Move 4 units left and 3 units down. State the coordinates.', answer:'(−4, −3)',
       steps:['Left is negative x: 0 − 4 = −4.','Down is negative y: 0 − 3 = −3.',
              'Writing along first then up: (−4, −3).']},
    ],
    practice:[
      {gen:function(){
        var qd=Q.int(1,4);
        var x=(qd===1||qd===4)?Q.int(1,9):-Q.int(1,9);
        var y=(qd===1||qd===2)?Q.int(1,9):-Q.int(1,9);
        return {type:'text', q:'In which quadrant does the point ('+x+', '+y+
            ') lie? (answer 1, 2, 3 or 4)',
          answer:[String(qd)],
          hint:'Quadrants are numbered anticlockwise from the top right. Check the signs of x and y.'};
      }},
      {gen:function(){
        var dx=Q.int(1,9), dy=Q.int(1,9), left=Q.chance(0.5), down=Q.chance(0.5);
        var x=left?-dx:dx, y=down?-dy:dy;
        return {type:'text', q:'Start at the origin and move '+dx+' units '+(left?'left':'right')+' and '+
            dy+' units '+(down?'down':'up')+'. State the coordinates. (write it like (3,5))',
          answer:['('+x+','+y+')', x+','+y],
          hint:'Left/down are negative. Write along first, then up.'};
      }},
      {gen:function(){
        var x=Q.nz(-9,9), y=Q.nz(-9,9);
        var o=Q.mc('('+x+', '+y+')', ['('+y+', '+x+')', '('+(-x)+', '+y+')', '('+x+', '+(-y)+')']);
        return {type:'mc', q:'Which pair describes the point that is '+Math.abs(x)+' units '+(x<0?'left':'right')+
            ' and '+Math.abs(y)+' units '+(y<0?'down':'up')+' from the origin?',
          options:o.options, answer:o.answer, hint:'Coordinates go (across, up) — x first, then y.'};
      }},
      {gen:function(){
        var onX=Q.chance(0.5), v=Q.nz(-9,9);
        var o=Q.mc(onX?'the x-axis':'the y-axis', [onX?'the y-axis':'the x-axis','the 1st quadrant','the origin']);
        return {type:'mc', q:'Where does the point '+(onX?'('+v+', 0)':'(0, '+v+')')+' lie?',
          options:o.options, answer:o.answer,
          hint:onX?'The y-coordinate is 0, so it has not moved up or down.'
                  :'The x-coordinate is 0, so it has not moved left or right.'};
      }},
      {gen:function(){
        var x=Q.nz(-9,9), y=Q.nz(-9,9);
        var which=Q.chance(0.5);
        return {type:'text', q:'A point has coordinates ('+x+', '+y+'). What is its '+
            (which?'x':'y')+'-coordinate?',
          answer:[String(which?x:y)],
          hint:'The x-coordinate is written first, the y-coordinate second.'};
      }},
    ]
  });

  set('2.4.2', {
    notes:[
      {h:'Describing a translation with a vector', html:
        '<p>On the coordinate plane we describe a translation with a <b>column vector</b>:</p>'+
        '<div class="formula">'+vec('a','b')+' means move <b>a</b> across and <b>b</b> up<br>'+
        '(a negative top number means left; a negative bottom number means down)</div>'+
        '<p>To find the image, add the vector to the point:</p>'+
        '<div class="formula">(x, y) + '+vec('a','b')+' → (x + a, y + b)</div>'+
        '<p>So (2, 5) translated by '+vec('3','-4')+' lands on (2 + 3, 5 − 4) = <b>(5, 1)</b>.</p>'+
        '<p>To find the vector from an object to its image, <b>subtract</b>: image − object.</p>'},
      {h:'Reflections in the axes', html:
        '<p>Reflecting in an axis simply changes the sign of one coordinate:</p>'+
        '<div class="formula">In the <b>x-axis</b>: (x, y) → (x, <b>−y</b>)&nbsp;&nbsp;·&nbsp;&nbsp;'+
        'In the <b>y-axis</b>: (x, y) → (<b>−x</b>, y)</div>'+
        '<p>Think about which way you are flipping: reflecting in the <i>x</i>-axis flips the shape up/down, so the <i>y</i>-coordinate changes. That is the part most often mixed up.</p>'+
        '<p>Reflecting in the line <b>x = k</b> (a vertical mirror) keeps y and moves x to the other side of k. Reflecting in <b>y = k</b> keeps x.</p>'},
      {h:'Finding the mirror line', html:
        '<p>Given an object and its image, the mirror line is the <b>perpendicular bisector</b> of the line joining any point to its image — halfway between them, at right angles.</p>'+
        '<p>If (2, 3) maps to (2, −5), the mirror is horizontal, halfway between y = 3 and y = −5, so it is <b>y = −1</b>.</p>'+
        '<p>Both translations and reflections produce a <b>congruent</b> image — same size, same shape.</p>'},
    ],
    examples:[
      {q:'The point (4, −2) is translated by the vector '+vec('-3','5')+'. Find the image.', answer:'(1, 3)',
       steps:['Add the top number to x: 4 + (−3) = 1.','Add the bottom number to y: −2 + 5 = 3.',
              'The image is (1, 3).']},
      {q:'Reflect the point (6, 2) in the x-axis.', answer:'(6, −2)',
       steps:['Reflecting in the x-axis flips the point up/down.','The x-coordinate is unchanged: 6.',
              'The y-coordinate changes sign: 2 → −2.','The image is (6, −2).']},
    ],
    practice:[
      {gen:function(){
        var x=Q.nz(-8,8), y=Q.nz(-8,8), a=Q.nz(-6,6), b=Q.nz(-6,6);
        return {type:'text', q:'The point ('+x+', '+y+') is translated by the vector '+vec(a,b)+
            '. Find the image. (write it like (3,5))',
          answer:['('+(x+a)+','+(y+b)+')', (x+a)+','+(y+b)],
          hint:'Add the top number to x and the bottom number to y.'};
      }},
      {gen:function(){
        var x=Q.nz(-9,9), y=Q.nz(-9,9), inX=Q.chance(0.5);
        var img=inX?[x,-y]:[-x,y];
        return {type:'text', q:'Reflect the point ('+x+', '+y+') in the '+(inX?'x':'y')+
            '-axis. (write it like (3,5))',
          answer:['('+img[0]+','+img[1]+')', img[0]+','+img[1]],
          hint:inX?'Reflecting in the x-axis flips up/down, so the y-coordinate changes sign.'
                  :'Reflecting in the y-axis flips left/right, so the x-coordinate changes sign.'};
      }},
      {gen:function(){
        var x=Q.nz(-8,8), y=Q.nz(-8,8), a=Q.nz(-6,6), b=Q.nz(-6,6);
        return {type:'text', q:'A point at ('+x+', '+y+') is mapped to ('+(x+a)+', '+(y+b)+
            ') by a translation. Write the vector as a,b (e.g. 3,-4).',
          answer:[a+','+b],
          hint:'Subtract: image − object, for the x parts and the y parts separately.'};
      }},
      {gen:function(){
        var inX=Q.chance(0.5);
        var o=Q.mc(inX?'the y-coordinate changes sign':'the x-coordinate changes sign',
          [inX?'the x-coordinate changes sign':'the y-coordinate changes sign',
           'both coordinates change sign','neither coordinate changes']);
        return {type:'mc', q:'When a point is reflected in the '+(inX?'x':'y')+'-axis, what happens?',
          options:o.options, answer:o.answer,
          hint:'Reflecting in the x-axis flips the point up and down.'};
      }},
      {gen:function(){
        var x=Q.nz(-8,8), y=Q.int(1,8), k=Q.int(-4,4);
        var img=2*k-y;
        return {type:'text', q:'The point ('+x+', '+y+') is reflected in the line y = '+k+
            '. Find the image. (write it like (3,5))',
          answer:['('+x+','+img+')', x+','+img],
          hint:'The x-coordinate stays the same. The image is as far below y = '+k+' as the object is above it.'};
      }},
      {gen:function(){
        var o=Q.mc('congruent — the same size and shape',
          ['larger than the object','smaller than the object','a different shape']);
        return {type:'mc', q:'After a translation or a reflection, the image is…',
          options:o.options, answer:o.answer,
          hint:'Neither transformation stretches or shrinks the shape.'};
      }},
    ]
  });

  set('2.4.3', {
    notes:[
      {h:'Exterior angles of a triangle', html:
        '<p>Extend one side of a triangle and you create an <b>exterior angle</b>. It sits on a straight line with the interior angle next to it:</p>'+
        '<div class="formula">interior angle + exterior angle = 180°</div>'+
        '<p>More usefully:</p>'+
        '<div class="formula">The exterior angle of a triangle = the SUM of the two opposite interior angles</div>'+
        dia(280,130,
          ln(30,105,250,105)+ln(30,105,140,25)+ln(140,25,190,105)+
          arc(190,105,24,0,122)+
          txt(60,98,'a',ACC)+txt(145,50,'b',ACC)+txt(215,96,'ext',ACC,11))+
        '<p>So the exterior angle marked above equals a + b. It follows from the angle sum: if a + b + c = 180 and c + ext = 180, then ext = a + b.</p>'},
      {h:'Parallel lines cut by a transversal', html:
        '<p>When a line (the <b>transversal</b>) crosses two parallel lines, eight angles appear — but there are really only two different sizes, and they add to 180°.</p>'+
        dia(300,160,
          ln(20,50,280,50,ACC)+ln(20,115,280,115,ACC)+ln(80,15,220,150)+
          '<polygon points="145,45 155,50 145,55" fill="'+ACC+'"/>'+
          '<polygon points="145,110 155,115 145,120" fill="'+ACC+'"/>'+
          txt(128,42,'a')+txt(162,68,'b')+txt(190,107,'c')+txt(224,133,'d'))+
        '<ul><li><b>Corresponding angles</b> (F-shape) are <b>equal</b>.</li>'+
        '<li><b>Alternate angles</b> (Z-shape) are <b>equal</b>.</li>'+
        '<li><b>Co-interior / allied angles</b> (C or U-shape) add to <b>180°</b>.</li></ul>'+
        '<p>Look for the letter shape — F, Z or C — to decide which rule applies.</p>'},
      {h:'Putting it together', html:
        '<p>Most problems chain two or three facts. Write the reason beside each step:</p>'+
        '<p><i>"x = 70° (alternate angles), y = 180 − 70 = 110° (angles on a straight line)."</i></p>'+
        '<p>Stating reasons is worth marks, and it stops you guessing.</p>'},
    ],
    examples:[
      {q:'Two angles of a triangle are 55° and 68°. Find the exterior angle at the third vertex.',
       answer:'123°',
       steps:['The exterior angle equals the sum of the two opposite interior angles.',
              '55 + 68 = 123°.',
              'Check: the third interior angle is 180 − 123 = 57°, and 57 + 123 = 180 ✓']},
      {q:'A transversal crosses two parallel lines. One angle is 115°. Find the co-interior angle.',
       answer:'65°',
       steps:['Co-interior (allied) angles lie between the parallel lines on the same side.',
              'They add to 180°.','180 − 115 = 65°.']},
    ],
    practice:[
      {gen:function(){
        var a=Q.int(25,85), b=Q.int(25,85);
        return {type:'text', q:'Two angles of a triangle are '+a+'° and '+b+
            '°. Find the exterior angle at the third vertex (in degrees).',
          answer:[String(a+b), (a+b)+'°'],
          hint:'The exterior angle equals the sum of the two opposite interior angles.'};
      }},
      {gen:function(){
        var a=Q.int(30,150);
        var kind=Q.pick([['corresponding',a],['alternate',a],['co-interior',180-a]]);
        return {type:'text', q:'A transversal crosses two parallel lines. One angle is '+a+
            '°. Find the '+kind[0]+' angle (in degrees).',
          answer:[String(kind[1]), kind[1]+'°'],
          hint:kind[0]==='co-interior'?'Co-interior angles add to 180°.'
                                      :kind[0]+' angles are equal.'};
      }},
      {gen:function(){
        var pairs=[['corresponding','equal','they make an F-shape'],
                   ['alternate','equal','they make a Z-shape'],
                   ['co-interior','add to 180°','they make a C-shape']];
        var p=Q.pick(pairs);
        var o=Q.mc(p[1], ['equal','add to 180°','add to 360°'].filter(function(x){return x!==p[1];}));
        return {type:'mc', q:'When a transversal crosses two parallel lines, '+p[0]+' angles are…',
          options:o.options, answer:o.answer, hint:'Look for the letter shape — '+p[2]+'.'};
      }},
      {gen:function(){
        var interior=Q.int(30,150);
        return {type:'text', q:'The interior angle at a vertex of a triangle is '+interior+
            '°. Find the exterior angle at that same vertex (in degrees).',
          answer:[String(180-interior), (180-interior)+'°'],
          hint:'The interior and exterior angles sit on a straight line, so they add to 180°.'};
      }},
      {gen:function(){
        var a=Q.int(30,80), ext=Q.int(a+20,170);
        var b=ext-a;
        return {type:'text', q:'The exterior angle of a triangle is '+ext+'°. One of the two opposite interior angles is '+
            a+'°. Find the other (in degrees).',
          answer:[String(b), b+'°'],
          hint:'The two opposite interior angles add to the exterior angle: '+a+' + ? = '+ext+'.'};
      }},
    ]
  });

  set('2.4.4', {
    notes:[
      {h:'The rules of construction', html:
        '<p>A <b>construction</b> uses only a <b>pair of compasses and a straight edge</b> — no protractor, and no measuring with the ruler\'s scale.</p>'+
        '<p>Two habits earn the marks: keep the compass setting <b>fixed</b> when a step says so, and <b>leave all your arcs showing</b>. The arcs are the evidence that you constructed rather than measured.</p>'},
      {h:'Bisecting a line segment', html:
        '<p>The <b>perpendicular bisector</b> cuts a segment exactly in half, at right angles.</p>'+
        '<ol><li>Open the compasses to more than half of AB.</li>'+
        '<li>With the point on A, draw arcs above and below the line.</li>'+
        '<li><b>Keeping the same radius</b>, repeat from B.</li>'+
        '<li>Join the two crossing points. That line is the perpendicular bisector.</li></ol>'+
        '<p>Every point on it is the same distance from A as from B.</p>'},
      {h:'Bisecting an angle', html:
        '<ol><li>Put the compass point on the vertex and draw an arc crossing both arms.</li>'+
        '<li>From each crossing point, draw an arc in the middle (same radius for both).</li>'+
        '<li>Join the vertex to where those arcs meet — that line cuts the angle in half.</li></ol>'+
        '<p>So bisecting a 76° angle gives two angles of 38°.</p>'},
      {h:'Standard angles without a protractor', html:
        '<p>An equilateral triangle construction gives <b>60°</b> directly. Bisect it for <b>30°</b>, bisect again for <b>15°</b>.</p>'+
        '<p>A perpendicular gives <b>90°</b>; bisect that for <b>45°</b>. Combining gives 75°, 105°, 120°, 135° and 150°.</p>'+
        '<div class="formula">60 → bisect → 30 → bisect → 15&nbsp;&nbsp;·&nbsp;&nbsp;90 → bisect → 45</div>'},
    ],
    examples:[
      {q:'Describe how to construct the perpendicular bisector of a line segment AB.',
       answer:'Equal arcs from A and from B, then join the crossing points',
       steps:['Open the compasses to more than half the length of AB.',
              'With the point on A, draw arcs above and below AB.',
              'Keeping the same radius, draw matching arcs from B.',
              'The arcs cross at two points — join them. That line is the perpendicular bisector.']},
      {q:'An angle of 68° is bisected. What is the size of each new angle?', answer:'34°',
       steps:['To bisect means to cut exactly in half.','68 ÷ 2 = 34.','Each new angle is 34°.']},
    ],
    practice:[
      {gen:function(){
        var a=2*Q.int(10,85);
        return {type:'text', q:'An angle of '+a+'° is bisected. What is the size of each new angle (in degrees)?',
          answer:[String(a/2), (a/2)+'°'], hint:'To bisect is to cut exactly in half.'};
      }},
      {gen:function(){
        var angles=[[60,'an equilateral triangle construction'],[30,'bisecting 60°'],
                    [90,'constructing a perpendicular'],[45,'bisecting 90°'],[15,'bisecting 30°'],
                    [120,'two 60° angles together']];
        var a=Q.pick(angles);
        var o=Q.mc(a[0]+'°', Q.sample(angles.filter(function(x){return x[0]!==a[0];}),3).map(function(x){return x[0]+'°';}));
        return {type:'mc', q:'Which angle do you get from '+a[1]+'?', options:o.options, answer:o.answer,
          hint:'60° comes from an equilateral triangle; halving gives 30° and 15°.'};
      }},
      {gen:function(){
        var o=Q.mc('a pair of compasses and a straight edge',
          ['a protractor and a ruler','a set square and a protractor','a ruler only']);
        return {type:'mc', q:'Which instruments may be used in a formal geometric construction?',
          options:o.options, answer:o.answer,
          hint:'A construction must not involve measuring an angle or a length.'};
      }},
      {gen:function(){
        var L=2*Q.int(3,20);
        return {type:'text', q:'A line segment '+L+' cm long is bisected. How long is each part (in cm)?',
          answer:[String(L/2)], hint:'Bisecting a segment cuts it into two equal halves.'};
      }},
      {gen:function(){
        var o=Q.mc('Every point on it is the same distance from A as from B',
          ['It is parallel to AB','It is always 5 cm long','It passes through the origin']);
        return {type:'mc', q:'What is special about the perpendicular bisector of the segment AB?',
          options:o.options, answer:o.answer,
          hint:'That is exactly why the equal-radius arcs from A and B locate it.'};
      }},
    ]
  });

  /* ============================ FORM 3 ============================ */

  set('3.4.1', {
    notes:[
      {h:'What congruent means', html:
        '<p>Two shapes are <b>congruent</b> if they are <b>identical in shape and size</b> — one would fit exactly over the other, even if it has to be turned over or rotated first.</p>'+
        '<p>Corresponding sides are equal and corresponding angles are equal. The symbol is <b>≅</b>.</p>'+
        '<p>Translations, reflections and rotations all produce congruent images. An enlargement does <b>not</b>.</p>'},
      {h:'The five conditions', html:
        '<p>You do not need all six measurements to prove congruency — any one of these five is enough:</p>'+
        '<div class="formula"><b>SSS</b> — all three sides equal<br>'+
        '<b>SAS</b> — two sides and the angle BETWEEN them<br>'+
        '<b>ASA</b> — two angles and the side between them<br>'+
        '<b>AAS</b> — two angles and a side not between them<br>'+
        '<b>RHS</b> — right angle, hypotenuse and one other side</div>'+
        '<p><b>AAA is not a condition.</b> Three equal angles make the triangles the same <i>shape</i> but not necessarily the same <i>size</i> — that is similarity, not congruency.</p>'},
      {h:'Writing a proof', html:
        '<p>Name the equal parts, give a reason for each, then state the condition:</p>'+
        '<p><i>AB = PQ (given), BC = QR (given), ∠ABC = ∠PQR (given). Therefore △ABC ≅ △PQR (SAS).</i></p>'+
        '<p>Take care with the <b>order of the letters</b>: writing △ABC ≅ △PQR says A matches P, B matches Q and C matches R.</p>'},
    ],
    examples:[
      {q:'Two triangles have all three pairs of sides equal. Which condition proves them congruent?',
       answer:'SSS',
       steps:['All three sides are given as equal.','That is the side-side-side condition.',
              'So the triangles are congruent by SSS.']},
      {q:'Why is AAA not enough to prove two triangles congruent?',
       answer:'Equal angles fix the shape but not the size — the triangles may be similar, not congruent',
       steps:['Three equal angles guarantee the same shape.',
              'But a small triangle and a large one can have identical angles.',
              'Congruency needs at least one pair of equal SIDES to fix the size.',
              'So AAA proves similarity only.']},
    ],
    practice:[
      {gen:function(){
        var conds=[['all three pairs of sides are equal','SSS'],
                   ['two sides and the angle between them are equal','SAS'],
                   ['two angles and the side between them are equal','ASA'],
                   ['two angles and a side not between them are equal','AAS'],
                   ['there is a right angle, and the hypotenuse and one other side are equal','RHS']];
        var c=Q.pick(conds);
        var o=Q.mc(c[1], Q.sample(['SSS','SAS','ASA','AAS','RHS'].filter(function(x){return x!==c[1];}),3));
        return {type:'mc', q:'Which condition proves two triangles congruent when '+c[0]+'?',
          options:o.options, answer:o.answer, hint:'S stands for side, A for angle — in the order given.'};
      }},
      {gen:function(){
        var o=Q.mc('AAA', ['SSS','SAS','RHS']);
        return {type:'mc', q:'Which of these is NOT a valid condition for congruency?',
          options:o.options, answer:o.answer,
          hint:'One of them fixes the shape but not the size.'};
      }},
      {gen:function(){
        var o=Q.mc('identical in both shape and size',
          ['the same shape but a different size','the same area but a different shape',
           'always the same way up']);
        return {type:'mc', q:'Two congruent shapes are…', options:o.options, answer:o.answer,
          hint:'One would fit exactly over the other.'};
      }},
      {gen:function(){
        var s=Q.int(3,15);
        return {type:'text', q:'△ABC ≅ △PQR, and AB = '+s+' cm. How long is PQ (in cm)?',
          answer:[String(s)],
          hint:'The letter order tells you A matches P and B matches Q, so AB matches PQ.'};
      }},
      {gen:function(){
        var a=Q.int(30,110);
        return {type:'text', q:'△ABC ≅ △PQR, and angle ABC = '+a+'°. Find angle PQR (in degrees).',
          answer:[String(a), a+'°'],
          hint:'Corresponding angles of congruent triangles are equal — B matches Q.'};
      }},
    ]
  });

  set('3.4.2', {
    notes:[
      {h:'Similar shapes', html:
        '<p>Two shapes are <b>similar</b> if one is an <b>enlargement</b> of the other — same shape, different size.</p>'+
        '<ul><li>Corresponding <b>angles are equal</b>.</li>'+
        '<li>Corresponding <b>sides are in the same ratio</b>.</li></ul>'+
        '<p>For triangles, <b>AAA</b> is enough: if all three pairs of angles match, the triangles must be similar. (And because angles add to 180°, showing two pairs equal is enough.)</p>'+
        '<p>Congruent shapes are a special case of similar shapes, with scale factor 1.</p>'},
      {h:'Scale factor', html:
        '<div class="formula">scale factor k = '+f('length on the image','matching length on the object')+'</div>'+
        '<p>Find k from a pair of matching sides, then use it on every other side.</p>'+
        '<p>If a triangle with sides 3, 4, 5 is enlarged to one with a matching side of 9 where the 3 was, then k = 9 ÷ 3 = 3, and the other sides become 12 and 15.</p>'+
        '<ul><li>k &gt; 1 makes the shape <b>bigger</b>.</li>'+
        '<li>k between 0 and 1 makes it <b>smaller</b>.</li></ul>'},
      {h:'Area and volume under enlargement', html:
        '<div class="formula">Lengths × k&nbsp;&nbsp;·&nbsp;&nbsp;Areas × k²&nbsp;&nbsp;·&nbsp;&nbsp;Volumes × k³</div>'+
        '<p>Enlarge a shape by scale factor 3 and its area becomes <b>9</b> times bigger, not 3 times. This is the same rule met in Measurement (Scales), and it is the single most common error in the topic.</p>'},
    ],
    examples:[
      {q:'Two similar triangles have matching sides of 4 cm and 10 cm. Find the scale factor.',
       answer:'2.5',
       steps:['Scale factor = image length ÷ object length.','k = 10 ÷ 4.','k = 2.5.']},
      {q:'A triangle has sides 6 cm and 9 cm. A similar triangle has the matching 6 cm side enlarged to 18 cm. Find the other side.',
       answer:'27 cm',
       steps:['Scale factor: k = 18 ÷ 6 = 3.','Apply it to the other side: 9 × 3.','= 27 cm.']},
    ],
    practice:[
      {gen:function(){
        var a=Q.int(2,12), k=Q.pick([2,3,4,5,1.5,2.5]);
        return {type:'text', q:'Two similar shapes have matching sides of '+a+' cm and '+Q.fix(a*k,2)+
            ' cm. Find the scale factor.',
          answer:Q.dec(k), hint:'Scale factor = image ÷ object = '+Q.fix(a*k,2)+' ÷ '+a+'.'};
      }},
      {gen:function(){
        var a=Q.int(2,12), b=Q.int(2,15), k=Q.int(2,5);
        return {type:'text', q:'A triangle has sides '+a+' cm and '+b+' cm. In a similar triangle the '+a+
            ' cm side becomes '+(a*k)+' cm. How long is the other side (in cm)?',
          answer:[String(b*k)],
          hint:'Scale factor = '+(a*k)+' ÷ '+a+' = '+k+'. Apply it to the '+b+' cm side.'};
      }},
      {gen:function(){
        var k=Q.int(2,6), askArea=Q.chance(0.5);
        var right=askArea?k*k:k*k*k;
        var o=Q.mc(String(right), [String(k), String(askArea?k*k*k:k*k), String(2*k)]);
        return {type:'mc', q:'A shape is enlarged by scale factor '+k+'. By what factor is its '+
            (askArea?'AREA':'VOLUME')+' multiplied?',
          options:o.options, answer:o.answer,
          hint:askArea?'Area scales by k².':'Volume scales by k³.'};
      }},
      {gen:function(){
        var o=Q.mc('AAA — all three pairs of angles are equal',
          ['SSS — all three pairs of sides are equal','RHS','SAS']);
        return {type:'mc', q:'Which condition is enough to prove two triangles SIMILAR (but not congruent)?',
          options:o.options, answer:o.answer,
          hint:'Similarity is about shape, so it is the angles that matter.'};
      }},
      {gen:function(){
        var a=Q.int(20,80), b=Q.int(20,80);
        while(a+b>=160){ a=Q.int(20,80); b=Q.int(20,80); }
        return {type:'text', q:'Two triangles are similar. One has angles '+a+'° and '+b+
            '°. What is the THIRD angle of the other triangle (in degrees)?',
          answer:[String(180-a-b), (180-a-b)+'°'],
          hint:'Similar triangles have equal angles, and all three add to 180°.'};
      }},
      {gen:function(){
        var k=Q.int(2,5), a=Q.int(3,20);
        return {type:'text', q:'A shape of area '+a+' cm² is enlarged by scale factor '+k+
            '. Find the new area (in cm²).',
          answer:[String(a*k*k)], hint:'Area scales by k² = '+(k*k)+', not by k.'};
      }},
    ]
  });

  set('3.4.3', {
    notes:[
      {h:'The theorem', html:
        '<p>In a <b>right-angled</b> triangle, the side opposite the right angle is the <b>hypotenuse</b> — always the longest side.</p>'+
        '<div class="formula">a² + b² = c²&nbsp;&nbsp;(c is the hypotenuse)</div>'+
        dia(240,150,
          poly('30,120 190,120 30,30')+
          rightAngle(30,120,14,-14)+
          txt(20,80,'a')+txt(110,136,'b')+txt(118,68,'c',ACC))+
        '<p>The theorem only works when there is a right angle. Check for the little square first.</p>'},
      {h:'Finding the hypotenuse', html:
        '<p><b>Add</b> the squares of the two shorter sides, then take the square root.</p>'+
        '<p><i>Legs 6 cm and 8 cm:</i> c² = 6² + 8² = 36 + 64 = 100, so c = √100 = <b>10 cm</b>.</p>'},
      {h:'Finding a shorter side', html:
        '<p><b>Subtract</b>: rearrange to a² = c² − b². Take the smaller square away from the bigger.</p>'+
        '<p><i>Hypotenuse 13 cm, one leg 5 cm:</i> a² = 169 − 25 = 144, so a = <b>12 cm</b>.</p>'+
        '<p>If you find yourself with a negative number under the root, you have subtracted the wrong way round — the hypotenuse must be the largest.</p>'},
      {h:'Useful triples and real problems', html:
        '<div class="formula">3, 4, 5&nbsp;·&nbsp;5, 12, 13&nbsp;·&nbsp;8, 15, 17&nbsp;·&nbsp;7, 24, 25&nbsp;·&nbsp;9, 40, 41<br>'+
        '(and any multiple: 6, 8, 10 · 9, 12, 15 · 10, 24, 26)</div>'+
        '<p>Recognising these saves time. To use the theorem in a word problem — a ladder against a wall, a diagonal across a field — <b>sketch it first</b> and mark the right angle.</p>'},
    ],
    examples:[
      {q:'A right-angled triangle has legs 9 cm and 12 cm. Find the hypotenuse.', answer:'15 cm',
       steps:['c² = a² + b².','c² = 9² + 12² = 81 + 144 = 225.','c = √225 = 15 cm.',
              '(This is the 3, 4, 5 triple multiplied by 3.)']},
      {q:'A ladder 17 m long leans against a wall, with its foot 8 m from the base. How far up the wall does it reach?',
       answer:'15 m',
       steps:['The wall and the ground meet at a right angle; the ladder is the hypotenuse.',
              'a² = c² − b² = 17² − 8².','= 289 − 64 = 225.','a = √225 = 15 m.']},
    ],
    practice:[
      {gen:function(){
        var t=Q.pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[6,8,10],[9,12,15],[20,21,29],[12,16,20]]);
        var m=Q.chance(0.7)?1:Q.int(2,3);
        return {type:'text', q:'A right-angled triangle has shorter sides '+(t[0]*m)+' cm and '+(t[1]*m)+
            ' cm. Find the hypotenuse (in cm).',
          answer:[String(t[2]*m)],
          hint:'c² = '+(t[0]*m)+'² + '+(t[1]*m)+'² = '+(t[0]*m*t[0]*m+t[1]*m*t[1]*m)+', then take the square root.'};
      }},
      {gen:function(){
        var t=Q.pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[6,8,10],[9,12,15],[10,24,26]]);
        var m=Q.chance(0.7)?1:2, swap=Q.chance(0.5);
        var known=swap?t[1]*m:t[0]*m, want=swap?t[0]*m:t[1]*m;
        return {type:'text', q:'A right-angled triangle has a hypotenuse of '+(t[2]*m)+
            ' cm and one shorter side of '+known+' cm. Find the other shorter side (in cm).',
          answer:[String(want)],
          hint:'Subtract: '+(t[2]*m)+'² − '+known+'² = '+(t[2]*m*t[2]*m-known*known)+', then square root.'};
      }},
      {gen:function(){
        var t=Q.pick([[8,15,17],[5,12,13],[6,8,10],[9,12,15],[7,24,25],[3,4,5],[12,16,20],[10,24,26],
                      [20,21,29],[9,40,41],[15,20,25],[16,30,34],[18,24,30],[14,48,50]]);
        var m=Q.chance(0.75)?1:2;
        return {type:'text', q:'A ladder '+(t[2]*m)+' m long leans against a wall with its foot '+(t[0]*m)+
            ' m from the base. How far up the wall does it reach (in m)?',
          answer:[String(t[1]*m)],
          hint:'The ladder is the hypotenuse: '+(t[2]*m)+'² − '+(t[0]*m)+'² = '+
               (t[2]*m*t[2]*m-t[0]*m*t[0]*m)+'.'};
      }},
      {gen:function(){
        var o=Q.mc('the hypotenuse — the side opposite the right angle',
          ['the shortest side','the base','any side you choose']);
        return {type:'mc', q:'In a² + b² = c², which side is c?', options:o.options, answer:o.answer,
          hint:'It is always the longest side.'};
      }},
      {gen:function(){
        var trip=[[3,4,5],[5,12,13],[8,15,17],[6,8,10],[7,24,25]];
        var t=Q.pick(trip);
        var bad=[t[0],t[1],t[2]+Q.int(1,3)];
        var o=Q.mc(t.join(', '), [bad.join(', '), [t[0],t[1],t[1]+1].join(', '), [t[0]+1,t[1],t[2]].join(', ')]);
        return {type:'mc', q:'Which set of three lengths forms a right-angled triangle?',
          options:o.options, answer:o.answer,
          hint:'Test each: do the squares of the two smaller add to the square of the largest?'};
      }},
      {gen:function(){
        var a=Q.int(2,25), c2=2*a*a;
        return {type:'text', q:'A square has sides of '+a+' cm. Find the length of its diagonal, to 2 decimal places (in cm).',
          answer:Q.dec(Q.fix(Math.sqrt(c2),2)),
          hint:'The diagonal splits the square into two right-angled triangles: d² = '+a+'² + '+a+'² = '+c2+'.'};
      }},
    ]
  });

  set('3.4.4', {
    notes:[
      {h:'Naming the sides', html:
        '<p>Trigonometry connects an <b>angle</b> in a right-angled triangle with the <b>ratio</b> of two of its sides. First label the sides <i>relative to the angle θ</i>:</p>'+
        '<ul><li><b>Hypotenuse</b> — opposite the right angle (always the longest).</li>'+
        '<li><b>Opposite</b> — directly across from θ.</li>'+
        '<li><b>Adjacent</b> — the remaining side, next to θ.</li></ul>'+
        dia(250,150,
          poly('30,120 200,120 200,35')+
          rightAngle(200,120,-14,-14)+
          arc(30,120,26,0,27)+
          txt(42,112,'θ',ACC)+txt(115,136,'adjacent',INK,11)+
          txt(224,80,'opp',INK,11)+txt(100,68,'hyp',INK,11))+
        '<p>Opposite and adjacent <b>swap over</b> if you look at the other angle — always label from the angle you are using.</p>'},
      {h:'The three ratios — SOH CAH TOA', html:
        '<div class="formula">sin θ = '+f('opposite','hypotenuse')+'&nbsp;&nbsp;·&nbsp;&nbsp;'+
        'cos θ = '+f('adjacent','hypotenuse')+'&nbsp;&nbsp;·&nbsp;&nbsp;'+
        'tan θ = '+f('opposite','adjacent')+'</div>'+
        '<p><b>S</b>OH <b>C</b>AH <b>T</b>OA: Sine = Opposite over Hypotenuse, Cosine = Adjacent over Hypotenuse, Tangent = Opposite over Adjacent.</p>'+
        '<p>In a 3-4-5 triangle, taking θ opposite the 3: sin θ = '+f('3','5')+', cos θ = '+f('4','5')+', tan θ = '+f('3','4')+'.</p>'+
        '<p>Choose the ratio that uses the <b>two sides you care about</b> — the one you know and the one you want.</p>'},
      {h:'Finding a side', html:
        '<ol><li>Label hyp, opp, adj from the given angle.</li>'+
        '<li>Pick sin, cos or tan using SOH CAH TOA.</li>'+
        '<li>Substitute and solve.</li></ol>'+
        '<p><i>Angle 30°, hypotenuse 12 cm, find the opposite side:</i><br>sin 30° = '+f('opp','12')+' → opp = 12 × sin 30° = 12 × 0.5 = <b>6 cm</b>.</p>'},
      {h:'Elevation and depression', html:
        '<p>The <b>angle of elevation</b> is measured <i>up</i> from the horizontal to an object above you. The <b>angle of depression</b> is measured <i>down</i> from the horizontal to an object below.</p>'+
        '<p>Both are measured from the <b>horizontal</b>, never from the vertical. Because the two horizontals are parallel, the angle of elevation from A to B equals the angle of depression from B to A (alternate angles).</p>'},
    ],
    examples:[
      {q:'In a right-angled triangle the side opposite θ is 5 cm and the hypotenuse is 13 cm. Find sin θ as a fraction.',
       answer:'sin θ = '+f('5','13'),
       steps:['SOH: sin θ = opposite ÷ hypotenuse.','The opposite is 5 and the hypotenuse is 13.',
              'sin θ = '+f('5','13')+'.']},
      {q:'A ladder makes an angle of 60° with the ground and its foot is 3 m from the wall. How long is the ladder?',
       answer:'6 m',
       steps:['The 3 m is adjacent to the 60° angle; the ladder is the hypotenuse.',
              'CAH: cos 60° = '+f('adjacent','hypotenuse')+' = '+f('3','L')+'.',
              'cos 60° = 0.5, so 0.5 = 3 ÷ L.','L = 3 ÷ 0.5 = 6 m.']},
    ],
    practice:[
      {gen:function(){
        var t=Q.pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]]);
        var which=Q.pick(['sin','cos','tan']);
        var ans=which==='sin'?[t[0],t[2]]:which==='cos'?[t[1],t[2]]:[t[0],t[1]];
        return {type:'text', q:'A right-angled triangle has the side opposite θ = '+t[0]+' cm, the side adjacent to θ = '+
            t[1]+' cm and hypotenuse = '+t[2]+' cm. Find '+which+' θ as a fraction (e.g. 3/5).',
          answer:[ans[0]+'/'+ans[1]],
          hint:'SOH CAH TOA — '+which+' uses '+(which==='sin'?'opposite over hypotenuse'
                :which==='cos'?'adjacent over hypotenuse':'opposite over adjacent')+'.'};
      }},
      {gen:function(){
        var ratios=[['sin','opposite ÷ hypotenuse'],['cos','adjacent ÷ hypotenuse'],['tan','opposite ÷ adjacent']];
        var r=Q.pick(ratios);
        var o=Q.mc(r[1], ratios.filter(function(x){return x!==r;}).map(function(x){return x[1];})
                                .concat(['hypotenuse ÷ opposite']));
        return {type:'mc', q:'Which ratio is '+r[0]+' θ?', options:o.options, answer:o.answer,
          hint:'Remember SOH CAH TOA.'};
      }},
      {gen:function(){
        var hyp=2*Q.int(2,12);
        return {type:'text', q:'A right-angled triangle has a hypotenuse of '+hyp+
            ' cm and an angle of 30°. Find the side opposite the 30° angle (in cm). (sin 30° = 0.5)',
          answer:Q.dec(hyp/2),
          hint:'SOH: sin 30° = opp ÷ '+hyp+', and sin 30° = 0.5.'};
      }},
      {gen:function(){
        var elev=Q.chance(0.5);
        var o=Q.mc(elev?'the angle of elevation':'the angle of depression',
          [elev?'the angle of depression':'the angle of elevation','the angle of rotation','the bearing']);
        return {type:'mc', q:'What is the name of the angle measured from the horizontal '+
            (elev?'UP to an object above you':'DOWN to an object below you')+'?',
          options:o.options, answer:o.answer,
          hint:'Both are always measured from the horizontal.'};
      }},
      {gen:function(){
        var adj=Q.int(2,15), L=2*adj;
        return {type:'text', q:'A ladder makes an angle of 60° with the ground and its foot is '+adj+
            ' m from the wall. How long is the ladder (in m)? (cos 60° = 0.5)',
          answer:Q.dec(L),
          hint:'CAH: cos 60° = '+adj+' ÷ L, and cos 60° = 0.5, so L = '+adj+' ÷ 0.5.'};
      }},
      {gen:function(){
        var t=Q.pick([[3,4,5],[5,12,13],[8,15,17],[6,8,10]]);
        var o=Q.mc('the hypotenuse', ['the opposite side','the adjacent side','the shortest side']);
        return {type:'mc', q:'In a right-angled triangle, which side is always the longest?',
          options:o.options, answer:o.answer, hint:'It is the side opposite the right angle.'};
      }},
    ]
  });

  set('3.4.5', {
    notes:[
      {h:'Constructing triangles', html:
        '<p>With compasses and a straight edge only:</p>'+
        '<p><b>Given three sides (SSS):</b> draw the longest side as the base. Set the compasses to the second side and draw an arc from one end; set them to the third side and draw an arc from the other end. Where the arcs cross is the third vertex.</p>'+
        '<p><b>Given two sides and the included angle (SAS):</b> draw the base, construct the angle at one end, mark the second side along that arm, then join up.</p>'+
        '<p>Leave every arc visible — they show the construction was not measured.</p>'},
      {h:'Parallel and perpendicular lines', html:
        '<p><b>Perpendicular from a point to a line:</b> from the point, draw an arc cutting the line twice; from those two crossings, draw equal arcs that meet; join the point to that meeting point.</p>'+
        '<p><b>Parallel line through a point:</b> draw any transversal through the point, then copy the angle it makes with the original line at the new point. Equal corresponding angles force the lines to be parallel.</p>'},
      {h:'Regular polygons and circles', html:
        '<p>A regular polygon fits inside a circle with every vertex on the circumference. Divide 360° by the number of sides to get the angle at the centre, then step round with the compasses.</p>'+
        '<div class="formula">angle at the centre = '+f('360°','n')+'</div>'+
        '<p>A regular hexagon is the neatest: the angle is 60°, which equals the radius stepped round the circle exactly six times.</p>'+
        '<p><b>Circle through given points / from two chords:</b> the centre lies on the perpendicular bisector of every chord, so bisect two chords and the centre is where the bisectors cross.</p>'},
      {h:'Direction and bearings', html:
        '<p>A <b>bearing</b> describes direction as an angle measured <b>clockwise from north</b>, always written with three figures.</p>'+
        '<div class="formula">North 000°&nbsp;·&nbsp;East 090°&nbsp;·&nbsp;South 180°&nbsp;·&nbsp;West 270°</div>'+
        '<p>So north-east is 045° and south-west is 225°.</p>'},
    ],
    examples:[
      {q:'Describe how to construct a triangle with sides 7 cm, 5 cm and 4 cm.',
       answer:'Draw the 7 cm base, then arcs of 5 cm and 4 cm from its ends',
       steps:['Draw the longest side, 7 cm, as the base.',
              'Set the compasses to 5 cm and draw an arc from one end.',
              'Set them to 4 cm and draw an arc from the other end.',
              'Join both ends of the base to where the arcs cross.']},
      {q:'What angle at the centre is needed to construct a regular octagon?', answer:'45°',
       steps:['The vertices are spread evenly around a full turn of 360°.',
              'An octagon has 8 vertices.','360 ÷ 8 = 45°.']},
    ],
    practice:[
      {gen:function(){
        var n=Q.pick([3,4,5,6,8,9,10,12]);
        return {type:'text', q:'What angle at the centre of a circle is needed to construct a regular polygon with '+
            n+' sides (in degrees)?',
          answer:[String(360/n), (360/n)+'°'], hint:'Divide the full turn of 360° by '+n+'.'};
      }},
      {gen:function(){
        var dirs=[['north','000'],['north-east','045'],['east','090'],['south-east','135'],
                  ['south','180'],['south-west','225'],['west','270'],['north-west','315']];
        var d=Q.pick(dirs);
        var o=Q.mc(d[1]+'°', Q.sample(dirs.filter(function(x){return x!==d;}),3).map(function(x){return x[1]+'°';}));
        return {type:'mc', q:'What is the bearing of '+d[0]+'?', options:o.options, answer:o.answer,
          hint:'Bearings are measured clockwise from north, in three figures.'};
      }},
      {gen:function(){
        var o=Q.mc('on the perpendicular bisector of every chord',
          ['at the midpoint of any chord','on the longest chord only','outside the circle']);
        return {type:'mc', q:'When constructing a circle from two chords, where does the centre lie?',
          options:o.options, answer:o.answer,
          hint:'That is why you bisect two chords and see where the bisectors cross.'};
      }},
      {gen:function(){
        var o=Q.mc('draw the longest side first, then arcs of the other two lengths from its ends',
          ['measure all three angles with a protractor',
           'draw any two sides at a right angle',
           'draw a circle and mark three points on it']);
        return {type:'mc', q:'How do you construct a triangle given the lengths of all three sides?',
          options:o.options, answer:o.answer,
          hint:'Compasses and straight edge only — no protractor.'};
      }},
      {gen:function(){
        var n=Q.pick([6,8,10,12]);
        var o=Q.mc(String(n), [String(n/2), String(n*2), String(360/n)]);
        return {type:'mc', q:'A regular polygon is constructed by stepping '+(360/n)+
            '° round the centre of a circle. How many sides does it have?',
          options:o.options, answer:o.answer, hint:'360 ÷ '+(360/n)+'.'};
      }},
    ]
  });

  set('3.4.6', {
    notes:[
      {h:'Interior angles', html:
        '<p>Any polygon with n sides splits into <b>n − 2</b> triangles by drawing diagonals from one vertex. Each triangle gives 180°:</p>'+
        '<div class="formula">Sum of interior angles = (n − 2) × 180°</div>'+
        '<ul><li>Triangle (n = 3): 1 × 180 = 180°</li>'+
        '<li>Quadrilateral (n = 4): 2 × 180 = 360°</li>'+
        '<li>Pentagon (n = 5): 3 × 180 = 540°</li>'+
        '<li>Hexagon (n = 6): 4 × 180 = 720°</li></ul>'+
        '<p>For a <b>regular</b> polygon every angle is the same, so divide by n:</p>'+
        '<div class="formula">Each interior angle of a regular polygon = '+f('(n − 2) × 180°','n')+'</div>'},
      {h:'Exterior angles — the easier route', html:
        '<p>Walk right round the outside of any polygon and you turn through one full circle:</p>'+
        '<div class="formula">Sum of exterior angles = <b>360°</b>, for every polygon<br>'+
        'Each exterior angle of a regular polygon = '+f('360°','n')+'</div>'+
        '<p>This is often the quicker way in. For a regular hexagon the exterior angle is 360 ÷ 6 = 60°, so the interior angle is 180 − 60 = <b>120°</b>.</p>'+
        '<p>Working backwards, if a regular polygon has an exterior angle of 24°, then n = 360 ÷ 24 = <b>15 sides</b>.</p>'},
      {h:'Convex, concave and regular', html:
        '<ul><li><b>Convex</b> — every interior angle is less than 180°; no vertex points inwards.</li>'+
        '<li><b>Concave</b> — at least one reflex interior angle, so it has a "dent".</li>'+
        '<li><b>Regular</b> — all sides equal <i>and</i> all angles equal. Both conditions are needed: a rhombus has equal sides but is not regular.</li></ul>'},
    ],
    examples:[
      {q:'Find the sum of the interior angles of a decagon (10 sides).', answer:'1440°',
       steps:['Sum = (n − 2) × 180°.','n = 10, so n − 2 = 8.','8 × 180 = 1440°.']},
      {q:'A regular polygon has an exterior angle of 30°. How many sides has it, and what is each interior angle?',
       answer:'12 sides, each interior angle 150°',
       steps:['Exterior angles add to 360°, and each is 30°.','n = 360 ÷ 30 = 12 sides.',
              'Interior angle = 180 − 30 = 150°.']},
    ],
    practice:[
      {gen:function(){
        var n=Q.int(3,15);
        return {type:'text', q:'Find the sum of the interior angles of a polygon with '+n+' sides (in degrees).',
          answer:[String((n-2)*180), ((n-2)*180)+'°'],
          hint:'Sum = (n − 2) × 180 = ('+n+' − 2) × 180.'};
      }},
      {gen:function(){
        var n=Q.pick([3,4,5,6,8,9,10,12,15,18,20,24,30,36]);
        return {type:'text', q:'Find the size of each exterior angle of a regular polygon with '+n+' sides (in degrees).',
          answer:[String(360/n), (360/n)+'°'],
          hint:'Exterior angles always add to 360°, so divide by '+n+'.'};
      }},
      {gen:function(){
        var n=Q.pick([3,4,5,6,8,9,10,12,15,18,20,24,30,36]);
        return {type:'text', q:'A regular polygon has an exterior angle of '+(360/n)+
            '°. How many sides does it have?',
          answer:[String(n)], hint:'n = 360 ÷ '+(360/n)+'.'};
      }},
      {gen:function(){
        var n=Q.pick([3,4,5,6,8,9,10,12,15,18,20]);
        var interior=180-360/n;
        return {type:'text', q:'Find the size of each interior angle of a regular polygon with '+n+' sides (in degrees).',
          answer:Q.dec(Q.fix(interior,2)).concat([interior+'°']),
          hint:'Exterior = 360 ÷ '+n+' = '+(360/n)+'°, and interior = 180 − exterior.'};
      }},
      {gen:function(){
        var o=Q.mc('360°', ['180°','540°','it depends on the number of sides']);
        return {type:'mc', q:'What do the EXTERIOR angles of any polygon add up to?',
          options:o.options, answer:o.answer,
          hint:'Walking right round the outside turns you through one full circle.'};
      }},
      {gen:function(){
        var kinds=[['every interior angle is less than 180°','convex'],
                   ['at least one interior angle is reflex, giving it a dent','concave'],
                   ['all sides are equal AND all angles are equal','regular']];
        var k=Q.pick(kinds);
        var o=Q.mc(k[1], ['convex','concave','regular'].filter(function(x){return x!==k[1];}).concat(['tessellating']));
        return {type:'mc', q:'What do you call a polygon in which '+k[0]+'?',
          options:o.options, answer:o.answer,
          hint:'A dent means concave; equal sides AND angles means regular.'};
      }},
    ]
  });

})();
