(function() {
    var http = require("http");
    var Class = require('node-class').Class;

    var entrySet = {
        server: {
            databases: { //	Shows the list of databases.
                k: ['database', 'name_database', 'number_dimensions', 'number_cubes', 'status', 'type', 'database_token']
            },
            info: { //	Shows information about the server.
                k: ['major_version', 'minor_version', 'bugfix_version', 'build_number', 'encryption', 'https_port']
            },
            load: { //	Loads the server data (does not load database or cube data).
                k: ['OK']
            },
            login: { //	Login to server by user name and password.
                k: ['sid', 'ttl'],
                fn: function(req, result) { //	After login action
                    req.session.sid = result.result[0].sid;
                    //req.session.
                }
            },
            logout: { //        Logout the current user
                k: ['OK'],
                fn: function(req, result) {
                    req.session.sid = null;
                }
            },
            save: {
                k: ['OK']
            },
            //	Saves the server data (does not save database or cube data).
            shutdown: {
                k: ['OK']
            } //	Shuts down server (does not save database or cube data).
        },
        database: {
            cubes: { //	Shows the list of cubes
                k: ['cube', 'name_cube', 'number_dimensions', 'dimensions', 'number_cells', 'number_filled_cells', 'status', 'type', 'cube_token']
            },
            create: { //	Creates new database.
                k: ['database', //	identifier	Identifier of the database
                'name_database', //	string		Name of the database
                'number_dimensions', //	integer		Number of dimensions in the database
                'number_cubes', //	integer		Number of cubes in the database
                'status', //	integer		Status of database (0=unloaded, 1=loaded and 2=changed)
                'type' //	integer		Type of database (0=normal, 1=system, 3=user info)
                ]
            },
            destroy: { //		Deletes a database.
                k: ['OK']
            },
            dimensions: { //		Shows the list of dimensions
                k: ['name_dimension', //	string	Name of the dimension'
                'number_elements', //	integer	Number of elements
                'maximum_level', //	integer	Maximum level of the dimension
                'maximum_indent', //	integer	Maximum indent of the dimension
                'maximum_depth', //	integer	Maximum depth of the dimension
                'type', //	integer	Type of dimension (0=normal, 1=system, 2=attribute, 3=user info)
                'attributes_dimension', //	identifier	Identifier of the attributes dimension of a normal dimension or the identifier of the normal dimension associated to a attributes dimension.
                'attributes_cube', //	identifier	Identifier of the attributes cube. (only for normal dimensions)
                'rights_cube', //	identifier	Identifier of the rights cube. (only for normal dimensions)
                'dimension_token', //	integer	The dimension token of the dimension
                ]
            },
            info: { //	 	Shows identifier, name, number of dimensions and number of cubes.
                k: ['database', // 	identifier 	Identifier of the database
                'name_database', // 	string 	Name of the database
                'number_dimensions', // 	integer 	Number of dimensions in the database
                'number_cubes', // 	integer 	Number of cubes in the database
                'status', // 	integer 	Status of database (0=unloaded, 1=loaded and 2=changed)
                'type', // 	integer 	Type of database (0=normal, 1=system, 3=user info)
                'database_token', // 	integer 	The database token of the database
                ]
            },
            load: {
                k: ['OK']
            },
            //	Loads the database data.
            rename: { //	Renames a database
                k: ['database', // 	identifier 	Identifier of the database
                'name_database', // 	string		Name of the database
                'number_dimensions', // 	integer 	Number of dimensions in the database
                'number_cubes', // 	integer 	Number of cubes in the database
                'status', // 	integer 	Status of database (0=unloaded, 1=loaded and 2=changed)
                'type', // 	integer 	Type of database (0=normal, 1=system)
                ]
            },
            save: {
                k: ['OK']
            },
            //	Saves the database data (does not save cube data).
            unload: {
                k: ['OK']
            } //	Unloads the database, dimension and cube data from memory.
        },
        dimension: {
            clear: { //	Clears a dimension.
                k: ['dimension', // 	 	identifier 	Identifier of the dimension
                'name_dimension', // 	 	string		Name of the dimension
                'number_elements', // 	 	integer 	Number of elements
                'maximum_level', // 	 	integer 	Maximum level of the dimension
                'maximum_indent', // 	 	integer 	Maximum indent of the dimension
                'maximum_depth', // 	 	integer 	Maximum depth of the dimension
                'type', // 	 	integer 	Type of dimension (0=normal, 1=system, 2=attribute)
                'attributes_dimension', // 	 	identifier 	Identifier of the attributes dimension of a normal dimension or the identifier of the normal dimension associated to a attributes dimension.
                'attributes_cube', // 	 	identifier 	Identifier of the attributes cube. (only for normal dimensions)
                'rights_cube', // 	 	identifier 	Identifier of the rights cube. (only for normal dimensions)
                'dimension_token', // 	 	integer 	The dimension token of the dimension
                ]
            },
            create: {
                k: ['dimension', // 	 	 identifier Identifier of the dimension
                'name_dimension', // 	 	 string		Name of the dimension
                'number_elements', // 	 	 integer 	Number of elements
                'maximum_level', // 	 	 integer 	Maximum level of the dimension
                'maximum_indent', // 	 	 integer 	Maximum indent of the dimension
                'maximum_depth', // 	 	 integer 	Maximum depth of the dimension
                'type', // 	 	 integer	Type of dimension (0=normal, 1=system, 2=attribute, 3=user info)
                'attributes_dimension', // 	 	 identifier Identifier of the attributes dimension of a normal dimension or the identifier of the normal dimension associated to a attributes dimension.
                'attributes_cube', // 	 	 identifier Identifier of the attributes cube. (only for normal dimensions)
                'rights_cube', // 	 	 identifier Identifier of the rights cube. (only for normal dimensions)
                'dimension_token', // 	 	 integer 	The dimension token of the dimension
                ]
            },
            cubes: {
                k: ['cube', // 	 	identifier 	Identifier of the cube
                'name_cube', // 	   	string		Name of the cube
                'number_dimensions', // 	   	integer 	Number of dimensions
                'dimensions', // 	   	identifier 	Comma separate list of dimension identifiers
                'number_cells', // 	   	integer 	Total number of cells
                'number_filled_cells', // 	   	integer 	Number of filled numeric base cells plus number of filled string cells
                'status', // 	   	integer 	Status of cube (0=unloaded, 1=loaded and 2=changed)
                'type', // 	   	integer 	Type of cube (0=normal, 1=system, 2=attribute, 3=user info, 4=gpu type)
                'cube_token', // 	   	integer 	The cube token of the cube
                ]
            },
            destroy: {
                k: ['OK']
            },
            element: {
                k: ['element', // 	identifier 	Identifier of the element
                'name_element', // 	string 	Name of the element
                'position', // 	integer 	Position of the element
                'level', // 	integer 	Level of the element
                'indent', // 	integer 	Indent of the element
                'depth', // 	integer 	Depth of the element
                'type', // 	integer 	Type of the element (1=NUMERIC, 2=STRING, 4=CONSOLIDATED)
                'number_parents', // 	integer 	Number of parents
                'parents', // 	identifier 	Comma separate list of parent identifiers
                'number_children', // 	integer 	Number of children
                'children', // 	identifier 	Comma separate list of children identifiers
                'weights', // 	double 	Comma separate list of children weight
                ]
            },
            elements: {
                k: ['element', // 	identifier 	Identifier of the element
                'name_element', // 	 	string 	Name of the element
                'position', // 	 	integer 	Position of the element
                'level', // 	 	integer 	Level of the element
                'indent', // 	 	integer 	Indent of the element
                'depth', // 	 	integer 	Depth of the element
                'type', // 	 	integer 	Type of the element (1=NUMERIC, 2=STRING, 4=CONSOLIDATED)
                'number_parents', // 	 	integer 	Number of parents
                'parents', // 	 	identifier 	Comma separate list of parent identifiers
                'number_children', // 	 	integer 	Number of children
                'children', // 	 	identifier 	Comma separate list of children identifiers
                'weights', // 	 	double 	Comma separate list of children weight
                ]
            },
            info: {
                k: ['dimension', // 	 	 	identifier 	Identifier of the dimension
                'name_dimension', // 	 	 	string 	Name of the dimension
                'number_elements', // 	 	 	integer 	Number of elements
                'maximum_level', // 	 	 	integer 	Maximum level of the dimension
                'maximum_indent', // 	 	 	integer 	Maximum indent of the dimension
                'maximum_depth', // 	 	 	integer 	Maximum depth of the dimension
                'type', // 	 	 	integer 	Type of dimension (0=normal, 1=system, 2=attribute, 3=user info)
                'attributes_dimension', // 	 	 	identifier 	Identifier of the attributes dimension of a normal dimension or the identifier of the normal dimension associated to a attributes dimension.
                'attributes_cube', // 	 	 	identifier 	Identifier of the attributes cube. (only for normal dimensions)
                'rights_cube', // 	 	 	identifier 	Identifier of the rights cube. (only for normal dimensions)
                'dimension_token', // 	 	 	integer 	The dimension token of the dimension
                ]
            },
            rename: {
                k: ['dimension', // 	  	identifier 	Identifier of the dimension
                'name_dimension', // 	  	string 	Name of the dimension
                'number_elements', // 	  	integer 	Number of elements
                'maximum_level', // 	  	integer 	Maximum level of the dimension
                'maximum_depth', // 	  	integer 	Maximum depth of the dimension
                'type', // 	  	integer 	Type of dimension (0=normal, 1=system, 2=attribute, 3=user info)
                'attributes_dimension', // 	  	identifier 	Identifier of the attributes dimension of a normal dimension or the identifier of the normal dimension associated to a attributes dimension.
                'attributes_cube', // 	  	identifier 	Identifier of the attributes cube. (only for normal dimensions)
                'rights_cube', // 	  	identifier 	Identifier of the rights cube. (only for normal dimensions)
                'dimension_token', // 	  	integer 	The dimension token of the dimension
                ]
            }
        },
        element: {
            append: { // Adds children to consolidated elements.     dimension
                k: ['element', // 	identifier 	Identifier of the element
                'name_element', // 	string 	Name of the element
                'position', // 	integer 	Position of the element
                'level', // 	integer 	Level of the element
                'indent', // 	integer 	Indent of the element
                'depth', // 	integer 	Depth of the element
                'type', // 	integer 	Type of the element (1=NUMERIC, 2=STRING, 4=CONSOLIDATED)
                'number_parents', // 	integer 	Number of parents
                'parents', // 	identifier 	Comma separate list of parent identifiers
                'number_children', // 	integer 	Number of children
                'children', // 	identifier 	Comma separate list of children identifiers
                'weights', // 	double 	Comma separate list of children weight
                ]
            },
            create: { // Creates new element.     dimension
                k: ['element', // 	identifier 	Identifier of the element
                'name_element', // 	string 	Name of the element
                'position', // 	integer 	Position of the element
                'level', // 	integer 	Level of the element
                'indent', // 	integer 	Indent of the element
                'depth', // 	integer 	Depth of the element
                'type', // 	integer 	Type of the element (1=NUMERIC, 2=STRING, 4=CONSOLIDATED)
                'number_parents', // 	integer 	Number of parents
                'parents', // 	identifier 	Comma separate list of parent identifiers
                'number_children', // 	integer 	Number of children
                'children', // 	identifier 	Comma separate list of children identifiers
                'weights', // 	double 	Comma separate list of children weight
                ]
            },
            create_bulk: { // Creates multiple elements of the same type.     dimension
                k: []
            },
            destroy: { // Deletes an element.     dimension
                k: ['OK']
            },
            destroy_bulk: { // Delete list of elements.     dimension
                k: ['OK']
            },
            info: { // Shows identifer, name, position, level, depth, parents and children of an element.     dimension
                k: ['element', // 	identifier 	Identifier of the element
                'name_element', // 	string 	Name of the element
                'position', // 	integer 	Position of the element
                'level', // 	integer 	Level of the element
                'indent', // 	integer 	Indent of the element
                'depth', // 	integer 	Depth of the element
                'type', // 	integer 	Type of the element (1=NUMERIC, 2=STRING, 4=CONSOLIDATED)
                'number_parents', // 	integer 	Number of parents
                'parents', // 	identifier 	Comma separate list of parent identifiers
                'number_children', // 	integer 	Number of children
                'children', // 	identifier 	Comma separate list of children identifiers
                'weights', // 	double 	Comma separate list of children weight
                ]
            },
            move: { // Changes position of an element.     dimension
                k: ['element', // 	identifier 	Identifier of the element
                'name_element', // 	string 	Name of the element
                'position', // 	integer 	Position of the element
                'level', // 	integer 	Level of the element
                'indent', // 	integer 	Indent of the element
                'depth', // 	integer 	Depth of the element
                'type', // 	integer 	Type of the element (1=NUMERIC, 2=STRING, 4=CONSOLIDATED)
                'number_parents', // 	integer 	Number of parents
                'parents', // 	identifier 	Comma separate list of parent identifiers
                'number_children', // 	integer 	Number of children
                'children', // 	identifier 	Comma separate list of children identifiers
                'weights', // 	double 	Comma separate list of children weight
                ]
            },
            rename: { // Renames an element.     dimension
                k: ['element', // 	identifier 	Identifier of the element
                'name_element', // 	string 	Name of the element
                'position', // 	integer 	Position of the element
                'level', // 	integer 	Level of the element
                'indent', // 	integer 	Indent of the element
                'depth', // 	integer 	Depth of the element
                'type', // 	integer 	Type of the element (1=NUMERIC, 2=STRING, 4=CONSOLIDATED)
                'number_parents', // 	integer 	Number of parents
                'parents', // 	identifier 	Comma separate list of parent identifiers
                'number_children', // 	integer 	Number of children
                'children', // 	identifier 	Comma separate list of children identifiers
                'weights', // 	double 	Comma separate list of children weight
                ]
            },
            replace: { // Changes or creates a new element. Replaces children in consolidated elements.     dimension
                k: ['element', // 	identifier 	Identifier of the element
                'name_element', // 	string 	Name of the element
                'position', // 	integer 	Position of the element
                'level', // 	integer 	Level of the element
                'indent', // 	integer 	Indent of the element
                'depth', // 	integer 	Depth of the element
                'type', // 	integer 	Type of the element (1=NUMERIC, 2=STRING, 4=CONSOLIDATED)
                'number_parents', // 	integer 	Number of parents
                'parents', // 	identifier 	Comma separate list of parent identifiers
                'number_children', // 	integer 	Number of children
                'children', // 	identifier 	Comma separate list of children identifiers
                'weights', // 	double 	Comma separate list of children weight
                ]
            },
            replace_bulk: {
                k: ['OK']
            }
        },
        cubes: {
            clear: {
                k: ['cube', // 	identifier 	Identifier of the cube
                'name_cube', // 	string 	Name of the cube
                'number_dimensions', // 	integer 	Number of dimensions
                'dimensions', // 	identifier 	Comma separate list of dimension identifiers
                'number_cells', // 	integer 	Total number of cells
                'number_filled_cells', // 	integer 	Number of filled numeric base cells plus number of filled string cells
                'status', // 	integer 	Status of cube (0=unloaded, 1=loaded and 2=changed)
                'type', // 	integer 	Type of cube (0=normal, 1=system, 2=attribute, 3=user info, 4=gpu type)
                'cube_token', // 	integer 	The cube token of the cube
                ]
            },
            commit: {
                k: ['OK']
            },
            create: {
                k: ['cube', //  	identifier 	Identifier of the cube
                'name_cube', //  	string 	Name of the cube
                'number_dimensions', //  	integer 	Number of dimensions
                'dimensions', //  	identifier 	Comma separate list of dimension identifiers
                'number_cells', //  	integer 	Total number of cells
                'number_filled_cells', //  	integer 	Number of filled numeric base cells plus number of filled string cells
                'status', //  	integer 	Status of cube (0=unloaded, 1=loaded and 2=changed)
                'type', //  	integer 	Type of cube (0=normal, 1=system, 2=attribute, 3=user info, 4=gpu type)
                'cube_token', //  	integer 	The cube token of the cube
                ]
            },
            convert: {
                k: ['cube', // 	identifier 	Identifier of the cube
                'name_cube', // 	string 	Name of the cube
                'number_dimensions', // 	integer 	Number of dimensions
                'dimensions', // 	identifier 	Comma separate list of dimension identifiers
                'number_cells', // 	integer 	Total number of cells
                'number_filled_cells', // 	integer 	Number of filled numeric base cells plus number of filled string cells
                'status', // 	integer 	Status of cube (0=unloaded, 1=loaded and 2=changed)
                'type', // 	integer 	Type of cube (0=normal, 4=gpu type)
                'cube_token', // 	integer 	The cube token of the cube
                ]
            },
            destroy: {
                k: ['OK']
            },
            info: {
                k: ['cube', // 	identifier 	Identifier of the cube
                'name_cube', // 	string 	Name of the cube
                'number_dimensions', // 	integer 	Number of dimensions
                'dimensions', // 	identifier 	Comma separate list of dimension identifiers
                'number_cells', // 	integer 	Total number of cells
                'number_filled_cells', // 	integer 	Number of filled numeric base cells plus number of filled string cells
                'status', // 	integer 	Status of cube (0=unloaded, 1=loaded and 2=changed)
                'type', // 	integer 	Type of cube (0=normal, 1=system, 2=attribute, 3=user info, 4=gpu type)
                'cube_token', // 	integer 	The cube token of the cube
                ]
            },
            load: {
                k: ['OK']
            },
            lock: {
                k: ['lock', // 	integer 	Indentifier of the locked area
                'area', // 	area 	Comma separated list of element identifiers list. Each element identifiers list is colon separated. The area is the cartesian product.
                'user', // 	string 	The name of the user who locked the cube
                'steps', // 	integer 	Number of steps
                ]
            },
            locks: {
                k: ['lock', //  	integer 	Indentifier of the locked area
                'area', //  	area 	Comma separated list of element identifiers list. Each element identifiers list is colon separated. The area is the cartesian product.
                'user', //  	string 	The name of the user who locked the cube
                'steps', //  	integer 	Number of steps
                ]
            },
            rename: {
                k: ['cube', // 	identifier 	Identifier of the cube
                'name_cube', // 	string 	Name of the cube
                'number_dimensions', // 	integer 	Number of dimensions
                'dimensions', // 	identifier 	Comma separate list of dimension identifiers
                'number_cells', // 	integer 	Total number of cells
                'number_filled_cells', // 	integer 	Number of filled numeric base cells plus number of filled string cells
                'status', // 	integer 	Status of cube (0=unloaded, 1=loaded and 2=changed)
                'type', // 	integer 	Type of cube (0=normal, 1=system, 2=attribute, 3=user info, 4=gpu type)
                'cube_token', // 	integer 	The cube token of the cube
                ]
            },
            rollback: {
                k: ['OK']
            },
            rules: {
                k: ['rule', // 	identifier 	Identifier of the rule
                'rule_string', // 	string 	Textual representation for the rule
                'external_identifier', // 	string 	external identifier of the rule
                'comment', // 	string 	comment for the rule
                'timestamp', // 	string 	creation time of the rule in seconds since 1970-01-01
                'active', // 	integer 	0=rule is not active, 1=rule is active
                ]
            },
            save: {
                k: ['OK']
            },
            unload: {
                k: ['OK']
            }
        },
        cell: {
            area: {
                k: ['type', // 	integer 	Type of the value (1=NUMERIC, 2=STRING)
                'exists', // 	boolean 	1 if at least base cell for the path exists
                'value', // 	double/string 	Value of the cell
                'path', // 	path 	Comma separate list of element identifier (path of cube cell)
                'rule', // 	identifier 	Identifier of the rule, this cell values originates from or empty. Only available if show_rule is 1.
                'lock_info', // 	identifier 	Lock info (0 - cell is not locked, 1 - cell is locked by user wich sent request, 2 - cell is locked by another user). Only available if show_lock_info is 1.
                ]
            },
            copy: {
                k: ['OK']
            },
            drillthrough: { //	Retrieves detailed data for a cube cell.
                k: ['resultset', // 	string 	Comma separated component-values (columns) of resultset; First row: Component names of resultset-columns
                ]
            },
            'export': { //	 	Exports cells.
                k: ['type', // 	integer 	Type of the value (1=NUMERIC, 2=STRING)
                'exists', // 	boolean 	1 if at least base cell for the path exists
                'value', // 	double/string 	Value of the cell
                'path', // 	path 	Comma separate list of element identifier (path of cube cell)
                ]
            },
            goalseek: {
                k: ['OK']
            },
            //	Sets value of a cell and sister cells in a way that values of parent cells remain unchanged.
            replace: {
                k: ['OK']
            },
            //	Sets value of a cube cell.
            replace_bulk: {
                k: ['OK']
            },
            //		Sets values of cube cells.
            value: { //	Shows datatype and value of a cube cell.
                k: ['type', //	integer 	Type of the value (1=NUMERIC, 2=STRING)
                'exists', //	boolean 	1 if at least one base cell for the path exists
                'value', //	double/string 	Value of the cell
                'rule', //	identifier 	Identifier of the rule, this cell values originates from or empty. Only available if show_rule is 1.
                'lock_info', //	identifier 	Lock info (0 - cell is not locked, 1 - cell is locked by user wich sent request, 2 - cell is locked by another user). Only available if show_lock_info is 1.
                ]
            },
            values: { //	Shows datatype and value of a list of cube cells.
                k: ['type', //	 	integer 	Type of the value (1=NUMERIC, 2=STRING, 99=ERROR)
                'exists/error', //	 	integer 	1 if at least base cell for the path exists. In case of an error the error code.
                'value', //	 	double/string 	Value of the cell. In case of an error the error message
                'rule', //	 	identifier 	Identifier of the rule, this cell values originates from or empty. Only available if show_rule is 1.
                'lock_info', //	 	identifier 	Lock info (0 - cell is not locked, 1 - cell is locked by user wich sent request, 2 - cell is locked by another user). Only available if show_lock_info is 1.
                ]
            }
        },
        'events': {
            begin: {
                k: ['OK']
            },
            //	Requests an exclusive lock.
            end: {
                k: ['OK']
            } //	Releases an exclusive lock.
        },
        rules: {
            create: { //	Creates a new enterprise rule for a cube.
                k: ['rule', //	 	 	identifier 	Identifier of the rule
                'rule_string', //	 	 	string 	Textual representation for the rule
                'external_identifier', //	 	 	string 	external identifier of the rule
                'comment', //	 	 	string 	comment for the rule
                'timestamp', //	 	 	string 	creation time of the rule in seconds since 1970-01-01
                'active', //	 	 	integer 	0=rule is not active, 1=rule is active
                ]
            },
            destroy: {
                k: ['OK']
            },
            //	Removes an enterprise rule from a cube.
            functions: { //			Lists all available functions
                k: ['xml_functions' //			string 	XML representation of the functions.
                ]
            },
            info: { //		Shows an enterprise rule of a cube.
                k: ['rule', // 	identifier 	Identifier of the rule
                'rule_string', // 	string 	Textual representation for the rule
                'external_identifier', // 	string 	external identifier of the rule
                'comment', // 	string 	comment for the rule
                'timestamp', // 	string 	creation time of the rule in seconds since 1970-01-01
                'active', // 	integer 	0=rule is not active, 1=rule is active
                ]
            },
            modify: { //	Modifies an enterprise rule of a cube.
                k: ['rule', // 	identifier 	Identifier of the rule
                'rule_string', // 	string 	Textual representation for the rule
                'external_identifier', // 	string 	external identifier of the rule
                'comment', // 	string 	comment for the rule
                'timestamp', // 	string 	creation time of the rule in seconds since 1970-01-01
                'active', // 	integer 	0=rule is not active, 1=rule is active
                ]
            },
            parse: { //	Parse an enterprise rule.
                k: ['xml_rule'] //string 	XML representation of the enterprise rule.
            }
        },
        svs: { //	 	Gets information about Supervision Server.
            info: {
                k: ['svs_active', // 	integer 	0 - not active, 1 - active
                'login_mode', // 	integer 	0 - none, 1 - information; 2 - authentification; 3 - authorization
                'cube_worker_active', // 	integer 	0 - not active, 1 - active
                'drill_through_enabled', // 	integer 	0 - disabled, 1 - enabled (switch in palo.ini)
                ]
            }
        }
    }

    var paloClass = Class("PaloClass", {
        host: 'localhost',
        port: '',
        sid: undefined,
        ttl: undefined
    });

    paloClass.implements({
        call: function(e, r, req, c) {
            this.hg('/' + e + '/' + r, req.query, entrySet[e][r].k, function(err, result) {
                if (!err) {
                    var aR = entrySet[e][r].fn;
                    if (typeof(aR) === typeof(function() {})) aR(req, result);
                }
                c(err, result);
            });
        },
        hg: function(path, parameters, results, callback) {
            var r = '';
            var p = '';
            var i = 0;
            for (var k in parameters) {
                if (i !== 0) p += '&';
                p += k + '=' + parameters[k];
                i++;
            }

            var fullpath = path + '?' + p;
            if (this.sid) fullpath += '&sid=' + this.sid;
            var httpRequest = http.request({
                host: this.host,
                port: this.port,
                path: fullpath
            }, onResponse);

            httpRequest.on('error', function(error) {
                console.log('bingo');
                console.log(error);
                callback(500, error);
            });
            httpRequest.end();

            function onResponse(res) {
                res.on('data', function(c) {
                    r += c;
                });
                res.on('end', onEnd);

                function onEnd() {
                    var headers = {
                        "X-PALO-SV": res.headers["x-palo-sv"] || '',
                        "X-PALO-DB": res.headers["x-palo-db"] || '',
                        "X-PALO-DIM": res.headers["x-palo-dim"] || '',
                        "X-PALO-CB": res.headers["x-palo-cb"] || '',
                        "X-PALO-CC": res.headers["x-palo-cc"] || ''
                    };
                    if (res.statusCode === 200) {
                        var result = [];
                        var rs = r.split('\n');
                        for (var i = 0; i < rs.length; i++) {
                            if (rs[i] !== '') {
                                var r1 = rs[i].split(';');
                                var r2 = {};
                                for (var j = 0; j < results.length; j++) {
                                    r2[results[j]] = r1[j];
                                }
                                result.push(r2);
                            }
                        }
                        callback(null, {
                            headers: headers,
                            result: result
                        });
                    }
                    else {
                        var r1e = r.split(';');
                        callback(res.statusCode, r1e);
                    }
                }
            }
        }
    });

    function getRandKey(l, cm) { // l - length,  cm - usable characters
        var l = l || 32;
        var keyChars = (cm || '0123456789abcdef').split(''); //  string to array conversation ? why ?
        var key = '';
        for (var i = 0; i < l; ++i) {
            var j = Math.round(Math.random() * keyChars.length);
            key += keyChars[j];
        }
        return key;
    }
    
    module.exports.getGlobalClient = function(opts){
        var opts = opts || {};
        if (localInstance===undefined){
            localInstance = new paloClass({
                host: opts.host || 'olap.rts-ugra.ru',
                port: opts.port || 7921
            });
        }
        return localInstance;
    }

    module.exports.getClient = function(session, callback) {
        var id = session.paloKey;

        if ((id === undefined) || (paloList[id] === undefined)) {
            var newKey = getRandKey();
            var newBase = new paloClass({
                host: 'olap.rts-ugra.ru',
                port: 7921
            });
            session.paloKey = newKey;
            paloList[newKey] = newBase;
        }

        var palov = paloList[session.paloKey];
        palov.sid = session.sid;
        callback(null, palov);
    }
/*module.exports.getInstance = function(options){
        if (pc===undefined){
            pc = new paloClass(options);
        }
        return pc;
    }*/
})();
var localInstance;
var paloList = {};