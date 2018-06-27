window.getset = {
	props: ['id']
	, watch: {
		'$route': { handler: 'get' },
		'$data':  { handler: 'set', deep: true }
	}
	, created: function() {
		this.get();
	}
	, methods: {
		instanceId: function() {
			var id = this.$props.id;
			if ( ! id ) id = "uniqueInstance";
			return id;
		}
		, element: function() {
			var selector = "#" + this.$options.name;
			return document.querySelector(selector);
		}
		, keys: function() {
			return Object.keys(this.$data);
		}
		, data: function() {
			var ret = {};
			
			var keys = this.keys();
			
			for ( var i = 0; i < keys.length; i++ ) {
				var key = keys[i];
				ret[key] = this.$data[key];
			}
			
			return ret;
		}
		, get: function() { //console.log('get');
			var cname = this.$options.name;
			var iid = this.instanceId();
			var keys = this.keys();

			if ( ! this.element().data ) this.element().data = {};
			if ( ! this.element().data[cname] ) this.element().data[cname] = {};
			if ( ! this.element().data[cname][iid] ) this.element().data[cname][iid] = this.data();

			for ( var i = 0; i < keys.length; i++ ) {
				var key = keys[i];
				this[key] = this.element().data[cname][iid][key];
			}
		},
		set: function() { //console.log('set');
			var cname = this.$options.name;
			var iid = this.instanceId();
			
			var keys = Object.keys(this.$data);

			for ( var i = 0; i < keys.length; i++ ) {
				var key = keys[i];
				this.element().data[cname][iid][key] = this[key];
			}
		}
	}
}

window.vuecomp = function(elm, data, opt) {
	if ( ! elm.id ) 
		throw new Error('vuecomp requires and element id');
	
	if ( ! data ) data = {};
	if ( ! opt ) opt = {};
	
	if ( ! opt.template ) opt.template = elm.innerHTML;
	if ( opt.mixins ) opt.mixins.push(getset);
	else opt.mixins = [getset];
		
	opt.data = function() { //console.log(data);
		return JSON.parse(JSON.stringify(data));
	}
	
	elm.component = Vue.component(elm.id, opt);
}

