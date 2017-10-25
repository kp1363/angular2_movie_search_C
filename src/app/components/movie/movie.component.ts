import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MovieService} from '../../services/movie.service';

@Component({
    moduleId: module.id,
    selector: 'movie',
    templateUrl: 'movie.component.html'
})
export class MovieComponent implements OnInit {
    movie: Object;
    
   
    constructor(
        private router: ActivatedRoute,
       
        private _movieService: MovieService) {

    }

    ngOnInit() {
        this.router.params.subscribe((params) => {
            let id = params['id'];
            this._movieService.getMovie(id).subscribe(movie => {
                var offset = -8;
                this.movie = Object.assign(movie, { "timestamp": new Date(new Date().getTime() + offset * 3600 * 1000).toUTCString().replace(/ GMT$/, "")} );
//console.log(movie);
              
                if (localStorage.getItem("recentMovie")) {
                    var recentMovie = new Array();
                    recentMovie = JSON.parse(localStorage.getItem("recentMovie"));
                    recentMovie.forEach((item, index) => {
                        if (item.id == movie.id) {
                            recentMovie.splice(index, 1);
                        }
                    })
                    
                    //console.log(recentMovie);
                    if (recentMovie.length > 5) {
                        recentMovie.shift();                        
                        recentMovie.push(movie);
                        //console.log(recentMovie);
                    } else {
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
    }
}

