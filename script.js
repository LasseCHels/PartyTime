$(document).ready(function() {
    
    const box = $('#container');
    const boxWidth = box.width();
    const boxHeight = box.height();
    
    const btn = $('#partyTime');
    
    const className = ".confetti";
    
    const elementType = "<div></div>";
    
    const minHeight = 5;
    const maxHeight = 15;
    
    const minWidth = 20;
    const maxWidth = 30;
    
    const floor = 100;

    const minFireLeft = 500;
    const maxFireLeft = 1200;
    
    const minAnimDuration = 8;
    const maxAnimDuration = 10;
    
    const confettiAmount = 200;
    
    function CreateConfetti(amount) {
        
        for (i = 0; i < amount; i ++) {
            const h =  Rand(minHeight, maxHeight);
            const w = Rand(minWidth, maxWidth);
            const color = "rgb(" + Rand(50, 200) + ", " + Rand(50, 200) + ", " + Rand(50, 200) + ")";
            
            const c = $(elementType);
            
            c.height(h);
            c.width(w);
            
            c.addClass("confetti");
            
            c.css({
                "background-color": color,
                "left": (boxWidth - maxWidth * 2),
                "top": 50
            });
            
            box.append(c);
        }
        
    }
    
    CreateConfetti(confettiAmount);
    
    function Fire() {
        
        if ($(className).first().css("top") != "0px") {
            
            ResetConfetti();
            Fire();
            
        } else {
            
            box.children(className).each(function() {
                
                const c = $(this);
                
                // Duration of the transitions
                const dur = RandFloat(minAnimDuration, maxAnimDuration);
                
                // X and Y rotation in degrees
                const xRotation = Rand(1440, 3600);
                const zRotation = Rand(540, 1440);
                
                // Controls the vertical spread of the confetti, the bigger the difference between the two numbers, the larger the spread
                const verticalSpread = RandFloat(5, 8);
                
                // Setting up the three different transition properties for the element
                const cTransitionTop = "top " + dur + "s cubic-bezier(0.01, -" + verticalSpread + ", 0.01, 0.01)";
                const cTransitionLeft = "left " + dur + "s cubic-bezier(0.01, 1, 0.01, 1)";
                const cTransitionTransform = "transform " + dur + "s linear";
                
                // Stitching the transitions together
                const cTransition = cTransitionTop + ", " + cTransitionLeft + ", " + cTransitionTransform;
                
                // Left property for the element
                const cLeft = Rand(minFireLeft, maxFireLeft);
                
                // Top property for the element
                const cTop = floor + "%";
                
                // Transform (i.e. the rotational movement) for the element
                const cTransform = "rotateX(" + xRotation + "deg) rotateZ(" + zRotation + "deg)";
                
                c.css({
                    "transition": cTransition,
                    "left": cLeft,
                    "top": cTop,
                    "transform": cTransform
                });
                
            });
            
        }
        
        
    }
    
    // Resets the position of each confetti
    function ResetConfetti() {
        box.children(className).each(function() {
            
            const c = $(this);
            
            c.css({
                "transition": "",
                "top": "0px",
                "left": (boxWidth - maxWidth),
                "transform": ""
            });
            
        });
    }
    
    // Returns random whole number
    function Rand(min, max) {
        return Math.floor(Math.random() * (max-min + 1) + min);
    }
    
    // Returns random float with two decimals
    function RandFloat(min, max) {
        let a = Math.random() * (max - min) + min;
        
        a = a.toFixed(2);
        
        return a;
    }
    
    btn.click(function() {
        Fire();
    });
    
});