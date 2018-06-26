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
		element: function() {
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
		, get: function() { console.log('get');
			var id = this.$route.params.id;
			var keys = this.keys();

			if ( ! this.element().data ) this.element().data = {};
			if ( ! this.element().data[id] ) this.element().data[id] = this.data();

			for ( var i = 0; i < keys.length; i++ ) {
				var key = keys[i];
				this[key] = this.element().data[id][key];
			}
		},
		set: function() { console.log('set');
			var id = this.$route.params.id;
			var keys = Object.keys(this.$data);

			for ( var i = 0; i < keys.length; i++ ) {
				var key = keys[i];
				this.element().data[id][key] = this[key];
			}
		}
	}
}
