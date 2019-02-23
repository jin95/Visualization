google.load("visualization", "1");

// Set callback to run when API is loaded
google.setOnLoadCallback(drawVisualization);
// Called when the Visualization API is loaded.
     function drawVisualization() {
       // Create a datatable for the nodes.
       var nodesTable = new google.visualization.DataTable();
       nodesTable.addColumn('number', 'id');
       nodesTable.addColumn('string', 'text');
    //nodesTable.addColumn('string', 'image');
       nodesTable.addColumn('string', 'style');
       nodesTable.addColumn('number', 'x');
       nodesTable.addColumn('number', 'y');

       // optional
       nodesTable.addRow([1, "center",'',425,300]);
       nodesTable.addRow([2, "ESP32",'',300,200]);
       nodesTable.addRow([3, "Arduino", "circle",550,200]);
       nodesTable.addRow([4, "sensor1", "database",220,180]);
       nodesTable.addRow([5, "sensor2", "database",250,140]);
       nodesTable.addRow([6, "sensor3", "database",300,100]);
       nodesTable.addRow([7, "sensor4", "database",400,150]);
       nodesTable.addRow([8, "temp", "star",550,250]);
       nodesTable.addRow([9, "air", "star",500,200]);
       nodesTable.addRow([10, "light", "star",500,250]);
       nodesTable.addRow([11, "light2", "star",600,150]);
       nodesTable.addRow([12,"Camera","", 300,400]);
       nodesTable.addRow([13,"ESP32.2","", 550,400]);


       // create a datatable for the links between the nodes
       var linksTable = new google.visualization.DataTable();
       linksTable.addColumn('number', 'from');
       linksTable.addColumn('number', 'to');
       linksTable.addColumn('string', 'style');
       linksTable.addColumn('number', 'width');

       linksTable.addRow([2, 1,'moving-arrows',undefined]);
       linksTable.addRow([3, 1,'moving-arrows',undefined]);
       linksTable.addRow([4, 2,'moving-arrows',undefined]);
       linksTable.addRow([5, 2,'moving-arrows',undefined]);
       linksTable.addRow([6, 2,'moving-arrows',undefined]);
       linksTable.addRow([7, 2,'moving-arrows',undefined]);
       linksTable.addRow([8, 3,'moving-arrows',undefined]);
       linksTable.addRow([9, 3,'moving-arrows',undefined]);
       linksTable.addRow([10, 3,'moving-arrows',undefined]);
       linksTable.addRow([11, 3,'moving-arrows',undefined]);
       linksTable.addRow([12, 1,'moving-arrows',undefined]);
       linksTable.addRow([13, 1,'moving-arrows',undefined]);

       // specify options
       var options = {width:  "850px",
                      height: "600px",
                      stabilize: false, // do not stabilize before displaying
                     };

       // Instantiate our network object.
       var network = new links.Network(document.getElementById('mynetwork'));

       // Draw our network with the created data and options
       network.draw(nodesTable, linksTable, options);
     }
