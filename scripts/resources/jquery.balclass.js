/**
 * @depends jquery, core.console
 * @name jquery.balclass
 * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
 */

/**
 * jQuery Aliaser
 */
(function($){
	
	/**
	 * BalClass
	 * @version 1.2.0
	 * @date July 11, 2010
	 * @since 1.0.0, June 30, 2010
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	if ( !($.BalClass||false) ) {
		// Constructor
		$.BalClass = function(config,extend){
			this.construct(config,extend);
		};
		// Prototype
		$.extend($.BalClass.prototype, {
			config: {
			},
			construct: function(config,extend){
				var Me = this;
				Me.configure(config);
				$.extend(Me,extend||{});
				if ( typeof Me.built === 'function' ) {
					return Me.built();
				}
				return true;
			},
			configure: function(config){
				var Me = this;
				Me.config = Me.config||{};
				Me.config = $.extend({},Me.config,config||{}); // we want to clone
				return Me;
			},
			clone: function(extend){
				// Clone a BalClass (Creates a new BalClass type)
				var Me = this;
				var clone = function(config,extend){
					this.construct(config,extend);
				};
				$.extend(clone.prototype, Me.prototype, extend||{});
				clone.clone = clone.prototype.clone;
				clone.create = clone.prototype.create;
				return clone;
			},
			create: function(config,extend){
				// Create a BalClass (Creates a new instance of a BalClass)
				var Me = this;
				var Obj = new Me(config,extend);
				return Obj;
			},
			addConfig: function(name, config){
				var Me = this;
				if ( typeof config === 'undefined' ) {
					if ( typeof name === 'object' ) {
						// Series
						for ( var i in name ) {
							Me.applyConfig(i, name[i]);
						}
					}
					return false;
				} else if ( typeof config === 'object' ) {
					// Single
					Me.applyConfig(name, config);
				}
				return Me;
			},
			applyConfig: function(name,config){
				var Me = this;
				Me.config[name] = Me.config[name]||{};
				$.extend(true,Me.config[name],config||{});
				return Me;
			},
			setConfig: function(name,config){
				var Me = this;
				Me.config[name] = config||{};
				return Me;
			},
			getConfig: function(name){
				var Me = this;
				if ( typeof name !== 'string' ) {
					return this.config;
				}
				return this.getConfigWith(name);
			},
			getConfigWith: function(name,config){
				var Me = this;
				if ( typeof name !== 'string' ) {
					if ( typeof config === 'undefined' ) {
						config = name;
					}
					name = 'default';
				}
				if ( typeof config !== 'object' ) {
					config = {};
				}
				var result = {};
				$.extend(true, result, Me.config[name]||{}, config||{});
				return result;
			},
			getConfigWithDefault: function(name,config){
				var Me = this;
				return Me.getConfigWith('default',Me.getConfigWith(name,config));
			},
			setDefaults: function(config){
				var Me = this;
				return Me.applyConfig('default',config);
			}
		});
		// Instance
		$.BalClass.clone = $.BalClass.prototype.clone;
		$.BalClass.create = $.BalClass.prototype.create;
		// ^ we alias these as they should be both in prototype and instance
		//   however we do not want to create a full instance yet...
	}
	else {
		window.console.warn("$.BalClass has already been defined...");
	}


})(jQuery);