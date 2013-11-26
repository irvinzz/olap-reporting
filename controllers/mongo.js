var mongoose = require('mongoose');
var _ = require('underscore');
mongoose.connect('mongodb://localhost/olap');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;
  
var VariableSchemaObject = {
    name: {type: String},
    type: {type: String, enum: ['value','table','chart']},
    hint: {type: String},
    template: {type: ObjectId}
};
var VariableSchema = new Schema(VariableSchemaObject);

var TemplateSchemaObject = {
    name: String,
    text: String
};
var TemplateSchema = new Schema(TemplateSchemaObject);
  
/*var ReportMap = mongoose.model('ReportMap',{
    object: Number,
    name: String,
    type: String,
    value: String
});
*/

var BindSchemaObject = {
    variable: { type: ObjectId },
    link: { type: Number },
    report: {type: ObjectId }
};

var BindSchema = new Schema(BindSchemaObject);

var ReportSchemaObject = {
    id: ObjectId,
    name: String,
    template: ObjectId
};

var ReportSchema = new Schema(ReportSchemaObject);

var r = {
    mongoose: mongoose,
    models:{
        Bind: mongoose.model('Bind',BindSchema),
        Variable: mongoose.model('Variable',VariableSchema),
        Template: mongoose.model('Template',TemplateSchema),
        Report: mongoose.model('Report',ReportSchema)
    },
    fields:{
        Bind: _.keys(BindSchemaObject),
        Variable: _.keys(VariableSchemaObject),
        Template: _.keys(TemplateSchemaObject),
        Report: _.keys(ReportSchemaObject)
    },
    schemas:{
        Bind: BindSchema,
        Template: TemplateSchema,
        Variable: VariableSchema,
        Report: ReportSchema
    },
    keys: require('underscore').keys,
    Schema: Schema
};

module.exports = r;






























