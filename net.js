      google.load("visualization", "1");

      // Set callback to run when API is loaded
      google.setOnLoadCallback(drawVisualization);
      // Called when the Visualization API is loaded.
           function drawVisualization() {
             // Create a datatable for the nodes.
             var nodesTable = new google.visualization.DataTable();
             nodesTable.addColumn('number', 'id');
             nodesTable.addColumn('string', 'text');
             nodesTable.addColumn('string', 'style');
             // optional
             nodesTable.addRow([1, "center","rect"]);
             nodesTable.addRow([2, "ESP32", "circle"]);
             nodesTable.addRow([3, "Arduino", "circle"]);
             nodesTable.addRow([4, "sensor1", "database"]);
             nodesTable.addRow([5, "sensor2", "database"]);
             nodesTable.addRow([6, "sensor3", "database"]);
             nodesTable.addRow([7, "temp", "star"]);
             nodesTable.addRow([8, "air", "star"]);
             nodesTable.addRow([9, "light", "star"]);


             // create a datatable for the links between the nodes
             var linksTable = new google.visualization.DataTable();
             linksTable.addColumn('number', 'from');
             linksTable.addColumn('number', 'to');
             linksTable.addColumn('string', 'style');
             linksTable.addColumn('number', 'width');

             linksTable.addRow([2, 1,'moving-arrows',undefined]);
             linksTable.addRow([3, 1,'moving-arrows',undefined]);
             linksTable.addRow([4, 3,'moving-arrows',undefined]);
             linksTable.addRow([5, 3,'moving-arrows',undefined]);
             linksTable.addRow([6, 3,'moving-arrows',undefined]);
             linksTable.addRow([7, 2,'moving-arrows',undefined]);
             linksTable.addRow([8, 2,'moving-arrows',undefined]);
             linksTable.addRow([9, 2,'moving-arrows',undefined]);

             // specify options
             var options = {width:  "1100px",
                            height: "800px",
                            stabilize: false, // do not stabilize before displaying
                           };

             // Instantiate our network object.
             var network = new links.Network(document.getElementById('mynetwork'));

             // Draw our network with the created data and options
             network.draw(nodesTable, linksTable, options);
           }
