"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var movie_service_1 = require("../../services/movie.service");
var MovieComponent = (function () {
    function MovieComponent(router, _movieService) {
        this.router = router;
        this._movieService = _movieService;
    }
    MovieComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.params.subscribe(function (params) {
            var id = params['id'];
            _this._movieService.getMovie(id).subscribe(function (movie) {
                var offset = -8;
                _this.movie = Object.assign(movie, { "timestamp": new Date(new Date().getTime() + offset * 3600 * 1000).toUTCString().replace(/ GMT$/, "") });
                //console.log(movie);
                if (localStorage.getItem("recentMovie")) {
                    var recentMovie = new Array();
                    recentMovie = JSON.parse(localStorage.getItem("recentMovie"));
                    recentMovie.forEach(function (item, index) {
                        if (item.id == movie.id) {
                            recentMovie.splice(index, 1);
                        }
                    });
                    //console.log(recentMovie);
                    if (recentMovie.length > 5) {
                        recentMovie.shift();
                        recentMovie.push(movie);
                    }
                    else {
                        recentMovie.push(movie);
                    }
                    localStorage.setItem("recentMovie", JSON.stringify(recentMovie));
                }
                else {
                    var recentMovie1 = new Array();
                    recentMovie1.push(movie);
                    localStorage.setItem("recentMovie", JSON.stringify(recentMovie1));
                }
            });
        });
    };
    return MovieComponent;
}());
MovieComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'movie',
        templateUrl: 'movie.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        movie_service_1.MovieService])
], MovieComponent);
exports.MovieComponent = MovieComponent;
//# sourceMappingURL=movie.component.js.map