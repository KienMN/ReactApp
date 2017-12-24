// jQuerry
// include("js/jquery.min.js");
// Bootstrap core javascript
// include("js/bootstrap.min.js");
// DataTables javascript
// include("js/dataTables/jquery.dataTables.min.js");
// include("js/dataTables/dataTables.bootstrap.min.js");
// import * as blabla from "js/dataTables/jquery.dataTables.min.js";
// import * as ssss from "js/dataTables/dataTables.bootstrap.min.js";

$(document).ready(function() {

	var t = $('#requestTable').DataTable( {
		responsive: true,
		"columnDefs": [ {
			"searchable": false,
			"orderable": false,
			"targets": 0
		} ],
		"order": [[ 1, 'asc' ]]
	} );

	t.on( 'order.dt search.dt', function () {
		t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
			cell.innerHTML = i+1;
		} );
	} ).draw();
});