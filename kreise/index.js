        // Get a reference to the canvas element
        const canvas = document.getElementById('circleCanvas');
        
        // Get the 2D drawing context
        const ctx = canvas.getContext('2d');

        // Function to draw a circle with a specific radius
        function drawCircle(radius, color, thick) {
            ctx.beginPath();
            ctx.arc(500, 500, radius, 0, Math.PI * 2);
            ctx.strokeStyle = color;
            ctx.lineWidth = thick;
            ctx.stroke();
            ctx.closePath();
        }

        for (let i = 0; i<100; i++) {
            console.log('powe' + Math.pow(1.25, i));
            let x = Math.sqrt(((Math.pow(1.25, i)*2)/Math.PI));
            console.log('i'+i);
            console.log(x);
            if (i%3 == 0) {
                let color = 'darkgreen';
                let thick = 2;
                drawCircle(x*20, color, thick)
            } else {
                let color = 'lightgrey';
                let thick = 1;
                drawCircle(x*20, color, thick)
            }

        }