(function() {
    var http = require("http");
    var Class = require('node-class').Class;
    var nconf = require('../init/nconf')();

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
                k: ['sid', 'ttl']/*,
                fn: function(session, result) { //	After login action
                    session.sid = result.rows[0].sid;
                    var ttl = + result.rows[0].ttl;
                    if (ttl!==undefined){
                        setTimeout(function() {
                            paloList[session.paloKey] = undefined;
                            session.sid = undefined;
                            session.ttl = undefined;
                        }, ttl);
                    }
                }*/
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
                a: {
                    database: 0,
                    show_normal: 1,
                    show_system: 0,
                    show_attribute: 0,
                    show_info: 0,
                    show_gputype: 0,
                    sid: ''
                },
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
        cube: {
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
                a: {
                    database: 0,
                    cube: 0,
                    area: 0,         //  Comma separated list of element identifiers list. Each element identifiers list is colon separated. The area is the cartesian product.
                    show_rule: 0,     //  boolean     
                    show_lock_info: 0,
                    sid: 0
                },
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
        call: function(e, r, opts, c) {
            console.log(e,r);
            this.hg('/' + e + '/' + r, opts.query, entrySet[e][r].k, function(err, result) {
                if (!err) {
                    var aR = entrySet[e][r].fn;
                    if (!!aR && !!opts.session &&!!opts.session){
                        aR(opts.session, result);
                    }
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
            
            console.log(this.host,this.port,fullpath);
            
            httpRequest.on('error', function(error) {
                callback(500, error);
            });
            httpRequest.end();

            function onResponse(res) {
                res.on('data', function(c) {
                    r += c;
                });
                res.on('end', onEnd);

                function onEnd() {
                    if (res.statusCode === 200) {
                        var headers = {
                            "X-PALO-SV": res.headers["x-palo-sv"] || undefined,
                            "X-PALO-DB": res.headers["x-palo-db"] || undefined,
                            "X-PALO-DIM": res.headers["x-palo-dim"] || undefined,
                            "X-PALO-CB": res.headers["x-palo-cb"] || undefined,
                            "X-PALO-CC": res.headers["x-palo-cc"] || undefined
                        };
                        var result = [];
                        var rs = r.split('\n');
                        for (var i = 0; i < rs.length; i++) {
                            if (rs[i] !== '') {
                                var r1 = rs[i].split(';');
                                var r2 = {};
                                for (var j = 0, l = results.length; j < l; j++) {
                                    var f = r1[j];
                                    if (typeof f === 'string'){
                                        var len = f.length;
                                        if (f[0]==='"' && f[len-1]){
                                            //console.log(r1[j]);
                                            r1[j] = f.substring(1,f.length-1);
                                            //console.log(r1[j]);
                                        }
                                    }
                                    
                                    
                                    r2[results[j]] = r1[j];
                                }
                                result.push(r2);
                            }
                        }
                        callback(null, {
                            success: true,
                            headers: headers,
                            total: result.length,
                            rows: result,
                            //result: result
                        });
                    }
                    else {
                        callback(res.statusCode, r);
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
    
    module.exports.getGlobalClient = function(opts, cb) {
        console.log(opts);
        var opts = opts || {};
        if (localInstance === undefined) {
            localInstance = new paloClass({
                host: opts.host || nconf.get('palo:host'),
                port: opts.port || nconf.get('palo:port')
            });
            localInstance.call('server', 'login', {
                query: {
                    user: nconf.get('palo:user'),
                    password: nconf.get('palo:password')
                }
            }, function(err, result) {
                if (!err) {
                    console.log(result);
                    localInstance.sid = result.rows[0].sid;
                    localInstance.ttl = result.rows[0].ttl;
                    cb(null, localInstance);
                    var ttl = 1000*(+result.rows[0].ttl);        //  seconds to milliseconds
                    setTimeout(function() {                         // autodelete after ttl
                        localInstance = undefined;
                        console.log('deleted after '+ttl);
                        //delete localInstance;
                    }, ttl);
                }
                else {
                    cb(err, result);
                }
            })
        }
        else {
            localInstance.call('server','databases',{},function(err,result){
                console.log(err);                                               //  do something
            })
            cb(null, localInstance);
        }
    }
    
    module.exports.purgeClient = function(id){
        delete paloList[id];
    }

    var getClient = function(params, callback) {
        var id = params.paloKey;
        var sid = params.sid
        if (sid===undefined) throw 'sid is undefined at `'+__filename+'`';
        var ttl = params.ttl || 3600;
        if ((id === undefined) || (paloList[id] === undefined)) {
            var newKey = getRandKey();
            var newBase = new paloClass({
                host: '91.198.71.244',
                port: 7921
            });
            newBase.sid = sid;
            newBase.ttl = ttl;
            
            paloList[newKey] = newBase;
            checkClient(newBase,function(err,client){
                callback(null, client);
            })
            setTimeout(function() {
                delete paloList[id];
            }, ttl);
            return newKey;
        }else{
            checkClient(paloList[id],function(err,client){
                console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
                console.log(err);
                //console.log(result);
                callback(err,client);
            })
            return id;
        }
        function checkClient(client,cb){
            client.call('server','databases',{},function(err,result){
                cb(err,client);
            })
        }
    }
    module.exports.getClient = getClient;
    module.exports.getClientWrap = function(req,res,next){
        var sid;
        var ttl = 3600;
        try {
            sid = req.session.passport.user.sid;
            ttl = req.session.passport.user.ttl || ttl;
            if (!req.isAuthenticated()){
                throw '401';
            }
        }catch(e){
            console.log(e);
            if (!req.xhr){
                return res.render('redirect',{
                    to: '/'
                });
                res.send(e);
                return;
            }else{
                return res.json(401,{
                    success: false,
                    err: '`sid` not found, probably u r not logged in ?'
                });
            }
        }
        req.session.paloKey = getClient({
            paloKey: req.session.paloKey,
            sid: sid,
            ttl: ttl
    	},function(err,client){
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
            console.log(err);
            
            
            /**
             * Checking client still alive
             * 
             **/
            
            if (!err){
                console.log('noerror');
                req.paloClient = client;
                
                next();
            }else{
                req.logout();
                res.send(+err,{
                    success: false
                });
            }
        });
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

module.exports.errorHandler = {
    1:	'unknown',
	2:	'internal error',
	1000:	'identifier not found',
	1001:	'invalid filename',
	1002:	'cannot create directory',
	1003:	'cannot rename file',
	1004:	'authorization failed',
	1005:	'invalid type',
	1006:	'invalid coordinates',
	1007:	'conversion failed',
	1008:	'file not found',
	1009:	'not authorized for operation',
	1010:	'corrupt file',
	1011:	'already within event',
	1012:	'not within event',
	1013:	'invalid permission entry',
	1014:	'invalid server path',
	1015:	'invalid session',
	1016:	'missing parameter',
	1017:	'server token outdated',
	1018:	'invalid splash mode',
	1019:	'worker authorization failed',
	1020:	'worker error',
	1021:	'api call not implemented',
	1022:	'insecure communication disabled',
	1023:	'not enough memory',
	1024:	'ssl failed',
	1025:	'gpu server not enabled',
	1026:	'invalid string',
	2000:	'invalid database name',
	2001:	'database not found',
	2002:	'database not loaded',
	2003:	'database not saved',
	2004:	'database still loaded',
	2005:	'database name in use',
	2006:	'databae is not deletable',
	2007:	'database in not renamable',
	2008:	'database token outdated',
	2009:	'invalid database type',
	3000:	'dimension empty',
	3001:	'dimension already exists',
	3002:	'dimension not found',
	3003:	'invalid dimension name',
	3004:	'dimension is not changable',
	3005:	'dimension name in use',
	3006:	'dimension in use',
	3007:   'dimension not deletable',
	3008:   'dimension not renamable',
	3009:	'dimension token outdated',
	3010:	'dimension is locked',
	4000:	'element already exists',
	4001:	'cirular reference',
	4002:	'element name in use',
	4003:	'element name not unique',
	4004:	'element not foundv',
	4005:	'element is no child',
	4006:	'invalid element name',
	4007:	'invalid element offset',
	4008:	'invalid element type',
	4009:	'invalid element position',
	4010:	'element not deletable',
	4011:	'element not renamable',
	4012:	'element not changable',
	4013:	'invalid mode',
	5000:	'cube not found',
	5001:	'invalid cube name',
	5002:	'cube not loaded',
	5003:	'cube empty',
	5004:	'cube not saved',
	5005:	'splash disabled',
	5006:	'copy path must be numeric',
	5007:	'invalid copy value',
	5008:	'cube name in use',
	5009:	'cube is not deletable',
	5010:	'cube is not renamable',
	5011:	'cube token outdated',
	5012:	'splashing is not possible',
	5013:	'cube lock not found',
	5014:	'wrong user for locked area',
	5015:	'could not create lock',
	5016:	'is blocked because of a locked area',
	5017:	'not enough rollback capacity',
	5018:	'goalseek error',
	5019:	'cube is system cube',
	6000:	'legacy error',
	6001:	'legacy error',
	6002:	'legacy error',
	6003:	'legacy error',
	6004:	'legacy error',
	6005:	'legacy error',
	6006:	'legacy error',
	6007:	'legacy error',
	6008:	'legacy error',
	6009:	'legacy error',
	6010:	'legacy error',
	7000:	'illegal worker response',
	8001:	'parse error in rule',
	8002:	'rule not found',
	8003:	'rule has circular reference',
	8004:	'division by zero'
};
