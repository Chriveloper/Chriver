        // Get a reference to the canvas element
        const canvas = document.getElementById('circleCanvas');
        
        // Get the 2D drawing context
        const ctx = canvas.getContext('2d');

        // Function to draw a circle with a specific radius
        function drawCircle(radius2, color, thick, radius1) {
            ctx.beginPath();
            ctx.arc(500, 500, radius2, 0, Math.PI * 2);
            ctx.strokeStyle = color;
            ctx.lineWidth = thick;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(500, 500, radius1, 0, Math.PI * 2);
            ctx.strokeStyle = color;
            ctx.lineWidth = thick;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(500, 500, radius2, 0, Math.PI * 2);
            ctx.arc(500, 500, radius1, 0, Math.PI * 2, true);
            ctx.fillStyle = 'rgba(144, 238, 144, 0.5)';
            ctx.fill();
            
        }


        function water() {
            ctx.fillStyle = 'lightblue';
            ctx.fillRect(0, 0, 1000, 1000)
        }
        water();

        function mas(){
            ctx.fillStyle = 'red';
            ctx.fillRect(5, 5, 20, 20)
        }
        mas();
        function ente() {
            ctx.fillStyle = 'yellow';
            ctx.fillRect(30, 5, 40, 40)
        }
        ente();
        
        

        for (let i = 0; i<50; i++) {
            console.log('power' + Math.pow(1.25, i));
            let x2 = Math.sqrt(((Math.pow(1.25, i)*2)/Math.PI));
            console.log('i'+i);
            console.log(x2);
            if (i%3 == 0) {
                let color = 'darkgreen';
                let thick = 2;
                if (i==0) {
                    function drawie() {
                        ctx.beginPath();
                        ctx.arc(500, 500, x2*20, 0, Math.PI * 2);
                        ctx.strokeStyle = color;
                        ctx.lineWidth = thick;
                        ctx.fillStyle = 'rgba(144, 238, 144, 0.5)';
                        ctx.fill();
                        ctx.stroke();
                        ctx.closePath();

                    }
                    drawie()
                } else {
                    let x1 = Math.sqrt(((Math.pow(1.25, i-3)*2)/Math.PI));
                    drawCircle(x2*20, color, thick, x1*20)
                }
            } else {
                let color = 'grey';
                let thick = 1;
                function drawe(radius2, color, thick) {
                    ctx.beginPath();
                    ctx.arc(500, 500, radius2*20, 0, Math.PI * 2);
                    ctx.strokeStyle = color;
                    ctx.lineWidth = thick;
                    ctx.stroke();
                    
                }
                drawe(x2, color, thick);
            }
            

        }
    


        const table = document.createElement('table');
        table.style.border = '1px solid black';
        document.body.appendChild(table);
        function createRow (rowname) {
            const row = document.createElement('tr');
            row.id = rowname;
            table.appendChild(row);
            window[rowname] = row;
            row.style.border = '1px solid black';
        }
        function createCell (rowname, cellname, cellcontent) {
            const cell = document.createElement('td');
            cell.id = cellname;
            cell.innerHTML = cellcontent;
            document.getElementById(rowname).appendChild(cell);
            window[cellname] = cell;
            cell.style.border = '1px solid black';
        }
        
        function fillRow (rowname, aray) {
        createRow(rowname);
        for (let i = 0; i<aray.length; i++) {
            createCell(rowname, rowname + 'cell'+i, aray[i]);
        }
        }
        
        
        let ary = ['Art des Wachstums', 'x', 0, 1/4, 1/2, 3/4, 1, 2, 3, 4, 10];
        fillRow('row0', ary);
        function exponentiell(x) {
            return Math.pow(2, x);
        }