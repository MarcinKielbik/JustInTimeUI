'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  function _class() {
    var _this;
    _classCallCheck(this, _class);
    _this = _callSuper(this, _class);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }
  _inherits(_class, _HTMLElement);
  return _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">just-in-time-ui documentation</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"overview.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>README\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"dependencies.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-list\"></span>Dependencies\n                                    </a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"properties.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-apps\"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter modules\">\n                        <a data-type=\"chapter-link\" href=\"modules.html\">\n                            <div class=\"menu-toggler linked\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"', ">\n                                <span class=\"icon ion-ios-archive\"></span>\n                                <span class=\"link-name\">Modules</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                        </a>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"', ">\n                            <li class=\"link\">\n                                <a href=\"modules/AppModule.html\" data-type=\"entity-link\" >AppModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-AppModule-4d393131158aae40a535fb5175c702d24cee75a9dd6b1cc6b2970614c688ea9e44b86df8dc4469117d4d10274b9ac277fc240ff2182c3ee354c4dbed808ae489"' : 'data-bs-target="#xs-components-links-module-AppModule-4d393131158aae40a535fb5175c702d24cee75a9dd6b1cc6b2970614c688ea9e44b86df8dc4469117d4d10274b9ac277fc240ff2182c3ee354c4dbed808ae489"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-AppModule-4d393131158aae40a535fb5175c702d24cee75a9dd6b1cc6b2970614c688ea9e44b86df8dc4469117d4d10274b9ac277fc240ff2182c3ee354c4dbed808ae489"' : 'id="xs-components-links-module-AppModule-4d393131158aae40a535fb5175c702d24cee75a9dd6b1cc6b2970614c688ea9e44b86df8dc4469117d4d10274b9ac277fc240ff2182c3ee354c4dbed808ae489"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/AboutComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AboutComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/AppComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AppComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/DashboardComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >DashboardComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/EditKanbanCardComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >EditKanbanCardComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/EditSupplierComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >EditSupplierComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/KanbanComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >KanbanComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/LoginComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >LoginComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/NavbarComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >NavbarComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/NewOrderComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >NewOrderComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/OrderComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >OrderComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/OrderCreatedSuccessfullyComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >OrderCreatedSuccessfullyComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/SignupComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >SignupComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/SuppliersComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >SuppliersComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/UserSettingsComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >UserSettingsComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links-module-AppModule-4d393131158aae40a535fb5175c702d24cee75a9dd6b1cc6b2970614c688ea9e44b86df8dc4469117d4d10274b9ac277fc240ff2182c3ee354c4dbed808ae489"' : 'data-bs-target="#xs-injectables-links-module-AppModule-4d393131158aae40a535fb5175c702d24cee75a9dd6b1cc6b2970614c688ea9e44b86df8dc4469117d4d10274b9ac277fc240ff2182c3ee354c4dbed808ae489"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-AppModule-4d393131158aae40a535fb5175c702d24cee75a9dd6b1cc6b2970614c688ea9e44b86df8dc4469117d4d10274b9ac277fc240ff2182c3ee354c4dbed808ae489"' : 'id="xs-injectables-links-module-AppModule-4d393131158aae40a535fb5175c702d24cee75a9dd6b1cc6b2970614c688ea9e44b86df8dc4469117d4d10274b9ac277fc240ff2182c3ee354c4dbed808ae489"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/AuthService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AuthService</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/UserStoreService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >UserStoreService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/AppRoutingModule.html\" data-type=\"entity-link\" >AppRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/AppServerModule.html\" data-type=\"entity-link\" >AppServerModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-AppServerModule-dc9648098426afe1ad5a086cc9a46fb7b60c9137f90f1d4f4482d5b14a7568ef3b5e5e6fc569a3881f6aecde5519c4a0a16ee7e1aa42139c9cfc3d48d3fcb7ea"' : 'data-bs-target="#xs-components-links-module-AppServerModule-dc9648098426afe1ad5a086cc9a46fb7b60c9137f90f1d4f4482d5b14a7568ef3b5e5e6fc569a3881f6aecde5519c4a0a16ee7e1aa42139c9cfc3d48d3fcb7ea"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-AppServerModule-dc9648098426afe1ad5a086cc9a46fb7b60c9137f90f1d4f4482d5b14a7568ef3b5e5e6fc569a3881f6aecde5519c4a0a16ee7e1aa42139c9cfc3d48d3fcb7ea"' : 'id="xs-components-links-module-AppServerModule-dc9648098426afe1ad5a086cc9a46fb7b60c9137f90f1d4f4482d5b14a7568ef3b5e5e6fc569a3881f6aecde5519c4a0a16ee7e1aa42139c9cfc3d48d3fcb7ea"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/AppComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AppComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                </ul>\n                </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#classes-links"' : 'data-bs-target="#xs-classes-links"', ">\n                            <span class=\"icon ion-ios-paper\"></span>\n                            <span>Classes</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"', ">\n                            <li class=\"link\">\n                                <a href=\"classes/KanbanCard.html\" data-type=\"entity-link\" >KanbanCard</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Order.html\" data-type=\"entity-link\" >Order</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Supplier.html\" data-type=\"entity-link\" >Supplier</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/TokenApiModel.html\" data-type=\"entity-link\" >TokenApiModel</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/User.html\" data-type=\"entity-link\" >User</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ValidateForm.html\" data-type=\"entity-link\" >ValidateForm</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links"' : 'data-bs-target="#xs-injectables-links"', ">\n                                <span class=\"icon ion-md-arrow-round-down\"></span>\n                                <span>Injectables</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"injectables/AuthService.html\" data-type=\"entity-link\" >AuthService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/DrawerService.html\" data-type=\"entity-link\" >DrawerService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/KanbanService.html\" data-type=\"entity-link\" >KanbanService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/OrderService.html\" data-type=\"entity-link\" >OrderService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/SuppliersService.html\" data-type=\"entity-link\" >SuppliersService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/UserSettingsService.html\" data-type=\"entity-link\" >UserSettingsService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/UserStoreService.html\" data-type=\"entity-link\" >UserStoreService</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#interceptors-links"' : 'data-bs-target="#xs-interceptors-links"', ">\n                            <span class=\"icon ion-ios-swap\"></span>\n                            <span>Interceptors</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interceptors/AuthInterceptor.html\" data-type=\"entity-link\" >AuthInterceptor</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interceptors/TokenInterceptor.html\" data-type=\"entity-link\" >TokenInterceptor</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#guards-links"' : 'data-bs-target="#xs-guards-links"', ">\n                            <span class=\"icon ion-ios-lock\"></span>\n                            <span>Guards</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"', ">\n                            <li class=\"link\">\n                                <a href=\"guards/AuthGuard.html\" data-type=\"entity-link\" >AuthGuard</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#interfaces-links"' : 'data-bs-target="#xs-interfaces-links"', ">\n                            <span class=\"icon ion-md-information-circle-outline\"></span>\n                            <span>Interfaces</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interfaces/Currency.html\" data-type=\"entity-link\" >Currency</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ExtendedOrder.html\" data-type=\"entity-link\" >ExtendedOrder</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Status.html\" data-type=\"entity-link\" >Status</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#miscellaneous-links"' : 'data-bs-target="#xs-miscellaneous-links"', ">\n                            <span class=\"icon ion-ios-cube\"></span>\n                            <span>Miscellaneous</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"', ">\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/functions.html\" data-type=\"entity-link\">Functions</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <a data-type=\"chapter-link\" href=\"coverage.html\"><span class=\"icon ion-ios-stats\"></span>Documentation coverage</a>\n                    </li>\n                    <li class=\"divider\"></li>\n                    <li class=\"copyright\">\n                        Documentation generated using <a href=\"https://compodoc.app/\" target=\"_blank\" rel=\"noopener noreferrer\">\n                            <img data-src=\"images/compodoc-vectorise.png\" class=\"img-responsive\" data-type=\"compodoc-logo\">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);
}(/*#__PURE__*/_wrapNativeSuper(HTMLElement)));